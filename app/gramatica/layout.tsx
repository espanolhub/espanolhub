import type { Metadata } from 'next';
import { BASE_URL, getCanonicalUrl } from '@/lib/config/seo-config';

export const metadata: Metadata = {
  title: 'Gramática Española - Conjugación de Verbos y Tablas | Espanol Hub',
  description: 'Aprende la conjugación de verbos, cambios de género y número con tablas completas y ejercicios interactivos para hispanohablantes y estudiantes.',
  keywords: ['gramática española', 'conjugación verbos', 'tablas gramática', 'aprender español', 'verbos españoles', 'gramática online'],
  alternates: {
    canonical: getCanonicalUrl('/gramatica'),
    languages: {
      'es': getCanonicalUrl('/gramatica'),
      'ar': getCanonicalUrl('/gramatica'),
    },
  },
  openGraph: {
    title: 'Gramática Española - Conjugación de Verbos y Tablas',
    description: 'Aprende la conjugación de verbos, cambios de género y número con tablas completas y ejercicios interactivos.',
    type: 'website',
    locale: 'es_ES',
    url: getCanonicalUrl('/gramatica'),
    siteName: 'Espanol Hub',
    images: [{
      url: `${BASE_URL}/og-image.png`,
      width: 1200,
      height: 630,
      alt: 'Gramática Española',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@espanolhub',
    creator: '@espanolhub',
    title: 'Gramática Española - Conjugación de Verbos y Tablas',
    description: 'Aprende la conjugación de verbos, cambios de género y número con tablas completas.',
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

export default function GramaticaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
