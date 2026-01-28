'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { getDictionaryByCategory, getDictionary } from '@/lib/data/dictionary';
import { vocabularyCategories } from '@/lib/data/vocabulary';
import { QuestionTracker } from '@/lib/utils/questionTracker';
import { CheckCircle, XCircle, RotateCcw, BarChart3, Volume2, Lightbulb } from 'lucide-react';
import { DictionaryEntry } from '@/lib/types';

interface QuizQuestion {
  id: string;
  word: string;
  options: string[];
  correctAnswer: string;
  category: string;
  type: 'meaning' | 'word';
}

export default function VocabularyQuiz() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [includeWrongWords, setIncludeWrongWords] = useState(false);
  const [loading, setLoading] = useState(false);

  // Generate quiz questions from vocabulary
  const generateQuestions = (words: DictionaryEntry[], count: number = 10): QuizQuestion[] => {
    const questions: QuizQuestion[] = [];
    
    for (let i = 0; i < Math.min(count, words.length); i++) {
      const word = words[i];
      
      // Question type 1: Given word, select translation
      const translationQuestion: QuizQuestion = {
        id: `translation-${word.word}-${i}`,
        word: word.word,
        options: [],
        correctAnswer: word.translations[0] || `Traducción de ${word.word}`,
        category: word.category || 'general',
        type: 'meaning'
      };
      
      // Generate wrong options from other words
      const wrongOptions = words
        .filter(w => w.word !== word.word && w.translations && w.translations.length > 0)
        .map(w => w.translations[0])
        .filter(Boolean)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      
      translationQuestion.options = [
        word.translations[0] || `Traducción de ${word.word}`,
        ...wrongOptions
      ].sort(() => Math.random() - 0.5);
      
      questions.push(translationQuestion);
    }
    
    return questions;
  };

  useEffect(() => {
    loadQuestions();
  }, [selectedCategory, includeWrongWords]);

  const loadQuestions = async () => {
    setLoading(true);
    try {
      let vocabularyWords: DictionaryEntry[] = [];
      
      if (selectedCategory === 'all') {
        const allWords = getDictionary() || [];
        vocabularyWords = allWords;
      } else {
        const categoryWords = getDictionaryByCategory(selectedCategory) || [];
        vocabularyWords = categoryWords;
      }

      let selectedWords: DictionaryEntry[] = [];
      
      if (includeWrongWords) {
        // Include words user got wrong for spaced repetition
        const wrongQuestions = QuestionTracker.getWrongQuestions(
          generateQuestions(vocabularyWords, 50), 
          selectedCategory, 
          'beginner', // Vocabulary doesn't have levels, use beginner as default
          5
        );
        
        const wrongWords = wrongQuestions.map(q => ({
          id: `wrong-${q.word}`,
          word: q.word,
          category: q.category,
          translations: [q.correctAnswer],
          pronunciation: ''
        }));
        
        const unseenWords = vocabularyWords.filter(w => 
          !wrongWords.some(wrong => wrong.word === w.word)
        ).slice(0, 15);
        
        selectedWords = [...wrongWords, ...unseenWords];
      } else {
        // Get unseen words
        selectedWords = vocabularyWords.slice(0, 20);
      }

      const quizQuestions = generateQuestions(selectedWords, 10);
      setQuestions(quizQuestions);
      setCurrentQuestionIndex(0);
      setAnswers({});
      setShowResults(false);
    } catch (error) {
      console.error('Error loading vocabulary questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const finishQuiz = () => {
    setShowResults(true);
    
    // Record all attempts with QuestionTracker
    questions.forEach(q => {
      const isCorrect = answers[q.id] === q.correctAnswer;
      QuestionTracker.recordAttempt(q.id, q.category, 'beginner', isCorrect);
    });
  };

  const restartQuiz = () => {
    loadQuestions();
  };

  const getScore = () => {
    const correct = questions.filter(q => answers[q.id] === q.correctAnswer).length;
    return Math.round((correct / questions.length) * 100);
  };

  const pronounceWord = (word: string) => {
    if (typeof window === 'undefined' || !word) return;
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'es-ES';
        utterance.rate = 0.9;
        utterance.pitch = 1;
        window.speechSynthesis.speak(utterance);
      }
    } catch (e) {
      // ignore
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600">No hay preguntas disponibles</p>
      </div>
    );
  }

  if (showResults) {
    const score = getScore();
    const correct = questions.filter(q => answers[q.id] === q.correctAnswer).length;
    const wrong = questions.filter(q => answers[q.id] !== q.correctAnswer);

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {score >= 70 ? '¡Excelente!' : 'Sigue Practicando'}
          </h2>
          <div className="text-6xl font-bold mb-4 text-purple-600">
            {score}%
          </div>
          <p className="text-xl text-gray-600 mb-6">
            {correct} correctas de {questions.length} preguntas
          </p>

          {/* Wrong Answers Review */}
          {wrong.length > 0 && (
            <div className="mb-6 text-left">
              <h3 className="font-semibold text-lg mb-3 text-red-600">Repasa estas palabras:</h3>
              <div className="space-y-2">
                {wrong.map(q => (
                  <div key={q.id} className="p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{q.word}</span>
                      <button
                        onClick={() => pronounceWord(q.word)}
                        className="p-1 text-purple-600 hover:bg-purple-100 rounded"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-sm text-gray-600">
                      Correcto: {q.correctAnswer}
                    </div>
                    <div className="text-sm text-red-600">
                      Tu respuesta: {answers[q.id]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={restartQuiz}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Hacer otro quiz
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header with controls */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Quiz de Vocabulario</h2>
          <div className="flex gap-2">
            <button 
              onClick={() => setShowStats(!showStats)}
              className="px-3 py-2 bg-white rounded-lg shadow-md border border-gray-200 flex items-center gap-2 hover:bg-gray-50"
            >
              <BarChart3 className="w-4 h-4" />
              Estadísticas
            </button>
            <button 
              onClick={() => setIncludeWrongWords(!includeWrongWords)}
              className={`px-3 py-2 rounded-lg shadow-md border flex items-center gap-2 transition-colors ${
                includeWrongWords 
                  ? 'bg-orange-100 border-orange-300 text-orange-700' 
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              Repetición Espaciada
            </button>
          </div>
        </div>

        {/* Category selector */}
        <div className="flex gap-2 flex-wrap mb-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="all">Todas las categorías</option>
            {vocabularyCategories.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Stats Panel */}
        {showStats && (
          <div className="mb-6 p-4 bg-white rounded-xl shadow-md border border-gray-200">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Tus Estadísticas
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {QuestionTracker.getStats(selectedCategory, 'beginner').totalAttempts}
                </div>
                <div className="text-sm text-gray-600">Intentos Totales</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {QuestionTracker.getStats(selectedCategory, 'beginner').correctAnswers}
                </div>
                <div className="text-sm text-gray-600">Respuestas Correctas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {QuestionTracker.getStats(selectedCategory, 'beginner').accuracy}%
                </div>
                <div className="text-sm text-gray-600">Precisión</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {QuestionTracker.getStats(selectedCategory, 'beginner').recentAttempts}
                </div>
                <div className="text-sm text-gray-600">Intentos Recientes</div>
              </div>
            </div>
          </div>
        )}

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Pregunta {currentQuestionIndex + 1} de {questions.length}</span>
            <span>{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}% completado</span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h3 className="text-2xl font-bold text-gray-900">
              {currentQuestion.type === 'meaning' ? '¿Qué significa?' : '¿Cuál es la palabra?'}
            </h3>
            {currentQuestion.type === 'meaning' && (
              <button
                onClick={() => pronounceWord(currentQuestion.word)}
                className="p-2 bg-purple-100 text-purple-600 rounded-full hover:bg-purple-200 transition-colors"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            )}
          </div>
          
          {currentQuestion.type === 'meaning' && (
            <div className="text-4xl font-bold text-purple-600 mb-6">
              {currentQuestion.word}
            </div>
          )}
        </div>

        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = answers[currentQuestion.id] === option;
            return (
              <button
                key={index}
                onClick={() => handleAnswer(currentQuestion.id, option)}
                className={`w-full text-left px-6 py-4 rounded-lg border-2 transition-all ${
                  isSelected
                    ? 'border-purple-600 bg-purple-50 text-purple-900'
                    : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg">{option}</span>
                  {isSelected && (
                    <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={previousQuestion}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
          >
            Anterior
          </button>
          
          <button
            onClick={nextQuestion}
            disabled={!answers[currentQuestion.id]}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              answers[currentQuestion.id]
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {currentQuestionIndex === questions.length - 1 ? 'Finalizar' : 'Siguiente'}
          </button>
        </div>
      </div>
    </div>
  );
}
