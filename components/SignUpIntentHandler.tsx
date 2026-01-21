'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function SignUpIntentHandler() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const [handled, setHandled] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;
    if (handled) return;
    try {
      const intent = localStorage.getItem('postSignUpIntent');
      if (isSignedIn && intent === 'subscribe') {
        // clear intent and trigger checkout
        localStorage.removeItem('postSignUpIntent');
        (async () => {
          try {
            const res = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ amount: '9.99' }) });
            const data = await res.json();
            if (data?.url) {
              window.location.href = data.url;
            } else {
              // fallback: go to pricing
              router.push('/pricing');
            }
          } catch (e) {
            router.push('/pricing');
          }
        })();
        setHandled(true);
      }
    } catch (e) {}
  }, [isSignedIn, isLoaded, handled, router]);

  return null;
}

