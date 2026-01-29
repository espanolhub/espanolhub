/**
 * Smart Linking System
 * نظام الربط الذكي بين الصفحات
 */

export interface SmartLink {
  id: string;
  fromPage: string;
  toPage: string;
  linkType: 'contextual' | 'progressive' | 'related' | 'next-step' | 'prerequisite' | 'complementary';
  priority: number; // 1-10, 10 es más importante
  context: string;
  title: string;
  description: string;
  triggerConditions?: {
    userLevel?: 'beginner' | 'intermediate' | 'advanced';
    completedPages?: string[];
    timeSpent?: number; // minutos
    scoreThreshold?: number;
  };
  appearance: {
    position: 'inline' | 'sidebar' | 'bottom' | 'floating' | 'modal';
    style: 'suggestion' | 'recommendation' | 'next-lesson' | 'related-content';
    urgency: 'low' | 'medium' | 'high';
  };
}

export interface PageContext {
  currentPage: string;
  userProgress: {
    completedPages: string[];
    currentLevel: 'beginner' | 'intermediate' | 'advanced';
    timeSpent: Record<string, number>;
    scores: Record<string, number>;
    interests: string[];
    lastVisited: string[];
  };
  contentAnalysis: {
    topics: string[];
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    category: string;
    tags: string[];
    prerequisites: string[];
  };
}

export class SmartLinkingEngine {
  private links: SmartLink[] = [];
  private pageContexts: Map<string, any> = new Map();

  constructor() {
    this.initializeSmartLinks();
  }

  private initializeSmartLinks() {
    this.links = [
      // Gramática → Vocabulario
      {
        id: 'grammar-to-vocab-ser-estar',
        fromPage: '/gramatica/gram-ser-estar',
        toPage: '/vocabulario',
        linkType: 'complementary',
        priority: 9,
        context: 'después de aprender SER vs ESTAR',
        title: 'Practica Vocabulario Esencial',
        description: 'Refuerza tu aprendizaje con vocabulario relacionado con descripciones personales',
        appearance: {
          position: 'bottom',
          style: 'next-lesson',
          urgency: 'medium'
        }
      },
      
      // Vocabulario → Ejercicios
      {
        id: 'vocab-to-exercises',
        fromPage: '/vocabulario',
        toPage: '/juegos',
        linkType: 'progressive',
        priority: 8,
        context: 'después de estudiar vocabulario',
        title: 'Pon a Prueba tu Conocimiento',
        description: 'Practica el vocabulario con juegos interactivos',
        triggerConditions: {
          timeSpent: 5 // 5 minutos en vocabulario
        },
        appearance: {
          position: 'floating',
          style: 'recommendation',
          urgency: 'low'
        }
      },

      // Lecciones Interactivas → Exámenes
      {
        id: 'lessons-to-exam',
        fromPage: '/lecciones/grammar-ser-estar',
        toPage: '/examenes-espanol-gratis',
        linkType: 'next-step',
        priority: 7,
        context: 'al completar lección de gramática',
        title: 'Prepárate para el Examen',
        description: 'Evalúa tu conocimiento con nuestros exámenes de gramática',
        triggerConditions: {
          completedPages: ['/lecciones/grammar-ser-estar']
        },
        appearance: {
          position: 'modal',
          style: 'recommendation',
          urgency: 'high'
        }
      },

      // Recursos → Cursos
      {
        id: 'resources-to-courses',
        fromPage: '/recursos',
        toPage: '/cursos',
        linkType: 'related',
        priority: 6,
        context: 'al explorar recursos',
        title: 'Cursos Estructurados',
        description: 'Completa tu aprendizaje con nuestros cursos completos',
        appearance: {
          position: 'sidebar',
          style: 'suggestion',
          urgency: 'medium'
        }
      },

      // Juegos → Dashboard
      {
        id: 'games-to-dashboard',
        fromPage: '/juegos',
        toPage: '/dashboard',
        linkType: 'contextual',
        priority: 5,
        context: 'después de jugar',
        title: 'Revisa tu Progreso',
        description: 'Ve tus estadísticas y logros en el dashboard',
        triggerConditions: {
          timeSpent: 10 // 10 minutos en juegos
        },
        appearance: {
          position: 'bottom',
          style: 'recommendation',
          urgency: 'low'
        }
      },

      // Nacionalidad → Driving License
      {
        id: 'nacionalidad-to-driving',
        fromPage: '/nacionalidad',
        toPage: '/driving-license',
        linkType: 'related',
        priority: 4,
        context: 'al estudiar para nacionalidad',
        title: 'Licencia de Conducir Española',
        description: 'Prepárate también para el examen de conducir en España',
        appearance: {
          position: 'sidebar',
          style: 'suggestion',
          urgency: 'low'
        }
      },

      // Gramática → Conjugador
      {
        id: 'grammar-to-conjugator',
        fromPage: '/gramatica',
        toPage: '/conjugador-verbos',
        linkType: 'complementary',
        priority: 8,
        context: 'al estudiar gramática',
        title: 'Conjugador de Verbos',
        description: 'Herramienta interactiva para practicar conjugaciones',
        appearance: {
          position: 'inline',
          style: 'suggestion',
          urgency: 'medium'
        }
      },

      // Lectura → Vocabulario
      {
        id: 'reading-to-vocab',
        fromPage: '/lectura',
        toPage: '/vocabulario-espanol-por-temas',
        linkType: 'complementary',
        priority: 7,
        context: 'al practicar lectura',
        title: 'Vocabulario por Temas',
        description: 'Refuerza las palabras que encontraste en tus lecturas',
        appearance: {
          position: 'bottom',
          style: 'recommendation',
          urgency: 'medium'
        }
      },

      // Dashboard → Lecciones Recomendadas
      {
        id: 'dashboard-to-lessons',
        fromPage: '/dashboard',
        toPage: '/recursos',
        linkType: 'progressive',
        priority: 9,
        context: 'al ver progreso',
        title: 'Continúa Aprendiendo',
        description: 'Lecciones recomendadas basadas en tu progreso',
        triggerConditions: {
          userLevel: 'beginner'
        },
        appearance: {
          position: 'inline',
          style: 'next-lesson',
          urgency: 'high'
        }
      },

      // Contact → FAQ
      {
        id: 'contact-to-faq',
        fromPage: '/contact',
        toPage: '/faq',
        linkType: 'related',
        priority: 3,
        context: 'antes de contactar',
        title: 'Preguntas Frecuentes',
        description: 'Quizás tu duda ya está resuelta en nuestras FAQ',
        appearance: {
          position: 'inline',
          style: 'suggestion',
          urgency: 'low'
        }
      }
    ];
  }

  /**
   * Obtiene enlaces inteligentes basados en el contexto actual
   */
  getSmartLinks(context: PageContext): SmartLink[] {
    const eligibleLinks = this.links.filter(link => {
      // Filtro por página actual
      if (link.fromPage !== context.currentPage) return false;

      // Filtro por condiciones del usuario
      if (link.triggerConditions) {
        const conditions = link.triggerConditions;
        
        if (conditions.userLevel && conditions.userLevel !== context.userProgress.currentLevel) {
          return false;
        }

        if (conditions.completedPages && 
            !conditions.completedPages.every(page => 
              context.userProgress.completedPages.includes(page))) {
          return false;
        }

        if (conditions.timeSpent) {
          const timeOnPage = context.userProgress.timeSpent[context.currentPage] || 0;
          if (timeOnPage < conditions.timeSpent) return false;
        }

        if (conditions.scoreThreshold) {
          const pageScore = context.userProgress.scores[context.currentPage] || 0;
          if (pageScore < conditions.scoreThreshold) return false;
        }
      }

      return true;
    });

    // Ordenar por prioridad
    return eligibleLinks.sort((a, b) => b.priority - a.priority);
  }

  /**
   * Genera enlaces contextuales basados en el contenido
   */
  generateContextualLinks(content: string, currentPage: string): SmartLink[] {
    const contextualLinks: SmartLink[] = [];
    const topics = this.extractTopics(content);

    topics.forEach(topic => {
      const relatedPages = this.findRelatedPages(topic);
      
      relatedPages.forEach(page => {
        if (page !== currentPage) {
          contextualLinks.push({
            id: `contextual-${currentPage}-${page}`,
            fromPage: currentPage,
            toPage: page,
            linkType: 'contextual',
            priority: 5,
            context: `contenido relacionado con ${topic}`,
            title: `Más sobre ${topic}`,
            description: `Explora más contenido sobre ${topic}`,
            appearance: {
              position: 'inline',
              style: 'suggestion',
              urgency: 'low'
            }
          });
        }
      });
    });

    return contextualLinks;
  }

  /**
   * Extrae temas del contenido
   */
  private extractTopics(content: string): string[] {
    const topics = [];
    const keywords = [
      'verbos', 'gramática', 'vocabulario', 'conjugación', 'ser', 'estar',
      'artículos', 'pronombres', 'adjetivos', 'tiempos verbales',
      'DELE', 'CCSE', 'nacionalidad', 'conducir', 'examen',
      'conversación', 'lectura', 'comprensión', 'traducción'
    ];

    keywords.forEach(keyword => {
      if (content.toLowerCase().includes(keyword)) {
        topics.push(keyword);
      }
    });

    return topics;
  }

  /**
   * Encuentra páginas relacionadas con un tema
   */
  private findRelatedPages(topic: string): string[] {
    const topicPageMap: Record<string, string[]> = {
      'verbos': ['/gramatica', '/conjugador-verbos', '/juegos/quick-quiz-verbos'],
      'gramática': ['/gramatica', '/recursos', '/lecciones/grammar-ser-estar'],
      'vocabulario': ['/vocabulario', '/vocabulario-espanol-por-temas', '/juegos'],
      'conjugación': ['/conjugador-verbos', '/gramatica'],
      'ser': ['/gramatica/gram-ser-estar', '/lecciones/grammar-ser-estar'],
      'estar': ['/gramatica/gram-ser-estar', '/lecciones/grammar-ser-estar'],
      'DELE': ['/examenes-espanol-gratis', '/recursos', '/lecciones/exam-dele-a1'],
      'CCSE': ['/nacionalidad', '/recursos'],
      'nacionalidad': ['/nacionalidad', '/recursos'],
      'conducir': ['/driving-license', '/recursos'],
      'examen': ['/examenes-espanol-gratis', '/recursos', '/simulator'],
      'conversación': ['/recursos', '/lecciones/conversation-daily'],
      'lectura': ['/lectura', '/recursos'],
      'comprensión': ['/lectura', '/juegos', '/recursos'],
      'traducción': ['/recursos', '/juegos']
    };

    return topicPageMap[topic] || [];
  }

  /**
   * Calcula el siguiente paso lógico para el usuario
   */
  calculateNextStep(userProgress: PageContext['userProgress']): SmartLink | null {
    const { completedPages, currentLevel, interests } = userProgress;
    
    // Si no ha completado nada, empezar con lo básico
    if (completedPages.length === 0) {
      return {
        id: 'first-step',
        fromPage: '/dashboard',
        toPage: '/recursos',
        linkType: 'next-step',
        priority: 10,
        context: 'primer paso',
        title: 'Comienza tu Aprendizaje',
        description: 'Explora nuestras lecciones interactivas para principiantes',
        appearance: {
          position: 'modal',
          style: 'next-lesson',
          urgency: 'high'
        }
      };
    }

    // Basado en el nivel actual
    const nextStepMap: Record<string, string> = {
      'beginner': '/recursos',
      'intermediate': '/gramatica',
      'advanced': '/examenes-espanol-gratis'
    };

    const nextPage = nextStepMap[currentLevel];
    
    if (nextPage && !completedPages.includes(nextPage)) {
      return {
        id: 'level-progression',
        fromPage: completedPages[completedPages.length - 1],
        toPage: nextPage,
        linkType: 'progressive',
        priority: 9,
        context: 'progresión de nivel',
        title: 'Siguiente Nivel',
        description: `Avanza al contenido de nivel ${currentLevel}`,
        appearance: {
          position: 'bottom',
          style: 'next-lesson',
          urgency: 'medium'
        }
      };
    }

    return null;
  }

  /**
   * Genera enlaces basados en intereses del usuario
   */
  generateInterestBasedLinks(interests: string[], currentPage: string): SmartLink[] {
    const interestLinks: SmartLink[] = [];
    
    interests.forEach(interest => {
      const relatedPages = this.findRelatedPages(interest);
      
      relatedPages.forEach(page => {
        if (page !== currentPage) {
          interestLinks.push({
            id: `interest-${interest}-${page}`,
            fromPage: currentPage,
            toPage: page,
            linkType: 'related',
            priority: 6,
            context: `basado en tu interés en ${interest}`,
            title: `Más de ${interest}`,
            description: `Contenido personalizado sobre ${interest}`,
            appearance: {
              position: 'sidebar',
              style: 'recommendation',
              urgency: 'low'
            }
          });
        }
      });
    });

    return interestLinks;
  }

  /**
   * Actualiza el contexto de una página
   */
  updatePageContext(page: string, context: any) {
    this.pageContexts.set(page, context);
  }

  /**
   * Obtiene estadísticas de uso de enlaces
   */
  getLinkingStats() {
    return {
      totalLinks: this.links.length,
      linksByType: this.links.reduce((acc, link) => {
        acc[link.linkType] = (acc[link.linkType] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      averagePriority: this.links.reduce((sum, link) => sum + link.priority, 0) / this.links.length,
      mostCommonPositions: this.links.reduce((acc, link) => {
        acc[link.appearance.position] = (acc[link.appearance.position] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    };
  }
}

// Instancia global del motor de enlaces
export const smartLinkingEngine = new SmartLinkingEngine();
