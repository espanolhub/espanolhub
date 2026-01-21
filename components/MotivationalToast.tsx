'use client';

import { useEffect, useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { getRandomMotivationalMessage, type MotivationalMessage } from '@/lib/utils/motivationalMessages';
import { Cairo } from 'next/font/google';

const cairo = Cairo({
  variable: '--font-cairo',
  subsets: ['arabic', 'latin'],
  weight: ['400', '600', '700'],
});

export default function MotivationalToast() {
  const [message, setMessage] = useState<MotivationalMessage | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show first message after 2 minutes
    const firstTimeout = setTimeout(() => {
      showNewMessage();
    }, 2 * 60 * 1000); // 2 minutes

    // Then show messages every 3-5 minutes
    const interval = setInterval(() => {
      showNewMessage();
    }, (3 + Math.random() * 2) * 60 * 1000); // 3-5 minutes random

    return () => {
      clearTimeout(firstTimeout);
      clearInterval(interval);
    };
  }, []);

  const showNewMessage = () => {
    const newMessage = getRandomMotivationalMessage();
    setMessage(newMessage);
    setIsVisible(true);

    // Auto-hide after 5 seconds
    setTimeout(() => {
      setIsVisible(false);
    }, 5000);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!message || !isVisible) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-2xl p-4 max-w-sm animate-in slide-in-from-right fade-in duration-300 ${
        isVisible ? 'block' : 'hidden'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-base font-semibold mb-1">{message.spanish}</p>
          <p
            className={`text-sm opacity-90 ${cairo.variable}`}
            dir="rtl"
            style={{ fontFamily: 'var(--font-cairo), "Segoe UI", Tahoma, sans-serif' }}
          >
            {message.arabic}
          </p>
        </div>
        <button
          onClick={handleClose}
          className="flex-shrink-0 p-1 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Cerrar mensaje"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
