# Homepage Rewrite — Round 2 (new voice)
## Supersedes Round 1 version (see homepage-rewrite-v1.md for comparison)

---

## Metadata

### `<title>` tag
**Proposed:** `AI Compliance Documents — Colorado, Illinois, NYC, Texas, California`

**Round 1 was:** `AI Compliance Documents — Colorado, Illinois, NYC, Texas, California Templates`

**Round 2 change:** Drop "Templates" — it signals catalog. The brand name + state list is the identity. Buyers searching state-law queries don't need "templates" to know what they're getting; they need to know their state is covered.

---

### Meta description
**Proposed:** `Colorado deadline: June 30. Illinois, NYC, Texas: in effect now. The compliance documents your AI law requires — built from statute text, instant download, one-time purchase.`

**What changed from Round 1:** Round 1 version was journalist-style ("Colorado SB 24-205 takes effect June 30. Illinois HB3773 is in effect now."). Round 2 compresses to the offer shape: deadline → documents → purchase terms. Same facts, faster delivery. Character count: ~153.

---

## Hero Section — Full Spec (Round 2)

*Voice: Calm Authority. Every element earns its place or is cut.*

### Eyebrow
```
TEXAS · ILLINOIS · NYC · COLORADO — AI LAWS ARE IN EFFECT
```
Small caps, Ember Red (`#DC2626`), `text-sm tracking-wider font-semibold`. **Upgraded from Round 2 after Proxy Loop 2.**

**What changed and why:** Round 2 eyebrow was "AI LAWS ARE IN EFFECT" — generic urgency, no state specificity until the pills below. The Proxy surfaced the failure: a Texas restaurant owner at 11pm reads the eyebrow first, finds no Texas, and experiences one beat of disorientation before the pills confirm their state. The fix: the eyebrow names all four active-law states, ordered by enforcement status — in-effect states first (Texas, Illinois, NYC), then deadline state (Colorado). The buyer searching "Texas AI compliance" reads TEXAS in the first four characters. They don't have to scan to know they're in the right place.

**Visual size upgrade:** The eyebrow moves from `text-xs` to `text-sm`. Still subordinate to the H1, but large enough to catch a panic-state scan. The state names are the arrival signal; they should not require close reading.

**Static ordering rationale:** Texas leads because it has the highest penalty exposure ($200,000 per violation, [REQUIRES PRIMARY SOURCE VERIFICATION]) and the least buyer awareness — it's the law most likely to produce a panicked 11pm search. Illinois second because it's the most searched. NYC third because it's the longest-active. Colorado last because its deadline is a future event, not a current enforcement reality.

---

### H1 (visible — NOT sr-only)
```
Your state's AI law is in effect. We built the documents.
```

**What changed from Round 2 and why:** Round 2 H1 was "Your state passed an AI law. We built the documents." The Proxy identified the failure: "passed" is past tense. It tells the buyer the law was enacted, not that it is actively enforced against them right now. For the Texas restaurant owner at 11pm, the operative fact is not historical ("the legislature passed it") — it is present ("this law applies to your business tonight"). "Is in effect" collapses past and present into a single enforcement-present statement. Same eleven-word structure. One verb changed. The urgency register shifts.

**What stays:** The second sentence — "We built the documents." — is unchanged. It is the offer. It does not need to be urgent. The first sentence creates the stakes; the second sentence resolves them.

Implementation: Inter 800, `text-4xl md:text-6xl leading-tight`, Navy (`#1B2D4F`), visible on `bg-slate-50`.

---

### State Urgency Band (replaces Round 2 "Deadline Pills")
```
[■ TEXAS — IN EFFECT]   [■ ILLINOIS — IN EFFECT]   [■ NYC — IN EFFECT]   [■ COLORADO — JUNE 30]
```

**What changed from Round 2 and why:** Round 2 called these "deadline pills" — `text-xs px-3 py-1 rounded-full`. The Proxy named the problem: `text-xs` is too small to catch a panic-state scan. A buyer scanning fast might not read them as the "yes, you're in the right place" confirmation they need. Additionally, Round 2 ordered them Colorado first (by deadline proximity) — wrong order for a Texas buyer who reads Colorado before seeing Texas.

**Round 3 (Loop 2) changes:**
- Size: `text-sm font-bold px-4 py-2` — larger, bolder. These are not decorative chips; they are the scan target.
- Shape: Rounded-md not rounded-full. A pill shape reads "label." A badge shape reads "status." The buyer needs status, not a label.
- Order: In-effect states first (Texas, Illinois, NYC), future deadline last (Colorado). Matches the eyebrow order. A buyer in panic mode scans top-to-bottom; their state should appear early in both the eyebrow AND the urgency band, not after they've read past a different state's deadline.
- Icon: Square (■) not dot (●). The square reads "status indicator" — it has a harder edge than the soft dot. Panic-state buyers respond to harder visual signals.
- Color: All four use Ember Red fill. Round 2 used amber for Colorado (future deadline) and red for in-effect states. The color distinction is technically accurate but cognitively complex — the buyer at 11pm doesn't have time to decode "amber means future, red means now." One color (red) means "this is real and it applies to you." The text (IN EFFECT vs JUNE 30) provides the temporal distinction without requiring color decoding.

**Responsive:** On mobile, two bands of two — Texas/Illinois on line 1, NYC/Colorado on line 2. Not four in a row (too small on mobile) and not a vertical stack (wastes vertical real estate above the fold).

---

### Primary CTA
```
Get My Compliance Documents →
```
Signal Blue (`#2563EB`) filled button, `px-8 py-4 text-lg font-bold`. Full-width on mobile. Links to `/deadline-checker`.

---

### Sub-CTA
```
Not sure which law applies? → Find yours
```
Underlined text link, `text-sm text-navy`. Links to `/deadline-checker`. The primary CTA serves the buyer who knows their state; the sub-CTA serves the buyer who isn't sure yet. Both go to the same place — the deadline checker routes them to the right product.

---

### Trust Strip (three items, immediately below CTAs)
```
✓ Built from enacted statute text     ✓ .gov primary sources, verified     ✓ Instant download — no subscription
```
Verified Teal (`#0D9488`) checkmarks. `text-sm font-medium`. Horizontal on desktop, stacked on mobile.

**What changed from Round 1:** Round 1 proposed a trust bar with four items including a clock icon and "June 30, 2026 — Colorado SB 24-205 deadline." The deadline is now handled by the pills. The trust strip's job is methodology credibility, not urgency. Three items, tighter.

---

## Section 2: Products by State

*Replaces current ProductCarousel + "How It Works" sections.*

### Section heading
```
Your state. Your documents.
```
H2, Inter 700, `text-2xl md:text-3xl`. No padding essay above it.

### Product card grid
2-column on desktop (4-column on large screens), using the new product card pattern from `visual-direction.md`. Order: Colorado (deadline proximity), Illinois, Texas, NYC, California, multi-state bundles.

### Below grid
Single inline callout — not a section:
```
Choose your state. Answer 8–12 questions about your AI tools. Pay once. Download immediately.
```
`text-sm text-gray-600`. This is the entire "How It Works" — compressed to one line. It does not need its own section.

---

## Section 3: Penalty Reality

*Replaces current "What happens if you don't comply?" section.*

### Section heading
```
This is what non-compliance costs.
```
H2. Declarative. Not a question. (Round 1 already proposed this — keep it.)

### Penalty columns (three, statute-exact)

**Illinois:**
> Up to $70,000 per aggrieved person. Already in effect.
> ([775 ILCS 5/8A-104](https://www.ilga.gov/legislation/ilcs/ilcs4.asp?ActID=2266&ChapterID=64))

**Colorado:**
> Up to $20,000 per consumer affected — enforced as a deceptive trade practice under C.R.S. § 6-1-112. Effective June 30.
> ([SB24-205](https://leg.colorado.gov/bills/sb24-205))

Note: The $20,000 figure derives from the Colorado Consumer Protection Act (C.R.S. § 6-1-112), not from SB24-205 directly. SB24-205 classifies violations as deceptive trade practices; the penalty cap is in the CCPA. This provenance must be accurate in any buyer-facing copy. Credit to Contestant 4 for surfacing this.

**Texas:**
> Up to $200,000 per violation, plus a continuing daily penalty after notice.
> ([HB149, TRAIGA](https://capitol.texas.gov/BillLookup/Text.aspx?LegSess=89R&Bill=HB149)) [REQUIRES PRIMARY SOURCE VERIFICATION — build instance must read capitol.texas.gov statute text before shipping]

### Below columns
```
These amounts apply per violation — not per incident. An AI system that processed 100 applicants has 100 separate violations if a complaint succeeds.
```
`text-sm text-gray-700`. The math, stated plainly. No alarm formatting — just arithmetic.

---

## Section 4: How It Works + Methodology (combined)

*Collapsed from two current sections into one compact two-column layout.*

**Left column (process):**
1. Choose your state's law — or use the deadline checker if you operate in several
2. Answer 8–12 questions about which AI tools you use and what decisions they inform
3. Pay once. Download immediately. PDFs, fillable fields, ready to use.

**Right column (methodology — compact):**
```
Every template starts with the actual statute text — not a summary of it.

If implementing rules haven't published, we say so. No false confidence.

These are documents, not legal advice. Your attorney reviews; we give them a starting point.
```
Three short paragraphs. Verified Teal left border on the right column block. Link: "More about our methodology →" (`/about`).

---

## Section 5: Final CTA

### H2
```
June 30 is the next deadline.
```
Update as deadlines pass. When Colorado's date passes, next headline becomes "Your state's AI law is already in effect."

### Sub-copy
```
One-time purchase. Instant download. Built from the statute — not from a summary of it.
```

### Primary CTA
```
Get My Compliance Documents →
```

### Below button
```
Questions before purchasing? info@aicompliancedocuments.com
```
`text-sm text-slate-400`. The escape valve. Not "schedule a consultation" — just an email.

---

## What This Removes From the Current Homepage

| Removed element | Reason |
|----------------|--------|
| Product carousel in hero | Signals "browse catalog" — replaced by text hero + product cards in section 2 |
| Background hero image (opacity-10) | Visual noise; the text IS the hero |
| FeaturedInBar (post-hero) | "Featured in media" as position 2 signals content company, not compliance store |
| "How We Build Our Templates" as standalone section | Condensed into Section 4 right column |
| "How It Works" as standalone 3-step section | Condensed to one inline sentence in Section 2 |
| Full FAQ accordion on homepage | Moves to product pages and /deadline-checker — objections live nearest the purchase decision |
| Generic colored-card penalty section | Replaced by statute-exact prose in Section 3 |
