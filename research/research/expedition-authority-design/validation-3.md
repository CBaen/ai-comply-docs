# Expedition Validation Report — Authority Design Expedition
**Validator:** Claude Sonnet 4.6
**Date:** 2026-03-10
**Brief:** AI Comply Docs authority redesign — government/legal visual DNA for a $299 B2B compliance tool

---

## Validation Priority

The brief assigned four specific focus areas. This report addresses them directly before general findings.

---

## FOCUS AREA 1: Practical Implementation Risk — Will These Changes Break Conversion?

### Verdict: Low risk, with one significant exception.

**What the evidence actually supports:**

The convergent claim across Teams 2, 4, and 5 — that authority design helps rather than hurts B2B compliance conversion — is directionally supported but not proven for this specific product. The evidence chain is:

- Team 5 cites OneTrust and LexisNexis as proof that austere design converts. These are enterprise platforms with established brand recognition, analyst validations (Gartner, IDC), and named customer logos. AI Comply Docs has none of these. The authority of OneTrust's design is reinforced by brand infrastructure the comparison product lacks.
- Team 5's Stanford "75% credibility from design" statistic is real but misapplied. The Stanford Web Credibility Research findings are from 2002 (B.J. Fogg et al., web credibility studies). Every team that cites this treats it as a current finding. It is 24 years old. While the directional conclusion — design affects credibility — is stable, the precise percentage is not a current controlled study. No team verified the original source.
- Team 4 notes conversion risk on exactly one change: the two-thirds/one-third column layout narrows the content column and may reduce readability of core value propositions on mobile. This is the correct risk to flag. It is the structural change with the highest probability of hurting conversion if poorly executed.

**What is NOT risky:** The anti-pattern removals (pulse dot, rounded-2xl, gradient hero, scroll animations). Teams 2, 4, and 5 converge on these. The evidence that removing them hurts conversion is zero. The evidence that they are cheapening signals for this buyer persona is strong. These are safe changes.

**What IS uncertain:** Whether the full layout restructure (sticky sidebar, 2/3 + 1/3 columns, section numbering, table for the 7 elements) retains or improves conversion without A/B testing. Teams 4 and 5 disagree on this implicitly — Team 4 recommends the full restructure; Team 5 recommends keeping conversion elements warm while making informational sections authoritative. Team 5's framing is more operationally conservative and better supported.

**Implementation recommendation from this validation:** Sequence changes in two phases. Phase 1: cosmetic anti-pattern removals (safe, convergent, low risk). Phase 2: structural layout changes (test against current, not assumed safe).

---

## FOCUS AREA 2: The Government Impersonation Boundary

### Verdict: No team crosses the line. But one recommendation is dangerously close.

**What is safe:**
- Regulatory citations with exact section numbers (§ 2520.1400, etc.)
- Left-border accent bars in government blue
- Serif headings, reduced border radius, horizontal rules
- "Effective Date: January 1, 2026" static badges
- Document-style layout patterns
- Section numbering using § symbols

These are documentary design patterns, not impersonation. They communicate "we took the regulation seriously enough to present it as a document" — which is accurate and legally defensible.

**What is close to the line — Team 1, Section 7:**

Team 1 recommends replacing the current trust bar with this exact text:

> "Documentation templates based on IDHR Subpart J, 56 Ill. Adm. Code §§ 2520.1400–2520.1530 | Templates verified current as of March 2026"

This specific formulation — particularly "Templates verified current as of March 2026" — implies that a qualified party has verified the templates against the current law. If the templates are not independently verified by an attorney, this statement is potentially a false claim of professional verification, not just an impersonation risk. This is a **legal accuracy problem**, not just a design boundary problem. The word "verified" needs either a qualified professional behind it or replacement with "drafted against" or "based on."

**What is not flagged enough — Team 1, Pattern 7:**

Team 1 suggests placing a "Utility Credential Bar" with "official seal/badge placeholder" above the navigation. The word "placeholder" here is a red flag. If any seal-like graphic is placed above the nav in a bar styled like a government credentialing bar, it could read to unsophisticated users as government association. The recommendation needs an explicit constraint: no seal graphics of any kind in this position, wordmark/brand name only.

No team uses or recommends actual government seals, .gov domain references, or official insignia. The risk is in the suggestion to mimic the structure without adequate guard rails on execution.

---

## FOCUS AREA 3: The Gold CTA Risk — Is There Evidence Gold CTAs Work in B2B?

### Verdict: The gold CTA recommendation lacks conversion evidence. This is the highest-risk recommendation in the expedition.

**Team 3's claim:**

Team 3 recommends replacing sky-blue CTAs with brass gold (#B8962E) CTAs on dark navy. The cited rationale:
- "Triadic color theory for navy recommends yellow as the complementary CTA choice"
- "Dark navy text on gold button gives excellent contrast (~8:1 ratio)"
- Navy + gold = institutional authority (US Navy, University of Illinois)

**What the evidence actually shows:**

1. Every cited example of navy + gold is a *brand identity* system — US Navy design guide, University of Illinois brand guidelines, schemecolor.com schemes. None of these are *CTA conversion* tests. Brand identity design and CTA conversion design are different problems with different constraints.

2. The Team 3 A/B test (searchengineland.com, 4.08% vs 3.65%) could not be verified — the URL returned a binary video file, not an article. The claim cannot be confirmed as stated. The specific numbers (4.08% and 3.65%) are cited by Team 3 as evidence for dark themes generally, not for gold CTAs specifically. This statistic is being misapplied to support a different recommendation.

3. Team 2 recommends deeper blue CTAs (#1D4ED8). Team 1 recommends USWDS navy (#1a4480). Team 5 recommends solid navy. Team 3 is the only team recommending gold. The lone outlier bears the burden of proof. That proof is not present.

4. The actual contrast issue: #B8962E on #0D1B2A does pass WCAG AA (Team 3 claims ~5.8:1 for normal text at weight 700+). However, WCAG AA for normal text requires 4.5:1. The claim is technically accurate but only at heavy weights, which limits its application to headline-weight button text only. Small print on the gold element may fail.

5. Gold CTAs have zero documented precedent among the compliance and legal tech platforms studied by any team: OneTrust (near-black), LexisNexis (red), Clerky (restrained blue), compliance.ai (orange). Gold/yellow CTAs are used by discount and clearance retail contexts (Amazon, Best Buy sale badges) — the opposite association from institutional authority.

**Finding:** Team 3's gold CTA is a creative hypothesis unsupported by conversion evidence and directly contradicted by the precedent of every comparable product studied. The institutional use of gold in brand identities (as an accent in a navy color scheme) does not transfer to gold as a CTA color. These are categorically different applications.

**Recommendation from this validation:** Do not implement gold CTAs. Use the convergent recommendation: deep navy or deep regulated-sector blue (#1a4480 or #1D4ED8). Use gold only as Team 1 originally recommended it — as left-border accent bars on notice boxes, echoing IRS.gov patterns, where it is genuinely attested.

---

## FOCUS AREA 4: Font Loading Performance

### Verdict: The performance risk is real and underreported. Team 2's "~30KB" estimate is dangerously understated for two font families.

**What Team 3 recommends loading:**

```
Playfair Display: weights 600, 700, 800
IBM Plex Sans: weights 400, 500, 600, 700
```

That is 7 font weights across 2 families, served from 2 separate Google Fonts origins.

**The actual performance penalty (verified via csswizardry.com and sia.codes):**

Google Fonts loading has three distinct costs:
1. DNS lookup + TCP connection to `fonts.googleapis.com` (the CSS delivery origin)
2. DNS lookup + TCP connection to `fonts.gstatic.com` (the font file origin)
3. The render-blocking stylesheet from googleapis.com delays First Contentful Paint until the CSS resolves

Measured impacts (verified sources):
- Without optimization: 3.4 second delay to first paint on slow connections (csswizardry.com, verified)
- Speed Index penalty vs. self-hosted: ~18% slower (sia.codes, verified)
- Median time-to-first-byte for the CSS stylesheet: 1,406ms — 148x slower than the actual file download
- The root cause is latency, not bandwidth — two round trips to two separate origins

**File size breakdown (approximate, based on Google Fonts subsetting):**

Google Fonts subsets by unicode range automatically. For Latin text:
- Playfair Display (3 weights, Latin subset): ~60–80KB of font files
- IBM Plex Sans (4 weights, Latin subset): ~80–120KB of font files
- Combined: approximately 140–200KB of font files + 2 CSS stylesheets

Team 2 cited "~30KB" for Libre Baskerville alone. This is roughly accurate for a single weight of a single family. Team 3's recommendation of 7 weights across 2 families is approximately 5–7x heavier.

**On a static HTML + Tailwind CDN site:**

This context makes performance more sensitive, not less. A static page has no server-side prefetching, no build-time optimization, and no bundler to handle font subsetting or preloading. The Google Fonts import as a `<link>` tag (the method Team 3 recommends) creates a render-blocking request unless manually optimized with `preconnect` and `font-display: swap`.

**Team 3 does not mention:**
- `preconnect` hints for the two Google Fonts origins
- `font-display: swap` or `font-display: optional` to prevent FOIT
- Latin-only subsetting in the URL parameter (`&subset=latin`)
- Any performance mitigation at all

**Minimum required implementation guard (not mentioned by any team):**

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
```

The `display=swap` parameter in the URL enables `font-display: swap` globally. This is required, not optional, for a production page. Without it, users on slow connections see invisible text until fonts load.

**Recommendation from this validation:** Load the minimum weight set. Playfair Display at weight 700 only (one weight) covers H1 and H2. IBM Plex Sans at weights 400 and 600 only covers body and headings. That is 3 weights instead of 7 — approximately 60–80KB instead of 140–200KB. Include the `preconnect` hints. Add `display=swap`.

Alternatively: Team 1's recommendation (Merriweather + Source Sans 3) loads 2 weights of Merriweather (400, 700) and 3 weights of Source Sans 3 — a lighter overall load, and both are verified against actual government use rather than editorial authority.

---

## SECTION 1: Evidence Challenges

### Challenge 1 — The "40% trustworthiness" serif statistic (Team 3)

Team 3 states: "Serif fonts increase perceived trustworthiness by 40%."

Verification: The inkbotdesign.com source was fetched and read. The article does not contain a 40% trustworthiness claim. It contains an unattributed "2025 study" claim of 24% higher perceived value (not trustworthiness, and not 40%). The 40% figure appears in Team 3's report with no retrievable source. This specific statistic should be treated as unverified and not cited in any implementation rationale or marketing copy.

The Errol Morris Baskerville experiment (documented in the New York Times, 2012) is real and well-attested — it showed readers judged statements in Baskerville as more accurate than other typefaces. However, "more accurate" is not the same as "40% more trustworthy," and this specific experiment concerns Baskerville only, not serifs generally. The teams are correctly extrapolating the directional insight (serifs signal authority) but incorrectly laundering a marketing blog's unverifiable statistic as research evidence.

### Challenge 2 — The A/B test cited by Team 3 (4.08% vs. 3.65%)

Team 3 cites a searchengineland.com article about a dark-theme A/B test. The URL returned a binary MP4 video on both fetch attempts. The specific numbers (4.08% and 3.65%) cannot be verified. The article may exist but the source is not accessible for validation. This statistic should not be used as implementation evidence until the original article is confirmed.

Additionally, Team 3 applies this dark-theme conversion finding to support the gold CTA recommendation. These are separate design decisions. A dark background outperforming light does not imply that gold CTAs outperform blue on any background.

### Challenge 3 — The "74 agencies / 1.1 billion pageviews" claim for Public Sans (Team 1)

Team 1 states Public Sans is "deployed on ~94 federal agencies as of September 2023 (1.1 billion pageviews)." The number shifts between "~94" and the parenthetical implies massive deployment. This is plausible but the exact figures were not verified against the Public Sans project page or GSA data. This is a low-stakes claim (the recommendation to use Public Sans or Merriweather is sound regardless), but the precision suggests false certainty.

### Challenge 4 — IRS gold accent hex #C7A97B (Team 1)

Team 1 claims the IRS uses a gold accent bar at #C7A97B. This specific hex was not directly verified against the IRS stylesheet. The IRS.gov page was fetched by Team 1's researcher, but the specific color token was not confirmed via DevTools inspection. Given that Team 1 correctly verified multiple other color values against USWDS documentation (confirmed: #005ea2 is accurate), this IRS-specific color should be treated as directionally correct but not precisely confirmed. Use with slight caution if it will be cited in product documentation.

### Challenge 5 — Team 2's card shadow recommendation contradicts Teams 1, 4, and 5

Team 2 recommends: "Card shadows are deep, not soft. compliance.ai: `box-shadow: 0 25px 50px rgba(48, 49, 51, 0.13)`."

Teams 1, 4, and 5 explicitly recommend removing card shadows entirely and using flat 1px borders instead — citing IRS, GOV.UK, FINRA, EEOC, and DOL as evidence. The government design pattern is unambiguously flat. Team 2 is citing compliance.ai, which is a premium legal SaaS, not a government portal. Both aesthetics exist in the target design range, but they are different points on the spectrum. Team 2's recommendation is not wrong for premium legal tech, but it conflicts with the brief's goal of government portal aesthetics specifically. The brief says "government compliance portal crossed with premium legal tech" — flat borders are the government pole; deep shadows are the premium tech pole. Teams 1, 4, and 5's flat-border recommendation is more on-brief.

---

## SECTION 2: Contradictions Between Teams

### Contradiction 1 — Font recommendation (Teams 1, 2, 3, and 5 disagree)

| Team | Primary Heading Font | Body Font |
|------|---------------------|-----------|
| Team 1 | Merriweather | Source Sans 3 |
| Team 2 | Libre Baskerville | Inter |
| Team 3 | Playfair Display | IBM Plex Sans |
| Team 5 | Playfair Display (preferred) or pure Inter | (not specified) |

All four recommendations point in the same direction (serif headings, clean sans body) but produce four different specific implementations. A site can only have one. The teams did not reconcile this. The practical effect is that a reader of all five reports gets no single implementable answer.

**Validation finding:** Merriweather + Source Sans 3 (Team 1) has the most direct evidentiary backing — it is the literal USWDS v1 standard, confirmed deployed on SBA.gov, DHS.gov, and other .gov properties. Playfair Display (Teams 3 and 5) has editorial authority associations (Vogue, law reviews) but less direct government-portal precedent. Libre Baskerville (Team 2) is a reasonable middle ground. For this specific brief — government compliance portal feel — Merriweather is the most on-target recommendation and has the most primary source evidence.

### Contradiction 2 — CTA button treatment (Teams 1, 2, 3, 4, and 5 disagree)

| Team | CTA Recommendation |
|------|-------------------|
| Team 1 | USWDS navy #1a4480 |
| Team 2 | Deeper blue #1D4ED8 or #2563EB |
| Team 3 | Brass gold #B8962E |
| Team 4 | Keep sky-700 on conversion elements |
| Team 5 | Solid navy or deep institutional blue (#1a365d) |

Team 4 is the most operationally conservative (keep sky-700 where conversion is critical). Teams 1, 2, and 5 agree on deep blue variants. Team 3 is the outlier with gold. The convergent answer is deep navy/blue CTA, not gold.

### Contradiction 3 — Shadow philosophy (Team 2 vs. Teams 1, 4, 5)

Detailed above in Evidence Challenges. Not a minor stylistic disagreement — flat borders and deep shadows are incompatible design philosophies representing different reference aesthetics (government vs. premium SaaS). Both are internally consistent; they cannot be combined without producing an incoherent system.

---

## SECTION 3: Alignment Drift from Research Brief

### Drift 1 — Team 3 produces a dark-mode redesign, not an authority-signal layer

Team 3's palette recommendation uses `#0D1B2A` (deep navy) as a primary background throughout, with parchment `#F8F6F1` for light sections. The existing site already uses `#0F172A` for the hero. But Team 3's full palette implies extending the dark treatment across more of the page, which is a larger structural decision than the brief's constraint of "CSS/HTML only" changes to a single-page static site implies. The brief says "borrow visual DNA" — Team 3 is recommending a partial redesign of the color system's overall mode.

More critically: the brief says "Must convert." Team 3 provides no conversion evidence for the gold CTA specifically. The brief explicitly calls out gold CTA risk as a validation focus. Team 3 does not address this risk at all.

### Drift 2 — Team 4 recommends restructuring that could take days, not hours

Team 4's Pattern 5 (Sticky Left-Rail Sidebar Navigation) and Pattern 1 (Two-Thirds/One-Third Column Layout) require substantial HTML restructuring — not CSS class replacements. The brief says "CSS/HTML only" which technically includes HTML restructuring, but the spirit of a single-day implementation differs from what Team 4's top-tier recommendations require. Team 4 appropriately ranks them lower in priority but leads with them in the narrative, which could misdirect implementation effort toward complex changes when simple ones produce most of the authority signal.

### Drift 3 — Team 1 recommends a Tailwind config extension on a CDN build

Team 1's Section 6 includes a full `tailwind.config.js` color extension with custom tokens. The brief specifies "Static HTML + Tailwind CDN." The Tailwind CDN version does not support `tailwind.config.js` customization — it is a pre-built stylesheet. Custom tokens require either the CLI build or the CDN's JavaScript configuration API (available since Tailwind v3 CDN, but different from the config example provided). Team 1's code examples assume a build process the site does not have. Teams 2 and 3 have the same issue. This is a material implementation gap. The hex values are correct; the delivery mechanism is wrong.

The correct CDN approach for custom colors is:

```html
<script>
  tailwind.config = {
    theme: {
      extend: {
        colors: { /* custom tokens here */ }
      }
    }
  }
</script>
```

This block must appear after the CDN `<script>` tag. None of the teams document this CDN-specific constraint. Implementors who copy the config examples directly will find they don't work.

---

## SECTION 4: Missing Angles

### Missing: Conversion baseline data

No team established what the current conversion rate is, what the traffic source is (organic? paid? referral?), or what the buyer journey looks like before landing on this page. The authority redesign is being recommended without a baseline to measure against. This is not a research failure — the brief didn't ask for it — but it means the implementation has no measurable success criteria beyond subjective design judgment.

### Missing: Mobile-first consideration

Teams 1–5 focus almost exclusively on desktop design patterns. The government portals cited (GOV.UK, USWDS, IRS.gov) have distinct mobile treatments. The two-column layout (Team 4) and sticky sidebar (Team 4) both require explicit mobile collapse handling. For a $299 impulse-adjacent B2B purchase that may happen on a phone during a compliance audit panic, mobile execution of these patterns matters significantly. No team provides mobile-specific guidance beyond brief mention of responsive breakpoints.

### Missing: The "not impersonating government" affirmative design signal

Teams correctly avoid government impersonation. But none address the converse: what distinguishes this from an actual government page in a way that does not undermine the authority effect? A clear "private compliance solution" or brand differentiation element — something that reads as "this is a professional third party, not IDHR itself" — protects both the user from confusion and the product from any future impersonation complaint. The current site handles this with "Not legal advice" disclaimers, which is the right instinct. The redesign should make these more, not less, prominent.

### Missing: Typography rendering on Windows vs. Mac

Playfair Display's high-contrast hairlines render differently on Windows ClearType vs. macOS Retina screens. At small heading sizes on a Windows machine with a 1080p screen, Playfair's hairline strokes can disappear. Since a significant portion of HR directors and employment attorneys work on Windows corporate machines, this is a non-trivial rendering risk. No team addresses it. Merriweather is substantially more robust across rendering environments, which is part of why it became the USWDS standard — it was tested for federal accessibility requirements that include low-DPI screens.

---

## SECTION 5: Agreements — Where Teams Converge

The following recommendations are convergent across 3 or more teams and carry the highest confidence:

1. **Remove rounded-2xl.** All five teams agree. Replace with 4px maximum. This is the single highest-impact, most evidence-supported change.

2. **Remove the pulse animation.** All five teams agree. Replace with a static date-stamped badge. This is the FTC risk point Team 5 identifies and every other team confirms.

3. **Replace sky-blue CTAs with deeper blue.** Teams 1, 2, 4, and 5 agree (Team 3 is the outlier with gold). Deep navy or #1a4480 or #1D4ED8.

4. **Add regulatory citations with section numbers.** Teams 1, 2, 4, and 5 agree. The § 2520.1400 citation format is the single highest-trust signal available for this specific product and costs only text.

5. **Left-border accent bars on notice/callout sections.** Teams 1, 4, and 5 agree. USWDS and IRS.gov pattern. 4px solid border, USWDS primary blue or IRS teal.

6. **Replace Space Grotesk with a serif heading font.** Teams 1, 2, 3, 4, and 5 agree. Specific font choice diverges; the principle is universal.

7. **Remove card hover float effect.** Teams 4 and 5 agree. Non-interactive informational cards should not behave like clickable tiles.

8. **Remove gradient hero, use flat dark navy.** Teams 1, 4, and 5 agree. The gradient is a SaaS template tell.

9. **Left-align section headers.** Teams 1 and 4 agree explicitly. Teams 3 and 5 imply it through their document-style layout recommendations.

10. **Square number badges on the 7-element list.** Teams 1 and 4 agree explicitly. Circles = SaaS. Squares = regulatory items.

---

## SECTION 6: Surprises

### Surprise 1 — Team 4's note that Team 1's color implementation won't work as written

Team 1's Tailwind config is the most thorough color system in the expedition. It is also non-functional as delivered. The CDN deployment constraint is a real technical gap that would waste implementation time if not caught. This was not flagged by any team.

### Surprise 2 — The font debate reveals a deeper disagreement about what "authority" means

Teams 1 and 2 are anchored on government portal authority (Merriweather, Source Sans, institutional). Teams 3 and 5 are anchored on editorial/legal-publication authority (Playfair Display, Cormorant). These are different reference aesthetics. The brief says "government compliance portal crossed with premium legal tech." Teams 1 and 2 tilt toward the government pole; Teams 3 and 5 tilt toward the premium legal pole. Team 4 doesn't take a font position, but its layout patterns strongly favor the government pole. The font choice implicitly resolves which pole the redesign centers on.

### Surprise 3 — No team addresses the "not a law firm" disclaimer's design role

Team 5 mentions that Clerky's transparency ("not a law firm") builds trust. The current site has these disclaimers. In a redesign that makes the site look significantly more governmental or official, these disclaimers become more important, not less — they are the primary signal preventing the authority design from sliding into impersonation. None of the teams recommend making the disclaimer more visually prominent as a companion move to the authority upgrades. This is a gap with legal risk implications.

---

## Summary: Implementation Priority (Validated)

**Implement immediately — convergent, low risk, high evidence:**
1. Remove `rounded-2xl` → `rounded` (4px) on all cards
2. Remove pulse animation → static rectangular date badge
3. Replace Space Grotesk → Merriweather (heading) / Source Sans 3 (body) with proper CDN preconnect and display=swap
4. Add regulatory citations (§ 2520.1400–2520.1530) under the 7-element list
5. Add 4px left-border accents on the consequences/notice sections in #005ea2

**Implement after reviewing against conversion:**
6. Deeper blue CTAs (#1a4480 or #1D4ED8) — safe directionally, verify live
7. Left-align section headers post-hero — structural, audit mobile first
8. Remove scroll reveal animations from content sections

**Do not implement without conversion evidence:**
9. Gold CTA buttons (#B8962E) — unverified hypothesis, no B2B conversion precedent
10. Full two-column layout restructure — high effort, uncertain conversion impact without testing

**Fix before implementing — technical error:**
11. All Tailwind config examples — rewrite for CDN syntax (script block, not config file)
12. Remove "verified current as of March 2026" phrasing — replace with "drafted against" or add attorney attribution

---

*Sources verified: USWDS theme color tokens (designsystem.digital.gov — #005ea2 confirmed), GOV.UK brand blue (design-system.service.gov.uk — #1d70b8 confirmed), inkbotdesign.com (24% claim: unattributed, 40% claim: not found), searchengineland.com A/B test (inaccessible — URL returned binary video), csswizardry.com Google Fonts performance (3.4s render block confirmed on slow connections), sia.codes Google Fonts performance (18% Speed Index penalty vs. self-hosted confirmed).*
