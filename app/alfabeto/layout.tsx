import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Alfabeto Español - Aprende las 27 Letras',
  description: 'Aprende las 27 letras del alfabeto español con pronunciación, ejemplos y ejercicios interactivos.',
  openGraph: {
    title: 'Alfabeto Español - Aprende las 27 Letras',
    description: 'Aprende las 27 letras del alfabeto español con pronunciación, ejemplos y ejercicios interactivos.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alfabeto Español - Aprende las 27 Letras',
    description: 'Aprende las 27 letras del alfabeto español con pronunciación, ejemplos y ejercicios interactivos.',
  },
};

export default function AlfabetoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
