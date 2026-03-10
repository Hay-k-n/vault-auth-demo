import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Hardcoded demo credentials
const DEMO_EMAIL = 'demo@example.com';
const DEMO_PASSWORD = 'password123';
const SESSION_TOKEN = 'demo-session-token-abc123';

export async function POST(request) {
  const { email, password } = await request.json();

  if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set('session', SESSION_TOKEN, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });
    return NextResponse.json({ success: true });
  }

  return NextResponse.json(
    { message: 'Invalid email or password' },
    { status: 401 }
  );
}
