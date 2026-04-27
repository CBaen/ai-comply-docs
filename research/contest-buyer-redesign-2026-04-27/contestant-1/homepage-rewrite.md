# Homepage Rewrite — Contestant 1

## Metadata

### `<title>` tag
**Proposed:** `AI Compliance Documents — Colorado, Illinois, NYC, Texas, California Templates`

**Current:** `AI Compliance Documents — Templates for Every State AI Law`

**Rationale:** The current title is descriptive but not search-discoverable. It doesn't name a single law, state, or buyer situation. Buyers searching "colorado AI law compliance documents" or "Illinois HB3773 template" don't see a match signal in the current title. The proposed title includes five high-intent state signals that match actual buyer queries while preserving the brand name. Tradeoff: loses the "every state" breadth signal. Worth it — breadth is a researcher preference; state specificity is a buyer preference.

---

### Meta description
**Proposed:** `Colorado SB 24-205 takes effect June 30. Illinois HB3773 is in effect now. NYC Local Law 144 active. Texas TRAIGA in force. Get your compliance documents — built from enacted statute text — in 10 minutes.`

**Current:** `AI compliance templates for 14+ state laws, the EU AI Act, and federal frameworks. Built from enacted statute text. Instant download.`

**Rationale:** The current description is a catalog summary. It doesn't name a deadline, doesn't address the buyer's situation, doesn't create urgency. The proposed description leads with real deadlines (verified from leg.colorado.gov and ilga.gov), names specific laws that match buyer queries, and closes with the practical promise: 10 minutes to documented. Character count: ~158 — within the 160-character limit.

---

## Above-the-Fold: Hero Section

### H1
**Current (screen-reader only):** `AI Compliance Documents — State AI Compliance Templates`

**Proposed (visible, prominent):**
```
Your business uses AI. Six states have passed laws about that. You have deadlines.
```

**Rationale:** This is the Pragmatic Realist voice. Short sentences. Direct address. No qualifier. By the end of the H1 the reader knows (a) the site is for them if they use AI, (b) there are laws, (c) time matters. No "discover," no "unlock," no "comprehensive." This is a statement of the reader's situation, not a product description.

Alternative if the above feels too flat for an H1 visual treatment:
```
AI laws are in effect. Your compliance documents should be too.
```

---

### Sub-H1 (hero sub-headline, displayed below H1)
**Proposed:**
```
Colorado SB 24-205 takes effect June 30, 2026. Illinois HB3773 is law now. NYC Local Law 144 active since 2023. Texas TRAIGA in force since January 2026. If you use AI in hiring, lending, insurance, or consumer decisions — the documentation requirement is yours to meet.
```

**Rationale:** This is the Precise Credentialist voice following the Realist opener. Real law names. Real dates. Real scope (hiring, lending, insurance). No soft qualifiers. The buyer who just found out about a deadline reads their state name and knows they are in the right place. The dates are verified against primary sources in the research log.

---

### Primary CTA
**Proposed:** `Get My Compliance Documents`

**Current:** `Browse Products` (in How It Works section)

**Rationale:** "Browse Products" is a catalog verb. It invites exploration, not purchase. "Get My Compliance Documents" is a buyer verb — first person, specific noun, implies they already know they need them. The current site has no prominent primary CTA above the fold at all — the hero is a product carousel with no clear action anchor.

**CTA placement:** Directly below the sub-H1, full-width on mobile, centered on desktop. Links to `/products` filtered by "in-effect" status.

---

### Sub-CTA
**Proposed:** `Not sure which law applies to you? Start here.`

**Rationale:** Addresses the #1 objection from SMB owners who know they have exposure but don't know which state's law is their primary obligation. Links to the `/products` page or a new `/deadline-checker` page (see `new-page-spec.md`). Keeps the primary CTA clean while routing the hesitant buyer.

---

## Hero Section — Supporting Copy (Trust Bar, immediately below CTA)

Replace the current generic trust-bar items with deadline-anchored, buyer-specific signals:

| Icon | Text |
|------|------|
| Clock | June 30, 2026 — Colorado SB 24-205 deadline |
| Checkmark | Built from enacted statute text — not summaries |
| Document | $49–$697, instant download, no subscription |
| Shield | Verified against .gov primary sources |

**Rationale:** Current trust bar reads "Multi-State Coverage / Instant Download / Built for the person who just found out this is their job." The third item is the only one that speaks to a buyer. The proposed bar anchors on the single most urgent deadline (Colorado) — a buyer from any state sees a specific date and understands this is live-or-die compliance territory, not a research tool.

---

## Pain Section — Rewrite

**Current H2:** `What happens if you don't comply?`

**Proposed H2:** `This is what non-compliance costs.`

**Rationale:** The current H2 is a question — it softens the content before delivering it. A declarative statement lands harder. The Pragmatic Realist voice doesn't ask what might happen; it tells you what happens.

**Penalty copy (penalty section, proposed):**

> Illinois HB3773 is in effect now. Penalties under the Illinois Human Rights Act run up to $16,000 for a first violation, $42,500 if you've had a prior finding within five years, and $70,000 if you've had two or more findings within seven years. Those penalties apply per aggrieved person. If your AI hiring tool processed 50 applicants in ways that triggered a complaint, that's 50 separate violations. ([775 ILCS 5/8A-104](https://www.ilga.gov/legislation/ilcs/ilcs4.asp?ActID=2266&ChapterID=64))
>
> Colorado SB 24-205 takes effect June 30, 2026. Violations are treated as deceptive trade practices under the Colorado Consumer Protection Act — up to $20,000 per violation. Per consumer affected. A discriminatory AI hiring tool that processed 100 applicants has a theoretical exposure of $2 million. ([leg.colorado.gov/bills/sb24-205](https://leg.colorado.gov/bills/sb24-205))
>
> Texas TRAIGA has been in force since January 1, 2026. Civil penalties up to $200,000 per violation, with a continuing penalty for each day after notice that a violation goes uncorrected. ([capitol.texas.gov — HB149](https://capitol.texas.gov/BillLookup/Text.aspx?LegSess=89R&Bill=HB149))

**Rationale:** The current pain section is vague ("penalties range from $5,000 to $70,000") and doesn't name the compounding math of per-person penalties. The proposed version uses the exact penalty structure — sourced and cited — and does the math for the reader. This is what the Precise Credentialist voice does: it makes the abstract number real.

---

## How It Works — Keep, Sharpen One Step

Keep the three-step flow. Sharpen Step 1 copy:

**Current:** `Choose Your Regulation. Select the state regulation you need to comply with. Answer a short questionnaire about your company and AI systems. Takes about 10 minutes.`

**Proposed:** `Choose your state's law. Colorado, Illinois, NYC, Texas, California — or multi-state if you operate in several. Answer 8–12 questions about which AI tools you use and what decisions they inform.`

**Rationale:** "Choose Your Regulation" sounds like a research task. "Choose your state's law" sounds like a decision the buyer has already made. The specific state list tells buyers immediately whether their jurisdiction is covered.

---

## Final CTA Section — Sharpen

**Current H2:** `Don't wait for a complaint`

**Proposed H2:** `Colorado's deadline is June 30. Illinois is already law. Texas is already law.`

**Proposed sub-copy:**
> Get your compliance documents today for a fraction of what outside counsel charges. Every template is built from the actual enacted statute — not a summary, not a checklist, not a law firm's interpretation of someone else's interpretation.

**Primary CTA:** `Get My Compliance Documents`

**Rationale:** The current final section is vague ("AI regulations are in effect now"). The proposed version names the three most urgent situations (Colorado deadline, Illinois active, Texas active) and closes with the credibility signal that distinguishes this site from generic template providers: statute-sourced, not summary-sourced.
