'use client';

import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { useProgressTracking, useContentAnalysis } from '@/hooks/useSmartLinking';
import type { SmartLink } from '@/lib/smart-linking-system';

interface SmartNavigationContextType {
  // Estado del usuario
  userProgress: {
    completedPages: string[];
    currentLevel: 'beginner' | 'intermediate' | 'advanced';
    timeSpent: Record<string, number>;
    scores: Record<string, number>;
    interests: string[];
    lastVisited: string[];
  };
  
  // Acciones
  markPageCompleted: (page: string, score?: number) => void;
  updateTimeSpent: (page: string, minutes: number) => void;
  addInterest: (interest: string) => void;
  updateLevel: (level: 'beginner' | 'intermediate' | 'advanced') => void;
  visitPage: (page: string) => void;
  
  // Análisis
  analyzeContent: (content: string) => {
    topics: string[];
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    estimatedTime: number;
    keywords: string[];
  };
  
  // Enlaces inteligentes
  getSmartLinks: (currentPage: string, content?: string) => SmartLink[];
  getNextStep: () => SmartLink | null;
  
  // Estadísticas
  getNavigationStats: () => any;
}

const SmartNavigationContext = createContext<SmartNavigationContextType | null>(null);

interface SmartNavigationProviderProps {
  children: ReactNode;
  currentPage?: string;
  content?: string;
}

export function SmartNavigationProvider({ 
  children, 
  currentPage, 
  content 
}: SmartNavigationProviderProps) {
  const progressTracking = useProgressTracking();
  const contentAnalysis = useContentAnalysis(content || '');
  
  // Estado para enlaces inteligentes
  const [smartLinks, setSmartLinks] = useState<SmartLink[]>([]);
  const [nextStep, setNextStep] = useState<SmartLink | null>(null);

  // Registrar visita a la página actual
  useEffect(() => {
    if (currentPage) {
      progressTracking.visitPage(currentPage);
    }
  }, [currentPage]);

  // Actualizar tiempo pasado en la página
  useEffect(() => {
    if (!currentPage) return;

    const interval = setInterval(() => {
      progressTracking.updateTimeSpent(currentPage, 1); // 1 minuto
    }, 60000); // Cada minuto

    return () => clearInterval(interval);
  }, [currentPage, progressTracking]);

  // Generar enlaces inteligentes cuando cambia la página o contenido
  useEffect(() => {
    if (!currentPage) return;

    // Importar dinámicamente para evitar circular dependencies
    import('@/lib/smart-linking-system').then(({ smartLinkingEngine }) => {
      const context = {
        currentPage,
        userProgress: progressTracking.progress,
        contentAnalysis: {
          topics: contentAnalysis.topics,
          difficulty: contentAnalysis.difficulty,
          category: 'general',
          tags: contentAnalysis.keywords,
          prerequisites: []
        }
      };

      const links = smartLinkingEngine.getSmartLinks(context);
      
      // Agregar enlaces contextuales si hay contenido
      if (content) {
        const contextualLinks = smartLinkingEngine.generateContextualLinks(content, currentPage);
        links.push(...contextualLinks);
      }

      // Agregar enlaces basados en intereses
      if (progressTracking.progress.interests.length > 0) {
        const interestLinks = smartLinkingEngine.generateInterestBasedLinks(
          progressTracking.progress.interests,
          currentPage
        );
        links.push(...interestLinks);
      }

      // Calcular siguiente paso
      const calculatedNextStep = smartLinkingEngine.calculateNextStep(progressTracking.progress);
      
      setSmartLinks(links);
      setNextStep(calculatedNextStep);
    });
  }, [currentPage, content, progressTracking.progress, contentAnalysis]);

  const getSmartLinks = (page: string, pageContent?: string): SmartLink[] => {
    if (page !== currentPage) return [];
    
    // Filtrar enlaces por posición y prioridad
    return smartLinks.filter(link => {
      // No mostrar enlaces modales automáticamente
      if (link.appearance.position === 'modal') return false;
      
      // Filtrar por condiciones del usuario
      if (link.triggerConditions) {
        const conditions = link.triggerConditions;
        
        if (conditions.userLevel && conditions.userLevel !== progressTracking.progress.currentLevel) {
          return false;
        }

        if (conditions.completedPages && 
            !conditions.completedPages.every(page => 
              progressTracking.progress.completedPages.includes(page))) {
          return false;
        }

        if (conditions.timeSpent) {
          const timeOnPage = progressTracking.progress.timeSpent[page] || 0;
          if (timeOnPage < conditions.timeSpent) return false;
        }

        if (conditions.scoreThreshold) {
          const pageScore = progressTracking.progress.scores[page] || 0;
          if (pageScore < conditions.scoreThreshold) return false;
        }
      }

      return true;
    });
  };

  const getNavigationStats = () => {
    const dismissed = JSON.parse(localStorage.getItem('dismissedSmartLinks') || '[]');
    const clicks = JSON.parse(localStorage.getItem('smartLinkClicks') || '{}');
    
    return {
      userProgress: progressTracking.progress,
      contentAnalysis,
      smartLinksCount: smartLinks.length,
      dismissedLinksCount: dismissed.length,
      totalClicks: Object.values(clicks).reduce((sum: number, count: any) => sum + count, 0),
      averageTimePerPage: Object.values(progressTracking.progress.timeSpent).reduce((sum, time) => sum + time, 0) / Object.keys(progressTracking.progress.timeSpent).length || 0,
      completionRate: progressTracking.progress.completedPages.length / 10, // Asumiendo 10 páginas totales
      mostVisitedPages: progressTracking.progress.lastVisited.slice(0, 5)
    };
  };

  const value: SmartNavigationContextType = {
    userProgress: progressTracking.progress,
    markPageCompleted: progressTracking.markPageCompleted,
    updateTimeSpent: progressTracking.updateTimeSpent,
    addInterest: progressTracking.addInterest,
    updateLevel: progressTracking.updateLevel,
    visitPage: progressTracking.visitPage,
    analyzeContent: (content: string) => useContentAnalysis(content),
    getSmartLinks,
    getNextStep: () => nextStep,
    getNavigationStats
  };

  return (
    <SmartNavigationContext.Provider value={value}>
      {children}
    </SmartNavigationContext.Provider>
  );
}

export function useSmartNavigation() {
  const context = useContext(SmartNavigationContext);
  if (!context) {
    throw new Error('useSmartNavigation must be used within SmartNavigationProvider');
  }
  return context;
}

// Componente de orden superior para páginas con navegación inteligente
export function withSmartNavigation<P extends object>(
  Component: React.ComponentType<P>,
  options?: {
    trackCompletion?: boolean;
    trackTime?: boolean;
    autoAnalyzeContent?: boolean;
  }
) {
  return function SmartNavigationWrapper(props: P) {
    const [currentPage, setCurrentPage] = useState<string>('');
    const [content, setContent] = useState<string>('');
    
    // Extraer información de la página
    useEffect(() => {
      if (typeof window !== 'undefined') {
        setCurrentPage(window.location.pathname);
        
        // Extraer contenido principal de la página
        const mainContent = document.querySelector('main, .main-content, article');
        if (mainContent) {
          setContent(mainContent.textContent || '');
        }
      }
    }, []);

    const smartNavigation = useSmartNavigation();

    // Auto-marcar página como completada después de cierto tiempo
    useEffect(() => {
      if (options?.trackCompletion && currentPage) {
        const timer = setTimeout(() => {
          smartNavigation.markPageCompleted(currentPage);
        }, 30000); // 30 segundos

        return () => clearTimeout(timer);
      }
    }, [currentPage, options?.trackCompletion]);

    return (
      <SmartNavigationProvider currentPage={currentPage} content={content}>
        <Component {...props} />
      </SmartNavigationProvider>
    );
  };
}

// Hook para componentes específicos
export function usePageSmartLinks(position?: 'inline' | 'sidebar' | 'bottom' | 'floating') {
  const { getSmartLinks } = useSmartNavigation();
  
  // Obtener enlaces para la página actual
  const allLinks = getSmartLinks(
    typeof window !== 'undefined' ? window.location.pathname : '',
    ''
  );
  
  // Filtrar por posición
  if (position) {
    return allLinks.filter(link => link.appearance.position === position);
  }
  
  return allLinks;
}

export function useNextStepAction() {
  const { getNextStep } = useSmartNavigation();
  return getNextStep();
}

export function useUserProgress() {
  const { userProgress, markPageCompleted, updateLevel, addInterest } = useSmartNavigation();
  
  return {
    progress: userProgress,
    isCompleted: (page: string) => userProgress.completedPages.includes(page),
    getTimeSpent: (page: string) => userProgress.timeSpent[page] || 0,
    getScore: (page: string) => userProgress.scores[page] || 0,
    markCompleted: markPageCompleted,
    updateLevel,
    addInterest
  };
}
