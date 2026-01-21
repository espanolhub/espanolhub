'use client';

import { presentTenseConjugations } from '@/lib/data/grammar';
import { numbers } from '@/lib/data/numbers';
import { alphabet } from '@/lib/data/alphabet';
import { vocabularyCategories, getVocabularyByCategory } from '@/lib/data/vocabulary';
import { Printer } from 'lucide-react';

export default function TablasPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 py-12 print-page">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 no-print">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Tablas Educativas
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Consulta tablas completas de verbos, adjetivos, artículos y más recursos. Todas las tablas son imprimibles.
          </p>
          <button
            onClick={handlePrint}
            className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center mx-auto"
          >
            <Printer className="w-5 h-5 mr-2" />
            Imprimir Todas las Tablas
          </button>
        </div>

        {/* Alphabet Table */}
        <div className="bg-white rounded-xl shadow-xl p-8 mb-8 print-page">
          <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
            Tabla del Alfabeto
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-indigo-100">
                  <th className="px-4 py-3 border border-gray-300 font-semibold text-gray-800">Letra</th>
                  <th className="px-4 py-3 border border-gray-300 font-semibold text-gray-800">Nombre</th>
                  <th className="px-4 py-3 border border-gray-300 font-semibold text-gray-800">Pronunciación</th>
                  <th className="px-4 py-3 border border-gray-300 font-semibold text-gray-800">Ejemplos</th>
                </tr>
              </thead>
              <tbody>
                {alphabet.map((letter, index) => (
                  <tr key={letter.letter} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-4 py-3 border border-gray-300 text-2xl font-bold text-indigo-600">
                      {letter.letter}
                    </td>
                    <td className="px-4 py-3 border border-gray-300">{letter.name}</td>
                    <td className="px-4 py-3 border border-gray-300 italic text-gray-600">{letter.pronunciation}</td>
                    <td className="px-4 py-3 border border-gray-300">{letter.examples.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Numbers Table */}
        <div className="bg-white rounded-xl shadow-xl p-8 mb-8 print-page">
          <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
            Tabla de Números (0-100)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-indigo-100">
                  <th className="px-4 py-3 border border-gray-300 font-semibold text-gray-800">Número</th>
                  <th className="px-4 py-3 border border-gray-300 font-semibold text-gray-800">Palabra</th>
                  <th className="px-4 py-3 border border-gray-300 font-semibold text-gray-800">Pronunciación</th>
                </tr>
              </thead>
              <tbody>
                {numbers.filter(n => n.number <= 100).map((num, index) => (
                  <tr key={num.number} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-4 py-3 border border-gray-300 font-bold text-indigo-600">{num.number}</td>
                    <td className="px-4 py-3 border border-gray-300">{num.word}</td>
                    <td className="px-4 py-3 border border-gray-300 italic text-gray-600">{num.pronunciation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Verb Conjugations Table */}
        <div className="bg-white rounded-xl shadow-xl p-8 mb-8 print-page">
          <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
            Conjugación de Verbos Regulares (Presente)
          </h2>
          <div className="space-y-8">
            {presentTenseConjugations.slice(0, 3).map((verb) => (
              <div key={verb.verb} className="mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                  {verb.infinitive.toUpperCase()}
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-indigo-100">
                        <th className="px-4 py-3 border border-gray-300 font-semibold text-gray-800">Pronombre</th>
                        <th className="px-4 py-3 border border-gray-300 font-semibold text-gray-800">Conjugación</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(verb.conjugations).map(([pronoun, conjugation], index) => (
                        <tr key={pronoun} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="px-4 py-3 border border-gray-300 font-semibold capitalize">
                            {pronoun === 'él' ? 'él/ella/usted' : pronoun === 'ellos' ? 'ellos/ellas/ustedes' : pronoun}
                          </td>
                          <td className="px-4 py-3 border border-gray-300 text-indigo-600 font-semibold">
                            {conjugation}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vocabulary Tables by Category */}
        {vocabularyCategories.slice(0, 3).map((category) => {
          const words = getVocabularyByCategory(category);
          return (
            <div key={category} className="bg-white rounded-xl shadow-xl p-8 mb-8 print-page">
              <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center capitalize">
                Vocabulario: {category}
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-indigo-100">
                      <th className="px-4 py-3 border border-gray-300 font-semibold text-gray-800">Español</th>
                      <th className="px-4 py-3 border border-gray-300 font-semibold text-gray-800">Traducción</th>
                      <th className="px-4 py-3 border border-gray-300 font-semibold text-gray-800">Pronunciación</th>
                    </tr>
                  </thead>
                  <tbody>
                    {words.map((word, index) => (
                      <tr key={word.word} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-4 py-3 border border-gray-300 font-semibold text-indigo-600">{word.word}</td>
                        <td className="px-4 py-3 border border-gray-300">{word.translation}</td>
                        <td className="px-4 py-3 border border-gray-300 italic text-gray-600">{word.pronunciation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}

        {/* Print Instructions */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mt-8 no-print">
          <h3 className="text-xl font-bold text-blue-800 mb-3">💡 Consejo para Imprimir</h3>
          <p className="text-blue-700">
            Usa el botón "Imprimir Todas las Tablas" para obtener una versión imprimible de todas las tablas. 
            También puedes usar Ctrl+P (Cmd+P en Mac) para imprimir la página actual.
          </p>
        </div>
      </div>

      {/* Ads Container - End of Lesson Section */}
      <div className="ads-container mt-8 mb-4"></div>
    </div>
  );
}
