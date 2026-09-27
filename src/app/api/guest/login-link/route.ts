import { NextResponse } from "next/server";
import { z } from "zod";
import { randomBytes, createHash } from "crypto";

import { getMongoClient } from "@/lib/mongodb";
import { sendGuestLoginLinkEmail } from "@/lib/email";
import { checkRateLimit, clientIp, RATE_LIMITS } from "@/lib/rate-limit";
import { logSecurityEvent } from "@/lib/security-log";
import { apiJson } from "@/lib/api-auth";

export const dynamic = "force-dynamic";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().toLowerCase().email().max(254),
});

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

/**
 * Issues a single-use magic link that signs a visitor into a guest workspace.
 *
 * SECURITY FIXES:
 *  - The `loginUrl` was included in the JSON response, leaking a live
 *    authentication link to anything that could read the response body
 *    (browser extensions, proxies, client-side error reporting). It is now only
 *    ever delivered by email; `sent` reports whether delivery succeeded.
 *  - The raw token is stored hashed, so the `guest_login_tokens` collection
 *    cannot be used to impersonate a guest.
 */
export async function POST(request: Request) {
  try {
    const ip = clientIp(request);
    const ipLimit = checkRateLimit(
      `guestlink:ip:${ip}`,
      RATE_LIMITS.guestLoginLink
    );
    if (!ipLimit.allowed) {
      logSecurityEvent("auth.rate_limited", { flow: "guest_login_link" });
      return apiJson({ success: false, message: "Too many requests." }, 429);
    }

    const parsed = schema.safeParse(await request.json().catch(() => ({})));
    if (!parsed.success) {
      return apiJson({ success: false, message: "Invalid input." }, 400);
    }

    const { name, email } = parsed.data;

    const emailLimit = checkRateLimit(`guestlink:email:${email}`, {
      max: 3,
      windowMs: 60 * 60 * 1000,
    });
    if (!emailLimit.allowed) {
      return apiJson(
        { success: false, message: "A link was already sent recently. Please check your inbox." },
        429
      );
    }

    const db = await getMongoClient();
    const user = await db.collection("users").findOne({ email });

    let userId: string;

    if (!user) {
      const created = await db.collection("users").insertOne({
        name,
        email,
        temporary: true,
        guest: true,
        password: null,
        createdAt: new Date(),
      });
      userId = created.insertedId.toString();
    } else if (user.guest || user.temporary) {
      // Refresh the guest profile, but never downgrade a registered account.
      await db.collection("users").updateOne(
        { _id: user._id },
        { $set: { name, temporary: true, guest: true, updatedAt: new Date() } }
      );
      userId = user._id.toString();
    } else {
      // A registered account already exists for this address. Do not issue a
      // guest link — it would be a privilege-escalation path into someone
      // else's account. Point them at the normal sign-in instead.
      return apiJson(
        {
          success: true,
          sent: false,
          message:
            "An account already exists for this address. Please sign in, or reset your password if you have forgotten it.",
          existingAccount: true,
        },
        200
      );
    }

    const rawToken = randomBytes(32).toString("hex");
    await db.collection("guest_login_tokens").insertOne({
      userId,
      tokenHash: hashToken(rawToken),
      expiresAt: new Date(Date.now() + 60 * 60 * 1000),
      used: false,
      createdAt: new Date(),
    });

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL || "http://localhost:3000";
    const sent = await sendGuestLoginLinkEmail(
      name,
      email,
      `${baseUrl}/api/guest/login-link/${rawToken}`
    );

    if (sent) {
      logSecurityEvent("auth.guest_link_issued", { userId });
    } else {
      console.warn("Guest login email not sent — SMTP not configured or delivery failed.");
    }

    return apiJson(
      {
        success: true,
        sent,
        message: sent
          ? "Check your inbox — your login link is on its way."
          : "Your link was created but we could not send the email. Please contact support.",
      },
      201
    );
  } catch (error) {
    console.error("guest login link error", error);
    return apiJson({ success: false, message: "Server error" }, 500);
  }
}
