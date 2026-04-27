# Proxy Field Observation — Loop 2

## What this is

A cross-cutting read of where the five contestants are after Round 2. Written for the orchestrator and for GL. Not a ranking. A pattern map.

---

## 1. Voice-metaphor convergence: three contestants reached for the same counter

In Round 1, voice metaphors diverged. In Round 2, three contestants independently reached for the same frame: compliance knowledge delivered across a counter by someone who knows the inventory.

- C3: "hardware store model — you came in for a fitting, here it is"
- C4: "compliance specialist at the counter"
- C5: "calm hardware store"

All three mean the same thing: expert availability without consultation, product-forward without explanation, mastery visible in the brevity of the answer. This convergence is meaningful. It says the field found a register that correctly describes what this site needs to feel like.

The two who didn't use the counter metaphor:

- C1 ("Calm Authority") arrived at a related but distinct register — authority held in reserve rather than displayed through deployment. Quieter. More credentialist.
- C2 ("Transaction-First Declarative") arrived at a commercial register — the site as a point-of-sale interface. Faster. Less warmth.

The divergence between counter-expertise and transaction-speed is the field's real unresolved tension. The counter expert is also efficient, but their speed comes from mastery. The transaction register's speed comes from removing friction. These produce different sites and attract slightly different buyer states at arrival.

For the orchestrator: which buyer state does this site actually attract? The buyer who searched "Colorado AI compliance documents" is probably closer to the counter model — they arrived because they need to find something specific, not because they want to transact. The buyer who arrived from a deadline-countdown ad is closer to the transaction model — they know what they need, they want to complete. Are those the same buyer, or different buyers in different moments?

---

## 2. Palette convergence: four of five arrived at navy + red + a differentiated accent

| Contestant | Primary | Urgency | Accent | Verified |
|---|---|---|---|---|
| C1 | Navy `#1B2D4F` | Ember Red `#DC2626` | Signal Blue `#2563EB` | Verified Teal `#0D9488` |
| C2 | Dark Navy `#1E293B` | Deadline Red `#DC2626` | Signal Blue `#2563EB` | Trust Green `#16A34A` |
| C3 | Near Black `#0F172A` | Deadline Amber `#B45309` (urgency) + Red (in-effect) | Document Blue `#1E40AF` | Statute Green (unspecified) |
| C4 | Near Black `#0F172A` | Enforcement Red (in-effect) + Deadline Amber (approaching) | — | — |
| C5 | Near Black `#1E293B` | Deadline Red `#DC2626` | Signal Blue `#2563EB` | Statute Green `#16A34A` |

The convergence on near-black backgrounds with red urgency signals is essentially unanimous. C3 is the only contestant who made a principled distinction between red-for-in-effect and amber-for-deadline-approaching as semantic markers rather than intensity signals. That distinction is the field's most defensible palette logic — it encodes meaning, not just emphasis.

C1's Verified Teal is the most distinctive accent. Every other contestant used blue or green for their positive/verified signal. Teal occupies a different psychological register — neither commercial blue nor nature green — and is associated with precision and medical accuracy in color psychology. Whether that's appropriate for a legal compliance context is an open question. It's the one palette choice the field didn't converge toward.

For the orchestrator: C3's semantic color rule (amber = approaching, red = in-effect) should survive into production regardless of which contestant's overall direction wins. It's the clearest design decision with the most structural justification.

---

## 3. Most distinctive vs. most likely to be converged toward

**Most distinctive:** C4. The two-mode frame (Deadline Approaching vs. Already Exposed) is the only genuinely structural contribution in Round 2. Every other contestant optimized voice, hierarchy, or visual language. C4 named a buyer-state distinction that changes what the page *is* depending on the law. No other contestant did this. If the field converges, it will converge toward C4's two-mode logic being absorbed into other designs.

**Most likely to be converged toward:** C5. The blog rewrite priority list, the EEOC post title rewrite, the affirmative defense sentence as conversion bridge — these are all executable. C5's work in Round 2 is the most immediately actionable. Other contestants will find that their redesigns only work if the blog-to-product handoff is fixed, and C5 has already done that thinking.

**Biggest gap between ambition and current spec:** C2. The Build Order is the field's best strategic contribution (sequenced priority with effort estimates). But the voice spec ("Transaction-First Declarative") creates a commercial register that may not match the buyer who arrives via organic search. The field's counter-expertise convergence is a signal that organic search buyers want mastery, not transaction speed. C2's Build Order belongs in every implementation plan. C2's voice spec deserves one more round of scrutiny.

---

## 4. One unresolved question the field has not answered

No contestant addressed what happens to the site's voice when there are no active deadlines.

Colorado's deadline is June 30, 2026. After that date, every law in the current product catalog is "in effect." The Deadline Approaching urgency register disappears. The urgency band "Colorado: June 30, 2026" no longer exists.

C1 gestured at this with "Update as deadlines pass. When Colorado's date passes, next headline becomes 'Your state's AI law is already in effect.'" But that's a copy swap, not a structural answer.

The site's current urgency architecture depends on the existence of at least one upcoming deadline. If Texas TRAIGA (January 1, 2026 — already in effect), Illinois (already in effect), NYC (already in effect), and Colorado (June 30, 2026) are all past their deadlines, the site shifts entirely into Already Exposed mode. The counter-expertise register and the two-mode frame both need to account for this.

This is not an immediate problem. But the design that wins should be able to answer: what does this site look like on July 1, 2026?

No contestant has answered it yet.
