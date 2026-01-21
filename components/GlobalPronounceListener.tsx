'use client';

import { useEffect } from 'react';

export default function GlobalPronounceListener() {
  useEffect(() => {
    function handler(e: any) {
      try {
        // support either a string detail or an object: { text, rate? }
        const detail = e?.detail;
        const word = typeof detail === 'string' ? detail : detail?.text;
        const requestedRate = typeof detail === 'object' && detail?.rate ? Number(detail.rate) : undefined;
        if (!word) return;
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(word);
          utterance.lang = 'es-ES';
          // Default rate set to 0.8 (user requested slower, clearer speech)
          utterance.rate = requestedRate || 0.8;
          utterance.pitch = 1;
          window.speechSynthesis.cancel();
          window.speechSynthesis.speak(utterance);
        }
      } catch (err) {
        // ignore
      }
    }

    window.addEventListener('pronounce', handler as EventListener);
    return () => window.removeEventListener('pronounce', handler as EventListener);
  }, []);

  return null;
}

