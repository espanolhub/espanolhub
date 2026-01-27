'use client';

import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export default function PracticeCTA() {
  return (
    <Link
      href="/juegos"
      className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold text-base md:text-lg rounded-xl shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-purple-800 transition-all transform hover:scale-105"
      aria-label="Ir a Juegos educativos"
    >
      <BookOpen className="w-5 h-5 md:w-6 md:h-6" />
      <span>Jugar y practicar — Ir a Juegos</span>
    </Link>
  );
}
