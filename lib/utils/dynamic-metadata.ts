/**
 * Dynamic Metadata Generator
 * Generates SEO-optimized metadata for different page types
 */

import type { Metadata } from 'next';
import {
  BASE_URL,
  SITE_NAME,
  DEFAULT_LOCALE,
  META_TEMPLATES,
  OPEN_GRAPH_DEFAULTS,
  TWITTER_DEFAULTS,
  generateKeywordsArray,
  getCanonicalUrl,
  PAGE_SEO_CONFIG,
} from '@/lib/config/seo-config';

export interface MetadataOptions {
  title?: string;
  description?: string;
  keywords?: string[];
  path?: string;
  image?: string;
  type?: 'website' | 'article' | 'course' | 'game';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

/**
 * Generate dynamic metadata for any page
 */
export function generateMetadata(options: MetadataOptions): Metadata {
  const {
    title,
    description,
    keywords = [],
    path = '/',
    image,
    type = 'website',
    publishedTime,
    modifiedTime,
    author,
    noindex = false,
    nofollow = false,
  } = options;

  const canonicalUrl = getCanonicalUrl(path);
  const ogImage = image || `${BASE_URL}/og-image.png`;

  // Generate title (max 60 chars for SEO)
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} - Aprende Español GRATIS`;

  // Generate description (150-160 chars optimal)
  const metaDescription =
    description && description.length >= 120 && description.length <= 160
      ? description
      : description || 'Aprende español gratis. Gramática, vocabulario, juegos educativos y más.';

  // Generate keywords array
  const keywordsArray = generateKeywordsArray(keywords);

  const metadata: Metadata = {
    title: fullTitle,
    description: metaDescription,
    keywords: keywordsArray,
    authors: [{ name: author || 'Espanol Hub Team' }],
    creator: 'Espanol Hub',
    publisher: 'Espanol Hub',
    robots: {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: type === 'article' ? 'article' : 'website',
      locale: DEFAULT_LOCALE,
      url: canonicalUrl,
      siteName: SITE_NAME,
      title: fullTitle,
      description: metaDescription,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title || SITE_NAME,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      ...TWITTER_DEFAULTS,
      title: fullTitle,
      description: metaDescription,
      images: [ogImage],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        es: canonicalUrl,
        ar: canonicalUrl,
      },
    },
    metadataBase: new URL(BASE_URL),
  };

  return metadata;
}

/**
 * Generate metadata for game pages
 */
export function generateGameMetadata(
  gameName: string,
  gameDescription: string,
  gameUrl: string,
  gameImage?: string
): Metadata {
  return generateMetadata({
    title: META_TEMPLATES.game.titleTemplate
      .replace('{gameName}', gameName)
      .replace('{gameDescription}', gameDescription),
    description: META_TEMPLATES.game.descriptionTemplate
      .replace('{gameName}', gameName)
      .replace('{gameDescription}', gameDescription),
    keywords: ['juegos educativos', 'aprender español jugando', gameName],
    path: gameUrl,
    image: gameImage,
    type: 'game',
  });
}

/**
 * Generate metadata for lesson pages
 */
export function generateLessonMetadata(
  lessonName: string,
  lessonDescription: string,
  lessonUrl: string,
  lessonImage?: string
): Metadata {
  return generateMetadata({
    title: META_TEMPLATES.lesson.titleTemplate
      .replace('{lessonName}', lessonName)
      .replace('{lessonDescription}', lessonDescription),
    description: META_TEMPLATES.lesson.descriptionTemplate
      .replace('{lessonName}', lessonName)
      .replace('{lessonDescription}', lessonDescription),
    keywords: ['gramática española', 'vocabulario español', lessonName],
    path: lessonUrl,
    image: lessonImage,
    type: 'course',
  });
}

/**
 * Generate metadata for blog posts
 */
export function generateBlogMetadata(
  postTitle: string,
  postExcerpt: string,
  postSlug: string,
  postImage?: string,
  publishedTime?: string,
  modifiedTime?: string
): Metadata {
  return generateMetadata({
    title: META_TEMPLATES.blog.titleTemplate.replace('{postTitle}', postTitle),
    description: META_TEMPLATES.blog.descriptionTemplate.replace('{postExcerpt}', postExcerpt),
    keywords: ['aprender español', 'consejos español', postTitle],
    path: `/blog/${postSlug}`,
    image: postImage,
    type: 'article',
    publishedTime,
    modifiedTime,
    author: 'Espanol Hub Team',
  });
}

/**
 * Generate metadata for landing pages
 */
export function generateLandingMetadata(
  keyword: string,
  valueProposition: string,
  description: string,
  path: string
): Metadata {
  const config = PAGE_SEO_CONFIG[path as keyof typeof PAGE_SEO_CONFIG];
  
  return generateMetadata({
    title: config?.title || META_TEMPLATES.landing.titleTemplate
      .replace('{keyword}', keyword)
      .replace('{valueProposition}', valueProposition),
    description: config?.description || META_TEMPLATES.landing.descriptionTemplate
      .replace('{description}', description),
    keywords: [keyword, ...generateKeywordsArray()],
    path,
    type: 'website',
  });
}

/**
 * Generate metadata for home page
 */
export function generateHomeMetadata(): Metadata {
  return generateMetadata({
    title: META_TEMPLATES.home.title,
    description: META_TEMPLATES.home.description,
    keywords: META_TEMPLATES.home.keywords,
    path: '/',
    type: 'website',
  });
}
