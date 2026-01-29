'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, CheckCircle, BarChart3, Play, BookOpen, Award, Star } from 'lucide-react';
import { getInteractiveLessonById } from '@/lib/data/interactive-lessons';
import type { InteractiveLesson, LessonContent } from '@/lib/data/interactive-lessons';

export default function LessonPage() {
  const params = useParams();
  const lessonId = params.id as string;
  const lesson = getInteractiveLessonById(lessonId);

  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Lección no encontrada</h1>
            <p className="text-gray-600 mb-6">La lección que buscas no existe o ha sido eliminada.</p>
            <Link
              href="/recursos"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver a Lecciones
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentContent = lesson.content[currentContentIndex];
  const progress = ((currentContentIndex + 1) / lesson.content.length) * 100;

  const handleExerciseComplete = (exerciseId: string) => {
    setCompletedExercises([...completedExercises, exerciseId]);
  };

  const handleQuizComplete = (score: number) => {
    setQuizScore(score);
  };

  const nextContent = () => {
    if (currentContentIndex < lesson.content.length - 1) {
      setCurrentContentIndex(currentContentIndex + 1);
    }
  };

  const prevContent = () => {
    if (currentContentIndex > 0) {
      setCurrentContentIndex(currentContentIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/recursos"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a Lecciones
          </Link>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-800">{lesson.title}</h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                lesson.level === 'beginner' ? 'bg-green-100 text-green-800' :
                lesson.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {lesson.level === 'beginner' ? 'Principiante' : 
                 lesson.level === 'intermediate' ? 'Intermedio' : 'Avanzado'}
              </span>
            </div>
            
            <p className="text-gray-600 mb-4">{lesson.description}</p>
            
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progreso</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            
            {/* Lesson Info */}
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{lesson.estimatedTime} minutos</span>
              </div>
              <div className="flex items-center gap-1">
                <Play className="w-4 h-4" />
                <span>{lesson.content.length} partes</span>
              </div>
              {lesson.hasExercises && (
                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>Ejercicios</span>
                </div>
              )}
              {lesson.hasQuiz && (
                <div className="flex items-center gap-1 text-blue-600">
                  <BarChart3 className="w-4 h-4" />
                  <span>Quiz final</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <ContentRenderer
            content={currentContent}
            onComplete={handleExerciseComplete}
            onQuizComplete={handleQuizComplete}
          />
        </div>

        {/* Navigation */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={prevContent}
            disabled={currentContentIndex === 0}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              currentContentIndex === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Anterior
          </button>
          
          <button
            onClick={nextContent}
            disabled={currentContentIndex === lesson.content.length - 1}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              currentContentIndex === lesson.content.length - 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Siguiente
          </button>
        </div>

        {/* Completion Message */}
        {currentContentIndex === lesson.content.length - 1 && (
          <div className="mt-8 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl p-6 text-center">
            <Award className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">¡Lección Completada!</h2>
            <p className="mb-4">Has completado esta lección exitosamente.</p>
            {quizScore !== null && (
              <p className="text-lg mb-4">Puntuación del quiz: {quizScore}%</p>
            )}
            <Link
              href="/recursos"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              Explorar más lecciones
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

interface ContentRendererProps {
  content: LessonContent;
  onComplete: (exerciseId: string) => void;
  onQuizComplete: (score: number) => void;
}

function ContentRenderer({ content, onComplete, onQuizComplete }: ContentRendererProps) {
  switch (content.type) {
    case 'text':
      return <TextContent content={content.content as string} title={content.title} />;
    case 'exercise':
      return <ExerciseContent content={content.content} onComplete={onComplete} title={content.title} />;
    case 'quiz':
      return <QuizContent content={content.content} onComplete={onQuizComplete} title={content.title} />;
    case 'table':
      return <TableContent content={content.content} title={content.title} />;
    default:
      return <div>Contenido no encontrado</div>;
  }
}

function TextContent({ content, title }: { content: string; title?: string }) {
  return (
    <div>
      {title && <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>}
      <div className="prose prose-blue max-w-none">
        {content.split('\n').map((paragraph, index) => (
          <p key={index} className="text-gray-700 mb-4">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}

function ExerciseContent({ 
  content, 
  onComplete, 
  title 
}: { 
  content: any; 
  onComplete: (exerciseId: string) => void; 
  title?: string;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = () => {
    setShowResults(true);
    onComplete('exercise-' + Date.now());
  };

  return (
    <div>
      {title && <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>}
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-blue-800">{content.instructions}</p>
      </div>

      <div className="space-y-4">
        {content.questions.map((question: any, index: number) => (
          <div key={question.id} className="bg-gray-50 rounded-lg p-4">
            <p className="font-medium text-gray-800 mb-2">
              {index + 1}. {question.question}
            </p>
            
            {question.type === 'fill-blank' && (
              <input
                type="text"
                value={answers[question.id] || ''}
                onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tu respuesta..."
                disabled={showResults}
              />
            )}
            
            {question.type === 'multiple-choice' && (
              <div className="space-y-2">
                {question.options?.map((option: string, optIndex: number) => (
                  <label key={optIndex} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={question.id}
                      value={optIndex}
                      onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
                      disabled={showResults}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            )}
            
            {showResults && (
              <div className={`mt-2 p-2 rounded ${
                answers[question.id] === question.correctAnswer.toString()
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                <p className="font-medium">
                  {answers[question.id] === question.correctAnswer.toString() ? '✓ Correcto' : '✗ Incorrecto'}
                </p>
                {question.explanation && (
                  <p className="text-sm mt-1">{question.explanation}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {!showResults && (
        <button
          onClick={handleSubmit}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Ver Resultados
        </button>
      )}
    </div>
  );
}

function QuizContent({ 
  content, 
  onComplete, 
  title 
}: { 
  content: any; 
  onComplete: (score: number) => void; 
  title?: string;
}) {
  const [answers, setAnswers] = useState<Record<string, string | boolean>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = () => {
    setShowResults(true);
    
    let correct = 0;
    content.questions.forEach((question: any) => {
      if (answers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    
    const score = Math.round((correct / content.questions.length) * 100);
    onComplete(score);
  };

  return (
    <div>
      {title && <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>}
      
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
        <p className="text-purple-800">
          Puntuación para aprobar: {content.passingScore}%
        </p>
      </div>

      <div className="space-y-4">
        {content.questions.map((question: any, index: number) => (
          <div key={question.id} className="bg-gray-50 rounded-lg p-4">
            <p className="font-medium text-gray-800 mb-2">
              {index + 1}. {question.question}
            </p>
            
            {question.type === 'multiple-choice' && (
              <div className="space-y-2">
                {question.options?.map((option: string, optIndex: number) => (
                  <label key={optIndex} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={question.id}
                      value={optIndex}
                      onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
                      disabled={showResults}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            )}
            
            {question.type === 'true-false' && (
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={question.id}
                    value="true"
                    onChange={(e) => setAnswers({ ...answers, [question.id]: true })}
                    disabled={showResults}
                  />
                  <span>Verdadero</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={question.id}
                    value="false"
                    onChange={(e) => setAnswers({ ...answers, [question.id]: false })}
                    disabled={showResults}
                  />
                  <span>Falso</span>
                </label>
              </div>
            )}
            
            {showResults && (
              <div className={`mt-2 p-2 rounded ${
                answers[question.id] === question.correctAnswer
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                <p className="font-medium">
                  {answers[question.id] === question.correctAnswer ? '✓ Correcto' : '✗ Incorrecto'}
                </p>
                {question.explanation && (
                  <p className="text-sm mt-1">{question.explanation}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {!showResults && (
        <button
          onClick={handleSubmit}
          className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
        >
          Enviar Quiz
        </button>
      )}
    </div>
  );
}

function TableContent({ content, title }: { content: any; title?: string }) {
  return (
    <div>
      {title && <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>}
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              {content.headers.map((header: string, index: number) => (
                <th key={index} className="border border-gray-300 px-4 py-2 text-left font-medium">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {content.rows.map((row: string[], rowIndex: number) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                {row.map((cell: string, cellIndex: number) => (
                  <td key={cellIndex} className="border border-gray-300 px-4 py-2">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {content.caption && (
        <p className="text-sm text-gray-600 mt-2 italic">{content.caption}</p>
      )}
    </div>
  );
}
