// أنواع TypeScript للمشروع التعليمي

export interface Letter {
  letter: string;
  name: string;
  pronunciation: string;
  examples: string[];
  audio?: string;
}

export interface Number {
  number: number;
  word: string;
  pronunciation: string;
  audio?: string;
}

export interface VocabularyWord {
  word: string;
  // Arabic synonyms array - always use array format for consistency
  translation: string[];
  category: string;
  pronunciation: string;
  example?: string;
  audio?: string;
  image?: string;
}

// Dictionary entry used by the centralized dictionary.json
export interface DictionaryEntry {
  id: string;
  word: string;
  pos?: 'verb' | 'noun' | 'adjective' | 'legal' | 'phrase' | string;
  category?: string;
  translations: string[]; // Arabic translations (always array)
  pronunciation?: string;
  example?: string;
  examples?: string[];
  examplesArabic?: string[];
  audio?: string | null;
  tags?: string[];
}

export interface ReadingLesson {
  id: string;
  title: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  text: string;
  audio?: string;
  exercises: ReadingExercise[];
  isFree?: boolean;
  difficultWords?: Array<{ word: string; translation: string; explanation?: string }>;
}

export interface ReadingExercise {
  id: string;
  question: string;
  options?: string[];
  correctAnswer: string;
  type: 'multiple-choice' | 'fill-blank' | 'true-false';
  hint?: string;
}

export interface VerbConjugation {
  verb: string;
  infinitive: string;
  tense: string;
  conjugations: {
    yo: string;
    tú: string;
    él: string;
    nosotros: string;
    vosotros: string;
    ellos: string;
  };
}

export interface AdjectiveData {
  rule: string;
  singular: string;
  plural: string;
}

export interface GrammarTable {
  id: string;
  title: string;
  type: 'verbs' | 'adjectives' | 'articles' | 'pronouns';
  data: any;
}

export interface GameQuestion {
  id: string;
  question: string;
  type: 'match' | 'multiple-choice' | 'fill-blank' | 'order';
  options?: string[];
  correctAnswer: string | string[];
  points: number;
}

export interface Game {
  id: string;
  name: string;
  description: string;
  icon: string;
  questions: GameQuestion[];
}

// Re-export nacionalidad types
export * from './types/nacionalidad';
export * from './types/progress';
export * from './types/courses';
export * from './types/resources';