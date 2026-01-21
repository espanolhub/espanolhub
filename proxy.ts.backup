import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/nextjs/server';
import { getAdminEmailsSync } from '@/lib/admins';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/about',
  '/pricing',
  '/contact',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/aviso-legal',
  '/cookies',
  '/api/webhook(.*)',
  '/api/debug(.*)', // Allow debug endpoints
  '/alfabeto(.*)',
  '/numeros(.*)',
  '/lectura(.*)',
  '/gramatica(.*)',
  '/vocabulario(.*)',
  '/juegos(.*)',
  '/tablas(.*)',
  '/nacionalidad(.*)',
  '/driving-license(.*)',
  '/tramites(.*)',
  '/cursos(.*)',
  '/recursos(.*)',
  '/faq(.*)',
  '/privacy(.*)',
  '/terms(.*)',
]);

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

export default clerkMiddleware(async (auth, req) => {
  const pathname = req.nextUrl?.pathname || req.url || '';
  const isAdminPath = pathname.startsWith('/admin');

  // Skip middleware for static assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|webp|avif|mp3|wav|css|js|woff|woff2|ttf|otf|eot)$/)
  ) {
    return NextResponse.next();
  }

  // First, handle admin routes separately
  if (isAdminPath) {
    const ADMIN_EMAILS = getAdminEmailsSync();
    
    try {
      await auth.protect();
      const { userId } = await auth();
      
      if (!userId) {
        const signInUrl = new URL('/sign-in', req.nextUrl?.origin || `http://${req.headers.get('host')}`);
        return NextResponse.redirect(signInUrl);
      }

      const client = await clerkClient();
      const user = await client.users.getUser(userId);
      const primary = user.primaryEmailAddress?.emailAddress?.toLowerCase();
      const emails = (user.emailAddresses || []).map(e => (e.emailAddress || '').toLowerCase());
      const isAdmin = (primary && ADMIN_EMAILS.includes(primary)) || emails.some(e => ADMIN_EMAILS.includes(e));

      if (!isAdmin) {
        const redirectUrl = new URL('/', req.nextUrl?.origin || `http://${req.headers.get('host')}`);
        return NextResponse.redirect(redirectUrl);
      }

      return;
    } catch (e) {
      console.error('Admin check error:', e);
      const signInUrl = new URL('/sign-in', req.nextUrl?.origin || `http://${req.headers.get('host')}`);
      return NextResponse.redirect(signInUrl);
    }
  }

  // Protect all other non-public routes
  if (!isPublicRoute(req)) {
    await auth.protect();
  }

  // Language detection and user preferences (for public routes)
  if (isPublicRoute(req)) {
    const languageCookie = req.cookies.get('user-language')?.value;
    const detectedLanguage = detectUserLanguage(req);
    
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
  }

  // Add performance and language headers to all responses
  const response = NextResponse.next();
  
  const languageCookie = req.cookies.get('user-language')?.value;
  if (languageCookie) {
    response.headers.set('X-User-Language', languageCookie);
  }
  
  return response;
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
