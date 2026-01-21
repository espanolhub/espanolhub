'use client';

import { useState, useMemo } from 'react';
import SmartSentencesCard from './SmartSentencesCard';
import { sentences100, getRandomSentences, type Sentence } from '@/lib/data/sentences-100';
import { Cairo } from 'next/font/google';

const cairo = Cairo({
  variable: '--font-cairo',
  subsets: ['arabic', 'latin'],
  weight: ['400', '600', '700'],
});

// Category labels in Spanish and Arabic
const categoryLabels: Record<string, { es: string; ar: string }> = {
  'All': { es: 'Todas', ar: 'الكل' },
  'Restaurant': { es: 'Restaurante', ar: 'مطعم' },
  'Travel': { es: 'Viajes', ar: 'السفر' },
  'Feelings': { es: 'Sentimientos', ar: 'المشاعر' },
  'Shopping': { es: 'Compras', ar: 'التسوق' },
  'Work': { es: 'Trabajo', ar: 'العمل' },
  'Health': { es: 'Salud', ar: 'الصحة' },
  'Home': { es: 'Casa', ar: 'المنزل' },
  'Social': { es: 'Social', ar: 'اجتماعي' },
};

export default function SmartSentencesSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [refreshKey, setRefreshKey] = useState(0); // Key to force re-randomization

  // Get all unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(sentences100.map(s => s.category)));
    return ['All', ...uniqueCategories];
  }, []);

  // Filter sentences by category and select random subset
  const filteredSentences = useMemo(() => {
    let sentences = sentences100;
    
    if (selectedCategory !== 'All') {
      sentences = sentences.filter(sentence => sentence.category === selectedCategory);
    }
    
    // Select 18-24 random sentences (depending on available count)
    const count = Math.min(24, Math.max(18, sentences.length));
    const randomSentences = getRandomSentences(sentences, count);
    
    return randomSentences;
  }, [selectedCategory, refreshKey]); // Add refreshKey to dependencies

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 md:mb-3">
          Frases Inteligentes
        </h2>
        <p className={`text-base md:text-lg text-gray-600 ${cairo.variable}`} dir="rtl" style={{ fontFamily: 'var(--font-cairo), "Segoe UI", Tahoma, sans-serif' }}>
          (جمل ذكية)
        </p>
        <p className="text-sm md:text-base text-gray-600 mt-2">
          جمل عملية مختارة عشوائياً لتحسين مهاراتك في الإسبانية
        </p>
      </div>

      {/* Category Filter Chips - Improved Mobile Layout */}
      <div className="mb-6">
        <div className="flex flex-wrap justify-center gap-2 mb-4 px-2">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            const label = categoryLabels[category] || { es: category, ar: category };
            
            return (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setRefreshKey(prev => prev + 1); // Force re-randomization
                }}
                className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-md transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-purple-300'
                }`}
              >
                <span>{label.es}</span>
                <span 
                  className={`ml-1 md:ml-2 text-xs ${cairo.variable}`}
                  dir="rtl"
                  style={{ fontFamily: 'var(--font-cairo), "Segoe UI", Tahoma, sans-serif' }}
                >
                  ({label.ar})
                </span>
              </button>
            );
          })}
        </div>
        
        {/* Refresh Button */}
        <div className="text-center">
          <button
            onClick={() => setRefreshKey(prev => prev + 1)}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors border border-gray-300"
          >
            🔄 جمل جديدة (Nuevas Frases)
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-center mb-4 md:mb-6">
        <p className="text-gray-600 text-sm md:text-base">
          Mostrando <span className="font-bold text-purple-600">{filteredSentences.length}</span> frase{filteredSentences.length !== 1 ? 's' : ''} seleccionada{filteredSentences.length !== 1 ? 's' : ''} aleatoriamente
        </p>
      </div>

      {/* Sentences Grid - Improved Mobile Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredSentences.map((sentence) => (
          <SmartSentencesCard key={`${sentence.id}-${refreshKey}`} sentence={sentence} />
        ))}
      </div>

      {/* Empty State */}
      {filteredSentences.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            No se encontraron frases en esta categoría
          </p>
        </div>
      )}
    </div>
  );
}
