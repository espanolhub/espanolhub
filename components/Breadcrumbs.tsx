'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
}

/**
 * Breadcrumbs Component with Schema Markup
 * SEO-optimized breadcrumb navigation
 */
export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  const pathname = usePathname();
  
  // Auto-generate breadcrumbs if not provided
  const breadcrumbItems = items || generateBreadcrumbsFromPath(pathname);
  
  if (breadcrumbItems.length === 0) return null;

  // Generate Schema.org BreadcrumbList JSON-LD
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.label,
      'item': `https://www.espanolhub.com${item.href}`,
    })),
  };

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className={`flex items-center gap-2 text-sm ${className}`}>
        <Link
          href="/"
          className="flex items-center gap-1 text-gray-600 hover:text-purple-600 transition-colors"
          aria-label="Ir a la página principal"
        >
          <Home className="w-4 h-4" />
          <span className="hidden sm:inline">Inicio</span>
        </Link>

        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          
          return (
            <div key={item.href} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-gray-400" aria-hidden="true" />
              {isLast ? (
                <span className="text-gray-900 font-medium" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </>
  );
}

/**
 * Generate breadcrumbs from pathname
 */
function generateBreadcrumbsFromPath(pathname: string): BreadcrumbItem[] {
  if (pathname === '/') return [];

  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];

  // Mapping for better labels
  const labelMap: Record<string, string> = {
    'blog': 'Blog',
    'gramatica': 'Gramática',
    'vocabulario': 'Vocabulario',
    'lectura': 'Lectura',
    'juegos': 'Juegos',
    'cursos': 'Cursos',
    'nacionalidad': 'Nacionalidad',
    'driving-license': 'Carnet de Conducir',
    'tramites': 'Trámites',
    'simulator': 'Simulador',
    'alfabeto': 'Alfabeto',
    'numeros': 'Números',
    'tablas': 'Tablas',
    'aprender-espanol-gratis': 'Aprender Español Gratis',
    'gramatica-espanola-completa': 'Gramática Completa',
    'vocabulario-espanol-por-temas': 'Vocabulario por Temas',
    'about': 'Acerca de',
    'contact': 'Contacto',
    'faq': 'FAQ',
    'pricing': 'Precios',
    'recursos': 'Recursos',
  };

  segments.forEach((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const label = labelMap[segment] || formatSegmentLabel(segment);
    breadcrumbs.push({ label, href });
  });

  return breadcrumbs;
}

/**
 * Format segment label (convert kebab-case to Title Case)
 */
function formatSegmentLabel(segment: string): string {
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
