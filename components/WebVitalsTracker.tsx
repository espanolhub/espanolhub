'use client';

import { useEffect } from 'react';
import { initWebVitals, performanceUtils } from '@/lib/utils/webVitals';

/**
 * Track custom events for SEO and analytics
 */
function trackCustomEvent(eventName: string, eventData?: Record<string, any>) {
  // Track for Google Analytics 4 (if available)
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, eventData);
  }
  
  // Also track for Vercel Analytics (if available)
  if (typeof window !== 'undefined' && (window as any).va) {
    (window as any).va('track', eventName, eventData);
  }
  
  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics Event] ${eventName}`, eventData);
  }
}

/**
 * Track scroll depth for engagement metrics
 */
function trackScrollDepth() {
  let maxScroll = 0;
  let scroll25 = false;
  let scroll50 = false;
  let scroll75 = false;
  let scroll100 = false;

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;

    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;
    }

    if (!scroll25 && scrollPercent >= 25) {
      scroll25 = true;
      trackCustomEvent('scroll_depth', { depth: 25 });
    }
    if (!scroll50 && scrollPercent >= 50) {
      scroll50 = true;
      trackCustomEvent('scroll_depth', { depth: 50 });
    }
    if (!scroll75 && scrollPercent >= 75) {
      scroll75 = true;
      trackCustomEvent('scroll_depth', { depth: 75 });
    }
    if (!scroll100 && scrollPercent >= 100) {
      scroll100 = true;
      trackCustomEvent('scroll_depth', { depth: 100 });
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  
  return () => window.removeEventListener('scroll', handleScroll);
}

/**
 * Track outbound links
 */
function trackOutboundLinks() {
  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const link = target.closest('a');
    
    if (link && link.href) {
      const url = new URL(link.href);
      const currentHost = window.location.hostname;
      
      // Track external links
      if (url.hostname !== currentHost && !url.hostname.includes('espanolhub.com')) {
        trackCustomEvent('outbound_link', {
          url: link.href,
          link_text: link.textContent?.substring(0, 100),
        });
      }
    }
  };

  document.addEventListener('click', handleClick);
  
  return () => document.removeEventListener('click', handleClick);
}

/**
 * Track game completion events
 */
export function trackGameCompleted(gameId: string, score: number, timeSpent: number) {
  trackCustomEvent('game_completed', {
    game_id: gameId,
    score,
    time_spent: timeSpent,
  });
}

/**
 * Track lesson completion events
 */
export function trackLessonFinished(lessonId: string, lessonType: string) {
  trackCustomEvent('lesson_finished', {
    lesson_id: lessonId,
    lesson_type: lessonType,
  });
}

/**
 * Track quiz score events
 */
export function trackQuizScore(quizId: string, score: number, totalQuestions: number) {
  trackCustomEvent('quiz_score', {
    quiz_id: quizId,
    score,
    total_questions: totalQuestions,
    percentage: Math.round((score / totalQuestions) * 100),
  });
}

/**
 * WebVitalsTracker Component
 * Initializes Web Vitals tracking and performance monitoring
 * Should be included once in the root layout
 */
export default function WebVitalsTracker() {
  useEffect(() => {
    // Initialize Web Vitals tracking
    initWebVitals();

    // Monitor long tasks
    performanceUtils.monitorLongTasks();

    // Track scroll depth
    const scrollCleanup = trackScrollDepth();
    
    // Track outbound links
    const linkCleanup = trackOutboundLinks();

    // Log performance metrics in development
    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => {
        const metrics = performanceUtils.getPerformanceMetrics();
        if (metrics) {
          console.log('[Performance Metrics]', {
            'DNS Lookup': `${metrics.dns?.toFixed(0)}ms`,
            'TCP Connection': `${metrics.tcp?.toFixed(0)}ms`,
            'TTFB': `${metrics.ttfb?.toFixed(0)}ms`,
            'Download': `${metrics.download?.toFixed(0)}ms`,
            'DOM Interactive': `${metrics.domInteractive?.toFixed(0)}ms`,
            'First Contentful Paint': `${metrics.fcp?.toFixed(0)}ms`,
            'Total Resources': metrics.totalResources,
          });
        }
      }, 2000);
    }

    return () => {
      scrollCleanup();
      linkCleanup();
    };
  }, []);

  // This component doesn't render anything
  return null;
}
