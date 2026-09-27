/**
 * Shared in-process rate limiter (ISO 27001:2022 A.8.6 capacity management).
 *
 * Replaces three separate ad-hoc `globalThis.__*RateMap` implementations.
 *
 * LIMITATION — read before relying on this for compliance:
 * ArkyDesk deploys to Cloudflare Workers via `@opennextjs/cloudflare`, where
 * each request may be served by an isolated isolate. An in-memory Map therefore:
 *   - resets on every cold start or redeploy, and
 *   - is not shared between concurrent isolates,
 * so the effective limit is per-isolate rather than global. For a real
 * distributed limit, back `checkRateLimit` with Workers KV + a Durable Object
 * (or the platform rate-limiting binding). The single implementation here is
 * the correct seam for that swap.
 */

type Bucket = { count: number; firstTs: number };

function bucketFor(key: string): Map<string, Bucket> {
  const globalAny = globalThis as unknown as Record<string, Map<string, Bucket> | undefined>;
  const existing = globalAny.__arkydeskRateLimits;
  if (existing) return existing;
  const created = new Map<string, Bucket>();
  globalAny.__arkydeskRateLimits = created;
  return created;
}

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  /** Seconds until the window resets. */
  retryAfter: number;
};

export function checkRateLimit(
  key: string,
  { max, windowMs }: { max: number; windowMs: number }
): RateLimitResult {
  const now = Date.now();
  const buckets = bucketFor(key);
  const bucket = buckets.get(key) ?? { count: 0, firstTs: now };

  if (now - bucket.firstTs > windowMs) {
    bucket.count = 0;
    bucket.firstTs = now;
  }

  const retryAfter = Math.max(0, Math.ceil((bucket.firstTs + windowMs - now) / 1000));

  if (bucket.count >= max) {
    return { allowed: false, remaining: 0, retryAfter };
  }

  bucket.count += 1;
  buckets.set(key, bucket);

  // Opportunistic cleanup so the Map cannot grow without bound.
  if (buckets.size > 10_000) {
    buckets.forEach((value, existingKey) => {
      if (now - value.firstTs > windowMs) buckets.delete(existingKey);
    });
  }

  return { allowed: true, remaining: Math.max(0, max - bucket.count), retryAfter };
}

/** Best-effort client IP from proxy headers. */
export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export const RATE_LIMITS = {
  signin: { max: 8, windowMs: 10 * 60 * 1000 },
  signup: { max: 5, windowMs: 60 * 60 * 1000 },
  guestTicket: { max: 10, windowMs: 10 * 60 * 1000 },
  guestLoginLink: { max: 6, windowMs: 10 * 60 * 1000 },
  forgotPassword: { max: 5, windowMs: 60 * 60 * 1000 },
  write: { max: 60, windowMs: 10 * 60 * 1000 },
} as const;
