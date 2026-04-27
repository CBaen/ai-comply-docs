# Blog CTA Pattern — Contestant 2 (v2 — Transaction-First Declarative voice)

*v1 preserved as `blog-cta-pattern-v1.md`*

---

## The Problem (unchanged from v1)

The top Colorado blog post has 1 product link in 1,500 words. It's buried after 800 words of law explanation. The blog is producing impressions and zero sales. The CTA pattern fixes the leaky handoff between the research surface (blog) and the purchase surface (product page).

Two-part diagnosis stays from v1:
- **Part 1 (structural):** AI Overviews consume informational query clicks. CTAs can't fix this. Addressed in keyword-strategy.md and homepage metadata.
- **Part 2 (handoff):** Readers who do click through find one link at the end. This is fixable. This document fixes it.

---

## Component: `BlogProductCTA`

**File:** `src/components/BlogProductCTA.tsx`

**Props (unchanged from v1):**
```typescript
interface BlogProductCTAProps {
  slug: string;
  lawName: string;
  deadline: string;
  price: number;
  urgencyLine: string;
}
```

---

## Placement 1 — After Opening Hook (within first 300 words)

**Purpose:** "Am I in the right place?" confirmation for the buyer who clicked the blog post because of the law name but isn't sure if this site solves their problem.

**v2 copy (Transaction-First Declarative):**

```jsx
<div className="my-8 border-l-4 border-l-[#dc2626] bg-red-50 rounded-r p-5">
  <p className="text-xs font-bold uppercase tracking-widest text-red-700 mb-1">
    {deadline}
  </p>
  <p className="text-gray-900 font-bold text-base mb-3">
    {urgencyLine}
  </p>
  <a
    href={`/products/${slug}`}
    className="inline-flex items-center gap-2 bg-[#1e3a5f] text-white px-5 py-3 rounded font-bold text-sm hover:bg-[#162d4a] transition"
  >
    {lawName} Documents — ${price}
    <svg className="w-4 h-4" ...arrow />
  </a>
  <p className="text-xs text-gray-500 mt-2">
    Instant download. One-time purchase.
  </p>
</div>
```

**Urgency line copy per law (v2 voice — declarative, no hedging):**

- **Colorado:** `June 30, 2026 is the enforcement date. The documents take time to implement — not just to buy.`
- **Texas:** `Texas TRAIGA is in force. One uncurable violation: up to $200,000. The documents are ready.`
- **Illinois:** `Illinois HB3773 has been in force since January 1, 2026. Penalties reach $70,000 per violation for repeat offenders.`
- **NYC:** `NYC Local Law 144. Enforced since 2023. DCWP opened proactive investigations in 2026 — not just complaint-driven.`

**v1 voice comparison:**
- v1: "Colorado SB 24-205 requires documented compliance before June 30, 2026. Documentation takes weeks to implement — not minutes."
- v2: "June 30, 2026 is the enforcement date. The documents take time to implement — not just to buy."

**Change:** v1 named the law first (researcher reflex). v2 leads with the date (buyer anchor). "Not just to buy" is sharper than "not minutes" — it addresses the specific misconception that purchasing = complying.

---

## Placement 2 — After Penalty Section (mid-article)

**Purpose:** The buyer just read the consequences. This placement names the product at peak anxiety. Highest expected conversion of the three placements.

**Build-order note:** This is the placement to ship first if only one can be built. See homepage-rewrite.md Build Order, item 3.

**v2 copy:**

```jsx
<div className="my-8 border border-[#1e3a5f] bg-[#f8fafc] rounded-lg p-5">
  <p className="text-xs font-bold uppercase tracking-widest text-[#1e3a5f] mb-2">
    {lawName} Compliance Documents
  </p>
  <ul className="text-sm text-gray-700 space-y-1 mb-4">
    {/* 3 documents from the product, obligation-framed */}
    <li>Risk Management Policy — required by statute</li>
    <li>Impact Assessment — required before deploying high-risk AI</li>
    <li>Consumer Notification Template — required before AI makes decisions about people</li>
    <li className="text-gray-400 text-xs">+ {remainingCount} more documents</li>
  </ul>
  <a
    href={`/products/${slug}`}
    className="inline-flex items-center gap-2 bg-[#1e3a5f] text-white px-5 py-3 rounded font-bold text-sm hover:bg-[#162d4a] transition w-full justify-center sm:w-auto sm:justify-start"
  >
    Get the Documents — ${price}
    <svg className="w-4 h-4" ...arrow />
  </a>
</div>
```

**v1 version:** Used "The law requires" document framing with a "See What's Included" CTA.

**Voice change:** v1 CTA was "See What's Included" — browse signal. v2 CTA is "Get the Documents" — transaction signal. The document list now uses obligation framing ("required by statute," "required before deploying") rather than description framing ("A structured list of every AI tool you use"). The buyer doesn't need to understand what an impact assessment is — they need to know the law requires one and that this package has it.

---

## Placement 3 — End of Article

**Purpose:** Closing purchase opportunity for readers who reached the end without buying. Also the SEO-friendly placement — a visible product link at the end of every post reinforces the blog → product internal link graph.

**v2 copy:**

```jsx
<div className="mt-10 p-6 bg-[#1e3a5f] text-white rounded-xl">
  <p className="text-xs font-semibold uppercase tracking-widest text-blue-300 mb-1">
    {lawName} Compliance Documents
  </p>
  <p className="text-2xl font-extrabold mb-1">
    ${price}
  </p>
  <p className="text-slate-300 text-sm mb-4">
    {documentCount} documents. Instant download. Built from the enacted statute.
  </p>
  <a
    href={`/products/${slug}`}
    className="inline-flex items-center gap-2 bg-white text-[#1e3a5f] px-6 py-3 rounded font-bold hover:bg-slate-100 transition"
  >
    Get the Documents →
  </a>
  <p className="text-slate-400 text-xs mt-3">
    Not sure this applies to you? The product page has the applicability checklist.
  </p>
</div>
```

**v1 version:** Same dark-navy treatment with slightly different copy. Price buried in the description line.

**Voice change:** v2 puts the price as the largest text element after the law name. `text-2xl font-extrabold` for `$449`. The buyer who scrolled 1,500 words to the end needs a transaction anchor, not a description. Price first, then what they get, then the button. The final micro-copy ("Not sure this applies to you?") routes hesitant buyers to the product page's applicability section rather than leaving them to exit.

---

## Frequency Rules (unchanged from v1 — voice-agnostic)

| Blog Post Type | Placement 1 | Placement 2 | Placement 3 |
|---|---|---|---|
| Law-specific post (e.g., Colorado SB 24-205) | YES | YES — after penalty section | YES |
| Cross-state comparison post | One per state section | One per state section | YES — link to `/products` |
| General/informational post | NO | Add if post has a law anchor | YES — most relevant product |
| EEOC/federal guidance post | NO | NO | YES — multi-state bundle |

**Maximum CTAs per post:** 3. Never more.

---

## Frontmatter Field (implementation)

Add to blog post frontmatter schema:

```yaml
productCTA:
  slug: "colorado-sb24-205"
  lawName: "Colorado SB 24-205"
  deadline: "June 30, 2026"
  price: 449
  documentCount: 8
  placements:
    - "after-hook"
    - "after-penalty"
    - "end"
```

The `BlogProductCTA` component reads these props. The MDX renderer inserts the component at the correct position based on `placements`.

For posts without a `productCTA` field: no CTA renders. The component is opt-in per post, not global.

---

## Voice Consistency Check

Every piece of CTA copy in this component must pass three tests:

1. **Transaction verb test:** Does the primary CTA use a transaction verb (get, download, buy) rather than a browse verb (see, explore, learn, discover)?
2. **Price visible test:** Is the price visible before the buyer clicks? (Yes — it's in every CTA button label and/or the description line.)
3. **Obligation frame test:** Does the document list use obligation language ("required by statute") rather than feature language ("helps you demonstrate compliance")?

If any piece of copy fails any of these three tests, it has drifted back toward the Realist/Credentialist voice or toward generic SaaS copy. Reject it.
