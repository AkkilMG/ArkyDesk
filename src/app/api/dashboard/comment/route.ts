import { ObjectId } from "mongodb";
import { z } from "zod";

import { getMongoClient } from "@/lib/mongodb";
import {
  requireApiUser,
  requireApiRegisteredUser,
  apiJson,
} from "@/lib/api-auth";

export const dynamic = "force-dynamic";

/**
 * A caller may read a ticket's thread when they own it or are an administrator.
 * Guests may read threads on tickets they own, so a guest can still follow their
 * own conversation.
 *
 * `status` is part of the projection because the POST path below refuses to
 * comment on a closed ticket. Omitting it made that guard unreachable: the
 * field was always `undefined` and the check silently passed forever.
 */
async function assertCanAccessTicket(userId: string, isAdmin: boolean, ticketId: string) {
  const db = await getMongoClient();
  const ticket = await db
    .collection("tickets")
    .findOne(
      { _id: new ObjectId(ticketId) },
      { projection: { user: 1, status: 1 } }
    );

  if (!ticket) return { ok: false as const, status: 404 as const, ticket: null };

  const ownerId =
    ticket.user && typeof ticket.user === "object" && "_id" in (ticket.user as object)
      ? String((ticket.user as { _id: unknown })._id)
      : String(ticket.user);

  if (!isAdmin && ownerId !== userId) {
    return { ok: false as const, status: 403 as const, ticket };
  }

  return { ok: true as const, status: 200 as const, ticket };
}

/**
 * SECURITY FIX — horizontal privilege escalation (ISO 27001:2022 A.8.3):
 * this endpoint previously fetched the ticket by id alone and returned its whole
 * comment thread, so any signed-in user could read every other customer's support
 * conversation by editing `ticketId`. Access is now checked against the ticket
 * owner or an administrator flag taken from the session.
 */
export async function GET(request: Request) {
  const auth = await requireApiUser();
  if (!auth.ok) return auth.response;

  const ticketId = new URL(request.url).searchParams.get("ticketId");
  if (!ticketId || !ObjectId.isValid(ticketId)) {
    return apiJson({ success: false, message: "A valid ticketId is required." }, 400);
  }

  try {
    const access = await assertCanAccessTicket(auth.user.id, auth.user.admin, ticketId);
    if (!access.ok) {
      return apiJson(
        access.status === 404
          ? { success: false, message: "Ticket not found." }
          : { success: false, message: "Access denied." },
        access.status
      );
    }

    const db = await getMongoClient();
    const comments = await db
      .collection("comments")
      .find({ ticket: new ObjectId(ticketId) })
      .sort({ createdAt: 1 })
      .toArray();

    if (comments.length === 0) {
      return apiJson({ success: true, comments: [] }, 200);
    }

    // Resolve comment authors in one batched query.
    const authorIds = Array.from(
      new Set(
        comments
          .map((comment) => comment.user)
          .filter((id): id is string => typeof id === "string")
          .filter((id) => ObjectId.isValid(id))
      )
    );

    const authors = await db
      .collection("users")
      .find(
        { _id: { $in: authorIds.map((id) => new ObjectId(id)) } },
        { projection: { name: 1 } }
      )
      .toArray();

    const nameMap = new Map(authors.map((a) => [a._id.toString(), a.name]));

    const commentsWithUsers = comments.map((comment) => ({
      ...comment,
      user: { name: nameMap.get(String(comment.user)) ?? "Unknown" },
      createdAt: new Date(comment.createdAt).toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));

    return apiJson({ success: true, comments: commentsWithUsers }, 200);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return apiJson({ success: false, message: "Internal server error." }, 500);
  }
}

const createSchema = z.object({
  comment: z.string().trim().min(1).max(2000),
  ticketId: z.string().min(1).max(64),
});

/** Posts a comment. Guests are refused; ownership is enforced. */
export async function POST(request: Request) {
  const auth = await requireApiRegisteredUser();
  if (!auth.ok) return auth.response;

  try {
    const parsed = createSchema.safeParse(await request.json().catch(() => ({})));
    if (!parsed.success || !ObjectId.isValid(parsed.data.ticketId)) {
      return apiJson({ success: false, message: "Invalid input." }, 400);
    }

    const { comment, ticketId } = parsed.data;
    const db = await getMongoClient();

    const access = await assertCanAccessTicket(auth.user.id, auth.user.admin, ticketId);
    if (!access.ok) {
      return apiJson(
        access.status === 404
          ? { success: false, message: "Ticket not found." }
          : { success: false, message: "Access denied." },
        access.status
      );
    }

    // Re-read the status from the projected document rather than trusting a
    // cast, so a closed ticket can never be commented on.
    if (access.ticket?.status === "closed") {
      return apiJson({ success: false, message: "This ticket is closed." }, 409);
    }

    const commentCount = await db
      .collection("comments")
      .countDocuments({ ticket: new ObjectId(ticketId) });

    const result = await db.collection("comments").insertOne({
      comment,
      ticket: new ObjectId(ticketId),
      user: auth.user.id,
      order: commentCount + 1,
      createdAt: new Date(),
    });

    try {
      const { broadcastCommentUpdate } = await import("@/lib/realtime");
      await broadcastCommentUpdate(ticketId, result.insertedId.toString(), "created");
    } catch (error) {
      console.error("Error broadcasting comment update:", error);
    }

    return apiJson({ success: true, commentId: result.insertedId.toString() }, 201);
  } catch (error) {
    console.error("Error creating comment:", error);
    return apiJson({ success: false, message: "Internal server error." }, 500);
  }
}
