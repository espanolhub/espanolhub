/**
 * Interactive Lessons Data
 * Converted from downloadable resources to interactive lessons
 */

export interface InteractiveLesson {
  id: string;
  title: string;
  description: string;
  category: 'grammar' | 'vocabulary' | 'reading' | 'exam-prep' | 'general';
  level: 'beginner' | 'intermediate' | 'advanced';
  type: 'guide' | 'workbook' | 'cheat-sheet' | 'practice';
  tags: string[];
  createdAt: string;
  estimatedTime: number; // in minutes
  hasExercises: boolean;
  hasQuiz: boolean;
  progressTracking: boolean;
  content: LessonContent[];
}

export interface LessonContent {
  id: string;
  type: 'text' | 'exercise' | 'quiz' | 'example' | 'table';
  title?: string;
  content: string | ExerciseContent | QuizContent | TableContent;
  order: number;
}

export interface ExerciseContent {
  instructions: string;
  questions: ExerciseQuestion[];
}

export interface ExerciseQuestion {
  id: string;
  question: string;
  type: 'fill-blank' | 'multiple-choice' | 'translation' | 'matching';
  options?: string[];
  correctAnswer: string | number;
  explanation?: string;
}

export interface QuizContent {
  title: string;
  questions: QuizQuestion[];
  passingScore: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank';
  options?: string[];
  correctAnswer: string | boolean;
  explanation?: string;
}

export interface TableContent {
  headers: string[];
  rows: string[][];
  caption?: string;
}

export const interactiveLessons: InteractiveLesson[] = [
  // Grammar Lessons
  {
    id: 'grammar-ser-estar',
    title: 'Guía Definitiva: SER vs ESTAR',
    description: 'Aprende a dominar la diferencia entre SER y ESTAR con explicaciones claras, ejemplos y ejercicios prácticos.',
    category: 'grammar',
    level: 'beginner',
    type: 'guide',
    tags: ['ser', 'estar', 'verbos', 'gramática básica'],
    createdAt: '2024-01-15',
    estimatedTime: 45,
    hasExercises: true,
    hasQuiz: true,
    progressTracking: true,
    content: [
      {
        id: 'intro',
        type: 'text',
        title: 'Introducción',
        content: 'SER y ESTAR son dos de los verbos más importantes en español. Aunque ambos significan "ser", se usan en situaciones diferentes. En esta lección aprenderás cuándo usar cada uno.',
        order: 1
      },
      {
        id: 'ser-rules',
        type: 'text',
        title: 'Cuándo usar SER',
        content: `SER se usa para:
1. Características permanentes: "Soy alto"
2. Profesión: "Soy médico"
3. Origen: "Soy de España"
4. Nacionalidad: "Soy español"
5. Material: "La mesa es de madera"
6. Relación: "Él es mi hermano"
7. Hora y fecha: "Son las tres, es lunes"`,
        order: 2
      },
      {
        id: 'estar-rules',
        type: 'text',
        title: 'Cuándo usar ESTAR',
        content: `ESTAR se usa para:
1. Ubicación: "Estoy en casa"
2. Estados emocionales: "Estoy feliz"
3. Condiciones físicas: "Estoy enfermo"
4. Condiciones temporales: "La sopa está caliente"
5. Acciones en progreso (con gerundio): "Estoy estudiando"
6. Apariencia: "Estás guapa hoy"`,
        order: 3
      },
      {
        id: 'practice-exercises',
        type: 'exercise',
        title: 'Ejercicios Prácticos',
        content: {
          instructions: 'Completa las oraciones con SER o ESTAR en la forma correcta:',
          questions: [
            {
              id: 'ex1',
              question: 'Yo _____ estudiante.',
              type: 'fill-blank',
              correctAnswer: 'soy',
              explanation: 'SER se usa para profesión'
            },
            {
              id: 'ex2',
              question: 'La casa _____ muy grande.',
              type: 'fill-blank',
              correctAnswer: 'es',
              explanation: 'SER se usa para características permanentes'
            },
            {
              id: 'ex3',
              question: 'Nosotros _____ en la biblioteca.',
              type: 'fill-blank',
              correctAnswer: 'estamos',
              explanation: 'ESTAR se usa para ubicación'
            },
            {
              id: 'ex4',
              question: 'Tú _____ cansado hoy.',
              type: 'fill-blank',
              correctAnswer: 'estás',
              explanation: 'ESTAR se usa para condiciones físicas temporales'
            }
          ]
        },
        order: 4
      },
      {
        id: 'final-quiz',
        type: 'quiz',
        title: 'Evaluación Final',
        content: {
          title: 'SER vs ESTAR - Quiz Final',
          questions: [
            {
              id: 'q1',
              question: '¿Cuál es correcto para describir tu profesión?',
              type: 'multiple-choice',
              options: ['Soy profesor', 'Estoy profesor', 'Siendo profesor', 'Estando profesor'],
              correctAnswer: 'Soy profesor',
              explanation: 'SER se usa para profesión'
            },
            {
              id: 'q2',
              question: 'Para decir dónde estás ahora, usamos ESTAR.',
              type: 'true-false',
              correctAnswer: true,
              explanation: 'ESTAR se usa para ubicación'
            },
            {
              id: 'q3',
              question: 'El café _____ caliente.',
              type: 'fill-blank',
              correctAnswer: 'está',
              explanation: 'ESTAR se usa para condiciones temporales'
            }
          ],
          passingScore: 70
        },
        order: 5
      }
    ]
  },
  {
    id: 'grammar-verbs-regular',
    title: 'Verbos Regulares en Presente',
    description: 'Aprende la conjugación de verbos regulares en presente con ejercicios interactivos.',
    category: 'grammar',
    level: 'beginner',
    type: 'guide',
    tags: ['verbos', 'presente', 'conjugación', 'gramática'],
    createdAt: '2024-01-16',
    estimatedTime: 30,
    hasExercises: true,
    hasQuiz: true,
    progressTracking: true,
    content: [
      {
        id: 'intro',
        type: 'text',
        title: 'Introducción a los Verbos Regulares',
        content: 'Los verbos regulares siguen patrones predecibles en su conjugación. En español hay tres conjugaciones: -ar, -er, -ir.',
        order: 1
      },
      {
        id: 'ar-verbs',
        type: 'table',
        title: 'Verbos terminados en -AR',
        content: {
          headers: ['Pronombre', 'Hablar', 'Comer', 'Vivir'],
          rows: [
            ['Yo', 'hablo', 'como', 'vivo'],
            ['Tú', 'hablas', 'comes', 'vives'],
            ['Él/Ella/Usted', 'habla', 'come', 'vive'],
            ['Nosotros', 'hablamos', 'comemos', 'vivimos'],
            ['Vosotros', 'habláis', 'coméis', 'vivís'],
            ['Ellos/Ellas/Ustedes', 'hablan', 'comen', 'viven']
          ],
          caption: 'Conjugación regular en presente'
        },
        order: 2
      },
      {
        id: 'verb-practice',
        type: 'exercise',
        title: 'Practica la Conjugación',
        content: {
          instructions: 'Conjuga los siguientes verbos en presente:',
          questions: [
            {
              id: 'v1',
              question: 'Yo (cantar) _____ en el coro.',
              type: 'fill-blank',
              correctAnswer: 'canto',
              explanation: 'Cantar es un verbo -AR, yo = -o'
            },
            {
              id: 'v2',
              question: 'Tú (aprender) _____ español.',
              type: 'fill-blank',
              correctAnswer: 'aprendes',
              explanation: 'Aprender es un verbo -IR, tú = -es'
            },
            {
              id: 'v3',
              question: 'Nosotros (vivir) _____ en Madrid.',
              type: 'fill-blank',
              correctAnswer: 'vivimos',
              explanation: 'Vivir es un verbo -IR, nosotros = -imos'
            }
          ]
        },
        order: 3
      }
    ]
  },
  // Vocabulary Lessons
  {
    id: 'vocab-1000-words',
    title: '1000 Palabras Más Usadas',
    description: 'Aprende las 1000 palabras más frecuentes del español con ejercicios interactivos y seguimiento de progreso.',
    category: 'vocabulary',
    level: 'beginner',
    type: 'guide',
    tags: ['vocabulario', 'palabras comunes', 'frecuencia', 'básico'],
    createdAt: '2024-01-17',
    estimatedTime: 120,
    hasExercises: true,
    hasQuiz: true,
    progressTracking: true,
    content: [
      {
        id: 'intro-1000',
        type: 'text',
        title: 'Las 1000 Palabras Más Importantes',
        content: 'Aprender estas 1000 palabras te permitirá entender aproximadamente el 80% de las conversaciones cotidianas en español.',
        order: 1
      },
      {
        id: 'basic-words',
        type: 'table',
        title: 'Palabras Básicas (1-100)',
        content: {
          headers: ['Español', 'Categoría', 'Ejemplo'],
          rows: [
            ['hola', 'saludo', 'Hola, ¿cómo estás?'],
            ['gracias', 'agradecimiento', 'Gracias por tu ayuda'],
            ['por favor', 'cortesía', 'Por favor, ayúdame'],
            ['sí', 'afirmación', 'Sí, quiero café'],
            ['no', 'negación', 'No, no tengo hambre'],
            ['agua', 'bebida', 'Necesito agua'],
            ['comida', 'alimento', 'La comida está deliciosa'],
            ['casa', 'lugar', 'Voy a casa'],
            ['tiempo', 'concepto', 'No tengo tiempo'],
            ['dinero', 'objeto', 'Necesito dinero']
          ],
          caption: 'Las 10 palabras más básicas en español'
        },
        order: 2
      },
      {
        id: 'vocab-exercise',
        type: 'exercise',
        title: 'Practica el Vocabulario',
        content: {
          instructions: 'Completa las oraciones con la palabra correcta:',
          questions: [
            {
              id: 'voc1',
              question: '_____ por la comida.',
              type: 'fill-blank',
              correctAnswer: 'Gracias',
              explanation: 'Se usa gracias para agradecer'
            },
            {
              id: 'voc2',
              question: '¿Tienes _____?',
              type: 'fill-blank',
              correctAnswer: 'tiempo',
              explanation: 'Tiempo se refiere a disponibilidad horaria'
            },
            {
              id: 'voc3',
              question: 'Voy a mi _____.',
              type: 'fill-blank',
              correctAnswer: 'casa',
              explanation: 'Casa es el lugar donde uno vive'
            }
          ]
        },
        order: 3
      }
    ]
  },
  // Exam Preparation Lessons
  {
    id: 'exam-dele-a1',
    title: 'Preparación DELE A1',
    description: 'Guía completa para el examen DELE A1 con todas las secciones, estrategias y ejercicios prácticos.',
    category: 'exam-prep',
    level: 'beginner',
    type: 'guide',
    tags: ['DELE A1', 'examen', 'certificación', 'preparación'],
    createdAt: '2024-01-18',
    estimatedTime: 180,
    hasExercises: true,
    hasQuiz: true,
    progressTracking: true,
    content: [
      {
        id: 'dele-intro',
        type: 'text',
        title: '¿Qué es el DELE A1?',
        content: 'El DELE A1 es el examen de español de nivel principiante que certifica tu capacidad para comunicarte en situaciones básicas.',
        order: 1
      },
      {
        id: 'exam-structure',
        type: 'text',
        title: 'Estructura del Examen',
        content: `El DELE A1 tiene 4 partes:
1. Comprensión de lectura (40 minutos)
2. Comprensión auditiva (25 minutos)
3. Expresión e interacción escritas (25 minutos)
4. Expresión e interacción orales (15 minutos)

Para aprobar necesitas obtener al menos 30 puntos en cada parte.`,
        order: 2
      },
      {
        id: 'reading-strategies',
        type: 'text',
        title: 'Estrategias de Lectura',
        content: `Consejos para la comprensión de lectura:
- Lee primero las preguntas
- Busca palabras clave en el texto
- No te preocupes por cada palabra
- Elimina opciones obviamente incorrectas
- Gestiona tu tiempo: 1-2 minutos por pregunta`,
        order: 3
      },
      {
        id: 'listening-practice',
        type: 'exercise',
        title: 'Práctica de Comprensión Auditiva',
        content: {
          instructions: 'Escucha atentamente y responde:',
          questions: [
            {
              id: 'listen1',
              question: '¿Dónde está la persona?',
              type: 'multiple-choice',
              options: ['En casa', 'En el restaurante', 'En la escuela', 'En el parque'],
              correctAnswer: 1,
              explanation: 'La persona menciona "mesa" y "camarero"'
            },
            {
              id: 'listen2',
              question: '¿Qué va a pedir?',
              type: 'multiple-choice',
              options: ['Agua', 'Café', 'Arroz', 'Pollo'],
              correctAnswer: 2,
              explanation: 'La persona dice "un café con leche"'
            }
          ]
        },
        order: 4
      }
    ]
  },
  // Conversation Lessons
  {
    id: 'conversation-daily',
    title: 'Conversación Diaria',
    description: 'Aprende frases y diálogos esenciales para situaciones cotidianas con práctica interactiva.',
    category: 'general',
    level: 'beginner',
    type: 'guide',
    tags: ['conversación', 'diálogos', 'cotidiano', 'práctico'],
    createdAt: '2024-01-19',
    estimatedTime: 60,
    hasExercises: true,
    hasQuiz: true,
    progressTracking: true,
    content: [
      {
        id: 'conv-intro',
        type: 'text',
        title: 'Conversaciones Cotidianas',
        content: 'Aprende las frases más útiles para comunicarte en situaciones diarias como restaurantes, tiendas, hoteles y más.',
        order: 1
      },
      {
        id: 'restaurant-phrases',
        type: 'text',
        title: 'En el Restaurante',
        content: `Frases útiles para el restaurante:
- "Una mesa para dos, por favor"
- "¿Qué me recomienda?"
- "La cuenta, por favor"
- "Está delicioso"
- "¿Tienen menú del día?"`,
        order: 2
      },
      {
        id: 'dialogue-practice',
        type: 'exercise',
        title: 'Practica el Diálogo',
        content: {
          instructions: 'Completa el diálogo con la respuesta apropiada:',
          questions: [
            {
              id: 'dialog1',
              question: 'Camarero: "¿Qué desea ordenar?"\nTú: "_____"',
              type: 'multiple-choice',
              options: [
                'Quiero una paella',
                'Me llamo Juan',
                'Voy a casa',
                'No tengo hambre'
              ],
              correctAnswer: 0,
              explanation: 'Debes pedir comida'
            },
            {
              id: 'dialog2',
              question: 'Tú: "La cuenta, por favor"\nCamarero: "_____"',
              type: 'multiple-choice',
              options: [
                'Buenos días',
                'Enseguida, se lo traigo',
                'Adiós',
                '¿Cómo estás?'
              ],
              correctAnswer: 1,
              explanation: 'El camarero responde que traerá la cuenta'
            }
          ]
        },
        order: 3
      }
    ]
  }
];

// Helper functions
export function getInteractiveLessonById(id: string): InteractiveLesson | undefined {
  return interactiveLessons.find(lesson => lesson.id === id);
}

export function getInteractiveLessonsByCategory(category: InteractiveLesson['category']): InteractiveLesson[] {
  return interactiveLessons.filter(lesson => lesson.category === category);
}

export function getInteractiveLessonsByLevel(level: InteractiveLesson['level']): InteractiveLesson[] {
  return interactiveLessons.filter(lesson => lesson.level === level);
}

export function getAllInteractiveLessons(): InteractiveLesson[] {
  return interactiveLessons;
}

export function searchInteractiveLessons(query: string): InteractiveLesson[] {
  const lowerQuery = query.toLowerCase();
  return interactiveLessons.filter(lesson => 
    lesson.title.toLowerCase().includes(lowerQuery) ||
    lesson.description.toLowerCase().includes(lowerQuery) ||
    lesson.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

export function getLessonsWithExercises(): InteractiveLesson[] {
  return interactiveLessons.filter(lesson => lesson.hasExercises);
}

export function getLessonsWithQuiz(): InteractiveLesson[] {
  return interactiveLessons.filter(lesson => lesson.hasQuiz);
}

export function getEstimatedTotalTime(lessons: InteractiveLesson[]): number {
  return lessons.reduce((total, lesson) => total + lesson.estimatedTime, 0);
}
