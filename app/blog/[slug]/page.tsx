import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { generateBlogMetadata } from '@/lib/utils/dynamic-metadata';
import { getBlogPostBySlug, getRelatedBlogPosts } from '@/lib/data/blog-posts';
import { generateArticleSchema, generateBreadcrumbSchema } from '@/lib/utils/schemaMarkup';
import { BASE_URL } from '@/lib/config/seo-config';
import { Calendar, Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post no encontrado',
    };
  }

  return generateBlogMetadata(
    post.title,
    post.excerpt,
    post.slug,
    post.image,
    post.datePublished,
    post.dateModified || post.datePublished
  );
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  const relatedPosts = post ? getRelatedBlogPosts(slug, 3) : [];

  if (!post) {
    notFound();
  }

  // Article Schema
  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.excerpt,
    url: `${BASE_URL}/blog/${post.slug}`,
    image: post.image,
    datePublished: post.datePublished,
    dateModified: post.dateModified || post.datePublished,
    author: post.author || 'Espanol Hub Team',
  });

  // Breadcrumb Schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Inicio', url: BASE_URL },
    { name: 'Blog', url: `${BASE_URL}/blog` },
    { name: post.title, url: `${BASE_URL}/blog/${post.slug}` },
  ]);

  return (
    <>
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4 py-12">
          {/* Breadcrumbs */}
          <nav className="max-w-4xl mx-auto mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-blue-600">
                Inicio
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-blue-600">
                Blog
              </Link>
              <span>/</span>
              <span className="text-gray-900">{post.title}</span>
            </div>
          </nav>

          {/* Article Header */}
          <header className="max-w-4xl mx-auto mb-12">
            <Link
              href="/blog"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al blog
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <time dateTime={post.datePublished}>
                  {new Date(post.datePublished).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{post.readingTime} min de lectura</span>
              </div>
              {post.author && (
                <div>
                  Por <span className="font-semibold">{post.author}</span>
                </div>
              )}
            </div>
            <p className="text-xl text-gray-700 leading-relaxed">{post.excerpt}</p>
          </header>

          {/* Article Content */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 prose prose-lg max-w-none">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Artículos Relacionados
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.slug}
                      href={`/blog/${relatedPost.slug}`}
                      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6"
                    >
                      <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center text-blue-600 font-semibold mt-4 text-sm">
                        Leer más <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Section */}
            <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white text-center">
              <h2 className="text-3xl font-bold mb-4">
                ¿Listo para Aprender Más?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Practica lo que has aprendido con nuestros juegos educativos
              </p>
              <Link
                href="/juegos"
                className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-all"
              >
                Explorar Juegos
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
