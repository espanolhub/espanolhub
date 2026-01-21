import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const amount = body?.amount || '9.99'; // Default monthly price
    const origin = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    
    // PayPal Standard Checkout - redirect to PayPal
    const paypalEmail = process.env.PAYPAL_BUSINESS_EMAIL || '';
    if (!paypalEmail) {
      return NextResponse.json({ error: 'PayPal not configured. Please set PAYPAL_BUSINESS_EMAIL in .env.local' }, { status: 500 });
    }

    const successUrl = `${origin}/success?payment=paypal&userId=${userId}`;
    const cancelUrl = `${origin}/cancel`;

    // PayPal Standard checkout URL
    const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${encodeURIComponent(paypalEmail)}&amount=${amount}&currency_code=EUR&item_name=Español+Educativo+Premium&return=${encodeURIComponent(successUrl)}&cancel_return=${encodeURIComponent(cancelUrl)}&notify_url=${encodeURIComponent(`${origin}/api/webhooks/paypal`)}&custom=${encodeURIComponent(userId)}`;

    return NextResponse.json({ url: paypalUrl });
  } catch (err: any) {
    console.error('Checkout error', err);
    return NextResponse.json({ error: err?.message || 'Checkout failed' }, { status: 500 });
  }
}
