import type { Metadata } from 'next';
import Link from 'next/link';
import { generateBlogMetadata } from '@/lib/utils/dynamic-metadata';
import { getAllBlogPosts } from '@/lib/data/blog-posts';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = generateBlogMetadata(
  'Blog - Consejos y Recursos para Aprender Español',
  'Artículos, guías y consejos para aprender español. Gramática, vocabulario, pronunciación y más. Actualizado semanalmente.',
  'blog',
  undefined,
  undefined,
  undefined
);

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Blog de Espanol Hub
          </h1>
          <p className="text-xl text-gray-700">
            Consejos, guías y recursos para aprender español de forma efectiva
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <time dateTime={post.datePublished}>
                          {new Date(post.datePublished).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </time>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readingTime} min</span>
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-700 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center text-blue-600 font-semibold">
                      Leer más <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              ¿Listo para Aprender Español?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Explora nuestros juegos educativos y recursos gratuitos
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/juegos"
                className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-all"
              >
                Ver Juegos
              </Link>
              <Link
                href="/aprender-espanol-gratis"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-all"
              >
                Aprender Más
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
