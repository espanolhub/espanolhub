import { VerbConjugation, GrammarTable } from '../types';
import { getAllVerbConjugations as getGeneratedConjugations } from './verbs-complete';

// أنواع الأزمنة المتاحة
export type TenseType = 'presente' | 'preterito' | 'futuro' | 'imperfecto' | 'condicional';

// بيانات تصريف جميع الأفعال في جميع الأزمنة (يتم توليدها ديناميكياً)
export const allVerbConjugations: VerbConjugation[] = getGeneratedConjugations();

// دالة مساعدة للحصول على جميع التصريفات لفعل معين
export function getVerbConjugations(infinitive: string): VerbConjugation[] {
  return allVerbConjugations.filter(v => v.infinitive === infinitive);
}

// دالة مساعدة للحصول على جميع الأفعال في زمن معين
export function getConjugationsByTense(tense: TenseType): VerbConjugation[] {
  return allVerbConjugations.filter(v => v.tense === tense);
}

// دالة مساعدة للحصول على قائمة بجميع الأفعال الفريدة
export function getAllInfinitiveVerbs(): string[] {
  const infinitives = new Set(allVerbConjugations.map(v => v.infinitive));
  return Array.from(infinitives).sort();
}

// دالة مساعدة للحصول على تصريف فعل معين في زمن معين
export function getConjugation(infinitive: string, tense: TenseType): VerbConjugation | undefined {
  return allVerbConjugations.find(v => v.infinitive === infinitive && v.tense === tense);
}

// للحفاظ على التوافق مع الكود القديم
export const presentTenseConjugations = getConjugationsByTense('presente');

// معلومات الأزمنة
export const tenseInfo: Record<TenseType, { name: string; description: string }> = {
  presente: {
    name: 'Presente',
    description: 'El tiempo presente indica acciones que ocurren ahora o hábitos',
  },
  preterito: {
    name: 'Pretérito',
    description: 'El pretérito indica acciones completadas en el pasado',
  },
  futuro: {
    name: 'Futuro',
    description: 'El futuro indica acciones que ocurrirán más adelante',
  },
  imperfecto: {
    name: 'Imperfecto',
    description: 'El imperfecto indica acciones continuas o habituales en el pasado',
  },
  condicional: {
    name: 'Condicional',
    description: 'El condicional indica acciones hipotéticas o cortesía',
  },
};

// جداول القواعد
export const grammarTables: GrammarTable[] = [
  {
    id: 'articles',
    title: 'Artículos Definidos',
    type: 'articles',
    data: {
      masculine: {
        singular: 'el',
        plural: 'los',
      },
      feminine: {
        singular: 'la',
        plural: 'las',
      },
    },
  },
  {
    id: 'articles-indefinite',
    title: 'Artículos Indefinidos',
    type: 'articles',
    data: {
      masculine: {
        singular: 'un',
        plural: 'unos',
      },
      feminine: {
        singular: 'una',
        plural: 'unas',
      },
    },
  },
  {
    id: 'pronouns-personal',
    title: 'Pronombres Personales',
    type: 'pronouns',
    data: {
      subject: {
        yo: 'yo',
        tú: 'tú',
        él: 'él',
        ella: 'ella',
        usted: 'usted',
        nosotros: 'nosotros',
        nosotras: 'nosotras',
        vosotros: 'vosotros',
        vosotras: 'vosotras',
        ellos: 'ellos',
        ellas: 'ellas',
        ustedes: 'ustedes',
      },
      object: {
        me: 'me',
        te: 'te',
        lo: 'lo',
        la: 'la',
        nos: 'nos',
        os: 'os',
        los: 'los',
        las: 'las',
      },
    },
  },
  {
    id: 'pronouns-possessive',
    title: 'Pronombres Posesivos',
    type: 'pronouns',
    data: {
      singular: {
        yo: 'mío/mía',
        tú: 'tuyo/tuya',
        él: 'suyo/suya',
        nosotros: 'nuestro/nuestra',
        vosotros: 'vuestro/vuestra',
        ellos: 'suyo/suya',
      },
      plural: {
        yo: 'míos/mías',
        tú: 'tuyos/tuyas',
        él: 'suyos/suyas',
        nosotros: 'nuestros/nuestras',
        vosotros: 'vuestros/vuestras',
        ellos: 'suyos/suyas',
      },
    },
  },
  {
    id: 'pronouns-demonstrative',
    title: 'Pronombres Demostrativos',
    type: 'pronouns',
    data: {
      singular: {
        near: 'este/esta',
        medium: 'ese/esa',
        far: 'aquel/aquella',
      },
      plural: {
        near: 'estos/estas',
        medium: 'esos/esas',
        far: 'aquellos/aquellas',
      },
    },
  },
  {
    id: 'adjectives-agreement',
    title: 'Concordancia de Adjetivos',
    type: 'adjectives',
    data: {
      masculine: {
        singular: 'alto, bajo, grande, pequeño',
        plural: 'altos, bajos, grandes, pequeños',
        rule: 'Adjetivos que terminan en -o cambian a -os en plural',
      },
      feminine: {
        singular: 'alta, baja, grande, pequeña',
        plural: 'altas, bajas, grandes, pequeñas',
        rule: 'Adjetivos que terminan en -o cambian a -a/-as',
      },
      neutral: {
        singular: 'inteligente, fácil, difícil',
        plural: 'inteligentes, fáciles, difíciles',
        rule: 'Adjetivos que terminan en -e o consonante: +s en plural',
      },
    },
  },
];

// تصريف الصفات
export function conjugateAdjective(adjective: string, gender: 'masculine' | 'feminine', number: 'singular' | 'plural'): string {
  // قواعد بسيطة للتصريف
  if (adjective.endsWith('o')) {
    if (gender === 'feminine') {
      const base = adjective.slice(0, -1);
      if (number === 'plural') return base + 'as';
      return base + 'a';
    } else {
      if (number === 'plural') return adjective.slice(0, -1) + 'os';
      return adjective;
    }
  } else if (adjective.endsWith('e') || adjective.endsWith('ista')) {
    if (number === 'plural') return adjective + 's';
    return adjective;
  } else if (adjective.endsWith('a')) {
    if (gender === 'masculine') {
      if (number === 'plural') return adjective.slice(0, -1) + 'os';
      return adjective.slice(0, -1) + 'o';
    } else {
      if (number === 'plural') return adjective + 's';
      return adjective;
    }
  }
  // الصفات التي تنتهي بحرف ساكن
  if (number === 'plural') return adjective + 'es';
  return adjective;
}
