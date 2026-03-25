/**
 * Rate limiter with Upstash Redis (global) + in-memory fallback (per-instance).
 *
 * When UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are set,
 * uses Upstash Redis for global rate limiting across all Vercel instances.
 * Falls back to in-memory sliding window when Redis is not configured.
 */

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// ── Upstash Redis (global) ──────────────────────────────────────────────────

let redisRateLimiters: Map<string, Ratelimit> | null = null;

function getRedisRateLimiter(limit: number, windowMs: number): Ratelimit | null {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }

  const key = `${limit}:${windowMs}`;
  if (!redisRateLimiters) {
    redisRateLimiters = new Map();
  }

  let rl = redisRateLimiters.get(key);
  if (!rl) {
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });

    // Convert windowMs to Upstash duration string
    const windowSec = Math.ceil(windowMs / 1000);
    const duration = windowSec >= 60
      ? `${Math.ceil(windowSec / 60)} m` as `${number} m`
      : `${windowSec} s` as `${number} s`;

    rl = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(limit, duration),
      analytics: true,
    });
    redisRateLimiters.set(key, rl);
  }

  return rl;
}

// ── In-memory fallback (per-instance) ────────────────────────────────────────

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const store = new Map<string, RateLimitEntry>();

const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  for (const [key, entry] of store) {
    if (now > entry.resetAt) {
      store.delete(key);
    }
  }
}

function inMemoryRateLimit(
  key: string,
  limit: number,
  windowMs: number
): { limited: boolean; remaining: number } {
  cleanup();

  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { limited: false, remaining: limit - 1 };
  }

  entry.count++;
  if (entry.count > limit) {
    return { limited: true, remaining: 0 };
  }

  return { limited: false, remaining: limit - entry.count };
}

// ── Public API ───────────────────────────────────────────────────────────────

/**
 * Check if a request should be rate limited.
 * Uses Upstash Redis when configured, falls back to in-memory.
 */
export async function rateLimitAsync(
  key: string,
  limit: number,
  windowMs: number
): Promise<{ limited: boolean; remaining: number }> {
  const redisLimiter = getRedisRateLimiter(limit, windowMs);
  if (redisLimiter) {
    try {
      const result = await redisLimiter.limit(key);
      return { limited: !result.success, remaining: result.remaining };
    } catch (err) {
      console.error("Upstash rate limit error, falling back to in-memory:", err);
      return inMemoryRateLimit(key, limit, windowMs);
    }
  }
  return inMemoryRateLimit(key, limit, windowMs);
}

/**
 * Synchronous rate limit (in-memory only). Kept for backward compatibility.
 * Prefer rateLimitAsync for new code.
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): { limited: boolean; remaining: number } {
  return inMemoryRateLimit(key, limit, windowMs);
}

/**
 * Extract client IP from request headers.
 * Works on Vercel (x-forwarded-for) and other proxied environments.
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }
  return "unknown";
}
