/**
 * Google Analytics 4 (GA4) Integration
 * تكامل Google Analytics 4
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

/**
 * Initialize Google Analytics
 */
export function initGA() {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return;

  // Initialize dataLayer
  if (!window.dataLayer) {
    window.dataLayer = [];
  }
  window.gtag = function gtag(...args: any[]) {
    if (window.dataLayer) {
      window.dataLayer.push(args);
    }
  };

  // Load GA script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Configure GA
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
  });
}

/**
 * Track page view
 */
export function trackPageView(url: string) {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
}

/**
 * Track event
 */
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
}

/**
 * Track educational events
 */
export function trackEducationalEvent(
  eventType: 'lesson_completed' | 'exercise_completed' | 'game_completed' | 'vocabulary_learned' | 'xp_earned',
  data?: {
    section?: string;
    score?: number;
    xp?: number;
    level?: string;
  }
) {
  trackEvent(eventType, 'education', data?.section, data?.xp || data?.score);
}
