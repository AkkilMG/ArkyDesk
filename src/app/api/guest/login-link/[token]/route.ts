import { getMongoClient } from '@/lib/mongodb';
import { encryptSession } from '@/lib/session';
import { encrypt } from '@/lib/crypto';
import { createHash } from 'crypto';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export const dynamic = 'force-dynamic';

function hashToken(token: string) {
  return createHash('sha256').update(token).digest('hex');
}

export async function GET(request: Request, { params }: { params: { token: string } }) {
  try {
    const token = decodeURIComponent(params.token || '');
    if (!token) {
      return NextResponse.redirect(new URL('/signin?guestLogin=invalid', request.url));
    }

    const db = await getMongoClient();
    const tokenDoc = await db.collection('guest_login_tokens').findOne({
      tokenHash: hashToken(token),
      used: false,
      expiresAt: { $gt: new Date() },
    });

    if (!tokenDoc) {
      return NextResponse.redirect(new URL('/signin?guestLogin=invalid', request.url));
    }

    const user = await db.collection('users').findOne({ _id: new ObjectId(tokenDoc.userId) });
    if (!user) {
      return NextResponse.redirect(new URL('/signin?guestLogin=invalid', request.url));
    }

    await db.collection('guest_login_tokens').updateOne(
      { _id: tokenDoc._id },
      { $set: { used: true, usedAt: new Date() } }
    );

    const sessionToken = await encrypt(user._id.toString());
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await encryptSession({ token: sessionToken, expiresAt });

    try {
      cookies().set({
        name: 'session',
        value: session,
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires: expiresAt,
      });
    } catch {
      cookies().set('session', session, { path: '/', httpOnly: true });
    }

    return NextResponse.redirect(new URL('/tickets?guest=1', request.url));
  } catch (error) {
    console.error('guest login consume error', error);
    return NextResponse.redirect(new URL('/signin?guestLogin=error', request.url));
  }
}
