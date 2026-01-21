/**
 * Order Game Sentences - Collected from all site content
 * Each sentence is split into words for the order game
 */

export interface OrderSentence {
  id: string;
  words: string[];
  level: number; // Level number (1, 2, 3, ...)
  category: string;
  source: string; // Source: dialogues, reading, useful-sentences, dictionary, etc.
}

// Extract sentences from dialogues, useful-sentences, dictionary examples, etc.
export const orderGameSentences: OrderSentence[] = [
  // Level 1 - Beginner (Simple sentences)
  { id: 'l1-1', words: ['yo', 'hablo', 'español'], level: 1, category: 'basic', source: 'dictionary' },
  { id: 'l1-2', words: ['ella', 'vive', 'en', 'la', 'casa'], level: 1, category: 'basic', source: 'games' },
  { id: 'l1-3', words: ['nosotros', 'bebemos', 'agua'], level: 1, category: 'basic', source: 'games' },
  { id: 'l1-4', words: ['ellos', 'van', 'al', 'parque'], level: 1, category: 'basic', source: 'games' },
  { id: 'l1-5', words: ['mañana', 'voy', 'al', 'trabajo'], level: 1, category: 'basic', source: 'games' },
  { id: 'l1-6', words: ['yo', 'estudio', 'español', 'todos', 'los', 'días'], level: 1, category: 'basic', source: 'games' },
  { id: 'l1-7', words: ['él', 'viaja', 'al', 'trabajo', 'en', 'autobús'], level: 1, category: 'basic', source: 'games' },
  { id: 'l1-8', words: ['tú', 'lees', 'libros', 'interesantes'], level: 1, category: 'basic', source: 'games' },
  { id: 'l1-9', words: ['nosotros', 'practicamos', 'español', 'cada', 'semana'], level: 1, category: 'basic', source: 'games' },
  { id: 'l1-10', words: ['yo', 'quiero', 'un', 'café', 'por', 'favor'], level: 1, category: 'restaurant', source: 'useful-sentences' },
  { id: 'l1-11', words: ['buenas', 'tardes', '¿tienen', 'reserva?'], level: 1, category: 'restaurant', source: 'dialogues' },
  { id: 'l1-12', words: ['sí', 'a', 'nombre', 'de', 'Martínez'], level: 1, category: 'restaurant', source: 'dialogues' },
  { id: 'l1-13', words: ['¿dónde', 'está', 'el', 'aeropuerto?'], level: 1, category: 'travel', source: 'useful-sentences' },
  { id: 'l1-14', words: ['necesito', 'un', 'boleto', 'a', 'Madrid'], level: 1, category: 'travel', source: 'useful-sentences' },
  { id: 'l1-15', words: ['voy', 'a', 'visitar', 'Barcelona', 'el', 'próximo', 'mes'], level: 1, category: 'travel', source: 'useful-sentences' },
  { id: 'l1-16', words: ['hola', 'busco', 'una', 'camisa', 'azul'], level: 1, category: 'shopping', source: 'dialogues' },
  { id: 'l1-17', words: ['¿cuánto', 'cuesta', 'esta', 'camisa?'], level: 1, category: 'shopping', source: 'dialogues' },
  { id: 'l1-18', words: ['me', 'gusta', 'mucho', 'esta', 'camisa'], level: 1, category: 'shopping', source: 'dialogues' },
  { id: 'l1-19', words: ['¿puedo', 'pagar', 'con', 'tarjeta?'], level: 1, category: 'shopping', source: 'dialogues' },
  { id: 'l1-20', words: ['la', 'casa', 'es', 'grande'], level: 1, category: 'dictionary', source: 'dictionary' },
  { id: 'l1-21', words: ['ayer', 'yo', 'fui', 'al', 'cine'], level: 1, category: 'dictionary', source: 'dictionary' },
  { id: 'l1-22', words: ['recibí', 'una', 'multa', 'por', 'aparcar', 'mal'], level: 1, category: 'legal', source: 'dictionary' },
  { id: 'l1-23', words: ['necesito', 'renovar', 'mi', 'permiso', 'de', 'residencia'], level: 1, category: 'legal', source: 'dictionary' },
  { id: 'l1-24', words: ['debes', 'cruzar', 'la', 'calle', 'por', 'el', 'paso', 'de', 'peatones'], level: 1, category: 'driving', source: 'dictionary' },
  { id: 'l1-25', words: ['el', 'rey', 'visitó', 'la', 'ciudad'], level: 1, category: 'culture', source: 'dictionary' },
  { id: 'l1-26', words: ['por', 'favor', 'gracias'], level: 1, category: 'basic', source: 'gemini' },
  { id: 'l1-27', words: ['no', 'entiendo'], level: 1, category: 'basic', source: 'gemini' },
  { id: 'l1-28', words: ['habla', 'más', 'despacio', 'por', 'favor'], level: 1, category: 'basic', source: 'gemini' },
  { id: 'l1-29', words: ['muchas', 'gracias'], level: 1, category: 'basic', source: 'basic' },
  { id: 'l1-30', words: ['de', 'nada'], level: 1, category: 'basic', source: 'basic' },

  // Level 2 - Beginner+
  { id: 'l2-1', words: ['me', 'gustaría', 'reservar', 'una', 'mesa', 'para', 'dos', 'personas'], level: 2, category: 'restaurant', source: 'gemini' },
  { id: 'l2-2', words: ['¿podría', 'decirme', 'cómo', 'llegar', 'a', 'la', 'estación', 'de', 'tren?'], level: 2, category: 'travel', source: 'gemini' },
  { id: 'l2-3', words: ['estoy', 'estudiando', 'español', 'desde', 'hace', 'tres', 'meses'], level: 2, category: 'education', source: 'gemini' },
  { id: 'l2-4', words: ['el', 'restaurante', 'está', 'cerrado', 'los', 'domingos'], level: 2, category: 'restaurant', source: 'gemini' },
  { id: 'l2-5', words: ['necesito', 'cambiar', 'mi', 'cita', 'para', 'la', 'próxima', 'semana'], level: 2, category: 'appointments', source: 'gemini' },
  { id: 'l2-6', words: ['perfecto', 'síganme', 'por', 'favor', '¿quieren', 'ver', 'la', 'carta?'], level: 2, category: 'restaurant', source: 'dialogues' },
  { id: 'l2-7', words: ['sí', 'por', 'favor', '¿qué', 'recomienda?'], level: 2, category: 'restaurant', source: 'dialogues' },
  { id: 'l2-8', words: ['nuestro', 'plato', 'del', 'día', 'es', 'el', 'pescado', 'a', 'la', 'plancha'], level: 2, category: 'restaurant', source: 'dialogues' },
  { id: 'l2-9', words: ['también', 'tenemos', 'una', 'paella', 'excelente'], level: 2, category: 'restaurant', source: 'dialogues' },
  { id: 'l2-10', words: ['perfecto', 'entonces', 'quiero', 'la', 'paella'], level: 2, category: 'restaurant', source: 'dialogues' },
  { id: 'l2-11', words: ['sí', 'una', 'botella', 'de', 'agua', 'y', 'dos', 'copas', 'de', 'vino', 'tinto'], level: 2, category: 'restaurant', source: 'dialogues' },
  { id: 'l2-12', words: ['muy', 'bien', 'enseguida', 'les', 'traigo', 'la', 'bebida'], level: 2, category: 'restaurant', source: 'dialogues' },
  { id: 'l2-13', words: ['camarero', '¿puede', 'traernos', 'la', 'cuenta', 'por', 'favor?'], level: 2, category: 'restaurant', source: 'dialogues' },
  { id: 'l2-14', words: ['por', 'supuesto', '¿está', 'todo', 'bien?'], level: 2, category: 'restaurant', source: 'dialogues' },
  { id: 'l2-15', words: ['sí', 'todo', 'estaba', 'delicioso'], level: 2, category: 'restaurant', source: 'dialogues' },
  { id: 'l2-16', words: ['buenos', 'días', '¿en', 'qué', 'puedo', 'ayudarle?'], level: 2, category: 'shopping', source: 'dialogues' },
  { id: 'l2-17', words: ['tenemos', 'varias', 'opciones', '¿qué', 'tipo', 'de', 'camisa', 'busca?'], level: 2, category: 'shopping', source: 'dialogues' },
  { id: 'l2-18', words: ['algo', 'formal', 'para', 'el', 'trabajo'], level: 2, category: 'shopping', source: 'dialogues' },
  { id: 'l2-19', words: ['esta', 'camisa', 'cuesta', 'cuarenta', 'y', 'cinco', 'euros'], level: 2, category: 'shopping', source: 'dialogues' },
  { id: 'l2-20', words: ['está', 'en', 'oferta', 'esta', 'semana'], level: 2, category: 'shopping', source: 'dialogues' },
  { id: 'l2-21', words: ['me', 'gusta', 'mucho', 'me', 'la', 'llevo'], level: 2, category: 'shopping', source: 'dialogues' },
  { id: 'l2-22', words: ['excelente', 'elección', '¿algo', 'más?'], level: 2, category: 'shopping', source: 'dialogues' },
  { id: 'l2-23', words: ['no', 'solo', 'esto'], level: 2, category: 'shopping', source: 'dialogues' },
  { id: 'l2-24', words: ['disculpe', 'compré', 'estos', 'zapatos', 'ayer'], level: 2, category: 'shopping', source: 'dialogues' },
  { id: 'l2-25', words: ['no', 'me', 'quedan', 'bien', '¿puedo', 'cambiarlos?'], level: 2, category: 'shopping', source: 'dialogues' },
  { id: 'l2-26', words: ['por', 'supuesto', '¿tiene', 'el', 'ticket', 'de', 'compra?'], level: 2, category: 'shopping', source: 'dialogues' },
  { id: 'l2-27', words: ['preferiría', 'cambiar', 'por', 'una', 'talla', 'más', 'grande'], level: 2, category: 'shopping', source: 'dialogues' },
  { id: 'l2-28', words: ['déjeme', 'verificar', 'el', 'almacén'], level: 2, category: 'shopping', source: 'dialogues' },
  { id: 'l2-29', words: ['sí', 'tenemos', 'su', 'talla', '¿quiere', 'probárselos?'], level: 2, category: 'shopping', source: 'dialogues' },
  { id: 'l2-30', words: ['perfecto', 'me', 'avisa', 'si', 'le', 'quedan', 'bien'], level: 2, category: 'shopping', source: 'dialogues' },
];

/**
 * Generate sentences for higher levels by combining patterns
 */
export function generateLevelSentences(level: number, count: number = 30): OrderSentence[] {
  if (level <= 2) {
    // Return existing sentences for levels 1 and 2
    return orderGameSentences.filter(s => s.level === level).slice(0, count);
  }

  // For levels 3+, generate based on patterns from existing sentences
  const baseSentences = orderGameSentences;
  const generated: OrderSentence[] = [];
  
  // Templates for generating sentences
  const templates = [
    ['yo', 'voy', 'a', 'VERB', 'OBJECT'],
    ['ella', 'VERB', 'en', 'la', 'PLACE'],
    ['nosotros', 'VERB', 'OBJECT', 'cada', 'TIME'],
    ['ellos', 'VERB', 'al', 'PLACE', 'en', 'TRANSPORT'],
    ['mañana', 'voy', 'a', 'VERB', 'OBJECT'],
    ['ayer', 'yo', 'VERB', 'al', 'PLACE'],
    ['necesito', 'VERB', 'OBJECT', 'para', 'REASON'],
    ['¿puedo', 'VERB', 'OBJECT', 'por', 'favor?'],
    ['me', 'gusta', 'ADJECTIVE', 'OBJECT'],
    ['estoy', 'VERB_ING', 'OBJECT', 'desde', 'hace', 'TIME'],
  ];

  const verbs = ['estudiar', 'trabajar', 'comer', 'beber', 'hablar', 'escribir', 'leer', 'viajar', 'visitar', 'comprar'];
  const objects = ['español', 'libros', 'agua', 'café', 'casa', 'comida', 'ropa', 'regalo'];
  const places = ['casa', 'trabajo', 'escuela', 'parque', 'restaurante', 'tienda', 'cine', 'biblioteca'];
  const times = ['día', 'semana', 'mes', 'año'];
  const transports = ['autobús', 'coche', 'tren', 'metro', 'bicicleta'];
  const adjectives = ['mucho', 'poco', 'bien', 'mal'];
  const reasons = ['trabajo', 'escuela', 'familia', 'salud'];

  for (let i = 0; i < count; i++) {
    const template = templates[i % templates.length];
    const words = template.map(word => {
      if (word === 'VERB') return verbs[Math.floor(Math.random() * verbs.length)];
      if (word === 'VERB_ING') return verbs[Math.floor(Math.random() * verbs.length)] + 'ando';
      if (word === 'OBJECT') return objects[Math.floor(Math.random() * objects.length)];
      if (word === 'PLACE') return places[Math.floor(Math.random() * places.length)];
      if (word === 'TIME') return times[Math.floor(Math.random() * times.length)];
      if (word === 'TRANSPORT') return transports[Math.floor(Math.random() * transports.length)];
      if (word === 'ADJECTIVE') return adjectives[Math.floor(Math.random() * adjectives.length)];
      if (word === 'REASON') return reasons[Math.floor(Math.random() * reasons.length)];
      return word;
    });

    generated.push({
      id: `l${level}-${i + 1}`,
      words,
      level,
      category: 'generated',
      source: 'generated',
    });
  }

  return generated;
}

/**
 * Get sentences for a specific level
 */
export function getSentencesForLevel(level: number): OrderSentence[] {
  const existing = orderGameSentences.filter(s => s.level === level);
  if (existing.length >= 30) {
    return existing.slice(0, 30);
  }
  
  // Generate more if needed
  const generated = generateLevelSentences(level, 30 - existing.length);
  return [...existing, ...generated];
}

/**
 * Get total number of levels (infinite - generates on demand)
 */
export function getMaxLevel(): number {
  // Return a high number to indicate infinite levels
  return 9999;
}
