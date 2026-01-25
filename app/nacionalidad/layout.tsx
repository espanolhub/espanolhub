import type { Metadata } from 'next';
import { BASE_URL, getCanonicalUrl } from '@/lib/config/seo-config';

export const metadata: Metadata = {
  title: 'Nacionalidad Española - Preparación CCSE y DELE A2 | Espanol Hub',
  description: 'Prepárate para los exámenes CCSE y DELE A2 con lecciones completas, exámenes simulados y contenido educativo sobre la cultura y historia española.',
  keywords: ['nacionalidad española', 'CCSE', 'DELE A2', 'examen nacionalidad', 'preparación CCSE', 'ciudadanía española', 'examen español'],
  alternates: {
    canonical: getCanonicalUrl('/nacionalidad'),
    languages: {
      'es': getCanonicalUrl('/nacionalidad'),
      'ar': getCanonicalUrl('/nacionalidad'),
    },
  },
  openGraph: {
    title: 'Nacionalidad Española - Preparación CCSE y DELE A2',
    description: 'Prepárate para los exámenes CCSE y DELE A2 con lecciones completas, exámenes simulados y contenido educativo.',
    type: 'website',
    locale: 'es_ES',
    url: getCanonicalUrl('/nacionalidad'),
    siteName: 'Espanol Hub',
    images: [{
      url: `${BASE_URL}/og-image.png`,
      width: 1200,
      height: 630,
      alt: 'Nacionalidad Española - CCSE',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@espanolhub',
    creator: '@espanolhub',
    title: 'Nacionalidad Española - Preparación CCSE y DELE A2',
    description: 'Prepárate para los exámenes CCSE y DELE A2 con lecciones completas y exámenes simulados.',
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

export default function NacionalidadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}