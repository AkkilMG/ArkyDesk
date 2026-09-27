import { NextRequest } from "next/server";
import { z } from "zod";

import { getMongoClient } from "@/lib/mongodb";
import { requireApiAdmin, apiJson } from "@/lib/api-auth";
import { logSecurityEvent } from "@/lib/security-log";

export const dynamic = "force-dynamic";

const messageSchema = z.object({
  message: z.string().trim().min(1).max(2000),
});

/**
 * Admin-to-admin support chat.
 *
 * SECURITY FIX — broken access control (ISO 27001:2022 A.8.2 / A.8.3):
 * this route previously took a `userId` from the query string or request body
 * and looked that user up with `{ admin: true }`. Authorisation therefore
 * depended on nothing but the caller's word: anybody who guessed or scraped an
 * administrator's id could read the whole support conversation and post as that
 * administrator. The identity is now taken exclusively from the session cookie.
 */

/** In-memory presence registry. Per-isolate on Cloudflare Workers — presence is best-effort. */
const connections = new Map<string, { userId: string; adminInfo: { name: string; email: string } }>();

export async function GET(request: NextRequest) {
  const auth = await requireApiAdmin();
  if (!auth.ok) return auth.response;

  try {
    const db = await getMongoClient();
    const connectionId = request.nextUrl.searchParams.get("connectionId") ?? Date.now().toString();

    connections.set(connectionId, {
      userId: auth.user.id,
      adminInfo: { name: auth.user.name, email: auth.user.email },
    });

    const messages = await db
      .collection("adminChat")
      .find({})
      .sort({ timestamp: -1 })
      .limit(50)
      .toArray();

    return apiJson(
      {
        type: "init",
        messages: messages.reverse(),
        onlineAdmins: Array.from(connections.values()).map((conn) => conn.adminInfo),
      },
      200
    );
  } catch (error) {
    console.error("Chat API error:", error);
    return apiJson({ success: false, message: "Internal server error" }, 500);
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireApiAdmin();
  if (!auth.ok) return auth.response;

  try {
    const parsed = messageSchema.safeParse(await request.json().catch(() => ({})));
    if (!parsed.success) {
      return apiJson({ success: false, message: "Message is required." }, 400);
    }

    const db = await getMongoClient();

    const chatMessage = {
      message: parsed.data.message,
      sender: { _id: auth.user.id, name: auth.user.name },
      timestamp: new Date(),
      type: "message",
    };

    const result = await db.collection("adminChat").insertOne(chatMessage);

    return apiJson(
      {
        success: true,
        message: { ...chatMessage, _id: result.insertedId.toString() },
      },
      201
    );
  } catch (error) {
    console.error("Chat message error:", error);
    return apiJson({ success: false, message: "Internal server error" }, 500);
  }
}
