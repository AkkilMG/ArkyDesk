import { NextRequest } from 'next/server';
import { getMongoClient } from "@/lib/mongodb";
import { decrypt } from "@/lib/crypto";
import { decryptSession } from "@/lib/session";
import { ObjectId } from "mongodb";

// In a real production environment, you'd use a proper WebSocket server
// For demo purposes, we'll create a simple polling-based API

export const dynamic = 'force-dynamic';

let connections: Map<string, { userId: string, adminInfo: any }> = new Map();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get('userId');
  const connectionId = searchParams.get('connectionId') || Date.now().toString();

  if (!userId) {
    return new Response('Missing userId', { status: 400 });
  }

  try {
    const db = await getMongoClient();
    
    // Verify user is admin
    const user = await db.collection('users').findOne({ 
      _id: new ObjectId(userId),
      admin: true 
    });

    if (!user) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Store connection
    connections.set(connectionId, { 
      userId, 
      adminInfo: { _id: user._id, name: user.name, email: user.email } 
    });

    // Get recent chat messages
    const messages = await db.collection('adminChat').find({})
      .sort({ timestamp: -1 })
      .limit(50)
      .toArray();

    // Get online admins
    const onlineAdmins = Array.from(connections.values()).map(conn => conn.adminInfo);

    return Response.json({
      type: 'init',
      messages: messages.reverse(),
      onlineAdmins
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return new Response('Internal server error', { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, message, type } = body;

    if (!userId || !message) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const db = await getMongoClient();
    
    // Verify user is admin
    const user = await db.collection('users').findOne({ 
      _id: new ObjectId(userId),
      admin: true 
    });

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Save message to database
    const chatMessage = {
      message: message.trim(),
      sender: {
        _id: user._id.toString(),
        name: user.name
      },
      timestamp: new Date(),
      type: 'message'
    };

    const result = await db.collection('adminChat').insertOne(chatMessage);

    return Response.json({
      success: true,
      message: {
        ...chatMessage,
        _id: result.insertedId.toString()
      }
    });

  } catch (error) {
    console.error('Chat message error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
