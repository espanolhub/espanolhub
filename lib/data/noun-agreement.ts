export type Gender = 'masculino' | 'femenino';
export type NumberForm = 'singular' | 'plural';

export type NounItem = {
  id: string;
  noun: string; // singular form, lowercase
  gender: Gender;
  plural?: string; // optional explicit plural
  hint?: string; // optional Spanish hint
};

// Spanish-only dataset: common nouns + a few "tricky" genders (no Arabic / no translations)
export const NOUNS: NounItem[] = [
  // Feminino
  { id: 'mesa', noun: 'mesa', gender: 'femenino' },
  { id: 'casa', noun: 'casa', gender: 'femenino' },
  { id: 'puerta', noun: 'puerta', gender: 'femenino' },
  { id: 'ventana', noun: 'ventana', gender: 'femenino' },
  { id: 'silla', noun: 'silla', gender: 'femenino' },
  { id: 'ciudad', noun: 'ciudad', gender: 'femenino', plural: 'ciudades' },
  { id: 'luz', noun: 'luz', gender: 'femenino', plural: 'luces' },
  { id: 'flor', noun: 'flor', gender: 'femenino', plural: 'flores' },
  { id: 'noche', noun: 'noche', gender: 'femenino', plural: 'noches' },
  { id: 'mano', noun: 'mano', gender: 'femenino', hint: 'Termina en -o pero es femenino' },
  { id: 'foto', noun: 'foto', gender: 'femenino', hint: 'Abreviación de fotografía' },
  { id: 'radio', noun: 'radio', gender: 'femenino' },

  // Masculino
  { id: 'libro', noun: 'libro', gender: 'masculino' },
  { id: 'coche', noun: 'coche', gender: 'masculino', plural: 'coches' },
  { id: 'perro', noun: 'perro', gender: 'masculino' },
  { id: 'gato', noun: 'gato', gender: 'masculino' },
  { id: 'amigo', noun: 'amigo', gender: 'masculino' },
  { id: 'reloj', noun: 'reloj', gender: 'masculino', plural: 'relojes' },
  { id: 'papel', noun: 'papel', gender: 'masculino', plural: 'papeles' },
  { id: 'árbol', noun: 'árbol', gender: 'masculino', plural: 'árboles' },
  { id: 'día', noun: 'día', gender: 'masculino', plural: 'días', hint: 'Termina en -a pero es masculino' },
  { id: 'mapa', noun: 'mapa', gender: 'masculino', hint: 'Termina en -a pero es masculino' },
  { id: 'problema', noun: 'problema', gender: 'masculino', hint: 'De origen griego (-ma) suele ser masculino' },
  { id: 'programa', noun: 'programa', gender: 'masculino', hint: 'De origen griego (-ma) suele ser masculino' },
];

export function normalizeWord(w: string): string {
  return (w || '').trim().toLowerCase();
}

export function toPlural(noun: string): string {
  const w = normalizeWord(noun);
  if (!w) return w;
  // Basic Spanish pluralization rules
  if (w.endsWith('z')) return `${w.slice(0, -1)}ces`;
  if (/[aeiouáéíóú]$/i.test(w)) return `${w}s`;
  return `${w}es`;
}

export function articleFor(gender: Gender, number: NumberForm): string {
  if (number === 'plural') return gender === 'masculino' ? 'los' : 'las';
  return gender === 'masculino' ? 'el' : 'la';
}

export function phraseFor(nounItem: NounItem, number: NumberForm): string {
  const a = articleFor(nounItem.gender, number);
  const n = number === 'plural' ? (nounItem.plural || toPlural(nounItem.noun)) : nounItem.noun;
  // Keep title-case for article in prompts
  const article = a.charAt(0).toUpperCase() + a.slice(1);
  return `${article} ${n}`;
}

export function pickRandomNouns(count: number): NounItem[] {
  const shuffled = [...NOUNS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

