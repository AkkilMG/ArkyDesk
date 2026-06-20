import { encrypt, encryptCode } from "@/lib/crypto";
import { getMongoClient } from "@/lib/mongodb";
import { encryptSession } from "@/lib/session";
import { cookies } from "next/headers";
import { NextResponse } from 'next/server';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

// export const runtime = "edge";


export async function GET(request: Request) {
  return NextResponse.json({success: false, message: `Only POST Method is available!`}, {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

   
export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    // simple login rate limiter
    const RATE_WINDOW = 10 * 60 * 1000; // 10 min
    const RATE_MAX = 8;
    const globalAny = globalThis as any;
    const loginMap = globalAny.__loginRateMap || new Map<string, { count: number; firstTs: number }>();
    globalAny.__loginRateMap = loginMap;
    const now = Date.now();
    const le = loginMap.get(ip) || { count: 0, firstTs: now };
    if (now - le.firstTs > RATE_WINDOW) { le.count = 0; le.firstTs = now; }
    if (le.count >= RATE_MAX) return NextResponse.json({ success: false, message: 'Too many attempts, try later' }, { status: 429 });

    const body = await request.json();
    const schema = z.object({
      email: z.string().email().max(254),
      password: z.string().min(8).max(128),
    });
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, message: 'Invalid input' }, { status: 400 });
    }
    const { email, password } = parsed.data;
    const db = await getMongoClient();
    var hashPassword = await encryptCode(password);
    const result = await db.collection('users').findOne({
      email: email,
      password: hashPassword
    });
    if (!result) {
      le.count += 1;
      loginMap.set(ip, le);
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }
    // if (!result.verify) {
    //   return NextResponse.json({ success: false, message: 'Email not verified.' }), {
    //     status: 401,
    //     headers: { 'Content-Type': 'application/json' }
    //   });
    // }
    /** Session */
    var encry = await encrypt(result._id.toString());
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await encryptSession({ token: encry, expiresAt });
    // Set secure cookie flags
    try {
      cookies().set({ name: 'session', value: session, path: '/', httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', expires: expiresAt });
    } catch (e) {
      // Fallback for environments that don't support object-style cookie setter
      cookies().set('session', session, { path: '/', httpOnly: true });
    }
    return NextResponse.json({ success: true, admin: result.admin ? result.admin : false }, { status: 200 });
    // res.setHeader('Set-Cookie', `session=${session}; HttpOnly; Secure; Expires=${expiresAt.toUTCString()}; SameSite=Lax; Path=/`);

  } catch (error) {
    console.error('Error saving user data:', error);
    return NextResponse.json({ success: false, message: `Something went wrong.` }, {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
