import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  const hasAuth = request.cookies.has('.finance_auth');
  const { pathname } = request.nextUrl;
  const isAuthPage =
    pathname.startsWith('/login') || pathname.startsWith('/register');
  const isProtected = pathname.startsWith('/dashboard');
  if (!hasAuth && isProtected) {
    return NextResponse.redirect(new URL('/register', request.url));
  }

  if (hasAuth && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (pathname === '/') {
    return NextResponse.redirect(
      new URL(hasAuth ? '/dashboard' : '/register', request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login/:path*', '/register/:path*', '/dashboard/:path*'],
};
