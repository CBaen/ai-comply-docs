# Blog CTA Pattern — Contestant 5 (v2 — new marketing voice)

*v1 preserved at `blog-cta-pattern-v1.md`. v1 established the three-placement structure (penalty section / requirement list / closing action). v2 rewrites the CTA component copy in the new Calm Hardware Store voice and adds the blog title/meta rewrite spec that the Proxy identified as missing.*

---

## What doesn't change from v1

- Three placements per post (minimum 3 product links per 1,500-word post)
- Placement timing: after penalties, after requirement list, at closing action section
- Per-post link table (same mapping of posts to product slugs)
- Anchor text rules (specific and descriptive, not "click here")
- Frequency floor: 3 links minimum per post

## What changes from v1

The CTA copy itself. v1 wrote CTAs in the Pragmatic Realist voice because that was the only voice on the site. v2 applies the new Calm Hardware Store marketing voice — short, offer-forward, no explanation. The Realist/Credentialist voice stays in the surrounding blog body. The CTA component is a different surface: it's marketing, not journalism.

---

## The Three Placements — New Voice Copy

### Placement 1: After the penalty section

**v1 copy (Pragmatic Realist — correct for the blog body, wrong for the CTA):**
> "If those numbers give you pause, [the Illinois HB3773 compliance package](/products/illinois-hb3773) includes every document the statute requires — $449, instant download."

**v2 copy (new marketing voice):**

```
The law requires these documents. We have them.
[Illinois HB3773 Compliance Package — $449, instant download →](/products/illinois-hb3773)
```

Two lines. First line states the situation. Second line is the offer. No transitional softening ("if those numbers give you pause"). The buyer who just read the penalty tiers doesn't need a conditional — they need the link.

**Colorado variant:**
```
These are the documents Colorado requires. Built from the statute. $449.
[Get the Colorado SB 24-205 Compliance Package →](/products/colorado-sb24-205)
```

**NYC variant:**
```
Local Law 144 requires an annual bias audit and candidate notice. Here they are.
[NYC Local Law 144 Compliance Package — $399 →](/products/nyc-local-law-144)
```

---

### Placement 2: After the requirement list

**v1 copy:**
> "Our [Colorado SB 24-205 compliance package](/products/colorado-sb24-205) includes all three, built from the statutory text at [C.R.S. § 6-1-1703](https://leg.colorado.gov/bills/sb24-205)."

**v2 copy:**

```
[Colorado SB 24-205 Compliance Package](/products/colorado-sb24-205) — all of the above. $449, instant download.
```

One line. The preceding text already listed what the law requires. The CTA line says: we have all of that. Price. Delivery. Done. The statute citation for the requirement list stays in the body text above — it doesn't need to be repeated in the CTA.

**Illinois variant:**
```
[Illinois HB3773 Compliance Package](/products/illinois-hb3773) — every document the statute requires. $449.
```

---

### Placement 3: Closing action section (styled CTA block)

This is a standalone block rendered at the end of the blog post's "Where to Start" section. It is NOT a paragraph of prose — it is a visually distinct component using the site's existing `bg-blue-50 border-blue-200` card pattern.

**v1 copy (Pragmatic Realist — 3 sentences of context before the link):**
> "If you use AI in hiring and you have employees in Illinois, you need three things in place right now: an employee AI notice, an AI system inventory, and a documented zip-code-proxy review. These are not optional best practices — they are the statutory requirements of [775 ILCS 5/2-102(L)]. [Get the Illinois HB3773 Compliance Package — $449, instant download →]"

**v2 copy (new marketing voice — the context lives in the blog body above; the CTA block is offer-only):**

```
[STYLED BLOCK — bg-blue-50, border-blue-200, padding 24px]

Illinois HB3773 is in effect.
The documents the law requires are here.

[Get the Illinois HB3773 Compliance Package — $449 →]  ← Signal Blue button

Questions before purchasing? info@aicompliancedocuments.com
```

**Colorado variant:**
```
[STYLED BLOCK]

Colorado SB 24-205: June 30, 2026.
These documents satisfy the law's deployer requirements.

[Get the Colorado SB 24-205 Compliance Package — $449 →]
```

**Multi-state variant (for posts covering multiple laws, e.g., the EEOC post):**
```
[STYLED BLOCK]

Your state has an AI law. We built the documents that comply with it.

[Illinois HB3773 — $449 →]    [NYC Local Law 144 — $399 →]    [Colorado SB 24-205 — $449 →]

Not sure which one applies to you? [Find your state's deadline →](/compliance-deadline-by-state)
```

**Why the block strips context:** The closing section of the blog post has already done the explaining. The Realist/Credentialist voice has walked the reader through the law, the requirements, the stakes. By the time they reach the closing section, the buyer doesn't need more context — they need the offer, clean and unobstructed. The styled block is a visual break that signals: "this is different, this is action." A wall of Realist prose followed by a link buried in it loses the buyer. A clean styled block with two lines and a button catches them.

---

## Blog Title/Meta Rewrites (new in v2 — addressing the Proxy gap)

The Proxy identified that v1 fixed product page titles but left blog post titles unchanged. Blog post titles drive SERP CTR. The EEOC post's 0.11% CTR at position 4.16 is the most visible symptom.

New voice rule for blog title/meta: **state the problem AND point toward resolution**. Current titles name the informational event ("EEOC Removes AI Guidance"). New titles name who is affected and what they should do ("EEOC Removed AI Hiring Guidance. Illinois, NYC, and Colorado Filled the Gap.").

This is not the Realist voice — it's the new marketing voice applied to SERP copy: declarative, outcome-adjacent, audience-specific.

### Priority title/meta rewrites

**Post: `eeoc-ai-guidance-removed-federal-vacuum-2026`**

Current title (verified by reading actual MDX frontmatter):
"The Federal Government Quietly Removed Its AI Hiring Guidance. Four States Are Writing Their Own."

Assessment: this title is already buyer-signal adjacent — it names the event (guidance removed) and the consequence (states writing their own). The journalistic "quietly" is the one word to drop. The word "Writing" undersells — they've already written them: Illinois, NYC, Colorado, Texas are in effect now. The new title sharpens the consequence and names the audience:

New title:
```
The Federal Government Removed AI Hiring Guidance. Four States Wrote Their Own Laws.
```
(83 chars — within Google's title display range)

Buyer-intent improvement: the original "Four States Are Writing" implies a future state. "Wrote Their Own Laws" confirms completed legislation with present enforcement. A buyer searching "do I need AI hiring compliance" sees this and understands: the laws exist, they apply now.

New meta (150 chars):
```
No federal AI hiring standard. Illinois HB3773 in effect. NYC Local Law 144 in effect. Colorado: June 30, 2026. Get your state's compliance documents.
```
(150 chars — at limit, no trim needed)

**Mid-article bridge — EEOC post (new, addressing the Proxy's Loop 2 gap):**

The EEOC post's structure (verified by reading the MDX): it covers the EEOC guidance removal first, then transitions to what four states did. The mid-article bridge sits between those two sections — the exact moment the reader has absorbed "the federal manual is gone" and is ready to receive "here's what replaced it."

Bridge copy — new marketing voice:
```
Here's what replaced it.

[Illinois HB3773 — in effect →](/products/illinois-hb3773)
[NYC Local Law 144 — in effect →](/products/nyc-local-law-144)
[Colorado SB 24-205 — June 30, 2026 →](/products/colorado-sb24-205)
```

Three words. Three links. "Here's what replaced it" is the exact thesis of the post — the EEOC guidance is gone, state laws filled the gap — applied as a product bridge. The reader who just processed the removal section is primed for this: they're in the "now what?" mental state. The three links answer that in one line each. No explanation needed — the blog body above has already done the explaining.

**Placement in the post structure:** After the section covering the EEOC guidance removal (the deepDive / main body section about what the EEOC removed), before the section covering what each state law says. The bridge is a horizontal rule break (`---`) followed by the styled block, followed by the state law section heading. It is not embedded in prose — it is a visual break between the problem section and the solution section of the post.

**Why "Here's what replaced it" and not something longer:** The Proxy's proposed candidate is exactly right because it mirrors the post's structural logic. The reader's question after absorbing the EEOC removal section is "so what do I do instead?" The bridge answers that question in three words and then presents the answer as three product links. Longer copy would re-explain something the post is about to explain in the next section. Three words + three links is the minimum viable bridge.

**Post: `ai-compliance-cost-small-business-2026`** ← PRIORITY REORDER: title/meta before CTA

Current title (verified by reading actual MDX frontmatter):
"What Does AI Compliance Actually Cost a Small Business in 2026?"

Assessment: generic. No state named, no penalty anchored, no specific buyer type. With 479 impressions, the post is being found — but the title doesn't signal to the right buyer that this is their page. A buyer searching "Colorado AI compliance cost" or "Illinois AI law cost small business" sees this title and may not click because it reads as an industry overview, not a state-specific answer to their situation.

The Proxy is right: title/meta work comes before CTA work here. A buyer who doesn't click through never sees the CTA.

New title (state-specific + cost-explicit):
```
AI Compliance Cost for Small Business: Colorado, Illinois, NYC, Texas — Real Numbers
```
(82 chars)

This title does four things the current one doesn't: names the specific states buyers are searching with, signals "real numbers" vs. vague guidance, keeps "small business" as the audience qualifier, and removes the year from the title (2026 dates the title; "real numbers" is durable).

Alternative (if a single-state title converts better for the highest-traffic state):
```
Colorado AI Compliance Cost: What SB 24-205 Actually Costs a Small Business
```

New meta (160 chars):
```
Law firm quotes, bias audit prices, and statute-verified templates from $49. AI compliance cost for Colorado, Illinois, NYC, and Texas — the honest breakdown.
```
(158 chars)

**CTA placement for cost post (after title/meta):** The post's structure covers law firm → platform → bias audit → templates in cost tiers. The closing CTA should anchor to the template option as the lowest-cost compliant path. Closing block:

```
[STYLED BLOCK]

The lowest-cost path to compliance: statute-verified documents from $49.
No law firm. No subscription. Instant download.

[Find My State's Compliance Package →](/compliance-deadline-by-state)
```

This is the one post where the closing CTA routes to `/compliance-deadline-by-state` rather than a specific product, because the post's entire thesis is that different buyers need different cost options. The routing page lets the buyer find their specific state after reading the cost breakdown.

---

**Post: `colorado-ai-law-91-days-deadline-requirements`**

Current title (verified): "Colorado's AI Law Takes Effect June 30, 2026. Here's What It Requires."

Assessment: already close to the new voice. One adjustment — replace "Here's What It Requires" (law-centered) with buyer-centered framing:

New title:
```
Colorado AI Law: June 30, 2026 Deadline. What Your Business Must Have Ready.
```

New meta (current description verified from frontmatter — it already ends with a product offer):
```
Colorado SB 24-205 takes effect June 30, 2026. Risk program, impact assessment, consumer notices required. Get statute-verified documents — $449, instant download.
```
(162 chars — trim: drop "instant" → "Get statute-verified documents — $449 download.")

Final meta (160 chars):
```
Colorado SB 24-205: June 30, 2026. Risk program, impact assessment, consumer notices required. Statute-verified documents — $449, instant download.
```
(148 chars)

**Post: `illinois-hb3773-ai-employment-law-what-employers-need`**

Current title (verified): "Illinois HB3773 Is Live. If You Use AI in Hiring, Here's What the Law Actually Says."

Voice update — "Is Live" → "Is in Effect" (more precise), "What the Law Actually Says" → "What You Need" (buyer-facing):

New title:
```
Illinois HB3773 Is in Effect. If You Use AI in Hiring, Here's What You Need.
```

**Post: `hiring-software-uses-ai-employment-law-compliance`**

High buyer intent — employers who don't realize their ATS uses AI. New title:

```
Your Hiring Software Uses AI. Here's What Illinois and NYC Require From You.
```

New meta:
```
ATS and HR software use AI by default. If you hire in Illinois or NYC, you have compliance obligations now. Get the documents — starting at $399, instant download.
```
(162 chars — trim 2 chars)

**Post: `what-is-ai-bias-audit-does-your-business-need-one`**

Currently informational. Buyer-signal adjustment — adds NYC specificity to the title:

New title:
```
AI Bias Audit: Does Your Business Need One? (NYC Says Yes If You Hire There.)
```

---

## Implementation notes for a build instance

1. Blog post title/meta changes are in the MDX frontmatter (`title`, `description` fields). No structural changes to post bodies required beyond adding the three CTA placements.
2. The styled CTA block (Placement 3) can be a reusable MDX component — call it `<ProductCTA>` with props `slug`, `price`, `lawName`, and optionally `deadline`. The component renders the `bg-blue-50` styled block with a Signal Blue button linking to `/products/{slug}`. This matches what Contestant 2 proposed as `BlogProductCTA` — independent convergence validates the component approach.
3. **Priority order for the 5 highest-traffic posts (GSC-verified impression counts):**
   - Post 1: `eeoc-ai-guidance-removed-federal-vacuum-2026` — 1,833 impressions. Do: title/meta rewrite + mid-article "Here's what replaced it" bridge + closing multi-state CTA block. The bridge is the highest-leverage single insertion on the site.
   - Post 2: `ai-compliance-penalties-by-state` — 1,165 impressions. Do: title/meta rewrite + one penalty-section CTA per state section. No mid-article bridge needed — the post is already organized as state sections, so each section gets its own Placement 1 link.
   - Post 3: `colorado-ai-law-91-days-deadline-requirements` — 855 impressions. Do: title/meta rewrite (deadline proximity makes this the fastest click-to-purchase path) + all three CTA placements.
   - Post 4: `ai-compliance-cost-small-business-2026` — 479 impressions. **Title/meta rewrite first, before CTA work.** Current title is generic (no state, no penalty). New title adds state specificity. Only after the title rewrite are CTA placements likely to matter — a post that doesn't get clicked doesn't need a better CTA.
   - Post 5: `illinois-hb3773-ai-employment-law-what-employers-need` — impression count not separately given but ranked 5th in priority. Do: title/meta rewrite + all three CTA placements.
4. Do not change the blog post body voice — the Realist/Credentialist pattern stays in the body. Only the CTA block copy and the title/meta are in the new marketing voice.
5. The EEOC post mid-article bridge is a special case — it is NOT a `<ProductCTA>` component. It is three plain inline links ("Here's what replaced it. [IL] [NYC] [CO]") rendered as a paragraph break between the EEOC removal section and the state law section. The styled block component is for closing CTAs only; the mid-article bridge is deliberately minimal so it reads as a natural transition, not a commercial break.
