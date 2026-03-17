# Alpha Findings: Architecture & Code Quality Audit
**Auditor Role:** Maintainability Critic — the developer who works on this codebase next
**Date:** 2026-03-17
**Session scope:** 100+ commits, 164 files, 8241 insertions

---

## CRITICAL FINDINGS

### FINDING ALPHA-C1 — Illinois HB3773 Missing from PDF Generator
**File:** `src/lib/pdf-generator.ts`
**Line:** 1062 (the throw at end of `generateDocumentsInner`)
**Severity:** CRITICAL

**Issue:** `illinois-hb3773` has NO case in `generateDocumentsInner`. Every other ready product has a case; Illinois is completely absent. The Illinois PDF module (`src/lib/pdf-illinois/index.ts`) exists with 8 exported functions (notification-letter, system-inventory, impact-assessment, oversight-protocol, compliance-checklist, accommodation-form, manager-training, employee-faq) and is never called from the generator.

**Evidence:**
- `src/data/regulations.ts` line 285: `slug: "illinois-hb3773"`, `ready: true`, `stripePriceId: "price_1TA1xZGidFVHIL99wuSn7aiD"` (non-empty, live)
- `src/app/api/create-checkout/route.ts` line 25: `const slug = regulation || "illinois-hb3773"` — this is also the fallback slug for malformed requests
- `src/lib/pdf-generator.ts` line 1062: throws `Error: No PDF generator found for regulation "illinois-hb3773"`

**Consequence:** Any customer who purchases Illinois HB3773 (the flagship product, the default fallback, a top-of-funnel product for a law that went into effect January 1, 2026) will complete checkout, return to the site, and have their PDF generation throw an unhandled error. The PostPaymentHandler will catch it and show a failure state. They paid; they get nothing. This is a revenue-destroying live bug.

**Fix:** Add the illinois case to `generateDocumentsInner` between line 30 and the first existing case:
```typescript
if (data.regulation === "illinois-hb3773") {
  const il = await import("./pdf-illinois");
  return [
    { doc: il.generateNotificationLetter(data), name: `${companySlug}_IL_Employee_AI_Notification.pdf` },
    { doc: il.generateSystemInventory(data), name: `${companySlug}_IL_AI_System_Inventory.pdf` },
    { doc: il.generateImpactAssessment(data), name: `${companySlug}_IL_Impact_Assessment.pdf` },
    { doc: il.generateOversightProtocol(data), name: `${companySlug}_IL_Human_Oversight_Protocol.pdf` },
    { doc: il.generateComplianceChecklist(data), name: `${companySlug}_IL_Compliance_Checklist.pdf` },
    { doc: il.generateAccommodationForm(data), name: `${companySlug}_IL_Accommodation_Request_Form.pdf` },
  ];
}
```
(6 documents matches the `documentCount: 6` in regulations.ts. manager-training and employee-faq may be the manager-ai-training-kit addon, not base product — verify against REGULATION_CONFIG documents list.)

---

## HIGH FINDINGS

### FINDING ALPHA-H1 — Duplicate `getStripe` Function (Webhook Route)
**File:** `src/app/api/webhooks/stripe/route.ts` lines 9-13
**Severity:** HIGH

**Issue:** The webhook route defines its own local `getStripe()` function that is identical to the exported `getStripe()` in `src/lib/stripe.ts`. The simplicity agent created the shared function in `src/lib/stripe.ts`, and `src/app/api/create-checkout/route.ts` and `src/app/api/verify-payment/route.ts` correctly import from there — but `src/app/api/webhooks/stripe/route.ts` was not updated to use the shared version.

**Evidence:**
- `src/lib/stripe.ts` line 3: `export function getStripe(): Stripe { return new Stripe(...) }`
- `src/app/api/webhooks/stripe/route.ts` line 9: `function getStripe() { return new Stripe(...) }` (private, not imported)
- create-checkout and verify-payment: `import { getStripe } from "@/lib/stripe"` ✓

**Consequence:** If the Stripe API version or config ever needs to change, it must be updated in two places. The webhook route is the most security-sensitive path (signature verification, payment recording). One copy will diverge. Future developers will see `import { getStripe }` in 2 of 3 routes and not know there's a third that rolls its own.

**Fix:** Remove the local function from the webhook route, add `import { getStripe } from "@/lib/stripe"` at the top, and replace the internal `getStripe()` call with the imported version.

---

### FINDING ALPHA-H2 — Duplicate `StatusBadge` Component
**File:** `src/app/products/[slug]/page.tsx` line 52 and `src/components/ProductLibrary.tsx` line 44
**Severity:** HIGH

**Issue:** `StatusBadge` is defined identically in two places. Both accept `{ status: string; ready: boolean }`, both render "COMING SOON" when `!ready`, both use the same status/label/color mappings. This is exact duplication.

**Evidence:**
- `src/app/products/[slug]/page.tsx:52`: `function StatusBadge({ status, ready }: { status: string; ready: boolean })`
- `src/components/ProductLibrary.tsx:44`: `function StatusBadge({ status, ready }: { status: string; ready: boolean })`

**Consequence:** When a new status type is added (e.g., "sunset" or "challenged"), it must be added to both. The current session added a new status value path — if one was missed it would silently render wrong. Duplication in shared UI primitives is a maintenance trap.

**Fix:** Extract to `src/components/StatusBadge.tsx`, import in both locations. This also makes it testable in isolation.

---

### FINDING ALPHA-H3 — `existsSync` in Server Component (Build-Time Risk)
**File:** `src/app/products/[slug]/page.tsx` lines 4, 9-13
**Severity:** HIGH

**Issue:** `existsSync` from Node.js `fs` is used at module-level in a Next.js page:
```typescript
const SLUGS_WITH_PREVIEWS = new Set(
  regulations.filter(r => r.ready).map(r => r.slug).filter(slug =>
    existsSync(join(process.cwd(), "public", "previews", `${slug}.webp`))
  )
);
```

This runs once at module initialization time. In Next.js App Router, module-level code in server components runs at **build time for static pages** and **at cold start for dynamic pages**. The behavior depends on whether this page is static or dynamic.

**The actual risk:** `generateStaticParams()` is defined (line 22), making this a statically generated page. Module-level code in statically-generated pages runs at build time — `process.cwd()` will be the build machine's working directory, not the production server. This works correctly on the same machine. However:
1. It's a filesystem operation in code that mixes with rendering logic
2. If this page ever becomes dynamic (someone adds `export const dynamic = 'force-dynamic'`), it runs at request time as a filesystem check in a serverless function — which will fail silently on some platforms
3. The intent (checking for preview images) would be better expressed as a build step or a data attribute

**Consequence:** Silent failure risk if deployment model changes. `SLUGS_WITH_PREVIEWS` will silently be empty if the working directory assumption doesn't hold, causing preview components to disappear without error.

---

### FINDING ALPHA-H4 — `decisions` Field Required in `RegulationConfig` But Not Always Meaningful
**File:** `src/lib/pdf-types.ts` line 59, `src/lib/regulation-config.ts` various
**Severity:** HIGH

**Issue:** `RegulationConfig.decisions` is typed as required `[string, string][]`. Products that skip steps 2, 3, and 4 (e.g., `ai-governance-framework` with `skippedSteps: [2, 3, 4]`) still must supply a `decisions` array, even though it's never shown to the user or used in the PDF. This forces maintainers to invent fake decision categories for products that don't use them — which is currently happening (governance framework has hiring/customer_service/financial decisions that are never surfaced to users).

**Consequence:** When adding product #54 that skips AI-system steps, the developer must still provide a `decisions` field or TypeScript will error. They will copy-paste from another product, creating misleading data. If `decisions` ever gets used in analytics or reporting, governance-framework purchases will be miscategorized.

**Fix:** Make `decisions` optional in `RegulationConfig` (`decisions?: [string, string][]`) and handle the undefined case in `Questionnaire.tsx` line 113 (`const decisions = config?.decisions || []` — already done here, so the type just needs updating).

---

## MEDIUM FINDINGS

### FINDING ALPHA-M1 — Legacy `MARGIN` Alias Used in 234 Files
**File:** `src/lib/pdf-helpers.ts` line 12
**Severity:** MEDIUM

**Issue:** `src/lib/pdf-helpers.ts` exports both `LEFT_MARGIN = 25` (the canonical constant) and `MARGIN = LEFT_MARGIN` (a legacy alias). 234 files across the generator modules still import `MARGIN`. The comment says "Legacy alias used by generators that reference MARGIN" — but it hasn't been cleaned up.

**Evidence:**
- 234 files import and use `MARGIN` (verified via grep)
- `src/lib/pdf-helpers.ts` lines 11-12: `// Legacy alias used by generators that reference MARGIN` / `export const MARGIN = LEFT_MARGIN`

**Consequence:** This is not a bug. `MARGIN === LEFT_MARGIN` so all PDFs render correctly. But having two names for the same thing in 234 files means future margin adjustments require understanding which alias to update. A new generator author will import `LEFT_MARGIN` (the documented canonical form) and get slightly different semantics in code review. Technical debt that grows with every new product.

**Status:** Acceptable for now — this is cosmetic. Low priority to fix but should not proliferate.

---

### FINDING ALPHA-M2 — `loadSavedForm` Returns `Record<string, any>`
**File:** `src/components/Questionnaire.tsx` line 25
**Severity:** MEDIUM

**Issue:**
```typescript
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function loadSavedForm(key: string): Record<string, any> | null {
```

The function deserializes saved form state from sessionStorage with no type validation. Every property access (`saved?.step`, `saved?.companyName`, etc.) is `any`-typed. The eslint-disable comment acknowledges this.

**Consequence:** If sessionStorage contains stale data from a previous schema (e.g., a customer returns to the page after a field was renamed in a deploy), TypeScript provides no protection. The `initialStep` calculation (`saved.step && typeof saved.step === "number"`) adds runtime protection for the step field but not for any other fields. A stale `aiSystems` entry with a missing field will be passed directly to the form.

**Impact is limited** because sessionStorage is per-origin and per-tab — stale data only persists until the browser is closed. But this is a type safety hole in the most user-visible flow.

---

### FINDING ALPHA-M3 — Two Distinct `regulations.ts` vs `regulation-config.ts` Maintenance Points
**File:** `src/data/regulations.ts` and `src/lib/regulation-config.ts`
**Severity:** MEDIUM

**Issue:** The product library has two authoritative sources for overlapping data:
- `regulations.ts` (1583 lines): product metadata, Stripe price IDs, document lists, status, pricing
- `regulation-config.ts` (2205 lines): questionnaire config, document lists (again), statute text, pricing (again via `basePrice`)

Both files have `documents: string[]` for each product. Both have pricing. They are manually kept in sync. When a document is added to a product, it must be updated in **both** files.

**Evidence of duplication:**
- `regulations.ts` "illinois-hb3773": `documents: ["Employee & Applicant AI Notification", "AI System Inventory", ...]`, `price: 299`
- `regulation-config.ts` "illinois-hb3773": `documents: ["Employee/Applicant AI Notification Template (customized)", ...]`, `basePrice: 299`

Note the document names are not even identical ("Employee & Applicant AI Notification" vs "Employee/Applicant AI Notification Template (customized)") — they've already drifted between the two files.

**Consequence:** Adding product #54 requires updating at minimum 4 places: regulations.ts, regulation-config.ts, pdf-generator.ts, and the PDF module itself. The two `documents` arrays will drift further over time as products are updated. Future developers won't know which is authoritative for display.

**Fix direction:** Consider making `regulation-config.ts` the source of truth for all questionnaire/product data and deriving what's needed in `regulations.ts`, or vice versa. Not a quick fix, but this split is the primary architectural fragility.

---

### FINDING ALPHA-M4 — `reducedMotion` useRef Initialized Once at Mount
**File:** `src/components/ProductCarousel.tsx` lines 14-16
**Severity:** MEDIUM

**Issue:**
```typescript
const reducedMotion = useRef(
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
);
```

This captures the user's reduced-motion preference at component mount and never updates. If the user changes their OS accessibility setting while the page is open (uncommon but possible), the carousel won't respond. More importantly, the `window !== "undefined"` guard makes this evaluate to `false` during SSR, but since `useRef`'s initializer only runs on the client where `window` exists, this is fine in practice.

**Consequence:** Minor accessibility gap — not a bug in practice since users rarely change reduced-motion settings mid-session.

---

### FINDING ALPHA-M5 — `DOC_EXPLANATIONS` Is a Static Map That Will Go Stale
**File:** `src/app/products/[slug]/page.tsx` lines 84-130
**Severity:** MEDIUM

**Issue:** The product page has a 46-entry static Record mapping document names to explanations. As of this audit, many document names in regulations.ts don't appear in DOC_EXPLANATIONS (the page silently renders no explanation for them — `{DOC_EXPLANATIONS[doc] && (...)}` at line 364).

**Examples of uncovered documents:**
- "Algorithmic Discrimination Prevention Plan", "AI Hiring Risk Assessment", "AI Vendor Privacy Assessment", "AEDT System Inventory", "AI System Performance Monitoring Report", and many addon document names

**Consequence:** Product pages for newer products show documents with no explanatory text. Customers see a document name but no plain-language explanation of what it is or why they need it. This directly impacts conversion.

---

## LOW FINDINGS

### FINDING ALPHA-L1 — `create-checkout` Uses `illinois-hb3773` as Default Fallback
**File:** `src/app/api/create-checkout/route.ts` line 25
**Severity:** LOW

```typescript
const slug = regulation || "illinois-hb3773";
```

A missing or empty `regulation` body parameter silently falls through to the Illinois product. Given that Illinois HB3773 has no PDF generator case (ALPHA-C1), a malformed API call would: (1) succeed at checkout with Illinois pricing, (2) fail at PDF generation. This is a secondary consequence of ALPHA-C1, but the fallback should be removed or changed to an explicit error once ALPHA-C1 is fixed.

---

### FINDING ALPHA-L2 — `RegulationConfig.decisions` Required But Typed Incorrectly
**File:** `src/lib/pdf-types.ts` line 59
**Severity:** LOW

`decisions: [string, string][]` is typed as a required field, but the actual data in regulation-config.ts entries that skip step 2 provides decisions arrays that are never rendered. This is a type/reality mismatch that will confuse developers reading the type definition. (Linked to ALPHA-H4.)

---

### FINDING ALPHA-L3 — `next.config.ts` Redirects Are Correct But Incomplete
**File:** `next.config.ts` lines 10-23
**Severity:** LOW

The `/regulations` → `/products` and `/regulations/:slug` → `/products/:slug` redirects are correctly implemented as permanent (308) redirects. This is good.

However, the old product-detail URL pattern appears to have been `/regulations/[slug]`, and if any external links use `/products/[slug]#generator` anchors, those will work. No issue found here — this is a clean implementation.

---

### FINDING ALPHA-L4 — `Questionnaire.tsx` validate() Doesn't Cover `skippedSteps` Gracefully
**File:** `src/components/Questionnaire.tsx` line 116
**Severity:** LOW

```typescript
if (skippedSteps.includes(step)) return true;
```

`validate()` exits early for skipped steps. But `skippedSteps` is `config?.skippedSteps || []` filtered to remove step 6. If a config has step 4 skipped, `aiRole` is never set, and `collectFormData()` sends `aiRole: ""` to the PDF generator. Most generators handle empty strings gracefully (they render "Not specified"), but this is implicit behavior, not enforced.

---

## ARCHITECTURAL COHERENCE ASSESSMENT

### What Was Done Well

1. **generateDocumentsInner is correctly exported** — The session audit concern is confirmed resolved. `generateDocumentsInner` at line 26 is `export async function`, making it importable for testing.

2. **Illinois silent fallback removed** — No default-to-illinois fallback exists inside `generateDocumentsInner`. The function throws clearly at line 1062. The fallback that existed was in `create-checkout` (ALPHA-L1) which is a different issue.

3. **aria-pressed refactor complete** — `ProductLibrary.tsx` line 201 correctly uses `aria-pressed` on filter buttons. No `role="tab"` or `role="tablist"` patterns found in the filter UI.

4. **Shared getStripe() partially consolidated** — create-checkout and verify-payment both use the shared `src/lib/stripe.ts`. Only the webhook route is missed (ALPHA-H1).

5. **ROLE_LABELS dedup completed** — `ROLE_LABELS` lives in `src/lib/pdf-helpers.ts` line 67. Used by StepReviewCheckout, EU AI Act generators, NIST generators, and Illinois generators via a single import path. No duplication found.

6. **ProductCarousel pause button works correctly** — `paused` state, reduced-motion check, and play/pause SVG toggling are all structurally sound.

7. **SLUGS_WITH_PREVIEWS build-time check** — `existsSync` at module level runs correctly at build time for statically generated pages. It's architecturally questionable (see ALPHA-H3) but functionally correct for the current deployment model.

8. **Questionnaire step persistence is safe** — The session storage persistence uses a product-specific key (`questionnaire-${regulationSlug}`), preventing cross-product contamination.

9. **next.config.ts redirects are clean** — The `/regulations` → `/products` redirect is permanent and covers both the root and slug paths.

---

### Fragility Points for Product #54

When the next developer adds a new product, they must:

1. Add entry to `src/data/regulations.ts` ✓ (well documented by pattern)
2. Add entry to `src/lib/regulation-config.ts` ✓ (required for questionnaire)
3. Create `src/lib/pdf-[slug]/` module directory and index.ts
4. Add case to `generateDocumentsInner` in `src/lib/pdf-generator.ts` — **this step has already been missed for Illinois, proving it's easy to forget**
5. Keep `documents[]` arrays in sync between regulations.ts and regulation-config.ts — **already drifted for Illinois**
6. Add entries to `DOC_EXPLANATIONS` in products/[slug]/page.tsx for new doc names

There is no validation, test, or guard that catches a missing case in step 4. The only signal is a runtime throw after a real customer completes checkout.

---

## SUMMARY TABLE

| ID | Severity | File | Issue | Impact |
|----|----------|------|-------|--------|
| C1 | CRITICAL | pdf-generator.ts | Illinois HB3773 missing from generateDocumentsInner | Live customers get error after purchase |
| H1 | HIGH | webhooks/stripe/route.ts | Duplicate getStripe() not using shared lib | Maintenance divergence in security-critical path |
| H2 | HIGH | page.tsx + ProductLibrary.tsx | Duplicate StatusBadge component | UI inconsistency risk when statuses are added |
| H3 | HIGH | products/[slug]/page.tsx | existsSync at module level | Silent failure if deployment model changes |
| H4 | HIGH | pdf-types.ts | decisions required but not needed by many products | Type/data mismatch misleads future developers |
| M1 | MEDIUM | pdf-helpers.ts | Legacy MARGIN alias in 234 files | Technical debt, no current bug |
| M2 | MEDIUM | Questionnaire.tsx | loadSavedForm uses any type | Type safety hole in checkout flow |
| M3 | MEDIUM | regulations.ts + regulation-config.ts | Dual sources of truth for documents/pricing | Documents already drifted, will continue |
| M4 | MEDIUM | ProductCarousel.tsx | reducedMotion captured once at mount | Minor accessibility gap |
| M5 | MEDIUM | products/[slug]/page.tsx | DOC_EXPLANATIONS missing many newer documents | Missing conversion copy on product pages |
| L1 | LOW | create-checkout/route.ts | Illinois as default fallback slug | Secondary consequence of C1 |
| L2 | LOW | pdf-types.ts | decisions typed required, often meaningless | Misleading type definition |
| L3 | LOW | next.config.ts | Redirects correct | No issue |
| L4 | LOW | Questionnaire.tsx | validate() doesn't enforce aiRole when step 4 skipped | Implicit empty-string behavior in PDFs |
