'use client';

import { useState, useEffect } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Users, Target, Award, Globe, Heart, Sparkles, TrendingUp, CheckCircle, Star, Rocket, Zap, Shield, Mail } from 'lucide-react';

export default function AboutPage() {
  const [counters, setCounters] = useState({ students: 0, lessons: 0, success: 0 });

  // Animated counters
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = duration / steps;

    const targets = { students: 2000, lessons: 150, success: 98 };
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setCounters({
        students: Math.floor((targets.students / steps) * step),
        lessons: Math.floor((targets.lessons / steps) * step),
        success: Math.floor((targets.success / steps) * step),
      });

      if (step >= steps) clearInterval(timer);
    }, increment);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Enhanced Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-semibold text-purple-600">Plataforma Educativa #1</span>
            <Star className="w-4 h-4 text-purple-600" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Sobre Nosotros
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-4">
            La plataforma educativa más completa para dominar el español
          </p>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Creada para ayudarte a aprender español de forma efectiva, interactiva y divertida
          </p>
        </div>

        {/* Animated Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center transform hover:scale-105 transition-all duration-300 border border-blue-100">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              {counters.students.toLocaleString()}+
            </div>
            <div className="text-gray-600 font-medium">Estudiantes Activos</div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 text-center transform hover:scale-105 transition-all duration-300 border border-purple-100">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
              {counters.lessons}+
            </div>
            <div className="text-gray-600 font-medium">Lecciones Disponibles</div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 text-center transform hover:scale-105 transition-all duration-300 border border-green-100">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
              {counters.success}%
            </div>
            <div className="text-gray-600 font-medium">Tasa de Éxito</div>
          </div>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Mission */}
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-xl p-8 md:p-10 border border-blue-100 hover:shadow-2xl transition-all duration-300">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl w-14 h-14 flex items-center justify-center mb-6 shadow-lg">
              <Target className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Nuestra Misión</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Proporcionar una plataforma educativa completa y accesible para aprender español, desde los conceptos básicos hasta niveles avanzados.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">Aprendizaje divertido e interactivo</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">Adaptado a diferentes estilos</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">Contenido de alta calidad</span>
              </li>
            </ul>
          </div>

          {/* Vision */}
          <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl shadow-xl p-8 md:p-10 border border-purple-100 hover:shadow-2xl transition-all duration-300">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl w-14 h-14 flex items-center justify-center mb-6 shadow-lg">
              <Globe className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Nuestra Visión</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Ser la plataforma líder en educación del idioma español, reconocida por la calidad de nuestros contenidos y el éxito de nuestros estudiantes.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">Innovación constante</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">Ayudar a millones de estudiantes</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">Abrir nuevas oportunidades</span>
              </li>
            </ul>
          </div>
        </div>

        {/* What We Offer */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-16 border border-gray-100">
          <div className="flex items-center justify-center gap-3 mb-8">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Lo que Ofrecemos</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 rounded-lg p-2">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Contenido Completo</h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span>Alfabeto y pronunciación</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span>Números y conteo</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span>Gramática y conjugación</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span>Vocabulario por categorías</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span>Lectura y comprensión</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span>Textos y diálogos</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border border-purple-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-100 rounded-lg p-2">
                  <Zap className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Herramientas Interactivas</h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0" />
                  <span>Juegos educativos</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0" />
                  <span>Ejercicios interactivos</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0" />
                  <span>Sistema de progreso</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0" />
                  <span>Preparación CCSE y DELE A2</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0" />
                  <span>Recursos descargables</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0" />
                  <span>Audio y pronunciación</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl p-8 md:p-12 mb-16 border border-gray-100">
          <div className="flex items-center justify-center gap-3 mb-10">
            <Heart className="w-8 h-8 text-red-500" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Nuestros Valores</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 text-center">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Accesibilidad</h3>
              <p className="text-gray-600 leading-relaxed">
                La educación debe ser accesible para todos, independientemente de su ubicación o recursos.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100 text-center">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Calidad</h3>
              <p className="text-gray-600 leading-relaxed">
                Contenido educativo de la más alta calidad, revisado y actualizado regularmente.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 text-center">
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Innovación</h3>
              <p className="text-gray-600 leading-relaxed">
                Últimas tecnologías y metodologías para crear experiencias de aprendizaje efectivas.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-16 border border-gray-100">
          <div className="flex items-center justify-center gap-3 mb-10">
            <Rocket className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Nuestro Recorrido</h2>
          </div>
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-white font-bold">1</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">2024 - Lanzamiento</h3>
                <p className="text-gray-600">Inicio de la plataforma con contenido fundamental de español: alfabeto, números, gramática básica y vocabulario esencial.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-white font-bold">2</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">2025 - Expansión</h3>
                <p className="text-gray-600">Adición de cursos especializados: Carnet de Conducir, CCSE para Nacionalidad Española, y guías de trámites oficiales.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-white font-bold">3</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">2026 - Actualidad</h3>
                <p className="text-gray-600">Más de 2000 estudiantes activos, 150+ lecciones, juegos interactivos, sistema de progreso, y contenido constantemente actualizado.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-2xl shadow-2xl p-8 md:p-12 text-center text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-semibold">100% Gratuito</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Listo para Empezar?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Únete a miles de estudiantes que están dominando el español con nosotros
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Link
                href="/"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Explorar Contenido
              </Link>
              <Link
                href="/contact"
                className="bg-blue-800/50 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-800 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Contáctanos
              </Link>
            </div>
            
            <div className="flex items-center justify-center gap-6 text-sm opacity-80">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Sin registro requerido</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Acceso inmediato</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center space-x-4">
          <Link href="/privacy" className="text-blue-600 hover:underline">
            Política de Privacidad
          </Link>
          <span className="text-gray-400">•</span>
          <Link href="/terms" className="text-blue-600 hover:underline">
            Términos de Servicio
          </Link>
          <span className="text-gray-400">•</span>
          <Link href="/contact" className="text-blue-600 hover:underline">
            Contacto
          </Link>
        </div>
      </div>
    </div>
  );
}
