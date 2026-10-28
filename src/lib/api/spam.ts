import 'server-only';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { serverEnv } from '@/config/server-env';
import type { SpamCheckConfig, SpamCheckResult } from './types';

export const DEFAULT_HONEYPOT_FIELD = '_hp';
export const DEFAULT_TIMESTAMP_FIELD = '_t';
export const DEFAULT_MIN_FILL_TIME_MS = 2000; // 2 seconds minimum fill time
export const DEFAULT_MAX_AGE_MS = 24 * 60 * 60 * 1000; // 24 hours max token lifetime
export const DEFAULT_CLOCK_SKEW_MS = 5000; // 5 seconds future tolerance for client clock skew

/**
 * Creates an HMAC-SHA256 signed time token in format `<timestamp>.<signature>`.
 * Enables server-verifiable fill time verification without database persistence.
 */
export function createSignedTimeToken(timestamp: number, secret: string): string {
  const tsStr = String(timestamp);
  const hmac = createHmac('sha256', secret).update(tsStr).digest('hex');
  return `${tsStr}.${hmac}`;
}

/**
 * Verifies an HMAC-SHA256 signed time token.
 * Returns whether the signature is authentic and the extracted timestamp.
 */
export function verifySignedTimeToken(
  token: string,
  secret: string,
): { valid: boolean; timestamp?: number } {
  const dotIndex = token.indexOf('.');
  if (dotIndex === -1) {
    return { valid: false };
  }

  const tsStr = token.slice(0, dotIndex);
  const providedSig = token.slice(dotIndex + 1);

  const timestamp = Number(tsStr);
  if (isNaN(timestamp) || timestamp <= 0) {
    return { valid: false };
  }

  try {
    const expectedSig = createHmac('sha256', secret).update(tsStr).digest('hex');
    const providedBuf = Buffer.from(providedSig, 'hex');
    const expectedBuf = Buffer.from(expectedSig, 'hex');

    if (providedBuf.length !== expectedBuf.length) {
      return { valid: false };
    }

    const isValid = timingSafeEqual(providedBuf, expectedBuf);
    return { valid: isValid, timestamp: isValid ? timestamp : undefined };
  } catch {
    return { valid: false };
  }
}

/**
 * Validates anti-spam baseline protections:
 * 1. Honeypot check: If the hidden honeypot field is populated, reject.
 * 2. Minimum fill time check:
 *    - If a signed token (`<timestamp>.<signature>`) is supplied, verifies HMAC signature.
 *    - If a plain timestamp is supplied, verifies that elapsed interaction time is realistic.
 *
 * ARCHITECTURAL NOTICE:
 * In the current static-first architecture, marketing pages are statically generated at build
 * time. No server-side token issuance endpoint or dynamic SSR session exists.
 * Therefore, client forms supply a plain client-side timestamp (_t = Date.now()).
 *
 * UNUSED INFRASTRUCTURE NOTICE:
 * The signed-token helper functions (`createSignedTimeToken`, `verifySignedTimeToken`) and
 * `requireSignedToken` option are forward-compatible helper infrastructure. They are currently
 * UNUSED by public form routes.
 *
 * SECURITY LIMITATION:
 * The plain `_t` timestamp is a client-side time trap serving as a lightweight bot deterrent
 * against naive automated scrapers. It is inherently FORGEABLE by any bot that deliberately crafts
 * a valid timestamp (e.g., _t = Date.now() - 5000). It does NOT provide cryptographic proof of human
 * interaction.
 */
export function checkSpam(
  payload: Record<string, unknown>,
  config: SpamCheckConfig = {},
): SpamCheckResult {
  const honeypotField = config.honeypotField || DEFAULT_HONEYPOT_FIELD;
  const minFillTimeMs = config.minFillTimeMs ?? DEFAULT_MIN_FILL_TIME_MS;
  const maxAgeMs = config.maxAgeMs ?? DEFAULT_MAX_AGE_MS;
  const clockSkewToleranceMs = config.clockSkewToleranceMs ?? DEFAULT_CLOCK_SKEW_MS;
  const tokenSecret = config.tokenSecret || serverEnv.FORM_SECRET;

  // 1. Honeypot check: hidden field must be omitted or empty
  const honeypotVal = payload[honeypotField];
  if (typeof honeypotVal === 'string' && honeypotVal.trim().length > 0) {
    return { isSpam: true, reason: 'Honeypot field was populated.' };
  }
  if (
    payload._honeypot &&
    typeof payload._honeypot === 'string' &&
    payload._honeypot.trim().length > 0
  ) {
    return { isSpam: true, reason: 'Secondary honeypot field was populated.' };
  }

  // 2. Minimum fill time check
  if (minFillTimeMs > 0) {
    const rawTime = payload[DEFAULT_TIMESTAMP_FIELD];

    if (rawTime === undefined || rawTime === null || rawTime === '') {
      return { isSpam: true, reason: 'Missing submission timestamp.' };
    }

    let startTimestamp: number;

    // Check if token is in signed format (<timestamp>.<signature>)
    if (typeof rawTime === 'string' && rawTime.includes('.')) {
      if (!tokenSecret) {
        return {
          isSpam: true,
          reason: 'Signed token supplied but no secret is configured on server.',
        };
      }

      const { valid, timestamp } = verifySignedTimeToken(rawTime, tokenSecret);
      if (!valid || timestamp === undefined) {
        return { isSpam: true, reason: 'Invalid or forged submission token signature.' };
      }
      startTimestamp = timestamp;
    } else {
      // Require signed token if configured
      if (config.requireSignedToken) {
        return { isSpam: true, reason: 'Signed submission token is required.' };
      }

      // Plain timestamp validation (baseline time trap)
      startTimestamp = typeof rawTime === 'number' ? rawTime : Number(rawTime);
      if (isNaN(startTimestamp) || startTimestamp <= 0) {
        return { isSpam: true, reason: 'Malformed submission timestamp.' };
      }
    }

    const now = Date.now();
    const elapsedMs = now - startTimestamp;

    // Reject future timestamp beyond acceptable clock skew
    if (elapsedMs < -clockSkewToleranceMs) {
      return { isSpam: true, reason: 'Submission timestamp is in the future.' };
    }

    // Reject submissions completed unrealistically fast
    if (elapsedMs < minFillTimeMs) {
      return {
        isSpam: true,
        reason: `Submission completed unrealistically fast (${elapsedMs}ms < ${minFillTimeMs}ms).`,
      };
    }

    // Reject expired submission tokens
    if (elapsedMs > maxAgeMs) {
      return { isSpam: true, reason: 'Submission session has expired.' };
    }
  }

  return { isSpam: false };
}
