import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Recursos Descargables - Guías PDF y Materiales Premium',
  description: 'Descarga guías PDF gratuitas y materiales premium para aprender español. Gramática, vocabulario, preparación para exámenes y más.',
};

export default function RecursosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
