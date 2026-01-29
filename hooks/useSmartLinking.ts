'use client';

import { useState, useEffect, useCallback } from 'react';
import { smartLinkingEngine, type SmartLink, type PageContext } from '@/lib/smart-linking-system';

interface UseSmartLinkingOptions {
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
  enableContextual?: boolean;
  enableInterestBased?: boolean;
  enableProgressive?: boolean;
}

interface UseSmartLinkingReturn {
  smartLinks: SmartLink[];
  nextStep: SmartLink | null;
  loading: boolean;
  error: string | null;
  refreshLinks: () => void;
  dismissLink: (linkId: string) => void;
  trackLinkClick: (linkId: string) => void;
  getLinkStats: () => any;
}

export function useSmartLinking({
  currentPage,
  userProgress,
  content,
  enableContextual = true,
  enableInterestBased = true,
  enableProgressive = true
}: UseSmartLinkingOptions): UseSmartLinkingReturn {
  const [smartLinks, setSmartLinks] = useState<SmartLink[]>([]);
  const [nextStep, setNextStep] = useState<SmartLink | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dismissedLinks, setDismissedLinks] = useState<Set<string>>(new Set());
  const [clickedLinks, setClickedLinks] = useState<Set<string>>(new Set());

  const generateLinks = useCallback(async () => {
    if (!userProgress) return;

    setLoading(true);
    setError(null);

    try {
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

      const links: SmartLink[] = [];

      // Enlaces inteligentes básicos
      const basicLinks = smartLinkingEngine.getSmartLinks(context);
      links.push(...basicLinks);

      // Enlaces contextuales
      if (enableContextual && content) {
        const contextualLinks = smartLinkingEngine.generateContextualLinks(content, currentPage);
        links.push(...contextualLinks);
      }

      // Enlaces basados en intereses
      if (enableInterestBased && userProgress.interests.length > 0) {
        const interestLinks = smartLinkingEngine.generateInterestBasedLinks(
          userProgress.interests,
          currentPage
        );
        links.push(...interestLinks);
      }

      // Siguiente paso progresivo
      if (enableProgressive) {
        const calculatedNextStep = smartLinkingEngine.calculateNextStep(userProgress);
        if (calculatedNextStep) {
          setNextStep(calculatedNextStep);
        }
      }

      // Filtrar enlaces descartados y ya clickeados
      const filteredLinks = links.filter(link => 
        !dismissedLinks.has(link.id) && !clickedLinks.has(link.id)
      );

      // Ordenar por prioridad y relevancia
      filteredLinks.sort((a, b) => {
        // Primero por urgencia
        const urgencyOrder = { high: 3, medium: 2, low: 1 };
        const aUrgency = urgencyOrder[a.appearance.urgency];
        const bUrgency = urgencyOrder[b.appearance.urgency];
        
        if (aUrgency !== bUrgency) {
          return bUrgency - aUrgency;
        }
        
        // Luego por prioridad
        return b.priority - a.priority;
      });

      // Limitar número de enlaces para no sobrecargar
      const maxLinks = {
        inline: 2,
        sidebar: 3,
        bottom: 2,
        floating: 1,
        modal: 1
      };

      const limitedLinks = filteredLinks.reduce((acc, link) => {
        const position = link.appearance.position;
        const currentCount = acc.filter(l => l.appearance.position === position).length;
        const maxCount = maxLinks[position as keyof typeof maxLinks] || 1;
        
        if (currentCount < maxCount) {
          acc.push(link);
        }
        
        return acc;
      }, [] as SmartLink[]);

      setSmartLinks(limitedLinks);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error generating smart links');
    } finally {
      setLoading(false);
    }
  }, [currentPage, userProgress, content, enableContextual, enableInterestBased, enableProgressive, dismissedLinks, clickedLinks]);

  useEffect(() => {
    generateLinks();
  }, [generateLinks]);

  const refreshLinks = useCallback(() => {
    generateLinks();
  }, [generateLinks]);

  const dismissLink = useCallback((linkId: string) => {
    setDismissedLinks(prev => new Set([...prev, linkId]));
    
    // Guardar en localStorage para persistencia
    const dismissed = Array.from(new Set([...dismissedLinks, linkId]));
    localStorage.setItem('dismissedSmartLinks', JSON.stringify(dismissed));
  }, [dismissedLinks]);

  const trackLinkClick = useCallback((linkId: string) => {
    setClickedLinks(prev => new Set([...prev, linkId]));
    
    // Guardar estadísticas de clics
    const clicks = JSON.parse(localStorage.getItem('smartLinkClicks') || '{}');
    clicks[linkId] = (clicks[linkId] || 0) + 1;
    localStorage.setItem('smartLinkClicks', JSON.stringify(clicks));
    
    // Enviar a analytics si está disponible
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'smart_link_click', {
        link_id: linkId,
        page: currentPage,
        user_level: userProgress?.currentLevel
      });
    }
  }, [currentPage, userProgress?.currentLevel]);

  const getLinkStats = useCallback(() => {
    const clicks = JSON.parse(localStorage.getItem('smartLinkClicks') || '{}');
    const dismissed = JSON.parse(localStorage.getItem('dismissedSmartLinks') || '[]');
    
    return {
      totalClicks: Object.values(clicks).reduce((sum: number, count: any) => sum + count, 0),
      totalDismissed: dismissed.length,
      linkPerformance: smartLinks.map(link => ({
        id: link.id,
        title: link.title,
        clicks: clicks[link.id] || 0,
        dismissed: dismissed.includes(link.id),
        priority: link.priority,
        type: link.linkType
      }))
    };
  }, [smartLinks]);

  // Cargar datos persistentes al montar
  useEffect(() => {
    const dismissed = JSON.parse(localStorage.getItem('dismissedSmartLinks') || '[]');
    setDismissedLinks(new Set(dismissed));
  }, []);

  return {
    smartLinks,
    nextStep,
    loading,
    error,
    refreshLinks,
    dismissLink,
    trackLinkClick,
    getLinkStats
  };
}

// Hook para tracking de progreso del usuario
export function useProgressTracking() {
  const [progress, setProgress] = useState({
    completedPages: [] as string[],
    timeSpent: {} as Record<string, number>,
    scores: {} as Record<string, number>,
    interests: [] as string[],
    lastVisited: [] as string[],
    currentLevel: 'beginner' as 'beginner' | 'intermediate' | 'advanced'
  });

  const markPageCompleted = useCallback((page: string, score?: number) => {
    setProgress(prev => {
      const updated = {
        ...prev,
        completedPages: prev.completedPages.includes(page) 
          ? prev.completedPages 
          : [...prev.completedPages, page]
      };
      
      if (score !== undefined) {
        updated.scores = { ...updated.scores, [page]: score };
      }
      
      // Guardar en localStorage
      localStorage.setItem('userProgress', JSON.stringify(updated));
      
      return updated;
    });
  }, []);

  const updateTimeSpent = useCallback((page: string, minutes: number) => {
    setProgress(prev => {
      const updated = {
        ...prev,
        timeSpent: {
          ...prev.timeSpent,
          [page]: (prev.timeSpent[page] || 0) + minutes
        }
      };
      
      localStorage.setItem('userProgress', JSON.stringify(updated));
      
      return updated;
    });
  }, []);

  const addInterest = useCallback((interest: string) => {
    setProgress(prev => {
      const updated = {
        ...prev,
        interests: prev.interests.includes(interest) 
          ? prev.interests 
          : [...prev.interests, interest]
      };
      
      localStorage.setItem('userProgress', JSON.stringify(updated));
      
      return updated;
    });
  }, []);

  const updateLevel = useCallback((level: 'beginner' | 'intermediate' | 'advanced') => {
    setProgress(prev => {
      const updated = { ...prev, currentLevel: level };
      localStorage.setItem('userProgress', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const visitPage = useCallback((page: string) => {
    setProgress(prev => {
      const updated = {
        ...prev,
        lastVisited: [page, ...prev.lastVisited.filter(p => p !== page)].slice(0, 10)
      };
      
      localStorage.setItem('userProgress', JSON.stringify(updated));
      
      return updated;
    });
  }, []);

  // Cargar progreso guardado al montar
  useEffect(() => {
    const saved = localStorage.getItem('userProgress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProgress(parsed);
      } catch (error) {
        console.error('Error loading user progress:', error);
      }
    }
  }, []);

  return {
    progress,
    markPageCompleted,
    updateTimeSpent,
    addInterest,
    updateLevel,
    visitPage
  };
}

// Hook para análisis de contenido
export function useContentAnalysis(content: string) {
  const [analysis, setAnalysis] = useState({
    topics: [] as string[],
    difficulty: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    estimatedTime: 0,
    keywords: [] as string[]
  });

  useEffect(() => {
    if (!content) return;

    // Análisis simple del contenido
    const topics = extractTopics(content);
    const difficulty = estimateDifficulty(content);
    const estimatedTime = estimateReadingTime(content);
    const keywords = extractKeywords(content);

    setAnalysis({
      topics,
      difficulty,
      estimatedTime,
      keywords
    });
  }, [content]);

  return analysis;
}

function extractTopics(content: string): string[] {
  const topicKeywords = [
    'verbos', 'gramática', 'vocabulario', 'conjugación', 'ser', 'estar',
    'artículos', 'pronombres', 'adjetivos', 'tiempos verbales',
    'DELE', 'CCSE', 'nacionalidad', 'conducir', 'examen',
    'conversación', 'lectura', 'comprensión', 'traducción',
    'pretérito', 'imperfecto', 'futuro', 'condicional', 'subjuntivo'
  ];

  return topicKeywords.filter(topic => 
    content.toLowerCase().includes(topic.toLowerCase())
  );
}

function estimateDifficulty(content: string): 'beginner' | 'intermediate' | 'advanced' {
  const text = content.toLowerCase();
  
  // Indicadores de nivel avanzado
  const advancedIndicators = ['subjuntivo', 'condicional', 'pretérito perfecto', 'pluscuamperfecto'];
  const intermediateIndicators = ['pretérito imperfecto', 'copretérito', 'futuro imperfecto'];
  
  const advancedCount = advancedIndicators.filter(indicator => text.includes(indicator)).length;
  const intermediateCount = intermediateIndicators.filter(indicator => text.includes(indicator)).length;
  
  if (advancedCount > 2) return 'advanced';
  if (intermediateCount > 2 || advancedCount > 0) return 'intermediate';
  return 'beginner';
}

function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200; // Promedio de lectura
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

function extractKeywords(content: string): string[] {
  // Extraer palabras clave simples
  const words = content.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 4);
  
  // Contar frecuencia y devolver las más comunes
  const frequency: Record<string, number> = {};
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });
  
  return Object.entries(frequency)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([word]) => word);
}
