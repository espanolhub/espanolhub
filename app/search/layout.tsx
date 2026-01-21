import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Buscar - Español Educativo',
  description: 'Busca lecciones, ejercicios, vocabulario, juegos y más contenido educativo en Español Educativo.',
  openGraph: {
    title: 'Buscar - Español Educativo',
    description: 'Busca lecciones, ejercicios, vocabulario, juegos y más contenido educativo en Español Educativo.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Buscar - Español Educativo',
    description: 'Busca lecciones, ejercicios, vocabulario, juegos y más contenido educativo en Español Educativo.',
  },
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
