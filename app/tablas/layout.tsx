import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tablas Educativas - Recursos Imprimibles',
  description: 'Consulta tablas completas de verbos, adjetivos, artículos y más recursos imprimibles.',
};

export default function TablasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
