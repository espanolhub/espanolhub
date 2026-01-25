import type { Metadata } from 'next';
import { BASE_URL, getCanonicalUrl } from '@/lib/config/seo-config';

export const metadata: Metadata = {
  title: 'Vocabulario Español - Categorías Temáticas | Espanol Hub',
  description: 'Amplía tu vocabulario con categorías temáticas, imágenes y pronunciación. Aprende vocabulario español organizado por temas.',
  keywords: ['vocabulario español', 'palabras español', 'categorías temáticas', 'diccionario español', 'aprender vocabulario'],
  alternates: {
    canonical: getCanonicalUrl('/vocabulario'),
    languages: {
      'es': getCanonicalUrl('/vocabulario'),
      'ar': getCanonicalUrl('/vocabulario'),
    },
  },
  openGraph: {
    title: 'Vocabulario Español - Categorías Temáticas',
    description: 'Amplía tu vocabulario con categorías temáticas, imágenes y pronunciación.',
    type: 'website',
    locale: 'es_ES',
    url: getCanonicalUrl('/vocabulario'),
    siteName: 'Espanol Hub',
    images: [{
      url: `${BASE_URL}/og-image.png`,
      width: 1200,
      height: 630,
      alt: 'Vocabulario Español',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@espanolhub',
    creator: '@espanolhub',
    title: 'Vocabulario Español - Categorías Temáticas',
    description: 'Amplía tu vocabulario con categorías temáticas, imágenes y pronunciación.',
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

export default function VocabularioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
