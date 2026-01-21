import { NextRequest, NextResponse } from 'next/server';

// Detect user's preferred language from Accept-Language header
function detectUserLanguage(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language');
  
  if (!acceptLanguage) {
    return 'es'; // Default to Spanish
  }

  // Parse Accept-Language header
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const [code, qValue] = lang.trim().split(';');
      const quality = qValue ? parseFloat(qValue.split('=')[1]) : 1.0;
      return { code: code.split('-')[0].toLowerCase(), quality };
    })
    .sort((a, b) => b.quality - a.quality);

  // Check if Arabic is preferred
  const hasArabic = languages.some(lang => lang.code === 'ar' && lang.quality > 0.5);
  
  return hasArabic ? 'ar' : 'es';
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static assets and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|webp|avif|mp3|wav|css|js|woff|woff2|ttf|otf|eot|webmanifest)$/)
  ) {
    return NextResponse.next();
  }

  // Protect /admin routes with simple authentication
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin-auth')?.value;

    // If no token, redirect to login
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Validate token
    try {
      const sessionData = JSON.parse(Buffer.from(token, 'base64').toString());
      
      // Check if session is expired (7 days)
      const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
      if (Date.now() - sessionData.timestamp > maxAge) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        const response = NextResponse.redirect(loginUrl);
        response.cookies.delete('admin-auth');
        return response;
      }

      // Check if user is admin
      if (sessionData.role !== 'admin') {
        return NextResponse.redirect(new URL('/', request.url));
      }

      // Allow access - add language header
      const response = NextResponse.next();
      const languageCookie = request.cookies.get('user-language')?.value;
      if (languageCookie) {
        response.headers.set('X-User-Language', languageCookie);
      }
      return response;
    } catch (error) {
      // Invalid token, redirect to login
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete('admin-auth');
      return response;
    }
  }

  // Language detection for public routes
  const languageCookie = request.cookies.get('user-language')?.value;
  const detectedLanguage = detectUserLanguage(request);
  
  // Store detected language in cookie if not set
  if (!languageCookie) {
    const response = NextResponse.next();
    response.cookies.set('user-language', detectedLanguage, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
    
    // Add language hint to response headers
    response.headers.set('X-Detected-Language', detectedLanguage);
    return response;
  }

  // Add language header to all responses
  const response = NextResponse.next();
  if (languageCookie) {
    response.headers.set('X-User-Language', languageCookie);
  }
  
  return response;
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
