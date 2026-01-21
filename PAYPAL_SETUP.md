# PayPal Setup Instructions

## Environment Variables

Add these to your `.env.local` file:

```env
# PayPal Configuration
PAYPAL_BUSINESS_EMAIL=boutibderrahim@gmail.com

# App URL (for redirects)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Clerk (already configured)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

**✅ Your PayPal Email:** `boutibderrahim@gmail.com`

Add this line to your `.env.local` file:
```
PAYPAL_BUSINESS_EMAIL=boutibderrahim@gmail.com
```

## PayPal Setup Steps

1. **Create PayPal Business Account**
   - Go to https://www.paypal.com/business
   - Create or log into your business account using: `boutibderrahim@gmail.com`

2. **Get Your Business Email**
   - Your PayPal email: `boutibderrahim@gmail.com`
   - Add it to `.env.local` as shown above

3. **Enable IPN (Instant Payment Notifications)** - Optional but Recommended
   - Log into PayPal Developer Dashboard: https://developer.paypal.com/
   - Go to: My Apps & Credentials → Webhooks
   - Add webhook URL: `https://your-domain.com/api/webhooks/paypal`
   - For local testing, use a tool like ngrok or wait for production

4. **Test Mode**
   - PayPal Standard doesn't have a sandbox like Stripe
   - Use small amounts for testing
   - Use PayPal's test accounts: https://developer.paypal.com/docs/api-basics/sandbox/

## How It Works

1. User clicks "Suscribirse Ahora"
2. If not logged in → Redirects to Clerk Sign-up
3. If logged in → Creates PayPal checkout URL using your email: `boutibderrahim@gmail.com`
4. User redirected to PayPal
5. After payment → Redirects to `/success`
6. PayPal sends IPN to `/api/webhooks/paypal`
7. System saves subscription to `data/subscribers.json`

## File Structure

- `app/api/checkout/route.ts` - Creates PayPal checkout URL
- `app/api/webhooks/paypal/route.ts` - Handles PayPal IPN
- `components/SubscriptionButton.tsx` - Subscribe button
- `app/success/page.tsx` - Success page after payment
- `app/cancel/page.tsx` - Cancel page if user cancels
- `lib/subscribers.ts` - Stores subscriptions in JSON files
- `data/subscribers.json` - Subscription data (auto-created)
- `data/transactions.json` - Transaction history (auto-created)

## Notes

- PayPal Standard is simpler than Stripe but less flexible
- For production, consider upgrading to PayPal REST API or PayPal Subscriptions
- Current setup uses monthly payments (€9.99)
- To enable subscriptions, you'll need PayPal REST API integration
