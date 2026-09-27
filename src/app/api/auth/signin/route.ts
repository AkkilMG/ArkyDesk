import { cookies } from "next/headers";
import { z } from "zod";

import { encrypt, encryptCode } from "@/lib/crypto";
import { getMongoClient } from "@/lib/mongodb";
import { encryptSession, SESSION_TTL_MS, sessionCookieOptions } from "@/lib/session";
import { checkRateLimit, clientIp, RATE_LIMITS } from "@/lib/rate-limit";
import { logSecurityEvent } from "@/lib/security-log";
import { apiJson } from "@/lib/api-auth";
import type { Session } from "@/types/auth";

export const dynamic = "force-dynamic";

const schema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  password: z.string().min(8).max(128),
});

export async function GET() {
  return apiJson(
    { success: false, message: "Method not allowed. Use POST." },
    405
  );
}

export async function POST(request: Request) {
  try {
    const ip = clientIp(request);

    // Two independent budgets: a coarse per-IP cap and a tight per-account cap,
    // so neither a single noisy host nor a distributed botnet can brute force
    // one mailbox (ISO 27001:2022 A.8.5 secure authentication).
    const ipLimit = checkRateLimit(`signin:ip:${ip}`, RATE_LIMITS.signin);
    if (!ipLimit.allowed) {
      logSecurityEvent("auth.rate_limited", { flow: "signin", scope: "ip" });
      return apiJson(
        { success: false, message: "Too many attempts. Please try again later." },
        429
      );
    }

    const parsed = schema.safeParse(await request.json().catch(() => ({})));
    if (!parsed.success) {
      return apiJson({ success: false, message: "Invalid input." }, 400);
    }

    const { email, password } = parsed.data;

    const accountLimit = checkRateLimit(`signin:acct:${email}`, {
      max: 10,
      windowMs: 15 * 60 * 1000,
    });
    if (!accountLimit.allowed) {
      logSecurityEvent("auth.rate_limited", { flow: "signin", scope: "account" });
      return apiJson(
        { success: false, message: "Too many attempts. Please try again later." },
        429
      );
    }

    const db = await getMongoClient();
    const user = await db.collection("users").findOne({ email });

    // Uniform failure for "unknown email" and "wrong password" so the response
    // cannot be used to enumerate registered addresses.
    if (!user || user.password !== (await encryptCode(password))) {
      logSecurityEvent("auth.signin_failed", { email, reason: user ? "bad_password" : "unknown" });
      return apiJson({ success: false, message: "Invalid credentials." }, 401);
    }

    // A guest record with no password can only be reached via its emailed link.
    if ((user.guest || user.temporary) && !user.password) {
      return apiJson(
        {
          success: false,
          message: "This email is registered as a guest. Please sign up to create a password.",
        },
        401
      );
    }

    // Signing in with a password promotes a guest to a full account.
    if (user.guest || user.temporary) {
      await db.collection("users").updateOne(
        { _id: user._id },
        { $set: { guest: false, temporary: false, upgradedAt: new Date() } }
      );
    }

    const expiresAt = new Date(Date.now() + SESSION_TTL_MS);
    const session = await encryptSession({
      token: await encrypt(user._id.toString()),
      expiresAt,
    } as Session);

    try {
      cookies().set("session", session, sessionCookieOptions(expiresAt));
    } catch {
      // Some runtimes reject the extended attribute set.
      cookies().set("session", session, { path: "/", httpOnly: true });
    }

    logSecurityEvent("auth.signin", {
      userId: user._id.toString(),
      admin: Boolean(user.admin),
      upgraded: Boolean(user.guest || user.temporary),
    });

    return apiJson(
      {
        success: true,
        admin: Boolean(user.admin),
        guest: false,
        next: user.admin ? "/dashboard" : "/tickets",
      },
      200
    );
  } catch (error) {
    console.error("Error during sign in:", error);
    return apiJson({ success: false, message: "Something went wrong." }, 500);
  }
}
