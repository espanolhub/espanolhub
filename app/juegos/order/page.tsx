'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function OrderGamePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/juegos?game=order');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-600"></div>
    </div>
  );
}
