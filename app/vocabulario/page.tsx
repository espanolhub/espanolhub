'use client';

import { useState, useMemo, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { vocabularyCategories } from '@/lib/data/vocabulary';
import { normalizeArabic } from '@/lib/utils/normalizeArabic';
import { searchDictionary, getDictionaryByCategory, getDictionaryByWord, getDictionary } from '@/lib/data/dictionary';
import AudioPlayer from '@/components/AudioPlayer';
import DictionaryModal from '@/components/DictionaryModal';
import { 
  Palette, Coffee, Users, Cat, Home, Shirt, User, Play, BookOpen, Heart, 
  MapPin, Car, GraduationCap, HeartPulse, Smile, Building, Share2, Search 
} from 'lucide-react';
import { useTranslations, TranslationToggleButton } from '@/lib/hooks/useTranslations';

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
  
  // Translation toggle
  const [showTranslations, setShowTranslations] = useTranslations();
  
  const [selectedCategory, setSelectedCategory] = useState<string>('verbos');
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const cardRef = useRef<HTMLDivElement>(null);

  // Set initial category from URL on mount
  useEffect(() => {
    if (categoryFromUrl && vocabularyCategories.includes(categoryFromUrl)) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  // Memoize filtered words with search using centralized dictionary
  const words = useMemo(() => {
    const q = searchQuery.trim();

    if (!q) {
      // Use dictionary by category
      const list = getDictionaryByCategory(selectedCategory);
      return list.map(d => ({
        word: d.word,
        translation: d.translations || [],
        pronunciation: d.pronunciation || '',
        example: d.example || '',
        audio: d.audio || undefined,
        category: d.category || selectedCategory,
      }));
    }

    const results = searchDictionary(q);
    // If searching within a category, filter results to that category
    const filtered = results.filter(r => {
      if (!r.category) return true;
      return r.category.toLowerCase() === selectedCategory.toLowerCase();
    });

    return filtered.map(d => ({
      word: d.word,
      translation: d.translations || [],
      pronunciation: d.pronunciation || '',
      example: d.example || '',
      audio: d.audio || undefined,
      category: d.category || selectedCategory,
    }));
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

  // Share as Image function
  const handleShareAsImage = async () => {
    if (!cardRef.current || !selectedWord) return;
    
    setIsGeneratingImage(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
      });
      
      canvas.toBlob((blob) => {
        if (!blob) return;
        
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `vocabulario-${selectedWord}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        setIsGeneratingImage(false);
      }, 'image/png');
    } catch (error) {
      console.error('Error generating image:', error);
      setIsGeneratingImage(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-8 md:py-12">
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
            Vocabulario Español
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Amplía tu vocabulario con más de {getDictionary().length} palabras organizadas en {vocabularyCategories.length} categorías temáticas
          </p>
          
          {/* Translation Toggle Button */}
          <div className="mt-4 md:mt-6">
            <TranslationToggleButton
              showTranslations={showTranslations}
              onClick={() => setShowTranslations(!showTranslations)}
            />
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6 md:mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" aria-hidden="true" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Buscar palabra en español${showTranslations ? ' o árabe' : ''}...${showTranslations ? ' / ابحث عن كلمة بالإسبانية أو العربية...' : ''}`}
              className="w-full pl-12 pr-4 py-3 md:py-4 border-2 border-gray-300 rounded-xl focus:border-yellow-500 focus:outline-none text-base md:text-lg shadow-sm hover:shadow-md transition-shadow"
              dir="auto"
            />
          </div>
        </div>

        {/* Category Selector - Improved Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 mb-8 md:mb-10" role="tablist" aria-label="Categorías de vocabulario">
          {vocabularyCategories.map((category) => {
            const Icon = categoryIcons[category] || BookOpen;
            return (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setSelectedCategory(category);
                  setSelectedWord(null);
                  setSearchQuery('');
                }}
                className={`px-3 md:px-4 py-3 md:py-3.5 rounded-lg font-semibold transition-all capitalize flex items-center justify-center gap-2 text-sm md:text-base border ${
                  selectedCategory === category
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200'
                }`}
                role="tab"
                aria-selected={selectedCategory === category}
                aria-label={`Categoría ${category}`}
              >
                <Icon className={`w-5 h-5 ${selectedCategory === category ? 'text-white' : 'text-gray-700'}`} aria-hidden="true" />
                <span className="hidden sm:inline">{category}</span>
              </button>
            );
          })}
        </div>

        {/* Words Grid - Improved Responsive */}
        {words.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No se encontraron palabras con "{searchQuery}"</p>
            <div className="mt-6">
              <button
                onClick={async () => {
                  try {
                    const res = await fetch('/api/suggestions', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ word: searchQuery, category: selectedCategory })
                    });
                    if (res.ok) {
                      try { (window as any).__showToast?.('Sugerencia enviada. Gracias!', 'success'); } catch(e){}
                    } else {
                      try { (window as any).__showToast?.('No se pudo enviar la sugerencia', 'error'); } catch(e){}
                    }
                  } catch (e) {
                    try { (window as any).__showToast?.('Error al enviar sugerencia', 'error'); } catch(e){}
                  }
                }}
                className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-white border border-yellow-600 text-yellow-600 rounded-lg font-semibold hover:bg-yellow-50 transition"
              >
                Sugerir palabra
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6 mb-12">
            {words.map((word, index) => (
              <div
                key={index}
                onClick={() => {
                  const wasSelected = selectedWord === word.word;
                  setSelectedWord(wasSelected ? null : word.word);
                  
                  // Update daily challenge progress for vocabulary (only when selecting, not deselecting)
                  if (!wasSelected) {
                    try {
                      const { updateChallengeProgress } = require('@/lib/utils/dailyChallenge');
                      updateChallengeProgress('learn-vocabulary', 1);
                    } catch (e) {
                      // Ignore if module not available
                    }
                  }
                }}
                className={`bg-white rounded-xl shadow-md hover:shadow-2xl p-4 md:p-5 lg:p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 text-left w-full border-2 ${
                  selectedWord === word.word ? 'ring-4 ring-yellow-500 border-yellow-400' : 'border-transparent'
                }`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedWord(selectedWord === word.word ? null : word.word);
                  }
                }}
                aria-label={`Palabra: ${word.word} - ${Array.isArray(word.translation) ? word.translation.join(', ') : word.translation}`}
                aria-pressed={selectedWord === word.word}
              >
                <div className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-gray-900 rounded-full flex items-center justify-center border border-gray-800">
                      <CategoryIcon className="w-6 h-6 md:w-7 md:h-7 text-white" aria-hidden="true" />
                    </div>
                  </div>
                  <div 
                    className="text-xl md:text-2xl font-bold text-yellow-600 mb-2 cursor-pointer hover:text-yellow-700 transition-colors break-words"
                    onClick={(e) => {
                      e.stopPropagation();
                      pronounceWord(word.word);
                    }}
                    title="Haz clic para pronunciar"
                  >
                    {word.word}
                  </div>
                  <div className="text-base md:text-lg text-gray-800 font-semibold mb-1 break-words">
                    {Array.isArray(word.translation) ? word.translation.join(' / ') : word.translation}
                  </div>
                  <div className="text-sm text-gray-500 italic mb-3">
                    {word.pronunciation}
                  </div>
                  <AudioPlayer text={word.word} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Selected Word Modal */}
        {selectedWord && (() => {
          const entry = getDictionaryByWord(selectedWord);
          return (
            <DictionaryModal
              open={!!entry}
              entry={entry}
              onClose={() => setSelectedWord(null)}
            />
          );
        })()}

        {/* Statistics */}
        <div className="mt-12 bg-gray-900 text-white rounded-lg p-6 md:p-8 text-center border border-gray-800">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Estadísticas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white/10 rounded-xl p-4 md:p-6 backdrop-blur-sm">
              <div className="text-4xl md:text-5xl font-bold mb-2">{getDictionary().length}</div>
              <div className="text-base md:text-lg font-semibold">Palabras Totales</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 md:p-6 backdrop-blur-sm">
              <div className="text-4xl md:text-5xl font-bold mb-2">{vocabularyCategories.length}</div>
              <div className="text-base md:text-lg font-semibold">Categorías</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 md:p-6 backdrop-blur-sm">
              <div className="text-4xl md:text-5xl font-bold mb-2">{words.length}</div>
              <div className="text-base md:text-lg font-semibold">{searchQuery ? 'Resultados' : 'En esta Categoría'}</div>
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
