import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { getAllBlogPosts } from '@/lib/data/blog-posts';
import { BASE_URL, getCanonicalUrl } from '@/lib/config/seo-config';

export const metadata: Metadata = {
  title: 'Blog - Guías, Consejos y Recursos para Aprender Español | Espanol Hub',
  description: 'Artículos, guías y consejos para aprender español. Contenido de gramática, vocabulario, pronunciación y más. Actualizado semanalmente.',
  keywords: ['aprender español', 'blog español', 'consejos español', 'guías español', 'gramática española', 'vocabulario español'],
  alternates: {
    canonical: getCanonicalUrl('/blog'),
    languages: {
      'es': getCanonicalUrl('/blog'),
      'ar': getCanonicalUrl('/blog'),
    },
  },
  openGraph: {
    title: 'Blog - Guías, Consejos y Recursos para Aprender Español',
    description: 'Artículos, guías y consejos para aprender español. Contenido de gramática, vocabulario, pronunciación y más.',
    type: 'website',
    locale: 'es_ES',
    url: getCanonicalUrl('/blog'),
    siteName: 'Espanol Hub',
    images: [{
      url: `${BASE_URL}/og-image.png`,
      width: 1200,
      height: 630,
      alt: 'Espanol Hub Blog',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@espanolhub',
    creator: '@espanolhub',
    title: 'Blog - Guías, Consejos y Recursos para Aprender Español',
    description: 'Artículos, guías y consejos para aprender español.',
    images: [`${BASE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Blog de Espanol Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Consejos, guías y recursos para aprender español de forma efectiva
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-6 group"
              >
                {/* Post Image */}
                {post.image && (
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                {/* Post Content */}
                <div className="space-y-3">
                  <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  {/* Post Meta */}
                  <div className="flex items-center justify-between text-sm text-gray-500 pt-3 border-t">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <time>
                        {new Date(post.datePublished).toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </time>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{post.readingTime} min</span>
                    </div>
                  </div>

                  {/* Read More */}
                  <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                    Leer más <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              No hay artículos publicados aún
            </h2>
            <p className="text-gray-600 mb-6">
              Pronto publicaremos contenido útil para aprender español
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Volver al inicio
            </Link>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-gray-900 rounded-lg p-12 text-white text-center border border-gray-800">
          <h2 className="text-3xl font-bold mb-4 text-white">
            ¿Listo para Aprender Español?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Explora nuestros recursos educativos gratuitos
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/aprender-espanol-gratis"
              className="inline-block px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-all border border-gray-200"
            >
              Aprender Gratis
            </Link>
            <Link
              href="/juegos"
              className="inline-block px-8 py-4 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition-all border border-gray-700"
            >
              Juegos Educativos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
