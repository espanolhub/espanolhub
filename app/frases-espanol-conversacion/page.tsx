import type { Metadata } from 'next';
import Link from 'next/link';
import { MessageSquare, ArrowRight, Star, Globe } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import SmartInternalLinks from '@/components/SmartInternalLinks';

export const metadata: Metadata = {
  title: "500+ Frases en Español para Conversación 2026 | Espanol Hub",
  description: "Las frases más útiles en español para conversaciones diarias. Saludos, presentaciones, restaurante, compras y más. Con audio y ejemplos. Gratis.",
  keywords: ["frases español", "frases útiles español", "conversación español", "frases españolas", "español conversación"],
  alternates: {
    canonical: "https://www.espanolhub.com/frases-espanol-conversacion",
    languages: { 'es': "https://www.espanolhub.com/frases-espanol-conversacion" }
  },
};

export default function FrasesConversacionPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gradient-to-br from-pink-50 to-white py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <Breadcrumbs className="mb-8" />
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              500+ Frases en Español para Conversación
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Las frases más importantes que necesitas para comunicarte en español en situaciones cotidianas. Con audio de nativos y ejemplos de uso.
            </p>
            <Link href="/lectura" className="inline-flex items-center gap-2 px-8 py-4 bg-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all">
              <MessageSquare className="w-5 h-5" />Ver Frases con Audio<ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </header>
      <main className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Frases por Categoría</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {phraseCategories.map((cat, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-md border border-pink-100 hover:shadow-xl transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-pink-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{cat.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{cat.description}</p>
                  <div className="text-sm text-pink-600 font-semibold">{cat.count}</div>
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

const phraseCategories = [
  {title: "Saludos y Despedidas", description: "Hola, buenos días, hasta luego y más", count: "50 frases"},
  {title: "Presentaciones", description: "Cómo presentarte y hablar de ti mismo", count: "40 frases"},
  {title: "En el Restaurante", description: "Pedir comida, la cuenta y más", count: "60 frases"},
  {title: "De Compras", description: "Preguntar precios, tallas y comprar", count: "45 frases"},
  {title: "Pedir Direcciones", description: "Dónde está, cómo llegar", count: "35 frases"},
  {title: "En el Hotel", description: "Reservar, hacer check-in/out", count: "40 frases"},
];
