import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cursos y Rutas de Aprendizaje - Español Educativo',
  description: 'Sigue un camino estructurado para aprender español paso a paso con nuestros cursos organizados',
};

export default function CursosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
