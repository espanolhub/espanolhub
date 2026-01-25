import type { Metadata } from 'next';
import { BASE_URL, getCanonicalUrl } from '@/lib/config/seo-config';

export const metadata: Metadata = {
  title: 'Alfabeto Español - Aprende las 27 Letras | Espanol Hub',
  description: 'Aprende las 27 letras del alfabeto español con pronunciación, ejemplos y ejercicios interactivos. Guía completa del alfabeto español.',
  keywords: ['alfabeto español', 'letras español', 'pronunciación español', 'abecedario español', '27 letras', 'alfabeto completo'],
  alternates: {
    canonical: getCanonicalUrl('/alfabeto'),
    languages: {
      'es': getCanonicalUrl('/alfabeto'),
      'ar': getCanonicalUrl('/alfabeto'),
    },
  },
  openGraph: {
    title: 'Alfabeto Español - Aprende las 27 Letras',
    description: 'Aprende las 27 letras del alfabeto español con pronunciación, ejemplos y ejercicios interactivos.',
    type: 'website',
    locale: 'es_ES',
    url: getCanonicalUrl('/alfabeto'),
    siteName: 'Espanol Hub',
    images: [{
      url: `${BASE_URL}/og-image.png`,
      width: 1200,
      height: 630,
      alt: 'Alfabeto Español',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@espanolhub',
    creator: '@espanolhub',
    title: 'Alfabeto Español - Aprende las 27 Letras',
    description: 'Aprende las 27 letras del alfabeto español con pronunciación, ejemplos y ejercicios interactivos.',
    images: [`${BASE_URL}/og-image.png`],
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

export default function AlfabetoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
