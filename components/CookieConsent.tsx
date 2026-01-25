'use client';

import { useEffect, useState } from 'react';

export default function CookieConsent() {
  const [clientMounted, setClientMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setClientMounted(true);
      const consent = localStorage.getItem('cookie-consent');
      if (!consent) {
        localStorage.setItem('cookie-consent', 'essential');
      }
    }
  }, []);

  if (!clientMounted) return null;
  return null;
}
