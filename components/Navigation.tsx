'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
// Clerk hooks removed to avoid SSR issues - Navigation works without auth
// import { UserButton, SignInButton, SignUpButton, useUser, useAuth, SignedIn, SignedOut } from '@clerk/nextjs';
import { BookOpen, Gamepad2, GraduationCap, Book, Languages, X, Menu, Shield, Award, Search, ChevronDown, Download, Car, FileText, Star } from 'lucide-react';
import SearchOverlay from './SearchOverlay';
// AdminNotificationBadge removed - Navigation works without Clerk hooks
// import AdminNotificationBadge from './AdminNotificationBadge';

const aprenderDropdown = {
  label: 'Aprender',
  icon: BookOpen,
  subtitle: 'Elige tu Lección',
  children: [
    { href: '/gramatica-espanola-completa', label: 'Gramática — Fundamentos', icon: GraduationCap },
    { href: '/gramatica', label: 'Gramática', icon: GraduationCap },
    { href: '/vocabulario', label: 'Vocabulario', icon: Languages },
    { href: '/lectura', label: 'Lectura', icon: Book },
  ],
};

const practicarDropdown = {
  label: 'Practicar',
  icon: Gamepad2,
  children: [
    { href: '/juegos', label: 'Juegos', icon: Gamepad2 },
    { href: '/simulator', label: 'Simulador (DGT)', icon: Car },
  ],
};

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
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const courseRef = useRef<HTMLDivElement>(null);
  
  // Clerk hooks removed to avoid SSR/prerendering issues
  // Admin link is hidden - users can access /admin directly if they have access
  const isSignedIn = false;
  const user = null;
  const isAdmin = false;
  
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);

  const handleOpenDropdown = (key: string) => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setDropdownOpen(key);
  };

  const handleCloseDropdownDebounced = (delay = 150) => {
    if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = window.setTimeout(() => {
      setDropdownOpen(null);
      closeTimeoutRef.current = null;
    }, delay);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const t = event.target as Node;
      if (courseRef.current?.contains(t)) return;
      setDropdownOpen(null);
    };
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

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

            <div className="hidden md:flex items-center justify-between flex-1 max-w-4xl mx-8">
              <div className="flex items-center gap-2">
                <Link
                  href="/nacionalidad"
                  className={`group flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 border ${
                    pathname === '/nacionalidad' 
                      ? 'bg-gray-900 text-white border-gray-900' 
                      : 'bg-white text-gray-900 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <Shield className="w-4 h-4" />
                  <span>Nacionalidad ES</span>
                </Link>
                <Link
                  href="/driving-license"
                  className={`group flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 border ${
                    pathname === '/driving-license' 
                      ? 'bg-gray-900 text-white border-gray-900' 
                      : 'bg-white text-gray-900 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <Car className="w-4 h-4" />
                  <span>Carnet de Conducir</span>
                </Link>
                <Link
                  href="/tramites"
                  className={`group flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 border ${
                    pathname === '/tramites' 
                      ? 'bg-gray-900 text-white border-gray-900' 
                      : 'bg-white text-gray-900 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <Download className="w-4 h-4" />
                  <span>Guías Legales</span>
                </Link>
                <Link
                  href="/juegos"
                  className={`group flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 border ${
                    pathname === '/juegos' 
                      ? 'bg-gray-900 text-white border-gray-900' 
                      : 'bg-white text-gray-900 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <Gamepad2 className="w-4 h-4" />
                  <span>Juegos</span>
                </Link>
                <Link
                  href="/blog"
                  className={`group flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 border ${
                    pathname.startsWith('/blog') 
                      ? 'bg-gray-900 text-white border-gray-900' 
                      : 'bg-white text-gray-900 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Blog</span>
                </Link>

                <div 
                  ref={courseRef} 
                  className="relative group"
                  onMouseEnter={() => handleOpenDropdown('curso')}
                  onMouseLeave={() => handleCloseDropdownDebounced(200)}
                >
                  <button
                    onClick={() => setDropdownOpen(dropdownOpen === 'curso' ? null : 'curso')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 focus:outline-none border ${
                      dropdownOpen === 'curso' || pathname.startsWith('/cursos') || pathname.startsWith('/gramatica') || pathname.startsWith('/vocabulario') || pathname.startsWith('/lectura')
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white text-gray-900 border-gray-200 hover:bg-gray-50'
                    }`}
                    aria-expanded={dropdownOpen === 'curso'}
                  >
                    <BookOpen className="w-4 h-4" />
                    <div className="flex flex-col leading-tight text-left">
                      <span className="text-sm font-semibold">Curso de Español</span>
                      <span className={`text-xs font-medium ${dropdownOpen === 'curso' || pathname.startsWith('/cursos') || pathname.startsWith('/gramatica') || pathname.startsWith('/vocabulario') || pathname.startsWith('/lectura') ? 'text-gray-300' : 'text-gray-600'}`}>
                        {aprenderDropdown.subtitle}
                      </span>
                    </div>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen === 'curso' ? 'rotate-180' : ''}`} />
                  </button>
                  <div
                    className={`absolute top-full left-0 mt-2 w-60 rounded-lg shadow-lg border border-gray-200 bg-white overflow-hidden z-50 ${dropdownOpen === 'curso' ? 'block' : 'hidden group-hover:block'}`}
                    onMouseEnter={() => handleOpenDropdown('curso')}
                    onMouseLeave={() => handleCloseDropdownDebounced(200)}
                  >
                    <div className="absolute -top-3 left-0 right-0 h-3 pointer-events-auto" />
                    <div className="bg-gray-50 border-b border-gray-200 px-4 py-3">
                      <div className="text-gray-900 font-bold text-sm">Elige tu Lección</div>
                    </div>
                    <div className="p-2">
                      {aprenderDropdown.children.map((child) => {
                        const ChildIcon = child.icon;
                        const isChildActive = pathname === child.href;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setDropdownOpen(null)}
                            className={`group flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                              isChildActive 
                                ? 'bg-gray-100 text-gray-900' 
                                : 'text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            <div className={`rounded-lg p-2 ${isChildActive ? 'bg-gray-200' : 'bg-gray-100 group-hover:bg-gray-200'}`}>
                              <ChildIcon className={`w-4 h-4 ${isChildActive ? 'text-gray-900' : 'text-gray-700'}`} />
                            </div>
                            <span>{child.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-1 flex-shrink-0">
              {mounted && isSignedIn && isAdmin && (
                <Link
                  href="/admin"
                  className={`flex items-center space-x-1 px-2.5 md:px-3 py-1.5 md:py-2 rounded-lg text-sm transition-colors border-2 border-yellow-300 ${isAdmin ? 'ring-2 ring-yellow-100' : ''} ${
                    pathname === '/admin'
                      ? 'bg-yellow-50 text-[#0f172a] border-yellow-400'
                      : 'bg-white text-[#0f172a] border-yellow-300 hover:bg-yellow-50'
                  }`}
                  aria-label="Panel de Control"
                >
                  <Shield className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span className="hidden lg:inline">Panel de Control</span>
                  <span className="lg:hidden">Admin</span>
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-50 text-yellow-800">Admin</span>
                </Link>
              )}

              <button
                onClick={() => setSearchOverlayOpen(true)}
                className="ml-2 flex items-center justify-center w-9 h-9 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-all duration-200 text-gray-900"
                aria-label="Buscar"
              >
                <Search className="w-5 h-5" />
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

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-900 hover:bg-gray-100 border border-gray-200"
              aria-label={mobileMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 pt-5 pb-6 px-2">
              <div className="grid grid-cols-2 gap-3">
                {mobileMenuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 p-4 rounded-lg border transition-all active:scale-[0.98] min-h-[56px] ${
                        isActive ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-900 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className={`flex-shrink-0 w-11 h-11 rounded-lg flex items-center justify-center ${isActive ? 'bg-gray-800' : 'bg-gray-100'}`}>
                        <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-700'}`} />
                      </div>
                      <span className={`text-sm font-semibold truncate ${isActive ? 'text-white' : 'text-gray-900'}`}>{item.label}</span>
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
