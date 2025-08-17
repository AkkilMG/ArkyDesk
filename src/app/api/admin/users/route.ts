import { decrypt } from "@/lib/crypto";
import { getMongoClient } from "@/lib/mongodb";
import { decryptSession } from "@/lib/session";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';


// Get all users and pending actions
export async function GET(request: Request) {
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

    const userId = await decrypt(decryptedSession.token);
    if (!userId) {
      return NextResponse.json({ 
        success: false, 
        message: "Invalid user token" 
      }, { status: 401 });
    }

    const db = await getMongoClient();
    
    // Verify user is admin
    const currentUser = await db.collection('users').findOne({ _id: new ObjectId(userId) });
    if (!currentUser || !currentUser.admin) {
      return NextResponse.json({ 
        success: false, 
        message: "Access denied. Admin privileges required." 
      }, { status: 403 });
    }

    // Get all users with their ticket counts
    const users = await db.collection('users').aggregate([
      {
        $lookup: {
          from: 'tickets',
          localField: '_id',
          foreignField: 'user',
          as: 'userTickets'
        }
      },
      {
        $addFields: {
          tickets: { $size: '$userTickets' },
          closedTickets: {
            $size: {
              $filter: {
                input: '$userTickets',
                cond: { $eq: ['$$this.status', 'closed'] }
              }
            }
          }
        }
      },
      {
        $project: {
          password: 0,
          userTickets: 0
        }
      }
    ]).toArray();

    // Get pending actions
    const pendingActions = await db.collection('userActions').find({ 
      status: 'pending' 
    }).toArray();

    return NextResponse.json({ 
      success: true, 
      users,
      pendingActions
    });

  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ 
      success: false, 
      message: "Internal server error" 
    }, { status: 500 });
  }
}
