import { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/config/seo-config';
import { getAllLessons } from '@/lib/data/grammar-lessons';
import { getAllBlogPosts } from '@/lib/data/blog-posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || BASE_URL;

  // Main pages
  const mainPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/alfabeto`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/numeros`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/lectura`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/gramatica`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/vocabulario`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/tablas`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];

  // Juegos: single /juegos page only (no sub-routes)
  const gamePages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/juegos`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  ];

  // Preparation pages
  const preparationPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/nacionalidad`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/driving-license`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/tramites`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  ];

  // Courses and resources
  const coursesAndResources: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/cursos`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/recursos`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/resources.html`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  ];

  // Info pages
  const infoPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/pricing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];

  // Legal pages
  const legalPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/cookies`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/aviso-legal`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
  ];

  // Grammar: from grammar-lessons (actual app routes)
  const gramaticaPages: MetadataRoute.Sitemap = getAllLessons().map((lesson) => ({
    url: `${baseUrl}/gramatica/${lesson.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Blog: index + individual posts
  const blogPosts = getAllBlogPosts();
  const blogPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.dateModified || post.datePublished),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ];

  // SEO Landing Pages
  const seoLandingPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/aprender-espanol-gratis`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/gramatica-espanola-completa`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/curso-espanol-principiantes`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/aprender-espanol-online-gratis`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/ejercicios-espanol-interactivos`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/conjugador-verbos`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/examenes-espanol-gratis`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/diccionario-espanol-visual`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/frases-espanol-conversacion`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/pronunciacion-espanol-guia`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/verbos-irregulares-espanol-lista`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/espanol-para-arabes`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  ];

  // Tools and Simulators
  const toolPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/simulator`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  ];

  return [
    ...mainPages,
    ...gamePages,
    ...preparationPages,
    ...coursesAndResources,
    ...infoPages,
    ...legalPages,
    ...gramaticaPages,
    ...blogPages,
    ...seoLandingPages,
    ...toolPages,
  ];
}
