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
// استيراد مكون Script لضمان أفضل أداء للأكواد الخارجية
import Script from 'next/script';

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
  title: "Espanol Hub - Tu Centro Inteligente para Aprender Español",
  description: "Tu centro inteligente para aprender español. Gramática, vocabulario, preparación CCSE, carnet de conducir y más. ¡100% gratis!",
  keywords: ["aprender español", "español gratis", "CCSE", "nacionalidad española", "carnet de conducir", "DGT", "gramática española", "vocabulario español"],
  authors: [{ name: "Espanol Hub Team" }],
  // ... (بقية الإعدادات كما هي في ملفك الأصلي)
};

// ... (schemas كما هي في ملفك الأصلي)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/* المربع 1: كود Google Tag Manager في الـ Head */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-P4HL68DB');
          `}
        </Script>

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
        <link rel="preload" href="/sounds/ding.mp3" as="audio" type="audio/mpeg" />
      </head>
      <body
        className={`${inter.variable} ${geistMono.variable} ${cairo.variable} antialiased flex flex-col min-h-screen overflow-x-hidden`}
      >
        {/* المربع 2: كود Noscript في بداية الـ Body */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-P4HL68DB"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>

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