import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Buscar - Espanol Hub',
  description: 'Busca lecciones, ejercicios, vocabulario, juegos y más contenido educativo en Espanol Hub.',
  openGraph: {
    title: 'Buscar - Espanol Hub',
    description: 'Busca lecciones, ejercicios, vocabulario, juegos y más contenido educativo en Espanol Hub.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Buscar - Espanol Hub',
    description: 'Busca lecciones, ejercicios, vocabulario, juegos y más contenido educativo en Espanol Hub.',
  },
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
