import { Game } from '../types';

export const games: Game[] = [
  {
    id: 'multiple-choice',
    name: 'Preguntas de Opción Múltiple',
    description: 'Elige la respuesta correcta',
    icon: '✅',
    questions: [
      {
        id: '1',
        question: '¿Cómo se dice "casa" en español?',
        type: 'multiple-choice',
        options: ['casa', 'caso', 'casas', 'caso'],
        correctAnswer: 'casa',
        points: 10,
      },
      {
        id: '2',
        question: '¿Cuál es el número "cinco"?',
        type: 'multiple-choice',
        options: ['3', '4', '5', '6'],
        correctAnswer: '5',
        points: 10,
      },
      {
        id: '3',
        question: '¿Qué letra viene después de "A"?',
        type: 'multiple-choice',
        options: ['B', 'C', 'D', 'E'],
        correctAnswer: 'B',
        points: 10,
      },
      {
        id: '4',
        question: '¿Cómo se dice "perro" en español?',
        type: 'multiple-choice',
        options: ['perro', 'perra', 'perros', 'perras'],
        correctAnswer: 'perro',
        points: 10,
      },
      {
        id: '5',
        question: '¿Cuál es el número "diez"?',
        type: 'multiple-choice',
        options: ['8', '9', '10', '11'],
        correctAnswer: '10',
        points: 10,
      },
      {
        id: '6',
        question: '¿Qué color es "blue" en español?',
        type: 'multiple-choice',
        options: ['azul', 'rojo', 'verde', 'amarillo'],
        correctAnswer: 'azul',
        points: 10,
      },
    ],
  },
  {
    id: 'fill-blank',
    name: 'Completa la Frase',
    description: 'Completa las frases con la palabra correcta',
    icon: '✍️',
    questions: [
      { id: '1', question: 'Yo _____ español todos los días.', type: 'fill-blank', correctAnswer: 'estudio', points: 10 },
      { id: '2', question: 'Ella _____ en una escuela.', type: 'fill-blank', correctAnswer: 'trabaja', points: 10 },
      { id: '3', question: 'Nosotros _____ agua.', type: 'fill-blank', correctAnswer: 'bebemos', points: 10 },
      { id: '4', question: 'Ellos _____ mucho.', type: 'fill-blank', correctAnswer: 'corren', points: 10 },
      { id: '5', question: 'Tú _____ libros interesantes.', type: 'fill-blank', correctAnswer: 'lees', points: 10 },
      { id: '6', question: 'Él _____ al trabajo en autobús.', type: 'fill-blank', correctAnswer: 'viaja', points: 10 },
      { id: '7', question: 'Nosotros _____ español cada semana.', type: 'fill-blank', correctAnswer: 'practicamos', points: 10 },
    ],
  },
  {
    id: 'order',
    name: 'Ordena las Palabras',
    description: 'Ordena las palabras para formar una frase correcta',
    icon: '🔤',
    questions: [
      { id: '1', question: 'Ordena: [yo, español, estudio]', type: 'order', correctAnswer: ['yo', 'estudio', 'español'], points: 10 },
      { id: '2', question: 'Ordena: [ella, casa, en, la, vive]', type: 'order', correctAnswer: ['ella', 'vive', 'en', 'la', 'casa'], points: 10 },
      { id: '3', question: 'Ordena: [nosotros, agua, bebemos]', type: 'order', correctAnswer: ['nosotros', 'bebemos', 'agua'], points: 10 },
      { id: '4', question: 'Ordena: [ellos, parque, al, van]', type: 'order', correctAnswer: ['ellos', 'van', 'al', 'parque'], points: 10 },
      { id: '5', question: 'Ordena: [mañana, trabajo, voy, al]', type: 'order', correctAnswer: ['mañana', 'voy', 'al', 'trabajo'], points: 10 },
    ],
  },
  {
    id: 'word-race',
    name: 'Carrera de Palabras',
    description: 'Juego de velocidad con traducciones',
    icon: '⚡',
    questions: [],
  },
  {
    id: 'quick-quiz-verbos',
    name: 'Quick Quiz - Verbos',
    description: 'Practica verbos y gramática con frases de la vida diaria',
    icon: '⚡',
    questions: [],
  },
];

export function getGameById(id: string): Game | undefined {
  return games.find(game => game.id === id);
}
