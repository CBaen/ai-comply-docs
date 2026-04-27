# Information Architecture Proposal — Contestant 5

---

## The Current IA Problem

The existing site architecture is built around content discovery, not product finding:

**Current nav:** Home / Products / Blog / FAQ / About

The "Blog" link appears before FAQ, which is before About. Blog traffic is 1,833 impressions on the top post — by far the site's biggest traffic driver. But it sends people to informational content with near-zero product conversion. The nav reflects what the site has, not what the buyer needs. A buyer who arrives from a "Colorado AI law" search sees "Blog" in the nav and concludes: this is a resource site.

**Current homepage section order:**
1. Hero (carousel, sr-only H1)
2. FeaturedInBar
3. ProductCarousel
4. Methodology section ("How We Build Our Templates")
5. "How It Works" (3-step process)
6. Lifestyle image
7. Pain section ("What Happens If You Don't Comply?")
8. Lifestyle image
9. FAQ
10. Final CTA

This is 10 sections. An information site pattern — it assumes the buyer will scroll through education before deciding. The pain/penalty section is section 7 of 10 — by the time a buyer who arrived with a deadline scrolls there, they've passed four educational sections.

---

## New Nav Order

**Proposed:** Find Your Documents / States / Resources / FAQ / About

| Current label | Proposed label | Route | Notes |
|---|---|---|---|
| Home | (logo click) | `/` | Home link is logo only — buyers don't click "Home" |
| Products | Find Your Documents | `/compliance-deadline-by-state` | Primary entry → routes to state-specific products |
| — | States | `/products` (filtered grid) | Direct product catalog access |
| Blog | Resources | `/blog` | Demoted from primary nav; not removed — it has SEO value |
| FAQ | FAQ | `/#faq` or `/faq` | Keep — addresses real buyer objections |
| About | About | `/about` | Keep, last |

**The single biggest nav change:** "Products" becomes "Find Your Documents" and links to the `/compliance-deadline-by-state` hub page rather than the raw product catalog. A buyer with a specific deadline needs routing, not browsing. "Find Your Documents" as the primary nav CTA makes the site's purpose clear in 3 words.

**"Resources" instead of "Blog":** Blog remains accessible — it has ranking authority and genuine buyer-conversion value if the CTAs are fixed per `blog-cta-pattern.md`. But calling it "Blog" in the primary nav signals "I am a media/information resource." "Resources" signals "I have useful supporting material" — consistent with a solutions provider. The underlying URL structure and content don't change.

---

## New Homepage Section Order (5 sections, down from 10)

### Section 1: Hero (above the fold) — REPLACE

**Current:** Hero carousel with sr-only H1, dark gradient background with landscape photo, FeaturedInBar above it.

**Proposed:**

Two-column layout per `visual-direction.md`. Left column: eyebrow label / H1 / urgency band / primary CTA / trust strip. Right column: single highest-urgency product card (Colorado, June 30 deadline).

**Why first:** The buyer's question entering the site is "do you have what I need?" This section answers it in one viewport.

**What moves out:** FeaturedInBar moves below the hero (below the fold on desktop). The product carousel is eliminated at the homepage level — replaced by the product grid in section 2.

---

### Section 2: Product Grid — MOVE TO SECOND POSITION (currently ProductCarousel in hero)

**Current:** A carousel of 4 featured products embedded in the hero section, requiring navigation to browse.

**Proposed:** A static grid of 6 products, ordered by enforcement urgency (in-effect laws first, effective-soon second), using the new product card design from `visual-direction.md`. No carousel interaction required.

**Why second:** After the hero confirms "yes we have what you need," the buyer's next question is "which one is mine?" The product grid answers this before any educational content. The buyer who knows exactly which state they're in can click directly to the product page from section 2 — this is the fast path.

**Grid ordering:**
1. Illinois HB3773 — IN EFFECT (red badge)
2. NYC Local Law 144 — IN EFFECT (red badge)
3. Texas TRAIGA — IN EFFECT (red badge)
4. Colorado SB 24-205 — EFFECTIVE SOON / June 30, 2026 (amber badge)
5. California CCPA ADMT — IN EFFECT (red badge)
6. Multi-State Bundle — IN EFFECT (covers all)

Below the 6 cards: "Not sure which one you need? [Find your state's deadline →](/compliance-deadline-by-state)"

---

### Section 3: Pain + Statute anchor — KEEP, MOVE EARLIER

**Current position:** Section 7 of 10, after Methodology, How It Works, two lifestyle images.

**Proposed position:** Section 3 of 5.

**Why third:** The buyer who arrived deadline-aware is already anxious. Show them the product (section 2), confirm the stakes (section 3), then resolve with trust (section 4). The current order reverses this — trust before stakes — which is why it reads as educational rather than urgent.

**Section content:** Keep the existing copy ("What Happens If You Don't Comply?") and the three columns (Employee Complaints / State Enforcement / Cost vs. Law Firm). The statute citations stay. The red/amber/slate color coding stays. What changes is position — third, not seventh.

**Specific change to the penalty copy:** Currently "penalties up to $200,000 per violation (Texas TRAIGA, uncurable violations)" — this is the right fact. Add the Colorado per-consumer multiplication fact: "A single non-compliant AI system affecting 1,000 consumers in Colorado creates potential exposure of up to $20 million (C.R.S. § 6-1-112(1)(a), verified against leg.colorado.gov/bills/sb24-205)." [Note: this fact was sourced from the site's own primary-source-verified Colorado blog post and should be retained in statute-citation form.]

---

### Section 4: Methodology + Trust — KEEP, COMPRESSED

**Current:** Full-width "How We Build Our Templates" section with 4 methodology cards.

**Proposed:** Compress to 3 trust signals in a horizontal strip, not a full section. The 4 methodology cards become: `.gov source → verified → instant download`. Single row, 14px text, icon + label format. No separate header ("How We Build Our Templates" as an H2 goes away — the strip is self-explanatory).

**Why compressed:** The methodology section earns trust for buyers who are uncertain about the product's credibility. That's important — but it doesn't need a full homepage section. A strip of 3 verified-process signals handles the trust job in 10 seconds. The full methodology content is better placed on the /about page for buyers who want the deep version.

**What the strip reads:**
```
[check icon] Built from .gov statute text  ·  [check icon] Citations verified against primary source  ·  [lock icon] Instant download via Stripe
```

---

### Section 5: Final CTA — KEEP (shortened)

**Current:** "Don't wait for a complaint" section with a paragraph of copy.

**Proposed:** Same tone, shorter. Two lines maximum:

> The deadline doesn't move because you weren't ready. Get your documents today.

Primary CTA button: "Find My Compliance Documents →" (Signal Blue, same as hero)

**Why last:** Closes the loop for the buyer who scrolled through the full page. The final CTA section should be quieter than the hero, not louder — the buyer has already seen the evidence. One button, one direction, done.

---

## Blog Demotion — Specific Implementation

The blog is NOT removed from the site. It is NOT removed from the nav. What changes:

1. **Nav label changes** from "Blog" to "Resources"
2. **Blog grid removed from homepage** — no more "What's New in AI Compliance" section on the homepage
3. **Blog posts gain urgency-anchored title/meta rewrites** (see below — this addresses the Proxy's specific question about the EEOC post)
4. **Each blog post gets the 3-CTA pattern** from `blog-cta-pattern.md`

### Addressing the Proxy gap — The EEOC post specifically

The Proxy identified that my Round 1 strategy didn't address what happens to the EEOC blog post's 0.11% CTR at position 4.16. Here is the concrete after-state:

**Current title:** "EEOC AI Guidance Removed: Federal Vacuum and What It Means for 2026" (approximately — exact title from blog slug `eeoc-ai-guidance-removed-federal-vacuum-2026`)

**Current meta description:** Approximately: "The EEOC has removed all AI hiring guidance. Three states filled the vacuum with their own laws. Here's what that means for employers in 2026."

**Proposed new title:**
```
EEOC Removed AI Hiring Guidance. Illinois, NYC, and Colorado Filled the Gap. | AI Compliance Documents
```

**Proposed new meta description:**
```
No federal AI hiring standard means state laws control. Illinois HB3773: in effect. NYC Local Law 144: in effect. Colorado SB 24-205: June 30, 2026. Get the compliance documents your state requires.
```

**What this does to the SERP listing:** The current title reads as a news headline — informational, past-tense, about what happened to a federal agency. The proposed title identifies the problem AND names the three states that created new obligations. The meta description ends with an offer ("Get the compliance documents your state requires"). A buyer who searched "do I need AI compliance" or "illinois AI law employer" and sees this SERP result understands: this page knows my situation AND points me toward a solution.

**Does this fix the 0.11% CTR?** Partially. The Proxy is right that AI Overview pressure on informational queries is structural — if Google is answering "what did the EEOC do with AI hiring guidance" completely in-SERP, the fix is not just a title rewrite. But the proposed title is targeting a different query than the current one. "EEOC removed AI guidance" is a news query (AI Overview absorbs it). "Illinois NYC Colorado AI hiring compliance" is a buyer-intent query (AI Overview is less likely to absorb a multi-state compliance readiness query — it's too specific to answer completely in-SERP). This title is an attempt to migrate the post's SERP targeting from the informational query it currently captures toward the buyer-intent query that can convert.

**What happens to the buyer who clicks through:** Under the new blog CTA pattern, this post now has:
- Penalty section inline link to `/products/illinois-hb3773` and `/products/nyc-local-law-144` (two laws cited in this post)
- Requirement list inline links when the post describes what each law requires
- Closing action section CTA block with both products and the state-routing page

The buyer who clicks through a news post about EEOC guidance is problem-aware (they searched for it) but may not know which specific law applies to them. The closing CTA in this post specifically should route to `/compliance-deadline-by-state` — not to a single product — because the post discusses multiple states.

---

## `/compliance-deadline-by-state` Integration

This page (specced in `new-page-spec.md`) is integrated into the IA as:

- **Primary nav destination** under "Find Your Documents"
- **Homepage section 2 sub-link** below the product grid
- **Closing CTA destination** for blog posts that cover multiple states
- **Sidebar link on product pages**: "Not sure this is the right law for you? [See all state deadlines →]"

The page does not compete with product pages — it routes to them. It is the buyer's first stop when they don't know their specific law yet, and it does not consume SEO value from the product pages because its query targets ("which AI laws apply to my business," "AI compliance deadline by state") are different from the product pages' query targets.

---

## What the IA Does NOT Change

- **URL structure** for products (`/products/[slug]`), blog posts (`/blog/[slug]`), and other pages — no redirects needed
- **Product page structure** — the template redesign in `product-page-template.md` handles that
- **Blog post content** — only title/meta and CTA placement change; post bodies stay as the authority-building long-form content they are
- **Footer structure** — footer can remain as-is; it is not a primary buyer navigation surface
