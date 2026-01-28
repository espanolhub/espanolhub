import type { Metadata } from 'next';
import Link from 'next/link';
import { FileCheck, Trophy, ArrowRight, CheckCircle, Award, Target } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import SmartInternalLinks from '@/components/SmartInternalLinks';

export const metadata: Metadata = {
  title: "Exámenes de Español Gratis - Tests y Evaluaciones 2026 | Espanol Hub",
  description: "Evalúa tu nivel de español con exámenes y tests gratuitos. A1 a C2. Simuladores oficiales, exámenes de práctica DELE, SIELE. Resultados instantáneos.",
  keywords: ["exámenes español gratis", "test nivel español", "evaluación español", "examen DELE", "pruebas español online"],
  alternates: {
    canonical: "https://www.espanolhub.com/examenes-espanol-gratis",
    languages: { 'es': "https://www.espanolhub.com/examenes-espanol-gratis" }
  },
  openGraph: {
    title: "Exámenes de Español Gratis - Tests y Evaluaciones 2026",
    description: "Evalúa tu nivel de español con exámenes y tests gratuitos. A1 a C2. Simuladores oficiales con resultados instantáneos.",
    url: "https://www.espanolhub.com/examenes-espanol-gratis",
    siteName: "Espanol Hub",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Exámenes de Español - Espanol Hub',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Exámenes de Español Gratis - Tests y Evaluaciones 2026",
    description: "Evalúa tu nivel de español con exámenes y tests gratuitos. Resultados instantáneos.",
    images: ['/og-image.png'],
  },
};

export default function ExamenesEspanolPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gradient-to-br from-gray-50 to-white py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <Breadcrumbs className="mb-8" />
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-6 border border-gray-200">
              <Trophy className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-bold text-slate-900">Resultados Instantáneos</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              Exámenes de Español Gratis
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Evalúa tu nivel de español con nuestros exámenes y tests gratuitos. Desde A1 hasta C2. Resultados detallados al instante.
            </p>
            <Link href="/simulator" className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all">
              <FileCheck className="w-5 h-5" />Hacer Test de Nivel<ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </header>
      <main className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Tipos de Exámenes Disponibles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {examTypes.map((exam, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4 border border-gray-200">
                    <Award className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{exam.title}</h3>
                  <p className="text-gray-600 mb-4">{exam.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-blue-600">{exam.questions}</span>
                    <span className="text-sm text-gray-500">{exam.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16 bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">¿Por qué hacer exámenes de español?</h2>
            <div className="bg-white rounded-xl p-8 shadow-md">
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4">
                  Los exámenes de español son una herramienta fundamental para evaluar tu progreso y conocer tu nivel real del idioma. Ya sea que estés aprendiendo español por primera vez, preparándote para un examen oficial como el DELE o SIELE, o simplemente quieras medir tu avance, nuestros tests gratuitos te proporcionan una evaluación precisa y detallada.
                </p>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Beneficios de nuestros exámenes:</h3>
                <ul className="space-y-2 mb-6">
                  <li className="text-gray-700">✓ Evaluación completa de gramática, vocabulario y comprensión</li>
                  <li className="text-gray-700">✓ Resultados instantáneos con explicaciones detalladas</li>
                  <li className="text-gray-700">✓ Exámenes adaptados a todos los niveles (A1, A2, B1, B2, C1, C2)</li>
                  <li className="text-gray-700">✓ Simuladores de exámenes oficiales DELE, SIELE y CCSE</li>
                  <li className="text-gray-700">✓ Identificación de áreas de mejora</li>
                  <li className="text-gray-700">✓ Seguimiento de tu progreso a lo largo del tiempo</li>
                </ul>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Tipos de evaluación:</h3>
                <p className="text-gray-700 mb-4">
                  <strong>Test de Nivel General:</strong> Evalúa tu conocimiento global del español en todas las áreas: gramática, vocabulario, comprensión lectora y expresión escrita. Ideal para conocer tu nivel según el Marco Común Europeo de Referencia (MCER).
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Examen de Gramática:</strong> Enfocado específicamente en las reglas gramaticales del español. Incluye tiempos verbales, concordancia, preposiciones, pronombres y estructuras sintácticas.
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Test de Vocabulario:</strong> Mide tu conocimiento léxico en diferentes contextos: familia, trabajo, viajes, salud, educación, tecnología y más. Incluye sinónimos, antónimos y expresiones idiomáticas.
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Simulador DELE:</strong> Preparación completa para el Diploma de Español como Lengua Extranjera. Incluye todas las secciones del examen oficial: comprensión lectora, comprensión auditiva, expresión e interacción escritas, y expresión e interacción orales.
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Examen CCSE:</strong> Preparación específica para la prueba de Conocimientos Constitucionales y Socioculturales de España, necesaria para obtener la nacionalidad española.
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
            "@type": "ItemList",
            "name": "Exámenes de Español Gratis",
            "description": "Tests y evaluaciones gratuitas de español para todos los niveles",
            "itemListElement": examTypes.map((exam, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": exam.title,
              "description": exam.description
            }))
          }),
        }}
      />
    </div>
  );
}

const examTypes = [
  {title: "Test de Nivel General", description: "Evalúa tu nivel global de español (A1-C2)", questions: "50 preguntas", duration: "30 min"},
  {title: "Examen de Gramática", description: "Evalúa tu conocimiento de gramática española", questions: "40 preguntas", duration: "25 min"},
  {title: "Test de Vocabulario", description: "Mide tu vocabulario en español", questions: "60 preguntas", duration: "20 min"},
  {title: "Simulador DELE", description: "Práctica para el examen oficial DELE", questions: "100 preguntas", duration: "90 min"},
  {title: "Examen CCSE", description: "Preparación para nacionalidad española", questions: "25 preguntas", duration: "45 min"},
  {title: "Test de Comprensión", description: "Evalúa lectura y comprensión auditiva", questions: "30 preguntas", duration: "40 min"},
];
