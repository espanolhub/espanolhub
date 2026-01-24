'use client';

import { useState } from 'react';

export default function SubscriptionButton({ 
  planId = 'premium-monthly',
  amount = '9.99',
  disabled = false 
}: { 
  planId?: string; 
  amount?: string;
  disabled?: boolean;
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
      <div className="w-full rounded-xl bg-white/10 backdrop-blur-sm px-6 py-4 text-center">
        <p className="text-white font-semibold">
          Todo el contenido es gratis actualmente
        </p>
        <p className="text-sm text-white/80 mt-1" dir="rtl" style={{ fontFamily: 'var(--font-cairo, inherit)' }}>
          كل المحتوى مجاني الآن
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <button
        onClick={handleSubscribe}
        disabled={loading}
        className="w-full px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
            Procesando...
          </span>
        ) : (
          'Comenzar Ahora'
        )}
      </button>
      <p className="text-center text-sm text-white/80 mt-2">
        🔒 Pago seguro • ❌ Cancela cuando quieras
      </p>
    </div>
  );
}
