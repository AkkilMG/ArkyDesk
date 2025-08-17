import { decrypt } from "@/lib/crypto";
import { getMongoClient } from "@/lib/mongodb";
import { decryptSession } from "@/lib/session";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';


export async function GET(request: Request) {
  const sessionCookie = cookies().get('session');
  if (sessionCookie) {
    const session = sessionCookie.value;
    const decryptedSession = await decryptSession(session);
    if (!decryptedSession) {
      return NextResponse.json({ success: false, message: "failed to fetch." }, {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    if (decryptedSession && typeof decryptedSession.token === 'string') {
      var data = await decrypt(decryptedSession.token);
      const db = await getMongoClient();
      const check = await db.collection('users').findOne({ _id: new ObjectId(data) });
      if (!check) {
        return NextResponse.json({ success: false, message: "Invalid session token." }, {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      if (!check.admin) {
        return NextResponse.json({ success: false, message: "Access denied. Admin privileges required." }, {
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      // Admin sees all tickets, not just their own - this was a major bug
      const tickets = await db.collection('tickets').find({})
        .sort({ createdAt: -1 })
        .limit(100) // Add pagination for performance
        .toArray();
      
      // Get all unique user IDs from tickets
      const userIds = Array.from(new Set(tickets.map(ticket => ticket.user)));
      
      // Batch fetch user data for better performance
      const users = await db.collection('users').find(
        { _id: { $in: userIds.map(id => new ObjectId(id)) } },
        { projection: { name: 1, _id: 1 } }
      ).toArray();
      
      const userMap = users.reduce((acc, user) => {
        acc[user._id.toString()] = user;
        return acc;
      }, {} as any);

      const currentDate = new Date();
      tickets.forEach(ticket => {
        ticket.tags = [ticket.product, ticket.status, ticket.problem];
        const createdAt = new Date(ticket.createdAt);
        const oneWeekAgo = new Date(currentDate);
        oneWeekAgo.setDate(currentDate.getDate() - 7);
        if (createdAt < oneWeekAgo) {
          ticket.tags.push('ignore');
        }
      });
      if (!tickets) {
        return NextResponse.json({ success: false, message: "No tickets found." }, {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      const ticketData = tickets.map(ticket => {
        const ticketUser = userMap[ticket.user] || null;
        return {
          _id: ticket._id.toString(),
          user: ticketUser?.name || 'Unknown User', // Show actual ticket creator, not admin
          subject: ticket.subject,
          description: ticket.description,
          attachment: ticket.attachment,
          files: ticket.files,
          createdAt: ticket.createdAt,
          tags: ticket.tags,
          status: ticket.status,
        };
      });
      return NextResponse.json({ success: true, tickets: ticketData }, {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      console.log('Invalid decrypted session or token');
      return NextResponse.json({ success: false, message: "Invalid session token." }, {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
  } else {
    console.log('No session cookie found');
    return NextResponse.json({success: false, message: "User has not logged in."}, {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
  
export async function POST(request: Request) {
  const body = await request.json();
  const { ticketId } = body;
  const db = await getMongoClient();
  const sessionCookie = cookies().get('session');
  if (!sessionCookie) {
    return NextResponse.json({ success: false, message: "User session is not available." }, {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  const session = sessionCookie.value;
  const decryptedSession = await decryptSession(session);
  if (!decryptSession) {
    return NextResponse.json({ success: false, message: "failed to fetch." }, {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  if (decryptedSession && typeof decryptedSession.token === 'string') {
    var data = await decrypt(decryptedSession.token);
    var user = await db.collection('users').findOne({ _id: new ObjectId(data) });
    if (!user) {
      return NextResponse.json({ success: false, message: "Invalid session token." }, {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!user.admin) {
      return NextResponse.json({ success: false, message: "User is not an admin." }, {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    await db.collection('tickets').updateOne({ _id: new ObjectId(ticketId) }, { $set: { status: 'closed' } });

    // Broadcast real-time update
    try {
      const { broadcastTicketUpdate } = await import('@/lib/realtime');
      await broadcastTicketUpdate(ticketId, 'status_changed');
    } catch (error) {
      console.error('Error broadcasting ticket status update:', error);
    }

    return NextResponse.json({ success: true }, {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } else {
    return NextResponse.json({ success: false, message: "Invalid session token." }, {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

