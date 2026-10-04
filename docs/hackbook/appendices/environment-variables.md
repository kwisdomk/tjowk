# Appendix C: Environment Variables Reference

> *"A secret in Git is no longer a secret."*

---

## 1. Purpose

This appendix details every environment variable used in KWAIX.dev, what it does, where to configure it, and what happens if it is missing.

---

## 2. Environment Variables Matrix

| Variable Name | Required? | Where to Set | Purpose & Impact |
|---|---|---|---|
| `RESEND_API_KEY` | **Required in Prod** | `.env.local` & Vercel Dashboard | API key for the Resend email service. If missing, `/api/contact` returns HTTP 500 error when a user submits a message. |
| `CONTACT_EMAIL` | **Required in Prod** | `.env.local` & Vercel Dashboard | Destination email where contact form submissions are delivered (e.g. `wisdom@kwaix.dev`). |
| `GITHUB_CLIENT_ID` | Optional / Future CMS | `.env.local` & Vercel Dashboard | Client ID for GitHub OAuth 2.0 PKCE application. If missing, `/api/auth` returns HTTP 500 configuration error. |
| `GITHUB_CLIENT_SECRET` | Optional / Future CMS | `.env.local` & Vercel Dashboard | Client Secret for GitHub OAuth application. Required by `/api/callback` to exchange auth codes for access tokens. |
| `NEXT_PUBLIC_SITE_URL` | Optional | `.env.local` & Vercel Dashboard | Canonical origin URL (`https://kwaix.dev`). Used for absolute URL generation in SEO tags. |

---

## 3. Configuration Files

### A. Template: `.env.example` (Committed to Git)
This file serves as the clean template for any developer setting up the project locally:
```env
# Email — Resend
RESEND_API_KEY=
CONTACT_EMAIL=

# GitHub OAuth (Decap CMS)
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# Public URL
NEXT_PUBLIC_SITE_URL=https://kwaix.dev
```

### B. Local Secrets: `.env.local` (NEVER COMMITTED)
Create this file on your local machine for development:
```env
RESEND_API_KEY=re_123456789_abcdef
CONTACT_EMAIL=wisdom@example.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## 4. Production Deployment on Vercel

To configure environment variables in production:
1. Go to the **Vercel Dashboard**.
2. Navigate to: **Project → Settings → Environment Variables**.
3. Add the keys for **Production**, **Preview**, and **Development** environments.
4. Trigger a redeploy to apply the variables.
