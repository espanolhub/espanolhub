import type { Metadata } from 'next';
import Link from 'next/link';
import { generateLandingMetadata } from '@/lib/utils/dynamic-metadata';
import { generateFAQSchema, generateLessonSchema } from '@/lib/utils/schemaMarkup';
import { CheckCircle, BookOpen, Gamepad2, Users, Award, Clock, Globe, Zap } from 'lucide-react';

export const metadata: Metadata = generateLandingMetadata(
  'aprender español gratis',
  'La Mejor Plataforma Online',
  'Aprende español 100% gratis sin registro. Gramática, vocabulario, juegos interactivos, preparación CCSE y más. Empieza ahora.',
  '/aprender-espanol-gratis'
);

// FAQ Schema for SEO
const faqs = [
  {
    question: '¿Es realmente gratis aprender español en Espanol Hub?',
    answer: 'Sí, 100% gratis. No necesitas registrarte ni pagar nada. Todo el contenido está disponible de forma gratuita, incluyendo gramática, vocabulario, juegos educativos y preparación para exámenes.',
  },
  {
    question: '¿Qué puedo aprender en Espanol Hub?',
    answer: 'Puedes aprender gramática española completa, vocabulario por temas, practicar con juegos interactivos, prepararte para el examen CCSE de nacionalidad, y estudiar para el carnet de conducir DGT. Todo en un solo lugar.',
  },
  {
    question: '¿Necesito crear una cuenta para usar el sitio?',
    answer: 'No es necesario. Puedes acceder a todo el contenido sin registro. Sin embargo, si te registras, podrás guardar tu progreso y acceder a funciones adicionales.',
  },
  {
    question: '¿Es adecuado para principiantes?',
    answer: 'Absolutamente. Espanol Hub está diseñado para todos los niveles, desde principiantes absolutos hasta estudiantes avanzados. Comienza con el alfabeto y números, y avanza gradualmente.',
  },
  {
    question: '¿Hay ejercicios prácticos?',
    answer: 'Sí, tenemos más de 200 preguntas de práctica, juegos interactivos, ejercicios de gramática, y simuladores de exámenes reales para CCSE y DGT.',
  },
  {
    question: '¿Puedo usar el sitio en mi móvil?',
    answer: 'Sí, el sitio está completamente optimizado para móviles. Puedes aprender español desde cualquier dispositivo, en cualquier momento y lugar.',
  },
];

const faqSchema = generateFAQSchema(faqs);

// Course Schema
const courseSchema = generateLessonSchema({
  name: 'Aprende Español GRATIS',
  description: 'Curso completo de español gratis. Gramática, vocabulario, juegos educativos y preparación para exámenes.',
  url: 'https://www.espanolhub.com/aprender-espanol-gratis',
  educationalLevel: 'Beginner to Advanced',
  provider: 'Espanol Hub',
});

export default function AprenderEspanolGratisPage() {
  return (
    <>
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Course Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Aprende Español <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">GRATIS</span> en 2025
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8">
              La mejor plataforma online para aprender español. Sin registro. Sin pagos. 100% gratis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/juegos"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                Empieza Ahora - GRATIS
              </Link>
              <Link
                href="/gramatica-espanola-completa"
                className="px-8 py-4 bg-white border-2 border-blue-600 text-blue-600 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all"
              >
                Ver Gramática Completa
              </Link>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              ✅ Sin registro • ✅ Sin tarjeta de crédito • ✅ Acceso inmediato
            </p>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            8 Razones para Elegir Espanol Hub
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: <CheckCircle className="w-8 h-8" />,
                title: '100% Gratis',
                description: 'Todo el contenido disponible sin costo. Sin trucos ni letras pequeñas.',
              },
              {
                icon: <BookOpen className="w-8 h-8" />,
                title: 'Contenido Completo',
                description: 'Gramática, vocabulario, lectura, juegos y preparación para exámenes.',
              },
              {
                icon: <Gamepad2 className="w-8 h-8" />,
                title: 'Juegos Interactivos',
                description: 'Aprende divirtiéndote con más de 200 preguntas y juegos educativos.',
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Para Todos los Niveles',
                description: 'Desde principiantes hasta avanzados. Empieza donde te sientas cómodo.',
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: 'Preparación CCSE',
                description: 'Prepárate para el examen de nacionalidad española con simuladores reales.',
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: 'Aprende a Tu Ritmo',
                description: 'Sin horarios fijos. Estudia cuando quieras, donde quieras.',
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: 'Disponible en Móvil',
                description: 'Optimizado para teléfonos y tablets. Aprende sobre la marcha.',
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'Resultados Rápidos',
                description: 'Métodos probados que te ayudan a aprender español más rápido.',
              },
            ].map((reason, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="text-blue-600 mb-4">{reason.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{reason.title}</h3>
                <p className="text-gray-600">{reason.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="container mx-auto px-4 py-16 bg-white">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Lo que Dicen Nuestros Estudiantes
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'María L.',
                text: 'Finalmente encontré una plataforma donde puedo aprender español gratis sin compromisos. Los juegos son divertidos y realmente aprendo.',
                rating: 5,
              },
              {
                name: 'Ahmed K.',
                text: 'Perfecto para preparar el examen CCSE. Los simuladores son exactamente como el examen real. ¡Gracias!',
                rating: 5,
              },
              {
                name: 'Sofia R.',
                text: 'Me encanta que puedo estudiar desde mi móvil. La gramática está muy bien explicada y los ejercicios son útiles.',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <p className="text-gray-900 font-semibold">— {testimonial.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What You'll Learn Section */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            ¿Qué Aprenderás?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: 'Gramática Española Completa',
                description: 'Desde lo básico hasta avanzado. Verbos, tiempos, artículos, pronombres y más.',
                link: '/gramatica-espanola-completa',
              },
              {
                title: 'Vocabulario por Temas',
                description: 'Más de 1000 palabras organizadas por temas: familia, trabajo, comida, viajes...',
                link: '/vocabulario',
              },
              {
                title: 'Juegos Educativos',
                description: 'Aprende jugando con juegos de memoria, quiz, completar frases y más.',
                link: '/juegos',
              },
              {
                title: 'Lecturas en Español',
                description: 'Textos adaptados a tu nivel con ejercicios de comprensión.',
                link: '/lectura',
              },
              {
                title: 'Preparación CCSE',
                description: 'Simuladores del examen de nacionalidad española con más de 200 preguntas.',
                link: '/nacionalidad',
              },
              {
                title: 'Carnet de Conducir DGT',
                description: 'Prepárate para el examen teórico de conducir en España.',
                link: '/driving-license',
              },
            ].map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all transform hover:scale-105"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
                <span className="text-blue-600 font-semibold mt-4 inline-block">
                  Aprender más →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="container mx-auto px-4 py-16 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Cómo Funciona
            </h2>
            <p className="text-lg text-gray-700 text-center mb-12">
              Aprender español en Espanol Hub es simple, directo y completamente gratis. Sigue estos pasos para empezar tu viaje de aprendizaje.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '1',
                  title: 'Elige tu Área',
                  description: 'Selecciona lo que quieres aprender: gramática, vocabulario, juegos, o preparación para exámenes. Todo está organizado para que encuentres fácilmente lo que necesitas.',
                },
                {
                  step: '2',
                  title: 'Estudia a Tu Ritmo',
                  description: 'No hay horarios fijos ni presión. Estudia cuando quieras, donde quieras. Cada lección está diseñada para ser completa e independiente.',
                },
                {
                  step: '3',
                  title: 'Practica con Juegos',
                  description: 'Refuerza lo que aprendes con nuestros juegos educativos interactivos. Aprende divirtiéndote y mejora tu español de forma efectiva.',
                },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics and Benefits Section */}
        <section className="container mx-auto px-4 py-16 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Estadísticas y Beneficios
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { number: '1000+', label: 'Palabras de Vocabulario' },
                { number: '140+', label: 'Ejercicios de Gramática' },
                { number: '12', label: 'Unidades de Gramática' },
                { number: '100%', label: 'Gratis Siempre' },
              ].map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                  <div className="text-gray-700">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Beneficios de Aprender con Espanol Hub
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  'Acceso inmediato sin registro',
                  'Contenido actualizado regularmente',
                  'Diseñado para todos los niveles',
                  'Optimizado para móviles',
                  'Sin anuncios molestos',
                  'Recursos de alta calidad',
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="container mx-auto px-4 py-16 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              ¿Por Qué Elegir Espanol Hub?
            </h2>
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-4 px-4 font-bold text-gray-900">Característica</th>
                      <th className="text-center py-4 px-4 font-bold text-blue-600">Espanol Hub</th>
                      <th className="text-center py-4 px-4 font-bold text-gray-600">Otras Plataformas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { feature: 'Precio', espanolHub: '100% Gratis', otras: 'Suscripción mensual' },
                      { feature: 'Registro', espanolHub: 'No requerido', otras: 'Obligatorio' },
                      { feature: 'Anuncios', espanolHub: 'Sin anuncios', otras: 'Con anuncios' },
                      { feature: 'Contenido Completo', espanolHub: 'Acceso total', otras: 'Limitado en versión gratis' },
                      { feature: 'Preparación Exámenes', espanolHub: 'CCSE y DGT incluidos', otras: 'Requiere pago adicional' },
                    ].map((row, index) => (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="py-4 px-4 font-semibold text-gray-900">{row.feature}</td>
                        <td className="py-4 px-4 text-center text-green-600 font-semibold">{row.espanolHub}</td>
                        <td className="py-4 px-4 text-center text-gray-600">{row.otras}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-center text-gray-600 mt-6">
              Comparado con otras plataformas, Espanol Hub ofrece más valor sin costo alguno.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-4 py-16 bg-gray-50">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Preguntas Frecuentes
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¿Listo para Aprender Español GRATIS?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Empieza ahora. No necesitas registrarte. Todo está disponible de inmediato.
            </p>
            <Link
              href="/juegos"
              className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              Empieza a Aprender Ahora
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
