import { decrypt } from "@/lib/crypto";
import { getMongoClient } from "@/lib/mongodb";
import { decryptSession } from "@/lib/session";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export const runtime = "edge";

export async function PUT(request: Request) {
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
    if (!decryptedSession) {
      return NextResponse.json({ 
        success: false, 
        message: "Invalid session" 
      }, { status: 401 });
    }

    if (typeof decryptedSession.token !== 'string') {
      return NextResponse.json({ 
        success: false, 
        message: "Invalid session token" 
      }, { status: 401 });
    }

    const userId = await decrypt(decryptedSession.token);
    if (!userId) {
      return NextResponse.json({ 
        success: false, 
        message: "Invalid user token" 
      }, { status: 401 });
    }

    const { name } = await request.json();

    // Validate input
    if (!name || typeof name !== 'string') {
      return NextResponse.json({ 
        success: false, 
        message: "Name is required and must be a string" 
      }, { status: 400 });
    }

    const trimmedName = name.trim();
    if (trimmedName.length < 1 || trimmedName.length > 100) {
      return NextResponse.json({ 
        success: false, 
        message: "Name must be between 1 and 100 characters" 
      }, { status: 400 });
    }

    // Connect to database
    const db = await getMongoClient();
    
    // Verify user exists
    const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return NextResponse.json({ 
        success: false, 
        message: "User not found" 
      }, { status: 404 });
    }

    // Update user name
    const result = await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      { 
        $set: { 
          name: trimmedName,
          updatedAt: new Date()
        } 
      }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ 
        success: false, 
        message: "Failed to update profile" 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Profile updated successfully" 
    });

  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ 
      success: false, 
      message: "Internal server error" 
    }, { status: 500 });
  }
}
