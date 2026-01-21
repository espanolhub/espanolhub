/**
 * Gemini Service for AI-powered game content
 * Note: Requires GEMINI_API_KEY environment variable
 */

export interface WordPair {
  arabic: string;
  spanish: string;
  category?: string;
}

export interface PronunciationSentence {
  sentence: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface GameImage {
  word: string;
  imageUrl?: string;
  imagePrompt: string;
}

/**
 * Get random word pairs for Word Race game
 */
import { vocabulary } from '@/lib/data/vocabulary';

export async function getRandomWordPairs(count: number = 10, pro: boolean = false): Promise<WordPair[]> {
  // Use vocabulary dataset: if not Pro, only use the first 20 words (freemium)
  const source = pro ? vocabulary : vocabulary.slice(0, 20);
  const pairs: WordPair[] = source.map(w => ({
    arabic: Array.isArray(w.translation) ? (w.translation[0] || '') : (w.translation || ''),
    spanish: w.word,
    category: w.category,
  }));
  const shuffled = pairs.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Get pronunciation sentences for Pronunciation Challenge
 */
export async function getPronunciationSentences(
  difficulty: 'beginner' | 'intermediate' | 'advanced' = 'beginner',
  count: number = 5
): Promise<PronunciationSentence[]> {
  // Static sentences for now. In production, Gemini would generate diverse sentences
  const sentences: Record<string, string[]> = {
    beginner: [
      'Hola, ¿cómo estás?',
      'Buenos días, ¿qué tal?',
      'Me llamo María.',
      '¿Dónde está la biblioteca?',
      'Por favor, gracias.',
      '¿Cuánto cuesta esto?',
      'No entiendo.',
      'Habla más despacio, por favor.',
    ],
    intermediate: [
      'Me gustaría reservar una mesa para dos personas.',
      '¿Podría decirme cómo llegar a la estación de tren?',
      'Estoy estudiando español desde hace tres meses.',
      'El restaurante está cerrado los domingos.',
      'Necesito cambiar mi cita para la próxima semana.',
      '¿Qué recomienda para visitar en esta ciudad?',
      'Prefiero tomar el café sin azúcar.',
      'La reunión comenzará a las diez de la mañana.',
    ],
    advanced: [
      'Aunque llevo viviendo aquí varios años, todavía me cuesta adaptarme al acento local.',
      'Sería conveniente que revisáramos el contrato antes de firmarlo.',
      'La exposición de arte contemporáneo me pareció realmente fascinante.',
      'Considero que esta propuesta requiere un análisis más detallado.',
      'Me gustaría expresar mi agradecimiento por la oportunidad que me han brindado.',
      'La situación actual demanda una solución inmediata y efectiva.',
      'Desde mi punto de vista, sería apropiado considerar otras alternativas.',
    ],
  };

  const selected = sentences[difficulty] || sentences.beginner;
  const shuffled = selected.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map(sentence => ({
    sentence,
    difficulty,
  }));
}

/**
 * Generate image prompt for Visual Match game
 */
export function generateImagePrompt(word: string, category?: string): string {
  const prompts: Record<string, string> = {
    casa: `Una casa española típica, colorida y acogedora, con tejas rojas y paredes blancas`,
    perro: `Un perro feliz y juguetón, raza mixta, en un parque soleado`,
    gato: `Un gato elegante y curioso, sentado en una ventana`,
    rojo: `Objetos rojos diversos: manzana, tomate, rosa, coche rojo`,
    azul: `Objetos azules diversos: cielo, mar, flor azul, coche azul`,
    verde: `Objetos verdes diversos: hierba, árbol, manzana verde, hoja`,
    agua: `Agua cristalina, un vaso de agua, gotas de agua`,
    pan: `Pan fresco recién horneado, baguette sobre tabla de madera`,
    manzana: `Manzana roja brillante y fresca, sobre fondo blanco`,
    leche: `Vaso de leche blanca, botella de leche, sobre fondo neutro`,
  };

  return prompts[word] || `Una imagen clara y simple de ${word}, estilo ilustración educativa, colores vibrantes, fondo blanco`;
}

/**
 * Get words with image prompts for Visual Match game
 */
export async function getWordsForVisualMatch(count: number = 6): Promise<GameImage[]> {
  const words = [
    'casa', 'perro', 'gato', 'rojo', 'azul', 'verde',
    'agua', 'pan', 'manzana', 'leche', 'sol', 'luna',
    'árbol', 'flor', 'libro', 'mesa', 'silla', 'coche',
  ];

  const selected = words.sort(() => Math.random() - 0.5).slice(0, count);
  
  return selected.map(word => ({
    word,
    imagePrompt: generateImagePrompt(word),
    // In production, this would call Gemini Image API to generate actual images
    imageUrl: undefined,
  }));
}

/**
 * Evaluate pronunciation using Gemini (placeholder - requires API key)
 */
export async function evaluatePronunciation(
  expectedSentence: string,
  userAudio: Blob
): Promise<{ score: number; feedback: string }> {
  // Placeholder implementation
  // In production, this would:
  // 1. Send audio to Gemini Speech API
  // 2. Compare with expected sentence
  // 3. Return score (0-100) and feedback
  
  // For now, return a mock response
  // TODO: Implement actual Gemini API integration
  return {
    score: 75,
    feedback: 'Buen intento. Intenta mejorar la pronunciación de las vocales.',
  };
}
