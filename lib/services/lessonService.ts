'use client';

import { getAllNacionalidadLessons, persistNacionalidadLessons } from '@/lib/data/nacionalidad-lessons';
import { getAllDrivingLessons, persistDrivingLessons } from '@/lib/data/driving-lessons';

export type LessonSource = 'nacionalidad' | 'driving';

export interface LessonDTO {
  id: string;
  title: string;
  category?: string;
  content: string;
  createdAt?: string;
}

const delay = (ms = 50) => new Promise(res => setTimeout(res, ms));

export async function fetchAllLessons(): Promise<{ lessons: LessonDTO[] }> {
  // simulate async fetch; currently reads localStorage via existing helpers
  await delay();
  const nac = getAllNacionalidadLessons().map(l => ({ ...l, _source: 'nacionalidad' })) as any;
  const drv = getAllDrivingLessons().map(l => ({ ...l, _source: 'driving' })) as any;
  return { lessons: [...nac, ...drv] };
}

export async function fetchLessonsBySource(source: LessonSource): Promise<LessonDTO[]> {
  await delay();
  if (source === 'nacionalidad') return getAllNacionalidadLessons() as any;
  return getAllDrivingLessons() as any;
}

export async function upsertLesson(source: LessonSource, lesson: LessonDTO): Promise<void> {
  await delay();
  if (source === 'nacionalidad') {
    const all = getAllNacionalidadLessons();
    const idx = all.findIndex(l => l.id === lesson.id);
    if (idx >= 0) all[idx] = { ...all[idx], ...lesson } as any;
    else all.push(lesson as any);
    persistNacionalidadLessons(all);
  } else {
    const all = getAllDrivingLessons();
    const idx = all.findIndex(l => l.id === lesson.id);
    if (idx >= 0) all[idx] = { ...all[idx], ...lesson };
    else all.push(lesson as any);
    persistDrivingLessons(all);
  }
  // notify listeners
  try { window.dispatchEvent(new CustomEvent('lessonsUpdated', { detail: { source, id: lesson.id } })); } catch (e) {}
}

export async function deleteLesson(source: LessonSource, id: string): Promise<void> {
  await delay();
  if (source === 'nacionalidad') {
    const next = getAllNacionalidadLessons().filter(l => l.id !== id);
    persistNacionalidadLessons(next);
  } else {
    const next = getAllDrivingLessons().filter(l => l.id !== id);
    persistDrivingLessons(next);
  }
  try { window.dispatchEvent(new CustomEvent('lessonsUpdated', { detail: { source, id } })); } catch (e) {}
}

