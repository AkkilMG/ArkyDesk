

 
import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { Session } from '@/types/auth'
import { cookies } from 'next/headers'

function getEncodedKey() {
  const secretKey = process.env.SESSION_SECRET;
  if (!secretKey) throw new Error('SESSION_SECRET is not defined in environment variables');
  return new TextEncoder().encode(secretKey);
}

export async function encryptSession(payload: Session) {
  const encodedKey = getEncodedKey();
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

export async function decryptSession(session: string | undefined = '') {
  try {
    const encodedKey = getEncodedKey();
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload as unknown as Session
  } catch (error) {
    console.log('Failed to verify session', error)
    return null;
  }
}

export async function updateSession() {
  const sessionCookie = cookies().get('session')?.value
  if (!sessionCookie) return null;

  const payload = await decryptSession(sessionCookie)
  if (!payload?.token || typeof payload.token !== 'string') return null;

  const newPayload: Session = {
    token: payload.token,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  };

  const newSession = await encryptSession(newPayload);
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  cookies().set('session', newSession, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expires,
    sameSite: 'lax',
    path: '/',
  });

  return newSession;
}

