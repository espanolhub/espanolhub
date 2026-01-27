'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Car, Award, FileText, Users, Shield, 
  BookOpen, Globe, Gamepad2, PlayCircle,
  Sparkles, Trophy, Target, Zap, Star,
  CheckCircle, ArrowRight, GraduationCap, Lock, Clock,
  Gift, Book, Languages, Hash, Volume2, Wrench, MessageSquare, FileCheck
} from 'lucide-react';
import { useModuleAccess } from '@/components/useModuleAccess';
import { useAdminSettings } from '@/components/AdminSettingsProvider';
import SubscriptionButton from '@/components/SubscriptionButton';
import PracticeCTA from '@/components/StickyPlayCTA';

export default function Home() {
	const { settings } = useAdminSettings();
	const driving = useModuleAccess('driving');
	const nationality = useModuleAccess('nationality');
	const tramites = useModuleAccess('tramites');
	const [saleEndsAt, setSaleEndsAt] = useState<number | null>(null);
	const [timeLeft, setTimeLeft] = useState<number>(0);

	useEffect(() => {
		// If admin enabled sale, create or read a persistent deadline (demo: 48h)
		try {
			if (settings.is_sale_active) {
				const key = 'cta_sale_deadline_v1';
				let stored = sessionStorage.getItem(key);
				if (!stored) {
					const deadline = Date.now() + 48 * 3600 * 1000; // 48 hours demo
					sessionStorage.setItem(key, String(deadline));
					stored = String(deadline);
				}
				const deadlineNum = Number(stored);
				setSaleEndsAt(deadlineNum);
			} else {
				setSaleEndsAt(null);
			}
		} catch (e) {
			// ignore
		}
	}, [settings.is_sale_active]);

	useEffect(() => {
		if (!saleEndsAt) {
			setTimeLeft(0);
			return;
		}
		const update = () => {
			const diff = Math.max(0, saleEndsAt - Date.now());
			setTimeLeft(diff);
		};
		update();
		const iv = window.setInterval(update, 1000);
		return () => window.clearInterval(iv);
	}, [saleEndsAt]);

	const formatTimeLeft = (ms: number) => {
		if (ms <= 0) return '00d 00h 00m';
		const totalSec = Math.floor(ms / 1000);
		const days = Math.floor(totalSec / 86400);
		const hours = Math.floor((totalSec % 86400) / 3600);
		const mins = Math.floor((totalSec % 3600) / 60);
		return `${String(days).padStart(2,'0')}d ${String(hours).padStart(2,'0')}h ${String(mins).padStart(2,'0')}m`;
	};

	return (
		<div className="min-h-screen bg-white text-slate-900">
		<a href="#main-content" className="skip-link absolute left-2 top-16 z-50 -translate-y-12 focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-yellow-300 rounded px-3 py-2 bg-white text-sm">
			Ir al contenido
		</a>
		{/* Hero */}
		<header className="relative overflow-hidden bg-white border-b border-gray-200">
			<div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
				<div className="bg-white border border-gray-200 rounded-lg p-8 md:p-12">
					<div className="flex flex-col md:flex-row items-center gap-12">
						<div className="flex-1 text-center md:text-left">
							{/* Badge */}
							<div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-6 border border-gray-200">
								<Sparkles className="w-5 h-5 text-gray-700" aria-hidden="true" />
								<span className="text-sm font-semibold text-gray-900">Plataforma Educativa #1</span>
								<Star className="w-5 h-5 text-gray-700" aria-hidden="true" />
							</div>

					<h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-gray-900">
						Tu futuro en España comienza aquí
					</h1>
					<p className="text-lg mb-8 text-gray-700 max-w-2xl mx-auto md:mx-0">
						Aprende español, aprueba tus exámenes oficiales y gestiona tus trámites en una sola plataforma integral.
					</p>

							{/* Main CTA Buttons */}
							<div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center md:justify-start">
								<Link
									href="/cursos"
									className="group relative px-8 py-4 bg-gray-900 text-white font-bold rounded-lg shadow-sm hover:bg-gray-800 transition-all duration-200 flex items-center justify-center gap-2"
								>
									<GraduationCap className="w-5 h-5 text-white" aria-hidden="true" />
									<span>Ver Cursos</span>
									<ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" aria-hidden="true" />
								</Link>

								<Link
									href="/juegos"
									className="px-8 py-4 bg-white border-2 border-gray-900 text-gray-900 font-bold rounded-lg shadow-sm hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2"
								>
									<Gamepad2 className="w-5 h-5 text-gray-900" aria-hidden="true" />
									<span>Jugar Ahora</span>
								</Link>
							</div>

							{/* Quick Access Buttons */}
							<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
							<Link
								href="/aprender-espanol-gratis"
								className="group relative p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all"
							>
								<div className="absolute top-1 right-1">
									<Gift className="w-5 h-5 text-gray-700" aria-hidden="true" />
								</div>
								<Star className="w-6 h-6 text-gray-700 mb-2 mx-auto" aria-hidden="true" />
								<div className="text-xs font-bold text-gray-900 text-center">GRATIS</div>
							</Link>

							<Link
								href="/driving-license"
								className="group p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all"
							>
								<Car className="w-6 h-6 text-gray-700 mb-2 mx-auto" aria-hidden="true" />
								<div className="text-sm font-semibold text-gray-900 text-center">Carnet de Conducir</div>
							</Link>

							<Link
								href="/nacionalidad"
								className="group p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all"
							>
								<Award className="w-6 h-6 text-gray-700 mb-2 mx-auto" aria-hidden="true" />
								<div className="text-sm font-semibold text-gray-900 text-center">CCSE</div>
							</Link>

							<Link
								href="/juegos"
								className="group p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all"
							>
								<Gamepad2 className="w-6 h-6 text-gray-700 mb-2 mx-auto" aria-hidden="true" />
								<div className="text-sm font-semibold text-gray-900 text-center">Juegos</div>
							</Link>

							<Link
								href="/simulator"
								className="group p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all"
							>
								<PlayCircle className="w-6 h-6 text-gray-700 mb-2 mx-auto" aria-hidden="true" />
								<div className="text-sm font-semibold text-gray-900 text-center">Simulador</div>
							</Link>

							<Link
								href="/blog"
								className="group p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all"
							>
								<Book className="w-6 h-6 text-gray-700 mb-2 mx-auto" aria-hidden="true" />
								<div className="text-sm font-semibold text-gray-900 text-center">Blog</div>
							</Link>
							</div>
						</div>

						<div className="w-full md:w-1/3 relative flex items-center justify-center">
							<div className="relative w-56 h-36 md:w-72 md:h-44">
								<div className="absolute inset-0 transform -rotate-6 translate-x-2 translate-y-2 bg-gray-100 rounded-lg shadow-md" style={{ zIndex: 1 }} />
								<div className="absolute inset-0 transform rotate-6 -translate-x-3 -translate-y-3 bg-white border border-gray-200 rounded-lg shadow-md p-4 text-gray-900" style={{ zIndex: 2 }}>
									<div className="flex items-center justify-between mb-3">
										<div className="text-xs font-semibold text-gray-900">ESP</div>
										<div className="text-xs">🇪🇸</div>
									</div>
									<div className="text-sm font-semibold text-gray-900">Licencia B</div>
									<div className="text-xs text-gray-600 mt-4">Nombre: Juan Pérez</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>

			{/* Aprende Español GRATIS Section */}
			<section className="py-16 bg-white border-b border-gray-200">
				<div className="max-w-7xl mx-auto px-6">
					<div className="bg-white rounded-lg p-8 md:p-12 border border-gray-200">
						<div className="flex flex-col md:flex-row items-center gap-8">
							<div className="flex-1 text-center md:text-left">
								<div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-4 border border-gray-200">
									<Gift className="w-5 h-5 text-gray-700" aria-hidden="true" />
									<span className="text-sm font-bold text-gray-900">100% GRATIS</span>
								</div>
								<h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
									Aprende Español <span className="text-gray-900">GRATIS</span>
								</h2>
								<p className="text-lg text-gray-700 mb-6 max-w-2xl">
									Accede a todo nuestro contenido educativo sin costo. Gramática, vocabulario, juegos interactivos y más. Sin registro, sin tarjeta de crédito.
								</p>
								<Link
									href="/aprender-espanol-gratis"
									className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-bold rounded-lg shadow-sm hover:bg-gray-800 transition-all"
								>
									<Star className="w-5 h-5 text-white" aria-hidden="true" />
									<span>Empieza Ahora - GRATIS</span>
									<ArrowRight className="w-5 h-5 text-white" aria-hidden="true" />
								</Link>
							</div>
							<div className="flex-shrink-0">
								<div className="w-32 h-32 md:w-40 md:h-40 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200">
									<Gift className="w-16 h-16 md:w-20 md:h-20 text-gray-700" aria-hidden="true" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Main Features - Three Pillars */}
			<section id="main-content" className="py-16 bg-white">
				<div className="max-w-7xl mx-auto px-6">
					{/* Section Header */}
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-3">
						<Zap className="w-8 h-8 text-gray-700" aria-hidden="true" />
						Nuestros Programas Principales
					</h2>
				</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<ModernCard 
						icon={<Car className="w-8 h-8 text-white" aria-hidden="true" />}
						gradient="from-orange-500 via-red-500 to-pink-500"
						title="Carnet de Conducir"
						description="18 capítulos completos + Simulador oficial DGT"
						features={['18 Lecciones completas', 'Simulador DGT oficial', 'Contenido interactivo', '100% actualizado 2026']}
						href="/driving-license"
						locked={!driving.hasAccess}
					/>
					
					<ModernCard 
						icon={<Award className="w-8 h-8 text-white" aria-hidden="true" />}
						gradient="from-blue-500 via-purple-500 to-pink-500"
						title="Nacionalidad Española"
						description="Preparación completa para el examen CCSE oficial"
						features={['40+ Lecciones CCSE', 'Exámenes oficiales', 'Guías prácticas', 'Material completo']}
						href="/nacionalidad"
						locked={!nationality.hasAccess}
						badge="Popular"
					/>
					
					<ModernCard 
						icon={<FileText className="w-8 h-8" />}
						gradient="from-green-500 via-emerald-500 to-teal-500"
						title="Guías de Trámites"
						description="Documentos, checklists y guías paso a paso"
						features={['Guías completas', 'Checklists detallados', 'Documentación necesaria', 'Instrucciones claras']}
						href="/tramites"
						locked={!tramites.hasAccess}
					/>
					</div>
				</div>
			</section>

			{/* Practice Section */}
			<section className="py-16 bg-white border-b border-gray-200">
				<div className="max-w-7xl mx-auto px-6">
					<div className="text-center mb-8">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
							<Gamepad2 className="w-8 h-8 text-gray-700" aria-hidden="true" />
							<span>Aprende Practicando</span>
						</h2>
						<p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6">
							Pon en práctica lo que has aprendido con juegos educativos interactivos
						</p>
						<div className="flex justify-center">
							<PracticeCTA />
						</div>
					</div>
				</div>
			</section>

			{/* Recursos Adicionales Section */}
			<section className="py-16 bg-white">
				<div className="max-w-7xl mx-auto px-6">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-3">
							<BookOpen className="w-8 h-8 text-gray-700" aria-hidden="true" />
							<span>Recursos Adicionales</span>
						</h2>
						<p className="text-lg text-gray-700 max-w-2xl mx-auto">
							Explora nuestros recursos educativos completos para aprender español de forma efectiva
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						<Link
							href="/alfabeto"
							className="group bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-all"
						>
							<div className="flex items-center gap-4 mb-4">
								<div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white">
									<Hash className="w-6 h-6" />
								</div>
								<h3 className="text-xl font-bold text-gray-900">
									Alfabeto Español
								</h3>
							</div>
							<p className="text-gray-700 mb-4">
								Aprende las 27 letras del alfabeto español con audio de nativos. Pronunciación perfecta desde el inicio.
							</p>
							<div className="flex items-center text-blue-500 font-semibold">
								<span>Comenzar</span>
								<ArrowRight className="w-4 h-4 ml-2" />
							</div>
						</Link>

						<Link
							href="/numeros"
							className="group bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-all"
						>
							<div className="flex items-center gap-4 mb-4">
								<div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white">
									<Hash className="w-6 h-6" />
								</div>
								<h3 className="text-xl font-bold text-gray-900">
									Números en Español
								</h3>
							</div>
							<p className="text-gray-700 mb-4">
								Domina los números del 0 al 1000. Audio, pronunciación y ejercicios interactivos.
							</p>
							<div className="flex items-center text-green-500 font-semibold">
								<span>Practicar</span>
								<ArrowRight className="w-4 h-4 ml-2" />
							</div>
						</Link>

						<Link
							href="/conjugador-verbos"
							className="group bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-all"
						>
							<div className="flex items-center gap-4 mb-4">
								<div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center text-white">
									<Wrench className="w-6 h-6" />
								</div>
								<h3 className="text-xl font-bold text-gray-900">
									Conjugador de Verbos
								</h3>
							</div>
							<p className="text-gray-700 mb-4">
								Conjuga cualquier verbo español en todos los tiempos. Más de 12,000 verbos disponibles.
							</p>
							<div className="flex items-center text-purple-500 font-semibold">
								<span>Conjugar</span>
								<ArrowRight className="w-4 h-4 ml-2" />
							</div>
						</Link>

						<Link
							href="/pronunciacion-espanol-guia"
							className="group bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-all"
						>
							<div className="flex items-center gap-4 mb-4">
								<div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center text-white">
									<Volume2 className="w-6 h-6" />
								</div>
								<h3 className="text-xl font-bold text-gray-900">
									Guía de Pronunciación
								</h3>
							</div>
							<p className="text-gray-700 mb-4">
								Mejora tu pronunciación con nuestra guía completa. Audio de nativos y técnicas probadas.
							</p>
							<div className="flex items-center text-orange-500 font-semibold">
								<span>Aprender</span>
								<ArrowRight className="w-4 h-4 ml-2" />
							</div>
						</Link>

						<Link
							href="/curso-espanol-principiantes"
							className="group bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-all"
						>
							<div className="flex items-center gap-4 mb-4">
								<div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center text-white">
									<GraduationCap className="w-6 h-6" />
								</div>
								<h3 className="text-xl font-bold text-gray-900">
									Curso para Principiantes
								</h3>
							</div>
							<p className="text-gray-700 mb-4">
								Curso completo A1. Gramática, vocabulario y pronunciación desde cero. 100% gratis.
							</p>
							<div className="flex items-center text-red-500 font-semibold">
								<span>Iniciar Curso</span>
								<ArrowRight className="w-4 h-4 ml-2" />
							</div>
						</Link>

						<Link
							href="/espanol-para-arabes"
							className="group bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-all"
						>
							<div className="flex items-center gap-4 mb-4">
								<div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center text-white">
									<Globe className="w-6 h-6" />
								</div>
								<h3 className="text-xl font-bold text-gray-900">
									Español para Árabes
								</h3>
							</div>
							<p className="text-gray-700 mb-4">
								Curso especial para hablantes de árabe. Explicaciones en árabe y adaptación cultural.
							</p>
							<div className="flex items-center text-teal-500 font-semibold">
								<span>Comenzar</span>
								<ArrowRight className="w-4 h-4 ml-2" />
							</div>
						</Link>

						<Link
							href="/ejercicios-espanol-interactivos"
							className="group bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-all"
						>
							<div className="flex items-center gap-4 mb-4">
								<div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center text-white">
									<Gamepad2 className="w-6 h-6" />
								</div>
								<h3 className="text-xl font-bold text-gray-900">
									Ejercicios Interactivos
								</h3>
							</div>
							<p className="text-gray-700 mb-4">
								140+ ejercicios de gramática, vocabulario y comprensión. Retroalimentación inmediata.
							</p>
							<div className="flex items-center text-indigo-500 font-semibold">
								<span>Practicar</span>
								<ArrowRight className="w-4 h-4 ml-2" />
							</div>
						</Link>

						<Link
							href="/examenes-espanol-gratis"
							className="group bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-all"
						>
							<div className="flex items-center gap-4 mb-4">
								<div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center text-white">
									<FileCheck className="w-6 h-6" />
								</div>
								<h3 className="text-xl font-bold text-gray-900">
									Exámenes Gratis
								</h3>
							</div>
							<p className="text-gray-700 mb-4">
								Evalúa tu nivel con exámenes A1-C2. Tests oficiales y resultados instantáneos.
							</p>
							<div className="flex items-center text-pink-500 font-semibold">
								<span>Evaluar</span>
								<ArrowRight className="w-4 h-4 ml-2" />
							</div>
						</Link>

						<Link
							href="/frases-espanol-conversacion"
							className="group bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-all"
						>
							<div className="flex items-center gap-4 mb-4">
								<div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center text-white">
									<MessageSquare className="w-6 h-6" />
								</div>
								<h3 className="text-xl font-bold text-gray-900">
									Frases de Conversación
								</h3>
							</div>
							<p className="text-gray-700 mb-4">
								500+ frases útiles para conversaciones diarias. Audio y ejemplos prácticos.
							</p>
							<div className="flex items-center text-cyan-500 font-semibold">
								<span>Aprender</span>
								<ArrowRight className="w-4 h-4 ml-2" />
							</div>
						</Link>
					</div>
				</div>
			</section>

			{/* Why Choose Us */}
			<section className="py-16 bg-white border-b border-gray-200">
			<div className="max-w-7xl mx-auto px-6">
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
						¿Por qué <span className="text-gray-900">Espanol Hub</span>?
					</h2>
					<p className="text-xl text-gray-700">
						La plataforma integral para tu éxito en España
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					<SimpleFeatureBox 
						icon={<Users className="w-8 h-8" />}
						title="Contenido Completo"
						description="Todos los cursos y recursos necesarios"
						delay={0}
					/>
					<SimpleFeatureBox 
						icon={<Shield className="w-8 h-8" />}
						title="Actualizado 2026"
						description="Últimas actualizaciones oficiales"
						delay={100}
					/>
					<SimpleFeatureBox 
						icon={<Target className="w-8 h-8" />}
						title="Simuladores Oficiales"
						description="Exámenes reales DGT y CCSE"
						delay={200}
					/>
					<SimpleFeatureBox 
						icon={<Trophy className="w-8 h-8" />}
						title="98% de Éxito"
						description="Resultados excelentes comprobados"
						delay={300}
					/>
				</div>

				{/* Stats Row */}
				<div className="mt-16 grid grid-cols-3 gap-8 text-center">
					<div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
						<div className="text-4xl font-bold mb-2 text-gray-900">100+</div>
						<div className="text-sm text-gray-700">Lecciones</div>
					</div>
					<div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
						<div className="text-lg font-bold mb-2 text-gray-900">Global</div>
						<div className="text-sm text-gray-700">Estudiantes de todo el mundo</div>
					</div>
					<div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
						<div className="text-lg font-bold mb-2 text-gray-900">2026</div>
						<div className="text-sm text-gray-700">Contenido actualizado</div>
					</div>
				</div>
			</div>
			</section>

			{/* Final CTA Section */}
			<section className="py-16 bg-white">
				<div className="max-w-7xl mx-auto px-6">
					<div className="relative rounded-lg bg-gray-900 p-8 md:p-12 border border-gray-800">
						<div className="flex flex-col md:flex-row items-center justify-between gap-8">
							{/* Left side */}
							<div className="flex-1 text-center md:text-left">
							<div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-full mb-4 border border-gray-700">
								<Star className="w-5 h-5 text-white" aria-hidden="true" />
								<span className="text-sm font-semibold text-white">Oferta Especial</span>
							</div>
							<h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
								Empieza hoy tu camino al éxito
							</h2>
								
								{settings.is_sale_active && saleEndsAt && (
									<div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-800 rounded-lg border border-gray-700">
										<Clock className="w-5 h-5 text-white" aria-hidden="true" />
										<div>
											<div className="text-sm font-semibold text-white">Oferta termina en:</div>
											<div className="text-lg text-white font-mono font-bold">{formatTimeLeft(timeLeft)}</div>
										</div>
									</div>
								)}

								{/* Features list */}
								<div className="mt-6 space-y-2">
									<div className="flex items-center gap-2 text-white">
										<CheckCircle className="w-5 h-5 text-white" aria-hidden="true" />
										<span className="text-sm">Acceso completo a todos los cursos</span>
									</div>
									<div className="flex items-center gap-2 text-white">
										<CheckCircle className="w-5 h-5 text-white" aria-hidden="true" />
										<span className="text-sm">Simuladores oficiales DGT y CCSE</span>
									</div>
									<div className="flex items-center gap-2 text-white">
										<CheckCircle className="w-5 h-5 text-white" aria-hidden="true" />
										<span className="text-sm">Soporte en español y árabe</span>
									</div>
								</div>
							</div>

							{/* Right side - Pricing */}
							<div className="bg-white rounded-lg p-8 border border-gray-200 text-center min-w-[300px]">
								<div className="mb-6">
									<div className="text-sm text-gray-600 mb-2">Precio Mensual</div>
									<div className="flex items-center justify-center gap-2">
										<span className="text-5xl font-extrabold text-gray-900">
											€{settings.monthly_price?.toFixed(2) ?? (settings.global_price).toFixed(2)}
										</span>
										<span className="text-gray-600 text-lg">/mes</span>
									</div>
									<div className="text-sm text-gray-600 mt-2">Cancela cuando quieras</div>
								</div>

								<SubscriptionButton />

								<div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-600">
									<Shield className="w-5 h-5 text-gray-600" aria-hidden="true" />
									<span>Pago seguro 100%</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* removed duplicate copyright (kept footer component copyright) */}
		</div>
	);
}

// Modern Card Component
function ModernCard({ 
	icon, 
	gradient, 
	title, 
	description, 
	features, 
	href, 
	locked,
	badge
}: { 
	icon: React.ReactNode; 
	gradient: string; 
	title: string; 
	description: string; 
	features: string[]; 
	href: string; 
	locked: boolean;
	badge?: string;
}) {
	return (
		<Link 
			href={href} 
			className="group relative bg-white rounded-lg p-8 border border-gray-200 hover:shadow-md transition-all duration-200"
		>
			{/* Badge */}
			{badge && (
				<div className="absolute top-4 right-4 px-3 py-1 bg-gray-900 text-white text-xs font-bold rounded-full">
					{badge}
				</div>
			)}

			{/* Icon */}
			<div className="relative w-16 h-16 rounded-lg bg-gray-900 flex items-center justify-center text-white mb-6 border border-gray-800">
				{icon}
			</div>

			{/* Content */}
			<div className="relative z-10">
				<h3 className="text-2xl font-bold text-gray-900 mb-4">
					{title}
				</h3>
				<p className="text-gray-700 mb-6 text-sm">
					{description}
				</p>

				{/* Features */}
				<ul className="space-y-2 mb-6">
					{features.map((feature, idx) => (
						<li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
							<CheckCircle className="w-5 h-5 text-gray-700 flex-shrink-0" aria-hidden="true" />
							<span>{feature}</span>
						</li>
					))}
				</ul>

				{/* CTA */}
				<div className="flex items-center justify-between">
					<span className="text-gray-900 font-semibold flex items-center gap-2">
						Ver más
						<ArrowRight className="w-5 h-5 text-gray-900" aria-hidden="true" />
					</span>
					{locked ? (
						<span className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full font-medium border border-gray-200">
							<Lock className="w-4 h-4 inline mr-1 text-gray-700" aria-hidden="true" />
							Bloqueado
						</span>
					) : (
						<span className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full font-medium border border-gray-200">
							<CheckCircle className="w-4 h-4 inline mr-1 text-gray-700" aria-hidden="true" />
							Disponible
						</span>
					)}
				</div>
			</div>
		</Link>
	);
}

// Simple Feature Box Component
function SimpleFeatureBox({ 
	icon, 
	title, 
	description, 
	delay = 0 
}: { 
	icon: React.ReactNode; 
	title: string; 
	description: string; 
	delay?: number;
}) {
	const [isVisible, setIsVisible] = useState(false);
	const ref = React.useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
				}
			},
			{ threshold: 0.1 }
		);
		if (ref.current) observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	return (
		<div 
			ref={ref}
			className={`relative p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 ${
				isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
			}`}
			style={{ transitionDelay: `${delay}ms` }}
		>
			<div className="flex flex-col items-center text-center">
				<div className="w-16 h-16 rounded-lg bg-gray-900 flex items-center justify-center mb-4 text-white border border-gray-800">
					{icon}
				</div>
				<h3 className="text-lg font-bold mb-2 text-gray-900">
					{title}
				</h3>
				<p className="text-sm text-gray-700">
					{description}
				</p>
			</div>
		</div>
	);
}

function Feature({ icon, title, subtitle, color, delay = 0 }: { icon: React.ReactNode; title: string; subtitle?: string; color: string; delay?: number }) {
	const [isVisible, setIsVisible] = useState(false);
	const ref = React.useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
				}
			},
			{ threshold: 0.1 }
		);
		if (ref.current) observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	return (
		<div 
			ref={ref}
			className={`group relative p-5 md:p-6 rounded-2xl bg-white shadow-lg hover:shadow-2xl transform transition-all duration-500 cursor-pointer border border-slate-100 hover:border-slate-200 ${
				isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
			}`}
			style={{ transitionDelay: `${delay}ms` }}
		>
			{/* Glow effect on hover */}
			<div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl pointer-events-none`} />
			
			<div className="relative z-10 flex flex-col md:flex-row items-center gap-4">
				<div className={`relative w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
					{icon}
					{/* Pulse ring */}
					<div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${color} opacity-0 group-hover:opacity-30 group-hover:scale-150 transition-all duration-500`} />
				</div>
				<div className="flex-1 text-center md:text-left">
					<div className="text-base md:text-lg font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors" dir="rtl">
						{title}
					</div>
					{subtitle && (
						<div className="text-xs md:text-sm text-slate-500 font-medium">
							{subtitle}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

function AnimatedStat({ num, prefix = '', suffix = '', label, labelEn, duration = 2000 }: { num: number; prefix?: string; suffix?: string; label: string; labelEn?: string; duration?: number }) {
	const [count, setCount] = useState(0);
	const [isVisible, setIsVisible] = useState(false);
	const ref = React.useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !isVisible) {
					setIsVisible(true);
					const startTime = Date.now();
					const animate = () => {
						const elapsed = Date.now() - startTime;
						const progress = Math.min(elapsed / duration, 1);
						const easeOutQuart = 1 - Math.pow(1 - progress, 4);
						setCount(Math.floor(num * easeOutQuart));
						
						if (progress < 1) {
							requestAnimationFrame(animate);
						} else {
							setCount(num);
						}
					};
					animate();
				}
			},
			{ threshold: 0.1 }
		);
		if (ref.current) observer.observe(ref.current);
		return () => observer.disconnect();
	}, [num, duration, isVisible]);

	const displayValue = suffix === '%' ? `${count}%` : suffix === 'K' ? `${(count / 1000).toFixed(1)}K` : `${prefix}${count}`;

	return (
		<div ref={ref} className="text-center">
			<div className="text-3xl md:text-4xl font-extrabold text-white mb-1 drop-shadow-lg">
				{displayValue}
			</div>
			<div className="text-sm text-slate-300 font-medium" dir="rtl">{label}</div>
			{labelEn && (
				<div className="text-xs text-slate-400 mt-0.5">{labelEn}</div>
			)}
		</div>
	);
}

