import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { clerkClient } from '@clerk/nextjs/server';

const stripeSecret = process.env.STRIPE_SECRET || '';
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

const stripe = stripeSecret ? new Stripe(stripeSecret) : null;

export async function POST(req: NextRequest) {
  try {
    const buf = await req.text();
    const sig = req.headers.get('stripe-signature') || '';

    let event: any = null;
    if (stripe && webhookSecret) {
      try {
        event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
      } catch (e: any) {
        console.error('Stripe webhook signature verification failed', e?.message || e);
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
      }
    } else {
      // If no stripe configured, accept JSON body for local testing
      try {
        event = JSON.parse(buf);
      } catch (e) {
        console.error('Invalid JSON body for stripe webhook fallback', e);
        return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
      }
    }

    // Handle checkout.session.completed or payment_intent.succeeded
    const type = event.type || event?.object;
    if (type === 'checkout.session.completed' || type === 'payment_intent.succeeded' || type === 'checkout.session') {
      const session = event.data?.object || event;
      const clerkUserId = session?.metadata?.clerkUserId || session?.client_reference_id || session?.metadata?.userId;
      if (clerkUserId) {
        try {
          const client = await clerkClient();
          // update user's public metadata to mark as pro
          await client.users.updateUserMetadata(clerkUserId, {
            publicMetadata: { status: 'pro' },
          });
          console.log(`Marked user ${clerkUserId} as pro via Stripe webhook`);
        } catch (e) {
          console.error('Failed to update clerk user metadata', e);
        }
      } else {
        console.warn('Stripe webhook: no clerkUserId found in session metadata', session?.metadata);
      }
    }

    return NextResponse.json({ received: true });
  } catch (e: any) {
    console.error('stripe webhook error', e);
    return NextResponse.json({ error: 'failed' }, { status: 500 });
  }
}

