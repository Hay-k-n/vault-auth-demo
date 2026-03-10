import { NextResponse } from 'next/server';

const SESSION_TOKEN = 'demo-session-token-abc123';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get('session')?.value;
  const isAuthenticated = session === SESSION_TOKEN;

  // If trying to access /dashboard without a valid session → redirect to /login
  if (pathname.startsWith('/dashboard') && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If already logged in and visiting /login → redirect to /dashboard
  if (pathname === '/login' && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
