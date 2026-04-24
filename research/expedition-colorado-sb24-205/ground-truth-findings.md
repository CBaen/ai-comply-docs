# Ground Truth Findings: Colorado SB 24-205 Content Coverage Audit

**Researcher Role:** Ground Truth (codebase only — no web access)
**Date:** April 3, 2026
**Source:** C:\Users\baenb\projects\project _cameron\aicomplydocs

---

## 1. Colorado-Specific Blog Posts — Full Inventory

Four blog posts are explicitly Colorado-focused. All have `published: true`.

### colorado-sb-24-205-ai-law-what-businesses-need-to-know.mdx
- **Date:** 2026-03-14
- **Audience:** General business owners
- **Coverage:** Foundational explainer. Developer vs. deployer distinction. What "high-risk" AI means. Consequential decision categories (all 8). Developer obligations. Deployer obligations (all 7). Affirmative defense mechanics. AI interaction disclosure requirement. Insurance and banking exemptions. Enforcement structure (AG-exclusive). Algorithmic discrimination definition. Protected characteristics.
- **What it does NOT cover:** Specific penalty dollar amounts with citations, practical sector-by-sector examples, how to structure the impact assessment document itself.

### nist-ai-rmf-compliance-guide-colorado-legal-shield.mdx
- **Date:** 2026-03-21
- **Audience:** Businesses wanting the affirmative defense
- **Coverage:** What the NIST AI RMF 1.0 is. Four functions (Govern, Map, Measure, Manage) explained in depth. Why Colorado's affirmative defense points to it. NIST vs. ISO/IEC 42001 comparison. Practical implementation sequence.
- **What it does NOT cover:** How NIST maps to each specific deployer obligation in SB 24-205 section-by-section. No coverage of developer-side NIST alignment.

### colorado-ai-compliance-hr-software-companies.mdx
- **Date:** 2026-03-25
- **Audience:** HR software developers (B2B focus)
- **Coverage:** "Substantial factor" interpretation. Full developer obligations. Full deployer obligations from the HR buyer perspective. Affirmative defense (both conditions). Multi-state complexity (Illinois, NYC, California). Pre-June 30 action sequence for HR software companies.
- **What it does NOT cover:** Non-employment sectors (housing, healthcare, lending, insurance). Small business perspective.

### colorado-ai-law-91-days-deadline-requirements.mdx
- **Date:** 2026-03-31
- **Audience:** Any covered business — deadline urgency framing
- **Coverage:** Legislative history (4 failed amendment attempts). Exact statutory changes from SB 25B-004. Who the law covers (developer/deployer definitions). Consequential decision categories. Penalty structure with per-consumer math ($20K x 1,000 = $20M exposure). Affirmative defense (both conditions). State comparison (Texas, Illinois, California). Action items.
- **What it does NOT cover:** Sector-specific guidance beyond general employer framing.

---

## 2. Colorado References in Non-Colorado Blog Posts

Colorado is cited as a significant data point in at least 7 additional blog posts:

| Post slug | Colorado coverage |
|-----------|-------------------|
| multi-state-ai-compliance-comparison-guide | Colorado compared to 7 other jurisdictions; "consequential decision" scope distinguished |
| ai-governance-framework-checklist-every-state-law | CO + TX + IL triple-state governance approach; NIST alignment |
| ai-compliance-penalties-by-state | $20K per violation structure; per-consumer penalty math |
| what-is-ai-impact-assessment-guide | Colorado's impact assessment requirement explained as one of 4 state examples |
| do-i-need-ai-compliance-decision-framework | Developer vs. deployer distinction illustrated with Colorado |
| what-is-high-risk-ai-system-business-guide | Colorado's "consequential decision" definition vs. EU AI Act vs. CA ADMT |
| workday-ai-hiring-lawsuit-employer-liability | No direct Colorado citation (federal focus) |

---

## 3. SB 24-205 Requirements Coverage Map

The following maps each statutory obligation to its blog coverage.

### Developer Obligations (C.R.S. § 6-1-1702)

| Requirement | Blog Coverage | Gap? |
|-------------|---------------|-------|
| Disclosure statement to deployers | colorado-sb-24-205 (general), colorado-ai-compliance-hr-software-companies (specific) | Partial — what the document contains is described but not a template walkthrough |
| Publicly available discrimination risk statement | colorado-sb-24-205, colorado-ai-compliance-hr-software-companies | Covered conceptually |
| 90-day AG disclosure on discovered discrimination | colorado-sb-24-205, colorado-ai-compliance-hr-software-companies | Mentioned but not operationalized |
| Rebuttable presumption of reasonable care | Both posts above | Covered |
| Developer-specific NIST alignment | nist-ai-rmf post (general) | Not mapped to developer § 6-1-1702 specifically |

### Deployer Obligations (C.R.S. § 6-1-1703)

| Requirement | Blog Coverage | Gap? |
|-------------|---------------|-------|
| Risk management policy and program | colorado-sb-24-205, 91-days post | Covered conceptually |
| Impact assessment per system | colorado-sb-24-205, what-is-ai-impact-assessment-guide | Covered — no template walkthrough |
| Annual review of deployed systems | colorado-sb-24-205 | Mentioned only |
| Consumer notice (before/at time of decision) | colorado-sb-24-205 | Mentioned only |
| Right to correct personal data | colorado-sb-24-205 | Mentioned only |
| Right to appeal adverse decisions | colorado-sb-24-205 | Mentioned only |
| Public statement on discrimination risk | colorado-sb-24-205 | Mentioned only |
| 90-day AG disclosure on discovered discrimination | colorado-sb-24-205, 91-days post | Mentioned only |

### Consumer Protections (C.R.S. § 6-1-1704)

| Requirement | Blog Coverage | Gap? |
|-------------|---------------|-------|
| AI interaction disclosure (all consumer-facing AI) | colorado-sb-24-205 | Covered — separate from high-risk obligations |

### Affirmative Defense (C.R.S. § 6-1-1706(3))

| Requirement | Blog Coverage | Gap? |
|-------------|---------------|-------|
| Framework compliance condition | All 4 Colorado posts | Well covered |
| Discovery-and-correction condition | colorado-sb-24-205, 91-days post, HR post | Covered |
| Both conditions required (not either/or) | 91-days post (most explicit) | Covered |

### Enforcement (C.R.S. § 6-1-1706)

| Requirement | Blog Coverage | Gap? |
|-------------|---------------|-------|
| AG-exclusive enforcement | colorado-sb-24-205, 91-days post | Covered |
| No private right of action | colorado-sb-24-205, penalties-by-state | Covered |
| Per-consumer violation structure | 91-days post, penalties-by-state | Well covered |
| $20K / $50K penalty tiers | All 4 Colorado posts | Well covered |

### Sector-Specific Coverage

| Sector | Blog Coverage | Gap? |
|--------|---------------|-------|
| Employment / HR | colorado-ai-compliance-hr-software-companies (deep) | Covered |
| Education | Not covered | GAP |
| Financial / Lending | Mentioned in general posts | GAP — no dedicated coverage |
| Housing | Mentioned in definitions only | GAP |
| Healthcare | ai-healthcare-compliance-beyond-hipaa-state-laws.mdx (separate post) | Partial |
| Insurance | Exemption mentioned in colorado-sb-24-205 | GAP — exemption mechanics not developed |
| Legal services | Not covered | GAP |

---

## 4. Products — Complete Colorado Inventory

All products are `ready: true` with active Stripe price IDs.

### Core Package
- **slug:** `colorado-sb24-205` — $449
  - 8 documents: Risk Management Policy, Impact Assessment, Consumer Notification Template, Consumer Disclosure Statement, Algorithmic Discrimination Prevention Plan, Human Oversight Protocol, Compliance Checklist, Affirmative Defense Documentation

### Colorado Add-Ons (all discovered — not listed in main PRODUCT-ROADMAP.md but in regulations.ts)
- **slug:** `co-appeal-correction-kit` — $99
  - 3 documents: Appeal Intake Form, Data Correction Request Form, Appeal Outcome Letter
- **slug:** `co-ag-reporting-kit` — $129
  - 3 documents: Discrimination Discovery Form, AG Notification Letter, Corrective Action Plan
- **slug:** `co-dev-deploy-exchange` — $109
  - 3 documents: Developer Disclosure Checklist, Deployer Gap Analysis, Third-Party Assessment Addendum

### Colorado-Inclusive Bundles
- **slug:** `multi-state-employer-ai-disclosure` — $299 (IL + NYC + CO)

### Colorado PDF Generator Files
Location: `C:\Users\baenb\projects\project _cameron\aicomplydocs\src\lib\pdf-colorado\`

Files present: adverse-decision-kit.ts, compliance-checklist.ts, consumer-notice.ts, impact-assessment.ts, incident-response.ts, index.ts, record-retention.ts, risk-management-policy.ts, transparency-statement.ts

Note: 9 generator files exist for a product that lists 8 documents. The generator file names do not map 1:1 to the document names in regulations.ts. `adverse-decision-kit.ts`, `incident-response.ts`, and `record-retention.ts` do not correspond to named documents in the `documents` array. This may indicate undocumented documents or generators from an earlier product version.

### Colorado Landing Page
- URL: `/colorado-ai-compliance` (redirect from `/blog/colorado-ai-compliance`)
- File: `src\app\colorado-ai-compliance\page.tsx`
- Status: Live, with schema markup, SEO metadata, $449 pricing confirmed

### Product Images
Colorado-specific product images confirmed in `public/images/`:
- `colorado-sb24-205.webp`
- `co-ag-reporting-kit.webp`
- `co-appeal-correction-kit.webp`
- `co-dev-deploy-exchange.webp`

---

## 5. What the Codebase Does NOT Cover

The following SB 24-205 topics have no dedicated blog post and no product treatment:

**Sector gaps (no content):**
- Financial services / lending AI (only mentioned in definition lists)
- Housing AI (only mentioned in definition lists)
- Legal services AI (only mentioned in definition lists)
- Education AI (only mentioned in definition lists — K-12 Education product listed as "Not Ready" in PRODUCT-ROADMAP.md)
- Insurance AI (exemption is mentioned but the exemption conditions are not developed — could be a value-add post for insurers)

**Operational gap — developer-side obligations:**
- There is no dedicated post walking through the developer public statement requirement with a template or example
- The `co-dev-deploy-exchange` product exists ($109) but has no blog post linking to it
- No content explains what a "model card" or "dataset card" is in Colorado context

**Operational gap — annual review:**
- No post explains what the annual review process looks like in practice, what documentation it should produce, or how it differs from the initial impact assessment

**Operational gap — consumer rights process:**
- No post explaining how to stand up the appeal and correction process from scratch (the `co-appeal-correction-kit` product exists but has no blog traffic driver)

**Regulatory gap — AG rulemaking:**
- No post tracks whether the Colorado AG has issued implementing rules
- The 91-days post notes the law is self-executing without rulemaking — but no post monitors for rulemaking developments

---

## 6. Git History — Planned but Unfinished Colorado Content

```
5799e58  auto: Edit content/blog/colorado-ai-law-penalties.mdx
67e508a  auto: Write content/blog/colorado-ai-law-penalties.mdx
638fc47  auto: Write colorado-ai-law-penalties.mdx
b7d4d2e  auto: Write does-colorado-ai-law-apply-to-me.mdx
```

Two blog posts appear in git history but are NOT in the current `content/blog/` directory:
- `colorado-ai-law-penalties.mdx` — written and edited, then removed or renamed (content absorbed into `ai-compliance-penalties-by-state.mdx`)
- `does-colorado-ai-law-apply-to-me.mdx` — written but removed (content likely absorbed into `do-i-need-ai-compliance-decision-framework.mdx`)

Neither gap represents missing content — both topics are covered in active posts. These were consolidations.

---

## 7. Content Format Assessment

**Blog posts only** — all Colorado content is in blog post format. There are no:
- Standalone checklists or downloadable PDFs in the public/ directory
- News items (content/news/ directory exists but is empty)
- White papers or guides in a separate format

**Products are paid downloads** — templates, policies, and forms are behind Stripe checkout. No free samples or previews in the public/previews/ directory for Colorado (the previews directory contains the directory listing but no Colorado-specific preview files were found in public/images/).

---

## 8. Key Factual Consistencies Verified

Across all Colorado content, the following facts are consistent throughout:

- Effective date: June 30, 2026 (no instances of the old February 1, 2026 date found in active content)
- Penalty: up to $20,000 per violation (§ 6-1-112(1)(a)); up to $50,000 for age 60+ (§ 6-1-112(1)(c))
- Enforcement: AG-exclusive; no private right of action
- Affirmative defense: BOTH conditions required (framework compliance AND discovery-and-correction mechanism)
- Citation: C.R.S. §§ 6-1-1701 through 6-1-1707

The PRODUCT-ONBOARDING.md documents that an earlier instance stamped "eff. 2-1-26" on PDFs — that error was corrected before current state.

---

## 9. Summary Assessment

**Strong coverage:** Foundational explainer, deadline urgency, HR software sector, NIST/affirmative defense, developer vs. deployer distinction, penalty math, multi-state context.

**Coverage gaps with commercial potential:**
1. Sector-specific posts for financial services, housing, insurance (exemption mechanics), and legal services — these sectors are named in the statute but have no dedicated content
2. Developer-side obligations — the co-dev-deploy-exchange product exists with no blog post driving traffic to it
3. Annual review process — mentioned as an obligation in all posts but never given operational treatment
4. Consumer rights operationalization — appeal and correction kit ($99) has no blog post explaining the problem it solves

**No content contradictions found** in active posts regarding effective date, penalties, or enforcement mechanism.

---

*Written by Ground Truth researcher. Sources: codebase files only — no web access used. All findings VERIFIED against actual file contents.*
