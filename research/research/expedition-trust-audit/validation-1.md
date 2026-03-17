# Expedition Validation Report — Trust Audit
## Date: 2026-03-10
## Validator: Claude Sonnet 4.6

---

## Scope

Five research teams returned findings on aicomplydocs.com. This report stress-tests their evidence, surfaces contradictions between teams, flags opinions presented as fact, and verifies key code claims against the actual files.

Source files verified:
- `js/stripe-checkout.js` — read in full
- `index.html` lines 1–100 — read directly
- AAA Consumer Arbitration Rules (live fetch: adr.org/consumer)
- IDHR Subpart J status (live fetch: hinshawlaw.com article cited by Team 1)

---

## Section 1: Evidence Challenges

### 1A — "Stripe payment link is NOT configured to redirect" (Team 3, C1) — VERIFIED CORRECT but overstated severity

**What the code actually shows:** `stripe-checkout.js` line 29 defines `successUrl: window.location.origin + '?payment=success'` and line 69 executes `window.location.href = STRIPE_CONFIG.paymentLink`. Team 3's claim that `successUrl` is a dead variable is **confirmed by direct code inspection** — it is defined but never passed to Stripe.

**What Team 3 overstates:** The claim that "every single paid customer receives nothing" is stated as current fact. It is actually conditional: *unless the Stripe dashboard has already been manually configured with the redirect URL*. Team 3 acknowledges this caveat in their Gaps section (Gap 1) but does not weight it proportionally in the headline. The Stripe dashboard configuration is not visible in the codebase. Team 3 cannot confirm the link is misconfigured — only that the code cannot configure it. This is a real and serious risk, but the headline severity is presented as confirmed failure when it is actually an unverifiable condition.

**Verdict:** Evidence for the structural vulnerability is solid. The "every customer gets nothing" framing is an assumption, not a confirmed finding.

---

### 1B — "Used by Illinois employers" — CONFIRMED FALSE CLAIM, correctly identified by Teams 2 and 4

Both teams flag this. Team 4 cites `index.html line 266`. Team 2 correctly identifies FTC Act Section 5 exposure. This finding is robust — there is no customer database, no purchase records, and no testimonials anywhere in the reviewed code. Both teams agree. No contradictions. Verdict: **solid finding, correctly rated Critical/Critical.**

---

### 1C — AAA Consumer Clause Registry (Team 1, Moderate 1) — PARTIALLY VERIFIED, date claim is weak

Team 1 states the AAA registry requirement took effect "May 1, 2025." Live fetch of adr.org/consumer confirms the registry exists under 2025 Consumer Arbitration Rules Rule R-12 and that "if a business has not registered its clause before a consumer case is filed, the AAA requires clause submission at that time." **The specific May 1, 2025 effective date could not be independently confirmed from the page.** The Bradley LLP citation is used as the source for that date but was not directly fetched.

More importantly: the live AAA page describes submission as triggered when a consumer case is filed, not as a pre-registration requirement. This is meaningfully different from Team 1's framing that the clause is currently exposed for not being pre-registered. The practical risk is lower than stated — the clause isn't void for non-registration; it must be submitted when a dispute arises.

**Verdict:** The registry exists and is real. The "registered before case is filed" framing in Team 1 overstates the pre-registration obligation. This is an opinion-as-fact issue: moderate risk presented as a known compliance gap.

---

### 1D — IDHR Subpart J "draft vs. finalized" status — CONFIRMED DRAFT, both teams correct

Teams 1 and 2 both flag that Subpart J rules are still in draft form as of March 2026. Live fetch of the Hinshaw article (Team 1's own cited source) confirms: "the IDHR could revise the draft rules based on feedback before publishing them and opening a formal public comment period." The rules are not final. **Both teams correctly identify this.** The site's language treating them as published binding rules is inaccurate.

Element 7 ("required statutory language") is also confirmed by the live Hinshaw fetch — the article describes it only as "required statutory language" without specifying what that language is. Team 2's finding that the site's custom anti-discrimination paragraph may not satisfy this is **structurally correct** but the gap cannot be fully confirmed because the actual statutory text was not retrieved.

---

### 1E — "DOMContentLoaded fires before stripe-checkout.js loads" (Team 3, Minor m1) — UNVERIFIED, likely wrong

Team 3 claims that because scripts load at the bottom of `<body>`, `DOMContentLoaded` has already fired by the time `stripe-checkout.js` registers its listener. This is **incorrect browser behavior.** `DOMContentLoaded` fires after the HTML is fully parsed, but inline `<script>` tags at the bottom of `<body>` block parsing until they execute. Scripts at bottom-of-body execute *before* `DOMContentLoaded` fires in virtually all browsers. The `document.addEventListener('DOMContentLoaded', checkPaymentReturn)` pattern at line 74 of `stripe-checkout.js` is standard and works correctly in this position.

Team 3 partially hedges this ("in most browsers this works by coincidence") but the framing is misleading — it is not coincidence, it is specified behavior. This minor issue is incorrectly characterized and should not be in the report as a real risk.

**Verdict:** Team 3's Minor m1 is based on a misunderstanding of browser script execution order. It is not a valid finding.

---

### 1F — "$5,000–$25,000 attorney fee comparison" — DIRECTIONALLY REAL, framing contested between teams

Teams 2 and 4 both address this, but reach slightly different conclusions. Team 2 says the range is "defensible but framing mixes proactive drafting costs with reactive litigation costs." Team 4 says the trust bar "$5,000+" is "misleading in its selectivity." Neither team produces a source showing what Illinois employment attorneys actually charge specifically for HB3773 AI notice drafting — because that market-rate data doesn't exist yet (the law is new). The Clio hourly rate data is real; the $5,000–$25,000 range is extrapolated. **Both teams flag the right problem but neither can cite a primary source for a contradicting number.** This is an opinion-as-fact issue on both sides.

---

### 1G — Team 5 automation findings — CANNOT BE CODE-VERIFIED

Team 5's findings reference Python scripts (`regulation-monitor.py`, `setup-scheduler.ps1`, `CLAUDE_UPDATE_PROMPT`) that were not in scope for this validator's code review. The code-level claims (subprocess return code handling, Claude Code permissions, pause mechanism) are plausible and internally consistent, but this validator did not read those files. Team 5's findings should be treated as unverified until the automation scripts are directly inspected.

---

## Section 2: Contradictions Between Teams

### Contradiction A — Severity of the delivery failure

**Team 3** treats the sessionStorage/Stripe redirect issue as the single most critical issue — "every paying customer receives nothing." **Team 1** does not mention delivery failure at all. **Teams 2 and 4** do not elevate it to Critical. This creates an inconsistency in the overall risk picture: if Team 3 is correct, every other issue is secondary to the product being fundamentally broken. The other teams proceed as if the product works and focus on legal/trust issues.

**Resolution:** Team 3's structural diagnosis is correct. The other teams' silence on delivery failure is a gap, not a contradiction per se — their briefs were scoped differently. But the final remediation priority order across teams should foreground Team 3's C1 above all legal/trust fixes, because a product that doesn't deliver is a legal and trust crisis regardless of how good the templates are.

---

### Contradiction B — The "same documentation package" claim severity

**Team 4** rates "generates the same documentation package for $299" as a Critical issue (item 3 in their Critical section). **Team 2** flags the broader pricing comparison as only Moderate. The FAQ text is confirmed in `index.html` lines 72–74. The word "same" directly contradicts the Terms' disclaimer that documents are templates. Team 4's Critical rating is more defensible here — "same" is a parity claim, not a value claim, and it directly conflicts with the disclaimer posture. Team 2's Moderate rating undersells this specific word.

---

### Contradiction C — PDF disclaimer strength

**Team 1** rates the PDF disclaimers as "strong" and lists them as a positive. **Team 4** notes that a buyer can proceed through the entire questionnaire and pay $299 without encountering the word "template" prominently. These are not directly contradictory — Team 1 is assessing the PDFs themselves, Team 4 is assessing the pre-purchase journey. But reading both in sequence creates a false impression: strong PDF disclaimers do not compensate for weak pre-purchase disclosure. The reports should be read together, not as competing assessments.

---

### Contradiction D — Contact email: Moderate vs. Critical

**Team 1** rates the missing contact email as Critical 1. **Teams 3 and 4** flag it but rate it Moderate/moderate. The actual legal exposure — arbitration clause defect, Stripe SSA gap, deceptive omission — supports Team 1's Critical rating. Teams 3 and 4 correctly identify the functional problem but underrate its legal consequence. **Team 1's rating is better supported.**

---

## Section 3: Alignment Drift

### Where findings drift from the Research Brief

The brief asked for "every issue that needs fixing — legal, claims, flow, trust, automation." The five teams cover this well with one exception:

**No team assessed the actual generated PDF content against the statute.** Team 2 identifies that element 7 may require verbatim statutory language and the generated documents use a custom paragraph — but no team read `pdf-generator.js` in full to verify what text is actually generated. Team 5 notes this as a gap (GAP-4) but doesn't fill it. This is the most consequential unresolved question for product accuracy: if the generated documents omit required statutory language, the core product is defective regardless of all other fixes.

**Team 5's scope is the automation system**, which was specifically requested in the brief. However, Team 5's findings cannot be validated without reading the automation scripts — a gap this validator flags but cannot close at this context level.

---

## Section 4: Missing Angles

1. **The actual generated PDF content was not verified.** No team read `pdf-generator.js` fully and confirmed what text element 7 generates. This is the most critical unverified item.

2. **The Stripe payment link URL was not tested live.** `https://buy.stripe.com/00w00lcln4g6fcI5uofYY00` is in the code. Whether it is live, whether it has a configured redirect, and whether it is in test or live mode is unknown. Team 3 identifies this as a gap but no team resolved it.

3. **The `vercel.json` file was not audited.** Team 3 flags this (Gap 4) — if serverless functions exist, Team 3's "no server-side capability" claim and Team 5's automation findings may need revision.

4. **No team verified whether any sales have occurred.** If the product has been live and customers have purchased, the delivery failure (Team 3 C1) is no longer hypothetical — it is an existing harm requiring immediate remediation.

5. **The actual 775 ILCS 5/2-102(L) statutory text was not retrieved.** This is the specific language element 7 may require. No team fetched the actual statute. The gap between "custom anti-discrimination paragraph" and "required statutory language" cannot be assessed without the text.

---

## Section 5: Agreements — Where Teams Converged

These findings appeared independently across multiple teams and carry the highest confidence:

| Finding | Teams | Confidence |
|---|---|---|
| "Used by Illinois employers" is fabricated social proof | 2, 4 | High — confirmed, no counter-evidence |
| Missing contact email breaks Terms and Privacy Policy references | 1, 3, 4 | High — confirmed across all three |
| "12-month update" promise is unfulfillable | 1, 2, 3, 4 | High — no customer database, no email capture exists |
| Subpart J rules are still in draft, not finalized | 1, 2 | High — confirmed by live source fetch |
| "Legally-required" / "same documentation package" language conflicts with disclaimer posture | 1, 2, 4 | High — confirmed in index.html |
| The `successUrl` in stripe-checkout.js is a dead variable | 3 only | Medium — code-confirmed, but dashboard state unknown |

---

## Section 6: Surprises

**The DOMContentLoaded claim (Team 3 Minor m1) appears to be wrong.** A team that correctly identified a genuinely broken delivery architecture made a technical error on a minor point. This is worth noting not to undermine Team 3's valid critical findings — which stand — but because it illustrates that even a strong, well-evidenced report can contain incorrect technical assertions that sound authoritative.

**The AAA registry risk is less acute than framed.** The live AAA page indicates clause submission is triggered when a case is filed, not as a standing pre-registration requirement. Team 1 presents this as a current compliance gap. It is more accurately described as a procedural step required only if a dispute arises — still worth doing, but not an active liability today.

**The automation system (Team 5) represents a novel risk category not present in most compliance audits.** The possibility that an autonomous Claude Code process could silently update and deploy legally inaccurate documents without human review is the most structurally unusual finding in the entire audit. It is real, it is not overblown, and it was not flagged by any other team — which means it had no cross-validation. It should be treated as unverified-but-plausible until the automation scripts are read directly.

---

## Validation Summary

**Findings that held up under scrutiny:**
- Ghost contact email (Critical — all teams, code-confirmed)
- Fabricated "Used by Illinois employers" (Critical — code-confirmed, no counter-evidence)
- Unfulfillable 12-month update promise (Critical — code-confirmed)
- "Legally-required" / "same package" marketing vs. disclaimer contradiction (Critical — code-confirmed)
- Subpart J still in draft form (Moderate — live source confirmed)
- sessionStorage delivery architecture is fragile (Critical — code-confirmed; dashboard state unknown)

**Findings that were overstated or need qualification:**
- "Every paying customer receives nothing" — conditional on dashboard configuration, not confirmed fact
- AAA pre-registration gap — lower urgency than framed; triggered at dispute filing, not standing obligation
- DOMContentLoaded execution order issue (Team 3 Minor m1) — appears to be a technical error; not a real bug

**Findings that require further investigation before acting:**
- Whether element 7 is actually missing statutory language — requires reading pdf-generator.js in full and retrieving 775 ILCS 5/2-102(L) text
- Whether the Stripe payment link is configured correctly in the dashboard — requires dashboard access
- Whether the automation scripts (Team 5) contain the vulnerabilities described — requires reading those files directly
- Whether any sales have occurred — determines whether delivery failure is hypothetical or active harm

---

*Validator: Claude Sonnet 4.6 — Expedition Cross-Validation, 2026-03-10*
