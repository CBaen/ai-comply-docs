# Security & Data Integrity Audit — Lead Findings

**Auditor lens:** Adversarial (attacker reading codebase on GitHub)
**Date:** 2026-03-17
**Scope:** All session changes + security-critical routes

---

## Summary Verdict

The core payment and delivery security is **structurally sound**. The critical fixes (delivery token, CRLF injection, webhook signature) were applied correctly. Three genuine findings remain — none are immediately exploitable for payment bypass, but two create meaningful abuse surface.

---

## Findings

---

### FINDING 1 — MEDIUM: `send-documents` accepts unvalidated user-controlled filenames and base64 blobs

**File:** `src/app/api/send-documents/route.ts` — lines 834–840
**Severity:** MEDIUM

**What it does:**
The `documents` array is accepted directly from the client request. Each element has a `filename` and `base64` field. The route passes `filename` directly to Resend as an email attachment filename and sends `base64` as attachment content. Neither is validated for:
- `filename` type: no sanitization, no extension check, no path traversal prevention
- `base64` content: no size limit enforced per-document, no MIME type check
- Total payload size: no limit on total number of documents or cumulative base64 size

**The attack:**
An attacker who has a valid delivery token (obtained legitimately by buying once) can:
1. Call `/api/send-documents` with `documents` containing a crafted `filename` like `../../../../etc/passwd` or `malware.exe`
2. Send files of arbitrary content and size (Resend has its own limits, but those are undocumented in this codebase)
3. Send to any of 3 recipients — effective email relay using this service's Resend account

**Evidence:**
```typescript
const attachments = documents.map(
  (doc: { filename: string; base64: string }) => ({
    filename: doc.filename,  // ← unvalidated, user-controlled
    content: doc.base64,     // ← unvalidated, size/type unknown
  })
);
```

**Note on blast radius:** The delivery token is HMAC-validated against the Stripe session ID — so an unauthenticated attacker cannot forge one. This limits the finding to paying customers abusing the email relay. However, the 15-minute token window means the attack window is constrained, and tokens cannot be reused outside that window.

**Recommendation:** Whitelist `.pdf` extension on filenames, add a per-document base64 size cap (~5MB), and limit `documents.length` to a reasonable number (e.g., ≤ 20).

---

### FINDING 2 — MEDIUM: `verify-payment` stores unvalidated `formData` JSON blob in the database

**File:** `src/app/api/verify-payment/route.ts` — lines 52–77, 108
**Severity:** MEDIUM

**What it does:**
The `formData` field is accepted from the client request body with type `Record<string, unknown>` and stored directly via `JSON.stringify(formData)` into the `form_data` column of the `purchases` table with no validation, sanitization, or size limit.

**The attack:**
1. An attacker calls `/api/verify-payment` with a valid Stripe session ID (legitimately obtained) and an arbitrarily large or malicious `formData` payload
2. The payload is stored in the database unchecked
3. That same `form_data` is later returned from `/api/account/purchases` (line 21) and passed to `PurchaseRedownloadButton` as `formData` prop, which feeds it directly to `generateDocuments()` as `ComplianceFormData`

**Secondary risk — stored XSS path:**
If `generateDocuments()` renders any `formData` field values into HTML that is then rendered in the browser (e.g., PDF preview, email), attacker-controlled strings would flow through. The PDF generator library (jsPDF) renders to canvas — not HTML — so XSS via PDF is not the risk. However, the account page renders purchase data and if any field from `form_data` is ever interpolated into JSX without escaping, that becomes stored XSS.

**Evidence:**
```typescript
// verify-payment/route.ts line 71
formData ? JSON.stringify(formData) : null,  // ← entire client blob stored as-is

// account/purchases/route.ts line 21
form_data  // ← returned directly to client

// PurchaseRedownloadButton.tsx line 19
generateDocuments(formData as unknown as ComplianceFormData)  // ← cast, no validation
```

**Recommendation:** Either (a) do not store `formData` at verify-payment time at all (it's already stored by the Stripe webhook path which takes data from the session, not the client), or (b) validate and strip `formData` to an explicit allowlist of known `ComplianceFormData` field names and types before storage. Add a JSON size cap (e.g., 50KB).

---

### FINDING 3 — LOW: No rate limiting on `/api/contact`, `/api/create-checkout`, or `/api/verify-payment`

**File:** All three routes
**Severity:** LOW

**What it does:**
None of the public API routes implement rate limiting. An attacker can:
- Spam `/api/contact` at volume to exhaust Resend credits or trigger Resend rate limits
- Enumerate Stripe session IDs at `/api/verify-payment` (though the `cs_` prefix check and Stripe API call limit this in practice)
- Spam `/api/create-checkout` to generate abandoned checkout sessions (no financial cost, but Stripe may flag the account)

**Note:** Vercel has edge-level protections and Resend has per-account rate limits. The risk is operational (Resend credit exhaustion) more than security (authentication bypass). Honeypot on contact form reduces bot spam. This is a hardening gap, not an active vulnerability.

**Recommendation:** Add Vercel Edge middleware rate limiting on at minimum `/api/contact` and `/api/verify-payment`.

---

## Verified as FIXED / Secure

### delivery-token.ts — SECURE

The fix was applied correctly:
- **Source of secret:** `STRIPE_SECRET_KEY` via `getSecret()` — throws if missing, so no silent fallback to a weak secret
- **HMAC construction:** `sha256(secret, sessionId + "|" + minute_bucket)` — structurally correct
- **Timing safety:** `crypto.timingSafeEqual()` used on both sides — timing attack prevented
- **Window:** 15 minutes (0–14 minutes back) — generous but reasonable for delivery flow
- **No fallback secret:** Previous version had a hardcoded fallback; confirmed removed

```typescript
function getSecret(): string {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    throw new Error("STRIPE_SECRET_KEY is not set — delivery tokens cannot be issued.");
  }
  return secret;
}
```

**One design note (not a vulnerability):** Using `STRIPE_SECRET_KEY` as the HMAC secret for delivery tokens couples two security domains. If Stripe rotates the key, all outstanding delivery tokens instantly invalidate. This is acceptable given the 15-minute window, but worth noting for future key rotation planning.

---

### auth.ts — SECURE

- `secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET` — `AUTH_SECRET` is confirmed SET in `.env.local`; fallback to `NEXTAUTH_SECRET` also SET. No unauthenticated state possible.
- `trustHost: true` — correct for Vercel deployment
- `debug: process.env.NODE_ENV === "development"` — does not leak in production

---

### contact/route.ts — SECURE

The CRLF injection fix was applied correctly:
- Subject validated against `ALLOWED_SUBJECTS` allowlist — injection via custom subject impossible
- `safeName` and `safeSubject` strip `\r` and `\n`
- All user fields run through `escapeHtml()` before HTML output
- Email regex validation present
- 5,000 character message cap present
- Honeypot field (`_hp`) filters automated bots

---

### webhooks/stripe/route.ts — SECURE

Webhook signature verification is intact and correctly implemented:
- `request.text()` used (raw body for signature verification) — correct for App Router
- `sig` checked before use
- `webhookSecret` checked before use — returns 500 (not 200) if unconfigured, causing Stripe to retry
- `stripe.webhooks.constructEvent()` used — Stripe's official HMAC-SHA256 verification
- DB errors return 500 (not 200) — Stripe will retry, no silent loss

---

### send-documents/route.ts — DELIVERY TOKEN VALIDATION IS EFFECTIVE

The delivery token check at line 797 is the first thing that runs after JSON parse. An unauthenticated caller without a valid HMAC token gets a 403 immediately. The fix is correctly placed and cannot be bypassed by manipulating other fields.

```typescript
if (!deliveryToken || !sessionId || !validateDeliveryToken(sessionId, deliveryToken)) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
}
```

---

### auth-debug/route.ts — CONFIRMED DELETED

Verified via git log — deleted in commit `ec18dd5`. The endpoint exposed env var names (not values) plus auth diagnostic output. While not critical, deletion was correct hygiene. It is not present in the deployed codebase.

---

### .env.local — NO SECRETS IN GIT HISTORY

Checked the earliest `.env.local` commit (`9e10a9fb`):
```
STRIPE_SECRET_KEY=          ← empty placeholder
RESEND_API_KEY=             ← empty placeholder
```

No live keys were ever committed. The subsequent removal commit (`5cfdfcf`) removed the file from tracking after real keys were populated. Git history is clean.

---

### link-purchase/route.ts — SECURE

The email-match guard prevents purchase hijacking:
```sql
WHERE stripe_session_id = $2
  AND email_at_purchase = $3   -- ← authenticated user email must match purchase email
  AND user_id IS NULL          -- ← idempotent — cannot re-link already-linked purchase
```

An authenticated user cannot link another user's purchase. Parameterized query prevents SQL injection.

---

### create-checkout/route.ts — SECURE

- Price IDs sourced exclusively from `REGULATION_CONFIG` (server-side constant) — no client-controlled prices
- Auth failure is non-blocking (email pre-fill only) — checkout proceeds without user session
- `session.url` null guard present (added in this session's hardening)

---

### GA tracking in verify-payment — NOT A LEAK

The `trackPurchase()` function sends `transaction_id` (Stripe session ID) and purchase value to GA. Stripe session IDs are not secret (they appear in the browser URL after checkout). No PII beyond what GA already receives from the checkout redirect is sent. The `client_id` uses `session.client_reference_id || session.id` — both non-sensitive. Not a data exposure risk.

---

## Threat Model Assessment

| Attack | Feasible? | Notes |
|--------|-----------|-------|
| Forge delivery token without buying | No | HMAC-SHA256, secret required |
| Replay delivery token after 15 min | No | Time-window check with `timingSafeEqual` |
| Steal documents without payment | No | Token required at send-documents gate |
| Payment bypass via session ID guessing | No | Stripe validates actual payment status |
| SQL injection at any endpoint | No | All DB calls parameterized |
| CRLF injection via contact form | No | Allowlist + strip applied correctly |
| Webhook replay / forgery | No | Stripe HMAC verification present |
| Auth bypass at account endpoints | No | `session.user.id` checked before DB access |
| Email relay via send-documents | **Partially** | Requires valid token (paying customer) |
| Oversized payload in formData storage | **Yes** | No size cap on DB-stored formData |
| Enumerate valid session IDs | Low risk | Stripe API call + `cs_` check limits this |

---

## Prioritized Action Items

1. **(MEDIUM — fix before high-volume launch)** Add filename sanitization and base64 size cap in `send-documents/route.ts`
2. **(MEDIUM — fix before high-volume launch)** Add `formData` size cap and field validation in `verify-payment/route.ts` before DB storage
3. **(LOW — hardening)** Add rate limiting to `/api/contact` via Vercel Edge middleware
4. **(DESIGN NOTE — no action required)** Document that delivery token lifespan is coupled to `STRIPE_SECRET_KEY` rotation

