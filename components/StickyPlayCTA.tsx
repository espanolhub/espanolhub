'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Gamepad2 } from 'lucide-react';

export default function StickyPlayCTA() {
  const pathname = usePathname();
  if (pathname === '/juegos') return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3 md:p-4 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="container mx-auto max-w-lg">
        <Link
          href="/juegos"
          className="flex items-center justify-center gap-3 w-full py-3.5 md:py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-bold text-base md:text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <Gamepad2 className="w-6 h-6 md:w-7 md:h-7" />
          <span>¡Juega Ahora!</span>
        </Link>
      </div>
    </div>
  );
}
