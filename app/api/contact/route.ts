/**
 * Contact Form API Route
 * Using Resend for email delivery
 */

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ContactEmailTemplate } from '@/lib/email-templates/contact-email';
import { addMessage } from '@/lib/data/contact-messages';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Nombre, email y mensaje son obligatorios' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'El formato del email no es válido' },
        { status: 400 }
      );
    }

    // Save message to storage (always)
    const savedMessage = addMessage({ name, email, subject, message });
    console.log('✅ Message saved to storage:', savedMessage.id);

    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY) {
      console.warn('⚠️ RESEND_API_KEY not configured. Email not sent.');
      console.log('Contact form submission:', {
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString(),
      });
      
      return NextResponse.json(
        { 
          message: 'Mensaje recibido. (Email service not configured)',
          success: true,
          messageId: savedMessage.id
        },
        { status: 200 }
      );
    }

    // Send email using Resend
    try {
      const data = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
        to: process.env.CONTACT_EMAIL || 'contacto@espanol-educativo.com',
        replyTo: email,
        subject: subject ? `Contacto: ${subject}` : 'Nuevo mensaje de contacto',
        html: ContactEmailTemplate({ name, email, subject, message }),
      });

      console.log('✅ Email sent successfully:', data);

      return NextResponse.json(
        { 
          message: 'Mensaje enviado correctamente. Te responderemos pronto.',
          success: true,
          messageId: savedMessage.id,
          emailSent: true
        },
        { status: 200 }
      );
    } catch (emailError: any) {
      console.error('❌ Error sending email with Resend:', emailError);
      
      // Log the submission even if email fails
      console.log('Contact form submission (email failed):', {
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString(),
        error: emailError.message,
      });

      // Still return success to user (but log the error)
      return NextResponse.json(
        { 
          message: 'Mensaje recibido. Te responderemos pronto.',
          success: true,
          warning: 'Email delivery pending'
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Error al procesar el formulario. Por favor, inténtalo de nuevo.' },
      { status: 500 }
    );
  }
}
