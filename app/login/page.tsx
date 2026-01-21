'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';

/**
 * Legacy login page - redirects to Clerk sign-in
 * This page is kept for backward compatibility but redirects to Clerk authentication
 */
export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to Clerk sign-in
    router.push('/sign-in');
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-xl p-8 text-center">
        <p className="text-gray-600">Redirecting to sign-in...</p>
        <SignedOut>
          <SignInButton mode="redirect" fallbackRedirectUrl="/admin">
            <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Go to Sign In
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </div>
  );
}
