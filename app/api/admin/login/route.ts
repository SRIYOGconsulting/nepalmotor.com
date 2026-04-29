import { NextRequest, NextResponse } from 'next/server';
import { createAdminSessionToken } from '@/lib/adminSession';

function constantTimeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

export async function POST(req: NextRequest) {
  const adminPass = process.env.ADMIN_PASS ?? process.env.ADMIN_AUTH_SECRET ?? '';
  const secret = process.env.ADMIN_AUTH_SECRET ?? adminPass;

  if (!adminPass || !secret) {
    return NextResponse.json({ success: false, message: 'Admin auth is not configured' }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request body' }, { status: 400 });
  }

  const password = typeof (body as { password?: unknown })?.password === 'string' ? ((body as { password?: unknown }).password as string) : '';
  if (!password) {
    return NextResponse.json({ success: false, message: 'Password is required' }, { status: 400 });
  }

  if (!constantTimeEqual(password, adminPass)) {
    return NextResponse.json({ success: false, message: 'Invalid password' }, { status: 401 });
  }

  const token = await createAdminSessionToken({ secret });
  const res = NextResponse.json({ success: true }, { status: 200 });
  res.cookies.set('admin_session', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
