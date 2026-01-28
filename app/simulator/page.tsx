'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { dgtQuestions } from '@/lib/data/dgt-questions';
import Link from 'next/link';
import { AlertTriangle, CheckCircle, XCircle, Flag, Send } from 'lucide-react';
import Image from 'next/image';

export default function SimulatorPage() {
  const questions = useMemo(() => dgtQuestions, []);
  const totalQuestions = questions.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const HISTORY_KEY = 'simulator_history_v1';
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportMessage, setReportMessage] = useState('');
  const [reportSending, setReportSending] = useState(false);
  const [showQuestionGrid, setShowQuestionGrid] = useState(false);

  // lightweight confetti (no external dependency)
  // Particle/confetti removed to keep background static and professional.
  const runConfetti = (_duration = 2000) => {
    // intentionally no-op
  };

  useEffect(() => {
    const iv = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(iv);
          setFinished(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(iv);
  }, []);

  // load local image fallback or use provided image
  useEffect(() => {
    let mounted = true;
    const loadImage = async () => {
      const q = questions[currentIndex];
      if (!q) return;
      try {
        // try local file by id
        const localPath = `/images/dgt/${q.id}.jpg`;
        try {
          const r = await fetch(localPath, { method: 'HEAD' });
          if (mounted && r.ok) {
            setImageSrc(localPath);
            return;
          }
        } catch (e) {}
        // try provided image url
        if (q.image) {
          setImageSrc(q.image);
          return;
        }
      } catch (e) {
        // ignore
      }
      setImageSrc(null);
    };
    loadImage();
    return () => { mounted = false; };
  }, [currentIndex, questions]);

  // When finished, run side-effects: save history, confetti, sounds
  useEffect(() => {
    if (!finished) return;
    const { correct, total } = computeResult();
    const passed = correct / total >= 0.9;
    saveHistory(correct, passed);

    // play sounds and confetti
    if (passed) {
      try {
        const audio = new Audio('/sounds/ding.mp3');
        audio.play().catch(() => {});
      } catch (e) {}
      // run internal confetti
      runConfetti(1800);
    } else {
      // buzzer via WebAudio
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'sawtooth';
        o.frequency.value = 120;
        g.gain.value = 0.02;
        o.connect(g);
        g.connect(ctx.destination);
        o.start();
        setTimeout(() => { o.stop(); ctx.close(); }, 250);
      } catch (e) {}
    }
  }, [finished]);

  const selectOption = (idx: number) => {
    setSelectedIndex(idx);
  };

  const handleNext = () => {
    if (selectedIndex === null) return;
    setAnswers((a) => {
      const next = [...a];
      next[currentIndex] = selectedIndex;
      return next;
    });
    setSelectedIndex(null);
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setFinished(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedIndex(answers[currentIndex - 1] ?? null);
    }
  };

  const jumpToQuestion = (index: number) => {
    setCurrentIndex(index);
    setSelectedIndex(answers[index] ?? null);
    setShowQuestionGrid(false);
  };

  const computeResult = () => {
    let correct = 0;
    for (let i = 0; i < totalQuestions; i++) {
      const ans = answers[i];
      if (ans !== undefined && ans === questions[i].correctIndex) correct++;
    }
    return { correct, total: totalQuestions };
  };

  // Get detailed question results
  const getQuestionResults = () => {
    return questions.map((question, i) => {
      const userAnswer = answers[i];
      const isCorrect = userAnswer !== undefined && userAnswer === question.correctIndex;
      const isAnswered = userAnswer !== undefined;
      return {
        index: i,
        question,
        userAnswer,
        isCorrect,
        isAnswered,
      };
    });
  };

  // Persist history to localStorage
  const saveHistory = (scoreNum: number, passed: boolean) => {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      const list = raw ? JSON.parse(raw) : [];
      list.unshift({
        date: new Date().toISOString(),
        score: scoreNum,
        total: totalQuestions,
        passed,
      });
      // keep last 10
      const sliced = list.slice(0, 10);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(sliced));
    } catch (e) {
      // ignore
    }
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleReportError = async () => {
    if (!reportMessage.trim()) return;
    setReportSending(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Usuario Simulador',
          email: 'simulador@espanolhub.com',
          subject: 'Reporte de Error - Simulador DGT',
          message: `Reporte de error en el Simulador DGT:\n\n${reportMessage}\n\nPregunta actual: ${currentIndex + 1}/${totalQuestions}`,
        }),
      });
      if (response.ok) {
        alert('Gracias por tu reporte. Lo revisaremos pronto.');
        setShowReportModal(false);
        setReportMessage('');
      } else {
        alert('Error al enviar el reporte. Por favor, inténtalo de nuevo.');
      }
    } catch (e) {
      alert('Error al enviar el reporte. Por favor, inténtalo de nuevo.');
    } finally {
      setReportSending(false);
    }
  };

  const handleRestart = () => {
    setFinished(false);
    setAnswers([]);
    setSelectedIndex(null);
    setCurrentIndex(0);
    setTimeLeft(30 * 60);
  };

  if (finished) {
    const { correct, total } = computeResult();
    const passed = correct / total >= 0.9;
    const percentage = Math.round((correct / total) * 100);
    let history: any[] = [];
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      history = raw ? JSON.parse(raw) : [];
    } catch (e) {}

    const questionResults = getQuestionResults();
    const wrongs = questionResults.filter(q => !q.isCorrect);

    const formatBilingualDate = (iso: string) => {
      try {
        const d = new Date(iso);
        const es = d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
        const ar = d.toLocaleDateString('ar-EG', { day: '2-digit', month: 'long', year: 'numeric' });
        return `${es} - ${ar}`;
      } catch (e) {
        return iso;
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Result */}
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-200 mb-6">
            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 ${passed ? 'bg-green-100' : 'bg-red-100'}`}>
              {passed ? (
                <CheckCircle className="w-16 h-16 text-green-600" />
              ) : (
                <XCircle className="w-16 h-16 text-red-600" />
              )}
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-2">{passed ? 'Aprobado' : 'Suspendido'}</h2>
            <p className="text-2xl text-slate-700 mb-1">
              Puntuación: <span className="font-bold text-slate-900">{correct} / {total}</span>
            </p>
            <p className="text-lg text-slate-600">
              Porcentaje: <span className={`font-bold ${passed ? 'text-green-600' : 'text-red-600'}`}>{percentage}%</span>
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <button
                onClick={handleRestart}
                className="btn btn-primary px-6 py-3 rounded-full font-bold transition-colors"
              >
                Reiniciar Test
              </button>
              <Link
                href="/driving-license"
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full font-medium transition-colors"
              >
                Volver al Curso
              </Link>
              <button
                onClick={() => setShowReportModal(true)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-colors flex items-center gap-2"
              >
                <Flag className="w-5 h-5" />
                Reportar Error
              </button>
            </div>
          </div>

          {/* Detailed Scoring Table */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 mb-6">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Tabla de Corrección Detallada</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-slate-900">#</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900">Estado</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900">Pregunta</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900">Tu Respuesta</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900">Respuesta Correcta</th>
                  </tr>
                </thead>
                <tbody>
                  {questionResults.map((result) => (
                    <tr
                      key={result.index}
                      className={`border-b border-gray-100 hover:bg-gray-50 ${result.isCorrect ? 'bg-green-50' : 'bg-red-50'}`}
                    >
                      <td className="py-3 px-4 font-medium text-slate-900">{result.index + 1}</td>
                      <td className="py-3 px-4">
                        {result.isCorrect ? (
                          <span className="inline-flex items-center gap-1 text-green-600 font-medium">
                            <CheckCircle className="w-5 h-5" />
                            Correcta
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-red-600 font-medium">
                            <XCircle className="w-5 h-5" />
                            Incorrecta
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium text-slate-900">{result.question.question_es}</div>
                        <div className="text-xs text-slate-600 mt-1" dir="rtl" style={{ fontFamily: 'var(--font-cairo)' }}>
                          {result.question.question_ar}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {result.isAnswered ? (
                          <span className={`font-medium ${result.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                            {result.question.options[result.userAnswer!]}
                          </span>
                        ) : (
                          <span className="text-slate-500 italic">Sin responder</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-green-700">
                          {result.question.options[result.question.correctIndex]}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Wrong Answers Details */}
          {wrongs.length > 0 && (
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 mb-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                Preguntas Incorrectas ({wrongs.length})
              </h3>
              <div className="space-y-4">
                {wrongs.map((w) => (
                  <div key={w.index} className="p-4 border border-red-200 rounded-lg bg-red-50">
                    <div className="font-bold text-slate-900 mb-2">Pregunta {w.index + 1}: {w.question.question_es}</div>
                    <div className="text-sm text-slate-700 mb-3" dir="rtl" style={{ fontFamily: 'var(--font-cairo)' }}>
                      {w.question.question_ar}
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm">
                        <strong className="text-red-700">Tu respuesta:</strong>{' '}
                        <span className="text-red-600">
                          {w.userAnswer !== undefined ? w.question.options[w.userAnswer] : 'Sin responder'}
                        </span>
                      </div>
                      <div className="text-sm">
                        <strong className="text-green-700">Respuesta correcta:</strong>{' '}
                        <span className="text-green-600">{w.question.options[w.question.correctIndex]}</span>
                      </div>
                      {(w.question.explanation_es || w.question.explanation_ar) && (
                        <div className="mt-3 p-3 bg-white rounded border border-gray-200">
                          <div className="text-sm text-slate-700 mb-1">{w.question.explanation_es}</div>
                          {w.question.explanation_ar && (
                            <div className="text-sm text-slate-600 mt-1" dir="rtl" style={{ fontFamily: 'var(--font-cairo)' }}>
                              {w.question.explanation_ar}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* History */}
          {history.length > 0 && (
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Historial de Intentos</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200 text-left text-slate-600">
                      <th className="py-3 px-4">Fecha</th>
                      <th className="py-3 px-4">Puntuación</th>
                      <th className="py-3 px-4">Resultado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.slice(0, 5).map((h, idx) => (
                      <tr key={idx} className="border-b border-gray-100">
                        <td className="py-2 px-4 text-slate-700">{formatBilingualDate(h.date)}</td>
                        <td className="py-2 px-4 text-slate-700">{h.score} / {h.total}</td>
                        <td className={`py-2 px-4 font-semibold ${h.passed ? 'text-green-600' : 'text-red-600'}`}>
                          {h.passed ? 'Aprobado' : 'Suspendido'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Report Error Modal */}
        {showReportModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Reportar Error</h3>
              <p className="text-slate-600 mb-4">
                Si encuentras algún error en las preguntas o respuestas, por favor repórtalo aquí. Tu feedback nos ayuda a mejorar.
              </p>
              <textarea
                value={reportMessage}
                onChange={(e) => setReportMessage(e.target.value)}
                placeholder="Describe el error que encontraste..."
                className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900"
              />
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => {
                    setShowReportModal(false);
                    setReportMessage('');
                  }}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleReportError}
                  disabled={!reportMessage.trim() || reportSending}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {reportSending ? (
                    <>Enviando...</>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Enviar
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  const q = questions[currentIndex];
  const answeredCount = answers.filter(a => a !== undefined).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Simulador DGT</h1>
              <p className="text-slate-600 mt-1">Examen teórico de conducción</p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="text-sm text-slate-600">Tiempo restante:</div>
                <div className={`text-xl font-mono font-bold text-slate-900 ${timeLeft <= 120 ? 'animate-pulse text-red-600' : ''}`}>
                  {formatTimer(timeLeft)}
                </div>
              </div>
              <button
                onClick={() => setShowQuestionGrid(!showQuestionGrid)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Ver Grid ({answeredCount}/{totalQuestions})
              </button>
            </div>
          </div>
        </header>

        {/* Question Grid Modal */}
        {showQuestionGrid && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-slate-900">Navegación de Preguntas</h3>
                <button
                  onClick={() => setShowQuestionGrid(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                {questions.map((_, index) => {
                  const isAnswered = answers[index] !== undefined;
                  const isCorrect = answers[index] === questions[index].correctIndex;
                  const isCurrent = index === currentIndex;
                  return (
                    <button
                      key={index}
                      onClick={() => jumpToQuestion(index)}
                      className={`
                        w-12 h-12 rounded-lg font-bold text-sm transition-all
                        ${isCurrent ? 'ring-4 ring-blue-600 scale-110' : ''}
                        ${isAnswered
                          ? isCorrect
                            ? 'bg-green-500 text-white hover:bg-green-600'
                            : 'bg-red-500 text-white hover:bg-red-600'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }
                      `}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>
              <div className="mt-4 flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span>Correcta</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span>Incorrecta</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-200 rounded"></div>
                  <span>Sin responder</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          {/* Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
              <span>Pregunta {currentIndex + 1} de {totalQuestions}</span>
              <span>{Math.round(((currentIndex + 1) / totalQuestions) * 100)}% completado</span>
            </div>
            <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
              <div
                className="h-3 rounded-full bg-blue-600 transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-6 mb-6">
            {imageSrc && (
              <div className="mb-6 flex justify-center">
                <div className="relative w-full max-w-2xl h-64 bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={imageSrc}
                    alt="Señal de tráfico"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                </div>
              </div>
            )}
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{q.question_es}</h2>
            <p className="text-lg text-slate-700 mb-6" dir="rtl" style={{ fontFamily: 'var(--font-cairo)' }}>
              {q.question_ar}
            </p>

            {/* Options */}
            <div className="grid grid-cols-1 gap-3 mb-6">
              {q.options.map((opt, idx) => {
                const selected = selectedIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => selectOption(idx)}
                    className={`
                      w-full text-left px-6 py-4 rounded-xl border-2 transition-all
                      ${selected
                        ? 'bg-blue-600 border-blue-700 text-white shadow-lg scale-[1.02]'
                        : 'bg-white border-gray-300 text-slate-900 hover:border-blue-600 hover:bg-gray-50'
                      }
                    `}
                    aria-pressed={selected}
                  >
                    <span className="font-medium">{String.fromCharCode(65 + idx)}.</span> {opt}
                  </button>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="px-6 py-3 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:hover:bg-gray-100"
              >
                ← Anterior
              </button>
              <button
                onClick={handleNext}
                disabled={selectedIndex === null}
                className={`px-8 py-3 rounded-xl font-bold transition-all ${
                  selectedIndex === null
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                } ${selectedIndex !== null ? 'animate-pulse' : ''}`}
              >
                {currentIndex < totalQuestions - 1 ? 'Siguiente →' : 'Finalizar'}
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">{answeredCount}</div>
              <div className="text-sm text-slate-600">Respondidas</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="text-2xl font-bold text-green-600">
                {answers.filter((ans, idx) => ans === questions[idx]?.correctIndex).length}
              </div>
              <div className="text-sm text-slate-600">Correctas</div>
            </div>
            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
              <div className="text-2xl font-bold text-red-600">
                {answers.filter((ans, idx) => ans !== undefined && ans !== questions[idx]?.correctIndex).length}
              </div>
              <div className="text-sm text-slate-600">Incorrectas</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
