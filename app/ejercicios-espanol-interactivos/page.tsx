import type { Metadata } from 'next';
import Link from 'next/link';
import { Gamepad2, GraduationCap, BookOpen, CheckCircle, Star, ArrowRight, Zap, Languages, Trophy } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import SmartInternalLinks from '@/components/SmartInternalLinks';

export const metadata: Metadata = {
  title: "Ejercicios de Español Interactivos Gratis 2026 | Espanol Hub",
  description: "Practica español con más de 500 ejercicios interactivos gratis. Gramática, vocabulario, verbos y más. Con retroalimentación inmediata. Nivel principiante a avanzado.",
  keywords: ["ejercicios español", "ejercicios español interactivos", "práctica español", "ejercicios gramática española", "ejercicios vocabulario español", "ejercicios español online"],
  alternates: {
    canonical: "https://www.espanolhub.com/ejercicios-espanol-interactivos",
    languages: {
      'es': "https://www.espanolhub.com/ejercicios-espanol-interactivos",
      'ar': "https://www.espanolhub.com/ar/ejercicios-espanol-interactivos",
    }
  },
  openGraph: {
    title: "500+ Ejercicios de Español Interactivos Gratis",
    description: "Practica español con ejercicios interactivos. Gramática, vocabulario, verbos. Retroalimentación inmediata. 100% gratis.",
    type: "website",
    locale: "es_ES",
    url: "https://www.espanolhub.com/ejercicios-espanol-interactivos",
    siteName: "Espanol Hub",
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Ejercicios de Español Interactivos',
    }],
  },
};

export default function EjerciciosEspanolPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gradient-to-br from-green-50 via-blue-50 to-white py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <Breadcrumbs className="mb-8" />
          
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
              Ejercicios de Español Interactivos
            </h1>
            
            <p className="text-xl text-gray-700 mb-8">
              Practica y mejora tu español con más de 500 ejercicios interactivos. Gramática, vocabulario, verbos y más. Todo gratis con retroalimentación inmediata.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/gramatica/ejercicios"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                <GraduationCap className="w-5 h-5" />
                Empezar a Practicar
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <Link
                href="/juegos"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-green-600 text-green-600 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                <Gamepad2 className="w-5 h-5" />
                Juegos Educativos
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          
          {/* Tipos de Ejercicios */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Tipos de Ejercicios Disponibles
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exerciseTypes.map((type, index) => (
                <Link
                  key={index}
                  href={type.href}
                  className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-100 hover:border-green-300"
                >
                  <div className={`w-14 h-14 ${type.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                    {type.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                    {type.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {type.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                      {type.count}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Por Nivel */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Ejercicios por Nivel
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {levelCategories.map((level, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-200">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-blue-600 mb-2">{level.level}</div>
                    <div className="text-lg font-semibold text-gray-900">{level.name}</div>
                  </div>
                  <ul className="space-y-3">
                    {level.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-start gap-2 text-gray-700">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={level.href}
                    className="mt-6 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Ver Ejercicios
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* Ventajas */}
          <section className="mb-16 bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              ¿Por Qué Nuestros Ejercicios Son Efectivos?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {advantages.map((adv, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center text-white">
                    {adv.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {adv.title}
                    </h3>
                    <p className="text-gray-600">
                      {adv.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <SmartInternalLinks />

          {/* CTA */}
          <section className="text-center bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Empieza a Practicar Ahora
            </h2>
            <p className="text-xl mb-8 text-green-100">
              500+ ejercicios interactivos te esperan. 100% gratis.
            </p>
            <Link
              href="/gramatica/ejercicios"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-600 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              <Zap className="w-5 h-5" />
              Practicar Ahora
              <ArrowRight className="w-5 h-5" />
            </Link>
          </section>
        </div>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListSchema),
        }}
      />
    </div>
  );
}

const exerciseTypes = [
  {
    icon: <GraduationCap className="w-7 h-7 text-white" />,
    title: "Ejercicios de Gramática",
    description: "Verbos, tiempos, artículos, pronombres y más. 200+ ejercicios.",
    count: "200+ ejercicios",
    href: "/gramatica/ejercicios",
    bgColor: "bg-gradient-to-br from-blue-500 to-blue-600"
  },
  {
    icon: <Languages className="w-7 h-7 text-white" />,
    title: "Ejercicios de Vocabulario",
    description: "Aprende y practica palabras por temas. 150+ ejercicios.",
    count: "150+ ejercicios",
    href: "/vocabulario",
    bgColor: "bg-gradient-to-br from-green-500 to-green-600"
  },
  {
    icon: <BookOpen className="w-7 h-7 text-white" />,
    title: "Comprensión Lectora",
    description: "Textos con preguntas de comprensión. 80+ lecturas.",
    count: "80+ lecturas",
    href: "/lectura",
    bgColor: "bg-gradient-to-br from-purple-500 to-purple-600"
  },
  {
    icon: <Gamepad2 className="w-7 h-7 text-white" />,
    title: "Juegos Educativos",
    description: "Aprende jugando con 15+ juegos interactivos.",
    count: "15+ juegos",
    href: "/juegos",
    bgColor: "bg-gradient-to-br from-pink-500 to-pink-600"
  },
  {
    icon: <Trophy className="w-7 h-7 text-white" />,
    title: "Tests y Quizzes",
    description: "Evalúa tu nivel con tests completos. 50+ quizzes.",
    count: "50+ quizzes",
    href: "/simulator",
    bgColor: "bg-gradient-to-br from-orange-500 to-orange-600"
  },
  {
    icon: <Star className="w-7 h-7 text-white" />,
    title: "Ejercicios de Verbos",
    description: "Conjugación, tiempos, irregulares. 120+ ejercicios.",
    count: "120+ ejercicios",
    href: "/gramatica",
    bgColor: "bg-gradient-to-br from-indigo-500 to-indigo-600"
  },
];

const levelCategories = [
  {
    level: "A1-A2",
    name: "Principiante",
    topics: [
      "Presente de indicativo",
      "Ser y estar",
      "Artículos y sustantivos",
      "Vocabulario básico (500 palabras)",
      "Frases simples"
    ],
    href: "/gramatica"
  },
  {
    level: "B1-B2",
    name: "Intermedio",
    topics: [
      "Pretérito e imperfecto",
      "Subjuntivo presente",
      "Por y para",
      "Vocabulario avanzado (1500 palabras)",
      "Conversación fluida"
    ],
    href: "/gramatica"
  },
  {
    level: "C1-C2",
    name: "Avanzado",
    topics: [
      "Todos los tiempos verbales",
      "Subjuntivo completo",
      "Expresiones idiomáticas",
      "Vocabulario especializado",
      "Comprensión nativa"
    ],
    href: "/gramatica"
  },
];

const advantages = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Retroalimentación Inmediata",
    description: "Cada ejercicio te muestra si tu respuesta es correcta al instante, con explicaciones detalladas de los errores."
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: "Adaptado a Tu Nivel",
    description: "Ejercicios para todos los niveles, desde principiante absoluto hasta avanzado. Encuentra el nivel perfecto para ti."
  },
  {
    icon: <Trophy className="w-6 h-6" />,
    title: "Sistema de Progreso",
    description: "Mide tu avance con nuestro sistema de puntos y logros. Mantente motivado viendo tu progreso."
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Variedad de Formatos",
    description: "Multiple choice, completar frases, ordenar palabras, escribir, y más. Nunca te aburres practicando."
  },
];

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Ejercicios de Español Interactivos",
  "description": "Lista completa de ejercicios interactivos para aprender español",
  "numberOfItems": 6,
  "itemListElement": exerciseTypes.map((type, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "LearningResource",
      "name": type.title,
      "description": type.description,
      "url": `https://www.espanolhub.com${type.href}`
    }
  }))
};
