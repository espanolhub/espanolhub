'use client';

import Link from 'next/link';
import { XCircle, ArrowLeft } from 'lucide-react';

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
        <div className="mb-6">
          <div className="mx-auto flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
            <XCircle className="w-12 h-12 text-gray-400" />
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Pago Cancelado / تم إلغاء الدفع
        </h1>
        
        <p className="text-lg text-gray-600 mb-6">
          El proceso de pago fue cancelado. No se realizó ningún cargo.
        </p>
        
        <p className="text-sm text-gray-500 mb-8" dir="rtl" style={{ fontFamily: 'var(--font-cairo)' }}>
          تم إلغاء عملية الدفع. لم يتم خصم أي مبلغ.
        </p>

        <div className="space-y-3">
          <Link
            href="/pricing"
            className="block w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Intentar de Nuevo / حاول مرة أخرى
          </Link>
          
          <Link
            href="/"
            className="block w-full px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            Volver al Inicio / العودة للصفحة الرئيسية
          </Link>
        </div>

        <p className="text-xs text-gray-400 mt-6">
          Si necesitas ayuda, contáctanos.
        </p>
      </div>
    </div>
  );
}
