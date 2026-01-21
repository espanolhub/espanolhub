/**
 * Global Search Functionality
 * Search across all content types
 */

import { vocabulary } from '../data/vocabulary';
import { readingLessons } from '../data/reading';
import { dialogues } from '../data/dialogues';
import { grammarExercises, getExercisesByCategory, getExercisesByLevel } from '../data/grammar-exercises';
import { courses } from '../data/courses';
import { alphabet } from '../data/alphabet';
import { numbers } from '../data/numbers';

export interface SearchResult {
  id: string;
  type: 'vocabulary' | 'reading' | 'dialogue' | 'grammar' | 'course' | 'alphabet' | 'number';
  title: string;
  description: string;
  url: string;
  category?: string;
  level?: string;
}

/**
 * Search across all content
 */
export function searchContent(query: string, filters?: {
  types?: SearchResult['type'][];
  category?: string;
  level?: string;
}): SearchResult[] {
  const searchQuery = query.toLowerCase().trim();
  if (!searchQuery) return [];

  const results: SearchResult[] = [];

  // Search Vocabulary
  if (!filters?.types || filters.types.includes('vocabulary')) {
    vocabulary.forEach(word => {
      const translations = Array.isArray(word.translation) ? word.translation : [word.translation];
      const translationMatches = translations.some(t => t.toLowerCase().includes(searchQuery));
      if (
        word.word.toLowerCase().includes(searchQuery) ||
        translationMatches ||
        word.pronunciation.toLowerCase().includes(searchQuery) ||
        (word.example && word.example.toLowerCase().includes(searchQuery))
      ) {
        if (!filters?.category || word.category === filters.category) {
          const translationText = Array.isArray(word.translation) ? word.translation.join(', ') : word.translation;
          results.push({
            id: `vocab-${word.word}`,
            type: 'vocabulary',
            title: word.word,
            description: translationText,
            url: `/vocabulario?category=${word.category}&word=${word.word}`,
            category: word.category,
          });
        }
      }
    });
  }

  // Search Reading Lessons
  if (!filters?.types || filters.types.includes('reading')) {
    readingLessons.forEach(lesson => {
      if (
        lesson.title.toLowerCase().includes(searchQuery) ||
        lesson.text.toLowerCase().includes(searchQuery)
      ) {
        if (!filters?.level || lesson.level === filters.level) {
          results.push({
            id: `reading-${lesson.id}`,
            type: 'reading',
            title: lesson.title,
            description: lesson.text.substring(0, 150) + '...',
            url: `/lectura?lesson=${lesson.id}`,
            level: lesson.level,
          });
        }
      }
    });
  }

  // Search Dialogues
  if (!filters?.types || filters.types.includes('dialogue')) {
    dialogues.forEach(dialogue => {
      const dialogueText = dialogue.dialogue.map(d => d.text).join(' ');
      if (
        dialogue.title.toLowerCase().includes(searchQuery) ||
        dialogueText.toLowerCase().includes(searchQuery)
      ) {
        if (!filters?.level || dialogue.level === filters.level) {
          results.push({
            id: `dialogue-${dialogue.id}`,
            type: 'dialogue',
            title: dialogue.title,
            description: dialogueText.substring(0, 150) + '...',
            url: `/lectura?dialogue=${dialogue.id}`,
            category: dialogue.category,
            level: dialogue.level,
          });
        }
      }
    });
  }

  // Search Grammar Exercises
  if (!filters?.types || filters.types.includes('grammar')) {
    grammarExercises.forEach(exercise => {
      if (
        exercise.question.toLowerCase().includes(searchQuery) ||
        (exercise.explanation && exercise.explanation.toLowerCase().includes(searchQuery))
      ) {
        if (!filters?.category || exercise.category === filters.category) {
          if (!filters?.level || exercise.level === filters.level) {
            results.push({
              id: `grammar-${exercise.id}`,
              type: 'grammar',
              title: exercise.question.substring(0, 50) + (exercise.question.length > 50 ? '...' : ''),
              description: exercise.explanation || exercise.question,
              url: `/gramatica?exercise=${exercise.id}`,
              category: exercise.category,
              level: exercise.level,
            });
          }
        }
      }
    });
  }

  // Search Courses
  if (!filters?.types || filters.types.includes('course')) {
    courses.forEach(course => {
      if (
        course.title.toLowerCase().includes(searchQuery) ||
        course.description.toLowerCase().includes(searchQuery)
      ) {
        if (!filters?.level || course.level === filters.level) {
          results.push({
            id: `course-${course.id}`,
            type: 'course',
            title: course.title,
            description: course.description,
            url: `/cursos?course=${course.id}`,
            level: course.level,
            category: course.category,
          });
        }
      }
    });
  }

  // Search Alphabet
  if (!filters?.types || filters.types.includes('alphabet')) {
    alphabet.forEach(letter => {
      if (
        letter.letter.toLowerCase().includes(searchQuery) ||
        letter.name.toLowerCase().includes(searchQuery) ||
        letter.pronunciation.toLowerCase().includes(searchQuery) ||
        letter.examples.some(ex => ex.toLowerCase().includes(searchQuery))
      ) {
        results.push({
          id: `alphabet-${letter.letter}`,
          type: 'alphabet',
          title: `Letra ${letter.letter}`,
          description: letter.name,
          url: `/alfabeto?letter=${letter.letter}`,
        });
      }
    });
  }

  // Search Numbers
  if (!filters?.types || filters.types.includes('number')) {
    numbers.forEach(num => {
      if (
        num.word.toLowerCase().includes(searchQuery) ||
        num.number.toString().includes(searchQuery) ||
        num.pronunciation.toLowerCase().includes(searchQuery)
      ) {
        results.push({
          id: `number-${num.number}`,
          type: 'number',
          title: `Número ${num.number}`,
          description: num.word,
          url: `/numeros?number=${num.number}`,
        });
      }
    });
  }

  return results;
}

/**
 * Get search suggestions (autocomplete)
 */
export function getSearchSuggestions(query: string, limit: number = 5): string[] {
  const searchQuery = query.toLowerCase().trim();
  if (!searchQuery || searchQuery.length < 2) return [];

  const suggestions = new Set<string>();

  // Vocabulary suggestions
  vocabulary.forEach(word => {
    if (word.word.toLowerCase().startsWith(searchQuery)) {
      suggestions.add(word.word);
    }
    if (suggestions.size >= limit) return;
  });

  // Reading lesson titles
  readingLessons.forEach(lesson => {
    if (lesson.title.toLowerCase().includes(searchQuery)) {
      suggestions.add(lesson.title);
    }
    if (suggestions.size >= limit) return;
  });

  return Array.from(suggestions).slice(0, limit);
}
