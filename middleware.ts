import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-in-production';
const secret = new TextEncoder().encode(JWT_SECRET);

// Routes that require authentication
const protectedRoutes = ['/reading-list'];

// Routes that should redirect to dashboard if already authenticated
const authRoutes = ['/login', '/signup'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('auth-token')?.value;

  // Check if user is authenticated
  let isAuthenticated = false;
  let userProfile = null;
  if (token) {
    try {
      const { payload } = await jwtVerify(token, secret);
      isAuthenticated = true;
      userProfile = {
        userId: payload.userId as string,
        name: payload.name as string,
        email: payload.email as string
      };
    } catch {
      isAuthenticated = false;
    }
  }

  // Redirect unauthenticated users from protected routes to login
  if (protectedRoutes.includes(pathname) && !isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users from auth routes to intended destination
  if (authRoutes.includes(pathname) && isAuthenticated) {
    const url = request.nextUrl.clone();
    const redirectTo = url.searchParams.get('redirectTo') || '/reading-list';
    url.pathname = redirectTo;
    url.searchParams.delete('redirectTo');
    return NextResponse.redirect(url);
  }

  // For authenticated users accessing protected routes, inject profile storage script
  if (protectedRoutes.includes(pathname) && isAuthenticated && userProfile) {
    const response = NextResponse.next();
    response.headers.set('X-User-Profile', JSON.stringify(userProfile));
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};