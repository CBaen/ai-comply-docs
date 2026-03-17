# Adversarial Review — Consolidation Build
**Reviewer:** Independent (did not build this code)
**Date:** 2026-03-17
**Scope:** Data layer, UI, and API consolidation across regulations.ts, regulation-config.ts, Questionnaire.tsx, and send-documents/route.ts

---

## 1. Integration Errors

### CRITICAL — `lawLinkText` still lives in BOTH files for all 53 products

**Evidence:**
- `src/lib/pdf-types.ts:52` — `lawLinkText?: string` remains in `RegulationConfig` interface with a comment saying it "Migrated to Regulation.lawLinkText on the regulations.ts side."
- Running a cross-file analysis confirms: **all 53 slugs** have `lawLinkText` populated in both `regulation-config.ts` AND `regulations.ts`.
- `Questionnaire.tsx:467` — The resolution uses `config.lawLinkText ?? reg?.lawLinkText ?? ""`, meaning the config-side value wins silently.

**Why this is critical:** The consolidation goal was to eliminate duplication. The field was NOT removed from `regulation-config.ts` entries — it was only added to `regulations.ts`. There are now two authoritative sources for the same field. Any future edit to one file without the other will create a discrepancy with no warning.

**Three specific conflicts found where the text already differs between the two files:**

| Slug | regulation-config.ts value | regulations.ts value |
|------|---------------------------|----------------------|
| `connecticut-ctdpa` | `Read Conn. Gen. Stat. AA 42-515...` (§§ stripped to AA) | `Read Conn. Gen. Stat. §§ 42-515...` (correct) |
| `virginia-cdpa` | `Read Va. Code AA 59.1-575...` (§§ stripped to AA) | `Read Va. Code §§ 59.1-575...` (correct) |
| `oregon-cpa` | `Read ORS AA 646A.570...` (§§ stripped to AA) | `Read ORS §§ 646A.570...` (correct) |

The config-side `??` operator resolves to the config value first. This means `connecticut-ctdpa`, `virginia-cdpa`, and `oregon-cpa` are **currently showing the wrong law link text** — the corrupted version with "AA" instead of "§§". Users clicking the law gate for these three products see the broken text; the checkout gate still functions (URL comes from `reg?.citationUrl`), but the visible link text is wrong.

**Files:** `src/lib/pdf-types.ts:52`, `src/lib/regulation-config.ts` (all 53 entries), `src/components/Questionnaire.tsx:467`

---

### CRITICAL — `education-k12-ai` and `hr-recruiting-ai` have no entry in `regulation-config.ts`

**Evidence:**
- Both slugs exist in `regulations.ts` (lines ~835 and ~865 respectively).
- Neither slug has any entry in `REGULATION_CONFIG` in `regulation-config.ts`.
- Both have `ready: false` in `regulations.ts` and both have empty `stripePriceId: ""`.

**Impact:** If a product page for either slug ever renders a `Questionnaire`, the `config` variable will be `undefined` and `Questionnaire.tsx:309` will return `null` — the form silently disappears. There is no error boundary, no user-facing message. The page just renders empty below the product header.

This is not a regression from the consolidation (these products were presumably always config-less), but the consolidation work did not flag it. Now that the config file was touched for 53 entries, this gap is an active mine.

**Files:** `src/data/regulations.ts:835, 865`, `src/lib/regulation-config.ts` (absent), `src/components/Questionnaire.tsx:309`

---

## 2. Constraint Violations

### IMPORTANT — `lawLinkText` field not removed from `regulation-config.ts` entries

The build brief states `name`, `basePrice`, `statute`, `lawUrl`, `documents` were stripped from `RegulationConfig`. The `lawLinkText` field was not stripped — it was migrated by adding it to `regulations.ts` but leaving it in `regulation-config.ts`. The `RegulationConfig` interface retains the field (marked optional with a migration comment), and all 53 entries still populate it.

The consolidation is half-complete for this field. The "single source of truth" constraint is violated: both files are authoritative, and the config-side wins due to operator precedence at `Questionnaire.tsx:467`.

**Files:** `src/lib/pdf-types.ts:52`, `src/lib/regulation-config.ts` (every entry)

---

### ADVISORY — `getFullConfig()` helper merges in the wrong direction for `lawLinkText`

`src/lib/regulation-config.ts:1611` — `return { ...reg, ...config }` — the spread order means `config` properties win over `reg` properties when keys collide. This is correct for form-behavior fields (the config side should win for `acknowledgment`, `decisions`, etc.), but it means any caller of `getFullConfig()` would also receive the config-side `lawLinkText` — the potentially corrupted version — rather than the canonical regulations.ts version.

If `getFullConfig()` is ever used in an email template or product page in the future, the three corrupted law link texts will surface there too.

**File:** `src/lib/regulation-config.ts:1611`

---

## 3. Bugs and Logic Errors

### IMPORTANT — Email body contains a grammatical non-sentence for most products

`src/app/api/send-documents/route.ts:190`:
```
Attached are ${companyName}'s ${reg.description}
```

`reg.description` is a noun phrase that describes the product (e.g., "If you're an Illinois employer using any software that helps screen, rank, or evaluate job candidates, this law applies to you..."). The sentence becomes:

> "Attached are Acme Corp's If you're an Illinois employer using any software..."

This is not a typo — it's a structural mismatch from the migration. The old `REGULATION_EMAIL` map had a dedicated short-form `description` field written as a noun phrase (e.g., "Illinois HB3773 compliance templates"). The new `deriveEmailContent()` function pulls `reg.description` directly, which is a marketing sentence starting with "If you..." or "This package covers...".

The truncation at `lastIndexOf(" ", 200)` makes it worse: the sentence is cut mid-clause and ends with "...".

**File:** `src/app/api/send-documents/route.ts:151-155, 190`

---

### ADVISORY — `deriveEmailContent()` silent null path

`src/app/api/send-documents/route.ts:146-162` — if `getRegulation(slug)` returns `undefined` (e.g., for a slug that was valid at checkout time but was later removed from `regulations.ts`), the function returns:
- `title`: `"Your {slug} Compliance Package"` (slug used as name)
- `statute`: `""` (empty string)
- `description`: `""` (empty string, then truncated to empty)
- `steps`: falls to the generic three-step fallback

No error is thrown, no log is written. The customer receives an email with no statute, no description, and a slug-as-title. This existed before the consolidation but the consolidation removed the static safety net that was the hardcoded map.

**File:** `src/app/api/send-documents/route.ts:146-162`

---

## 4. Edge Cases

### ADVISORY — `reg?.documents.length` vs `documents` prop mismatch in Questionnaire header

`Questionnaire.tsx:317` — The product summary bar shows `{reg?.documents.length ?? 0} documents`.
`Questionnaire.tsx:470` — The `documents` prop passed to `StepReviewCheckout` is `reg?.documents ?? []`.

Both read from `regulations.ts`, so they are consistent post-consolidation. This is not a bug — confirming no regression here.

---

### ADVISORY — `deriveEmailContent` description truncation can produce an empty string

If `reg.description` is 200 characters or less but ends in a period followed by a space (e.g., `"This product covers X. "`) and `lastIndexOf(" ", 200)` finds the trailing space at position 199, the truncation still works correctly. However, if the description is exactly 200 characters with no spaces in the first 200 (theoretically possible for a very dense description), `lastIndexOf(" ", 200)` returns -1, and `fullDesc.slice(0, -1)` would drop the last character rather than return the full string. No current products trigger this, but the logic is fragile.

**File:** `src/app/api/send-documents/route.ts:152-155`

---

## 5. Regression Risk

### IMPORTANT — `config.lawLinkText` wins over `reg.lawLinkText` for all 53 products

Before this build, there was presumably one source of `lawLinkText`. After this build, there are two. The operator chain `config.lawLinkText ?? reg?.lawLinkText ?? ""` means `regulations.ts` is only consulted if the config entry has no `lawLinkText` — which is never, because all 53 entries still have it. This means `regulations.ts` as the new "source of truth" for `lawLinkText` is effectively unreachable code for all existing products. Only new products that have no `regulation-config.ts` entry would read from `regulations.ts`.

The consolidation created the appearance of migration without actually routing traffic to the new source.

---

### ADVISORY — `getFullConfig()` is defined but not used anywhere in the codebase

A search for `getFullConfig` usages shows it is exported from `regulation-config.ts` but never imported elsewhere. It was added as the build brief describes, but nothing calls it. This is not a bug, but it means the helper's correctness (including the spread-order issue above) cannot be validated in production until it is wired up.

**File:** `src/lib/regulation-config.ts:1607`

---

## 6. Security

No new security surface introduced. The `send-documents` route validation (token, email format, base64 size, filename sanitization) is intact and unchanged. The `create-checkout` route correctly validates `stripePriceId` before passing to Stripe.

---

## 7. Test Coverage

No automated tests exist for any of these files. The consolidation is entirely untested by automated means. Build passing (`npx next build`) only confirms TypeScript compilation — it does not validate:
- That all 53 products render their correct `lawLinkText` to the user
- That the email body sentence is grammatically correct
- That `deriveEmailContent` handles unknown slugs with any visibility
- That addon `stripePriceIds` are present and non-empty

---

## 8. What Works

- The primary consolidation goal was achieved for `name`, `basePrice`, `statute`, `lawUrl`, and `documents` — these fields were cleanly removed from `RegulationConfig` and `regulation-config.ts` entries, and the UI correctly reads them from `getRegulation()`.
- `create-checkout` correctly reads `stripePriceId` from `regulations.ts` and addon `stripePriceId` from `regulation-config.ts` addons — no regression there.
- The `REGULATION_EMAIL` map elimination is structurally clean. `deriveEmailContent()` is a correct approach; the problem is the description field content mismatch, not the architecture.
- `STEP_OVERRIDES` correctly covers the 13 products with action-specific steps; the generic fallback is reasonable for the remaining 40.
- The `getRegulation()` lookup is a linear search through a 47-item array — acceptable performance for this scale.
- All 51 of 53 ready products have valid non-empty `stripePriceId` values in `regulations.ts`.

---

## Summary of Required Fixes

| # | Severity | Issue | File | Fix |
|---|----------|-------|------|-----|
| 1 | Critical | `lawLinkText` still in all 53 config entries; config-side wins, corrupting 3 products | `regulation-config.ts` all entries | Remove `lawLinkText` from all config entries; the `??` chain then reads from `regulations.ts` |
| 2 | Critical | `connecticut-ctdpa`, `virginia-cdpa`, `oregon-cpa` show "AA" instead of "§§" in law gate | `regulation-config.ts:412, 383, 441` | Fix 1 above corrects this automatically by removing the corrupted config-side values |
| 3 | Critical | `education-k12-ai` and `hr-recruiting-ai` have no config entry; questionnaire silently returns null | `regulation-config.ts` (absent) | Add stub entries or ensure these slugs are never passed to Questionnaire before going ready |
| 4 | Important | Email body sentence is grammatically broken — `reg.description` is not a noun phrase | `route.ts:190` | Rewrite the sentence to work with the marketing description format (e.g., "Attached are your ${companyName} ${name} compliance documents.") |
| 5 | Important | `getFullConfig()` spread order means config `lawLinkText` (corrupted) wins over reg `lawLinkText` | `regulation-config.ts:1611` | Fix 1 resolves this; if spread order is intentional for other fields, it is otherwise correct |
| 6 | Advisory | `deriveEmailContent` logs nothing when slug is unknown | `route.ts:146` | Add `console.error` when `getRegulation` returns undefined |
| 7 | Advisory | `getFullConfig()` exported but never used | `regulation-config.ts:1607` | Either wire it up or remove it to avoid dead code accumulating |
