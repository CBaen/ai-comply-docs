# Research Brief: Trust Audit — AI Comply Docs
## Date: 2026-03-10
## Project: project _cameron (AI Comply Docs)

### Problem Statement
The builder already made a significant error — placing a 30-day money-back guarantee across 12+ files on an instant-download digital product. This reveals a pattern of defaulting to generic templates instead of thinking about what this specific product actually is. The owner (Cameron) does not trust that other similar errors don't exist throughout the site. This audit must find every instance of lazy, template-driven, or unexamined content across the entire product.

### Expected Outcome
A comprehensive list of every issue that needs fixing — legal exposure, false claims, broken flows, unbackable trust signals, automation failure modes, and anything that doesn't hold up to scrutiny for a $299 B2B digital product sold through a Wyoming LLC with zero human involvement.

### Current State
- Site is LIVE at aicomplydocs.com (Vercel)
- Stripe payment link is active ($299 one-time, product/price verified)
- Self-healing regulation monitor script exists but Task Scheduler is not yet activated
- 30-day money-back guarantee was just removed (the error that triggered this audit)
- Wyoming LLC provides corporate liability shield
- Zero customer service infrastructure — no human involvement by design

### Project Direction
This product must run itself completely. Cameron should never have to touch it, answer emails, or intervene. Legal shielding must be maximum. Every claim must be defensible. Every promise must be keepable.

### Constraints
- Wyoming LLC is the legal entity — all legal language must be appropriate for this structure
- Zero human involvement requirement — any finding that requires Cameron's ongoing attention is a design failure
- Site is static HTML + client-side JS on Vercel — no server-side processing
- Stripe handles all payment — no custom payment processing
- All document generation happens client-side in the browser

### Destructive Boundaries
- Do NOT modify any files. Read-only audit.
- Do NOT suggest adding customer service, support tickets, or anything requiring human involvement
- The core product concept (AI compliance doc generator) is settled — don't question whether it should exist

### Research Angles

**Team 1: Legal & Liability** — Read terms.html, privacy.html, index.html claims, pdf-generator.js disclaimers. Find every promise, warranty, or statement that creates legal exposure. Check UPL risk, arbitration enforceability, "all sales final" compliance with Stripe policies.

**Team 2: Product Accuracy & Claims** — Verify every factual claim on the site against actual HB3773 law text. Are there really 7 IDHR elements? Is the pricing comparison defensible? Are there coming-soon promises that can't be fulfilled? Does Schema.org data match reality?

**Team 3: Business Model & Checkout Flow** — Walk through the entire code path from button click to document delivery. Find every failure mode. What happens if sessionStorage clears? Is there a contact email? Can a customer who paid but didn't receive documents reach anyone?

**Team 4: Design & Trust Signals** — Find every unbackable claim ("Used by Illinois employers"), fake social proof, broken link, accessibility failure, or trust signal that doesn't hold up to scrutiny.

**Team 5: Self-Healing & Automation** — Audit the regulation monitor script. What happens when it runs? What happens when it fails? Can Claude Code autonomously create legally dangerous content? What if git push fails mid-update?

### Team Size: 5
Five independent angles with no overlap. Each team should assume the others will miss things in their domain.

### Failed Approaches
The builder (me) already failed the trust test by applying generic patterns without product-specific thinking. This audit exists because self-review was insufficient.
