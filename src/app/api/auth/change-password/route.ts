import { decrypt, encryptCode, decryptCode } from "@/lib/crypto";
import { getMongoClient } from "@/lib/mongodb";
import { decryptSession } from "@/lib/session";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

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

    const { currentPassword, newPassword } = await request.json();

    // Validate input
    if (!currentPassword || !newPassword) {
      return NextResponse.json({ 
        success: false, 
        message: "Current password and new password are required" 
      }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ 
        success: false, 
        message: "New password must be at least 6 characters long" 
      }, { status: 400 });
    }

    // Connect to database
    const db = await getMongoClient();
    
    // Get user and verify current password
    const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return NextResponse.json({ 
        success: false, 
        message: "User not found" 
      }, { status: 404 });
    }

    // Verify current password
    const isCurrentPasswordValid = await decryptCode(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      return NextResponse.json({ 
        success: false, 
        message: "Current password is incorrect" 
      }, { status: 400 });
    }

    // Hash new password
    const hashedNewPassword = await encryptCode(newPassword);

    // Update password
    const result = await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      { 
        $set: { 
          password: hashedNewPassword,
          updatedAt: new Date()
        } 
      }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ 
        success: false, 
        message: "Failed to update password" 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Password changed successfully" 
    });

  } catch (error) {
    console.error('Error changing password:', error);
    return NextResponse.json({ 
      success: false, 
      message: "Internal server error" 
    }, { status: 500 });
  }
}
