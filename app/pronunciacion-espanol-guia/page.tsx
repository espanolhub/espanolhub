import type { Metadata } from 'next';
import Link from 'next/link';
import { Volume2, Mic, BookOpen, ArrowRight, CheckCircle, Star } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import SmartInternalLinks from '@/components/SmartInternalLinks';

export const metadata: Metadata = {
  title: "Pronunciación Español: Guía Completa 2026 | Espanol Hub",
  description: "Mejora tu pronunciación en español con nuestra guía completa. Audio de nativos, ejercicios de R/RR, Ñ, J. Técnicas probadas. 100% gratis.",
  keywords: ["pronunciación español", "mejorar pronunciación español", "pronunciar español correctamente", "sonidos difíciles español", "pronunciación española"],
  alternates: {
    canonical: "https://www.espanolhub.com/pronunciacion-espanol-guia",
    languages: { 'es': "https://www.espanolhub.com/pronunciacion-espanol-guia" }
  },
};

export default function PronunciacionPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gradient-to-br from-gray-50 to-white py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <Breadcrumbs className="mb-8" />
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              Guía Completa de Pronunciación Española
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Aprende a pronunciar español correctamente con audio de hablantes nativos, ejercicios prácticos y técnicas probadas.
            </p>
            <Link href="/lectura" className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all">
              <Volume2 className="w-5 h-5" />Escuchar Audio Nativo<ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </header>
      <main className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Sonidos Difíciles del Español</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {difficultSounds.map((sound, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <h3 className="text-2xl font-bold text-blue-600 mb-3">{sound.letter}</h3>
                  <p className="text-gray-700 mb-4">{sound.description}</p>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="font-semibold text-gray-900 mb-2">Ejemplos:</div>
                    <div className="space-y-1 text-gray-700">
                      {sound.examples.map((ex, j) => (
                        <div key={j}>• {ex}</div>
                      ))}
                    </div>
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

const difficultSounds = [
  {letter: "R / RR", description: "La R suave y la RR fuerte son los sonidos más difíciles para estudiantes.", examples: ["pero / perro", "caro / carro", "para / parra"]},
  {letter: "Ñ", description: "Sonido único del español. Se pronuncia como 'ny' en inglés.", examples: ["año", "niño", "mañana", "español"]},
  {letter: "J", description: "Sonido aspirado fuerte desde la garganta.", examples: ["jamón", "trabajo", "hijo", "reloj"]},
  {letter: "LL", description: "En España suena como 'y', en Argentina como 'sh'.", examples: ["llamar", "calle", "lluvia", "silla"]},
];
