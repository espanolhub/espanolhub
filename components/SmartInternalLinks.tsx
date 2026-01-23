'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen, Gamepad2, GraduationCap } from 'lucide-react';
import { INTERNAL_LINKING } from '@/lib/config/seo-config';

interface SmartInternalLinksProps {
  currentPath: string;
  maxLinks?: number;
  showTitle?: boolean;
}

const iconMap: Record<string, React.ReactNode> = {
  '/gramatica-espanola-completa': <BookOpen className="w-5 h-5" />,
  '/vocabulario-espanol-por-temas': <BookOpen className="w-5 h-5" />,
  '/juegos': <Gamepad2 className="w-5 h-5" />,
  '/lectura': <GraduationCap className="w-5 h-5" />,
};

export default function SmartInternalLinks({
  currentPath,
  maxLinks = 5,
  showTitle = true,
}: SmartInternalLinksProps) {
  // Get related links for current path
  const relatedLinks = INTERNAL_LINKING[currentPath as keyof typeof INTERNAL_LINKING] || [];

  // If no specific links, show general recommendations
  const defaultLinks = [
    { url: '/aprender-espanol-gratis', anchor: 'Aprende Español GRATIS' },
    { url: '/gramatica-espanola-completa', anchor: 'Gramática Completa' },
    { url: '/vocabulario-espanol-por-temas', anchor: 'Vocabulario por Temas' },
    { url: '/juegos', anchor: 'Juegos Educativos' },
    { url: '/lectura', anchor: 'Lecturas en Español' },
  ];

  const linksToShow = relatedLinks.length > 0 
    ? relatedLinks.slice(0, maxLinks)
    : defaultLinks.slice(0, maxLinks);

  if (linksToShow.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      {showTitle && (
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Continúa Aprendiendo
        </h3>
      )}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {linksToShow.map((link, index) => (
          <Link
            key={index}
            href={link.url}
            className="group flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all"
          >
            <div className="text-blue-600 group-hover:text-blue-700">
              {iconMap[link.url] || <ArrowRight className="w-5 h-5" />}
            </div>
            <div className="flex-1">
              <span className="text-gray-900 font-semibold group-hover:text-blue-600 transition-colors">
                {link.anchor}
              </span>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
}
