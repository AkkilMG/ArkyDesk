import { decrypt } from "@/lib/crypto";
import { getMongoClient } from "@/lib/mongodb";
import { decryptSession } from "@/lib/session";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";
import { NextResponse } from 'next/server';


export const dynamic = 'force-dynamic';

// export const runtime = "edge";


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ticketId = searchParams.get('ticketId');
  if (!ticketId) {
    return NextResponse.json({ success: false, message: "ticketId is required." }, {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

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
      const data = await decrypt(decryptedSession.token);
      const db = await getMongoClient();
      const check = await db.collection('users').findOne({ _id: new ObjectId(data) });
      if (!check) {
        return NextResponse.json({ success: false, message: "Invalid session token." }, {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      const ticket = await db.collection('tickets').findOne({ _id: new ObjectId(ticketId) });
      if (!ticket) {
        return NextResponse.json({ success: false, message: "Invalid ticket id." }, {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      const comments = await db.collection('comments').find({ 
        ticket: new ObjectId(ticketId) 
      }).sort({ createdAt: 1 }).toArray();
      
      if (!comments || comments.length === 0) {
        return NextResponse.json({ success: true, comments: [] }, {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Batch fetch user data for better performance
      const userIds = Array.from(new Set(comments.map(comment => comment.user)));
      const users = await db.collection('users').find(
        { _id: { $in: userIds.map(id => new ObjectId(id)) } },
        { projection: { name: 1, _id: 1 } }
      ).toArray();
      
      const userMap = users.reduce((acc, user) => {
        acc[user._id.toString()] = user;
        return acc;
      }, {} as any);

      // Attach user data to comments more efficiently
      const commentsWithUsers = comments.map(comment => ({
        ...comment,
        user: userMap[comment.user] || null,
        createdAt: new Date(comment.createdAt).toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        })
      }));
      return NextResponse.json({ success: true, comments: commentsWithUsers }, {
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
    // Parse the request body
    const body = await request.json();
    const { z } = await import('zod');
    const schema = z.object({ comment: z.string().min(1).max(2000), ticketId: z.string().min(1) });
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, message: 'Invalid input' }, { status: 400 });
    }
    const { comment, ticketId } = parsed.data;
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
    if (!decryptedSession) {
      return NextResponse.json({ success: false, message: "failed to fetch." }, {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    if (decryptedSession && typeof decryptedSession.token === 'string') {
      const data = await decrypt(decryptedSession.token);
      const user = await db.collection('users').findOne({ _id: new ObjectId(data) });
      if (!user) {
        return NextResponse.json({ success: false, message: "Invalid session token." }, {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      if (user.guest || user.temporary) {
        return NextResponse.json({ success: false, message: "Guest accounts cannot comment." }, {
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      const ticket = await db.collection('tickets').findOne({ _id: new ObjectId(ticketId) });
      if (!ticket) {
        return NextResponse.json({ success: false, message: "Invalid ticket id." }, {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      if (ticket.status === 'closed') {
        return NextResponse.json({ success: false, message: "Ticket is closed." }, {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      // Use countDocuments for better performance instead of loading all comments
      const commentCount = await db.collection('comments').countDocuments({ 
        ticket: new ObjectId(ticketId) 
      });
      
      const result = await db.collection('comments').insertOne({
        comment: comment,
        ticket: new ObjectId(ticketId),
        user: data,
        order: commentCount + 1,
        createdAt: new Date(),
      });
      if (!result) {
         return NextResponse.json({ success: false, message: 'Invalid id' }, {
             status: 401,
             headers: { 'Content-Type': 'application/json' }
         });
      }

      // Broadcast real-time update
      try {
        const { broadcastCommentUpdate } = await import('@/lib/realtime');
        await broadcastCommentUpdate(ticketId, result.insertedId.toString(), 'created');
      } catch (error) {
        console.error('Error broadcasting comment update:', error);
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
