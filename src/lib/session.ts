import "server-only";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

import type { Session } from "@/types/auth";

/** Sliding session lifetime: 7 days, renewed on each verify/refresh. */
export const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;
export const SESSION_COOKIE = "session";

export function getEncodedKey() {
  const secretKey = process.env.SESSION_SECRET;
  if (!secretKey) {
    // Failing closed: an unconfigured deployment must never mint or accept a
    // session, otherwise every request would look authenticated.
    throw new Error("SESSION_SECRET is not defined in environment variables");
  }
  return new TextEncoder().encode(secretKey);
}

export async function encryptSession(payload: Session) {
  const encodedKey = getEncodedKey();
  return new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decryptSession(session: string | undefined = "") {
  if (!session) return null;
  try {
    const encodedKey = getEncodedKey();
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as unknown as Session;
  } catch {
    // Expected on every tampered or expired cookie; not worth logging.
    return null;
  }
}

/**
 * The single definition of how the session cookie is written.
 *
 * Every issuer (signin, guest magic link, renewal) must use this so the
 * `Secure` / `SameSite` / `Path` attributes can never drift apart — a mismatch
 * is how sessions end up readable from JavaScript or sent cross-site.
 */
export function sessionCookieOptions(expiresAt: Date) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    expires: expiresAt,
  };
}

export function setSessionCookie(value: string, expiresAt: Date) {
  try {
    cookies().set(SESSION_COOKIE, value, sessionCookieOptions(expiresAt));
  } catch {
    // Fallback for runtimes that reject the extended attribute set.
    cookies().set(SESSION_COOKIE, value, { path: "/", httpOnly: true });
  }
}

/** Re-issues the session cookie with a fresh expiry, preserving the identity. */
export async function updateSession() {
  const sessionCookie = cookies().get(SESSION_COOKIE)?.value;
  if (!sessionCookie) return null;

  const payload = await decryptSession(sessionCookie);
  if (!payload?.token || typeof payload.token !== "string") return null;

  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);
  const newSession = await encryptSession({
    token: payload.token,
    expiresAt,
  });

  setSessionCookie(newSession, expiresAt);

  return newSession;
}
