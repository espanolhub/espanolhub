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
      name: lesson.provider || 'Espanol Hub',
      url: 'https://www.espanolhub.com',
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
    name: 'Espanol Hub',
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
    name: 'Espanol Hub',
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
      name: article.author || 'Espanol Hub',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Espanol Hub',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.espanolhub.com/logo.png',
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
      name: 'Espanol Hub',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.espanolhub.com/logo.png',
      },
    },
    inLanguage: ['es', 'ar'],
  };
}

/**
 * Generate SoftwareApplication Schema for educational games
 * Shows as Rich Snippet with app information in search results
 */
export function generateSoftwareApplicationSchema(app: {
  name: string;
  description: string;
  url: string;
  image?: string;
  applicationCategory?: string;
  operatingSystem?: string;
  offers?: {
    price?: string;
    priceCurrency?: string;
  };
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
    bestRating?: number;
    worstRating?: number;
  };
  screenshot?: string;
  featureList?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: app.name,
    description: app.description,
    url: app.url,
    image: app.image || `${app.url}/og-image.png`,
    applicationCategory: app.applicationCategory || 'EducationalApplication',
    operatingSystem: app.operatingSystem || 'Web Browser, iOS, Android',
    offers: app.offers || {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
    },
    ...(app.aggregateRating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: app.aggregateRating.ratingValue,
        reviewCount: app.aggregateRating.reviewCount,
        bestRating: app.aggregateRating.bestRating || 5,
        worstRating: app.aggregateRating.worstRating || 1,
      },
    }),
    ...(app.screenshot && { screenshot: app.screenshot }),
    ...(app.featureList && { featureList: app.featureList }),
    publisher: {
      '@type': 'Organization',
      name: 'Espanol Hub',
      url: 'https://www.espanolhub.com',
    },
    inLanguage: ['es', 'ar'],
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student',
    },
  };
}

/**
 * Generate HowTo Schema for step-by-step guides
 * Shows as Rich Snippet with expandable steps in search results
 */
export function generateHowToSchema(howTo: {
  name: string;
  description: string;
  image?: string;
  estimatedCost?: {
    currency: string;
    value: string;
  };
  totalTime?: string; // ISO 8601 format (e.g., "PT30M")
  supply?: Array<{ '@type': string; name: string }>;
  tool?: Array<{ '@type': string; name: string }>;
  step: Array<{
    '@type': string;
    name: string;
    text: string;
    image?: string;
    url?: string;
  }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: howTo.name,
    description: howTo.description,
    image: howTo.image,
    ...(howTo.estimatedCost && {
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: howTo.estimatedCost.currency,
        value: howTo.estimatedCost.value,
      },
    }),
    ...(howTo.totalTime && { totalTime: howTo.totalTime }),
    ...(howTo.supply && { supply: howTo.supply }),
    ...(howTo.tool && { tool: howTo.tool }),
    step: howTo.step.map((step, index) => ({
      '@type': step['@type'] || 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && { image: step.image }),
      ...(step.url && { url: step.url }),
    })),
  };
}

/**
 * Generate Review Schema for user reviews/ratings
 * Shows as Rich Snippet with star ratings in search results
 */
export function generateReviewSchema(review: {
  itemReviewed: {
    '@type': string;
    name: string;
    description?: string;
    image?: string;
  };
  reviewRating: {
    ratingValue: number;
    bestRating?: number;
    worstRating?: number;
  };
  author: {
    name: string;
    type?: string;
  };
  reviewBody?: string;
  datePublished?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': review.itemReviewed['@type'],
      name: review.itemReviewed.name,
      ...(review.itemReviewed.description && { description: review.itemReviewed.description }),
      ...(review.itemReviewed.image && { image: review.itemReviewed.image }),
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.reviewRating.ratingValue,
      bestRating: review.reviewRating.bestRating || 5,
      worstRating: review.reviewRating.worstRating || 1,
    },
    author: {
      '@type': review.author.type || 'Person',
      name: review.author.name,
    },
    ...(review.reviewBody && { reviewBody: review.reviewBody }),
    ...(review.datePublished && { datePublished: review.datePublished }),
    publisher: {
      '@type': 'Organization',
      name: 'Espanol Hub',
    },
  };
}

/**
 * Generate AggregateRating Schema
 * Shows average rating and review count in search results
 */
export function generateAggregateRatingSchema(rating: {
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
  worstRating?: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue: rating.ratingValue,
    reviewCount: rating.reviewCount,
    bestRating: rating.bestRating || 5,
    worstRating: rating.worstRating || 1,
  };
}
