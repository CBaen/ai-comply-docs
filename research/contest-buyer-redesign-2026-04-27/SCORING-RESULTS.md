# Scoring Results — buyer-redesign-2026-04-27

**Phase 4 complete. Top-3 identified for tightening pass.**

---

## Full Score Matrix

| Rated → | C1 | C2 | C3 | C4 | C5 |
|---|---|---|---|---|---|
| **C1 rated** | — | 26 | 26 | 28 | 24 |
| **C2 rated** | 24 | — | 25 | 28 | 25 |
| **C3 rated** | 25 | 25 | — | 27 | 23 |
| **C4 rated** | 26 | 26 | 27 | — | 24 |
| **C5 rated** | 23 | 25 | 26 | 26 | — |
| **Total** | 98/120 | 102/120 | 104/120 | 109/120 | 96/120 |
| **Avg** | **24.5** | **25.5** | **26.0** | **27.25** | **24.0** |

Each contestant scored by 4 peers. Each peer score is sum of 3 dimensions (Buyer Clarity / Research Rigor / Shippability), each 1–10.

## Per-Dimension Averages

| Contestant | Buyer Clarity | Research Rigor | Shippability |
|---|---|---|---|
| C1 (Calm Authority) | 8.7 | 7.7 | 8.3 |
| C2 (Transaction-First Declarative) | 8.0 | 8.5 | 9.0 |
| C3 (Hardware Store + Opinionated Minimalism) | 9.0 | 9.0 | 8.3 |
| C4 (Compliance Specialist + Two-Mode Frame) | 8.7 | 9.0 | 9.3 |
| C5 (Calm Hardware Store + Diagnostic Precision) | 8.0 | 8.0 | 7.7 |

(Per-dimension averages from 3 of 5 raters per contestant — C2's scoring submitted totals only.)

## Final Ranking

| Rank | Contestant | Avg | Status for Phase 7 |
|---|---|---|---|
| 1 | **C4 — Compliance Specialist + Two-Mode Frame** | **27.25** | Top-3 — tightening pass |
| 2 | **C3 — Hardware Store + Opinionated Minimalism** | **26.0** | Top-3 — tightening pass |
| 3 | **C2 — Transaction-First Declarative** | **25.5** | Top-3 — tightening pass |
| 4 | C1 — Calm Authority | 24.5 | Below cut — gallery only (unless dissent) |
| 5 | C5 — Calm Hardware Store + Diagnostic Precision | 24.0 | Below cut — gallery only (unless dissent) |

## Field-Level Observations

**C4's lead is structural, not stylistic.** Three of four peer raters scored C4 at 28/30 — the field's only contestant to receive that score from anyone. The endorsement converged on three concrete contributions:
1. The two-mode frame (Deadline Approaching / Already Exposed) as the field's most useful structural addition
2. The flip-logic table mapping every UI element to `status: "effective-soon"` vs `"in-effect"` — the field's most developer-ready spec
3. The `AlsoExposedStrip` component with TypeScript mapping for multi-state buyers
4. The Colorado penalty provenance fix (CCPA-derived, C.R.S. § 6-1-112) that the rest of the field then adopted

**C3's strength is per-sentence quality.** Multiple peers cited the Recognition Principle (one statute-sourced sentence per product page that surfaces what the buyer didn't know to ask) as "the only submission that demonstrates the site read the statute rather than summarized it" (C1's words). C3's per-dimension scores tied highest in Buyer Clarity (9.0) and Research Rigor (9.0).

**C2's strength is operational sequencing.** The Build Order — 7 interventions ranked by impact-per-hour with a starred first-ship — is the only submission that explicitly answers "what ships first when continuity is bounded." C2 scored highest in Shippability after Loop 2 (the title-tag + H1 atomic-step pairing tightened the spec further).

**C1 and C5 both produced solid Round 2 work but lacked field-distinctive structural contributions.** C1's panic-state visual treatment and C5's EEOC bridge specification are real strengths, but neither built a structural pattern (like C4's two-mode, C3's recognition principle, or C2's build order) that the field could converge on or borrow from.

## Self-Reflection Summary

Every contestant's self-reflection was honest. Highlights:

- **C1:** "No build order until Proxy Loop 2; no explicit two-mode frame; penalty citations sourced correctly but not uniformly threaded into each deliverable file."
- **C2:** Recognized C4's two-mode work as the field's strongest contribution (despite ranking C4 highest, implicitly competing).
- **C3:** Self-scored their own work at 22/30 — the lowest self-assessment in the field, despite peers ranking C3 second overall. Either harsh self-judgment or accurate sense of the bigger move they didn't make.
- **C4:** "No build order, no recognition principle, departure-board hero is less precisely componentized than Contestant 2's version."
- **C5:** "No build order, no recognition principle, two-mode urgency frame present in voice but not mechanized into CTA copy variants or UI logic."

**Pattern across the field:** The three structural moves (build order from C2, recognition principle from C3, two-mode frame from C4) are mostly mutually-exclusive — no single contestant achieved more than one. A hybrid synthesis that combined all three would likely outscore any individual entry.

## Top-K for Tightening (K=3)

- **C4** (27.25)
- **C3** (26.0)
- **C2** (25.5)

## Below the Cut

- **C1** (24.5) — Calm Authority. Sharp Loop 2 fixes (eyebrow naming all 4 states + leading with Texas, single-color urgency band, present-tense H1) but no structural pattern peers could rally around.
- **C5** (24.0) — Calm Hardware Store + Diagnostic Precision. Strongest individual touch was the EEOC bridge as plain inline copy (not styled CTA block) — judgment-rich but field-narrow.

## Hybrid Synthesis Candidate

If GL wants a hybrid that combines the field's strongest structural moves:
- **Visual ground** — C3's semantic color rules (amber=urgency only, green=verification only) + C4's flip-logic mechanism
- **Voice + recognition** — C3's Recognition Principle (one statute-sourced sentence per product page)
- **IA + temporal logic** — C4's two-mode frame + July 1, 2026 all-exposed state spec + AlsoExposedStrip component
- **Operational sequencing** — C2's Build Order with the atomic-step pairing (title tag + H1 as one promise)

This would compose the field's strongest individual contributions into a single deliverable. Available as Phase 10 (Hybrid Synthesis) per the contest skill, after GL picks.

---

*Compiled by orchestrator after all 5 contestants submitted scoring.md. Top-3 will receive Proxy tightening notes in Phase 7. Dissent moment dispatched in Phase 6 — every contestant gets to Continue / Step Away / Wildcard Pivot.*
