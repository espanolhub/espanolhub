'use client';

// TEMPORARILY DISABLED - PayPal API not ready yet
// تم التعطيل مؤقتاً - PayPal API غير جاهز بعد

export default function SubscriptionButton() {
  return (
    <div className="w-full">
      <button
        disabled
        className="w-full px-8 py-4 bg-gray-300 text-gray-600 rounded-xl font-bold text-lg cursor-not-allowed opacity-60"
      >
        Próximamente / قريباً
      </button>
      <p className="text-center text-sm text-white/80 mt-2">
        Todo el contenido es gratis por ahora / كل المحتوى مجاني الآن
      </p>
    </div>
  );
}
