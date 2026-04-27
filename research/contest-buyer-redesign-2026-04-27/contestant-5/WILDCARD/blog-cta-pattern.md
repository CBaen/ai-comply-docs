# Blog CTA Pattern — Wildcard Synthesis

## The Problem (unchanged from field diagnosis)

The top Colorado blog post: 1 product link in 1,500 words, buried after 800 words of law explanation. The blog produces impressions and zero sales. The CTA pattern fixes the structural handoff from research surface (blog) to purchase surface (product page).

Two-part diagnosis:
- **Part 1 (structural):** AI Overviews consume informational query clicks. CTAs can't fix this. Addressed in keyword-strategy.md.
- **Part 2 (handoff):** Readers who click through find one link at the end. Fixable. This file fixes it.

---

## Component: `BlogProductCTA`

**File:** `src/components/BlogProductCTA.tsx`

**Props:**
```typescript
interface BlogProductCTAProps {
  slug: string;         // product slug from regulations.ts
  lawName: string;      // e.g., "Colorado SB 24-205"
  deadline: string;     // e.g., "June 30, 2026" or "In Effect Now"
  price: number;        // e.g., 449
  documentCount: number; // e.g., 8
  mode: "deadline-approaching" | "already-exposed"; // drives urgency register
  urgencyLine: string;  // mode-specific sentence (see per-law copy below)
}
```

The `mode` prop maps directly to the two-mode frame. Each law's blog posts carry the mode that matches the law's `reg.status`. Colorado posts: `"deadline-approaching"`. Illinois, NYC, Texas posts: `"already-exposed"`.

---

## Three Placements Per Law-Specific Post

### Placement 1: After Opening Section (~300 words in)

**Purpose:** "Am I in the right place?" confirmation for the buyer who clicked from the blog title but isn't sure the site solves their problem.

**Deadline Approaching (Colorado):**
```jsx
<div className="my-8 border-l-4 border-l-amber-600 bg-amber-50 rounded-r p-5">
  <p className="text-xs font-bold uppercase tracking-widest text-amber-700 mb-1">
    {deadline}
  </p>
  <p className="text-gray-900 font-bold text-base mb-3">
    {urgencyLine}
  </p>
  <a href={`/products/${slug}`}
     className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded font-bold text-sm hover:bg-blue-700 transition">
    {lawName} Documents — ${price} →
  </a>
  <p className="text-xs text-gray-500 mt-2">Instant download. One-time purchase.</p>
</div>
```

**Already Exposed (Illinois, NYC, Texas):**
Same structure, `border-l-red-700 bg-red-50`, `text-red-700` label. The mode difference is in the urgency line copy and the visual register — red for in-effect, amber for deadline.

**Urgency line copy per law and mode:**

| Law | Mode | Urgency line |
|---|---|---|
| Colorado SB 24-205 | deadline-approaching | `June 30, 2026 is the deadline. The documents take time to implement — not just to buy.` |
| Illinois HB3773 | already-exposed | `HB3773 is in effect. Penalties reach $70,000 per violation for repeat offenders. (775 ILCS 5/8A-104)` |
| NYC Local Law 144 | already-exposed | `Local Law 144 has been enforced since 2023. DCWP opened proactive investigations in 2026 — not just complaint-driven.` |
| Texas TRAIGA | already-exposed | `Texas TRAIGA is in force. One uncurable violation: up to $200,000. [REQUIRES PRIMARY SOURCE VERIFICATION]` |

---

### Placement 2: After Penalty Section (Mandatory — highest converting)

**Purpose:** The buyer just read the consequences. Name the product at peak anxiety. This is the placement to ship first if only one can be built.

**Deadline Approaching (Colorado):**
```jsx
<div className="my-8 border border-blue-900 bg-slate-50 rounded-lg p-5">
  <p className="text-xs font-bold uppercase tracking-widest text-blue-900 mb-2">
    {lawName} Compliance Documents
  </p>
  <ul className="text-sm text-gray-700 space-y-1 mb-4">
    <li>Risk Management Policy — required by statute</li>
    <li>Impact Assessment — required before deploying high-risk AI</li>
    <li>Consumer Notification Template — required before AI makes decisions</li>
    <li className="text-gray-400 text-xs">+ {documentCount - 3} more documents</li>
  </ul>
  <a href={`/products/${slug}`}
     className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded font-bold text-sm hover:bg-blue-700 transition w-full justify-center sm:w-auto sm:justify-start">
    Get the Documents — ${price} →
  </a>
</div>
```

**Already Exposed:** Same structure. The document list uses obligation framing ("required by statute," "required before hiring decisions") not feature framing.

**Voice check for Placement 2:** CTA is "Get the Documents" — transaction verb. Not "See What's Included" — browse verb. Document list uses "required by statute" — not "helps you demonstrate compliance." Price is in the button label, not buried in a sub-line.

---

### Placement 3: Closing Block (End of Article)

**Purpose:** Closing purchase opportunity for readers who reached the end without buying. Also reinforces blog → product internal link graph.

**Template (Deadline Approaching):**
```
## [Law name]. Get the Documents.

[Date]. [Document count] documents. $[price]. Built from the enacted statute. Instant download.

→ [Get the [State] [Law] Package — $[price]](/products/[slug])

→ [Not sure which law applies? See state deadlines →](/compliance-deadline-by-state)
```

**Colorado example:**
```
## Colorado SB 24-205. Get the Documents.

June 30, 2026. 8 documents. $449. Built from C.R.S. § 6-1-1701. Instant download.

→ [Get the Colorado SB 24-205 Package — $449](/products/colorado-sb24-205)

→ [Not sure if this applies to you? See state deadlines →](/compliance-deadline-by-state)
```

**Illinois example (Already Exposed):**
```
## Illinois HB3773. Get the Documents.

In effect now. 5 documents. $397. Built from 775 ILCS 5/2-102(L). Instant download.

→ [Get the Illinois HB3773 Package — $397](/products/illinois-hb3773)

→ [See all state AI law deadlines →](/compliance-deadline-by-state)
```

**MDX compatibility note:** All Placement 3 copy uses standard markdown link syntax and `##` headers. No custom HTML. The `→` character (Unicode U+2192) renders in all supported markdown. Verified against BLOG-STYLE-GUIDE.md.

---

## The EEOC Post: Special Case (from Contestant 5 original work — retained)

The EEOC post ("The Federal Government Removed AI Hiring Guidance. Four States Wrote Their Own Laws.") has a structural mid-article gap that no styled CTA block can fix. The post's argument is: EEOC removed its guidance → four states filled the vacuum. The buyer reading Section 2 (EEOC removed) needs to be bridged to Section 3 (state laws) in the article's own voice — not with a styled component that signals "advertisement."

**Mid-article bridge placement (between EEOC section and state law section):**
```
Here's what replaced it.

[Illinois HB3773 compliance documents →](/products/illinois-hb3773)
[Colorado SB 24-205 compliance documents →](/products/colorado-sb24-205)
[NYC Local Law 144 compliance documents →](/products/nyc-local-law-144)
```

Plain text. Three plain markdown links. No styled block. The bridge reads as article copy — "here's what replaced it" is the thesis of the piece made transactional. The three links are the answer to that thesis. A styled block component at this position would break the article's narrative flow and signal "this is an ad" to a reader in the middle of a substantive piece.

The closing styled block (Placement 3) goes at the end, after the full state-law section, as the post's action close.

---

## Multi-State and General Posts

**For posts that discuss multiple laws (e.g., penalties-by-state post, cost post):**

```
## Your State Has an AI Law. Get the Documents.

Colorado, Illinois, NYC, California, Texas — each has its own deadline and its own documentation requirements. Find your state's package.

→ [Browse All State AI Compliance Packages](/products)

→ [See deadlines and penalties by state →](/compliance-deadline-by-state)
```

No law-specific urgency line — the post is multi-law. The generic block routes to the catalog and the state-deadlines hub.

---

## Frequency Rules

| Post type | Placement 1 | Placement 2 | Placement 3 | EEOC bridge |
|---|---|---|---|---|
| Law-specific (CO, IL, NYC, TX) | YES | YES (mandatory after penalty section) | YES | NO |
| EEOC/federal guidance post | NO | NO | YES | YES (replaces Placements 1+2) |
| Cross-state comparison post | One per state section | One per state section | YES (generic) | NO |
| General/informational post | NO | Add if law anchor exists | YES (generic) | NO |
| Cost post | NO | NO | YES (routes to `/compliance-deadline-by-state`) | NO |

Maximum 3 CTAs per post. Never more.

---

## Priority Order for Implementation

1. `eeoc-ai-guidance-removed-federal-vacuum-2026.mdx` — 1,833 impressions at position 4.16. Title/meta rewrite first (see rationale.md Step 4), then mid-article bridge + Placement 3 closing block.
2. `colorado-ai-law-91-days-deadline-requirements.mdx` — 855 impressions. All three placements.
3. `illinois-hb3773-ai-employment-law-what-employers-need.mdx` — in effect now, penalties already in the post. All three placements.
4. `ai-compliance-cost-small-business-2026.mdx` — title/meta rewrite FIRST (current title has no state, no buyer signal). Then Placement 3 routing to `/compliance-deadline-by-state`.
5. `penalties-by-state` post (if it exists) — all three placements with generic multi-state Placement 3.

---

## Frontmatter Schema Addition

```yaml
productCTA:
  slug: "colorado-sb24-205"
  lawName: "Colorado SB 24-205"
  deadline: "June 30, 2026"
  price: 449
  documentCount: 8
  mode: "deadline-approaching"
  placements:
    - "after-opening"
    - "after-penalties"
    - "closing"
```

The `BlogProductCTA` component reads these props. The MDX renderer inserts at the correct position based on the `placements` array. For posts without a `productCTA` field: no CTA renders. Opt-in per post, not global.

**Implementation shortcut:** Rather than editing each MDX file to add the JSX component call, add `BlogProductCTA` to the MDX components provider at the app level and use the frontmatter flag to trigger placement. This avoids editing 26 files manually — the provider handles component injection based on frontmatter.
