# Product Page Template — Colorado SB 24-205
# `/products/colorado-sb24-205` — v2 (new marketing voice)

*v1 preserved at `product-page-template-v1.md`. v1 got the structural insight right (penalties before documents, affirmative defense as conversion bridge). v2 applies the new marketing voice to all copy surfaces and tightens section order.*

---

## `<title>` tag

**Proposed (unchanged from v1):**
```
Colorado AI Law Compliance Package — SB 24-205 Deadline June 30, 2026 | AI Compliance Documents
```

---

## Meta description (160 chars)

```
Colorado SB 24-205: June 30, 2026. Up to $20,000 per consumer (C.R.S. § 6-1-112). Risk program, impact assessment, consumer notices — $449, instant download.
```
(159 chars)

---

## Hero section — new voice

### H1
```
Colorado SB 24-205 Compliance Package
```

### Deck (below H1, new marketing voice — short, offer-forward)
```
June 30, 2026 is the deadline. These are the documents the law requires.
Risk management program. Impact assessment. Consumer notices. $449, yours today.
```

Two lines. No explanation of the law. No preamble. The buyer who landed on this page already knows why they're here — they just searched "Colorado AI law compliance." Give them the offer, not the lecture.

**Voice comparison:**

v1 proposed opening for urgency block (explainer mode):
> "June 30, 2026 is the compliance deadline for Colorado SB 24-205. Violations are enforced under the Colorado Consumer Protection Act — up to $20,000 per consumer under C.R.S. § 6-1-112(1)(a). A single non-compliant AI system affecting 1,000 consumers creates exposure of up to $20 million."

v2 hero deck (new voice):
> "June 30, 2026 is the deadline. These are the documents the law requires."

The penalty detail still appears — in section 2, with full statute citations. The hero doesn't lead with it because the first job of the hero is to confirm: yes, this is the product you came for. Then the penalty section confirms why they need it.

### Status badge
`EFFECTIVE SOON` in amber — kept. Deadline date in Deadline Red `#DC2626` directly below the badge: `Deadline: June 30, 2026`.

### Hero CTA (sidebar card — visible on desktop above the fold)
```
Get My Colorado Compliance Package — $449
```
Signal Blue button, full sidebar width. Below it:

```
One-time purchase. Instant download.
Statute-verified against SB 24-205 as amended.
[Source: leg.colorado.gov/bills/sb24-205]
```

---

## Revised section order — new voice throughout

### Section 1: Does This Apply to You?

**H2 (new voice):**
```
Does This Apply to Your Business?
```

**Opening — new voice (3 lines, replaces the v1 Pragmatic Realist paragraph):**
```
You use AI in employment, housing, credit, healthcare, insurance, or education decisions.
You serve Colorado consumers.
This law applies to you.
```

Then the existing `appliesToBullets` — they are already well-written and need no change.

**Why three short lines instead of a paragraph:** The v1 opener ("If you use any software that helps make decisions...") is 43 words. The v2 opener makes the same determination in 3 declarative lines. A buyer scanning this page gets the applicability answer in 2 seconds, not after reading a conditional clause.

---

### Section 2: What Happens Without Compliance

**H2 (new voice — renamed from "What Happens If You Don't Comply"):**
```
The Penalty for Non-Compliance
```

**Body — new voice. Statute citations preserved exactly:**

```
Up to $20,000 per consumer. That is the penalty under C.R.S. § 6-1-112(1)(a).

Each consumer is a separate violation. One non-compliant AI system. One thousand Colorado applicants.
Up to $20 million in exposure.

Enforcement: Colorado Attorney General only. No private right of action. (C.R.S. § 6-1-1706)

An affirmative defense applies if you followed a nationally recognized AI risk management
framework and implemented mechanisms to discover and correct algorithmic discrimination.
(C.R.S. § 6-1-1706(3))

These documents are your affirmative defense.
```

**Why "These documents are your affirmative defense" stays as the last line:** This sentence, identified in v1, is unchanged in v2. It is the conversion bridge — it is the moment the buyer understands that the product is not just a paperwork exercise but a legal shield. Short sentence, last position, maximum weight. The new voice makes the lines before it shorter and harder, so when this sentence lands it hits harder.

---

### Section 3: What's Included

**H2 (new voice):**
```
7 Documents. All of Them Required.
```

**One-line bridge (new voice):**
```
Colorado SB 24-205 requires documentation across four compliance areas.
This package covers all four.
```

Then the document list, grouped by statutory obligation:

**Risk Management Program**
- Risk Management Policy
- Risk Classification Matrix

**Impact Assessment**
- Impact Assessment Framework

**Consumer Disclosures**
- Consumer Notice (pre-decision)
- Transparency Statement

**Oversight & Response**
- Human Oversight Protocol
- Incident Response Plan

*(Exact document names should match `regulations.ts` for this slug — the grouping above is illustrative based on the document types in `DOC_EXPLANATIONS`. Verify exact document list against the Colorado product's `documents` array before shipping.)*

**After the list — new voice, not a bullet:**
```
Each document includes the specific statutory section it satisfies.
Your attorney reviews the filled-in output. You don't start from scratch.
```

---

### Section 4: Preview (unchanged)

`DocumentSamplePreview` component and WebP preview image stay as-is. No voice change needed — these are visual, not copy.

---

### Section 5: After You Purchase

**H2 (new voice — shortened from "What Happens After You Purchase"):**
```
How It Works After Purchase
```

Keep the existing 5 checklist items. They are already clear and specific. One voice adjustment — the current item "Have your legal team review the completed documents before deployment" becomes:

```
Have your attorney review the completed output. (Optional — but recommended.)
```

"Legal team" implies an in-house team the buyer likely doesn't have. "Your attorney" is one person they probably do have access to, even occasionally.

---

### Section 6: Blog guide card

**Placement:** Moved to after Section 1 ("Does This Apply?"), per v1 recommendation. The buyer who isn't ready to purchase yet clicks through to the plain-language guide, gets the full law explained, and returns via the blog post's CTA.

**New voice copy for the card:**
```
Not ready to buy yet? Read the full breakdown first.
"Colorado's AI Law Takes Effect June 30, 2026. Here's What It Requires." →
```

---

### Section 7: Add-ons / Related products

Unchanged. The `relatedAddons` (co-appeal-correction-kit, co-ag-reporting-kit, co-dev-deploy-exchange) serve cross-sell appropriately.

**One voice update to the add-on section header:**

Current: "Complete Your Compliance"
New: "Also Required? These Add-Ons Cover the Rest."

This shift turns the add-on section from a upsell feel into a completeness signal — the buyer isn't being sold more, they're being told what else the law covers that the base package doesn't include.

---

### Section 8: Statutory Authority

Unchanged. The citation link to leg.colorado.gov is a trust cornerstone. Keep.

---

## Sidebar purchase card — new voice

**Current primary CTA:** "Customize Now — $449"
**New:** "Get My Colorado Compliance Package — $449"

**Current trust line below button:** "vs. thousands at a law firm"
**New:** "From $449. Outside counsel drafts these from scratch — at hundreds of dollars per hour."

*(The "$3,000–$10,000" law firm range from v1 should remain flagged as REQUIRES VERIFICATION before publishing. The softer version above is defensible without a citation.)*

**Verified badge (new voice — slightly tighter):**
```
[GREEN BOX]
Verified against SB 24-205, as amended by SB 25B-004.
Source: leg.colorado.gov/bills/sb24-205
```

---

## EEOC post title/meta — addressing the Proxy gap

The Proxy noted in Loop 1 that the strategy addressed product page titles but not blog post title/meta, and specifically called out the EEOC post (1,833 impressions, position 4.16, 0.11% CTR).

This is addressed fully in `ia-proposal.md`, but the product-page-level implication is here: the EEOC blog post closing CTA now routes to this product page (among others). The buyer who clicks through on the EEOC post and reads about the Illinois/NYC/Colorado vacuum arrives at a closing section that says:

```
Illinois HB3773 is in effect. NYC Local Law 144 is in effect. Colorado SB 24-205 takes effect June 30, 2026.
The documents these laws require are here.

[Illinois HB3773 Compliance Package — $449 →](/products/illinois-hb3773)
[NYC Local Law 144 Compliance Package — $399 →](/products/nyc-local-law-144)
[Colorado SB 24-205 Compliance Package — $449 →](/products/colorado-sb24-205)
[Not sure which one? Find your state →](/compliance-deadline-by-state)
```

This is the new voice applied to the blog → product handoff: no explanation, no "here's what each package contains." Just the law, the product, the price, the link.
