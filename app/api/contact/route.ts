import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL;

  if (!apiKey || !contactEmail) {
    return NextResponse.json({ error: 'Contact form not configured' }, { status: 500 });
  }

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: 'The Journey <onboarding@resend.dev>',
      to: contactEmail,
      subject: `Signal from ${name}`,
      html: `
        <div style="font-family: monospace; max-width: 600px; margin: 0 auto; padding: 24px; background: #0a0a0a; color: #f5f5f5; border-radius: 12px;">
          <p style="color: #10B981; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 16px;">NEW MESSAGE // THE JOURNEY</p>
          <p style="margin-bottom: 8px;"><strong style="color: #737373;">From:</strong> ${name}</p>
          <p style="margin-bottom: 8px;"><strong style="color: #737373;">Email:</strong> ${email}</p>
          <p style="margin-bottom: 16px; color: #737373;">─────────────────────</p>
          <p style="white-space: pre-wrap; color: #d4d4d4;">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
