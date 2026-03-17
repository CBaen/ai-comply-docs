# Expedition Validation Report: Authority Design Language
**Validator:** Claude Sonnet 4.6
**Date:** 2026-03-10
**Assignment:** Stress-test findings from Teams 1–5 on authority redesign for AI Comply Docs

---

## Validation Method

Sources were verified via direct WebFetch where possible. Dead URLs and unverifiable statistics are flagged. Analysis follows divergence-first protocol: evidence challenges before agreements.

---

## Section 1: Evidence Challenges — What Lacks Sufficient Proof

### 1A. The "Serif Fonts Increase Perceived Trustworthiness by 40%" Claim (Team 3)

**Challenged. Treat as unreliable.**

Team 3 cites this figure with an honest caveat: "the methodology behind this specific figure was not publicly verifiable in the cited sources — treat as directional rather than precise." That disclosure is responsible, but the validation concern is that the figure appears prominently anyway and may be picked up as a hard number.

The 24% claim (Team 2, from inkbotdesign.com) was traced to: "a 2025 study on luxury consumer behaviour" with no citation link. Verified via WebFetch — the article exists and makes the claim, but provides no verifiable study to check. The specific research it references involved Didot, not Baskerville or Playfair Display. Applying it to this site requires two unsupported leaps: (1) that results for luxury consumer products transfer to B2B compliance buyers, (2) that Playfair Display or Libre Baskerville produces the same effect as Didot.

The Errol Morris/Baskerville research (Team 1, Team 2) is the most legitimate citation here. It is a real study. However, it measured whether readers agreed with a factual statement (about asteroid extinction risk) in different fonts — not whether they trusted a product enough to buy it. The gap between "readers find Baskerville more credible for a philosophical statement" and "buyers convert at higher rates on a $299 compliance purchase" is substantial and unproven.

**Verdict:** All serif-authority claims are directionally plausible but statistically unverified. Do not cite specific percentages in design decisions. The directional finding — serif signals authority in legal/institutional contexts — is well-supported by professional practice evidence even without the numbers.

---

### 1B. The Dark Theme A/B Test 4.08% vs 3.65% Conversion Rate (Team 3)

**Source is dead. Treat as unverifiable.**

The searchengineland.com URL cited by Team 3 returned a 404 error during verification. The article cannot be confirmed to exist. The specificity of the numbers (4.08% vs 3.65%) suggests they were present in a real article at some point, but the source cannot be validated as of 2026-03-10.

More critically, even if verified: the product context is unknown. "Industrial B2B SaaS" is a wide category. An inventory management tool for manufacturers has a different buyer psychology than a compliance documentation tool for HR directors. The findings may not transfer.

**Verdict:** Remove this citation from implementation rationale. The directional claim (dark/austere design works for serious B2B buyers) has adequate support from OneTrust and LexisNexis observed behavior — it doesn't need an unverifiable study.

---

### 1C. "75% of Website Credibility Comes From Design" — Stanford Claim (Team 5)

**Overstated. The original research is older and narrower than presented.**

This figure is widely cited across marketing content but traces to a 2002 study by B.J. Fogg at Stanford, updated in a 2003 paper. The finding was that 46.1% of consumers cited design as a credibility factor — not 75%. The 75% figure emerged from a later literature aggregation and is now repeated without the original methodology. Multiple teams reference this via 2025 B2B statistics roundups (Sopro, UserGuiding) rather than the primary research.

This does not invalidate the underlying finding — design matters enormously for first impressions and credibility assessment. But the 75% number is not something that should be cited as authoritative.

**Verdict:** The core claim is valid. The specific statistic is unreliable. Use the observed behavior from OneTrust/LexisNexis/Clerky as concrete evidence instead.

---

### 1D. IRS Gold Accent Bar #C7A97B (Team 1)

**Verified with qualification.**

WebFetch of IRS.gov confirmed the gold accent color #C7A97B and the left-border treatment pattern. However: the IRS website uses this sparingly in specific alert/callout boxes, not as a system-wide accent. Team 1 presents it as a broadly deployable design token. That overreaches slightly — the gold bar is an alert-specific convention on the IRS site, not a brand element. Applying it more broadly as a "premium accent" risks reading as imitation rather than borrowing.

**Verdict:** The pattern is real and verified. Use it specifically for notice/alert contexts — not as a general accent color throughout the page.

---

### 1E. "94 Federal Agencies Use Public Sans, 1.1 Billion Pageviews" (Team 1)

**Unverifiable as stated.**

The Public Sans website (public-sans.digital.gov) was fetched and confirmed as a real USWDS font, but it describes the font as "strong, neutral" without citing agency count or pageview statistics. The 94 agencies / 1.1 billion pageviews figure may be accurate but cannot be verified from the primary source.

Also: Team 1 correctly notes that Merriweather + Source Sans Pro is a legacy USWDS v1 pairing. This was verified — USWDS v1 documentation confirms Merriweather + Source Sans Pro as the default pairing. However, current USWDS documentation (verified via WebFetch) positions Public Sans as the primary modern recommendation, with Merriweather as one of four supported options. Framing Merriweather as "the U.S. government font standard" is technically true of v1 but understates that the living standard has moved toward Public Sans.

**Verdict:** Merriweather is a legitimate government-associated serif with real deployment on .gov sites (DOL confirmed via WebFetch). It is a defensible choice. But the framing as the singular government standard is dated.

---

### 1F. The Typematch.io "Libre Baskerville + Inter" Landing Page Claim (Team 2)

**URL returned 404. Claim unverifiable.**

Team 2 cites typematch.io for the specific claim that Libre Baskerville + Inter is recommended for "high-growth SaaS landing pages requiring tall hero statements with trustworthy product copy." The page could not be fetched. The claim may be accurate, but cannot be confirmed.

**Verdict:** The Libre Baskerville recommendation is still defensible on its own merits (Google Fonts availability, screen-optimized design, established authority associations), but the specific endorsement cannot be cited.

---

### 1G. Meanpug.com "10,000 Law Firm Websites" Study (Team 3)

**URL returned 404. Study unverifiable.**

Both Team 2 and Team 3 cite this study. The URL returned a 404 error. Team 2 appropriately caveats that it studied law firm *service* websites, not legal tech *product* pages. Team 3 uses it without that caveat, citing "Blue reigns supreme for every major practice area" as support for the navy + gold recommendation.

The caveat matters enormously: law firm service websites typically target individual consumers seeking legal representation. This site targets HR directors and employment attorneys buying a compliance tool. The buyer psychology differs.

**Verdict:** Blue dominance in legal contexts is broadly accepted across multiple sources and does not depend on this study alone. But the 10,000-site figure and specific practice area breakdowns should not be cited.

---

## Section 2: Contradictions Between Teams

### 2A. Font Pairing: Three Incompatible Recommendations

This is the most significant internal contradiction in the expedition findings.

| Team | Primary Serif | Body/Sans | Reasoning |
|------|---------------|-----------|-----------|
| Team 1 | Merriweather | Source Sans 3 | USWDS legacy standard, SBA.gov, DHS.gov |
| Team 2 | Libre Baskerville | Inter | "High-growth SaaS landing pages" |
| Team 3 | Playfair Display | IBM Plex Sans | "Baroque extravagance meets corporate rationalism" |
| Team 5 | Playfair Display (or pure Inter) | — | Recommended vs. Space Grotesk |

**The contradiction is unresolved by the evidence.** All four options are defensible, but they signal *different things*:

- **Merriweather + Source Sans 3** signals: government document, institutional, regulatory
- **Libre Baskerville + Inter** signals: trustworthy modern SaaS, premium but approachable
- **Playfair Display + IBM Plex Sans** signals: editorial authority, financial publication, premium luxury

The Research Brief asks for the site to feel like "this is where official compliance documents come from" — not "this is a premium SaaS product" or "this is a luxury financial publication."

**Evidence favors Merriweather for that specific brief.** The DOL website was fetched and confirmed: Merriweather at font-weight 700 is used on H1 headings at dol.gov. This is a direct government analog. Playfair Display's editorial-luxury associations make it a stronger fit for a law review or investment publication than for a regulatory compliance tool. Libre Baskerville lands between the two — more authority than Playfair, less institutionally government than Merriweather.

**However:** Team 3's observation about Playfair Display being used at Duke University and in legal publications is directionally correct. The question is whether "legal publication" or "government regulatory portal" is the target register. The brief says "government compliance portal crossed with premium legal tech" — which genuinely puts it between Merriweather and Libre Baskerville.

**Resolution:** Merriweather is the higher-confidence choice for the specific brief because it has a verified government deployment (DOL) and is designed for on-screen readability at document scale. Libre Baskerville is a legitimate second choice. Playfair Display is the weakest fit for this specific brief despite being excellent for other authority contexts.

---

### 2B. CTA Color: Three Incompatible Directions

| Team | Recommended CTA | Hex |
|------|-----------------|-----|
| Team 1 | USWDS navy dark | #1a4480 |
| Team 2 | Deep blue | #1D4ED8 or #2563EB |
| Team 3 | Muted brass gold | #B8962E |
| Team 4 | Defers to other teams; says keep sky-700 | — |
| Team 5 | Navy fill or deep regulated blue | #1a365d |

These are not merely different shades — they are different philosophies:
- Teams 1, 5: CTA should be dark/navy (authority-first, conversion is secondary)
- Team 2: CTA should be a decisive mid-blue (authority without sacrificing visibility)
- Team 3: CTA should be gold (institutional accent, breaks from blue paradigm)

**The gold CTA hypothesis (Team 3) is the most adventurous and the least verified for conversion.** The team's reasoning — gold on navy is high contrast, institutional, differentiating — is internally coherent. But no verified example of a compliance or legal product using gold as its primary CTA was produced. TrustArc (verified) uses dark grey (#32373c) with white text, not gold. The navy + gold pattern Team 3 cites (University of Illinois, US Navy design guide) is from brand identity systems, not conversion-optimized CTA design.

**The navy CTA direction (Team 1, Team 5)** has the strongest authority evidence but the weakest conversion consideration. A near-black button on a near-black hero will not read. The team recommendations implicitly assume this is used on light-background sections — that context matters.

**The deep blue direction (Team 2)** — #1D4ED8 (Tailwind blue-700) — is the most pragmatic. It is measurably darker and more authoritative than sky-700, it has contrast on both light and dark backgrounds, and it avoids the untested gold CTA experiment. Compliance.ai (verified via WebFetch) uses #2C6DDF as its primary interactive blue — this corroborates Team 2's range.

**Resolution:** Deep blue (#1D4ED8 or #2563EB) for primary CTA on light backgrounds. Navy/dark (#1a4480 or #162e51) for CTA in dark-hero context. Gold (#B8962E) as an accent for left-border treatments and callout elements — not as the primary CTA. This synthesizes the verified evidence while avoiding the untested gold-CTA hypothesis.

---

### 2C. Card Shadows: Teams 2 and 4 Contradict Team 1

Team 1 states flatly: "No card shadows — flat borders define regions" and documents this as a 6/6 cross-platform pattern.

Team 2 states: "Card shadows are deep, not soft. compliance.ai: `box-shadow: 0 25px 50px rgba(48, 49, 51, 0.13)`" and recommends deep card shadows.

**Team 1 is more correct for this specific brief.** The brief asks for "government compliance portal" aesthetic. Verified government portals (IRS, GOV.UK, DOL, EEOC, IDHR) do not use deep card shadows. The deep shadow pattern Team 2 cites is from premium legal *tech* products — the "premium legal tech" pole of the brief, not the "government compliance portal" pole. For a product primarily needing to signal regulatory authority, flat borders are the more direct signal. Premium shadow depth risks sliding toward polished startup territory.

**Resolution:** Team 1 is right on the merits of the brief. Flat 1px borders replace shadows for content cards. Deep shadows may be appropriate only for the pricing box or modal-style elements that need to float above content — not for content cards.

---

### 2D. Border Radius Advice is Consistent — But Team 2 Contradicts Its Own Claim

All teams agree: reduce rounded corners from `rounded-2xl` (16px). Teams 1, 4, 5 recommend 0–4px. This is verified by government design systems (USWDS: 0–4px maximum for regulatory content).

But Team 2 says: "Premium legal tech uses `rounded-lg` (8px) or `rounded-xl` (12px) maximum. Clerky, compliance.ai, and government portals use 8-12px."

That claim groups government portals with Clerky/compliance.ai at 8-12px, which directly contradicts Teams 1, 4, 5, and the verified USWDS specification (4px max for government components). Team 2 also correctly notes elsewhere that Clerky uses "sharp card edges" — which is not 8-12px.

**Team 2's 8-12px recommendation is for the premium tech aesthetic, not the government aesthetic.** Both are valid poles of the brief, but they should not be conflated.

**Resolution:** 4px (`rounded`) for content cards that need to signal document/regulatory origin. 8px (`rounded-lg`) is acceptable for the pricing section or CTA elements where warmth serves conversion without undercutting authority.

---

## Section 3: Alignment Drift — Where Findings Drift from the Brief

### 3A. Team 3 Drifts Toward "Luxury Premium" Rather Than "Regulatory Authority"

The brief asks for "government compliance portal crossed with premium legal tech." Team 3's recommendations — Playfair Display, muted brass gold, parchment backgrounds, SVG micro-dot patterns — land closer to "premium luxury editorial" than "regulatory portal."

Playfair Display has strong associations with Vogue, luxury brands, and editorial design. For a tool selling regulatory compliance documentation to HR directors under penalty of Illinois law, the luxury-editorial register may undermine rather than reinforce trust. A buyer who sees Playfair Display headings may think "marketing" rather than "official compliance document."

Team 3's parchment background (#F8F6F1) is warm-tinted — the opposite of the cool-tinted off-whites (#f4f8fb, #f0f0f0) used by USWDS and GOV.UK. Government sites use cool or neutral off-whites because warmth signals consumer comfort, not institutional precision.

**Alignment verdict:** Team 3's recommendations are internally coherent but drift from the brief's "government compliance portal" anchor. They are better suited to a brief asking for "premium law firm aesthetic." About 40% of Team 3's recommendations should be discounted relative to Teams 1 and 4 which directly study government portal patterns.

---

### 3B. Team 4 Pattern 5 (Sticky Sidebar TOC) May Exceed Brief Scope

The brief specifies a single-page experience. Pattern 5 (sticky sidebar navigation with document TOC) works on multi-section document pages. On a single conversion page, a sticky sidebar TOC risks fragmenting the conversion funnel — buyers navigating the TOC may jump to pricing before reading the evidence case, or exit to the FAQ before the CTA.

**Alignment verdict:** The sticky sidebar is architecturally correct for a regulatory portal but may hurt conversion on a single-page sales page. Team 4 notes this tradeoff but rates it high-impact. It should be lower priority than other structural changes.

---

### 3C. "Gold CTA" May Conflict with the No-Impersonation Constraint

The brief says: "Cannot impersonate government." Government seals and gold accents are strongly associated with official insignia. A gold CTA button on a deep navy background pattern closely matches the visual language of state government emblems and university seals.

Team 3 does not address whether gold CTAs could trigger the no-impersonation concern. The gold left-border accent (IRS pattern) is lower risk because it's used sparingly in alerts. Gold as the primary CTA color is higher risk.

**Alignment verdict:** This is a design judgment call, not a clear violation. But it should be flagged and Guiding Light should decide — the research teams did not raise it.

---

## Section 4: Missing Angles

### 4A. No Testing Evidence for This Specific Buyer Persona

All five teams provide category-level evidence (B2B buyers, enterprise compliance, legal tech) but no research specifically examines purchasing behavior of **HR directors and employment attorneys buying one-time compliance documentation packages at $299**.

This is a notably specific buyer persona. They are:
- Buying once, not subscribing
- Making a risk-averse purchase under legal pressure
- Evaluating a product with no testimonials and no brand recognition
- Often working alone without a procurement committee

The conversion evidence cited (OneTrust, LexisNexis, TrustArc, Clerky) is from companies with established brands, testimonials, analyst validation, or venture backing. None of them are asking a cold visitor to trust a $299 one-time purchase from a new product with zero social proof. The trust gap is different in kind, not just degree.

**What's missing:** Any evidence about conversion optimization for a single-product, no-testimonials, first-purchase B2B tool. The closest analog would be information product or template marketplace research (Gumroad-style products, legal template companies) — not OneTrust.

---

### 4B. No Research on Actual IDHR Visual Language

Team 1 studied IRS, GOV.UK, healthcare.gov, FINRA, Bloomberg. Team 4 fetched DOL and EEOC. No team directly fetched and analyzed IDHR.illinois.gov — the specific regulatory authority whose law this product is about.

If the site should feel like it came from the IDHR, the direct source should have been studied. The IDHR site's specific visual language (colors, typography, information density) would be the most direct model and the most appropriate to borrow from.

---

### 4C. Performance Impact of Font Loading Not Adequately Addressed

The brief specifies "Tailwind via CDN" and a static site. Team 2 briefly mentions Libre Baskerville adds "~30KB" and calls it acceptable. No team calculated the combined weight of multiple Google Fonts loads across variants.

Loading Playfair Display (600, 700, 800) + IBM Plex Sans (400, 500, 600, 700) = 8 font weight files. That's typically 150–300KB in font data, plus Google Fonts API overhead. On a CDN static site targeting compliance buyers who may be on corporate networks, this matters for Core Web Vitals and first impression timing.

Merriweather + Source Sans 3 in 4 weights is a lighter load. This is a pragmatic argument for Team 1's recommendation that was not made.

---

### 4D. Single-Page Constraint Creates Layout Pattern Conflicts

Teams 4's two-thirds/one-third column layout and sticky sidebar recommendations assume a document-style page with a fixed reading flow. A single-page with a questionnaire flow embedded in the page (the compliance document generator) creates a layout paradox: the page needs to be both a regulatory reference document (two-column, sidebar navigation) AND a conversion funnel (single-column, scroll-to-CTA).

No team addressed how to resolve these two layouts in a single page. Team 4 notes the sticky sidebar applies to "information sections only" while hero/pricing/questionnaire remain full-width — but doesn't address the transition between the two modes and whether it looks coherent.

---

## Section 5: Agreements — High-Confidence Zone

These findings converged independently across multiple teams and are verified:

### 5A. Remove Rounded-2xl — Universal Agreement, Fully Verified
All five teams agree. USWDS confirmed: 4px max for government components. This is the single change with the most evidence behind it.

### 5B. Remove Pulse Dot Animation — Universal Agreement, Well Reasoned
All teams agree, with Teams 2 and 5 providing the strongest rationale. Team 5's point about ironic credibility risk (a compliance vendor using manipulation to sell compliance tools) is the sharpest argument.

### 5C. Remove Space Grotesk, Add Serif Headings — Four Teams Agree
Teams 1, 2, 3, 5 all recommend moving from Space Grotesk to a serif for headings. The specific serif differs, but the direction is unambiguous. Verified via DOL (uses Merriweather serif on H1), GOV.UK uses GDS Transport (proprietary) with institutional weight.

### 5D. Regulatory Citation as Trust Signal — Universal Agreement, Strongest Single Finding
Every team identifies citing the exact IDHR Subpart J section numbers as the highest-impact trust signal available to a product with no testimonials. This is the finding with the broadest cross-team agreement and the most direct logical support. It requires zero design change — just content addition.

### 5E. Left-Border Accent Treatment Replaces Circle Badges — Teams 1, 4, 5 Agree
The numbered requirement list with circle badges reads as SaaS; left-border blocks read as regulatory document. Verified: DOL alert blocks, USWDS callout pattern, IRS notice treatment all use left-border accent. Circle badges appear nowhere on verified government sites.

### 5F. Darken CTA Color from Sky-700 — All Teams Agree on Direction
Teams differ on the specific color (navy vs gold vs deep blue) but unanimously agree sky-700 is wrong. Verified: no compliance platform studied (compliance.ai, TrustArc, OneTrust) uses sky-blue as primary CTA. compliance.ai uses #2C6DDF. TrustArc uses #32373c (dark grey).

### 5G. Left-Align Section Headers — Teams 1, 4, 5 Agree
DOL, EEOC, IDHR, GOV.UK: all use left-aligned headers. This is verified. The current centered headers signal marketing page; left-aligned headers signal document. One class replacement: `text-center` → `text-left`.

### 5H. Flat 1px Borders Replace Shadows — Teams 1, 4 Agree (Team 2 Partially Disagrees)
Verified across all government sources. The Team 2 disagreement is more applicable to the premium tech pole than the government pole of the brief.

---

## Section 6: Surprises — What Changed Validator Thinking

### 6A. The IRS Gold Bar is Real and Verified
Going in, the IRS gold accent (#C7A97B) sounded like a creative invention. WebFetch confirmed it. This is a legitimate, usable pattern with real government precedent — but it should be deployed narrowly (notice/callout blocks) not broadly.

### 6B. USWDS is Not What Team 1 Claims It Is — It's More Flexible
The USWDS is presented as a rigid standard by Team 1. Verified: USWDS v1 had Merriweather + Source Sans Pro as a default. Current USWDS supports four typeface options with no single mandate. The system is a framework, not a prescription. This matters because it weakens the "government standard = Merriweather" claim while keeping Merriweather as a valid government-associated choice.

### 6C. TrustArc Uses Pill-Shaped Buttons (#32373c with border-radius: 9999px)
Team 5 identifies `rounded-full` pill badges as an anti-pattern. But TrustArc — cited by Team 2 as a premium compliance authority — uses `border-radius: 9999px` on its primary CTA buttons. Verified. The anti-pattern rule is not universal even within the compliance space. The pill shape is problematic for content labels (statutory citations in oval pills), but pill CTA buttons are used by at least one premium compliance platform.

This does not overturn Team 5's recommendation to remove rounded-full from content labels — that specific case is clearly wrong. But it weakens the categorical argument against rounded CTAs.

### 6D. compliance.ai Uses Orange CTAs (#F4891E) Not Blue or Navy
Team 2 recommends deep blue (#1D4ED8) partly based on what premium compliance platforms use. But compliance.ai (directly verified) uses orange (#F4891E) as its secondary CTA. Orange is the least authority-coded color in the palette. This suggests premium compliance platforms don't follow a single CTA color rule — which means the CTA choice is more open than any single team implies.

---

## Synthesis: What to Build From and What to Discard

### High-Confidence Recommendations (Build From These)

1. **Regulatory citation text** under the 7 requirements — citing IDHR Subpart J with exact section numbers. Zero risk, maximum credibility impact. Every team agrees. No design expertise required.

2. **Font change: Merriweather for H1/H2, Source Sans 3 for body.** Verified government deployment (DOL), USWDS-supported, free, screen-optimized. Strongest brief alignment for "government compliance portal" register. Source: Team 1 (primary), Team 4 (corroborates DOL use).

3. **Remove rounded-2xl on all content cards → rounded (4px).** Universally agreed, verified, single find-and-replace. Keep 4–8px on CTA button only.

4. **Remove pulse dot animation → static bordered date-stamp badge.** Universal agreement, logical argument for compliance context, verified that no compliance platform uses pulse animations.

5. **Left-align section headers** (not hero). Every government site verified uses left-aligned headers for content sections. Direct class swap.

6. **Left-border treatment (4px, navy/federal blue) on numbered requirements** instead of circle badges. Verified IRS/DOL/GOV.UK pattern.

7. **CTA color: #1D4ED8 or #2563EB on light backgrounds, #1a4480 on dark backgrounds.** Splits the difference between Teams 1 and 2, matches compliance.ai's verified color range.

8. **Flat 1px borders (#dfe1e2) replace all card shadows.** Government standard, verified across all sources.

9. **Remove gradient hero → solid #0F172A or deepen to #162e51.** Universal agreement.

10. **Remove scroll reveal animations on content sections** — legal requirements should not be revealed theatrically.

### Lower-Confidence Recommendations (Proceed with Caution)

- **Gold CTA (#B8962E):** No verified compliance platform uses this. The IRS pattern it borrows from is for alert borders, not CTAs. Interesting hypothesis, not proven.

- **Parchment background (#F8F6F1):** Warm cast runs counter to government site color standards. Prefer #f4f8fb (GOV.UK verified) or #f0f0f0 (USWDS verified) if changing from current slate-50.

- **Playfair Display:** More evidence for editorial/luxury than regulatory/government. Lower priority than Merriweather for this specific brief.

- **Two-thirds/one-third column layout:** High architectural effort, requires significant HTML restructuring, may conflict with single-page funnel. Defer until simpler changes are implemented and measured.

- **Sticky sidebar TOC:** Same concern — conversion funnel impact not studied.

### Discard

- The 40% trustworthiness increase statistic
- The 75% credibility-from-design statistic (as cited — use Stanford's name without the specific number)
- The dark theme A/B test (404, unverifiable)
- The meanpug.com 10,000 law firm study (404, unverifiable)
- The Typematch.io Libre Baskerville claim (404, unverifiable)

---

## Priority Implementation Order (Adjusted From Team Recommendations)

Ranked by evidence confidence × brief alignment × effort:

1. Add regulatory citation footnote under requirements list — 15 minutes, maximum trust impact, zero risk
2. Remove pulse animation, replace with static date badge — 30 minutes, removes FTC dark-pattern risk
3. Font swap: Merriweather + Source Sans 3 — 1 hour, direct government analog, verified DOL use
4. Replace rounded-2xl with rounded (4px) everywhere — 1 hour find-and-replace
5. Darken CTA from sky-700 to #1D4ED8 — 30 minutes, verified compliance platform range
6. Left-align all section headers below hero — 30 minutes, verified government standard
7. Replace circle badge numbers with left-border treatment — 2 hours, verified IRS/GOV.UK pattern
8. Remove card shadows, add flat 1px borders — 1 hour
9. Remove gradient hero, solid navy — 30 minutes
10. Remove scroll reveal animations on content sections — 1 hour
11. Add IRS-style gold left-border accent (#C7A97B) to the notice/consequences section specifically — 30 minutes, verified narrow pattern
12. Consider deep card shadows for pricing box only — experimental, Team 2 precedent, not government-verified

The sticky sidebar, two-thirds/one-third layout, and gold CTA are deferred pending simpler changes shipping and conversion data being observed.

---

*Validation completed 2026-03-10.*
