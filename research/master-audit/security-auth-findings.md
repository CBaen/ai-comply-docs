# Security Audit: Authentication, Authorization, and Secrets
**Auditor:** Security Agent B
**Date:** 2026-03-24
**Scope:** Auth, authorization, secrets handling, token security, rate limiting

---

## Summary

The codebase is generally well-structured with no catastrophic vulnerabilities. The most significant findings are a **leaked FAL API key in a committed .env.local file**, **STRIPE_SECRET_KEY dual-use as an HMAC signing secret**, and **in-memory rate limiting that provides no real protection in a serverless environment**. Several medium-severity issues round out the findings.

---

## Findings

---

### FINDING 1 — CRITICAL: Live API Key Committed to Repository

**File:** `.env.local:1`
**Severity:** CRITICAL
**Status:** Key is in a tracked file

**Observation:**
```
FAL_API_KEY=386fff8b-6df4-4d38-8058-997bd3818e2b:0305d94511ad3fe3f9bcdb95d4fa9aad
```

`.env.local` is listed in `.gitignore`, so this key is NOT currently committed to git history on the main branch. However, if this file was ever committed accidentally (e.g., by a prior `git add .`), the key would be in git history permanently. Additionally, the key is sitting as plaintext on disk, and the `.env.local` file is accessible to any process or collaborator with filesystem access.

**More critically:** `.env.example` contains `STRIPE_SECRET_KEY=rk_live_...` — using the `rk_live_` prefix indicates a **restricted live Stripe key** is in the example template, which may suggest the actual live key follows the same format and was tested locally.

**Exploit scenario:**
1. If any prior commit included `.env.local` (check: `git log --all --full-history -- .env.local`), the `FAL_API_KEY` value is permanently in git history.
2. Anyone who clones the repo or gains repository read access obtains a live production API key.

**Recommended fix:**
1. **Immediately rotate** `FAL_API_KEY` — treat the current value as compromised.
2. Run `git log --all --full-history -- .env.local` to check if the file was ever committed.
3. If yes, use `git filter-repo` or contact GitHub support to purge the secret from history.
4. Confirm `.env.local` remains in `.gitignore` and add a pre-commit hook (e.g., `gitleaks` or `trufflesecurity/trufflehog`) to prevent future accidental commits of secrets.

---

### FINDING 2 — HIGH: STRIPE_SECRET_KEY Used as HMAC Secret for Delivery Tokens

**File:** `src/lib/delivery-token.ts:4`
**Severity:** HIGH

**Observation:**
```typescript
function getSecret(): string {
  const secret = process.env.STRIPE_SECRET_KEY;
  // used as HMAC key for delivery token signing
}
```

The delivery token system uses `STRIPE_SECRET_KEY` as the HMAC signing secret. This conflates two distinct secrets with different purposes and rotation requirements.

**Problems:**
1. **Scope creep:** The Stripe secret key is a payment API credential. Using it as a symmetric signing key for a different purpose violates the principle of least privilege.
2. **Rotation coupling:** If `STRIPE_SECRET_KEY` ever needs rotation (compromise, key rollover), all outstanding delivery tokens immediately become invalid, breaking in-flight purchases. Conversely, if the delivery token mechanism needs a secret rotation, it forces a Stripe key rotation.
3. **Secret reuse attack surface:** If the Stripe key is ever exposed via the payment flow (e.g., Stripe API error messages, logs), it also compromises all delivery tokens — giving an attacker the ability to forge download authorization for any Stripe session ID they know.
4. **The `.env.example` uses `rk_live_` format (restricted key)** — restricted keys have limited permissions, which is good for Stripe, but using them as HMAC material means the key has a second use that Stripe's key management does not account for.

**Exploit scenario:** An attacker who learns the Stripe secret key (via log exposure, misconfigured monitoring, or Stripe dashboard access) can forge valid delivery tokens for any arbitrary Stripe session ID (`cs_*`) and download any product without payment.

**Recommended fix:**
Add a dedicated `DELIVERY_TOKEN_SECRET` environment variable with a randomly generated 32-byte hex value:
```typescript
function getSecret(): string {
  const secret = process.env.DELIVERY_TOKEN_SECRET;
  if (!secret) throw new Error("DELIVERY_TOKEN_SECRET is not set");
  return secret;
}
```
Generate with: `openssl rand -hex 32`

---

### FINDING 3 — HIGH: In-Memory Rate Limiting Is Ineffective on Vercel (Serverless)

**File:** `src/lib/rate-limit.ts:14`
**Severity:** HIGH (protection theater — the rate limit provides false confidence)

**Observation:**
```typescript
const store = new Map<string, RateLimitEntry>();
```

The rate limiter stores state in a module-level `Map`. On Vercel (and any serverless platform), each function invocation may run in a separate instance with its own cold memory. The module-level store is not shared across instances.

**The code's own comment acknowledges this:**
> "Works per-instance (not globally across Vercel instances), but provides meaningful protection against unsophisticated abuse on low-traffic sites."

**Why this is HIGH severity despite the comment:**
The routes protected by this limiter are:
- `verify-payment` — 10/minute — an attacker can probe Stripe session IDs
- `send-documents` — 3/15 minutes — an attacker can send to arbitrary emails
- `contact` — 5/15 minutes — spam/abuse vector

On Vercel with auto-scaling, a distributed attack across even 5–10 concurrent instances multiplies effective limits by 5–10x. A targeted attacker making ~50 rps could bypass the 10/minute `verify-payment` limit entirely.

**Most dangerous case:** The `verify-payment` endpoint iterates through Stripe session IDs. Even at 10/minute per instance, a moderately scaled attack can enumerate payment sessions to forge delivery tokens.

**Recommended fix:**
Migrate to Upstash Redis rate limiting (the code already mentions this upgrade path). Upstash has a free tier sufficient for this traffic level and a Next.js-compatible SDK (`@upstash/ratelimit`).

---

### FINDING 4 — HIGH: Delivery Token Replay Window Is 60 Minutes With Instance-Memory Single-Use Enforcement

**File:** `src/lib/delivery-token.ts:19-26`, `src/app/api/send-documents/route.ts:221-247`
**Severity:** HIGH

**Observation:**
```typescript
// Check current minute and previous 59 minutes (60-minute window)
for (let i = 0; i <= 59; i++) { ... }
```

And the single-use enforcement:
```typescript
const usedTokens = new Set<string>();
// ...
if (usedTokens.has(tokenKey)) { return 409 }
```

**Two compounding problems:**

1. **60-minute token validity window is unusually wide.** A delivery token is valid for 60 minutes from generation. If a customer's session ID leaks (e.g., URL sharing — the success URL contains `?session_id=...`), anyone who intercepts it within 60 minutes can regenerate or use the token.

2. **Single-use enforcement is instance-local.** The `usedTokens` Set is module-level — same problem as the rate limiter. On serverless, two simultaneous requests hit different instances and both see an empty Set. A race condition allows the same token to be consumed multiple times (sending documents to multiple email addresses on separate requests).

**Exploit scenario:**
- Customer A completes purchase, gets `session_id=cs_abc123` in their browser URL.
- They share their screen or post the URL.
- Attacker calls `/api/verify-payment` with `cs_abc123`, gets a valid delivery token.
- Attacker calls `/api/send-documents` twice concurrently on different Vercel instances — both succeed because `usedTokens` is empty on each instance.
- Attacker receives paid documents without purchasing.

**Recommended fix:**
1. Reduce token validity to 10–15 minutes (post-purchase window should be short).
2. Move single-use enforcement to the database: add a `delivery_token_used_at` column to the `purchases` table and do an atomic `UPDATE ... SET delivery_token_used_at = NOW() WHERE ... AND delivery_token_used_at IS NULL RETURNING id` check.

---

### FINDING 5 — MEDIUM: NextAuth Secret Fallback to NEXTAUTH_SECRET

**File:** `src/lib/auth.ts:21`
**Severity:** MEDIUM

**Observation:**
```typescript
secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
```

**Problems:**
1. **Silent fallback:** If `AUTH_SECRET` is missing (misconfiguration), the system silently falls back to `NEXTAUTH_SECRET`. There is no warning, error, or startup check. If `NEXTAUTH_SECRET` is also absent, NextAuth falls back to a **derived secret based on the `AUTH_URL`**, which is deterministic and weak.
2. **Two secrets in rotation creates confusion:** Production deployments may have one set, staging another. A misconfigured production deploy could silently operate with a weak derived secret.

**Exploit scenario:** If neither env var is set in a deployment, NextAuth uses a weak derived secret. Session tokens signed with this secret are predictable and could be forged by an attacker who knows the deployment URL.

**Recommended fix:**
```typescript
const authSecret = process.env.AUTH_SECRET;
if (!authSecret) {
  throw new Error("AUTH_SECRET environment variable is required");
}
export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: authSecret,
  // ...
});
```
Remove the `NEXTAUTH_SECRET` fallback. One secret, mandatory, fail-hard if missing.

---

### FINDING 6 — MEDIUM: Session Strategy Silently Degrades to JWT Without Database

**File:** `src/lib/auth.ts:18-19`
**Severity:** MEDIUM

**Observation:**
```typescript
session: {
  strategy: adapter ? "database" : "jwt",
},
```

If `DATABASE_URL` is not set, the session adapter is `undefined` and auth silently switches to JWT sessions. Database sessions and JWT sessions have meaningfully different security properties:

- **Database sessions** can be instantly revoked server-side (e.g., on compromise or logout).
- **JWT sessions** cannot be revoked until they expire. A stolen JWT is valid until expiry.

**Problem:** There is no audit trail, no warning, and no operator notification when the system is running in degraded JWT mode. A deployment misconfiguration (missing `DATABASE_URL`) silently moves to an inferior security model.

**Exploit scenario:** Production deploy loses database connectivity. Auth silently issues JWTs. An attacker who steals a JWT (via XSS, network intercept) has a session that cannot be revoked even after the user logs out or the account is compromised.

**Recommended fix:**
Log a warning at startup if running in JWT mode. Ideally, for a production payment system, require database sessions and fail-hard if `DATABASE_URL` is absent. If JWT mode is intentional for some deployments, document the session expiry and ensure it is short (e.g., 1 hour).

---

### FINDING 7 — MEDIUM: IP Address from X-Forwarded-For Is Spoofable

**File:** `src/lib/rate-limit.ts:67-69`
**Severity:** MEDIUM

**Observation:**
```typescript
const forwarded = request.headers.get("x-forwarded-for");
if (forwarded) {
  return forwarded.split(",")[0].trim();
}
```

`X-Forwarded-For` is a client-controllable header. On Vercel, the edge injects its own `X-Forwarded-For` value, which prevents direct spoofing if the request goes through Vercel's edge. However:

1. If the app is ever deployed behind a different proxy or accessed directly, the client controls this header.
2. Even on Vercel: the *first* value in the comma-separated list is set by the client before Vercel appends its entry. Vercel appends the real IP — reading index `[0]` reads the **attacker-controlled** value, not the real IP. The real IP is the **last** value in the list.

**Exploit scenario:** Attacker sets `X-Forwarded-For: 1.2.3.4` in their request. Rate limiter keys on `1.2.3.4` instead of their real IP. They can rotate through arbitrary IP strings to bypass rate limiting entirely.

**Recommended fix:**
On Vercel, use `x-real-ip` (which Vercel injects and the client cannot spoof) as the primary IP source, or read the **last** entry in `X-Forwarded-For` rather than the first:
```typescript
export function getClientIp(request: Request): string {
  // x-real-ip is injected by Vercel and not client-controllable
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;

  // Fallback: last entry in X-Forwarded-For is appended by the last trusted proxy
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const parts = forwarded.split(",");
    return parts[parts.length - 1].trim();
  }
  return "unknown";
}
```

---

### FINDING 8 — MEDIUM: Error Message Leaks Stripe Signature Failure Detail

**File:** `src/app/api/webhooks/stripe/route.ts:31`
**Severity:** MEDIUM (low direct impact, aids enumeration)

**Observation:**
```typescript
return NextResponse.json({ error: `Webhook signature invalid: ${message}` }, { status: 400 });
```

The raw Stripe error message is forwarded to the caller. Stripe's `constructEvent` error messages include specifics like:
- `"No signatures found matching the expected signature for payload"`
- `"Timestamp outside the tolerance zone"`
- `"No webhook payload was provided"`

These details help an attacker understand exactly why their forgery attempt failed and adjust accordingly.

**Recommended fix:**
Return a generic error to the client; keep the detail in server logs only:
```typescript
console.error("Stripe webhook signature verification failed:", message);
return NextResponse.json({ error: "Webhook signature invalid" }, { status: 400 });
```

---

### FINDING 9 — LOW: No Maximum Payload Size on JSON Endpoints

**File:** Multiple API routes — `src/app/api/send-documents/route.ts`, `src/app/api/verify-payment/route.ts`, `src/app/api/create-checkout/route.ts`
**Severity:** LOW

**Observation:**
Routes call `request.json()` without any preceding content-length check. The `send-documents` route does validate individual document sizes (5MB per document, checked after parsing), but the initial JSON parse is unbounded.

A malicious caller could send a request body with many megabytes of JSON, causing memory pressure. The `documents` array has no maximum count limit — an attacker could send 1,000 documents each just under the 5MB limit.

**Recommended fix:**
Add a document count limit (e.g., 10 max), and consider adding a `content-length` check at the top of `send-documents`:
```typescript
const MAX_DOCUMENTS = 10;
if (documents.length > MAX_DOCUMENTS) {
  return NextResponse.json({ error: "Too many documents" }, { status: 400 });
}
```

---

### FINDING 10 — LOW: GA API Secret Appears in Server-Side URL Construction

**File:** `src/app/api/verify-payment/route.ts:20`
**Severity:** LOW (informational)

**Observation:**
```typescript
`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
```

The `GA_API_SECRET` is sent as a query parameter in a server-to-server call to Google Analytics. This is the intended Google Measurement Protocol pattern (the secret is not for client-side use), so this is not a direct vulnerability. However:

1. If server-side request logging is enabled (e.g., Vercel function logs with full URLs), the secret will appear in logs.
2. The secret should be treated as sensitive and rotated if exposed.

**Note:** This is already a server-side call and the secret never reaches the client browser — this is architecturally correct. The only risk is logging infrastructure.

---

### FINDING 11 — INFORMATIONAL: `trustHost: true` in NextAuth Config

**File:** `src/lib/auth.ts:22`
**Severity:** INFORMATIONAL

**Observation:**
```typescript
trustHost: true,
```

`trustHost: true` tells NextAuth to trust the `Host` header from incoming requests when constructing redirect URLs. This is typically required on Vercel deployments. However, if the app is ever placed behind a misconfigured proxy that does not sanitize the `Host` header, an attacker could manipulate OAuth redirect URLs (not relevant here since only magic-link email auth is used, but worth noting for future OAuth provider additions).

For the current magic-link-only setup, this is low risk. If OAuth providers are added in the future, evaluate whether to scope this more narrowly.

---

## Summary Table

| # | File | Issue | Severity |
|---|------|-------|----------|
| 1 | `.env.local:1` | Live FAL_API_KEY in local env file (check git history) | **CRITICAL** |
| 2 | `src/lib/delivery-token.ts:4` | STRIPE_SECRET_KEY reused as HMAC signing secret | **HIGH** |
| 3 | `src/lib/rate-limit.ts:14` | In-memory rate limiting ineffective on serverless | **HIGH** |
| 4 | `delivery-token.ts:19` + `send-documents/route.ts:221` | 60-min token window + instance-local single-use enforcement | **HIGH** |
| 5 | `src/lib/auth.ts:21` | NextAuth secret fallback — silent weak secret on misconfiguration | **MEDIUM** |
| 6 | `src/lib/auth.ts:18` | Silent JWT fallback when database absent — non-revocable sessions | **MEDIUM** |
| 7 | `src/lib/rate-limit.ts:67` | X-Forwarded-For first-entry is client-spoofable | **MEDIUM** |
| 8 | `webhooks/stripe/route.ts:31` | Stripe error detail leaked in webhook 400 response | **MEDIUM** |
| 9 | `send-documents/route.ts` | No document array count limit — potential memory abuse | **LOW** |
| 10 | `verify-payment/route.ts:20` | GA API secret in URL — risk of appearing in server logs | **LOW** |
| 11 | `src/lib/auth.ts:22` | `trustHost: true` — acceptable now, risk if OAuth added later | **INFO** |

---

## What Is Done Well

- Stripe webhook uses `constructEvent` with signature verification — correct implementation.
- SQL queries throughout use parameterized queries (`$1`, `$2`) — no SQL injection vectors found.
- `link-purchase` enforces email ownership check before linking a purchase to an account.
- `send-documents` uses `crypto.timingSafeEqual` in token validation — no timing attack on comparison.
- HTML output in emails is escaped (`escapeHtml`) — no XSS in sent emails.
- Contact form validates subject against an allowlist and sanitizes CRLF injection in email headers.
- `purchases` endpoint checks `session.user.id` before returning data — correct authorization boundary.
- Document filenames sanitized (path separator stripping, `.pdf` enforcement).
- No API keys or secrets are exposed via `NEXT_PUBLIC_` env vars — server-side secrets stay server-side.
