/**
 * Course Progress Management
 * Stores course progress in localStorage
 */

import type { UserCourseProgress, Course } from '../types/courses';

const STORAGE_KEY_COURSE_PROGRESS = 'espanol-course-progress';

/**
 * Get all user course progress
 */
export function getUserCourseProgress(): UserCourseProgress[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY_COURSE_PROGRESS);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading course progress:', error);
  }

  return [];
}

/**
 * Save course progress
 */
function saveCourseProgress(progress: UserCourseProgress[]): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY_COURSE_PROGRESS, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving course progress:', error);
  }
}

/**
 * Get progress for a specific course
 */
export function getCourseProgress(courseId: string): UserCourseProgress | null {
  const allProgress = getUserCourseProgress();
  return allProgress.find(p => p.courseId === courseId) || null;
}

/**
 * Start a new course
 */
export function startCourse(courseId: string): UserCourseProgress {
  const allProgress = getUserCourseProgress();
  
  // Check if already started
  const existing = allProgress.find(p => p.courseId === courseId);
  if (existing) {
    return existing;
  }

  const newProgress: UserCourseProgress = {
    courseId,
    completedLessons: [],
    startedAt: new Date().toISOString(),
    progressPercent: 0,
    xpEarned: 0,
  };

  allProgress.push(newProgress);
  saveCourseProgress(allProgress);
  return newProgress;
}

/**
 * Complete a lesson in a course
 */
export function completeLesson(courseId: string, lessonId: string, xpEarned: number): UserCourseProgress {
  const allProgress = getUserCourseProgress();
  let progress = allProgress.find(p => p.courseId === courseId);

  if (!progress) {
    progress = startCourse(courseId);
  }

  if (!progress.completedLessons.includes(lessonId)) {
    progress.completedLessons.push(lessonId);
    progress.xpEarned += xpEarned;
  }

  // Update progress percent (will be calculated based on course)
  // For now, we'll update it when the course is loaded

  const index = allProgress.findIndex(p => p.courseId === courseId);
  if (index !== -1) {
    allProgress[index] = progress;
  } else {
    allProgress.push(progress);
  }

  saveCourseProgress(allProgress);
  return progress;
}

/**
 * Update course progress percentage
 */
export function updateCourseProgressPercent(courseId: string, totalLessons: number): void {
  const allProgress = getUserCourseProgress();
  const progress = allProgress.find(p => p.courseId === courseId);
  
  if (progress) {
    progress.progressPercent = Math.round((progress.completedLessons.length / totalLessons) * 100);
    
    // Mark as completed if all lessons done
    if (progress.progressPercent === 100 && !progress.completedAt) {
      progress.completedAt = new Date().toISOString();
    }

    const index = allProgress.findIndex(p => p.courseId === courseId);
    if (index !== -1) {
      allProgress[index] = progress;
      saveCourseProgress(allProgress);
    }
  }
}

/**
 * Set current lesson for a course
 */
export function setCurrentLesson(courseId: string, lessonId: string): void {
  const allProgress = getUserCourseProgress();
  let progress = allProgress.find(p => p.courseId === courseId);

  if (!progress) {
    progress = startCourse(courseId);
  }

  progress.currentLessonId = lessonId;

  const index = allProgress.findIndex(p => p.courseId === courseId);
  if (index !== -1) {
    allProgress[index] = progress;
  } else {
    allProgress.push(progress);
  }

  saveCourseProgress(allProgress);
}

/**
 * Get completed course IDs
 */
export function getCompletedCourseIds(): string[] {
  const allProgress = getUserCourseProgress();
  return allProgress
    .filter(p => p.progressPercent === 100)
    .map(p => p.courseId);
}

/**
 * Get in-progress course IDs
 */
export function getInProgressCourseIds(): string[] {
  const allProgress = getUserCourseProgress();
  return allProgress
    .filter(p => p.progressPercent > 0 && p.progressPercent < 100)
    .map(p => p.courseId);
}
