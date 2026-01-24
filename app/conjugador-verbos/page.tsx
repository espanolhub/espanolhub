import type { Metadata } from 'next';
import Link from 'next/link';
import { Wrench, GraduationCap, ArrowRight, CheckCircle, Star, Zap } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import SmartInternalLinks from '@/components/SmartInternalLinks';

export const metadata: Metadata = {
  title: "Conjugador de Verbos Español Online Gratis 2026 | Espanol Hub",
  description: "Conjuga cualquier verbo español online gratis. Todos los tiempos, modos y formas. Verbos regulares e irregulares. Herramienta rápida y precisa.",
  keywords: ["conjugador verbos español", "conjugación verbos español", "conjugar verbos españoles", "conjugador español online"],
  alternates: {
    canonical: "https://www.espanolhub.com/conjugador-verbos",
    languages: { 'es': "https://www.espanolhub.com/conjugador-verbos" }
  },
};

export default function ConjugadorVerbosPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gradient-to-br from-violet-50 to-white py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <Breadcrumbs className="mb-8" />
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 rounded-full mb-6">
              <Wrench className="w-5 h-5 text-violet-600" />
              <span className="text-sm font-bold text-violet-900">Herramienta Gratis</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              Conjugador de Verbos Español
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Conjuga cualquier verbo español en todos los tiempos y modos. Herramienta gratuita con más de 12,000 verbos, incluyendo regulares e irregulares.
            </p>
            <Link href="/gramatica" className="inline-flex items-center gap-2 px-8 py-4 bg-violet-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all">
              <Zap className="w-5 h-5" />Usar Conjugador<ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </header>
      <main className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Características del Conjugador</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((f, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-md border border-violet-100 text-center">
                  <div className="w-14 h-14 bg-violet-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-7 h-7 text-violet-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-gray-600 text-sm">{f.description}</p>
                </div>
              ))}
            </div>
          </section>
          
          <section className="mb-16 bg-violet-50 rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Tiempos Verbales Incluidos</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {tenses.map((t, i) => (
                <div key={i} className="bg-white rounded-xl p-6">
                  <h3 className="font-bold text-lg text-violet-600 mb-3">{t.mood}</h3>
                  <ul className="space-y-2">
                    {t.times.map((time, j) => (
                      <li key={j} className="flex items-center gap-2 text-gray-700">
                        <Star className="w-4 h-4 text-violet-400" />
                        {time}
                      </li>
                    ))}
                  </ul>
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

const features = [
  {title: "12,000+ Verbos", description: "Base de datos completa con todos los verbos españoles"},
  {title: "Todos los Tiempos", description: "Presente, pasado, futuro, subjuntivo y más"},
  {title: "Verbos Irregulares", description: "Incluye todos los verbos irregulares importantes"},
  {title: "Resultados Instantáneos", description: "Conjugación inmediata al escribir el verbo"},
];

const tenses = [
  {mood: "Indicativo", times: ["Presente", "Pretérito", "Imperfecto", "Futuro", "Condicional"]},
  {mood: "Subjuntivo", times: ["Presente", "Pretérito", "Imperfecto", "Futuro"]},
  {mood: "Imperativo", times: ["Afirmativo", "Negativo"]},
];
