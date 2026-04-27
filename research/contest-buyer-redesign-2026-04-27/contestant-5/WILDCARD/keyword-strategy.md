# Keyword Strategy — Wildcard Synthesis

Carried forward from Contestant 5 Round 2 entry (voice-agnostic — no changes needed).

## Research basis

All queries identified via live WebSearch during Round 1 session (2026-04-27). Each query reflects buyer-intent search patterns for compliance template purchases — not researcher queries about AI governance frameworks.

---

## Keyword-to-slug mapping

### Colorado (priority 1 — June 30, 2026 deadline)

| Query | Intent signal | Target slug | Source |
|---|---|---|---|
| `colorado AI law compliance template` | Buyer with deadline awareness | `/products/colorado-sb24-205` | WebSearch: appeared in results for "Colorado AI law compliance template small business 2026" |
| `colorado SB 24-205 compliance documents` | High-intent, law-specific | `/products/colorado-sb24-205` | Appeared directly in SERP for CO queries |
| `colorado AI act compliance package` | Buyer ready to purchase | `/products/colorado-sb24-205` | Appeared in TrustArc and ALMcorp targeting this phrase |
| `colorado AI law small business` | Problem-aware SMB | `/products/colorado-sb24-205` | Sourced from OST Agency "AI compliance guide 2026 US small businesses" |
| `colorado AI law impact assessment template` | Buyer who knows which document they need | `/products/colorado-sb24-205` | Derived from TrustArc Colorado compliance guide mentioning "Impact Assessment Framework" |

**Gap observation:** The site's CO blog post appears for "Colorado's AI Law Takes Effect June 30, 2026" queries but the product page at `/products/colorado-sb24-205` is position 11 for most buyer-intent terms. Step 1 of the build order (title tag + H1 rewrite) directly targets this gap.

---

### Illinois (priority 2 — in effect now, $70K penalty, highest SMB hiring exposure)

| Query | Intent signal | Target slug | Source |
|---|---|---|---|
| `illinois HB3773 compliance template` | Direct buyer query | `/products/illinois-hb3773` | WebSearch: aicompliancedocuments.com ranks for this — conversion problem, not visibility problem |
| `illinois AI employment law compliance documents` | Buyer who has discovered the law | `/products/illinois-hb3773` | Sourced from Ogletree, Hinshaw, Seyfarth results |
| `illinois AI hiring notice template` | Buyer who knows they need the notice | `/products/illinois-hb3773` | Derived from product description mentioning "Employee & Applicant AI Notification" |
| `do I need to comply with Illinois AI law` | Problem-aware, pre-purchase | `/blog/illinois-hb3773...` → `/products/illinois-hb3773` | Blog-first, then product via blog CTA pattern |

**Gap observation:** Illinois product page already ranks — conversion is the problem, not visibility. Blog CTA pattern (Step 4) and product page improvements (Step 7) fix the handoff.

---

### NYC Local Law 144 (priority 3 — in effect since 2023, enforcement active)

| Query | Intent signal | Target slug | Source |
|---|---|---|---|
| `NYC Local Law 144 compliance template` | Direct buyer query | `/products/nyc-local-law-144` | WebSearch: VerifyWise, Warden AI, RiskTemplates appear for this |
| `NYC bias audit template download` | Buyer ready to purchase | `/products/nyc-local-law-144` | WebSearch: nycbiasaudit.com, Warden AI serve this query |
| `NYC Local Law 144 bias audit documents` | High intent | `/products/nyc-local-law-144` | Deloitte, DCWP results |
| `automated employment decision tool compliance NYC` | Problem-aware | `/products/nyc-local-law-144` | DCWP page and DCI Consult rank for this |

**Competitive differentiation note:** NYC competitors (Warden AI, DCI Consult, nycbiasaudit.com) sell bias audit services at $5,000–$50,000. This site sells bias audit documentation templates at $399 — the pre-audit infrastructure, not the audit itself. Ad copy and product page must make this distinction explicit. The NYC recognition sentence ("The bias audit must be conducted by an independent auditor — your HR team cannot conduct it internally. These documents are the pre-audit infrastructure, not the audit itself.") directly addresses this confusion.

---

### Texas TRAIGA (priority 4 — in effect January 1, 2026)

| Query | Intent signal | Target slug | Source |
|---|---|---|---|
| `Texas AI law compliance documents` | Direct buyer query | `/products/texas-traiga` | WebSearch: Norton Rose, K&L Gates, Ropes & Gray serve this |
| `Texas TRAIGA compliance template` | High intent, law-specific | `/products/texas-traiga` | TXAIMS.com appears; site's product page should compete here |
| `Texas responsible AI governance act documents` | Problem-aware | `/products/texas-traiga` | Derived from Benesch, Perkins Coie law firm articles |

**Gap observation:** TRAIGA has the largest penalty ceiling ($200,000 per uncurable violation — secondary source, requires primary source verification against HB 149 TRAIGA § 552.053 before using in buyer-facing copy). Texas is a large SMB market with no affordable instant-download competitor visible in search results.

---

### California (priority 5 — ADMT regulations active)

| Query | Intent signal | Target slug | Source |
|---|---|---|---|
| `California CCPA ADMT compliance template` | Direct buyer query | `/products/california-ccpa-admt` | Site already has this product |
| `California automated decision making compliance documents` | Problem-aware | `/products/california-ccpa-admt` | CPPA rulemaking search results |

---

## Cross-cutting buyer-intent queries (homepage / product index)

| Query | Intent | Target |
|---|---|---|
| `AI compliance documents small business` | Top-of-funnel buyer | Homepage |
| `AI compliance template instant download` | Purchase-ready | Homepage or `/products` |
| `state AI law compliance package` | Multi-state buyer | `/products` catalog |
| `AI compliance deadline by state` | Scope-confused buyer | `/compliance-deadline-by-state` |

---

## Priority order for implementation (matches build order)

1. `/products/colorado-sb24-205` — title/meta rewrite with June 30, 2026 deadline (Step 1)
2. `/products/illinois-hb3773` — title/meta with "In Effect Now" enforcement status (Step 1)
3. `/products/nyc-local-law-144` — add "bias audit documentation" (not "bias audit service") to meta (Step 1)
4. Homepage — urgency band with four state statuses, linked to product pages (Step 3)
5. Blog posts — 3+ product links per post (Step 4-5)
6. `/compliance-deadline-by-state` — targets "AI compliance deadline by state" and scope-confused buyers (Step 10)
7. `/products/texas-traiga` — title with "In Effect Now," penalty figure pending primary source verification (Step 1 with caveat)
