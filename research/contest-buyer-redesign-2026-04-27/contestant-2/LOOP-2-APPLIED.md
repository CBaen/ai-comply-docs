# Loop 2 Applied — Contestant 2

## What Changed

Two edits, both in the product-page-template.md and homepage-rewrite.md Build Order.

**Product page H1 spec** (product-page-template.md): Changed the H1 from `Colorado SB 24-205 Compliance Documents` (product-forward, descriptive) to `Colorado SB 24-205 — June 30, 2026` (law name + enforcement date, nothing else). The Proxy's point was precise: the SERP title promises "Deadline June 30, 2026," the buyer clicks because of that date, and the H1 should confirm that date at the first element they read — not one line lower in the deck. The same pattern applies across all products: in-effect laws get "— In Effect Since [date]" so the H1 always fulfills whatever urgency signal the title tag created. Implementation note added: this is a computed string from `reg.status` and `reg.effectiveDate`, not a hardcoded override per slug.

**Build Order item 1** (homepage-rewrite.md): Expanded from "title tags on all product pages (30 minutes)" to "title tags + product page H1 (45 minutes — one atomic step)." Added explicit instruction that these two changes must ship together and the reason why: the title tag creates a deadline expectation; the H1 fulfills it. Shipping one without the other leaves the SERP promise incomplete. Also clarified item 2 as specifically the *homepage* H1 to avoid confusion with the product page H1 now bundled into item 1.

## What I Held

The voice spec, visual direction, IA proposal, ad creative, and all other Round 2 work are unchanged. The Proxy's note was targeted — one gap in the buyer journey, one fix — and I applied it without widening scope. The Build Order structure (7 items, starred first ship) is intact; item 1 is now slightly more expensive in time (30 min → 45 min) but the logic tightens rather than changes.
