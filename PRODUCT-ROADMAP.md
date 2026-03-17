# AI Comply Docs — Product Roadmap

*Created: 2026-03-12 by Anvil (Eighth instance, Opus 4.6)*
*Updated: 2026-03-14 — Document sync (accurate product counts, architecture references)*
*Strategy: Build a library of compliance products, not just one-off state packages.*

## Strategic Context

- Federal preemption is coming (Trump EO Dec 2025, H.R. 5388 pending) — products anchored to federal standards (EEOC, CFPB, NIST) survive preemption
- State packages should be built ON TOP OF federal foundations
- A library of 38 products = business credibility, not opportunism
- Template-first approach: formalized process, then stamp out products

## Execution Status

1. **Template the state-addition process** — DONE (PRODUCT-ONBOARDING.md)
2. **Build all products that fit the template** — 36 of 38 LIVE
3. **Redesign landing page as a searchable library** — DONE (multi-product layout live)
4. **Deploy everything at once** — DONE (aicompliancedocuments.com live)

---

## Product Inventory — Current State (38 products)

### State-Specific Laws (14 products — ALL LIVE)
| State | Law | Price | Status |
|-------|-----|-------|--------|
| Illinois | HB3773 | $299 | LIVE |
| Colorado | SB 24-205 | $449 | LIVE |
| NYC | Local Law 144 | $399 | LIVE |
| Minnesota | MCDPA | $349 | LIVE |
| California | CCPA ADMT | $499 | LIVE |
| Virginia | CDPA | $249 | LIVE |
| Connecticut | CTDPA | $249 | LIVE |
| Oregon | CPA | $249 | LIVE |
| Texas | TDPSA | $249 | LIVE |
| Delaware | PDPA | $249 | LIVE |
| Indiana | ICDPA | $249 | LIVE |
| Montana | MCDPA | $249 | LIVE |
| Kentucky | KCDPA | $249 | LIVE |
| New Jersey | NJDPA | $249 | LIVE |

### Framework/Industry (7 products — ALL LIVE)
| Product | Price | Status |
|---------|-------|--------|
| EU AI Act | $997 | LIVE |
| EEOC AI Hiring | $349 | LIVE |
| NIST AI RMF | $397 | LIVE |
| Healthcare AI | $497 | LIVE |
| Financial Services AI | $597 | LIVE |
| AI Governance Framework | $349 | LIVE |
| AI System Registry | $199 | LIVE |

### Universal Tools (7 products — ALL LIVE)
| Product | Price | Status |
|---------|-------|--------|
| AI Use Policy | TBD | LIVE |
| Vendor Due Diligence | TBD | LIVE |
| Bias Audit Template | TBD | LIVE |
| AI Incident Response | TBD | LIVE |
| AI Transparency Report | $149 | LIVE |
| AI Whistleblower Policy | $99 | LIVE |
| Customer AI AUP | $99 | LIVE |

### Multi-State Bundles (2 products — ALL LIVE)
| Product | Price | Status |
|---------|-------|--------|
| Multi-State Assessment | $399 | LIVE |
| Multi-State Employer | $299 | LIVE |

### Add-Ons (6 products — ALL LIVE)
| Product | Price | Status |
|---------|-------|--------|
| Manager Training Kit | $79 | LIVE |
| Annual Review Checklist | $49 | LIVE |
| Board AI Summary | $69 | LIVE |
| Consumer Notice Kit | $49 | LIVE |
| Data Mapping Inventory | $69 | LIVE |
| Consumer Rights Kit | $59 | LIVE |

### Not Ready (2 — no Stripe price IDs)
| Product | Price | Blocker |
|---------|-------|---------|
| K-12 Education AI | $397 | Need Stripe product + price |
| HR/Recruiting AI Bundle | $697 | Need Stripe product + price |

---

## State Package Template (the recipe)

For each new state/regulation, the process is documented in **PRODUCT-ONBOARDING.md** (mandatory reading).

### Architecture (Next.js app — NOT the old vanilla JS structure)

**Files touched per product:**
- NEW: `src/lib/pdf-{slug}/` — directory with generator files (one .ts per document)
- EDIT: `src/data/regulations.ts` — product data, pricing, Stripe price ID (SINGLE SOURCE OF TRUTH)
- EDIT: `src/data/regulation-config.ts` — questionnaire config, decisions, help texts, acknowledgment
- EDIT: `src/lib/pdf-generator.ts` — dynamic import routing to generator module
- EDIT: `src/lib/pdf-helpers.ts` — REGULATION_HEADER entry
- EDIT: `src/app/api/send-documents/route.ts` — REGULATION_EMAIL entry

**Checkout** reads `stripePriceId` directly from `regulations.ts`. No separate price map.
**Product pages** are dynamically generated from `regulations.ts` at `/regulations/[slug]`.
**Sitemap** auto-includes all `ready: true` products.

---

## Remaining Roadmap Items

### Immediate (no research needed)
- Create Stripe products for K-12 Education and HR/Recruiting Bundle
- Fix 3 remaining fillable field gaps (static checkboxes → addFormCheckbox)
- Resend domain verification for email delivery

### Content (needs browser Claude research)
- Document lifecycle audit per law
- More blog content (browser drafts → Guiding Light reviews → Claude Code adds)
- Blog hero images (Guiding Light has image generators)

### Features (build work)
- `/quiz` page — "Which product do I need?" chooser
- `/compare` page — us vs. law firm vs. DIY
- Sample document preview on product pages
- Questionnaire improvements (skippedSteps, missing fields, unused field cleanup)

---

## Research Sources

All research conducted 2026-03-12 by three parallel agents. Full transcripts at:
- Employment laws: agent a523f9fe6f47b61c0
- Consumer protection laws: agent a72f5633510cdfc7f (completed — 21 laws found across 14 states)
- Federal/cross-state: agent a7c42236f9d34d3e5 (completed — EEOC, CFPB, NAIC, HUD, FDA, FTC, OMB findings)

Key .gov sources for federal:
- eeoc.gov (AI Fairness Initiative, Strategic Enforcement Plan 2024-2028)
- federalregister.gov (CFPB Circulars 2022-03, 2023-03)
- ftc.gov/industry/technology/artificial-intelligence
- nist.gov (AI RMF 1.0)
- content.naic.org (Model Bulletin on AI)
- whitehouse.gov (EO 14179, OMB M-25-21, M-25-22)
