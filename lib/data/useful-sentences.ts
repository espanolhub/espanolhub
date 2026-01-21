/**
 * Useful Sentences and Verbs Data
 * Frases Útiles y Verbos por Contexto
 */

export type SentenceContext = 'travel' | 'home' | 'work' | 'social' | 'shopping' | 'food' | 'health';
export type VerbTense = 'presente' | 'pasado' | 'futuro' | 'imperativo';

export interface UsefulSentence {
  id: string;
  spanish: string;
  arabic: string;
  context: SentenceContext;
  level: 'beginner' | 'intermediate' | 'advanced';
  tense: VerbTense;
  verbs: string[]; // Main verbs used in the sentence
  category?: string; // Sub-category within context
}

export interface SentenceContextGroup {
  id: SentenceContext;
  title: string;
  titleAr: string;
  icon: string;
  sentences: UsefulSentence[];
}

export const usefulSentencesData: SentenceContextGroup[] = [
  {
    id: 'travel',
    title: 'Viajes',
    titleAr: 'السفر',
    icon: '✈️',
    sentences: [
      {
        id: 'travel-1',
        spanish: '¿Dónde está el aeropuerto?',
        arabic: 'أين المطار؟',
        context: 'travel',
        level: 'beginner',
        tense: 'presente',
        verbs: ['estar'],
        category: 'direcciones',
      },
      {
        id: 'travel-2',
        spanish: 'Necesito un boleto a Madrid',
        arabic: 'أحتاج تذكرة إلى مدريد',
        context: 'travel',
        level: 'beginner',
        tense: 'presente',
        verbs: ['necesitar'],
        category: 'compras',
      },
      {
        id: 'travel-3',
        spanish: '¿A qué hora sale el tren?',
        arabic: 'في أي ساعة يغادر القطار؟',
        context: 'travel',
        level: 'intermediate',
        tense: 'presente',
        verbs: ['salir'],
        category: 'horarios',
      },
      {
        id: 'travel-4',
        spanish: 'Reservé una habitación para dos personas',
        arabic: 'حجزت غرفة لشخصين',
        context: 'travel',
        level: 'intermediate',
        tense: 'pasado',
        verbs: ['reservar'],
        category: 'hotel',
      },
      {
        id: 'travel-5',
        spanish: 'Voy a visitar Barcelona el próximo mes',
        arabic: 'سأزور برشلونة الشهر القادم',
        context: 'travel',
        level: 'beginner',
        tense: 'futuro',
        verbs: ['visitar', 'ir'],
        category: 'planes',
      },
      {
        id: 'travel-6',
        spanish: 'Perdí mi pasaporte',
        arabic: 'فقدت جواز سفري',
        context: 'travel',
        level: 'intermediate',
        tense: 'pasado',
        verbs: ['perder'],
        category: 'problemas',
      },
      {
        id: 'travel-7',
        spanish: 'Muéstrame el mapa, por favor',
        arabic: 'أرني الخريطة من فضلك',
        context: 'travel',
        level: 'beginner',
        tense: 'imperativo',
        verbs: ['mostrar'],
        category: 'direcciones',
      },
      {
        id: 'travel-8',
        spanish: '¿Cuánto cuesta el viaje?',
        arabic: 'كم تكلفة الرحلة؟',
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
    titleAr: 'المنزل',
    icon: '🏠',
    sentences: [
      {
        id: 'home-1',
        spanish: 'Vivo en un apartamento pequeño',
        arabic: 'أعيش في شقة صغيرة',
        context: 'home',
        level: 'beginner',
        tense: 'presente',
        verbs: ['vivir'],
        category: 'vivienda',
      },
      {
        id: 'home-2',
        spanish: 'Necesito limpiar la cocina',
        arabic: 'أحتاج لتنظيف المطبخ',
        context: 'home',
        level: 'beginner',
        tense: 'presente',
        verbs: ['necesitar', 'limpiar'],
        category: 'tareas',
      },
      {
        id: 'home-3',
        spanish: 'Compré muebles nuevos ayer',
        arabic: 'اشتريت أثاث جديد أمس',
        context: 'home',
        level: 'intermediate',
        tense: 'pasado',
        verbs: ['comprar'],
        category: 'compras',
      },
      {
        id: 'home-4',
        spanish: 'Voy a pintar la sala este fin de semana',
        arabic: 'سأرسم غرفة المعيشة نهاية هذا الأسبوع',
        context: 'home',
        level: 'intermediate',
        tense: 'futuro',
        verbs: ['pintar', 'ir'],
        category: 'mejoras',
      },
      {
        id: 'home-5',
        spanish: 'Apaga las luces antes de salir',
        arabic: 'أطفئ الأنوار قبل الخروج',
        context: 'home',
        level: 'beginner',
        tense: 'imperativo',
        verbs: ['apagar', 'salir'],
        category: 'instrucciones',
      },
      {
        id: 'home-6',
        spanish: 'El jardín necesita agua',
        arabic: 'الحديقة تحتاج ماء',
        context: 'home',
        level: 'beginner',
        tense: 'presente',
        verbs: ['necesitar'],
        category: 'jardín',
      },
      {
        id: 'home-7',
        spanish: 'Organizamos una fiesta la semana pasada',
        arabic: 'نظمنا حفلة الأسبوع الماضي',
        context: 'home',
        level: 'intermediate',
        tense: 'pasado',
        verbs: ['organizar'],
        category: 'eventos',
      },
      {
        id: 'home-8',
        spanish: 'Voy a decorar mi habitación',
        arabic: 'سأزين غرفتي',
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
    titleAr: 'العمل',
    icon: '💼',
    sentences: [
      {
        id: 'work-1',
        spanish: 'Trabajo en una oficina',
        arabic: 'أعمل في مكتب',
        context: 'work',
        level: 'beginner',
        tense: 'presente',
        verbs: ['trabajar'],
        category: 'presentación',
      },
      {
        id: 'work-2',
        spanish: 'Tengo una reunión a las tres',
        arabic: 'لدي اجتماع الساعة الثالثة',
        context: 'work',
        level: 'beginner',
        tense: 'presente',
        verbs: ['tener'],
        category: 'horarios',
      },
      {
        id: 'work-3',
        spanish: 'Entregué el proyecto ayer',
        arabic: 'سلّمت المشروع أمس',
        context: 'work',
        level: 'intermediate',
        tense: 'pasado',
        verbs: ['entregar'],
        category: 'tareas',
      },
      {
        id: 'work-4',
        spanish: 'Voy a presentar mi informe mañana',
        arabic: 'سأقدم تقريري غداً',
        context: 'work',
        level: 'intermediate',
        tense: 'futuro',
        verbs: ['presentar', 'ir'],
        category: 'presentaciones',
      },
      {
        id: 'work-5',
        spanish: 'Envíame el archivo por correo',
        arabic: 'أرسل لي الملف بالبريد الإلكتروني',
        context: 'work',
        level: 'beginner',
        tense: 'imperativo',
        verbs: ['enviar'],
        category: 'comunicación',
      },
      {
        id: 'work-6',
        spanish: 'Necesito hablar con el jefe',
        arabic: 'أحتاج التحدث مع المدير',
        context: 'work',
        level: 'beginner',
        tense: 'presente',
        verbs: ['necesitar', 'hablar'],
        category: 'comunicación',
      },
      {
        id: 'work-7',
        spanish: 'Aprendí muchas cosas nuevas',
        arabic: 'تعلمت أشياء جديدة كثيرة',
        context: 'work',
        level: 'intermediate',
        tense: 'pasado',
        verbs: ['aprender'],
        category: 'desarrollo',
      },
      {
        id: 'work-8',
        spanish: 'Voy a solicitar un aumento',
        arabic: 'سأطلب زيادة راتبي',
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
    titleAr: 'الاجتماعي',
    icon: '👥',
    sentences: [
      {
        id: 'social-1',
        spanish: 'Mucho gusto en conocerte',
        arabic: 'سررت بمعرفتك',
        context: 'social',
        level: 'beginner',
        tense: 'presente',
        verbs: ['conocer'],
        category: 'presentación',
      },
      {
        id: 'social-2',
        spanish: '¿Cómo estás?',
        arabic: 'كيف حالك؟',
        context: 'social',
        level: 'beginner',
        tense: 'presente',
        verbs: ['estar'],
        category: 'saludos',
      },
      {
        id: 'social-3',
        spanish: 'Quedamos en encontrarnos el sábado',
        arabic: 'اتفقنا على الالتقاء يوم السبت',
        context: 'social',
        level: 'intermediate',
        tense: 'pasado',
        verbs: ['quedar', 'encontrar'],
        category: 'planes',
      },
      {
        id: 'social-4',
        spanish: 'Voy a celebrar mi cumpleaños',
        arabic: 'سأحتفل بعيد ميلادي',
        context: 'social',
        level: 'beginner',
        tense: 'futuro',
        verbs: ['celebrar', 'ir'],
        category: 'eventos',
      },
      {
        id: 'social-5',
        spanish: 'Llámame cuando llegues',
        arabic: 'اتصل بي عندما تصل',
        context: 'social',
        level: 'intermediate',
        tense: 'imperativo',
        verbs: ['llamar', 'llegar'],
        category: 'comunicación',
      },
      {
        id: 'social-6',
        spanish: 'Me encanta pasar tiempo contigo',
        arabic: 'أحب قضاء الوقت معك',
        context: 'social',
        level: 'intermediate',
        tense: 'presente',
        verbs: ['encantar', 'pasar'],
        category: 'sentimientos',
      },
      {
        id: 'social-7',
        spanish: 'Conocí a mi mejor amigo en la universidad',
        arabic: 'تعرفت على صديقي المفضل في الجامعة',
        context: 'social',
        level: 'intermediate',
        tense: 'pasado',
        verbs: ['conocer'],
        category: 'historias',
      },
      {
        id: 'social-8',
        spanish: 'Voy a invitar a todos mis amigos',
        arabic: 'سأدعو جميع أصدقائي',
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
    titleAr: 'التسوق',
    icon: '🛒',
    sentences: [
      {
        id: 'shopping-1',
        spanish: '¿Cuánto cuesta esta camisa?',
        arabic: 'كم ثمن هذه القميص؟',
        context: 'shopping',
        level: 'beginner',
        tense: 'presente',
        verbs: ['costar'],
        category: 'precios',
      },
      {
        id: 'shopping-2',
        spanish: 'Busco un regalo para mi hermana',
        arabic: 'أبحث عن هدية لأختي',
        context: 'shopping',
        level: 'beginner',
        tense: 'presente',
        verbs: ['buscar'],
        category: 'búsqueda',
      },
      {
        id: 'shopping-3',
        spanish: 'Compré estos zapatos la semana pasada',
        arabic: 'اشتريت هذه الأحذية الأسبوع الماضي',
        context: 'shopping',
        level: 'intermediate',
        tense: 'pasado',
        verbs: ['comprar'],
        category: 'compras',
      },
      {
        id: 'shopping-4',
        spanish: 'Voy a cambiar esta prenda',
        arabic: 'سأبدل هذه القطعة',
        context: 'shopping',
        level: 'beginner',
        tense: 'futuro',
        verbs: ['cambiar', 'ir'],
        category: 'devoluciones',
      },
      {
        id: 'shopping-5',
        spanish: 'Muéstrame otra talla',
        arabic: 'أرني مقاساً آخر',
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
    titleAr: 'الطعام',
    icon: '🍽️',
    sentences: [
      {
        id: 'food-1',
        spanish: 'Tengo hambre',
        arabic: 'أنا جائع',
        context: 'food',
        level: 'beginner',
        tense: 'presente',
        verbs: ['tener'],
        category: 'estados',
      },
      {
        id: 'food-2',
        spanish: 'Quiero pedir pizza',
        arabic: 'أريد طلب بيتزا',
        context: 'food',
        level: 'beginner',
        tense: 'presente',
        verbs: ['querer', 'pedir'],
        category: 'pedidos',
      },
      {
        id: 'food-3',
        spanish: 'Cocine una cena deliciosa ayer',
        arabic: 'طبخت عشاء لذيذ أمس',
        context: 'food',
        level: 'intermediate',
        tense: 'pasado',
        verbs: ['cocinar'],
        category: 'cocina',
      },
      {
        id: 'food-4',
        spanish: 'Voy a probar este plato',
        arabic: 'سأجرب هذا الطبق',
        context: 'food',
        level: 'beginner',
        tense: 'futuro',
        verbs: ['probar', 'ir'],
        category: 'experiencia',
      },
      {
        id: 'food-5',
        spanish: 'Sirve la comida, por favor',
        arabic: 'قدم الطعام من فضلك',
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
    titleAr: 'الصحة',
    icon: '🏥',
    sentences: [
      {
        id: 'health-1',
        spanish: 'Me duele la cabeza',
        arabic: 'رأسي يؤلمني',
        context: 'health',
        level: 'beginner',
        tense: 'presente',
        verbs: ['doler'],
        category: 'síntomas',
      },
      {
        id: 'health-2',
        spanish: 'Necesito una cita con el médico',
        arabic: 'أحتاج موعد مع الطبيب',
        context: 'health',
        level: 'intermediate',
        tense: 'presente',
        verbs: ['necesitar'],
        category: 'citas',
      },
      {
        id: 'health-3',
        spanish: 'Tomé la medicina esta mañana',
        arabic: 'تناولت الدواء هذا الصباح',
        context: 'health',
        level: 'intermediate',
        tense: 'pasado',
        verbs: ['tomar'],
        category: 'medicina',
      },
      {
        id: 'health-4',
        spanish: 'Voy a hacer ejercicio mañana',
        arabic: 'سأمارس الرياضة غداً',
        context: 'health',
        level: 'beginner',
        tense: 'futuro',
        verbs: ['hacer', 'ir'],
        category: 'ejercicio',
      },
      {
        id: 'health-5',
        spanish: 'Descansa bien esta noche',
        arabic: 'ارتح جيداً هذه الليلة',
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
export const tenseLabels: Record<VerbTense, { es: string; ar: string }> = {
  presente: { es: 'Presente', ar: 'المضارع' },
  pasado: { es: 'Pasado', ar: 'الماضي' },
  futuro: { es: 'Futuro', ar: 'المستقبل' },
  imperativo: { es: 'Imperativo', ar: 'الأمر' },
};

// Level labels
export const levelLabels: Record<UsefulSentence['level'], { es: string; ar: string }> = {
  beginner: { es: 'Principiante', ar: 'مبتدئ' },
  intermediate: { es: 'Intermedio', ar: 'متوسط' },
  advanced: { es: 'Avanzado', ar: 'متقدم' },
};
