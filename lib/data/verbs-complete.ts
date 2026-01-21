import { VerbConjugation } from '../types';
import { TenseType } from './grammar';
import { conjugateRegularVerb, regularVerbs } from './verb-conjugator';
import { irregularVerbsData } from './irregular-verbs';

// توليد جميع التصريفات للأفعال المنتظمة
function generateRegularVerbConjugations(): VerbConjugation[] {
  const tenses: TenseType[] = ['presente', 'preterito', 'futuro', 'imperfecto', 'condicional'];
  const conjugations: VerbConjugation[] = [];

  for (const infinitive of regularVerbs) {
    for (const tense of tenses) {
      const conjugation = conjugateRegularVerb(infinitive, tense);
      if (conjugation) {
        conjugations.push({
          verb: infinitive,
          infinitive: infinitive,
          tense: tense,
          conjugations: conjugation,
        });
      }
    }
  }

  return conjugations;
}

// تحويل الأفعال الشاذة إلى تنسيق VerbConjugation
function generateIrregularVerbConjugations(): VerbConjugation[] {
  const conjugations: VerbConjugation[] = [];

  for (const verbData of irregularVerbsData) {
    const tenses: TenseType[] = ['presente', 'preterito', 'futuro', 'imperfecto', 'condicional'];
    for (const tense of tenses) {
      conjugations.push({
        verb: verbData.infinitive,
        infinitive: verbData.infinitive,
        tense: tense,
        conjugations: verbData.conjugations[tense],
      });
    }
  }

  return conjugations;
}

// دمج جميع الأفعال
export function getAllVerbConjugations(): VerbConjugation[] {
  const regularConjugations = generateRegularVerbConjugations();
  const irregularConjugations = generateIrregularVerbConjugations();
  
  // دمج وإزالة التكرارات (الأفعال الشاذة لها الأولوية)
  const allConjugations = [...irregularConjugations, ...regularConjugations];
  const uniqueMap = new Map<string, VerbConjugation>();
  
  for (const conj of allConjugations) {
    const key = `${conj.infinitive}-${conj.tense}`;
    if (!uniqueMap.has(key)) {
      uniqueMap.set(key, conj);
    }
  }
  
  return Array.from(uniqueMap.values());
}
