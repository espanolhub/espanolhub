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
  openGraph: {
    title: "Conjugador de Verbos Español Online Gratis 2026",
    description: "Conjuga cualquier verbo español online gratis. Todos los tiempos, modos y formas. Más de 12,000 verbos disponibles.",
    url: "https://www.espanolhub.com/conjugador-verbos",
    siteName: "Espanol Hub",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Conjugador de Verbos - Espanol Hub',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Conjugador de Verbos Español Online Gratis 2026",
    description: "Conjuga cualquier verbo español online gratis. Todos los tiempos, modos y formas.",
    images: ['/og-image.png'],
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

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">¿Cómo usar el Conjugador de Verbos?</h2>
            <div className="bg-white rounded-xl p-8 shadow-md border border-violet-100">
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4">
                  Nuestro conjugador de verbos español es una herramienta completa y fácil de usar que te permite conjugar cualquier verbo español en todos los tiempos y modos verbales. Con más de 12,000 verbos en nuestra base de datos, incluyendo verbos regulares e irregulares, podrás encontrar la conjugación exacta que necesitas en segundos.
                </p>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Características principales:</h3>
                <ul className="space-y-2 mb-6">
                  <li className="text-gray-700">✓ Base de datos completa con más de 12,000 verbos españoles</li>
                  <li className="text-gray-700">✓ Conjugación en todos los tiempos verbales: presente, pretérito, imperfecto, futuro, condicional</li>
                  <li className="text-gray-700">✓ Todos los modos: indicativo, subjuntivo, imperativo</li>
                  <li className="text-gray-700">✓ Incluye verbos irregulares y sus variaciones</li>
                  <li className="text-gray-700">✓ Resultados instantáneos mientras escribes</li>
                  <li className="text-gray-700">✓ Interfaz limpia y fácil de usar</li>
                </ul>
                <h3 className="text-xl font-bold text-gray-900 mb-3">¿Por qué es importante conjugar correctamente?</h3>
                <p className="text-gray-700 mb-4">
                  La conjugación verbal es uno de los aspectos más importantes del español. Los verbos cambian según el tiempo, el modo, la persona y el número. Dominar la conjugación verbal te permitirá expresarte correctamente en cualquier situación, ya sea en conversaciones cotidianas, escritura formal o exámenes oficiales como el DELE o CCSE.
                </p>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Verbos más comunes en español:</h3>
                <p className="text-gray-700 mb-4">
                  Los verbos más utilizados en español incluyen: ser, estar, haber, tener, hacer, ir, poder, decir, dar, saber, querer, ver, llegar, pasar, deber, poner, parecer, quedar, creer, hablar, llevar, dejar, seguir, encontrar, llamar, venir, pensar, salir, volver, tomar, conocer, vivir, sentir, tratar, mirar, contar, empezar, esperar, buscar, existir, entrar, trabajar, escribir, perder, producir, ocurrir, entender, pedir, recibir, recordar, terminar, permitir, aparecer, conseguir, comenzar, servir, sacar, necesitar, mantener, resultar, leer, caer, cambiar, presentar, crear, abrir, considerar, oír, acabar, formar, vender, y muchos más.
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
            "@type": "SoftwareApplication",
            "name": "Conjugador de Verbos Español",
            "applicationCategory": "EducationalApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "EUR"
            },
            "description": "Conjuga cualquier verbo español online gratis. Más de 12,000 verbos disponibles con todos los tiempos y modos.",
            "featureList": [
              "12,000+ verbos españoles",
              "Todos los tiempos verbales",
              "Verbos regulares e irregulares",
              "Resultados instantáneos"
            ]
          }),
        }}
      />
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
