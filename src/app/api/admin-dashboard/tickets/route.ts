import { ObjectId } from "mongodb";
import { z } from "zod";

import { getMongoClient } from "@/lib/mongodb";
import { requireApiAdmin, apiJson } from "@/lib/api-auth";

export const dynamic = "force-dynamic";

/** Every ticket, with the real creator resolved from the users collection. */
export async function GET() {
  const auth = await requireApiAdmin();
  if (!auth.ok) return auth.response;

  try {
    const db = await getMongoClient();

    const tickets = await db
      .collection("tickets")
      .find({})
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray();

    if (tickets.length === 0) {
      return apiJson({ success: true, tickets: [] }, 200);
    }

    // Resolve creators in a single batched query rather than per ticket.
    const userIds = Array.from(
      new Set(
        tickets
          .map((ticket) => {
            const value = ticket.user as unknown;
            if (value && typeof value === "object" && "_id" in value) {
              return String((value as { _id: unknown })._id);
            }
            return String(value);
          })
          .filter((id) => /^[0-9a-fA-F]{24}$/.test(id))
      )
    );

    const users = await db
      .collection("users")
      .find(
        { _id: { $in: userIds.map((id) => new ObjectId(id)) } },
        { projection: { name: 1, email: 1 } }
      )
      .toArray();

    const userMap = new Map(users.map((user) => [user._id.toString(), user]));

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const ticketData = tickets.map((ticket) => {
      const value = ticket.user as unknown;
      const userId =
        value && typeof value === "object" && "_id" in value
          ? String((value as { _id: unknown })._id)
          : String(value);
      const creator = userMap.get(userId);

      const tags = [ticket.product, ticket.status, ticket.problem];
      if (new Date(ticket.createdAt) < oneWeekAgo) tags.push("ignore");

      return {
        _id: ticket._id.toString(),
        user: creator?.name ?? "Unknown User",
        email: creator?.email ?? "",
        subject: ticket.subject,
        description: ticket.description,
        attachment: ticket.attachment,
        files: ticket.files,
        createdAt: ticket.createdAt,
        tags,
        status: ticket.status,
      };
    });

    return apiJson({ success: true, tickets: ticketData }, 200);
  } catch (error) {
    console.error("Error fetching admin tickets:", error);
    return apiJson({ success: false, message: "Internal server error." }, 500);
  }
}

const closeSchema = z.object({
  ticketId: z.string().min(1).max(64),
});

/** Closes a ticket. Administrator-only. */
export async function POST(request: Request) {
  const auth = await requireApiAdmin();
  if (!auth.ok) return auth.response;

  try {
    const parsed = closeSchema.safeParse(await request.json().catch(() => ({})));
    if (!parsed.success || !ObjectId.isValid(parsed.data.ticketId)) {
      return apiJson({ success: false, message: "Invalid ticket id." }, 400);
    }

    const { ticketId } = parsed.data;
    const db = await getMongoClient();

    const result = await db
      .collection("tickets")
      .updateOne(
        { _id: new ObjectId(ticketId) },
        { $set: { status: "closed", closedAt: new Date(), closedBy: auth.user.id } }
      );

    if (result.matchedCount === 0) {
      return apiJson({ success: false, message: "Ticket not found." }, 404);
    }

    try {
      const { broadcastTicketUpdate } = await import("@/lib/realtime");
      await broadcastTicketUpdate(ticketId, "status_changed");
    } catch (error) {
      console.error("Error broadcasting ticket status update:", error);
    }

    return apiJson({ success: true }, 200);
  } catch (error) {
    console.error("Error closing ticket:", error);
    return apiJson({ success: false, message: "Internal server error." }, 500);
  }
}
