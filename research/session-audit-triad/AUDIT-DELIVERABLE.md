# Triadic Session Audit — Deliverable

**Date:** 2026-03-17
**Scope:** All code changes from the March 16-17 session (~100+ commits, 164 files, 8241 insertions)
**Team:** Lead (Security), Alpha (Architecture), Beta (Customer Experience)
**Phases completed:** Phase 1 (independent findings), Phase 2 (cross-review)

---

## Verdict: Ship with one fix applied

The site is in a **shippable state** after the Illinois HB3773 fix was applied during the audit. The core payment flow, security mechanisms, and customer journey are sound. No active security vulnerabilities were found. The session's work significantly improved the site's robustness.

---

## Critical Finding (Fixed During Audit)

**Illinois HB3773 PDF generator routing was missing.** The flagship product ($299, in-effect since Jan 1 2026) had no case in `generateDocumentsInner`. Any customer who completed payment would get a runtime error instead of documents. Caused by replacing the silent Illinois fallback with a throw — the fallback WAS the Illinois routing. **Fixed and deployed.** Found by Alpha.

---

## Prioritized Remaining Issues

| # | Finding | Severity | Source | Fix Effort |
|---|---------|----------|--------|------------|
| 1 | `REGULATION_EMAIL` map silently sends Illinois email content for ~20 products not in the map | HIGH | Lead cross-review | Medium — add entries or derive from regulations.ts |
| 2 | Mobile nav links to `/#products` instead of `/products` | HIGH | Beta | Quick — one href change |
| 3 | `send-documents` accepts unvalidated filenames and base64 blobs | MEDIUM | Lead | Medium — add allowlist + size cap |
| 4 | `verify-payment` stores unvalidated `formData` to DB | MEDIUM | Lead + Alpha (converged) | Medium — add Zod schema or skip storage |
| 5 | Dual source of truth (`regulations.ts` vs `regulation-config.ts`) | MEDIUM | Alpha + Beta | Large — architectural consolidation |
| 6 | Webhook route still has duplicate `getStripe()` | HIGH | Alpha | Quick — import from shared lib |
| 7 | `DocumentSamplePreview` renders blank on error | MEDIUM | Beta | Quick — add fallback UI |
| 8 | 2 blog posts may be missing from live deploy | HIGH | Beta | Investigate — may be build cache |

---

## Structural Insight (Cross-Review Discovery)

**Unvalidated data pipeline from user input to PDF generation.** Two auditors independently found different entry points to the same weakness:
- Lead: `formData` stored unvalidated in verify-payment, cast to `ComplianceFormData` in re-download
- Alpha: `loadSavedForm()` returns `any`, flows into generators without validation

This is the same pipe. Fix once at the boundary (validate formData shape before storage) and both entry points are sealed.

---

## What the Session Got Right

- Delivery token HMAC: correct, timing-safe, no fallback secret
- Contact form: CRLF stripped, subject allowlisted, HTML-escaped
- Auth: secrets properly sourced, trustHost set, conditional adapter
- Checkout: auth guard prevents hanging, null URL check added
- Error boundaries: global + product page, support email in error states
- Accessibility: 90 issues found and fixed across 5 audit teams
- Preview images: real PDFs rendered to WebP, 63% size reduction
- Performance: JSZip dynamic import, build-time checks, logo optimized

---

## Methodology Note

The Illinois bug was invisible to Beta's customer-journey audit (product page loads fine, checkout initiates fine — the failure only happens server-side after payment). It was caught by Alpha's static code analysis. This validates the triadic approach: no single lens would have caught everything. The cross-review phase added one new finding (REGULATION_EMAIL) that none of the three independent audits surfaced.
