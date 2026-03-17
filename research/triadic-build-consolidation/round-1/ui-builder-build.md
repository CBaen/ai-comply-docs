# UI Builder Build Report — Round 1
**Date:** 2026-03-17
**Builder:** UI Builder (Questionnaire components)

---

## Assignment Summary

Update Questionnaire components to read `name`, `price`, `citation`, `citationUrl`, and `documents` from `regulations.ts` (via `getRegulation`) instead of from `REGULATION_CONFIG`. The Data Layer Builder is simultaneously removing those fields from `RegulationConfig`.

---

## Files Read

| File | Purpose |
|------|---------|
| `src/components/Questionnaire.tsx` | Main orchestrator — all config field reads live here |
| `src/components/questionnaire/StepReviewCheckout.tsx` | Consumer of config fields passed as props |
| `src/components/questionnaire/types.ts` | Prop type definitions |
| `src/components/questionnaire/StepCompanyInfo.tsx` | Step 1 — no config field references |
| `src/components/questionnaire/StepAISystems.tsx` | Step 2 — no config field references |
| `src/components/questionnaire/StepDataBias.tsx` | Step 3 — no config field references |
| `src/components/questionnaire/StepOversight.tsx` | Step 4 — no config field references |
| `src/components/questionnaire/StepContact.tsx` | Step 5 — no config field references |
| `src/lib/regulation-config.ts` | Source of truth for workflow fields (kept) |
| `src/lib/pdf-types.ts` | `RegulationConfig` interface + `ComplianceFormData` |
| `src/data/regulations.ts` | `Regulation` interface + `getRegulation()` function |

---

## Changes Made

### `src/components/Questionnaire.tsx` — only file modified

**1. Added import for `getRegulation`:**
```
import { getRegulation } from "@/data/regulations";
```

**2. Added `reg` lookup immediately after `config`:**
```
const reg = getRegulation(regulationSlug);
```

**3. Added `regPrice` computed value (replaces `config.basePrice` and also harmonizes with the `price` prop):**
```
const regPrice = reg?.price ?? price;
```
Placed at line ~300 alongside `orderTotal` computation. Falls back to the `price` prop if `reg` is not found (defensive — config guard at line 309 would catch a missing reg first in practice).

**4. Updated `orderTotal` calculation:**
- Before: `config.basePrice + addons sum`
- After: `regPrice + addons sum`
- Also simplified: removed the `selectedAddons.length > 0` shortcut path that was using just `price` — now both paths use `regPrice` for consistency.

**5. Updated product summary bar:**
- `config.documents.length` → `reg?.documents.length ?? 0`
- `${price}` → `${regPrice}`

**6. Updated StepReviewCheckout props (Step 6 JSX):**
- `statute={config.statute}` → `statute={reg?.citation ?? ""}`
- `lawUrl={config.lawUrl}` → `lawUrl={reg?.citationUrl ?? ""}`
- `basePrice={config.basePrice}` → `basePrice={regPrice}`
- `documents={config.documents}` → `documents={reg?.documents ?? []}`
- `lawLinkText`, `acknowledgment`, `gateText`, `addons` — unchanged, still from `config`

---

## Decision: Prop Names Unchanged in StepReviewCheckout

Per brief instruction: kept prop names `statute`, `lawUrl`, `basePrice`, `documents` identical in `StepReviewCheckout.tsx` and `types.ts`. Only the values passed from `Questionnaire.tsx` changed. This minimizes diff surface and avoids touching files that don't need to change.

`StepReviewCheckout.tsx` and `types.ts` were NOT modified.

---

## Fields Still Read from REGULATION_CONFIG

These remain config-sourced (correct — they are workflow fields not in `regulations.ts`):

| Field | Used for |
|-------|---------|
| `config.decisions` | Step 2 AI system decision checkboxes |
| `config.helpTexts` | All step help text |
| `config.acknowledgment` | Step 6 acknowledgment checkbox text |
| `config.lawLinkText` | Step 6 law link label |
| `config.skippedSteps` | Step visibility logic |
| `config.oversightOptions` | Step 4 AI role options |
| `config.dataInputOptions` | Step 3 data input options |
| `config.gateText` | Step 6 framework gate message |
| `config.addons` | Step 6 addon checkboxes |

---

## Fields Now Read from `getRegulation(regulationSlug)`

| Old (config) | New (reg) | Location used |
|---|---|---|
| `config.basePrice` | `reg.price` | `orderTotal`, product bar, `basePrice` prop |
| `config.statute` | `reg.citation` | `statute` prop to StepReviewCheckout |
| `config.lawUrl` | `reg.citationUrl` | `lawUrl` prop to StepReviewCheckout |
| `config.documents` | `reg.documents` | `documents` prop + document count in product bar |

---

## Verification

After all edits, ran a grep for `config\.(statute|lawUrl|basePrice|documents)` across `src/` — zero matches. All removed fields have been cleared from the UI layer.

---

## Interface Contract for Reviewer

`StepReviewCheckout` still receives these props (names unchanged):
- `statute: string` — populated from `reg.citation`
- `lawUrl: string` — populated from `reg.citationUrl`
- `basePrice: number` — populated from `reg.price`
- `documents: string[]` — populated from `reg.documents`

`types.ts` prop interface for `StepReviewCheckoutProps` is unchanged.

---

## Notes for Data Layer Builder

The `RegulationConfig` interface in `pdf-types.ts` still declares `name`, `statute`, `lawUrl`, `basePrice`, and `documents`. After the Data Layer Builder removes those fields, TypeScript will confirm our work is correct — any remaining references would surface as compile errors. None should remain in the UI layer.

The `if (!config) return null` guard at line 309 of `Questionnaire.tsx` still provides protection if `REGULATION_CONFIG` does not have an entry for the slug. A similar guard for `reg` is not needed because all data from `reg` uses optional chaining with fallback defaults (`?? ""`, `?? []`, `?? price`).
