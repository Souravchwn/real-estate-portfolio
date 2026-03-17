// src/middleware.ts
// Edge Middleware: Guards the /admin-trigger route.
// Checks the x-admin-secret header (or query param) against ADMIN_SECRET env var.

import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin-trigger')) {
    const secret = process.env.ADMIN_SECRET;
    const provided =
      request.headers.get('x-admin-secret') ??
      request.nextUrl.searchParams.get('secret');

    // If no secret is configured (local dev), allow access
    if (!secret || secret === 'dev-secret-change-me') {
      return NextResponse.next();
    }

    if (provided !== secret) {
      return new NextResponse(
        JSON.stringify({ error: 'Unauthorized — invalid admin secret.' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } },
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin-trigger/:path*'],
};
