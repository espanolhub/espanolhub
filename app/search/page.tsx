'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, BookOpen, MessageSquare, Gamepad2, Languages, GraduationCap, Hash, FileText } from 'lucide-react';
import { vocabulary } from '@/lib/data/vocabulary';
import { readingLessons } from '@/lib/data/reading';
import { dialogues } from '@/lib/data/dialogues';
import { games } from '@/lib/data/games';
import { usefulSentencesData } from '@/lib/data/useful-sentences';
import { Cairo } from 'next/font/google';

const cairo = Cairo({
  variable: '--font-cairo',
  subsets: ['arabic', 'latin'],
  weight: ['400', '600', '700'],
});

interface SearchResult {
  type: 'vocabulary' | 'lesson' | 'dialogue' | 'game' | 'sentence';
  id: string;
  title: string;
  description?: string;
  url: string;
  category?: string;
  level?: string;
}

function SearchContent() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [activeTab, setActiveTab] = useState<'all' | 'vocabulary' | 'lessons' | 'dialogues' | 'games' | 'sentences'>('all');

  useEffect(() => {
    setSearchQuery(queryParam);
  }, [queryParam]);

  // Search function
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.trim().toLowerCase();
    const results: SearchResult[] = [];

    // Search Vocabulary
    if (activeTab === 'all' || activeTab === 'vocabulary') {
      vocabulary.forEach(word => {
        const translations = Array.isArray(word.translation) ? word.translation : [word.translation];
        const translationText = translations.join(', ');
        const translationMatches = translations.some(t => t.toLowerCase().includes(query));
        if (
          word.word.toLowerCase().includes(query) ||
          translationMatches ||
          word.category.toLowerCase().includes(query)
        ) {
          results.push({
            type: 'vocabulary',
            id: word.word,
            title: word.word,
            description: translationText,
            url: '/vocabulario',
            category: word.category,
          });
        }
      });
    }

    // Search Lessons
    if (activeTab === 'all' || activeTab === 'lessons') {
      readingLessons.forEach(lesson => {
        if (
          lesson.title.toLowerCase().includes(query) ||
          lesson.text.toLowerCase().includes(query) ||
          lesson.level.toLowerCase().includes(query)
        ) {
          results.push({
            type: 'lesson',
            id: lesson.id,
            title: lesson.title,
            description: lesson.text.substring(0, 150) + '...',
            url: '/lectura',
            level: lesson.level,
          });
        }
      });
    }

    // Search Dialogues
    if (activeTab === 'all' || activeTab === 'dialogues') {
      dialogues.forEach(dialogue => {
        const dialogueText = dialogue.dialogue.map(d => d.text).join(' ');
        if (
          dialogue.title.toLowerCase().includes(query) ||
          dialogueText.toLowerCase().includes(query) ||
          dialogue.category.toLowerCase().includes(query) ||
          dialogue.level.toLowerCase().includes(query)
        ) {
          results.push({
            type: 'dialogue',
            id: dialogue.id,
            title: dialogue.title,
            description: dialogueText.substring(0, 150) + '...',
            url: '/lectura',
            category: dialogue.category,
            level: dialogue.level,
          });
        }
      });
    }

    // Search Games
    if (activeTab === 'all' || activeTab === 'games') {
      games.forEach(game => {
        if (
          game.name.toLowerCase().includes(query) ||
          game.description.toLowerCase().includes(query)
        ) {
          results.push({
            type: 'game',
            id: game.id,
            title: game.name,
            description: game.description,
            url: '/juegos',
          });
        }
      });
    }

    // Search Sentences
    if (activeTab === 'all' || activeTab === 'sentences') {
      usefulSentencesData.forEach(group => {
        group.sentences.forEach(sentence => {
          if (
            sentence.spanish.toLowerCase().includes(query) ||
            sentence.arabic.includes(query) ||
            group.title.toLowerCase().includes(query) ||
            sentence.context.toLowerCase().includes(query)
          ) {
            results.push({
              type: 'sentence',
              id: sentence.id,
              title: sentence.spanish,
              description: sentence.arabic,
              url: '/lectura',
              category: group.title,
              level: sentence.level,
            });
          }
        });
      });
    }

    return results;
  }, [searchQuery, activeTab]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    // Update URL without reload
    window.history.pushState({}, '', `/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const getTypeIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'vocabulary':
        return Languages;
      case 'lesson':
        return BookOpen;
      case 'dialogue':
        return MessageSquare;
      case 'game':
        return Gamepad2;
      case 'sentence':
        return FileText;
      default:
        return Search;
    }
  };

  const getTypeLabel = (type: SearchResult['type']) => {
    switch (type) {
      case 'vocabulary':
        return 'Vocabulario';
      case 'lesson':
        return 'Lección';
      case 'dialogue':
        return 'Diálogo';
      case 'game':
        return 'Juego';
      case 'sentence':
        return 'Frase';
      default:
        return 'Resultado';
    }
  };

  const resultsByType = useMemo(() => {
    const grouped: Record<string, SearchResult[]> = {
      vocabulary: [],
      lesson: [],
      dialogue: [],
      game: [],
      sentence: [],
    };
    searchResults.forEach(result => {
      grouped[result.type].push(result);
    });
    return grouped;
  }, [searchResults]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Buscar
          </h1>
          <p className="text-lg text-gray-600">
            Encuentra lecciones, ejercicios, vocabulario y más
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="¿Qué quieres aprender hoy? (ماذا تريد أن تتعلم اليوم؟)"
              className="w-full pl-14 pr-14 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500"
              dir="ltr"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Limpiar búsqueda"
              >
                ×
              </button>
            )}
          </div>
        </form>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {(['all', 'vocabulary', 'lessons', 'dialogues', 'games', 'sentences'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {tab === 'all' ? 'Todos' : tab === 'vocabulary' ? 'Vocabulario' : tab === 'lessons' ? 'Lecciones' : tab === 'dialogues' ? 'Diálogos' : tab === 'games' ? 'Juegos' : 'Frases'}
            </button>
          ))}
        </div>

        {/* Results */}
        {searchQuery.trim() ? (
          searchResults.length > 0 ? (
            <div className="space-y-6">
              {/* Results Count */}
              <div className="text-center">
                <p className="text-gray-600">
                  Se encontraron <span className="font-bold text-blue-600">{searchResults.length}</span> resultado{searchResults.length !== 1 ? 's' : ''}
                </p>
              </div>

              {/* Grouped Results */}
              {(['vocabulary', 'lesson', 'dialogue', 'game', 'sentence'] as const).map(type => {
                if (resultsByType[type].length === 0) return null;
                const Icon = getTypeIcon(type);
                return (
                  <div key={type} className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Icon className="w-5 h-5 text-blue-600" />
                      <h2 className="text-xl font-bold text-gray-800">
                        {getTypeLabel(type)} ({resultsByType[type].length})
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {resultsByType[type].map((result) => (
                        <Link
                          key={result.id}
                          href={result.url}
                          className="block p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors border border-gray-200 hover:border-blue-300"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-gray-800 line-clamp-2">
                              {result.title}
                            </h3>
                            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full flex-shrink-0 ml-2">
                              {getTypeLabel(result.type)}
                            </span>
                          </div>
                          {result.description && (
                            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                              {result.description}
                            </p>
                          )}
                          <div className="flex gap-2 flex-wrap mt-2">
                            {result.category && (
                              <span className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded">
                                {result.category}
                              </span>
                            )}
                            {result.level && (
                              <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded capitalize">
                                {result.level}
                              </span>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                No se encontraron resultados
              </h2>
              <p className="text-gray-600 mb-6">
                No encontramos nada que coincida con "{searchQuery}"
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/vocabulario" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Vocabulario
                </Link>
                <Link href="/lectura" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Lectura
                </Link>
                <Link href="/gramatica" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Gramática
                </Link>
                <Link href="/juegos" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Juegos
                </Link>
              </div>
            </div>
          )
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Busca en Espanol Hub
            </h2>
            <p className="text-gray-600 mb-6">
              Ingresa una palabra o frase para buscar en nuestro contenido
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {['gramática', 'verbos', 'vocabulario', 'alfabeto', 'números', 'lectura'].map((term) => (
                <button
                  key={term}
                  onClick={() => setSearchQuery(term)}
                  className="px-4 py-2 bg-gray-100 hover:bg-blue-50 text-gray-700 hover:text-blue-600 rounded-lg text-sm font-medium transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Search className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Cargando búsqueda...</p>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
