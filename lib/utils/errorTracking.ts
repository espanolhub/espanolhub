/**
 * Error Tracking Utility
 * يمكن استخدام Sentry أو بديل آخر في الإنتاج
 */

interface ErrorInfo {
  message: string;
  stack?: string;
  url?: string;
  userAgent?: string;
  timestamp: number;
}

const ERROR_LOG_KEY = 'error-log';

/**
 * Log error (client-side)
 * في الإنتاج، يجب إرسال الأخطاء إلى خدمة مثل Sentry
 */
export function logError(error: Error, errorInfo?: Record<string, any>) {
  if (typeof window === 'undefined') return;

  const errorData: ErrorInfo = {
    message: error.message,
    stack: error.stack,
    url: window.location.href,
    userAgent: navigator.userAgent,
    timestamp: Date.now(),
  };

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error logged:', errorData, errorInfo);
  }

  // In production, send to error tracking service (e.g., Sentry)
  // Example:
  // Sentry.captureException(error, {
  //   extra: errorInfo,
  // });

  // Store errors locally (optional, for debugging)
  try {
    const existingErrors = JSON.parse(localStorage.getItem(ERROR_LOG_KEY) || '[]');
    existingErrors.push(errorData);
    // Keep only last 50 errors
    const recentErrors = existingErrors.slice(-50);
    localStorage.setItem(ERROR_LOG_KEY, JSON.stringify(recentErrors));
  } catch (e) {
    // Ignore storage errors
  }
}

/**
 * Log custom event/error
 */
export function logEvent(eventName: string, data?: Record<string, any>) {
  if (typeof window === 'undefined') return;

  if (process.env.NODE_ENV === 'development') {
    console.log('Event logged:', eventName, data);
  }

  // Send to analytics or error tracking service
  // Example:
  // Sentry.addBreadcrumb({
  //   message: eventName,
  //   data: data,
  //   level: 'info',
  // });
}

/**
 * Get error logs (for debugging)
 */
export function getErrorLogs(): ErrorInfo[] {
  if (typeof window === 'undefined') return [];
  
  try {
    return JSON.parse(localStorage.getItem(ERROR_LOG_KEY) || '[]');
  } catch (e) {
    return [];
  }
}

/**
 * Clear error logs
 */
export function clearErrorLogs() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ERROR_LOG_KEY);
}
