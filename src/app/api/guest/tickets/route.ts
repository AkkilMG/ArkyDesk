import { NextResponse } from "next/server";
import { z } from "zod";

import { getMongoClient } from "@/lib/mongodb";
import { checkRateLimit, clientIp, RATE_LIMITS } from "@/lib/rate-limit";
import { logSecurityEvent } from "@/lib/security-log";
import { apiJson } from "@/lib/api-auth";

export const dynamic = "force-dynamic";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().toLowerCase().email().max(254),
  subject: z.string().trim().min(3).max(200),
  description: z.string().trim().min(10).max(5000),
  problem: z.enum(["crash", "copyright"]),
});

/**
 * Anonymous ticket intake.
 *
 * This is the only intentionally unauthenticated write endpoint, reachable from
 * `/guest-report`, so it carries the heaviest rate limiting of the write paths.
 */
export async function POST(request: Request) {
  try {
    const ip = clientIp(request);
    const limit = checkRateLimit(`guestticket:${ip}`, RATE_LIMITS.guestTicket);
    if (!limit.allowed) {
      logSecurityEvent("auth.rate_limited", { flow: "guest_ticket" });
      return apiJson({ success: false, message: "Too many submissions. Please try again later." }, 429);
    }

    const parsed = schema.safeParse(await request.json().catch(() => ({})));
    if (!parsed.success) {
      return apiJson({ success: false, message: "Invalid input." }, 400);
    }

    const { name, email, subject, description, problem } = parsed.data;

    const db = await getMongoClient();
    const result = await db.collection("tickets").insertOne({
      subject,
      description,
      problem: problem.toLowerCase(),
      product: "guest",
      user: "guest",
      guestName: name,
      guestEmail: email,
      status: "open",
      createdAt: new Date(),
    });

    try {
      const { broadcastTicketUpdate } = await import("@/lib/realtime");
      await broadcastTicketUpdate(result.insertedId.toString(), "created");
    } catch (error) {
      console.error("guest ticket broadcast failed", error);
    }

    return apiJson(
      { success: true, ticketId: result.insertedId.toString() },
      201
    );
  } catch (error) {
    console.error("guest ticket error", error);
    return apiJson({ success: false, message: "Server error" }, 500);
  }
}
