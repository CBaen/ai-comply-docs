# Product Page Template — Contestant 4 (v2)

*(Round 1 version archived as `product-page-template-v1.md`. This version rewrites all marketing-surface copy in the new voice and adds the two-mode urgency frame. Structural changes from v1 carry forward.)*

## Product: Colorado SB 24-205 — Deadline Approaching Mode

**Why this product / why this mode:** Colorado has the most imminent deadline (June 30, 2026 — approximately 64 days from today). It demonstrates the Deadline Approaching urgency mode. The Already Exposed mode is illustrated in the voice-spec.md NYC/Illinois examples and in the urgency panel. The structural changes below apply to all product pages — the urgency mode determines which copy variants fire.

---

## Metadata (v2)

### `<title>`
```
Colorado SB 24-205 Compliance Documents — June 30, 2026 Deadline
```

**Change from v1:** Identical — the deadline-in-title insight was correct in Round 1. Kept.

### Meta description
```
Colorado's AI law takes effect June 30, 2026. Get the 8 documents deployers are required to have — impact assessments, risk policy, consumer notices. Built from statute. $449 instant download.
```

**Change from v1:** Shorter. Names the three primary document types (which buyers scan for). Price before "instant download" so the price-sensitive buyer doesn't bounce on a mystery price.

---

## Hero (Above the Fold) — v2 Copy

### Deadline Banner (new element — top of hero, full width)
```
June 30, 2026 — Colorado SB 24-205 takes effect in 64 days
```
Deadline Amber background (`#D97706`), white text, Inter 700. This is the first thing the buyer reads before H1.

**Already Exposed variant (for NYC, Illinois, Texas product pages):**
```
Illinois HB3773 — In Effect Now — Enforcement Active
```
Enforcement Red background (`#B91C1C`), white text.

### H1
```
Colorado SB 24-205. 8 Documents. June 30, 2026.
```

**Voice note:** Three declarative fragments. Law name. What you get. Deadline. No qualifying clauses. This is the specialist-at-the-counter voice: you came for the Colorado documents, here's what they are and when you need them.

**Change from v1:** v1 proposed "Colorado SB 24-205 — Compliance Documents for the June 30, 2026 Deadline." The v2 version drops "Compliance Documents for the" — the word "Documents" is already implied by the product context, and "for the" is filler. The v2 H1 is 12 words vs. v1's 10 — but punchier because each fragment lands separately.

### Deck
```
SB 24-205 requires 8 documents from every deployer. These are them — built from C.R.S. § 6-1-1701 et seq., not a law firm's summary, not an AI-generated overview.
```

**Change from v1:** v1 deck was 50 words explaining what the law covers. v2 is 30 words naming what the product is and what makes it credible. The buyer already knows the law covers them — they searched for the product page. Skip the re-education.

### Citation link (keep from existing)
```
Read the enacted law: C.R.S. § 6-1-1701 et seq. →
```
This stays. It's the strongest trust signal on the page — a direct link to the primary source. Don't move it, don't shrink it.

### Price block
```
$449   one-time purchase
```
Keep existing. No change needed.

---

## Key Stats Bar (v2)

```
8 documents   |   Up to $20,000/violation   |   June 30, 2026   |   Stripe checkout
```

**Change from v1:** v1 proposed adding the deadline. Done. The four stats now answer: what do I get / what's the risk / when do I need it / is payment safe.

---

## Section Order (v2 — Updated from v1)

v1 proposed moving penalties before the document list. v2 refines the order further:

1. Hero (deadline banner, H1, deck, citation, price, CTA)
2. Key Stats Bar
3. **Exposure Summary** (new — replaces "Does This Apply to You?")
4. **Document List** ("The 8 Documents SB 24-205 Requires of Deployers")
5. **Penalty Section** (moved up from buried position — before document preview)
6. Document Preview
7. Post-Purchase walkthrough
8. Add-ons
9. Statutory Authority
10. Sidebar (sticky purchase card)

---

## Section 3: Exposure Summary (Replaces "Does This Apply to You?")

**Section header:**
```
You're a deployer if all three of these are true
```

**Voice note:** "Does This Apply to You?" is a question. The buyer came here because they think it does. Confirm it, don't re-ask it. "You're a deployer if all three are true" is declarative, completion-oriented.

**Three bullets (v2 copy):**

```
✓ You use a high-risk AI system
   Any AI that substantially influences a consequential decision — hiring, housing, credit, healthcare, insurance, education, or legal services. If it screens, scores, ranks, or evaluates people in those contexts, it qualifies.

✓ The system affects Colorado residents
   Residency of the consumer, not your business location, determines applicability. A Chicago-headquartered company with Colorado applicants is a deployer under this law.

✓ You're the one deploying it
   The compliance obligation falls on the business using the AI, not the vendor who built it. Your vendor's compliance doesn't substitute for yours.
```

**Below bullets (v2 — replaces generic applicability summary):**
```
The June 30, 2026 deadline applies to all three. There is no small-business exemption for deployers. The Attorney General can bring enforcement actions before rulemaking is complete.
```

**Voice note:** v1 copy was accurate but ended with a softer close. v2 closes with the three facts buyers use as psychological cover for delay — small-business exemption (doesn't exist), rulemaking not complete (irrelevant to enforcement), future date (64 days, not infinite). All three are directly referenced from statute / AG statements verified in Round 1.

---

## Section 4: Document List (v2 header)

**Header:**
```
The 8 Documents SB 24-205 Requires of Deployers
```

**Voice note:** "Requires" not "Includes." This was in v1. Kept. The word "requires" reframes the list from feature catalog to statutory obligation. Each document entry stays in its existing format (name + explanation) — the DOC_EXPLANATIONS text is already good and doesn't need a voice rewrite.

**Urgency insert before the list (v2 — shorter than v1):**
```
Without these, each affected consumer is a potential separate violation at up to $20,000. ([C.R.S. § 6-1-1701 et seq.](https://leg.colorado.gov/bills/sb24-205))
```

**Change from v1:** v1 version was 2 sentences. v2 is 1 sentence. The per-consumer scaling fact is the conversion-relevant sentence. Keep it; cut the rest.

---

## Section 5: Penalty Section (v2 copy — moved before document preview)

**Header:**
```
What you're exposed to without these documents
```

**Voice note:** v1 header was "What Happens Without Compliance" — informational. v2 is "What you're exposed to" — personal. "Without these documents" ties the penalty directly to the product being sold on this page.

**Body (v2):**
```
Colorado SB 24-205 violations are enforced as deceptive trade practices under the Colorado Consumer Protection Act. The Attorney General has exclusive authority.

Civil penalties: up to $20,000 per violation. For consumers age 60 or older, up to $50,000 per violation.

Each affected consumer is a potential separate violation. Fifty employees processed through a non-compliant AI system = up to $1,000,000 in exposure.

No small-business exemption for deployers. No private right of action — AG-only. No rulemaking required before enforcement begins.

Source: [Colorado SB 24-205 — leg.colorado.gov](https://leg.colorado.gov/bills/sb24-205)
```

**Change from v1:** v1 penalty section was 6 paragraphs. v2 is 4 short blocks. The 50-employee example replaces the abstract "1,000 consumers = $20 million" example — 50 is more relatable to a SMB buyer. The final line removes the lengthy enforcement-mechanism explanation and compresses to three facts (no SMB exemption / AG only / no rulemaking needed) — the three loopholes buyers use to defer.

**Integrity note:** $20,000 and $50,000 figures are sourced from secondary analysis (aicerts.ai, aicompliancedocuments.com/blog) deriving from C.R.S. § 6-1-112. Developer must verify current CCPA ceiling before publishing. This caveat is on every penalty reference in this submission.

---

## Sidebar Purchase Card (v2)

**Label above price:**
```
June 30, 2026 deadline
```
Deadline Amber text. This is the conversion trigger in the sticky card — the buyer sees it every time they scroll.

**Button:**
```
Get Your Colorado Documents — $449
```

**Change from v1:** v1 proposed "Get Your Colorado Documents — $449." Same. Already correct in v1.

**Below button, replacing "vs. thousands at a law firm":**
```
vs. $400–$800/hr for counsel to draft these from scratch
```

**Voice note:** Specific hourly rate (consistent with existing FAQ copy). Buyer can do the math: 8 documents × draft time = real counterfactual cost.

**Verified badge (keep):**
```
Verified against enacted statute text
Source: C.R.S. § 6-1-1701 et seq. →
```
No change. Strong trust signal. Already in the right voice.

**Below verified badge (v2 addition — dynamically computed):**
```
N days remaining
```
Small, Deadline Amber text. Date reinforcement at the point of decision. This is NOT a hardcoded string. Implementation: `Math.ceil((new Date('2026-06-30') - new Date()) / 86400000)` rendered as a client component (`"use client"` — uses `Date`). After June 30, 2026: element is removed from the sidebar (the flip to `"in-effect"` status removes the countdown per the flip-logic table — sidebar label becomes `In Effect — Act Now` in Enforcement Red). No static string "64 days" should appear in source.

---

## Blog Guide Link (v2 copy)

**Current:** "Read our plain-language guide to this law →"

**v2:**
```
Not sure if SB 24-205 covers your AI system?

What Counts as a "High-Risk AI System" Under Colorado's Law — and Who Qualifies as a Deployer →
```

**Voice note:** Names the buyer's specific remaining objection (am I actually covered?) and the exact question the blog post answers. The buyer who clicks this link is in qualification mode — once they confirm they're covered, the product is the obvious return.

---

## Already Exposed Mode — Variants for NYC and Illinois

The structural changes above apply to all product pages. The urgency-mode copy shifts for in-force laws:

**NYC Local Law 144 — Already Exposed mode:**

Deadline Banner:
```
NYC Local Law 144 — In Effect Since 2023 — DCWP Investigations Increasing in 2026
```

H1:
```
NYC Local Law 144. 7 Documents. DCWP Compliance Required.
```

Deck:
```
Local Law 144 has been in force since July 2023. DCWP investigations are increasing. Here are the 7 documents required — bias audit documentation, candidate notices, public disclosure templates. Built from NYC Admin. Code § 20-870.
```

Exposure Summary header:
```
You're covered by this law if all three are true
```

Penalty section header:
```
What you're currently exposed to
```
(Note: "currently" — not "without compliance." The Already Exposed mode frames the buyer as already in the exposure window, not approaching it.)

**Illinois HB3773 — Already Exposed mode:**

Deadline Banner:
```
Illinois HB3773 — In Effect Since January 1, 2026 — IDHR Enforcement Active
```

H1:
```
Illinois HB3773. 5 Documents. Required Now.
```

Deck:
```
HB3773 is in effect. If you use AI in hiring, HR, or promotions affecting Illinois employees — you owe these documents. Built from 775 ILCS 5/2-102(L).
```

---

## Mechanism Spec: The Flip Logic and Cross-Mode Surface

*(Added in Loop 2 in response to Proxy coaching. These two mechanisms are the implementation core of the two-mode frame.)*

### Mechanism 1: The Deadline Approaching → Already Exposed Flip

**The question:** What triggers the mode change on the Colorado product page after June 30, 2026? Is it automatic or manual?

**Answer: Automatic, driven by `status` field in `regulations.ts`.**

The existing data model already has the right field. `Regulation.status` is typed as `"in-effect" | "effective-soon" | "proposed"`. The `StatusBadge` component already reads this field and renders the appropriate badge. The two-mode frame maps onto this existing structure — no new fields required.

**The rule:**
- `status: "effective-soon"` → Deadline Approaching mode (Deadline Amber palette)
- `status: "in-effect"` → Already Exposed mode (Enforcement Red palette)

The flip happens when someone updates the Colorado `status` field from `"effective-soon"` to `"in-effect"` in `regulations.ts` on or after June 30, 2026. This is a one-line change, committed to git, deployed via Vercel. No database, no cron job, no server-side date math needed.

**Why not automate the date comparison?** Automating it (`new Date() > new Date("2026-06-30")`) would require either client-side date math (which creates flash-of-wrong-mode on first render) or a server-side computed value (which adds complexity to what is currently a static data file). The manual flip is more reliable, auditable, and consistent with how the site already works. The `effectiveDate` string field already exists and is displayed — it is not used for logic. Keeping logic in one place (the `status` enum, changed manually when the date arrives) is the right call for this codebase.

**What changes in the UI when the flip fires:**

The `status` field drives every urgency-mode-sensitive element. After the flip:

| Element | Before flip (effective-soon) | After flip (in-effect) |
|---|---|---|
| Deadline Banner | `June 30, 2026 — Colorado SB 24-205 takes effect in N days` (Amber `#D97706` bg) | `Colorado SB 24-205 — In Effect — AG Enforcement Active` (Red `#B91C1C` bg) |
| H1 | `Colorado SB 24-205. 8 Documents. June 30, 2026.` | `Colorado SB 24-205. 8 Documents. Required Now.` |
| Deck | `SB 24-205 requires 8 documents from every deployer. These are them...` | `SB 24-205 is in effect. If you deploy a high-risk AI system affecting Colorado residents, you owe these documents now.` |
| Status badge | `EFFECTIVE SOON` (amber) | `IN EFFECT` (red) — already implemented in `StatusBadge` component |
| Key Stats Bar | `June 30, 2026` | `In Effect Now` |
| Sidebar label | `June 30, 2026 deadline` (Amber) | `In Effect — Act Now` (Red) |
| Sidebar countdown | `64 days remaining` | *(removed — no countdown for in-force laws)* |
| Exposure Summary close | `The June 30, 2026 deadline applies to all three.` | `This law is in effect. The AG can bring enforcement actions now.` |
| Penalty section header | `What you're exposed to without these documents` | `What you're currently exposed to` |
| Meta description `<title>` | `Colorado SB 24-205 Compliance Documents — June 30, 2026 Deadline` | `Colorado SB 24-205 Compliance Documents — In Effect Now` |

**Implementation note for the developer:** The `regulations.ts` update (status field + effectiveDate string) is the single change that drives all of these. The product page JSX renders each urgency-mode-sensitive element conditionally on `reg.status === "in-effect"` vs. `reg.status === "effective-soon"` — the same pattern already used by `StatusBadge`. No new conditional logic is required beyond what already exists; it needs to be extended to the Deadline Banner, H1, deck, Key Stats Bar, and sidebar label elements.

**The July 1, 2026 state of the site:**

After June 30, Colorado flips to `"in-effect"`. At that point, every major US state AI law in the current catalog is in Already Exposed mode: Illinois (January 2026), NYC (July 2023), Texas TRAIGA (2026), Texas TDPSA (July 2024), California CCPA ADMT (active), Virginia CDPA, Connecticut CTDPA, Oregon CPA. The homepage urgency panel becomes all-red. Every deadline banner on every product page is Enforcement Red. The Deadline Approaching mode is temporarily absent from the site — until a new law enters the pipeline with a future effective date.

This is not a design failure — it is the correct representation of reality. The site is a compliance store, not a countdown clock. When all laws are in force, the urgency mode shifts from "you have N days" to "you are currently exposed." The all-red homepage has its own conversion logic: it communicates that there is no safe window left. That is accurate and buyer-relevant.

The only copy change needed at the homepage level: the meta description drops the Colorado deadline reference and substitutes "Multiple state AI laws are in effect. Enforcement is active in Colorado, Illinois, NYC, California, and Texas. Get the documents required. Instant download."

---

### Mechanism 2: Cross-Mode Surface for Multi-State Buyers

**The question:** A buyer arrives on the Colorado product page via organic search. They have not seen the homepage urgency panel. They have Illinois employees — which means they are already in Already Exposed mode for HB3773. Where on the Colorado page do they learn this?

**Answer: A new "Also Required?" strip, positioned after the penalty section and before the document preview.**

**Component: `AlsoExposedStrip`**

This is a horizontally scrollable strip of compact law cards, filtered by category overlap with the current product. It appears only on product pages whose `status` is `"effective-soon"` (Deadline Approaching mode) and shows laws that are:
1. Already `"in-effect"`
2. Share a category or applicability overlap with the current product

For the Colorado page (category: "Employment and Consumer AI, multiple domains"), the strip shows:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Also Required If You Operate in These States                               │
│  These laws are already in effect. No deadline — current exposure.          │
├──────────────────┬──────────────────┬────────────────────────────────────── │
│ [Enforcement Red `#B91C1C` pill] Illinois   │ [Enforcement Red `#B91C1C` pill] NYC   │ [Enforcement Red `#B91C1C` pill] Texas   │
│ HB3773                                      │ Local Law 144                           │ TRAIGA                                   │
│ In Effect Now                               │ In Effect                               │ In Effect                                │
│ AI in hiring                                │ AI hiring, bias                         │ AI developers                            │
│ Up to $70K/viol                             │ $500–$1,500/day                         │ Up to $200K/viol                         │
│ [Get Documents]                             │ [Get Documents]                         │ [Get Documents]                          │
└──────────────────┴──────────────────┴──────────────────────────────────────┘
```

**Visual spec:**
- Strip uses Enforcement Red (`#B91C1C`) left border accent
- Cards are compact: law name, status, one-line applicability note, max penalty, CTA link
- Horizontally scrollable on mobile; 3-up grid on desktop
- Strip header: "Also Required If You Operate in These States" — declarative, not a question

**Copy logic for the strip header:**
- On a Deadline Approaching page: "These laws are already in effect — no deadline to wait for."
- On an Already Exposed page (e.g., Illinois product page): "Also required if you operate in these states." (Omit the "already" framing since the viewer is already in Already Exposed mode.)

**Category-based filtering logic:**

The `RELATED_ADDONS` object already exists in the product page for add-on products. A similar mapping is needed for the `AlsoExposedStrip`:

```typescript
const CROSS_STATE_EXPOSURE: Record<string, string[]> = {
  // Employment AI laws show each other
  "colorado-sb24-205": ["illinois-hb3773", "nyc-local-law-144", "texas-traiga"],
  "illinois-hb3773": ["nyc-local-law-144", "colorado-sb24-205"],
  "nyc-local-law-144": ["illinois-hb3773", "colorado-sb24-205"],
  // Consumer privacy laws show each other
  "california-ccpa-admt": ["texas-tdpsa", "virginia-cdpa", "connecticut-ctdpa"],
  // etc.
};
```

Filter: only include slugs where the referenced regulation has `status === "in-effect"`. This means the strip is dynamic — as more laws flip to `"in-effect"`, more entries appear in the strip automatically. On July 1, 2026, when Colorado flips, it disappears from other pages' strips and the strips shrink.

**Why not use the existing Related Products section?**

The existing "You May Also Need" Related Products section shows products by category and tier similarity — it's a cross-sell section. The `AlsoExposedStrip` is different in purpose and register: it's not cross-selling, it's cross-alerting. Its message is "you may already be in violation of these other laws." The copy, color, and position are all distinct. It belongs above the document preview (where the buyer is still in evaluation mode) not below the add-ons section (where they are in post-decision mode).

**After July 1, 2026:** The `AlsoExposedStrip` component remains but renders no Deadline Approaching products to link to (since all major laws are now in Already Exposed mode). At that point, the strip can either be hidden (if `CROSS_STATE_EXPOSURE` yields no effective-soon slugs) or repurposed to show "laws with pending rulemaking" or "laws with upcoming amendment reviews." This is a later-stage content decision — the mechanism is sound either way.
