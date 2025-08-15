import { getMongoClient } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// Store active SSE connections
export const connections = new Map();

// Function to broadcast updates to all connected clients
export async function broadcastTicketUpdate(ticketId: string, updateType: 'created' | 'updated' | 'deleted' | 'status_changed') {
  const db = await getMongoClient();
  const encoder = new TextEncoder();
  
  try {
    // Get updated ticket data
    const ticket = await db.collection('tickets').findOne({ _id: new ObjectId(ticketId) });
    if (!ticket) return;

    // Get user info for the ticket
    const user = await db.collection('users').findOne({ _id: new ObjectId(ticket.user) });
    
    // Format ticket data
    const currentDate = new Date();
    ticket.tags = [ticket.product, ticket.status, ticket.problem];
    const createdAt = new Date(ticket.createdAt);
    const oneWeekAgo = new Date(currentDate);
    oneWeekAgo.setDate(currentDate.getDate() - 7);
    if (createdAt < oneWeekAgo) {
      ticket.tags.push('ignore');
    }

    const ticketData = {
      _id: ticket._id.toString(),
      user: user?.name || 'Unknown User',
      subject: ticket.subject,
      description: ticket.description,
      attachment: ticket.attachment,
      files: ticket.files,
      createdAt: ticket.createdAt,
      tags: ticket.tags,
      status: ticket.status,
    };

    // Broadcast to all connected clients
    const message = {
      type: 'ticket_update',
      updateType,
      ticket: ticketData,
      ticketId: ticketId,
      timestamp: Date.now()
    };

    connections.forEach((connection, connectionId) => {
      try {
        // Send to admins for all tickets, send to users only for their own tickets
        if (connection.isAdmin || connection.userId === ticket.user) {
          connection.controller.enqueue(encoder.encode(`data: ${JSON.stringify(message)}\n\n`));
        }
      } catch (error) {
        // Remove dead connections
        connections.delete(connectionId);
      }
    });
  } catch (error) {
    console.error('Error broadcasting ticket update:', error);
  }
}

// Function to broadcast comment updates
export async function broadcastCommentUpdate(ticketId: string, commentId: string, updateType: 'created' | 'updated' | 'deleted') {
  const db = await getMongoClient();
  const encoder = new TextEncoder();
  
  try {
    // Get updated comment data
    const comment = await db.collection('comments').findOne({ _id: new ObjectId(commentId) });
    if (!comment) return;

    // Get user info for the comment
    const user = await db.collection('users').findOne({ _id: new ObjectId(comment.user) });
    
    const commentData = {
      ...comment,
      user: user || null,
      createdAt: new Date(comment.createdAt).toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    // Get ticket to determine who should receive updates
    const ticket = await db.collection('tickets').findOne({ _id: new ObjectId(ticketId) });
    if (!ticket) return;

    const message = {
      type: 'comment_update',
      updateType,
      comment: commentData,
      ticketId: ticketId,
      timestamp: Date.now()
    };

    connections.forEach((connection, connectionId) => {
      try {
        // Send to admins for all comments, send to users only for their own tickets
        if (connection.isAdmin || connection.userId === ticket.user) {
          connection.controller.enqueue(encoder.encode(`data: ${JSON.stringify(message)}\n\n`));
        }
      } catch (error) {
        // Remove dead connections
        connections.delete(connectionId);
      }
    });
  } catch (error) {
    console.error('Error broadcasting comment update:', error);
  }
}
