# API Builder — Round 1 Build Report

**Date:** 2026-03-17
**Role:** API Builder — Routes and pages consolidation
**Files owned:** `src/app/api/create-checkout/route.ts`, `src/app/api/send-documents/route.ts`, `src/app/products/[slug]/page.tsx`

---

## Pre-Build Assessment

Read all three owned files plus `src/data/regulations.ts` and `src/lib/regulation-config.ts` before touching anything.

### Findings

**`create-checkout/route.ts`** — Already clean. Uses `getRegulation()` from regulations.ts for all product data (name, price, stripePriceId). Uses `REGULATION_CONFIG` only to look up addon `stripePriceId` values at lines 43-50. No duplication of fields that live in regulations.ts. **No changes required.**

**`products/[slug]/page.tsx`** — Already clean. Imports only from `@/data/regulations`. No regulation-config imports anywhere in the file. All display fields (name, shortName, citation, citationUrl, price, documentCount, description, penaltySummary, maxPenalty, appliesToSummary) read from `getRegulation()`. **No changes required.**

**`send-documents/route.ts`** — Required significant work. Had a 743-line `REGULATION_EMAIL` map (55 entries, lines 22-764) that fully duplicated product names, statute text, and descriptions that already live in regulations.ts. Also had a fallback block inside `buildEmailHtml` and a duplicate lookup in the POST handler — both doing what the map should have handled.

---

## Changes Made

### `src/app/api/send-documents/route.ts`

**Before:** 946 lines. `REGULATION_EMAIL` map with 55 full entries (title, statute, description, steps, reminder per slug). Two redundant fallback code paths.

**After:** 325 lines.

**What replaced the map:**

1. `STEP_OVERRIDES` — A slim map keyed by slug containing **steps arrays only** for 14 products whose action steps are product-specific (statutes cited, specific document names). Products not in this map receive generic three-step instructions. This is the only content that cannot be mechanically derived from regulations.ts.

2. `deriveEmailContent(slug)` — A function that:
   - Calls `getRegulation(slug)` to get product data from the single source of truth
   - Derives `title` from `reg.shortName || reg.name`
   - Derives `statute` from `reg.citation`
   - Derives `description` from the first ~200 chars of `reg.description`
   - Gets `steps` from `STEP_OVERRIDES[slug]` or falls back to generic three steps
   - Derives `reminder` as a generic template using the product name

3. Updated `buildEmailHtml` to call `deriveEmailContent()` directly — removed the inline fallback block that was a partial reimplementation of the same logic.

4. Updated the POST handler to call `deriveEmailContent()` once for the email subject — removed the orphaned `emailEntry`/`regData`/`emailTitle` triple-lookup that duplicated what `buildEmailHtml` already computed.

**Untouched:** All delivery token validation, document attachment logic, email validation, size/format checks, Resend API call structure, HTML template layout, and error handling. Exactly the same behavior, fewer moving parts.

---

## Interface Notes for Reviewers

- `STEP_OVERRIDES` is intentionally a flat `Record<string, string[]>` — steps only. Adding a new product does not require touching this map unless the steps are product-specific.
- `deriveEmailContent()` never throws — `getRegulation()` returns `undefined` for unknown slugs, and all derived values have safe fallbacks.
- The `statute` field is now derived but is not currently used in the email HTML template (the `reg.statute` variable is computed but the template renders `reg.title`, `reg.description`, `reg.steps`, `reg.reminder`). This matches the pre-existing behavior — the old map's `statute` field was also unused in the HTML renderer.

---

## Files Changed

| File | Change |
|------|--------|
| `src/app/api/send-documents/route.ts` | Replaced 743-line REGULATION_EMAIL map + duplicate fallback logic with `STEP_OVERRIDES` + `deriveEmailContent()`. 946 → 325 lines. |
| `src/app/api/create-checkout/route.ts` | No change — already correct. |
| `src/app/products/[slug]/page.tsx` | No change — already correct. |
