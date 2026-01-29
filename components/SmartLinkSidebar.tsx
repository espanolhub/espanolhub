'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Star, Clock, Award, Lightbulb, TrendingUp, Target, X } from 'lucide-react';
import { useSmartNavigation } from '@/components/SmartNavigationProvider';

interface SmartLinkSidebarProps {
  className?: string;
  maxLinks?: number;
  showDismissButton?: boolean;
}

export default function SmartLinkSidebar({ 
  className = '', 
  maxLinks = 5,
  showDismissButton = true 
}: SmartLinkSidebarProps) {
  const { getSmartLinks, userProgress } = useSmartNavigation();
  const [links, setLinks] = useState<any[]>([]);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  useEffect(() => {
    const allLinks = getSmartLinks('', '');
    const sidebarLinks = allLinks.filter(link => link.appearance.position === 'sidebar');
    setLinks(sidebarLinks.slice(0, maxLinks));
  }, [getSmartLinks, maxLinks]);

  const dismissLink = (linkId: string) => {
    setDismissed(prev => new Set([...prev, linkId]));
    setLinks(prev => prev.filter(link => link.id !== linkId));
  };

  const getIcon = (linkType: string) => {
    switch (linkType) {
      case 'next-step': return <Target className="w-4 h-4" />;
      case 'progressive': return <TrendingUp className="w-4 h-4" />;
      case 'complementary': return <BookOpen className="w-4 h-4" />;
      case 'related': return <Star className="w-4 h-4" />;
      case 'contextual': return <Lightbulb className="w-4 h-4" />;
      default: return <ArrowRight className="w-4 h-4" />;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-50 border-red-200 text-red-800';
      case 'medium': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'low': return 'bg-green-50 border-green-200 text-green-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  if (links.length === 0) {
    return null;
  }

  return (
    <div className={`hidden lg:block ${className}`}>
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sticky top-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-yellow-500" />
            Contenido Recomendado
          </h3>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            Basado en tu progreso
          </span>
        </div>

        <div className="space-y-3">
          {links.map((link) => (
            <div key={link.id} className="relative group">
              <Link
                href={link.toPage}
                className={`block p-3 rounded-lg border transition-all duration-200 hover:shadow-md hover:scale-[1.02] ${getUrgencyColor(link.appearance.urgency)}`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {getIcon(link.linkType)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {link.title}
                    </h4>
                    <p className="text-xs opacity-75 mt-1 line-clamp-2">
                      {link.description}
                    </p>
                    {link.context && (
                      <p className="text-xs opacity-60 mt-1 italic">
                        💡 {link.context}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs opacity-60">
                        Prioridad: {link.priority}/10
                      </span>
                      {link.estimatedTime && (
                        <span className="text-xs opacity-60 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {link.estimatedTime}min
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
              
              {showDismissButton && (
                <button
                  onClick={() => dismissLink(link.id)}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-gray-200"
                  title="Ocultar recomendación"
                >
                  <X className="w-3 h-3 text-gray-500" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Estadísticas del usuario */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="text-xs text-gray-600 space-y-1">
            <div className="flex justify-between">
              <span>Progreso:</span>
              <span className="font-medium">{userProgress.completedPages.length} páginas</span>
            </div>
            <div className="flex justify-between">
              <span>Nivel:</span>
              <span className="font-medium capitalize">{userProgress.currentLevel}</span>
            </div>
            <div className="flex justify-between">
              <span>Intereses:</span>
              <span className="font-medium">{userProgress.interests.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente para el footer con enlaces inteligentes
export function SmartLinkFooter({ maxLinks = 3 }: { maxLinks?: number }) {
  const { getSmartLinks } = useSmartNavigation();
  const [links, setLinks] = useState<any[]>([]);

  useEffect(() => {
    const allLinks = getSmartLinks('', '');
    const bottomLinks = allLinks.filter(link => link.appearance.position === 'bottom');
    setLinks(bottomLinks.slice(0, maxLinks));
  }, [getSmartLinks, maxLinks]);

  if (links.length === 0) {
    return null;
  }

  return (
    <div className="border-t border-gray-200 bg-gray-50 py-8 mt-12">
      <div className="max-w-4xl mx-auto px-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-600" />
          Siguiente Paso en tu Aprendizaje
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {links.map((link) => (
            <Link
              key={link.id}
              href={link.toPage}
              className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all duration-200 group"
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {link.title}
                  </h4>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                    {link.description}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// Componente para enlaces flotantes
export function SmartFloatingLinks() {
  const { getSmartLinks } = useSmartNavigation();
  const [links, setLinks] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const allLinks = getSmartLinks('', '');
    const floatingLinks = allLinks.filter(link => link.appearance.position === 'floating');
    setLinks(floatingLinks);

    // Mostrar después de 30 segundos en la página
    const timer = setTimeout(() => {
      setVisible(true);
    }, 30000);

    return () => clearTimeout(timer);
  }, [getSmartLinks]);

  if (links.length === 0 || !visible) {
    return null;
  }

  const link = links[0]; // Solo mostrar un enlace flotante a la vez

  return (
    <div className="fixed bottom-4 right-4 max-w-sm z-50 animate-bounce">
      <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-semibold text-sm text-gray-800">💡 Sugerencia</h4>
          <button
            onClick={() => setVisible(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>
        <p className="text-xs text-gray-600 mb-3">{link.description}</p>
        <Link
          href={link.toPage}
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors"
        >
          Ver ahora
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
