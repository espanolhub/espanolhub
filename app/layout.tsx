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

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300","400","600","700"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Espanol Hub - Tu Centro Inteligente para Aprender Español",
  description: "Tu centro inteligente para aprender español. Gramática, vocabulario, preparación CCSE, carnet de conducir y más. ¡100% gratis!",
  keywords: ["aprender español", "español gratis", "CCSE", "nacionalidad española", "carnet de conducir", "DGT", "gramática española", "vocabulario español"],
  authors: [{ name: "Espanol Hub Team" }],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#9333ea' },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    title: "Espanol Hub - Tu Centro Inteligente para Aprender Español",
    description: "Tu centro inteligente para aprender español. Gramática, vocabulario, preparación CCSE, carnet de conducir y más. ¡100% gratis!",
    type: "website",
    locale: "es_ES",
    url: "https://www.espanolhub.com",
    siteName: "Espanol Hub",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Espanol Hub - Tu Centro Inteligente para Aprender Español',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Espanol Hub - Tu Centro Inteligente para Aprender Español",
    description: "Tu centro inteligente para aprender español. Gramática, vocabulario, preparación CCSE, carnet de conducir y más. ¡100% gratis!",
    images: ['/og-image.png'],
  },
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
              <Providers>
                <WebVitalsTracker />
                <NavigationWrapper />
                <GlobalPronounceListener />
                <GlobalDictionaryProvider />
                <main id="main-content" className="flex-grow w-full">
                  {children}
                </main>
                <Footer />
                <SuccessMomentClient />
              </Providers>
            </ClerkProvider>
          ) : (
            <Providers>
              <WebVitalsTracker />
              <NavigationWrapper />
              <GlobalPronounceListener />
              <GlobalDictionaryProvider />
              <main id="main-content" className="flex-grow w-full">
                {children}
              </main>
              <Footer />
              <SuccessMomentClient />
            </Providers>
          )}
        </div>
      </body>
    </html>
  );
}
