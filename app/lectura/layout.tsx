import type { Metadata } from 'next';
import { BASE_URL, getCanonicalUrl } from '@/lib/config/seo-config';

export const metadata: Metadata = {
  title: 'Lectura y Comprensión - Textos y Diálogos | Espanol Hub',
  description: 'Mejora tu comprensión lectora con textos graduados, diálogos cotidianos y ejercicios de comprensión. Practica lectura en español.',
  keywords: ['lectura español', 'comprensión lectora', 'textos español', 'diálogos español', 'leer español', 'práctica lectura'],
  alternates: {
    canonical: getCanonicalUrl('/lectura'),
    languages: {
      'es': getCanonicalUrl('/lectura'),
      'ar': getCanonicalUrl('/lectura'),
    },
  },
  openGraph: {
    title: 'Lectura y Comprensión - Textos y Diálogos',
    description: 'Mejora tu comprensión lectora con textos graduados, diálogos cotidianos y ejercicios de comprensión.',
    type: 'website',
    locale: 'es_ES',
    url: getCanonicalUrl('/lectura'),
    siteName: 'Espanol Hub',
    images: [{
      url: `${BASE_URL}/og-image.png`,
      width: 1200,
      height: 630,
      alt: 'Lectura y Comprensión',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@espanolhub',
    creator: '@espanolhub',
    title: 'Lectura y Comprensión - Textos y Diálogos',
    description: 'Mejora tu comprensión lectora con textos graduados, diálogos cotidianos y ejercicios de comprensión.',
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

export default function LecturaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
