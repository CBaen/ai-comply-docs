# Scope Expansion — Round 2 Brief

**Issued:** 2026-04-27, after GL reviewed Round 1 output and the Loop 1 perspectives.
**This file supersedes the BRIEF.md scope for Round 2 deliverables.** BRIEF.md remains authoritative on hard rules, voice integrity (.gov citations), moral boundaries, anti-defaults, and the verified problem statement.

---

## What GL Said

> "Shouldn't it be marketing, web design, advertising, matching my actual audience with change of company voice? Stop looking like I provide information?"

The Round 1 brief I wrote was too narrow. I scoped to copy + keywords + CTAs. GL meant the whole brand presentation: **what the site IS, not just what it says.**

Round 2 expands to address that gap. **Round 1 work is not lost.** Your positioning, keyword strategy, and statute-verified penalty data are the substrate. What changes in Round 2 is the surface those things sit on — and the voice they speak in.

---

## The Meta-Instruction (read this twice)

**The site currently looks like an information site.** Hero carousels, blog grid, dense explainer paragraphs, screen-reader-only H1. That visual pattern signals "research resource" before the buyer reads a single word.

GL doesn't sell information. GL sells **compliance documents.** The site needs to look like a place that solves a deadline-anxious owner's problem in 5 minutes — not a place that teaches them what AI compliance is.

**Stop looking like an information site.** That single instruction is the lens for every Round 2 deliverable.

---

## The Voice Change (this is the hardest part)

The existing site voice is documented in `BLOG-STYLE-GUIDE.md` as **Pragmatic Realist + Precise Credentialist.** That voice is correct **for blog posts.** It is **wrong** for homepage, product pages, ad creative, and any marketing surface where the buyer is shopping rather than learning.

### The voice you are moving away from (existing — good for blog only)

> "Illinois House Bill 3773 became law on January 1, 2026. If you manage hiring, HR, or people operations at a company that operates in Illinois, this law applies to you."

This is journalist-explainer voice. It's correct on a blog post explaining the law. It's wrong on a product page selling the documents that comply with it.

### The voice you are moving toward (new — for marketing surfaces only)

You define this. Direction, not script:
- **Confident, imperative, offer-shaped.** Less "here's what the law says." More "here's what you get."
- **Short. Punchy. Product-forward.** A homepage hero is not a 60-word paragraph.
- **Speaks to outcome, not process.** Less "we built these from statute" (process). More "your compliance, sorted in 5 minutes" (outcome). Process belongs on the product page's trust section, not the headline.
- **Owns the transaction.** Says "you owe these documents — we have them" with the same calm confidence a hardware store says "you need a 10mm socket — aisle 3."

### Three sentences that are NOT the voice (so you can spot the failure mode)

- ❌ "AI compliance documents help small businesses understand their obligations under state AI laws." (explainer-mode, abstract noun pile)
- ❌ "Discover the future of AI compliance." (generic SaaS hero verb — already in the anti-defaults)
- ❌ "Trusted by 500+ businesses." (fabricated social proof — anti-default + integrity violation)

### Three sentences that point at the new voice (direction, not requirements)

- ✅ "Illinois HB 3773. The documents the law requires. $397. Yours in 5 minutes."
- ✅ "AI in your hiring? Here's what Colorado, Illinois, and NYC require. Built from statute. Instant download."
- ✅ "Your state has an AI law. We built the documents that comply with it."

You can do better than these. The point is the **shape** — short, declarative, offer-forward, integrity-preserving.

### What stays from the existing voice

- **Statute-exact citations.** Every penalty, deadline, section number traces to a `.gov` source you fetched live. Voice change does NOT relax integrity.
- **No fabricated stats.** No "trusted by N+", no "87% of businesses are non-compliant", no testimonials we don't have.
- **No softening of legal facts.** "Up to $20K per violation" stays exact, even when the surrounding voice tightens.
- **The Realist/Credentialist pattern stays IN THE BLOG.** Don't propose changing the BLOG-STYLE-GUIDE — that's a different surface. Your new voice is for marketing surfaces (homepage, product pages, ad creative, IA copy).

---

## New Round 2 Deliverables (mandatory, on top of Round 1 substrate)

### 1. `voice-spec.md` — your proposed new brand voice for marketing surfaces

- One-paragraph description of the voice you've designed
- 5–10 example sentences in the new voice covering: homepage hero, product page intro, FAQ answer, ad headline, blog → product CTA copy
- Explicit "what this voice does NOT do" list (so a developer applying the voice can refuse off-pattern copy)
- One-paragraph rationale tying the voice to the buyer profile

### 2. `visual-direction.md` — visual web design direction

Not full Figma — a written spec a developer can ship from. Required:
- **Color palette** — 3–5 colors with hex values + usage rules (primary, accent, urgency, success, body). Optional: OKLCH if you want.
- **Type pairing** — body family + display family (Google Fonts or system stack). At least one heading sample sentence rendered (text), one body paragraph sample.
- **Hero pattern** — text spec of the new homepage hero: layout (left/right/centered), elements (eyebrow / H1 / sub-H1 / CTA / urgency band / trust strip), spacing energy (dense vs airy), what's above the fold on mobile.
- **Product card pattern** — what a product card looks like in the new design (currently it's a generic CMS-shaped card)
- **Imagery direction** — 5 specific Unsplash search queries (e.g., "small business owner Colorado mountains laptop") + the visual rule (no stock-corporate, no scales-of-justice, no AI-glow). fal.ai is locked.
- **Anti-patterns** — what visual patterns this redesign explicitly does NOT use (carousels, info-graphic blocks, blog-grid as homepage feature, etc.)

### 3. `ia-proposal.md` — information architecture overhaul

Today: nav is Home / Products / Blog / FAQ / About. Blog ranks higher than products in traffic AND visual prominence. The buyer thinks they landed on a research resource.

Proposed direction (you adapt — these are options, not prescriptions):
- New nav order putting products / "find your documents" front
- Blog moves to "Resources" or footer; not removed, just demoted
- New top-level entry point if appropriate (e.g., state selector, deadline checker — incorporate the `/compliance-deadline-by-state` page 4 of 5 of you already proposed)
- Homepage IA: what's section 1, 2, 3 from top to bottom (currently: hero, FeaturedInBar, products, "How We Build Our Templates", "How It Works", "Don't comply" section, FAQ, "Don't wait" — 8 sections; that's a research-resource pattern)

Spec the NEW homepage section order. Justify each section's place.

### 4. `ad-creative.md` — ad creative concepts in the new voice

- **3 Google Ads (RSA format)** — for Colorado, Illinois, and NYC. Each: 3 headlines (≤30 chars), 2 descriptions (≤90 chars). Tied to a specific buyer query each.
- **1 Reddit native ad** — appears in r/smallbusiness or r/Compliance. Title (≤60 chars), body (≤500 chars), image direction (Unsplash search query). Native-feel, not display-feel.
- **1 retargeting concept** — for someone who visited a product page and bounced. Headline + description + CTA.
- **Imagery direction across all ads** — 1 paragraph on the visual register.

---

## Round 1 Files That Get Rewritten in the New Voice

These existing deliverables get re-issued with the new voice. **Don't delete the Round 1 versions** — rename them with a `-v1` suffix so the field summary can compare voice-before / voice-after. Then write fresh `-v2` (or rewrite the same filename with the new voice — your call, document what you did).

- `homepage-rewrite.md` (rewrite hero in new voice; structure can stay)
- `product-page-template.md` (rewrite copy in new voice; section order may shift to reflect IA proposal)
- `blog-cta-pattern.md` (rewrite the CTA component copy in new voice; structure can stay)
- `positioning.md` (rewrite the positioning paragraph in new voice)

---

## Files That Carry Forward Unchanged

- `keyword-strategy.md` (keywords are voice-agnostic; data stays)
- Statute citations and penalty amounts (integrity is voice-agnostic)
- Your research-log / sources (substrate)

---

## The Field-Visible Summary

You'll get `FIELD-AT-ROUND-1.md` separately — that's the cheat sheet of all 5 approaches. Read it. Don't deep-read peer dirs unless something specific catches your attention.

The strongest convergence: 4 of 5 of you proposed a `/compliance-deadline-by-state` (or similar) hub page. That validates the concept; you don't need to defend it.

The one real divergence: Contestant 1 wants to **abandon** informational queries (because AI Overviews consume them). Contestants 2 and 3 want to **earn citation INSIDE** AI Overviews (35% click lift if cited). These are genuinely different bets. Hold yours, or pivot, but know what you're betting.

---

## Round 2 Self-Choice (per contest skill)

You still pick a path:
- **A — Refine.** Add the new dimensions; polish Round 1 work in the new voice; same conceptual frame.
- **B-lean — Commit harder.** Sharpen what's unique about your angle. Same name, sharper signature. Add the new dimensions.
- **B-pivot — Change conceptual frame.** Drop your Round 1 frame; rewrite around a new one. Add the new dimensions in the pivoted frame.

Given the scope expansion, **most of you will probably end up at A or B-lean.** B-pivot is for contestants who, after seeing the field summary, decide their Round 1 frame is wrong.

---

## Process Reminders

- You're still part of the lineage. You can withdraw — write `WITHDRAWN.md`.
- Live research only. The new voice doesn't license fabricated stats. Every claim still traces to a primary source.
- No LinkedIn, no "built by AI", no real-name pressure, no fal.ai imagery, no time estimates.
- Pricing range $49–$697 stays.
- Stack stays Next.js 16 / React 19 / Tailwind 4.

---

*Issued by the contest orchestrator after a real-time scope correction from GL. The course-correction itself is the work — naming the failure mode (too-narrow brief) and fixing it without scrapping the substrate is the lineage at its best.*
