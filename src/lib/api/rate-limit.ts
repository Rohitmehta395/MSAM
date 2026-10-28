import 'server-only';
import type { RateLimiter, RateLimitResult } from './types';

interface WindowRecord {
  count: number;
  resetAt: number;
}

export interface InMemoryRateLimiterOptions {
  defaultLimit?: number;
  defaultWindowMs?: number;
  maxEntries?: number;
}

/**
 * In-memory sliding-window rate limiter per client key (e.g., endpoint:IP).
 * Implements the RateLimiter interface so it can be replaced with Redis/Upstash
 * when approved infrastructure is added.
 */
export class InMemoryRateLimiter implements RateLimiter {
  private readonly store = new Map<string, WindowRecord>();
  private readonly defaultLimit: number;
  private readonly defaultWindowMs: number;
  private readonly maxEntries: number;
  private lastPrune: number = Date.now();

  constructor(options: InMemoryRateLimiterOptions = {}) {
    this.defaultLimit = options.defaultLimit ?? 10;
    this.defaultWindowMs = options.defaultWindowMs ?? 60_000; // 1 minute
    this.maxEntries = options.maxEntries ?? 10_000;
  }

  check(key: string, limit = this.defaultLimit, windowMs = this.defaultWindowMs): RateLimitResult {
    const now = Date.now();
    this.pruneIfNeeded(now);

    const record = this.store.get(key);

    if (!record || now >= record.resetAt) {
      const newRecord: WindowRecord = {
        count: 1,
        resetAt: now + windowMs,
      };
      this.store.set(key, newRecord);
      return {
        allowed: true,
        remaining: Math.max(0, limit - 1),
        resetMs: windowMs,
      };
    }

    record.count += 1;
    const remaining = Math.max(0, limit - record.count);
    const resetMs = Math.max(0, record.resetAt - now);

    if (record.count > limit) {
      return {
        allowed: false,
        remaining: 0,
        resetMs,
      };
    }

    return {
      allowed: true,
      remaining,
      resetMs,
    };
  }

  reset(key: string): void {
    this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
  }

  private pruneIfNeeded(now: number): void {
    if (now - this.lastPrune > 30_000 || this.store.size > this.maxEntries) {
      this.lastPrune = now;
      for (const [k, rec] of this.store.entries()) {
        if (now >= rec.resetAt) {
          this.store.delete(k);
        }
      }
    }
  }
}

/**
 * Shared singleton in-memory rate limiter for server route handlers.
 */
export const defaultRateLimiter = new InMemoryRateLimiter({
  defaultLimit: 10,
  defaultWindowMs: 60_000,
});
