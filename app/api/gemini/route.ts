/**
 * API Route for Gemini AI Integration
 * Handles exam correction and explanations
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, question, userAnswer, correctAnswer, examType } = body;

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      );
    }

    if (action === 'explain') {
      // Generate explanation for incorrect answer
      const explanation = await generateExplanation(
        question,
        userAnswer,
        correctAnswer,
        examType
      );
      return NextResponse.json({ explanation });
    }

    if (action === 'generate-questions') {
      // Generate new exam questions (for future use)
      const questions = await generateQuestions(examType);
      return NextResponse.json({ questions });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Gemini API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function generateExplanation(
  question: string,
  userAnswer: string | boolean,
  correctAnswer: string | boolean,
  examType: string
): Promise<string> {
  try {
    const prompt = `Eres un profesor experto de español para el examen ${examType}. 

Pregunta: ${question}
Respuesta del estudiante: ${userAnswer}
Respuesta correcta: ${correctAnswer}

Por favor, proporciona una explicación clara y educativa en español explicando por qué la respuesta correcta es "${correctAnswer}" y por qué la respuesta "${userAnswer}" es incorrecta. Sé específico y educativo.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    const explanation = data.candidates?.[0]?.content?.parts?.[0]?.text || 
      'لا يوجد شرح متاح حالياً.';

    return explanation;
  } catch (error) {
    console.error('Error generating explanation:', error);
    return `الشرح: الإجابة الصحيحة هي "${correctAnswer}". تأكد من مراجعة الدرس المتعلق بهذا السؤال.`;
  }
}

async function generateQuestions(examType: string): Promise<any[]> {
  // Placeholder for question generation
  // This can be expanded to generate questions dynamically
  return [];
}