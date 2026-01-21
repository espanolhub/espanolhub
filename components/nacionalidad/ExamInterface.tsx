'use client';

import { useState, useEffect, useCallback } from 'react';
import { Clock, CheckCircle, XCircle, ArrowRight, ArrowLeft, Save } from 'lucide-react';
import { ExamQuestion, ExamType } from '@/lib/types/nacionalidad';
import { getExamQuestions, getOfficialQuestionCount, getOfficialTimeLimit } from '@/lib/data/nacionalidad-exams';
import { saveExamAttempt } from '@/lib/utils/nacionalidad-storage';
import { getExplanation } from '@/lib/services/nacionalidad-gemini';

interface ExamInterfaceProps {
  examType: ExamType;
  onComplete: (attempt: any) => void;
  onCancel: () => void;
}

export default function ExamInterface({ examType, onComplete, onCancel }: ExamInterfaceProps) {
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | boolean>>({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    const questionCount = getOfficialQuestionCount(examType);
    const timeLimit = getOfficialTimeLimit(examType);
    const examQuestions = getExamQuestions(examType, questionCount);
    setQuestions(examQuestions);
    setTimeRemaining(timeLimit * 60); // Convert to seconds
    setStartTime(Date.now());
  }, [examType]);

  useEffect(() => {
    if (timeRemaining <= 0 || isCompleted) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, isCompleted]);

  const handleAnswer = (questionId: string, answer: string | boolean) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = useCallback(async () => {
    if (isCompleted) return;

    setIsCompleted(true);
    let score = 0;
    const incorrectQuestions: string[] = [];

    questions.forEach((question) => {
      const userAnswer = answers[question.id];
      const isCorrect = userAnswer === question.correctAnswer;

      if (isCorrect) {
        score++;
      } else {
        incorrectQuestions.push(question.id);
      }
    });

    const timeSpent = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;

    const attempt = {
      id: `attempt-${Date.now()}`,
      examType,
      questions,
      answers,
      score,
      totalQuestions: questions.length,
      timeSpent,
      completedAt: new Date().toISOString(),
      incorrectQuestions,
    };

    // Save attempt
    saveExamAttempt(attempt);

    // Call onComplete callback
    onComplete(attempt);
  }, [answers, questions, examType, startTime, isCompleted]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers[currentQuestion?.id];

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando examen...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header with Timer and Progress */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">Examen {examType}</h2>
            <p className="text-blue-100 text-sm">
              Pregunta {currentIndex + 1} de {questions.length}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-lg">
              <Clock className="w-5 h-5" />
              <span className="font-mono text-lg font-bold">
                {formatTime(timeRemaining)}
              </span>
            </div>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
          <div
            className="bg-white h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="p-8">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">{currentQuestion.question}</h3>

          {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(currentQuestion.id, option)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    currentAnswer === option
                      ? 'border-blue-600 bg-blue-50 text-blue-900 font-semibold'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {currentQuestion.type === 'true-false' && (
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleAnswer(currentQuestion.id, true)}
                className={`p-6 rounded-lg border-2 transition-all ${
                  currentAnswer === true
                    ? 'border-green-600 bg-green-50 text-green-900 font-semibold'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-green-300 hover:bg-green-50'
                }`}
              >
                <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                <span className="text-lg font-semibold">Verdadero</span>
              </button>
              <button
                onClick={() => handleAnswer(currentQuestion.id, false)}
                className={`p-6 rounded-lg border-2 transition-all ${
                  currentAnswer === false
                    ? 'border-red-600 bg-red-50 text-red-900 font-semibold'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-red-300 hover:bg-red-50'
                }`}
              >
                <XCircle className="w-8 h-8 mx-auto mb-2" />
                <span className="text-lg font-semibold">Falso</span>
              </button>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            <ArrowRight className="w-5 h-5" />
            Anterior
          </button>

          <div className="text-sm text-gray-600">
            {Object.keys(answers).length} de {questions.length} respondidas
          </div>

          {currentIndex === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={isCompleted}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              <Save className="w-5 h-5" />
              Finalizar Examen
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Siguiente
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}