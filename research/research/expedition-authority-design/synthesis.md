# Expedition Synthesis: Authority Design Language for AI Comply Docs
## Date: 2026-03-10
## Vetted by: Orchestrator
## Alignment: Checked against Research Brief

---

## High Confidence (Teams Converged + Validators Confirmed)

These recommendations had independent convergence across 3-5 teams AND survived all 3 validators without challenge. They are the foundation of the redesign.

### 1. Remove Pulse Animation → Static Date-Stamped Badge
**Convergence:** All 5 teams + all 3 validators
**Evidence:** No compliance platform uses animated urgency indicators. The pulse dot undermines credibility with legally sophisticated B2B buyers (HR directors, employment attorneys) who recognize it as a manipulation tactic. Ironic for a compliance vendor.
**Replacement:** Static rectangular badge: `EFFECTIVE: January 1, 2026` — 1px border, no animation, uppercase tracking. Deep crimson or dark navy background.
**Lines affected:** 143-154 (CSS), 218-221 (hero), 644-646 (generator)

### 2. Remove rounded-2xl → rounded (4px) on All Content Cards
**Convergence:** All 5 teams + all 3 validators
**Evidence:** USWDS specifies 0-4px max for government components (verified live). `rounded-2xl` (16px) is the signature of SaaS template design — no government portal uses it. This is the single most visible "template tell."
**Implementation:** Global find-and-replace `rounded-2xl` → `rounded`. Apply `rounded-lg` (8px) only to pricing box and CTA buttons where slight warmth aids conversion.
**Lines affected:** 290-312, 355-408, 458-501, 512-612, 635-658

### 3. Replace Space Grotesk with Merriweather (Serif Headings)
**Convergence:** All 5 teams agree on serif headings. Validators resolved the font disagreement.
**Resolution:** Merriweather wins over Playfair Display and Libre Baskerville because:
- Verified deployed on DOL.gov at font-weight 700 (confirmed via live fetch)
- USWDS v1 official pairing with Source Sans Pro
- Robust Windows ClearType rendering (critical — HR directors use corporate Windows machines)
- Playfair Display filtered: editorial/luxury register, not regulatory. Hairlines fail on low-DPI Windows screens.
- Libre Baskerville filtered: typematch.io source returned 404, cannot confirm endorsement claim.
**Body font:** Source Sans 3 (renamed Source Sans Pro on Google Fonts). Verified federal standard.
**Performance guard:** Load Merriweather 400+700 only, Source Sans 3 400+600 only (4 weights, not 7). Include preconnect hints + display=swap.

### 4. Add Regulatory Citation Text Under Requirements
**Convergence:** Teams 1, 2, 4, 5 + all 3 validators
**Evidence:** Citing the exact IDHR regulatory code is the single highest-impact trust signal for a product with no testimonials. It transforms a marketing list into a regulatory reference.
**Implementation:** Add after the 7-element list:
`Requirements per IDHR Subpart J, 56 Ill. Adm. Code §§ 2520.1400-2520.1530 (effective January 1, 2026)`
**Language correction (Validator 3):** Use "drafted against" not "verified current" — the latter implies attorney verification that hasn't occurred.

### 5. Left-Border Accent Treatment on Notice/Regulatory Sections
**Convergence:** Teams 1, 2, 4, 5 + all 3 validators
**Evidence:** IRS.gov uses `border-left: 4px solid #C7A97B` on alert headings (verified live). DOL, USWDS, GOV.UK all use left-border accents. This is the signature of government notice design.
**Implementation:** Replace circle number badges on the 7-element list with left-border blocks. Use USWDS primary blue (#005ea2) or IRS gold (#C7A97B) as the border color.
**Lines affected:** 427-451 (the numbered element list)

### 6. Darken CTA Color: Sky-700 → Deep Blue
**Convergence:** Teams 1, 2, 5 agree on deep blue. Validators confirmed.
**Resolution:** Deep blue (#1D4ED8 on light backgrounds, #1a4480 on dark backgrounds) wins over:
- Gold (#B8962E) — filtered: zero B2B conversion evidence, WCAG contrast failure on white backgrounds, no compliance platform precedent. Gold preserved ONLY as left-border accent on notice boxes (IRS pattern).
- Sky-700 — filtered: most common Tailwind SaaS template color, signals "startup."
**Evidence:** compliance.ai uses #2C6DDF (verified). USWDS primary is #005ea2. Both corroborate the deep blue direction.

### 7. Left-Align Section Headers (Post-Hero)
**Convergence:** Teams 1, 4, 5 explicitly + Teams 2, 3 implicitly
**Evidence:** DOL, EEOC, IDHR, GOV.UK — all verified to use left-aligned headers. Centered headers signal marketing page; left-aligned headers signal document.
**Implementation:** Remove `text-center` from all section header blocks below the hero. Hero remains centered.

### 8. Remove Gradient Hero → Solid Dark Navy
**Convergence:** Teams 1, 3, 4, 5
**Evidence:** The dark-to-dark gradient is the "default AI aesthetic" per SaaSFrame 2026. Government portals use flat backgrounds.
**Implementation:** Replace CSS gradient with solid `#0F172A` (keep existing navy). Optionally add subtle SVG micro-pattern at 3-4% opacity for texture.

### 9. Remove Scroll Reveal Animations on Content Sections
**Convergence:** Teams 4, 5 + Validators 1, 3
**Evidence:** Legal requirements fading in on scroll treats statutory information like a product launch reveal. Government portals present all content immediately.
**Lines affected:** `.reveal` class on lines 285, 289, 318, 322, 339, 351, 355, 413, 458, 508, 512, 563, 568, 625

### 10. Flat 1px Borders Replace Card Shadows
**Convergence:** Teams 1, 4, 5. Validators resolved Team 2's shadow recommendation.
**Resolution:** Flat `border: 1px solid #dfe1e2` for all content/informational cards (government standard). Optional deeper shadow for pricing box only (premium legal tech aesthetic from Team 2, acceptable for conversion elements).

---

## Battle-Tested Approaches (Proven Patterns with Production Evidence)

### A. Regulatory Citation Blocks (IRS/DOL/EDGAR Pattern)
Left-border accent + uppercase label + citation text. Deployed on IRS.gov, DOL.gov, SEC EDGAR. Directly applicable to the 7-element list and consequences section.

### B. USWDS Color System as Foundation
Federal blue #005ea2 (primary), #1a4480 (dark), #162e51 (darker). Near-black text #1b1b1b. Light borders #dfe1e2. Off-white backgrounds #f0f0f0 or #f4f8fb. All verified live. All Tailwind-implementable.

### C. GOV.UK Two-Thirds / One-Third Layout (Deferred)
The canonical government compliance page layout. Strong authority signal. But: requires HTML restructuring, conflicts with single-page conversion funnel, mobile fallback strategy not addressed. **Defer to Phase 2** after cosmetic changes ship and conversion is measured.

### D. Section Numbering with § Identifiers
Used by all federal regulatory documents. Transform "What You Get" into "Section 3: Compliance Package Contents." Low effort, high authority signal.

---

## Novel Approaches (Theoretical Backing, Not Yet Proven at Scale)

### E. IRS Gold (#C7A97B) as Left-Border Accent
Verified on IRS.gov. Novel application: using this specific gold on a private compliance site's notice sections. The color is attested in government use but applying it to a commercial product is untested. Low risk since it's a border accent, not a primary color.

### F. Utility Credential Bar Above Navigation
Team 1 recommended a narrow bar above nav with credential statement and date. Government portals use this (IRS, FINRA, GOV.UK). Novel for a private compliance product.
**Impersonation guard (Validator 3):** No seal graphics. Brand name only. "Not legal advice" disclaimer could live here, making the authority AND the boundary visible simultaneously.

---

## Synthesized Recommendation

The redesign is a CSS/HTML authority layer applied in two phases:

**Phase 1 — Cosmetic Authority (Low Risk, High Impact):**
1. Font swap: Merriweather + Source Sans 3 (with preconnect + display=swap)
2. Remove rounded-2xl → rounded (4px) globally
3. Remove pulse animation → static date badge
4. Darken CTA: sky-700 → #1D4ED8 (light bg) / #1a4480 (dark bg)
5. Left-align section headers below hero
6. Remove gradient hero → solid #0F172A
7. Remove scroll reveal animations on content sections
8. Remove card hover float effects
9. Flat borders replace card shadows
10. Add regulatory citation footer under 7-element list
11. Replace circle badges with left-border treatment on regulatory items
12. Add § section identifiers on compliance information sections
13. Body text contrast: text-gray-500 → text-gray-700 minimum
14. Reduce $299 pricing display: text-6xl → text-4xl (price is a fact, not a hero)

**Phase 2 — Structural Authority (Requires Testing):**
- Two-thirds/one-third column for HB3773 detail section + reference sidebar
- Table structure for 7 required elements (with proper mobile fallback)
- Sticky sidebar TOC for desktop (information sections only, not questionnaire)
- Utility credential bar above navigation

---

## Disagreements

### Font Pairing (Resolved)
- Team 1: Merriweather + Source Sans 3 ← **Selected** (government-verified, Windows-safe)
- Team 2: Libre Baskerville + Inter (source 404'd, middle ground)
- Team 3: Playfair Display + IBM Plex Sans (editorial luxury, not regulatory)
- Team 5: Playfair Display or pure Inter

### CTA Color (Resolved)
- Teams 1, 2, 5: Deep blue variants ← **Selected** (#1D4ED8 / #1a4480)
- Team 3: Brass gold #B8962E (no conversion evidence, WCAG issues on white)

### Card Shadows (Resolved)
- Team 2: Deep dramatic shadows (compliance.ai aesthetic)
- Teams 1, 4, 5: Flat 1px borders ← **Selected for content cards**
- Compromise: Deep shadow acceptable on pricing box only

### Border Radius (Resolved)
- Team 2: 8-12px (premium legal tech aesthetic)
- Teams 1, 4, 5: 0-4px ← **Selected** (government standard)
- Compromise: 4px for content, up to 8px for conversion elements

---

## Filtered Out

### Gold CTA Buttons (#B8962E)
**Removed because:** Zero B2B conversion evidence for gold CTAs. Every comparable product studied uses deep blue, near-black, or red. Gold brand identity ≠ gold conversion. WCAG contrast fails on white backgrounds. Only Team 3 recommended it; 3 validators challenged it. Gold preserved ONLY as left-border accent on notice sections (verified IRS pattern).

### Parchment Background (#F8F6F1)
**Removed because:** Warm-tinted off-white contradicts government standard. USWDS uses #f0f0f0 (cool), GOV.UK uses #f4f8fb (cool blue-tint). Warm backgrounds signal consumer comfort, not institutional precision (Validator 2).

### "40% Trustworthiness Increase" Statistic
**Removed because:** Not found in cited source (inkbotdesign.com contains 24% claim, unattributed). The Errol Morris Baskerville study is real but applies to one font in one context, not serifs generally. Directional finding (serif = authority) is valid; the specific number is not.

### "75% Credibility from Design" Statistic
**Removed because:** Traces to 2002 Stanford study where the actual finding was 46.1%, not 75%. Number inflated across marketing aggregation. Core claim valid; specific percentage unreliable.

### Dark Theme A/B Test (4.08% vs 3.65%)
**Removed because:** Source URL returned 404 across all 3 validator attempts. Cannot be confirmed. Even if real: single study, different product category, unknown sample size.

### 94 Agencies / 1.1B Pageviews for Public Sans
**Removed because:** Not found on Public Sans GitHub or official site. Unverifiable.

### Sticky Sidebar as Default (Full-Page Scope)
**Deferred because:** Risks fragmenting conversion funnel on single-page. Team 4 recommended it for the full page; validators flagged that information sections only is safer. Moved to Phase 2.

---

## Risks

### Conversion Risk (Medium)
No evidence exists for this exact buyer persona: one-time $299 purchase, zero testimonials, cold visitor. All conversion evidence is from established brands. The authority redesign is the best available hypothesis, not a proven playbook. Phase 1 changes are cosmetic and low-risk. Phase 2 structural changes should be measured against current conversion.

### Font Performance (Low with Mitigation)
Loading 2 new font families from Google Fonts adds latency. Mitigation: preconnect hints, display=swap, minimal weight selection (4 weights not 7). Without mitigation: 1.4s median TTFB for CSS stylesheet alone (verified).

### Government Impersonation (Low with Guard Rails)
No recommendations use government seals or .gov styling. The regulatory citation format and left-border accents are documentary patterns, not impersonation. Guard rails: no seal graphics in credential bar; use "drafted against" not "verified current"; make "not legal advice" disclaimer more prominent as authority design increases.

### Tailwind CDN Syntax (Technical Correction Required)
All team Tailwind config examples use `tailwind.config.js` file syntax. The site uses Tailwind CDN, which requires `<script>tailwind.config = {...}</script>` in HTML. Hex values are correct; delivery mechanism must be adapted.

### Mobile Experience (Gap)
Research focused on desktop patterns. Two-column layouts, sidebar navigation, and tables need explicit mobile collapse strategies. Phase 1 changes (cosmetic) are mobile-safe. Phase 2 changes require mobile-first implementation.

### IDHR-Specific Design Gap
The direct regulatory analogue (IDHR.illinois.gov) was understudied. If IDHR uses specific colors or patterns that differ from federal USWDS, matching those would be more authentic. This gap is acceptable for Phase 1 (which uses federal patterns) but should be addressed before Phase 2.
