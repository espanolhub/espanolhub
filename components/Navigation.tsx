'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
// Clerk hooks removed to avoid SSR issues - Navigation works without auth
// import { UserButton, SignInButton, SignUpButton, useUser, useAuth, SignedIn, SignedOut } from '@clerk/nextjs';
import { Gamepad2, GraduationCap, Book, Languages, X, Menu, Shield, Award, Search, Download, Car, FileText, Star } from 'lucide-react';
import SearchOverlay from './SearchOverlay';
// AdminNotificationBadge removed - Navigation works without Clerk hooks
// import AdminNotificationBadge from './AdminNotificationBadge';

// Mobile menu: card-based items with colored icons (used only on md and below)
const mobileMenuItems: { href: string; label: string; icon: typeof Shield; bg: string; iconColor: string }[] = [
  { href: '/aprender-espanol-gratis', label: 'Aprender GRATIS', icon: Star, bg: 'bg-yellow-50', iconColor: 'text-yellow-600' },
  { href: '/nacionalidad', label: 'Nacionalidad ES', icon: Shield, bg: 'bg-blue-50', iconColor: 'text-blue-600' },
  { href: '/driving-license', label: 'Carnet', icon: Car, bg: 'bg-emerald-50', iconColor: 'text-emerald-600' },
  { href: '/tramites', label: 'Guías Legales', icon: Download, bg: 'bg-violet-50', iconColor: 'text-violet-600' },
  { href: '/gramatica-espanola-completa', label: 'Gramática — Fundamentos', icon: GraduationCap, bg: 'bg-blue-50', iconColor: 'text-blue-600' },
  { href: '/gramatica', label: 'Gramática', icon: GraduationCap, bg: 'bg-amber-50', iconColor: 'text-amber-600' },
  { href: '/vocabulario', label: 'Vocabulario', icon: Languages, bg: 'bg-teal-50', iconColor: 'text-teal-600' },
  { href: '/lectura', label: 'Lectura', icon: Book, bg: 'bg-indigo-50', iconColor: 'text-indigo-600' },
  { href: '/juegos', label: 'Juegos', icon: Gamepad2, bg: 'bg-pink-50', iconColor: 'text-pink-600' },
  { href: '/blog', label: 'Blog', icon: FileText, bg: 'bg-purple-50', iconColor: 'text-purple-600' },
  { href: '/simulator', label: 'Simulador (DGT)', icon: Car, bg: 'bg-orange-50', iconColor: 'text-orange-600' },
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
      <nav className={`sticky top-0 z-40 w-full transition-all duration-300 bg-white border-b border-gray-200 ${
        scrolled ? 'shadow-sm' : ''
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3 flex-shrink-0 group" aria-label="Espanol Hub - Ir a la página principal">
              <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center font-bold text-white text-lg border border-gray-800 group-hover:bg-gray-800 transition-all">
                <GraduationCap className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <div className="hidden sm:flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-extrabold text-gray-900">
                    Español
                  </span>
                  <span className="text-xl font-extrabold text-gray-900">
                    Hub
                  </span>
                </div>
                <span className="text-[9px] text-gray-600 font-medium -mt-1 italic leading-tight">
                  Tu centro inteligente para aprender español
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center flex-1 mx-8 overflow-x-auto">
              <div className="flex items-center justify-start gap-3 min-w-max">
                <Link
                  href="/nacionalidad"
                  className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border border-slate-200 whitespace-nowrap ${
                    pathname === '/nacionalidad' 
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm' 
                      : 'bg-white text-slate-800 hover:bg-slate-50 hover:shadow-sm'
                  }`}
                >
                  <Shield className={`w-5 h-5 flex-shrink-0 ${pathname === '/nacionalidad' ? 'text-white' : 'text-slate-700'}`} aria-hidden="true" />
                  <span>Nacionalidad ES</span>
                </Link>
                <Link
                  href="/driving-license"
                  className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border border-slate-200 whitespace-nowrap ${
                    pathname === '/driving-license' 
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm' 
                      : 'bg-white text-slate-800 hover:bg-slate-50 hover:shadow-sm'
                  }`}
                >
                  <Car className={`w-5 h-5 flex-shrink-0 ${pathname === '/driving-license' ? 'text-white' : 'text-slate-700'}`} aria-hidden="true" />
                  <span>Carnet de Conducir</span>
                </Link>
                <Link
                  href="/tramites"
                  className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border border-slate-200 whitespace-nowrap ${
                    pathname === '/tramites' 
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm' 
                      : 'bg-white text-slate-800 hover:bg-slate-50 hover:shadow-sm'
                  }`}
                >
                  <Download className={`w-5 h-5 flex-shrink-0 ${pathname === '/tramites' ? 'text-white' : 'text-slate-700'}`} aria-hidden="true" />
                  <span>Guías Legales</span>
                </Link>
                <Link
                  href="/gramatica"
                  className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border border-slate-200 whitespace-nowrap ${
                    pathname.startsWith('/gramatica')
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-white text-slate-800 hover:bg-slate-50 hover:shadow-sm'
                  }`}
                >
                  <GraduationCap className={`w-5 h-5 flex-shrink-0 ${pathname.startsWith('/gramatica') ? 'text-white' : 'text-slate-700'}`} aria-hidden="true" />
                  <span>Gramática</span>
                </Link>
                <Link
                  href="/vocabulario"
                  className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border border-slate-200 whitespace-nowrap ${
                    pathname.startsWith('/vocabulario')
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-white text-slate-800 hover:bg-slate-50 hover:shadow-sm'
                  }`}
                >
                  <Languages className={`w-5 h-5 flex-shrink-0 ${pathname.startsWith('/vocabulario') ? 'text-white' : 'text-slate-700'}`} aria-hidden="true" />
                  <span>Vocabulario</span>
                </Link>
                <Link
                  href="/lectura"
                  className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border border-slate-200 whitespace-nowrap ${
                    pathname.startsWith('/lectura')
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-white text-slate-800 hover:bg-slate-50 hover:shadow-sm'
                  }`}
                >
                  <Book className={`w-5 h-5 flex-shrink-0 ${pathname.startsWith('/lectura') ? 'text-white' : 'text-slate-700'}`} aria-hidden="true" />
                  <span>Lectura</span>
                </Link>
                <Link
                  href="/juegos"
                  className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border border-slate-200 whitespace-nowrap ${
                    pathname === '/juegos' 
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm' 
                      : 'bg-white text-slate-800 hover:bg-slate-50 hover:shadow-sm'
                  }`}
                >
                  <Gamepad2 className={`w-5 h-5 flex-shrink-0 ${pathname === '/juegos' ? 'text-white' : 'text-slate-700'}`} aria-hidden="true" />
                  <span>Juegos</span>
                </Link>
                <Link
                  href="/blog"
                  className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border border-slate-200 whitespace-nowrap ${
                    pathname.startsWith('/blog') 
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm' 
                      : 'bg-white text-slate-800 hover:bg-slate-50 hover:shadow-sm'
                  }`}
                >
                  <FileText className={`w-5 h-5 flex-shrink-0 ${pathname.startsWith('/blog') ? 'text-white' : 'text-slate-700'}`} aria-hidden="true" />
                  <span>Blog</span>
                </Link>
              </div>
            </div>

            {/* Settings Row - Elegant and Professional */}
            <div className="hidden md:flex items-center gap-2 flex-shrink-0">
              {mounted && isSignedIn && isAdmin && (
                <Link
                  href="/admin"
                  className={`group flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                    pathname === '/admin'
                      ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                      : 'bg-white text-gray-900 border-gray-200 hover:bg-gray-50 hover:shadow-sm hover:border-gray-300'
                  }`}
                  aria-label="Panel de Control"
                >
                  <Shield className={`w-6 h-6 ${pathname === '/admin' ? 'text-white' : 'text-gray-700'} transition-colors`} aria-hidden="true" />
                  <span className="hidden lg:inline">Panel de Control</span>
                  <span className="lg:hidden">Admin</span>
                  {pathname === '/admin' && (
                    <span className="ml-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-white/20 text-white">Admin</span>
                  )}
                </Link>
              )}

              <button
                onClick={() => setSearchOverlayOpen(true)}
                className="group relative flex items-center justify-center w-11 h-11 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-lg transition-all duration-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 active:scale-95"
                aria-label="Buscar"
              >
                <Search className="w-6 h-6 text-gray-700 group-hover:text-gray-900 transition-colors" aria-hidden="true" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-gray-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </button>

              {/* Clerk auth buttons - temporarily disabled */}
              {false && (
                <>
                  <SignedIn>
                    <div className="flex items-center gap-3">
                      <AdminNotificationBadge />
                      <UserButton 
                        appearance={{
                          elements: {
                            avatarBox: 'w-8 h-8',
                            userButtonPopoverCard: 'shadow-xl',
                            userButtonPopoverActionButton: 'text-[#0f172a] hover:bg-gray-50',
                          }
                        }}
                        afterSignOutUrl="/"
                      />
                      <span className="hidden lg:inline text-sm text-[#0f172a] font-medium">
                        {user?.firstName || (user?.primaryEmailAddress && user.primaryEmailAddress.emailAddress) || ''}
                      </span>
                    </div>
                  </SignedIn>
                  <SignedOut>
                    <div className="flex items-center gap-2">
                      <SignInButton mode="modal">
                        <button className="px-4 py-2 text-sm font-medium text-[#0f172a] hover:bg-gray-50 rounded-lg transition-colors">
                          Iniciar Sesión
                        </button>
                      </SignInButton>
                      <SignUpButton mode="modal">
                        <button className="px-4 py-2 text-sm font-semibold bg-[#1e40af] text-white rounded-lg hover:bg-[#1e3a8a] transition-colors">
                          Registrarse
                        </button>
                      </SignUpButton>
                    </div>
                  </SignedOut>
                </>
              )}
            </div>

            {/* Mobile Menu Button - Enhanced */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden group relative flex items-center justify-center w-10 h-10 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md transition-all duration-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
              aria-label={mobileMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-700 group-hover:text-gray-900 transition-colors" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700 group-hover:text-gray-900 transition-colors" aria-hidden="true" />
              )}
            </button>
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
                          ? 'bg-gray-900 text-white border-gray-900 shadow-lg' 
                          : 'bg-white text-gray-900 border-gray-200 hover:bg-gray-50 hover:shadow-md hover:border-gray-300'
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
                      <span className={`text-xs font-semibold text-center leading-tight line-clamp-2 ${isActive ? 'text-white' : 'text-gray-900'}`}>
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
