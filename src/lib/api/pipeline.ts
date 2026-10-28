import 'server-only';
import { NextResponse } from 'next/server';
import type { ZodError } from 'zod';
import { getClientIp } from './ip';
import { defaultRateLimiter } from './rate-limit';
import { getSubmissionSink } from './sink';
import { checkSpam, DEFAULT_HONEYPOT_FIELD, DEFAULT_TIMESTAMP_FIELD } from './spam';
import type { ApiResponse, PipelineConfig, SubmissionMetadata } from './types';

/**
 * Formats Zod validation issues into a safe, structured dictionary:
 * { [fieldPath]: string[] }
 */
export function formatZodErrors(error: ZodError): Record<string, string[]> {
  const formatted: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const path = issue.path.join('.') || 'root';
    if (!formatted[path]) {
      formatted[path] = [];
    }
    formatted[path].push(issue.message);
  }
  return formatted;
}

/**
 * Executes the shared 6-stage submission pipeline:
 * 1. Parse request body safely
 * 2. Spam checks (honeypot + minimum fill time)
 * 3. Rate limiting (per-IP, configurable)
 * 4. Zod schema validation
 * 5. SubmissionSink delivery
 * 6. Typed JSON response envelope
 */
export async function handleSubmission<TOutput, TResponseData = unknown>(
  req: Request,
  config: PipelineConfig<TOutput, TResponseData>,
): Promise<NextResponse<ApiResponse<TResponseData>>> {
  // 1. Safe JSON parsing
  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: 'Invalid request payload. Expected JSON body.',
      },
      { status: 400 },
    );
  }

  if (!rawBody || typeof rawBody !== 'object' || Array.isArray(rawBody)) {
    return NextResponse.json(
      {
        ok: false,
        message: 'Invalid request body format.',
      },
      { status: 400 },
    );
  }

  const bodyRecord = rawBody as Record<string, unknown>;

  // 2. Anti-spam verification (Honeypot + Minimum fill time)
  const spamResult = checkSpam(bodyRecord, config.spamConfig);
  if (spamResult.isSpam) {
    return NextResponse.json(
      {
        ok: false,
        message: 'Submission could not be verified. Please reload the page and try again.',
      },
      { status: 400 },
    );
  }

  // 3. Rate limiting (per-IP sliding window under configured trust policy)
  const ip = getClientIp(req, config.trustedProxyStrategy);
  const limiter = defaultRateLimiter;
  const rateLimitOpts = config.rateLimit ?? { limit: 10, windowMs: 60_000 };
  const rateLimitKey = `${config.endpoint}:${ip}`;
  const rateLimitResult = await limiter.check(
    rateLimitKey,
    rateLimitOpts.limit,
    rateLimitOpts.windowMs,
  );

  if (!rateLimitResult.allowed) {
    const retryAfterSec = Math.ceil(rateLimitResult.resetMs / 1000);
    return NextResponse.json(
      {
        ok: false,
        message: 'Too many requests. Please wait a moment before trying again.',
      },
      {
        status: 429,
        headers: {
          'Retry-After': String(retryAfterSec),
        },
      },
    );
  }

  // 4. Strip anti-spam metadata before validating domain schema
  const cleanPayload = { ...bodyRecord };
  delete cleanPayload[config.spamConfig?.honeypotField || DEFAULT_HONEYPOT_FIELD];
  delete cleanPayload[DEFAULT_TIMESTAMP_FIELD];
  delete cleanPayload['_honeypot'];

  const parseResult = config.schema.safeParse(cleanPayload);
  if (!parseResult.success) {
    const fieldErrors = formatZodErrors(parseResult.error);
    return NextResponse.json(
      {
        ok: false,
        message: 'Validation failed. Please correct the highlighted fields.',
        errors: fieldErrors,
      },
      { status: 422 },
    );
  }

  // 5. Deliver through SubmissionSink (with exception isolation)
  const sink = config.sink ?? getSubmissionSink();
  const metadata: SubmissionMetadata = {
    ip,
    userAgent: req.headers.get('user-agent') || undefined,
    receivedAt: new Date().toISOString(),
  };

  let deliveryResult;
  try {
    deliveryResult = await sink.deliver({
      endpoint: config.endpoint,
      data: parseResult.data,
      meta: metadata,
    });
  } catch (err) {
    console.error(
      `[SubmissionPipeline] Sink delivery threw an unexpected error for endpoint '${config.endpoint}':`,
      err instanceof Error ? err.message : 'Unknown error',
    );
    return NextResponse.json(
      {
        ok: false,
        message:
          'Submission service temporarily unavailable. Please try again later or call our community line.',
      },
      { status: 503 },
    );
  }

  if (!deliveryResult.success) {
    const isServiceUnavailable = deliveryResult.message?.includes('not configured for production');
    return NextResponse.json(
      {
        ok: false,
        message: isServiceUnavailable
          ? 'Submission service temporarily unavailable. Please try again later or call our community line.'
          : deliveryResult.message ||
            'An error occurred while processing your submission. Please try again.',
      },
      { status: isServiceUnavailable ? 503 : 500 },
    );
  }

  // Optional post-delivery logic (e.g. generating checkout hand-off redirect URL)
  let responseData: TResponseData | undefined;
  if (config.onSuccess) {
    responseData = await config.onSuccess(parseResult.data, metadata);
  }

  // 6. Return consistent JSON response envelope
  return NextResponse.json(
    {
      ok: true,
      message: config.successMessage || 'Thank you! Your submission has been received.',
      data: responseData,
    },
    { status: 200 },
  );
}
