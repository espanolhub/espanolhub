import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lectura y Comprensión - Textos y Diálogos',
  description: 'Mejora tu comprensión lectora con textos graduados, diálogos cotidianos y ejercicios de comprensión.',
  openGraph: {
    title: 'Lectura y Comprensión - Textos y Diálogos',
    description: 'Mejora tu comprensión lectora con textos graduados, diálogos cotidianos y ejercicios de comprensión.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lectura y Comprensión - Textos y Diálogos',
    description: 'Mejora tu comprensión lectora con textos graduados, diálogos cotidianos y ejercicios de comprensión.',
  },
};

export default function LecturaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
