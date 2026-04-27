# Proxy Coach — Loop 2, Contestant 4

## Your assigned perspective

The two-mode frame is the field's most structurally significant contribution. No other contestant named the distinction between "deadline approaching" and "already exposed" as a first-class design decision. That framing is right and the field will likely converge toward it.

Now spec the mechanism. A buyer lands on the Colorado SB24-205 product page. How does the page know which mode to show them? A buyer lands on NYC Local Law 144. Same question.

Is mode selection automatic — driven by slug and date logic — or does the buyer choose?

---

## The coaching push

Your homepage urgency panel shows both modes in parallel:

"Illinois HB3773 — In Effect Now — Up to $70,000/violation"
"Colorado SB 24-205 — June 30, 2026 — Up to $20,000/violation"
"NYC Local Law 144 — In Effect — Enforcement Rising"

Three rows. Two urgency modes. The visual distinction (Enforcement Red vs. Deadline Amber) signals which is which. This works at the homepage level because the buyer is scanning across laws.

But when the buyer clicks through to a specific product page, they are now inside one law. The two-mode frame collapses to one mode. That mode should be the one that matches this law's enforcement status on the date the buyer arrives.

Colorado's mode is time-bound. Before June 30, 2026: Deadline Approaching. After June 30, 2026: Already Exposed. The page should know this.

Your product-page-template.md specifies the Colorado page with a Status badge ("EFFECTIVE SOON" in amber) and a Deadline Red date ("June 30, 2026"). That's the Deadline Approaching mode. Correct for now.

But there are two things your spec hasn't yet resolved:

**1. After June 30, 2026 — what changes?**
The badge needs to flip from "EFFECTIVE SOON" (amber) to the Already Exposed register (Enforcement Red). The deck below the H1 shifts from deadline pressure to exposure language. The hero CTA doesn't change, but the framing around it does.

Your spec doesn't address what the product page looks like after the deadline passes. This is not a hypothetical — June 30 is 63 days from now. If the site still shows "EFFECTIVE SOON" in amber on July 1, the buyer in Already Exposed mode is being served the wrong urgency register.

**2. The urgency panel on the homepage — does the buyer who arrived via organic search (not the homepage) ever see both modes?**
A buyer who arrives directly on the Colorado product page via SERP has not seen the homepage urgency panel. They land inside one mode. If the Colorado page is currently in Deadline Approaching mode, that buyer gets the countdown frame. Good.

But what if the buyer is a multi-state operator? They arrived on the Colorado page via organic search for "Colorado AI compliance." They need to know they also have Illinois exposure. Your homepage urgency panel would tell them — if they went to the homepage. They probably won't.

Is there a surface on the product page where the Already Exposed mode (for in-effect laws) gets mentioned to the buyer who arrived on a Deadline Approaching page? The related add-ons section is one candidate. The "Also Required?" section at the bottom is another.

---

## The concrete redesign question

Spec two concrete things:

1. The date-logic rule: what triggers the flip from Deadline Approaching to Already Exposed on the Colorado product page? Is this a hardcoded date in `regulations.ts`? Is it a computed field? What changes in the UI when the flip fires — specifically which elements, which colors, which copy?

2. The cross-mode surface: where on the Colorado product page (Deadline Approaching) does a multi-state buyer see that Illinois and NYC are already in Already Exposed mode — without the buyer having to navigate to the homepage to find it?

Your two-mode frame is the field's strongest structural idea. Now give it the implementation specificity that makes it shippable.
