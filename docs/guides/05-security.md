# Guide 05 — Security
> The Journey · Engineering Guides

---

## Threat Model

You are a cybersecurity professional. Your portfolio should reflect that.

**What you're protecting against:**

| Threat | Likelihood | Response |
|---|---|---|
| Spam bots hitting contact form | High | Rate limiting + input validation |
| API key exposure | Medium | Server-side only, env vars |
| XSS via contact form | Low | Input sanitization |
| Sensitive data leakage | Low | Public/private boundary |
| DDoS | Very Low | Vercel handles this at edge |

**What you're NOT protecting against:**
- Nation-state attacks
- Zero-days in Next.js/Vercel

This is a static portfolio with one API endpoint. Keep security proportional.

---

## Security Headers

Add to `next.config.ts`:

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options',           value: 'DENY' },
          { key: 'X-Content-Type-Options',     value: 'nosniff' },
          { key: 'Referrer-Policy',            value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',         value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https:",
              "connect-src 'self' https://api.resend.com",
              "frame-ancestors 'none'",
            ].join('; '),
          },
          { key: 'Strict-Transport-Security',  value: 'max-age=63072000; includeSubDomains; preload' },
        ],
      },
    ];
  },
};

export default nextConfig;
```

---

## API Security Rules

```typescript
// Contact API — security checklist:
// ✅ Input validation (presence check)
// ✅ HTML escaping (sanitize strings)
// ✅ API key server-side only
// ✅ Error messages don't leak internals
// ⬚ Input length limits (name:100, email:254, message:1000) - Planned
// ⬚ Email format validation - Planned
// ⬚ Rate limiting (5 req/min per IP) - Planned

// NEVER do this:
const resend = new Resend('re_actual_key_here');         // hardcoded key
NEXT_PUBLIC_RESEND_API_KEY=re_xxx                        // exposed in browser
await resend.emails.send({ html: message });             // unsanitized input
```

---

## Environment Variable Security

| Variable | Prefix | Browser? |
|---|---|---|
| `RESEND_API_KEY` | none | No — server only |
| `CONTACT_EMAIL` | none | No — server only |
| `NEXT_PUBLIC_SITE_URL` | `NEXT_PUBLIC_` | Yes — safe |

**Rule:** Never use `NEXT_PUBLIC_` for anything sensitive.

### Verify `.gitignore` contains:
```
.env
.env.local
.env.development.local
.env.production.local
node_modules/
.next/
```

### Before every push:
```bash
git status           # check what's staged
git diff --staged    # verify no secrets
```

---

## Public vs Internal Data Boundary

| File | Public? | Notes |
|---|---|---|
| `profile.ts` | Yes | Name, role, handles — intended public |
| `projects.ts` | Yes (sanitized) | No internal endpoints or client details |
| `timeline.ts` | Mostly | Exclude sensitive infra names |
| `status.ts` | Yes | Keep vague if needed |
| `certs.ts` | Yes | Credentials are public |
| `_rules.ts` | Internal only | Dev reference — never rendered |
| `ui-state.ts` | Internal only | Never rendered as content |

---

## OWASP Top 10 — What Applies Here

| OWASP Item | Applies? | Mitigation |
|---|---|---|
| A03: Injection | Yes | Sanitize input, strip HTML brackets |
| A05: Security Misconfiguration | Yes | CSP + security headers in next.config.ts |
| A06: Vulnerable Components | Yes | Run `npm audit` before deploys |
| A02: Cryptographic Failures | Minimal | HTTPS enforced via HSTS |
| A01: Broken Access Control | Minimal | No auth needed, API is public by design |

---

## Dependency Security

```bash
npm audit              # check for known vulnerabilities
npm audit fix          # auto-fix where safe
npm outdated           # check for outdated packages
```

Run before every major deploy. Fix high severity findings. Evaluate medium/low.

---

## Repository Security

- Delete `Microsoft-Activation-Scripts` fork immediately — liability on a cybersecurity profile
- Enable branch protection on `main` in GitHub Settings
- Enable GitHub secret scanning (alerts on exposed API keys)
- Verify private repos stay private until ready

---

## Pre-Launch Security Checklist

```
Environment
[ ] .env.local in .gitignore
[ ] No real keys in .env.example
[ ] RESEND_API_KEY set in Vercel (not hardcoded)
[ ] CONTACT_EMAIL set in Vercel

Code
[ ] No API keys in client-side code
[ ] No NEXT_PUBLIC_ on sensitive vars
[ ] Contact form input validated and sanitized
[ ] Rate limiting on /api/contact

Headers
[ ] next.config.ts has all security headers (Planned)
[ ] X-Frame-Options: DENY (Planned)
[ ] CSP header present (Planned)
[ ] HSTS header present (Planned)

Repository
[ ] Microsoft-Activation-Scripts deleted
[ ] Branch protection on main enabled
[ ] npm audit passes (no high severity)

Deployment
[ ] HTTPS enforced (Vercel does this automatically)
```
