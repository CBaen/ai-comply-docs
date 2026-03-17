# Build Brief: Single Source of Truth Consolidation

## Date: 2026-03-17
## Project: AI Compliance Documents (aicompliancedocuments.com)
## Source: Triadic session audit finding ALPHA-C4 + cross-review discovery

### Goal
Eliminate the three-source product data problem. After this build, adding product #54 means editing ONE entry in ONE file for identity/pricing/citation data. Questionnaire config and email content derive from that single source.

### Build Tasks

**Round 1 (parallel — no dependencies between builders):**

1. **Data Layer Builder:**
   - Strip duplicated fields from `RegulationConfig` interface (name, basePrice, statute, lawUrl, documents)
   - Strip those same fields from all 53 entries in `regulation-config.ts`
   - Add `lawLinkText` to the `Regulation` interface in `regulations.ts` (currently only in regulation-config — move it to the source of truth)
   - Export a helper `getRegulationConfig(slug)` that merges regulation data with config data for convenience

2. **UI Builder:**
   - Update `Questionnaire.tsx` to get name, price, citation, citationUrl, documents from `getRegulation(slug)` instead of from `REGULATION_CONFIG`
   - Update `StepReviewCheckout.tsx` props: lawUrl → citationUrl, statute → citation, basePrice → price
   - Update any other questionnaire step files that read from config fields being removed

3. **API Builder:**
   - Simplify `create-checkout/route.ts` to use only `regulations.ts`
   - Replace `REGULATION_EMAIL` 55-entry map in `send-documents/route.ts` with a function that derives email content from `getRegulation(slug)`. Keep custom `steps[]` as a slim per-slug override map.
   - Update `products/[slug]/page.tsx` if it reads any removed fields from regulation-config

### Team Size: 3 builders + 2 reviewers = 5 agents
Three distinct domains (data, UI, API) with clean file boundaries. Two reviewers for independent cross-domain integration checking.

### Builder Assignments
| Builder | Domain | Files Owned |
|---------|--------|-------------|
| Data Layer | Types + config | `src/lib/pdf-types.ts`, `src/lib/regulation-config.ts`, `src/data/regulations.ts` |
| UI | Questionnaire | `src/components/Questionnaire.tsx`, `src/components/questionnaire/*.tsx` |
| API | Routes + pages | `src/app/api/create-checkout/route.ts`, `src/app/api/send-documents/route.ts`, `src/app/products/[slug]/page.tsx` |

### Round Structure
Single round — all three builders work in parallel. The Data Layer builder goes first in priority (others depend on the interface changes), but since they're editing different files, they can work simultaneously as long as the Data Layer builder documents the new interface clearly.

### Project Constraints
- Never show code to Guiding Light — use outcomes and analogies
- The `addons[]` array in regulation-config has `stripePriceId` values that must NOT be lost
- All 53 products must still render, checkout, and generate documents after the change
- Build must pass: `npx next build`
- `regulations.ts` is the source of truth for: name, shortName, price, stripePriceId, citation, citationUrl, documents[], status, effectiveDate
- `regulation-config.ts` keeps ONLY: decisions[], helpTexts, acknowledgment, lawLinkText, skippedSteps, oversightOptions, dataInputOptions, gateText, addons[]

### Verification Plan
1. `npx next build` — must pass with zero errors
2. Spot-check: `grep -c "basePrice" src/lib/regulation-config.ts` should return 0
3. Spot-check: `grep -c "statute:" src/lib/regulation-config.ts` should return 0
4. Verify `REGULATION_EMAIL` map is gone or reduced to steps-only overrides
5. Verify all regulation-config entries still have their addons[] with stripePriceIds
