import { z } from "zod";

import { getMongoClient } from "@/lib/mongodb";
import {
  requireApiUser,
  requireApiRegisteredUser,
  apiJson,
} from "@/lib/api-auth";

export const dynamic = "force-dynamic";

/**
 * Ticket listing.
 *
 * Administrators see the open queue; everybody else sees only their own
 * tickets, filtered by the caller's id taken from the session — never from a
 * request parameter, so one user cannot read another's history by editing a
 * query string.
 */
export async function GET() {
  const auth = await requireApiUser();
  if (!auth.ok) return auth.response;

  try {
    const db = await getMongoClient();
    const { user } = auth;

    const tickets = user.admin
      ? await db
          .collection("tickets")
          .find({ status: { $in: ["open", "ignore"] } })
          .sort({ createdAt: -1 })
          .limit(100)
          .toArray()
      : await db
          .collection("tickets")
          .find({ user: user.id })
          .sort({ createdAt: -1 })
          .limit(50)
          .toArray();

    if (tickets.length === 0) {
      return apiJson({ success: true, tickets: [] }, 200);
    }

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const ticketData = tickets.map((ticket) => {
      const createdAt = new Date(ticket.createdAt);
      const tags = [ticket.product, ticket.status, ticket.problem];
      if (createdAt < oneWeekAgo) tags.push("ignore");

      return {
        _id: ticket._id.toString(),
        user: user.name,
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
    console.error("Error fetching tickets:", error);
    return apiJson({ success: false, message: "Internal server error." }, 500);
  }
}

const createSchema = z.object({
  subject: z.string().trim().min(3).max(200),
  description: z.string().trim().min(10).max(10000),
  attachment: z.array(z.any()).optional(),
  problem: z.string().min(1).max(100),
  product: z.string().min(1).max(100),
  files: z.any().optional(),
});

/**
 * Creates a ticket for the signed-in user.
 *
 * Guest sessions are refused with 403 and pointed at the anonymous intake
 * endpoint: a guest record has no password and its identity rests entirely on
 * a magic-link email, so it must not be able to open a full ticket record.
 */
export async function POST(request: Request) {
  const auth = await requireApiRegisteredUser();
  if (!auth.ok) return auth.response;

  try {
    const parsed = createSchema.safeParse(await request.json().catch(() => ({})));
    if (!parsed.success) {
      return apiJson({ success: false, message: "Invalid input." }, 400);
    }

    const { subject, description, attachment, problem, product, files } = parsed.data;
    const db = await getMongoClient();

    const result = await db.collection("tickets").insertOne({
      subject,
      description,
      attachment,
      problem: problem.toLowerCase(),
      product: product.toLowerCase(),
      user: auth.user.id,
      files,
      status: "open",
      createdAt: new Date(),
    });

    try {
      const { broadcastTicketUpdate } = await import("@/lib/realtime");
      await broadcastTicketUpdate(result.insertedId.toString(), "created");
    } catch (error) {
      console.error("Error broadcasting ticket update:", error);
    }

    return apiJson(
      { success: true, ticketId: result.insertedId.toString() },
      201
    );
  } catch (error) {
    console.error("Error creating ticket:", error);
    return apiJson({ success: false, message: "Internal server error." }, 500);
  }
}
