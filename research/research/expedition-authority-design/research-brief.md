# Research Brief: Authority Design Language for AI Comply Docs
## Date: 2026-03-10
## Project: AI Comply Docs (aicomplydocs.com)

### Problem Statement
The site currently uses a generic SaaS landing page design — sky blue CTAs, rounded cards, gradient hero, trust badges. It looks like every other startup template. This is a $299 B2B compliance documentation tool for Illinois employers facing actual legal requirements. It should exude AUTHORITY — like a government compliance portal crossed with a premium legal tech platform. Not impersonating the government, but borrowing the visual DNA that makes people take regulatory content seriously.

### Expected Outcome
A specific, actionable design language that makes the site feel like "this is where official compliance documents come from" rather than "this is a SaaS product trying to sell me something." The buyer should feel like they're interacting with an authoritative regulatory resource, not a marketing page. We want concrete patterns: specific fonts, specific hex codes, specific layout structures, specific component styles — not vague principles.

### Current State
- Site is LIVE at aicomplydocs.com on Vercel
- Static HTML + Tailwind CSS (via CDN) + client-side JS
- Current design system: Trust & Authority (navy #0F172A, sky-700 CTA, Space Grotesk + Inter fonts)
- Design feels generic SaaS despite the "Trust & Authority" intent
- $299 one-time B2B product, Stripe Payment Link checkout
- Full site source at: compliance-tool/index.html

### Project Direction
Zero-involvement digital product. No customer service. Maximum legal shielding. The design must convert without human sales effort — the site IS the entire sales team. Authority design directly impacts whether a $299 B2B buyer trusts this enough to purchase.

### Constraints
- Static site only (HTML + Tailwind CSS + vanilla JS). No frameworks.
- Tailwind via CDN — custom config available via tailwindcss.config
- Must remain a single-page experience with questionnaire flow
- Cannot impersonate a government agency (no official seals, no .gov styling that could be confused for actual government)
- Must still convert — authority without usability is useless
- All changes are CSS/HTML only — no backend changes

### Destructive Boundaries
- Do NOT suggest changing the product structure (5 documents, questionnaire flow, $299 price)
- Do NOT suggest adding customer service, chat, or human touchpoints
- Do NOT suggest framework migrations (React, Next.js, etc.)
- The Stripe Payment Link integration is settled — don't redesign checkout
- Core content (7 IDHR elements, FAQ answers, legal disclaimers) stays the same

### Research Angles

**Team 1: Government & Regulatory Design DNA** — Study the actual visual language of government compliance portals (IRS.gov, SEC.gov/EDGAR, Illinois IDHR, healthcare.gov, FINRA BrokerCheck, UK GOV.UK). What makes them feel authoritative? Extract specific patterns: typography, color palettes, information density, layout structures, spacing, borders/rules, seal/badge placement, document-like layouts. Also study high-end regulatory tech (Bloomberg Terminal, Thomson Reuters Westlaw, LexisNexis) — what design patterns do they share with government sites?

**Team 2: Premium Legal Tech & Fintech Aesthetics** — Study design language of $500+ professional/legal/financial products: Carta, Stripe Atlas, Clerky, LegalZoom premium, Avalara, compliance.ai, OneTrust, TrustArc. What visual patterns signal "this costs real money and is worth it"? How do they balance authority with modern design? What separates a $49 product's design from a $5,000 product's design?

**Team 3: Typography & Color Psychology for Authority** — Which specific typefaces, weights, and color palettes are associated with institutional authority, legal credibility, and government gravitas? Serif vs sans-serif for this context. Navy/charcoal/slate vs current sky-blue. Gold/brass accents, seals, watermark patterns, formal document styling. Find specific font pairings used by actual law firms, government agencies, and compliance platforms.

**Team 4: Layout & Information Architecture for Compliance Products** — How do compliance-focused products structure pages differently from typical SaaS? Government-style dense information grids, tabular layouts, sidebar navigation, breadcrumbs, section numbering, document-style hierarchies. How authority sites use negative space differently — less playful whitespace, more structured density.

**Team 5: Anti-Patterns & Conversion** — What design elements actively UNDERMINE authority for a compliance product? Identify specific SaaS tropes on our current site that make it feel cheap: rounded pill buttons, playful gradients, emoji-style icons, bouncy animations, hero gradients, testimonial carousels. For each anti-pattern, propose what replaces it. Does "looking governmental" hurt or help conversion for B2B compliance products?

### Team Size: 5
Five independent angles covering visual language sources (Teams 1-2), specific design tokens (Team 3), structural patterns (Team 4), and current-site gap analysis (Team 5).

### Failed Approaches
The current "Trust & Authority" design system was the first attempt — it used navy backgrounds and formal typography but fell into SaaS template patterns. The design was built quickly alongside the product logic, and template-driven defaults crept in (gradient hero, rounded cards, sky-blue CTAs, pulse animations). The intent was right; the execution defaulted to generic.
