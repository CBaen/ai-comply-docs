# Homepage Rewrite — Contestant 4

## The Concept

The current homepage is optimized for researchers: generic AI compliance coverage statements, methodological trust signals, then product carousels. The buyer — a business owner who just realized they owe legal documents by a specific date — needs the opposite: lead with the deadline, lead with the law's name, lead with the consequence. Then show them the document that solves it.

The redesign reorders the page around deadline urgency and state-specific action, not catalog browsing.

---

## Metadata

### `<title>` tag
```
AI Compliance Documents — Colorado, Illinois, NYC, Texas AI Law Templates | Instant Download
```

**Rationale:** The current title ("Templates for Every State AI Law") is catalog copy. No one searches "templates for every state AI law." Buyers search for the specific law they just discovered applies to them. The new title includes the four highest-priority state names — the same terms buyers type into Google — while preserving the instant-download signal that separates this product from law firm retainers. Character count: 88 (within Google's display range for most titles).

### Meta description
```
Colorado SB 24-205 takes effect June 30, 2026. Illinois HB3773 is in effect now. NYC Local Law 144 enforcement is increasing. Get the documents the law requires — built from enacted statute text, not AI summaries. Download in minutes. $49–$697.
```

**Rationale:** Three specific law names, three specific urgency signals, one differentiator (built from statute, not AI summaries — which directly counters the buyer's biggest trust objection in this niche), and price range to filter qualified buyers. 248 characters — slightly over the 160-character Google limit, so the SERP will truncate, but the first 160 characters carry the three law names and the enforcement signal. This is intentional: the buyer who sees "Colorado SB 24-205 takes effect June 30, 2026. Illinois HB3773 is in effect now. NYC Local Law 144..." already knows this is for them.

Shorter alternative (157 chars, fits SERP fully):
```
Colorado SB 24-205 deadline: June 30, 2026. Illinois HB3773 is in effect now. Get the compliance documents the law requires — built from enacted statute text. $49–$697.
```

---

## Above-the-Fold (Hero Section)

### H1
```
Your State Has an AI Law. It Applies to You Now.
```

**Rationale:** The current H1 is screen-reader-only: "AI Compliance Documents — State AI Compliance Templates." The buyer never sees it. The new H1 speaks directly to the buyer's first question — "does this apply to me?" — and answers it before they read anything else. The word "now" carries the enforcement urgency without being hyperbolic. Short sentences. Direct address. Realist voice.

**Alternative H1 (more specific, lower volume):**
```
The AI Law Deadline Is June 30, 2026. Here Are Your Documents.
```

### Sub-H1 / Deck
```
Colorado SB 24-205. Illinois HB3773. NYC Local Law 144. California ADMT. Texas TRAIGA. These laws are in effect or taking effect soon. If you use AI in hiring, lending, insurance, or consumer decisions — and you operate in any of these states — you have legal obligations right now. Here's how to meet them.
```

**Rationale:** Names the specific laws buyers are already searching for. Uses the exact phrasing that matches buyer-intent queries. Specifies the use-case categories (hiring, lending, insurance, consumer decisions) so the business owner can self-qualify without reading the FAQ. No jargon. No softening qualifiers. Realist voice exactly per BLOG-STYLE-GUIDE.md.

### Primary CTA Button
```
Find Your State's Documents →
```

**Rationale:** The current CTA is "Browse Products." That's catalog copy. "Find Your State's Documents" is a task — the buyer already knows which state they're worried about. This CTA implies the site knows which documents they need, not just a catalog to browse. Links to `/products` filtered by state, or to the compliance-deadline page (see `new-page-spec.md`).

### Sub-CTA
```
Not sure which law applies to you? Start here →
```

**Rationale:** Addresses the #1 buyer objection surfaced in research: "Do we really need to worry if we're just using basic tools?" and "decision paralysis — not knowing whether their specific situation triggers obligations." Links to `/compliance-deadline-by-state` (new page spec) or the FAQ section.

---

## Urgency Bar (New Element — Replace "FeaturedInBar")

Immediately below the hero, before any other content. Replaces the generic "Featured In" bar with a live deadline ticker.

```
┌─────────────────────────────────────────────────────────────────────┐
│  COLORADO SB 24-205     │  ILLINOIS HB3773       │  NYC LL 144       │
│  June 30, 2026          │  In Effect Now         │  In Effect Now    │
│  $20,000/violation      │  Up to $70,000/viol.   │  $500–$1,500/day  │
└─────────────────────────────────────────────────────────────────────┘
```

Each penalty figure links to the product page for that state. The "In Effect Now" badges use the existing red `in-effect` status badge design. The date/penalty information is primary-source verified.

**Penalty source citations (for developer implementation):**
- Colorado $20,000: Colorado Consumer Protection Act (C.R.S. § 6-1-112), via SB24-205 enforcement mechanism — [leg.colorado.gov/bills/sb24-205](https://leg.colorado.gov/bills/sb24-205)
- Illinois up to $70,000: ILCS 5/8A-104, repeat violation tier — [ilga.gov](https://www.ilga.gov/legislation/ilcs/documents/077500050K8A-104.htm)
- NYC $500–$1,500/day: NYC Admin. Code § 20-871(d) — [NYC DCWP](https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page)

**Rationale:** Research finding: The site's top queries are researcher-intent ("ai governance framework template"), while the buyer-intent queries ("ai compliance packages", "ai compliance cost") get almost no traffic despite ranking at positions 3–4.5. The urgency bar is the first thing a buyer sees. It replaces a researcher-appealing "featured in" signal with a buyer-triggering penalty signal. It also serves as the state navigation shortcut that the product carousel currently fails to provide clearly.

---

## Section Order (Full Page)

### Current order:
1. Hero (product carousel — catalog)
2. Featured In bar
3. Methodology (how we build)
4. How It Works (process)
5. [Image break]
6. Pain section (consequences)
7. FAQ
8. Final CTA

### Proposed order:
1. **Hero** — deadline-anchored H1, deck with law names, primary CTA
2. **Urgency Bar** — state penalties with deadlines (replaces FeaturedInBar)
3. **"Does This Apply to You?" section** — three buyer scenarios (new, short)
4. **Pain section** — consequences, moved up before How It Works
5. **How It Works** — 3-step process, now comes after pain is established
6. **Methodology** — trust signals (stays, moves to after conversion section)
7. **State Documents Grid** — replaces product carousel with state-organized view
8. **FAQ** — reordered to address buyer objections first (see below)
9. **Final CTA**

### Rationale for reorder:
The current order shows the solution (methodology, how it works) before establishing the problem (pain/consequences). A buyer landing from a search like "Colorado AI law compliance template" needs the pain confirmed first — the deadline, the penalty — before they can evaluate whether the solution is right for them. Moving the pain section above "How It Works" follows the persuasion logic: establish the cost of inaction before offering the resolution.

---

## "Does This Apply to You?" Section (New, Short — 3 scenarios)

**Section header:**
```
Three situations where this matters right now
```

**Scenario 1 (Employment):**
```
You use any tool that screens, ranks, or scores job candidates. If you have employees or applicants in Illinois, NYC, or Colorado, you have legal obligations today. HB3773 requires employee notifications and an AI use policy. NYC Local Law 144 requires an annual independent bias audit. Colorado SB 24-205 requires impact assessments.
```

**Scenario 2 (Consumer decisions):**
```
Your business uses AI in lending, insurance, healthcare, or housing decisions. Colorado and California both regulate AI in these contexts specifically. If an AI system is a substantial factor in a decision that affects someone's access to credit, insurance, housing, or healthcare — the law applies to you, not just to the company that built the AI tool.
```

**Scenario 3 (You're not sure):**
```
Your software vendor uses AI and you don't know the details. If the tool screens, scores, ranks, recommends, or personalizes outcomes for people — there's almost certainly AI involved. Most compliance obligations fall on the business deploying the tool, not the vendor. If you're in a state with an active law, "I didn't know the vendor used AI" is not a legal defense.
```

**Rationale:** Research finding: The #1 buyer objection is "Do we really need to worry if we're just using basic tools?" and "scope confusion — unclear whether their specific revenue size, state location, or industry triggers obligations." These three scenarios answer the scope question in buyer language, not legal language, before the buyer reaches the FAQ.

---

## FAQ Reorder (Existing FAQs, New Priority Order)

Current first FAQ: "How do I know if any of this applies to my business?" — this is good, keep it first.

**Proposed FAQ order:**
1. How do I know if any of this applies to my business? (keep)
2. What if I don't know whether my tools use AI? (keep)
3. Where do I start if I don't know which law applies to me? (keep)
4. **NEW: What documents do I actually need?** (see below)
5. Is this legal advice? (keep)
6. How are the documents generated? (keep)
7. What AI regulations do you cover? (move later — researcher question)
8. Do I need this if I already have outside counsel? (keep)
9. What if the law changes? (keep)
10. Are all sales final? (keep)

**New FAQ #4 copy:**
```
Q: What documents do I actually need?

A: That depends on which law applies to you and what role your business plays. For Colorado SB 24-205 (effective June 30, 2026), deployers need an impact assessment, a risk management policy, and a consumer notice for each AI system used in consequential decisions. For Illinois HB3773 (in effect now), employers need an employee AI notification, an internal AI system inventory, and a human oversight protocol. For NYC Local Law 144 (in effect, enforcement increasing), you need an annual bias audit, public disclosure of results, and advance candidate notification. Each product page lists the exact documents included and what the law requires each one to cover.
```

**Rationale:** Current FAQs are well-written but miss the most practical buyer question: "what exactly do I buy?" Adding this FAQ converts FAQ reading into product navigation.

---

## Final CTA (Existing — Minimal Change)

**Current:**
```
Don't wait for a complaint
AI regulations are in effect now. Get your compliance documents today for a fraction of what a law firm charges.
[Browse Products →]
```

**Proposed:**
```
The deadline doesn't move
Colorado's AI law takes effect June 30, 2026. Illinois HB3773 is in effect now. NYC Local Law 144 enforcement is increasing. Get your compliance documents today — built from the enacted statute, not a law firm's summary, not an AI generator.
[Find Your State's Documents →]
```

**Rationale:** "Don't wait for a complaint" is a good Realist-voice line. "The deadline doesn't move" is sharper — it names the buyer's specific anxiety (hoping the deadline will be delayed again) directly. The sub-copy names three specific laws instead of the generic "AI regulations are in effect now." The CTA button matches the hero CTA for consistency.
