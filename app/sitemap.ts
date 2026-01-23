import { MetadataRoute } from 'next';
import juegosData from '@/lib/library/data/juegos.json';
import lecturaData from '@/lib/library/data/lectura.json';
import gramaticaData from '@/lib/library/data/gramatica.json';
import { BASE_URL } from '@/lib/config/seo-config';

export default function sitemap(): MetadataRoute.Sitemap {
  // استخدام BASE_URL من config
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || BASE_URL;

  // Main pages
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/alfabeto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/numeros`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/lectura`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/gramatica`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/vocabulario`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tablas`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Games pages - Dynamic from juegos.json
  const gamePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/juegos`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Static game pages
    {
      url: `${baseUrl}/juegos/memory`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/juegos/multiple-choice`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/juegos/fill-blank`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/juegos/order`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/juegos/word-race`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Dynamic games from juegos.json
    ...(Array.isArray(juegosData) ? juegosData.map((game: any) => ({
      url: `${baseUrl}/juegos/${game.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })) : []),
  ];

  // Preparation pages
  const preparationPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/nacionalidad`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/driving-license`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tramites`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Courses and resources
  const coursesAndResources: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/cursos`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/recursos`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources.html`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  // Info pages
  const infoPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Legal pages
  const legalPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/aviso-legal`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];

  // Dynamic lesson pages from lectura.json
  const lecturaPages: MetadataRoute.Sitemap = Array.isArray(lecturaData)
    ? lecturaData.map((lesson: any) => ({
        url: `${baseUrl}/lectura/${lesson.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }))
    : [];

  // Dynamic grammar pages from gramatica.json
  const gramaticaPages: MetadataRoute.Sitemap = Array.isArray(gramaticaData)
    ? gramaticaData.map((lesson: any) => ({
        url: `${baseUrl}/gramatica/${lesson.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }))
    : [];

  // SEO Landing Pages
  const seoLandingPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/aprender-espanol-gratis`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/gramatica-espanola-completa`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/vocabulario-espanol-por-temas`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // Combine all pages
  return [
    ...mainPages,
    ...gamePages,
    ...preparationPages,
    ...coursesAndResources,
    ...infoPages,
    ...legalPages,
    ...lecturaPages,
    ...gramaticaPages,
    ...seoLandingPages,
  ];
}
