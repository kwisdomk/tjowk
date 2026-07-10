import { NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100, 'Name is too long'),
  email: z.string().trim().email('Invalid email address').max(254, 'Email is too long'),
  message: z.string().trim().min(1, 'Message is required').max(5000, 'Message is too long'),
  website: z.string().optional(),
});

/**
 * Escape HTML special characters to prevent injection in email templates.
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(req: Request) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body.' },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    const message =
      parsed.error.issues[0]?.message ?? 'Invalid contact form submission.';
    return NextResponse.json(
      { error: message },
      { status: 400 }
    );
  }

  const { name, email, message, website } = parsed.data;

  // Honeypot: real users should never fill this.
  // Return success silently so bots do not learn what triggered rejection.
  if (website && website.trim().length > 0) {
    return NextResponse.json({ success: true });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL;

  if (!resendApiKey || !contactEmail) {
    console.error('Missing contact form environment variables.');
    return NextResponse.json(
      { error: 'Contact form is not configured.' },
      { status: 500 }
    );
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message);

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(resendApiKey);

    await resend.emails.send({
      from: 'KWAIX Hub <onboarding@resend.dev>',
      to: contactEmail,
      replyTo: email,
      subject: `Signal from ${safeName}`,
      html: `
        <div style="font-family: monospace; max-width: 600px; margin: 0 auto; padding: 24px; background: #0a0a0a; color: #f5f5f5; border-radius: 12px;">
          <p style="color: #10B981; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 16px;">NEW MESSAGE // KWAIX HUB</p>
          <p style="margin-bottom: 8px;"><strong style="color: #737373;">From:</strong> ${safeName}</p>
          <p style="margin-bottom: 8px;"><strong style="color: #737373;">Email:</strong> ${safeEmail}</p>
          <p style="margin-bottom: 16px; color: #737373;">─────────────────────</p>
          <p style="white-space: pre-wrap; color: #d4d4d4;">${safeMessage}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to send contact email:', error);
    return NextResponse.json(
      { error: 'Failed to send message.' },
      { status: 500 }
    );
  }
}
