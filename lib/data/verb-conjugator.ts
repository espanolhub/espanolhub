import { TenseType } from './grammar';

export interface VerbConjugationData {
  yo: string;
  tú: string;
  él: string;
  nosotros: string;
  vosotros: string;
  ellos: string;
}

// نظام تصريف الأفعال المنتظمة
export function conjugateRegularVerb(
  infinitive: string,
  tense: TenseType
): VerbConjugationData | null {
  if (!infinitive || infinitive.length < 2) return null;

  const ending = infinitive.slice(-2);
  const stem = infinitive.slice(0, -2);

  // Presente
  if (tense === 'presente') {
    if (ending === 'ar') {
      return {
        yo: stem + 'o',
        tú: stem + 'as',
        él: stem + 'a',
        nosotros: stem + 'amos',
        vosotros: stem + 'áis',
        ellos: stem + 'an',
      };
    } else if (ending === 'er') {
      return {
        yo: stem + 'o',
        tú: stem + 'es',
        él: stem + 'e',
        nosotros: stem + 'emos',
        vosotros: stem + 'éis',
        ellos: stem + 'en',
      };
    } else if (ending === 'ir') {
      return {
        yo: stem + 'o',
        tú: stem + 'es',
        él: stem + 'e',
        nosotros: stem + 'imos',
        vosotros: stem + 'ís',
        ellos: stem + 'en',
      };
    }
  }

  // Pretérito
  if (tense === 'preterito') {
    if (ending === 'ar') {
      return {
        yo: stem + 'é',
        tú: stem + 'aste',
        él: stem + 'ó',
        nosotros: stem + 'amos',
        vosotros: stem + 'asteis',
        ellos: stem + 'aron',
      };
    } else if (ending === 'er' || ending === 'ir') {
      return {
        yo: stem + 'í',
        tú: stem + 'iste',
        él: stem + 'ió',
        nosotros: stem + 'imos',
        vosotros: stem + 'isteis',
        ellos: stem + 'ieron',
      };
    }
  }

  // Futuro
  if (tense === 'futuro') {
    return {
      yo: infinitive + 'é',
      tú: infinitive + 'ás',
      él: infinitive + 'á',
      nosotros: infinitive + 'emos',
      vosotros: infinitive + 'éis',
      ellos: infinitive + 'án',
    };
  }

  // Imperfecto
  if (tense === 'imperfecto') {
    if (ending === 'ar') {
      return {
        yo: stem + 'aba',
        tú: stem + 'abas',
        él: stem + 'aba',
        nosotros: stem + 'ábamos',
        vosotros: stem + 'abais',
        ellos: stem + 'aban',
      };
    } else if (ending === 'er' || ending === 'ir') {
      return {
        yo: stem + 'ía',
        tú: stem + 'ías',
        él: stem + 'ía',
        nosotros: stem + 'íamos',
        vosotros: stem + 'íais',
        ellos: stem + 'ían',
      };
    }
  }

  // Condicional
  if (tense === 'condicional') {
    return {
      yo: infinitive + 'ía',
      tú: infinitive + 'ías',
      él: infinitive + 'ía',
      nosotros: infinitive + 'íamos',
      vosotros: infinitive + 'íais',
      ellos: infinitive + 'ían',
    };
  }

  return null;
}

// قائمة بالأفعال المنتظمة الشائعة (100+ فعل)
// ملاحظة: الأفعال الشاذة موجودة في irregular-verbs.ts
export const regularVerbs = [
  // -AR verbs (منتظمة - أكثر من 80 فعل)
  'hablar', 'trabajar', 'estudiar', 'caminar', 'cantar', 'bailar', 'comprar',
  'escuchar', 'mirar', 'esperar', 'buscar', 'encontrar', 'llamar',
  'preguntar', 'contestar', 'ayudar', 'necesitar', 'usar', 'limpiar',
  'cocinar', 'tomar', 'llevar', 'dejar', 'terminar', 'pasar',
  'llegar', 'entrar', 'regresar', 'acabar', 'continuar',
  'preparar', 'organizar', 'planificar', 'programar', 'presentar', 'explicar',
  'practicar', 'descansar', 'levantar', 'sentar',
  'nadar', 'viajar', 'visitar', 'olvidar', 'amar',
  'gustar', 'invitar', 'celebrar', 'estacionar', 'parar', 'cambiar',
  'ganar', 'perder', 'sacar', 'quitar', 'encender', 'apagar',
  'aceptar', 'alcanzar', 'aprovechar', 'armar', 'arreglar', 'asegurar',
  'atacar', 'avisar', 'bajar', 'besar', 'calentar', 'cancelar',
  'cargar', 'causar', 'cenar', 'clasificar', 'colocar', 'confirmar',
  'considerar', 'cortar', 'crear', 'cruzar', 'cuestionar', 'dañar',
  'declarar', 'desarrollar', 'desear', 'diseñar', 'disfrutar',
  'durar', 'emplear', 'encantar', 'entregar', 'entrenar', 'enviar',
  'estimar', 'evaluar', 'examinar', 'exportar', 'fabricar', 'faltar',
  'felicitar', 'formar', 'funcionar', 'generar', 'golpear', 'grabar',
  'graduar', 'guardar', 'habitar', 'herir', 'importar',
  'informar', 'intentar', 'interesar', 'introducir', 'inventar',
  'lavar', 'lograr', 'mandar', 'marcar', 'matar', 'mejorar',
  'montar', 'mostrar', 'mudar', 'notar', 'obligar',
  'observar', 'operar', 'pagar', 'participar', 'pasear',
  'pegar', 'perdonar', 'pesar', 'pintar', 'platicar',
  'precisar', 'procesar', 'proteger', 'quedar', 'quemar',
  'reclamar', 'reflexionar', 'regalar', 'regular', 'relacionar',
  'relajarse', 'representar', 'respirar', 'resultar', 'retirar', 'revisar',
  'rezar', 'saltar', 'saludar', 'señalar', 'separar',
  'significar', 'simpatizar', 'situar', 'sobrevivir', 'solicitar', 'soltar',
  'sonar', 'suspirar', 'tocar', 'transformar', 'tratar',
  'utilizar', 'valer', 'vencer', 'verificar', 'vibrar', 'volar', 'votar',
  
  // -ER verbs (منتظمة - حوالي 30 فعل)
  'beber', 'leer', 'aprender', 'comprender', 'prometer', 'romper',
  'devolver', 'mover', 'parecer', 'merecer', 'toser', 'coser',
  'temer', 'responder', 'ofrecer', 'esconder', 'vender', 'entender',
  'sorprender', 'barrer', 'comer', 'correr', 'deber', 'creer',
  'caer', 'poseer', 'proceder', 'aparecer', 'desaparecer', 'establecer',
  
  // -IR verbs (منتظمة - حوالي 30 فعل)
  'vivir', 'escribir', 'recibir', 'permitir', 'prohibir',
  'describir', 'insistir', 'sufrir', 'subir', 'partir',
  'añadir', 'admitir', 'asistir', 'comprometer', 'convertir',
  'cumplir', 'definir', 'dividir', 'elegir',
  'discutir', 'distribuir', 'contribuir', 'describir',
  'prohibir', 'recibir', 'reducir', 'insistir',
];