'use client';

import { useState } from 'react';

export default function SubscriptionButton({ 
  planId = 'premium-monthly',
  amount = '9.99',
  disabled = false,
  noteTextClassName = 'text-gray-600',
}: { 
  planId?: string; 
  amount?: string;
  disabled?: boolean;
  noteTextClassName?: string;
}) {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    
    try {
      // التحقق من تسجيل الدخول
      const authRes = await fetch('/api/auth/me', {
        credentials: 'include',
        cache: 'no-store',
      });
      const authData = await authRes.json();

      if (!authData.authenticated) {
        // إعادة توجيه لصفحة التسجيل مع إعادة التوجيه إلى صفحة التسعير
        window.location.href = '/register?redirect=/pricing';
        return;
      }

      // إنشاء جلسة دفع
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ planId, amount }),
      });

      const data = await res.json();

      if (data.error) {
        alert(data.error);
        setLoading(false);
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Subscription error:', error);
      alert('Error al procesar. Intenta de nuevo.');
      setLoading(false);
    }
  };

  // Sin botón de suscripción cuando los pagos están desactivados
  if (disabled) {
    return (
      <div className="w-full rounded-xl bg-gray-50 border border-gray-200 px-6 py-4 text-center">
        <p className="text-gray-900 font-semibold">
          Todo el contenido es gratis actualmente
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <button
        onClick={handleSubscribe}
        disabled={loading}
        className="w-full btn btn-primary px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Procesando...
          </span>
        ) : (
          'Comenzar Ahora'
        )}
      </button>
      <p className={`text-center text-sm mt-2 ${noteTextClassName}`}>
        Pago seguro • Cancela cuando quieras
      </p>
    </div>
  );
}
