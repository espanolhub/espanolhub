import type { Metadata } from 'next';
import Link from 'next/link';
import { Book, ArrowRight, CheckCircle, Zap, Star, Award } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import SmartInternalLinks from '@/components/SmartInternalLinks';

export const metadata: Metadata = {
  title: "Verbos Irregulares en Español - Lista Completa 2026 | Espanol Hub",
  description: "Lista completa de verbos irregulares españoles con conjugaciones. Ser, estar, tener, hacer, ir y más. Ejercicios interactivos incluidos. Aprende gratis.",
  keywords: ["verbos irregulares español", "lista verbos irregulares", "conjugación verbos irregulares", "verbos irregulares lista", "aprender verbos español"],
  alternates: {
    canonical: "https://www.espanolhub.com/verbos-irregulares-espanol-lista",
    languages: { 'es': "https://www.espanolhub.com/verbos-irregulares-espanol-lista" }
  },
};

export default function VerbosIrregularesPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gradient-to-br from-indigo-50 to-white py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <Breadcrumbs className="mb-8" />
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              Verbos Irregulares en Español: Lista Completa
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Los 100 verbos irregulares más importantes del español con conjugaciones completas, ejemplos y ejercicios interactivos.
            </p>
            <Link href="/gramatica" className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all">
              <Zap className="w-5 h-5" />Practicar Ahora<ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </header>
      <main className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Los 8 Verbos Irregulares Esenciales</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {essentialVerbs.map((verb, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <h3 className="text-2xl font-bold text-indigo-600 mb-4">{verb.infinitive}</h3>
                  <p className="text-gray-600 mb-4">{verb.meaning}</p>
                  <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                    {verb.conjugations.map((conj, j) => (
                      <div key={j} className="mb-1">{conj}</div>
                    ))}
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

const essentialVerbs = [
  {infinitive: "SER", meaning: "to be (permanent)", conjugations: ["yo soy", "tú eres", "él/ella es", "nosotros somos", "ellos son"]},
  {infinitive: "ESTAR", meaning: "to be (temporary)", conjugations: ["yo estoy", "tú estás", "él/ella está", "nosotros estamos", "ellos están"]},
  {infinitive: "TENER", meaning: "to have", conjugations: ["yo tengo", "tú tienes", "él/ella tiene", "nosotros tenemos", "ellos tienen"]},
  {infinitive: "HACER", meaning: "to do/make", conjugations: ["yo hago", "tú haces", "él/ella hace", "nosotros hacemos", "ellos hacen"]},
  {infinitive: "IR", meaning: "to go", conjugations: ["yo voy", "tú vas", "él/ella va", "nosotros vamos", "ellos van"]},
  {infinitive: "PODER", meaning: "can/to be able", conjugations: ["yo puedo", "tú puedes", "él/ella puede", "nosotros podemos", "ellos pueden"]},
  {infinitive: "DECIR", meaning: "to say/tell", conjugations: ["yo digo", "tú dices", "él/ella dice", "nosotros decimos", "ellos dicen"]},
  {infinitive: "VENIR", meaning: "to come", conjugations: ["yo vengo", "tú vienes", "él/ella viene", "nosotros venimos", "ellos vienen"]},
];
