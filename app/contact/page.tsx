'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, MessageSquare, Send, CheckCircle, AlertCircle, Sparkles, Clock, HelpCircle, Lightbulb, Shield, Zap } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Enhanced Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full mb-6">
            <MessageSquare className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-semibold text-purple-600">Estamos Aquí para Ayudarte</span>
            <Sparkles className="w-4 h-4 text-purple-600" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Contáctanos
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-4">
            ¿Tienes preguntas, sugerencias o comentarios?
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nos encantaría escucharte y ayudarte en lo que necesites
          </p>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 border border-blue-100">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121L7.772 13.32l-2.98-.93c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Telegram Directo</h3>
            <p className="text-gray-600 text-sm mb-3">Respuesta inmediata</p>
            <a 
              href="https://t.me/esconabdou" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700"
            >
              @esconabdou
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 border border-purple-100">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Formulario Web</h3>
            <p className="text-gray-600 text-sm">Para consultas detalladas</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center mb-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 mr-4">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121L7.772 13.32l-2.98-.93c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Telegram</h3>
                  <a 
                    href="https://t.me/esconabdou" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-blue-100 text-sm hover:text-white transition-colors flex items-center gap-1 mt-1"
                  >
                    @esconabdou
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
              <p className="text-blue-100 text-sm">
                Respuesta rápida y directa por Telegram
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl shadow-lg p-6 border border-purple-100">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-purple-600" />
                Temas Comunes
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Problemas técnicos</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Sugerencias de contenido</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Colaboraciones</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Preguntas sobre cursos</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Reportar errores</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white rounded-xl shadow-lg p-6 border border-green-100">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-green-600" />
                Consejo
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                💬 <strong>Telegram</strong>: Respuesta más rápida y directa
              </p>
              <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                📝 <strong>Formulario</strong>: Para consultas detalladas
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-2">
                  <Send className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Envíanos un Mensaje</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="Tu nombre completo"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Asunto *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
                  >
                    <option value="">Selecciona un asunto</option>
                    <option value="question">Pregunta general</option>
                    <option value="technical">Problema técnico</option>
                    <option value="suggestion">Sugerencia</option>
                    <option value="collaboration">Colaboración</option>
                    <option value="other">Otro</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-300 rounded-xl p-5 flex items-center shadow-md">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-green-800 font-semibold">¡Mensaje enviado con éxito!</p>
                      <p className="text-green-700 text-sm">Te responderemos lo antes posible.</p>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-300 rounded-xl p-5 flex items-center shadow-md">
                    <AlertCircle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-red-800 font-semibold">Error al enviar el mensaje</p>
                      <p className="text-red-700 text-sm">Por favor, intenta de nuevo.</p>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Enviar Mensaje
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Trust Signals */}
            <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-center gap-4 justify-center flex-wrap text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span>Datos Protegidos</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Respuesta Garantizada</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-600" />
                  <span>24-48 horas</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Preguntas Frecuentes</h2>
            <p className="text-gray-600">Quizás encuentres la respuesta aquí</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-100">
              <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                ¿Cuánto tiempo tardan en responder?
              </h3>
              <p className="text-gray-600 text-sm">Normalmente respondemos en 24-48 horas hábiles. Para consultas urgentes, márcalo en el asunto.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border border-purple-100">
              <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-purple-600" />
                ¿Puedo enviar archivos adjuntos?
              </h3>
              <p className="text-gray-600 text-sm">Por ahora no, pero puedes describir tu problema detalladamente y te ayudaremos a resolverlo.</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 border border-green-100">
              <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-green-600" />
                ¿Ofrecen soporte en español y árabe?
              </h3>
              <p className="text-gray-600 text-sm">¡Sí! Nuestro equipo habla español y árabe. Escribe en el idioma que prefieras.</p>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                ¿Cómo reporto un error técnico?
              </h3>
              <p className="text-gray-600 text-sm">Selecciona "Problema técnico" en el formulario y describe el error con detalles.</p>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-12 text-center space-x-4">
          <Link href="/about" className="text-blue-600 hover:underline">
            Sobre Nosotros
          </Link>
          <span className="text-gray-400">•</span>
          <Link href="/privacy" className="text-blue-600 hover:underline">
            Política de Privacidad
          </Link>
          <span className="text-gray-400">•</span>
          <Link href="/terms" className="text-blue-600 hover:underline">
            Términos de Servicio
          </Link>
        </div>
      </div>
    </div>
  );
}
