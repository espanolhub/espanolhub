import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, BookOpen, Lightbulb, ArrowRight } from 'lucide-react';
import { getLessonById, getAllLessons } from '@/lib/data/grammar-lessons';
import Breadcrumbs from '@/components/Breadcrumbs';
import SmartInternalLinks from '@/components/SmartInternalLinks';
import MarkdownRenderer from '@/components/MarkdownRenderer';

interface GrammarLessonPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: GrammarLessonPageProps): Promise<Metadata> {
  const { id } = await params;
  const lesson = getLessonById(id);
  
  if (!lesson) {
    return {
      title: 'Lección no encontrada | Espanol Hub',
    };
  }

  const title = `${lesson.title} - Gramática Española | Espanol Hub`;
  const description = lesson.content.substring(0, 160).replace(/[#*]/g, '').trim() || `Aprende ${lesson.title} en español. Explicaciones claras con ejemplos y ejercicios prácticos.`;
  
  return {
    title,
    description,
    keywords: ['gramática española', lesson.title, 'aprender español', 'lección español', lesson.category],
    alternates: {
      canonical: `https://www.espanolhub.com/gramatica/${id}`,
      languages: {
        'es': `https://www.espanolhub.com/gramatica/${id}`,
      },
    },
    openGraph: {
      title,
      description,
      type: 'article',
      locale: 'es_ES',
      url: `https://www.espanolhub.com/gramatica/${id}`,
      siteName: 'Espanol Hub',
      images: [{
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: lesson.title,
      }],
    },
  };
}

export async function generateStaticParams() {
  const lessons = getAllLessons();
  return lessons.map((lesson) => ({
    id: lesson.id,
  }));
}

export default async function GrammarLessonPage({ params }: GrammarLessonPageProps) {
  const { id } = await params;
  const lesson = getLessonById(id);

  if (!lesson) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--bg-base)]">
      <div className="bg-gradient-to-br from-red-50 to-pink-50 py-8">
        <div className="container mx-auto px-4 max-w-5xl">
          <Breadcrumbs className="mb-6" />
          
          <Link
            href="/gramatica-espanola-completa"
            className="inline-flex items-center gap-2 text-white bg-purple-600 hover:bg-purple-700 font-semibold mb-6 transition-colors px-4 py-2 rounded-lg shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Curso de Gramática
          </Link>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  lesson.level === 'beginner' 
                    ? 'bg-green-100 text-green-700' 
                    : lesson.level === 'intermediate' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-purple-100 text-purple-700'
                }`}>
                  {lesson.level === 'beginner' ? 'Principiante' : lesson.level === 'intermediate' ? 'Intermedio' : 'Avanzado'}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-900 rounded-full text-sm font-semibold capitalize">
                  {lesson.category}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                {lesson.title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <main className="py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* Spanish Content */}
          <section className="mb-12">
            <div className="prose prose-lg max-w-none">
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-gray-200">
                <MarkdownRenderer>
                  {lesson.content}
                </MarkdownRenderer>
              </div>
            </div>
          </section>

          {/* Examples Section */}
          {lesson.examples && lesson.examples.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-red-600" />
                Ejemplos Prácticos
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {lesson.examples.map((example, index) => (
                  <div key={index} className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-5 border border-red-100 shadow-md">
                    <div className="text-lg font-bold text-red-600 mb-2">
                      {example.spanish}
                    </div>
                    <div className="text-gray-900 mb-1" dir="rtl">
                      {example.arabic}
                    </div>
                    {example.english && (
                      <div className="text-sm text-gray-600 italic">
                        {example.english}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Tips Section */}
          {lesson.tips && lesson.tips.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Lightbulb className="w-6 h-6 text-yellow-500" />
                Consejos Útiles
              </h2>
              <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200 shadow-md">
                <ul className="space-y-3">
                  {lesson.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-900">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Arabic Tips */}
              <div className="mt-4 bg-blue-50 rounded-xl p-6 border border-blue-200 shadow-md" dir="rtl">
                <h3 className="text-lg font-bold text-gray-900 mb-4">نصائح بالعربية</h3>
                <ul className="space-y-3">
                  {lesson.tipsAr.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-900">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Practice CTA */}
          <section className="mb-12 bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl p-8 text-center text-white shadow-xl">
            <h2 className="text-2xl font-bold mb-4">
              ¿Listo para Practicar?
            </h2>
            <p className="text-lg mb-6 text-white/90">
              Refuerza lo aprendido con ejercicios interactivos
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/gramatica/ejercicios"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-red-600 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                Hacer Ejercicios
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/juegos"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all"
              >
                Jugar Ahora
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </section>

          <SmartInternalLinks title="Lecciones Relacionadas" />
        </div>
      </main>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LearningResource",
            "name": lesson.title,
            "description": lesson.content.substring(0, 200).replace(/[#*]/g, '').trim(),
            "educationalLevel": lesson.level,
            "inLanguage": ["es", "ar"],
            "isAccessibleForFree": true,
            "learningResourceType": "Lesson",
            "provider": {
              "@type": "Organization",
              "name": "Espanol Hub",
              "url": "https://www.espanolhub.com"
            }
          }),
        }}
      />
    </div>
  );
}
