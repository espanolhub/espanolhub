import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre Nosotros - Español Educativo',
  description: 'Conoce más sobre Español Educativo, nuestra misión, visión y el equipo detrás del mejor sitio educativo para aprender español.',
  openGraph: {
    title: 'Sobre Nosotros - Español Educativo',
    description: 'Conoce más sobre Español Educativo, nuestra misión, visión y el equipo detrás del mejor sitio educativo para aprender español.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sobre Nosotros - Español Educativo',
    description: 'Conoce más sobre Español Educativo, nuestra misión, visión y el equipo detrás del mejor sitio educativo para aprender español.',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
