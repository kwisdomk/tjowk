import { NextRequest, NextResponse } from "next/server";

const SITE_ORIGIN = "https://kwaix.dev";
const CALLBACK_URL = `${SITE_ORIGIN}/api/callback`;

/**
 * Escape a string for safe embedding inside a JavaScript string literal
 * within an inline `<script>` block. Prevents breaking out of the script
 * context via `</script>`, HTML entities, or invisible line terminators.
 */
function safeSerializeForInlineScript(value: string): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

/**
 * Build a nonce for Content-Security-Policy. 16 random bytes → Base64.
 */
function generateNonce(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return btoa(String.fromCharCode(...bytes));
}

const COOKIE_CLEAR_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: "lax" as const,
  path: "/api/callback",
  maxAge: 0,
};

/**
 * Clear both OAuth cookies (state and PKCE verifier).
 */
function clearOAuthCookies(response: NextResponse) {
  response.cookies.set({ name: "github_oauth_state", value: "", ...COOKIE_CLEAR_OPTIONS });
  response.cookies.set({ name: "github_oauth_code_verifier", value: "", ...COOKIE_CLEAR_OPTIONS });
}

/**
 * Set hardened response headers shared by all callback responses.
 */
function setHardenedHeaders(response: NextResponse, nonce: string) {
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("Referrer-Policy", "no-referrer");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set(
    "Content-Security-Policy",
    `default-src 'none'; script-src 'nonce-${nonce}'; style-src 'none'; img-src 'none'; font-src 'none'; connect-src 'none'; frame-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'`,
  );
}

/**
 * Return an HTML response that performs the Decap popup handshake, posts an
 * error message to the opener, then closes the popup.
 */
function errorResponse(errorText: string) {
  const nonce = generateNonce();

  // Build the complete Decap postMessage string server-side
  const message = `authorization:github:error:${JSON.stringify({ message: errorText })}`;
  const serializedMessage = safeSerializeForInlineScript(message);

  const html = `<!DOCTYPE html>
<html>
<head><title>Authentication Error</title></head>
<body>
<p>Authentication failed. This window will close.</p>
<script nonce="${nonce}">
(function() {
  function receiveMessage(e) {
    if (e.origin !== ${safeSerializeForInlineScript(SITE_ORIGIN)}) return;
    if (e.source !== window.opener) return;
    window.removeEventListener("message", receiveMessage, false);
    window.opener.postMessage(${serializedMessage}, ${safeSerializeForInlineScript(SITE_ORIGIN)});
    window.close();
  }
  window.addEventListener("message", receiveMessage, false);
  if (window.opener) {
    window.opener.postMessage("authorizing:github", ${safeSerializeForInlineScript(SITE_ORIGIN)});
  }
})();
</script>
</body>
</html>`;

  const response = new NextResponse(html, {
    headers: { "Content-Type": "text/html" },
  });
  clearOAuthCookies(response);
  setHardenedHeaders(response, nonce);
  return response;
}

// Best-effort token revocation. Returns true if GitHub confirmed deletion.
async function revokeToken(
  clientId: string,
  clientSecret: string,
  accessToken: string,
): Promise<boolean> {
  try {
    const basicAuth = btoa(`${clientId}:${clientSecret}`);
    const res = await fetch(
      `https://api.github.com/applications/${clientId}/token`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Basic ${basicAuth}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ access_token: accessToken }),
      },
    );
    return res.ok;
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return errorResponse("Authentication configuration error");
  }

  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const errorParam = searchParams.get("error");

  const cookieState = request.cookies.get("github_oauth_state")?.value;
  const cookieVerifier = request.cookies.get("github_oauth_code_verifier")?.value;

  // Reject if any required parameter or cookie is missing/mismatched
  if (errorParam || !code || !state || !cookieState || state !== cookieState || !cookieVerifier) {
    return errorResponse("Invalid or missing authorization parameters");
  }

  try {
    // Exchange authorization code for access token (with PKCE verifier and redirect_uri)
    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: CALLBACK_URL,
        code_verifier: cookieVerifier,
      }),
    });

    if (!tokenResponse.ok) {
      return errorResponse("Failed to exchange authorization code");
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      return errorResponse("No access token returned");
    }

    // Token is live. Revoke on ANY non-success path from here.
    let userData;
    try {
      const userResponse = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/vnd.github.v3+json",
        },
      });

      if (!userResponse.ok) {
        throw new Error("Failed to lookup authenticated user");
      }

      userData = await userResponse.json();
    } catch {
      await revokeToken(clientId, clientSecret, accessToken);
      return errorResponse("Failed to lookup authenticated user");
    }

    if (userData?.login !== "kwisdomk") {
      await revokeToken(clientId, clientSecret, accessToken);
      return errorResponse("Access denied");
    }

    // Build success response
    const nonce = generateNonce();

    // Build the complete Decap postMessage string server-side
    const message = `authorization:github:success:${JSON.stringify({ token: accessToken, provider: "github" })}`;
    const serializedMessage = safeSerializeForInlineScript(message);

    const html = `<!DOCTYPE html>
<html>
<head><title>Authentication Success</title></head>
<body>
<script nonce="${nonce}">
(function() {
  function receiveMessage(e) {
    if (e.origin !== ${safeSerializeForInlineScript(SITE_ORIGIN)}) return;
    if (e.source !== window.opener) return;
    window.removeEventListener("message", receiveMessage, false);
    window.opener.postMessage(${serializedMessage}, ${safeSerializeForInlineScript(SITE_ORIGIN)});
    window.close();
  }
  window.addEventListener("message", receiveMessage, false);
  if (window.opener) {
    window.opener.postMessage("authorizing:github", ${safeSerializeForInlineScript(SITE_ORIGIN)});
  }
})();
</script>
</body>
</html>`;

    const response = new NextResponse(html, {
      headers: { "Content-Type": "text/html" },
    });
    clearOAuthCookies(response);
    setHardenedHeaders(response, nonce);
    return response;

  } catch {
    return errorResponse("Internal authentication error");
  }
}
