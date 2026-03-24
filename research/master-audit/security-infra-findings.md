# Security Infrastructure Audit — AI Compliance Documents
**Audited:** 2026-03-24
**Auditor:** Security Agent C (Infrastructure/Headers)
**Scope:** next.config.ts, all API routes, auth config, rate limiting, robots.ts, .gitignore, error handling, dependency review

---

## Summary Table

| # | Area | Severity | Status |
|---|------|----------|--------|
| 1 | HTTP Security Headers — completely absent | HIGH | Missing |
| 2 | Rate limiting is per-instance (in-memory on Vercel) | MEDIUM | By design, documented |
| 3 | Delivery token uses STRIPE_SECRET_KEY as HMAC secret | MEDIUM | Functional risk |
| 4 | IP spoofing via X-Forwarded-For header | MEDIUM | Exploitable |
| 5 | Google Analytics loaded without Subresource Integrity | LOW | Missing |
| 6 | No Content Security Policy — inline scripts present | HIGH | Missing |
| 7 | robots.txt excludes /api/ and /account/ | PASS | Good |
| 8 | .env files in .gitignore | PASS | Good |
| 9 | Error pages do not leak stack traces in production | PASS | Good |
| 10 | Stripe webhook signature verification in place | PASS | Good |
| 11 | No source maps referenced in production HTML | PASS | Good (observed) |
| 12 | No CORS configuration found | INFO | Review needed |
| 13 | Cookie security flags delegated to next-auth defaults | INFO | Verify |
| 14 | next-auth beta dependency in production | LOW | Risk |

---

## Finding 1 — HTTP Security Headers Completely Absent
**Severity: HIGH**

### Issue
`next.config.ts` contains only MDX config and redirects. There is no `async headers()` block. None of the following headers are set:

- `Content-Security-Policy` (CSP)
- `Strict-Transport-Security` (HSTS)
- `X-Frame-Options`
- `X-Content-Type-Options`
- `Permissions-Policy`
- `Referrer-Policy`
- `X-DNS-Prefetch-Control`

### Impact
Without these headers, the site is vulnerable to:
- **Clickjacking** (no X-Frame-Options / CSP frame-ancestors): the site can be embedded in an iframe by any third party
- **MIME-type sniffing attacks** (no X-Content-Type-Options: nosniff): browsers may misinterpret file types
- **Protocol downgrade attacks** (no HSTS): users can be redirected from HTTPS to HTTP
- **Data leakage via Referer header** (no Referrer-Policy): full URL including query parameters sent to third parties
- **Overly permissive browser features** (no Permissions-Policy): camera, microphone, geolocation etc. not locked down

This is the single most impactful infrastructure gap. Most automated security scanners (SecurityHeaders.com, Mozilla Observatory) would rate this an F.

### Suggested Fix
Add a `headers()` function to `next.config.ts`:

```ts
async headers() {
  return [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
        {
          key: "Content-Security-Policy",
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://js.stripe.com",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: https:",
            "font-src 'self' https://fonts.gstatic.com",
            "connect-src 'self' https://www.google-analytics.com https://js.stripe.com",
            "frame-src https://js.stripe.com",
            "frame-ancestors 'none'",
          ].join("; "),
        },
      ],
    },
  ];
},
```

Note: `'unsafe-inline'` is required for the inline `<Script>` tags in `layout.tsx` (Google Analytics init and dark-mode init). The long-term fix is to move those scripts to external files to allow removal of `'unsafe-inline'` from script-src.

---

## Finding 2 — Rate Limiting is Per-Instance (In-Memory on Vercel)
**Severity: MEDIUM**

### Issue
`src/lib/rate-limit.ts` uses an in-memory `Map` store. On Vercel, each serverless function instance has its own isolated memory. A distributed attacker can bypass the rate limiter by spreading requests across instances. The code itself acknowledges this: *"Works per-instance (not globally across Vercel instances), but provides meaningful protection against unsophisticated abuse on low-traffic sites."*

### Limits currently in place (per-instance):
| Endpoint | Limit | Window |
|----------|-------|--------|
| `/api/create-checkout` | 10 req | 60 sec |
| `/api/contact` | 5 req | 15 min |
| `/api/send-documents` | 3 req | 15 min |
| `/api/verify-payment` | 10 req | 60 sec |

### Impact
A moderately sophisticated attacker (or a burst from a single IP hitting multiple cold instances) bypasses these limits entirely. On a low-traffic site, this is acceptable risk for the contact form. For `/api/create-checkout` and `/api/send-documents`, the exposure is more meaningful:
- Checkout: spam Stripe checkout session creation (each call creates a Stripe API request)
- Send-documents: the in-memory `usedTokens` Set is also per-instance — a valid token could potentially be replayed against a different cold instance before it is marked used

### Suggested Fix
For now, the current approach is correctly acknowledged and appropriate for site traffic volume. When traffic grows:
- **Upstash Redis** (recommended for Vercel): free tier, edge-compatible, drop-in replacement
- The `usedTokens` replay protection in `send-documents` should be moved to Redis or the database to be instance-safe

---

## Finding 3 — Delivery Token Uses STRIPE_SECRET_KEY as HMAC Secret
**Severity: MEDIUM**

### Issue
`src/lib/delivery-token.ts` derives its HMAC signing secret from `process.env.STRIPE_SECRET_KEY`:

```ts
function getSecret(): string {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    throw new Error("STRIPE_SECRET_KEY is not set — delivery tokens cannot be issued.");
  }
  return secret;
}
```

### Impact
This creates secret key conflation — one key serves two unrelated purposes. If `STRIPE_SECRET_KEY` ever needs to be rotated (key compromise, Stripe policy change, staff turnover), rotating it also invalidates all outstanding delivery tokens for the 60-minute window. More importantly, if the delivery token algorithm is ever found to have a flaw, investigation requires examining both systems simultaneously. This is a separation-of-concerns violation.

### Suggested Fix
Introduce a dedicated `DELIVERY_TOKEN_SECRET` environment variable:

```ts
function getSecret(): string {
  const secret = process.env.DELIVERY_TOKEN_SECRET || process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    throw new Error("DELIVERY_TOKEN_SECRET is not set.");
  }
  return secret;
}
```

Set `DELIVERY_TOKEN_SECRET` in Vercel environment variables. This is non-breaking — existing tokens remain valid until they expire (60 min).

---

## Finding 4 — IP Address Spoofing via X-Forwarded-For
**Severity: MEDIUM**

### Issue
`src/lib/rate-limit.ts` extracts the client IP by taking the **first** value from `X-Forwarded-For`:

```ts
const forwarded = request.headers.get("x-forwarded-for");
if (forwarded) {
  return forwarded.split(",")[0].trim();
}
```

On Vercel, `X-Forwarded-For` is set by the CDN and is trustworthy — Vercel prepends the real client IP. However, the header format is `client, proxy1, proxy2`. Taking `[0]` is correct for Vercel specifically. The risk is: **if the deployment platform ever changes** (e.g., self-hosted behind a different proxy), an attacker could send `X-Forwarded-For: 1.2.3.4` to spoof any IP and bypass rate limiting entirely.

### Impact
Full rate limit bypass for all IP-keyed endpoints. Low risk on Vercel today; medium risk if infra ever migrates.

### Suggested Fix
For Vercel specifically, the last (rightmost) untrusted proxy value is the Vercel edge, so `[0]` is correct. Document this assumption explicitly in the code. For forward-compatibility:

```ts
// On Vercel, the CDN always prepends the real client IP as the first entry.
// If this app moves off Vercel, re-evaluate which entry to trust.
return forwarded.split(",")[0].trim();
```

---

## Finding 5 — Google Analytics Loaded Without Subresource Integrity (SRI)
**Severity: LOW**

### Issue
`src/app/layout.tsx` loads Google Analytics via a `<Script>` tag:

```tsx
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-7KYPZS9H9P"
  strategy="afterInteractive"
/>
```

No `integrity` attribute is present. This means if Google's CDN were compromised, or if the measurement ID were hijacked, arbitrary JavaScript could run in the user's browser with no browser-level protection.

### Impact
Supply chain risk. Google's CDN is highly reliable, but SRI is a defense-in-depth measure. Also relevant: without a CSP, there is no fallback defense either (see Finding 1).

### Suggested Fix
This is a known limitation of dynamically-versioned CDN scripts — Google updates `gtag.js` frequently, so a static SRI hash would break on each update. The practical mitigation is:
1. Implement CSP (Finding 1) with `connect-src` restricted to `https://www.google-analytics.com`
2. Accept the SRI gap for this specific script given Google's CDN reliability
3. Consider self-hosting `gtag.js` if SRI compliance becomes a requirement

---

## Finding 6 — No Content Security Policy + Inline Scripts Present
**Severity: HIGH** (linked to Finding 1, called out separately due to inline script risk)

### Issue
`layout.tsx` contains two inline `<Script>` blocks:
1. Google Analytics initialization (writes to `window.dataLayer`)
2. Dark mode initialization (reads `localStorage`, sets `classList`)

Without a CSP, any XSS vulnerability anywhere on the site would allow an attacker to execute arbitrary JavaScript in the same origin context, with access to cookies, localStorage, and the ability to make authenticated API calls.

### Impact
The combination of: no CSP + inline scripts + Stripe checkout flow + auth session cookies = high XSS risk surface. If any component (e.g., MDX-rendered content, search results) ever renders unsanitized user input, there is no header-level safety net.

### Suggested Fix
See Finding 1 for the CSP header. Additionally, the dark-mode script could be moved to a `.js` file and referenced by `src=` to eliminate one inline script, enabling a stricter CSP in the future.

---

## Finding 7 — robots.ts Excludes Sensitive Paths (PASS)
**Severity: N/A — Good Practice Confirmed**

`src/app/robots.ts` correctly disallows:
- `/api/` — all API endpoints
- `/review-` — obfuscated review preview pages
- `/account/` — authenticated account pages

The specific AI bot allowlist (GPTBot, ClaudeBot, Bingbot, etc.) is intentional and appropriate for an SEO-forward site.

No issues found.

---

## Finding 8 — .env Files in .gitignore (PASS)
**Severity: N/A — Good Practice Confirmed**

`.gitignore` correctly excludes:
- `.env`
- `.env.local`
- `.env.production`
- `.env*.local`

No credential leakage risk from git history.

---

## Finding 9 — Error Pages Do Not Leak Stack Traces in Production (PASS)
**Severity: N/A — Good Practice Confirmed**

`src/app/products/[slug]/error.tsx` conditionally shows error messages only in development:

```tsx
{process.env.NODE_ENV === "development" && error?.message && (
  <pre className="...">
    {error.message}
  </pre>
)}
```

`src/app/global-error.tsx` shows only a generic "Something went wrong" message.

All API routes return generic error messages — no stack traces, no internal paths, no database error details exposed.

---

## Finding 10 — Stripe Webhook Signature Verification (PASS)
**Severity: N/A — Good Practice Confirmed**

`src/app/api/webhooks/stripe/route.ts` correctly:
- Reads raw body via `request.text()` (required for signature verification)
- Checks for `stripe-signature` header before processing
- Uses `stripe.webhooks.constructEvent()` to cryptographically verify the payload
- Returns 500 (triggering Stripe retry) on database errors, not swallowing them silently

---

## Finding 11 — Source Maps Not Exposed in Production HTML (PASS)
**Severity: N/A — Observed Good Practice**

WebFetch of the live site found no `.js.map` references in the HTML response. Next.js by default does not serve source maps in production builds. No `productionBrowserSourceMaps: true` flag found in `next.config.ts`.

---

## Finding 12 — No Explicit CORS Configuration (INFO)
**Severity: INFO**

No `Access-Control-Allow-Origin` or other CORS headers were found anywhere in the codebase. Next.js API routes do not set permissive CORS by default — they respond to same-origin requests and reject cross-origin preflight requests unless explicitly configured.

### Assessment
This is **acceptable** for this site's use case. All API routes are called by the site's own frontend (same origin). No third-party integrations need cross-origin API access. The absence of CORS headers means the API endpoints are locked to same-origin by default browser behavior.

If a third-party integration ever needs API access, CORS headers should be added explicitly and scoped to specific allowed origins — not set to `*`.

---

## Finding 13 — Cookie Security Flags Delegated to next-auth (INFO)
**Severity: INFO**

`src/lib/auth.ts` delegates session and cookie management entirely to next-auth v5. No custom cookie configuration is present. next-auth v5 sets the following cookie defaults in production:
- `httpOnly: true`
- `secure: true` (on HTTPS)
- `sameSite: "lax"`
- `path: "/"`

These are appropriate defaults. No custom override was found that would weaken them.

### Verification Recommended
Confirm in Vercel's production response headers that `Set-Cookie` from the auth endpoint carries these flags. This audit reviewed source code only.

---

## Finding 14 — next-auth Beta Dependency in Production
**Severity: LOW**

### Issue
`package.json` specifies:
```json
"next-auth": "^5.0.0-beta.30"
```

This is a beta release used in production. Beta software may have unannounced security fixes not tracked by standard vulnerability databases (npm audit, Snyk). The `^` range means `npm install` could auto-update to a future beta with breaking changes.

### Impact
Low immediate risk — next-auth is widely used and actively maintained. The risk is that security patches in beta versions may not appear in CVE databases, making vulnerability monitoring less reliable.

### Suggested Fix
Pin to a specific beta version (remove `^`) to prevent unexpected auto-updates:
```json
"next-auth": "5.0.0-beta.30"
```
Monitor the next-auth GitHub releases page for security advisories and upgrade deliberately.

---

## Finding 15 — Dependency Vulnerability Review
**Severity: INFO**

Key dependencies reviewed from `package.json`:

| Package | Version | Notes |
|---------|---------|-------|
| `next` | `^16.2.1` | Current major version — no known critical CVEs at audit date |
| `stripe` | `^20.4.1` | Current major version — good |
| `next-auth` | `^5.0.0-beta.30` | See Finding 14 |
| `jspdf` | `^4.2.1` | No known critical CVEs — used client-side for PDF generation |
| `jszip` | `^3.10.1` | No known critical CVEs |
| `@neondatabase/serverless` | `^1.0.2` | Current — good |
| `gray-matter` | `^4.0.3` | No known critical CVEs |
| `react` | `19.2.3` | Current major version — good |

**Recommendation:** Run `npm audit` regularly. Consider integrating Dependabot or Snyk for automated vulnerability monitoring. No critical known vulnerabilities identified at time of audit.

---

## Priority Action List

1. **[HIGH — Do First]** Add HTTP security headers to `next.config.ts` — X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, HSTS, and CSP. This is a single file change with broad security impact.

2. **[HIGH — Do Second]** Move inline `<Script>` blocks in `layout.tsx` to external `.js` files to enable a strict CSP without `'unsafe-inline'`.

3. **[MEDIUM]** Add a dedicated `DELIVERY_TOKEN_SECRET` environment variable in Vercel and update `delivery-token.ts` to use it instead of `STRIPE_SECRET_KEY`.

4. **[MEDIUM]** Upgrade rate limiting to Upstash Redis when Vercel instance count grows or if abuse is detected. The in-memory approach is acceptable at current traffic volume.

5. **[LOW]** Pin `next-auth` to an exact version. Set up Dependabot or `npm audit` in CI.

---

*Audit complete. No critical vulnerabilities found. The codebase demonstrates solid security fundamentals — proper webhook verification, no stack trace leakage, correct robots.txt, secrets in environment variables, SQL parameterization throughout. The primary gap is the complete absence of HTTP security response headers.*
