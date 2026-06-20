import { encryptCode } from "@/lib/crypto";
import { getMongoClient } from "@/lib/mongodb";
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;
    if (!email) {
      return NextResponse.json({ success: false, message: 'Email is needed..' }, {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    const db = await getMongoClient();
    const result = await db.collection('users').findOne({
      email: email,
    });
    if (!result) {
      return NextResponse.json({ success: false, message: 'Email not found' }, {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    const result1 = await db.collection('otDump').insertOne({
      email: email,
      code: encryptCode(email),
      createdAt: new Date()
    });
    return NextResponse.json({ success: true }, {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error saving user data:', error);
    return NextResponse.json({ success: false, message: 'Something went wrong' }, {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
