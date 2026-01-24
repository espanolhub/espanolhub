import type { Metadata } from 'next';
import Link from 'next/link';
import { generateLandingMetadata } from '@/lib/utils/dynamic-metadata';
import { generateHowToSchema, generateLessonSchema } from '@/lib/utils/schemaMarkup';
import { BookOpen, CheckCircle, Gamepad2, ArrowRight, Book, GraduationCap } from 'lucide-react';
import { getAllLessons } from '@/lib/data/grammar-lessons';
import Breadcrumbs from '@/components/Breadcrumbs';
import SmartInternalLinks from '@/components/SmartInternalLinks';

export const metadata: Metadata = generateLandingMetadata(
  'gramática española',
  'Fundamentos Gratis 2025',
  'Seis lecciones esenciales: Ser/Estar, artículos, presente, pretérito, subjuntivo y por/para. Ejercicios y ejemplos en español y árabe.',
  '/gramatica-espanola-completa'
);

// HowTo Schema for learning grammar
const howToSchema = generateHowToSchema({
  name: 'Cómo Aprender Gramática Española Completa',
  description: 'Guía paso a paso para dominar toda la gramática española',
  totalTime: 'PT60H',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Aprende el Alfabeto y Pronunciación',
      text: 'Comienza con el alfabeto español de 27 letras y la pronunciación básica. Esto es fundamental para todo lo demás.',
      url: 'https://www.espanolhub.com/alfabeto',
    },
    {
      '@type': 'HowToStep',
      name: 'Domina los Artículos',
      text: 'Aprende cuándo usar el, la, los, las (definidos) y un, una, unos, unas (indefinidos).',
      url: 'https://www.espanolhub.com/gramatica',
    },
    {
      '@type': 'HowToStep',
      name: 'Entiende el Género de los Sustantivos',
      text: 'Todos los sustantivos en español tienen género (masculino o femenino). Aprende las reglas y excepciones.',
    },
    {
      '@type': 'HowToStep',
      name: 'Aprende los Adjetivos',
      text: 'Los adjetivos deben coincidir en género y número con los sustantivos. Practica con ejemplos.',
    },
    {
      '@type': 'HowToStep',
      name: 'Domina Ser y Estar',
      text: 'Dos verbos que significan "to be" pero se usan de forma diferente. Ser para características permanentes, Estar para ubicación y estados temporales.',
    },
    {
      '@type': 'HowToStep',
      name: 'Aprende los Tiempos Verbales',
      text: 'Comienza con el presente, luego el pretérito, imperfecto, futuro y condicional. Practica cada uno con ejercicios.',
    },
    {
      '@type': 'HowToStep',
      name: 'Estudia los Verbos Irregulares',
      text: 'Aprende los verbos irregulares más comunes y sus patrones de conjugación.',
    },
    {
      '@type': 'HowToStep',
      name: 'Practica con Ejercicios',
      text: 'Usa nuestros juegos interactivos y ejercicios para poner en práctica todo lo aprendido.',
      url: 'https://www.espanolhub.com/juegos',
    },
  ],
});

// Course Schema
const courseSchema = generateLessonSchema({
  name: 'Gramática Española Completa',
  description: 'Curso completo de gramática española desde principiante hasta avanzado. Incluye verbos, tiempos, artículos, pronombres y más.',
  url: 'https://www.espanolhub.com/gramatica-espanola-completa',
  educationalLevel: 'Beginner to Advanced',
  provider: 'Espanol Hub',
});

export default function GramaticaEspanolaCompletaPage() {
  // Get actual grammar lessons from data
  const allLessons = getAllLessons();
  
  // Group lessons by level for better organization
  const beginnerLessons = allLessons.filter(l => l.level === 'beginner');
  const intermediateLessons = allLessons.filter(l => l.level === 'intermediate');
  const advancedLessons = allLessons.filter(l => l.level === 'advanced');

  return (
    <>
      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      {/* Course Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-red-50 via-pink-50 to-white py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-7xl">
            <Breadcrumbs className="mb-8" />
            
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-6">
                <GraduationCap className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-bold text-blue-900">Fundamentos Gratis</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                Gramática Española — <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-600">Fundamentos</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
                Seis lecciones esenciales: Ser/Estar, artículos, presente, pretérito, subjuntivo y por/para. Ejemplos, ejercicios y explicaciones en español y árabe.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/gramatica"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                  <BookOpen className="w-5 h-5" />
                  Empezar a Aprender
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/gramatica/ejercicios"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-red-600 text-red-600 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                  <Gamepad2 className="w-5 h-5" />
                  Practicar con Ejercicios
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Lecciones por Nivel */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-7xl">
            
            {/* Principiante */}
            <div className="mb-16">
              <div className="text-center mb-10">
                <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full font-bold text-sm mb-4">
                  Nivel Principiante
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                  Fundamentos de la Gramática
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Empieza desde cero con las bases esenciales del español
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {beginnerLessons.map((lesson) => (
                  <Link
                    key={lesson.id}
                    href={`/gramatica/${lesson.id}`}
                    className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all border-2 border-gray-100 hover:border-green-300 transform hover:scale-105"
                    aria-label={`Estudiar ${lesson.title}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold capitalize">
                        {lesson.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                      {lesson.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {lesson.content.substring(0, 100).replace(/[#*]/g, '').trim()}...
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        {lesson.examples.length} ejemplos
                      </span>
                      <span className="text-green-600 font-semibold text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        Estudiar
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Intermedio */}
            <div className="mb-16">
              <div className="text-center mb-10">
                <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-bold text-sm mb-4">
                  Nivel Intermedio
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                  Gramática Intermedia
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Profundiza tus conocimientos con tiempos verbales y estructuras avanzadas
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {intermediateLessons.map((lesson) => (
                  <Link
                    key={lesson.id}
                    href={`/gramatica/${lesson.id}`}
                    className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all border-2 border-gray-100 hover:border-blue-300 transform hover:scale-105"
                    aria-label={`Estudiar ${lesson.title}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold capitalize">
                        {lesson.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {lesson.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {lesson.content.substring(0, 100).replace(/[#*]/g, '').trim()}...
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                        {lesson.examples.length} ejemplos
                      </span>
                      <span className="text-blue-600 font-semibold text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        Estudiar
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Avanzado */}
            {advancedLessons.length > 0 && (
              <div className="mb-16">
                <div className="text-center mb-10">
                  <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-bold text-sm mb-4">
                    Nivel Avanzado
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                    Gramática Avanzada
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Domina los aspectos más complejos de la gramática española
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {advancedLessons.map((lesson) => (
                    <Link
                      key={lesson.id}
                      href={`/gramatica/${lesson.id}`}
                      className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all border-2 border-gray-100 hover:border-purple-300 transform hover:scale-105"
                      aria-label={`Estudiar ${lesson.title}`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                          <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-bold capitalize">
                          {lesson.category}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                        {lesson.title}
                      </h3>
                      
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {lesson.content.substring(0, 100).replace(/[#*]/g, '').trim()}...
                      </p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <CheckCircle className="w-4 h-4 text-purple-500" />
                          {lesson.examples.length} ejemplos
                        </span>
                        <span className="text-purple-600 font-semibold text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                          Estudiar
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Why Learn Grammar Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              ¿Por Qué Aprender Gramática?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: <BookOpen className="w-8 h-8" />,
                  title: 'Comunicación Clara',
                  description: 'La gramática correcta te ayuda a expresarte claramente y evitar malentendidos.',
                },
                {
                  icon: <CheckCircle className="w-8 h-8" />,
                  title: 'Confianza',
                  description: 'Saber gramática te da confianza al hablar y escribir en español.',
                },
                {
                  icon: <Gamepad2 className="w-8 h-8" />,
                  title: 'Comprensión Mejorada',
                  description: 'Entender la estructura del idioma mejora tu comprensión auditiva y lectora.',
                },
                {
                  icon: <ArrowRight className="w-8 h-8" />,
                  title: 'Progreso Rápido',
                  description: 'Una base sólida de gramática acelera tu aprendizaje del vocabulario y expresiones.',
                },
              ].map((reason, index) => (
                <div key={index} className="flex gap-4">
                  <div className="text-blue-600 flex-shrink-0">{reason.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{reason.title}</h3>
                    <p className="text-gray-700">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to Use This Guide */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Cómo Usar Esta Guía
            </h2>
            <ol className="space-y-4 text-gray-700">
              <li className="flex gap-4">
                <span className="font-bold text-blue-600 text-xl">1.</span>
                <span>
                  <strong>Empieza desde el principio:</strong> Si eres principiante, comienza con la Unidad 1. Si ya tienes conocimientos, identifica tu nivel.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="font-bold text-blue-600 text-xl">2.</span>
                <span>
                  <strong>Estudia una unidad a la vez:</strong> No intentes aprender todo de una vez. Tómate tu tiempo con cada unidad.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="font-bold text-blue-600 text-xl">3.</span>
                <span>
                  <strong>Practica inmediatamente:</strong> Después de cada lección, practica con nuestros <Link href="/juegos" className="text-blue-600 font-semibold hover:underline">juegos interactivos</Link>.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="font-bold text-blue-600 text-xl">4.</span>
                <span>
                  <strong>Repasa regularmente:</strong> La repetición es clave. Vuelve a las unidades anteriores para reforzar lo aprendido.
                </span>
              </li>
            </ol>
          </div>
        </section>

        {/* Common Mistakes Section */}
        <section className="py-16 bg-gradient-to-br from-red-50 to-orange-50">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Errores Comunes en Gramática Española
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Confundir Ser y Estar',
                  description: 'Uno de los errores más comunes. Recuerda: SER para características permanentes, ESTAR para ubicación y estados temporales.',
                  example: '❌ "Estoy estudiante" → ✅ "Soy estudiante"',
                },
                {
                  title: 'Olvidar los Artículos',
                  description: 'En español casi siempre necesitas artículos. "Voy a la escuela" no "Voy a escuela".',
                  example: '❌ "Voy a escuela" → ✅ "Voy a la escuela"',
                },
                {
                  title: 'No Conjugar los Verbos',
                  description: 'Los verbos deben conjugarse según la persona. "Yo hablo" no "Yo hablar".',
                  example: '❌ "Yo hablar español" → ✅ "Yo hablo español"',
                },
                {
                  title: 'Olvidar el Género',
                  description: 'Todos los sustantivos tienen género. Aprende cada sustantivo con su artículo.',
                  example: '❌ "El mesa" → ✅ "La mesa"',
                },
                {
                  title: 'Confundir Por y Para',
                  description: 'Ambas significan "for" pero tienen usos diferentes. POR para razón, PARA para propósito.',
                  example: 'Estudio POR mi trabajo (razón) vs Estudio PARA aprender (propósito)',
                },
                {
                  title: 'No Concordar Adjetivos',
                  description: 'Los adjetivos deben coincidir en género y número con el sustantivo.',
                  example: '❌ "Casas grande" → ✅ "Casas grandes"',
                },
              ].map((mistake, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-xl border-l-4 border-blue-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{mistake.title}</h3>
                  <p className="text-gray-700 mb-3">{mistake.description}</p>
                  <p className="text-sm text-gray-600 font-mono bg-white p-2 rounded">{mistake.example}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/blog/10-errores-comunes-aprender-espanol"
                className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700"
              >
                Lee más sobre errores comunes <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </section>

        {/* Tips and Tricks Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Tips y Trucos para Aprender Gramática
            </h2>
            <div className="space-y-6">
              {[
                {
                  tip: 'Aprende en Contexto',
                  description: 'No memorices reglas abstractas. Aprende gramática viendo cómo se usa en oraciones reales. Lee textos en español y presta atención a las estructuras gramaticales.',
                },
                {
                  tip: 'Practica con Oraciones Completas',
                  description: 'En lugar de solo memorizar conjugaciones, crea oraciones completas. Esto te ayuda a entender cómo funciona la gramática en la práctica.',
                },
                {
                  tip: 'Agrupa Conceptos Similares',
                  description: 'Aprende conceptos relacionados juntos. Por ejemplo, estudia todos los tiempos pasados a la vez para ver las diferencias.',
                },
                {
                  tip: 'Usa Mnemotecnia',
                  description: 'Crea trucos de memoria para recordar reglas. Por ejemplo, DOCTOR para SER (Description, Occupation, Characteristic, Time, Origin, Relationship) y PLACE para ESTAR.',
                },
                {
                  tip: 'Practica Regularmente',
                  description: 'La gramática se olvida si no la practicas. Dedica 15-20 minutos diarios a practicar gramática, incluso si solo es revisar lo que ya aprendiste.',
                },
                {
                  tip: 'No Busques la Perfección',
                  description: 'Es mejor cometer errores mientras practicas que no practicar por miedo a equivocarte. Los errores son oportunidades de aprendizaje.',
                },
              ].map((item, index) => (
                <div key={index} className="flex gap-4 bg-white p-6 rounded-xl shadow-md">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-xl">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.tip}</h3>
                    <p className="text-gray-700">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Practice Exercises Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Ejercicios Prácticos
            </h2>
            <p className="text-lg text-gray-700 text-center mb-8">
              La práctica es esencial para dominar la gramática. Aquí tienes recursos para practicar cada unidad.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Juegos Interactivos',
                  description: 'Practica gramática de forma divertida con nuestros juegos educativos.',
                  link: '/juegos',
                  icon: <Gamepad2 className="w-8 h-8" />,
                },
                {
                  title: 'Ejercicios de Gramática',
                  description: 'Ejercicios estructurados para cada tema gramatical.',
                  link: '/gramatica',
                  icon: <BookOpen className="w-8 h-8" />,
                },
                {
                  title: 'Blog Educativo',
                  description: 'Artículos detallados sobre temas gramaticales específicos.',
                  link: '/blog',
                  icon: <Book className="w-8 h-8" />,
                },
              ].map((resource, index) => (
                <Link
                  key={index}
                  href={resource.link}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all transform hover:scale-105"
                >
                  <div className="text-blue-600 mb-4">{resource.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{resource.title}</h3>
                  <p className="text-gray-600 mb-4">{resource.description}</p>
                  <span className="text-blue-600 font-semibold inline-flex items-center">
                    Explorar <ArrowRight className="w-4 h-4 ml-2" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

          <SmartInternalLinks />

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¿Listo para Dominar la Gramática Española?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Empieza ahora. Todo es 100% gratis y accesible de inmediato.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/gramatica"
                className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105"
              >
                Empezar Curso
              </Link>
              <Link
                href="/juegos"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white/10 transition-all"
              >
                Ver Juegos
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
