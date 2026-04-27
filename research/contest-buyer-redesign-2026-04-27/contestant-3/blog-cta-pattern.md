# Blog CTA Pattern — Contestant 3

## The Leakage Problem (from GSC data)

The EEOC blog post: 1,833 impressions at position 4.16. 0.11% CTR. That's roughly 2 clicks per month from the top-traffic blog post on the site.

The Colorado blog post: 855 impressions, 0 clicks.

The brief confirms: "the top Colorado blog post (855 impressions, 0 clicks) contains exactly one link to the Colorado product page in 1,500 words."

This is a routing failure, not a content failure. The posts are excellent. The buyers who read them are qualified. They click away to .gov sources (which the posts correctly provide) and never return.

**The fix is not more links — it's better-placed links at the moment of recognition.**

---

## Diagnosis: Where Buyers Are in Blog Posts

A buyer reads a law-specific blog post in one of three mental states:

1. **Pre-recognition:** "I'm reading to understand if this applies to me." They need the qualifying moment — the section that says "if X, then this applies to you." That's where the first product link belongs.
2. **Post-recognition, pre-action:** "I know I'm covered. Now what do I do?" They need an explicit bridge from "here's the problem" to "here's the solution." That's where the inline CTA card belongs.
3. **Ready to act:** "I've been thinking about this for weeks. I need to do something today." They need a persistent, non-intrusive purchase path. That's what the sticky sidebar or end-of-post CTA does.

Currently the site serves state 1 (reads great) but fails states 2 and 3 (no bridge, no CTA card, one buried link).

---

## Proposed CTA Pattern

### Component 1: Inline Recognition Link (replaces the current single link)

**Where:** Place 3-4 inline links throughout each law-specific post, not just one.

**Placement logic:**
- First link: In the "who does this apply to" section — immediately after the applicability criteria are stated
- Second link: In the "what the law requires" section — when a specific document type is named
- Third link: In the penalties section — immediately after the penalty amount is stated
- Fourth link: In the "where to start" closing section

**Copy pattern:**
```
[descriptive anchor text that names the specific document]
```
NOT "click here" or "our product" — follow the existing BLOG-STYLE-GUIDE.md internal linking rule exactly.

**Example from Colorado post:**
Current: "You need to complete an [impact assessment](/products/colorado-sb24-205) for each high-risk system you deploy."
That's correct pattern — it just needs to appear 3 more times in the post.

---

### Component 2: Inline CTA Card (new component — placed after penalties section)

**What it is:** A styled callout block placed immediately after the penalties section in every law-specific blog post. Not at the end — after penalties, because that's the moment of maximum motivation.

**Visual:** Same visual language as the existing "Deep Dive" callout but with a purchase CTA. Blue border, document icon, product name, price, single CTA button.

**MDX implementation:** Since the blog renderer doesn't support HTML or custom components in the body, this should be implemented as a `<BlogProductCTA>` component registered in the MDX renderer (or as a frontmatter field `productCta: slug` that the page component renders as a fixed callout after the penalties section — similar to how `deepDive` renders in the sidebar).

**Recommended frontmatter field (new, optional):**
```yaml
productCta:
  slug: "colorado-sb24-205"
  placement: "after-penalties"
```

**Rendered copy (for Colorado post):**
```
Colorado SB 24-205 Compliance Package
8 documents built from the enacted statute text — impact assessment, risk management policy, consumer notices, and more. Instant download.
$449 — one-time purchase
[Get Your Colorado Documents →]
```

**Rendered copy (for Illinois post):**
```
Illinois HB3773 Compliance Package
Everything Illinois 775 ILCS 5/2-102(L) requires: employee notices, AI system inventory, impact assessment, human oversight protocol. Instant download.
$[price] — one-time purchase
[Get Your Illinois Documents →]
```

**Why after penalties:** Research confirms "what happens if I don't comply?" is the primary buyer trigger. The post has just told them they face up to $70,000 per violation. They are at maximum motivation. Placing the CTA card immediately after leverages that motivation before they continue reading and rationalize inaction.

---

### Component 3: Sticky Bottom Bar (mobile — new)

**What it is:** A fixed bottom strip on mobile that appears after the reader scrolls past 60% of the post. Contains the law name, price, and a "Get Documents" button.

**Why mobile-specific:** Desktop readers have the blog sidebar. Mobile readers see the sidebar collapsed into a card — which most don't expand. The bottom bar ensures mobile readers always have a purchase path visible.

**Copy:**
```
Colorado SB 24-205 — $449   [Get Documents]
```

**Implementation:** A React component that uses `useEffect` to track scroll position and renders a fixed div at `bottom-0` when `scrollPercent > 0.6`. This is a one-component addition to the blog `page.tsx`.

---

### Component 4: End-of-Post "Where to Start" Block (existing pattern, strengthen)

**Current:** The closing section of each post is "Where to Start" or "What to Do Now." It currently contains one product link.

**Revised:** The closing section should end with a dedicated paragraph block that explicitly names the product, the price, and the time-to-complete. The existing BLOG-STYLE-GUIDE.md already says the closing section should "end with a plain-language statement that gives the reader a clear next step." This revision makes that step explicit and purchase-oriented.

**Pattern:**
```
The [state] compliance package ([/products/slug]) includes every document this law requires — [list key docs]. It's $[price], instant download, built from the enacted statute text. Answer a short questionnaire about your company and AI systems, and your documents download immediately. The whole process takes about ten minutes.
```

---

## Application Across All 26 Posts

**Priority tier 1 (apply first — highest traffic, highest buyer intent):**
1. `/blog/colorado-sb-24-205-ai-law-what-businesses-need-to-know` → Product: colorado-sb24-205
2. `/blog/illinois-hb3773-ai-employment-law-what-employers-need` → Product: illinois-hb3773
3. `/blog/eeoc-ai-guidance-removed-federal-vacuum-2026` → Products: multi-state bundle + state-specific packages
4. `/blog/what-is-ai-impact-assessment-guide` → Products: colorado-sb24-205 + illinois-hb3773 (both require impact assessments)
5. `/blog/what-is-ai-bias-audit-does-your-business-need-one` → Product: nyc-local-law-144

**Priority tier 2 (high buyer relevance, apply next):**
6. `/blog/hiring-software-uses-ai-employment-law-compliance` → Products: illinois-hb3773 + nyc-local-law-144
7. `/blog/ai-compliance-cost-small-business-2026` → Products: all state-specific + multi-state bundle
8. `/blog/california-ccpa-admt-risk-assessment-compliance-2026` → Product: california-ccpa-admt
9. `/blog/texas-traiga-hb149-ai-law-compliance-guide` → Product: texas-traiga (when available)
10. `/blog/workday-ai-hiring-lawsuit-employer-liability` → Products: illinois-hb3773 + nyc-local-law-144

**Priority tier 3 (apply after tier 1 and 2):**
Remaining 16 posts — same pattern, apply by law relevance.

---

## Link Density Target

**Current:** ~1 link per 1,500-word post (confirmed in BRIEF.md)
**Target:** 3-5 inline links + 1 product CTA card + 1 end-of-post block = 5-7 total purchase paths per post

**The 3x rule:** No buyer should have to scroll more than 3 sections without seeing a path to the relevant product page. Long posts about a specific law (Illinois, Colorado, NYC) should never go more than 400-500 words between product-intent signals.

---

## What This Does Not Change

- The blog post body content — no rewrites required
- The `.gov` citation density (stays high — it's the credibility engine)
- The Realist/Credentialist voice pattern
- The three-column layout with Deep Dive and microFacts sidebars
- The externalReferences bibliography
- The legal disclaimer (auto-rendered by page.tsx)

---

## Implementation Notes for Build Instance

The MDX renderer (`src/lib/mdx-to-jsx.tsx`) does not support custom components or tables. To implement Component 2 (inline CTA card), the recommended path is:

**Option A (frontmatter field, no renderer change):** Add `productCta: { slug: string, placement: 'after-penalties' }` to the frontmatter schema. In `src/app/blog/[slug]/page.tsx`, after the MDX body renders, inject the `<BlogProductCTA>` component using the regulation data from `getRegulation(slug)`. This requires zero changes to the MDX renderer.

**Option B (new MDX directive, minimal renderer change):** Register a `:::product-cta` fenced directive in the renderer. The blog post author adds `:::product-cta colorado-sb24-205:::` at the desired placement point. The renderer resolves it to the `<BlogProductCTA>` component. More flexible, slightly more code.

Option A is recommended — it's more consistent with how `deepDive` already works (frontmatter field → component injection in page.tsx).

---

*Research basis: GSC leakage data from BRIEF.md (Colorado post: 855 impressions, 0 clicks; 1 link per 1,500 words); SMB buyer journey research (post-recognition moment = peak motivation); AI Overview CTR research confirming blog posts have traffic but no conversions; competitor analysis confirming no competitor offers inline product CTAs within educational content.*
