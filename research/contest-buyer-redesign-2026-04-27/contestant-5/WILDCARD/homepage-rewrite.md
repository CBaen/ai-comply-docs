# Homepage Rewrite — Wildcard Synthesis

## Metadata

### `<title>`
```
AI Compliance Documents — Colorado, Illinois, NYC & Texas AI Law Templates
```

Names the four highest-traffic state buyer markets. Under 70 chars. A buyer searching "Colorado AI compliance documents" sees their state in the SERP title before clicking.

### Meta description (pre-June-30, 2026)
```
Colorado deadline: June 30, 2026. Illinois, NYC, Texas: in effect now. The documents your state's AI law requires — built from statute. $49–$697. Instant download.
```
157 characters. Four urgency signals. One product promise. Price visible.

### Meta description (post-June-30, 2026 — file edit: `src/app/page.tsx` metadata)
```
Colorado, Illinois, NYC, California, and Texas AI laws are all in effect. Enforcement is active. Get the compliance documents your state requires — built from statute. $49–$697. Instant download.
```
One manual update when Colorado flips to `"in-effect"` in `regulations.ts`. The deadline drops out; the all-exposed signal enters.

---

## Hero Section — Full Spec

### Eyebrow (above H1)
```
ILLINOIS: IN EFFECT  ·  NYC: IN EFFECT  ·  TEXAS: IN EFFECT  ·  COLORADO: JUNE 30, 2026
```
`text-sm font-semibold uppercase tracking-wider`. Color: Enforcement Red (`#B91C1C`) for the in-effect laws, Deadline Amber (`#D97706`) for Colorado's date. Inline, separated by `·`.

**Ordering rationale:** In-effect states lead because current exposure is more urgent than a future deadline. The panicked Texas buyer reads TEXAS before the H1. The Colorado buyer reads their deadline fourth — still above fold, still prominent. The eyebrow's job is state-name confirmation before the buyer has done any work.

**After July 1, 2026:** All four entries become Enforcement Red. The Deadline Amber color disappears from the eyebrow until a new law enters with a future effective date.

### H1 (visible — NOT sr-only)
```
Your state has an AI law.
We built the documents.
```
Inter 700, `text-4xl md:text-6xl leading-tight`, Slate Navy `#1E293B`. Visible on `bg-slate-50`.

Line 1: buyer situation (declarative, not a question, not "if you..."). Line 2: the offer (4 words). Nothing between them.

**Implementation:** Remove `sr-only` class from existing H1 element OR replace the carousel hero with this H1. Do not add this H1 alongside the carousel — the carousel must be removed from the hero position.

### Urgency Band (below H1)
```
[■ ILLINOIS — IN EFFECT]    [■ NYC — IN EFFECT]
[■ TEXAS — IN EFFECT]       [■ COLORADO — JUNE 30]
```
`text-sm font-bold px-4 py-2 rounded-md`. 2×2 grid on mobile, 4-wide on desktop. Enforcement Red fill for in-effect laws, Deadline Amber for Colorado.

**After July 1, 2026:** All four pills become Enforcement Red. `COLORADO — JUNE 30` becomes `COLORADO — IN EFFECT`. No structural change — just the text and color of one pill, driven by the `status` field flip in `regulations.ts`.

### Primary CTA
```
Find My Compliance Documents →
```
Signal Blue (`#2563EB`), `px-8 py-4 text-lg font-bold`. Full-width on mobile. Links to `/compliance-deadline-by-state`.

### Sub-CTA
```
Not sure which law applies? → See deadlines by state
```
Underlined text link, `text-sm text-slate-600`. Same destination. Serves the buyer who isn't sure which law applies — routes them to the self-qualification hub before product selection.

### Trust Strip
```
✓ Built from enacted statute text    ✓ .gov primary sources, verified    ✓ Instant download — no subscription
```
Verified Green (`#16A34A`) checkmarks. `text-sm font-medium`. Horizontal on desktop, stacked on mobile. Three facts, not a feature list.

### Right-column product card (desktop only — stationary, above fold)
The single highest-urgency product, static. Before June 30: Colorado SB 24-205.

```
[DEADLINE: JUNE 30, 2026 — amber badge]
Colorado SB 24-205
8 documents  ·  C.R.S. § 6-1-1701
$449
[ Get Colorado Documents → ]
```

After July 1: card switches to the in-effect law with the highest buyer traffic (Illinois HB3773 or NYC Local Law 144 — determined by GSC data at that time). One `regulations.ts` update — no layout change.

---

## Section 2: Products Grid (Two-Mode Split)

### Subsection A — Already Exposed
**Header:**
```
These laws are in effect. Enforcement is active.
```
`h2`, Inter 700, `text-2xl`. No padding essay.

Product cards: Illinois HB3773, NYC Local Law 144, Texas TRAIGA, California CCPA ADMT. Enforcement Red status badges. Full-width CTA buttons ("Get Illinois Documents →" etc.).

### Subsection B — Deadline Approaching
**Header:**
```
Colorado SB 24-205 takes effect June 30, 2026.
```
`h2`, Inter 700. Deadline Amber accent.

Product card: Colorado SB 24-205 with Deadline Amber badge and countdown label.

**After July 1:** Subsection B collapses (or repopulates with new upcoming laws). The header in Subsection A updates to: `"Every major state AI law is now in effect."` One copy change in `page.tsx`.

### Below grid
```
Browse all 57 compliance packages →
```
`text-sm text-slate-600`. Inline link to `/products`. Not a section — just a link.

---

## Section 3: Consequences (Three Penalty Cards)

**Section header:**
```
The cost of not having these documents.
```
H2. Declarative. No question mark.

**Three cards (statute-exact, no preamble paragraph):**

**Card 1 — Illinois:**
> Up to $70,000 per violation. Already in effect.
> ([775 ILCS 5/8A-104](https://www.ilga.gov/legislation/ilcs/documents/077500050K8A-104.htm))
> [Get Illinois Documents →]

**Card 2 — Colorado:**
> Up to $20,000 per violation under C.R.S. § 6-1-112. June 30 deadline.
> ([SB 24-205](https://leg.colorado.gov/bills/sb24-205))
> [Get Colorado Documents →]

**Card 3 — NYC:**
> $500–$1,500 per day per ongoing violation. No employee-count threshold.
> ([NYC Admin. Code § 20-871](https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page))
> [Get NYC Documents →]

**Below cards:**
```
Each affected consumer or employee may be a separate violation.
An AI system that processed 50 applicants has 50 potential violations if a complaint succeeds.
```
`text-sm text-gray-700`. The math, stated plainly. No alarm formatting.

---

## Section 4: How It Works

**Header:**
```
Three steps. Done.
```

**Steps:**
1. Pick your state's law — Colorado, Illinois, NYC, California, Texas, or browse all 57.
2. Answer 8 questions — your company name, AI systems in use, which decisions they inform.
3. Download your documents — fillable PDFs, instantly. Electronic signature blocks included.

**Below steps:**
```
[ Find My Compliance Documents → ]
```

---

## Section 5: FAQ (6 Questions)

**Header:**
```
Before you buy.
```
(Not "Frequently Asked Questions." Not "Everything you need to know." Just: before you buy.)

**Six questions, direct answers, no preamble:**

**Q: What documents do I actually need?**
That depends on your state and your role. Each product page lists exactly what's included and which statutory section requires each document.

**Q: How do I know if this applies to my business?**
If you use AI in hiring, lending, insurance, healthcare, housing, or consumer decisions in a covered state — yes. Each product page has an applicability checklist for your state's specific law.

**Q: Where do I start if I don't know which law applies?**
[State Deadlines page →](/compliance-deadline-by-state) — organized by state, with enforcement status, penalty, and a direct link to the relevant package.

**Q: Is this legal advice?**
No. These are documentation templates built from enacted statute text. They help you demonstrate compliance. Your attorney reviews the completed documents.

**Q: How are the documents generated?**
You answer 8 questions: company name, AI systems in use, which decisions they inform. Your answers populate the templates. Download immediately as fillable PDFs.

**Q: Do I need this if I already have outside counsel?**
Many customers have lawyers. The templates give their attorney something to review instead of drafting from scratch. Eight hours of attorney time at $600/hour is $4,800. The Colorado package is $449.

---

## What This Removes From the Current Homepage

| Removed | Reason |
|---|---|
| Product carousel in hero | Browsing-mode UI — replaced by static hero + product cards in Section 2 |
| sr-only H1 | H1 must be visible — current setup signals "information site" |
| FeaturedInBar (post-hero) | "Featured in media" as position 2 signals content company, not store |
| "How We Build Our Templates" icon grid | Methodology embedded in product cards instead — closer to purchase decision |
| Lifestyle image breaks | Visual noise; no buyer signal |
| Blog grid anywhere on homepage | Blog moved to Resources in nav |
| Full 9-question FAQ accordion | Compressed to 6 buyer-relevant questions |

---

## Post-June-30, 2026 Changes (file-level)

**Three manual updates when Colorado flips:**

1. `src/app/page.tsx` — meta description: deadline version → all-exposed version (copy above)
2. `src/data/regulations.ts` — Colorado `status: "effective-soon"` → `status: "in-effect"` (drives all product page mode changes automatically)
3. `src/app/page.tsx` — Subsection B header: deadline framing → all-in-effect framing, or remove the subsection if no new Deadline Approaching laws are in the catalog

Everything else on the homepage updates automatically from the `status` field change in `regulations.ts`.
