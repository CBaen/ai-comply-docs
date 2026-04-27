# Homepage Rewrite — Contestant 3

**[Round 2 rewrite — new marketing voice. v1 preserved in homepage-rewrite-v1.md]**

---

## Current (the thing to beat)

- `<title>`: "AI Compliance Documents — Templates for Every State AI Law"
- `<meta description>`: "AI compliance templates for 14+ state laws, the EU AI Act, and federal frameworks. Built from enacted statute text. Instant download."
- H1: screen-reader only — invisible to the buyer
- Hero: product carousel — requires scanning before comprehension
- Third section from top: methodology explanation — process before product

The site looks like a research library. That's the problem. Every element below replaces a research-library signal with a compliance-store signal.

---

## `<title>`

```
AI Compliance Documents — Colorado, NYC, Illinois AI Law Templates
```

Names the three highest-urgency buyer markets. Under 60 chars. A buyer searching "Colorado AI compliance template" sees their state in the SERP title before clicking. Every competitor's title says "solution" or "framework." This title says three law names.

---

## `<meta description>`

```
Colorado deadline: June 30, 2026. NYC enforcing now. Illinois penalties up to $70,000/violation. The documents your law requires — built from statute, instant download, $49–$697.
```

155 characters. Three facts. Three buyer triggers. One product promise. Penalty figure verified: 775 ILCS 5/8A-104, fetched live. No competitor's meta says "June 30, 2026."

---

## Hero Section — Full Spec

### Eyebrow (above H1 — Deadline Amber `#B45309`, 12px caps, Inter 600)

```
COLORADO — JUNE 30, 2026  ·  ILLINOIS & NYC — IN EFFECT NOW
```

The first thing the buyer reads. Named urgency, not generic urgency. Colorado buyers see their deadline immediately. Illinois and NYC buyers see their enforcement status in the same line. A buyer arriving from any of the three most-searched laws is confirmed in the eyebrow before the H1 lands.

### H1 (visible, above fold — Near Black `#0F172A`, 48px / 32px mobile, Inter 700)

```
Your state passed an AI law.
Here are the documents.
```

Two lines. Thirteen words. The first line names the buyer's situation. The second delivers the product. Nothing in between. This is the hardware store model: you came in for a fitting, here it is.

What this is NOT: "Discover how AI Compliance Documents can help your organization navigate the complex landscape of state AI regulations." That sentence is the failure mode. Twelve words of air before anything lands.

### Sub-H1 (18px Inter 400, `#374151`, max 3 lines)

```
Colorado, Illinois, and NYC each require specific documents.
We built them from the enacted statute text.
Instant download. $49–$697. No subscription.
```

Three sentences. Three facts. The sub-H1 is not a paragraph — it's three statements the buyer reads in three seconds. "No subscription" answers the objection every SaaS-burned buyer has before they ask it.

### Primary CTA Button (Document Blue `#1E40AF`, white text, 18px Inter 600, 52px height)

```
Find My Documents
```

Replaces "Browse Products." "My" signals the site will direct them, not hand them a catalog. "Documents" names what they're buying.

### Below-button sub-copy (12px `#6B7280`)

```
Colorado · Illinois · NYC · California · Texas
```

State names as scent markers. The buyer who came from a "Texas AI compliance" search sees their state here and keeps going.

### Right-side product selector (desktop only, above fold — new element replacing carousel)

Three rows. No images. No animation. Clean list of the three most urgent products:

```
┌─────────────────────────────────────────────────────┐
│  Colorado SB 24-205    [JUN 30 — Deadline Amber]  $449   →  │
│  Illinois HB3773       [IN EFFECT — Enforcement Red] $397  → │
│  NYC Local Law 144     [IN EFFECT — Enforcement Red] $399  → │
└─────────────────────────────────────────────────────┘
```

Each row: law shortname / status badge / price / arrow link to product page. Badge color tokens are semantic: `Deadline Amber #B45309` for any law with a future effective date; `Enforcement Red #DC2626` for any law already in force. Border `#E2E8F0`, 6px border-radius, white background. No carousel. Buyers who know their law skip straight to the product page without scrolling.

---

## Section 2 — Urgency Band (new — immediately below hero)

Dark strip (`#0F172A` background), 60px height desktop, 3-column layout:

```
Colorado SB 24-205    Deadline Jun 30, 2026    →
Illinois HB3773       In Effect Now             →
NYC Local Law 144     In Effect Now             →
```

Amber text for deadline dates. Red for "In Effect Now." Each item links to the product page. This is the navigation assist for buyers who didn't see their state in the hero. It also reinforces urgency for buyers who did.

---

## Section 3 — Pain Section (moved up from position 6)

**H2 (new copy):**

```
The AG doesn't need to find you proactively. One complaint does it.
```

**Body (new copy in marketing voice — short, exact, no hedging):**

```
When an employee or customer files a complaint, the Attorney General's first question is: where's your documentation? No risk management policy. No impact assessment. No consumer notice. That's the gap that turns a complaint into a violation.

Penalties: up to $20,000 per violation in Colorado (Colorado Consumer Protection Act). Up to $70,000 per violation in Illinois (775 ILCS 5/8A-104). Up to $1,500 per day in NYC (NYC Admin. Code § 20-870). These are not maximums for disasters. They're the cost of being unprepared when someone files a form.
```

Penalty figures: all verified from primary sources in Round 1 research session. Colorado CPA via WebSearch; Illinois via ilga.gov primary source fetch; NYC via regulations.ts (site's own statutory data) + WebSearch corroboration.

**Three cards below the body text (keep existing card component, revise copy):**

Card 1 (red left border):
```
Employee and Consumer Complaints
A complaint is filed. The state investigates. The first thing they ask for is your documentation. Have it ready.
```

Card 2 (amber left border):
```
State Enforcement
AG offices enforce these laws. In Illinois, each separate AI hiring decision that violates the statute can be a separate violation. Automated tools process hundreds of candidates. The numbers multiply.
```

Card 3 (slate left border):
```
What It Costs Without Us
Law firms charge $400–$800/hour to draft these documents from scratch. Our packages are $49–$697. One-time. Instant download.
```

---

## Section 4 — Product Selector (full, replaces carousel)

**H2:**
```
Find your state's documents.
```

**Organized by urgency (IN EFFECT first, then DEADLINE, then PROPOSED). Product cards follow visual-direction.md card pattern.**

No carousel. No animation. A clean grid with the most urgent laws at the top. Buyers scan the status badge and price before the law name. That's the correct reading order for a compliance store.

---

## Section 5 — Methodology / Trust (moved down from position 3)

**H2 (shortened from "How We Build Our Templates"):**
```
Every document starts with the enacted law. Not a summary. The law.
```

**Body (tightened from current 3-sentence explanation):**
```
We go to the official .gov source. We read the statute. We build templates that cite the specific sections that apply to your business. Section numbers, penalty tiers, effective dates — all verified against primary source before any document ships.

That's not a process description. That's the only way to build documents you can actually rely on.
```

**Four methodology cards (keep existing visual component, revise copy):**

Card 1: `.gov source — Read the enacted statute, not the summary`
Card 2: `Verified — Section numbers, penalty amounts, effective dates — all checked`
Card 3: `Transparent — Implementing rules still pending? We say so.`
Card 4: `Templates, not legal opinions — Your attorney verifies it applies to you.`

---

## Section 6 — How It Works (three steps, keep existing component)

**H2:**
```
Three steps. Done.
```

Step 1: `Pick your state's law`
Step 2: `Answer 10 questions about your business`
Step 3: `Download your documents`

**No "Pay Once" step headline** — payment is implied, not the feature. The feature is the outcome: documents in hand.

**CTA below steps:**
```
Find My Documents  →
```

---

## Section 7 — FAQ (keep existing, no copy changes)

FAQ content is already good. No changes. Correct placement: catches buyers who are still on the fence before they leave.

---

## Section 8 — Final CTA (dark strip, bottom of page)

**H2:**
```
Colorado's deadline is June 30. NYC is enforcing now. Illinois penalties up to $70,000.
```

**Sub-copy:**
```
You don't need to know everything about the law. You need the documents it requires. Pick your state, answer ten questions, download your package.
```

**CTA button:**
```
Find My Documents
```

**Below button:**
```
Questions? info@aicompliancedocuments.com
```

---

## What Stays

- The Stripe trust mark — keep exactly as-is
- "Built for the person who just found out this is their job" — strongest existing copy; keep in trust bar
- The FAQ content — no rewrites needed
- The methodology section content — revised H2, tightened body, same four cards

## What Goes

- The product carousel (replaced by two-column hero with product selector)
- The FeaturedInBar (unless multiple real, verifiable press mentions exist — one citation is a liability, not an asset)
- The lifestyle images between sections (replaced by the product selector and urgency band — the images added decoration, not information)
- The blog grid anywhere on the homepage (blog moves to Resources nav)
- The screen-reader-only H1

---

*Research basis: Live CTR benchmarks (First Page Sage 2026 — position 4 = 7.2%, fetched live), live competitor positioning (TrustArc enterprise-only confirmed, Termly/OneTrust not in this space), live SMB objection research, primary source penalty verification (all three laws). Voice: new marketing voice from voice-spec.md.*
