import { decrypt } from "@/lib/crypto";
import { getMongoClient } from "@/lib/mongodb";
import { decryptSession } from "@/lib/session";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = "edge";


// Approve or reject user action requests
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

    const { actionId, approved } = await request.json();

    if (!actionId || typeof approved !== 'boolean') {
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

    // Get the action request
    const actionRequest = await db.collection('userActions').findOne({ 
      _id: new ObjectId(actionId),
      status: 'pending'
    });

    if (!actionRequest) {
      return NextResponse.json({ 
        success: false, 
        message: "Action request not found or already processed" 
      }, { status: 404 });
    }

    if (approved) {
      // Execute the action
      const targetUserId = actionRequest.userId;
      const action = actionRequest.action;

      switch (action) {
        case 'flag':
          await db.collection('users').updateOne(
            { _id: targetUserId },
            { 
              $set: { 
                flagged: true,
                flaggedAt: new Date(),
                flaggedBy: new ObjectId(adminId),
                flaggedReason: actionRequest.reason
              } 
            }
          );
          break;

        case 'admin':
          await db.collection('users').updateOne(
            { _id: targetUserId },
            { 
              $set: { 
                admin: true,
                promotedAt: new Date(),
                promotedBy: new ObjectId(adminId)
              } 
            }
          );
          break;

        case 'delete':
          // Soft delete: preserve email and tickets but mark as deleted
          await db.collection('users').updateOne(
            { _id: targetUserId },
            { 
              $set: { 
                deleted: true,
                deletedAt: new Date(),
                deletedBy: new ObjectId(adminId),
                deletedReason: actionRequest.reason,
                // Keep email for future reference
                originalEmail: actionRequest.user.email,
                // Disable login by clearing password
                password: null,
                name: '[DELETED USER]'
              } 
            }
          );
          break;
      }

      // Mark action as approved
      await db.collection('userActions').updateOne(
        { _id: new ObjectId(actionId) },
        {
          $set: {
            status: 'approved',
            approvedBy: new ObjectId(adminId),
            approvedAt: new Date()
          }
        }
      );
    } else {
      // Mark action as rejected
      await db.collection('userActions').updateOne(
        { _id: new ObjectId(actionId) },
        {
          $set: {
            status: 'rejected',
            rejectedBy: new ObjectId(adminId),
            rejectedAt: new Date()
          }
        }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: approved ? "Action approved and executed" : "Action rejected" 
    });

  } catch (error) {
    console.error('Error processing action approval:', error);
    return NextResponse.json({ 
      success: false, 
      message: "Internal server error" 
    }, { status: 500 });
  }
}
