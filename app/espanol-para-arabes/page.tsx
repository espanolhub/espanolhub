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
      'ar': "https://www.espanolhub.com/ar/espanol-para-arabes",
    }
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
              <span className="text-sm font-bold text-green-900">للناطقين بالعربية</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              تعلم اللغة الإسبانية للعرب
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-6" dir="rtl">
              Español Para Árabes - دورة شاملة ومجانية
            </h2>
            <p className="text-xl text-gray-700 mb-4">
              Curso completo de español diseñado específicamente para estudiantes árabes. Explicaciones en árabe, ejemplos claros y ejercicios prácticos.
            </p>
            <p className="text-lg text-gray-600 mb-8" dir="rtl">
              تعلم الإسبانية من الصفر مع شرح بالعربية. قواعد، مفردات، نطق، وألعاب تعليمية. كل شيء مجاني 100%
            </p>
            <Link href="/gramatica" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all">
              <BookOpen className="w-5 h-5" />ابدأ التعلم الآن - Empezar Ahora<ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </header>
      <main className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Por Qué Este Curso es Perfecto Para Estudiantes Árabes</h2>
            <h3 className="text-2xl font-bold text-gray-700 mb-8 text-center" dir="rtl">لماذا هذه الدورة مثالية للطلاب العرب</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((b, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{b.titleEs}</h3>
                  <p className="text-md font-semibold text-gray-700 mb-3" dir="rtl">{b.titleAr}</p>
                  <p className="text-gray-600">{b.description}</p>
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

const benefits = [
  {titleEs: "Explicaciones en Árabe", titleAr: "شرح باللغة العربية", description: "Todas las lecciones incluyen explicaciones en árabe para facilitar la comprensión."},
  {titleEs: "Comparaciones Útiles", titleAr: "مقارنات مفيدة", description: "Comparamos estructuras del español con el árabe para mostrar similitudes y diferencias."},
  {titleEs: "Ejemplos Culturales", titleAr: "أمثلة ثقافية", description: "Ejemplos relevantes para estudiantes árabes que viven o planean vivir en España."},
  {titleEs: "Soporte Comunitario", titleAr: "دعم مجتمعي", description: "Comunidad de estudiantes árabes aprendiendo español juntos."},
  {titleEs: "CCSE y Trámites", titleAr: "CCSE والإجراءات", description: "Preparación completa para nacionalidad española y todos los trámites necesarios."},
  {titleEs: "100% Gratuito", titleAr: "100% مجاني", description: "Todo el contenido es completamente gratuito sin limitaciones."},
];
