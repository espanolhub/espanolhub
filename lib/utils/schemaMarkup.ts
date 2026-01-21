/**
 * Schema Markup Utilities for Rich Snippets
 * Generates structured data for Google Search
 */

export interface GameSchema {
  name: string;
  description: string;
  url: string;
  image?: string;
  category?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime?: number; // in minutes
}

export interface LessonSchema {
  name: string;
  description: string;
  url: string;
  image?: string;
  educationalLevel?: string;
  courseMode?: 'online' | 'blended' | 'onsite';
  provider?: string;
}

/**
 * Generate Game Schema Markup (VideoGame type)
 * Shows as Rich Snippet in Google Search
 */
export function generateGameSchema(game: GameSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Game',
    name: game.name,
    description: game.description,
    url: game.url,
    image: game.image || `${game.url}/og-image.png`,
    gameItem: {
      '@type': 'Thing',
      name: game.name,
    },
    gamePlatform: ['Web Browser', 'Mobile'],
    genre: game.category || 'Educational',
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student',
    },
    inLanguage: ['es', 'ar'],
    learningResourceType: 'Interactive Game',
    educationalUse: 'Learning',
    interactivityType: 'active',
    typicalAgeRange: '12-99',
    ...(game.estimatedTime && {
      timeRequired: `PT${game.estimatedTime}M`,
    }),
  };
}

/**
 * Generate Course/Lesson Schema Markup (Course type)
 * Shows as Rich Snippet with course information
 */
export function generateLessonSchema(lesson: LessonSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: lesson.name,
    description: lesson.description,
    url: lesson.url,
    image: lesson.image || `${lesson.url}/og-image.png`,
    provider: {
      '@type': 'EducationalOrganization',
      name: lesson.provider || 'Español Educativo',
      url: 'https://espanol-educativo.com',
    },
    courseMode: lesson.courseMode || 'online',
    inLanguage: ['es', 'ar'],
    educationalLevel: lesson.educationalLevel || 'Beginner to Advanced',
    teaches: 'Spanish Language',
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student',
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: 'Self-paced',
    },
    isAccessibleForFree: true,
    learningResourceType: 'Interactive Lesson',
    educationalUse: 'Learning Spanish',
  };
}

/**
 * Generate FAQ Schema Markup (FAQPage type)
 * Shows as expandable FAQ in Google Search
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate BreadcrumbList Schema (Breadcrumbs)
 * Shows navigation breadcrumbs in search results
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate WebSite Schema with Search Action
 * Enables site search in Google
 */
export function generateWebsiteSchema(baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Español Educativo',
    url: baseUrl,
    description: 'Aprende español de forma completa e interactiva',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: ['es', 'ar'],
  };
}

/**
 * Generate Organization Schema
 * Shows organization information in Knowledge Graph
 */
export function generateOrganizationSchema(baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Español Educativo',
    alternateName: 'تعليم الإسبانية',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: 'Platform educativa para aprender español de forma completa e interactiva',
    sameAs: [
      'https://www.tiktok.com/@esconabdou',
      // Add more social media links as needed
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['Spanish', 'Arabic'],
    },
  };
}

/**
 * Generate Article Schema for blog posts or lessons
 */
export function generateArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url: article.url,
    image: article.image || `${article.url}/og-image.png`,
    datePublished: article.datePublished || new Date().toISOString(),
    dateModified: article.dateModified || new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: article.author || 'Español Educativo',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Español Educativo',
      logo: {
        '@type': 'ImageObject',
        url: 'https://espanol-educativo.com/logo.png',
      },
    },
    inLanguage: ['es', 'ar'],
  };
}

/**
 * Generate VideoObject Schema for video lessons
 */
export function generateVideoSchema(video: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string; // ISO 8601 format (e.g., "PT5M30S")
  contentUrl?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.name,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl,
    uploadDate: video.uploadDate,
    duration: video.duration,
    contentUrl: video.contentUrl,
    embedUrl: video.contentUrl,
    publisher: {
      '@type': 'Organization',
      name: 'Español Educativo',
      logo: {
        '@type': 'ImageObject',
        url: 'https://espanol-educativo.com/logo.png',
      },
    },
    inLanguage: ['es', 'ar'],
  };
}
