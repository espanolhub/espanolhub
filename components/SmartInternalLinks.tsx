'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen, Gamepad2, GraduationCap, Languages, Book } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { INTERNAL_LINKING } from '@/lib/config/seo-config';

interface InternalLink {
  url: string;
  anchor: string;
  icon?: React.ReactNode;
}

interface SmartInternalLinksProps {
  title?: string;
  className?: string;
  maxLinks?: number;
}

/**
 * Smart Internal Links Component
 * Automatically displays related internal links based on current page
 * SEO-optimized for link equity distribution
 */
export default function SmartInternalLinks({
  title = "Recursos Relacionados",
  className = "",
  maxLinks = 4,
}: SmartInternalLinksProps) {
  const pathname = usePathname();
  
  // Get related links from config
  const relatedLinks = getRelatedLinks(pathname, maxLinks);
  
  if (relatedLinks.length === 0) return null;

  return (
    <section className={`py-8 ${className}`}>
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 md:p-8 border border-purple-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-purple-600" />
          {title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {relatedLinks.map((link) => (
            <Link
              key={link.url}
              href={link.url}
              className="group flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-purple-300 hover:shadow-lg transition-all"
            >
              {link.icon && (
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white">
                  {link.icon}
                </div>
              )}
              <div className="flex-1">
                <span className="text-gray-900 font-semibold group-hover:text-purple-600 transition-colors">
                  {link.anchor}
                </span>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Get related links for current page
 */
function getRelatedLinks(pathname: string, maxLinks: number): InternalLink[] {
  // Get links from config
  const configLinks = INTERNAL_LINKING[pathname as keyof typeof INTERNAL_LINKING] || [];
  
  // Add icons based on URL patterns
  const linksWithIcons = configLinks.map(link => ({
    ...link,
    icon: getIconForUrl(link.url),
  }));
  
  // Fallback: suggest popular pages if no specific config
  if (linksWithIcons.length === 0) {
    return getDefaultLinks(pathname, maxLinks);
  }
  
  return linksWithIcons.slice(0, maxLinks);
}

/**
 * Get icon for URL
 */
function getIconForUrl(url: string): React.ReactNode {
  if (url.includes('gramatica')) return <GraduationCap className="w-6 h-6" />;
  if (url.includes('vocabulario')) return <Languages className="w-6 h-6" />;
  if (url.includes('juegos')) return <Gamepad2 className="w-6 h-6" />;
  if (url.includes('lectura') || url.includes('blog')) return <Book className="w-6 h-6" />;
  return <BookOpen className="w-6 h-6" />;
}

/**
 * Get default popular links as fallback
 */
function getDefaultLinks(currentPath: string, maxLinks: number): InternalLink[] {
  const defaultLinks: InternalLink[] = [
    {
      url: '/aprender-espanol-gratis',
      anchor: 'Aprende Español GRATIS',
      icon: <BookOpen className="w-6 h-6" />,
    },
    {
      url: '/gramatica-espanola-completa',
      anchor: 'Gramática Española Completa',
      icon: <GraduationCap className="w-6 h-6" />,
    },
    {
      url: '/vocabulario',
      anchor: 'Vocabulario por Temas',
      icon: <Languages className="w-6 h-6" />,
    },
    {
      url: '/juegos',
      anchor: 'Juegos Educativos',
      icon: <Gamepad2 className="w-6 h-6" />,
    },
    {
      url: '/blog',
      anchor: 'Blog - Consejos y Guías',
      icon: <Book className="w-6 h-6" />,
    },
  ];
  
  // Filter out current page
  return defaultLinks
    .filter(link => link.url !== currentPath)
    .slice(0, maxLinks);
}
