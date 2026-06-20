import { decrypt } from "@/lib/crypto";
import { getMongoClient } from "@/lib/mongodb";
import { decryptSession } from "@/lib/session";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const sessionCookie = cookies().get('session');
    if (!sessionCookie) {
      return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 });
    }

    const decryptedSession = await decryptSession(sessionCookie.value);
    if (!decryptedSession || typeof decryptedSession.token !== 'string') {
      return NextResponse.json({ success: false, message: "Invalid session" }, { status: 401 });
    }

    const userId = await decrypt(decryptedSession.token);
    if (!userId) {
      return NextResponse.json({ success: false, message: "Invalid user token" }, { status: 401 });
    }

    const db = await getMongoClient();
    const currentUser = await db.collection('users').findOne({ _id: new ObjectId(userId) });
    if (!currentUser || !currentUser.admin) {
      return NextResponse.json({ success: false, message: "Access denied" }, { status: 403 });
    }

    const totalUsers = await db.collection('users').countDocuments();
    const totalTickets = await db.collection('tickets').countDocuments();
    const openTickets = await db.collection('tickets').countDocuments({ status: 'open' });
    const closedTickets = await db.collection('tickets').countDocuments({ status: 'closed' });
    const pendingActions = await db.collection('userActions').countDocuments({ status: 'pending' });

    return NextResponse.json({
      success: true,
      stats: {
        totalUsers,
        totalTickets,
        openTickets,
        closedTickets,
        pendingActions,
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
