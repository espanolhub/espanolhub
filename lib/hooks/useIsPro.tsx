'use client';

/**
 * Simple hook to check if user is Pro
 * Since we removed Clerk, this always returns false for now
 * Can be extended later with custom auth system
 */
export default function useIsPro(): boolean {
  // TODO: Implement with custom auth system
  return false;
}
