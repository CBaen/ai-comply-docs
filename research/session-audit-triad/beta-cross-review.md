# Beta Cross-Review — Security (Lead) × Architecture (Alpha)

**Reviewer lens:** Customer Experience & Regression (Beta)
**Date:** 2026-03-17
**Inputs:** lead-findings.md, alpha-findings.md
**Format:** Divergence → Agreements → Gaps → Surprises

---

## 1. Reasoning Divergence Points

### DIVERGENCE A — The Illinois HB3773 post-payment failure

**Alpha** classified the missing Illinois HB3773 case in `generateDocumentsInner` as CRITICAL. It caught this via static code analysis: the function's switch statement has no branch for `illinois-hb3773`, so any paying customer who purchases the flagship product gets a runtime error during PDF generation. This is a complete purchase-flow failure for the highest-profile product in the library.

**Beta** did not flag this. The customer experience audit confirmed the Illinois product page loads at 200, the questionnaire renders, and checkout can be initiated. The failure was invisible to a journey-level audit because it only surfaces *after* Stripe payment completes and the PDF pipeline runs — a step that cannot be exercised without a live payment.

**Why this divergence matters:** The two audits were using fundamentally different observation methods. Beta was watching the front door; Alpha was reading the blueprints. A customer-experience audit that only validates "can they reach checkout" is insufficient for a product that generates files post-payment. The PDF generation step must be treated as part of the customer journey, not just an implementation detail. Beta's audit methodology has a structural blind spot for any post-payment server-side failure mode.

**Resolution:** Alpha's finding stands and is correct. Beta defers. This is the single most important unresolved issue in the codebase.

---

### DIVERGENCE B — How severe is the `formData` storage finding?

**Lead** classified unvalidated `formData` storage in `verify-payment` as MEDIUM, noting the stored XSS path is theoretical because jsPDF renders to canvas (not HTML) and the risk is conditional on future interpolation into JSX.

**Alpha** did not examine `verify-payment/route.ts` at this level of detail. The architecture audit's closest related finding is the `loadSavedForm` any-typed parameter (ALPHA-C3), which Alpha classified as MEDIUM and framed as a type-safety issue, not a security issue.

**Beta's customer-journey read:** The `formData` blob is also what powers the account center re-download path. If a malicious `formData` payload is stored and then fed to `generateDocuments()` without validation, the re-download path on the account page would also fail or produce garbage output — a customer-visible regression. Lead's security framing and Alpha's type-safety framing are both correct and complementary; neither is wrong. But neither audit fully captured the customer impact: a stored bad payload breaks re-downloads permanently for that purchase record.

**Assessment:** The finding is correctly rated MEDIUM by Lead. Alpha's MEDIUM on `loadSavedForm` is a related but distinct problem at a different layer. They should be fixed together: validate at the API boundary (Lead's fix) AND add types at the function boundary (Alpha's fix). Treating them as separate issues risks fixing one layer while leaving the other open.

---

### DIVERGENCE C — Dual source of truth risk framing

**Alpha** flagged the `regulations.ts` / `regulation-config.ts` split as MEDIUM (ALPHA-C4), framing it as a maintainability and drift risk — someone adds a product to one file but not the other.

**Lead** did not address this at all. The security audit's scope was session changes and security-critical routes; configuration drift is out of scope for a security lens.

**Beta's framing:** From a customer journey perspective, this is not just a maintainability risk. The gap is already live: Illinois HB3773 exists in `regulations.ts` (ready: true, Stripe price ID set) but its PDF generation logic is missing from `regulation-config.ts` (the Alpha CRITICAL finding). The dual source of truth is not a theoretical future risk — it already caused ALPHA-C1. The severity of ALPHA-C4 should be considered in light of the fact that it already produced a CRITICAL failure. If this pattern isn't addressed structurally, every new product added to the library is one missed file away from a silent post-payment failure.

---

## 2. Agreements

**All three audits agree: the delivery token, webhook, and auth are sound.**

Lead confirmed HMAC construction, timing safety, and no fallback secret. Alpha did not re-examine these (correctly, as they were in scope for Lead). Beta confirmed from the customer side that the delivery flow works end-to-end for valid tokens. No disagreement.

---

**All three audits agree: the contact form CRLF fix is correct.**

Lead verified the allowlist and strip logic. Alpha did not examine this. Beta confirmed the contact form renders and submits without visible issues. No disagreement.

---

**Lead and Beta independently agree: the account center email-match guard prevents purchase hijacking.**

Lead verified the SQL guard at `link-purchase/route.ts`. Beta confirmed from the customer side that re-download on the account page requires authentication. Both audits reached the same conclusion via different methods — this is the strongest confidence signal in the entire audit set.

---

**Alpha and Beta independently agree: there is a mobile navigation inconsistency.**

Beta identified the desktop nav `href="/products"` vs mobile nav `href="/#products"` mismatch. Alpha's architecture audit did not examine Nav.tsx but also did not contradict this finding. Lead's security audit is silent on it (correct — it's not a security issue). This finding stands unchallenged.

---

## 3. Gaps — What No Audit Covered

**GAP 1 — The blog deployment gap (2 of 12 MDX files missing from live site).**

Beta identified that `iso-42001.mdx` and `what-is-ai-bias-audit.mdx` are present in `content/blog/` with `published: true` but do not appear on the live site. Neither Lead nor Alpha examined the blog pipeline. The root cause is either a build-time MDX parsing failure (likely — one file may have bad frontmatter) or a Vercel cache issue. This is a content delivery failure with no auditor coverage. If the missing posts are on topics customers might search for, this is an SEO and credibility gap that compounds over time.

**GAP 2 — The "53 packages" hardcoded FAQ copy.**

Beta found that `src/app/page.tsx` hardcodes "53 packages" in the FAQ section. The regulations array currently has 53 ready:true products, so this is temporarily accurate — but it will silently go stale when the next product ships. Neither Lead nor Alpha examined static copy for data-staleness. No recommendation exists in either audit for this class of issue.

**GAP 3 — The `DocumentSamplePreview` silent failure.**

Beta found that `src/components/DocumentSamplePreview.tsx` line 104 uses `{error ? null : ...}`, rendering nothing silently when the preview canvas fails to load. A customer who encounters this sees a blank space with no error message and no fallback CTA. Neither Lead nor Alpha examined this component. This is a customer-visible failure with no audit coverage.

**GAP 4 — The `existsSync` at module level (ALPHA-B2) and its customer impact.**

Alpha flagged `existsSync` being called at module load time in `src/app/products/[slug]/page.tsx` as a build-time coupling risk. Neither Lead nor Beta examined this. The customer impact: if a preview image file is missing at build time, `SLUGS_WITH_PREVIEWS` is silently empty for that product, and no preview renders — with no error surfaced to the customer. This is the same "silent failure" pattern as the DocumentSamplePreview issue, but at a different layer.

**GAP 5 — Rate limiting on `/api/verify-payment` and Stripe session enumeration.**

Lead noted this as LOW severity. Beta's audit did not attempt enumeration. Alpha's audit was scoped to architecture, not attack surface. The actual risk is constrained (Stripe API call + `cs_` prefix check limits brute force), but no audit fully assessed the enumeration window. This remains a soft gap.

---

## 4. Surprises

**SURPRISE 1 — The CRITICAL finding is for the flagship product.**

Alpha's CRITICAL finding is not for an obscure edge case. Illinois HB3773 is the most prominent product in the library — it appears in the hero carousel, the "Not sure where to start?" guide, and the DeadlineBanner. If Guiding Light is doing any marketing, Illinois is likely the first product customers encounter. The fact that the highest-traffic product has a silent post-payment failure is the most consequential possible configuration of this bug.

**SURPRISE 2 — The security and architecture audits produced zero shared findings.**

Lead and Alpha covered completely different surfaces. There is no finding that both audits identified independently. This is actually reassuring — it suggests the two auditors were genuinely using different lenses and not converging on the same easy targets. It also means the combined finding set is additive, not redundant: all findings are new information.

**SURPRISE 3 — The overall security posture is stronger than the architecture posture.**

Lead found 3 findings, all MEDIUM or LOW, none actively exploitable without a valid purchase token. Alpha found a CRITICAL, multiple HIGHs, and a cluster of MEDIUMs — with one already causing live customer failures. The codebase has been hardened against external attackers more thoroughly than it has been hardened against internal configuration drift. For a product that is actively shipping new regulations, internal drift is the higher-frequency risk.

**SURPRISE 4 — The `MARGIN` legacy alias in 234 files (ALPHA-C1b/C5) has no security or customer-facing impact.**

Alpha correctly classified this as MEDIUM (naming confusion, dead maintenance surface), and Lead correctly ignored it. From a customer journey lens, this finding is entirely invisible — it cannot cause a customer-visible failure. It is the only finding across all three audits that is purely internal and has zero customer impact path. This makes it the lowest-priority actionable item in the entire set, despite being a large surface area.

**SURPRISE 5 — The blog gap is the only finding with an unclear root cause.**

Every other finding has a clear root cause and a clear fix. The missing blog posts are the one finding where the root cause is ambiguous: it could be frontmatter parsing, a build cache issue, a Vercel incremental build artifact, or a slug collision. This is the one item that requires investigation before a fix can be prescribed.

---

## Cross-Audit Priority Stack

Synthesizing all three audits into a single priority order for Guiding Light:

| # | Finding | Source | Severity | Customer Impact |
|---|---------|--------|----------|-----------------|
| 1 | Illinois HB3773 missing from PDF generator | Alpha (ALPHA-C1) | CRITICAL | Post-payment failure for flagship product |
| 2 | Blog deployment gap (2 missing posts) | Beta | HIGH | SEO + credibility gap |
| 3 | Mobile nav sends to homepage anchor, not /products | Beta | HIGH | Navigation inconsistency |
| 4 | send-documents unvalidated filenames/base64 | Lead (F1) | MEDIUM | Email relay abuse by paying customers |
| 5 | verify-payment stores unvalidated formData | Lead (F2) | MEDIUM | Stored payload breaks re-downloads |
| 6 | Dual source of truth (regulations.ts vs regulation-config.ts) | Alpha (ALPHA-C4) | MEDIUM | Caused CRITICAL already; will repeat |
| 7 | DocumentSamplePreview silent failure | Beta | MEDIUM | Blank preview with no fallback |
| 8 | "53 packages" hardcoded FAQ copy | Beta | LOW | Stale copy after next product ships |
| 9 | No rate limiting on /api/contact | Lead (F3) | LOW | Resend credit exhaustion |
| 10 | MARGIN legacy alias (234 files) | Alpha (ALPHA-C5) | LOW | None (internal only) |

---
