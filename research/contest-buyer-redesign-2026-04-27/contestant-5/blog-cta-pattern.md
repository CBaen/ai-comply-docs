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

Current title: (approximately) "EEOC AI Guidance Removed: Federal Vacuum and What It Means for 2026"

New title:
```
EEOC Removed AI Hiring Guidance. Illinois, NYC, and Colorado Filled the Gap.
```

New meta (160 chars):
```
No federal AI hiring standard. Illinois HB3773: in effect. NYC Local Law 144: in effect. Colorado: June 30, 2026. Get the compliance documents your state requires.
```
(163 chars — trim: "Get the compliance documents your state now requires.")

Final meta:
```
No federal AI hiring standard. Illinois HB3773 in effect. NYC Local Law 144 in effect. Colorado: June 30, 2026. Get your state's compliance documents.
```
(150 chars)

**Post: `colorado-ai-law-91-days-deadline-requirements`**

Current title: "Colorado's AI Law Takes Effect June 30, 2026. Here's What It Requires."

This title is already close to the new voice. One adjustment — add buyer-audience signal:

New title:
```
Colorado AI Law: June 30, 2026 Deadline. What Your Business Must Have Ready.
```

New meta (current is already good — verify against existing frontmatter):
```
Colorado SB 24-205 takes effect June 30, 2026. Risk program, impact assessment, consumer notices required. Get statute-verified documents — $449, instant download.
```
(162 chars — trim 2) "Get statute-verified documents: $449 instant download."

**Post: `illinois-hb3773-ai-employment-law-what-employers-need`**

Current title: "Illinois HB3773 Is Live. If You Use AI in Hiring, Here's What the Law Actually Says."

Good — buyer-audience signal present. Voice update:

New title:
```
Illinois HB3773 Is in Effect. If You Use AI in Hiring, Here's What You Need.
```

Change "Here's What the Law Actually Says" → "Here's What You Need." The current ending is journalistic ("what the law says"). The new ending is buyer-facing ("what you need").

**Post: `hiring-software-uses-ai-employment-law-compliance`**

This post targets employers who may not realize their hiring software uses AI. High buyer intent if it ranks. Title should reflect that:

New title:
```
Your Hiring Software Uses AI. Here's What Illinois and NYC Require From You.
```

New meta:
```
ATS and HR software use AI by default. If you hire in Illinois or NYC, you have compliance obligations now. Get the documents — starting at $399, instant download.
```

**Post: `what-is-ai-bias-audit-does-your-business-need-one`**

Currently informational. Buyer-signal adjustment:

New title:
```
AI Bias Audit: Does Your Business Need One? (NYC Says Yes If You Hire There.)
```

---

## Implementation notes for a build instance

1. Blog post title/meta changes are in the MDX frontmatter (`title`, `description` fields). No structural changes to post bodies required beyond adding the three CTA placements.
2. The styled CTA block (Placement 3) can be a reusable MDX component — call it `<ProductCTA>` with props `slug`, `price`, `lawName`, and optionally `deadline`. The component renders the `bg-blue-50` styled block with a Signal Blue button linking to `/products/{slug}`. This matches what Contestant 2 proposed as `BlogProductCTA` — independent convergence validates the component approach.
3. Apply all three placements to all 26 blog posts that have a corresponding product. Start with the 5 highest-traffic posts (Colorado 91-day, EEOC vacuum, Illinois HB3773, penalties-by-state, hiring software) before the lower-traffic posts.
4. Do not change the blog post body voice — the Realist/Credentialist pattern stays in the body. Only the CTA block copy and the title/meta are in the new marketing voice.
