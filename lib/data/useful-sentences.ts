/**
 * Useful Sentences and Verbs Data
 * Frases Útiles y Verbos por Contexto
 */

export type SentenceContext = 'travel' | 'home' | 'work' | 'social' | 'shopping' | 'food' | 'health';
export type VerbTense = 'presente' | 'pasado' | 'futuro' | 'imperativo';

export interface UsefulSentence {
  id: string;
  spanish: string;
  context: SentenceContext;
  level: 'beginner' | 'intermediate' | 'advanced';
  tense: VerbTense;
  verbs: string[]; // Main verbs used in the sentence
  category?: string; // Sub-category within context
}

export interface SentenceContextGroup {
  id: SentenceContext;
  title: string;
  icon: string;
  sentences: UsefulSentence[];
}

export const usefulSentencesData: SentenceContextGroup[] = [
  {
    id: 'travel',
    title: 'Viajes',
    icon: '✈️',
    sentences: [
      {
        id: 'travel-1',
        spanish: '¿Dónde está el aeropuerto?',
        context: 'travel',
        level: 'beginner',
        tense: 'presente',
        verbs: ['estar'],
        category: 'direcciones',
      },
      {
        id: 'travel-2',
        spanish: 'Necesito un boleto a Madrid',
        context: 'travel',
        level: 'beginner',
        tense: 'presente',
        verbs: ['necesitar'],
        category: 'compras',
      },
      {
        id: 'travel-3',
        spanish: '¿A qué hora sale el tren?',
        context: 'travel',
        level: 'intermediate',
        tense: 'presente',
        verbs: ['salir'],
        category: 'horarios',
      },
      {
        id: 'travel-4',
        spanish: 'Reservé una habitación para dos personas',
        context: 'travel',
        level: 'intermediate',
        tense: 'pasado',
        verbs: ['reservar'],
        category: 'hotel',
      },
      {
        id: 'travel-5',
        spanish: 'Voy a visitar Barcelona el próximo mes',
        context: 'travel',
        level: 'beginner',
        tense: 'futuro',
        verbs: ['visitar', 'ir'],
        category: 'planes',
      },
      {
        id: 'travel-6',
        spanish: 'Perdí mi pasaporte',
        context: 'travel',
        level: 'intermediate',
        tense: 'pasado',
        verbs: ['perder'],
        category: 'problemas',
      },
      {
        id: 'travel-7',
        spanish: 'Muéstrame el mapa, por favor',
        context: 'travel',
        level: 'beginner',
        tense: 'imperativo',
        verbs: ['mostrar'],
        category: 'direcciones',
      },
      {
        id: 'travel-8',
        spanish: '¿Cuánto cuesta el viaje?',
        context: 'travel',
        level: 'beginner',
        tense: 'presente',
        verbs: ['costar'],
        category: 'precios',
      },
    ],
  },
  {
    id: 'home',
    title: 'La Casa',
    icon: '🏠',
    sentences: [
      {
        id: 'home-1',
        spanish: 'Vivo en un apartamento pequeño',
        context: 'home',
        level: 'beginner',
        tense: 'presente',
        verbs: ['vivir'],
        category: 'vivienda',
      },
      {
        id: 'home-2',
        spanish: 'Necesito limpiar la cocina',
        context: 'home',
        level: 'beginner',
        tense: 'presente',
        verbs: ['necesitar', 'limpiar'],
        category: 'tareas',
      },
      {
        id: 'home-3',
        spanish: 'Compré muebles nuevos ayer',
        context: 'home',
        level: 'intermediate',
        tense: 'pasado',
        verbs: ['comprar'],
        category: 'compras',
      },
      {
        id: 'home-4',
        spanish: 'Voy a pintar la sala este fin de semana',
        context: 'home',
        level: 'intermediate',
        tense: 'futuro',
        verbs: ['pintar', 'ir'],
        category: 'mejoras',
      },
      {
        id: 'home-5',
        spanish: 'Apaga las luces antes de salir',
        context: 'home',
        level: 'beginner',
        tense: 'imperativo',
        verbs: ['apagar', 'salir'],
        category: 'instrucciones',
      },
      {
        id: 'home-6',
        spanish: 'El jardín necesita agua',
        context: 'home',
        level: 'beginner',
        tense: 'presente',
        verbs: ['necesitar'],
        category: 'jardín',
      },
      {
        id: 'home-7',
        spanish: 'Organizamos una fiesta la semana pasada',
        context: 'home',
        level: 'intermediate',
        tense: 'pasado',
        verbs: ['organizar'],
        category: 'eventos',
      },
      {
        id: 'home-8',
        spanish: 'Voy a decorar mi habitación',
        context: 'home',
        level: 'beginner',
        tense: 'futuro',
        verbs: ['decorar', 'ir'],
        category: 'decoración',
      },
    ],
  },
  {
    id: 'work',
    title: 'Trabajo',
    icon: '💼',
    sentences: [
      {
        id: 'work-1',
        spanish: 'Trabajo en una oficina',
        context: 'work',
        level: 'beginner',
        tense: 'presente',
        verbs: ['trabajar'],
        category: 'presentación',
      },
      {
        id: 'work-2',
        spanish: 'Tengo una reunión a las tres',
        context: 'work',
        level: 'beginner',
        tense: 'presente',
        verbs: ['tener'],
        category: 'horarios',
      },
      {
        id: 'work-3',
        spanish: 'Entregué el proyecto ayer',
        context: 'work',
        level: 'intermediate',
        tense: 'pasado',
        verbs: ['entregar'],
        category: 'tareas',
      },
      {
        id: 'work-4',
        spanish: 'Voy a presentar mi informe mañana',
        context: 'work',
        level: 'intermediate',
        tense: 'futuro',
        verbs: ['presentar', 'ir'],
        category: 'presentaciones',
      },
      {
        id: 'work-5',
        spanish: 'Envíame el archivo por correo',
        context: 'work',
        level: 'beginner',
        tense: 'imperativo',
        verbs: ['enviar'],
        category: 'comunicación',
      },
      {
        id: 'work-6',
        spanish: 'Necesito hablar con el jefe',
        context: 'work',
        level: 'beginner',
        tense: 'presente',
        verbs: ['necesitar', 'hablar'],
        category: 'comunicación',
      },
      {
        id: 'work-7',
        spanish: 'Aprendí muchas cosas nuevas',
        context: 'work',
        level: 'intermediate',
        tense: 'pasado',
        verbs: ['aprender'],
        category: 'desarrollo',
      },
      {
        id: 'work-8',
        spanish: 'Voy a solicitar un aumento',
        context: 'work',
        level: 'advanced',
        tense: 'futuro',
        verbs: ['solicitar', 'ir'],
        category: 'recursos humanos',
      },
    ],
  },
  {
    id: 'social',
    title: 'Social',
    icon: '👥',
    sentences: [
      {
        id: 'social-1',
        spanish: 'Mucho gusto en conocerte',
        context: 'social',
        level: 'beginner',
        tense: 'presente',
        verbs: ['conocer'],
        category: 'presentación',
      },
      {
        id: 'social-2',
        spanish: '¿Cómo estás?',
        context: 'social',
        level: 'beginner',
        tense: 'presente',
        verbs: ['estar'],
        category: 'saludos',
      },
      {
        id: 'social-3',
        spanish: 'Quedamos en encontrarnos el sábado',
        context: 'social',
        level: 'intermediate',
        tense: 'pasado',
        verbs: ['quedar', 'encontrar'],
        category: 'planes',
      },
      {
        id: 'social-4',
        spanish: 'Voy a celebrar mi cumpleaños',
        context: 'social',
        level: 'beginner',
        tense: 'futuro',
        verbs: ['celebrar', 'ir'],
        category: 'eventos',
      },
      {
        id: 'social-5',
        spanish: 'Llámame cuando llegues',
        context: 'social',
        level: 'intermediate',
        tense: 'imperativo',
        verbs: ['llamar', 'llegar'],
        category: 'comunicación',
      },
      {
        id: 'social-6',
        spanish: 'Me encanta pasar tiempo contigo',
        context: 'social',
        level: 'intermediate',
        tense: 'presente',
        verbs: ['encantar', 'pasar'],
        category: 'sentimientos',
      },
      {
        id: 'social-7',
        spanish: 'Conocí a mi mejor amigo en la universidad',
        context: 'social',
        level: 'intermediate',
        tense: 'pasado',
        verbs: ['conocer'],
        category: 'historias',
      },
      {
        id: 'social-8',
        spanish: 'Voy a invitar a todos mis amigos',
        context: 'social',
        level: 'beginner',
        tense: 'futuro',
        verbs: ['invitar', 'ir'],
        category: 'eventos',
      },
    ],
  },
  {
    id: 'shopping',
    title: 'Compras',
    icon: '🛒',
    sentences: [
      {
        id: 'shopping-1',
        spanish: '¿Cuánto cuesta esta camisa?',
        context: 'shopping',
        level: 'beginner',
        tense: 'presente',
        verbs: ['costar'],
        category: 'precios',
      },
      {
        id: 'shopping-2',
        spanish: 'Busco unos zapatos nuevos',
        context: 'shopping',
        level: 'beginner',
        tense: 'presente',
        verbs: ['buscar'],
        category: 'búsqueda',
      },
      {
        id: 'shopping-3',
        spanish: 'Compré muchos regalos ayer',
        context: 'shopping',
        level: 'intermediate',
        tense: 'pasado',
        verbs: ['comprar'],
        category: 'compras',
      },
      {
        id: 'shopping-4',
        spanish: 'Voy a ir de compras el fin de semana',
        context: 'shopping',
        level: 'beginner',
        tense: 'futuro',
        verbs: ['cambiar', 'ir'],
        category: 'devoluciones',
      },
      {
        id: 'shopping-5',
        spanish: 'Págeme con tarjeta',
        context: 'shopping',
        level: 'beginner',
        tense: 'imperativo',
        verbs: ['mostrar'],
        category: 'tallas',
      },
    ],
  },
  {
    id: 'food',
    title: 'Comida',
    icon: '🍽️',
    sentences: [
      {
        id: 'food-1',
        spanish: 'Me gusta la paella',
        context: 'food',
        level: 'beginner',
        tense: 'presente',
        verbs: ['tener'],
        category: 'estados',
      },
      {
        id: 'food-2',
        spanish: 'Quiero un café con leche',
        context: 'food',
        level: 'beginner',
        tense: 'presente',
        verbs: ['querer', 'pedir'],
        category: 'pedidos',
      },
      {
        id: 'food-3',
        spanish: 'Comí tapas deliciosas anoche',
        context: 'food',
        level: 'intermediate',
        tense: 'pasado',
        verbs: ['cocinar'],
        category: 'cocina',
      },
      {
        id: 'food-4',
        spanish: 'Voy a cocinar paella el domingo',
        context: 'food',
        level: 'intermediate',
        tense: 'futuro',
        verbs: ['probar', 'ir'],
        category: 'experiencia',
      },
      {
        id: 'food-5',
        spanish: 'Tráeme el menú, por favor',
        context: 'food',
        level: 'beginner',
        tense: 'imperativo',
        verbs: ['servir'],
        category: 'servicio',
      },
    ],
  },
  {
    id: 'health',
    title: 'Salud',
    icon: '🏥',
    sentences: [
      {
        id: 'health-1',
        spanish: 'No me siento bien',
        context: 'health',
        level: 'beginner',
        tense: 'presente',
        verbs: ['doler'],
        category: 'síntomas',
      },
      {
        id: 'health-2',
        spanish: 'Necesito ver a un médico',
        context: 'health',
        level: 'beginner',
        tense: 'presente',
        verbs: ['necesitar'],
        category: 'citas',
      },
      {
        id: 'health-3',
        spanish: 'Tuve fiebre ayer',
        context: 'health',
        level: 'intermediate',
        tense: 'pasado',
        verbs: ['tomar'],
        category: 'medicina',
      },
      {
        id: 'health-4',
        spanish: 'Voy a hacer ejercicio mañana',
        context: 'health',
        level: 'beginner',
        tense: 'futuro',
        verbs: ['hacer', 'ir'],
        category: 'ejercicio',
      },
      {
        id: 'health-5',
        spanish: 'Toma estas pastillas',
        context: 'health',
        level: 'beginner',
        tense: 'imperativo',
        verbs: ['descansar'],
        category: 'consejos',
      },
    ],
  },
];

// Helper functions
export function getSentencesByContext(context: SentenceContext): UsefulSentence[] {
  const group = usefulSentencesData.find(g => g.id === context);
  return group ? group.sentences : [];
}

export function getSentencesByLevel(level: UsefulSentence['level']): UsefulSentence[] {
  return usefulSentencesData.flatMap(group => 
    group.sentences.filter(s => s.level === level)
  );
}

export function getSentencesByTense(tense: VerbTense): UsefulSentence[] {
  return usefulSentencesData.flatMap(group => 
    group.sentences.filter(s => s.tense === tense)
  );
}

export function getContextById(contextId: SentenceContext): SentenceContextGroup | undefined {
  return usefulSentencesData.find(g => g.id === contextId);
}

export function getAllSentences(): UsefulSentence[] {
  return usefulSentencesData.flatMap(group => group.sentences);
}

// Tense labels
export const tenseLabels: Record<VerbTense, { es: string }> = {
  presente: { es: 'Presente' },
  pasado: { es: 'Pasado' },
  futuro: { es: 'Futuro' },
  imperativo: { es: 'Imperativo' },
};

// Level labels
export const levelLabels: Record<UsefulSentence['level'], { es: string }> = {
  beginner: { es: 'Principiante' },
  intermediate: { es: 'Intermedio' },
  advanced: { es: 'Avanzado' },
};
