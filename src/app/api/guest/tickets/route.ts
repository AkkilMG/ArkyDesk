import { NextResponse } from 'next/server';
import { getMongoClient } from '@/lib/mongodb';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

// Simple in-memory rate limiter per IP (basic protection)
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 10; // max submissions per window
const rateMap = (globalThis as any).__guestRateMap || new Map<string, { count: number; firstTs: number }>();
(globalThis as any).__guestRateMap = rateMap;

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

    const now = Date.now();
    const entry = rateMap.get(ip) || { count: 0, firstTs: now };
    if (now - entry.firstTs > RATE_LIMIT_WINDOW_MS) {
      entry.count = 0;
      entry.firstTs = now;
    }
    if (entry.count >= RATE_LIMIT_MAX) {
      return NextResponse.json({ success: false, message: 'Rate limit exceeded' }, { status: 429 });
    }

    const body = await request.json();
    const schema = z.object({
      name: z.string().min(2).max(100),
      email: z.string().email().max(254),
      subject: z.string().min(3).max(200),
      description: z.string().min(10).max(5000),
      problem: z.enum(['crash', 'copyright'])
    });
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, message: 'Invalid input' }, { status: 400 });
    }

    const { name, email, subject, description, problem } = parsed.data;

    const db = await getMongoClient();
    const result = await db.collection('tickets').insertOne({
      subject,
      description,
      problem: problem.toLowerCase(),
      product: 'guest',
      user: 'guest',
      guestName: name,
      guestEmail: email,
      status: 'open',
      createdAt: new Date(),
    });

    // Broadcast optionally
    try {
      const { broadcastTicketUpdate } = await import('@/lib/realtime');
      await broadcastTicketUpdate(result.insertedId.toString(), 'created');
    } catch (e) {
      console.error('broadcast failed', e);
    }

    // increment counter
    entry.count += 1;
    rateMap.set(ip, entry);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('guest ticket error', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
