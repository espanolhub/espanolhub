'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Search, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsSearching(true);
    // Close overlay
    onClose();
    // Navigate to search results or perform search
    // For now, we'll navigate to a search page with query params
    router.push(`/search?q=${encodeURIComponent(query)}`);
    setQuery('');
    setIsSearching(false);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 md:pt-32 px-4 bg-black bg-opacity-60 backdrop-blur-md"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
          aria-label="Cerrar búsqueda"
        >
          <X className="w-6 h-6 text-gray-500" />
        </button>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="p-6 md:p-8">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Buscar en Espanol Hub
            </h2>
            <p className="text-gray-600">
              Encuentra lecciones, ejercicios, vocabulario y más
            </p>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="¿Qué quieres aprender hoy? (ماذا تريد أن تتعلم اليوم؟)"
              className="w-full pl-14 pr-14 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500"
              dir="ltr"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Limpiar búsqueda"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            )}
          </div>

          {/* Quick Suggestions */}
          <div className="mt-6">
            <p className="text-sm font-medium text-gray-700 mb-3">Búsquedas populares:</p>
            <div className="flex flex-wrap gap-2">
              {['gramática', 'verbos', 'vocabulario', 'alfabeto', 'números', 'lectura'].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => {
                    setQuery(term);
                    inputRef.current?.focus();
                  }}
                  className="px-4 py-2 bg-gray-100 hover:bg-blue-50 text-gray-700 hover:text-blue-600 rounded-lg text-sm font-medium transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            disabled={!query.trim() || isSearching}
            className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSearching ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Buscando...</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span>Buscar</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
