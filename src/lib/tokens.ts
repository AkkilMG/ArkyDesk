import "server-only";

import { createHash, randomBytes } from "crypto";

import { getMongoClient } from "@/lib/mongodb";

/**
 * Single-use, expiring tokens for email verification and password reset.
 *
 * Follows the same pattern as the guest magic link that already exists in this
 * codebase (`guest_login_tokens`):
 *  - the raw token is emailed, only its SHA-256 hash is stored, so a database
 *    disclosure does not yield usable reset links (ISO 27001:2022 A.8.24);
 *  - single use, enforced by an atomic `used: false` predicate in the update;
 *  - explicit expiry, checked server-side.
 */

export const TOKEN_COLLECTIONS = {
  verification: "email_verification_tokens",
  passwordReset: "password_reset_tokens",
} as const;

export type TokenKind = keyof typeof TOKEN_COLLECTIONS;

export type IssuedToken = {
  raw: string;
  expiresAt: Date;
};

export function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function issueToken(
  kind: TokenKind,
  userId: string,
  { ttlMs, extra }: { ttlMs: number; extra?: Record<string, unknown> }
): Promise<IssuedToken> {
  const raw = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + ttlMs);

  const db = await getMongoClient();
  const collection = db.collection(TOKEN_COLLECTIONS[kind]);

  // Invalidate any outstanding token for this user so only the newest link works.
  await collection.updateMany(
    { userId, used: false },
    { $set: { used: true, usedReason: "superseded", usedAt: new Date() } }
  );

  await collection.insertOne({
    userId,
    tokenHash: hashToken(raw),
    expiresAt,
    used: false,
    createdAt: new Date(),
    ...(extra ?? {}),
  });

  return { raw, expiresAt };
}

/**
 * Atomically claim a token. Returns the owning user id, or `null` when the
 * token is unknown, already used, or expired.
 *
 * The `findOneAndUpdate` predicate is the concurrency control: two requests
 * racing on the same token cannot both succeed.
 */
export async function consumeToken(
  kind: TokenKind,
  raw: string
): Promise<{ userId: string } | null> {
  if (!raw || raw.length < 16) return null;

  const db = await getMongoClient();
  const result = await db.collection(TOKEN_COLLECTIONS[kind]).findOneAndUpdate(
    {
      tokenHash: hashToken(raw),
      used: false,
      expiresAt: { $gt: new Date() },
    },
    { $set: { used: true, usedAt: new Date() } },
    { returnDocument: "after", projection: { userId: 1, _id: 0 } }
  );

  // mongodb v6 returns the document directly; older drivers nest it under `.value`.
  const doc = (result as { value?: { userId: string } } | null)?.value ?? result;
  const userId = (doc as { userId?: string } | null)?.userId;
  return userId ? { userId } : null;
}

/** Opportunistic cleanup of tokens that expired more than `graceMs` ago. */
export async function pruneTokens(kind: TokenKind, graceMs = 24 * 60 * 60 * 1000) {
  const db = await getMongoClient();
  await db
    .collection(TOKEN_COLLECTIONS[kind])
    .deleteMany({ expiresAt: { $lt: new Date(Date.now() - graceMs) } });
}
