import { decrypt } from "@/lib/crypto";
import { getMongoClient } from "@/lib/mongodb";
import { decryptSession } from "@/lib/session";
import { connections } from "@/lib/realtime";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = "edge";

export async function GET(request: Request) {
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
    const db = await getMongoClient();
    const check = await db.collection('users').findOne({ _id: new ObjectId(data) });
    
    if (!check) {
      return NextResponse.json({ success: false, message: "Invalid session token." }, {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Create SSE response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        // Store connection
        const connectionId = Date.now().toString();
        connections.set(connectionId, {
          controller,
          userId: data,
          isAdmin: check.admin || false
        });

        // Send initial connection success
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({
          type: 'connected',
          message: 'Real-time connection established'
        })}\n\n`));

        // Set up periodic heartbeat to keep connection alive
        const heartbeat = setInterval(() => {
          try {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({
              type: 'heartbeat',
              timestamp: Date.now()
            })}\n\n`));
          } catch (error) {
            clearInterval(heartbeat);
            connections.delete(connectionId);
          }
        }, 30000);

        // Clean up on close
        request.signal.addEventListener('abort', () => {
          clearInterval(heartbeat);
          connections.delete(connectionId);
          try {
            controller.close();
          } catch (error) {
            // Connection already closed
          }
        });
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Cache-Control'
      }
    });
  }

  return NextResponse.json({ success: false, message: "Invalid session token." }, {
    status: 401,
    headers: { 'Content-Type': 'application/json' }
  });
}
