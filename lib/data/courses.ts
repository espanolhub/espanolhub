/**
 * Learning Paths and Courses Data
 * Structured learning paths for beginners to advanced
 */

import type { Course, LearningPath } from '../types/courses';

// Minimal, empty course structure for a fresh start.
export const courses: Course[] = [
  {
    id: 'carnet-1',
    title: 'Carnet de Conducir',
    description: 'Curso completo para preparar el examen de conducir (DGT)',
    level: 'special',
    category: 'driving',
    icon: '🚗',
    color: 'from-orange-400 to-orange-600',
    estimatedDuration: 0,
    order: 1,
    lessons: [
      {
        id: 'driving-lesson-1',
        courseId: 'carnet-1',
        title: 'Señales de Prioridad',
        description: 'Lista de señales de prioridad y explicaciones bilingües',
        type: 'lectura',
        contentId: 'driving-signs-priority',
        order: 1,
        estimatedDuration: 10,
        xpReward: 20,
      },
    ],
  },
  {
    id: 'nacionalidad-1',
    title: 'Nacionalidad Española',
    description: 'Preparación para el examen de nacionalidad (CCSE)',
    level: 'special',
    category: 'nacionalidad',
    icon: '🇪🇸',
    color: 'from-emerald-400 to-emerald-600',
    estimatedDuration: 0,
    order: 2,
    lessons: [
      {
        id: 'nac-lesson-1',
        courseId: 'nacionalidad-1',
        title: 'Gobierno y Leyes',
        description: 'Breve explicación de la Constitución Española (1978)',
        type: 'nacionalidad',
        contentId: 'ccse-gobierno-leyes',
        order: 1,
        estimatedDuration: 15,
        xpReward: 0,
      },
    ],
  },
  // Curso de Español - split into three levels
  {
    id: 'curso-es-1',
    title: 'Curso de Español — Principiante',
    description: 'Fundamentos del español para empezar desde cero',
    level: 'beginner',
    category: 'fundamentos',
    icon: '📘',
    color: 'from-blue-400 to-blue-600',
    estimatedDuration: 0,
    order: 3,
    lessons: [
      {
        id: 'gram-lesson-1',
        courseId: 'curso-es-1',
        title: 'El Verbo Ser y Estar',
        description: 'Tabla simple comparando Ser y Estar con ejemplos',
        type: 'gramatica',
        contentId: 'gram-ser-estar',
        order: 1,
        estimatedDuration: 12,
        xpReward: 15,
      },
    ],
  },
  {
    id: 'curso-es-2',
    title: 'Curso de Español — Intermedio',
    description: 'Contenido de nivel intermedio para reforzar habilidades',
    level: 'intermediate',
    category: 'fundamentos',
    icon: '📗',
    color: 'from-green-400 to-green-600',
    estimatedDuration: 0,
    order: 4,
    lessons: [],
  },
  {
    id: 'curso-es-3',
    title: 'Curso de Español — Avanzado',
    description: 'Material avanzado para alcanzar fluidez',
    level: 'advanced',
    category: 'fundamentos',
    icon: '📙',
    color: 'from-purple-400 to-purple-600',
    estimatedDuration: 0,
    order: 5,
    lessons: [],
  },
];

export const learningPaths: LearningPath[] = [
  {
    id: 'path-principiante',
    title: 'Principiante',
    description: 'Ruta para usuarios que comienzan desde cero',
    targetLevel: 'beginner',
    courses: ['curso-es-1'],
    estimatedTotalDuration: 0,
  },
  {
    id: 'path-intermedio',
    title: 'Intermedio',
    description: 'Ruta intermedia',
    targetLevel: 'intermediate',
    courses: ['curso-es-2'],
    estimatedTotalDuration: 0,
  },
  {
    id: 'path-avanzado',
    title: 'Avanzado',
    description: 'Ruta avanzada',
    targetLevel: 'advanced',
    courses: ['curso-es-3'],
    estimatedTotalDuration: 0,
  },
];

export function getCoursesByLevel(level: 'beginner' | 'intermediate' | 'advanced'): Course[] {
  return courses.filter(course => course.level === level);
}

export function getCourseById(id: string): Course | undefined {
  return courses.find(course => course.id === id);
}

export function getLearningPathById(id: string): LearningPath | undefined {
  return learningPaths.find(path => path.id === id);
}

export function getAvailableCourses(userCompletedCourses: string[]): Course[] {
  return courses.filter(course => {
    if (!course.prerequisites || course.prerequisites.length === 0) {
      return true;
    }
    return course.prerequisites.every(prereq => userCompletedCourses.includes(prereq));
  });
}
