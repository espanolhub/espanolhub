import { Game } from '../types';

export const games: Game[] = [
  {
    id: 'noun-agreement',
    name: 'Género y Número: Sustantivos',
    description: 'Masculino/Femenino + Singular/Plural en 3 niveles',
    icon: '🧩',
    questions: [],
  },
  {
    id: 'multiple-choice',
    name: 'Preguntas de Opción Múltiple',
    description: 'Elige la respuesta correcta',
    icon: '✅',
    questions: [
      // Gender and Number
      { id: '1', question: '¿Cuál es el artículo correcto para "casa"?', type: 'multiple-choice', options: ['la casa', 'el casa', 'los casa', 'las casa'], correctAnswer: 'la casa', points: 10 },
      { id: '2', question: '¿Cuál es el plural de "libro"?', type: 'multiple-choice', options: ['libro', 'libros', 'libroes', 'libro'], correctAnswer: 'libros', points: 10 },
      { id: '3', question: '¿Cuál es el femenino de "niño"?', type: 'multiple-choice', options: ['niña', 'niño', 'niños', 'niñas'], correctAnswer: 'niña', points: 10 },
      { id: '4', question: '¿Cuál es el singular de "mesas"?', type: 'multiple-choice', options: ['mesa', 'mesas', 'mesa', 'mesas'], correctAnswer: 'mesa', points: 10 },
      { id: '5', question: '¿Cuál es el masculino de "profesora"?', type: 'multiple-choice', options: ['profesor', 'profesora', 'profesores', 'profesoras'], correctAnswer: 'profesor', points: 10 },
      { id: '6', question: '¿Cuál es el plural de "coche"?', type: 'multiple-choice', options: ['coche', 'coches', 'coche', 'coches'], correctAnswer: 'coches', points: 10 },
      { id: '7', question: '¿Cuál es el femenino de "gato"?', type: 'multiple-choice', options: ['gata', 'gato', 'gatos', 'gatas'], correctAnswer: 'gata', points: 10 },
      { id: '8', question: '¿Cuál es el singular de "flores"?', type: 'multiple-choice', options: ['flor', 'flores', 'flor', 'flores'], correctAnswer: 'flor', points: 10 },
      { id: '9', question: '¿Cuál es el masculino de "estudiante"?', type: 'multiple-choice', options: ['estudiante', 'estudiante', 'estudiantes', 'estudiantes'], correctAnswer: 'estudiante', points: 10 },
      { id: '10', question: '¿Cuál es el plural de "ciudad"?', type: 'multiple-choice', options: ['ciudad', 'ciudades', 'ciudad', 'ciudades'], correctAnswer: 'ciudades', points: 10 },
      // Vocabulary
      { id: '11', question: '¿Cómo se dice "water" en español?', type: 'multiple-choice', options: ['agua', 'fuego', 'tierra', 'aire'], correctAnswer: 'agua', points: 10 },
      { id: '12', question: '¿Cuál es el color "red" en español?', type: 'multiple-choice', options: ['rojo', 'azul', 'verde', 'amarillo'], correctAnswer: 'rojo', points: 10 },
      { id: '13', question: '¿Cómo se dice "good morning" en español?', type: 'multiple-choice', options: ['buenos días', 'buenas noches', 'buenas tardes', 'hola'], correctAnswer: 'buenos días', points: 10 },
      { id: '14', question: '¿Cuál es el opuesto de "grande"?', type: 'multiple-choice', options: ['pequeño', 'mediano', 'enorme', 'gigante'], correctAnswer: 'pequeño', points: 10 },
      { id: '15', question: '¿Qué día es "Monday" en español?', type: 'multiple-choice', options: ['lunes', 'martes', 'miércoles', 'jueves'], correctAnswer: 'lunes', points: 10 },
      { id: '16', question: '¿Cuál es el número "seven" en español?', type: 'multiple-choice', options: ['siete', 'cinco', 'seis', 'ocho'], correctAnswer: 'siete', points: 10 },
      { id: '17', question: '¿Cómo se dice "thank you" en español?', type: 'multiple-choice', options: ['gracias', 'por favor', 'de nada', 'lo siento'], correctAnswer: 'gracias', points: 10 },
      { id: '18', question: '¿Qué animal es "cat" en español?', type: 'multiple-choice', options: ['gato', 'perro', 'pájaro', 'pez'], correctAnswer: 'gato', points: 10 },
      { id: '19', question: '¿Cuál es el mes "January" en español?', type: 'multiple-choice', options: ['enero', 'febrero', 'marzo', 'abril'], correctAnswer: 'enero', points: 10 },
      { id: '20', question: '¿Cómo se dice "I love you" en español?', type: 'multiple-choice', options: ['te quiero', 'te amo', 'me gustas', 'te extraño'], correctAnswer: 'te quiero', points: 10 },
    ],
  },
  {
    id: 'fill-blank',
    name: 'Completar Frases',
    description: 'Escribe la palabra correcta',
    icon: '✏️',
    image: '/assets/games/fill-blank.svg',
    questions: [
      // Daily Verbs and Routines
      { id: '1', question: 'Yo _____ español todos los días.', type: 'fill-blank', correctAnswer: 'hablo', points: 10 },
      { id: '2', question: 'Ella _____ en una escuela.', type: 'fill-blank', correctAnswer: 'trabaja', points: 10 },
      { id: '3', question: 'Nosotros _____ agua.', type: 'fill-blank', correctAnswer: 'bebemos', points: 10 },
      { id: '4', question: 'Ellos _____ mucho.', type: 'fill-blank', correctAnswer: 'corren', points: 10 },
      { id: '5', question: 'Tú _____ libros interesantes.', type: 'fill-blank', correctAnswer: 'lees', points: 10 },
      { id: '6', question: 'Él _____ al trabajo en autobús.', type: 'fill-blank', correctAnswer: 'viaja', points: 10 },
      { id: '7', question: 'Nosotros _____ español cada semana.', type: 'fill-blank', correctAnswer: 'practicamos', points: 10 },
      { id: '8', question: 'Los niños _____ en el parque.', type: 'fill-blank', correctAnswer: 'juegan', points: 10 },
      { id: '9', question: 'Yo _____ café por la mañana.', type: 'fill-blank', correctAnswer: 'tomo', points: 10 },
      { id: '10', question: 'Ella _____ la guitarra muy bien.', type: 'fill-blank', correctAnswer: 'toca', points: 10 },
      // Food and Restaurant
      { id: '11', question: 'Yo _____ arroz con pollo.', type: 'fill-blank', correctAnswer: 'como', points: 10 },
      { id: '12', question: 'Nosotros _____ en un restaurante.', type: 'fill-blank', correctAnswer: 'comemos', points: 10 },
      { id: '13', question: 'El chef _____ paella.', type: 'fill-blank', correctAnswer: 'cocina', points: 10 },
      { id: '14', question: 'Tú _____ mucha agua.', type: 'fill-blank', correctAnswer: 'bebes', points: 10 },
      { id: '15', question: 'Ellos _____ helado.', type: 'fill-blank', correctAnswer: 'comen', points: 10 },
      // School and Learning
      { id: '16', question: 'Los estudiantes _____ en la clase.', type: 'fill-blank', correctAnswer: 'estudian', points: 10 },
      { id: '17', question: 'Yo _____ matemáticas.', type: 'fill-blank', correctAnswer: 'estudio', points: 10 },
      { id: '18', question: 'La profesora _____ español.', type: 'fill-blank', correctAnswer: 'enseña', points: 10 },
      { id: '19', question: 'Tú _____ la tarea.', type: 'fill-blank', correctAnswer: 'haces', points: 10 },
      { id: '20', question: 'Nosotros _____ la lección.', type: 'fill-blank', correctAnswer: 'aprendemos', points: 10 },
    ],
  },
  {
    id: 'order',
    name: 'Ordena las Palabras',
    description: 'Ordena las palabras para formar una frase correcta',
    icon: '🔤',
    image: '/assets/games/order.svg',
    questions: [
      // Basic Sentences
      { id: '1', question: 'Ordena: [yo, español, estudio]', type: 'order', correctAnswer: ['yo', 'estudio', 'español'], points: 10 },
      { id: '2', question: 'Ordena: [ella, casa, en, la, vive]', type: 'order', correctAnswer: ['ella', 'vive', 'en', 'la', 'casa'], points: 10 },
      { id: '3', question: 'Ordena: [nosotros, agua, bebemos]', type: 'order', correctAnswer: ['nosotros', 'bebemos', 'agua'], points: 10 },
      { id: '4', question: 'Ordena: [ellos, parque, al, van]', type: 'order', correctAnswer: ['ellos', 'van', 'al', 'parque'], points: 10 },
      { id: '5', question: 'Ordena: [mañana, trabajo, voy, al]', type: 'order', correctAnswer: ['mañana', 'voy', 'al', 'trabajo'], points: 10 },
      { id: '6', question: 'Ordena: [tú, música, gusta, la]', type: 'order', correctAnswer: ['a', 'ti', 'te', 'gusta', 'la', 'música'], points: 10 },
      { id: '7', question: 'Ordena: [nosotros, cine, al, vamos]', type: 'order', correctAnswer: ['nosotros', 'vamos', 'al', 'cine'], points: 10 },
      { id: '8', question: 'Ordena: [él, periódico, lee, el]', type: 'order', correctAnswer: ['él', 'lee', 'el', 'periódico'], points: 10 },
      // Daily Activities
      { id: '9', question: 'Ordena: [yo, café, tomo, por, la, mañana]', type: 'order', correctAnswer: ['yo', 'tomo', 'café', 'por', 'la', 'mañana'], points: 10 },
      { id: '10', question: 'Ordena: [ella, guitarra, la, toca, bien, muy]', type: 'order', correctAnswer: ['ella', 'toca', 'la', 'guitarra', 'muy', 'bien'], points: 10 },
      { id: '11', question: 'Ordena: [nosotros, español, practicamos, cada, semana]', type: 'order', correctAnswer: ['nosotros', 'practicamos', 'español', 'cada', 'semana'], points: 10 },
      { id: '12', question: 'Ordena: [los, niños, en, parque, el, juegan]', type: 'order', correctAnswer: ['los', 'niños', 'juegan', 'en', 'el', 'parque'], points: 10 },
      { id: '13', question: 'Ordena: [tú, libros, interesantes, lees]', type: 'order', correctAnswer: ['tú', 'lees', 'libros', 'interesantes'], points: 10 },
      { id: '14', question: 'Ordena: [él, trabajo, al, en, autobús, viaja]', type: 'order', correctAnswer: ['él', 'viaja', 'al', 'trabajo', 'en', 'autobús'], points: 10 },
      { id: '15', question: 'Ordena: [ellos, mucho, corren]', type: 'order', correctAnswer: ['ellos', 'corren', 'mucho'], points: 10 },
      { id: '16', question: 'Ordena: [ella, escuela, una, en, trabaja]', type: 'order', correctAnswer: ['ella', 'trabaja', 'en', 'una', 'escuela'], points: 10 },
    ],
  },
  {
    id: 'word-race',
    name: 'Carrera de Palabras',
    description: 'Juego de velocidad con traducciones',
    icon: '⚡',
    image: '/assets/games/word-race.svg',
    questions: [],
  },
  {
    id: 'quick-quiz-verbos',
    name: 'Quick Quiz - Verbos',
    description: 'Practica verbos y gramática con frases de la vida diaria',
    icon: '⚡',
    image: '/assets/games/quick-quiz-verbos.svg',
    questions: [],
  },
];

export function getGameById(id: string): Game | undefined {
  return games.find(game => game.id === id);
}
