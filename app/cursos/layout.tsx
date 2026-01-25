import type { Metadata } from 'next';
import { BASE_URL, getCanonicalUrl } from '@/lib/config/seo-config';

export const metadata: Metadata = {
  title: 'Cursos y Rutas de Aprendizaje - Espanol Hub',
  description: 'Sigue un camino estructurado para aprender español paso a paso con nuestros cursos organizados. Contenido completo y actualizado para todos los niveles.',
  keywords: ['cursos español', 'aprender español', 'rutas aprendizaje', 'cursos online español', 'español principiantes', 'español intermedio'],
  alternates: {
    canonical: getCanonicalUrl('/cursos'),
    languages: {
      'es': getCanonicalUrl('/cursos'),
      'ar': getCanonicalUrl('/cursos'),
    },
  },
  openGraph: {
    title: 'Cursos y Rutas de Aprendizaje - Espanol Hub',
    description: 'Sigue un camino estructurado para aprender español paso a paso con nuestros cursos organizados.',
    type: 'website',
    locale: 'es_ES',
    url: getCanonicalUrl('/cursos'),
    siteName: 'Espanol Hub',
    images: [{
      url: `${BASE_URL}/og-image.png`,
      width: 1200,
      height: 630,
      alt: 'Cursos y Rutas de Aprendizaje',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@espanolhub',
    creator: '@espanolhub',
    title: 'Cursos y Rutas de Aprendizaje - Espanol Hub',
    description: 'Sigue un camino estructurado para aprender español paso a paso.',
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

export default function CursosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
