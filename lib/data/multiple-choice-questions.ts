/**
 * Multiple Choice Questions - Collected from all site content
 * Rich collection of questions from vocabulary, grammar, reading, nationality, etc.
 */

export interface MCQQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  level: number;
  category: string;
  source: string; // Source: vocabulary, grammar, reading, nacionalidad, dialogues, etc.
  explanation?: string;
}

// Level 1 - Beginner (Vocabulary & Basic Grammar)
export const multipleChoiceQuestions: MCQQuestion[] = [
  // Vocabulary - Basic Words
  {
    id: 'mcq-l1-1',
    question: '¿Cómo se dice "casa" en español?',
    options: ['casa', 'caso', 'casas', 'caso'],
    correctAnswer: 'casa',
    level: 1,
    category: 'vocabulary',
    source: 'vocabulary',
  },
  {
    id: 'mcq-l1-2',
    question: '¿Cómo se dice "perro" en español?',
    options: ['perro', 'perra', 'perros', 'perras'],
    correctAnswer: 'perro',
    level: 1,
    category: 'vocabulary',
    source: 'vocabulary',
  },
  {
    id: 'mcq-l1-3',
    question: '¿Qué color es "azul" en español?',
    options: ['azul', 'rojo', 'verde', 'amarillo'],
    correctAnswer: 'azul',
    level: 1,
    category: 'vocabulary',
    source: 'vocabulary',
  },
  {
    id: 'mcq-l1-4',
    question: '¿Cuál es el número "cinco"?',
    options: ['3', '4', '5', '6'],
    correctAnswer: '5',
    level: 1,
    category: 'numbers',
    source: 'basic',
  },
  {
    id: 'mcq-l1-5',
    question: '¿Cuál es el número "diez"?',
    options: ['8', '9', '10', '11'],
    correctAnswer: '10',
    level: 1,
    category: 'numbers',
    source: 'basic',
  },
  {
    id: 'mcq-l1-6',
    question: '¿Cómo se dice "agua" en español?',
    options: ['agua', 'aguas', 'aguado', 'aguar'],
    correctAnswer: 'agua',
    level: 1,
    category: 'vocabulary',
    source: 'vocabulary',
  },
  {
    id: 'mcq-l1-7',
    question: '¿Qué significa "hablar"?',
    options: ['comer', 'hablar', 'beber', 'dormir'],
    correctAnswer: 'hablar',
    level: 1,
    category: 'verbs',
    source: 'vocabulary',
  },
  {
    id: 'mcq-l1-8',
    question: '¿Cómo se dice "buenos días"?',
    options: ['buenos días', 'buenas tardes', 'buenas noches', 'hola'],
    correctAnswer: 'buenos días',
    level: 1,
    category: 'greetings',
    source: 'dialogues',
  },
  {
    id: 'mcq-l1-9',
    question: '¿Qué significa "gracias"?',
    options: ['por favor', 'gracias', 'de nada', 'perdón'],
    correctAnswer: 'gracias',
    level: 1,
    category: 'greetings',
    source: 'basic',
  },
  {
    id: 'mcq-l1-10',
    question: '¿Cómo se dice "mesa" en español?',
    options: ['mesa', 'meso', 'mesas', 'mesar'],
    correctAnswer: 'mesa',
    level: 1,
    category: 'vocabulary',
    source: 'vocabulary',
  },
  {
    id: 'mcq-l1-11',
    question: '¿Qué significa "estudiar"?',
    options: ['estudiar', 'trabajar', 'comer', 'dormir'],
    correctAnswer: 'estudiar',
    level: 1,
    category: 'verbs',
    source: 'vocabulary',
  },
  {
    id: 'mcq-l1-12',
    question: '¿Cómo se dice "libro" en español?',
    options: ['libro', 'libra', 'libros', 'librar'],
    correctAnswer: 'libro',
    level: 1,
    category: 'vocabulary',
    source: 'vocabulary',
  },
  {
    id: 'mcq-l1-13',
    question: '¿Qué significa "comer"?',
    options: ['comer', 'beber', 'hablar', 'caminar'],
    correctAnswer: 'comer',
    level: 1,
    category: 'verbs',
    source: 'vocabulary',
  },
  {
    id: 'mcq-l1-14',
    question: '¿Cómo se dice "trabajo" en español?',
    options: ['trabajo', 'trabaja', 'trabajan', 'trabajos'],
    correctAnswer: 'trabajo',
    level: 1,
    category: 'vocabulary',
    source: 'vocabulary',
  },
  {
    id: 'mcq-l1-15',
    question: '¿Qué significa "beber"?',
    options: ['comer', 'beber', 'dormir', 'hablar'],
    correctAnswer: 'beber',
    level: 1,
    category: 'verbs',
    source: 'vocabulary',
  },
  {
    id: 'mcq-l1-16',
    question: '¿Cómo se dice "coche" en español?',
    options: ['coche', 'coches', 'cocho', 'cochar'],
    correctAnswer: 'coche',
    level: 1,
    category: 'vocabulary',
    source: 'vocabulary',
  },
  {
    id: 'mcq-l1-17',
    question: '¿Qué significa "dormir"?',
    options: ['comer', 'beber', 'dormir', 'hablar'],
    correctAnswer: 'dormir',
    level: 1,
    category: 'verbs',
    source: 'vocabulary',
  },
  {
    id: 'mcq-l1-18',
    question: '¿Cómo se dice "amigo" en español?',
    options: ['amigo', 'amiga', 'amigos', 'amigar'],
    correctAnswer: 'amigo',
    level: 1,
    category: 'vocabulary',
    source: 'vocabulary',
  },
  {
    id: 'mcq-l1-19',
    question: '¿Qué significa "leer"?',
    options: ['escribir', 'leer', 'hablar', 'escuchar'],
    correctAnswer: 'leer',
    level: 1,
    category: 'verbs',
    source: 'vocabulary',
  },
  {
    id: 'mcq-l1-20',
    question: '¿Cómo se dice "escuela" en español?',
    options: ['escuela', 'escuelo', 'escuelas', 'escolar'],
    correctAnswer: 'escuela',
    level: 1,
    category: 'vocabulary',
    source: 'vocabulary',
  },
  {
    id: 'mcq-l1-21',
    question: '¿Qué significa "escribir"?',
    options: ['leer', 'escribir', 'hablar', 'escuchar'],
    correctAnswer: 'escribir',
    level: 1,
    category: 'verbs',
    source: 'vocabulary',
  },
  {
    id: 'mcq-l1-22',
    question: '¿Cómo se dice "familia" en español?',
    options: ['familia', 'familiar', 'familias', 'familiar'],
    correctAnswer: 'familia',
    level: 1,
    category: 'vocabulary',
    source: 'vocabulary',
  },
  {
    id: 'mcq-l1-23',
    question: '¿Qué significa "caminar"?',
    options: ['correr', 'caminar', 'saltar', 'volar'],
    correctAnswer: 'caminar',
    level: 1,
    category: 'verbs',
    source: 'vocabulary',
  },
  {
    id: 'mcq-l1-24',
    question: '¿Cómo se dice "ciudad" en español?',
    options: ['ciudad', 'ciudades', 'ciudadano', 'civil'],
    correctAnswer: 'ciudad',
    level: 1,
    category: 'vocabulary',
    source: 'vocabulary',
  },
  {
    id: 'mcq-l1-25',
    question: '¿Qué significa "comprar"?',
    options: ['vender', 'comprar', 'regalar', 'dar'],
    correctAnswer: 'comprar',
    level: 1,
    category: 'verbs',
    source: 'vocabulary',
  },
  {
    id: 'mcq-l1-26',
    question: '¿Cómo se dice "tienda" en español?',
    options: ['tienda', 'tiendas', 'tendero', 'tender'],
    correctAnswer: 'tienda',
    level: 1,
    category: 'vocabulary',
    source: 'vocabulary',
  },
  {
    id: 'mcq-l1-27',
    question: '¿Qué significa "viajar"?',
    options: ['viajar', 'vivir', 'visitar', 'venir'],
    correctAnswer: 'viajar',
    level: 1,
    category: 'verbs',
    source: 'vocabulary',
  },
  {
    id: 'mcq-l1-28',
    question: '¿Cómo se dice "restaurante" en español?',
    options: ['restaurante', 'restaurar', 'restaurantes', 'restauración'],
    correctAnswer: 'restaurante',
    level: 1,
    category: 'vocabulary',
    source: 'vocabulary',
  },
  {
    id: 'mcq-l1-29',
    question: '¿Qué significa "necesitar"?',
    options: ['querer', 'necesitar', 'poder', 'deber'],
    correctAnswer: 'necesitar',
    level: 1,
    category: 'verbs',
    source: 'vocabulary',
  },
  {
    id: 'mcq-l1-30',
    question: '¿Cómo se dice "hospital" en español?',
    options: ['hospital', 'hospitales', 'hospitalario', 'hospitalidad'],
    correctAnswer: 'hospital',
    level: 1,
    category: 'vocabulary',
    source: 'vocabulary',
  },

  // Level 2 - Beginner+ (Grammar & Sentences)
  {
    id: 'mcq-l2-1',
    question: 'Completa: Yo _____ español todos los días.',
    options: ['estudio', 'estudias', 'estudia', 'estudiamos'],
    correctAnswer: 'estudio',
    level: 2,
    category: 'grammar',
    source: 'grammar',
  },
  {
    id: 'mcq-l2-2',
    question: 'Completa: Ella _____ en una escuela.',
    options: ['trabajo', 'trabajas', 'trabaja', 'trabajamos'],
    correctAnswer: 'trabaja',
    level: 2,
    category: 'grammar',
    source: 'grammar',
  },
  {
    id: 'mcq-l2-3',
    question: 'Completa: Nosotros _____ agua.',
    options: ['bebo', 'bebes', 'bebe', 'bebemos'],
    correctAnswer: 'bebemos',
    level: 2,
    category: 'grammar',
    source: 'grammar',
  },
  {
    id: 'mcq-l2-4',
    question: '¿Cuál es el artículo correcto? _____ casa es grande.',
    options: ['El', 'La', 'Los', 'Las'],
    correctAnswer: 'La',
    level: 2,
    category: 'grammar',
    source: 'grammar',
  },
  {
    id: 'mcq-l2-5',
    question: '¿Cuál es el artículo correcto? _____ libros son interesantes.',
    options: ['El', 'La', 'Los', 'Las'],
    correctAnswer: 'Los',
    level: 2,
    category: 'grammar',
    source: 'grammar',
  },
  {
    id: 'mcq-l2-6',
    question: 'Completa: Tú _____ libros interesantes.',
    options: ['leo', 'lees', 'lee', 'leemos'],
    correctAnswer: 'lees',
    level: 2,
    category: 'grammar',
    source: 'grammar',
  },
  {
    id: 'mcq-l2-7',
    question: 'Completa: Ellos _____ al parque.',
    options: ['voy', 'vas', 'va', 'van'],
    correctAnswer: 'van',
    level: 2,
    category: 'grammar',
    source: 'grammar',
  },
  {
    id: 'mcq-l2-8',
    question: '¿Cuál es la forma correcta? Yo _____ mucho.',
    options: ['corro', 'corres', 'corre', 'corremos'],
    correctAnswer: 'corro',
    level: 2,
    category: 'grammar',
    source: 'grammar',
  },
  {
    id: 'mcq-l2-9',
    question: 'Completa: Nosotros _____ español cada semana.',
    options: ['practico', 'practicas', 'practica', 'practicamos'],
    correctAnswer: 'practicamos',
    level: 2,
    category: 'grammar',
    source: 'grammar',
  },
  {
    id: 'mcq-l2-10',
    question: '¿Cuál es la forma correcta? Usted _____ muy bien.',
    options: ['hablo', 'hablas', 'habla', 'hablamos'],
    correctAnswer: 'habla',
    level: 2,
    category: 'grammar',
    source: 'grammar',
  },
  {
    id: 'mcq-l2-11',
    question: 'En el restaurante: ¿Qué desea _____?',
    options: ['usted', 'tú', 'vosotros', 'ellos'],
    correctAnswer: 'usted',
    level: 2,
    category: 'dialogues',
    source: 'dialogues',
  },
  {
    id: 'mcq-l2-12',
    question: 'Completa: ¿Cuánto _____ esto?',
    options: ['cuesta', 'cuestas', 'cuestan', 'costamos'],
    correctAnswer: 'cuesta',
    level: 2,
    category: 'shopping',
    source: 'dialogues',
  },
  {
    id: 'mcq-l2-13',
    question: 'Completa: Me _____ mucho esta camisa.',
    options: ['gusto', 'gustas', 'gusta', 'gustamos'],
    correctAnswer: 'gusta',
    level: 2,
    category: 'grammar',
    source: 'grammar',
  },
  {
    id: 'mcq-l2-14',
    question: 'Completa: ¿A qué hora _____ el tren?',
    options: ['salgo', 'sales', 'sale', 'salimos'],
    correctAnswer: 'sale',
    level: 2,
    category: 'travel',
    source: 'useful-sentences',
  },
  {
    id: 'mcq-l2-15',
    question: 'Completa: Necesito _____ una mesa para dos personas.',
    options: ['reservar', 'reservo', 'reservas', 'reserva'],
    correctAnswer: 'reservar',
    level: 2,
    category: 'restaurant',
    source: 'dialogues',
  },
  {
    id: 'mcq-l2-16',
    question: 'Completa: Voy a _____ Barcelona el próximo mes.',
    options: ['visitar', 'visito', 'visitas', 'visita'],
    correctAnswer: 'visitar',
    level: 2,
    category: 'travel',
    source: 'useful-sentences',
  },
  {
    id: 'mcq-l2-17',
    question: 'Completa: Estoy _____ español desde hace tres meses.',
    options: ['estudiando', 'estudiar', 'estudio', 'estudias'],
    correctAnswer: 'estudiando',
    level: 2,
    category: 'grammar',
    source: 'grammar',
  },
  {
    id: 'mcq-l2-18',
    question: 'Completa: El restaurante _____ cerrado los domingos.',
    options: ['soy', 'eres', 'es', 'somos'],
    correctAnswer: 'es',
    level: 2,
    category: 'restaurant',
    source: 'dialogues',
  },
  {
    id: 'mcq-l2-19',
    question: 'Completa: ¿Puedo _____ con tarjeta?',
    options: ['pagar', 'pago', 'pagas', 'paga'],
    correctAnswer: 'pagar',
    level: 2,
    category: 'shopping',
    source: 'dialogues',
  },
  {
    id: 'mcq-l2-20',
    question: 'Completa: Necesito cambiar mi cita para _____ próxima semana.',
    options: ['el', 'la', 'los', 'las'],
    correctAnswer: 'la',
    level: 2,
    category: 'grammar',
    source: 'grammar',
  },
  {
    id: 'mcq-l2-21',
    question: 'Completa: Prefiero tomar el café _____ azúcar.',
    options: ['con', 'sin', 'por', 'para'],
    correctAnswer: 'sin',
    level: 2,
    category: 'restaurant',
    source: 'dialogues',
  },
  {
    id: 'mcq-l2-22',
    question: 'Completa: La reunión comenzará _____ las diez de la mañana.',
    options: ['en', 'a', 'de', 'por'],
    correctAnswer: 'a',
    level: 2,
    category: 'grammar',
    source: 'grammar',
  },
  {
    id: 'mcq-l2-23',
    question: 'Completa: ¿Qué _____ para visitar en esta ciudad?',
    options: ['recomiendo', 'recomiendas', 'recomienda', 'recomendamos'],
    correctAnswer: 'recomienda',
    level: 2,
    category: 'travel',
    source: 'useful-sentences',
  },
  {
    id: 'mcq-l2-24',
    question: 'Completa: Perdí mi _____ ayer.',
    options: ['pasaporte', 'pasaportes', 'pasaportar', 'pasaportado'],
    correctAnswer: 'pasaporte',
    level: 2,
    category: 'travel',
    source: 'useful-sentences',
  },
  {
    id: 'mcq-l2-25',
    question: 'Completa: Reservé una _____ para dos personas.',
    options: ['habitación', 'habitaciones', 'habitar', 'habitado'],
    correctAnswer: 'habitación',
    level: 2,
    category: 'travel',
    source: 'useful-sentences',
  },
  {
    id: 'mcq-l2-26',
    question: 'Completa: ¿Tiene su _____ de compra?',
    options: ['ticket', 'tickets', 'ticketera', 'ticketeado'],
    correctAnswer: 'ticket',
    level: 2,
    category: 'shopping',
    source: 'dialogues',
  },
  {
    id: 'mcq-l2-27',
    question: 'Completa: Preferiría cambiar _____ una talla más grande.',
    options: ['en', 'a', 'por', 'para'],
    correctAnswer: 'por',
    level: 2,
    category: 'grammar',
    source: 'grammar',
  },
  {
    id: 'mcq-l2-28',
    question: 'Completa: Esta camisa _____ 45 euros.',
    options: ['cuesta', 'cuestas', 'cuestan', 'costamos'],
    correctAnswer: 'cuesta',
    level: 2,
    category: 'shopping',
    source: 'dialogues',
  },
  {
    id: 'mcq-l2-29',
    question: 'Completa: Está _____ oferta esta semana.',
    options: ['en', 'a', 'de', 'por'],
    correctAnswer: 'en',
    level: 2,
    category: 'shopping',
    source: 'dialogues',
  },
  {
    id: 'mcq-l2-30',
    question: 'Completa: ¿Aceptan tarjeta de _____?',
    options: ['crédito', 'créditos', 'creditar', 'acreditar'],
    correctAnswer: 'crédito',
    level: 2,
    category: 'shopping',
    source: 'dialogues',
  },
];

/**
 * Generate questions for higher levels
 */
export function generateLevelQuestions(level: number, count: number = 30): MCQQuestion[] {
  if (level <= 2) {
    return multipleChoiceQuestions.filter(q => q.level === level).slice(0, count);
  }

  // Templates for generating questions
  const templates = [
    {
      question: 'Completa: Yo _____ OBJECT cada TIME.',
      options: ['VERB_1SG', 'VERB_2SG', 'VERB_3SG', 'VERB_1PL'],
      level: level,
    },
    {
      question: 'Completa: Ella _____ en la PLACE.',
      options: ['VERB_3SG', 'VERB_1SG', 'VERB_2SG', 'VERB_1PL'],
      level: level,
    },
    {
      question: '¿Cuál es el artículo correcto? _____ OBJECT es ADJECTIVE.',
      options: ['ARTICLE_M', 'ARTICLE_F', 'ARTICLE_PL_M', 'ARTICLE_PL_F'],
      level: level,
    },
    {
      question: 'Completa: Nosotros _____ OBJECT.',
      options: ['VERB_1PL', 'VERB_1SG', 'VERB_2SG', 'VERB_3SG'],
      level: level,
    },
  ];

  const verbs = {
    VERB_1SG: ['estudio', 'trabajo', 'hablo', 'como', 'bebo', 'leo', 'escribo', 'viajo', 'visito', 'compro'],
    VERB_2SG: ['estudias', 'trabajas', 'hablas', 'comes', 'bebes', 'lees', 'escribes', 'viajas', 'visitas', 'compras'],
    VERB_3SG: ['estudia', 'trabaja', 'habla', 'come', 'bebe', 'lee', 'escribe', 'viaja', 'visita', 'compra'],
    VERB_1PL: ['estudiamos', 'trabajamos', 'hablamos', 'comemos', 'bebemos', 'leemos', 'escribimos', 'viajamos', 'visitamos', 'compramos'],
  };

  const objects = ['español', 'libros', 'agua', 'café', 'casa', 'comida', 'ropa', 'regalo'];
  const places = ['casa', 'trabajo', 'escuela', 'parque', 'restaurante', 'tienda', 'cine', 'biblioteca'];
  const times = ['día', 'semana', 'mes', 'año'];
  const adjectives = ['grande', 'pequeño', 'bonito', 'interesante'];

  const articles = {
    ARTICLE_M: ['El'],
    ARTICLE_F: ['La'],
    ARTICLE_PL_M: ['Los'],
    ARTICLE_PL_F: ['Las'],
  };

  const generated: MCQQuestion[] = [];

  for (let i = 0; i < count; i++) {
    const template = templates[i % templates.length];
    const verbIndex = Math.floor(Math.random() * verbs.VERB_1SG.length);
    
    let question = template.question;
    let options = [...template.options];

    // Replace placeholders
    question = question.replace('VERB_1SG', verbs.VERB_1SG[verbIndex]);
    question = question.replace('VERB_2SG', verbs.VERB_2SG[verbIndex]);
    question = question.replace('VERB_3SG', verbs.VERB_3SG[verbIndex]);
    question = question.replace('VERB_1PL', verbs.VERB_1PL[verbIndex]);
    question = question.replace('OBJECT', objects[Math.floor(Math.random() * objects.length)]);
    question = question.replace('PLACE', places[Math.floor(Math.random() * places.length)]);
    question = question.replace('TIME', times[Math.floor(Math.random() * times.length)]);
    question = question.replace('ADJECTIVE', adjectives[Math.floor(Math.random() * adjectives.length)]);

    options = options.map(opt => {
      if (opt.startsWith('VERB_')) {
        const key = opt as keyof typeof verbs;
        return verbs[key][verbIndex];
      }
      if (opt.startsWith('ARTICLE_')) {
        const key = opt as keyof typeof articles;
        return articles[key][0];
      }
      return opt;
    });

    // Shuffle options but keep correct answer
    const correctAnswer = options[0];
    options = options.sort(() => Math.random() - 0.5);

    generated.push({
      id: `mcq-l${level}-${i + 1}`,
      question,
      options,
      correctAnswer,
      level,
      category: 'generated',
      source: 'generated',
    });
  }

  return generated;
}

/**
 * Get questions for a specific level
 */
export function getQuestionsForLevel(level: number): MCQQuestion[] {
  const existing = multipleChoiceQuestions.filter(q => q.level === level);
  if (existing.length >= 30) {
    return existing.slice(0, 30);
  }
  
  // Generate more if needed
  const generated = generateLevelQuestions(level, 30 - existing.length);
  return [...existing, ...generated];
}

/**
 * Get total number of levels (infinite - generates on demand)
 */
export function getMaxLevel(): number {
  return 9999;
}
