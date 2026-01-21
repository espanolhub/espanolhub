'use client';

import { useState, useMemo } from 'react';
import { numbers, numberToWords } from '@/lib/data/numbers';
import AudioPlayer from '@/components/AudioPlayer';
import { Hash, Sparkles, BookOpen, Star } from 'lucide-react';

export default function NumerosPage() {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [showRange, setShowRange] = useState<'0-20' | '20-100' | '100-1000'>('0-20');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Memoize الأرقام المفلترة
  const numbersInRange = useMemo(() => {
    // إذا كان هناك بحث، نبحث في جميع البيانات أولاً
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      const numMatch = query.match(/^\d+$/); // رقم كامل فقط
      
      if (numMatch) {
        const searchNum = parseInt(numMatch[0], 10);
        if (!isNaN(searchNum) && searchNum >= 0 && searchNum <= 10000) {
          // البحث عن تطابق دقيق للرقم في البيانات
          const exactMatch = numbers.find(n => n.number === searchNum);
          if (exactMatch) {
            return [exactMatch];
          }
          
          // إذا لم نجد الرقم في البيانات، ننشئه ديناميكياً
          const wordForNum = numberToWords(searchNum);
          if (wordForNum && wordForNum !== searchNum.toString()) {
            // إنشاء رقم ديناميكي للعرض
            const dynamicNumber: typeof numbers[0] = {
              number: searchNum,
              word: wordForNum,
              pronunciation: '' // يمكن إضافة نطق لاحقاً إذا لزم الأمر
            };
            return [dynamicNumber];
          }
        }
      }
      
      // البحث النصي في الكلمات
      let filtered = numbers.filter(n => 
        n.word.toLowerCase().includes(query) ||
        n.pronunciation.toLowerCase().includes(query)
      );
      
      // تطبيق فلتر النطاق إذا لم نجد نتائج أو إذا كان البحث نصي
      if (filtered.length > 0 || !numMatch) {
        if (showRange === '0-20') {
          filtered = filtered.filter(n => n.number >= 0 && n.number <= 20);
        } else if (showRange === '20-100') {
          filtered = filtered.filter(n => n.number > 20 && n.number <= 100);
        } else {
          filtered = filtered.filter(n => n.number > 100);
        }
      }
      
      return filtered;
    }
    
    // بدون بحث، نطبق الفلتر فقط
    if (showRange === '0-20') {
      return numbers.filter(n => n.number >= 0 && n.number <= 20);
    } else if (showRange === '20-100') {
      return numbers.filter(n => n.number > 20 && n.number <= 100);
    } else {
      return numbers.filter(n => n.number > 100);
    }
  }, [searchQuery, showRange]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-12">
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Enhanced Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-blue-100 px-4 py-2 rounded-full mb-6">
            <Hash className="w-4 h-4 text-green-600" />
            <span className="text-sm font-semibold text-green-600">0 - 1000+ Números</span>
            <Star className="w-4 h-4 text-green-600" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
              Números en Español
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-3">
            Aprende los números con pronunciación perfecta
          </p>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Del 0 al 1000+ con audio, ejercicios y práctica interactiva
          </p>
        </div>

        {/* Search Box */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar por número o palabra en español (ej: 810, ocho, ochocientos)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 text-lg border-2 border-green-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-300 focus:border-green-500 shadow-lg"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-2xl font-bold"
                aria-label="Limpiar búsqueda"
              >
                ×
              </button>
            )}
          </div>
          {searchQuery && (() => {
            const results = numbersInRange;
            const numMatch = searchQuery.trim().match(/\d+/);
            let wordForNum = '';
            let searchNum: number | null = null;
            if (numMatch && results.length === 0) {
              searchNum = parseInt(numMatch[0], 10);
              if (!isNaN(searchNum) && searchNum >= 0 && searchNum <= 10000) {
                wordForNum = numberToWords(searchNum);
              }
            }
            
            return (
              <p className="text-sm text-gray-600 mt-2 text-center">
                {results.length === 0 
                  ? (
                    <span>
                      No se encontraron resultados
                      {wordForNum && searchNum !== null && wordForNum !== searchNum.toString() && (
                        <span className="block mt-1 font-semibold text-green-600">
                          ({searchQuery.trim()} = {wordForNum})
                        </span>
                      )}
                    </span>
                  )
                  : `${results.length} resultado${results.length !== 1 ? 's' : ''} encontrado${results.length !== 1 ? 's' : ''}`
                }
              </p>
            );
          })()}
        </div>

        {/* Range Selector */}
        <div className="flex justify-center mb-8 space-x-4">
          <button
            onClick={() => setShowRange('0-20')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              showRange === '0-20'
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            0 - 20
          </button>
          <button
            onClick={() => setShowRange('20-100')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              showRange === '20-100'
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            20 - 100
          </button>
          <button
            onClick={() => setShowRange('100-1000')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              showRange === '100-1000'
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            100 - 1000+
          </button>
        </div>

        {/* Numbers Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-12">
          {numbersInRange.map((num) => (
            <div
              key={num.number}
              onClick={() => setSelectedNumber(selectedNumber === num.number ? null : num.number)}
              className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                selectedNumber === num.number ? 'ring-4 ring-green-500' : ''
              }`}
            >
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {num.number}
                </div>
                <div className="text-lg text-gray-800 font-semibold mb-1">
                  {num.word}
                </div>
                {num.pronunciation && (
                  <div className="text-xs text-gray-500 italic">
                    {num.pronunciation}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Selected Number Details */}
        {selectedNumber !== null && (
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl mx-auto mb-12">
            {(() => {
              const num = numbers.find(n => n.number === selectedNumber);
              if (!num) return null;
              
              return (
                <>
                  <div className="text-center mb-6">
                    <div className="text-8xl font-bold text-green-600 mb-4">
                      {num.number}
                    </div>
                    <h2 className="text-4xl font-bold text-gray-800 mb-2">
                      {num.word}
                    </h2>
                    <p className="text-xl text-gray-600 italic mb-4">
                      Pronunciación: {num.pronunciation}
                    </p>
                    <AudioPlayer text={num.word} />
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* Number Table */}
        <div className="bg-white rounded-xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Tabla de Números
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-green-100">
                  <th className="px-4 py-3 font-semibold text-gray-800">Número</th>
                  <th className="px-4 py-3 font-semibold text-gray-800">Palabra</th>
                  <th className="px-4 py-3 font-semibold text-gray-800">Pronunciación</th>
                </tr>
              </thead>
              <tbody>
                {numbers.slice(0, 21).map((num) => (
                  <tr key={num.number} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-bold text-green-600">{num.number}</td>
                    <td className="px-4 py-3">{num.word}</td>
                    <td className="px-4 py-3 text-gray-600 italic">{num.pronunciation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Ads Container - End of Lesson Section */}
      <div className="ads-container mt-8 mb-4"></div>
    </div>
  );
}
