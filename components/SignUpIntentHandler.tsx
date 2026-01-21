'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// Dynamic import for SignUpIntentHandlerWithClerk to avoid SSR issues
const SignUpIntentHandlerWithClerk = dynamic(
  () => import('./SignUpIntentHandlerWithClerk'),
  { ssr: false }
);

export default function SignUpIntentHandler() {
  // Only load when Clerk key exists (client-side check)
  const clerkKey = typeof window !== 'undefined' && process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  
  if (!clerkKey) {
    return null;
  }
  
  return <SignUpIntentHandlerWithClerk />;
}