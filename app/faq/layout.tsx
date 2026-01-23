import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes (FAQ) - Espanol Hub',
  description: 'Preguntas frecuentes sobre Espanol Hub. Encuentra respuestas a las dudas más comunes sobre nuestro sitio educativo.',
  openGraph: {
    title: 'Preguntas Frecuentes (FAQ) - Espanol Hub',
    description: 'Preguntas frecuentes sobre Espanol Hub. Encuentra respuestas a las dudas más comunes sobre nuestro sitio educativo.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Preguntas Frecuentes (FAQ) - Espanol Hub',
    description: 'Preguntas frecuentes sobre Espanol Hub. Encuentra respuestas a las dudas más comunes sobre nuestro sitio educativo.',
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
