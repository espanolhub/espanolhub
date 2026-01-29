'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Car, Award, FileText, Users, Shield, 
  BookOpen, Gamepad2, PlayCircle,
  Trophy, Zap, Star,
  CheckCircle, ArrowRight, GraduationCap, Lock,
  Gift, Book, Languages, Hash, Volume2, Wrench, MessageSquare, FileCheck
} from 'lucide-react';
import { useModuleAccess } from '@/components/useModuleAccess';
import { useAdminSettings } from '@/components/AdminSettingsProvider';
import PracticeCTA from '@/components/StickyPlayCTA';

export default function Home() {
	const driving = useModuleAccess('driving');
	const nationality = useModuleAccess('nationality');
	const tramites = useModuleAccess('tramites');

	return (
		<div className="min-h-screen bg-white text-slate-900">
		<a href="#main-content" className="skip-link absolute left-2 top-16 z-50 -translate-y-12 focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded px-3 py-2 bg-white text-sm">
			Ir al contenido
		</a>
		{/* Hero */}
		<header className="relative overflow-hidden bg-white border-b border-gray-200">
			<div className="max-w-7xl mx-auto px-6 py-8 md:py-12">
				<div className="bg-white border border-gray-200 rounded-lg p-8 md:p-10">
					<div className="flex flex-col md:flex-row items-center gap-10">
						<div className="flex-1 text-center">
				<h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 text-gray-900">
					Tu futuro en España comienza aquí
				</h1>
				<p className="text-lg mb-4 text-gray-700 max-w-2xl mx-auto md:mx-0">
					Aprende español, aprueba tus exámenes y gestiona tus trámites de forma completamente gratuita. Sin tarjetas de crédito.
				</p>

						{/* Main CTA Buttons */}
						<div className="flex flex-col sm:flex-row gap-3 mb-4 justify-center md:justify-start">
							<Link
								href="/cursos"
								className="group relative px-8 py-4 bg-gray-900 text-white font-bold rounded-xl shadow-sm hover:bg-gray-800 transition-all duration-200 flex items-center justify-center gap-2"
							>
								<GraduationCap className="w-5 h-5 text-white" aria-hidden="true" />
								<span>Empezar Gratis Ahora</span>
								<ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" aria-hidden="true" />
							</Link>

							<Link
								href="/recursos"
								className="px-8 py-4 bg-purple-600 text-white font-bold rounded-xl shadow-sm hover:bg-purple-700 transition-all duration-200 flex items-center justify-center gap-2"
							>
								<Book className="w-5 h-5 text-white" aria-hidden="true" />
								<span>Lecciones Interactivas</span>
							</Link>

							<Link
								href="/juegos"
								className="px-8 py-4 bg-white border-2 border-gray-900 text-gray-900 font-bold rounded-xl shadow-sm hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2"
							>
								<Gamepad2 className="w-5 h-5 text-gray-900" aria-hidden="true" />
								<span>Jugar Ahora</span>
							</Link>
						</div>

						{/* Core Content Grid - 4 Categories */}
						<div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
						<Link
							href="/gramatica"
							className="group p-6 bg-gradient-to-br from-blue-100 to-blue-200 border border-blue-300 rounded-xl hover:shadow-md hover:from-blue-200 hover:to-blue-300 transition-all text-center"
						>
							<BookOpen className="w-8 h-8 text-blue-700 mb-3 mx-auto" aria-hidden="true" />
							<div className="text-base font-semibold text-blue-950">Gramática</div>
						</Link>

						<Link
							href="/vocabulario"
							className="group p-6 bg-gradient-to-br from-green-100 to-green-200 border border-green-300 rounded-xl hover:shadow-md hover:from-green-200 hover:to-green-300 transition-all text-center"
						>
							<Languages className="w-8 h-8 text-green-700 mb-3 mx-auto" aria-hidden="true" />
							<div className="text-base font-semibold text-green-950">Vocabulario</div>
						</Link>

						<Link
							href="/recursos"
							className="group p-6 bg-gradient-to-br from-purple-100 to-purple-200 border border-purple-300 rounded-xl hover:shadow-md hover:from-purple-200 hover:to-purple-300 transition-all text-center"
						>
							<Book className="w-8 h-8 text-purple-700 mb-3 mx-auto" aria-hidden="true" />
							<div className="text-base font-semibold text-purple-950">Lecciones</div>
						</Link>

						<Link
							href="/examenes-espanol-gratis"
							className="group p-6 bg-gradient-to-br from-red-100 to-red-200 border border-red-300 rounded-xl hover:shadow-md hover:from-red-200 hover:to-red-300 transition-all text-center"
						>
							<FileCheck className="w-8 h-8 text-red-700 mb-3 mx-auto" aria-hidden="true" />
							<div className="text-base font-semibold text-red-950">Exámenes</div>
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

			{/* Main Features - Three Pillars */}
			<section id="main-content" className="py-8 bg-white">
				<div className="max-w-7xl mx-auto px-6">
					{/* Section Header */}
				<div className="text-center mb-8">
					<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-3">
						<Zap className="w-8 h-8 text-gray-700" aria-hidden="true" />
						Nuestros Programas Principales
					</h2>
				</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<ModernCard 
						icon={<Car className="w-8 h-8 text-white" aria-hidden="true" />}
						gradient="from-blue-600 via-indigo-600 to-blue-600"
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
						icon={<FileText className="w-8 h-8 text-white" aria-hidden="true" />}
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
			<section className="py-8 bg-white border-b border-gray-200">
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
			<section className="py-8 bg-white">
				<div className="max-w-7xl mx-auto px-6">
					<div className="text-center mb-8">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-3">
							<Wrench className="w-8 h-8 text-gray-700" aria-hidden="true" />
							<span>Recursos Adicionales</span>
						</h2>
						<p className="text-lg text-gray-700 max-w-2xl mx-auto">
							Refuerza tu base con recursos clave: letras, pronunciación, conjugaciones, números y frases útiles.
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-6">
						<Link
							href="/alfabeto"
							className="group bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all"
						>
							<div className="flex items-center gap-4 mb-4">
								<div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white">
									<Hash className="w-6 h-6" aria-hidden="true" />
								</div>
								<h3 className="text-xl font-bold text-gray-900">
									Alfabeto
								</h3>
							</div>
							<p className="text-gray-700 mb-4">
								Aprende las 27 letras del alfabeto español con audio de nativos. Pronunciación perfecta desde el inicio.
							</p>
							<div className="flex items-center text-green-500 font-semibold">
								<span>Aprender</span>
								<ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
							</div>
						</Link>

						<Link
							href="/pronunciacion-espanol-guia"
							className="group bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all"
						>
							<div className="flex items-center gap-4 mb-4">
								<div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white">
									<Volume2 className="w-6 h-6" aria-hidden="true" />
								</div>
								<h3 className="text-xl font-bold text-gray-900">
									Guía de Pronunciación
								</h3>
							</div>
							<p className="text-gray-700 mb-4">
								Mejora tu pronunciación con nuestra guía completa. Audio de nativos y técnicas probadas.
							</p>
							<div className="flex items-center text-blue-500 font-semibold">
								<span>Practicar sonidos</span>
								<ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
							</div>
						</Link>

						<Link
							href="/conjugador-verbos"
							className="group bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all"
						>
							<div className="flex items-center gap-4 mb-4">
								<div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center text-white">
									<Wrench className="w-6 h-6" aria-hidden="true" />
								</div>
								<h3 className="text-xl font-bold text-gray-900">
									Conjugador
								</h3>
							</div>
							<p className="text-gray-700 mb-4">
								Conjuga cualquier verbo español en todos los tiempos. Más de 12,000 verbos disponibles.
							</p>
							<div className="flex items-center text-indigo-500 font-semibold">
								<span>Conjugar</span>
								<ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
							</div>
						</Link>

						<Link
							href="/simulator"
							className="group bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all"
						>
							<div className="flex items-center gap-4 mb-4">
								<div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white">
									<Car className="w-6 h-6" aria-hidden="true" />
								</div>
								<h3 className="text-xl font-bold text-gray-900">
									Simulador DGT
								</h3>
							</div>
							<p className="text-gray-700 mb-4">
								Simulador oficial del examen teórico DGT para practicar como si fuera el día real.
							</p>
							<div className="flex items-center text-blue-500 font-semibold">
								<span>Empezar simulador</span>
								<ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
							</div>
						</Link>

						<Link
							href="/numeros"
							className="group bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all"
						>
							<div className="flex items-center gap-4 mb-4">
								<div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center text-white">
									<Hash className="w-6 h-6" aria-hidden="true" />
								</div>
								<h3 className="text-xl font-bold text-gray-900">
									Números en Español
								</h3>
							</div>
							<p className="text-gray-700 mb-4">
								Aprende y practica los números en español con audio y ejercicios hasta el 1000 y más.
							</p>
							<div className="flex items-center text-amber-500 font-semibold">
								<span>Practicar números</span>
								<ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
							</div>
						</Link>

						<Link
							href="/frases-espanol-conversacion"
							className="group bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all"
						>
							<div className="flex items-center gap-4 mb-4">
								<div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center text-white">
									<MessageSquare className="w-6 h-6" aria-hidden="true" />
								</div>
								<h3 className="text-xl font-bold text-gray-900">
									Frases de Conversación
								</h3>
							</div>
							<p className="text-gray-700 mb-4">
								500+ frases útiles para conversaciones diarias en España con ejemplos prácticos.
							</p>
							<div className="flex items-center text-cyan-500 font-semibold">
								<span>Aprender frases</span>
								<ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
							</div>
						</Link>

						<Link
							href="/ejercicios-espanol-interactivos"
							className="group bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all"
						>
							<div className="flex items-center gap-4 mb-4">
								<div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center text-white">
									<Gamepad2 className="w-6 h-6" aria-hidden="true" />
								</div>
								<h3 className="text-xl font-bold text-gray-900">
									Ejercicios Interactivos
								</h3>
							</div>
							<p className="text-gray-700 mb-4">
								Más de 140 ejercicios interactivos de gramática, vocabulario y comprensión con corrección inmediata.
							</p>
							<div className="flex items-center text-pink-500 font-semibold">
								<span>Empezar ejercicios</span>
								<ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
							</div>
						</Link>
					</div>
				</div>
			</section>

			{/* Why Choose Us */}
			<section className="py-8 bg-white border-b border-gray-200">
			<div className="max-w-7xl mx-auto px-6">
				<div className="text-center mb-8">
					<h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
						¿Por qué <span className="text-gray-900">Espanol Hub</span>?
					</h2>
					<p className="text-xl text-gray-700">
						La plataforma integral para tu éxito en España
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<SimpleFeatureBox 
						icon={<Gift className="w-8 h-8 text-white" />}
						title="100% Gratis"
						description="Acceso completo sin costo alguno"
						delay={0}
					/>
					<SimpleFeatureBox 
						icon={<Shield className="w-8 h-8 text-white" />}
						title="Contenido Actualizado"
						description="Últimas actualizaciones oficiales"
						delay={100}
					/>
					<SimpleFeatureBox 
						icon={<Trophy className="w-8 h-8 text-white" />}
						title="Éxito Garantizado"
						description="Resultados excelentes comprobados"
						delay={200}
					/>
				</div>

				{/* Stats Row */}
				<div className="mt-10 grid grid-cols-3 gap-6 text-center">
					<div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
						<div className="text-4xl font-bold mb-2 text-gray-900">100+</div>
						<div className="text-sm text-gray-700">Lecciones</div>
					</div>
					<div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
						<div className="text-lg font-bold mb-2 text-gray-900">Global</div>
						<div className="text-sm text-gray-700">Estudiantes de todo el mundo</div>
					</div>
					<div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
						<div className="text-lg font-bold mb-2 text-gray-900">99/100</div>
						<div className="text-sm text-gray-700">Rendimiento optimizado</div>
					</div>
				</div>
			</div>
			</section>

			{/* Final CTA Section */}
			<section className="py-8 bg-white">
				<div className="max-w-7xl mx-auto px-6">
					<div className="relative rounded-lg bg-gray-900 p-6 md:p-8 border border-gray-800" style={{ backgroundColor: '#111827' }}>
						<div className="flex flex-col items-center text-center">
							<div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-full mb-4 border border-gray-700">
								<Star className="w-5 h-5 text-white" aria-hidden="true" />
								<span className="text-sm font-semibold text-white">Acceso Gratuito de por Vida</span>
							</div>
							<h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4" style={{ color: '#ffffff' }}>
								Empieza hoy tu camino al éxito
							</h2>

							{/* Features list */}
							<div className="mt-4 space-y-2 max-w-2xl">
								<div className="flex items-center justify-center gap-2 text-white">
									<CheckCircle className="w-5 h-5 text-white" aria-hidden="true" />
									<span className="text-sm">Acceso completo a todos los cursos</span>
								</div>
								<div className="flex items-center justify-center gap-2 text-white">
									<CheckCircle className="w-5 h-5 text-white" aria-hidden="true" />
									<span className="text-sm">Simuladores oficiales DGT y CCSE</span>
								</div>
								<div className="flex items-center justify-center gap-2 text-white">
									<CheckCircle className="w-5 h-5 text-white" aria-hidden="true" />
									<span className="text-sm">100% gratuito, sin tarjetas de crédito</span>
								</div>
							</div>

							<Link
								href="/cursos"
								className="mt-6 inline-flex items-center gap-2 px-8 py-3 bg-white text-gray-900 font-bold rounded-lg shadow-sm hover:bg-gray-50 transition-all duration-200"
							>
								<span>Empezar Gratis Ahora</span>
								<ArrowRight className="w-5 h-5 text-gray-900" aria-hidden="true" />
							</Link>
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
					<div className="text-base md:text-lg font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
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
			<div className="text-sm text-slate-300 font-medium">{label}</div>
			{labelEn && (
				<div className="text-xs text-slate-400 mt-0.5">{labelEn}</div>
			)}
		</div>
	);
}

