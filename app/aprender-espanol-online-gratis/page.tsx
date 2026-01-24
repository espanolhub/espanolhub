import type { Metadata } from 'next';
import Link from 'next/link';
import { Laptop, Globe, Clock, CheckCircle, Star, Zap, BookOpen, Gamepad2, Languages, ArrowRight, Gift, Shield } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import SmartInternalLinks from '@/components/SmartInternalLinks';

export const metadata: Metadata = {
  title: "Aprender Español Online Gratis 2026 - Plataforma Completa | Espanol Hub",
  description: "Aprende español online 100% gratis. Curso completo, juegos interactivos, ejercicios, audio con nativos. Sin registro. Empieza ya y habla español con confianza.",
  keywords: ["aprender español online gratis", "español online", "curso español online", "plataforma español gratis", "aprender español internet", "español en línea gratis"],
  alternates: {
    canonical: "https://www.espanolhub.com/aprender-espanol-online-gratis",
    languages: {
      'es': "https://www.espanolhub.com/aprender-espanol-online-gratis",
      'ar': "https://www.espanolhub.com/ar/aprender-espanol-online-gratis",
    }
  },
  openGraph: {
    title: "Aprender Español Online Gratis 2026 - Plataforma Completa",
    description: "Aprende español online 100% gratis. Curso completo, juegos interactivos, ejercicios, audio con nativos.",
    type: "website",
    locale: "es_ES",
    url: "https://www.espanolhub.com/aprender-espanol-online-gratis",
    siteName: "Espanol Hub",
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Aprender Español Online Gratis',
    }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@espanolhub",
    title: "Aprender Español Online Gratis 2026",
    description: "Aprende español online 100% gratis. Curso completo con juegos y ejercicios interactivos.",
    images: ['/og-image.png'],
  },
};

export default function AprenderEspanolOnlinePage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gradient-to-br from-blue-50 via-purple-50 to-white py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <Breadcrumbs className="mb-8" />
          
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-6">
              <Laptop className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-bold text-blue-900">Plataforma Online Completa</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
              Aprende Español Online Gratis
            </h1>
            
            <p className="text-xl text-gray-700 mb-8">
              La plataforma más completa para aprender español online. Gramática, vocabulario, juegos, audio nativo y más. Todo 100% gratis y disponible 24/7.
            </p>
            
            <Link
              href="/gramatica"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              <Zap className="w-5 h-5" />
              Empezar Ahora - Es Gratis
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </header>

      <main className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          
          {/* Herramientas Online */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Herramientas Online Gratuitas
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {onlineTools.map((tool, index) => (
                <Link
                  key={index}
                  href={tool.href}
                  className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-100 hover:border-blue-300"
                >
                  <div className={`w-14 h-14 ${tool.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                    {tool.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {tool.description}
                  </p>
                  <div className="flex items-center text-blue-600 font-semibold text-sm">
                    <span>Explorar</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Ventajas de Aprender Online */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
              Ventajas de Aprender Español Online
            </h2>
            <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Aprender español online te da flexibilidad total y acceso a recursos que no están disponibles en cursos tradicionales.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {advantages.map((adv, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
                    {adv.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {adv.title}
                  </h3>
                  <p className="text-gray-600">
                    {adv.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Qué Incluye la Plataforma */}
          <section className="mb-16 bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              ¿Qué Incluye Nuestra Plataforma Online?
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {platformFeatures.map((feature, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Cómo Empezar */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Cómo Empezar en 3 Pasos Simples
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-blue-200 text-center">
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 mt-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Preguntas Frecuentes
            </h2>
            <div className="max-w-4xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <details key={index} className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <summary className="font-bold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors">
                    {faq.question}
                  </summary>
                  <p className="mt-4 text-gray-700">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          <SmartInternalLinks />

          {/* CTA Final */}
          <section className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Empieza Tu Viaje de Aprendizaje Hoy
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Únete a miles de estudiantes aprendiendo español online
            </p>
            <Link
              href="/gramatica"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              Empezar Ahora - Totalmente Gratis
              <ArrowRight className="w-5 h-5" />
            </Link>
          </section>
        </div>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </div>
  );
}

const onlineTools = [
  {
    icon: <BookOpen className="w-7 h-7 text-white" />,
    title: "Lecciones Interactivas",
    description: "100+ lecciones con explicaciones detalladas y ejemplos",
    href: "/gramatica",
    bgColor: "bg-gradient-to-br from-blue-500 to-blue-600"
  },
  {
    icon: <Languages className="w-7 h-7 text-white" />,
    title: "Vocabulario Visual",
    description: "1000+ palabras con imágenes y pronunciación",
    href: "/vocabulario",
    bgColor: "bg-gradient-to-br from-green-500 to-green-600"
  },
  {
    icon: <Gamepad2 className="w-7 h-7 text-white" />,
    title: "Juegos Educativos",
    description: "Aprende jugando con 6 juegos interactivos",
    href: "/juegos",
    bgColor: "bg-gradient-to-br from-pink-500 to-pink-600"
  },
  {
    icon: <Globe className="w-7 h-7 text-white" />,
    title: "Audio Nativo",
    description: "Escucha pronunciación de hablantes nativos",
    href: "/lectura",
    bgColor: "bg-gradient-to-br from-purple-500 to-purple-600"
  },
];

const advantages = [
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Aprende a Tu Ritmo",
    description: "Estudia cuando quieras, donde quieras. 24/7 disponible en todos tus dispositivos."
  },
  {
    icon: <Gift className="w-8 h-8" />,
    title: "100% Gratis",
    description: "Todo el contenido es gratuito. Sin límites, sin costos ocultos, sin registro necesario."
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Resultados Rápidos",
    description: "Metodología probada que te permite hablar español básico en 30 días."
  },
  {
    icon: <Star className="w-8 h-8" />,
    title: "Contenido de Calidad",
    description: "Material creado por profesores nativos con años de experiencia enseñando español."
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Actualizado 2026",
    description: "Contenido completamente actualizado con las últimas tendencias en enseñanza de idiomas."
  },
  {
    icon: <Gamepad2 className="w-8 h-8" />,
    title: "Aprendizaje Divertido",
    description: "Juegos educativos que hacen que aprender español sea entretenido y efectivo."
  },
];

const platformFeatures = [
  {
    title: "Curso Completo de Gramática",
    description: "Desde nivel A1 hasta C1. Todas las reglas gramaticales explicadas con ejemplos claros y ejercicios prácticos."
  },
  {
    title: "Vocabulario Temático",
    description: "Más de 1000 palabras organizadas por temas: familia, trabajo, viajes, comida y más. Con audio y ejemplos."
  },
  {
    title: "15+ Juegos Educativos",
    description: "Juegos de memoria, quiz interactivos, completar frases, ordenar palabras y más. Aprende jugando."
  },
  {
    title: "Lecturas con Audio",
    description: "Textos adaptados a tu nivel con audio de hablantes nativos. Mejora comprensión lectora y pronunciación."
  },
  {
    title: "Preparación CCSE",
    description: "Material completo para el examen de nacionalidad española. 40+ lecciones y exámenes de práctica."
  },
  {
    title: "Simulador DGT",
    description: "Preparación completa para el examen teórico de conducir en España con simulador oficial."
  },
  {
    title: "Ejercicios Interactivos",
    description: "Cientos de ejercicios con retroalimentación inmediata. Practica y mejora tus habilidades."
  },
  {
    title: "Blog Educativo",
    description: "Artículos y guías sobre gramática, vocabulario, pronunciación y cultura española. Actualizado semanalmente."
  },
];

const steps = [
  {
    title: "Elige Tu Punto de Partida",
    description: "Selecciona tu nivel actual: principiante, intermedio o avanzado. O empieza desde el módulo que más te interese."
  },
  {
    title: "Estudia y Practica",
    description: "Estudia las lecciones a tu ritmo. Practica con ejercicios interactivos y juegos educativos para reforzar lo aprendido."
  },
  {
    title: "Mide Tu Progreso",
    description: "Realiza tests y evaluaciones para medir tu progreso. Identifica áreas de mejora y celebra tus logros."
  },
];

const faqs = [
  {
    question: "¿Por qué aprender español online es mejor que presencial?",
    answer: "Aprender español online te ofrece flexibilidad total: estudias cuando quieras, a tu propio ritmo, desde cualquier lugar. Además, tienes acceso a recursos interactivos, audio de nativos, y juegos educativos que no están disponibles en cursos tradicionales. Todo sin los costos de cursos presenciales."
  },
  {
    question: "¿Puedo aprender español online sin profesor?",
    answer: "Sí, absolutamente. Nuestra plataforma está diseñada para el autoaprendizaje efectivo. Las lecciones incluyen explicaciones detalladas, ejemplos claros, ejercicios con retroalimentación automática, y juegos interactivos. Miles de estudiantes han aprendido español exitosamente usando solo recursos online."
  },
  {
    question: "¿Cuánto tiempo necesito para aprender español online?",
    answer: "Depende de tu dedicación. Con 1 hora diaria, puedes alcanzar nivel básico (A1) en 2-3 meses, nivel intermedio (A2-B1) en 6-9 meses, y nivel avanzado (B2-C1) en 12-18 meses. Lo importante es la consistencia, no la intensidad."
  },
  {
    question: "¿Es efectivo aprender español online comparado con clases presenciales?",
    answer: "Estudios muestran que el aprendizaje online puede ser igual o más efectivo que clases presenciales, especialmente cuando se usa de forma constante. La clave está en usar recursos de calidad, practicar regularmente, y combinar diferentes métodos (leer, escuchar, escribir, hablar)."
  },
  {
    question: "¿Qué necesito para aprender español online?",
    answer: "Solo necesitas: 1) Conexión a internet, 2) Un dispositivo (computadora, tablet o smartphone), 3) 15-30 minutos diarios, 4) Motivación para aprender. No necesitas software especial ni equipamiento costoso."
  },
  {
    question: "¿Puedo obtener certificado aprendiendo online?",
    answer: "Puedes prepararte online para obtener certificados oficiales como DELE (A1-C2), SIELE, o CCSE. Nuestra plataforma incluye preparación completa para CCSE. Los exámenes oficiales se realizan en centros autorizados."
  },
  {
    question: "¿Los recursos online incluyen audio de nativos?",
    answer: "Sí, nuestras lecciones de lectura incluyen audio grabado por hablantes nativos españoles. Esto te ayuda a mejorar tu comprensión auditiva y pronunciación escuchando español auténtico."
  },
  {
    question: "¿Puedo usar la plataforma en mi teléfono móvil?",
    answer: "Sí, nuestra plataforma está completamente optimizada para móviles. Puedes estudiar desde tu smartphone o tablet con la misma calidad que en computadora. Ideal para aprovechar tiempos muertos como viajes en transporte público."
  },
];

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Aprender Español Online Gratis",
  "description": "Plataforma online completa para aprender español gratis. Incluye gramática, vocabulario, juegos educativos, audio nativo y más.",
  "provider": {
    "@type": "Organization",
    "name": "Espanol Hub",
    "url": "https://www.espanolhub.com"
  },
  "educationalLevel": "All Levels",
  "inLanguage": "es",
  "isAccessibleForFree": true,
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "online"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};
