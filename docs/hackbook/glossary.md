# Glossary of Terms

This glossary explains frontend, Next.js, design, and project-specific terms in plain English. If you encounter a term you don't know, look here first.

---

### A

#### Accent Color
A single distinct color used to draw attention to important interactive elements like active links, buttons, and status dots. On KWAIX.dev, the only accent color is **Emerald (`#10B981`)**.

#### App Router
The file-based routing system introduced in Next.js 13+ located inside the `app/` folder. Every folder with a `page.tsx` file inside it automatically becomes a web route. For example, `app/projects/page.tsx` becomes `https://kwaix.dev/projects`.

#### Artifact
A real piece of evidence that proves a technical claim. On KWAIX.dev, artifacts are architecture diagrams, terminal transcripts, log outputs, and actual screenshots (never decorative stock graphics).

---

### B

#### Build
The process where TypeScript code, React components, and CSS are validated, compiled, and bundled into optimized static HTML, JavaScript, and CSS files ready for production deployment. Run with `npm run build`.

---

### C

#### Client Component
A React component that runs in the browser. Marked with `'use client';` at the very top of the file. Required whenever a component needs interactivity (clicks, form inputs, local state) or browser APIs (like `localStorage` or `window`).

#### Component
A reusable, self-contained piece of user interface (UI) code. Think of a component like a software function or class: you pass in inputs (called **props**) and it produces visual HTML and behavior. Example: `<StatusBadge status="active" />`.

#### Content-Security-Policy (CSP)
An HTTP security header that tells the browser which domains and scripts are authorized to run. On KWAIX.dev, strict CSP headers and cryptographic nonces are used on OAuth and API endpoints to prevent Cross-Site Scripting (XSS).

---

### D

#### Design Token
A named, reusable variable representing a design decision (such as a color, spacing measurement, or border radius). Instead of hardcoding `#10B981` in fifty places, we reference `var(--emerald)`. If the value ever changes, every element updates automatically.

#### Dynamic Route
A URL route that handles dynamic parameters using square brackets in the folder name. For example, `app/projects/[id]/page.tsx` matches `/projects/otdt`, `/projects/wisdomai`, etc., where `id` is passed as a parameter.

---

### E

#### Emerald (`#10B981`)
The primary brand accent color of KWAIX.dev. Used for active status badges, terminal highlights, link hovers, and focused elements.

---

### F

#### Framer Motion
A JavaScript animation library for React used to create smooth, physics-based transitions, fade-ins, and dialog open/close animations. Fully respects `prefers-reduced-motion`.

#### Frontmatter
Metadata written in YAML at the very top of a Markdown (`.md`) file between two sets of triple dashes (`---`). Used in `content/journal/` files to specify `title`, `date`, `tag`, and `summary`.

---

### G

#### Geist / Geist Mono
The modern typography family designed by Vercel used across the entire site. Geist is the sans-serif body font, and Geist Mono is the monospace font for code, labels, metadata, and the terminal.

#### Glassmorphism / Glass Card
A visual surface style that uses semi-transparent backgrounds with a backdrop blur filter (`backdrop-blur-2xl`) and a subtle border. Gives the feeling of frosted glass over dark or light background layers.

---

### H

#### Honeypot
A cybersecurity-inspired spam prevention technique used in `ContactForm.tsx`. An invisible input field named `website` is placed on the form. Humans never see or fill it, but automated spam bots fill every input field they find. If the field contains any text, the server silently discards the submission.

#### Hydration
The process where the browser takes static HTML sent by the server and attaches JavaScript event listeners to make it interactive.

---

### I

#### IdentityBlock
The hero component at the top of the homepage (`components/home/IdentityBlock.tsx`). Displays Wisdom's name, Greek alias (`φιλόσοφος`), sub-roles, quote, and direct social links.

---

### K

#### kOS
The fictional, lightweight operating system interface simulated in the browser terminal emulator (`components/ui/terminal.tsx`). Represents the system and automation aesthetic of KWAIX.

---

### L

#### Layout (`layout.tsx`)
The persistent wrapper frame of the website. Sits around every page. Contains elements that never reload when switching pages, such as the Navbar, Footer, ThemeProvider, fonts, and global metadata.

#### Loaders (`lib/content/loaders.ts`)
A dedicated collection of backend TypeScript functions that read JSON files from the `content/` directory, parse them, validate them through Zod schemas, and return typed data to pages.

#### Lucide React
The open-source icon library used for all UI icons on the site (arrows, terminal icons, social badges, close buttons).

---

### N

#### Next.js 16
The React framework used to build KWAIX.dev. Provides server-side rendering, static site generation, API routing, image optimization, and file-based routing.

#### Nonce
A cryptographic number used only once. Generated in `app/api/callback/route.ts` using `crypto.getRandomValues()` and attached to `<script>` tags to satisfy strict CSP headers.

---

### P

#### PKCE (Proof Key for Code Exchange)
An extension to OAuth 2.0 (RFC 7636) that prevents authorization code injection and interception attacks. Implemented in `app/api/auth/route.ts` and `app/api/callback/route.ts` for GitHub authentication.

#### Profile (`content/profile.json`)
The central data file that stores identity information: full name, alias, handles, role, location, timezone, tagline quote, philosophy, and machine name.

#### Props
Short for "properties". The arguments or data inputs passed into a React component from its parent. For example, in `<Navbar uptime="ACTIVE" />`, `uptime` is a prop.

---

### R

#### Resend
The developer-focused email API service used by `app/api/contact/route.ts` to send contact form submissions directly to Wisdom's inbox.

#### Root Layout
The top-level layout file located at `app/layout.tsx`. Initializes the HTML document, body classes, font variables, and core providers.

---

### S

#### Server Component
A React component that runs *only* on the server (or during the build process). Never sends JavaScript to the browser. Great for performance and security because it can directly read local files from disk.

#### `server-only`
A security package imported at the top of `lib/content/loaders.ts` (`import 'server-only';`). If any developer accidentally attempts to import content loaders into a client component, the build will fail immediately with an error.

#### Site Shell (`.site-shell`)
A reusable CSS layout container class defined in `app/globals.css`. Sets the maximum readable width (`--wide-max: 120rem`) and fluid left/right padding gutters.

#### StatusBadge (`components/ui/status-badge.tsx`)
A standardized visual badge that displays project and certification statuses (such as `ACTIVE`, `COMPLETE`, `IN PROGRESS`, `PAUSED`, `ARCHIVED`).

---

### T

#### Tailwind CSS
A utility-first CSS framework. Instead of writing custom CSS rules in separate stylesheets, styling is applied using predefined class names directly in component JSX (e.g., `className="text-sm font-mono text-emerald"`).

#### Terminal Emulator (`components/ui/terminal.tsx`)
An interactive, keyboard-driven pop-up terminal accessible via the floating button at the bottom-right of every page. Simulates command execution (`ls`, `whoami`, `cat`, `nmap`, `projects`, `certs`).

#### ThemeProvider (`next-themes`)
The context provider that manages switching between dark mode, light mode, and system preference without page flashing.

---

### Z

#### Zod (`lib/content/schemas.ts`)
A TypeScript-first schema validation library. Every JSON data file in `content/` is validated against a Zod schema before the site renders it. If a required field is missing or has the wrong data type, Zod throws a clear error during build time, preventing runtime crashes.
