import type { Metadata } from 'next';
import { HelpCircle, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes (FAQ) - Espanol Hub',
  description: 'Preguntas frecuentes sobre Espanol Hub. Encuentra respuestas a las dudas más comunes sobre nuestro sitio educativo.',
  openGraph: {
    title: 'Preguntas Frecuentes (FAQ) - Espanol Hub',
    description: 'Preguntas frecuentes sobre Espanol Hub. Encuentra respuestas a las dudas más comunes sobre nuestro sitio educativo.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Preguntas Frecuentes (FAQ) - Espanol Hub',
    description: 'Preguntas frecuentes sobre Espanol Hub. Encuentra respuestas a las dudas más comunes sobre nuestro sitio educativo.',
  },
};

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: '¿Es gratuito usar Espanol Hub?',
    answer: 'Sí, la mayoría del contenido en Espanol Hub es completamente gratuito. Ofrecemos lecciones, ejercicios, juegos, vocabulario y más sin costo alguno. Algunos recursos premium pueden requerir pago, pero todo el contenido educativo principal está disponible de forma gratuita.',
  },
  {
    question: '¿Necesito crear una cuenta para usar el sitio?',
    answer: 'No es necesario crear una cuenta para acceder a la mayoría del contenido. Puedes comenzar a aprender inmediatamente. Sin embargo, crear una cuenta te permite guardar tu progreso, ganar XP, desbloquear logros y acceder a características adicionales como el sistema de flashcards y el seguimiento de tu progreso.',
  },
  {
    question: '¿Qué niveles de español cubre el sitio?',
    answer: 'Espanol Hub cubre todos los niveles, desde principiante (A1) hasta avanzado (C1). Nuestro contenido está organizado por niveles y puedes filtrar las lecciones, ejercicios y vocabulario según tu nivel actual. También ofrecemos preparación específica para exámenes como CCSE y DELE A2.',
  },
  {
    question: '¿Cómo funciona el sistema de XP y niveles?',
    answer: 'El sistema de gamificación te permite ganar XP (puntos de experiencia) completando lecciones, ejercicios y juegos. A medida que ganas XP, subes de nivel. También puedes completar misiones diarias para obtener XP adicional. El progreso se guarda automáticamente en tu navegador.',
  },
  {
    question: '¿Puedo descargar el contenido para uso offline?',
    answer: 'Actualmente, el sitio funciona principalmente en línea. Sin embargo, ofrecemos algunos recursos descargables como guías PDF y materiales imprimibles. El progreso y las estadísticas se guardan localmente en tu navegador, por lo que puedes acceder a ellos sin conexión una vez cargados.',
  },
  {
    question: '¿Hay aplicaciones móviles disponibles?',
    answer: 'El sitio web es completamente responsive y funciona perfectamente en dispositivos móviles, tabletas y computadoras de escritorio. Puedes acceder al sitio desde cualquier navegador en tu dispositivo móvil sin necesidad de instalar una aplicación. El diseño está optimizado para pantallas pequeñas.',
  },
  {
    question: '¿Cómo puedo reportar un error o sugerir mejoras?',
    answer: 'Puedes contactarnos a través de nuestra página de contacto (/contact) o enviarnos un correo electrónico. Valoramos tus comentarios y sugerencias para mejorar continuamente la plataforma.',
  },
  {
    question: '¿El sitio es adecuado para niños?',
    answer: 'Sí, el contenido está diseñado para ser educativo y apropiado para todas las edades. Las lecciones y ejercicios son adecuados tanto para niños como para adultos que están aprendiendo español. El diseño es limpio y fácil de usar para usuarios de todas las edades.',
  },
  {
    question: '¿Ofrecen certificados de finalización?',
    answer: 'Actualmente, el sitio rastrea tu progreso y logros a través del sistema de gamificación. Aunque no emitimos certificados oficiales, puedes ver tus logros y progreso en tu perfil. Estamos trabajando en agregar más características de certificación en el futuro.',
  },
  {
    question: '¿Cómo funciona el sistema de flashcards?',
    answer: 'El sistema de flashcards utiliza el algoritmo SM-2 de repetición espaciada para ayudarte a memorizar vocabulario de manera eficiente. Las tarjetas se programan automáticamente para revisión basándose en qué tan bien las recuerdas. Puedes crear tus propias barajas o usar las predefinidas.',
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <HelpCircle className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Preguntas Frecuentes
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Encuentra respuestas a las preguntas más comunes sobre Espanol Hub
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow"
            >
              <summary className="flex items-center justify-between cursor-pointer">
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                    {faq.question}
                  </h3>
                </div>
                <ChevronDown className="w-5 h-5 text-gray-400 ml-4 flex-shrink-0 transform transition-transform group-open:rotate-180" />
              </summary>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-gray-700 leading-relaxed mb-3">
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Contáctanos y estaremos encantados de ayudarte
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg"
          >
            Contactar
          </Link>
        </div>
      </div>
    </div>
  );
}
