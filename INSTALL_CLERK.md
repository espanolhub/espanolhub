# ⚠️ IMPORTANT: Install Clerk First!

## The Error
You're seeing `Module not found: Can't resolve '@clerk/nextjs/server'` because the package is not installed.

## Solution: Install Clerk

Run this command in your terminal:

```bash
npm install @clerk/nextjs
```

After installation, the build should work correctly.

## Verification

After running `npm install @clerk/nextjs`, verify it's installed by checking `package.json`:

```json
"dependencies": {
  "@clerk/nextjs": "^x.x.x",
  ...
}
```

## Next Steps

1. Run: `npm install @clerk/nextjs`
2. Add environment variables to `.env.local` (see CLERK_SETUP_INSTRUCTIONS.md)
3. Run: `npm run dev` to test
