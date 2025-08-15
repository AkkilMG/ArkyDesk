import { decrypt } from "@/lib/crypto";
import { getMongoClient } from "@/lib/mongodb";
import { decryptSession } from "@/lib/session";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function DELETE(request: Request) {
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

    // Prevent admin deletion (safety check)
    if (user.admin) {
      return NextResponse.json({ 
        success: false, 
        message: "Admin accounts cannot be deleted" 
      }, { status: 403 });
    }

    // Start transaction for data cleanup
    // For simplicity, we'll do individual operations instead of transaction
    // In production, consider implementing proper transaction handling
    
    try {
      // Delete user's tickets
      await db.collection('tickets').deleteMany({ user: userId });
      
      // Delete user's comments (if exists)
      try {
        await db.collection('comments').deleteMany({ user: userId });
      } catch (error) {
        // Comments collection might not exist, ignore the error
        console.log('Comments collection not found or error deleting comments:', error);
      }
      
      // Delete user account
      const deleteResult = await db.collection('users').deleteOne({ _id: new ObjectId(userId) });
      
      if (deleteResult.deletedCount === 0) {
        return NextResponse.json({ 
          success: false, 
          message: "Failed to delete account" 
        }, { status: 500 });
      }
      
      // Clear session cookie
      cookies().delete('session');
      
      return NextResponse.json({ 
        success: true, 
        message: "Account deleted successfully" 
      });
      
    } catch (error) {
      console.error('Error deleting account data:', error);
      return NextResponse.json({ 
        success: false, 
        message: "Failed to delete account" 
      }, { status: 500 });
    }

  } catch (error) {
    console.error('Error deleting account:', error);
    return NextResponse.json({ 
      success: false, 
      message: "Internal server error" 
    }, { status: 500 });
  }
}
