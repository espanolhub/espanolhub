'use client';

import { useState, useMemo, useRef } from 'react';
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
};

export default function VocabularioPage() {
  // Translation toggle
  const [showTranslations, setShowTranslations] = useTranslations();
  
  const [selectedCategory, setSelectedCategory] = useState<string>('verbos');
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const cardRef = useRef<HTMLDivElement>(null);

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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 py-12">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Vocabulario Español
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Amplía tu vocabulario con categorías temáticas, imágenes y pronunciación.
          </p>
          
          {/* Translation Toggle Button */}
          <div className="mt-6">
            <TranslationToggleButton
              showTranslations={showTranslations}
              onClick={() => setShowTranslations(!showTranslations)}
            />
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Buscar palabra en español${showTranslations ? ' o árabe' : ''}...${showTranslations ? ' / ابحث عن كلمة بالإسبانية أو العربية...' : ''}`}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-yellow-500 focus:outline-none text-lg"
              dir="auto"
            />
          </div>
        </div>

        {/* Category Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-8" role="tablist" aria-label="Categorías de vocabulario">
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
                className={`px-6 py-3 rounded-lg font-semibold transition-all capitalize flex items-center gap-2 ${
                  selectedCategory === category
                    ? 'bg-yellow-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                role="tab"
                aria-selected={selectedCategory === category}
                aria-label={`Categoría ${category}`}
              >
                <Icon className="w-5 h-5" />
                {category}
              </button>
            );
          })}
        </div>

        {/* Words Grid */}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
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
                className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 text-left w-full ${
                  selectedWord === word.word ? 'ring-4 ring-yellow-500' : ''
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
                <div className="text-center mb-4">
                  <div className="flex justify-center mb-2">
                    <CategoryIcon className="w-8 h-8 text-yellow-600" />
                  </div>
                  <div 
                    className="text-2xl font-bold text-yellow-600 mb-2 cursor-pointer hover:text-yellow-700 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      pronounceWord(word.word);
                    }}
                    title="Haz clic para pronunciar"
                  >
                    {word.word}
                  </div>
                  <div className="text-lg text-gray-800 font-semibold mb-1">
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
        <div className="mt-12 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Estadísticas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-4xl font-bold">{getDictionary().length}</div>
              <div className="text-lg">Palabras Totales</div>
            </div>
            <div>
              <div className="text-4xl font-bold">{vocabularyCategories.length}</div>
              <div className="text-lg">Categorías</div>
            </div>
            <div>
              <div className="text-4xl font-bold">{words.length}</div>
              <div className="text-lg">{searchQuery ? 'Resultados' : 'En esta Categoría'}</div>
            </div>
          </div>
        </div>

        {/* Ads Container - End of Lesson Section */}
        <div className="ads-container mt-8 mb-4"></div>
      </div>
    </div>
  );
}
