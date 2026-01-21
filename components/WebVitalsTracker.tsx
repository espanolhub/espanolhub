'use client';

import { useEffect } from 'react';
import { initWebVitals, performanceUtils } from '@/lib/utils/webVitals';

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
  }, []);

  // This component doesn't render anything
  return null;
}
