import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes (FAQ) - Español Educativo',
  description: 'Preguntas frecuentes sobre Español Educativo. Encuentra respuestas a las dudas más comunes sobre nuestro sitio educativo.',
  openGraph: {
    title: 'Preguntas Frecuentes (FAQ) - Español Educativo',
    description: 'Preguntas frecuentes sobre Español Educativo. Encuentra respuestas a las dudas más comunes sobre nuestro sitio educativo.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Preguntas Frecuentes (FAQ) - Español Educativo',
    description: 'Preguntas frecuentes sobre Español Educativo. Encuentra respuestas a las dudas más comunes sobre nuestro sitio educativo.',
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
