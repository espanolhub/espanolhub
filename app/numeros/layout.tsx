import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Números en Español - Del 0 al 1000+',
  description: 'Domina los números del 0 al 1000+ con pronunciación correcta y ejercicios prácticos.',
  openGraph: {
    title: 'Números en Español - Del 0 al 1000+',
    description: 'Domina los números del 0 al 1000+ con pronunciación correcta y ejercicios prácticos.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Números en Español - Del 0 al 1000+',
    description: 'Domina los números del 0 al 1000+ con pronunciación correcta y ejercicios prácticos.',
  },
};

export default function NumerosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
