import type { Metadata } from "next";
import { Inter, Geist_Mono, Cairo } from "next/font/google";
import "./globals.css";
import NavigationWrapper from "@/components/NavigationWrapper";
import Footer from "@/components/Footer";
import StickyPlayCTA from "@/components/StickyPlayCTA";
import Providers from "@/components/Providers";
import SuccessMomentClient from '@/components/SuccessMomentClient';
import { ClerkProvider } from '@clerk/nextjs';
import GlobalPronounceListener from '@/components/GlobalPronounceListener';
import GlobalDictionaryProvider from '@/components/GlobalDictionaryProvider';
import WebVitalsTracker from '@/components/WebVitalsTracker';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300","400","600","700"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "EspañolHub - Tu Centro Inteligente para Aprender Español",
  description: "Tu centro inteligente para aprender español. Gramática, vocabulario, preparación CCSE, carnet de conducir y más. ¡100% gratis!",
  keywords: ["aprender español", "español gratis", "CCSE", "nacionalidad española", "carnet de conducir", "DGT", "gramática española", "vocabulario español"],
  authors: [{ name: "EspañolHub Team" }],
  openGraph: {
    title: "EspañolHub - Tu Centro Inteligente para Aprender Español",
    description: "Tu centro inteligente para aprender español. Gramática, vocabulario, preparación CCSE, carnet de conducir y más. ¡100% gratis!",
    type: "website",
    locale: "es_ES",
    url: "https://espanolhub.com",
    siteName: "EspañolHub",
  },
  twitter: {
    card: "summary_large_image",
    title: "EspañolHub - Tu Centro Inteligente para Aprender Español",
    description: "Tu centro inteligente para aprender español. Gramática, vocabulario, preparación CCSE, carnet de conducir y más. ¡100% gratis!",
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
  name: 'EspañolHub',
  alternateName: 'Español Hub',
  description: 'Tu centro inteligente para aprender español. Plataforma educativa completa con gramática, vocabulario, preparación CCSE, carnet de conducir DGT y más. 100% gratis.',
  url: 'https://espanolhub.com',
  logo: 'https://espanolhub.com/logo.png',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(educationalOrganizationSchema),
          }}
        />
        <link rel="preload" href="/sounds/ding.mp3" as="audio" type="audio/mpeg" />
      </head>
  <body
            className={`${inter.variable} ${geistMono.variable} ${cairo.variable} antialiased flex flex-col min-h-screen overflow-x-hidden`}
          >
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
                <div className="h-24 flex-shrink-0" aria-hidden="true" />
                <StickyPlayCTA />
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
              <div className="h-24 flex-shrink-0" aria-hidden="true" />
              <StickyPlayCTA />
              <SuccessMomentClient />
            </Providers>
          )}
        </div>
      </body>
    </html>
  );
}
