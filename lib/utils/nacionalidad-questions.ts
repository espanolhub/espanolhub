/**
 * Helper functions for extracting and managing practice questions from nacionalidad lessons
 */

import { PracticeQuestion } from '@/lib/types/nacionalidad';

/**
 * Extract practice questions from lesson content markdown
 * Looks for patterns like:
 * 1) Question text
 * A) Option 1
 * B) Option 2
 * ...
 */
export function extractQuestionsFromContent(content: string, lessonId: string): PracticeQuestion[] {
  const questions: PracticeQuestion[] = [];
  
  // Pattern: Number) Question text followed by A), B), C), D) options
  const questionRegex = /(\d+)\)\s*([^\n]+(?:\n(?!\s*[A-D]\))[^\n]+)*)\s*(A\)\s*[^\n]+)\s*(B\)\s*[^\n]+)\s*(C\)\s*[^\n]+)\s*(D\)\s*[^\n]+)/g;
  
  let match;
  let questionIndex = 0;
  
  while ((match = questionRegex.exec(content)) !== null) {
    const questionText = match[2].trim();
    const options = [
      match[3].replace(/^A\)\s*/, '').trim(),
      match[4].replace(/^B\)\s*/, '').trim(),
      match[5].replace(/^C\)\s*/, '').trim(),
      match[6].replace(/^D\)\s*/, '').trim(),
    ];
    
    // Try to find correct answer (usually the first option in markdown format)
    // For now, we'll use the first option as placeholder - should be updated manually
    questions.push({
      id: `${lessonId}-q${questionIndex + 1}`,
      question: questionText,
      options,
      correctAnswer: options[0], // Placeholder - should be verified manually
    });
    
    questionIndex++;
  }
  
  return questions;
}

/**
 * Get questions for a lesson (from questions property or extract from content)
 */
export function getLessonQuestions(lesson: { id: string; content: string; questions?: PracticeQuestion[] }): PracticeQuestion[] {
  // If questions are already defined, use them
  if (lesson.questions && lesson.questions.length > 0) {
    return lesson.questions;
  }
  
  // Otherwise, try to extract from content
  return extractQuestionsFromContent(lesson.content, lesson.id);
}
