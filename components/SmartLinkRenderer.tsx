'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Star, Clock, Award, Lightbulb, TrendingUp, Target } from 'lucide-react';
import { smartLinkingEngine, type SmartLink, type PageContext } from '@/lib/smart-linking-system';

interface SmartLinkRendererProps {
  currentPage: string;
  userProgress?: {
    completedPages: string[];
    currentLevel: 'beginner' | 'intermediate' | 'advanced';
    timeSpent: Record<string, number>;
    scores: Record<string, number>;
    interests: string[];
    lastVisited: string[];
  };
  content?: string;
  className?: string;
}

export default function SmartLinkRenderer({ 
  currentPage, 
  userProgress, 
  content, 
  className = '' 
}: SmartLinkRendererProps) {
  const [smartLinks, setSmartLinks] = useState<SmartLink[]>([]);
  const [nextStep, setNextStep] = useState<SmartLink | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [dismissedLinks, setDismissedLinks] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!userProgress) return;

    const context: PageContext = {
      currentPage,
      userProgress,
      contentAnalysis: {
        topics: [],
        difficulty: userProgress.currentLevel,
        category: 'general',
        tags: [],
        prerequisites: []
      }
    };

    // Obtener enlaces inteligentes
    const links = smartLinkingEngine.getSmartLinks(context);
    
    // Generar enlaces contextuales si hay contenido
    if (content) {
      const contextualLinks = smartLinkingEngine.generateContextualLinks(content, currentPage);
      links.push(...contextualLinks);
    }

    // Generar enlaces basados en intereses
    if (userProgress.interests.length > 0) {
      const interestLinks = smartLinkingEngine.generateInterestBasedLinks(
        userProgress.interests, 
        currentPage
      );
      links.push(...interestLinks);
    }

    // Calcular siguiente paso
    const calculatedNextStep = smartLinkingEngine.calculateNextStep(userProgress);
    if (calculatedNextStep) {
      setNextStep(calculatedNextStep);
    }

    // Filtrar enlaces descartados
    const filteredLinks = links.filter(link => !dismissedLinks.has(link.id));
    setSmartLinks(filteredLinks);
  }, [currentPage, userProgress, content, dismissedLinks]);

  const dismissLink = (linkId: string) => {
    setDismissedLinks(prev => new Set([...prev, linkId]));
  };

  const renderLink = (link: SmartLink) => {
    const getIcon = () => {
      switch (link.linkType) {
        case 'next-step': return <Target className="w-4 h-4" />;
        case 'progressive': return <TrendingUp className="w-4 h-4" />;
        case 'complementary': return <BookOpen className="w-4 h-4" />;
        case 'related': return <Star className="w-4 h-4" />;
        case 'contextual': return <Lightbulb className="w-4 h-4" />;
        default: return <ArrowRight className="w-4 h-4" />;
      }
    };

    const getUrgencyColor = () => {
      switch (link.appearance.urgency) {
        case 'high': return 'bg-red-50 border-red-200 text-red-800';
        case 'medium': return 'bg-blue-50 border-blue-200 text-blue-800';
        case 'low': return 'bg-gray-50 border-gray-200 text-gray-700';
        default: return 'bg-gray-50 border-gray-200 text-gray-700';
      }
    };

    const getStyleClass = () => {
      switch (link.appearance.style) {
        case 'next-lesson': return 'bg-gradient-to-r from-blue-500 to-purple-600 text-white';
        case 'recommendation': return 'bg-purple-50 border-purple-200 text-purple-800';
        case 'suggestion': return 'bg-green-50 border-green-200 text-green-800';
        default: return 'bg-gray-50 border-gray-200 text-gray-700';
      }
    };

    const linkContent = (
      <div className={`flex items-center gap-3 p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${getStyleClass()}`}>
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-sm">{link.title}</h4>
          <p className="text-xs opacity-90 mt-1">{link.description}</p>
          {link.context && (
            <p className="text-xs opacity-75 mt-1 italic">💡 {link.context}</p>
          )}
        </div>
        <div className="flex-shrink-0">
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    );

    return (
      <div key={link.id} className="relative group">
        {link.appearance.position === 'inline' && (
          <Link href={link.toPage} className="block">
            {linkContent}
          </Link>
        )}
        
        {link.appearance.position === 'sidebar' && (
          <div className="mb-3">
            <Link href={link.toPage} className="block">
              {linkContent}
            </Link>
          </div>
        )}
        
        {link.appearance.position === 'bottom' && (
          <div className="mt-6">
            <Link href={link.toPage} className="block">
              {linkContent}
            </Link>
          </div>
        )}
        
        {link.appearance.position === 'floating' && (
          <div className="fixed bottom-4 right-4 max-w-sm z-50">
            <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-sm">{link.title}</h4>
                <button
                  onClick={() => dismissLink(link.id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              <p className="text-xs text-gray-600 mb-3">{link.description}</p>
              <Link
                href={link.toPage}
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700"
              >
                Ver ahora
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        )}
        
        {link.appearance.position === 'modal' && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold">{link.title}</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              <p className="text-gray-600 mb-4">{link.description}</p>
              <div className="flex gap-3">
                <Link
                  href={link.toPage}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-700"
                >
                  Ir ahora
                </Link>
                <button
                  onClick={() => dismissLink(link.id)}
                  className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
                >
                  Más tarde
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Renderizar enlaces por posición
  const inlineLinks = smartLinks.filter(link => link.appearance.position === 'inline');
  const sidebarLinks = smartLinks.filter(link => link.appearance.position === 'sidebar');
  const bottomLinks = smartLinks.filter(link => link.appearance.position === 'bottom');
  const floatingLinks = smartLinks.filter(link => link.appearance.position === 'floating');
  const modalLinks = smartLinks.filter(link => link.appearance.position === 'modal');

  return (
    <div className={className}>
      {/* Enlaces en línea */}
      {inlineLinks.length > 0 && (
        <div className="space-y-3 mb-6">
          {inlineLinks.map(renderLink)}
        </div>
      )}

      {/* Enlaces laterales */}
      {sidebarLinks.length > 0 && (
        <div className="hidden lg:block">
          <div className="bg-gray-50 rounded-lg p-4 sticky top-4">
            <h3 className="font-semibold text-sm mb-3 text-gray-700">Contenido Relacionado</h3>
            <div className="space-y-2">
              {sidebarLinks.map(renderLink)}
            </div>
          </div>
        </div>
      )}

      {/* Enlaces al final */}
      {bottomLinks.length > 0 && (
        <div className="border-t pt-6 mt-8">
          <h3 className="font-semibold text-lg mb-4">Siguiente Paso</h3>
          <div className="space-y-3">
            {bottomLinks.map(renderLink)}
          </div>
        </div>
      )}

      {/* Enlaces flotantes */}
      {floatingLinks.length > 0 && (
        <div>
          {floatingLinks.map(renderLink)}
        </div>
      )}

      {/* Enlaces modales */}
      {modalLinks.length > 0 && showModal && (
        <div>
          {modalLinks.map(renderLink)}
        </div>
      )}

      {/* Siguiente paso calculado */}
      {nextStep && (
        <div className="mt-8">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-6 text-center">
            <Award className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">{nextStep.title}</h3>
            <p className="mb-4 opacity-90">{nextStep.description}</p>
            <Link
              href={nextStep.toPage}
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Continuar Aprendiendo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

// Componente para el sidebar
export function SmartLinkSidebar({ 
  currentPage, 
  userProgress 
}: { 
  currentPage: string; 
  userProgress?: SmartLinkRendererProps['userProgress'] 
}) {
  return (
    <div className="hidden lg:block">
      <SmartLinkRenderer
        currentPage={currentPage}
        userProgress={userProgress}
        className="sticky top-4"
      />
    </div>
  );
}

// Componente para el final de página
export function SmartLinkFooter({ 
  currentPage, 
  userProgress 
}: { 
  currentPage: string; 
  userProgress?: SmartLinkRendererProps['userProgress'] 
}) {
  return (
    <SmartLinkRenderer
      currentPage={currentPage}
      userProgress={userProgress}
      className="border-t pt-6 mt-8"
    />
  );
}
