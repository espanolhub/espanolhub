'use client';

import React, { useState } from 'react';
import SubscriptionButton from '@/components/SubscriptionButton';
import Link from 'next/link';
import { 
  CheckCircle, X, Star, Shield, Trophy, Zap, 
  Users, BookOpen, Award, Target, Sparkles,
  ChevronDown, ChevronUp, Clock, Globe
} from 'lucide-react';
import { Cairo } from 'next/font/google';

const cairo = Cairo({
  variable: '--font-cairo',
  subsets: ['arabic', 'latin'],
  weight: ['400', '600', '700'],
});

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  
  // PAYMENT SYSTEM - Change to false to enable payments
  // نظام الدفع - غيّر إلى false لتفعيل الدفعات
  // Para activar pagos, cambia a false
  const PAYMENT_DISABLED = true;

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

	const faqs = [
		{
			question: '¿Puedo cancelar en cualquier momento?',
			answer: 'Sí, puedes cancelar tu suscripción en cualquier momento desde tu panel de control. No hay compromisos a largo plazo.'
		},
		{
			question: '¿Qué métodos de pago aceptan?',
			answer: 'Aceptamos tarjetas de crédito/débito, PayPal y transferencias bancarias a través de nuestra plataforma segura.'
		},
		{
			question: '¿Hay garantía de devolución?',
			answer: 'Ofrecemos una garantía de 7 días. Si no estás satisfecho, te devolvemos el 100% de tu dinero.'
		},
		{
			question: '¿El contenido se actualiza?',
			answer: 'Sí, actualizamos el contenido regularmente para reflejar los últimos cambios en exámenes oficiales y regulaciones.'
		},
		{
			question: '¿Puedo acceder desde varios dispositivos?',
			answer: 'Sí, puedes acceder desde cualquier dispositivo (PC, tablet, móvil) con tu cuenta.'
		}
	];

	const testimonials = [
		{
			name: 'Ahmed M.',
			text: 'Aprobé mi examen de conducir en el primer intento gracias a los simuladores. ¡100% recomendado!',
			rating: 5,
			course: 'Carnet de Conducir'
		},
		{
			name: 'Sara K.',
			text: 'El contenido del CCSE es excelente. Conseguí mi nacionalidad española sin problemas.',
			rating: 5,
			course: 'Nacionalidad CCSE'
		},
		{
			name: 'Mohammed R.',
			text: 'La mejor inversión para aprender español. El material es muy completo y fácil de entender.',
			rating: 5,
			course: 'Cursos Español'
		}
	];

  const proFeatures = [
    { text: 'Acceso completo a todos los cursos', icon: BookOpen },
    { text: 'Simuladores oficiales DGT y CCSE', icon: Target },
    { text: '150+ lecciones completas', icon: Award },
    { text: 'Material descargable en PDF', icon: BookOpen },
    { text: 'Soporte prioritario 24/7', icon: Users },
    { text: 'Actualizaciones constantes 2026', icon: Zap },
    { text: 'Sin publicidad', icon: Shield },
    { text: 'Certificados de finalización', icon: Trophy },
    { text: 'Acceso desde cualquier dispositivo', icon: Globe },
    { text: 'Contenido bilingüe (ES/AR)', icon: Globe }
  ];

  const freeFeatures = [
    { text: 'Acceso limitado a lecciones básicas', available: true },
    { text: 'Simuladores oficiales', available: false },
    { text: 'Material descargable', available: false },
    { text: 'Soporte prioritario', available: false },
    { text: 'Sin anuncios', available: false },
    { text: 'Certificados', available: false }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 ${cairo.variable}`}>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* PAYMENT DISABLED BANNER */}
          {PAYMENT_DISABLED && (
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6 mb-8 text-center">
              <h3 className="text-xl font-bold text-yellow-800 mb-2">🚧 Próximamente / قريباً</h3>
              <p className="text-yellow-700">El sistema de pagos estará disponible pronto. Mientras tanto, disfruta de todo el contenido gratuito.</p>
              <p className="text-yellow-600 mt-2" dir="rtl" style={{ fontFamily: 'var(--font-cairo)' }}>نظام الدفع سيكون متاحاً قريباً. في هذه الأثناء، استمتع بكل المحتوى المجاني.</p>
            </div>
          )}
          
          <div className="text-center mb-12">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-semibold text-purple-900">Oferta Especial - Precio de Lanzamiento</span>
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            </div>

			<h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
				Invierte en tu futuro en España
			</h1>
			<p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
				Accede a todo el contenido premium: simuladores oficiales, 150+ lecciones, material descargable y soporte prioritario.
			</p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border-2 border-gray-200'
                }`}
              >
                Mensual
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`relative px-6 py-3 rounded-xl font-semibold transition-all ${
                  billingCycle === 'annual'
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border-2 border-gray-200'
                }`}
              >
                Anual
                <span className="absolute -top-2 -right-2 px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                  -20%
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-200">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Gratis</h3>
                <p className="text-gray-600 text-sm mb-4">Para empezar</p>
                <div className="text-5xl font-extrabold text-gray-800 mb-2">€0</div>
                <div className="text-sm text-gray-500">Por siempre</div>
              </div>

              <ul className="space-y-3 mb-8">
                {freeFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    {feature.available ? (
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    ) : (
                      <X className="w-5 h-5 text-gray-300 flex-shrink-0" />
                    )}
                    <span className={feature.available ? 'text-gray-700' : 'text-gray-400'}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/"
                className="block w-full px-6 py-3 bg-gray-100 text-gray-800 rounded-xl font-semibold text-center hover:bg-gray-200 transition-colors"
              >
                Empezar Gratis
              </Link>
            </div>

            {/* Pro Plan - Highlighted */}
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-8 shadow-2xl transform scale-105 relative border-4 border-yellow-400">
              {/* Popular Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-yellow-400 text-gray-900 rounded-full font-bold text-sm shadow-lg">
                ⭐ MÁS POPULAR ⭐
              </div>

              <div className="text-center mb-6 text-white">
                <h3 className="text-2xl font-bold mb-2">PRO</h3>
                <p className="text-purple-100 text-sm mb-4">Todo incluido</p>
                <div className="text-5xl font-extrabold mb-2">
                  €{billingCycle === 'monthly' ? '9.99' : '7.99'}
                </div>
                <div className="text-sm text-purple-200">
                  Por mes {billingCycle === 'annual' && '(€95.88/año)'}
                </div>
                {billingCycle === 'annual' && (
                  <div className="mt-2 text-sm text-yellow-300 font-semibold">
                    ¡Ahorra €23.88 al año!
                  </div>
                )}
              </div>

              <ul className="space-y-3 mb-8 text-white">
                {proFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
                    <span className="text-purple-50">{feature.text}</span>
                  </li>
                ))}
              </ul>

              <SubscriptionButton disabled={PAYMENT_DISABLED} />

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-purple-200">
                <Shield className="w-4 h-4" />
                <span>Pago 100% seguro • Cancela cuando quieras</span>
              </div>
            </div>

            {/* Enterprise/Group Plan */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-purple-200">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Empresas</h3>
                <p className="text-gray-600 text-sm mb-4">Para equipos</p>
                <div className="text-5xl font-extrabold text-gray-800 mb-2">€€</div>
                <div className="text-sm text-gray-500">Precio personalizado</div>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-500" />
                  <span className="text-gray-700">Todo de PRO incluido</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-500" />
                  <span className="text-gray-700">Licencias múltiples</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-500" />
                  <span className="text-gray-700">Dashboard de administrador</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-500" />
                  <span className="text-gray-700">Soporte dedicado</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-500" />
                  <span className="text-gray-700">Reportes de progreso</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-500" />
                  <span className="text-gray-700">Facturación anual</span>
                </li>
              </ul>

              <Link
                href="/contact"
                className="block w-full px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold text-center hover:bg-purple-700 transition-colors"
              >
                Contactar Ventas
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-extrabold mb-2">2K+</div>
              <div className="text-purple-200">Estudiantes activos</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-extrabold mb-2">98%</div>
              <div className="text-purple-200">Tasa de aprobación</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-extrabold mb-2">150+</div>
              <div className="text-purple-200">Lecciones premium</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-extrabold mb-2">4.9/5</div>
              <div className="text-purple-200">Valoración media</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
		<div className="max-w-7xl mx-auto px-6">
			<div className="text-center mb-12">
				<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
					Lo que dicen nuestros estudiantes
				</h2>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				{testimonials.map((testimonial, idx) => (
					<div key={idx} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
						<div className="flex items-center gap-1 mb-4">
							{[...Array(testimonial.rating)].map((_, i) => (
								<Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
							))}
						</div>
						<p className="text-gray-700 mb-6">{testimonial.text}</p>
						<div className="border-t pt-4">
							<div className="font-semibold text-gray-900">{testimonial.name}</div>
							<div className="text-sm text-purple-600">{testimonial.course}</div>
						</div>
					</div>
				))}
			</div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
		<div className="max-w-4xl mx-auto px-6">
			<div className="text-center mb-12">
				<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
					Preguntas Frecuentes
				</h2>
			</div>

			<div className="space-y-4">
				{faqs.map((faq, idx) => (
					<div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden">
						<button
							onClick={() => toggleFaq(idx)}
							className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
						>
							<h3 className="text-lg font-semibold text-gray-900 text-left">{faq.question}</h3>
							{openFaq === idx ? (
								<ChevronUp className="w-5 h-5 text-purple-600 flex-shrink-0" />
							) : (
								<ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
							)}
						</button>
						{openFaq === idx && (
							<div className="px-6 pb-5 border-t border-gray-100">
								<p className="text-gray-700 mt-4">{faq.answer}</p>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
      </section>

      {/* Final CTA */}
      <section className="py-16">
		<div className="max-w-4xl mx-auto px-6">
			<div className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl">
				<h2 className="text-3xl md:text-4xl font-bold mb-8">
					¿Listo para comenzar?
				</h2>
				<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
					<SubscriptionButton disabled={PAYMENT_DISABLED} />
					<Link
						href="/"
						className="px-8 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
					>
						Explorar Gratis
					</Link>
				</div>
				<p className="mt-6 text-sm text-purple-200">
					🛡️ Garantía de 7 días • ❌ Cancela cuando quieras • 🔒 100% Seguro
				</p>
			</div>
		</div>
      </section>
    </div>
  );
}
