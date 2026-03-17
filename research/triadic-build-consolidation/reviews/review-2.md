# Independent Code Review — Build Consolidation
**Date:** 2026-03-17
**Reviewer:** Independent adversarial reviewer (did not build this code)
**Scope:** regression risk and edge cases from the three-source consolidation

---

## Review Order: Adversarial-First Protocol

1. Integration Errors
2. Constraint Violations
3. Bugs and Logic Errors
4. Edge Cases
5. Regression Risk
6. Security
7. Test Coverage
8. What Works

---

## 1. Integration Errors

### FINDING 1-A: lawLinkText is duplicated in both files for all 49 products (Important)

**Evidence:** Running a slug-by-slug comparison shows that `lawLinkText` is defined in both `src/lib/regulation-config.ts` AND `src/data/regulations.ts` for all 49 products that have it. The values are currently identical. The resolution logic in `Questionnaire.tsx` line 467 is:

```
lawLinkText={config.lawLinkText ?? reg?.lawLinkText ?? ""}
```

This means `config.lawLinkText` always wins because it is always defined. The copy in `regulations.ts` is silently ignored. The consolidation was intended to move data into regulations.ts as the single source of truth, but `lawLinkText` was written to both and the resolution order preserves the old source (config) over the new source (reg).

**Impact:** If a future builder updates `regulations.ts` (the "source of truth") to fix a lawLinkText, the change will have no effect — config.lawLinkText overrides it. This is a latent regression vector. The field was not fully migrated despite being listed in pdf-types.ts as `/** Optional: human-readable link text for the law citation. Migrated to Regulation.lawLinkText on the regulations.ts side. */`

**File:Line:**
- `src/lib/pdf-types.ts:51` — comment says "Migrated to Regulation.lawLinkText on the regulations.ts side"
- `src/components/Questionnaire.tsx:467` — resolution order favors config
- Both files contain identical values for all 49 slugs

**Severity:** Important — Not broken today (values match), but the migration comment says it was supposed to move. The data is duplicated, not migrated.

---

### FINDING 1-B: Two ready:false slugs exist in regulations.ts with no REGULATION_CONFIG entry (Advisory)

**Evidence:** `education-k12-ai` and `hr-recruiting-ai` are present in `regulations.ts` but absent from `REGULATION_CONFIG`. Both have `ready: false` and `stripePriceId: ""`.

**Impact:** These products cannot be purchased and no product page is generated for them (`generateStaticParams` filters to `ready: true`). The gap is safe today. However, if either product is set to `ready: true` without also adding a REGULATION_CONFIG entry, Questionnaire.tsx line 309 (`if (!config) return null`) will silently render nothing — the questionnaire disappears without error.

**File:Line:**
- `src/data/regulations.ts:862,895` — ready: false entries with no config counterpart
- `src/components/Questionnaire.tsx:309` — silent null return if config missing

**Severity:** Advisory — safe now, silent failure path if `ready` is flipped before config is added.

---

## 2. Constraint Violations

### FINDING 2-A: Single source of truth not fully achieved (Important)

**Evidence:** The migration's stated goal was to remove five fields from regulation-config.ts. Four of them (`name`, `basePrice`, `statute`, `documents`) are confirmed removed — zero grep matches remain. However, `lawLinkText` was added to regulations.ts and kept in regulation-config.ts simultaneously (see Finding 1-A). The field exists in both files for every product that uses it.

**The `/** Migrated to Regulation.lawLinkText on the regulations.ts side. */` comment in pdf-types.ts** is misleading — it describes an incomplete migration, not a completed one.

**Severity:** Important — the consolidation constraint was partially violated for `lawLinkText`.

---

## 3. Bugs and Logic Errors

### FINDING 3-A: Email body produces truncated sentence when regulation is unknown (Advisory)

**Evidence:** `buildEmailHtml` at `src/app/api/send-documents/route.ts:190` produces:

```html
<p>Attached are {companyName}'s {reg.description}</p>
```

When `getRegulation(slug)` returns undefined (unknown slug), `deriveEmailContent` returns `description: ""`, producing the rendered output: "Attached are Acme Corp's " — a sentence fragment with a trailing apostrophe-s and no noun.

**Tested:** Simulated manually. When reg is null, title falls back to slug string, description is empty string.

**Mitigation:** The `send-documents` route is protected by `validateDeliveryToken` — it cannot be reached without a valid session token. Real customers will always have a known slug. The risk of this path being triggered in production is low but non-zero if a token is replayed with a modified payload.

**Severity:** Advisory — defense-in-depth gap, not exploitable without a valid token.

---

### FINDING 3-B: documentCount field is cosmetic-only; documents array is the operative source (Advisory)

**Evidence:** `Questionnaire.tsx:317` renders `{reg?.documents.length ?? 0} documents` — it uses the actual array length, not `documentCount`. The product page at `src/app/products/[slug]/page.tsx:294` renders `{reg.documentCount} documents included` — it uses the declared field. Both fields are verified to match (automated check confirmed 0 mismatches), but they are redundant. A future edit that adds a document to the array without updating `documentCount` would produce a display discrepancy between the product page and the questionnaire header.

**Severity:** Advisory — not broken, but the redundancy is a future maintenance trap.

---

## 4. Edge Cases

### FINDING 4-A: Questionnaire silently degrades when reg is null for a live product (Important)

**Evidence:** `Questionnaire.tsx:41` calls `const reg = getRegulation(regulationSlug)`. All downstream accesses use optional chaining (`reg?.documents.length ?? 0`, `reg?.citation ?? ""`, `reg?.documents ?? []`). There is no guard that halts rendering if `reg` is null — only a guard for `config` (line 309).

**Scenario:** A product is in REGULATION_CONFIG but its slug is misspelled or deleted from regulations.ts. The questionnaire renders and accepts form data but:
- Product summary bar shows "0 documents"
- Statute field is blank
- Law URL is blank — the law gate checkbox may be permanently enabled (depending on gateText config)
- The documents array passed to StepReviewCheckout is `[]`

**The user can complete checkout with no visible error.** The post-purchase document delivery will succeed but deliver an empty document list.

**Severity:** Important — silent data corruption path, no guardrail.

---

### FINDING 4-B: STEP_OVERRIDES covers 17 of 53 ready products; 36 fall through to the generic fallback (Advisory)

**Evidence:** There are 53 entries in REGULATION_CONFIG. Only 17 slugs appear in `STEP_OVERRIDES`. The other 36 receive:

```
"Review each document in your [name] compliance package carefully."
"Fill in the form fields with your company-specific information."
"Have your legal team review the completed documents before implementation."
```

These generic steps are product-agnostic. For specialized products like `eu-ai-act`, `eeoc-ai-hiring`, `nist-ai-rmf`, and `ai-governance-framework` — all of which have specific, legally-significant action steps — the generic fallback is substantively inadequate for the email a customer receives after purchase.

Cross-checking: `eu-ai-act`, `eeoc-ai-hiring`, `nist-ai-rmf`, and `ai-governance-framework` all DO appear in STEP_OVERRIDES. Most of the 36 without overrides are add-on products where generic steps may be acceptable.

**Severity:** Advisory — verify intentional for all 36 fallback products.

---

## 5. Regression Risk

### FINDING 5-A: No runtime validation that REGULATION_CONFIG and regulations.ts stay in sync (Important)

**Evidence:** The two files are maintained independently. There is no TypeScript type enforcement, no test, and no build-time check that:
- Every `ready: true` slug in regulations.ts has a REGULATION_CONFIG entry
- Every REGULATION_CONFIG entry has a corresponding slug in regulations.ts

The two-file gap found in Finding 1-B (`education-k12-ai`, `hr-recruiting-ai`) demonstrates this is already out of sync for ready:false products. When those products are promoted to `ready: true`, the failure mode is silent (questionnaire returns null).

**Severity:** Important — structural regression risk with no automated catch.

---

### FINDING 5-B: The one remaining addon in regulation-config.ts (manager-ai-training-kit) uses Stripe from config, not regulations.ts (Advisory)

**Evidence:** `src/lib/regulation-config.ts:47` contains the only `stripePriceId` in REGULATION_CONFIG: `"price_1TA3XHGidFVHIL99h2UwiLd9"` for the `manager-ai-training-kit` addon. This is an addon attached to `illinois-hb3773`, not a top-level product stripePriceId. The addon system still lives in REGULATION_CONFIG, which is correct by design. No regression here.

**Count verification:** regulations.ts contains 55 stripePriceId entries; regulation-config.ts contains 1 (addon-only). The consolidation preserved all Stripe pricing data. No missing price IDs found.

**Severity:** Advisory — confirmed correct, noted for clarity.

---

## 6. Security

### FINDING 6-A: send-documents route does not validate that the slug is a known, ready product (Advisory)

**Evidence:** `src/app/api/send-documents/route.ts` accepts a `regulation` field from the POST body and passes it to `deriveEmailContent()`. There is no check that `getRegulation(regulation)` returns a non-null value, or that `reg.ready === true`. The `validateDeliveryToken` check prevents unauthenticated calls, but a valid token holder could submit an arbitrary slug.

**Impact:** With a valid delivery token and an unknown slug, the email is sent with a garbled body (see Finding 3-A). With a known but `ready: false` slug, the email is sent with that product's data — which the comment at `generateStaticParams` says "contain unverified data and should not be accessible."

**Severity:** Advisory — token requirement is a real barrier; this is defense-in-depth gap only.

---

## 7. Test Coverage

No test files were identified in scope. The entire consolidation — 3 files modified, 946 lines of email map deleted — has zero automated test coverage. Findings 4-A and 5-A represent failure modes that would be caught immediately by a unit test but are currently invisible until they appear in production. This is the highest-risk gap from a maintenance perspective.

---

## 8. What Works

- **Build passes clean.** `npx next build` compiles with no TypeScript errors or warnings (only a workspace root lockfile advisory, pre-existing). 53 product pages generated successfully.
- **Removed field references confirmed gone.** Grep for `config.name`, `config.basePrice`, `config.statute`, `config.lawUrl`, `config.documents` across all of `src/` returns zero matches. The removal is complete.
- **Stripe price IDs fully accounted for.** All 55 product-level `stripePriceId` values are in regulations.ts. The one addon `stripePriceId` remains correctly in regulation-config.ts. No price IDs were lost.
- **STEP_OVERRIDES slugs all valid.** All 17 slugs in the override map resolve to entries in regulations.ts.
- **documentCount/documents parity confirmed.** All 55 regulations have matching declared count and actual array length.
- **deriveEmailContent null-reg is non-crashing.** Falls back gracefully to slug string — degraded but not an unhandled exception.
- **Questionnaire null-reg is non-crashing.** All accesses use optional chaining. The silent data bug (Finding 4-A) does not cause a thrown error.
- **create-checkout correctly handles empty stripePriceId.** Line 28 explicitly rejects products where `reg.stripePriceId` is falsy, blocking checkout for ready:false products.

---

## Summary Table

| Finding | Severity | File | Nature |
|---------|----------|------|--------|
| 1-A lawLinkText in both files, config wins | Important | regulation-config.ts + regulations.ts | Incomplete migration |
| 1-B Two slugs in regulations.ts with no config entry | Advisory | regulations.ts:862,895 | Silent failure path |
| 2-A Single source of truth not achieved for lawLinkText | Important | pdf-types.ts:51 | Constraint violation |
| 3-A Truncated email sentence on unknown slug | Advisory | send-documents/route.ts:190 | Logic error (gated) |
| 3-B documentCount redundant with documents.length | Advisory | regulations.ts (all entries) | Maintenance trap |
| 4-A Questionnaire silently degrades if reg is null | Important | Questionnaire.tsx:41 | Missing guard |
| 4-B 36 products use generic email steps | Advisory | send-documents/route.ts:156 | Completeness gap |
| 5-A No sync validation between two files | Important | structural | Regression risk |
| 5-B Addon stripePriceId in config is correct | Advisory | regulation-config.ts:47 | Confirmed correct |
| 6-A send-documents allows ready:false slug via token | Advisory | send-documents/route.ts | Defense-in-depth gap |

---

## Recommended Actions (Priority Order)

1. **Fix the `lawLinkText` resolution order** in Questionnaire.tsx line 467 to prefer `reg?.lawLinkText` over `config.lawLinkText`, then remove `lawLinkText` from regulation-config.ts entirely. This completes the stated migration.

2. **Add a guard in Questionnaire.tsx** for `if (!reg) return null` (or a visible error) alongside the existing `if (!config) return null` guard. Silent degradation is worse than a visible error.

3. **Add a build-time or startup assertion** that every `ready: true` slug in regulations.ts has a REGULATION_CONFIG entry. A simple TypeScript type check or a small test file would catch future drift before production.

4. **Add a slug and ready check in send-documents/route.ts** after the token validation — reject requests where `getRegulation(regulation)` returns null or `reg.ready === false`.
