import type { Metadata } from 'next';
import { BASE_URL, getCanonicalUrl } from '@/lib/config/seo-config';

export const metadata: Metadata = {
  title: 'Números en Español - Del 0 al 1000+ | Espanol Hub',
  description: 'Domina los números del 0 al 1000+ con pronunciación correcta y ejercicios prácticos. Aprende a contar en español.',
  keywords: ['números español', 'contar español', 'pronunciación números', 'números del 0 al 1000', 'aprender números', 'números en español'],
  alternates: {
    canonical: getCanonicalUrl('/numeros'),
    languages: {
      'es': getCanonicalUrl('/numeros'),
      'ar': getCanonicalUrl('/numeros'),
    },
  },
  openGraph: {
    title: 'Números en Español - Del 0 al 1000+',
    description: 'Domina los números del 0 al 1000+ con pronunciación correcta y ejercicios prácticos.',
    type: 'website',
    locale: 'es_ES',
    url: getCanonicalUrl('/numeros'),
    siteName: 'Espanol Hub',
    images: [{
      url: `${BASE_URL}/og-image.png`,
      width: 1200,
      height: 630,
      alt: 'Números en Español',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@espanolhub',
    creator: '@espanolhub',
    title: 'Números en Español - Del 0 al 1000+',
    description: 'Domina los números del 0 al 1000+ con pronunciación correcta y ejercicios prácticos.',
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

export default function NumerosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
