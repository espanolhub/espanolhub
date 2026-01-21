import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // استخدام متغير البيئة أو الرابط الافتراضي
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://espanolhub.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/api/',
          '/login',
          '/thank-you',
          '/account',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
