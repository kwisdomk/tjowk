# Guide 03 — Backend
> The Journey · Engineering Guides

---

## Architecture

```
Frontend (Next.js 15)
       ↓
API Routes (Vercel serverless functions)
       ↓
External services (Resend only, for now)
```

**Rule:** No Express server. No standalone backend. No database. No authentication system.

The only backend this site needs right now is a contact form email handler. Everything else is static.

---

## Current API Routes

```
app/api/
└── contact/
    └── route.ts    ← POST handler for contact form → Resend
```

Future (do not build until needed):
```
app/api/
├── contact/route.ts        ← exists now
├── analytics/route.ts      ← future: custom event tracking
└── status-update/route.ts  ← future: automated status updates
```

---

## Contact API Route

### Install
```bash
npm install resend
```

### Implementation
```typescript
// app/api/contact/route.ts
import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

// Input constraints
const MAX_NAME_LENGTH    = 100;
const MAX_EMAIL_LENGTH   = 254;  // RFC 5321 max
const MAX_MESSAGE_LENGTH = 1000;

function sanitize(input: string): string {
  return input
    .replace(/[<>]/g, '')          // strip HTML brackets
    .replace(/javascript:/gi, '')  // strip JS protocol
    .trim();
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // Validate presence
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate lengths
    if (name.length > MAX_NAME_LENGTH) {
      return NextResponse.json({ error: 'Name too long' }, { status: 400 });
    }
    if (email.length > MAX_EMAIL_LENGTH) {
      return NextResponse.json({ error: 'Email too long' }, { status: 400 });
    }
    if (message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json({ error: 'Message too long (max 1000 chars)' }, { status: 400 });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Sanitize
    const safeName    = sanitize(name);
    const safeEmail   = sanitize(email);
    const safeMessage = sanitize(message);

    // Send
    await resend.emails.send({
      from:    'The Journey <onboarding@resend.dev>',
      to:      process.env.CONTACT_EMAIL!,
      subject: `[The Journey] Message from ${safeName}`,
      html: `
        <div style="font-family: monospace; background: #0a0a0a; color: #f5f5f5; padding: 24px; border-radius: 8px;">
          <p style="color: #10B981; margin-bottom: 8px;">NEW MESSAGE — THE JOURNEY</p>
          <p><strong>From:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Message:</strong></p>
          <p style="color: #d4d4d4; border-left: 2px solid #10B981; padding-left: 12px;">${safeMessage}</p>
        </div>
      `,
      // Reply-to so you can respond directly
      replyTo: safeEmail,
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('[contact] send failed:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Try again later.' },
      { status: 500 }
    );
  }
}
```

---

## Frontend Form (ContactForm.tsx)

```tsx
// components/contact/ContactForm.tsx
'use client';

import { useState } from 'react';

type FormState = 'idle' | 'loading' | 'success' | 'error';

export function ContactForm() {
  const [state, setState]   = useState<FormState>('idle');
  const [name, setName]     = useState('');
  const [email, setEmail]   = useState('');
  const [message, setMessage] = useState('');
  const [error, setError]   = useState('');

  const handleSubmit = async () => {
    if (!name || !email || !message) {
      setError('All fields required.');
      return;
    }

    setState('loading');
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong.');
        setState('error');
        return;
      }

      setState('success');
      setName('');
      setEmail('');
      setMessage('');

    } catch {
      setError('Network error. Please try again.');
      setState('error');
    }
  };

  if (state === 'success') {
    return (
      <div className="font-mono text-sm text-emerald-400 p-6 border border-emerald-500/30 rounded-xl bg-emerald-950/20">
        <p>{'>'} Message received.</p>
        <p className="text-neutral-400 mt-1">I'll get back to you if it's relevant.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        maxLength={100}
        className="w-full bg-white/5 border border-white/8 rounded-lg px-4 py-3 text-sm font-mono text-white placeholder:text-neutral-600 focus:outline-none focus:border-emerald-500/50"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        maxLength={254}
        className="w-full bg-white/5 border border-white/8 rounded-lg px-4 py-3 text-sm font-mono text-white placeholder:text-neutral-600 focus:outline-none focus:border-emerald-500/50"
      />
      <textarea
        placeholder="Message (max 1000 characters)"
        value={message}
        onChange={e => setMessage(e.target.value)}
        maxLength={1000}
        rows={5}
        className="w-full bg-white/5 border border-white/8 rounded-lg px-4 py-3 text-sm font-mono text-white placeholder:text-neutral-600 focus:outline-none focus:border-emerald-500/50 resize-none"
      />

      {error && (
        <p className="text-xs font-mono text-red-400">{error}</p>
      )}

      <div className="flex items-center justify-between">
        <p className="text-xs font-mono text-neutral-600">
          {message.length}/1000
        </p>
        <button
          onClick={handleSubmit}
          disabled={state === 'loading'}
          className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-mono text-white rounded-lg transition-colors"
        >
          {state === 'loading' ? 'Sending...' : 'Send →'}
        </button>
      </div>
    </div>
  );
}
```

---

## Why Resend (Not The Alternatives)

| Option | Problem |
|---|---|
| **EmailJS** | Exposes API key in browser JS. Security risk. |
| **Formspree** | Third-party redirect. No control over flow. |
| **Netlify Forms** | Netlify-only. You're on Vercel. |
| **Raw SMTP / Nodemailer** | Needs a running server. Overkill. |
| **Web3Forms** | Works but less control than Resend. |
| **Resend** ✅ | Developer API. Server-side only. Free tier sufficient. Reply-to works. Dashboard logs every send. |

---

## Rate Limiting (Basic)

Vercel doesn't provide built-in rate limiting on the free tier. Basic protection via Vercel's edge:

```typescript
// In route.ts — add before processing
// Simple in-memory rate limit (resets on cold start)
// For a portfolio, this is sufficient.

const requestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT    = 5;
const WINDOW_MS     = 60 * 1000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now  = Date.now();
  const data = requestCounts.get(ip);

  if (!data || now > data.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    return true;
  }

  if (data.count >= RATE_LIMIT) return false;

  data.count++;
  return true;
}

// In POST handler:
const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
if (!checkRateLimit(ip)) {
  return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
}
```

---

## Environment Variables

```bash
# Required
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_EMAIL=your-actual-email@gmail.com

# Optional future
NEXT_PUBLIC_SITE_URL=https://port-wk.vercel.app
VERCEL_ANALYTICS_ID=
```

### Where to set them
- **Local dev:** `.env.local` (never commit)
- **Production:** Vercel Dashboard → Project → Settings → Environment Variables
- **Template:** `.env.example` (commit this — no real values)

---

## Deployment

Auto-deploy via Vercel on push to `main`.

```bash
# Manual deploy if needed
vercel --prod

# Preview deploy (for testing before merging)
vercel
```

Vercel build settings (auto-detected for Next.js):
- Build command: `next build`
- Output directory: `.next`
- Node version: 18.x

---

## Future Backend Expansion (Do Not Build Yet)

When you eventually need these, here's the plan:

### Analytics
```typescript
// app/api/analytics/route.ts
// Log page views, project clicks — store in Vercel KV or simple log
// Only build when you actually want to know traffic patterns
```

### Journal (no backend needed — Markdown)
```bash
npm install remark-parse remark-rehype rehype-stringify rehype-highlight unified gray-matter
```

### Automated status update
```typescript
// app/api/status-update/route.ts
// Webhook from GitHub → update currentStatus automatically
// Only build if manual updates become annoying
```

### Auth (for journal drafts)
```bash
npm install next-auth
# Only if you want to write drafts without committing to git
# Not needed for a long time
```
