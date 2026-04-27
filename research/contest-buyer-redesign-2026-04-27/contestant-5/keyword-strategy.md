# Keyword Strategy — Contestant 5

## Research basis

All queries below were identified via live WebSearch during this session (2026-04-27). Each query reflects what a buyer-intent searcher would type when they have a specific compliance problem — not when they're researching AI governance in the abstract. Sources are cited inline.

---

## Keyword-to-slug mapping (10–15 buyer-intent queries)

### Colorado (priority 1 — June 30, 2026 deadline)

| Query | Intent signal | Target slug | Source |
|---|---|---|---|
| `colorado AI law compliance template` | Buyer with deadline awareness | `/products/colorado-sb24-205` | WebSearch: appeared in search results for "Colorado AI law compliance template small business 2026" |
| `colorado SB 24-205 compliance documents` | High-intent, law-specific | `/products/colorado-sb24-205` | Appeared directly in SERP for CO queries |
| `colorado AI act compliance package` | Buyer ready to purchase | `/products/colorado-sb24-205` | Appeared in TrustArc and ALMcorp targeting this phrase |
| `colorado AI law small business` | Problem-aware SMB | `/products/colorado-sb24-205` | Sourced from OST Agency "AI compliance guide 2026 US small businesses" result |
| `colorado AI law impact assessment template` | Buyer who knows what document they need | `/products/colorado-sb24-205` | Derived from TrustArc Colorado compliance guide mentioning "Impact Assessment Framework" |

**Gap observation:** The site's CO blog post appears for "Colorado's AI Law Takes Effect June 30, 2026" queries, but the product page at `/products/colorado-sb24-205` is position 11 for most buyer-intent terms. The product page needs the title/meta rewrite and the keyword anchoring to the specific document names ("impact assessment," "risk management policy," "consumer notice") that buyers search for.

---

### Illinois (priority 2 — in effect now, $70K penalty, highest SMB hiring exposure)

| Query | Intent signal | Target slug | Source |
|---|---|---|---|
| `illinois HB3773 compliance template` | Direct buyer query | `/products/illinois-hb3773` | WebSearch results show aicompliancedocuments.com ranks for this |
| `illinois AI employment law compliance documents` | Buyer who has discovered the law | `/products/illinois-hb3773` | Sourced from Ogletree, Hinshaw, Seyfarth results in IL query |
| `illinois AI hiring notice template` | Buyer who knows they need the notice | `/products/illinois-hb3773` | Derived from illinois-hb3773 product description mentioning "Employee & Applicant AI Notification" |
| `do I need to comply with Illinois AI law` | Problem-aware, pre-purchase | `/blog/illinois-hb3773-ai-employment-law-what-employers-need` → `/products/illinois-hb3773` | Typical buyer-journey query pattern; maps to blog first, then product |

**Gap observation:** Illinois queries are heavily served by law firm articles and HR tech platforms (Warden AI, FairNow). The site's blog post ranks for these queries but has the same product-link leakage problem. The keyword for the product page specifically should target "template," "documents," "package" — purchase-intent modifiers the law firm articles don't optimize for.

---

### NYC Local Law 144 (priority 3 — in effect since 2023, enforcement active, highest awareness)

| Query | Intent signal | Target slug | Source |
|---|---|---|---|
| `NYC Local Law 144 compliance template` | Direct buyer query | `/products/nyc-local-law-144` | WebSearch: VerifyWise, Warden AI, RiskTemplates appear for this |
| `NYC bias audit template download` | Buyer ready to purchase | `/products/nyc-local-law-144` | WebSearch: nycbiasaudit.com, Warden AI serve this query |
| `NYC Local Law 144 bias audit documents` | High intent | `/products/nyc-local-law-144` | Deloitte, DCWP results show buyer-facing content |
| `automated employment decision tool compliance NYC` | Problem-aware | `/products/nyc-local-law-144` | DCWP page and DCI Consult rank for this; product page should too |

**Gap observation:** NYC Local Law 144 is the most saturated competitor market. Warden AI, DCI Consult, nycbiasaudit.com all have strong positioning. The competitive angle: those platforms sell services ($5,000–$50,000 bias audit) — the product page should explicitly contrast "bias audit documentation templates" (what we sell) vs. "bias audit service" (what they sell). Buyers who can't afford a $10K audit can still get the documentation framework for $399.

---

### Texas TRAIGA (priority 4 — in effect January 1, 2026)

| Query | Intent signal | Target slug | Source |
|---|---|---|---|
| `Texas AI law compliance documents` | Direct buyer query | `/products/texas-traiga` | WebSearch: Norton Rose, K&L Gates, Ropes & Gray serve this; no SMB-accessible product ranks |
| `Texas TRAIGA compliance template` | High intent, law-specific | `/products/texas-traiga` | TXAIMS.com appears; the site's product page should compete here |
| `Texas responsible AI governance act documents` | Problem-aware | `/products/texas-traiga` | Derived from Benesch, Perkins Coie law firm articles |

**Gap observation:** TRAIGA has the largest penalty ceiling ($200,000 per uncurable violation, sourced from txaims.com live research). The product page for Texas should lead with this number prominently — it is a more alarming figure than Colorado's $20,000, and Texas is a larger SMB market. The current product catalog may not have a Texas TRAIGA page ready; verify readiness in `regulations.ts` before targeting these queries.

---

### California (priority 5 — ADMT regulations active)

| Query | Intent signal | Target slug | Source |
|---|---|---|---|
| `California CCPA ADMT compliance template` | Direct buyer query | `/products/california-ccpa-admt` | Site already has this product; blog post exists |
| `California automated decision making compliance documents` | Problem-aware | `/products/california-ccpa-admt` | Derived from CPPA rulemaking search results |

---

## Cross-cutting buyer-intent queries (homepage / product index)

| Query | Intent signal | Target |
|---|---|---|
| `AI compliance documents small business` | Top of funnel buyer | Homepage |
| `AI compliance template instant download` | Purchase-ready | Homepage or `/products` |
| `state AI law compliance package` | Multi-state buyer | `/products` (catalog) |
| `do I need AI compliance documents` | Problem-awareness | `/blog/do-i-need-ai-compliance-decision-framework` → product |

---

## Structural recommendation: The queries the site is NOT ranking for that it should be

Based on WebSearch results, these queries are served by law firm articles and enterprise platforms — not by any SMB-accessible product at purchase-intent:

1. **"[state] AI law compliance checklist"** — law firms publish free checklists; we should out-convert them with a product-page that delivers the actual checklist as part of a purchasable package
2. **"AI hiring tool compliance [state]"** — served by Warden AI (service) and FairNow (SaaS); we should target with product-specific landing pages for HR software users
3. **"bias audit documentation template"** — served by enterprise platforms; our $399 NYC package competes directly if positioned as the template, not the audit service

These three queries are NOT currently on the site's keyword list and should be added to the content or product-page targeting in the next build stage.

---

## Priority order for implementation

1. `/products/colorado-sb24-205` — title/meta rewrite to Colorado-deadline-specific copy (deadline June 30, 2026)
2. `/products/nyc-local-law-144` — add "template download" and "bias audit documentation" to meta and H1
3. `/products/illinois-hb3773` — add "employment AI notice template" to meta
4. Homepage — urgency bar with state deadlines, linked to product pages
5. Blog posts — 3+ product links per post (see blog-cta-pattern.md)
6. `/products/texas-traiga` (if ready) — lead with $200,000 penalty in meta and above-fold
