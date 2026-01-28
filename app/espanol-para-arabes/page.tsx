import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Globe, ArrowRight, Languages, Heart, CheckCircle } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import SmartInternalLinks from '@/components/SmartInternalLinks';

export const metadata: Metadata = {
  title: "تعلم الإسبانية للعرب 2026 - دورة كاملة مجانية | Espanol Hub",
  description: "تعلم اللغة الإسبانية من الصفر للناطقين بالعربية. دروس، قواعد، مفردات، ألعاب تعليمية. شرح بالعربية. 100% مجاني.",
  keywords: ["تعلم الاسبانية", "تعليم الاسبانية للعرب", "español para árabes", "aprender español árabe", "curso español árabes"],
  alternates: {
    canonical: "https://www.espanolhub.com/espanol-para-arabes",
    languages: {
      'es': "https://www.espanolhub.com/espanol-para-arabes",
    },
  },
  openGraph: {
    title: "تعلم الإسبانية للعرب 2026 - دورة كاملة مجانية",
    description: "تعلم اللغة الإسبانية من الصفر للناطقين بالعربية. دروس، قواعد، مفردات مع شرح بالعربية.",
    url: "https://www.espanolhub.com/espanol-para-arabes",
    siteName: "Espanol Hub",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Español Para Árabes - Espanol Hub',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "تعلم الإسبانية للعرب 2026 - دورة كاملة مجانية",
    description: "تعلم اللغة الإسبانية من الصفر للناطقين بالعربية. 100% مجاني.",
    images: ['/og-image.png'],
  },
};

export default function EspanolParaArabesPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gradient-to-br from-green-50 via-blue-50 to-white py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <Breadcrumbs className="mb-8" />
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full mb-6">
              <Heart className="w-5 h-5 text-green-600" />
              <span className="text-sm font-bold text-green-900">Para hablantes de árabe</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              Español para hablantes de árabe
            </h1>
            <p className="text-xl text-gray-700 mb-4">
              Curso completo de español diseñado para quienes tienen el árabe como lengua materna, con explicaciones claras, ejemplos y práctica.
            </p>
            <Link href="/gramatica" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all">
              <BookOpen className="w-5 h-5" />Empezar ahora<ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </header>
      <main className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Por Qué Este Curso es Perfecto Para Estudiantes Árabes</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((b, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{b.titleEs}</h3>
                  <p className="text-gray-600">{b.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16 bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Contenido del Curso</h2>
            <div className="bg-white rounded-xl p-8 shadow-md">
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4">
                  Este curso de español está diseñado para personas que quieren aprender español desde cero o mejorar su nivel actual, con un enfoque práctico y progresivo.
                </p>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">Módulos del Curso</h3>
                <ul className="space-y-3 mb-6">
                  <li className="text-gray-700">
                    <strong>1. Alfabeto y Pronunciación:</strong> Aprende las letras españolas y su pronunciación correcta.
                  </li>
                  <li className="text-gray-700">
                    <strong>2. Gramática Básica:</strong> Verbos ser/estar, artículos, género y número, presente de indicativo, verbos regulares e irregulares.
                  </li>
                  <li className="text-gray-700">
                    <strong>3. Vocabulario Temático:</strong> Familia, trabajo, comida, viajes, salud, educación, tecnología y más.
                  </li>
                  <li className="text-gray-700">
                    <strong>4. Conversación Práctica:</strong> Frases útiles para situaciones cotidianas: presentarse, pedir información, ir de compras, en el médico, etc.
                  </li>
                  <li className="text-gray-700">
                    <strong>5. Preparación CCSE:</strong> Contenido completo para el examen de nacionalidad española.
                  </li>
                  <li className="text-gray-700">
                    <strong>6. Cultura Española:</strong> Aprende sobre costumbres, tradiciones y aspectos culturales importantes de España.
                  </li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mb-3">Metodología</h3>
                <p className="text-gray-700 mb-4">
                  Nuestro método de enseñanza combina explicaciones teóricas con práctica intensiva. Cada lección incluye:
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="text-gray-700">✓ Explicación clara del concepto en español</li>
                  <li className="text-gray-700">✓ Ejemplos prácticos</li>
                  <li className="text-gray-700">✓ Ejercicios interactivos</li>
                  <li className="text-gray-700">✓ Audio para practicar pronunciación</li>
                  <li className="text-gray-700">✓ Juegos educativos para reforzar el aprendizaje</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mb-3">¿Por qué aprender español?</h3>
                <p className="text-gray-700 mb-4">
                  España es uno de los destinos más populares para la comunidad árabe en Europa. Ya sea para estudiar, trabajar, obtener la nacionalidad o simplemente vivir, dominar el español es esencial para integrarse exitosamente en la sociedad española. Además, el español es el segundo idioma más hablado del mundo con más de 500 millones de hablantes, lo que abre muchas oportunidades laborales y educativas.
                </p>
              </div>
            </div>
          </section>
          
          <SmartInternalLinks />
        </div>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "Español Para Árabes - تعلم الإسبانية للعرب",
            "description": "Curso completo de español diseñado específicamente para estudiantes árabes. Explicaciones en árabe y español.",
            "provider": {
              "@type": "Organization",
              "name": "Espanol Hub",
              "url": "https://www.espanolhub.com"
            },
            "inLanguage": ["es", "ar"],
            "educationalLevel": "Beginner to Advanced",
            "teaches": "Spanish Language",
            "audience": {
              "@type": "EducationalAudience",
              "educationalRole": "Student"
            }
          }),
        }}
      />
    </div>
  );
}

const benefits = [
  {titleEs: "Enfoque para hablantes de árabe", description: "Explicaciones claras y enfoque práctico para avanzar paso a paso."},
  {titleEs: "Comparaciones útiles", description: "Destacamos puntos clave para evitar errores comunes al empezar."},
  {titleEs: "Ejemplos cotidianos", description: "Frases y situaciones reales para usar el español desde el primer día."},
  {titleEs: "Práctica guiada", description: "Ejercicios y actividades para fijar lo aprendido."},
  {titleEs: "CCSE y trámites", description: "Recursos para prepararte para la nacionalidad y trámites frecuentes."},
  {titleEs: "100% gratuito", description: "Todo el contenido es completamente gratuito sin limitaciones."},
];
