# Information Architecture Proposal — Contestant 4

## The IA Problem

The current site's information architecture is built for a publication, not a store.

**Current nav:** Home / Products / Blog / FAQ / About

The Blog link is in the primary navigation. Visually, it sits at the same level of importance as Products. A buyer arriving for the first time, scanning the nav, gets: "This is a site that has products AND publishes a blog." That's an information resource. A compliance store's nav makes products the primary path and puts everything else subordinate.

**Current homepage section order (8 sections):**
1. Hero (ProductCarousel — rotating, browsing-mode)
2. FeaturedInBar (media logos)
3. Methodology (how we build templates — 4-column icon grid)
4. How It Works (3-step process)
5. [Image break]
6. Pain/Consequences (what happens without compliance)
7. FAQ (9 questions)
8. Final CTA

This is publication architecture — establish credibility, educate the reader, then sell. A compliance store inverts this: establish what's available and why they need it immediately, then earn trust, then close.

---

## New Navigation

### Primary nav (desktop, left to right):

```
[Logo]    Get Your Documents    State Deadlines    About    Resources
                                                            [Email link]
```

**Changes:**

**"Products" → "Get Your Documents"**
This is the core IA change. The destination (the products list page) is unchanged. The nav label shifts from a catalog descriptor ("Products") to a buyer task ("Get Your Documents"). A buyer looking for the Colorado compliance package types "Get Your Documents" faster in their head than "Products."

**New top-level link: "State Deadlines"**
Routes to `/compliance-deadline-by-state`. This is the self-qualification hub page specced in Round 1. It earns a nav slot because it serves the #1 buyer objection (scope confusion — "do I even need this?"). Its presence in the nav signals to the buyer: "this site knows you might not know which law applies; there's a fast path for that." It also captures buyers who arrive ready to self-navigate by state.

**"Blog" → "Resources" (demoted, not removed)**
Blog content is not deleted — it's the site's primary SEO asset. But it moves from a primary nav link to a label that signals "educational support material" rather than "primary destination." Blog posts still receive organic traffic and convert readers via the CTA pattern from Round 1. The visual demotion is the IA change: Resources does not appear at the same visual weight as Get Your Documents or State Deadlines.

**"FAQ" removed from nav**
The FAQ moves onto the homepage (where it already is, at section 7) and is accessible via anchor link. It does not need its own nav slot — it's discovery content, not navigation content. Freeing the nav slot reduces cognitive load.

**Email link (right-aligned, always visible)**
`info@aicompliancedocuments.com` stays in the nav as a right-aligned text link. It's the existing pre-purchase contact path and should remain visible.

### Mobile nav:
```
[Hamburger menu]
  Get Your Documents
  State Deadlines
  Resources
  About
  [Email]
```

Same order. "State Deadlines" appears above "Resources" on mobile because scope confusion is more common on mobile first-visit than on desktop.

---

## New Homepage Section Order (5 sections max)

### Section 1: Hero + Urgency Panel
**Content:** H1, sub-H1, primary CTA, sub-CTA, urgency panel (three-row law/date/penalty summary)
**Why first:** The buyer needs to know within 3 seconds that this site has what they need and that their problem is real. The hero answers both: "Your State Has an AI Law. Here Are the Documents It Requires." + the urgency panel shows the specific laws and penalties.
**Replaces:** The ProductCarousel hero + FeaturedInBar. Both are browsing-mode UI.

### Section 2: Products Grid (by urgency mode)
**Content:** Two subsections — "Already Exposed" (in-force laws with enforcement active) and "Deadline Approaching" (laws with future effective dates). Product cards in the new pattern (status, law name, price, date, CTA button).
**Why second:** After the hero confirms this is the right place, the buyer's next question is "which product do I need?" The products grid answers it immediately. The two-mode organization (Already Exposed / Deadline Approaching) lets buyers self-navigate by their urgency register without reading FAQs.
**Replaces:** The ProductCarousel (which rotates 4 products without context) + the "Browse Products" link that defers to a separate page.

**Subsection A — Already Exposed (in-force, enforcement active):**
- NYC Local Law 144 — IN EFFECT since 2023 — Enforcement Increasing
- Illinois HB3773 — IN EFFECT January 2026
- Texas TRAIGA — IN EFFECT 2026
- California CCPA ADMT — IN EFFECT
- Texas TDPSA — IN EFFECT July 2024
- Virginia CDPA, Connecticut CTDPA, Oregon CPA — IN EFFECT

**Subsection B — Deadline Approaching:**
- Colorado SB 24-205 — June 30, 2026
- [Any other laws with future effective dates]

**Subsection C — Universal / Multi-State:**
- Multi-State Bundle
- AI Governance Framework
- AI System Registry
- Bias Audit Template

### Section 3: Pain/Consequences (compressed — 3 panels, no preamble)
**Content:** Three stat cards — Colorado $20K/violation, Illinois up to $70K/violation, NYC $500–$1,500/day. Each links to the relevant product. No explanatory paragraph before the stats.
**Why third:** After the buyer has seen what's available (Section 2), the consequence section reinforces the purchase decision. Current position (section 6 out of 8) buries the urgency. Moving it to Section 3 keeps the pressure in the first scroll-depth.
**Replaces:** The current "What happens if you don't comply?" section, which is accurate but positioned too late and too wordy.

### Section 4: How It Works (3 steps, compressed)
**Content:** The existing 3-step process (Choose → Pay → Download), compressed to shorter copy. Remove the "10 minutes" qualifier from Step 1 — replace with "Answer 8 questions about your AI systems." Keep Stripe branding.
**Why fourth:** Trust and process explanation belongs after urgency is established and products are visible. A buyer who reaches Section 4 is already considering purchase — they need to know the process is fast and simple, not be convinced the problem is real.
**Replaces:** The current "How It Works" section, moved from position 4 to position 4 (same position in this 5-section redesign, but less prominent after the compressed urgent sections above it).

### Section 5: FAQ (reordered, compressed)
**Content:** 6 questions max. Priority order:
1. What documents do I actually need? (new — added in Round 1)
2. How do I know if this applies to my business?
3. Where do I start if I don't know which law applies?
4. Is this legal advice?
5. How are the documents generated?
6. Do I need this if I already have outside counsel?
**Why fifth:** FAQ at the bottom captures buyers who need more reassurance before purchasing. Keep it, but compress from 9 questions to 6. Remove "What AI regulations do you cover?" (researcher question, not buyer question) and "What if the law changes?" (creates doubt at the wrong moment — belongs on an FAQ page, not the homepage).

**Removed from homepage entirely:**
- Methodology section ("How We Build Our Templates" — 4 column icon grid)
- FeaturedInBar
- Image break sections (3 lifestyle images breaking up content)
- "Are all sales final?" FAQ question

**Where methodology trust signals go instead:** Embedded in the product card ("Built from statute — C.R.S. § 6-1-1701 et seq.") and in the sidebar purchase card on product pages (already present). The methodology is a trust signal, not a sales section.

---

## Blog / Resources Demotion

**Where blog posts live after the redesign:**

1. `/blog/[slug]` routes are unchanged — organic traffic continues
2. Blog index moves from `/blog` to `/resources` as the canonical URL (redirect `/blog` → `/resources`)
3. "Resources" appears in the nav as a single link, not a dropdown
4. The blog grid does NOT appear on the homepage
5. Blog posts retain all existing CTAs (including the enhanced pattern from Round 1/2)
6. The blog index page gets a brief header that contextualizes it: "Plain-language guides to each state's AI law — to help you understand what you owe before you buy the documents."

**Rationale:** The blog is the site's primary SEO driver. Renaming it "Resources" and removing it from homepage prominence does not hurt the organic traffic it receives — search engines index the posts, not the nav label. What it does: it changes the buyer's mental model of the site from "information resource with a store" to "compliance store with a resource library." The store is the primary thing. The resources support the purchase decision.

---

## `/compliance-deadline-by-state` in the IA

**Nav label:** "State Deadlines"
**Route:** `/compliance-deadline-by-state`
**Position in IA:** Top-level navigation (second link after "Get Your Documents")
**Homepage reference:** Sub-CTA "Already past your deadline? Start here. →" links here. Section 2 "State Documents Grid" has a footer link "See all states and deadlines →"

**Why this page earns a nav slot and not just a footer link:**
The scope confusion objection ("do I need this? which law applies to me?") is the most common barrier to purchase. Giving it a nav slot signals: "we anticipated your confusion; there's a fast path." A buyer who can see "State Deadlines" in the nav knows immediately that the site speaks to their primary uncertainty. They click it before they hit the FAQ.

---

## Products Page (`/products`) IA

The existing `/products` page carries forward as the canonical catalog destination, but with two changes:

1. **Section headers:** Products are organized into the same two-mode sections: "Already Exposed" and "Deadline Approaching" — matching the homepage grid so buyers who browse the full catalog get the same urgency framing.

2. **State filter:** A simple filter bar at the top: "Filter by: Colorado | Illinois | NYC | California | Texas | All States." This is not a new component — it's a filter on the existing static page that narrows visible cards. Buyers who know their state don't want to scan 57 products; they want to find their state's item directly.

---

## The July 1, 2026 State of the Site

*(Added in Loop 2. The Proxy asked: what does the site look like when every deadline has passed? The two-mode frame gives a concrete answer.)*

On July 1, 2026, Colorado SB 24-205 flips from `"effective-soon"` to `"in-effect"` (a single field update in `regulations.ts`, committed and deployed). At that point, every major US state AI law in the current catalog is in Already Exposed mode. The site changes in two specific ways:

**The homepage urgency panel becomes all-red.**

Before July 1: two red rows (Illinois, NYC), one amber row (Colorado).
After July 1: all three rows are Enforcement Red. The amber urgency register disappears from the homepage because there are no Deadline Approaching laws with imminent future dates. The panel still shows law names, enforcement statuses, and penalty figures — the urgency is present, just in a different register.

The homepage Section 2 "Products Grid" loses its "Deadline Approaching" subsection header (because no products are in that mode). The full grid becomes a single section: "These laws are in effect. Enforcement is active."

**The meta description updates.**

Before July 1 meta description: "Colorado SB 24-205 deadline: June 30, 2026. Illinois HB3773 is in effect. Get the documents your state's AI law requires..."

After July 1 meta description: "Colorado, Illinois, NYC, California, and Texas AI laws are all in effect. Enforcement is active. Get the compliance documents your state requires. Built from statute. $49–$697. Instant download."

This is a manual update to `page.tsx` metadata, made when Colorado flips. It takes the deadline-specific urgency out of the title and replaces it with the all-exposed signal.

**What this looks like for the buyer:**

A buyer arriving after July 1 who searches "Colorado AI law compliance" finds a site where every surface reads "in effect, enforcement active." The compliance urgency is not a countdown — it is a present-tense statement. "You are currently exposed. Here are the documents." This is not a weaker signal than a countdown; for a buyer who has already missed the deadline, it is a more honest and more actionable signal. There is nothing to wait for. The documents are here.

**The `/compliance-deadline-by-state` page after July 1:**

The page title shifts from "AI Compliance Deadlines by State" to "AI Compliance Laws in Effect by State." The "Deadline Approaching" card section either becomes empty (if no new laws are approaching) or populates with new upcoming laws as they enter the pipeline. The page structure survives unchanged — the urgency mode language in each state card updates automatically when `status` flips in `regulations.ts`.

**The IA frame survives July 1 intact.** The two-mode design was not built around the Colorado countdown — it was built around the distinction between future-deadline urgency and present-exposure urgency. When all laws are in the present-exposure register, the site is a compliance store for buyers who are already exposed, not for buyers who are running out of time. That is still the right product for that buyer. The store does not close when the countdown ends.
