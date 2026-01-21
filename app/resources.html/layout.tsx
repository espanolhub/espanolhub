import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Biblioteca de Recursos - Guías PDF, Cuadernos y Hojas de Referencia',
  description: 'Explora nuestra biblioteca completa de recursos educativos: guías gratuitas, cuadernos de ejercicios y hojas de referencia de gramática.',
};

export default function ResourcesLibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
