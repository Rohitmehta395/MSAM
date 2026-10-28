import type { ZodType } from 'zod';

/**
 * Standard typed JSON response envelope for all MSAM API routes.
 */
export interface ApiResponse<TData = unknown> {
  ok: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  data?: TData;
}

/**
 * Supported form submission endpoints in the application.
 */
export type SubmissionEndpoint = 'contact' | 'intake' | 'newsletter' | 'donate-intent';

/**
 * Metadata captured with every verified submission.
 */
export interface SubmissionMetadata {
  ip: string;
  userAgent?: string;
  receivedAt: string;
}

/**
 * Standard payload delivered to a SubmissionSink.
 */
export interface SubmissionPayload<TData = unknown> {
  endpoint: SubmissionEndpoint;
  data: TData;
  meta: SubmissionMetadata;
}

/**
 * Result returned by a SubmissionSink.
 */
export interface SubmissionResult<TData = unknown> {
  success: boolean;
  message?: string;
  data?: TData;
}

/**
 * Pluggable delivery interface for validated submissions.
 */
export interface SubmissionSink {
  deliver(payload: SubmissionPayload): Promise<SubmissionResult>;
}

/**
 * Result returned by rate limiter checks.
 */
export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetMs: number;
}

/**
 * Interface for rate limiters (in-memory, Redis, Upstash, etc.).
 */
export interface RateLimiter {
  check(key: string, limit?: number, windowMs?: number): Promise<RateLimitResult> | RateLimitResult;
  reset?(key: string): void;
}

/**
 * Supported trusted proxy strategies for resolving client IP addresses.
 */
export type TrustedProxyStrategy = 'none' | 'vercel' | 'trusted-proxy';

/**
 * Anti-spam verification result.
 */
export interface SpamCheckResult {
  isSpam: boolean;
  reason?: string;
}

/**
 * Configuration options for anti-spam detection.
 */
export interface SpamCheckConfig {
  honeypotField?: string;
  minFillTimeMs?: number;
  maxAgeMs?: number;
  clockSkewToleranceMs?: number;
  tokenSecret?: string;
  requireSignedToken?: boolean;
}

/**
 * Pipeline execution configuration for a specific route handler.
 */
export interface PipelineConfig<TOutput = unknown, TResponseData = unknown> {
  endpoint: SubmissionEndpoint;
  schema: ZodType<TOutput>;
  successMessage?: string;
  rateLimit?: {
    limit: number;
    windowMs: number;
  };
  spamConfig?: SpamCheckConfig;
  trustedProxyStrategy?: TrustedProxyStrategy;
  sink?: SubmissionSink;
  onSuccess?: (
    validatedData: TOutput,
    meta: SubmissionMetadata,
  ) => Promise<TResponseData | undefined> | TResponseData | undefined;
}
