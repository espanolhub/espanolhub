'use client';

import { useState } from 'react';
import { alphabet } from '@/lib/data/alphabet';
import AudioPlayer from '@/components/AudioPlayer';
import { Languages, Sparkles, BookOpen, Star } from 'lucide-react';

export default function AlfabetoPage() {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Enhanced Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full mb-6">
            <Languages className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-600">27 Letras del Alfabeto</span>
            <Star className="w-4 h-4 text-blue-600" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Alfabeto Español
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-3">
            Domina cada letra con pronunciación perfecta
          </p>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Aprende las 27 letras con audio, ejemplos y práctica interactiva
          </p>
        </div>

        {/* Letters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
          {alphabet.map((letter) => (
            <button
              key={letter.letter}
              type="button"
              onClick={() => setSelectedLetter(selectedLetter === letter.letter ? null : letter.letter)}
              className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 text-left w-full ${
                selectedLetter === letter.letter ? 'ring-4 ring-blue-500' : ''
              }`}
              aria-label={`Letra ${letter.letter} - ${letter.name}`}
              aria-pressed={selectedLetter === letter.letter}
            >
              <div className="text-center">
                <div className="text-5xl font-bold text-blue-600 mb-2">
                  {letter.letter}
                </div>
                <div className="text-sm text-gray-600 mb-2">{letter.name}</div>
                <div className="text-xs text-gray-500 italic">{letter.pronunciation}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Letter Details */}
        {selectedLetter && (
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-3xl mx-auto">
            {(() => {
              const letter = alphabet.find(l => l.letter === selectedLetter);
              if (!letter) return null;
              
              return (
                <>
                  <div className="text-center mb-6">
                    <div className="text-8xl font-bold text-blue-600 mb-4">
                      {letter.letter}
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                      {letter.name}
                    </h2>
                    <p className="text-xl text-gray-600 italic mb-4">
                      Pronunciación: {letter.pronunciation}
                    </p>
                    <AudioPlayer text={letter.name} />
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      Ejemplos de palabras:
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {letter.examples.map((example, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-4 text-center"
                        >
                          <div className="text-2xl font-bold text-gray-800 mb-2">
                            {example}
                          </div>
                          <AudioPlayer text={example} />
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 bg-blue-600 text-white rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Datos Interesantes</h2>
          <p className="text-lg mb-2">
            El alfabeto español tiene 27 letras, incluyendo la letra especial <strong>Ñ</strong> (eñe).
          </p>
          <p className="text-lg">
            Todas las letras tienen sonido, incluso la <strong>H</strong> que es silenciosa en algunas palabras.
          </p>
        </div>
      </div>

      {/* Ads Container - End of Lesson Section */}
      <div className="ads-container mt-8 mb-4"></div>
    </div>
  );
}
