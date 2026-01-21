import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const amount = String(req.nextUrl.searchParams.get('amount') || '9.99');
    const origin = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const paypalEmail = process.env.PAYPAL_BUSINESS_EMAIL || '';
    if (!paypalEmail) {
      return NextResponse.json({ error: 'PayPal not configured. Please set PAYPAL_BUSINESS_EMAIL in .env.local' }, { status: 500 });
    }

    const successUrl = `${origin}/success?payment=paypal&debug=true`;
    const cancelUrl = `${origin}/cancel`;
    const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${encodeURIComponent(paypalEmail)}&amount=${amount}&currency_code=EUR&item_name=Espa%C3%B1ol+Educativo+Premium&return=${encodeURIComponent(successUrl)}&cancel_return=${encodeURIComponent(cancelUrl)}`;

    return NextResponse.json({ url: paypalUrl });
  } catch (e: any) {
    console.error('create-paypal debug error', e);
    return NextResponse.json({ error: 'failed' }, { status: 500 });
  }
}

