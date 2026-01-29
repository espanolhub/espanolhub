'use client';

import React from 'react';
import { AlertTriangle, RefreshCw, WifiOff, ServerCrash } from 'lucide-react';

interface GameErrorProps {
  error?: string;
  onRetry?: () => void;
  onBack?: () => void;
  type?: 'network' | 'server' | 'general' | 'loading';
}

export default function GameError({ 
  error, 
  onRetry, 
  onBack, 
  type = 'general' 
}: GameErrorProps) {
  const getErrorIcon = () => {
    switch (type) {
      case 'network':
        return <WifiOff className="w-8 h-8 text-orange-600" />;
      case 'server':
        return <ServerCrash className="w-8 h-8 text-red-600" />;
      default:
        return <AlertTriangle className="w-8 h-8 text-yellow-600" />;
    }
  };

  const getErrorTitle = () => {
    switch (type) {
      case 'network':
        return 'Connection Error';
      case 'server':
        return 'Server Error';
      case 'loading':
        return 'Loading Error';
      default:
        return 'Unexpected Error';
    }
  };

  const getErrorMessage = () => {
    switch (type) {
      case 'network':
        return 'Cannot connect to server. Please check your internet connection and try again.';
      case 'server':
        return 'Server is currently experiencing issues. Please try again in a moment.';
      case 'loading':
        return 'Failed to load game data. Please refresh the page and try again.';
      default:
        return error || 'An unexpected error occurred in the game. Please try again.';
    }
  };

  return (
    <div className="min-h-[400px] flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
          {getErrorIcon()}
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {getErrorTitle()}
        </h2>
        
        <p className="text-gray-600 mb-6">
          {getErrorMessage()}
        </p>

        {error && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-2">
              تفاصيل الخطأ:
            </p>
            <p className="text-xs text-gray-500 font-mono">
              {error}
            </p>
          </div>
        )}

        <div className="flex gap-3 justify-center flex-wrap">
          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              إعادة المحاولة
            </button>
          )}
          
          {onBack && (
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              العودة للألعاب
            </button>
          )}
        </div>

        {type === 'network' && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>نصيحة:</strong> تأكد من أن اتصالك بالإنترنت يعمل بشكل جيد وحاول مرة أخرى.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
