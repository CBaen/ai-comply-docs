# Information Architecture Proposal — Contestant 3

## The Structural Problem

The current site is built like a research resource that also sells things. The blog is the most visible content type. The nav puts "Blog" alongside "Products" at equal weight. The homepage hero is a product carousel — visual-first, requires scanning before comprehension. The methodology section ("How We Build Our Templates") is the third section from the top, which means the first thing a buyer reads after the carousel is a process explanation.

A compliance store has a different structure: the thing you need is at the front. How we make it is at the back. The research resource (blog) is a wing off the main store, not the front window.

---

## Navigation — Current vs. Proposed

**Current nav:**
```
Home | Products | Blog | FAQ | About
```

**Proposed nav:**
```
Find Your Documents | All Packages | Resources | About
```

**Changes and rationale:**

- "Find Your Documents" replaces "Home" as the first nav item (it IS home, but named for what the buyer is here to do). This is the primary buyer task expressed as navigation. It goes to the homepage.
- "All Packages" replaces "Products" — "products" is a store's internal vocabulary; "all packages" is what a buyer says. Slightly more specific about what's there.
- "Resources" replaces "Blog" — this is a demotion and a reframe. The blog becomes one item under a "Resources" dropdown (along with the `/compliance-deadline-tracker` hub and FAQ). Blog is still accessible, still indexed, still fully present — it just no longer implies the site is primarily an information resource.
- "FAQ" absorbed into "Resources" dropdown. It was a standalone nav item for content that belongs inside a help hub.
- "About" stays — it's the trust-building page and buyers occasionally need it.

**Mobile nav:** Same hierarchy. "Find Your Documents" is the dominant tap target. Resources is a collapsed accordion on mobile, not a top-level item.

---

## Homepage Section Order — Current vs. Proposed

**Current order:**
1. Hero (product carousel, screen-reader-only H1)
2. FeaturedInBar
3. Methodology ("How We Build Our Templates")
4. "How It Works" (3-step process)
5. Lifestyle image break
6. Pain section ("What happens if you don't comply?")
7. Lifestyle image break
8. FAQ
9. Final CTA

**Proposed order:**
1. Hero (urgency text + 3-row product selector — see visual-direction.md)
2. Urgency band (active deadline summary — 3 states, 3 status badges, 3 product links)
3. Pain section ("The AG doesn't need to find you proactively. One complaint does it.")
4. Product selector (full — replaces carousel; organized by urgency)
5. Trust / Methodology ("Why our documents are built from statute, not summaries")
6. "How It Works" (3 steps — comes AFTER the buyer understands what they're getting and why)
7. FAQ (buyers who reach FAQ are still considering — catch them here before they bounce)
8. Final CTA

**Section-by-section justification:**

**Section 1 — Hero (urgency text + product selector):** The buyer needs to know in 5 seconds whether this site is for them and what to do next. The new hero does that: urgency eyebrow names the deadline, H1 names the situation, product selector gives the three most urgent paths. No scanning required.

**Section 2 — Urgency band (new):** A dark-background strip immediately below the hero. Three law name + status pairs. Serves buyers who didn't see their state in the hero but are looking for confirmation they're covered. This is a navigation-assist element, not a content section — it should be compact (60px height on desktop, 3 columns).

**Section 3 — Pain section (moved up from position 6):** Currently the penalty section is the SIXTH thing a buyer reads. That's after the methodology explanation and the "How It Works" tutorial. The penalties are the motivator — they should come before the process explanation, not after. Moving the pain section to position 3 makes the purchase decision structurally earlier. The buyer understands the cost of inaction before they understand the solution.

**Section 4 — Product selector (full):** After reading the urgency band and the pain section, the buyer is ready to find their specific product. The full product list (currently in a carousel) becomes a simple, scannable grid organized by urgency (IN EFFECT first, then DEADLINE, then PROPOSED). Each product card follows the new card pattern from visual-direction.md.

**Section 5 — Trust / Methodology (moved down from position 3):** "How We Build Our Templates" is genuinely important trust content — but it serves a buyer who has already decided to stay, not a buyer who is still scanning. Moving it to position 5 lets it do its actual job: converting a motivated buyer who wants to know if the documents are trustworthy. In position 3, it was stopping buyers who hadn't yet decided to engage.

**Section 6 — How It Works:** Three steps. Comes after the buyer understands the stakes (pain section) and has identified their product (product selector). At this point the question is "how does this work" — so the step tutorial is correctly placed.

**Section 7 — FAQ:** Buyers who scroll to FAQ are still on the fence. This is the last catch before they bounce. The existing FAQ answers are good — no content change needed, just correct placement.

**Section 8 — Final CTA:** Same as current but copy tightened in new voice.

---

## The `/compliance-deadline-tracker` Hub — IA Integration

This page (proposed in new-page-spec.md) becomes the core of the "Resources" nav dropdown:

```
Resources
├── Compliance Deadline Tracker (hub page — /compliance-deadline-tracker)
├── Blog (all posts — /blog)
├── FAQ (/faq)
└── About (/about)
```

The hub page serves buyers who aren't sure which law applies to them. It's the first item under Resources because it answers the most common pre-purchase question ("which of these laws do I need to worry about?"). It routes to product pages via per-law "Get Documents" links.

**Integration with homepage:** The urgency band (Section 2, proposed above) links to the hub page: "Not sure which law applies? See all active deadlines →"

---

## Blog Demotion — What This Means in Practice

The blog is not removed. Its content is not changed. Its URLs do not change (no redirects needed). What changes:

1. Blog is no longer in the primary nav (moves to Resources dropdown)
2. Blog is not featured on the homepage (the blog grid is removed)
3. Blog posts gain stronger internal links to product pages (per blog-cta-pattern.md)
4. Blog meta descriptions are updated to signal "read this, then buy your documents" rather than "read this to understand the law"

The blog still performs its primary SEO function: attract readers who search law-specific informational queries, build authority with statute-cited content, route readers to product pages. The demotion is visual and navigational — not editorial.

**What the blog promotion was doing wrong:** Featuring the blog on the homepage told buyers "this is where you read about AI compliance" before they had a chance to ask "is this where I buy my compliance documents?" The visual hierarchy communicated research resource before compliance store.

---

## Product Page IA — Section Order

One structural change to product pages that wasn't in Round 1:

**Current:** Penalty section is the NINTH content element on the product page (after: hero, stats bar, "Does This Apply to You?", IDHR note, lifestyle image, "What's Included", "Preview Your Documents", "See Inside Your Documents").

**Proposed:** Penalty section moves to immediately after "Does This Apply to You?" — position 4 instead of position 9. The buyer just confirmed they're covered. The next question is "what happens if I don't fix this?" — that's the penalty section. THEN "What's Included" answers "what do I buy to fix it?"

Rationale: Penalties are the motivation. Documents are the solution. Show the problem before the solution, not after the buyer has already scrolled through the solution list.

---

## What Does NOT Change in the IA

- URL structure: no slug changes anywhere. All existing URLs stay.
- Blog post structure: unchanged (BLOG-STYLE-GUIDE governs that surface).
- Product page URL routing: `/products/[slug]` stays.
- Footer structure: stays.
- About page: stays.
- FAQ content: stays (only moves in nav).

---

*IA changes are implementable as: (1) nav component update, (2) homepage section reorder, (3) blog page.tsx removing blog grid from homepage, (4) product page section reorder. No new routes except `/compliance-deadline-tracker` (specced in new-page-spec.md). No database changes. No routing changes.*
