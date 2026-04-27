# Blog CTA Pattern — Contestant 4

## The Leakage Problem

The brief names it directly: the top Colorado blog post has 855 impressions and 0 clicks. It contains exactly one link to the Colorado product page in 1,500 words. The EEOC post (the top traffic page) has 1,833 impressions at position 4.16 and a 0.11% CTR — which is roughly 1/50th the expected CTR for position 4 (7.2%, per First Page Sage data). Even accounting for AI Overview suppression, 0.11% at position 4 indicates a SERP mismatch: searchers landing on this result are not finding what they searched for, so they bounce back. The blog-to-product handoff is leaky in two ways:

1. **Quantity:** One product link per 1,500 words is insufficient. Buyers need multiple natural touchpoints.
2. **Urgency:** The existing product link is buried in prose: "You need to complete an impact assessment for each high-risk system you deploy" with the link embedded. There is no standalone CTA that names the deadline, the price, or the specific documents.

## Research Basis

- Position 4 expected CTR: 7.2% ([First Page Sage](https://firstpagesage.com/reports/google-click-through-rates-ctrs-by-ranking-position/)). Actual EEOC post CTR at position 4.16: 0.11%. This gap is partially explained by zero-click AI Overviews, but even accounting for 50% zero-click suppression, 0.11% is far below expected.
- Buyer pain point: "retroactive compliance anxiety" — buyers who read articles realizing they may already be non-compliant. The CTA must convert this anxiety into action, not just inform.
- Competitor observation: TrustArc's Colorado compliance guide ends with "Take the quiz" and "Start a free trial" CTAs — they capture intent at the bottom of their content. aicompliancedocuments.com should do the same, but with a direct product link rather than a lead-gen gate.

---

## The CTA Pattern

### Principle

Three CTA placements per post. Two are inline (integrated naturally into the prose). One is a standalone block CTA. Together, they create a coverage pattern that catches buyers at different scroll depths.

- **Placement 1 — Early inline (after first 300–400 words, within the opening or first H2 section)**
- **Placement 2 — Mid-article inline (within the penalty section, mandatory)**
- **Placement 3 — Bottom block CTA (after the final H2, before the `---` divider)**

---

## Placement 1: Early Inline CTA

**When to insert:** Within the first H2 section or after the opening paragraphs (within first ~400 words), at the moment the reader confirms the law applies to them.

**Template — insert after the applicability statement:**
```
If [LAW] applies to your business, [PRODUCT LINK] gives you the [N]-document compliance package built from the enacted statute text — [DEADLINE or STATUS, e.g., "effective before June 30, 2026"].
```

**Colorado blog example:**
> If SB 24-205 applies to your business — meaning you deploy AI that substantially influences consequential decisions about Colorado residents — the [Colorado SB 24-205 compliance package](/products/colorado-sb24-205) gives you all 8 documents required of deployers, built from the enacted statute text at leg.colorado.gov.

**Illinois blog example:**
> If HB3773 applies to you — meaning you use AI in employment decisions affecting Illinois employees or applicants — the [Illinois HB3773 compliance package](/products/illinois-hb3773) includes the employee AI notification, AI system inventory, and human oversight protocol the law requires. The law is in effect now.

**NYC blog example:**
> If Local Law 144 applies to you — meaning you hire in NYC and use any automated tool to screen or evaluate candidates — the [NYC Local Law 144 package](/products/nyc-local-law-144) covers the annual bias audit requirement, candidate notification, and public disclosure templates. Enforcement is increasing in 2026.

**Rationale:** This placement catches the buyer at the moment of recognition ("yes, this applies to me") before they've scrolled into the complexity of the statute. It is not a hard-sell interrupt — it appears as a natural next sentence that acknowledges the reader's situation and points them to the solution.

---

## Placement 2: Penalty Section Inline CTA (Mandatory)

Every post that discusses enforcement and penalties must end the penalties section with a product link. This is the highest-intent moment in a compliance article — the reader has just read the dollar amounts and the enforcement mechanism.

**Template:**
```
[PRODUCT LINK], starting at $[PRICE], includes the documents required to demonstrate compliance. Built from [CITATION], not a law firm summary.
```

**Colorado example:**
> Penalties of up to $20,000 per violation — each affected consumer potentially a separate count — make documentation the most cost-effective first step. The [Colorado SB 24-205 compliance package](/products/colorado-sb24-205) ($449) includes all 8 documents required of deployers, built from [C.R.S. § 6-1-1701 et seq.](https://leg.colorado.gov/bills/sb24-205) — the same statute the AG enforces from.

**Illinois example:**
> Penalties of up to $16,000 for a first violation and up to $70,000 per violation for repeat offenses ([775 ILCS 5/8A-104](https://www.ilga.gov/legislation/ilcs/documents/077500050K8A-104.htm)) make documentation essential. The [Illinois HB3773 compliance package](/products/illinois-hb3773) covers the notices, inventory, and oversight protocols the statute requires, starting at $249.

**Rationale:** The penalty section is the conversion paragraph — the buyer either acts or leaves. Existing posts end penalty sections with no CTA, losing the highest-intent readers. This placement is **mandatory** (not optional) for all law-specific posts.

---

## Placement 3: Bottom Block CTA (Standalone Component)

After the final H2 section (the "Where to Start" section) and before the `---` divider, insert a dedicated CTA block.

**Component design:**
```
---

## Get the Documents [LAW] Requires

[DEADLINE or status sentence]. [PRODUCT LINK] includes the [N]-document compliance package built from the enacted statute — not a law firm's summary, not a template generator. One-time purchase, instant download.

→ [View the Colorado SB 24-205 Compliance Package — $449](/products/colorado-sb24-205)

→ [Not sure which law applies to you? Start here.](/compliance-deadline-by-state)

---
```

**Colorado example:**
```
## Get the Documents Colorado SB 24-205 Requires

The deadline is June 30, 2026. The [Colorado SB 24-205 compliance package](/products/colorado-sb24-205) includes 8 documents required of deployers, built from the enacted statute text at [leg.colorado.gov](https://leg.colorado.gov/bills/sb24-205). One-time purchase, $449. Instant download.

→ [View the Colorado SB 24-205 Compliance Package — $449](/products/colorado-sb24-205)

→ [See all state compliance packages and deadlines](/compliance-deadline-by-state)
```

**Illinois example:**
```
## Get the Documents Illinois HB3773 Requires

Illinois HB3773 is in effect. Penalties are up to $70,000 per violation for repeat offenses. The [Illinois HB3773 compliance package](/products/illinois-hb3773) includes the notices, inventory, and oversight protocols the statute requires. One-time purchase, $249. Instant download.

→ [View the Illinois HB3773 Compliance Package — $249](/products/illinois-hb3773)

→ [See all state compliance packages and deadlines](/compliance-deadline-by-state)
```

**EEOC/multi-state posts:** Posts not tied to a single law (like the EEOC vacuum post) should use the multi-state version:
```
## Find the Compliance Package for Your State

If you operate in Illinois, Colorado, NYC, or California — each state has its own AI employment law with its own deadlines, penalties, and documentation requirements. Find your state's package.

→ [Browse All State AI Compliance Packages](/products)

→ [See deadlines and penalties by state](/compliance-deadline-by-state)
```

---

## Implementation Notes

### MDX compatibility
The blog renderer (`src/lib/mdx-to-jsx.tsx`) does not support custom components or HTML in the post body. All CTAs must use standard markdown link syntax: `[text](url)`. The block CTA uses `##` for its header, `---` for dividers, and `→` (Unicode right arrow) as a visual emphasis mark — all of which render correctly per the BLOG-STYLE-GUIDE.md supported markdown list.

Do NOT use HTML `<div>` or `<button>` tags inside MDX bodies. Do NOT use custom shortcodes. The pattern above uses only supported markdown elements.

### Which posts get the pattern

**Tier 1 — Law-specific posts (all three placements, law-specific CTAs):**
- colorado-sb-24-205-ai-law-what-businesses-need-to-know.mdx
- illinois-hb3773-ai-employment-law-what-employers-need.mdx
- colorado-ai-law-91-days-deadline-requirements.mdx
- colorado-ai-compliance-hr-software-companies.mdx
- texas-traiga-hb149-ai-law-compliance-guide.mdx
- california-ccpa-admt-risk-assessment-compliance-2026.mdx
- virginia-cdpa-data-protection-assessment-profiling-requirements.mdx
- connecticut-ctdpa-data-protection-assessment-profiling-requirements.mdx
- oregon-cpa-ai-profiling-compliance-guide.mdx
- hiring-software-uses-ai-employment-law-compliance.mdx

**Tier 2 — Multi-state or concept posts (Placements 2 and 3 only, general CTAs):**
- eeoc-ai-guidance-removed-federal-vacuum-2026.mdx
- ai-compliance-penalties-by-state.mdx
- ai-compliance-cost-small-business-2026.mdx
- multi-state-ai-compliance-comparison-guide.mdx
- what-is-ai-bias-audit-does-your-business-need-one.mdx
- what-is-ai-impact-assessment-guide.mdx
- do-i-need-ai-compliance-decision-framework.mdx
- workday-ai-hiring-lawsuit-employer-liability.mdx

**Tier 3 — Framework/reference posts (Placement 3 only):**
- ai-governance-framework-checklist-every-state-law.mdx
- nist-ai-rmf-compliance-guide-colorado-legal-shield.mdx
- iso-42001-ai-certification-enterprise.mdx
- eu-ai-act-compliance-checklist-us-businesses-august-2026.mdx

### Priority order for implementation

Start with:
1. `colorado-sb-24-205-ai-law-what-businesses-need-to-know.mdx` — 855 impressions, 0 clicks
2. `eeoc-ai-guidance-removed-federal-vacuum-2026.mdx` — 1,833 impressions at position 4.16
3. `illinois-hb3773-ai-employment-law-what-employers-need.mdx` — law is in effect now
4. `ai-compliance-cost-small-business-2026.mdx` — catches "ai compliance cost" buyer-intent query (site ranks position 3 with 1 impression — needs CTA when traffic arrives)
5. Remaining Tier 1 posts in order of GSC impressions

---

## What Not to Do

Per the brief's anti-defaults:
- Do NOT make the CTA a newsletter capture ("subscribe for updates")
- Do NOT add "Schedule a consultation" CTAs (no consultation product exists)
- Do NOT use "Get started in minutes" without specifying what they're getting started with
- Do NOT add a product CTA in the opening hook paragraph — it must come after the applicability confirmation, not before
