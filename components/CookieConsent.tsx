'use client';

import { useState, useEffect } from 'react';
import { Cookie, X, Settings } from 'lucide-react';
import Link from 'next/link';
import { Cairo } from 'next/font/google';

const cairo = Cairo({
  variable: '--font-cairo',
  subsets: ['arabic', 'latin'],
  weight: ['400', '600', '700'],
});

type CookieCategory = 'necessary' | 'analytics' | 'functional';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  functional: boolean;
}

const COOKIE_CONSENT_KEY = 'cookie-consent';
const COOKIE_PREFERENCES_KEY = 'cookie-preferences';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [clientMounted, setClientMounted] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always enabled
    analytics: false,
    functional: false,
  });

  useEffect(() => {
    // Check if user has already given consent
    if (typeof window === 'undefined') return;
    
    // mark client mounted for hydration-safe rendering
    setClientMounted(true);
    
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY);
    
    if (!consent) {
      // Show banner if no consent given
      setShowBanner(true);
    } else if (savedPreferences) {
      // Load saved preferences
      try {
        const prefs = JSON.parse(savedPreferences);
        setPreferences(prefs);
        applyCookiePreferences(prefs);
      } catch (e) {
        console.error('Error loading cookie preferences:', e);
      }
    }
  }, []);

  const applyCookiePreferences = (prefs: CookiePreferences) => {
    // Apply analytics cookies if enabled
    if (prefs.analytics && process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
      // Analytics will be initialized if enabled
      const script = document.createElement('script');
      script.textContent = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
          page_path: window.location.pathname,
        });
      `;
      document.head.appendChild(script);
      
      const gaScript = document.createElement('script');
      gaScript.async = true;
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`;
      document.head.appendChild(gaScript);
    }
  };

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      functional: true,
    };
    
    setPreferences(allAccepted);
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(allAccepted));
    applyCookiePreferences(allAccepted);
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      analytics: false,
      functional: false,
    };
    
    setPreferences(onlyNecessary);
    localStorage.setItem(COOKIE_CONSENT_KEY, 'rejected');
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(onlyNecessary));
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'custom');
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(preferences));
    applyCookiePreferences(preferences);
    setShowBanner(false);
    setShowSettings(false);
  };

  const toggleCategory = (category: CookieCategory) => {
    if (category === 'necessary') return; // Cannot disable necessary cookies
    
    setPreferences(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Prevent hydration mismatch: don't render client-only UI until mounted
  if (!clientMounted) return null;

  if (!showBanner && !showSettings) {
    // Show settings button if consent was given
    const consent = typeof window !== 'undefined' ? localStorage.getItem(COOKIE_CONSENT_KEY) : null;
    if (consent) {
      return (
        <button
          onClick={() => setShowSettings(true)}
          className="fixed bottom-4 left-4 z-50 p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition-colors"
          aria-label="Cookie Settings"
        >
          <Settings className="w-5 h-5" />
        </button>
      );
    }
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {showSettings ? (
          // Settings Panel
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Cookie className="w-6 h-6" />
                Configuración de Cookies
              </h3>
              <button
                onClick={() => {
                  setShowSettings(false);
                  if (!localStorage.getItem(COOKIE_CONSENT_KEY)) {
                    setShowBanner(true);
                  }
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close settings"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-gray-600 text-sm">
              Puedes gestionar tus preferencias de cookies. Las cookies necesarias siempre están activas.
            </p>

            {/* Necessary Cookies */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-gray-800">Cookies Necesarias</h4>
                  <p className="text-sm text-gray-600">Siempre activas. Requeridas para el funcionamiento del sitio.</p>
                </div>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Siempre activas
                </div>
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">Cookies Analíticas</h4>
                  <p className="text-sm text-gray-600">
                    Nos ayudan a entender cómo los visitantes interactúan con el sitio (Google Analytics).
                  </p>
                </div>
                <button
                  onClick={() => toggleCategory('analytics')}
                  className={`ml-4 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    preferences.analytics ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                  role="switch"
                  aria-checked={preferences.analytics}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      preferences.analytics ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Functional Cookies */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">Cookies Funcionales</h4>
                  <p className="text-sm text-gray-600">
                    Permiten recordar tus preferencias y mejorar tu experiencia.
                  </p>
                </div>
                <button
                  onClick={() => toggleCategory('functional')}
                  className={`ml-4 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    preferences.functional ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                  role="switch"
                  aria-checked={preferences.functional}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      preferences.functional ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={handleSavePreferences}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Guardar Preferencias
              </button>
              <Link
                href="/privacy"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Más Información
              </Link>
            </div>
          </div>
        ) : (
          // Consent Banner
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Cookie className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Utilizamos Cookies
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  Utilizamos cookies para mejorar tu experiencia, analizar el tráfico del sitio y personalizar el contenido.
                  Al hacer clic en "Aceptar todo", aceptas nuestro uso de cookies.
                </p>
                <p className={`text-gray-600 text-xs ${cairo.variable}`} dir="rtl" style={{ fontFamily: 'var(--font-cairo), "Segoe UI", Tahoma, sans-serif' }}>
                  (نستخدم ملفات تعريف الارتباط لتحسين تجربتك وتحليل حركة المرور على الموقع وتخصيص المحتوى)
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Link
                    href="/privacy"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium underline"
                  >
                    Política de Privacidad
                  </Link>
                  <span className="text-gray-400">•</span>
                  <button
                    onClick={() => {
                      setShowBanner(false);
                      setShowSettings(true);
                    }}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium underline"
                  >
                    Configurar Cookies
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleAcceptAll}
                className="flex-1 min-w-[120px] px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Aceptar Todo
              </button>
              <button
                onClick={handleRejectAll}
                className="flex-1 min-w-[120px] px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Rechazar Todo
              </button>
              <button
                onClick={() => {
                  setShowBanner(false);
                  setShowSettings(true);
                }}
                className="flex-1 min-w-[120px] px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Personalizar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
