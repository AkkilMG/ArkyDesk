import { decrypt } from "@/lib/crypto";
import { getMongoClient } from "@/lib/mongodb";
import { decryptSession } from "@/lib/session";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = "edge";

// Submit user action request (flag, admin, delete)
export async function POST(request: Request) {
  try {
    const sessionCookie = cookies().get('session');
    if (!sessionCookie) {
      return NextResponse.json({ 
        success: false, 
        message: "Not authenticated" 
      }, { status: 401 });
    }

    const session = sessionCookie.value;
    const decryptedSession = await decryptSession(session);
    if (!decryptedSession || typeof decryptedSession.token !== 'string') {
      return NextResponse.json({ 
        success: false, 
        message: "Invalid session" 
      }, { status: 401 });
    }

    const adminId = await decrypt(decryptedSession.token);
    if (!adminId) {
      return NextResponse.json({ 
        success: false, 
        message: "Invalid user token" 
      }, { status: 401 });
    }

    const { userId, action, reason } = await request.json();

    if (!userId || !action || !['flag', 'admin', 'delete'].includes(action)) {
      return NextResponse.json({ 
        success: false, 
        message: "Invalid request parameters" 
      }, { status: 400 });
    }

    const db = await getMongoClient();
    
    // Verify requesting user is admin
    const currentUser = await db.collection('users').findOne({ _id: new ObjectId(adminId) });
    if (!currentUser || !currentUser.admin) {
      return NextResponse.json({ 
        success: false, 
        message: "Access denied. Admin privileges required." 
      }, { status: 403 });
    }

    // Verify target user exists
    const targetUser = await db.collection('users').findOne({ _id: new ObjectId(userId) });
    if (!targetUser) {
      return NextResponse.json({ 
        success: false, 
        message: "Target user not found" 
      }, { status: 404 });
    }

    // Prevent actions on other admins (except self-actions for testing)
    if (targetUser.admin && targetUser._id.toString() !== adminId) {
      return NextResponse.json({ 
        success: false, 
        message: "Cannot perform actions on other administrators" 
      }, { status: 403 });
    }

    // Create action request
    const actionRequest = {
      userId: new ObjectId(userId),
      action,
      reason: reason || '',
      status: 'pending',
      requestedBy: new ObjectId(adminId),
      requestedAt: new Date(),
      user: {
        _id: targetUser._id,
        name: targetUser.name,
        email: targetUser.email
      }
    };

    const result = await db.collection('userActions').insertOne(actionRequest);

    if (!result.insertedId) {
      return NextResponse.json({ 
        success: false, 
        message: "Failed to create action request" 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Action request submitted successfully" 
    });

  } catch (error) {
    console.error('Error creating user action:', error);
    return NextResponse.json({ 
      success: false, 
      message: "Internal server error" 
    }, { status: 500 });
  }
}
