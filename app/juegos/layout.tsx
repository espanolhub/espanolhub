import { Metadata } from 'next';
import { generateBreadcrumbSchema } from '@/lib/utils/schemaMarkup';
import { BASE_URL, getCanonicalUrl } from '@/lib/config/seo-config';

export const metadata: Metadata = {
  title: 'Juegos Educativos - Aprende Español Jugando | Espanol Hub',
  description: 'Juegos interactivos para aprender español: memoria, preguntas múltiples, completar espacios en blanco, ordenar palabras y más. Aprende divirtiéndote.',
  keywords: ['juegos español', 'aprender español jugando', 'juegos educativos', 'juegos interactivos', 'español online', 'juegos gratis español'],
  alternates: {
    canonical: getCanonicalUrl('/juegos'),
    languages: {
      'es': getCanonicalUrl('/juegos'),
      'ar': getCanonicalUrl('/juegos'),
    },
  },
  openGraph: {
    title: 'Juegos Educativos - Aprende Español Jugando',
    description: 'Juegos interactivos para aprender español de forma divertida y efectiva.',
    type: 'website',
    locale: 'es_ES',
    url: getCanonicalUrl('/juegos'),
    siteName: 'Espanol Hub',
    images: [{
      url: `${BASE_URL}/og-image.png`,
      width: 1200,
      height: 630,
      alt: 'Juegos Educativos',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@espanolhub',
    creator: '@espanolhub',
    title: 'Juegos Educativos - Aprende Español Jugando',
    description: 'Juegos interactivos para aprender español de forma divertida y efectiva.',
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

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Inicio', url: BASE_URL },
  { name: 'Juegos', url: `${BASE_URL}/juegos` },
]);

export default function JuegosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      {children}
    </>
  );
}
