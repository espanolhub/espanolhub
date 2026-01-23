import type { Metadata } from 'next';
import Link from 'next/link';
import { generateLandingMetadata } from '@/lib/utils/dynamic-metadata';
import { generateLessonSchema } from '@/lib/utils/schemaMarkup';
import { BookOpen, CheckCircle, Gamepad2, Volume2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = generateLandingMetadata(
  'vocabulario español',
  '1000+ Palabras por Temas',
  'Aprende vocabulario español organizado por temas. Familia, trabajo, comida, viajes y más. Con pronunciación y ejemplos.',
  '/vocabulario-espanol-por-temas'
);

// Course Schema
const courseSchema = generateLessonSchema({
  name: 'Vocabulario Español por Temas',
  description: 'Aprende más de 1000 palabras en español organizadas por temas. Familia, trabajo, comida, viajes, salud y más.',
  url: 'https://www.espanolhub.com/vocabulario-espanol-por-temas',
  educationalLevel: 'Beginner to Advanced',
  provider: 'Espanol Hub',
});

export default function VocabularioEspanolPorTemasPage() {
  const vocabularyThemes = [
    {
      id: 'familia',
      title: 'Familia y Relaciones',
      wordCount: 50,
      description: 'Aprende palabras sobre la familia, relaciones y personas cercanas.',
      icon: '👨‍👩‍👧‍👦',
      level: 'Principiante',
    },
    {
      id: 'casa',
      title: 'La Casa',
      wordCount: 80,
      description: 'Vocabulario sobre habitaciones, muebles y objetos del hogar.',
      icon: '🏠',
      level: 'Principiante',
    },
    {
      id: 'comida',
      title: 'Comida y Bebidas',
      wordCount: 100,
      description: 'Nombres de alimentos, platos, bebidas y términos culinarios.',
      icon: '🍽️',
      level: 'Principiante',
    },
    {
      id: 'trabajo',
      title: 'Trabajo y Profesiones',
      wordCount: 70,
      description: 'Profesiones, lugares de trabajo y vocabulario laboral.',
      icon: '💼',
      level: 'Intermedio',
    },
    {
      id: 'viajes',
      title: 'Viajes y Transporte',
      wordCount: 90,
      description: 'Medios de transporte, aeropuertos, hoteles y turismo.',
      icon: '✈️',
      level: 'Intermedio',
    },
    {
      id: 'salud',
      title: 'Salud y Medicina',
      wordCount: 60,
      description: 'Partes del cuerpo, síntomas, medicamentos y hospitales.',
      icon: '🏥',
      level: 'Intermedio',
    },
    {
      id: 'tiempo',
      title: 'Tiempo y Clima',
      wordCount: 40,
      description: 'Días, meses, estaciones, clima y expresiones temporales.',
      icon: '⏰',
      level: 'Principiante',
    },
    {
      id: 'numeros',
      title: 'Números y Cantidades',
      wordCount: 50,
      description: 'Números cardinales, ordinales, fracciones y cantidades.',
      icon: '🔢',
      level: 'Principiante',
    },
    {
      id: 'colores',
      title: 'Colores y Descripciones',
      wordCount: 30,
      description: 'Colores básicos y avanzados, adjetivos descriptivos.',
      icon: '🎨',
      level: 'Principiante',
    },
    {
      id: 'animales',
      title: 'Animales',
      wordCount: 60,
      description: 'Animales domésticos, salvajes, marinos y aves.',
      icon: '🐾',
      level: 'Principiante',
    },
    {
      id: 'deportes',
      title: 'Deportes y Actividades',
      wordCount: 50,
      description: 'Deportes, equipos, actividades físicas y recreativas.',
      icon: '⚽',
      level: 'Intermedio',
    },
    {
      id: 'tecnologia',
      title: 'Tecnología',
      wordCount: 40,
      description: 'Dispositivos, internet, redes sociales y términos digitales.',
      icon: '💻',
      level: 'Intermedio',
    },
    {
      id: 'educacion',
      title: 'Educación',
      wordCount: 50,
      description: 'Escuela, universidad, materias y términos académicos.',
      icon: '📚',
      level: 'Intermedio',
    },
    {
      id: 'tiendas',
      title: 'Compras y Tiendas',
      wordCount: 60,
      description: 'Tipos de tiendas, productos, precios y compras.',
      icon: '🛒',
      level: 'Intermedio',
    },
    {
      id: 'emociones',
      title: 'Emociones y Sentimientos',
      wordCount: 40,
      description: 'Expresar emociones, sentimientos y estados de ánimo.',
      icon: '😊',
      level: 'Intermedio',
    },
    {
      id: 'ciudad',
      title: 'La Ciudad',
      wordCount: 70,
      description: 'Lugares urbanos, edificios, calles y servicios públicos.',
      icon: '🏙️',
      level: 'Intermedio',
    },
    {
      id: 'naturaleza',
      title: 'Naturaleza',
      wordCount: 50,
      description: 'Plantas, árboles, paisajes y elementos naturales.',
      icon: '🌳',
      level: 'Intermedio',
    },
    {
      id: 'ropa',
      title: 'Ropa y Moda',
      wordCount: 50,
      description: 'Prendas de vestir, accesorios y términos de moda.',
      icon: '👕',
      level: 'Principiante',
    },
    {
      id: 'verbos',
      title: 'Verbos Comunes',
      wordCount: 100,
      description: 'Los 100 verbos más usados en español con ejemplos.',
      icon: '📝',
      level: 'Principiante',
    },
    {
      id: 'expresiones',
      title: 'Expresiones Útiles',
      wordCount: 80,
      description: 'Frases comunes, expresiones coloquiales y modismos.',
      icon: '💬',
      level: 'Avanzado',
    },
  ];

  return (
    <>
      {/* Course Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Vocabulario Español <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">por Temas</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8">
              Aprende más de 1000 palabras organizadas por temas. Cada tema incluye pronunciación, ejemplos y ejercicios prácticos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/vocabulario"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                Explorar Vocabulario
              </Link>
              <Link
                href="/juegos"
                className="px-8 py-4 bg-white border-2 border-blue-600 text-blue-600 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all"
              >
                Practicar con Juegos
              </Link>
            </div>
          </div>
        </section>

        {/* Vocabulary Themes Grid */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Temas Disponibles
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vocabularyThemes.map((theme) => (
                <Link
                  key={theme.id}
                  href={`/vocabulario/${theme.id}`}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all transform hover:scale-105"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl">{theme.icon}</span>
                    <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                      {theme.level}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{theme.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{theme.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-600 font-semibold">
                      {theme.wordCount} palabras
                    </span>
                    <ArrowRight className="w-5 h-5 text-blue-600" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              ¿Qué Incluye Cada Tema?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: <Volume2 className="w-8 h-8" />,
                  title: 'Pronunciación',
                  description: 'Escucha la pronunciación correcta de cada palabra con audio nativo.',
                },
                {
                  icon: <BookOpen className="w-8 h-8" />,
                  title: 'Ejemplos de Uso',
                  description: 'Cada palabra viene con ejemplos en oraciones reales.',
                },
                {
                  icon: <Gamepad2 className="w-8 h-8" />,
                  title: 'Ejercicios Interactivos',
                  description: 'Practica con juegos y quizzes después de cada tema.',
                },
                {
                  icon: <CheckCircle className="w-8 h-8" />,
                  title: 'Seguimiento de Progreso',
                  description: 'Marca las palabras que ya conoces y revisa las que necesitas practicar.',
                },
              ].map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="text-blue-600 flex-shrink-0">{feature.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-700">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto bg-blue-50 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Cómo Aprender Vocabulario Efectivamente
            </h2>
            <ol className="space-y-4 text-gray-700">
              <li className="flex gap-4">
                <span className="font-bold text-blue-600 text-xl">1.</span>
                <span>
                  <strong>Elige un tema relevante:</strong> Empieza con temas que uses en tu vida diaria, como familia, comida o trabajo.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="font-bold text-blue-600 text-xl">2.</span>
                <span>
                  <strong>Estudia en contexto:</strong> No memorices listas. Aprende palabras con ejemplos y oraciones.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="font-bold text-blue-600 text-xl">3.</span>
                <span>
                  <strong>Practica regularmente:</strong> Dedica 15-20 minutos diarios. La repetición espaciada es clave.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="font-bold text-blue-600 text-xl">4.</span>
                <span>
                  <strong>Usa los juegos:</strong> Después de estudiar un tema, practica con nuestros <Link href="/juegos" className="text-blue-600 font-semibold hover:underline">juegos de vocabulario</Link>.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="font-bold text-blue-600 text-xl">5.</span>
                <span>
                  <strong>Repasa regularmente:</strong> Vuelve a temas anteriores para reforzar lo aprendido.
                </span>
              </li>
            </ol>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¿Listo para Expandir tu Vocabulario?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Accede a más de 1000 palabras organizadas por temas. Todo gratis y disponible ahora.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/vocabulario"
                className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105"
              >
                Ver Vocabulario
              </Link>
              <Link
                href="/juegos"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white/10 transition-all"
              >
                Jugar Ahora
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
