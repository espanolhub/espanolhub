'use client';

import { CheckCircle, Gift, Mail } from 'lucide-react';
import Link from 'next/link';

export default function ThankYouPage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="w-full max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 rounded-full p-4">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
          </div>

          {/* Main Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            ¡Gracias!
          </h1>
          
          <div className="mb-6">
            <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <p className="text-lg md:text-xl text-gray-700 mb-2">
              Revisa tu correo electrónico para descargar la guía PDF.
            </p>
            <p className="text-base text-gray-600">
              Check your email for the PDF
            </p>
          </div>

          {/* Discount Offer */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 md:p-8 mb-8 text-white">
            <div className="flex justify-center mb-4">
              <Gift className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              ¡Oferta Especial!
            </h2>
            <p className="text-lg md:text-xl mb-4">
              Y por cierto, aquí tienes un <strong className="text-white">50% de descuento</strong> en nuestro curso premium de español!
            </p>
            <p className="text-base md:text-lg opacity-90 mb-6">
              And by the way, here is a <strong className="text-white">50% discount</strong> on our premium Spanish course!
            </p>
            
            {/* CTA Button */}
            <Link
              href="/"
              className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            >
              Aprovechar Oferta
            </Link>
          </div>

          {/* Back to Home */}
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
