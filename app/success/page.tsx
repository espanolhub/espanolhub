'use client';

import Link from 'next/link';
import { CheckCircle, Sparkles } from 'lucide-react';
import { useEffect } from 'react';

export default function SuccessPage() {
  useEffect(() => {
    // Page reload is not needed anymore
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
        <div className="mb-6">
          <div className="mx-auto flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <Sparkles className="w-8 h-8 text-blue-600 mx-auto mb-4" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          ¡Pago Exitoso!
        </h1>
        
        <p className="text-lg text-gray-600 mb-6">
          ¡Gracias por tu suscripción! Tu cuenta Premium está activa ahora.
        </p>
        
        <div className="space-y-3">
          <Link
            href="/dashboard"
            className="block w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            Ir al Dashboard
          </Link>
          
          <Link
            href="/"
            className="block w-full px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            Volver al Inicio
          </Link>
        </div>

        <p className="text-xs text-gray-400 mt-6">
          Si tienes alguna pregunta, contáctanos.
        </p>
      </div>
    </div>
  );
}
