'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Car, Award, FileText, Users, Shield, 
  BookOpen, Globe, Gamepad2, PlayCircle,
  Sparkles, Trophy, Target, Zap, Star,
  CheckCircle, ArrowRight, GraduationCap, Lock, Clock,
  Gift, Book, Languages
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
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 text-slate-900">
		<a href="#main-content" className="skip-link absolute left-2 top-16 z-50 -translate-y-12 focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-yellow-300 rounded px-3 py-2 bg-white/6 backdrop-blur-sm text-sm">
			Ir al contenido
		</a>
		{/* Hero */}
		<header className="relative overflow-hidden">
			<div className="absolute inset-0 -z-10">
				<div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)', opacity: 0.1 }} />
				<div className="mesh pointer-events-none" />
				</div>

			<div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
				<div className="backdrop-blur-xl bg-white/95 border-2 border-white/30 rounded-3xl p-8 md:p-12 shadow-2xl">
					<div className="flex flex-col md:flex-row items-center gap-12">
						<div className="flex-1 text-center md:text-left">
							{/* Badge */}
							<div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-6">
								<Sparkles className="w-4 h-4 text-purple-600" />
								<span className="text-sm font-semibold text-purple-900">Plataforma Educativa #1</span>
								<Star className="w-4 h-4 text-amber-500 fill-amber-500" />
							</div>

					<h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent" style={{ contentVisibility: 'auto' }}>
						Tu futuro en España comienza aquí
					</h1>
					<p className="text-lg mb-8 text-gray-700 max-w-2xl mx-auto md:mx-0">
						Aprende español, aprueba tus exámenes oficiales y gestiona tus trámites en una sola plataforma integral.
					</p>

							{/* Main CTA Buttons */}
							<div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center md:justify-start">
								<Link
									href="/cursos"
									className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
								>
									<GraduationCap className="w-5 h-5" />
									<span>Ver Cursos</span>
									<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
								</Link>

								<Link
									href="/juegos"
									className="px-8 py-4 bg-white border-2 border-purple-600 text-purple-600 font-bold rounded-2xl shadow-lg hover:shadow-xl hover:bg-purple-50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
								>
									<Gamepad2 className="w-5 h-5" />
									<span>Jugar Ahora</span>
								</Link>
							</div>

							{/* Quick Access Buttons */}
							<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
							<Link
								href="/aprender-espanol-gratis"
								className="group p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-300 rounded-xl hover:shadow-lg transition-all hover:scale-105 relative overflow-hidden"
							>
								<div className="absolute top-1 right-1">
									<Gift className="w-4 h-4 text-yellow-600" />
								</div>
								<Star className="w-6 h-6 text-yellow-600 mb-2 mx-auto" />
								<div className="text-xs font-bold text-yellow-900 text-center">GRATIS</div>
							</Link>

							<Link
								href="/driving-license"
								className="group p-4 bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl hover:shadow-lg transition-all hover:scale-105"
							>
								<Car className="w-6 h-6 text-orange-600 mb-2 mx-auto" />
								<div className="text-sm font-semibold text-orange-900 text-center">Carnet de Conducir</div>
							</Link>

							<Link
								href="/nacionalidad"
								className="group p-4 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl hover:shadow-lg transition-all hover:scale-105"
							>
								<Award className="w-6 h-6 text-blue-600 mb-2 mx-auto" />
								<div className="text-sm font-semibold text-blue-900 text-center">CCSE</div>
							</Link>

							<Link
								href="/juegos"
								className="group p-4 bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200 rounded-xl hover:shadow-lg transition-all hover:scale-105"
							>
								<Gamepad2 className="w-6 h-6 text-pink-600 mb-2 mx-auto" />
								<div className="text-sm font-semibold text-pink-900 text-center">Juegos</div>
							</Link>

							<Link
								href="/simulator"
								className="group p-4 bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl hover:shadow-lg transition-all hover:scale-105"
							>
								<PlayCircle className="w-6 h-6 text-green-600 mb-2 mx-auto" />
								<div className="text-sm font-semibold text-green-900 text-center">Simulador</div>
							</Link>

							<Link
								href="/blog"
								className="group p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 rounded-xl hover:shadow-lg transition-all hover:scale-105"
							>
								<Book className="w-6 h-6 text-indigo-600 mb-2 mx-auto" />
								<div className="text-sm font-semibold text-indigo-900 text-center">Blog</div>
							</Link>
							</div>
						</div>

						<div className="w-full md:w-1/3 relative flex items-center justify-center">
							<div className="relative w-56 h-36 md:w-72 md:h-44">
								<div className="absolute inset-0 transform -rotate-6 translate-x-2 translate-y-2 bg-gradient-to-r from-orange-400 to-yellow-300 rounded-2xl shadow-2xl animate-float card-glow" style={{ zIndex: 1 }} />
								<div className="absolute inset-0 transform rotate-6 -translate-x-3 -translate-y-3 bg-gradient-to-r from-white to-slate-50 rounded-2xl shadow-2xl p-4 text-gray-800" style={{ zIndex: 2 }}>
									<div className="flex items-center justify-between mb-3">
										<div className="text-xs">ESP</div>
										<div className="text-xs">🇪🇸</div>
									</div>
									<div className="text-sm font-semibold">Licencia B</div>
									<div className="text-xs text-gray-600 mt-4">Nombre: Juan Pérez</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>

			{/* Aprende Español GRATIS Section */}
			<section className="py-16 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 relative overflow-hidden">
				<div className="absolute inset-0 opacity-10">
					<div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.2) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.2) 0%, transparent 50%)' }} />
				</div>
				<div className="max-w-7xl mx-auto px-6 relative z-10">
					<div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl">
						<div className="flex flex-col md:flex-row items-center gap-8">
							<div className="flex-1 text-center md:text-left">
								<div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 rounded-full mb-4">
									<Gift className="w-5 h-5 text-yellow-600" />
									<span className="text-sm font-bold text-yellow-900">100% GRATIS</span>
								</div>
								<h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
									Aprende Español <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600">GRATIS</span>
								</h2>
								<p className="text-lg text-gray-700 mb-6 max-w-2xl">
									Accede a todo nuestro contenido educativo sin costo. Gramática, vocabulario, juegos interactivos y más. Sin registro, sin tarjeta de crédito.
								</p>
								<Link
									href="/aprender-espanol-gratis"
									className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105"
								>
									<Star className="w-5 h-5" />
									<span>Empieza Ahora - GRATIS</span>
									<ArrowRight className="w-5 h-5" />
								</Link>
							</div>
							<div className="flex-shrink-0">
								<div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-yellow-300 to-orange-300 rounded-full flex items-center justify-center shadow-2xl">
									<Gift className="w-16 h-16 md:w-20 md:h-20 text-white" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Main Features - Three Pillars */}
			<section id="main-content" className="py-16 bg-gradient-to-b from-white to-gray-50">
				<div className="max-w-7xl mx-auto px-6">
					{/* Section Header */}
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-3">
						<Zap className="w-8 h-8 text-yellow-500" />
						Nuestros Programas Principales
					</h2>
				</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<ModernCard 
						icon={<Car className="w-8 h-8" />}
						gradient="from-orange-500 via-red-500 to-pink-500"
						title="Carnet de Conducir"
						description="18 capítulos completos + Simulador oficial DGT"
						features={['18 Lecciones completas', 'Simulador DGT oficial', 'Contenido interactivo', '100% actualizado 2026']}
						href="/driving-license"
						locked={driving.isLocked}
					/>
					
					<ModernCard 
						icon={<Award className="w-8 h-8" />}
						gradient="from-blue-500 via-purple-500 to-pink-500"
						title="Nacionalidad Española"
						description="Preparación completa para el examen CCSE oficial"
						features={['40+ Lecciones CCSE', 'Exámenes oficiales', 'Guías prácticas', 'Material completo']}
						href="/nacionalidad"
						locked={nationality.isLocked}
						badge="Popular"
					/>
					
					<ModernCard 
						icon={<FileText className="w-8 h-8" />}
						gradient="from-green-500 via-emerald-500 to-teal-500"
						title="Guías de Trámites"
						description="Documentos, checklists y guías paso a paso"
						features={['Guías completas', 'Checklists detallados', 'Documentación necesaria', 'Instrucciones claras']}
						href="/tramites"
						locked={tramites.isLocked}
					/>
					</div>
				</div>
			</section>

			{/* Practice Section */}
			<section className="py-16 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
				<div className="max-w-7xl mx-auto px-6">
					<div className="text-center mb-8">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
							<Gamepad2 className="w-8 h-8 text-purple-600" />
							<span>Aprende Practicando</span>
						</h2>
						<p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
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
							<BookOpen className="w-8 h-8 text-blue-600" />
							<span>Recursos Adicionales</span>
						</h2>
						<p className="text-lg text-gray-600 max-w-2xl mx-auto">
							Explora nuestros recursos educativos completos para aprender español de forma efectiva
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						<Link
							href="/gramatica-espanola-completa"
							className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 border-2 border-gray-100 hover:border-blue-300"
						>
							<div className="flex items-center gap-4 mb-4">
								<div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white">
									<GraduationCap className="w-6 h-6" />
								</div>
								<h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
									Gramática Completa
								</h3>
							</div>
							<p className="text-gray-600 mb-4">
								Aprende toda la gramática española desde cero hasta avanzado. Guía completa con ejemplos y ejercicios.
							</p>
							<div className="flex items-center text-blue-600 font-semibold">
								<span>Explorar</span>
								<ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
							</div>
						</Link>

						<Link
							href="/vocabulario-espanol-por-temas"
							className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 border-2 border-gray-100 hover:border-green-300"
						>
							<div className="flex items-center gap-4 mb-4">
								<div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white">
									<Languages className="w-6 h-6" />
								</div>
								<h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
									Vocabulario por Temas
								</h3>
							</div>
							<p className="text-gray-600 mb-4">
								Más de 1000 palabras organizadas por temas. Familia, trabajo, comida, viajes y más con pronunciación.
							</p>
							<div className="flex items-center text-green-600 font-semibold">
								<span>Explorar</span>
								<ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
							</div>
						</Link>

						<Link
							href="/blog"
							className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 border-2 border-gray-100 hover:border-purple-300"
						>
							<div className="flex items-center gap-4 mb-4">
								<div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
									<Book className="w-6 h-6" />
								</div>
								<h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
									Blog Educativo
								</h3>
							</div>
							<p className="text-gray-600 mb-4">
								Artículos, guías y consejos para aprender español. Gramática, vocabulario, pronunciación y más.
							</p>
							<div className="flex items-center text-purple-600 font-semibold">
								<span>Leer Artículos</span>
								<ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
							</div>
						</Link>
					</div>
				</div>
			</section>

			{/* Why Choose Us */}
			<section className="py-16 bg-gradient-to-br from-purple-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
				{/* Animated background */}
				<div className="absolute inset-0 opacity-10">
					<div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)' }} />
				</div>

			<div className="max-w-7xl mx-auto px-6 relative z-10">
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						¿Por qué <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">Espanol Hub</span>?
					</h2>
					<p className="text-xl text-purple-200">
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
					<div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl">
						<div className="text-4xl font-bold mb-2">150+</div>
						<div className="text-sm text-purple-200">Lecciones</div>
					</div>
					<div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl">
						<div className="text-4xl font-bold mb-2">2K+</div>
						<div className="text-sm text-purple-200">Estudiantes</div>
					</div>
					<div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl">
						<div className="text-4xl font-bold mb-2">98%</div>
						<div className="text-sm text-purple-200">Tasa de Éxito</div>
					</div>
				</div>
			</div>
			</section>

			{/* Final CTA Section */}
			<section className="py-16">
				<div className="max-w-7xl mx-auto px-6">
					<div className="relative rounded-3xl bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 p-8 md:p-12 shadow-2xl overflow-hidden">
						{/* Animated background pattern */}
						<div className="absolute inset-0 opacity-10">
							<div className="absolute inset-0" style={{ 
								backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
							}} />
						</div>

						<div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
							{/* Left side */}
							<div className="flex-1 text-center md:text-left">
							<div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
								<Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
								<span className="text-sm font-semibold text-white">Oferta Especial</span>
							</div>
							<h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
								Empieza hoy tu camino al éxito
							</h2>
								
								{settings.is_sale_active && saleEndsAt && (
									<div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-2xl">
										<Clock className="w-5 h-5 text-yellow-300" />
										<div>
											<div className="text-sm font-semibold text-white">Oferta termina en:</div>
											<div className="text-lg text-yellow-300 font-mono font-bold">{formatTimeLeft(timeLeft)}</div>
										</div>
									</div>
								)}

								{/* Features list */}
								<div className="mt-6 space-y-2">
									<div className="flex items-center gap-2 text-white">
										<CheckCircle className="w-5 h-5 text-green-300" />
										<span className="text-sm">Acceso completo a todos los cursos</span>
									</div>
									<div className="flex items-center gap-2 text-white">
										<CheckCircle className="w-5 h-5 text-green-300" />
										<span className="text-sm">Simuladores oficiales DGT y CCSE</span>
									</div>
									<div className="flex items-center gap-2 text-white">
										<CheckCircle className="w-5 h-5 text-green-300" />
										<span className="text-sm">Soporte en español y árabe</span>
									</div>
								</div>
							</div>

							{/* Right side - Pricing */}
							<div className="bg-white rounded-3xl p-8 shadow-2xl text-center min-w-[300px]">
								<div className="mb-6">
									<div className="text-sm text-gray-600 mb-2">Precio Mensual</div>
									<div className="flex items-center justify-center gap-2">
										<span className="text-5xl font-extrabold text-purple-600">
											€{settings.monthly_price?.toFixed(2) ?? (settings.global_price).toFixed(2)}
										</span>
										<span className="text-gray-500 text-lg">/mes</span>
									</div>
									<div className="text-sm text-gray-500 mt-2">Cancela cuando quieras</div>
								</div>

								<SubscriptionButton />

								<div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
									<Shield className="w-4 h-4" />
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
			className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-2 border-gray-100 hover:border-purple-200 overflow-hidden"
		>
			{/* Background gradient on hover */}
			<div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
			
			{/* Badge */}
			{badge && (
				<div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold rounded-full">
					{badge}
				</div>
			)}

			{/* Icon */}
			<div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
				{icon}
			</div>

			{/* Content */}
			<div className="relative z-10">
				<h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
					{title}
				</h3>
				<p className="text-gray-700 mb-6 text-sm">
					{description}
				</p>

				{/* Features */}
				<ul className="space-y-2 mb-6">
					{features.map((feature, idx) => (
						<li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
							<CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
							<span>{feature}</span>
						</li>
					))}
				</ul>

				{/* CTA */}
				<div className="flex items-center justify-between">
					<span className="text-purple-600 font-semibold group-hover:translate-x-2 transition-transform flex items-center gap-2">
						Ver más
						<ArrowRight className="w-4 h-4" />
					</span>
					{locked ? (
						<span className="text-xs px-3 py-1 bg-red-100 text-red-700 rounded-full font-medium">
							<Lock className="w-3 h-3 inline mr-1" />
							Bloqueado
						</span>
					) : (
						<span className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">
							<CheckCircle className="w-3 h-3 inline mr-1" />
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
			className={`relative p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-500 transform ${
				isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
			}`}
			style={{ transitionDelay: `${delay}ms` }}
		>
			<div className="flex flex-col items-center text-center">
				<div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-4 text-white">
					{icon}
				</div>
				<h3 className="text-lg font-bold mb-2 text-white">
					{title}
				</h3>
				<p className="text-sm text-purple-100">
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

