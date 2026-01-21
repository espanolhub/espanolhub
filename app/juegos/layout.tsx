import { Metadata } from 'next';
import { generateGameSchema, generateBreadcrumbSchema } from '@/lib/utils/schemaMarkup';

export const metadata: Metadata = {
  title: 'Juegos Educativos - Aprende Español Jugando | Español Educativo',
  description: 'Juegos interactivos para aprender español: memoria, preguntas múltiples, completar espacios en blanco, ordenar palabras y más. Aprende divirtiéndote.',
  keywords: 'juegos español, aprender español jugando, juegos educativos, juegos interactivos, español online',
  openGraph: {
    title: 'Juegos Educativos - Aprende Español Jugando',
    description: 'Juegos interactivos para aprender español de forma divertida y efectiva.',
    type: 'website',
    locale: 'es_ES',
    url: 'https://espanol-educativo.com/juegos',
  },
  alternates: {
    canonical: 'https://espanol-educativo.com/juegos',
  },
};

// Schema Markup for Games Collection
const gamesCollectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Juegos Educativos de Español',
  description: 'Colección de juegos interactivos para aprender español',
  numberOfItems: 5,
  itemListElement: [
    {
      '@type': 'Game',
      name: 'Juego de Memoria',
      description: 'Encuentra las parejas de palabras en español',
      position: 1,
      url: 'https://espanol-educativo.com/juegos/memory',
      gamePlatform: ['Web Browser', 'Mobile'],
      genre: 'Educational',
    },
    {
      '@type': 'Game',
      name: 'Opción Múltiple',
      description: 'Responde preguntas de español con múltiples opciones',
      position: 2,
      url: 'https://espanol-educativo.com/juegos/multiple-choice',
      gamePlatform: ['Web Browser', 'Mobile'],
      genre: 'Educational',
    },
    {
      '@type': 'Game',
      name: 'Completar Espacios',
      description: 'Completa las oraciones en español correctamente',
      position: 3,
      url: 'https://espanol-educativo.com/juegos/fill-blank',
      gamePlatform: ['Web Browser', 'Mobile'],
      genre: 'Educational',
    },
    {
      '@type': 'Game',
      name: 'Ordenar Palabras',
      description: 'Ordena las palabras para formar oraciones correctas',
      position: 4,
      url: 'https://espanol-educativo.com/juegos/order',
      gamePlatform: ['Web Browser', 'Mobile'],
      genre: 'Educational',
    },
    {
      '@type': 'Game',
      name: 'Carrera de Palabras',
      description: 'Juego de velocidad para escribir palabras en español',
      position: 5,
      url: 'https://espanol-educativo.com/juegos/word-race',
      gamePlatform: ['Web Browser', 'Mobile'],
      genre: 'Educational',
    },
  ],
};

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Inicio', url: 'https://espanol-educativo.com' },
  { name: 'Juegos', url: 'https://espanol-educativo.com/juegos' },
]);

export default function JuegosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(gamesCollectionSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      {children}
    </>
  );
}
