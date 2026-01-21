'use client';

import { useEffect } from 'react';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import { Cairo } from 'next/font/google';

const cairo = Cairo({
  variable: '--font-cairo',
  subsets: ['arabic', 'latin'],
  weight: ['400', '600', '700'],
});

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    if (typeof window !== 'undefined') {
      const { logError } = require('@/lib/utils/errorTracking');
      logError(error, {
        digest: error.digest,
        component: 'GlobalErrorBoundary',
      });
    }
  }, [error]);

  return (
    <html lang="es">
      <body className={`${cairo.variable} antialiased`}>
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center py-12 px-4">
          <div className="text-center max-w-2xl mx-auto">
            {/* Error Icon */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full">
                <AlertTriangle className="w-10 h-10 text-red-600" />
              </div>
            </div>

            {/* Message */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Error Crítico
              </h1>
              <p className={`text-xl text-gray-600 mb-2 ${cairo.variable}`} dir="rtl" style={{ fontFamily: 'var(--font-cairo), "Segoe UI", Tahoma, sans-serif' }}>
                خطأ حرج
              </p>
              <p className="text-lg text-gray-500 mb-4">
                Ha ocurrido un error crítico en la aplicación. Por favor, recarga la página o contacta al soporte si el problema persiste.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
              >
                <RefreshCw className="w-5 h-5" />
                <span>Recargar Página</span>
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
