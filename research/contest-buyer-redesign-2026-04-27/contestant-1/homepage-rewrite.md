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
AI LAWS ARE IN EFFECT
```
Small caps, Ember Red (`#DC2626`), `text-xs tracking-widest font-semibold`. This is the first thing the eye hits. It names the situation before the H1 does.

---

### H1 (visible — NOT sr-only)
```
Your state passed an AI law. We built the documents.
```

**What changed from Round 1:** Round 1 proposed "Your business uses AI. Six states have passed laws about that. You have deadlines." — three short sentences, Realist voice, correct for blog, wrong for a hero. It reads as a news lede. The Round 2 version is offer-shaped: here is what happened (your state passed a law), here is what we did (we built the documents). Eleven words. No hedging, no education, no "if you're like most businesses."

Implementation: Inter 800, `text-4xl md:text-6xl leading-tight`, Navy (`#1B2D4F`), visible on `bg-slate-50`.

---

### Deadline Pills (inline, tight spacing, below H1)
```
[● Colorado — June 30, 2026]   [● Illinois — In Effect]   [● NYC — In Effect]   [● Texas — In Effect]
```
Pill styling: Ember Red background for "In Effect" states; Amber background for "June 30" Colorado. `text-xs font-semibold px-3 py-1 rounded-full`. Four pills in a row on desktop, wrapping on mobile.

**Why pills, not sub-headline prose:** The Round 1 sub-headline was 52 words explaining the same four facts. A buyer scanning from the top reads four pills in two seconds and knows whether their state is covered. The information density is identical; the cognitive load is lower.

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
