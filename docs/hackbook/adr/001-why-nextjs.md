# ADR 001: Choice of Next.js App Router

## Status
**Accepted**

## Context
When architecting KWAIX.dev, we needed a framework that could deliver:
1. Fast, pre-rendered static pages with zero client-side loading delay for visitors.
2. Direct, type-safe access to local filesystem content files (`fs` module in Node.js).
3. First-class SEO metadata and OpenGraph dynamic image generation.
4. Seamless zero-configuration deployment to edge infrastructure (Vercel).

## Decision
We chose **Next.js 16 (App Router)** with TypeScript.

## Consequences
### Positive:
- **Server Components by Default:** Page content is read directly from disk at build time and converted into lightweight HTML.
- **Zero Client Overhead:** Visitors download minimal JavaScript for pure presentation pages.
- **Unified Full-Stack Model:** API routes (`/api/contact`, `/api/auth`) live alongside page routes without requiring a separate Express or Flask backend server.

### Negative / Trade-offs:
- Requires understanding the boundary between Server Components and Client Components (`'use client'`).
- React framework lock-in.
