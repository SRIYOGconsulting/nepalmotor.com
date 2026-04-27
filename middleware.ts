import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSessionToken } from '@/lib/adminSession';

function unauthorized() {
  return new NextResponse('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Admin Panel"',
    },
  });
}

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (pathname === '/admin/login' || pathname.startsWith('/admin/login/')) {
    return NextResponse.next();
  }

  if (pathname === '/api/admin/login') {
    return NextResponse.next();
  }

  if (pathname === '/api/admin/seed') {
    return NextResponse.next();
  }

  const secret = process.env.ADMIN_AUTH_SECRET ?? process.env.ADMIN_PASS ?? '';
  if (!secret) return pathname.startsWith('/api/admin/') ? unauthorized() : NextResponse.redirect(new URL('/admin/login', req.url));

  const token = req.cookies.get('admin_session')?.value ?? '';
  if (token) {
    const verified = await verifyAdminSessionToken({ token, secret });
    if (verified.ok) return NextResponse.next();
  }

  if (pathname.startsWith('/api/admin/')) return unauthorized();

  const loginUrl = new URL('/admin/login', req.url);
  loginUrl.searchParams.set('next', pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
