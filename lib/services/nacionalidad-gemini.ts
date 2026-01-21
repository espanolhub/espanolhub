/**
 * Gemini Service for Nacionalidad Exams
 * Professional integration for exam correction and explanations
 */

interface ExplanationRequest {
  question: string;
  userAnswer: string | boolean;
  correctAnswer: string | boolean;
  examType: 'CCSE' | 'DELE-A2';
  category?: string;
}

export async function getExplanation(request: ExplanationRequest): Promise<string> {
  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'explain',
        question: request.question,
        userAnswer: request.userAnswer,
        correctAnswer: request.correctAnswer,
        examType: request.examType,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.explanation || getDefaultExplanation(request);
  } catch (error) {
    console.error('Error getting explanation from Gemini:', error);
    return getDefaultExplanation(request);
  }
}

function getDefaultExplanation(request: ExplanationRequest): string {
  return `La respuesta correcta es "${request.correctAnswer}". 

Tu respuesta fue "${request.userAnswer}".

Por favor, revisa la lección relacionada con ${request.category || 'este tema'} para mejorar tu comprensión.`;
}

/**
 * Generate personalized feedback based on exam results
 */
export async function generateFeedback(
  score: number,
  totalQuestions: number,
  examType: 'CCSE' | 'DELE-A2',
  incorrectCount: number
): Promise<string> {
  try {
    const percentage = (score / totalQuestions) * 100;
    const prompt = `Eres un tutor profesional de español para el examen ${examType}.

Resultado del examen:
- Preguntas correctas: ${score} de ${totalQuestions}
- Porcentaje: ${percentage.toFixed(1)}%
- Errores: ${incorrectCount}

Por favor, proporciona un feedback motivacional y constructivo en español. Incluye:
1. Evaluación del rendimiento
2. Áreas de mejora sugeridas
3. Próximos pasos recomendados

Sé positivo pero realista.`;

    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'explain',
        question: 'Feedback del examen',
        userAnswer: `${score}/${totalQuestions}`,
        correctAnswer: `${totalQuestions}/${totalQuestions}`,
        examType,
      }),
    });

    if (!response.ok) {
      return getDefaultFeedback(percentage, incorrectCount);
    }

    const data = await response.json();
    return data.explanation || getDefaultFeedback(percentage, incorrectCount);
  } catch (error) {
    console.error('Error generating feedback:', error);
    const percentage = (score / totalQuestions) * 100;
    return getDefaultFeedback(percentage, incorrectCount);
  }
}

function getDefaultFeedback(percentage: number, incorrectCount: number): string {
  if (percentage >= 80) {
    return `¡Excelente! Obtuviste ${percentage.toFixed(1)}%. ¡Gran rendimiento! Continúa practicando para mantener este nivel.`;
  } else if (percentage >= 60) {
    return `¡Bien! Obtuviste ${percentage.toFixed(1)}%. Tienes ${incorrectCount} errores. Revisa los errores e intenta de nuevo.`;
  } else {
    return `Necesitas estudiar más. Obtuviste ${percentage.toFixed(1)}% con ${incorrectCount} errores. Revisa las lecciones y vuelve a intentarlo.`;
  }
}