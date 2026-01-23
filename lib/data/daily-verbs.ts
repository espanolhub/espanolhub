/**
 * قائمة الأفعال المستخدمة في الحياة اليومية
 * Daily Verbs - Verbos de Uso Diario
 */

export interface DailyVerb {
  infinitive: string;
  translation: string;
  category: 'regular-ar' | 'regular-er' | 'regular-ir' | 'irregular';
  level: 'beginner' | 'intermediate' | 'advanced';
  examples: {
    sentence: string;
    context: string; // في المطعم، في العمل، في المنزل، etc.
  }[];
  conjugations: {
    presente: { yo: string; tu: string; el: string; nosotros: string; ellos: string };
    preterito: { yo: string; tu: string; el: string; nosotros: string; ellos: string };
    futuro: { yo: string; tu: string; el: string; nosotros: string; ellos: string };
  };
}

export const dailyVerbs: DailyVerb[] = [
  // Beginner Level - Regular -AR Verbs
  {
    infinitive: 'hablar',
    translation: 'يتحدث',
    category: 'regular-ar',
    level: 'beginner',
    examples: [
      { sentence: 'Yo hablo español todos los días', context: 'en la escuela' },
      { sentence: 'Ella habla por teléfono con su madre', context: 'en casa' },
      { sentence: 'Nosotros hablamos con el profesor', context: 'en la universidad' },
    ],
    conjugations: {
      presente: { yo: 'hablo', tu: 'hablas', el: 'habla', nosotros: 'hablamos', ellos: 'hablan' },
      preterito: { yo: 'hablé', tu: 'hablaste', el: 'habló', nosotros: 'hablamos', ellos: 'hablaron' },
      futuro: { yo: 'hablaré', tu: 'hablarás', el: 'hablará', nosotros: 'hablaremos', ellos: 'hablarán' },
    },
  },
  {
    infinitive: 'trabajar',
    translation: 'يعمل',
    category: 'regular-ar',
    level: 'beginner',
    examples: [
      { sentence: 'Yo trabajo en una oficina', context: 'en el trabajo' },
      { sentence: 'Mi padre trabaja en un hospital', context: 'en el trabajo' },
      { sentence: 'Ellos trabajan los fines de semana', context: 'en el trabajo' },
    ],
    conjugations: {
      presente: { yo: 'trabajo', tu: 'trabajas', el: 'trabaja', nosotros: 'trabajamos', ellos: 'trabajan' },
      preterito: { yo: 'trabajé', tu: 'trabajaste', el: 'trabajó', nosotros: 'trabajamos', ellos: 'trabajaron' },
      futuro: { yo: 'trabajaré', tu: 'trabajarás', el: 'trabajará', nosotros: 'trabajaremos', ellos: 'trabajarán' },
    },
  },
  {
    infinitive: 'estudiar',
    translation: 'يدرس',
    category: 'regular-ar',
    level: 'beginner',
    examples: [
      { sentence: 'Yo estudio español cada día', context: 'en casa' },
      { sentence: 'Mi hermano estudia medicina', context: 'en la universidad' },
      { sentence: 'Nosotros estudiamos juntos en la biblioteca', context: 'en la biblioteca' },
    ],
    conjugations: {
      presente: { yo: 'estudio', tu: 'estudias', el: 'estudia', nosotros: 'estudiamos', ellos: 'estudian' },
      preterito: { yo: 'estudié', tu: 'estudiaste', el: 'estudió', nosotros: 'estudiamos', ellos: 'estudiaron' },
      futuro: { yo: 'estudiaré', tu: 'estudiarás', el: 'estudiará', nosotros: 'estudiaremos', ellos: 'estudiarán' },
    },
  },
  {
    infinitive: 'comprar',
    translation: 'يشتري',
    category: 'regular-ar',
    level: 'beginner',
    examples: [
      { sentence: 'Yo compro pan en la panadería', context: 'en el supermercado' },
      { sentence: 'Mi madre compra frutas frescas', context: 'en el mercado' },
      { sentence: 'Ellos compran ropa nueva', context: 'en la tienda' },
    ],
    conjugations: {
      presente: { yo: 'compro', tu: 'compras', el: 'compra', nosotros: 'compramos', ellos: 'compran' },
      preterito: { yo: 'compré', tu: 'compraste', el: 'compró', nosotros: 'compramos', ellos: 'compraron' },
      futuro: { yo: 'compraré', tu: 'comprarás', el: 'comprará', nosotros: 'compraremos', ellos: 'comprarán' },
    },
  },
  {
    infinitive: 'cocinar',
    translation: 'يطبخ',
    category: 'regular-ar',
    level: 'beginner',
    examples: [
      { sentence: 'Mi madre cocina paella los domingos', context: 'en casa' },
      { sentence: 'Yo cocino pasta para cenar', context: 'en la cocina' },
      { sentence: 'El chef cocina platos deliciosos', context: 'en el restaurante' },
    ],
    conjugations: {
      presente: { yo: 'cocino', tu: 'cocinas', el: 'cocina', nosotros: 'cocinamos', ellos: 'cocinan' },
      preterito: { yo: 'cociné', tu: 'cocinaste', el: 'cocinó', nosotros: 'cocinamos', ellos: 'cocinaron' },
      futuro: { yo: 'cocinaré', tu: 'cocinarás', el: 'cocinará', nosotros: 'cocinaremos', ellos: 'cocinarán' },
    },
  },
  {
    infinitive: 'caminar',
    translation: 'يمشي',
    category: 'regular-ar',
    level: 'beginner',
    examples: [
      { sentence: 'Yo camino al trabajo todos los días', context: 'en la calle' },
      { sentence: 'Mi perro camina en el parque', context: 'en el parque' },
      { sentence: 'Nosotros caminamos por la playa', context: 'en la playa' },
    ],
    conjugations: {
      presente: { yo: 'camino', tu: 'caminas', el: 'camina', nosotros: 'caminamos', ellos: 'caminan' },
      preterito: { yo: 'caminé', tu: 'caminaste', el: 'caminó', nosotros: 'caminamos', ellos: 'caminaron' },
      futuro: { yo: 'caminaré', tu: 'caminarás', el: 'caminará', nosotros: 'caminaremos', ellos: 'caminarán' },
    },
  },
  {
    infinitive: 'llamar',
    translation: 'يتصل / ينادي',
    category: 'regular-ar',
    level: 'beginner',
    examples: [
      { sentence: 'Yo llamo a mi familia por teléfono', context: 'en casa' },
      { sentence: 'El jefe llama a los empleados', context: 'en el trabajo' },
      { sentence: 'Mi amigo me llama todos los días', context: 'en el teléfono' },
    ],
    conjugations: {
      presente: { yo: 'llamo', tu: 'llamas', el: 'llama', nosotros: 'llamamos', ellos: 'llaman' },
      preterito: { yo: 'llamé', tu: 'llamaste', el: 'llamó', nosotros: 'llamamos', ellos: 'llamaron' },
      futuro: { yo: 'llamaré', tu: 'llamarás', el: 'llamará', nosotros: 'llamaremos', ellos: 'llamarán' },
    },
  },
  {
    infinitive: 'esperar',
    translation: 'ينتظر',
    category: 'regular-ar',
    level: 'beginner',
    examples: [
      { sentence: 'Yo espero el autobús en la parada', context: 'en la calle' },
      { sentence: 'Nosotros esperamos al doctor', context: 'en el hospital' },
      { sentence: 'Ellos esperan su turno', context: 'en la oficina' },
    ],
    conjugations: {
      presente: { yo: 'espero', tu: 'esperas', el: 'espera', nosotros: 'esperamos', ellos: 'esperan' },
      preterito: { yo: 'esperé', tu: 'esperaste', el: 'esperó', nosotros: 'esperamos', ellos: 'esperaron' },
      futuro: { yo: 'esperaré', tu: 'esperarás', el: 'esperará', nosotros: 'esperaremos', ellos: 'esperarán' },
    },
  },

  // Beginner Level - Regular -ER Verbs
  {
    infinitive: 'comer',
    translation: 'يأكل',
    category: 'regular-er',
    level: 'beginner',
    examples: [
      { sentence: 'Yo como en un restaurante', context: 'en el restaurante' },
      { sentence: 'Mi familia come junta los domingos', context: 'en casa' },
      { sentence: 'Los niños comen frutas en el colegio', context: 'en la escuela' },
    ],
    conjugations: {
      presente: { yo: 'como', tu: 'comes', el: 'come', nosotros: 'comemos', ellos: 'comen' },
      preterito: { yo: 'comí', tu: 'comiste', el: 'comió', nosotros: 'comimos', ellos: 'comieron' },
      futuro: { yo: 'comeré', tu: 'comerás', el: 'comerá', nosotros: 'comeremos', ellos: 'comerán' },
    },
  },
  {
    infinitive: 'beber',
    translation: 'يشرب',
    category: 'regular-er',
    level: 'beginner',
    examples: [
      { sentence: 'Yo bebo agua todos los días', context: 'en casa' },
      { sentence: 'Ellos beben café por la mañana', context: 'en el café' },
      { sentence: 'Mi hermana bebe zumo de naranja', context: 'en el desayuno' },
    ],
    conjugations: {
      presente: { yo: 'bebo', tu: 'bebes', el: 'bebe', nosotros: 'bebemos', ellos: 'beben' },
      preterito: { yo: 'bebí', tu: 'bebiste', el: 'bebió', nosotros: 'bebimos', ellos: 'bebieron' },
      futuro: { yo: 'beberé', tu: 'beberás', el: 'beberá', nosotros: 'beberemos', ellos: 'beberán' },
    },
  },
  {
    infinitive: 'leer',
    translation: 'يقرأ',
    category: 'regular-er',
    level: 'beginner',
    examples: [
      { sentence: 'Yo leo el periódico cada mañana', context: 'en casa' },
      { sentence: 'Mi hijo lee cuentos antes de dormir', context: 'en la habitación' },
      { sentence: 'Nosotros leemos libros en la biblioteca', context: 'en la biblioteca' },
    ],
    conjugations: {
      presente: { yo: 'leo', tu: 'lees', el: 'lee', nosotros: 'leemos', ellos: 'leen' },
      preterito: { yo: 'leí', tu: 'leíste', el: 'leyó', nosotros: 'leímos', ellos: 'leyeron' },
      futuro: { yo: 'leeré', tu: 'leerás', el: 'leerá', nosotros: 'leeremos', ellos: 'leerán' },
    },
  },
  {
    infinitive: 'aprender',
    translation: 'يتعلم',
    category: 'regular-er',
    level: 'beginner',
    examples: [
      { sentence: 'Yo aprendo español en la escuela', context: 'en la escuela' },
      { sentence: 'Mi hija aprende a tocar el piano', context: 'en casa' },
      { sentence: 'Nosotros aprendemos mucho en clase', context: 'en clase' },
    ],
    conjugations: {
      presente: { yo: 'aprendo', tu: 'aprendes', el: 'aprende', nosotros: 'aprendemos', ellos: 'aprenden' },
      preterito: { yo: 'aprendí', tu: 'aprendiste', el: 'aprendió', nosotros: 'aprendimos', ellos: 'aprendieron' },
      futuro: { yo: 'aprenderé', tu: 'aprenderás', el: 'aprenderá', nosotros: 'aprenderemos', ellos: 'aprenderán' },
    },
  },
  {
    infinitive: 'vender',
    translation: 'يبيع',
    category: 'regular-er',
    level: 'beginner',
    examples: [
      { sentence: 'Mi vecino vende frutas en el mercado', context: 'en el mercado' },
      { sentence: 'La tienda vende ropa barata', context: 'en la tienda' },
      { sentence: 'Ellos venden su coche viejo', context: 'en casa' },
    ],
    conjugations: {
      presente: { yo: 'vendo', tu: 'vendes', el: 'vende', nosotros: 'vendemos', ellos: 'venden' },
      preterito: { yo: 'vendí', tu: 'vendiste', el: 'vendió', nosotros: 'vendimos', ellos: 'vendieron' },
      futuro: { yo: 'venderé', tu: 'venderás', el: 'venderá', nosotros: 'venderemos', ellos: 'venderán' },
    },
  },

  // Beginner Level - Regular -IR Verbs
  {
    infinitive: 'vivir',
    translation: 'يعيش',
    category: 'regular-ir',
    level: 'beginner',
    examples: [
      { sentence: 'Yo vivo en Madrid', context: 'en la ciudad' },
      { sentence: 'Mi familia vive en un apartamento', context: 'en casa' },
      { sentence: 'Ellos viven cerca del parque', context: 'en el barrio' },
    ],
    conjugations: {
      presente: { yo: 'vivo', tu: 'vives', el: 'vive', nosotros: 'vivimos', ellos: 'viven' },
      preterito: { yo: 'viví', tu: 'viviste', el: 'vivió', nosotros: 'vivimos', ellos: 'vivieron' },
      futuro: { yo: 'viviré', tu: 'vivirás', el: 'vivirá', nosotros: 'viviremos', ellos: 'vivirán' },
    },
  },
  {
    infinitive: 'escribir',
    translation: 'يكتب',
    category: 'regular-ir',
    level: 'beginner',
    examples: [
      { sentence: 'Yo escribo correos electrónicos', context: 'en el trabajo' },
      { sentence: 'El estudiante escribe en su cuaderno', context: 'en clase' },
      { sentence: 'Nosotros escribimos mensajes a nuestros amigos', context: 'en casa' },
    ],
    conjugations: {
      presente: { yo: 'escribo', tu: 'escribes', el: 'escribe', nosotros: 'escribimos', ellos: 'escriben' },
      preterito: { yo: 'escribí', tu: 'escribiste', el: 'escribió', nosotros: 'escribimos', ellos: 'escribieron' },
      futuro: { yo: 'escribiré', tu: 'escribirás', el: 'escribirá', nosotros: 'escribiremos', ellos: 'escribirán' },
    },
  },
  {
    infinitive: 'abrir',
    translation: 'يفتح',
    category: 'regular-ir',
    level: 'beginner',
    examples: [
      { sentence: 'Yo abro la ventana por la mañana', context: 'en casa' },
      { sentence: 'La tienda abre a las nueve', context: 'en la tienda' },
      { sentence: 'Nosotros abrimos las puertas', context: 'en el edificio' },
    ],
    conjugations: {
      presente: { yo: 'abro', tu: 'abres', el: 'abre', nosotros: 'abrimos', ellos: 'abren' },
      preterito: { yo: 'abrí', tu: 'abriste', el: 'abrió', nosotros: 'abrimos', ellos: 'abrieron' },
      futuro: { yo: 'abriré', tu: 'abrirás', el: 'abrirá', nosotros: 'abriremos', ellos: 'abrirán' },
    },
  },

  // Intermediate Level - Irregular Verbs (Common)
  {
    infinitive: 'ser',
    translation: 'يكون (دائم)',
    category: 'irregular',
    level: 'intermediate',
    examples: [
      { sentence: 'Yo soy profesor de español', context: 'en el trabajo' },
      { sentence: 'Mi hermana es médica', context: 'en el hospital' },
      { sentence: 'Nosotros somos estudiantes', context: 'en la universidad' },
    ],
    conjugations: {
      presente: { yo: 'soy', tu: 'eres', el: 'es', nosotros: 'somos', ellos: 'son' },
      preterito: { yo: 'fui', tu: 'fuiste', el: 'fue', nosotros: 'fuimos', ellos: 'fueron' },
      futuro: { yo: 'seré', tu: 'serás', el: 'será', nosotros: 'seremos', ellos: 'serán' },
    },
  },
  {
    infinitive: 'estar',
    translation: 'يكون (مؤقت)',
    category: 'irregular',
    level: 'intermediate',
    examples: [
      { sentence: 'Yo estoy en casa ahora', context: 'en casa' },
      { sentence: 'Mi madre está en el supermercado', context: 'en el supermercado' },
      { sentence: 'Nosotros estamos cansados', context: 'en casa' },
    ],
    conjugations: {
      presente: { yo: 'estoy', tu: 'estás', el: 'está', nosotros: 'estamos', ellos: 'están' },
      preterito: { yo: 'estuve', tu: 'estuviste', el: 'estuvo', nosotros: 'estuvimos', ellos: 'estuvieron' },
      futuro: { yo: 'estaré', tu: 'estarás', el: 'estará', nosotros: 'estaremos', ellos: 'estarán' },
    },
  },
  {
    infinitive: 'tener',
    translation: 'يملك',
    category: 'irregular',
    level: 'intermediate',
    examples: [
      { sentence: 'Yo tengo un coche nuevo', context: 'en casa' },
      { sentence: 'Mi amigo tiene dos hijos', context: 'en casa' },
      { sentence: 'Nosotros tenemos una reunión', context: 'en el trabajo' },
    ],
    conjugations: {
      presente: { yo: 'tengo', tu: 'tienes', el: 'tiene', nosotros: 'tenemos', ellos: 'tienen' },
      preterito: { yo: 'tuve', tu: 'tuviste', el: 'tuvo', nosotros: 'tuvimos', ellos: 'tuvieron' },
      futuro: { yo: 'tendré', tu: 'tendrás', el: 'tendrá', nosotros: 'tendremos', ellos: 'tendrán' },
    },
  },
  {
    infinitive: 'hacer',
    translation: 'يفعل / يصنع',
    category: 'irregular',
    level: 'intermediate',
    examples: [
      { sentence: 'Yo hago ejercicio por la mañana', context: 'en el gimnasio' },
      { sentence: 'Mi madre hace la comida', context: 'en la cocina' },
      { sentence: 'Nosotros hacemos la tarea', context: 'en casa' },
    ],
    conjugations: {
      presente: { yo: 'hago', tu: 'haces', el: 'hace', nosotros: 'hacemos', ellos: 'hacen' },
      preterito: { yo: 'hice', tu: 'hiciste', el: 'hizo', nosotros: 'hicimos', ellos: 'hicieron' },
      futuro: { yo: 'haré', tu: 'harás', el: 'hará', nosotros: 'haremos', ellos: 'harán' },
    },
  },
  {
    infinitive: 'ir',
    translation: 'يذهب',
    category: 'irregular',
    level: 'intermediate',
    examples: [
      { sentence: 'Yo voy al trabajo en metro', context: 'en transporte' },
      { sentence: 'Mi hermano va al gimnasio', context: 'en el gimnasio' },
      { sentence: 'Nosotros vamos de vacaciones', context: 'de viaje' },
    ],
    conjugations: {
      presente: { yo: 'voy', tu: 'vas', el: 'va', nosotros: 'vamos', ellos: 'van' },
      preterito: { yo: 'fui', tu: 'fuiste', el: 'fue', nosotros: 'fuimos', ellos: 'fueron' },
      futuro: { yo: 'iré', tu: 'irás', el: 'irá', nosotros: 'iremos', ellos: 'irán' },
    },
  },
  {
    infinitive: 'venir',
    translation: 'يأتي',
    category: 'irregular',
    level: 'intermediate',
    examples: [
      { sentence: 'Yo vengo de mi casa', context: 'en la calle' },
      { sentence: 'Mis amigos vienen a la fiesta', context: 'en la fiesta' },
      { sentence: 'El cartero viene por la mañana', context: 'en casa' },
    ],
    conjugations: {
      presente: { yo: 'vengo', tu: 'vienes', el: 'viene', nosotros: 'venimos', ellos: 'vienen' },
      preterito: { yo: 'vine', tu: 'viniste', el: 'vino', nosotros: 'vinimos', ellos: 'vinieron' },
      futuro: { yo: 'vendré', tu: 'vendrás', el: 'vendrá', nosotros: 'vendremos', ellos: 'vendrán' },
    },
  },
  {
    infinitive: 'decir',
    translation: 'يقول',
    category: 'irregular',
    level: 'intermediate',
    examples: [
      { sentence: 'Yo digo la verdad siempre', context: 'en general' },
      { sentence: 'Mi profesor dice que estudio bien', context: 'en la escuela' },
      { sentence: 'Ellos dicen que vendrán mañana', context: 'en el teléfono' },
    ],
    conjugations: {
      presente: { yo: 'digo', tu: 'dices', el: 'dice', nosotros: 'decimos', ellos: 'dicen' },
      preterito: { yo: 'dije', tu: 'dijiste', el: 'dijo', nosotros: 'dijimos', ellos: 'dijeron' },
      futuro: { yo: 'diré', tu: 'dirás', el: 'dirá', nosotros: 'diremos', ellos: 'dirán' },
    },
  },
  {
    infinitive: 'poder',
    translation: 'يستطيع',
    category: 'irregular',
    level: 'intermediate',
    examples: [
      { sentence: 'Yo puedo ayudarte con la tarea', context: 'en casa' },
      { sentence: '¿Puedes venir a mi casa?', context: 'en el teléfono' },
      { sentence: 'Ellos pueden hablar tres idiomas', context: 'en general' },
    ],
    conjugations: {
      presente: { yo: 'puedo', tu: 'puedes', el: 'puede', nosotros: 'podemos', ellos: 'pueden' },
      preterito: { yo: 'pude', tu: 'pudiste', el: 'pudo', nosotros: 'pudimos', ellos: 'pudieron' },
      futuro: { yo: 'podré', tu: 'podrás', el: 'podrá', nosotros: 'podremos', ellos: 'podrán' },
    },
  },
  {
    infinitive: 'poner',
    translation: 'يضع',
    category: 'irregular',
    level: 'intermediate',
    examples: [
      { sentence: 'Yo pongo la mesa para cenar', context: 'en casa' },
      { sentence: 'Mi madre pone las llaves en el cajón', context: 'en casa' },
      { sentence: 'Nosotros ponemos la música', context: 'en la fiesta' },
    ],
    conjugations: {
      presente: { yo: 'pongo', tu: 'pones', el: 'pone', nosotros: 'ponemos', ellos: 'ponen' },
      preterito: { yo: 'puse', tu: 'pusiste', el: 'puso', nosotros: 'pusimos', ellos: 'pusieron' },
      futuro: { yo: 'pondré', tu: 'pondrás', el: 'pondrá', nosotros: 'pondremos', ellos: 'pondrán' },
    },
  },
  {
    infinitive: 'saber',
    translation: 'يعرف',
    category: 'irregular',
    level: 'intermediate',
    examples: [
      { sentence: 'Yo sé hablar español', context: 'en general' },
      { sentence: '¿Sabes dónde está el banco?', context: 'en la calle' },
      { sentence: 'Ellos saben cocinar muy bien', context: 'en casa' },
    ],
    conjugations: {
      presente: { yo: 'sé', tu: 'sabes', el: 'sabe', nosotros: 'sabemos', ellos: 'saben' },
      preterito: { yo: 'supe', tu: 'supiste', el: 'supo', nosotros: 'supimos', ellos: 'supieron' },
      futuro: { yo: 'sabré', tu: 'sabrás', el: 'sabrá', nosotros: 'sabremos', ellos: 'sabrán' },
    },
  },
  {
    infinitive: 'querer',
    translation: 'يريد',
    category: 'irregular',
    level: 'intermediate',
    examples: [
      { sentence: 'Yo quiero un café, por favor', context: 'en el café' },
      { sentence: 'Mi hijo quiere ir al parque', context: 'en casa' },
      { sentence: 'Nosotros queremos aprender español', context: 'en la escuela' },
    ],
    conjugations: {
      presente: { yo: 'quiero', tu: 'quieres', el: 'quiere', nosotros: 'queremos', ellos: 'quieren' },
      preterito: { yo: 'quise', tu: 'quisiste', el: 'quiso', nosotros: 'quisimos', ellos: 'quisieron' },
      futuro: { yo: 'querré', tu: 'querrás', el: 'querrá', nosotros: 'querremos', ellos: 'querrán' },
    },
  },

  // Intermediate - More Regular Verbs
  {
    infinitive: 'buscar',
    translation: 'يبحث',
    category: 'regular-ar',
    level: 'intermediate',
    examples: [
      { sentence: 'Yo busco trabajo en internet', context: 'en casa' },
      { sentence: 'Mi hermana busca sus llaves', context: 'en casa' },
      { sentence: 'Ellos buscan un restaurante', context: 'en la calle' },
    ],
    conjugations: {
      presente: { yo: 'busco', tu: 'buscas', el: 'busca', nosotros: 'buscamos', ellos: 'buscan' },
      preterito: { yo: 'busqué', tu: 'buscaste', el: 'buscó', nosotros: 'buscamos', ellos: 'buscaron' },
      futuro: { yo: 'buscaré', tu: 'buscarás', el: 'buscará', nosotros: 'buscaremos', ellos: 'buscarán' },
    },
  },
  {
    infinitive: 'viajar',
    translation: 'يسافر',
    category: 'regular-ar',
    level: 'intermediate',
    examples: [
      { sentence: 'Yo viajo a Barcelona en tren', context: 'en la estación' },
      { sentence: 'Mi familia viaja cada verano', context: 'de vacaciones' },
      { sentence: 'Ellos viajan por todo el mundo', context: 'de viaje' },
    ],
    conjugations: {
      presente: { yo: 'viajo', tu: 'viajas', el: 'viaja', nosotros: 'viajamos', ellos: 'viajan' },
      preterito: { yo: 'viajé', tu: 'viajaste', el: 'viajó', nosotros: 'viajamos', ellos: 'viajaron' },
      futuro: { yo: 'viajaré', tu: 'viajarás', el: 'viajará', nosotros: 'viajaremos', ellos: 'viajarán' },
    },
  },
  {
    infinitive: 'llegar',
    translation: 'يصل',
    category: 'regular-ar',
    level: 'intermediate',
    examples: [
      { sentence: 'Yo llego a la oficina a las ocho', context: 'en el trabajo' },
      { sentence: 'El tren llega a tiempo', context: 'en la estación' },
      { sentence: 'Nosotros llegamos tarde', context: 'en general' },
    ],
    conjugations: {
      presente: { yo: 'llego', tu: 'llegas', el: 'llega', nosotros: 'llegamos', ellos: 'llegan' },
      preterito: { yo: 'llegué', tu: 'llegaste', el: 'llegó', nosotros: 'llegamos', ellos: 'llegaron' },
      futuro: { yo: 'llegaré', tu: 'llegarás', el: 'llegará', nosotros: 'llegaremos', ellos: 'llegarán' },
    },
  },
  {
    infinitive: 'pagar',
    translation: 'يدفع',
    category: 'regular-ar',
    level: 'intermediate',
    examples: [
      { sentence: 'Yo pago con tarjeta de crédito', context: 'en la tienda' },
      { sentence: 'Mi padre paga las facturas', context: 'en casa' },
      { sentence: 'Ellos pagan el alquiler', context: 'en casa' },
    ],
    conjugations: {
      presente: { yo: 'pago', tu: 'pagas', el: 'paga', nosotros: 'pagamos', ellos: 'pagan' },
      preterito: { yo: 'pagué', tu: 'pagaste', el: 'pagó', nosotros: 'pagamos', ellos: 'pagaron' },
      futuro: { yo: 'pagaré', tu: 'pagarás', el: 'pagará', nosotros: 'pagaremos', ellos: 'pagarán' },
    },
  },
  {
    infinitive: 'salir',
    translation: 'يخرج',
    category: 'irregular',
    level: 'intermediate',
    examples: [
      { sentence: 'Yo salgo de casa a las siete', context: 'en casa' },
      { sentence: 'Mi hermana sale con sus amigos', context: 'en la noche' },
      { sentence: 'Nosotros salimos los fines de semana', context: 'de paseo' },
    ],
    conjugations: {
      presente: { yo: 'salgo', tu: 'sales', el: 'sale', nosotros: 'salimos', ellos: 'salen' },
      preterito: { yo: 'salí', tu: 'saliste', el: 'salió', nosotros: 'salimos', ellos: 'salieron' },
      futuro: { yo: 'saldré', tu: 'saldrás', el: 'saldrá', nosotros: 'saldremos', ellos: 'saldrán' },
    },
  },
  {
    infinitive: 'dar',
    translation: 'يعطي',
    category: 'irregular',
    level: 'intermediate',
    examples: [
      { sentence: 'Yo doy clases de español', context: 'en la escuela' },
      { sentence: 'El profesor da los exámenes', context: 'en clase' },
      { sentence: 'Nosotros damos regalos en Navidad', context: 'en casa' },
    ],
    conjugations: {
      presente: { yo: 'doy', tu: 'das', el: 'da', nosotros: 'damos', ellos: 'dan' },
      preterito: { yo: 'di', tu: 'diste', el: 'dio', nosotros: 'dimos', ellos: 'dieron' },
      futuro: { yo: 'daré', tu: 'darás', el: 'dará', nosotros: 'daremos', ellos: 'darán' },
    },
  },
  {
    infinitive: 'ver',
    translation: 'يرى',
    category: 'irregular',
    level: 'intermediate',
    examples: [
      { sentence: 'Yo veo la televisión por la noche', context: 'en casa' },
      { sentence: 'Mi abuela ve mal sin gafas', context: 'en general' },
      { sentence: 'Nosotros vemos películas los domingos', context: 'en el cine' },
    ],
    conjugations: {
      presente: { yo: 'veo', tu: 'ves', el: 've', nosotros: 'vemos', ellos: 'ven' },
      preterito: { yo: 'vi', tu: 'viste', el: 'vio', nosotros: 'vimos', ellos: 'vieron' },
      futuro: { yo: 'veré', tu: 'verás', el: 'verá', nosotros: 'veremos', ellos: 'verán' },
    },
  },

  // Advanced Level
  {
    infinitive: 'conducir',
    translation: 'يقود',
    category: 'irregular',
    level: 'advanced',
    examples: [
      { sentence: 'Yo conduzco al trabajo todos los días', context: 'en el coche' },
      { sentence: 'Mi padre conduce con cuidado', context: 'en la carretera' },
      { sentence: 'Nosotros conducimos por la autopista', context: 'en el coche' },
    ],
    conjugations: {
      presente: { yo: 'conduzco', tu: 'conduces', el: 'conduce', nosotros: 'conducimos', ellos: 'conducen' },
      preterito: { yo: 'conduje', tu: 'condujiste', el: 'condujo', nosotros: 'condujimos', ellos: 'condujeron' },
      futuro: { yo: 'conduciré', tu: 'conducirás', el: 'conducirá', nosotros: 'conduciremos', ellos: 'conducirán' },
    },
  },
  {
    infinitive: 'conocer',
    translation: 'يعرف (شخص/مكان)',
    category: 'irregular',
    level: 'advanced',
    examples: [
      { sentence: 'Yo conozco bien la ciudad', context: 'en la ciudad' },
      { sentence: '¿Conoces a mi hermano?', context: 'en general' },
      { sentence: 'Nosotros conocemos un buen restaurante', context: 'en la ciudad' },
    ],
    conjugations: {
      presente: { yo: 'conozco', tu: 'conoces', el: 'conoce', nosotros: 'conocemos', ellos: 'conocen' },
      preterito: { yo: 'conocí', tu: 'conociste', el: 'conoció', nosotros: 'conocimos', ellos: 'conocieron' },
      futuro: { yo: 'conoceré', tu: 'conocerás', el: 'conocerá', nosotros: 'conoceremos', ellos: 'conocerán' },
    },
  },
  {
    infinitive: 'traer',
    translation: 'يحضر / يجلب',
    category: 'irregular',
    level: 'advanced',
    examples: [
      { sentence: 'Yo traigo mi almuerzo al trabajo', context: 'en el trabajo' },
      { sentence: 'Mi amigo trae regalos a la fiesta', context: 'en la fiesta' },
      { sentence: 'Nosotros traemos bebidas', context: 'en la fiesta' },
    ],
    conjugations: {
      presente: { yo: 'traigo', tu: 'traes', el: 'trae', nosotros: 'traemos', ellos: 'traen' },
      preterito: { yo: 'traje', tu: 'trajiste', el: 'trajo', nosotros: 'trajimos', ellos: 'trajeron' },
      futuro: { yo: 'traeré', tu: 'traerás', el: 'traerá', nosotros: 'traeremos', ellos: 'traerán' },
    },
  },
  {
    infinitive: 'caer',
    translation: 'يسقط',
    category: 'irregular',
    level: 'advanced',
    examples: [
      { sentence: 'El libro cae de la mesa', context: 'en casa' },
      { sentence: 'La lluvia cae fuerte', context: 'en la calle' },
      { sentence: 'Las hojas caen en otoño', context: 'en el parque' },
    ],
    conjugations: {
      presente: { yo: 'caigo', tu: 'caes', el: 'cae', nosotros: 'caemos', ellos: 'caen' },
      preterito: { yo: 'caí', tu: 'caíste', el: 'cayó', nosotros: 'caímos', ellos: 'cayeron' },
      futuro: { yo: 'caeré', tu: 'caerás', el: 'caerá', nosotros: 'caeremos', ellos: 'caerán' },
    },
  },
  {
    infinitive: 'oír',
    translation: 'يسمع',
    category: 'irregular',
    level: 'advanced',
    examples: [
      { sentence: 'Yo oigo música mientras trabajo', context: 'en el trabajo' },
      { sentence: '¿Oyes ese ruido?', context: 'en casa' },
      { sentence: 'Nosotros oímos las noticias en la radio', context: 'en el coche' },
    ],
    conjugations: {
      presente: { yo: 'oigo', tu: 'oyes', el: 'oye', nosotros: 'oímos', ellos: 'oyen' },
      preterito: { yo: 'oí', tu: 'oíste', el: 'oyó', nosotros: 'oímos', ellos: 'oyeron' },
      futuro: { yo: 'oiré', tu: 'oirás', el: 'oirá', nosotros: 'oiremos', ellos: 'oirán' },
    },
  },
  {
    infinitive: 'dormir',
    translation: 'ينام',
    category: 'irregular',
    level: 'beginner',
    examples: [
      { sentence: 'Yo duermo ocho horas cada noche', context: 'en casa' },
      { sentence: 'Mi bebé duerme toda la noche', context: 'en casa' },
      { sentence: 'Nosotros dormimos la siesta', context: 'en casa' },
    ],
    conjugations: {
      presente: { yo: 'duermo', tu: 'duermes', el: 'duerme', nosotros: 'dormimos', ellos: 'duermen' },
      preterito: { yo: 'dormí', tu: 'dormiste', el: 'durmió', nosotros: 'dormimos', ellos: 'durmieron' },
      futuro: { yo: 'dormiré', tu: 'dormirás', el: 'dormirá', nosotros: 'dormiremos', ellos: 'dormirán' },
    },
  },
  {
    infinitive: 'pedir',
    translation: 'يطلب',
    category: 'irregular',
    level: 'intermediate',
    examples: [
      { sentence: 'Yo pido un café en el bar', context: 'en el café' },
      { sentence: 'Mi amigo pide ayuda', context: 'en el trabajo' },
      { sentence: 'Nosotros pedimos la cuenta', context: 'en el restaurante' },
    ],
    conjugations: {
      presente: { yo: 'pido', tu: 'pides', el: 'pide', nosotros: 'pedimos', ellos: 'piden' },
      preterito: { yo: 'pedí', tu: 'pediste', el: 'pidió', nosotros: 'pedimos', ellos: 'pidieron' },
      futuro: { yo: 'pediré', tu: 'pedirás', el: 'pedirá', nosotros: 'pediremos', ellos: 'pedirán' },
    },
  },
  {
    infinitive: 'sentir',
    translation: 'يشعر',
    category: 'irregular',
    level: 'advanced',
    examples: [
      { sentence: 'Yo siento frío en invierno', context: 'en casa' },
      { sentence: 'Ella siente alegría', context: 'en general' },
      { sentence: 'Nosotros sentimos cansancio', context: 'después del trabajo' },
    ],
    conjugations: {
      presente: { yo: 'siento', tu: 'sientes', el: 'siente', nosotros: 'sentimos', ellos: 'sienten' },
      preterito: { yo: 'sentí', tu: 'sentiste', el: 'sintió', nosotros: 'sentimos', ellos: 'sintieron' },
      futuro: { yo: 'sentiré', tu: 'sentirás', el: 'sentirá', nosotros: 'sentiremos', ellos: 'sentirán' },
    },
  },
  {
    infinitive: 'preferir',
    translation: 'يفضل',
    category: 'irregular',
    level: 'intermediate',
    examples: [
      { sentence: 'Yo prefiero el té al café', context: 'en el café' },
      { sentence: 'Mi hermano prefiere estudiar por la noche', context: 'en casa' },
      { sentence: 'Nosotros preferimos el verano', context: 'en general' },
    ],
    conjugations: {
      presente: { yo: 'prefiero', tu: 'prefieres', el: 'prefiere', nosotros: 'preferimos', ellos: 'prefieren' },
      preterito: { yo: 'preferí', tu: 'preferiste', el: 'prefirió', nosotros: 'preferimos', ellos: 'prefirieron' },
      futuro: { yo: 'preferiré', tu: 'preferirás', el: 'preferirá', nosotros: 'preferiremos', ellos: 'preferirán' },
    },
  },
  {
    infinitive: 'entender',
    translation: 'يفهم',
    category: 'irregular',
    level: 'intermediate',
    examples: [
      { sentence: 'Yo entiendo español muy bien', context: 'en clase' },
      { sentence: 'Mi profesor entiende mis problemas', context: 'en la escuela' },
      { sentence: 'Nosotros entendemos la lección', context: 'en clase' },
    ],
    conjugations: {
      presente: { yo: 'entiendo', tu: 'entiendes', el: 'entiende', nosotros: 'entendemos', ellos: 'entienden' },
      preterito: { yo: 'entendí', tu: 'entendiste', el: 'entendió', nosotros: 'entendimos', ellos: 'entendieron' },
      futuro: { yo: 'entenderé', tu: 'entenderás', el: 'entenderá', nosotros: 'entenderemos', ellos: 'entenderán' },
    },
  },
  {
    infinitive: 'pensar',
    translation: 'يفكر',
    category: 'irregular',
    level: 'intermediate',
    examples: [
      { sentence: 'Yo pienso en mis vacaciones', context: 'en casa' },
      { sentence: 'Mi padre piensa en el futuro', context: 'en general' },
      { sentence: 'Nosotros pensamos mucho antes de decidir', context: 'en general' },
    ],
    conjugations: {
      presente: { yo: 'pienso', tu: 'piensas', el: 'piensa', nosotros: 'pensamos', ellos: 'piensan' },
      preterito: { yo: 'pensé', tu: 'pensaste', el: 'pensó', nosotros: 'pensamos', ellos: 'pensaron' },
      futuro: { yo: 'pensaré', tu: 'pensarás', el: 'pensará', nosotros: 'pensaremos', ellos: 'pensarán' },
    },
  },
  {
    infinitive: 'empezar',
    translation: 'يبدأ',
    category: 'irregular',
    level: 'intermediate',
    examples: [
      { sentence: 'Yo empiezo a trabajar a las nueve', context: 'en el trabajo' },
      { sentence: 'La película empieza a las siete', context: 'en el cine' },
      { sentence: 'Nosotros empezamos las clases mañana', context: 'en la escuela' },
    ],
    conjugations: {
      presente: { yo: 'empiezo', tu: 'empiezas', el: 'empieza', nosotros: 'empezamos', ellos: 'empiezan' },
      preterito: { yo: 'empecé', tu: 'empezaste', el: 'empezó', nosotros: 'empezamos', ellos: 'empezaron' },
      futuro: { yo: 'empezaré', tu: 'empezarás', el: 'empezará', nosotros: 'empezaremos', ellos: 'empezarán' },
    },
  },
  {
    infinitive: 'cerrar',
    translation: 'يغلق',
    category: 'irregular',
    level: 'intermediate',
    examples: [
      { sentence: 'Yo cierro la puerta al salir', context: 'en casa' },
      { sentence: 'La tienda cierra a las ocho', context: 'en la tienda' },
      { sentence: 'Nosotros cerramos las ventanas', context: 'en casa' },
    ],
    conjugations: {
      presente: { yo: 'cierro', tu: 'cierras', el: 'cierra', nosotros: 'cerramos', ellos: 'cierran' },
      preterito: { yo: 'cerré', tu: 'cerraste', el: 'cerró', nosotros: 'cerramos', ellos: 'cerraron' },
      futuro: { yo: 'cerraré', tu: 'cerrarás', el: 'cerrará', nosotros: 'cerraremos', ellos: 'cerrarán' },
    },
  },
  {
    infinitive: 'jugar',
    translation: 'يلعب',
    category: 'irregular',
    level: 'beginner',
    examples: [
      { sentence: 'Yo juego al fútbol los sábados', context: 'en el parque' },
      { sentence: 'Los niños juegan en el parque', context: 'en el parque' },
      { sentence: 'Nosotros jugamos videojuegos', context: 'en casa' },
    ],
    conjugations: {
      presente: { yo: 'juego', tu: 'juegas', el: 'juega', nosotros: 'jugamos', ellos: 'juegan' },
      preterito: { yo: 'jugué', tu: 'jugaste', el: 'jugó', nosotros: 'jugamos', ellos: 'jugaron' },
      futuro: { yo: 'jugaré', tu: 'jugarás', el: 'jugará', nosotros: 'jugaremos', ellos: 'jugarán' },
    },
  },
  {
    infinitive: 'encontrar',
    translation: 'يجد',
    category: 'irregular',
    level: 'intermediate',
    examples: [
      { sentence: 'Yo encuentro mis llaves en la mesa', context: 'en casa' },
      { sentence: 'Mi amigo encuentra trabajo fácilmente', context: 'en el trabajo' },
      { sentence: 'Nosotros encontramos un buen restaurante', context: 'en la ciudad' },
    ],
    conjugations: {
      presente: { yo: 'encuentro', tu: 'encuentras', el: 'encuentra', nosotros: 'encontramos', ellos: 'encuentran' },
      preterito: { yo: 'encontré', tu: 'encontraste', el: 'encontró', nosotros: 'encontramos', ellos: 'encontraron' },
      futuro: { yo: 'encontraré', tu: 'encontrarás', el: 'encontrará', nosotros: 'encontraremos', ellos: 'encontrarán' },
    },
  },
  {
    infinitive: 'perder',
    translation: 'يفقد / يخسر',
    category: 'irregular',
    level: 'intermediate',
    examples: [
      { sentence: 'Yo pierdo mi teléfono con frecuencia', context: 'en casa' },
      { sentence: 'El equipo pierde el partido', context: 'en el estadio' },
      { sentence: 'Nosotros perdemos el autobús', context: 'en la calle' },
    ],
    conjugations: {
      presente: { yo: 'pierdo', tu: 'pierdes', el: 'pierde', nosotros: 'perdemos', ellos: 'pierden' },
      preterito: { yo: 'perdí', tu: 'perdiste', el: 'perdió', nosotros: 'perdimos', ellos: 'perdieron' },
      futuro: { yo: 'perderé', tu: 'perderás', el: 'perderá', nosotros: 'perderemos', ellos: 'perderán' },
    },
  },
  {
    infinitive: 'volver',
    translation: 'يعود',
    category: 'irregular',
    level: 'intermediate',
    examples: [
      { sentence: 'Yo vuelvo a casa a las seis', context: 'en casa' },
      { sentence: 'Mi padre vuelve del trabajo tarde', context: 'en el trabajo' },
      { sentence: 'Nosotros volvemos de vacaciones', context: 'de viaje' },
    ],
    conjugations: {
      presente: { yo: 'vuelvo', tu: 'vuelves', el: 'vuelve', nosotros: 'volvemos', ellos: 'vuelven' },
      preterito: { yo: 'volví', tu: 'volviste', el: 'volvió', nosotros: 'volvimos', ellos: 'volvieron' },
      futuro: { yo: 'volveré', tu: 'volverás', el: 'volverá', nosotros: 'volveremos', ellos: 'volverán' },
    },
  },
  {
    infinitive: 'seguir',
    translation: 'يتبع / يستمر',
    category: 'irregular',
    level: 'advanced',
    examples: [
      { sentence: 'Yo sigo las instrucciones del profesor', context: 'en clase' },
      { sentence: 'El coche sigue recto', context: 'en la carretera' },
      { sentence: 'Nosotros seguimos estudiando', context: 'en casa' },
    ],
    conjugations: {
      presente: { yo: 'sigo', tu: 'sigues', el: 'sigue', nosotros: 'seguimos', ellos: 'siguen' },
      preterito: { yo: 'seguí', tu: 'seguiste', el: 'siguió', nosotros: 'seguimos', ellos: 'siguieron' },
      futuro: { yo: 'seguiré', tu: 'seguirás', el: 'seguirá', nosotros: 'seguiremos', ellos: 'seguirán' },
    },
  },
  {
    infinitive: 'conseguir',
    translation: 'يحصل على',
    category: 'irregular',
    level: 'advanced',
    examples: [
      { sentence: 'Yo consigo un buen trabajo', context: 'en el trabajo' },
      { sentence: 'Mi hermano consigue entradas para el concierto', context: 'en el concierto' },
      { sentence: 'Nosotros conseguimos lo que queremos', context: 'en general' },
    ],
    conjugations: {
      presente: { yo: 'consigo', tu: 'consigues', el: 'consigue', nosotros: 'conseguimos', ellos: 'consiguen' },
      preterito: { yo: 'conseguí', tu: 'conseguiste', el: 'consiguió', nosotros: 'conseguimos', ellos: 'consiguieron' },
      futuro: { yo: 'conseguiré', tu: 'conseguirás', el: 'conseguirá', nosotros: 'conseguiremos', ellos: 'conseguirán' },
    },
  },
  {
    infinitive: 'sentarse',
    translation: 'يجلس',
    category: 'irregular',
    level: 'intermediate',
    examples: [
      { sentence: 'Yo me siento en la silla', context: 'en casa' },
      { sentence: 'Mi abuelo se sienta en el sofá', context: 'en casa' },
      { sentence: 'Nosotros nos sentamos a la mesa', context: 'en el comedor' },
    ],
    conjugations: {
      presente: { yo: 'me siento', tu: 'te sientas', el: 'se sienta', nosotros: 'nos sentamos', ellos: 'se sientan' },
      preterito: { yo: 'me senté', tu: 'te sentaste', el: 'se sentó', nosotros: 'nos sentamos', ellos: 'se sentaron' },
      futuro: { yo: 'me sentaré', tu: 'te sentarás', el: 'se sentará', nosotros: 'nos sentaremos', ellos: 'se sentarán' },
    },
  },
  {
    infinitive: 'levantarse',
    translation: 'ينهض / يستيقظ',
    category: 'regular-ar',
    level: 'beginner',
    examples: [
      { sentence: 'Yo me levanto a las siete', context: 'en casa' },
      { sentence: 'Mi madre se levanta temprano', context: 'en casa' },
      { sentence: 'Nosotros nos levantamos tarde los domingos', context: 'en casa' },
    ],
    conjugations: {
      presente: { yo: 'me levanto', tu: 'te levantas', el: 'se levanta', nosotros: 'nos levantamos', ellos: 'se levantan' },
      preterito: { yo: 'me levanté', tu: 'te levantaste', el: 'se levantó', nosotros: 'nos levantamos', ellos: 'se levantaron' },
      futuro: { yo: 'me levantaré', tu: 'te levantarás', el: 'se levantará', nosotros: 'nos levantaremos', ellos: 'se levantarán' },
    },
  },
  {
    infinitive: 'ducharse',
    translation: 'يستحم',
    category: 'regular-ar',
    level: 'beginner',
    examples: [
      { sentence: 'Yo me ducho por la mañana', context: 'en casa' },
      { sentence: 'Mi hermano se ducha después del gimnasio', context: 'en el gimnasio' },
      { sentence: 'Nosotros nos duchamos antes de dormir', context: 'en casa' },
    ],
    conjugations: {
      presente: { yo: 'me ducho', tu: 'te duchas', el: 'se ducha', nosotros: 'nos duchamos', ellos: 'se duchan' },
      preterito: { yo: 'me duché', tu: 'te duchaste', el: 'se duchó', nosotros: 'nos duchamos', ellos: 'se ducharon' },
      futuro: { yo: 'me ducharé', tu: 'te ducharás', el: 'se duchará', nosotros: 'nos ducharemos', ellos: 'se ducharán' },
    },
  },
  {
    infinitive: 'despertarse',
    translation: 'يستيقظ',
    category: 'irregular',
    level: 'beginner',
    examples: [
      { sentence: 'Yo me despierto a las seis', context: 'en casa' },
      { sentence: 'Mi hermana se despierta tarde', context: 'en casa' },
      { sentence: 'Nosotros nos despertamos con el despertador', context: 'en casa' },
    ],
    conjugations: {
      presente: { yo: 'me despierto', tu: 'te despiertas', el: 'se despierta', nosotros: 'nos despertamos', ellos: 'se despiertan' },
      preterito: { yo: 'me desperté', tu: 'te despertaste', el: 'se despertó', nosotros: 'nos despertamos', ellos: 'se despertaron' },
      futuro: { yo: 'me despertaré', tu: 'te despertarás', el: 'se despertará', nosotros: 'nos despertaremos', ellos: 'se despertarán' },
    },
  },
  {
    infinitive: 'acostarse',
    translation: 'يذهب إلى النوم',
    category: 'irregular',
    level: 'beginner',
    examples: [
      { sentence: 'Yo me acuesto a las once', context: 'en casa' },
      { sentence: 'Mi hijo se acuesta temprano', context: 'en casa' },
      { sentence: 'Nosotros nos acostamos después de cenar', context: 'en casa' },
    ],
    conjugations: {
      presente: { yo: 'me acuesto', tu: 'te acuestas', el: 'se acuesta', nosotros: 'nos acostamos', ellos: 'se acuestan' },
      preterito: { yo: 'me acosté', tu: 'te acostaste', el: 'se acostó', nosotros: 'nos acostamos', ellos: 'se acostaron' },
      futuro: { yo: 'me acostaré', tu: 'te acostarás', el: 'se acostará', nosotros: 'nos acostaremos', ellos: 'se acostarán' },
    },
  },
  {
    infinitive: 'vestirse',
    translation: 'يرتدي الملابس',
    category: 'irregular',
    level: 'intermediate',
    examples: [
      { sentence: 'Yo me visto rápido por la mañana', context: 'en casa' },
      { sentence: 'Mi hermana se viste elegante', context: 'en casa' },
      { sentence: 'Nosotros nos vestimos para la fiesta', context: 'en casa' },
    ],
    conjugations: {
      presente: { yo: 'me visto', tu: 'te vistes', el: 'se viste', nosotros: 'nos vestimos', ellos: 'se visten' },
      preterito: { yo: 'me vestí', tu: 'te vestiste', el: 'se vistió', nosotros: 'nos vestimos', ellos: 'se vistieron' },
      futuro: { yo: 'me vestiré', tu: 'te vestirás', el: 'se vestirá', nosotros: 'nos vestiremos', ellos: 'se vestirán' },
    },
  },
  {
    infinitive: 'lavarse',
    translation: 'يغسل (نفسه)',
    category: 'regular-ar',
    level: 'beginner',
    examples: [
      { sentence: 'Yo me lavo las manos antes de comer', context: 'en casa' },
      { sentence: 'Mi hijo se lava los dientes', context: 'en el baño' },
      { sentence: 'Nosotros nos lavamos la cara', context: 'en el baño' },
    ],
    conjugations: {
      presente: { yo: 'me lavo', tu: 'te lavas', el: 'se lava', nosotros: 'nos lavamos', ellos: 'se lavan' },
      preterito: { yo: 'me lavé', tu: 'te lavaste', el: 'se lavó', nosotros: 'nos lavamos', ellos: 'se lavaron' },
      futuro: { yo: 'me lavaré', tu: 'te lavarás', el: 'se lavará', nosotros: 'nos lavaremos', ellos: 'se lavarán' },
    },
  },
  {
    infinitive: 'preparar',
    translation: 'يحضر',
    category: 'regular-ar',
    level: 'beginner',
    examples: [
      { sentence: 'Yo preparo el desayuno', context: 'en la cocina' },
      { sentence: 'Mi madre prepara la comida', context: 'en casa' },
      { sentence: 'Nosotros preparamos una fiesta', context: 'en casa' },
    ],
    conjugations: {
      presente: { yo: 'preparo', tu: 'preparas', el: 'prepara', nosotros: 'preparamos', ellos: 'preparan' },
      preterito: { yo: 'preparé', tu: 'preparaste', el: 'preparó', nosotros: 'preparamos', ellos: 'prepararon' },
      futuro: { yo: 'prepararé', tu: 'prepararás', el: 'preparará', nosotros: 'prepararemos', ellos: 'prepararán' },
    },
  },
  {
    infinitive: 'limpiar',
    translation: 'ينظف',
    category: 'regular-ar',
    level: 'beginner',
    examples: [
      { sentence: 'Yo limpio mi habitación los sábados', context: 'en casa' },
      { sentence: 'Mi madre limpia la cocina', context: 'en casa' },
      { sentence: 'Nosotros limpiamos la casa juntos', context: 'en casa' },
    ],
    conjugations: {
      presente: { yo: 'limpio', tu: 'limpias', el: 'limpia', nosotros: 'limpiamos', ellos: 'limpian' },
      preterito: { yo: 'limpié', tu: 'limpiaste', el: 'limpió', nosotros: 'limpiamos', ellos: 'limpiaron' },
      futuro: { yo: 'limpiaré', tu: 'limpiarás', el: 'limpiará', nosotros: 'limpiaremos', ellos: 'limpiarán' },
    },
  },
  {
    infinitive: 'preguntar',
    translation: 'يسأل',
    category: 'regular-ar',
    level: 'beginner',
    examples: [
      { sentence: 'Yo pregunto al profesor', context: 'en clase' },
      { sentence: 'El niño pregunta muchas cosas', context: 'en casa' },
      { sentence: 'Nosotros preguntamos el precio', context: 'en la tienda' },
    ],
    conjugations: {
      presente: { yo: 'pregunto', tu: 'preguntas', el: 'pregunta', nosotros: 'preguntamos', ellos: 'preguntan' },
      preterito: { yo: 'pregunté', tu: 'preguntaste', el: 'preguntó', nosotros: 'preguntamos', ellos: 'preguntaron' },
      futuro: { yo: 'preguntaré', tu: 'preguntarás', el: 'preguntará', nosotros: 'preguntaremos', ellos: 'preguntarán' },
    },
  },
  {
    infinitive: 'responder',
    translation: 'يجيب',
    category: 'regular-er',
    level: 'beginner',
    examples: [
      { sentence: 'Yo respondo rápido a los correos', context: 'en el trabajo' },
      { sentence: 'El estudiante responde bien', context: 'en clase' },
      { sentence: 'Nosotros respondemos las preguntas', context: 'en el examen' },
    ],
    conjugations: {
      presente: { yo: 'respondo', tu: 'respondes', el: 'responde', nosotros: 'respondemos', ellos: 'responden' },
      preterito: { yo: 'respondí', tu: 'respondiste', el: 'respondió', nosotros: 'respondimos', ellos: 'respondieron' },
      futuro: { yo: 'responderé', tu: 'responderás', el: 'responderá', nosotros: 'responderemos', ellos: 'responderán' },
    },
  },
  {
    infinitive: 'mirar',
    translation: 'ينظر',
    category: 'regular-ar',
    level: 'beginner',
    examples: [
      { sentence: 'Yo miro por la ventana', context: 'en casa' },
      { sentence: 'Los turistas miran el mapa', context: 'en la ciudad' },
      { sentence: 'Nosotros miramos la televisión', context: 'en casa' },
    ],
    conjugations: {
      presente: { yo: 'miro', tu: 'miras', el: 'mira', nosotros: 'miramos', ellos: 'miran' },
      preterito: { yo: 'miré', tu: 'miraste', el: 'miró', nosotros: 'miramos', ellos: 'miraron' },
      futuro: { yo: 'miraré', tu: 'mirarás', el: 'mirará', nosotros: 'miraremos', ellos: 'mirarán' },
    },
  },
  {
    infinitive: 'escuchar',
    translation: 'يستمع',
    category: 'regular-ar',
    level: 'beginner',
    examples: [
      { sentence: 'Yo escucho música en el autobús', context: 'en el transporte' },
      { sentence: 'Mi profesor escucha a los estudiantes', context: 'en clase' },
      { sentence: 'Nosotros escuchamos la radio', context: 'en el coche' },
    ],
    conjugations: {
      presente: { yo: 'escucho', tu: 'escuchas', el: 'escucha', nosotros: 'escuchamos', ellos: 'escuchan' },
      preterito: { yo: 'escuché', tu: 'escuchaste', el: 'escuchó', nosotros: 'escuchamos', ellos: 'escucharon' },
      futuro: { yo: 'escucharé', tu: 'escucharás', el: 'escuchará', nosotros: 'escucharemos', ellos: 'escucharán' },
    },
  },
  {
    infinitive: 'necesitar',
    translation: 'يحتاج',
    category: 'regular-ar',
    level: 'beginner',
    examples: [
      { sentence: 'Yo necesito ayuda con esto', context: 'en el trabajo' },
      { sentence: 'Mi amigo necesita dinero', context: 'en general' },
      { sentence: 'Nosotros necesitamos más tiempo', context: 'en el trabajo' },
    ],
    conjugations: {
      presente: { yo: 'necesito', tu: 'necesitas', el: 'necesita', nosotros: 'necesitamos', ellos: 'necesitan' },
      preterito: { yo: 'necesité', tu: 'necesitaste', el: 'necesitó', nosotros: 'necesitamos', ellos: 'necesitaron' },
      futuro: { yo: 'necesitaré', tu: 'necesitarás', el: 'necesitará', nosotros: 'necesitaremos', ellos: 'necesitarán' },
    },
  },
  {
    infinitive: 'desear',
    translation: 'يرغب / يتمنى',
    category: 'regular-ar',
    level: 'intermediate',
    examples: [
      { sentence: 'Yo deseo unas buenas vacaciones', context: 'en general' },
      { sentence: 'Mi madre desea lo mejor para mí', context: 'en casa' },
      { sentence: 'Nosotros deseamos feliz año nuevo', context: 'en la celebración' },
    ],
    conjugations: {
      presente: { yo: 'deseo', tu: 'deseas', el: 'desea', nosotros: 'deseamos', ellos: 'desean' },
      preterito: { yo: 'deseé', tu: 'deseaste', el: 'deseó', nosotros: 'deseamos', ellos: 'desearon' },
      futuro: { yo: 'desearé', tu: 'desearás', el: 'deseará', nosotros: 'desearemos', ellos: 'desearán' },
    },
  },
  {
    infinitive: 'correr',
    translation: 'يركض',
    category: 'regular-er',
    level: 'beginner',
    examples: [
      { sentence: 'Yo corro en el parque cada mañana', context: 'en el parque' },
      { sentence: 'Mi hermano corre muy rápido', context: 'en el parque' },
      { sentence: 'Nosotros corremos una maratón', context: 'en la carrera' },
    ],
    conjugations: {
      presente: { yo: 'corro', tu: 'corres', el: 'corre', nosotros: 'corremos', ellos: 'corren' },
      preterito: { yo: 'corrí', tu: 'corriste', el: 'corrió', nosotros: 'corrimos', ellos: 'corrieron' },
      futuro: { yo: 'correré', tu: 'correrás', el: 'correrá', nosotros: 'correremos', ellos: 'correrán' },
    },
  },
  {
    infinitive: 'subir',
    translation: 'يصعد',
    category: 'regular-ir',
    level: 'intermediate',
    examples: [
      { sentence: 'Yo subo las escaleras', context: 'en el edificio' },
      { sentence: 'El precio sube mucho', context: 'en la tienda' },
      { sentence: 'Nosotros subimos al autobús', context: 'en la parada' },
    ],
    conjugations: {
      presente: { yo: 'subo', tu: 'subes', el: 'sube', nosotros: 'subimos', ellos: 'suben' },
      preterito: { yo: 'subí', tu: 'subiste', el: 'subió', nosotros: 'subimos', ellos: 'subieron' },
      futuro: { yo: 'subiré', tu: 'subirás', el: 'subirá', nosotros: 'subiremos', ellos: 'subirán' },
    },
  },
  {
    infinitive: 'bajar',
    translation: 'ينزل',
    category: 'regular-ar',
    level: 'intermediate',
    examples: [
      { sentence: 'Yo bajo del metro en esta estación', context: 'en el metro' },
      { sentence: 'Mi amigo baja las bolsas', context: 'en casa' },
      { sentence: 'Nosotros bajamos por las escaleras', context: 'en el edificio' },
    ],
    conjugations: {
      presente: { yo: 'bajo', tu: 'bajas', el: 'baja', nosotros: 'bajamos', ellos: 'bajan' },
      preterito: { yo: 'bajé', tu: 'bajaste', el: 'bajó', nosotros: 'bajamos', ellos: 'bajaron' },
      futuro: { yo: 'bajaré', tu: 'bajarás', el: 'bajará', nosotros: 'bajaremos', ellos: 'bajarán' },
    },
  },
  {
    infinitive: 'ayudar',
    translation: 'يساعد',
    category: 'regular-ar',
    level: 'beginner',
    examples: [
      { sentence: 'Yo ayudo a mi madre en casa', context: 'en casa' },
      { sentence: 'Mi hermano ayuda a los vecinos', context: 'en el barrio' },
      { sentence: 'Nosotros ayudamos a nuestros amigos', context: 'en general' },
    ],
    conjugations: {
      presente: { yo: 'ayudo', tu: 'ayudas', el: 'ayuda', nosotros: 'ayudamos', ellos: 'ayudan' },
      preterito: { yo: 'ayudé', tu: 'ayudaste', el: 'ayudó', nosotros: 'ayudamos', ellos: 'ayudaron' },
      futuro: { yo: 'ayudaré', tu: 'ayudarás', el: 'ayudará', nosotros: 'ayudaremos', ellos: 'ayudarán' },
    },
  },
  {
    infinitive: 'recibir',
    translation: 'يستقبل / يتلقى',
    category: 'regular-ir',
    level: 'intermediate',
    examples: [
      { sentence: 'Yo recibo muchos correos', context: 'en el trabajo' },
      { sentence: 'Mi hermana recibe regalos', context: 'en su cumpleaños' },
      { sentence: 'Nosotros recibimos visitas', context: 'en casa' },
    ],
    conjugations: {
      presente: { yo: 'recibo', tu: 'recibes', el: 'recibe', nosotros: 'recibimos', ellos: 'reciben' },
      preterito: { yo: 'recibí', tu: 'recibiste', el: 'recibió', nosotros: 'recibimos', ellos: 'recieron' },
      futuro: { yo: 'recibiré', tu: 'recibirás', el: 'recibirá', nosotros: 'recibiremos', ellos: 'recibirán' },
    },
  },
  {
    infinitive: 'enviar',
    translation: 'يرسل',
    category: 'regular-ar',
    level: 'intermediate',
    examples: [
      { sentence: 'Yo envío un paquete por correo', context: 'en correos' },
      { sentence: 'Mi jefe envía correos importantes', context: 'en el trabajo' },
      { sentence: 'Nosotros enviamos mensajes', context: 'en el teléfono' },
    ],
    conjugations: {
      presente: { yo: 'envío', tu: 'envías', el: 'envía', nosotros: 'enviamos', ellos: 'envían' },
      preterito: { yo: 'envié', tu: 'enviaste', el: 'envió', nosotros: 'enviamos', ellos: 'enviaron' },
      futuro: { yo: 'enviaré', tu: 'enviarás', el: 'enviará', nosotros: 'enviaremos', ellos: 'enviarán' },
    },
  },
  {
    infinitive: 'ganar',
    translation: 'يربح / يكسب',
    category: 'regular-ar',
    level: 'intermediate',
    examples: [
      { sentence: 'Yo gano dinero con mi trabajo', context: 'en el trabajo' },
      { sentence: 'Nuestro equipo gana el partido', context: 'en el estadio' },
      { sentence: 'Ellos ganan experiencia', context: 'en el trabajo' },
    ],
    conjugations: {
      presente: { yo: 'gano', tu: 'ganas', el: 'gana', nosotros: 'ganamos', ellos: 'ganan' },
      preterito: { yo: 'gané', tu: 'ganaste', el: 'ganó', nosotros: 'ganamos', ellos: 'ganaron' },
      futuro: { yo: 'ganaré', tu: 'ganarás', el: 'ganará', nosotros: 'ganaremos', ellos: 'ganarán' },
    },
  },
  {
    infinitive: 'usar',
    translation: 'يستخدم',
    category: 'regular-ar',
    level: 'beginner',
    examples: [
      { sentence: 'Yo uso el ordenador para trabajar', context: 'en el trabajo' },
      { sentence: 'Mi hermana usa gafas', context: 'en general' },
      { sentence: 'Nosotros usamos el transporte público', context: 'en la ciudad' },
    ],
    conjugations: {
      presente: { yo: 'uso', tu: 'usas', el: 'usa', nosotros: 'usamos', ellos: 'usan' },
      preterito: { yo: 'usé', tu: 'usaste', el: 'usó', nosotros: 'usamos', ellos: 'usaron' },
      futuro: { yo: 'usaré', tu: 'usarás', el: 'usará', nosotros: 'usaremos', ellos: 'usarán' },
    },
  },
  {
    infinitive: 'creer',
    translation: 'يصدق / يعتقد',
    category: 'regular-er',
    level: 'intermediate',
    examples: [
      { sentence: 'Yo creo en la amistad', context: 'en general' },
      { sentence: 'Mi madre cree que tengo razón', context: 'en casa' },
      { sentence: 'Nosotros creemos en nosotros mismos', context: 'en general' },
    ],
    conjugations: {
      presente: { yo: 'creo', tu: 'crees', el: 'cree', nosotros: 'creemos', ellos: 'creen' },
      preterito: { yo: 'creí', tu: 'creíste', el: 'creyó', nosotros: 'creímos', ellos: 'creyeron' },
      futuro: { yo: 'creeré', tu: 'creerás', el: 'creerá', nosotros: 'creeremos', ellos: 'creerán' },
    },
  },
  {
    infinitive: 'llevar',
    translation: 'يحمل / يأخذ',
    category: 'regular-ar',
    level: 'intermediate',
    examples: [
      { sentence: 'Yo llevo mi mochila al colegio', context: 'en la escuela' },
      { sentence: 'Mi madre lleva a los niños', context: 'en el coche' },
      { sentence: 'Nosotros llevamos comida a la excursión', context: 'de paseo' },
    ],
    conjugations: {
      presente: { yo: 'llevo', tu: 'llevas', el: 'lleva', nosotros: 'llevamos', ellos: 'llevan' },
      preterito: { yo: 'llevé', tu: 'llevaste', el: 'llevó', nosotros: 'llevamos', ellos: 'llevaron' },
      futuro: { yo: 'llevaré', tu: 'llevarás', el: 'llevará', nosotros: 'llevaremos', ellos: 'llevarán' },
    },
  },
  {
    infinitive: 'dejar',
    translation: 'يترك',
    category: 'regular-ar',
    level: 'intermediate',
    examples: [
      { sentence: 'Yo dejo las llaves en la mesa', context: 'en casa' },
      { sentence: 'Mi amigo deja su trabajo', context: 'en el trabajo' },
      { sentence: 'Nosotros dejamos propina en el restaurante', context: 'en el restaurante' },
    ],
    conjugations: {
      presente: { yo: 'dejo', tu: 'dejas', el: 'deja', nosotros: 'dejamos', ellos: 'dejan' },
      preterito: { yo: 'dejé', tu: 'dejaste', el: 'dejó', nosotros: 'dejamos', ellos: 'dejaron' },
      futuro: { yo: 'dejaré', tu: 'dejarás', el: 'dejará', nosotros: 'dejaremos', ellos: 'dejarán' },
    },
  },
  {
    infinitive: 'cambiar',
    translation: 'يغير',
    category: 'regular-ar',
    level: 'intermediate',
    examples: [
      { sentence: 'Yo cambio de opinión', context: 'en general' },
      { sentence: 'El banco cambia dinero', context: 'en el banco' },
      { sentence: 'Nosotros cambiamos de casa', context: 'en la mudanza' },
    ],
    conjugations: {
      presente: { yo: 'cambio', tu: 'cambias', el: 'cambia', nosotros: 'cambiamos', ellos: 'cambian' },
      preterito: { yo: 'cambié', tu: 'cambiaste', el: 'cambió', nosotros: 'cambiamos', ellos: 'cambiaron' },
      futuro: { yo: 'cambiaré', tu: 'cambiarás', el: 'cambiará', nosotros: 'cambiaremos', ellos: 'cambiarán' },
    },
  },
  {
    infinitive: 'explicar',
    translation: 'يشرح',
    category: 'regular-ar',
    level: 'intermediate',
    examples: [
      { sentence: 'Yo explico la lección a mis compañeros', context: 'en clase' },
      { sentence: 'El profesor explica muy bien', context: 'en la escuela' },
      { sentence: 'Nosotros explicamos el problema', context: 'en el trabajo' },
    ],
    conjugations: {
      presente: { yo: 'explico', tu: 'explicas', el: 'explica', nosotros: 'explicamos', ellos: 'explican' },
      preterito: { yo: 'expliqué', tu: 'explicaste', el: 'explicó', nosotros: 'explicamos', ellos: 'explicaron' },
      futuro: { yo: 'explicaré', tu: 'explicarás', el: 'explicará', nosotros: 'explicaremos', ellos: 'explicarán' },
    },
  },
  {
    infinitive: 'cumplir',
    translation: 'يحقق / يتمم',
    category: 'regular-ir',
    level: 'advanced',
    examples: [
      { sentence: 'Yo cumplo años en julio', context: 'en el cumpleaños' },
      { sentence: 'Mi empresa cumple las normas', context: 'en el trabajo' },
      { sentence: 'Nosotros cumplimos nuestras promesas', context: 'en general' },
    ],
    conjugations: {
      presente: { yo: 'cumplo', tu: 'cumples', el: 'cumple', nosotros: 'cumplimos', ellos: 'cumplen' },
      preterito: { yo: 'cumplí', tu: 'cumpliste', el: 'cumplió', nosotros: 'cumplimos', ellos: 'cumplieron' },
      futuro: { yo: 'cumpliré', tu: 'cumplirás', el: 'cumplirá', nosotros: 'cumpliremos', ellos: 'cumplirán' },
    },
  },
  {
    infinitive: 'decidir',
    translation: 'يقرر',
    category: 'regular-ir',
    level: 'advanced',
    examples: [
      { sentence: 'Yo decido qué estudiar', context: 'en la universidad' },
      { sentence: 'Mi jefe decide el horario', context: 'en el trabajo' },
      { sentence: 'Nosotros decidimos viajar', context: 'en casa' },
    ],
    conjugations: {
      presente: { yo: 'decido', tu: 'decides', el: 'decide', nosotros: 'decidimos', ellos: 'deciden' },
      preterito: { yo: 'decidí', tu: 'decidiste', el: 'decidió', nosotros: 'decidimos', ellos: 'decidieron' },
      futuro: { yo: 'decidiré', tu: 'decidirás', el: 'decidirá', nosotros: 'decidiremos', ellos: 'decidirán' },
    },
  },
  {
    infinitive: 'permitir',
    translation: 'يسمح',
    category: 'regular-ir',
    level: 'advanced',
    examples: [
      { sentence: 'Yo permito que mis hijos jueguen', context: 'en casa' },
      { sentence: 'El profesor permite usar calculadora', context: 'en el examen' },
      { sentence: 'Nosotros permitimos fumar fuera', context: 'en el trabajo' },
    ],
    conjugations: {
      presente: { yo: 'permito', tu: 'permites', el: 'permite', nosotros: 'permitimos', ellos: 'permiten' },
      preterito: { yo: 'permití', tu: 'permitiste', el: 'permitió', nosotros: 'permitimos', ellos: 'permitieron' },
      futuro: { yo: 'permitiré', tu: 'permitirás', el: 'permitirá', nosotros: 'permitiremos', ellos: 'permitirán' },
    },
  },
  {
    infinitive: 'discutir',
    translation: 'يناقش',
    category: 'regular-ir',
    level: 'advanced',
    examples: [
      { sentence: 'Yo discuto el tema con mi jefe', context: 'en el trabajo' },
      { sentence: 'Mis padres discuten mucho', context: 'en casa' },
      { sentence: 'Nosotros discutimos sobre política', context: 'en la cena' },
    ],
    conjugations: {
      presente: { yo: 'discuto', tu: 'discutes', el: 'discute', nosotros: 'discutimos', ellos: 'discuten' },
      preterito: { yo: 'discutí', tu: 'discutiste', el: 'discutió', nosotros: 'discutimos', ellos: 'discutieron' },
      futuro: { yo: 'discutiré', tu: 'discutirás', el: 'discutirá', nosotros: 'discutiremos', ellos: 'discutirán' },
    },
  },
  {
    infinitive: 'recordar',
    translation: 'يتذكر',
    category: 'irregular',
    level: 'intermediate',
    examples: [
      { sentence: 'Yo recuerdo mi infancia con cariño', context: 'en general' },
      { sentence: 'Mi abuela recuerda historias antiguas', context: 'en casa' },
      { sentence: 'Nosotros recordamos las vacaciones', context: 'en general' },
    ],
    conjugations: {
      presente: { yo: 'recuerdo', tu: 'recuerdas', el: 'recuerda', nosotros: 'recordamos', ellos: 'recuerdan' },
      preterito: { yo: 'recordé', tu: 'recordaste', el: 'recordó', nosotros: 'recordamos', ellos: 'recordaron' },
      futuro: { yo: 'recordaré', tu: 'recordarás', el: 'recordará', nosotros: 'recordaremos', ellos: 'recordarán' },
    },
  },
  {
    infinitive: 'olvidar',
    translation: 'ينسى',
    category: 'regular-ar',
    level: 'intermediate',
    examples: [
      { sentence: 'Yo olvido las contraseñas', context: 'en internet' },
      { sentence: 'Mi abuelo olvida los nombres', context: 'en general' },
      { sentence: 'Nosotros olvidamos las llaves', context: 'en casa' },
    ],
    conjugations: {
      presente: { yo: 'olvido', tu: 'olvidas', el: 'olvida', nosotros: 'olvidamos', ellos: 'olvidan' },
      preterito: { yo: 'olvidé', tu: 'olvidaste', el: 'olvidó', nosotros: 'olvidamos', ellos: 'olvidaron' },
      futuro: { yo: 'olvidaré', tu: 'olvidarás', el: 'olvidará', nosotros: 'olvidaremos', ellos: 'olvidarán' },
    },
  },
  {
    infinitive: 'terminar',
    translation: 'ينتهي / ينهي',
    category: 'regular-ar',
    level: 'beginner',
    examples: [
      { sentence: 'Yo termino mi trabajo a las cinco', context: 'en el trabajo' },
      { sentence: 'La película termina pronto', context: 'en el cine' },
      { sentence: 'Nosotros terminamos el proyecto', context: 'en el trabajo' },
    ],
    conjugations: {
      presente: { yo: 'termino', tu: 'terminas', el: 'termina', nosotros: 'terminamos', ellos: 'terminan' },
      preterito: { yo: 'terminé', tu: 'terminaste', el: 'terminó', nosotros: 'terminamos', ellos: 'terminaron' },
      futuro: { yo: 'terminaré', tu: 'terminarás', el: 'terminará', nosotros: 'terminaremos', ellos: 'terminarán' },
    },
  },
  {
    infinitive: 'comenzar',
    translation: 'يبدأ',
    category: 'irregular',
    level: 'intermediate',
    examples: [
      { sentence: 'Yo comienzo el día con un café', context: 'en casa' },
      { sentence: 'La clase comienza a las nueve', context: 'en la escuela' },
      { sentence: 'Nosotros comenzamos el proyecto', context: 'en el trabajo' },
    ],
    conjugations: {
      presente: { yo: 'comienzo', tu: 'comienzas', el: 'comienza', nosotros: 'comenzamos', ellos: 'comienzan' },
      preterito: { yo: 'comencé', tu: 'comenzaste', el: 'comenzó', nosotros: 'comenzamos', ellos: 'comenzaron' },
      futuro: { yo: 'comenzaré', tu: 'comenzarás', el: 'comenzará', nosotros: 'comenzaremos', ellos: 'comenzarán' },
    },
  },
  {
    infinitive: 'continuar',
    translation: 'يستمر',
    category: 'regular-ar',
    level: 'advanced',
    examples: [
      { sentence: 'Yo continúo con mi rutina', context: 'en general' },
      { sentence: 'El proyecto continúa avanzando', context: 'en el trabajo' },
      { sentence: 'Nosotros continuamos estudiando', context: 'en casa' },
    ],
    conjugations: {
      presente: { yo: 'continúo', tu: 'continúas', el: 'continúa', nosotros: 'continuamos', ellos: 'continúan' },
      preterito: { yo: 'continué', tu: 'continuaste', el: 'continuó', nosotros: 'continuamos', ellos: 'continuaron' },
      futuro: { yo: 'continuaré', tu: 'continuarás', el: 'continuará', nosotros: 'continuaremos', ellos: 'continuarán' },
    },
  },
  {
    infinitive: 'tocar',
    translation: 'يلمس / يعزف',
    category: 'regular-ar',
    level: 'intermediate',
    examples: [
      { sentence: 'Yo toco la guitarra', context: 'en casa' },
      { sentence: 'Mi hermano toca el piano', context: 'en casa' },
      { sentence: 'Nosotros tocamos música', context: 'en la banda' },
    ],
    conjugations: {
      presente: { yo: 'toco', tu: 'tocas', el: 'toca', nosotros: 'tocamos', ellos: 'tocan' },
      preterito: { yo: 'toqué', tu: 'tocaste', el: 'tocó', nosotros: 'tocamos', ellos: 'tocaron' },
      futuro: { yo: 'tocaré', tu: 'tocarás', el: 'tocará', nosotros: 'tocaremos', ellos: 'tocarán' },
    },
  },
  {
    infinitive: 'mostrar',
    translation: 'يُظهر / يُري',
    category: 'irregular',
    level: 'advanced',
    examples: [
      { sentence: 'Yo muestro mi documento de identidad', context: 'en la oficina' },
      { sentence: 'El guía muestra la ciudad', context: 'en el tour' },
      { sentence: 'Nosotros mostramos nuestro trabajo', context: 'en la presentación' },
    ],
    conjugations: {
      presente: { yo: 'muestro', tu: 'muestras', el: 'muestra', nosotros: 'mostramos', ellos: 'muestran' },
      preterito: { yo: 'mostré', tu: 'mostraste', el: 'mostró', nosotros: 'mostramos', ellos: 'mostraron' },
      futuro: { yo: 'mostraré', tu: 'mostrarás', el: 'mostrará', nosotros: 'mostraremos', ellos: 'mostrarán' },
    },
  },
  {
    infinitive: 'costar',
    translation: 'يكلف / بسعر',
    category: 'irregular',
    level: 'intermediate',
    examples: [
      { sentence: 'Este coche cuesta mucho dinero', context: 'en la tienda' },
      { sentence: 'Las frutas cuestan poco', context: 'en el mercado' },
      { sentence: 'Los billetes cuestan veinte euros', context: 'en la estación' },
    ],
    conjugations: {
      presente: { yo: 'cuesto', tu: 'cuestas', el: 'cuesta', nosotros: 'costamos', ellos: 'cuestan' },
      preterito: { yo: 'costé', tu: 'costaste', el: 'costó', nosotros: 'costamos', ellos: 'costaron' },
      futuro: { yo: 'costaré', tu: 'costarás', el: 'costará', nosotros: 'costaremos', ellos: 'costarán' },
    },
  },
  {
    infinitive: 'contar',
    translation: 'يعد / يحكي',
    category: 'irregular',
    level: 'intermediate',
    examples: [
      { sentence: 'Yo cuento una historia a mis hijos', context: 'en casa' },
      { sentence: 'Mi abuelo cuenta historias antiguas', context: 'en casa' },
      { sentence: 'Nosotros contamos hasta cien', context: 'en clase' },
    ],
    conjugations: {
      presente: { yo: 'cuento', tu: 'cuentas', el: 'cuenta', nosotros: 'contamos', ellos: 'cuentan' },
      preterito: { yo: 'conté', tu: 'contaste', el: 'contó', nosotros: 'contamos', ellos: 'contaron' },
      futuro: { yo: 'contaré', tu: 'contarás', el: 'contará', nosotros: 'contaremos', ellos: 'contarán' },
    },
  },
  {
    infinitive: 'soñar',
    translation: 'يحلم',
    category: 'irregular',
    level: 'advanced',
    examples: [
      { sentence: 'Yo sueño con viajar por el mundo', context: 'en general' },
      { sentence: 'Mi hijo sueña con ser astronauta', context: 'en general' },
      { sentence: 'Nosotros soñamos con un futuro mejor', context: 'en general' },
    ],
    conjugations: {
      presente: { yo: 'sueño', tu: 'sueñas', el: 'sueña', nosotros: 'soñamos', ellos: 'sueñan' },
      preterito: { yo: 'soñé', tu: 'soñaste', el: 'soñó', nosotros: 'soñamos', ellos: 'soñaron' },
      futuro: { yo: 'soñaré', tu: 'soñarás', el: 'soñará', nosotros: 'soñaremos', ellos: 'soñarán' },
    },
  },
];

export function getVerbsByLevel(level: 'beginner' | 'intermediate' | 'advanced'): DailyVerb[] {
  return dailyVerbs.filter(verb => verb.level === level);
}

export function getVerbByInfinitive(infinitive: string): DailyVerb | undefined {
  return dailyVerbs.find(verb => verb.infinitive === infinitive);
}

export function getAllVerbs(): DailyVerb[] {
  return dailyVerbs;
}
