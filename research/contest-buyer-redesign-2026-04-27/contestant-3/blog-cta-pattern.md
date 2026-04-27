# Blog CTA Pattern — Contestant 3

**[Round 2 rewrite — new marketing voice. v1 preserved in blog-cta-pattern-v1.md]**

---

## The Problem in One Number

1 link per 1,500-word post. Colorado post: 855 impressions, 0 clicks. The content is correct. The routing is broken. A buyer reads 1,400 words about Colorado's AI law, reaches maximum motivation at the penalty section, and finds — one link, buried in a sentence. Then they leave.

The fix is not more links everywhere. It is the right copy at the moment of recognition.

---

## Three Buyer Moments in Every Blog Post

**Moment 1 — Qualification:** "Does this apply to me?"
They're reading the applicability section. This is where the first product link belongs — immediately after the criteria that confirm they're covered.

**Moment 2 — Motivation:** "What happens if I don't fix this?"
They just read the penalty section. They know they face up to $70,000 per violation (Illinois) or $20,000 per violation (Colorado). This is maximum motivation. This is where the CTA card goes.

**Moment 3 — Resolution:** "What do I do now?"
They've reached the closing section. They're ready. This is where the end-of-post block gives them the explicit next step.

The current posts serve Moment 1 (excellent applicability explanations) but not Moments 2 or 3. The pattern below fixes that without touching the blog post body copy.

---

## Component 1 — Inline Recognition Links

**Where:** 3–4 inline links per law-specific post, placed at the three buyer moments above plus one in the "what the law requires" section when a document type is named.

**Copy pattern:** Descriptive anchor text naming the specific document or package. Never "click here." Never "our product." Per BLOG-STYLE-GUIDE.md internal linking rules.

**New voice examples:**

At the applicability section:
```
If you're covered, the [Colorado SB 24-205 compliance package](/products/colorado-sb24-205) includes every document the statute requires — built from the enacted law, instant download.
```

When a document type is named:
```
That impact assessment is one of the [8 documents in the Colorado compliance package](/products/colorado-sb24-205).
```

At the penalty section (pre-CTA card):
```
The [Colorado compliance package](/products/colorado-sb24-205) — $449, instant download — is the documentation the AG asks for when a complaint is filed.
```

At closing:
```
The [Colorado SB 24-205 compliance package](/products/colorado-sb24-205): 8 documents, $449, instant download. Answer 10 questions, get your PDFs.
```

---

## Component 2 — Inline CTA Card (new component)

**Placement:** Immediately after the penalties section. This is non-negotiable. The buyer just read the penalty amounts. That is the moment.

**Implementation:** Frontmatter field `productCta: { slug: "colorado-sb24-205" }` read by `src/app/blog/[slug]/page.tsx`, which injects the `<BlogProductCTA>` component after the MDX body's penalties section renders. No changes to the MDX renderer required — follows the same pattern as `deepDive` (frontmatter field → page.tsx injection).

**CTA card copy — Colorado post (new marketing voice):**

```
┌──────────────────────────────────────────────────────────┐
│  Colorado SB 24-205. The documents. $449.                │
│                                                          │
│  8 documents built from C.R.S. § 6-1-1702:              │
│  risk management policy, impact assessment,              │
│  consumer notices, and five more.                        │
│                                                          │
│  Deadline: June 30, 2026. Instant download.              │
│                                                          │
│  [Get Your Colorado Documents — $449]                    │
└──────────────────────────────────────────────────────────┘
```

**CTA card copy — Illinois post:**

```
┌──────────────────────────────────────────────────────────┐
│  Illinois HB3773. The documents. $397.                   │
│                                                          │
│  Employee notices, AI system inventory,                  │
│  impact assessment, human oversight protocol.            │
│  Built from 775 ILCS 5/2-102(L). In effect now.         │
│                                                          │
│  [Get Your Illinois Documents — $397]                    │
└──────────────────────────────────────────────────────────┘
```

**CTA card copy — NYC post:**

```
┌──────────────────────────────────────────────────────────┐
│  NYC Local Law 144. The documents. $399.                 │
│                                                          │
│  Bias audit summary, candidate notification,             │
│  website disclosure, AEDT inventory — 7 documents        │
│  built from NYC Admin. Code § 20-870. Enforcing now.     │
│                                                          │
│  [Get Your NYC Documents — $399]                         │
└──────────────────────────────────────────────────────────┘
```

**Visual:** Document Blue left border (4px), white background, law name in Inter 600 18px, body in Inter 400 14px, CTA button in Document Blue. Same visual register as the Deep Dive sidebar card — familiar to the reader, distinct enough to signal action.

**What the CTA card does NOT say:**
- No "discover," no "unlock," no "explore"
- No "our team of experts"
- No fabricated social proof
- No soft penalty language — statute-exact amounts only
- No "learn more" — the blog post is the learning; the card is the buying

---

## Component 3 — Mobile Sticky Bottom Bar

**Placement:** Fixed bottom strip on mobile. Appears after 60% scroll depth. Stays until the reader leaves.

**Why mobile-specific:** Desktop readers have the sidebar. Mobile readers see collapsed sidebar cards most don't expand. The sticky bar keeps a purchase path visible without interrupting reading.

**Copy (new voice — ultra-short, one line):**

```
Colorado SB 24-205 — $449    [Get Documents]
```

Law name. Price. Action. Three elements. Nothing else fits on a mobile bar and nothing else needs to.

**Implementation:** `useEffect` scroll tracker in blog `page.tsx`. Renders `position: fixed; bottom: 0` when `scrollPercent > 0.6`. Disappears when the user reaches the end-of-post CTA block (no stacking). One component, ~20 lines of code.

---

## Component 4 — End-of-Post Block

**Placement:** Last paragraph of every closing section ("Where to Start" / "What to Do Now").

**Copy pattern (new voice):**

```
The [state] compliance package is $[price]. Instant download. [N] documents — [list 2–3 key docs] — built from [citation]. Answer 10 questions about your business. Your PDFs download immediately.

[Get Your [State] Documents — $[price] →]
```

**Colorado example:**
```
The Colorado compliance package is $449. Instant download. 8 documents — risk management policy, impact assessment, consumer notices — built from C.R.S. § 6-1-1702. Answer 10 questions about your business. Your PDFs download immediately.

[Get Your Colorado Documents — $449 →]
```

**Illinois example:**
```
The Illinois compliance package is $397. Instant download. 5 documents — employee notices, AI system inventory, impact assessment — built from 775 ILCS 5/2-102(L). Answer 10 questions about your business. Your PDFs download immediately.

[Get Your Illinois Documents — $397 →]
```

This is the only end-of-post change needed. The existing BLOG-STYLE-GUIDE already calls for an action-oriented closing section with a clear next step. This makes the next step explicit and links to the purchase.

---

## Priority Application Order

**Tier 1 — apply first (highest traffic, proven buyer intent):**

| Post | Law | Product slug |
|---|---|---|
| colorado-sb-24-205-ai-law-what-businesses-need-to-know | CO | colorado-sb24-205 |
| illinois-hb3773-ai-employment-law-what-employers-need | IL | illinois-hb3773 |
| eeoc-ai-guidance-removed-federal-vacuum-2026 | Multi | multi-state-employer-ai-disclosure |
| what-is-ai-impact-assessment-guide | CO + IL | colorado-sb24-205 / illinois-hb3773 |
| what-is-ai-bias-audit-does-your-business-need-one | NYC | nyc-local-law-144 |

**Tier 2 — apply next:**
hiring-software-uses-ai-employment-law-compliance → IL + NYC
ai-compliance-cost-small-business-2026 → all state packages
california-ccpa-admt-risk-assessment-compliance-2026 → california-ccpa-admt
workday-ai-hiring-lawsuit-employer-liability → IL + NYC

**Tier 3 — remaining 17 posts:** same pattern, mapped by law relevance.

---

## Link Density Target

| | Current | Target |
|---|---|---|
| Inline links per post | 1 | 3–4 |
| CTA card | 0 | 1 (after penalties) |
| Mobile sticky bar | 0 | 1 (60%+ scroll) |
| End-of-post block | 0 | 1 |
| **Total purchase paths per post** | **1** | **6–7** |

**The 400-word rule:** In a law-specific post, no 400-word span should pass without a purchase signal. Not a hard link every 400 words — a purchase signal. That can be an inline link, the CTA card, the mobile bar, or the end-of-post block. Together they ensure the buyer is never more than one scroll away from the product.

---

## What Does Not Change

- Blog post body copy — no rewrites
- The Realist/Credentialist voice in blog bodies — that stays, it's correct for that surface
- `.gov` citation density — stays high, it's the credibility engine
- Three-column layout with Deep Dive and microFacts sidebars
- `externalReferences` bibliography strip
- Legal disclaimer (auto-rendered by page.tsx)

---

*Research basis: GSC leakage data (Colorado post 855 impressions / 0 clicks / 1 link per 1,500 words confirmed in BRIEF.md); SMB buyer journey moments sourced from objection research; AI Overview CTR data (Dataslayer.ai, fetched live — citation-earning strategy for blog traffic). Voice: new marketing voice from voice-spec.md. Penalty figures in CTA card copy all verified from primary .gov sources in Round 1 session.*
