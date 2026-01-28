'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { vocabularyCategories } from '@/lib/data/vocabulary';
import { getDictionaryByCategory, getDictionary } from '@/lib/data/dictionary';
import AudioPlayer from '@/components/AudioPlayer';
import EnhancedPronunciation from '@/components/EnhancedPronunciation';
import VoiceSearch from '@/components/VoiceSearch';
import { 
  Palette, Coffee, Users, Cat, Home, Shirt, User, Play, BookOpen, Heart, 
  MapPin, Car, GraduationCap, HeartPulse, Smile, Building, Share2, Search 
} from 'lucide-react';

// Category icon mapping
const categoryIcons: Record<string, any> = {
  colores: Palette,
  comida: Coffee,
  familia: Users,
  animales: Cat,
  casa: Home,
  ropa: Shirt,
  cuerpo: User,
  verbos: Play,
  adjetivos: BookOpen,
  tiempo: MapPin,
  profesiones: GraduationCap,
  deportes: Play,
  escuela: GraduationCap,
  salud: HeartPulse,
  emociones: Smile,
  lugares: MapPin,
  transporte: Car,
  trabajo: Building,
  numeros: BookOpen,
  tecnologia: Share2,
  educacion: GraduationCap,
  tiendas: Building,
  naturaleza: Heart,
};

function VocabularioContent() {
  // Get category from URL query params
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams?.get('category');
  
  const [selectedCategory, setSelectedCategory] = useState<string>('verbos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Set initial category from URL on mount
  useEffect(() => {
    if (categoryFromUrl && vocabularyCategories.includes(categoryFromUrl)) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  // Local (Spanish-only) search for vocabulario UI:
  // We intentionally do NOT use Arabic translations in search results.
  const words = useMemo(() => {
    try {
      const q = searchQuery.trim().toLowerCase();

      const baseList = getDictionaryByCategory(selectedCategory) || [];
      const list = q
        ? baseList.filter((d) => {
            const w = (d.word || '').toLowerCase();
            const p = (d.pronunciation || '').toLowerCase();
            const tags = Array.isArray((d as any).tags) ? ((d as any).tags as string[]).join(' ').toLowerCase() : '';
            return w.includes(q) || p.includes(q) || tags.includes(q);
          })
        : baseList;

      return list.map(d => ({
        word: d.word || '',
        pronunciation: d.pronunciation || '',
        audio: d.audio || undefined,
        category: d.category || selectedCategory,
      }));
    } catch (error) {
      console.error('Error loading vocabulary:', error);
      return [];
    }
  }, [selectedCategory, searchQuery]);
  
  const CategoryIcon = categoryIcons[selectedCategory] || BookOpen;

  // Web Speech API - Pronounce word on click
  const pronounceWord = (word: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'es-ES';
      utterance.rate = 0.65;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      const voices = window.speechSynthesis.getVoices();
      const spanishVoice = voices.find(voice => 
        voice.lang.startsWith('es-ES') && 
        (voice.name.toLowerCase().includes('castilian') || 
         voice.name.toLowerCase().includes('spain') || 
         voice.name.toLowerCase().includes('peninsular'))
      ) || voices.find(voice => 
        voice.lang.startsWith('es-ES') && 
        !voice.name.toLowerCase().includes('latin')
      ) || voices.find(voice => voice.lang.startsWith('es-ES'));
      
      if (spanishVoice) {
        utterance.voice = spanishVoice;
      }
      
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-white py-8 md:py-12">
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Enhanced Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
            Vocabulario Español con Voz 🎤
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Amplía tu vocabulario con más de {(getDictionary()?.length ?? 0)} palabras organizadas en {vocabularyCategories.length} categorías temáticas. Aprende con iconos y pronunciación (audio) en español.
          </p>
          
        </div>

        {/* Enhanced Search Bar with Voice Search */}
        <div className="mb-6 md:mb-8 max-w-2xl mx-auto">
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" aria-hidden="true" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar palabra en español..."
              className="w-full pl-12 pr-4 py-3 md:py-4 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none text-base md:text-lg shadow-sm hover:shadow-md transition-shadow"
              dir="auto"
            />
          </div>
          
          {/* Voice Search */}
          <VoiceSearch
            onTranscript={(text) => setSearchQuery(text)}
            placeholder="Di la palabra que buscas..."
            className="w-full"
          />
        </div>

        {/* Category Selector */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 mb-8 md:mb-10"
          role="tablist"
          aria-label="Categorías de vocabulario"
        >
          {vocabularyCategories.map((category) => {
            const Icon = categoryIcons[category] || BookOpen;
            return (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setSelectedCategory(category);
                  setSearchQuery('');
                }}
                className={`px-3 md:px-4 py-3 md:py-3.5 rounded-lg font-semibold transition-all capitalize flex items-center justify-center gap-2 text-sm md:text-base border ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white border-purple-600'
                    : 'bg-white text-gray-900 hover:bg-gray-50 border-gray-200'
                }`}
                style={selectedCategory === category ? { textShadow: '1px 1px 2px rgba(0,0,0,0.8)' } : {}}
                role="tab"
                aria-selected={selectedCategory === category}
                aria-label={`Categoría ${category}`}
              >
                <Icon className={`w-5 h-5 ${selectedCategory === category ? 'text-white' : 'text-gray-900'}`} aria-hidden="true" />
                <span className={`hidden sm:inline ${selectedCategory === category ? 'text-white' : 'text-gray-900'}`}>{category}</span>
              </button>
            );
          })}
        </div>

        {/* Words Grid */}
        {words.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No se encontraron palabras con "{searchQuery}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6 mb-12">
            {words.map((word, index) => (
              <div
                key={`${word.category}-${word.word}-${index}`}
                className="bg-white rounded-xl shadow-md hover:shadow-2xl p-4 md:p-5 lg:p-6 transform transition-all duration-300 hover:scale-105 text-left w-full border-2 border-transparent"
                aria-label={`Palabra: ${word.word}`}
              >
                <div className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-gray-900 rounded-full flex items-center justify-center border border-gray-800">
                      <CategoryIcon className="w-6 h-6 md:w-7 md:h-7 text-white" aria-hidden="true" />
                    </div>
                  </div>

                  <div
                    className="text-xl md:text-2xl font-bold text-blue-600 mb-4 cursor-pointer hover:text-blue-700 transition-colors break-words flex items-center justify-center gap-2"
                    onClick={() => pronounceWord(word.word)}
                    title="Haz clic para pronunciar"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        pronounceWord(word.word);
                      }
                    }}
                  >
                    {word.word}
                    <EnhancedPronunciation text={word.word} className="ml-2" showControls={false} />
                  </div>

                  <AudioPlayer text={word.word} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Statistics */}
        <div className="mt-12 bg-gray-900 text-white rounded-lg p-6 md:p-8 text-center border border-gray-800">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Estadísticas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white/10 rounded-xl p-4 md:p-6 backdrop-blur-sm">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-white">{(getDictionary()?.length ?? 0)}</div>
              <div className="text-base md:text-lg font-semibold text-white">Palabras Totales</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 md:p-6 backdrop-blur-sm">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-white">{vocabularyCategories.length}</div>
              <div className="text-base md:text-lg font-semibold text-white">Categorías</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 md:p-6 backdrop-blur-sm">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-white">{words.length}</div>
              <div className="text-base md:text-lg font-semibold text-white">{searchQuery ? 'Resultados' : 'En esta Categoría'}</div>
            </div>
          </div>
        </div>

        {/* Ads Container - End of Lesson Section */}
        <div className="ads-container mt-8 mb-4"></div>
      </div>
    </div>
  );
}

export default function VocabularioPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-600"></div></div>}>
      <VocabularioContent />
    </Suspense>
  );
}
