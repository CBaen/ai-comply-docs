# Blog CTA Pattern — Contestant 5

## The Problem (Specific, From the Brief)

The top Colorado blog post has 855 impressions, 0 clicks, and contains **exactly one link** to the Colorado product page across 1,500 words. The EEOC blog post has 1,833 impressions at position 4.16 with **0.11% CTR** — position 4 should produce 5–8% CTR (sourced: [First Page Sage CTR by Position 2026](https://firstpagesage.com/reports/google-click-through-rates-ctrs-by-ranking-position/), which shows position 4 at 7.2%). Zero-click AI Overview pressure accounts for some loss, but 0.11% at position 4 suggests structural blog → product leakage beyond just AI Overviews.

The diagnosis: blog posts are information-complete. They answer the question so thoroughly that the reader doesn't need to click further — neither to the product page nor anywhere else. This is good for authority, bad for conversion. The fix is not to make the blog posts less thorough. The fix is to make the conversion moment explicit and timed correctly within the reader's journey through the post.

---

## The CTA Pattern: Three placements, two types, one rule

### Rule
**One link per 400 words is the minimum density.** A 1,500-word post should have 3–4 product links minimum, not 1. The links must be contextual — placed at the moment the reader is thinking about the specific need the product solves, not in a standalone "buy now" paragraph at the end.

### Placement 1: Penalty section in-line link (Precise Credentialist moment)

**When:** Immediately after citing penalty amounts with primary source citations.
**What:** A parenthetical inline link to the product page.
**Pattern:**

```markdown
The penalty for a first civil rights violation under [775 ILCS 5/8A-104](https://www.ilga.gov/Documents/legislation/ilcs/documents/077500050K8A-104.htm) 
is up to $16,000. Repeat violations within five years: up to $42,500. Two or more prior violations within seven years: up to $70,000 — per violation.

If those numbers give you pause, [the Illinois HB3773 compliance package](/products/illinois-hb3773) includes 
every document the statute requires — $449, instant download.
```

**Why this placement converts:** The buyer who just read the penalty tiers is at peak anxiety. They are not thinking "I wonder if there's a product for this." They are thinking "what do I do." The inline link appears exactly at that moment. This is the Pragmatic Realist close after the Credentialist penalty section — it moves from fact to action.

---

### Placement 2: Mid-article requirement list inline link (functional anchor)

**When:** When the post lists what documents or actions the law requires.
**What:** Link the document name directly to the product page using descriptive anchor text.
**Pattern:**

```markdown
Colorado SB 24-205 requires deployers to maintain:

- A risk management policy — documented and updated at least annually
- An impact assessment for each high-risk AI system
- Consumer notices before consequential decisions are made

Our [Colorado SB 24-205 compliance package](/products/colorado-sb24-205) includes all three, 
built from the statutory text at [C.R.S. § 6-1-1703](https://leg.colorado.gov/bills/sb24-205).
```

**Why this placement converts:** The reader who just read "the law requires X, Y, Z" immediately wonders "do I have X, Y, Z?" The link answers that before they have to wonder. Descriptive anchor text ("Colorado SB 24-205 compliance package") is both SEO-appropriate and conversion-functional.

---

### Placement 3: Closing action section dedicated CTA block

**When:** In the "What to Do Now" / "Where to Start" section at the end of every post.
**What:** A styled callout block (using the site's existing blue callout / enrichment block pattern) that explicitly presents the product as the next step.
**Pattern:**

```markdown
## Where to Start

If you use AI in hiring and you have employees in Illinois, you need three things in place right now: 
an employee AI notice, an AI system inventory, and a documented zip-code-proxy review. 
These are not optional best practices — they are the statutory requirements of [775 ILCS 5/2-102(L)](https://www.ilga.gov/legislation/ilcs/ilcs3.asp?ActID=2266&ChapterID=64).

[Get the Illinois HB3773 Compliance Package — $449, instant download →](/products/illinois-hb3773)

Not sure whether this law applies to your specific situation? Have your attorney review the statute directly: 
[775 ILCS 5/2-102(L)](https://www.ilga.gov/legislation/ilcs/ilcs3.asp?ActID=2266&ChapterID=64).
```

**Component:** This is a standalone styled block — background-color `bg-blue-50`, border `border-blue-200`, padding, with the product link as a button or prominent text link. The "Have your attorney review" note at the bottom reinforces legal credibility without undermining the product link.

**Why this placement converts:** The closing section is where the reader who has read the whole post and feels convinced of the need makes the decision. This placement catches them at peak readiness. The current pattern has one vague inline link somewhere mid-article — this replaces that with a dedicated conversion moment at the exact decision point.

---

## Implementation specification

### Per-post required links table

| Post | Penalty section link | Requirement list link | Closing CTA product |
|------|---------------------|----------------------|---------------------|
| `colorado-sb-24-205-ai-law-what-businesses-need-to-know` | `/products/colorado-sb24-205` | `/products/colorado-sb24-205` | `/products/colorado-sb24-205` |
| `colorado-ai-law-91-days-deadline-requirements` | `/products/colorado-sb24-205` | `/products/colorado-sb24-205` | `/products/colorado-sb24-205` |
| `illinois-hb3773-ai-employment-law-what-employers-need` | `/products/illinois-hb3773` | `/products/illinois-hb3773` | `/products/illinois-hb3773` |
| `ai-compliance-penalties-by-state` | Multiple (one per state section) | n/a | `/products/` (state-filtered) |
| `eeoc-ai-guidance-removed-federal-vacuum-2026` | `/products/illinois-hb3773` and `/products/nyc-local-law-144` | Both | Both |
| `hiring-software-uses-ai-employment-law-compliance` | `/products/illinois-hb3773` | `/products/illinois-hb3773` | `/products/illinois-hb3773` |
| `what-is-ai-bias-audit-does-your-business-need-one` | `/products/nyc-local-law-144` | `/products/nyc-local-law-144` | `/products/nyc-local-law-144` |
| `texas-traiga-hb149-ai-law-compliance-guide` | `/products/texas-traiga` | `/products/texas-traiga` | `/products/texas-traiga` |

### Anchor text rules

- DO: "the Illinois HB3773 compliance package" — specific, descriptive
- DO: "Colorado SB 24-205 compliance documents" — law-specific
- DO: "get these documents" — task-oriented
- DO NOT: "click here" — generic
- DO NOT: "our product" — vague
- DO NOT: "buy now" — premature, before buyer is convinced

### Frequency floor

No post with a corresponding product should have fewer than 3 links to that product. Current posts have 0–1. The floor is 3.

### What does NOT change

- The posts themselves are not shortened or stripped of substance — the authority/depth stays
- The legal disclaimer renders at page level and does not need to be in the CTAs
- External `.gov` source links stay — they are part of the credibility signal that makes the product trustworthy

---

## Why the current pattern fails (and what this fixes)

The current blog → product funnel has:
1. One link to the product, somewhere in 1,500 words
2. No urgency moment tied to the link
3. No conversion at the closing section — posts end on an educational note, not an action note

This pattern produces information-complete posts that satisfy researchers and inform readers but do not convert buyers. The EEOC post at position 4.16 with 0.11% CTR is the most visible symptom — but even if CTR improves, those readers land on a post that doesn't give them a product link at the moment they're ready to buy.

The fix is not to reduce information. It is to add conversion moments at the three points in a 1,500-word post where a deadline-anxious buyer is most likely to be ready to act:
1. After they read the penalty numbers
2. After they read what the law requires
3. After they read what they need to do

Each moment gets one product link. That's the pattern.
