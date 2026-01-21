'use client';

import { useUser } from '@clerk/nextjs';

interface UserPublicMetadata {
  status?: string;
  plan?: string;
}

export default function useIsPro(): boolean {
  const { isSignedIn, user } = useUser();
  try {
    if (!isSignedIn || !user) return false;
    const md = (user.publicMetadata || {}) as UserPublicMetadata;
    return md.status === 'pro' || md.plan === 'pro' || false;
  } catch (e) {
    return false;
  }
}
