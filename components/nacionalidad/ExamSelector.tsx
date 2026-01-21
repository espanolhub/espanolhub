'use client';

import { FileText, Clock, CheckCircle } from 'lucide-react';
import { ExamType } from '@/lib/types/nacionalidad';
import { getOfficialQuestionCount, getOfficialTimeLimit } from '@/lib/data/nacionalidad-exams';

interface ExamSelectorProps {
  onSelectExam: (examType: ExamType) => void;
}

export default function ExamSelector({ onSelectExam }: ExamSelectorProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Selecciona el Tipo de Examen</h2>
        <p className="text-gray-600">Exámenes simulados reales de las pruebas oficiales</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CCSE Exam */}
        <div className="bg-white rounded-xl shadow-lg border-2 border-blue-200 p-6 hover:shadow-xl transition-all cursor-pointer"
          onClick={() => onSelectExam('CCSE')}>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 bg-blue-100 rounded-lg">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Examen CCSE</h3>
              <p className="text-gray-600 text-sm">Prueba de Conocimientos Constitucionales y Socioculturales</p>
            </div>
          </div>
          
          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-2 text-gray-700">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              <span>{getOfficialQuestionCount('CCSE')} preguntas</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Clock className="w-5 h-5 text-blue-600" />
              <span>{getOfficialTimeLimit('CCSE')} minutos</span>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-gray-700">
              Examen simulado real para la prueba de nacionalidad española. Incluye preguntas sobre Constitución, Cultura, Historia y Geografía.
            </p>
          </div>

          <button className="w-full mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Iniciar Examen
          </button>
        </div>

        {/* DELE A2 Exam */}
        <div className="bg-white rounded-xl shadow-lg border-2 border-green-200 p-6 hover:shadow-xl transition-all cursor-pointer"
          onClick={() => onSelectExam('DELE-A2')}>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 bg-green-100 rounded-lg">
              <FileText className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Examen DELE A2</h3>
              <p className="text-gray-600 text-sm">Diploma de Español Nivel A2</p>
            </div>
          </div>
          
          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-2 text-gray-700">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>{getOfficialQuestionCount('DELE-A2')} preguntas</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Clock className="w-5 h-5 text-green-600" />
              <span>{getOfficialTimeLimit('DELE-A2')} minutos</span>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <p className="text-sm text-gray-700">
              Examen simulado para la prueba DELE A2 de español. Evalúa las habilidades básicas en español.
            </p>
          </div>

          <button className="w-full mt-4 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
            Iniciar Examen
          </button>
        </div>
      </div>
    </div>
  );
}