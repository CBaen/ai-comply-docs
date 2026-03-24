# Product Data Accuracy Audit — regulations.ts
**Audited:** 2026-03-24
**File:** `src/data/regulations.ts`
**Total products:** 57 (including ready:false)
**Ready:true products:** 55
**Ready:false products:** 2

---

## CHECK 1: documentCount vs actual documents array length

All 57 products pass this check. Every `documentCount` exactly matches the length of the `documents` array.

No discrepancies found.

---

## CHECK 2: appliesToBullets consistency with appliesToSummary

All products with `appliesToBullets` present were reviewed. No contradictions found between bullets and summary. The bullets expand on the summary in all cases.

One observation (not a bug, but worth noting):
- `ca-cyber-audit-kit` (lines 1595–1625): `appliesToSummary` and all three `appliesToBullets` are copied verbatim from `ca-admt-access-kit` — they describe ADMT access requests, not cybersecurity audits. The description correctly describes the cybersecurity audit requirement, but the `appliesToSummary` and `appliesToBullets` were not updated and describe the wrong use case. **FLAGGED — content mismatch.**

---

## CHECK 3: status vs effectiveDate accuracy

Today is 2026-03-24. Status should be `in-effect` if the effective date has passed, `effective-soon` if it is in the future.

### Correct statuses:
- `nyc-local-law-144` — July 5, 2023 → `in-effect` ✓
- `texas-tdpsa` — July 1, 2024 → `in-effect` ✓
- `delaware-pdpa` — January 1, 2025 → `in-effect` ✓
- `virginia-cdpa` — January 1, 2023 → `in-effect` ✓
- `connecticut-ctdpa` — July 1, 2023 → `in-effect` ✓
- `oregon-cpa` — July 1, 2024 → `in-effect` ✓
- `new-jersey-njdpa` — January 15, 2025 → `in-effect` ✓
- `montana-mcdpa` — October 1, 2024 → `in-effect` ✓
- `colorado-sb24-205` — June 30, 2026 → `effective-soon` ✓
- `co-appeal-correction-kit` — June 30, 2026 → `effective-soon` ✓
- `co-ag-reporting-kit` — June 30, 2026 → `effective-soon` ✓
- `co-dev-deploy-exchange` — June 30, 2026 → `effective-soon` ✓
- `education-k12-ai` — April 22, 2026 → `effective-soon` ✓
- `indiana-icdpa` — January 1, 2026 → **FLAGGED (see below)**
- `kentucky-kcdpa` — January 1, 2026 → **FLAGGED (see below)**

### STATUS ERRORS:

**`indiana-icdpa`** (line 1198):
- `effectiveDate`: "January 1, 2026"
- `status`: `effective-soon`
- **ERROR:** January 1, 2026 is in the past (today is 2026-03-24). Status should be `in-effect`.

**`kentucky-kcdpa`** (line 1270):
- `effectiveDate`: "January 1, 2026"
- `status`: `effective-soon`
- **ERROR:** January 1, 2026 is in the past (today is 2026-03-24). Status should be `in-effect`.

### Ambiguous effectiveDates (not parseable as a single date — not errors, but noted):
- `multi-state-profiling-assessment` — "Available now" — `in-effect` appropriate
- `multi-state-employer-ai-disclosure` — "Available now" — `in-effect` appropriate
- `eeoc-ai-hiring` — "Available now" — `in-effect` appropriate
- `nist-ai-rmf` — "Available now" — `in-effect` appropriate
- `employee-ai-policy` — "Available now" — `in-effect` appropriate
- `vendor-ai-due-diligence` — "Available now" — `in-effect` appropriate
- `ai-bias-audit-template` — "Available now" — `in-effect` appropriate
- `ai-incident-response-plan` — "Available now" — `in-effect` appropriate
- `manager-ai-training-kit` — "Available now" — `in-effect` appropriate
- `annual-compliance-review` — "Available now" — `in-effect` appropriate
- `board-ai-summary` — "Available now" — `in-effect` appropriate
- `consumer-notice-kit` — "Available now" — `in-effect` appropriate
- `data-mapping-inventory` — "Available now" — `in-effect` appropriate
- `consumer-rights-kit` — "Available now" — `in-effect` appropriate
- `ai-governance-framework` — "Available now" — `in-effect` appropriate
- `ai-system-registry` — "Available now" — `in-effect` appropriate
- `ai-transparency-report` — "Available now" — `in-effect` appropriate
- `ai-whistleblower-policy` — "Available now" — `in-effect` appropriate
- `customer-ai-aup` — "Available now" — `in-effect` appropriate
- `healthcare-ai-compliance` — "Available now (COPPA deadline April 22, 2026)" — `in-effect` appropriate
- `financial-services-ai` — "Available now (FINRA 2026 priority)" — `in-effect` appropriate
- `vibe-coding-security-checklist` — "Available now" — `in-effect` appropriate

### Staggered EU products — `eu-ai-act`, `eu-post-market-kit`, `eu-human-oversight-kit`, `eu-registration-transparency`:
- effectiveDate: "Staggered: Prohibited AI Feb 2025, GPAI Aug 2025, Annex III high-risk Aug 2026"
- status: `in-effect`
- Assessment: Partially in effect (first two tiers are past). Annex III high-risk (Aug 2026) is not yet in effect. Marking as `in-effect` is defensible given the Feb 2025 and Aug 2025 tiers are active. Not flagged as an error, but the status is a simplification.

### `eu-fria-kit`:
- effectiveDate: "August 2, 2026 (Annex III deployer obligation — Art. 27)"
- status: `in-effect`
- **POTENTIAL FLAG:** The FRIA obligation under Art. 27 takes effect August 2, 2026, which has not yet passed. The status `in-effect` may be premature. This product could arguably be `effective-soon`.

### `minnesota-mcdpa`:
- effectiveDate: "July 31, 2025"
- status: `in-effect`
- July 31, 2025 is in the past → `in-effect` ✓

### California CCPA ADMT and California add-ons:
- effectiveDate: "January 1, 2026"
- status: `in-effect`
- January 1, 2026 is in the past → `in-effect` ✓
- (The description mentions a 2027 deadline for consumer-facing requirements, but the risk assessment requirement started Jan 1, 2026.)

### Illinois HB3773 and IL add-ons:
- effectiveDate: "January 1, 2026"
- status: `in-effect`
- January 1, 2026 is in the past → `in-effect` ✓

---

## CHECK 4: Price reasonableness and duplicates

### All prices:
| Slug | Price | Notes |
|------|-------|-------|
| nyc-local-law-144 | $399 | Core compliance package — reasonable |
| texas-tdpsa | $249 | Standard state privacy — reasonable |
| delaware-pdpa | $249 | Standard state privacy — reasonable |
| multi-state-profiling-assessment | $399 | Bundle — reasonable |
| multi-state-employer-ai-disclosure | $299 | Bundle — reasonable |
| virginia-cdpa | $249 | Standard state privacy — reasonable |
| connecticut-ctdpa | $249 | Standard state privacy — reasonable |
| oregon-cpa | $249 | Standard state privacy — reasonable |
| minnesota-mcdpa | $349 | Premium (AI provisions) — reasonable |
| illinois-hb3773 | $299 | Employment AI — reasonable |
| california-ccpa-admt | $499 | Premium CA product — reasonable |
| colorado-sb24-205 | $449 | Premium CO product — reasonable |
| eu-ai-act | $997 | International flagship — reasonable |
| eeoc-ai-hiring | $349 | Federal employment — reasonable |
| nist-ai-rmf | $397 | Federal framework — reasonable |
| employee-ai-policy | $199 | Internal policy — reasonable |
| vendor-ai-due-diligence | $249 | Due diligence — reasonable |
| ai-bias-audit-template | $149 | Template — reasonable |
| ai-incident-response-plan | $149 | Template — reasonable |
| manager-ai-training-kit | $79 | Add-on — reasonable |
| annual-compliance-review | $49 | Add-on — reasonable |
| board-ai-summary | $69 | Add-on — reasonable |
| consumer-notice-kit | $49 | Add-on — reasonable |
| data-mapping-inventory | $69 | Add-on — reasonable |
| consumer-rights-kit | $59 | Add-on — reasonable |
| healthcare-ai-compliance | $597 | Industry package — reasonable |
| financial-services-ai | $597 | Industry package — reasonable |
| education-k12-ai | $397 | Industry package (ready:false) — reasonable |
| hr-recruiting-ai | $697 | Industry bundle (ready:false) — reasonable |
| ai-governance-framework | $349 | Framework — reasonable |
| ai-system-registry | $199 | Registry tool — reasonable |
| ai-transparency-report | $149 | Template — reasonable |
| ai-whistleblower-policy | $99 | Policy — reasonable |
| customer-ai-aup | $99 | Policy — reasonable |
| indiana-icdpa | $249 | Standard state privacy — reasonable |
| montana-mcdpa | $249 | Standard state privacy — reasonable |
| kentucky-kcdpa | $249 | Standard state privacy — reasonable |
| new-jersey-njdpa | $249 | Standard state privacy — reasonable |
| vibe-coding-security-checklist | $149 | Checklist — reasonable |
| il-notice-response-kit | $79 | State add-on — reasonable |
| il-zip-proxy-audit | $99 | State add-on — reasonable |
| co-appeal-correction-kit | $99 | State add-on — reasonable |
| co-ag-reporting-kit | $129 | State add-on — reasonable |
| co-dev-deploy-exchange | $109 | State add-on — reasonable |
| ca-admt-notice-optout | $99 | State add-on — reasonable |
| ca-admt-access-kit | $89 | State add-on — reasonable |
| ca-cyber-audit-kit | $149 | State add-on — reasonable |
| nyc-bias-audit-mgmt | $129 | State add-on — reasonable |
| nyc-candidate-notice-kit | $89 | State add-on — reasonable |
| va-consumer-rights-kit | $99 | State add-on — reasonable |
| va-profiling-assessment-kit | $109 | State add-on — reasonable |
| va-controller-processor-kit | $89 | State add-on — reasonable |
| eu-fria-kit | $149 | EU add-on — reasonable |
| eu-post-market-kit | $139 | EU add-on — reasonable |
| eu-human-oversight-kit | $99 | EU add-on — reasonable |
| eu-registration-transparency | $89 | EU add-on — reasonable |

**No $0 prices found.**

**Exact price duplicates** (same price, same-tier products that might be expected to differ):
- `annual-compliance-review` ($49) and `consumer-notice-kit` ($49) — both add-ons, different content, same price is fine
- `ai-bias-audit-template` ($149), `ai-incident-response-plan` ($149), `ai-transparency-report` ($149), `ca-cyber-audit-kit` ($149), `vibe-coding-security-checklist` ($149), `eu-fria-kit` ($149) — all single/small kits at the same price; this appears intentional, not a data error
- Healthcare ($597) and Financial Services ($597) — both industry packages at same price; intentional

No price errors found.

---

## CHECK 5: stripePriceId — present for all ready:true products

### Missing stripePriceId on ready:true products:

**`vibe-coding-security-checklist`** (line 1349):
- `ready: true`
- `stripePriceId: ""`  (empty string)
- **ERROR:** This product is marked ready but has no Stripe price ID. It cannot be purchased.

### Missing stripePriceId on ready:false products (expected — not errors):
- `education-k12-ai` — `stripePriceId: ""` — ready:false, expected
- `hr-recruiting-ai` — `stripePriceId: ""` — ready:false, expected

### All other ready:true products have a non-empty stripePriceId. ✓

---

## CHECK 6: Keyword relevance and duplication

### Keyword duplications within individual products:
No products have duplicate keywords within their own `keywords` array. All clean.

### Cross-product keyword overlap:
Expected — many products legitimately share "add-on", "universal", state names, etc. No anomalous cross-contamination found.

### Relevance issues:
- `employee-ai-policy` keywords include "universal" — fine, it is universal tier
- `customer-ai-aup` keywords include "universal" — fine
- No products have keywords that are clearly wrong for their topic

No keyword errors found.

---

## CHECK 7: slug URL-safety and name consistency

All slugs were reviewed. Findings:

- All slugs use lowercase letters, numbers, and hyphens only — all are URL-safe ✓
- Slugs are consistent with product names in all cases ✓

One note (not an error): `minnesota-mcdpa` — the state's law is officially the Minnesota Consumer Data Privacy Act (MCDPA), and the slug accurately reflects this. The same abbreviation "MCDPA" is also used by Montana (`montana-mcdpa`). The slugs are distinct and unambiguous.

---

## CHECK 8: ready:true products — all required fields populated

All required fields per the `Regulation` interface were checked for every ready:true product:
`slug`, `state`, `name`, `shortName`, `citation`, `citationUrl`, `status`, `effectiveDate`, `tier`, `category`, `price`, `stripePriceId`, `documentCount`, `description`, `penaltySummary`, `maxPenalty`, `appliesToSummary`, `keywords`, `documents`, `ready`

**One field gap found:**

**`education-k12-ai`** (line 969): Missing `lawLinkText` field — but this product is `ready: false`, so it is not customer-facing. Not a blocker, but may cause TypeScript issues since it is optional.

**`hr-recruiting-ai`** (line 998): Also missing `lawLinkText` — also `ready: false`.

Both ready:false products also have `stripePriceId: ""` — consistent with not being ready.

**For all ready:true products:** All required fields are present and non-empty, with one exception already flagged in Check 5: `vibe-coding-security-checklist` has `stripePriceId: ""` despite `ready: true`.

---

## CHECK 9: ready:false products excluded from site

The `getReadyRegulations()` function at line 1923 filters `r.ready === true`, which correctly excludes both `education-k12-ai` and `hr-recruiting-ai` from the site. ✓

---

## SUMMARY OF FINDINGS

### ERRORS (require fixes):

| # | Slug | Field | Issue |
|---|------|-------|-------|
| 1 | `indiana-icdpa` | `status` | Shows `effective-soon` but effectiveDate is January 1, 2026 — already past. Should be `in-effect`. |
| 2 | `kentucky-kcdpa` | `status` | Shows `effective-soon` but effectiveDate is January 1, 2026 — already past. Should be `in-effect`. |
| 3 | `vibe-coding-security-checklist` | `stripePriceId` | Empty string on a ready:true product. Product cannot be purchased. Needs a real Stripe price ID. |
| 4 | `ca-cyber-audit-kit` | `appliesToSummary` / `appliesToBullets` | These fields describe ADMT access requests (copied from `ca-admt-access-kit`), not cybersecurity audits. Wrong use-case description for this product. |

### POTENTIAL FLAGS (review recommended):

| # | Slug | Field | Issue |
|---|------|-------|-------|
| 5 | `eu-fria-kit` | `status` | FRIA obligation (Art. 27) is effective August 2, 2026 — not yet in force. Status `in-effect` may be premature; `effective-soon` would be more accurate. |

### CLEAN CHECKS:
- All 57 documentCounts match actual documents array lengths ✓
- No $0 prices ✓
- All prices are reasonable and consistent with product tier ✓
- All slugs are URL-safe ✓
- All slugs are consistent with product names ✓
- All keywords are relevant ✓
- No intra-product keyword duplicates ✓
- ready:false products are correctly excluded by `getReadyRegulations()` ✓
- All ready:true products (except vibe-coding-security-checklist) have valid stripePriceId ✓
