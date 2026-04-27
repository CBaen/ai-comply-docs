# Voice Spec — Marketing Surfaces
## Contestant 1 / Round 2

---

## The Voice: Calm Authority

The new marketing voice for homepage, product pages, ad creative, and navigation copy is **Calm Authority**. It does not explain. It does not persuade. It declares. It knows exactly what you need and says so without hedging. Think hardware store, not law firm. Think pharmacist dispensing what was prescribed, not salesperson pitching a product.

The voice speaks in the second person, present tense, specific nouns. It names laws by their common name without over-explaining what they are — the buyer searching "Illinois HB3773 compliance template" already knows what the law is. They need to know we have what they're looking for. The voice's job is to confirm that, immediately and without friction, and then tell them what to do.

**Loop 2 addition — Calm Authority at different arrival altitudes:**

Calm Authority is one voice, but it has two registers depending on the buyer's state at arrival. Most of the spec describes the *organized buyer* — someone who searched a specific law name and landed ready to evaluate. But a meaningful segment arrives panicked: the restaurant owner in Austin who got a vendor email at 11pm and doesn't know if TRAIGA applies to their hiring software. For the panicked buyer, Calm Authority's job is not to calm them down — it's to catch them first, then steady them.

The catch happens in the visual layer (eyebrow size, state names, urgency band visual weight — see `visual-direction.md`), not in a change to the voice itself. The voice stays declarative throughout. But the *first element* the panicked buyer sees must name their state before the H1 does — otherwise the voice's calm reads as indifference to their specific situation. Calm after confirmation. Not calm instead of it.

---

## 5–10 Example Sentences

**Homepage hero:**
> "Your state's AI law is in effect. We built the documents."

**Homepage hero variant:**
> "AI in your hiring. Colorado says you need these documents by June 30."

**Product page opening (Illinois HB3773):**
> "HB3773 is in effect. Here's the package."

**Product page sub-copy:**
> "Seven documents. Built from Public Act 103-0804. Yours in ten minutes."

**Urgency bar:**
> "June 30 isn't a suggestion."

**FAQ answer — does this apply to me:**
> "If you hire in Illinois and your tools screen, score, or rank candidates — yes."

**Blog-to-product CTA headline:**
> "Illinois is already law. Get the documents."

**Ad headline:**
> "NYC Bias Audit Docs. $399. Today."

**Product page penalty callout:**
> "Up to $70,000 per aggrieved person. That's the statute. (775 ILCS 5/8A-104)"

**Navigation label:**
> "Get Your Documents" (replaces "Products")

---

## What This Voice Does NOT Do

- Does not explain what AI compliance is. The buyer knows. Skip the education.
- Does not open with "If you're like most business owners..." or any reader-empathy preamble.
- Does not use passive voice ("documents are provided," "compliance can be achieved").
- Does not hedge penalty exposure ("could face fines," "may be subject to penalties").
- Does not soften deadlines ("compliance will be required," "laws are coming into effect").
- Does not use abstract noun piles ("comprehensive documentation solutions for regulatory adherence").
- Does not deploy discovery verbs ("discover," "explore," "find out how").
- Does not qualify with "we believe" or "we think" or "it's possible that."
- Does not use inflation words ("trusted by," "industry-leading," "cutting-edge").
- Does not write paragraphs where bullets will do.
- Does not explain the product methodology at the top of the hero — methodology lives in the trust section, not the headline.

---

## One-Paragraph Rationale

The buyer profile — a small/mid business owner with a compliance deadline and no in-house legal team — is not in discovery mode when they land on this site. They arrived because an auditor, vendor, or lawyer told them they have a problem. Or they Googled "Illinois HB3773 compliance" at 11pm after reading about the law. Either way, they already understand the landscape. What they need is a site that reflects their situation back at them and immediately offers to resolve it. Calm Authority does this. It doesn't over-explain because over-explanation signals uncertainty. It doesn't pressure because pressure signals desperation. It simply acknowledges the law, names the documents, and tells the buyer how to get them. The voice is confident because the product is real — built from enacted statute text, not AI-generated summaries. Confidence on that fact, spoken plainly, is the most persuasive thing on the page.

---

## Voice Hierarchy by Surface

| Surface | Voice Register | Primary Job |
|---------|---------------|-------------|
| Homepage hero | Declarative, product-forward | Confirm the buyer is in the right place in <5 words |
| Product page opening | Direct, specific | Name the law, confirm availability, price, format |
| Product page penalty callout | Statute-exact, no softening | Make the abstract penalty concrete |
| Product page FAQ | Conversational, second-person | Remove the one objection standing between buyer and purchase |
| Blog-to-product CTA | Imperative, outcome-named | Convert informational attention to purchase intent |
| Navigation labels | Transactional verbs | Signal "store" not "library" |
| Ad headlines | Maximum compression | Name law + document type + price in ≤30 chars |

---

## Transition Boundary: Where Blog Voice Ends and Marketing Voice Begins

The BLOG-STYLE-GUIDE Realist/Credentialist voice stays unchanged for the full blog post body, including deep-dive sidebars, micro-facts, and external references. The new Calm Authority voice takes over at exactly two moments inside blog posts:

1. The `<BlogProductCTA>` component — not part of the article body, visually distinct
2. Any in-nav or in-footer link copy referencing the product catalog

The blog body itself is not a marketing surface. The CTA injected into it is.
