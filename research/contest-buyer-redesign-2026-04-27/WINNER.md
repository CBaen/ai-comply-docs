# Winner — buyer-redesign-2026-04-27

## GL's pick

**Contestant 4 — Compliance Specialist + Two-Mode Frame**

Final score: **27.25 / 30** (rank 1, peer-scored highest by C2 and C1 at 28/30 each).

## Why this won

- **Mechanism completeness.** The two-mode frame (Deadline Approaching / Already Exposed) is the only entry that won't go stale on July 1, 2026 when Colorado's deadline passes. Every contestant after this one will have to add temporal logic; C4 already did.
- **Developer-readiness.** Flip-logic table maps every UI element to `status: "effective-soon"` vs `"in-effect"`. `AlsoExposedStrip` component spec'd in TypeScript with concrete prop signatures. C1's evaluation: "A developer could implement without a single clarifying question."
- **Field-level integrity.** Originated the Colorado penalty provenance fix (SB 24-205 doesn't name the dollar amount; CCPA C.R.S. § 6-1-112 does). The rest of the field then adopted this. That's a real contribution to the project's integrity discipline.
- **Tightening absorbed peer moves cleanly.** Post-tightening, C4 also has C2's Build Order (6 sequenced items, ship 1-3 first) and C3's Recognition Principle (deployer/developer distinction in Section 3, with voice-note not to expand). The entry now combines its original distinctive move with the field's other two structural patterns — without identity loss.

## What's in the winning entry

📁 **Source of truth:** `research/contest-buyer-redesign-2026-04-27/contestant-4/`

| File | What it specifies |
|---|---|
| `positioning.md` | One-paragraph buyer-language positioning |
| `homepage-rewrite.md` | Hero copy, urgency band, post-June-30 variants |
| `product-page-template.md` | Section order, Recognition Principle in Section 3, two-mode variants for IL/NYC |
| `blog-cta-pattern.md` | CTA copy + placement pattern with mode-specific variants |
| `keyword-strategy.md` | 10–15 buyer-intent queries → product slug mapping |
| `voice-spec.md` | "Compliance Specialist at the Counter" voice + 10 example sentences + does-NOT-do list |
| `visual-direction.md` | Palette: Midnight Navy / Enforcement Red / Deadline Amber / Document White / Compliance Blue. Inter + system-UI. Hero + product card + imagery direction. |
| `ia-proposal.md` | Nav rewrite (Get Your Documents / State Deadlines / Resources), 8 → 5 sections, blog demoted, July 1 2026 all-exposed spec |
| `ad-creative.md` | 3 Google RSAs (CO/IL/NYC) + Reddit native + retargeting concept |
| `rationale.md` | Build order with effort signals + statute-source citations |
| `LOOP-2-APPLIED.md` | Loop 2 reflective adjustments (mode-flip mechanism + AlsoExposedStrip) |
| `TIGHTEN-COMPLETE.md` | Phase 7 tightening summary (build order added, recognition principle stretch goal applied) |

## What ships first (per the absorbed Build Order)

1. **Title tag + H1 atomic pair** (single edit in `generateMetadata`). Every product page improves. Single file change.
2. **Nav reorder** — "Get Your Documents" / "State Deadlines" / "Resources." Promotes products, demotes blog.
3. **Visible H1** (currently `sr-only` on the homepage).
4. **Blog CTA Placement 2** — penalty-section trigger with mode-aware urgency line.
5. **Two-mode flip-logic** — `AlsoExposedStrip` component on Colorado / IL / NYC product pages.
6. **`/state-deadlines` hub page** — primary nav entry replacing the implicit "browse all products" path.

If continuity ends after step 1, every product page is already better than today. If it ends after step 3, the highest-leverage homepage changes are in place.

## Hard rules carried forward into the build

- **Integrity discipline:** Every penalty / deadline / statute citation in the winning copy traces to a `.gov` primary source. Colorado $20K is documented as **CCPA-derived (C.R.S. § 6-1-112)**, not SB24-205-direct.
- **Moral boundaries:** No LinkedIn, no "built by AI" framing, no real-name pressure — held throughout.
- **Stack:** Next.js 16 / React 19 / Tailwind 4. No backend changes.
- **Pricing:** $49–$697 range stays.
- **No fal.ai imagery.** Unsplash queries specified in `visual-direction.md`.

## Field contributions (not picked, but kept in the gallery)

- **C3 — Hardware Store + Opinionated Minimalism (rank 2, 26.0):** The Recognition Principle (now also living in C4's Section 3 via tightening) is the field's most original product-page idea. The strict semantic color rules (amber=urgency only, green=verification only) survive regardless of winner — the Proxy explicitly flagged them as the most defensible palette logic.
- **C2 — Transaction-First Declarative (rank 3, 25.5):** The Build Order with atomic-step pairing (now also living in C4's tightened entry) is the field's only operational sequencing. The departure-board hero pattern + `BlogProductCTA` component spec remain reference points.
- **C1 — Calm Authority (rank 4, 24.5, gallery):** Panic-state visual treatment (state-named eyebrow leading with Texas, single-color urgency band, present-tense H1) is the sharpest above-the-fold change pattern in the field.
- **C5 — Wildcard Build-Order Synthesis:** Composes all three structural moves into one shippable spec with mandatory attribution. Available at `contestant-5/WILDCARD/` if GL ever wants to revisit the synthesis path.

## Next phase (when GL is ready)

The contest produced the **design**. Execution is the next session's work. Suggested handoff:

- **Build phase entry point:** `research/contest-buyer-redesign-2026-04-27/contestant-4/` is the source of truth. Build instance reads `rationale.md` (build order) first, then ships step 1 (title tag + H1) as a single commit, verifies live, ships step 2, etc.
- **Verification gates:** Every penalty / deadline / statute claim in the implemented copy must be re-verified against `.gov` source at build time (do not trust the design's citations as final — re-fetch).
- **Loud-failure coverage:** Per the project loud-failure rule, any new form / cascade / external-integration introduced by this redesign must include the three audiences (user-facing error, developer log, monitor alert).

The contest is complete. The design lives. The build is the next session's work.

---

*Compiled by orchestrator after GL's pick. Phase 8 — Top 2 Surface to GL — complete. Phase 9 — GL Picks Winner — complete. Optional Phase 11 (refinement loop on winner) and Phase 12 (render/verify hook) available if GL wants them; otherwise the contest closes here.*
