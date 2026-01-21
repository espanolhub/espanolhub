import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gramática Española - Conjugación de Verbos y Tablas',
  description: 'Aprende la conjugación de verbos, cambios de género y número con tablas completas.',
};

export default function GramaticaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
