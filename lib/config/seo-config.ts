/**
 * SEO Configuration - Centralized SEO settings
 * Contains keywords, meta tags templates, and SEO strategies
 */

export const BASE_URL = 'https://www.espanolhub.com';
export const SITE_NAME = 'Espanol Hub';
export const DEFAULT_LOCALE = 'es_ES';

/**
 * Primary Keywords - High search volume, high competition
 * Target: Top 3 positions
 */
export const PRIMARY_KEYWORDS = {
  'aprender español gratis': {
    searchVolume: 4400,
    difficulty: 'high',
    intent: 'informational',
    priority: 1,
  },
  'gramática española': {
    searchVolume: 5400,
    difficulty: 'high',
    intent: 'informational',
    priority: 1,
  },
  'vocabulario español': {
    searchVolume: 3600,
    difficulty: 'medium',
    intent: 'informational',
    priority: 1,
  },
  'español para principiantes': {
    searchVolume: 2900,
    difficulty: 'medium',
    intent: 'informational',
    priority: 1,
  },
};

/**
 * Secondary Keywords - Medium search volume
 * Target: Top 10 positions
 */
export const SECONDARY_KEYWORDS = {
  'ejercicios español': {
    searchVolume: 1200,
    difficulty: 'medium',
    intent: 'informational',
    priority: 2,
  },
  'juegos educativos español': {
    searchVolume: 880,
    difficulty: 'low',
    intent: 'informational',
    priority: 2,
  },
  'aprender español online': {
    searchVolume: 2400,
    difficulty: 'high',
    intent: 'informational',
    priority: 2,
  },
  'cursos español gratis': {
    searchVolume: 1600,
    difficulty: 'medium',
    intent: 'informational',
    priority: 2,
  },
};

/**
 * Long-tail Keywords - Lower search volume, easier to rank
 * Target: Quick wins, featured snippets
 */
export const LONG_TAIL_KEYWORDS = {
  'cómo aprender español rápido': {
    searchVolume: 720,
    difficulty: 'low',
    intent: 'informational',
    priority: 3,
  },
  'mejores recursos aprender español': {
    searchVolume: 480,
    difficulty: 'low',
    intent: 'informational',
    priority: 3,
  },
  'español básico para árabes': {
    searchVolume: 320,
    difficulty: 'low',
    intent: 'informational',
    priority: 3,
  },
  'verbos irregulares español': {
    searchVolume: 590,
    difficulty: 'low',
    intent: 'informational',
    priority: 3,
  },
  'diferencias ser y estar': {
    searchVolume: 810,
    difficulty: 'low',
    intent: 'informational',
    priority: 3,
  },
};

/**
 * Meta Tags Templates by Page Type
 */
export const META_TEMPLATES = {
  home: {
    title: 'Espanol Hub - Aprende Español GRATIS | Gramática, Vocabulario, Juegos',
    description: 'Aprende español 100% gratis. Gramática, vocabulario, juegos educativos, preparación CCSE y carnet de conducir. La mejor plataforma para aprender español online.',
    keywords: ['aprender español gratis', 'gramática española', 'vocabulario español', 'juegos educativos español'],
  },
  game: {
    titleTemplate: '{gameName} - Juego Educativo Gratis | Espanol Hub',
    descriptionTemplate: 'Juega {gameName} gratis. {gameDescription} Aprende español de forma divertida e interactiva.',
  },
  lesson: {
    titleTemplate: '{lessonName} - Lección Gratis | Espanol Hub',
    descriptionTemplate: 'Aprende {lessonName} gratis. {lessonDescription} Incluye ejemplos, ejercicios y explicaciones detalladas.',
  },
  blog: {
    titleTemplate: '{postTitle} | Blog Espanol Hub',
    descriptionTemplate: '{postExcerpt} Lee más en el blog de Espanol Hub.',
  },
  landing: {
    titleTemplate: '{keyword} - {valueProposition} | Espanol Hub',
    descriptionTemplate: '{description} 100% gratis. Sin registro. Empieza ahora.',
  },
};

/**
 * Open Graph Defaults
 */
export const OPEN_GRAPH_DEFAULTS = {
  type: 'website',
  locale: DEFAULT_LOCALE,
  siteName: SITE_NAME,
  url: BASE_URL,
  images: [
    {
      url: `${BASE_URL}/og-image.png`,
      width: 1200,
      height: 630,
      alt: SITE_NAME,
    },
  ],
};

/**
 * Twitter Card Defaults
 */
export const TWITTER_DEFAULTS = {
  card: 'summary_large_image',
  site: '@espanolhub',
  creator: '@espanolhub',
};

/**
 * Canonical URL Generator
 */
export function getCanonicalUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_URL}${cleanPath}`;
}

/**
 * Generate Keywords Array for Meta Tags
 */
export function generateKeywordsArray(
  primary: string[] = [],
  secondary: string[] = [],
  longTail: string[] = []
): string[] {
  const baseKeywords = [
    'aprender español',
    'español gratis',
    'gramática española',
    'vocabulario español',
    'juegos educativos',
    'español online',
  ];

  return [...new Set([...baseKeywords, ...primary, ...secondary, ...longTail])];
}

/**
 * Page-Specific SEO Configurations
 */
export const PAGE_SEO_CONFIG = {
  '/aprender-espanol-gratis': {
    primaryKeyword: 'aprender español gratis',
    title: 'Aprende Español GRATIS en 2025 | La Mejor Plataforma Online',
    description: 'Aprende español 100% gratis sin registro. Gramática, vocabulario, juegos interactivos, preparación CCSE y más. Empieza ahora.',
    h1: 'Aprende Español GRATIS',
    focusKeyword: 'aprender español gratis',
  },
  '/gramatica-espanola-completa': {
    primaryKeyword: 'gramática española',
    title: 'Gramática Española Completa - Guía Gratis 2025',
    description: 'Aprende toda la gramática española gratis. Verbos, tiempos, artículos, pronombres y más. Ejercicios interactivos incluidos.',
    h1: 'Gramática Española Completa',
    focusKeyword: 'gramática española',
  },
  '/vocabulario-espanol-por-temas': {
    primaryKeyword: 'vocabulario español',
    title: 'Vocabulario Español por Temas - 1000+ Palabras Gratis',
    description: 'Aprende vocabulario español organizado por temas. Familia, trabajo, comida, viajes y más. Con pronunciación y ejemplos.',
    h1: 'Vocabulario Español por Temas',
    focusKeyword: 'vocabulario español',
  },
  '/blog': {
    primaryKeyword: 'aprender español',
    title: 'Blog - Consejos y Recursos para Aprender Español',
    description: 'Artículos, guías y consejos para aprender español. Gramática, vocabulario, pronunciación y más. Actualizado semanalmente.',
    h1: 'Blog de Espanol Hub',
    focusKeyword: 'aprender español',
  },
};

/**
 * Internal Linking Strategy
 * Maps pages to related content for smart internal linking
 */
export const INTERNAL_LINKING = {
  '/aprender-espanol-gratis': [
    { url: '/gramatica-espanola-completa', anchor: 'Gramática Española Completa' },
    { url: '/vocabulario-espanol-por-temas', anchor: 'Vocabulario por Temas' },
    { url: '/juegos', anchor: 'Juegos Educativos' },
    { url: '/lectura', anchor: 'Lecturas en Español' },
  ],
  '/gramatica-espanola-completa': [
    { url: '/vocabulario-espanol-por-temas', anchor: 'Vocabulario Español' },
    { url: '/juegos', anchor: 'Practica con Juegos' },
    { url: '/lectura', anchor: 'Aplica lo Aprendido' },
  ],
  '/vocabulario-espanol-por-temas': [
    { url: '/gramatica-espanola-completa', anchor: 'Gramática Española' },
    { url: '/juegos', anchor: 'Juegos de Vocabulario' },
    { url: '/lectura', anchor: 'Lecturas con Vocabulario' },
  ],
};

/**
 * Schema Markup Types by Page
 */
export const SCHEMA_TYPES = {
  game: 'SoftwareApplication',
  lesson: 'Course',
  blog: 'Article',
  landing: 'WebPage',
  home: 'WebSite',
} as const;
