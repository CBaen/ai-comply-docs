# Blog CTA Pattern — Contestant 2

## The Problem Being Solved

The top Colorado blog post (855 impressions at position ~4, 0 clicks) contains exactly **one** link to the Colorado product page in 1,500 words. The EEOC blog post (1,833 impressions, position 4.16, 0.11% CTR) sends almost no buyers to products.

The diagnosis has two parts:

**Part 1 — Zero-click structural problem:** AI Overviews are consuming the answer for informational queries. CTR at position 4 should be ~7.2% (First Page Sage, 2026). The site gets 0.11%. This is not fixable by adding CTAs — the content is serving researchers and AI crawlers, not buyers. CTAs won't help if the reader has already gotten what they came for from the SERP.

**Part 2 — Leaky handoff problem:** For the readers who DO click through, the single link buried at article end is a missed opportunity. This IS fixable.

The CTA pattern addresses Part 2. Part 1 requires the keyword strategy shift (see keyword-strategy.md) and title/meta restructuring.

---

## CTA Component Specification

### Component Name: `BlogProductCTA`

**File location:** `src/components/BlogProductCTA.tsx` (new component)

**Props:**
```typescript
interface BlogProductCTAProps {
  slug: string;           // Product slug from regulations.ts
  lawName: string;        // e.g. "Colorado SB 24-205"
  deadline: string;       // e.g. "June 30, 2026"
  price: number;          // From regulations.ts
  urgencyLine: string;    // One sentence, Realist voice
}
```

**Rendered output (three placements):**

---

### Placement 1: After Opening Hook (within first 300 words)

This is the "am I in the right place?" signal. Appears after paragraph 2-3 of the article body.

```jsx
<div className="my-8 border border-amber-200 bg-amber-50 rounded-lg p-5">
  <p className="text-sm font-semibold text-amber-900 mb-1">
    {deadline}: Compliance deadline
  </p>
  <p className="text-gray-800 text-sm mb-3 leading-relaxed">
    {urgencyLine}
  </p>
  <a
    href={`/products/${slug}`}
    className="inline-flex items-center gap-2 bg-blue-800 text-white px-5 py-3 rounded font-semibold text-sm hover:bg-blue-900 transition"
  >
    Get {lawName} Documents — ${price}
    <svg className="w-4 h-4" ...arrow icon... />
  </a>
  <p className="text-xs text-gray-500 mt-2">
    Instant download. One-time purchase. Statute-sourced.
  </p>
</div>
```

**Urgency line examples by law:**
- Colorado: "Colorado SB 24-205 requires documented compliance before June 30, 2026. Documentation takes weeks to implement — not minutes."
- Texas: "Texas TRAIGA took effect January 1, 2026. If you deploy AI in Texas and have no compliance documentation, you are currently exposed."
- Illinois: "Illinois HB3773 has been in force since January 1, 2026. Penalties reach up to $70,000 per violation for repeat offenders."
- NYC: "NYC Local Law 144 has been enforced since July 2023. The DCWP has opened proactive investigations — not just complaint-driven ones."

---

### Placement 2: After the Penalty Section (mid-article)

This is the "I just read the consequences — what do I do?" moment. Place immediately after the section discussing enforcement and penalties.

```jsx
<div className="my-8 border-l-4 border-l-blue-600 bg-blue-50 rounded-r-lg p-5">
  <p className="font-bold text-gray-900 text-sm mb-2">
    The {lawName} compliance package covers what this article describes.
  </p>
  <ul className="text-sm text-gray-700 space-y-1 mb-4 list-disc list-inside">
    {/* Pull 3–4 specific documents from the product's documents array */}
    <li>Risk Management Policy</li>
    <li>Impact Assessment</li>
    <li>Consumer Notification Template</li>
    <li>Human Oversight Protocol</li>
    {/* + [N] more documents */}
  </ul>
  <a
    href={`/products/${slug}`}
    className="inline-flex items-center gap-2 bg-blue-800 text-white px-5 py-3 rounded font-semibold text-sm hover:bg-blue-900 transition"
  >
    See What's Included — ${price}
    <svg ...arrow... />
  </a>
</div>
```

**Why this placement works:** The buyer just finished reading the penalty section. They know what exposure looks like. The mid-article CTA offers the solution at exactly the highest-anxiety moment in the article flow — before they finish reading and decide to "think about it."

---

### Placement 3: End of Article (existing link + enhancement)

The current pattern has one product link at the end. Keep it. But strengthen it:

**Current pattern (from BLOG-STYLE-GUIDE.md example):**
```
Our [Illinois HB3773 compliance package](/products/illinois-hb3773) includes ready-to-use notice templates...
```

**Proposed end-of-article CTA block (after the existing prose link):**

```jsx
<div className="mt-10 p-6 bg-slate-900 text-white rounded-xl">
  <p className="text-lg font-bold mb-2">
    {lawName} Compliance Documents
  </p>
  <p className="text-slate-300 text-sm mb-4 leading-relaxed">
    {documentCount} documents built from the enacted statute text at {citationUrl}.
    Instant download. ${price}, one-time.
  </p>
  <a
    href={`/products/${slug}`}
    className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-500 transition"
  >
    Get the Documents →
  </a>
  <p className="text-slate-500 text-xs mt-3">
    Not sure this applies to you? Read the applicability section on the product page.
  </p>
</div>
```

---

## Frequency Rules

| Blog Post Type | Placement 1 | Placement 2 | Placement 3 |
|---|---|---|---|
| Law-specific post (e.g., "Colorado SB 24-205: What Businesses Need to Know") | YES — after para 2 | YES — after penalty section | YES — end |
| Cross-state comparison post (e.g., "AI Compliance Penalties by State") | One per state section | One per state section | YES — link to `/products` index |
| General/informational post (e.g., "What is an AI Impact Assessment?") | NO — article is researcher-bait; CTA inappropriate until buyer is identified | If post has a clear law anchor, add ONE after the relevant section | YES — link to most relevant product |
| EEOC/federal guidance post | NO | NO — no federal product directly maps | YES — link to multi-state bundle |

**Maximum CTAs per post:** 3 (one per placement). Never more than 3 — this preserves editorial integrity and avoids the appearance of advertorial content that would undermine the Credentialist voice.

---

## Implementation Path

This is a **component addition**, not a template rebuild. The work:

1. Create `src/components/BlogProductCTA.tsx` with the three layout variants
2. Import into `src/app/blog/[slug]/page.tsx` (or wherever the MDX renderer lives)
3. Add a `productCTA` field to blog post frontmatter schema:
   ```yaml
   productCTA:
     slug: "colorado-sb24-205"
     placement: ["after-hook", "after-penalty", "end"]
   ```
4. The MDX renderer inserts the component at the correct paragraph count or H2 section marker

**Alternative (simpler):** Use the existing `externalReferences` strip pattern — add a new `productRecommendation` frontmatter field that renders a styled CTA block at the bottom of every qualifying post. This requires one component and one frontmatter field — no paragraph counting.

---

## The One-Link Leakage Fix

The current Colorado blog post has one link: `[impact assessment](/products/colorado-sb24-205)` at ~word 800. The proposed pattern adds:
- Placement 1 at ~word 150 (after opening hook)
- Placement 2 at the penalty section (~word 900 in most posts)
- Placement 3 at the end

This takes the Colorado blog from 1 product touchpoint to 3, without disrupting the editorial voice — each CTA appears at a natural decision moment. The mid-article CTA is the highest-leverage single addition.

---

## Anti-Pattern Check

None of the proposed CTAs:
- Say "Get started in minutes" without specifying what
- Say "Trusted by X businesses"
- Link to a newsletter or email capture
- Say "Schedule a demo"
- Say "Speak with a compliance expert"
- Use the phrase "Discover" or "Unlock"

All CTAs:
- Name the specific law
- Name the price
- Describe what the buyer receives ("8 documents," "instant download")
- Point to a specific product slug, not a generic `/products` page
- Use the Realist voice: short, direct, no softening
