import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, GraduationCap, Languages, Gamepad2, Clock, CheckCircle, Star, Users, Trophy, Target, ArrowRight, Gift, Zap } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import SmartInternalLinks from '@/components/SmartInternalLinks';

export const metadata: Metadata = {
  title: "Curso de Español para Principiantes GRATIS 2026 | Espanol Hub",
  description: "Aprende español desde cero con nuestro curso completo para principiantes. 100% gratis. Gramática básica, vocabulario esencial, pronunciación y más. Empieza ahora.",
  keywords: ["curso español principiantes", "español para principiantes", "aprender español desde cero", "curso español básico", "español nivel A1", "español básico gratis"],
  alternates: {
    canonical: "https://www.espanolhub.com/curso-espanol-principiantes",
    languages: {
      'es': "https://www.espanolhub.com/curso-espanol-principiantes",
    },
  },
  openGraph: {
    title: "Curso de Español para Principiantes GRATIS 2026",
    description: "Aprende español desde cero con nuestro curso completo para principiantes. 100% gratis. Gramática básica, vocabulario esencial, pronunciación y más.",
    type: "website",
    locale: "es_ES",
    url: "https://www.espanolhub.com/curso-espanol-principiantes",
    siteName: "Espanol Hub",
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Curso de Español para Principiantes GRATIS',
    }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@espanolhub",
    creator: "@espanolhub",
    title: "Curso de Español para Principiantes GRATIS 2026",
    description: "Aprende español desde cero. 100% gratis.",
    images: ['/og-image.png'],
  },
};

export default function CursoEspanolPrincipiantesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="bg-gradient-to-br from-purple-50 via-blue-50 to-white py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <Breadcrumbs className="mb-8" />
          
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full mb-6">
              <Gift className="w-5 h-5 text-green-600" />
              <span className="text-sm font-bold text-green-900">100% GRATIS - Sin Registro</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Curso de Español para Principiantes
            </h1>
            
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Aprende español desde cero con nuestro curso completo y gratuito. Diseñado específicamente para principiantes, cubre todo lo que necesitas para comunicarte en español con confianza.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/gramatica"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                <GraduationCap className="w-5 h-5" />
                Empezar Curso Gratis
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <Link
                href="/juegos"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-purple-600 text-purple-600 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                <Gamepad2 className="w-5 h-5" />
                Practicar con Juegos
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          
          {/* What You'll Learn */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              ¿Qué Aprenderás en Este Curso?
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courseModules.map((module, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-100">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white mb-4">
                    {module.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {module.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {module.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-purple-600 font-semibold">
                    <Clock className="w-4 h-4" />
                    {module.duration}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Why This Course */}
          <section className="mb-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              ¿Por Qué Este Curso es Diferente?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-700">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Course Content Detailed */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
              Contenido del Curso Completo
            </h2>
            <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Nuestro curso de español para principiantes está diseñado para llevarte desde nivel cero hasta poder comunicarte con confianza en situaciones cotidianas.
            </p>
            
            <div className="space-y-8">
              {detailedContent.map((section, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {section.title}
                      </h3>
                      <p className="text-gray-700 mb-4">
                        {section.description}
                      </p>
                      <ul className="space-y-2">
                        {section.topics.map((topic, topicIndex) => (
                          <li key={topicIndex} className="flex items-center gap-2 text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Stats */}
          <section className="mb-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 md:p-12 text-white">
            <h2 className="text-3xl font-bold text-center mb-12">
              Resultados Comprobados
            </h2>
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">2.5K+</div>
                <div className="text-purple-200">Estudiantes</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">98%</div>
                <div className="text-purple-200">Tasa de Éxito</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">30 Días</div>
                <div className="text-purple-200">Promedio</div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Preguntas Frecuentes
            </h2>
            <div className="max-w-4xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <details key={index} className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <summary className="font-bold text-gray-900 cursor-pointer hover:text-purple-600 transition-colors">
                    {faq.question}
                  </summary>
                  <p className="mt-4 text-gray-700">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* Internal Links */}
          <SmartInternalLinks />

          {/* Final CTA */}
          <section className="text-center bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-8 md:p-12 border border-purple-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Listo para Empezar?
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Únete a miles de estudiantes que ya están aprendiendo español con Espanol Hub
            </p>
            <Link
              href="/gramatica"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              <GraduationCap className="w-5 h-5" />
              Empezar Curso Gratis Ahora
              <ArrowRight className="w-5 h-5" />
            </Link>
          </section>
        </div>
      </main>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </div>
  );
}

const courseModules = [
  {
    icon: <GraduationCap className="w-7 h-7" />,
    title: "Alfabeto y Pronunciación",
    description: "Aprende las 27 letras del español y cómo pronunciarlas correctamente. Domina los sonidos básicos desde el primer día.",
    duration: "2 horas"
  },
  {
    icon: <BookOpen className="w-7 h-7" />,
    title: "Gramática Básica",
    description: "Artículos, sustantivos, adjetivos, verbos regulares en presente. Las bases fundamentales del español.",
    duration: "8 horas"
  },
  {
    icon: <Languages className="w-7 h-7" />,
    title: "Vocabulario Esencial",
    description: "Las 500 palabras más importantes del español. Aprende vocabulario que realmente usarás.",
    duration: "6 horas"
  },
  {
    icon: <Star className="w-7 h-7" />,
    title: "Frases Cotidianas",
    description: "Saludos, presentaciones, pedir ayuda. Comunicación básica para situaciones reales.",
    duration: "4 horas"
  },
  {
    icon: <Gamepad2 className="w-7 h-7" />,
    title: "Práctica Interactiva",
    description: "Juegos educativos y ejercicios interactivos para reforzar lo aprendido de forma divertida.",
    duration: "10 horas"
  },
  {
    icon: <Trophy className="w-7 h-7" />,
    title: "Evaluaciones",
    description: "Tests y quizzes para medir tu progreso y identificar áreas de mejora.",
    duration: "3 horas"
  },
];

const benefits = [
  {
    title: "100% Gratis y Sin Registro",
    description: "Todo el contenido es completamente gratuito. No necesitas tarjeta de crédito ni registro para empezar."
  },
  {
    title: "Aprende a Tu Ritmo",
    description: "Estudia cuando quieras, donde quieras. El curso está disponible 24/7 en todos tus dispositivos."
  },
  {
    title: "Contenido Actualizado 2026",
    description: "Material completamente actualizado con las últimas metodologías de enseñanza de idiomas."
  },
  {
    title: "Métodos Probados",
    description: "Usamos técnicas de aprendizaje basadas en investigación científica que realmente funcionan."
  },
  {
    title: "Juegos Educativos",
    description: "Aprende jugando con nuestros juegos interactivos diseñados para hacer el aprendizaje más divertido."
  },
  {
    title: "Soporte en Árabe",
    description: "Explicaciones también disponibles en árabe para facilitar el aprendizaje de estudiantes árabes."
  },
];

const detailedContent = [
  {
    title: "Módulo 1: El Alfabeto Español",
    description: "Domina los fundamentos del español empezando con el alfabeto y la pronunciación correcta de cada letra.",
    topics: [
      "Las 27 letras del alfabeto español",
      "Pronunciación de vocales (a, e, i, o, u)",
      "Consonantes especiales: ñ, ll, rr",
      "Sonidos difíciles: j, g, r",
      "Ejercicios de pronunciación con audio",
    ]
  },
  {
    title: "Módulo 2: Artículos y Sustantivos",
    description: "Aprende a usar los artículos definidos e indefinidos, y comprende el concepto de género en español.",
    topics: [
      "Artículos definidos: el, la, los, las",
      "Artículos indefinidos: un, una, unos, unas",
      "Género de sustantivos (masculino/femenino)",
      "Sustantivos irregulares y excepciones",
      "Práctica con 100+ sustantivos comunes",
    ]
  },
  {
    title: "Módulo 3: Verbos en Presente",
    description: "Domina la conjugación de verbos regulares en tiempo presente, el tiempo verbal más usado en español.",
    topics: [
      "Verbos -AR: hablar, trabajar, estudiar",
      "Verbos -ER: comer, beber, aprender",
      "Verbos -IR: vivir, escribir, abrir",
      "Los 10 verbos más importantes",
      "Práctica con 50+ verbos regulares",
    ]
  },
  {
    title: "Módulo 4: Ser y Estar",
    description: "Aprende la diferencia crucial entre estos dos verbos que significan 'to be' en inglés.",
    topics: [
      "Cuándo usar SER (identidad, características)",
      "Cuándo usar ESTAR (ubicación, estados)",
      "Conjugaciones completas de ambos verbos",
      "Casos especiales y excepciones",
      "100+ ejercicios prácticos",
    ]
  },
  {
    title: "Módulo 5: Vocabulario Esencial",
    description: "Las 500 palabras más importantes que debes conocer para comunicarte en español.",
    topics: [
      "Familia y relaciones (30 palabras)",
      "Casa y objetos cotidianos (50 palabras)",
      "Comida y bebidas (60 palabras)",
      "Trabajo y estudios (40 palabras)",
      "Tiempo y fechas (30 palabras)",
      "Números del 1 al 1000",
      "Días, meses y estaciones",
    ]
  },
  {
    title: "Módulo 6: Frases para Conversación",
    description: "Aprende frases completas que puedes usar inmediatamente en situaciones reales.",
    topics: [
      "Saludos y despedidas",
      "Presentaciones personales",
      "Hacer preguntas básicas",
      "Pedir ayuda y direcciones",
      "En el restaurante y tienda",
      "Expresar gustos y preferencias",
    ]
  },
  {
    title: "Módulo 7: Adjetivos y Descripciones",
    description: "Aprende a describir personas, lugares y cosas usando adjetivos correctamente.",
    topics: [
      "Adjetivos comunes (50+ palabras)",
      "Concordancia de género y número",
      "Posición del adjetivo",
      "Comparativos y superlativos básicos",
      "Práctica con descripciones",
    ]
  },
  {
    title: "Módulo 8: Preguntas y Negaciones",
    description: "Domina cómo hacer preguntas y formar oraciones negativas en español.",
    topics: [
      "Palabras interrogativas (qué, cómo, dónde, etc.)",
      "Estructura de preguntas",
      "Negación simple con 'no'",
      "Preguntas sí/no",
      "Práctica conversacional",
    ]
  },
  {
    title: "Módulo 9: Práctica Integrada",
    description: "Pon en práctica todo lo aprendido con ejercicios y juegos interactivos.",
    topics: [
      "Juegos de vocabulario",
      "Ejercicios de gramática",
      "Comprensión lectora básica",
      "Práctica de conversación",
      "Test de nivel final",
    ]
  },
];

const faqs = [
  {
    question: "¿Es realmente 100% gratis este curso?",
    answer: "Sí, absolutamente. Todo el contenido del curso es completamente gratuito. No necesitas tarjeta de crédito, no hay costos ocultos, y no necesitas registro para acceder al contenido."
  },
  {
    question: "¿Cuánto tiempo toma completar el curso?",
    answer: "El curso completo tiene aproximadamente 30-35 horas de contenido. Si estudias 1 hora al día, puedes completarlo en un mes. Si prefieres un ritmo más relajado de 30 minutos diarios, lo terminarás en 2 meses. Puedes avanzar a tu propio ritmo."
  },
  {
    question: "¿Necesito conocimientos previos de español?",
    answer: "No, este curso está diseñado para principiantes absolutos. Empezamos desde cero con el alfabeto y la pronunciación. No necesitas ningún conocimiento previo de español."
  },
  {
    question: "¿Qué nivel alcanzaré al completar el curso?",
    answer: "Al completar este curso, alcanzarás un nivel A1-A2 según el Marco Común Europeo de Referencia (MCER). Podrás comunicarte en situaciones cotidianas, entender conversaciones básicas, y leer textos simples."
  },
  {
    question: "¿Incluye práctica de conversación?",
    answer: "Sí, el curso incluye ejercicios de práctica oral, diálogos, y juegos interactivos que te ayudan a practicar conversación. También recomendamos usar nuestros recursos de pronunciación con audio de hablantes nativos."
  },
  {
    question: "¿Puedo obtener un certificado al completar el curso?",
    answer: "Actualmente no ofrecemos certificados oficiales, pero puedes realizar nuestros tests de nivel para evaluar tu progreso y obtener un reporte detallado de tus habilidades."
  },
  {
    question: "¿El curso está disponible en árabe también?",
    answer: "Sí, muchas de nuestras explicaciones también están disponibles en árabe para facilitar el aprendizaje de estudiantes árabes. El contenido principal está en español para maximizar la inmersión."
  },
  {
    question: "¿Cómo es diferente a Duolingo o Babbel?",
    answer: "A diferencia de otras aplicaciones, nuestro curso es completamente gratuito sin límites. Además, está diseñado específicamente para estudiantes que buscan una experiencia de aprendizaje más estructurada y completa, con explicaciones detalladas de gramática y ejercicios extensivos."
  },
];

// Schema.org Course markup
const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Curso de Español para Principiantes",
  "description": "Curso completo y gratuito de español para principiantes. Aprende desde cero con lecciones estructuradas, ejercicios interactivos y juegos educativos.",
  "provider": {
    "@type": "Organization",
    "name": "Espanol Hub",
    "url": "https://www.espanolhub.com"
  },
  "educationalLevel": "Beginner",
  "inLanguage": "es",
  "availableLanguage": ["es", "ar"],
  "coursePrerequisites": "Ninguno - Curso para principiantes absolutos",
  "numberOfCredits": 0,
  "timeRequired": "P30D",
  "isAccessibleForFree": true,
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "online",
    "courseWorkload": "PT35H"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "2547",
    "bestRating": "5",
    "worstRating": "1"
  }
};

// FAQPage schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};
