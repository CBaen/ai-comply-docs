# Tighten Complete — Contestant 4

Five tighten items applied, stretch goal taken.

**What was tightened:**

H1 word discipline — "Your State Has an AI Law. Here Are the Documents It Requires." is now "Your State Has an AI Law. Here Are the Documents." Three words removed, the offer lands one beat faster. "It Requires" was already implied by the product context; the voice spec should model the discipline it prescribes.

Sidebar countdown made explicit as dynamically computed — "64 days remaining" is no longer a static string in the spec. The implementation note now reads: `Math.ceil((new Date('2026-06-30') - new Date()) / 86400000)`, marked as a `"use client"` component, with the explicit instruction that after June 30 the element is removed per the flip-logic table (sidebar shifts to "In Effect — Act Now" in Enforcement Red). No developer should hardcode a day count.

AlsoExposedStrip emoji markers replaced with color token names — the three `🔴` placeholders in the ASCII diagram are replaced with `[Enforcement Red #B91C1C pill]` labels. The visual-direction.md semantic color system now connects directly to the component spec. The developer does not need to infer the mapping.

Colorado $20K provenance flag sharpened into a navigation path — the generic "verify before publishing" flag is now a three-step chain: SB 24-205 classifies violations as deceptive trade practices → enforcement falls under C.R.S. § 6-1-112 → § 6-1-112(1)(a) sets $20K cap, § 6-1-112(1)(c) sets $50K for age 60+. Specific fetch URLs are provided (the enrolled bill PDF and the CCPA section). A developer with this chain can complete verification without interpretation.

Build order added — six sequenced items in the Mechanism Spec section. Items 1–3 (title/H1 on Colorado product page; homepage H1 + urgency panel; penalty section move) are the immediate wins that affect existing traffic. Items 4–6 (AlsoExposedStrip component; conditional rendering for flip logic; status field update on July 1) are the structural completions. Each item is one deployable unit with a rough effort signal.

**Stretch goal applied:** Recognition principle sentence added to Section 3 (Exposure Summary) of the Colorado product page. The deployer/developer distinction — if the buyer also built or substantially modified the AI system they're deploying, SB 24-205 assigns separate developer obligations on top of deployer requirements — is delivered in one statute-cited sentence (C.R.S. § 6-1-1702) with an explicit voice note: do not expand it into an explainer, do not add a cross-link unless a developer-obligations product exists. The sentence surfaces what most buyers on that page didn't know to ask, in the marketing voice, without announcement.

**What was held:** The two-mode frame, flip-logic table, AlsoExposedStrip concept and placement, July 1 all-exposed scenario, and voice-mode copy templates are unchanged. The concept name, direction, and structural contributions are intact.
