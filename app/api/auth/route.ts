import { NextRequest, NextResponse } from "next/server";

const SITE_ORIGIN = "https://kwaix.dev";
const CALLBACK_URL = `${SITE_ORIGIN}/api/callback`;

/**
 * Generate a cryptographically random Base64URL string for use as a PKCE
 * code verifier. RFC 7636 requires 43–128 characters from the unreserved set.
 * 32 random bytes → 43 Base64URL characters.
 */
function generateCodeVerifier(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  // Base64URL encode (no padding)
  const base64 = btoa(String.fromCharCode(...bytes));
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/**
 * Derive the S256 code challenge from a code verifier per RFC 7636 §4.2.
 */
async function generateCodeChallenge(verifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  const base64 = btoa(String.fromCharCode(...new Uint8Array(digest)));
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function GET(_request: NextRequest) {
  const clientId = process.env.GITHUB_CLIENT_ID;

  if (!clientId) {
    return new NextResponse("Authentication configuration error", { status: 500 });
  }

  // CSRF state
  const state = crypto.randomUUID();

  // PKCE verifier + challenge
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  // Build GitHub authorization URL
  const authUrl = new URL("https://github.com/login/oauth/authorize");
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("redirect_uri", CALLBACK_URL);
  authUrl.searchParams.set("scope", "public_repo");
  authUrl.searchParams.set("state", state);
  authUrl.searchParams.set("code_challenge", codeChallenge);
  authUrl.searchParams.set("code_challenge_method", "S256");

  const response = NextResponse.redirect(authUrl.toString());

  // State cookie
  response.cookies.set({
    name: "github_oauth_state",
    value: state,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/api/callback",
    maxAge: 600,
  });

  // PKCE verifier cookie
  response.cookies.set({
    name: "github_oauth_code_verifier",
    value: codeVerifier,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/api/callback",
    maxAge: 600,
  });

  response.headers.set("Cache-Control", "no-store");

  return response;
}
