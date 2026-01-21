# Clerk Authentication Integration - Setup Instructions

## 1. Installation Command

Run the following command in your terminal:

```bash
npm install @clerk/nextjs
```

## 2. Environment Variables

Add these environment variables to your `.env.local` file:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

**Get your keys from:** https://dashboard.clerk.com/

## 3. Next Steps

1. **Create Sign-In and Sign-Up Pages (Optional)**
   - Clerk provides default modal sign-in/sign-up (already configured)
   - If you want custom pages, create:
     - `app/sign-in/[[...sign-in]]/page.tsx`
     - `app/sign-up/[[...sign-up]]/page.tsx`

2. **Test the Integration**
   - Start your dev server: `npm run dev`
   - Try accessing protected routes (should redirect to sign-in)
   - Test sign-up/sign-in flow
   - Verify subscription buttons redirect correctly

3. **Admin Access**
   - Configure admin permissions in Clerk Dashboard
   - Add users to admin organization/role

## 4. What Has Been Changed

- ✅ `middleware.ts` - Protects routes (public: `/`, `/about`, `/pricing`)
- ✅ `components/Providers.tsx` - Added ClerkProvider with theme colors
- ✅ `components/Navigation.tsx` - Added UserButton, SignInButton, SignUpButton
- ✅ `components/ProUpgradeModal.tsx` - Redirects to sign-up if not logged in
- ✅ `components/SubscriptionButton.tsx` - New component for subscription CTA
- ✅ `app/dashboard/page.tsx` - Checks authentication before showing progress
- ✅ Theme colors applied: Navy Blue (#1e40af) and Golden Yellow (#fbbf24)

## 5. Protected Routes

These routes now require authentication:
- `/simulator`
- `/driving-license`
- `/nacionalidad`
- `/dashboard`
- `/admin` (requires admin permission)
- All other routes except public ones

## 6. Public Routes

These routes are accessible without authentication:
- `/`
- `/about`
- `/pricing`
- `/contact`
- `/sign-in`
- `/sign-up`
- `/aviso-legal`, `/cookies`, `/privacy`, `/terms`, `/faq`
