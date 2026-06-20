import { NextResponse } from 'next/server';
import { updateSession } from '@/lib/session';

export async function GET() {
  const newSession = await updateSession();
  if (!newSession) {
    return NextResponse.json({ success: false, message: 'No valid session' }, { status: 401 });
  }
  return NextResponse.json({ success: true, message: 'Session refreshed' });
}
