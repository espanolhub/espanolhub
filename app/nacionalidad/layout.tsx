import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nacionalidad Española - Preparación CCSE y DELE A2',
  description: 'Prepárate para los exámenes CCSE y DELE A2 con lecciones completas, exámenes simulados y contenido educativo sobre la cultura y historia española.',
};

export default function NacionalidadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}