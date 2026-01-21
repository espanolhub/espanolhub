/**
 * Normalizes Arabic text for comparison purposes
 * Converts various forms of Arabic characters to a standard form
 * and removes extra spaces
 * 
 * Rules:
 * - Converts إ، أ، آ to ا
 * - Converts ة to ه
 * - Removes extra spaces
 * 
 * @param text - The Arabic text to normalize
 * @returns The normalized Arabic text
 */
export function normalizeArabic(text: string): string {
  if (!text || typeof text !== 'string') return '';
  
  return text
    // Convert إ، أ، آ to ا
    .replace(/[\u0623\u0625\u0622]/g, '\u0627') // إ, أ, آ -> ا
    // Convert ة to ه
    .replace(/\u0629/g, '\u0647') // ة -> ه
    // Remove extra spaces (multiple spaces to single space)
    .replace(/\s+/g, ' ')
    // Trim leading and trailing spaces
    .trim();
}

/**
 * Compares two Arabic strings using normalization
 * 
 * @param str1 - First Arabic string
 * @param str2 - Second Arabic string (or array of strings)
 * @returns True if strings match after normalization
 */
export function compareArabic(str1: string, str2: string | string[]): boolean {
  const normalized1 = normalizeArabic(str1);
  
  if (Array.isArray(str2)) {
    // If str2 is an array, check if normalized1 matches any element
    return str2.some(answer => normalizeArabic(answer) === normalized1);
  }
  
  return normalized1 === normalizeArabic(str2);
}
