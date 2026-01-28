import type { Metadata } from "next";
import { Inter, Geist_Mono, Cairo } from "next/font/google";
import "./globals.css";
import NavigationWrapper from "@/components/NavigationWrapper";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import SuccessMomentClient from '@/components/SuccessMomentClient';
import { ClerkProvider } from '@clerk/nextjs';
import GlobalPronounceListener from '@/components/GlobalPronounceListener';
import GlobalDictionaryProvider from '@/components/GlobalDictionaryProvider';
import WebVitalsTracker from '@/components/WebVitalsTracker';
import { GoogleTagManager } from '@next/third-parties/google';
import ErrorBoundary from '@/components/ErrorBoundary';
import { LoadingProvider } from '@/components/GlobalLoading';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400","700"],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: false,
  fallback: ['monospace'],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700"],
  display: 'swap',
  preload: true,
  fallback: ['Tahoma', 'sans-serif'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.espanolhub.com'),
  title: {
    default: "Espanol Hub - La #1 Plataforma para Aprender Español GRATIS | Gramática, Vocabulario, Juegos 🚀",
    template: "%s | Espanol Hub"
  },
  description: "La plataforma #1 para aprender español 100% gratis con pronunciación nativa y búsqueda por voz. Gramática, vocabulario, juegos educativos, preparación CCSE y carnet de conducir. ¡La mejor plataforma para aprender español online con tecnología de voz avanzada!",
  keywords: ["aprender español gratis", "mejor plataforma español", "gramática española", "vocabulario español", "juegos educativos español", "curso español online", "aprender español", "español para principiantes", "CCSE", "nacionalidad española", "carnet de conducir", "DGT", "espanolhub", "aprender español gratis", "pronunciación español", "búsqueda por voz español", "voz nativa español", "aprender español con voz", "pronunciación correcta español", "hablar español gratis"],
  authors: [{ name: "Espanol Hub Team" }],
  creator: "Espanol Hub",
  publisher: "Espanol Hub",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://www.espanolhub.com',
    title: 'Espanol Hub - La #1 Plataforma para Aprender Español GRATIS con Voz 🚀',
    description: 'La plataforma #1 para aprender español 100% gratis con pronunciación nativa y búsqueda por voz. Gramática, vocabulario, juegos educativos, preparación CCSE y carnet de conducir.',
    siteName: 'Espanol Hub',
    images: [
      {
        url: 'https://www.espanolhub.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Espanol Hub - Aprende Español GRATIS con Voz',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Espanol Hub - La #1 Plataforma para Aprender Español GRATIS con Voz 🚀',
    description: 'La plataforma #1 para aprender español 100% gratis con pronunciación nativa y búsqueda por voz. Gramática, vocabulario, juegos educativos, preparación CCSE y carnet de conducir.',
    images: ['https://www.espanolhub.com/og-image.png'],
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  alternates: {
    canonical: 'https://www.espanolhub.com',
    languages: {
      'es': 'https://www.espanolhub.com',
      'en': 'https://www.espanolhub.com/en',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#9333ea' }
    ]
  },
  other: {
    'msapplication-TileColor': '#9333ea',
    'msapplication-config': '/browserconfig.xml',
  },
};

// Structured Data for Educational Organization
const educationalOrganizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Espanol Hub',
  alternateName: 'Espanol Hub',
  description: 'Tu centro inteligente para aprender español. Plataforma educativa completa con gramática, vocabulario, preparación CCSE, carnet de conducir DGT y más. 100% gratis.',
  url: 'https://www.espanolhub.com',
  logo: 'https://www.espanolhub.com/logo.png',
  educationalCredentialAwarded: 'Certificado de Progreso',
  educationalUse: [
    'Aprender español',
    'Preparación para exámenes CCSE y DELE A2',
    'Preparación carnet de conducir (DGT)',
    'Educación de idiomas',
    'Nacionalidad española'
  ],
  teaches: [
    'Idioma Español',
    'Gramática Española',
    'Vocabulario Español',
    'Cultura Española',
    'Preparación para Nacionalidad Española',
    'Examen teórico de conducir en España'
  ],
  audience: {
    '@type': 'EducationalAudience',
    educationalRole: 'Estudiante'
  },
  slogan: 'Tu centro inteligente para aprender español',
  sameAs: []
};

// WebSite Schema with SearchAction for Google Site Search
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Espanol Hub',
  url: 'https://www.espanolhub.com',
  description: 'Aprende español de forma completa e interactiva',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://www.espanolhub.com/search?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
  inLanguage: ['es', 'ar'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/* Preconnect to external domains for faster resource loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//vitals.vercel-insights.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        
        
        {/* Critical CSS inline for faster rendering */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Light-only critical styles to avoid color mismatches on first paint */
            :root { color-scheme: light; }
            body { font-family: var(--font-inter), system-ui, sans-serif; margin: 0; padding: 0; background: #ffffff; color: #0f172a; }
            a { text-underline-offset: 3px; }
            .skip-to-main { position: absolute; left: -9999px; top: 0; z-index: 9999; }
            .skip-to-main:focus { left: 50%; transform: translateX(-50%); }
            .min-h-screen { min-height: 100vh; }
            .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
            .flex { display: flex; }
            .items-center { align-items: center; }
            .gap-4 { gap: 1rem; }
            .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
            .py-16 { padding-top: 4rem; padding-bottom: 4rem; }
            .text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
            .font-bold { font-weight: 700; }
            .mb-6 { margin-bottom: 1.5rem; }
            .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
            .max-w-2xl { max-width: 42rem; }
            .mx-auto { margin-left: auto; margin-right: auto; }
            .rounded-2xl { border-radius: 1rem; }
            .shadow-lg { box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05); }
            .transition-all { transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 300ms; }
            .transform { transform: translate(var(--tw-translate-x, 0), var(--tw-translate-y, 0)) rotate(var(--tw-rotate, 0)) skewX(var(--tw-skew-x, 0)) skewY(var(--tw-skew-y, 0)) scaleX(var(--tw-scale-x, 1)) scaleY(var(--tw-scale-y, 1)); }
          `
        }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(educationalOrganizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
  <body
            className={`${inter.variable} ${geistMono.variable} ${cairo.variable} antialiased flex flex-col min-h-screen overflow-x-hidden`}
          >
        {/* Google Tag Manager - Loaded via @next/third-parties for optimal performance */}
        <GoogleTagManager gtmId="GTM-P4HL68DB" />
        <a href="#main-content" className="skip-to-main">
          Saltar al contenido principal
        </a>
        <div className="w-full max-w-full overflow-x-hidden">
          {process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? (
            <ClerkProvider
              publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
              appearance={{
                variables: {
                  colorPrimary: '#1e40af',
                  colorSuccess: '#fbbf24',
                  colorText: '#0f172a',
                },
              }}
            >
              <ErrorBoundary>
                <LoadingProvider>
                  <Providers>
                    <WebVitalsTracker />
                    <NavigationWrapper />
                    <GlobalPronounceListener />
                    <GlobalDictionaryProvider />
                    <main id="main-content" className="flex-grow w-full">
                      {children}
                    </main>
                    <Footer />
                  </Providers>
                </LoadingProvider>
              </ErrorBoundary>
            </ClerkProvider>
          ) : (
            <ErrorBoundary>
              <LoadingProvider>
                <Providers>
                  <WebVitalsTracker />
                  <NavigationWrapper />
                  <GlobalPronounceListener />
                  <GlobalDictionaryProvider />
                  <main id="main-content" className="flex-grow w-full">
                    {children}
                  </main>
                  <Footer />
                </Providers>
              </LoadingProvider>
            </ErrorBoundary>
          )}
          <SuccessMomentClient />
        </div>
      </body>
    </html>
  );
}
