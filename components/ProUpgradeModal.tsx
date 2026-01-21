'use client';

import { Crown, X } from 'lucide-react';
import { Cairo } from 'next/font/google';
import React from 'react';
import { useUser, SignUpButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const cairo = Cairo({
  variable: '--font-cairo',
  subsets: ['arabic', 'latin'],
  weight: ['400', '600'],
});

import { useAdminSettings } from './AdminSettingsProvider';
import SubscriptionButton from './SubscriptionButton';

export default function ProUpgradeModal({
  open,
  onClose,
  onGetPro,
}: {
  open: boolean;
  onClose: () => void;
  onGetPro: () => void;
}) {
  // DISABLED - All content is free now
  return null;

  const handleGetPro = () => {
    if (!isSignedIn) {
      // Redirect to sign-up page
      router.push('/sign-up');
      return;
    }
    onGetPro();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div
        className={`relative w-full max-w-xl ${cairo.variable} bg-white/40 backdrop-blur-lg modern-card p-6 md:p-8 z-60`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pro-modal-title"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/30"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5 text-gray-800" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-full bg-yellow-100">
            <Crown className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <h2 id="pro-modal-title" className="text-xl md:text-2xl font-bold text-gray-900">
              Acceso Premium / الوصول الكامل
            </h2>
            <p className="text-sm text-gray-700 mt-1">
              Desbloquea todo y domina el curso de Carnet de Conducir. Precio: €{settings.global_price}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="p-3 bg-white/60 rounded-lg">
            <h4 className="font-semibold mb-2">Benefits / المزايا</h4>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>All 18 chapters unlocked — 18 فصل كامل</li>
              <li>Real DGT Exam Simulator — محاكي امتحان المرور الحقيقي</li>
              <li>PDF summaries for all lessons — ملخصات PDF لكل الدروس</li>
              <li>Support for citizenship exam preparation — دعم امتحانات الجنسية</li>
            </ul>
          </div>

          <div className="p-3 bg-white/60 rounded-lg">
            <h4 className="font-semibold mb-2">معلومة سريعة / Quick note</h4>
            <p className="text-sm text-gray-700">
              Obtén acceso completo y práctica ilimitada con simuladores de examen oficiales y materiales descargables.
            </p>
            <p className="text-sm mt-2" dir="rtl" style={{ fontFamily: 'var(--font-cairo)' }}>
              احصل على الوصول الكامل وممارسة غير محدودة مع محاكيات الامتحانات الرسمية ومواد قابلة للتنزيل.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-end">
          {!isSignedIn && (
            <div className="text-xs text-gray-600 italic mb-1 sm:mb-0">(Necesitas iniciar sesión para continuar)</div>
          )}
          {isSignedIn && (
            <div className="text-xs text-gray-600 italic mb-1 sm:mb-0">(Modo de prueba: Haz clic para desbloquear todo instantáneamente)</div>
          )}
          <div className="w-full sm:w-auto">
            <SubscriptionButton />
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-3 rounded-lg bg-white border text-gray-700 text-sm"
          >
            Quizás más tarde / ربما لاحقاً
          </button>
        </div>
      </div>
    </div>
  );
}
