'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, X, BookOpen, Languages, GraduationCap, Hash, Award, BookMarked } from 'lucide-react';
import { searchContent, getSearchSuggestions, type SearchResult } from '@/lib/utils/search';
import { useRouter } from 'next/navigation';

const typeIcons: Record<SearchResult['type'], any> = {
  vocabulary: Languages,
  reading: BookOpen,
  dialogue: BookOpen,
  grammar: GraduationCap,
  course: BookMarked,
  alphabet: Hash,
  number: Hash,
};

const typeLabels: Record<SearchResult['type'], string> = {
  vocabulary: 'Vocabulario',
  reading: 'Lectura',
  dialogue: 'Diálogo',
  grammar: 'Gramática',
  course: 'Curso',
  alphabet: 'Alfabeto',
  number: 'Número',
};

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [filters, setFilters] = useState<{
    types?: SearchResult['type'][];
    category?: string;
    level?: string;
  }>({});
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (query.trim().length >= 2) {
      const searchResults = searchContent(query, filters);
      setResults(searchResults);
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [query, filters]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResultClick = (result: SearchResult) => {
    router.push(result.url);
    setQuery('');
    setShowResults(false);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim().length >= 2 && setShowResults(true)}
          placeholder="Buscar en todo el contenido..."
          className="w-full pl-12 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setShowResults(false);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {showResults && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto z-50">
          {results.map((result) => {
            const Icon = typeIcons[result.type];
            return (
              <button
                key={result.id}
                onClick={() => handleResultClick(result)}
                className="w-full text-left p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-start gap-3">
                  <Icon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900">{result.title}</span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                        {typeLabels[result.type]}
                      </span>
                      {result.level && (
                        <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded capitalize">
                          {result.level}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{result.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {showResults && query.trim().length >= 2 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-8 text-center z-50">
          <p className="text-gray-500">No se encontraron resultados</p>
        </div>
      )}
    </div>
  );
}
