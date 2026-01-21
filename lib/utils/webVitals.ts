/**
 * Web Vitals Tracking and Reporting
 * Monitors Core Web Vitals (CLS, FID, LCP, FCP, TTFB, INP)
 * Sends data to analytics for performance monitoring
 */

import { onCLS, onFCP, onLCP, onTTFB, onINP, onFID } from 'web-vitals';

type Metric = {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
};

/**
 * Send web vitals data to analytics
 * Can be configured to send to Google Analytics, custom endpoint, etc.
 */
function sendToAnalytics(metric: Metric) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${metric.name}:`, {
      value: metric.value,
      rating: metric.rating,
      id: metric.id,
    });
  }

  // Send to Google Analytics if available
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true,
    });
  }

  // Optional: Send to custom analytics endpoint
  // fetch('/api/analytics/web-vitals', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(metric),
  // }).catch(console.error);
}

/**
 * Initialize Web Vitals tracking
 * Call this in _app.tsx or layout.tsx
 */
export function initWebVitals() {
  if (typeof window === 'undefined') return;

  // Cumulative Layout Shift (CLS) - Target: < 0.1
  onCLS(sendToAnalytics);

  // First Input Delay (FID) - Target: < 100ms (deprecated, using INP instead)
  onFID(sendToAnalytics);

  // Largest Contentful Paint (LCP) - Target: < 2.5s
  onLCP(sendToAnalytics);

  // First Contentful Paint (FCP) - Target: < 1.8s
  onFCP(sendToAnalytics);

  // Time to First Byte (TTFB) - Target: < 600ms
  onTTFB(sendToAnalytics);

  // Interaction to Next Paint (INP) - Target: < 200ms
  onINP(sendToAnalytics);
}

/**
 * Performance optimization utilities
 */
export const performanceUtils = {
  /**
   * Preload critical resources
   */
  preloadResource(href: string, as: string) {
    if (typeof document === 'undefined') return;
    
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    document.head.appendChild(link);
  },

  /**
   * Prefetch next page
   */
  prefetchPage(href: string) {
    if (typeof document === 'undefined') return;
    
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    document.head.appendChild(link);
  },

  /**
   * Lazy load images when they enter viewport
   */
  observeImages() {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach((img) => {
      imageObserver.observe(img);
    });
  },

  /**
   * Report long tasks (> 50ms)
   */
  monitorLongTasks() {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            console.warn(`[Long Task] ${entry.duration.toFixed(0)}ms`, entry);
            
            // Send to analytics
            if ((window as any).gtag) {
              (window as any).gtag('event', 'long_task', {
                value: Math.round(entry.duration),
                event_category: 'Performance',
                non_interaction: true,
              });
            }
          }
        }
      });

      observer.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      // PerformanceObserver not supported
    }
  },

  /**
   * Get current performance metrics
   */
  getPerformanceMetrics() {
    if (typeof window === 'undefined' || !window.performance) return null;

    const navigation = performance.getEntriesByType('navigation')[0] as any;
    const paint = performance.getEntriesByType('paint');

    return {
      // Navigation timing
      dns: navigation?.domainLookupEnd - navigation?.domainLookupStart,
      tcp: navigation?.connectEnd - navigation?.connectStart,
      ttfb: navigation?.responseStart - navigation?.requestStart,
      download: navigation?.responseEnd - navigation?.responseStart,
      domInteractive: navigation?.domInteractive,
      domComplete: navigation?.domComplete,
      
      // Paint timing
      fcp: paint.find((p) => p.name === 'first-contentful-paint')?.startTime,
      
      // Resource timing
      totalResources: performance.getEntriesByType('resource').length,
    };
  },
};

/**
 * Check if page meets Core Web Vitals thresholds
 */
export function checkWebVitalsHealth(): Promise<{
  healthy: boolean;
  metrics: Record<string, { value: number; threshold: number; pass: boolean }>;
}> {
  return new Promise((resolve) => {
    const metrics: Record<string, { value: number; threshold: number; pass: boolean }> = {};
    let checksComplete = 0;
    const totalChecks = 3; // CLS, LCP, INP

    const checkComplete = () => {
      checksComplete++;
      if (checksComplete === totalChecks) {
        const healthy = Object.values(metrics).every((m) => m.pass);
        resolve({ healthy, metrics });
      }
    };

    onCLS((metric) => {
      metrics.CLS = {
        value: metric.value,
        threshold: 0.1,
        pass: metric.value < 0.1,
      };
      checkComplete();
    });

    onLCP((metric) => {
      metrics.LCP = {
        value: metric.value,
        threshold: 2500,
        pass: metric.value < 2500,
      };
      checkComplete();
    });

    onINP((metric) => {
      metrics.INP = {
        value: metric.value,
        threshold: 200,
        pass: metric.value < 200,
      };
      checkComplete();
    });

    // Timeout after 10 seconds
    setTimeout(() => {
      if (checksComplete < totalChecks) {
        resolve({ healthy: false, metrics });
      }
    }, 10000);
  });
}
