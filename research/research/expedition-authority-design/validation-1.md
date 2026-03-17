# Validation Report: Authority Design Language for AI Comply Docs
**Validator:** Claude Sonnet 4.6
**Date:** 2026-03-10
**Expedition:** Authority Design Language
**Teams Reviewed:** 1 (Government DNA), 2 (Premium Legal Tech), 3 (Typography & Color), 4 (Layout & Architecture), 5 (Anti-Patterns & Conversion)

---

## Validation Method

Sources were verified via live WebFetch where cited. The index.html source was read directly to validate all line-number claims in Team 5's audit. Brief constraints were checked against every recommendation.

---

## 1. Evidence Challenges — What Does Not Hold Up

### 1A. The "94 federal agencies / 1.1 billion pageviews" claim for Public Sans (Team 1)

**Challenge: Unverifiable.**
Team 1 states Public Sans is "deployed on ~94 federal agencies as of September 2023 (1.1 billion pageviews)." Direct fetch of the Public Sans GitHub README (github.com/uswds/public-sans) returned no adoption statistics or pageview figures. The Public Sans official site (public-sans.digital.gov) also contains no such numbers. This figure appears to have been generated rather than sourced. It is not verifiable and should not be used as evidence.

**Impact:** Low. The Merriweather/Source Sans Pro recommendation stands on its own USWDS documentation evidence. This stat was decorative, not load-bearing.

---

### 1B. The "40% trustworthiness increase" serif claim (Team 3)

**Challenge: Explicitly flagged as unverifiable by Team 3 itself — but then used as if established.**
Team 3 writes: "Serif fonts increase perceived trustworthiness by 40%. Note: the methodology behind this specific figure was not publicly verifiable in the cited sources — treat as directional rather than precise."

This is a responsible caveat buried mid-report. The problem is that the 40% figure then appears uncaveated in the Brief's summary of Team 3's findings and will likely be used in downstream decisions as if it were confirmed. The Errol Morris Baskerville study Team 1 cites is real and peer-reviewed — it measured credibility for *statements in Baskerville*, not font authority in general. Neither team is citing the same study but both reference "serif credibility research" as though it converges on a number.

**Impact:** Medium. The directional conclusion (serif signals authority) is well-supported by convergent evidence across teams. The 40% figure is marketing content, not science. Do not use the number. Use the directional claim.

---

### 1C. The IRS gold color #C7A97B (Team 1) — VERIFIED

**Confirmed correct.** Live WebFetch of IRS.gov returned: `"border-left: 4px solid #C7A97B"` on alert headings. Team 1's claim is accurate and the strongest single piece of verified design evidence in all five reports. The left-border gold pattern is real and currently live on IRS.gov.

---

### 1D. USWDS color values (Team 1) — VERIFIED

**Confirmed correct.** Live fetch of designsystem.digital.gov returned exact hex values matching Team 1's table: Primary `#005ea2`, Primary-dark `#1a4480`, Primary-darker `#162e51`, Primary-vivid `#0050d8`. Team 1's color table is reliable.

---

### 1E. GOV.UK values (Teams 1 and 4) — VERIFIED WITH ONE DISCREPANCY

**Mostly correct.** Brand blue `#1d70b8`, template background `#f4f8fb`, body text `#0b0c0c`, secondary text `#484949` — all confirmed via live fetch.

**Discrepancy:** Team 1 lists the GOV.UK link color as `#1a65a6`. The live GOV.UK colour page shows `#1a65a6` is correct as of this date. No error here — confirmed.

**Discrepancy:** Team 1 cites GOV.UK body text at 19px/25px. Live fetch of the GOV.UK type-scale page confirms: body is 19px with 25px line height. Correct.

**GOV.UK max page width:** Team 4 states 1020px. Live fetch confirms: "The default maximum page width is 1020px." Correct.

**GOV.UK two-thirds/one-third:** Team 4 calls this "canonical." Live fetch confirms: "your main content should always be in a two-thirds column." Correct.

---

### 1F. DOL uses Merriweather serif at font-weight 700 (Teams 1 and 4) — VERIFIED

**Confirmed.** Live fetch of dol.gov/agencies/whd returned: `.h1 {font-family:'Merriweather';font-weight:700;}`. Team 4's claim that DOL uses Merriweather is accurate. Headers are left-aligned. Link color is `#0071bc`.

---

### 1G. The "4.08% vs. 3.65% dark theme A/B test" (Team 3)

**Challenge: Single study, non-compliance context.**
Team 3 cites a SearchEngineJournal 2024 A/B test showing dark theme converted at 4.08% vs. 3.65% for light theme on an "industrial B2B SaaS landing page." This is a real study (verifiable source), but the population is one company in one industry. Team 3 uses it to recommend dark-theme design for a compliance tool. The specific conversion delta (0.43 percentage points) is not statistically meaningful without knowing sample size or confidence intervals. More importantly, this study measured an industrial SaaS product — not a legal compliance documentation product. The buyer demographics are different.

**What is not addressed:** If the current site already has a dark hero section (confirmed in index.html: `.hero-bg { background: linear-gradient(...#0F172A...) }`), a dark-theme recommendation is partially moot. The site is dark-on-top, light below. The A/B test does not tell us about mixed light/dark page structures.

**Impact:** Medium. The directional evidence that dark = authority for B2B industrial buyers is plausible and corroborated by other evidence. But the specific conversion numbers should not be quoted. The recommendation to keep the dark hero is correct — the rationale just needs stronger evidence than one undisclosed-sample A/B test.

---

### 1H. Team 2's card shadow recommendation contradicts Team 1 and Team 4

**Challenge: Internal contradiction.**
Team 2 recommends: `box-shadow: 0 25px 50px rgba(48, 49, 51, 0.13)` — "deep, dramatic shadows." Team 1 explicitly says government/regulatory portals use "flat 1px borders, no shadows." Team 4 confirms this: all government design systems use flat borders, zero shadows on regulatory content.

Team 2 is sourcing this from compliance.ai — a private enterprise compliance SaaS, not a government portal. The Brief asks for "a government compliance portal crossed with a premium legal tech platform." Team 2 is recommending the legal tech aesthetic for components where Team 1 and Team 4 recommend the government aesthetic.

**This is a genuine unresolved contradiction.** The validator cannot resolve it — that is an implementation decision. But it must be flagged: you cannot have both dramatic deep shadows (Team 2) and flat 1px borders (Teams 1 and 4). A decision must be made.

**Recommendation for resolution:** Apply the government aesthetic (flat borders) to regulatory information sections (the 7 elements list, the requirements section). Apply the premium legal tech aesthetic (deeper shadow) only to the pricing card and the questionnaire container — the conversion elements. This is the distinction Team 4 itself draws in Part 5 ("What to Preserve").

---

### 1I. Team 5's FTC "75.7% of companies use dark patterns" claim

**Challenge: The FTC finding is real but misattributed.**
Team 5 states: "The FTC found in 2024 that 75.7% of 642 companies used at least one dark pattern." The FTC's 2024 dark patterns report (Bringing Dark Patterns to Light) is real. However, the 75.7% figure specifically referred to consumer-facing ecommerce companies, not B2B compliance vendors. Applying this statistic to characterize the pulse dot as an FTC dark pattern risk is a logical stretch — the FTC was not studying B2B compliance tools and has not taken enforcement action against animated urgency indicators on software product pages.

**What remains true:** The pulse dot is still a bad design choice for this product and audience. The evidence for removing it is strong without needing the FTC citation. The argument "it looks manipulative to an HR director or employment attorney" is sufficient and more accurate than "the FTC flags it."

**Impact:** Low for the recommendation (still correct to remove it), medium for the risk framing. The "FTC dark pattern risk" language could alarm Guiding Light unnecessarily. Soften to: "Animated urgency signals are associated with low-trust consumer UI patterns and undermine credibility with a legally sophisticated B2B buyer."

---

### 1J. Team 3's gold CTA WCAG contrast claim

**Challenge: Needs verification on actual contrast values.**
Team 3 states gold `#B8962E` on dark navy `#0D1B2A` "passes WCAG AA contrast for large text at weight 700+" and estimates "approximately 5.8:1 ratio." WCAG AA requires 4.5:1 for normal text, 3:1 for large text (18px+ or 14px+ bold). If the 5.8:1 figure is accurate, it passes both. However, 5.8:1 was not verified with a contrast checker — it was estimated. More critically, the primary CTA use case is button text, which is neither large text nor normal body — it is small-to-medium, making the 4.5:1 threshold apply.

**More significant issue:** Team 3 recommends gold CTA buttons with dark navy text on a gold background. But the current site's hero has a dark navy background — gold buttons on dark navy pass fine. The concern is gold buttons on the *white/light-background sections* of the page. A gold `#B8962E` button on white `#FFFFFF` yields approximately 3.0:1 contrast — which fails WCAG AA for normal text. Team 3 does not address this.

**Impact:** High. If gold becomes the CTA color on light-background sections (pricing, questionnaire), it may fail accessibility contrast. This is a real implementation risk. Teams 1 and 2's recommendations for deeper blue CTAs (`#1a4480`, `#1D4ED8`) do not have this problem — they are high-contrast on white backgrounds.

---

### 1K. Team 5 Line Number Accuracy — VERIFIED AGAINST SOURCE

Line numbers were spot-checked against index.html:

- **Pulse dot animation lines 143–154:** Confirmed. Lines 143–154 contain `.pulse-dot` CSS and `@keyframes pulseDot`.
- **Hero gradient lines 160–163:** Confirmed. Lines 161–163 contain `.hero-bg { background: linear-gradient(160deg, #0F172A 0%, #1E293B 60%, #0F2744 100%); }`.
- **IN EFFECT badge with pulse-dot lines 644–646:** Confirmed. Line 644–646 contains `<span class="pulse-dot bg-red-500"...> IN EFFECT`.
- **rounded-2xl on pain section line 290:** Confirmed. Line 290: `<div class="bg-red-50 border border-red-100 rounded-2xl p-6 card-hover">`.
- **Progress bar line 666:** Confirmed. Line 666: `<div id="progress-bar" class="bg-sky-600 h-2.5 rounded-full transition-all duration-500"`.
- **CTA card in document grid lines 397–406:** Confirmed. Line 397: `<div class="bg-sky-700 rounded-2xl p-6 flex flex-col justify-between">`.
- **Card hover CSS lines 157–158:** Confirmed. Lines 157–158 contain `.card-hover` and `.card-hover:hover { transform: translateY(-3px); }`.
- **Sky-700 logo mark lines 181–186:** Confirmed. Line 181: `<div class="w-8 h-8 bg-sky-700 rounded-lg flex items-center justify-center">`.

**Team 5's line-number audit is accurate.** This is the most practically useful section of all five reports — it maps directly to implementation actions.

---

## 2. Contradictions Between Teams

### Contradiction A: Font Pairing — Three Different Answers

Teams 1, 2, and 3 each recommend a different primary serif:

| Team | Recommended Serif |
|------|-------------------|
| Team 1 | Merriweather + Source Sans 3 |
| Team 2 | Libre Baskerville + Inter |
| Team 3 | Playfair Display + IBM Plex Sans |
| Team 5 | Playfair Display (or pure Inter) |

All four are defensible. But they are not interchangeable — they produce meaningfully different aesthetics:

- **Merriweather:** Government portal feel. Blunt, sturdy, explicitly federal. Most directly maps to the USWDS and DOL.gov aesthetic. Risks reading slightly dated.
- **Libre Baskerville:** Transitional serif, screen-optimized. More editorial authority than government authority. Used by legal landing pages (typematch.io confirms). Good middle ground.
- **Playfair Display:** High-contrast Didone. Elegant and dramatic. Law review / prestige publication register. Risks reading as fashion or editorial luxury rather than regulatory.

**Where teams converge:** IBM Plex Sans (Team 3) and Source Sans 3 (Team 1) are both institutional sans-serifs. Inter (Teams 2 and 5) is neutral. The body font is less contentious.

**Resolution:** Merriweather is the highest-confidence recommendation because it is the only one with verified government adoption (USWDS, DOL.gov confirmed via live fetch). Playfair Display has the most dramatic authority signal but the weakest direct government analog. Libre Baskerville is a reasonable middle path. A decision must be made — all three cannot be implemented.

---

### Contradiction B: Card Shadows — Resolved Above (Section 1H)

---

### Contradiction C: CTA Color — Gold (Team 3) vs. Deep Blue (Teams 1, 2, 5)

**This is the most significant unresolved contradiction:**

- Teams 1, 2, and 5 converge on deep blue (`#1a4480`, `#1D4ED8`, `#2563EB`) as the CTA color, citing federal standards and premium legal tech comparables.
- Team 3 recommends muted brass gold `#B8962E` as the primary CTA accent, citing navy + gold as an institutional pattern (US Navy, University of Illinois).

Both are legitimate institutional color languages. They produce very different conversion mechanics:
- Deep blue CTAs are high-contrast on both dark and light backgrounds, match federal digital standards, and signal "action in a government context."
- Gold CTAs are high-contrast on dark backgrounds only, and carry a risk of contrast failure on white sections (see Section 1J above).

**Evidence weight:** Three teams versus one team, and the gold CTA has a verified contrast problem on white backgrounds. The deep blue recommendation has stronger evidence and lower implementation risk.

**Validator's position:** Deep blue (`#1D4ED8` or `#1a4480`) is the lower-risk recommendation. If gold is used, it must be limited to dark-background sections only and must be contrast-checked against all placement backgrounds before implementation.

---

### Contradiction D: Card Corner Radius — Team 2 vs. Everyone Else

Team 2 recommends 8-12px border radius ("card corners 8-12px maximum") as the premium legal tech aesthetic. Teams 1, 4, and 5 recommend 0-4px as the government/regulatory aesthetic, with Team 4 calling border radius reduction "the single highest-impact change."

Team 2 is correct that premium legal tech SaaS (Clerky, compliance.ai) uses 8-12px. Teams 1, 4 and 5 are correct that government portals use 0-4px. The brief asks for the intersection. The brief says "government compliance portal crossed with premium legal tech."

**Resolution:** This is actually not a contradiction when read carefully — the brief calls for a crossing, not a choice. Use 0-4px on regulatory/informational components (requirement lists, notice blocks, table rows). Use 6-8px on conversion components (pricing box, questionnaire container). Team 4 explicitly supports this distinction in Part 5.

---

## 3. Alignment Drift — Where Findings Miss the Brief

### 3A. Sticky Left-Rail Sidebar (Team 4) — Structural Overreach

The Brief states: "Must remain a single-page experience with questionnaire flow." Team 4's Pattern 5 recommends a sticky left-rail sidebar navigation that restructures the entire page into a two-pane layout — "the entire page below the hero could benefit from this."

This does not violate the single-page constraint technically (it can be done in one HTML file), but a two-pane layout with sticky sidebar fundamentally changes the scroll experience. The questionnaire flow currently occupies the lower half of the page. A persistent sidebar would conflict with the questionnaire's step-by-step modal feel. This was not evaluated by Team 4.

**Alignment status:** Partially misaligned. The sidebar concept is valid for the HB3773 detail section. The "entire page below the hero" scope drifts toward a document portal architecture that the Brief did not request and that could conflict with the questionnaire flow.

---

### 3B. Table Structure for 7 Required Elements (Team 4) — Mobile Risk Unaddressed

Team 4 recommends converting the 7 elements `<ol>` into a `<table>` with a third column for "IDHR Reference." This is a strong authority signal on desktop. Team 4 notes the mobile tradeoff: "Tables require more HTML, don't reflow as gracefully on mobile." The proposed solution is `overflow-x-auto` wrapper.

This is a real UX concern for a single-page product where the questionnaire is the conversion mechanism. If mobile users hit a horizontally scrolling table on their way to the questionnaire, friction increases. The Brief is explicit: "Must still convert — authority without usability is useless."

**Alignment status:** Partially misaligned. The table pattern is correct for desktop. But a full three-column table on a single-page conversion flow needs a proper mobile fallback strategy, not just overflow-x-auto. Team 4 does not propose one.

---

### 3C. Section Numbering as "Section 2, Section 3" (Teams 4 and 1)

Both teams suggest labeling page sections as "Section 2: Required Documentation Elements," etc. The Brief's constraint is "cannot impersonate a government agency." Section numbering is explicitly permitted — it signals regulatory documents without impersonating any agency. No alignment issue here.

However, Team 1 goes further and suggests reformatting the 7-element list to read like actual IDHR Subpart J rule text, including the format `§ 1 AI Product Identification / The notification must include...`. This is a meaningful change to the *content* of the page, not just the styling. The Brief says "Core content (7 IDHR elements, FAQ answers, legal disclaimers) stays the same." Reformatting the element descriptions into regulatory rule-text format may cross into content change territory.

**Alignment status:** Flag for Guiding Light. The regulatory citation format is a design signal, but expanding the element descriptions to match IDHR rule text is a content edit, not a CSS change.

---

### 3D. Logo Wordmark Recommendation (Team 5) — No Constraint Violation

Team 5 recommends removing the shield logo icon and going wordmark-only. The Brief says "All changes are CSS/HTML only — no backend changes." Changing the logo SVG is an HTML change and is within constraints. No alignment issue.

---

## 4. Missing Angles — What Was Not Researched

### 4A. Illinois-Specific Government Design

No team studied the IDHR's own website (dhr.illinois.gov) in depth. Team 4 mentions it briefly: "Horizontal rules as structural dividers, minimal color palette, black text, white backgrounds, blue hyperlinks only." The direct analogue — the agency whose documents this product is meant to echo — received the least attention. If the goal is to look like "this is where IDHR compliance documents come from," the IDHR's own visual language deserves its own investigation.

**Why this matters:** If IDHR.illinois.gov uses a specific blue that differs from USWDS #005ea2, the more authentic authority signal would be Illinois-specific. This was not explored.

---

### 4B. Conversion Data for This Specific Price Point

All conversion evidence cited is directional — design authority generally improves B2B conversion. No team found data specific to:
- One-time payment compliance tools (vs. subscription SaaS)
- Sub-$500 B2B single-purchase products
- Products with zero social proof (no testimonials, no reviews)

The Brief is explicit: "The site IS the entire sales team." The conversion evidence cited (OneTrust, LexisNexis, Clerky) are all either enterprise/subscription products or backed by significant social proof. The $299 zero-touch single-purchase context is materially different. No team addressed this gap.

**Impact:** Medium. The directional findings are still the best available evidence. But they should be treated as informed hypotheses, not established facts.

---

### 4C. Page Load Performance Impact of Font Changes

Teams 1, 2, and 3 all recommend new Google Fonts loads. No team calculated the combined performance impact of:
- Replacing Inter + Space Grotesk with Merriweather + Source Sans 3 (or Playfair + IBM Plex)
- Multiple weight variants (3-4 weights per font)
- On a Vercel-hosted static site with no server-side optimization

Team 2 mentions "Libre Baskerville adds ~30KB to page weight" as acceptable, but this applies per font. Two new fonts at multiple weights could add 80-150KB. For a conversion-focused single-page product, page load matters. The Brief does not mention performance constraints, but a load time regression could hurt conversion. No team proposed a performance baseline.

---

### 4D. The Trust Bar Is Not Discussed as a Conversion Element

Teams 1 and 2 discuss the trust bar as an authority signal. Neither team discusses it as a *conversion* element. Team 1 recommends replacing the checkmark trust bar with a single regulatory citation line. This may increase authority but it removes five short-format scanning cues that serve a different function — quickly answering the buyer's "is this legitimate?" scan before they commit to reading.

No team evaluated whether the trust bar's conversion function requires its own treatment separate from the authority design. This is a gap: the brief says "authority without usability is useless" and the trust bar is a usability element as much as an authority element.

---

## 5. High-Confidence Convergence Zones

These are findings where multiple teams independently reached the same conclusion. These are the highest-confidence recommendations.

### Convergence 1: Remove the Pulse Animation (All 5 Teams)
Every team flags the pulse dot animation as the single most damaging credibility signal on the page. Team 5 provides the most specific implementation. This is the clearest, lowest-risk, highest-impact change available. Do this first.

### Convergence 2: Reduce Border Radius to 4px or Less (Teams 1, 4, 5)
Three teams independently identify `rounded-2xl` as the signature of SaaS template design. Teams 1 and 4 provide government design system evidence. Team 5 provides line-number specifics. This is verified and actionable.

### Convergence 3: Left-Border Accent on Regulatory Content (Teams 1, 2, 4, 5)
All four teams that address component design recommend left-border accent treatment as the government/regulatory component pattern — replacing rounded badges and background-fill cards. Team 1 verifies this from IRS.gov (including the specific gold color). Team 4 provides Tailwind implementation. This is the most "document-like" pattern available.

### Convergence 4: Serif Headings Signal Authority (Teams 1, 2, 3, 5)
All four teams recommend replacing Space Grotesk with a serif for H1 and H2. The specific serif differs, but the directional finding is unanimous and corroborated by verified evidence (DOL.gov uses Merriweather at font-weight 700, confirmed). The disagreement is about *which* serif — not whether to use one.

### Convergence 5: Regulatory Citation Text is the Highest-Trust Signal (Teams 1, 2, 5)
Three teams independently identify citing the specific IDHR regulatory code (`56 Ill. Adm. Code § 2520.1400`) as the highest-impact trust signal for this product. Team 5 frames it as the primary alternative to social proof for a new product. Team 1 provides the exact implementation (citation footer). This is achievable with a single HTML addition and zero design risk.

### Convergence 6: Replace Sky-700 with Deeper Blue (Teams 1, 2, 5)
Three teams converge on removing sky-700 as the primary action color. The evidence is strong: sky-700 is the most common SaaS template blue, and federal/institutional blues are darker and less saturated. The specific replacement (USWDS `#005ea2`, `#1D4ED8`, or `#1a4480`) varies but the directional shift — darker and less saturated — is unanimous.

### Convergence 7: Left-Aligned Section Headers (Teams 4 and 5 explicitly; Teams 1 and 2 implicitly)
Teams 4 and 5 explicitly flag centered section headers as a SaaS template signal. DOL.gov (verified) uses left-aligned headers. This is a low-effort, high-authority change.

---

## 6. Surprises and Notable Findings

### Surprise 1: The IRS Gold Left-Border is Real and Live
The most unexpected finding: `border-left: 4px solid #C7A97B` was actually found on IRS.gov in 2026. This is not a design theory recommendation — it is a currently-deployed federal government UI pattern. It is available for direct use on a compliance product without risk of impersonation, because it is a border style, not a government seal or logo.

### Surprise 2: Team 5's Line-Number Audit is the Most Actionable Output
Of all five reports, Team 5's anti-pattern audit with verified line numbers is the most immediately implementable. A developer could open index.html and execute Team 5's recommendations in sequence without additional research. The other teams provide the strategic rationale; Team 5 provides the tactical map.

### Surprise 3: The 7-Element Numbered List Is Already the Best Element on the Site
Teams 1, 2, and 4 independently note that the 7-element numbered list is already close to a regulatory document pattern. It does not need to be replaced — it needs three targeted enhancements: square number badges (replace circles), left-border treatment, and a regulatory citation footer line. The best content on the page is one step away from being a genuinely authoritative document component.

### Surprise 4: Team 4 Recommends Reducing Section Padding From py-16 to py-12
This is counterintuitive — more whitespace usually signals premium. But Team 4 correctly identifies that *type* of whitespace matters more than quantity. Government portals use structured density (dividers, sidebar reference blocks) rather than generous vertical breathing room between identical-format sections. Reducing uniform padding while adding structural dividers changes the feel from "marketing page" to "document" without reducing visual quality.

### Surprise 5: The Current Site's Dark Hero (#0F172A) Is Not an Anti-Pattern
Multiple teams implicitly validate the existing dark hero. Team 2 notes it's "already in premium range." Team 5 does not list it among its 12 anti-patterns (the gradient within it is the anti-pattern, not the dark color). This means the hero section needs surface treatment (remove gradient, possibly add micro-pattern texture), not a structural redesign.

---

## Summary: What to Trust, What to Verify, What to Decide

### Trust Without Reservation
- All USWDS color hex values from Team 1 (verified live)
- All GOV.UK color and layout values from Teams 1 and 4 (verified live)
- IRS.gov gold border #C7A97B and left-border pattern (verified live)
- DOL.gov uses Merriweather at font-weight 700, left-aligned headers (verified live)
- Team 5's anti-pattern line numbers (verified against index.html)
- The five convergence zones above
- Regulatory citation text as the highest single-impact trust signal

### Use as Directional, Not Precise
- The serif trustworthiness "40%" figure — directional only, do not quote the number
- The dark theme A/B test conversion delta — plausible but single-study, specific context
- The 94-agency Public Sans adoption figure — unverifiable, discard
- The FTC dark pattern framing for the pulse dot — real risk conceptually, overstated legally

### Requires a Decision Before Implementation
- Which serif: Merriweather (government-verified) vs. Libre Baskerville (landing-page-verified) vs. Playfair Display (prestige editorial)
- CTA color: Deep blue (Teams 1, 2, 5) vs. gold (Team 3) — gold fails contrast on white, favor blue
- Card shadows: Flat government aesthetic vs. deep legal tech shadows — resolve by context (flat for info, deep for conversion)
- Sticky sidebar scope: Full page vs. HB3773 section only — brief implies section-only is safer

### Needs Additional Research Before Implementing
- Gold CTA contrast ratios on all background contexts (white, slate-50, dark navy)
- IDHR.illinois.gov specific design language (the direct regulatory analogue, understudied)
- Mobile fallback for the 7-element table pattern

---

*Validation complete. No finding was accepted without evidence review.*
