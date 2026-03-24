# Security Audit: Input Validation and Injection
**Scope:** All API routes in src/app/api/ and form-handling components
**Auditor:** Security Agent A
**Date:** 2026-03-24

---

## Executive Summary

The codebase is in generally good security shape. No SQL injection, no command injection,
no dangerous eval usage, no raw HTML injection into the DOM. The Stripe webhook uses proper
HMAC-SHA256 signature verification. Rate limiting is applied to all mutation endpoints. The
main findings are two medium-severity gaps in input validation and one low-severity
architectural weakness in the rate limiter.

**Findings at a glance:**

| ID   | File                        | Severity      | Issue                                                      |
|------|-----------------------------|---------------|-------------------------------------------------------------|
| F-01 | send-documents/route.ts:234 | Medium        | contactName and regulation lack length and type validation |
| F-02 | send-documents/route.ts:274 | Medium        | documents array has no upper-bound count limit             |
| F-03 | create-checkout/route.ts:52 | Low           | addonIds elements not type-checked as strings              |
| F-04 | rate-limit.ts:67            | Low           | x-forwarded-for IP is spoofable off Vercel                 |
| F-05 | blog/[slug]/page.tsx:119    | Informational | Inline script JSON-LD (safe in current context)            |
| F-06 | contact/route.ts:28         | Informational | name and company fields have no length caps                |

---

## Detailed Findings


### F-01: Missing length and type validation on contactName and regulation

**File:** src/app/api/send-documents/route.ts:234
**Severity:** Medium

**Description:**
The POST /api/send-documents handler destructures `contactName` and `regulation` from the
request body without type or length checks before use.

- `contactName` is passed to `buildEmailHtml()` and then `escapeHtml()`. If `contactName`
  is a non-string (e.g., an object), JavaScript coercion calls `.toString()` producing
  `[object Object]` in the email. A very long string would also pass through unchecked,
  bloating the email body.

- `regulation` has no type check and no length check. It is passed to
  `deriveEmailContent(regulation)` which calls `getRegulation(slug)`. If `regulation` is
  not a string, `getRegulation` returns undefined and `deriveEmailContent` falls back to a
  generic template where the slug appears as the literal string "undefined" in email content.
  A 1MB string would also pass through unchecked.

**Exploit scenario:**
An attacker with a valid delivery token (requiring a real paid Stripe session) submits a
non-string `regulation` or an extremely long `contactName`. No XSS fires because escapeHtml
is called, but email content is corrupted and unnecessary data is processed server-side.

**Suggested fix** (after line 278, the companyName check):

    if (contactName !== undefined &&
        (typeof contactName !== "string" || contactName.length > 200)) {
      return NextResponse.json({ error: "Invalid contact name" }, { status: 400 });
    }
    if (!regulation || typeof regulation !== "string" || regulation.length > 100) {
      return NextResponse.json({ error: "Invalid regulation" }, { status: 400 });
    }

---


### F-02: No upper-bound limit on the documents array count

**File:** src/app/api/send-documents/route.ts:274
**Severity:** Medium

**Description:**
The handler checks `documents.length > 0` (minimum) but places no maximum on how many
documents can be submitted in a single request. Each document is individually capped at
5MB in base64, but an attacker with a valid token could submit 100 documents of 5MB each
(approximately 500MB of request body) before any per-document check fires.

Next.js App Router does not impose a default body size limit on Vercel or self-hosted Node.
A crafted request could consume significant server memory and cause Resend API failures.

**Exploit scenario:**
POST /api/send-documents with a valid token and 50 documents each with a 6.7M-character
base64 string. Approximately 335MB of request body. Server memory spikes; Resend call with
50 attachments fails or hangs.

**Suggested fix** (after line 274, the existing documents array presence check):

    const MAX_DOCUMENTS = 20;
    if (documents.length > MAX_DOCUMENTS) {
      return NextResponse.json(
        { error: "Maximum 20 documents allowed per request" },
        { status: 400 }
      );
    }

---


### F-03: addonIds array elements not validated as strings

**File:** src/app/api/create-checkout/route.ts:52
**Severity:** Low

**Description:**
The handler checks that `addonIds` is an array but does not check that each element is a
string. The relevant code:

    const selectedAddonIds: string[] = Array.isArray(addonIds) ? addonIds : [];
    for (const addonId of selectedAddonIds) {
      const addon = availableAddons.find((a) => a.id === addonId);

If `addonIds` contains non-string elements (null, true, {}), the `.find()` comparison uses
strict equality so no incorrect Stripe price ID is ever matched. However, with
`addonIds.length` uncapped, sending an array of 10,000 null values causes a tight loop
with zero matches and wasted CPU.

**Exploit scenario:**
Send `{ addonIds: [null, null, ... x10000] }`. No harmful outcome but needless CPU iteration.

**Suggested fix:**

    if (selectedAddonIds.length > 10) {
      return NextResponse.json({ error: "Too many addon IDs" }, { status: 400 });
    }
    for (const addonId of selectedAddonIds) {
      if (typeof addonId !== "string") continue;
      const addon = availableAddons.find((a) => a.id === addonId);
      // ...
    }

---


### F-04: Rate limiter trusts x-forwarded-for without infrastructure guarantee

**File:** src/lib/rate-limit.ts:67
**Severity:** Low

**Description:**
The `getClientIp()` function reads the first value from `x-forwarded-for`:

    const forwarded = request.headers.get("x-forwarded-for");
    if (forwarded) {
      return forwarded.split(",")[0].trim();
    }

On Vercel, this header is overwritten by the edge network so spoofing is not possible in
that deployment environment. However:

1. On any non-Vercel deployment (Docker, Railway, fly.io, bare Node), an attacker can set
   `X-Forwarded-For: 1.2.3.4` in their request and the rate limiter keys off that
   attacker-controlled value, bypassing all rate limits entirely.

2. The function takes the first value from the header. When a trusted proxy appends to the
   header, the correct value to trust is the last one (added by the proxy), not the first
   (which is client-supplied). Vercel overrides the whole header which is why this works
   there, but it is fragile for other environments.

**Exploit scenario:**
On a non-Vercel deployment: rotate through spoofed IPs in `X-Forwarded-For` to bypass the
contact form rate limit and send unlimited emails through the Resend API.

**Suggested fix** (document the Vercel dependency; take last IP rather than first):

    export function getClientIp(request: Request): string {
      // On Vercel, x-forwarded-for is overwritten by the edge and cannot be spoofed.
      // On other deployments, this header may be attacker-controlled.
      const forwarded = request.headers.get("x-forwarded-for");
      if (forwarded) {
        const parts = forwarded.split(",");
        return parts[parts.length - 1].trim(); // last = added by closest trusted proxy
      }
      return request.headers.get("x-real-ip") ?? "unknown";
    }

Consider Upstash Redis rate limiting before any non-Vercel deployment.

---


### F-05: Inline script JSON-LD uses HTML insertion API

**File:** src/app/blog/[slug]/page.tsx:119
**Severity:** Informational (safe in current context)

**Description:**
The blog post page injects a JSON-LD structured data block using an inline script tag
with React's HTML insertion property (__html: JSON.stringify(blogPostingSchema)).

The `blogPostingSchema` object is constructed entirely from server-side MDX frontmatter
(post.title, post.description, post.tags, etc.). These are static files committed to the
repository, not user input. JSON.stringify() escapes all values as valid JSON, preventing
any HTML injection within the script tag context. The comment on line 116 already notes
that no user input reaches this path.

This is a standard and accepted pattern for JSON-LD structured data in Next.js.

**Recommendation:** No change needed. If blog frontmatter ever accepts user-submitted
content in the future, this pattern should be re-evaluated at that time.

---


### F-06: name and company fields in contact route have no length caps

**File:** src/app/api/contact/route.ts:28
**Severity:** Informational

**Description:**
The contact handler validates `message` length (5,000 chars) and strips CRLF from `name`
and subject, but does not enforce maximum lengths on `name`, `email`, or `company`.
Practical impact is low: all values are HTML-escaped before being rendered in the Resend
email. No injection is possible. Resend also imposes its own upstream limits.

**Suggested fix** (after the existing presence check at line 28):

    if (name.length > 200) {
      return NextResponse.json(
        { error: "Name too long (200 character limit)." }, { status: 400 }
      );
    }
    if (email.length > 254) { // RFC 5321 maximum
      return NextResponse.json({ error: "Email address too long." }, { status: 400 });
    }
    if (company && company.length > 200) {
      return NextResponse.json(
        { error: "Company name too long (200 character limit)." }, { status: 400 }
      );
    }

---


## What Was Checked and Found Clean

| Check | Result |
|-------|--------|
| SQL injection: all DB queries use parameterized pool.query with positional params | Clean |
| Command injection: no child_process, exec, or eval anywhere in API routes | Clean |
| CSRF: POST-only JSON body routes, no cookie-based state mutation without auth session | Clean |
| Stripe webhook: uses stripe.webhooks.constructEvent() with HMAC-SHA256 before any processing | Clean |
| Delivery token: HMAC-SHA256 with 60-minute sliding window and timing-safe comparison | Clean |
| Single-use token enforcement: usedTokens Set prevents replay of document delivery | Clean |
| Email header injection: name and subject have CRLF stripped; all values HTML-escaped in body | Clean |
| XSS in DOM: no innerHTML assignment, no eval, no unescaped user content rendered client-side | Clean |
| File handling: no upload endpoints; send-documents accepts base64 with .pdf enforcement and 5MB cap | Clean |
| URL parameter handling: search-data is GET with no query params; all mutation routes use POST JSON | Clean |
| Auth on account routes: both /api/account/ routes check session.user.id before any DB access | Clean |
| Database authorization: link-purchase matches stripe_session_id AND email_at_purchase = authenticated user | Clean |
| addonId lookup: uses .find() against a static allowlist; no arbitrary Stripe price IDs accepted | Clean |
| Regulation slug in create-checkout: getRegulation() returns undefined for unknown slugs; route rejects before Stripe call | Clean |
| JSON-LD schema: data sourced from trusted server-side MDX frontmatter only, not user input | Clean |

---

## Priority Fix Order

1. **F-02** (documents array count cap): one line, prevents memory exhaustion
2. **F-01** (contactName and regulation type and length guards): closes hygiene gap on token-protected endpoint
3. **F-03** (addonId string type check and count cap): completes input contract validation
4. **F-04** (IP header handling): document Vercel dependency; fix before any non-Vercel deployment
5. **F-06** (name and company length in contact): trivial to add, not urgent
