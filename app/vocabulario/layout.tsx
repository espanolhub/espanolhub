import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vocabulario Español - Categorías Temáticas',
  description: 'Amplía tu vocabulario con categorías temáticas, imágenes y pronunciación.',
  openGraph: {
    title: 'Vocabulario Español - Categorías Temáticas',
    description: 'Amplía tu vocabulario con categorías temáticas, imágenes y pronunciación.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vocabulario Español - Categorías Temáticas',
    description: 'Amplía tu vocabulario con categorías temáticas, imágenes y pronunciación.',
  },
};

export default function VocabularioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
