# Blog CTA Pattern — Round 2 (new voice)
## Supersedes Round 1 version (see blog-cta-pattern-v1.md for comparison)

## The Leakage Problem (unchanged diagnosis)

The top blog post by impressions (EEOC / federal vacuum, 1,833 impressions at position 4.16) gets 0.11% CTR — roughly 2 clicks per 1,833 impressions. The Colorado blog post (855 impressions) has exactly ONE link to the Colorado product page in 1,500 words, buried in prose. This is structural leakage: informational attention with no conversion architecture.

The fix is the same as Round 1: a mandatory `<BlogProductCTA>` React component at two anchored positions per post, plus minimum three inline product links per post. What changes in Round 2 is the copy inside the component — rewritten from Realist/Credentialist blog voice to Calm Authority marketing voice.

**The EEOC post gap (addressed from Proxy Loop 1):** The EEOC blog post (`eeoc-ai-guidance-removed-federal-vacuum-2026`, 1,833 impressions) covers multiple laws — Illinois, Colorado, Texas, NYC. It cannot use a single-law CTA. It gets a multi-law CTA variant (specified below). Buyers arriving from an informational EEOC/federal query may have transactional intent underneath — the CTA converts that intent without assuming which state law they're in.

---

## CTA Component Specification

### Component Name
`<BlogProductCTA>` — a React component injected into every blog post at defined positions.

### Visual Design
- Background: `bg-slate-900` (matches the homepage final CTA, creates visual break)
- Border: `border-l-4 border-blue-500` (left-accent, not a generic box)
- Padding: `p-6 my-10`
- Max width: matches the center column (max 640px)
- Mobile: full-width, stacked
- Not collapsible — always visible

### Component Props
```typescript
interface BlogProductCTAProps {
  heading: string;        // Calm Authority — law name + offer, no explanation
  body: string;           // 1 sentence max. What's in the package. Nothing else.
  ctaText: string;        // Transactional verb + law name
  ctaHref: string;        // Product page URL
  price?: string;         // Price · doc count · delivery — displayed inline below CTA
  lawName?: string;       // Status badge above heading: "IN EFFECT" or "JUNE 30, 2026"
  variant?: "single" | "multi"; // "multi" for posts covering several laws (EEOC post)
}
```

### Example Rendered — Single Law (Illinois post, new voice)
```
[● IN EFFECT — January 1, 2026]

Illinois HB3773. The documents. $449.

7 documents built from Public Act 103-0804. Employee notices, AI system inventory,
impact assessment. Instant download.

[Get the Illinois Package →]
$449 · 7 documents · instant download
```

**What changed from Round 1:** Round 1 heading was "HB3773 is in effect. Get your compliance documents." — a two-sentence Realist opener. Round 2 compresses to the offer shape: law name, product type, price. The body drops from 2 sentences to 1. The CTA shortens to "Get the Illinois Package" — no redundant "HB3773" repetition since the badge and heading already carry it.

### Example Rendered — Multi-Law (EEOC post, new variant)
```
[● MULTIPLE LAWS IN EFFECT]

Your state has an AI law. Your documents are here.

Illinois HB3773 · NYC Local Law 144 · Texas TRAIGA · Colorado (June 30)

[Find My Compliance Documents →]    → aicompliancedocuments.com/deadline-checker
```

**Why a multi-law variant:** The EEOC blog post covers the federal vacuum left by removed EEOC guidance — it attracts buyers from any state who are anxious about the landscape generally. A single-law CTA would route only Illinois or only Colorado buyers. The multi-law variant names all four active laws and routes everyone to the `/deadline-checker` selector page. The buyer who knows their state clicks through and finds their product; the buyer who isn't sure uses the checker. No one bounces because their state wasn't named.

---

## Placement Pattern

### Position 1: After the penalty section (mandatory)

Every blog post covering a specific law has a penalty section. The moment the reader learns "$70,000 per aggrieved person," they are at peak purchase motivation. The CTA component goes IMMEDIATELY after the penalty section ends — before the next H2.

**Implementation:** In the blog MDX renderer (`src/lib/mdx-to-jsx.tsx`), detect when a heading containing the word "Penalt" or "Enforcement" is followed by paragraph content, and inject the CTA after the next paragraph block.

Alternative: Add a frontmatter field `productCta` to each blog post specifying the product slug and position trigger. The renderer looks for the marker and injects the CTA component.

**Recommended approach (simpler, no regex logic):** Add a custom MDX marker:
```
[PRODUCT_CTA:illinois-hb3773]
```
The renderer replaces this marker with the `<BlogProductCTA>` component, populated from `regulations.ts` for the given slug. Authors (or the next Claude Code instance updating blog posts) insert this marker at the appropriate location in each post's MDX body.

### Position 2: Before the closing "Where to Start" section (mandatory)

The closing section of every post is action-oriented. The CTA placed just BEFORE the final H2 catches readers who skimmed past the penalty section — they've now read the full article and are ready to act.

**Implementation:** Same marker pattern: `[PRODUCT_CTA:illinois-hb3773]` placed one blank line before the final `## Where to Start` or `## What To Do` heading.

### Position 3: Inline link in body text (existing pattern — maintain and increase frequency)

The current internal linking rule (BLOG-STYLE-GUIDE.md Section 8) specifies linking to product pages where the reader is already thinking about a specific need. The Colorado post has one such link. This must become a **minimum of 3 contextual inline links per post** for any post covering a law with an available product.

**Placement targets:**
1. First mention of the law's name in the body
2. First mention of a specific document type required by the law (e.g., "impact assessment" → link to the impact assessment product)
3. Inside the "Where to Start" closing section — the final link

---

## CTA Copy by Product

These are pre-written CTA components ready to inject. Each matches the voice pattern (Realist heading, Credentialist body, Realist close with specific action).

### Illinois HB3773
```
heading: "HB3773 is in effect. Get your compliance documents."
body: "Illinois requires employee notices, an AI system inventory, and an impact assessment framework. This 7-document package is built from the enacted text of Public Act 103-0804."
ctaText: "Get the Illinois HB3773 Package"
ctaHref: "/products/illinois-hb3773"
price: "$449, instant download"
lawName: "IN EFFECT — January 1, 2026"
```

### Colorado SB 24-205
```
heading: "Colorado's deadline is June 30, 2026."
body: "Deployers of high-risk AI systems need a risk management program, consumer notices, and annual impact assessments in place before June 30. This 8-document package is built from the enacted statute."
ctaText: "Get the Colorado SB 24-205 Package"
ctaHref: "/products/colorado-sb24-205"
price: "$449, instant download"
lawName: "EFFECTIVE JUNE 30, 2026"
```

### NYC Local Law 144
```
heading: "NYC Local Law 144 is active. Bias audit documentation is required."
body: "If you hire in New York City and use automated screening tools, you need an annual bias audit and public summary. This 7-document package covers the full Local Law 144 requirement."
ctaText: "Get the NYC Local Law 144 Package"
ctaHref: "/products/nyc-local-law-144"
price: "$399, instant download"
lawName: "IN EFFECT — July 5, 2023"
```

### Texas TRAIGA
```
heading: "Texas TRAIGA took effect January 1, 2026."
body: "Civil penalties up to $200,000 per violation for deployers of high-risk AI systems. This package covers the documentation TRAIGA requires before enforcement catches up."
ctaText: "Get the Texas TRAIGA Package"
ctaHref: "/products/texas-traiga"
price: "$449, instant download"
lawName: "IN EFFECT — January 1, 2026"
```

---

## Posts That Need CTAs Injected First (Priority Order)

Based on GSC impressions data:

1. `eeoc-ai-guidance-removed-federal-vacuum-2026` — 1,833 impressions, 0.11% CTR — no product CTA visible. Covers Illinois, Colorado, Texas, NYC. Should get 3 CTAs (one per law covered).
2. `colorado-sb-24-205-ai-law-what-businesses-need-to-know` — 855 impressions, 1 CTA. Add 2 more.
3. `illinois-hb3773-ai-employment-law-what-employers-need` — employer-intent article. Should have 2–3 CTAs minimum.
4. `hiring-software-uses-ai-employment-law-compliance` — buyer-intent title, likely high impression potential. Needs Illinois + NYC CTAs.
5. `ai-compliance-penalties-by-state` — the penalty comparison post covers all major laws. Each law section should end with a product CTA.

---

## What This Does NOT Change

- The blog's informational value — posts remain fully informative without the CTAs
- The legal disclaimer component (auto-injected at page level)
- The `externalReferences` bibliography strip
- Post structure or voice
- The three-column layout

## What This Changes

- Every blog post covering a law with an available product gets 2 CTA injections + 3 inline links minimum
- The MDX body gains a `[PRODUCT_CTA:slug]` marker syntax
- The renderer gains a handler for this marker
- 5 priority posts are updated immediately; remaining 21 posts follow

---

## Why Not a Newsletter Capture?

The brief explicitly prohibits "blog → newsletter capture as the primary CTA." Beyond the rule: the buyer who clicks through from a penalty-section CTA is a purchase-intent buyer. Sending them to a newsletter sacrifices a conversion for a lead that is structurally weaker. The product purchase IS the lead generation — once they buy, they're in the system.
