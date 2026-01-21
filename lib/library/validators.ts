'use server';

export const ALLOWED_SECTIONS = ['gramatica', 'lectura', 'juegos'] as const;
export const ALLOWED_GAME_TYPES = ['word-race', 'exam-simulator'] as const;

export async function validateLibraryPayload(payload: any): Promise<{ valid: boolean; errors: string[] }> {
  const errors: string[] = [];
  if (!payload || typeof payload !== 'object') {
    errors.push('Payload must be an object');
    return { valid: false, errors };
  }
  const { section, title, content, level } = payload;
  if (!title || typeof title !== 'string' || title.trim().length < 3) {
    errors.push('Title is required and must be at least 3 characters');
  }
  if (!section || !ALLOWED_SECTIONS.includes(section)) {
    errors.push(`Section is required and must be one of: ${ALLOWED_SECTIONS.join(', ')}`);
  }
  if (!level || typeof level !== 'string') {
    errors.push('Level is required');
  }
  if (section === 'juegos') {
    // content should contain JSON with gameType
    try {
      const parsed = typeof content === 'string' ? JSON.parse(content) : content;
      const gameType = parsed?.gameType;
      if (!gameType || !ALLOWED_GAME_TYPES.includes(gameType)) {
        errors.push(`For juegos, content must include gameType and be one of: ${ALLOWED_GAME_TYPES.join(', ')}`);
      }
    } catch (e) {
      errors.push('Content must be valid JSON for juegos');
    }
  }
  return { valid: errors.length === 0, errors };
}

