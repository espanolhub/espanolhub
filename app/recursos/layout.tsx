import type { Metadata } from 'next';
import { BASE_URL, getCanonicalUrl } from '@/lib/config/seo-config';

export const metadata: Metadata = {
  title: 'Recursos Descargables - Guías PDF y Materiales Premium | Espanol Hub',
  description: 'Descarga guías PDF gratuitas y materiales premium para aprender español. Gramática, vocabulario, preparación para exámenes y más.',
  keywords: ['recursos español', 'guías PDF', 'materiales premium', 'descargar recursos', 'PDF español', 'materiales educativos'],
  alternates: {
    canonical: getCanonicalUrl('/recursos'),
    languages: {
      'es': getCanonicalUrl('/recursos'),
      'ar': getCanonicalUrl('/recursos'),
    },
  },
  openGraph: {
    title: 'Recursos Descargables - Guías PDF y Materiales Premium',
    description: 'Descarga guías PDF gratuitas y materiales premium para aprender español.',
    type: 'website',
    locale: 'es_ES',
    url: getCanonicalUrl('/recursos'),
    siteName: 'Espanol Hub',
    images: [{
      url: `${BASE_URL}/og-image.png`,
      width: 1200,
      height: 630,
      alt: 'Recursos Descargables',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@espanolhub',
    creator: '@espanolhub',
    title: 'Recursos Descargables - Guías PDF y Materiales Premium',
    description: 'Descarga guías PDF gratuitas y materiales premium para aprender español.',
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

export default function RecursosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
