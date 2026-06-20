import { getMongoClient } from '@/lib/mongodb';
import { sendGuestLoginLinkEmail } from '@/lib/email';
import { NextResponse } from 'next/server';
import { randomBytes, createHash } from 'crypto';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const globalAny = globalThis as any;
const rateMap = globalAny.__guestLoginRateMap || new Map<string, { count: number; firstTs: number }>();
globalAny.__guestLoginRateMap = rateMap;

function hashToken(token: string) {
  return createHash('sha256').update(token).digest('hex');
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const now = Date.now();
    const entry = rateMap.get(ip) || { count: 0, firstTs: now };
    if (now - entry.firstTs > 10 * 60 * 1000) {
      entry.count = 0;
      entry.firstTs = now;
    }
    if (entry.count >= 6) {
      return NextResponse.json({ success: false, message: 'Too many requests' }, { status: 429 });
    }

    const schema = z.object({
      name: z.string().min(2).max(100),
      email: z.string().email().max(254),
    });
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ success: false, message: 'Invalid input' }, { status: 400 });
    }

    const { name, email } = parsed.data;
    const db = await getMongoClient();
    let user = await db.collection('users').findOne({ email });

    if (!user) {
      const created = await db.collection('users').insertOne({
        name,
        email,
        temporary: true,
        guest: true,
        createdAt: new Date(),
      });
      user = await db.collection('users').findOne({ _id: created.insertedId });
    } else {
      await db.collection('users').updateOne(
        { _id: user._id },
        { $set: { name, temporary: true, guest: true, updatedAt: new Date() } }
      );
    }

    if (!user?._id) {
      return NextResponse.json({ success: false, message: 'Unable to create guest account' }, { status: 500 });
    }

    const rawToken = randomBytes(32).toString('hex');
    const tokenHash = hashToken(rawToken);
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
    await db.collection('guest_login_tokens').insertOne({
      userId: user._id.toString(),
      tokenHash,
      expiresAt,
      used: false,
      createdAt: new Date(),
    });

    const baseUrl = process.env.BASE_URL || new URL(request.url).origin;
    const loginUrl = `${baseUrl}/api/guest/login-link/${rawToken}`;
    const sent = await sendGuestLoginLinkEmail(name, email, loginUrl);

    entry.count += 1;
    rateMap.set(ip, entry);

    const response: any = { success: true, sent, message: sent ? 'Login link sent' : 'Login link created', loginUrl };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('guest login link error', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
