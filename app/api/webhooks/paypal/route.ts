import { NextRequest, NextResponse } from 'next/server';
import { addOrUpdateSubscriber, addTransaction } from '@/lib/subscribers';
import { clerkClient } from '@clerk/nextjs/server';

async function verifyPayPalIPN(data: Record<string, string>): Promise<boolean> {
  try {
    // PayPal IPN verification: send the data back to PayPal to verify
    const verifyUrl = process.env.PAYPAL_IPN_VERIFY_URL || 'https://ipnpb.paypal.com/cgi-bin/webscr';
    
    // Build verification request body
    const verificationBody = new URLSearchParams({
      cmd: '_notify-validate',
      ...Object.fromEntries(Object.entries(data).map(([k, v]) => [k, String(v)])),
    }).toString();

    // Send verification request to PayPal
    const response = await fetch(verifyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Next.js-PayPal-IPN-Verifier',
      },
      body: verificationBody,
    });

    const verificationResult = await response.text();
    return verificationResult === 'VERIFIED';
  } catch (error) {
    console.error('PayPal IPN verification error:', error);
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = String(value);
    });

    // Verify PayPal IPN signature (skip verification in development, but require in production)
    if (process.env.NODE_ENV === 'production') {
      const isValid = await verifyPayPalIPN(data);
      if (!isValid) {
        console.error('PayPal IPN verification failed - possible fraud attempt');
        return new NextResponse('Invalid IPN', { status: 400 });
      }
    }

    // PayPal IPN (Instant Payment Notification) data
    const txnId = data.txn_id || data.transaction_subject || '';
    const payerEmail = data.payer_email || '';
    const amount = data.mc_gross || data.amount || '';
    const status = data.payment_status || '';
    const userId = data.custom || ''; // We pass userId as custom parameter

    if (status === 'Completed' && txnId) {
      // Save transaction
      await addTransaction({
        id: txnId,
        clerkUserId: userId || 'unknown',
        email: payerEmail,
        amount: parseFloat(amount) || 0,
        currency: data.mc_currency || 'EUR',
        status: 'completed',
        paymentMethod: 'paypal',
      });

      // Save/update subscription
      if (userId && userId !== 'unknown') {
        await addOrUpdateSubscriber({
          clerkUserId: userId,
          email: payerEmail,
          planId: 'premium-monthly',
          status: 'active',
          paymentMethod: 'paypal',
          paypalTransactionId: txnId,
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
        });
        // Also set Clerk public metadata so isPro becomes available immediately
        try {
          const client = await clerkClient();
          await client.users.updateUserMetadata(userId, { publicMetadata: { status: 'pro' } });
          console.log(`Marked user ${userId} as pro via PayPal IPN`);
        } catch (e) {
          console.error('Failed to update clerk user metadata (paypal):', e);
        }
      }
    }

    // PayPal expects 200 OK response
    return new NextResponse('OK', { status: 200 });
  } catch (err: any) {
    console.error('PayPal webhook error', err);
    return new NextResponse('Error', { status: 500 });
  }
}

// PayPal also sends GET requests to verify the endpoint
export async function GET() {
  return NextResponse.json({ message: 'PayPal webhook endpoint' });
}
