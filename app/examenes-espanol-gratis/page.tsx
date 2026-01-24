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
};

export default function ExamenesEspanolPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gradient-to-br from-amber-50 to-white py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <Breadcrumbs className="mb-8" />
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full mb-6">
              <Trophy className="w-5 h-5 text-amber-600" />
              <span className="text-sm font-bold text-amber-900">Resultados Instantáneos</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              Exámenes de Español Gratis
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Evalúa tu nivel de español con nuestros exámenes y tests gratuitos. Desde A1 hasta C2. Resultados detallados al instante.
            </p>
            <Link href="/simulator" className="inline-flex items-center gap-2 px-8 py-4 bg-amber-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all">
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
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{exam.title}</h3>
                  <p className="text-gray-600 mb-4">{exam.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-amber-600">{exam.questions}</span>
                    <span className="text-sm text-gray-500">{exam.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <SmartInternalLinks />
        </div>
      </main>
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
