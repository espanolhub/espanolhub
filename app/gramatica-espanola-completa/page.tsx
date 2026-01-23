import type { Metadata } from 'next';
import Link from 'next/link';
import { generateLandingMetadata } from '@/lib/utils/dynamic-metadata';
import { generateHowToSchema, generateLessonSchema } from '@/lib/utils/schemaMarkup';
import { BookOpen, CheckCircle, Gamepad2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = generateLandingMetadata(
  'gramática española',
  'Guía Completa Gratis 2025',
  'Aprende toda la gramática española gratis. Verbos, tiempos, artículos, pronombres y más. Ejercicios interactivos incluidos.',
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
  const grammarUnits = [
    {
      id: 1,
      title: 'Fundamentos',
      topics: ['Alfabeto y pronunciación', 'Artículos definidos e indefinidos', 'Género de sustantivos'],
      level: 'Principiante',
    },
    {
      id: 2,
      title: 'Sustantivos y Adjetivos',
      topics: ['Género y número', 'Concordancia', 'Adjetivos posesivos'],
      level: 'Principiante',
    },
    {
      id: 3,
      title: 'Ser y Estar',
      topics: ['Cuándo usar Ser', 'Cuándo usar Estar', 'Diferencias y ejemplos'],
      level: 'Principiante',
    },
    {
      id: 4,
      title: 'Presente de Indicativo',
      topics: ['Verbos regulares (-ar, -er, -ir)', 'Verbos irregulares comunes', 'Usos del presente'],
      level: 'Principiante',
    },
    {
      id: 5,
      title: 'Pretérito Perfecto',
      topics: ['Formación con haber + participio', 'Usos y ejemplos', 'Participios irregulares'],
      level: 'Intermedio',
    },
    {
      id: 6,
      title: 'Pretérito Indefinido',
      topics: ['Conjugación regular', 'Verbos irregulares', 'Cuándo usarlo'],
      level: 'Intermedio',
    },
    {
      id: 7,
      title: 'Imperfecto',
      topics: ['Formación', 'Usos: descripciones, hábitos pasados', 'Ser vs Estar en imperfecto'],
      level: 'Intermedio',
    },
    {
      id: 8,
      title: 'Futuro y Condicional',
      topics: ['Futuro simple', 'Condicional simple', 'Expresar probabilidad'],
      level: 'Intermedio',
    },
    {
      id: 9,
      title: 'Subjuntivo Presente',
      topics: ['Formación', 'Usos principales', 'Expresiones que requieren subjuntivo'],
      level: 'Avanzado',
    },
    {
      id: 10,
      title: 'Pronombres',
      topics: ['Pronombres personales', 'Pronombres de objeto directo/indirecto', 'Pronombres reflexivos'],
      level: 'Intermedio',
    },
    {
      id: 11,
      title: 'Preposiciones',
      topics: ['Por vs Para', 'A, de, en, con', 'Usos comunes'],
      level: 'Intermedio',
    },
    {
      id: 12,
      title: 'Oraciones Compuestas',
      topics: ['Oraciones coordinadas', 'Oraciones subordinadas', 'Conectores'],
      level: 'Avanzado',
    },
  ];

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

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Gramática Española <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Completa</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8">
              Aprende toda la gramática española desde cero hasta avanzado. Guía completa con ejemplos, ejercicios y explicaciones detalladas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/gramatica"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                Empezar a Aprender
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

        {/* Table of Contents */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Contenido del Curso
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {grammarUnits.map((unit) => (
                <div
                  key={unit.id}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      Unidad {unit.id}
                    </span>
                    <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                      {unit.level}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{unit.title}</h3>
                  <ul className="space-y-2 mb-4">
                    {unit.topics.map((topic, index) => (
                      <li key={index} className="flex items-start text-gray-700 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/gramatica"
                    className="inline-flex items-center text-blue-600 font-semibold text-sm hover:text-blue-700"
                  >
                    Estudiar ahora <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Learn Grammar Section */}
        <section className="container mx-auto px-4 py-16 bg-white">
          <div className="max-w-4xl mx-auto">
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
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto bg-blue-50 rounded-2xl p-8 md:p-12">
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

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
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
