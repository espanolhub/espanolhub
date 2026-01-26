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

          <section className="mb-16 bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Contenido del Curso</h2>
            <h3 className="text-2xl font-bold text-gray-700 mb-8 text-center" dir="rtl">محتوى الدورة</h3>
            <div className="bg-white rounded-xl p-8 shadow-md">
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4">
                  Este curso de español está diseñado específicamente para estudiantes árabes que quieren aprender español desde cero o mejorar su nivel actual. Todas las lecciones incluyen explicaciones en árabe y español para facilitar la comprensión.
                </p>
                <p className="text-gray-600 mb-6" dir="rtl">
                  هذه الدورة مصممة خصيصاً للطلاب العرب الذين يريدون تعلم الإسبانية من الصفر أو تحسين مستواهم الحالي. جميع الدروس تتضمن شروحات بالعربية والإسبانية لتسهيل الفهم.
                </p>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">Módulos del Curso / وحدات الدورة:</h3>
                <ul className="space-y-3 mb-6">
                  <li className="text-gray-700">
                    <strong>1. Alfabeto y Pronunciación / الأبجدية والنطق:</strong> Aprende las letras españolas y su pronunciación correcta. Comparación con sonidos árabes.
                  </li>
                  <li className="text-gray-700">
                    <strong>2. Gramática Básica / القواعد الأساسية:</strong> Verbos ser/estar, artículos, género y número, presente de indicativo, verbos regulares e irregulares.
                  </li>
                  <li className="text-gray-700">
                    <strong>3. Vocabulario Temático / المفردات حسب المواضيع:</strong> Familia, trabajo, comida, viajes, salud, educación, tecnología y más.
                  </li>
                  <li className="text-gray-700">
                    <strong>4. Conversación Práctica / المحادثة العملية:</strong> Frases útiles para situaciones cotidianas: presentarse, pedir información, ir de compras, en el médico, etc.
                  </li>
                  <li className="text-gray-700">
                    <strong>5. Preparación CCSE / التحضير لامتحان CCSE:</strong> Contenido completo para el examen de nacionalidad española con explicaciones en árabe.
                  </li>
                  <li className="text-gray-700">
                    <strong>6. Cultura Española / الثقافة الإسبانية:</strong> Aprende sobre costumbres, tradiciones y aspectos culturales importantes de España.
                  </li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mb-3">Metodología / المنهجية:</h3>
                <p className="text-gray-700 mb-4">
                  Nuestro método de enseñanza combina explicaciones teóricas con práctica intensiva. Cada lección incluye:
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="text-gray-700">✓ Explicación del concepto en español y árabe</li>
                  <li className="text-gray-700">✓ Ejemplos prácticos con traducción</li>
                  <li className="text-gray-700">✓ Ejercicios interactivos</li>
                  <li className="text-gray-700">✓ Audio para practicar pronunciación</li>
                  <li className="text-gray-700">✓ Juegos educativos para reforzar el aprendizaje</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mb-3">¿Por qué los árabes necesitan español? / لماذا يحتاج العرب للإسبانية؟</h3>
                <p className="text-gray-700 mb-4">
                  España es uno de los destinos más populares para la comunidad árabe en Europa. Ya sea para estudiar, trabajar, obtener la nacionalidad o simplemente vivir, dominar el español es esencial para integrarse exitosamente en la sociedad española. Además, el español es el segundo idioma más hablado del mundo con más de 500 millones de hablantes, lo que abre muchas oportunidades laborales y educativas.
                </p>
                <p className="text-gray-600 mb-4" dir="rtl">
                  إسبانيا هي واحدة من الوجهات الأكثر شعبية للمجتمع العربي في أوروبا. سواء للدراسة أو العمل أو الحصول على الجنسية أو مجرد العيش، فإن إتقان اللغة الإسبانية ضروري للاندماج بنجاح في المجتمع الإسباني. بالإضافة إلى ذلك، الإسبانية هي ثاني أكثر لغة تحدثاً في العالم مع أكثر من 500 مليون متحدث، مما يفتح العديد من الفرص الوظيفية والتعليمية.
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
  {titleEs: "Explicaciones en Árabe", titleAr: "شرح باللغة العربية", description: "Todas las lecciones incluyen explicaciones en árabe para facilitar la comprensión."},
  {titleEs: "Comparaciones Útiles", titleAr: "مقارنات مفيدة", description: "Comparamos estructuras del español con el árabe para mostrar similitudes y diferencias."},
  {titleEs: "Ejemplos Culturales", titleAr: "أمثلة ثقافية", description: "Ejemplos relevantes para estudiantes árabes que viven o planean vivir en España."},
  {titleEs: "Soporte Comunitario", titleAr: "دعم مجتمعي", description: "Comunidad de estudiantes árabes aprendiendo español juntos."},
  {titleEs: "CCSE y Trámites", titleAr: "CCSE والإجراءات", description: "Preparación completa para nacionalidad española y todos los trámites necesarios."},
  {titleEs: "100% Gratuito", titleAr: "100% مجاني", description: "Todo el contenido es completamente gratuito sin limitaciones."},
];
