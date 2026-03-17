# Data Layer Builder — Types + Configuration Consolidation
**Round 1 Build Report**
Date: 2026-03-17

---

## Objective

Eliminate duplicate product data across three files so `regulations.ts` becomes the single source of truth for product identity, pricing, and citations. The `regulation-config.ts` file retains only form-behavior and document-generation configuration. A `getFullConfig(slug)` helper merges the two layers on demand.

---

## Files Changed

| File | Role | Change Summary |
|------|------|----------------|
| `src/lib/pdf-types.ts` | Type definitions | Removed `name`, `statute`, `lawUrl`, `basePrice`, `documents` from `RegulationConfig`; made `lawLinkText` optional |
| `src/data/regulations.ts` | Product identity, pricing, citations (source of truth) | Added `lawLinkText?: string` to `Regulation` interface; populated all 51 ready-state entries from config values |
| `src/lib/regulation-config.ts` | Form behavior, helpTexts, addons | Removed all 5 redundant fields from all 53 entries; added `getFullConfig` helper; added `import { getRegulation }` |
| `src/components/Questionnaire.tsx` | UI consumer | Fixed TS error: `lawLinkText` prop now uses `config.lawLinkText ?? reg?.lawLinkText ?? ""` fallback chain |

---

## Task Completion

### Task 1 — Update `RegulationConfig` interface
`src/lib/pdf-types.ts` — Complete.

Removed fields: `name`, `statute`, `lawUrl`, `basePrice`, `documents`.
`lawLinkText` is now `lawLinkText?: string` (optional, bridging period where some entries may not yet have it on the `Regulation` side).

### Task 2 — Remove redundant fields from all 53 entries in `regulation-config.ts`
Complete. All 53 entries stripped of `name`, `statute`, `lawUrl`, `basePrice`, and `documents`.

Entries that had a `documents` array (these are now sourced from `Regulation.documents` in `regulations.ts`):
- `board-ai-summary`, `consumer-notice-kit`, `data-mapping-inventory`, `consumer-rights-kit`
- `ai-governance-framework`, `ai-system-registry`, `ai-transparency-report`, `ai-whistleblower-policy`, `customer-ai-aup`
- `indiana-icdpa`, `montana-mcdpa`, `kentucky-kcdpa`, `new-jersey-njdpa`
- `il-notice-response-kit`, `il-zip-proxy-audit`
- `co-appeal-correction-kit`, `co-ag-reporting-kit`, `co-dev-deploy-exchange`
- `ca-admt-notice-optout`, `ca-admt-access-kit`, `ca-cyber-audit-kit`
- `nyc-bias-audit-mgmt`, `nyc-candidate-notice-kit`
- `va-consumer-rights-kit`, `va-profiling-assessment-kit`, `va-controller-processor-kit`
- `eu-fria-kit`, `eu-post-market-kit`, `eu-human-oversight-kit`, `eu-registration-transparency`

`addons[]` arrays were intentionally preserved — they carry unique Stripe price IDs that do not belong in `regulations.ts`.

### Task 3 — Add `lawLinkText` to `Regulation` interface and populate all entries
`src/data/regulations.ts` — Complete.

Added to interface: `/** Human-readable link text for the law citation, shown in the law gate. */ lawLinkText?: string;`

Two entries intentionally left without `lawLinkText`: `education-k12-ai` and `hr-recruiting-ai` — both have `ready: false` and no corresponding config entry, so no source value existed.

### Task 4 — Export `getFullConfig(slug)` helper
Added at end of `regulation-config.ts`:

```typescript
export function getFullConfig(slug: string) {
  const reg = getRegulation(slug);
  const config = REGULATION_CONFIG[slug];
  if (!reg || !config) return null;
  return { ...reg, ...config };
}
```

Spread order: `reg` first, `config` second — config fields win on collision, which is correct since config is the more specific layer (e.g., `lawLinkText` could exist on both; config value takes precedence during the migration window).

---

## Type Safety

`npx tsc --noEmit` passes with zero errors after fixing one downstream issue:

- `Questionnaire.tsx` line 467 was passing `config.lawLinkText` (now `string | undefined`) to a prop typed `string`. Fixed with: `config.lawLinkText ?? reg?.lawLinkText ?? ""`. This follows the expected resolution order: config override > regulation default > empty string.

---

## Data Integrity Notes

- `lawLinkText` values in `regulations.ts` were transcribed directly from the existing config entries — no values were changed or invented.
- `addons[]` on `illinois-hb3773` was preserved in `regulation-config.ts` as specified (contains a unique Stripe price ID).
- `REGULATION_CONFIG` type is `Record<string, RegulationConfig>` — the record is not exhaustive by type, so missing slugs return `undefined` safely.

---

## What Consumers Should Now Use

| Need | Use |
|------|-----|
| Product name, price, citation URL | `getRegulation(slug)` from `@/data/regulations` |
| Form steps, helpTexts, addons | `REGULATION_CONFIG[slug]` from `@/lib/regulation-config` |
| Everything merged | `getFullConfig(slug)` from `@/lib/regulation-config` |

---

## Round 2 Candidates

- Migrate any remaining consumers that still call both `getRegulation` and `REGULATION_CONFIG` separately to use `getFullConfig` instead.
- Audit `StepReviewCheckout` props (`statute`, `lawUrl`, `documents`, `basePrice`) — these are passed from `Questionnaire.tsx` and can now be sourced cleanly from `reg` rather than duplicated in config.
- Consider making `REGULATION_CONFIG` exhaustive by key type to get compile-time safety for missing slugs.
