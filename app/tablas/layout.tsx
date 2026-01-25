import type { Metadata } from 'next';
import { BASE_URL, getCanonicalUrl } from '@/lib/config/seo-config';

export const metadata: Metadata = {
  title: 'Tablas Educativas - Recursos Imprimibles | Espanol Hub',
  description: 'Consulta tablas completas de verbos, adjetivos, artículos y más recursos imprimibles. Materiales educativos para aprender español.',
  keywords: ['tablas español', 'recursos imprimibles', 'tablas verbos', 'tablas gramática', 'materiales educativos'],
  alternates: {
    canonical: getCanonicalUrl('/tablas'),
    languages: {
      'es': getCanonicalUrl('/tablas'),
      'ar': getCanonicalUrl('/tablas'),
    },
  },
  openGraph: {
    title: 'Tablas Educativas - Recursos Imprimibles',
    description: 'Consulta tablas completas de verbos, adjetivos, artículos y más recursos imprimibles.',
    type: 'website',
    locale: 'es_ES',
    url: getCanonicalUrl('/tablas'),
    siteName: 'Espanol Hub',
    images: [{
      url: `${BASE_URL}/og-image.png`,
      width: 1200,
      height: 630,
      alt: 'Tablas Educativas',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@espanolhub',
    creator: '@espanolhub',
    title: 'Tablas Educativas - Recursos Imprimibles',
    description: 'Consulta tablas completas de verbos, adjetivos, artículos y más recursos imprimibles.',
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

export default function TablasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
