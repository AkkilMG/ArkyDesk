import { createHash } from "crypto";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

import { getMongoClient } from "@/lib/mongodb";
import { encryptSession, SESSION_TTL_MS, setSessionCookie } from "@/lib/session";
import { encrypt } from "@/lib/crypto";
import { logSecurityEvent } from "@/lib/security-log";

export const dynamic = "force-dynamic";

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

/**
 * Consumes a guest magic link and establishes a session.
 *
 * The token is claimed with an atomic `findOneAndUpdate` on `used: false`, so
 * two simultaneous clicks on the same link cannot both succeed, and the cookie
 * is written through the shared `setSessionCookie` helper so its `Secure` /
 * `SameSite` attributes cannot drift from the ones used at sign-in.
 */
export async function GET(
  request: Request,
  { params }: { params: { token: string } }
) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || new URL(request.url).origin;

  try {
    const token = decodeURIComponent(params.token || "");

    if (!token) {
      return NextResponseRedirect(baseUrl, "/signin?guestLogin=invalid");
    }

    const db = await getMongoClient();

    const tokenDoc = await db.collection("guest_login_tokens").findOneAndUpdate(
      { tokenHash: hashToken(token), used: false, expiresAt: { $gt: new Date() } },
      { $set: { used: true, usedAt: new Date() } },
      { returnDocument: "after" }
    );

    if (!tokenDoc) {
      return NextResponseRedirect(baseUrl, "/signin?guestLogin=invalid");
    }

    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(tokenDoc.userId) });

    if (!user) {
      return NextResponseRedirect(baseUrl, "/signin?guestLogin=invalid");
    }

    // Refuse to mint a session for a record that has been promoted to a real
    // account in the meantime — that user must use their password.
    if (!user.guest && !user.temporary) {
      return NextResponseRedirect(baseUrl, "/signin?guestLogin=upgraded");
    }

    const expiresAt = new Date(Date.now() + SESSION_TTL_MS);
    const session = await encryptSession({
      token: await encrypt(user._id.toString()),
      expiresAt,
    });

    setSessionCookie(session, expiresAt);

    logSecurityEvent("auth.guest_link_consumed", {
      userId: user._id.toString(),
      flow: "guest_magic_link",
    });

    return NextResponseRedirect(baseUrl, "/tickets?guest=1");
  } catch (error) {
    console.error("guest login consume error", error);
    return NextResponseRedirect(baseUrl, "/signin?guestLogin=error");
  }
}

function NextResponseRedirect(baseUrl: string, path: string) {
  return NextResponse.redirect(new URL(path, baseUrl));
}
