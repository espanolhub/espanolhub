import type { Metadata } from 'next';
import Link from 'next/link';
import { Book, Search, ArrowRight, CheckCircle, Languages } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import SmartInternalLinks from '@/components/SmartInternalLinks';

export const metadata: Metadata = {
  title: "Diccionario Español Visual Interactivo 2026 | Espanol Hub",
  description: "Diccionario visual de español con 2000+ palabras. Imágenes, audio de nativos, ejemplos y categorías. Aprende vocabulario español de forma visual. Gratis.",
  keywords: ["diccionario español", "diccionario español visual", "vocabulario español imágenes", "diccionario interactivo español"],
  alternates: {
    canonical: "https://www.espanolhub.com/diccionario-espanol-visual",
    languages: { 'es': "https://www.espanolhub.com/diccionario-espanol-visual" }
  },
};

export default function DiccionarioVisualPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gradient-to-br from-cyan-50 to-white py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <Breadcrumbs className="mb-8" />
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              Diccionario Español Visual Interactivo
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              2000+ palabras con imágenes, audio de hablantes nativos y ejemplos de uso. Aprende vocabulario español de forma visual y efectiva.
            </p>
            <Link href="/vocabulario" className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all">
              <Languages className="w-5 h-5" />Explorar Diccionario<ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </header>
      <main className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Categorías del Diccionario</h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {dictionaryCategories.map((cat, i) => (
                <Link key={i} href="/vocabulario" className="group bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:border-cyan-300 hover:shadow-xl transition-all text-center">
                  <div className="text-4xl mb-3">{cat.emoji}</div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-cyan-600 transition-colors mb-2">{cat.title}</h3>
                  <div className="text-sm text-cyan-600 font-semibold">{cat.count}</div>
                </Link>
              ))}
            </div>
          </section>
          <SmartInternalLinks />
        </div>
      </main>
    </div>
  );
}

const dictionaryCategories = [
  {emoji: "🍎", title: "Comida y Bebidas", count: "250 palabras"},
  {emoji: "🏠", title: "Casa y Hogar", count: "180 palabras"},
  {emoji: "👔", title: "Ropa y Accesorios", count: "120 palabras"},
  {emoji: "🚗", title: "Transporte", count: "90 palabras"},
  {emoji: "💼", title: "Trabajo y Oficina", count: "150 palabras"},
  {emoji: "📚", title: "Educación", count: "130 palabras"},
  {emoji: "⚽", title: "Deportes", count: "100 palabras"},
  {emoji: "🎨", title: "Hobbies y Arte", count: "110 palabras"},
  {emoji: "🌳", title: "Naturaleza", count: "140 palabras"},
  {emoji: "🏥", title: "Salud y Cuerpo", count: "160 palabras"},
  {emoji: "👨‍👩‍👧", title: "Familia", count: "80 palabras"},
  {emoji: "🌍", title: "Viajes y Turismo", count: "120 palabras"},
];
