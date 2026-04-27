# IA Proposal — Contestant 2

## The Current IA Problem

The current navigation: **Home / Products / Blog / FAQ / About**

Blog sits next to Products with equal visual weight. The homepage has 8 sections, most of which explain what AI compliance is and how the documents are built. The visual structure signals: "explore, learn, maybe buy." That is the wrong journey for the buyer the brief describes.

The current homepage section order:
1. Hero (product carousel — browse signal)
2. FeaturedInBar
3. Methodology ("How We Build Our Templates")
4. How It Works (3 steps)
5. Lifestyle image
6. Pain/penalty section
7. Lifestyle image
8. FAQ (9 questions)
9. Final CTA
10. Footer

8 sections of content before the buyer can buy anything they haven't already seen in the carousel. The methodology section is section 3. The penalty section is section 6. The purchase CTA is section 9. This is a research-resource layout.

---

## New Nav Order

**Primary nav (left to right):**
```
Get Your Documents  |  Find My State  |  Resources  |  About
```

### Rationale for each nav item:

**"Get Your Documents"** — replaces "Products." Products is a word from a SaaS catalog. "Get Your Documents" is a task. A buyer who just found out they have a Colorado deadline reads "Get Your Documents" and knows this is the right place. Links to `/products` (unchanged route) or the new state-selector landing page.

**"Find My State"** — NEW primary nav entry. Links to `/compliance-deadline-by-state`. The top pre-purchase anxiety is "does this apply to me?" — this nav item names that question and answers it. It's also the most likely organic search entry point for multi-state buyers. Putting it in the nav (currently there's no such entry) gives it navigational authority that helps it rank.

**"Resources"** — absorbs Blog, FAQ, and any educational content. Blog is not removed. It's demoted one level so the buyer's first impression is "store," not "news site." Dropdown under Resources: Latest Articles | Compliance FAQ | About Our Methodology.

**"About"** — stays. Moves to the end, where it belongs on a store.

### Mobile nav

Same order. "Get Your Documents" is the first tap. On mobile, collapse Resources into a single tap.

---

## New Homepage Section Order

**Section 1: Hero (deadline-board format)**

Content: Eyebrow line → H1 → Sub-H1 → CTA → Price signal → Trust strip.
Right column (desktop): Deadline sidebar (4–5 law cards with status pills).

Replaces: current hero carousel.

**Why first:** The buyer needs to confirm in 5 seconds that this site solves their problem. The deadline sidebar does that instantly — they see their state's law with a red "IN EFFECT" or amber "JUNE 30" badge and know they're in the right place.

**What moves:** The product carousel moves to Section 3. The hero is no longer a browse surface — it's a confirmation surface.

---

**Section 2: Find Your State (3-column state selector)**

Content: "Which state are you in?" — 5 clickable state cards (CO / TX / IL / NYC / CA) with the law name, deadline, and product price. One "Multi-State" card. No copy explaining what AI compliance is.

Replaces: FeaturedInBar + the current methodology section (which moves to About).

**Why second:** The buyer confirmed they're in the right place (Section 1). Now they need to find their product. This section removes 3–4 clicks from the conversion path. Instead of: Home → Products → scroll → find state → click — the buyer is: Home → see their state → click.

**Implementation:** This can use the existing `regulations.ts` data. 6 cards (5 states + multi-state), each showing: state name, law name, deadline, price, "Get Documents →" button. No carousel — static grid `grid-cols-2 md:grid-cols-3`.

---

**Section 3: Featured Products (replaces carousel)**

Content: The 4 highest-urgency products as static cards using the new product card pattern (see visual-direction.md). Cards show: law name, deadline, document count, price, "Get These Documents" button.

Why third: Buyers who didn't find their state in the selector (edge cases, unfamiliar with state laws) get a product grid here. This also gives context for multi-state buyers who want to see the full range.

**What moves:** The carousel is removed from Section 1 and replaced by static cards here. Static cards rank better for Google product snippets. Carousels don't produce indexable content.

---

**Section 4: Why These Documents (trust, compressed)**

Content: 3 short statements, not 4 icon cards. Max 2 lines each.

```
Built from the enacted statute. Not a summary — the actual law.
Every penalty, every deadline, every section number verified.
Your attorney reviews these. We handle the research.
```

Replaces: current 4-card methodology block.

**Why fourth:** The buyer has seen the product. They need a trust check before clicking buy. But it should be fast — 3 statements, not an educational explainer. Move the full methodology to About.

---

**Section 5: Penalty Reality Check**

Content: The current pain section, compressed. Lead with the hardest number (Texas: up to $200,000 per uncurable violation). Follow with 3 state cards, each with one-line penalty statement and citation.

**Why fifth:** Penalty information reinforces urgency for buyers who reached Section 4 without clicking. It's not the lead — the product is the lead — but it serves the buyer who is hesitating. Current placement as Section 6 is too late; moving to Section 5 brings it before FAQ.

---

**Section 6: 4 Inline FAQs (replaces 9-question accordion)**

Content: 4 inline Q/A pairs, not accordions. No "Frequently Asked Questions" header. Just: question in bold, answer in 2 sentences below it.

```
Does this apply to my size of business?
No size exemption. NYC Local Law 144, Texas TRAIGA, and Illinois HB3773 all apply regardless of employee count.

What do I get when I buy?
A package of statute-sourced documents — between 3 and 8 depending on the law. Instant download as PDFs your attorney can review.

Is this legal advice?
No. These are templates drafted from enacted statute text. Your attorney verifies they apply to your situation.

What if I need multiple states?
The multi-state package covers 15+ jurisdictions in one purchase. Or buy individual state packages — no overlap in what's required.
```

**Why sixth:** Short, direct, voice-consistent. Addresses the 4 questions that block conversion without the research-resource texture of a 9-item accordion. The full FAQ lives at `/faq`.

---

**Section 7: Final CTA**

Content: Dark navy background (keep current `bg-slate-900`). H2 in new voice. Single CTA button. Email contact below.

**Revised H2 (new voice):** "Your compliance deadline doesn't move. Neither do we."

**Why seventh:** Closing urgency. Same position as today. Keep it — it works.

---

**What's removed from the homepage:**

- Lifestyle images (two stock photo breaks currently in the page). These are filler that add scroll distance without adding information. Remove both.
- The "How It Works" 3-step section. Move to the product page under the document list ("What happens after you buy"). It's product information, not homepage information.
- FeaturedInBar (the icons/logos bar). Move to the footer or remove. If the featured-in press is not verifiable, remove.

---

## Blog Demotion

**Blog stays.** Blog content is the primary organic traffic driver and the source of AI Overview citation potential. Do not remove or noindex.

**Blog moves to "Resources" in nav.** Not featured on the homepage. Link to latest 3 posts in a small "Recent Guides" section in the footer.

**Blog internal IA:** Each blog post gets the new `BlogProductCTA` component (3 placements as specified in v1 and updated in v2). The blog is the research surface; the product page is the purchase surface. Internal links connect them.

---

## Integration of `/compliance-deadline-by-state`

This page becomes the destination for "Find My State" in the nav. It also serves as the landing page for:
- The Google Ads "find your state" campaigns
- The Reddit native ad
- Returning visitors from blog posts who need to self-identify which laws apply

The page spec from Round 1 (`new-page-spec.md`) stands. In the new IA, it's promoted from "optional new page" to **primary navigation entry point.**

---

## Route Changes Summary

| Old | New | Change |
|---|---|---|
| `/` — carousel hero, 8 sections | `/` — deadline-board hero, 7 sections | Structure rewrite |
| `/products` — unchanged | `/products` — unchanged | No route change |
| Nav: Products | Nav: "Get Your Documents" | Label change only |
| Nav: Blog | Nav: Resources (dropdown) | Label + promotion change |
| No such page | `/compliance-deadline-by-state` | NEW |
| `/faq` (if exists) | `/faq` — expanded | Accordion content from homepage moves here |
| `/about` | `/about` — expanded with methodology | Methodology content from homepage moves here |

**Total new routes: 1** (`/compliance-deadline-by-state`). Everything else is label + copy changes on existing routes.
