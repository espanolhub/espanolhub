import { Metadata } from 'next';
import { generateGameSchema, generateBreadcrumbSchema, generateSoftwareApplicationSchema } from '@/lib/utils/schemaMarkup';
import juegosData from '@/lib/library/data/juegos.json';

export const metadata: Metadata = {
  title: 'Juegos Educativos - Aprende Español Jugando | Espanol Hub',
  description: 'Juegos interactivos para aprender español: memoria, preguntas múltiples, completar espacios en blanco, ordenar palabras y más. Aprende divirtiéndote.',
  keywords: 'juegos español, aprender español jugando, juegos educativos, juegos interactivos, español online',
  openGraph: {
    title: 'Juegos Educativos - Aprende Español Jugando',
    description: 'Juegos interactivos para aprender español de forma divertida y efectiva.',
    type: 'website',
    locale: 'es_ES',
    url: 'https://www.espanolhub.com/juegos',
  },
  alternates: {
    canonical: 'https://www.espanolhub.com/juegos',
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
      url: 'https://www.espanolhub.com/juegos/memory',
      gamePlatform: ['Web Browser', 'Mobile'],
      genre: 'Educational',
    },
    {
      '@type': 'Game',
      name: 'Opción Múltiple',
      description: 'Responde preguntas de español con múltiples opciones',
      position: 2,
      url: 'https://www.espanolhub.com/juegos/multiple-choice',
      gamePlatform: ['Web Browser', 'Mobile'],
      genre: 'Educational',
    },
    {
      '@type': 'Game',
      name: 'Completar Espacios',
      description: 'Completa las oraciones en español correctamente',
      position: 3,
      url: 'https://www.espanolhub.com/juegos/fill-blank',
      gamePlatform: ['Web Browser', 'Mobile'],
      genre: 'Educational',
    },
    {
      '@type': 'Game',
      name: 'Ordenar Palabras',
      description: 'Ordena las palabras para formar oraciones correctas',
      position: 4,
      url: 'https://www.espanolhub.com/juegos/order',
      gamePlatform: ['Web Browser', 'Mobile'],
      genre: 'Educational',
    },
    {
      '@type': 'Game',
      name: 'Carrera de Palabras',
      description: 'Juego de velocidad para escribir palabras en español',
      position: 5,
      url: 'https://www.espanolhub.com/juegos/word-race',
      gamePlatform: ['Web Browser', 'Mobile'],
      genre: 'Educational',
    },
  ],
};

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Inicio', url: 'https://www.espanolhub.com' },
  { name: 'Juegos', url: 'https://www.espanolhub.com/juegos' },
]);

// Generate SoftwareApplication schemas for each game
const gameSchemas = Array.isArray(juegosData)
  ? juegosData.map((game: any) =>
      generateSoftwareApplicationSchema({
        name: game.title,
        description: game.summary || game.excerpt,
        url: `https://www.espanolhub.com/juegos/${game.id}`,
        image: game.image ? `https://www.espanolhub.com${game.image}` : undefined,
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'Web Browser, iOS, Android',
        offers: {
          price: '0',
          priceCurrency: 'EUR',
        },
        featureList: [
          'Aprendizaje interactivo',
          'Múltiples niveles de dificultad',
          'Retroalimentación inmediata',
          'Seguimiento de progreso',
        ],
      })
    )
  : [];

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
      {gameSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
      {children}
    </>
  );
}
