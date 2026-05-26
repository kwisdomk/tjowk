# CMS Production Authentication Plan

**Author:** Security-reviewed revision (planning phase only)
**Date:** 2026-05-26
**Target:** `https://kwaix.dev/admin/`
**Repository:** `kwisdomk/tjowk` (public, branch: `main`)
**Status:** Awaiting Wisdom's approval — no implementation, configuration, deployment, OAuth App, environment-variable, commit, branch, or PR changes have been made.

---

## Current State

### What Is Already Implemented Correctly

| Component | Status | Location |
|---|---|---|
| Decap CMS v3 loaded via CDN | ✅ Working | `public/admin/index.html` |
| CMS config with all 6 collections | ✅ Working | `public/admin/config.yml` |
| GitHub backend targeting `kwisdomk/tjowk` on `main` | ✅ Correct | `config.yml` lines 1–4 |
| Editorial workflow (`publish_mode: editorial_workflow`) | ✅ Correct | `config.yml` line 6 |
| Content files in JSON + Markdown format | ✅ Working | `content/` directory (14 project JSONs, 4 singleton JSONs, 1 journal `.md`) |
| Zod validation schemas | ✅ Working | `lib/content/schemas.ts` |
| Server-only content loaders with validation | ✅ Working | `lib/content/loaders.ts` |
| Featured project ordering with uniqueness enforcement | ✅ Working | `loaders.ts` lines 63–81 |
| Project ID ↔ filename consistency check | ✅ Working | `loaders.ts` lines 55–57 |
| Config link tag in `index.html` | ✅ Present | Exists in workspace on `fix/decap-config-path` branch, not yet merged to `main` |

### What `/admin` Currently Does

1. Navigating to `https://kwaix.dev/admin/` loads the Decap CMS JavaScript from `unpkg.com`.
2. Decap reads `config.yml` and identifies the GitHub backend.
3. A "Login with GitHub" button is displayed.
4. **Clicking the button fails.** Decap opens a popup window that attempts to reach an OAuth authorization endpoint, but no `base_url` or `auth_endpoint` is configured in `config.yml`. Without these, Decap defaults to using Netlify's authentication server (`https://api.netlify.com/auth/done`), which this project is not configured to use.
5. The popup either shows a Netlify error page or closes without returning a token.
6. **Result: no authentication is possible. The CMS is non-functional in production.**

### What Is Missing For Authentication

1. **No `base_url` in `config.yml`** — Decap doesn't know where to send the OAuth initiation request.
2. **No `auth_endpoint` in `config.yml`** — Decap doesn't know which path starts the OAuth flow.
3. **No `auth_scope` in `config.yml`** — Decap defaults to requesting broader scopes than necessary.
4. **No OAuth API routes** — The project has no `/api/auth` or `/api/callback` serverless functions.
5. **No GitHub OAuth App** — No OAuth application has been registered on GitHub to issue Client ID / Client Secret credentials.
6. **No environment variables** — `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` are not set in Vercel.

---

## Review Corrections Incorporated

This revision addresses the following corrections identified during prior security review:

1. **OAuth scope reduced to `public_repo`** — The previous plan requested `repo,user`. This revision requires `public_repo` only.
2. **Single-owner access policy enforced** — The callback must verify the authenticated GitHub user is `kwisdomk` server-side before returning any token to Decap.
3. **Token and callback security requirements expanded** — Detailed fail-closed error handling, state cookie security, Cache-Control, logging prohibitions, and postMessage target origin requirements added.
4. **Decap client script pinning required** — The floating `@^3.0` CDN reference must be replaced with an exact reviewed version before OAuth is enabled.
5. **Preview testing guidance corrected** — GitHub OAuth Apps allow only a single callback URL; production secrets must not be configured for arbitrary preview deployments.
6. **`.env.example` removed from scope** — The repository previously removed `.env.example` intentionally; environment variable documentation belongs in existing CMS/deployment documentation.
7. **`fix/decap-config-path` branch reassessed** — Its necessity is not overstated; a decision point is included.
8. **Verification and rollback plans expanded** — Comprehensive security, build, and workflow verification steps added.
9. **Authentication vs. authorization vs. repository rights distinguished** — Terminology clarified throughout.
10. **Decap postMessage contract documented from authoritative source** — Verified against Decap CMS backends-overview documentation and the Cloudflare Worker reference proxy linked from official docs.

---

## Confirmed Findings

### Config Audit

| Setting | Current Value | Assessment |
|---|---|---|
| `backend.name` | `github` | ✅ Correct |
| `backend.repo` | `kwisdomk/tjowk` | ✅ Correct |
| `backend.branch` | `main` | ✅ Correct |
| `backend.base_url` | *missing* | ❌ Must be added |
| `backend.auth_endpoint` | *missing* | ❌ Must be added |
| `backend.auth_scope` | *missing* | ❌ Must be added (`public_repo`) |
| `publish_mode` | `editorial_workflow` | ✅ Correct — enables draft PRs |
| `media_folder` | `public/uploads` | ⚠️ Directory does not exist yet. Decap will create it on first media upload via GitHub commit. Acceptable. |
| `public_folder` | `/uploads` | ✅ Correct mapping for Next.js `public/` serving |

### Repository State

- **Current branch in workspace:** `fix/decap-config-path`
- **Unmerged commit:** `9cda577 fix(cms): load Decap configuration from admin path` — adds `<link href="/admin/config.yml" type="text/yaml" rel="cms-config-url" />` to `public/admin/index.html`.
- **`.env.example`** does not exist in the repository. It was previously removed intentionally.
- **`package.json`** uses Next.js `^16.2.4`, React `^18.3.1`, Zod `^4.4.3`. No OAuth-related dependencies exist or are needed.

### Decap Client Script

The current `index.html` loads Decap from a floating CDN range:

```html
<script src="https://unpkg.com/decap-cms@^3.0/dist/decap-cms.js"></script>
```

This means the browser may resolve to any published `3.x` release at load time. Once production authentication works, this script will receive a GitHub write token. The script must be pinned before OAuth is enabled.

### Build/Publishing Risks

> **WARNING — Risk 1: Project ID mutation via CMS.**
> The `id` field in project JSON files is editable through the CMS. If changed, the `id` will no longer match the filename, and `loaders.ts` will throw an error at build time, breaking the Vercel deployment. The CMS config has a `hint` on the field but does not technically prevent editing.

> **WARNING — Risk 2: Missing `featuredOrder` on featured projects.**
> If a project is marked `featured: true` via the CMS but `featuredOrder` is left empty, the build will throw. The CMS marks `featuredOrder` as `required: false` to allow non-featured projects to omit it, but there's no conditional validation. This is a known sharp edge.

> **NOTE — Risk 3: Editorial workflow creates PRs.**
> When you save a draft via CMS, Decap creates a branch (`cms/collectionName/entrySlug`) and opens a PR on GitHub. Publishing merges the PR. This triggers Vercel to build and deploy. A broken content change would deploy broken production. The Zod validation layer mitigates this — a bad schema will fail the `next build` step and Vercel won't promote it. This is the intended safeguard.

### Security Header Observation

The `next.config.ts` does **not** currently implement the security headers described in `docs/guides/05-security.md`. This is fine for now, but **when CSP headers are eventually added**, the policy must allow:
- `script-src` to load from `unpkg.com` (Decap CMS CDN) — or remove the CDN dependency by serving the script locally
- `connect-src` to reach `api.github.com` (Decap API calls) and `github.com` (OAuth)
- The OAuth popup flow uses `window.open`, not iframes, so `frame-src` changes are not expected to be needed

This is not blocking the current plan, but should be documented as a future concern.

---

## Recommended Architecture

**Option A: Inline Next.js API Routes (OAuth Proxy in the same Vercel project).**

Two serverless API routes (`app/api/auth/route.ts` and `app/api/callback/route.ts`) deployed alongside the existing Next.js application. These handle the GitHub OAuth handshake — the auth route redirects to GitHub, the callback route exchanges the code for a token and posts it back to Decap via `window.opener.postMessage()`.

### Why Option A

1. **Zero additional infrastructure.** Everything stays in one Vercel project, one repo, one deployment pipeline. For a single-owner portfolio, this is the right level of complexity.
2. **Full control and visibility.** The OAuth code is in your codebase. You can read it, debug it, and understand exactly what it does. No trusting external repos or services.
3. **No dependency risk.** The OAuth handshake uses raw `fetch` calls against GitHub's well-documented API. No npm packages needed for the proxy itself.
4. **Minimal code.** Two files, ~60–80 lines each (including full error handling and the single-owner check). The GitHub OAuth token exchange is a single `POST` to `https://github.com/login/oauth/access_token`.
5. **Security-appropriate.** Client Secret stays in Vercel env vars. CSRF prevention via `state` parameter. The `public_repo` scope is the minimum needed.
6. **Learner-friendly.** Understanding the OAuth flow directly is more valuable than abstracting it behind a service.

### Why Not Other Options

**Option B (External Standalone OAuth Proxy):** Introduces a second Vercel project to maintain, a separate dependency tree that can become outdated, and community repos that may be abandoned. The callback URL must point to the proxy domain rather than the site domain, adding complexity.

**Option C (Hosted Third-Party OAuth Service):** Requires providing GitHub OAuth credentials to a third party. Netlify Identity doesn't cleanly support Decap's GitHub backend editorial workflow for non-Netlify sites. Architecturally awkward for a single-owner Vercel-hosted portfolio.

---

## Access Policy

### Single-Owner Policy

The CMS is intended to be administered by **Wisdom Kinoti** through GitHub login **`kwisdomk`**.

The callback route implementation must:

1. Exchange the GitHub OAuth authorization code for an access token **server-side**.
2. Call the GitHub authenticated-user endpoint (`GET https://api.github.com/user`) **server-side** using that token.
3. Verify the returned `login` is exactly `kwisdomk`.
4. **Reject authentication** if the login is anything else.
5. **Never send the rejected user's token to Decap CMS** — the error response must not include any access token.

### Rationale

- **Repository permissions alone are insufficient.** They prevent unauthorized _publishing_, but do not enforce a private single-owner CMS login screen. Without the explicit login check, any GitHub user could authenticate to the OAuth App, receive a token, and reach the CMS dashboard. Although they would fail when attempting to push to `kwisdomk/tjowk`, they would still see the CMS UI and collection structure.
- **Authentication** determines whether a GitHub account can enter the CMS.
- **Authorization** determines whether that authenticated identity is allowed by the application's access policy.
- **Repository publishing rights** determine whether the token can actually modify `kwisdomk/tjowk`. These are enforced by GitHub, not by the CMS routes.
- **Explicit login allowlisting is the correct current policy** for a personal portfolio.
- Collaborator access can be introduced later only as a deliberate, approved change (expanding the allowlist to include additional GitHub logins).

---

## OAuth Scope Decision

### Required: `public_repo` only

The `kwisdomk/tjowk` repository is **public**. The implementation plan requires:

- **GitHub OAuth scope:** `public_repo`
- **Decap backend setting:** `auth_scope: public_repo`

### Rationale

| Scope | Access Granted | Assessment |
|---|---|---|
| `repo` | Read/write access to **all** repositories (public and private) available to the authenticating user. | ❌ **Too broad.** Grants access beyond the single public repository needed. |
| `public_repo` | Read/write access to **public** repositories only. Includes creating branches, opening/merging PRs, reading/writing files. | ✅ **Sufficient.** Permits all operations needed for Decap editorial workflow on the public `kwisdomk/tjowk` repository. |
| `user` | Read/write access to the user's profile information. | ❌ **Not needed.** The `GET /user` endpoint (used for the login check) returns the authenticated user's public identity with any scope — `user` scope is only needed to _write_ profile data, which this application never does. |

**References:**
- [GitHub: Scopes for OAuth Apps](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps) — `public_repo` grants "Read/write access to code, commit statuses, repository projects, collaborators, and deployment statuses for public repositories and organizations."
- [Decap CMS: Configuration Options](https://decapcms.org/docs/configuration-options/) — The `auth_scope` backend setting controls the scope sent to the OAuth provider.

> **IMPORTANT:** A broader `repo` scope may only be considered later if the repository becomes private, and that change must be explicitly approved by Wisdom. Do not request `user` scope; public account identity can be read without profile-write scope.

---

## Token Security Requirements

### Auth Route (`app/api/auth/route.ts`)

The auth route must:

1. Read `GITHUB_CLIENT_ID` only from server-side environment variables (not prefixed with `NEXT_PUBLIC_`).
2. **Fail closed** with a generic error (e.g., HTTP 500 with "Authentication configuration error") if `GITHUB_CLIENT_ID` is missing or empty. Do not reveal which variable is missing.
3. Generate a **cryptographically random** `state` value using `crypto.randomUUID()` or equivalent.
4. Store the `state` in a **short-lived cookie** with these properties:
   - `HttpOnly` — not accessible to client-side JavaScript
   - `Secure` — only sent over HTTPS
   - `SameSite=Lax` — allows the redirect back from GitHub
   - `Max-Age=600` (10 minutes) — short enough to limit replay, long enough for a human to authorize
   - `Path=/api/callback` — scoped to only the callback route
5. Redirect to `https://github.com/login/oauth/authorize` with these query parameters:
   - `client_id` — from the environment variable
   - `redirect_uri=https://kwaix.dev/api/callback` — exact production callback URL
   - `scope=public_repo`
   - `state` — the generated value
6. Set `Cache-Control: no-store` on the redirect response.
7. **Never log** the state value, OAuth codes, tokens, or secrets.

### Callback Route (`app/api/callback/route.ts`)

The callback route must handle all of the following failure cases before returning any token:

| Failure Case | Required Behavior |
|---|---|
| Missing `code` query parameter | Return generic authentication error. Clear state cookie. |
| Missing `state` query parameter | Return generic authentication error. Clear state cookie. |
| Mismatched `state` (does not match cookie) | Return generic authentication error. Clear state cookie. |
| GitHub authorization denial (`error` parameter present) | Return generic authentication error. Clear state cookie. |
| Failed token exchange (non-200 from GitHub, missing `access_token`) | Return generic authentication error. Clear state cookie. |
| Authenticated GitHub user lookup failure (non-200 from `GET /user`) | Return generic authentication error. Clear state cookie. |
| Authenticated login **not equal to** `kwisdomk` | Return generic "Access denied" error. Clear state cookie. **Do not send the token to Decap.** |

The callback route must also:

1. Use `GITHUB_CLIENT_SECRET` **only server-side** — read from environment variables, never exposed to the browser.
2. **Fail closed** if `GITHUB_CLIENT_ID` or `GITHUB_CLIENT_SECRET` is missing.
3. Exchange the authorization code for an access token via `POST https://github.com/login/oauth/access_token` with `Accept: application/json`.
4. After receiving the token, call `GET https://api.github.com/user` with `Authorization: Bearer <token>` to retrieve the authenticated user's `login`.
5. Verify `login === 'kwisdomk'`. If not, discard the token and return a generic error.
6. **Clear the state cookie** on both success and failure paths (set `Max-Age=0`).
7. Set `Cache-Control: no-store` on the response.
8. **Never log** client secrets, authorization codes, state values, or access tokens.
9. Return **generic user-facing authentication errors** — never leak upstream GitHub API response bodies, error codes, or token data in error messages.
10. **Safely serialize** any success or error payload embedded into returned HTML/JavaScript (escape for safe embedding in `<script>` tags to prevent XSS via crafted GitHub responses).
11. Send the successful authorization message **only** to the exact target origin `https://kwaix.dev` using `window.opener.postMessage(message, 'https://kwaix.dev')`.
12. Close the popup after communicating success or failure to the Decap opener window.

### Decap postMessage Contract

The Decap CMS GitHub backend expects the OAuth callback popup to communicate results via `window.opener.postMessage()`. Based on the [Decap CMS backends-overview documentation](https://decapcms.org/docs/backends-overview/) and the [reference Cloudflare Worker proxy](https://github.com/sterlingwes/decap-proxy) linked from those docs:

**Success:**
```javascript
window.opener.postMessage(
  'authorization:github:success:' + JSON.stringify({ token: ACCESS_TOKEN, provider: 'github' }),
  'https://kwaix.dev'
);
```

**Error:**
```javascript
window.opener.postMessage(
  'authorization:github:error:' + JSON.stringify({ message: 'Authentication failed' }),
  'https://kwaix.dev'
);
```

> **NOTE:** The implementer must verify this contract against the actual Decap CMS version being loaded. If the pinned Decap version (determined during implementation) uses a different message format, the callback must match that version's expected format. The Decap CMS source repository (`packages/decap-cms-backend-github`) is the definitive reference.

---

## Decap Client Script Pinning

### Current State

```html
<script src="https://unpkg.com/decap-cms@^3.0/dist/decap-cms.js"></script>
```

The `@^3.0` semver range means the browser may fetch any `3.x` release published to npm at load time. This is unacceptable once the script receives a GitHub write token, because:

- A compromised or buggy future release could exfiltrate the token.
- Behavior changes between versions could break the OAuth flow or editorial workflow.
- There is no way to audit what code actually ran.

### Requirements

The implementation PR must:

1. **Replace the floating `@^3.0` reference with an exact reviewed Decap CMS release version.** Example: `decap-cms@3.3.3` (the exact version must be determined during implementation by checking [Decap CMS releases](https://github.com/decaporg/decap-cms/releases)).
2. **Prefer the pinned stable release that is current at the time of implementation** — do not choose an arbitrary old version without verification.
3. **Document in the PR** whether the script remains CDN-hosted via `unpkg.com` or is served locally from the project's `public/` directory.
4. **State that local hosting or Subresource Integrity (SRI) may be evaluated** if technically compatible, but **exact version pinning is the minimum required gate** before enabling production OAuth.
5. Do not choose a version without verifying it is a stable release and has been tested with the OAuth flow during implementation.

---

## Required Accounts And Environment Variables

### GitHub OAuth App

| Field | Value |
|---|---|
| Application name | `kwaix-cms` (or Wisdom's preferred name) |
| Homepage URL | `https://kwaix.dev` |
| Authorization callback URL | `https://kwaix.dev/api/callback` |

Created under the `kwisdomk` GitHub account at [github.com/settings/developers](https://github.com/settings/developers) → OAuth Apps → New OAuth App.

> **IMPORTANT:** GitHub OAuth Apps permit **a single authorization callback URL**. The callback must be exactly `https://kwaix.dev/api/callback`. Do not add preview deployment URLs.

### Environment Variables

The following variables are required in **Vercel Production environment only** unless an explicit staging setup is later approved:

| Variable | Where | Scope |
|---|---|---|
| `GITHUB_CLIENT_ID` | Vercel → Project Settings → Environment Variables | Production only |
| `GITHUB_CLIENT_SECRET` | Vercel → Project Settings → Environment Variables | Production only |

**Security rules for these variables:**

- Real secret values must **never** be committed to the repository.
- Must **never** be placed in CMS config (`config.yml`).
- Must **never** be exposed via `NEXT_PUBLIC_` prefix.
- Must **never** be printed in logs or console output.
- Must **never** be inserted into client-side HTML or JavaScript (except the access token returned to Decap via the postMessage flow after successful authentication and authorization).

### No `.env.example`

The repository previously removed `.env.example` intentionally. This plan does **not** re-introduce it. Required production environment variables are documented here and should be recorded in the existing CMS/deployment documentation under `docs/` during implementation.

For local development, developers use `.env.local` (already in `.gitignore`).

---

## Implementation Steps

### Step 1: Create a GitHub OAuth App

1. Go to [github.com/settings/developers](https://github.com/settings/developers) (logged in as `kwisdomk`)
2. Click **"OAuth Apps"** → **"New OAuth App"**
3. Fill in:

| Field | Value |
|---|---|
| Application name | `kwaix-cms` (or approved name) |
| Homepage URL | `https://kwaix.dev` |
| Authorization callback URL | `https://kwaix.dev/api/callback` |

4. Click **"Register application"**
5. Copy the **Client ID** (visible immediately)
6. Generate and copy the **Client Secret** (shown once — save securely)

**Success:** You have a Client ID and Client Secret. The OAuth App appears in your GitHub developer settings.

### Step 2: Set Vercel Environment Variables

Go to **Vercel Dashboard** → **Project (tjowk)** → **Settings** → **Environment Variables**

Add:

| Variable | Value | Environments |
|---|---|---|
| `GITHUB_CLIENT_ID` | *(from Step 1)* | Production only |
| `GITHUB_CLIENT_SECRET` | *(from Step 1)* | Production only |

> **CAUTION:** `GITHUB_CLIENT_SECRET` must **never** be committed, exposed via `NEXT_PUBLIC_`, or logged. It enables anyone to generate tokens scoped to the OAuth App.

### Step 3: Pin the Decap CMS Client Script

In `public/admin/index.html`, replace:

```html
<script src="https://unpkg.com/decap-cms@^3.0/dist/decap-cms.js"></script>
```

with an exact version reference, e.g.:

```html
<script src="https://unpkg.com/decap-cms@3.X.Y/dist/decap-cms.js"></script>
```

The exact version (`3.X.Y`) must be determined during implementation by checking the [Decap CMS releases page](https://github.com/decaporg/decap-cms/releases) and selecting the current stable release. Test that version with the OAuth flow before finalizing.

### Step 4: Create the OAuth API Routes

Create two new files. These are Next.js App Router API route handlers that run as Vercel serverless functions.

#### `app/api/auth/route.ts`

**What it does:** When Decap CMS initiates login, it opens a popup to this URL. This route:
1. Reads `GITHUB_CLIENT_ID` from the server environment.
2. Fails closed if the variable is missing.
3. Generates a cryptographically random `state` parameter.
4. Stores `state` in a short-lived `HttpOnly; Secure; SameSite=Lax; Path=/api/callback; Max-Age=600` cookie.
5. Redirects the popup to `https://github.com/login/oauth/authorize` with `client_id`, `redirect_uri=https://kwaix.dev/api/callback`, `scope=public_repo`, and the `state`.
6. Sets `Cache-Control: no-store`.

#### `app/api/callback/route.ts`

**What it does:** GitHub redirects back here with an authorization `code` and the `state` parameter. This route:
1. Validates `code` and `state` are present and `state` matches the cookie.
2. Handles GitHub denial/error responses.
3. Exchanges the `code` for an access token via `POST https://github.com/login/oauth/access_token` using `GITHUB_CLIENT_SECRET` server-side.
4. Calls `GET https://api.github.com/user` with the token to identify the authenticated user.
5. **Verifies `login === 'kwisdomk'`.** If not, discards the token and returns a generic error.
6. On success, returns an HTML page with a `<script>` that calls `window.opener.postMessage()` with the token using the Decap contract and target origin `https://kwaix.dev`.
7. On any failure, returns an HTML page that sends an error message via `postMessage` and closes the popup.
8. Clears the state cookie on both success and failure.
9. Sets `Cache-Control: no-store`.

**No new npm packages are required.** Both routes use only `NextRequest`, `NextResponse`, and native `fetch`/`crypto`.

### Step 5: Update `config.yml`

Add `base_url`, `auth_endpoint`, and `auth_scope` to the backend section:

```yaml
backend:
  name: github
  repo: kwisdomk/tjowk
  branch: main
  base_url: https://kwaix.dev
  auth_endpoint: api/auth
  auth_scope: public_repo
```

**What this changes:**
- `base_url` tells Decap where the OAuth proxy lives (same domain as the site).
- `auth_endpoint` tells Decap which path to open in the popup (relative to `base_url`). Decap will open a popup to `https://kwaix.dev/api/auth`.
- `auth_scope` tells Decap to request `public_repo` scope instead of the default.

**What stays the same:** All collection definitions, media settings, editorial workflow. No other changes needed.

### Step 6: Handle the `fix/decap-config-path` Branch

The existing branch `fix/decap-config-path` (commit `9cda577`) adds an explicit `<link rel="cms-config-url">` entry to `public/admin/index.html`:

```html
<link href="/admin/config.yml" type="text/yaml" rel="cms-config-url" />
```

**Context:**
- `/admin/config.yml` is Decap CMS's conventional default config path. Decap typically discovers the config file at this path automatically when the admin page is served from `/admin/`.
- The explicit `<link>` tag may still be retained for clarity or to resolve observed config-loading behavior in specific Decap versions or deployment environments.
- This change is **not confirmed mandatory** without testing — it should be verified during implementation.

**Decision point (for Wisdom):**
- **Option A:** Merge `fix/decap-config-path` as a separate PR before the auth work, so its effect on config loading can be verified independently.
- **Option B:** Include the change in the `feat/cms-auth` branch after verifying its effect alongside the other modifications.

Either way, the work in `fix/decap-config-path` must not be accidentally lost or duplicated.

### Step 7: Update CMS/Deployment Documentation

Update existing documentation under `docs/` to record:
- The required `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` environment variables.
- That these are set in Vercel Production only.
- How to create and manage the GitHub OAuth App.
- The single-owner access policy.

### Step 8: Deploy via Branch → PR → Merge

**Do not push directly to `main`.** Use a feature branch:

```
Branch name: feat/cms-auth
```

1. Create branch from latest `main`.
2. Add the two API route files.
3. Update `config.yml`.
4. Pin the Decap script version in `index.html`.
5. Update documentation under `docs/`.
6. Handle the `fix/decap-config-path` change per the decision above.
7. Push the branch.
8. Vercel creates a **preview deployment**.
9. Perform preview verification (see Verification Plan below — note that the OAuth callback URL is registered for `kwaix.dev`, so full OAuth flow cannot complete on preview).
10. Create PR → code review → merge to `main`.
11. Vercel auto-deploys production.

### Step 9: Post-Deploy — Verify Production CMS Workflow

After merge and production deploy, perform the full verification plan below.

---

## Configuration Changes

### Planned `config.yml` Backend Section

```yaml
backend:
  name: github
  repo: kwisdomk/tjowk
  branch: main
  base_url: https://kwaix.dev
  auth_endpoint: api/auth
  auth_scope: public_repo
```

---

## Verification Plan

### Static/Build Verification

| # | Check | Expected Result |
|---|---|---|
| 1 | Confirm only approved files changed in `git diff`. | Only files listed in "Files Expected To Change" section are modified. |
| 2 | Confirm no secrets appear in `git diff`. | No client secrets, API keys, tokens, or OAuth codes in any changed file. |
| 3 | Confirm Decap script is pinned to an exact reviewed version. | `index.html` references a specific version like `decap-cms@3.X.Y`, not `@^3.0`. |
| 4 | Run `npm run build`. | Build succeeds with no TypeScript errors. |
| 5 | Confirm `/admin/` serves the admin page and config file. | `public/admin/index.html` and `public/admin/config.yml` are present in the build output. |

### Auth Route Verification

| # | Check | Expected Result |
|---|---|---|
| 6 | `GET /api/auth` | Returns a redirect (307 or 302) to `https://github.com/login/oauth/authorize`. |
| 7 | Redirect URL contains `client_id` parameter. | Matches the configured `GITHUB_CLIENT_ID`. |
| 8 | Redirect URL contains `redirect_uri=https://kwaix.dev/api/callback`. | Exact match. |
| 9 | Redirect URL contains `scope=public_repo`. | Exact match — not `repo`, not `repo,user`. |
| 10 | Redirect URL contains non-empty `state` parameter. | Random value, different on each request. |
| 11 | Response sets a state cookie. | Cookie is `HttpOnly`, `Secure`, `SameSite=Lax`, has short `Max-Age`, `Path=/api/callback`. |
| 12 | Missing `GITHUB_CLIENT_ID` fails closed. | Returns HTTP 500 with a generic error message. Does not reveal which variable is missing. |

### Callback Security Verification

| # | Check | Expected Result |
|---|---|---|
| 13 | Missing `code` parameter. | Returns generic authentication error HTML. State cookie cleared. |
| 14 | Missing `state` parameter. | Returns generic authentication error HTML. State cookie cleared. |
| 15 | Mismatched `state` (does not match cookie). | Returns generic authentication error HTML. State cookie cleared. |
| 16 | GitHub authorization denial (`error` parameter present). | Returns generic authentication error HTML. State cookie cleared. |
| 17 | Failed token exchange (simulate with invalid code). | Returns generic authentication error HTML. State cookie cleared. |
| 18 | Non-`kwisdomk` login (test with a different GitHub account). | Returns generic "Access denied" error. **No token sent to Decap.** State cookie cleared. |
| 19 | Success response uses `window.opener.postMessage`. | Message sent only to target origin `https://kwaix.dev`. |
| 20 | Auth responses specify `Cache-Control: no-store`. | Present on both auth and callback responses. |
| 21 | No token, secret, or OAuth code appears in Vercel function logs. | Review function logs after test requests. |

### Production CMS Workflow Verification

| # | Check | Expected Result |
|---|---|---|
| 22 | `https://kwaix.dev/admin/` loads. | Decap CMS loads, "Login with GitHub" button visible. |
| 23 | `kwisdomk` can log in using GitHub. | Popup opens to GitHub OAuth page, authorization succeeds, popup closes, CMS dashboard loads. |
| 24 | All configured collections load. | All 6 collections (Profile, Status, Certifications, Timeline, Projects, Journal) visible. |
| 25 | Edit a low-risk field: `content/status.json` → change `secondaryOp`. | Field editable, save as draft works. |
| 26 | Save as draft and confirm expected GitHub branch/PR behavior. | A new branch `cms/status/status` (or similar) and PR appear on GitHub. |
| 27 | Publish via editorial workflow. | PR merges, branch deleted. |
| 28 | Confirm Vercel rebuilds and the live content updates. | `https://kwaix.dev` reflects the updated status text. |
| 29 | Restore the temporary test text through a second approved CMS update. | The site does not retain verification copy. |

### Build Safeguard Verification

| # | Check | Expected Result |
|---|---|---|
| 30 | In an **isolated test branch only**, introduce an invalid content shape (e.g., remove required `name` from `profile.json`). | Zod validation fails during `npm run build`. |
| 31 | Push the invalid branch to trigger a Vercel preview build. | Vercel build fails. |
| 32 | Confirm failed builds do not replace the last healthy Vercel production deployment. | The production deployment remains the previous successful one. |
| 33 | **Do not merge the invalid content branch to `main`.** | Delete the test branch after verification. |

---

## Rollback Plan

### How to Disable CMS Auth Without Affecting the Public Website

1. In `public/admin/config.yml`, remove `base_url`, `auth_endpoint`, and `auth_scope` from the backend section.
2. Push to `main`. Vercel auto-deploys.
3. The CMS returns to the pre-auth state (login button fails, but the public website is completely unaffected).
4. Alternatively: delete `app/api/auth/` and `app/api/callback/` directories and revert `config.yml`. This fully removes the OAuth routes.

### How to Revoke the GitHub OAuth App or Rotate Its Secret

1. Go to [github.com/settings/developers](https://github.com/settings/developers) → OAuth Apps → `kwaix-cms`.
2. To **rotate the secret:** Click "Generate a new client secret". Update the `GITHUB_CLIENT_SECRET` in Vercel. The old secret is immediately invalidated.
3. To **revoke entirely:** Click "Delete application". All issued tokens are revoked. The CMS can no longer authenticate until a new OAuth App is created and configured.

### How to Roll Back a Valid-But-Wrong CMS Content Publish

1. **First defense:** Zod validation. If the published content doesn't match the schema, `next build` fails and Vercel does not promote the deployment. The previous production deployment remains live.
2. **If Zod didn't catch it** (valid schema but wrong content):
   ```bash
   git log --oneline -5   # find the merge commit from CMS
   git revert <commit>    # create a revert commit
   git push origin main   # Vercel auto-deploys the reverted state
   ```
3. **Instant rollback without git:** In Vercel Dashboard → Deployments → click the previous working deployment → "Promote to Production".

### How to Handle a Failed Vercel Production Deployment

1. Vercel does **not** promote failed deployments. The last successful deployment remains live.
2. If a deployment succeeds but the site is broken:
   - Use Vercel Dashboard → Deployments → "Promote to Production" on the last known-good deployment.
   - Fix the issue in a branch, push, and let Vercel build.
3. Verify that production returns to a healthy state by loading `https://kwaix.dev` and confirming expected content and functionality.

---

## Correct GitHub OAuth Callback and Preview-Testing Guidance

GitHub OAuth Apps permit **a single authorization callback URL**. The production OAuth App callback must be:

```
https://kwaix.dev/api/callback
```

**Do not configure production OAuth secrets for arbitrary preview deployments by default.**

### What Can Be Verified on Preview Deployments

- TypeScript compilation and build success.
- Admin assets loading (`/admin/index.html`, `/admin/config.yml`).
- Auth route behavior: verify `/api/auth` constructs the correct redirect URL without completing real OAuth (inspect the redirect location).
- Callback route behavior: verify missing/invalid parameters return appropriate error responses.
- Review redirect URL construction without exposing secrets.

### What Must Be Verified in Production

- End-to-end login and editorial workflow (full OAuth flow requires the registered callback URL).
- This is performed **once in production** after the reviewed PR is merged.

### If Full Preview OAuth Testing Becomes Necessary

Use a **separate staging OAuth App** with its own Client ID/Secret, configured with the specific preview deployment URL as its callback. This is a deliberate staging environment, not a production credential shared across arbitrary preview URLs. This should only be set up if needed later, and is not part of the initial implementation scope.

---

## Decisions Required From Wisdom

Before implementation begins, the following decisions need explicit approval:

1. **Approve Option A:** Same-site Next.js OAuth routes deployed on Vercel as the OAuth proxy architecture.

2. **Approve single-owner policy:** Only GitHub user `kwisdomk` can authenticate to `/admin`. All other GitHub logins are rejected at the callback route before any token reaches Decap.

3. **Approve least-privilege scope:** `public_repo` only while `kwisdomk/tjowk` remains a public repository.

4. **Choose OAuth App display name:** Recommended: `kwaix-cms`. If you have a preferred name, specify it.

5. **Decide whether the existing `fix/decap-config-path` change is merged separately or included in the auth PR** after verifying its effect:
   - **Option A:** Merge `fix/decap-config-path` → `main` as a separate PR first.
   - **Option B:** Include the change in the `feat/cms-auth` branch.

6. **Approve production-only end-to-end OAuth testing** with no production secrets in preview deployments.

---

## Files Expected To Change During Implementation

| Action | File |
|---|---|
| **CREATE** | `app/api/auth/route.ts` |
| **CREATE** | `app/api/callback/route.ts` |
| **MODIFY** | `public/admin/config.yml` (add `base_url`, `auth_endpoint`, `auth_scope`) |
| **MODIFY** | `public/admin/index.html` (pin Decap CMS script to exact version) |
| **MODIFY** | Existing CMS/deployment documentation under `docs/` (record environment variables and access policy) |

**Conditional item:**
- Include or merge the existing `fix/decap-config-path` change (commit `9cda577`) intentionally after verifying it. This modifies `public/admin/index.html` (already listed above).

**Not included:**
- `.env.example` (intentionally absent from the repository)
- No other source files, configuration files, content files, or deployment settings will be changed.

---

## Out Of Scope

The following items are explicitly excluded from this implementation plan:

- UI redesigns
- Horizontal timeline accessibility fixes
- Journal features
- Project content edits
- CV-derived content edits
- Analytics work
- Metadata or canonical-domain cleanup unrelated to CMS auth
- Dependency changes (unless unavoidable and clearly justified during implementation)
- `.env.example` creation
- CSP/security header changes in `next.config.ts`
- Any changes to `lib/content/loaders.ts` or `lib/content/schemas.ts`
- Any changes to `package.json` or new npm packages


## Canonical Domain Dependency

Before production CMS OAuth is implemented:

1. Vercel must use https://kwaix.dev as the primary production domain.
2. https://www.kwaix.dev must permanently redirect to https://kwaix.dev.
3. The GitHub OAuth App must be registered only after the production callback host is settled.
4. OAuth callback configuration must use https://kwaix.dev/api/callback.
5. Metadata, sitemap, robots, shared links, and CMS URLs must later be audited for apex-domain consistency.
