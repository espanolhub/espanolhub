'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
// Clerk hooks removed to avoid SSR issues - Navigation works without auth
// import { UserButton, SignInButton, SignUpButton, useUser, useAuth, SignedIn, SignedOut } from '@clerk/nextjs';
import { Gamepad2, GraduationCap, Book, Languages, X, Menu, Shield, Award, Search, Download, Car, FileText, Star, User, Wrench } from 'lucide-react';
import SearchOverlay from './SearchOverlay';
// AdminNotificationBadge removed - Navigation works without Clerk hooks
// import AdminNotificationBadge from './AdminNotificationBadge';

// Mobile menu: neutral + one brand accent (SEO-friendly readability)
const mobileMenuItems: { href: string; label: string; icon: typeof Shield; bg: string; iconColor: string }[] = [
  { href: '/aprender-espanol-gratis', label: 'Aprender GRATIS', icon: Star, bg: 'bg-gray-50', iconColor: 'text-blue-600' },
  { href: '/nacionalidad', label: 'Nacionalidad ES', icon: Shield, bg: 'bg-gray-50', iconColor: 'text-blue-600' },
  { href: '/driving-license', label: 'Carnet', icon: Car, bg: 'bg-gray-50', iconColor: 'text-blue-600' },
  { href: '/tramites', label: 'Guías Legales', icon: Download, bg: 'bg-gray-50', iconColor: 'text-blue-600' },
  { href: '/gramatica-espanola-completa', label: 'Gramática — Fundamentos', icon: GraduationCap, bg: 'bg-gray-50', iconColor: 'text-blue-600' },
  { href: '/gramatica', label: 'Gramática', icon: GraduationCap, bg: 'bg-gray-50', iconColor: 'text-blue-600' },
  { href: '/vocabulario', label: 'Vocabulario', icon: Languages, bg: 'bg-gray-50', iconColor: 'text-blue-600' },
  { href: '/lectura', label: 'Lectura', icon: Book, bg: 'bg-gray-50', iconColor: 'text-blue-600' },
  { href: '/juegos', label: 'Juegos', icon: Gamepad2, bg: 'bg-gray-50', iconColor: 'text-blue-600' },
  { href: '/blog', label: 'Blog', icon: FileText, bg: 'bg-gray-50', iconColor: 'text-blue-600' },
  { href: '/simulator', label: 'Simulador (DGT)', icon: Car, bg: 'bg-gray-50', iconColor: 'text-blue-600' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOverlayOpen, setSearchOverlayOpen] = useState(false);
  
  // Clerk hooks removed to avoid SSR/prerendering issues
  // Admin link is hidden - users can access /admin directly if they have access
  const isSignedIn = false;
  const user = null;
  const isAdmin = false;
  
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <SearchOverlay isOpen={searchOverlayOpen} onClose={() => setSearchOverlayOpen(false)} />
      <nav className={`sticky top-0 z-40 w-full bg-slate-950/95 backdrop-blur-sm border-b border-slate-800 transition-all duration-300 ${
        scrolled ? 'shadow-sm shadow-slate-900/40' : ''
      }`}>
        <div className="container mx-auto px-4">
          {/* Row 1: Top Bar */}
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo and Name */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0 group" aria-label="Espanol Hub - Ir a la página principal">
              <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center font-bold text-white text-lg border border-slate-700 group-hover:bg-slate-800 transition-all">
                <GraduationCap className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <div className="hidden sm:flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-extrabold text-slate-50">
                    Español
                  </span>
                  <span className="text-xl font-extrabold text-slate-50">
                    Hub
                  </span>
                </div>
                <span className="text-[9px] text-slate-400 font-medium -mt-1 italic leading-tight">
                  Tu centro inteligente para aprender español
                </span>
              </div>
            </Link>

            {/* Center: Prominent Search Bar */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <button
                onClick={() => setSearchOverlayOpen(true)}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 hover:border-slate-500 transition-all duration-200 text-left focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-slate-950"
                aria-label="Buscar"
              >
                <Search className="w-5 h-5 text-slate-400 flex-shrink-0" aria-hidden="true" />
                <span className="text-sm text-slate-400">Buscar...</span>
              </button>
            </div>

            {/* Right: Login/Profile and Mobile Menu */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Admin Link */}
              {mounted && isSignedIn && isAdmin && (
                <Link
                  href="/admin"
                  className={`hidden md:flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                    pathname === '/admin'
                      ? 'bg-slate-800 text-white border-slate-600 shadow-md'
                      : 'bg-slate-900 text-slate-100 border-slate-700 hover:bg-slate-800 hover:shadow-sm hover:border-slate-500'
                  }`}
                  aria-label="Panel de Control"
                >
                  <Shield className={`w-5 h-5 ${pathname === '/admin' ? 'text-white' : 'text-slate-200'} transition-colors`} aria-hidden="true" />
                  <span className="hidden lg:inline">Panel de Control</span>
                  <span className="lg:hidden">Admin</span>
                </Link>
              )}

              {/* Login/Profile Button */}
              <button
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-100 bg-slate-900 border border-slate-700 hover:bg-slate-800 hover:border-slate-500 transition-all duration-200"
                aria-label="Iniciar Sesión"
              >
                <User className="w-5 h-5 text-slate-100" aria-hidden="true" />
                <span className="hidden lg:inline">Iniciar Sesión</span>
                <span className="lg:hidden">Login</span>
              </button>

              {/* Mobile Search Button */}
              <button
                onClick={() => setSearchOverlayOpen(true)}
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 hover:border-slate-500 transition-all duration-200 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-slate-950"
                aria-label="Buscar"
              >
                <Search className="w-5 h-5 text-slate-100" aria-hidden="true" />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 hover:border-slate-500 hover:shadow-md transition-all duration-200 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-slate-950"
                aria-label={mobileMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-slate-100" aria-hidden="true" />
              ) : (
                  <Menu className="w-5 h-5 text-slate-100" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {/* Row 2: Navigation Bar - Simplified to 4 Essential Links */}
          <div className="hidden md:flex items-center py-3">
            <div className="flex items-center gap-x-4 gap-y-2 w-full">
              <Link
                href="/cursos"
                className={`btn btn-tab whitespace-nowrap ${pathname.startsWith('/cursos') || pathname.startsWith('/gramatica') || pathname.startsWith('/vocabulario') || pathname.startsWith('/lectura') ? 'btn-tab-active' : ''}`}
              >
                <GraduationCap className={`w-5 h-5 flex-shrink-0 ${pathname.startsWith('/cursos') || pathname.startsWith('/gramatica') || pathname.startsWith('/vocabulario') || pathname.startsWith('/lectura') ? 'text-white' : 'text-slate-900'}`} aria-hidden="true" />
                <span>Cursos</span>
              </Link>
              <Link
                href="/juegos"
                className={`btn btn-tab whitespace-nowrap ${pathname === '/juegos' ? 'btn-tab-active' : ''}`}
              >
                <Gamepad2 className={`w-5 h-5 flex-shrink-0 ${pathname === '/juegos' ? 'text-white' : 'text-slate-900'}`} aria-hidden="true" />
                <span>Juegos</span>
              </Link>
              <Link
                href="/alfabeto"
                className={`btn btn-tab whitespace-nowrap ${pathname.startsWith('/alfabeto') || pathname.startsWith('/conjugador') || pathname.startsWith('/numeros') || pathname.startsWith('/pronunciacion') ? 'btn-tab-active' : ''}`}
              >
                <Wrench className={`w-5 h-5 flex-shrink-0 ${pathname.startsWith('/alfabeto') || pathname.startsWith('/conjugador') || pathname.startsWith('/numeros') || pathname.startsWith('/pronunciacion') ? 'text-white' : 'text-slate-900'}`} aria-hidden="true" />
                <span>Recursos</span>
              </Link>
              <Link
                href="/blog"
                className={`btn btn-tab whitespace-nowrap ${pathname.startsWith('/blog') ? 'btn-tab-active' : ''}`}
              >
                <FileText className={`w-5 h-5 flex-shrink-0 ${pathname.startsWith('/blog') ? 'text-white' : 'text-slate-900'}`} aria-hidden="true" />
                <span>Blog</span>
              </Link>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 pt-5 pb-6 px-3">
              <div className="grid grid-cols-2 gap-3">
                {mobileMenuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`group mobile-menu-item flex flex-col items-center justify-center gap-3 p-4 rounded-xl border transition-all duration-200 active:scale-[0.98] h-[120px] ${
                        isActive 
                          ? 'bg-slate-900 text-white border-slate-900 shadow-lg' 
                          : 'bg-white text-slate-900 border-gray-200 hover:bg-gray-50 hover:shadow-md hover:border-gray-300'
                      }`}
                    >
                      <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-200 ${
                        isActive 
                          ? 'bg-gray-800 shadow-md' 
                          : `${item.bg} shadow-sm group-hover:shadow-md`
                      }`}>
                        <Icon className={`w-7 h-7 transition-colors ${
                          isActive ? 'text-white' : item.iconColor
                        }`} aria-hidden="true" />
                      </div>
                      <span className={`text-xs font-semibold text-center leading-tight line-clamp-2 ${isActive ? 'text-white' : 'text-slate-900'}`}>
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
