# Browser-Opus Audit Prompts — Buyer-Redesign Validation

**Source:** Drafted as Plumb's session deliverable. The statute-integrity audit (Prompt 1) was run 3× in parallel during Plumb's session and produced `SHIP-BLOCKERS.md`. The four prompts below were queued for the next session.

**How to use:**
1. Open Claude in your browser (claude.ai)
2. Paste one of the prompts below
3. Paste the result back in chat — the next instance will read it and surface findings/fixes
4. Run multiple in parallel for higher signal (Plumb ran 3 instances of Prompt 1 simultaneously and they disagreed productively — disagreements pointed at primary-source verification needs)

**State of the site at the time of these prompts:**
Steps 1–5 of the C4 build order are LIVE on production:
- Step 1: Colorado product title + H1 (deadline-anchored)
- Step 2: Homepage visible H1 + UrgencyPanel replacing FeaturedInBar
- Step 3: Colorado penalty section moved before document preview, with SHIP-BLOCKERS-corrected copy
- Step 4: AlsoExposedStrip on Colorado page (cross-state cards for IL/NYC/TX with SHIP-BLOCKERS corrections)
- Step 5: Status flip-logic conditional rendering — deadline banner above hero, sidebar deadline label, countdown, etc. — Colorado-specific, all wired so the June 30 status flip propagates automatically

Other 56 product pages still on original copy.

---

## Prompt 2 — Voice + "Stop Looking Like an Info Site" Test

```
You are a hostile reviewer of aicompliancedocuments.com — a small store selling AI-compliance document templates ($49–$697) for US state AI laws.

Your assignment: role-play a deadline-anxious buyer (a Texas business owner, 11pm, just learned about Texas TRAIGA enforcement) and stress-test the homepage and Colorado product page for VOICE failures.

Specifically, you are testing whether the site has shed its "I'm a research resource that publishes information about AI laws" voice and adopted a "I'm a store that sells the documents you need to comply with AI laws" voice. The site previously sounded like an information service; the redesign was supposed to make it sound like a compliance store. Did it?

URLS TO INSPECT:
- https://aicompliancedocuments.com/  (homepage with the new UrgencyPanel above the fold)
- https://aicompliancedocuments.com/products/colorado-sb24-205  (Colorado product page — the one redesigned most fully)
- https://aicompliancedocuments.com/products/illinois-hb3773  (Illinois product page — NOT redesigned, control case)

WHAT TO LOOK FOR:

A. The 5-second test
Read each page for 5 seconds. As the panicked Texas owner at 11pm, write down the first sentence of action you'd take. Is it (a) "buy the documents", (b) "read more to figure out if I need this", or (c) "leave and come back tomorrow"? Each (b) and (c) is a voice failure.

B. Journalist-explainer drift
Identify any sentences that explain the law as a journalist would (background, history, "what is", "the bill provides for", "the statute requires"). The site is supposed to assume the buyer already knows the law applies — flag any over-explanation that signals "we're an information resource."

C. Buyer-as-deployer assumption check
The Colorado product is for deployers. The C4 redesign added a "You're a deployer if all three are true" frame. Does the page treat the buyer as a confirmed deployer who came here to buy, or as an undecided researcher who needs to be convinced?

D. Friction-language audit
Find any sentence that adds qualifying language ("if you", "you may need to", "consider whether") where a confident assertion would serve the panicked buyer better. Compliance buyers in deadline mode want certainty; equivocation reads as "I'm not sure either."

E. Read the homepage hero out loud, as the Texas owner. Does it answer (1) what state am I in, (2) what does the law require, (3) where are the documents, (4) how much? If any of those is unanswered in the visible above-the-fold area, name the gap.

DELIVERABLES (return as a single ordered list):
1. Voice failures on the homepage — specific sentences, why they fail
2. Voice failures on the Colorado product page — specific sentences, why they fail
3. Voice differences between Colorado (redesigned) and Illinois (not redesigned) — what's better and worse
4. The single sentence on the homepage that does the most work (so the team knows what's pulling weight)
5. The single sentence anywhere that's still pulling the site backward toward "information resource"

DON'T:
- Don't suggest copy rewrites unless asked. Identify failures, name them precisely, leave the fix to the team.
- Don't grade out of 10. Identify what works and what doesn't.
- Don't be polite. The buyer in deadline mode is not polite either.
```

---

## Prompt 3 — End-to-End Buyer Journey Stress Test

```
You are testing the buyer journey for aicompliancedocuments.com — a store selling AI-compliance document templates ($49–$697) for US state AI laws.

Three personas. Each one tries to complete a purchase. Walk through their actual click path on the live site. Identify the SPECIFIC POINT each one breaks.

PERSONA A — Colorado HR director, mid-sized employer
Background: HR director at a 200-employee Colorado company. Heard about SB 24-205. Knows their company uses an AI-powered candidate-screening tool. Doesn't know if the law applies. Has a budget under $1000.

Path: Visit homepage → click whatever leads to Colorado → decide if the product applies → look at the documents → form an opinion on whether to buy.

Inspection URLs:
- https://aicompliancedocuments.com/
- https://aicompliancedocuments.com/colorado-ai-compliance  (state landing page)
- https://aicompliancedocuments.com/products/colorado-sb24-205  (product page)
- https://aicompliancedocuments.com/do-i-need-ai-compliance  (qualifier quiz)

PERSONA B — Illinois small employer
Background: 30 employees in Chicago. Uses Workday for hiring. Heard about HB3773 from a competitor. Doesn't know if Workday's AI features mean their use is covered.

Path: Same shape. Inspection URLs:
- https://aicompliancedocuments.com/illinois-ai-compliance
- https://aicompliancedocuments.com/products/illinois-hb3773
- https://aicompliancedocuments.com/blog/illinois-hb3773-ai-employment-law-what-employers-need

PERSONA C — Multi-state operator
Background: 12-location regional restaurant chain. Locations in Colorado, Illinois, Texas, NYC. Uses an AI chatbot to handle initial customer inquiries. CTO is on vacation. CEO needs to know what to buy.

Path: Visit homepage → must find a way to evaluate exposure across 4 jurisdictions → must decide what bundle to buy. Inspection URLs:
- https://aicompliancedocuments.com/
- https://aicompliancedocuments.com/ai-compliance-by-state

WHAT TO REPORT FOR EACH PERSONA:

1. The first moment of confusion. What specifically confused them, on which page.
2. The first moment they considered abandoning. What pushed them toward leaving.
3. The single missing piece of information that, if added, would make them buy.
4. The point on the journey where the site overdelivered (offered more clarity than they needed) — these are deletion candidates.
5. Their overall verdict: would they buy, would they wait, or would they walk?

CROSS-PERSONA QUESTIONS:

6. Which persona gets the worst experience? Why?
7. Which persona is the homepage clearly designed for? (Be honest if the answer is "none of the three.")
8. Find a moment where TWO personas would react differently to the same screen — that's a divergence the design has to handle.

DON'T:
- Don't write copy. Identify breakpoints.
- Don't grade. Walk the path.
- Don't be charitable. Realistic personas are skeptical.
```

---

## Prompt 4 — Adversarial / Red Team

```
You are a hostile red-team reviewer of aicompliancedocuments.com — an AI-compliance document store ($49–$697 per package, 57 products covering US state AI laws). The site recently completed a buyer-focused redesign. The team thinks the redesign is solid. Your job is to find what they missed.

URLs to inspect (use as many as you need):
- https://aicompliancedocuments.com/
- https://aicompliancedocuments.com/products/colorado-sb24-205  (the most fully-redesigned product)
- https://aicompliancedocuments.com/products/illinois-hb3773
- https://aicompliancedocuments.com/products/nyc-local-law-144
- https://aicompliancedocuments.com/products/texas-traiga
- https://aicompliancedocuments.com/about
- https://aicompliancedocuments.com/faq

YOUR JOB:

1. WEAKEST ASSUMPTION
The redesign assumes the buyer is "deadline-anxious" and "ready to act." Find the assumption(s) hiding inside the redesign that may not survive contact with reality. (Hint: who's the buyer who gets WORSE service from this redesign than the previous version?)

2. BLIND SPOTS
Identify three things the redesigned pages assume the buyer already knows but probably doesn't. For each, name where on the buyer journey the gap fires.

3. THREE-MONTH-FROM-LAUNCH FAILURE MODE
Imagine the redesign has been live for three months. Sales are below projections. Diagnose what's most likely going wrong. (This is forecasting, not prediction — give the team a hypothesis they can test.)

4. CITATION ATTACK SURFACE
The site sells legal templates. A critic arrives and tries to find ONE wrong claim that will sink the site's credibility. Where would they find it fastest? Which page is most exposed? What specific claim is most disputable?

5. THE COMPETITOR ATTACK
A direct competitor launches at half the price tomorrow. Which buyer segment do they steal first? What does our redesign offer that they can't replicate? (And — critical — is what we offer ACTUALLY differentiating, or just our team's belief about differentiation?)

6. PRICE-SENSITIVITY TRAP
Products range $49–$697. Identify any moment in the buyer journey where a buyer who would have paid $697 sees something that pushes them toward $49 instead, or vice versa. Pricing-mismatch moments are sales leaks.

7. THE SINGLE BIGGEST RISK
Of everything you've identified — what is the one thing the team should fix first?

DELIVERABLES:
- Hypotheses, not opinions
- Specific (URL + on-page-location, not "the homepage")
- Ranked by your confidence (high / medium / low)

DON'T:
- Don't grade.
- Don't suggest copy rewrites.
- Don't be charitable. Charity is what got the team here.
```

---

## Prompt 5 — Visual Design Hostile Review

```
You are a hostile visual reviewer of aicompliancedocuments.com — an AI-compliance document store. The site uses Tailwind, slate/blue/red as primary colors, Inter as the display font, with deadline-amber (#D97706) and enforcement-red (#B91C1C) as urgency-mode accents introduced by the recent buyer-focused redesign.

URLs:
- https://aicompliancedocuments.com/  (homepage with new UrgencyPanel above the fold)
- https://aicompliancedocuments.com/products/colorado-sb24-205  (product with new deadline banner, AlsoExposedStrip, redesigned penalty section, sidebar deadline label, countdown)
- https://aicompliancedocuments.com/products/illinois-hb3773  (control: not redesigned)
- https://aicompliancedocuments.com/products  (catalog page)
- https://aicompliancedocuments.com/about
- https://aicompliancedocuments.com/blog

VIEWPORTS to test (manually resize the browser window):
- Mobile: 375px width
- Tablet: 768px width
- Desktop: 1280px width
- Wide: 1920px width

DIMENSIONS TO CRITIQUE:

A. PALETTE RISK
Slate + blue + amber + red is a 4-accent palette. Is the contrast strong enough that buyers can immediately tell "deadline approaching" (amber) vs "already exposed" (red) at a glance? Are there any places the amber and red coexist uncomfortably? Any places where one color hijacks attention from where the eye should land?

B. TYPE PAIRING
Inter for both body and display. Is there enough hierarchy between H1, H2, H3, body? Or does it all blur together? Identify the worst typographic moment on the site.

C. HERO PATTERN
The homepage hero has a visible H1, the new UrgencyPanel above it, and product cards below. Is the visual sequence "find your state → see your urgency mode → pick the documents" obvious from the layout, or does the eye have to work?

D. PRODUCT CARD AT SCALE
Look at the catalog page (/products). With 57 products, how do they look in aggregate? Any overlap, alignment failures, inconsistent card heights?

E. MOBILE-FIRST FAILURE MODES
At 375px width:
   - Does the UrgencyPanel still convey four states cleanly?
   - Does the deadline banner on the Colorado page fit without wrapping?
   - Does the AlsoExposedStrip's 3-card grid stack correctly?
   - Does the sticky purchase sidebar actually become non-sticky on mobile?
   - Are touch targets at least 44x44px?

F. ACCESSIBILITY CONCERNS
Independent of the recent redesign:
   - Color contrast on the urgency-mode pills (amber + white, red + white) — passes WCAG AA?
   - Focus states on the new buttons/links?
   - Decorative images marked aria-hidden?
   - Headings in correct hierarchical order (no skipped levels)?

G. BRAND IDENTITY
After looking at all the URLs above, can you describe the brand's visual personality in one sentence — without using words like "professional," "compliance," or "modern"? If you can't, the brand identity is weak.

DELIVERABLES:
1. Top 3 visual failures, ranked by severity (each with URL + viewport + what's wrong)
2. The 1 visual decision that is genuinely working
3. The accessibility issue most likely to surface in an ADA letter
4. The mobile failure most likely to lose a sale
5. Brand-identity verdict in one sentence

DON'T:
- Don't propose new colors / fonts.
- Don't critique copy — that's a different audit.
- Don't be polite. Visual hostility is the entire point of this review.
```

---

## How These Connect to the SHIP-BLOCKERS Pattern

Plumb's session ran Prompt 1 (statute integrity) three times in parallel and the three audits **disagreed productively**. Audit 2 missed the SB25B-004 amendment vehicle and concluded the date was fabricated; Audits 1 and 3 caught it. The 2-of-3 consensus + traceable primary source resolved the conflict.

Expect the same pattern here. The four prompts above are different angles, not redundant runs of the same prompt. But for any individual prompt, running it 2–3 times by independent browser-Opus instances is the protocol that catches what one instance misses.

When findings come back, the build instance consolidates them into a SHIP-BLOCKERS-style file (corrections required before further build) plus a separate "future-improvements" file (corrections that can wait).

---

*Drafted in the post-Plumb session that completed Steps 4–5. Audits intentionally NOT run by Claude Code — they require browser-Opus's live web access and adversarial framing, both of which Claude Code's tools and posture struggle to reproduce.*
