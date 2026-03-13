# Council Synthesis: Legal Audit of AI Comply Docs Products & Copy
## Date: 2026-03-12
## Vetted by: Orchestrator
## Alignment: Checked against Research Brief

---

## Shared Dimensions (cross-agent comparison)

| Shared Dimension | Codebase Analyst | External Researcher | Devil's Advocate | Avg | Spread |
|-----------------|-----------------|---------------------|------------------|-----|--------|
| Overall Risk | 6/10 | ~7/10 | 6/10 | 6.3 | 1 |
| Reversibility | 9/10 | ~9/10 | ~9/10 | 9.0 | 0 |
| Evidence Confidence | 9/10 (code) | ~6.5/10 (law) | ~8/10 | 7.8 | 2.5 |

### Role-Specific Scores (per-agent depth)

**Codebase Analyst:** Citation Accuracy 6/10, Disclaimer Coverage 7/10, Claim Consistency 5/10, Cross-Reference Integrity 7/10
**External Researcher:** Citation Verification Rate 5/10, UPL Risk MOD-HIGH, FTC Risk MOD-HIGH, Disclaimer Adequacy 6/10
**Devil's Advocate:** Failure Probability 5/10, Failure Severity 7/10, Assumption Fragility 5/10, Hidden Complexity 8/10

---

## High Confidence (agents converged with independent evidence)

These findings achieved triple convergence — all three agents found them independently:

1. **Blog posts have zero disclaimers.** The widest-audience content (6 SEO blog posts making specific legal claims about penalty amounts, compliance requirements, and who is covered) has no "not legal advice" language anywhere. PDFs have robust disclaimers. Emails have footer disclaimers. Blog posts have nothing. Fix: add standard disclaimer block.

2. **Colorado effective date in PDFs is wrong.** `pdf-helpers.ts:82` and `due-diligence-questionnaire.ts:355` both state "eff. 2-1-26" — the original effective date before SB 25B-004 amended it to June 30, 2026. Every Colorado PDF delivered to a customer shows the wrong date. Verified by primary source fetch of SB 25B-004 (leg.colorado.gov).

3. **PDF disclaimer infrastructure is strong.** Every generated document has a prominent red-bordered top-of-document disclaimer AND per-page footer disclaimers. The language is comprehensive ("TEMPLATE ONLY — NOT LEGAL ADVICE. AI Comply Docs is not a law firm and does not practice law."). This is above industry average and is a genuine defensive asset.

4. **All issues are reversible.** No architectural changes required. Every identified issue is a string/content change in a small number of files.

5. **Colorado AG-exclusive enforcement.** Confirmed from primary source. No private right of action. The blog post claiming "private remedies" is wrong.

---

## Recommended Approach

### P0 — Fix Immediately (active errors in delivered customer documents)

| # | Issue | File | Line(s) | Change |
|---|---|---|---|---|
| 1 | CO effective date in PDF header | `src/lib/pdf-helpers.ts` | 82 | `eff. 2-1-26` → `eff. 6-30-26` |
| 2 | CO effective date in questionnaire | `src/lib/pdf-vendor-due-diligence/due-diligence-questionnaire.ts` | 355 | `eff. 2-1-26` → `eff. 6-30-26` |
| 3 | "Everything you need" warranty — IL email | `src/app/api/send-documents/route.ts` | 19 | Replace with non-warranty description |
| 4 | "Everything you need" warranty — CO email | `src/app/api/send-documents/route.ts` | 32 | Replace with non-warranty description |
| 5 | CCPA abbreviation collision | `src/app/api/send-documents/route.ts` | 40 | `under CCPA` → `under the Colorado Consumer Protection Act (C.R.S. § 6-1-112)` |
| 6 | Texas TRAIGA status | `src/data/regulations.ts` | ~119-142 | Change `status: "in-effect"` to `"failed"`. HB 1709 died in committee (confirmed from capitol.texas.gov). |

**Source notes:**
- Items 1-2: SB 25B-004 primary source fetch confirmed June 30, 2026 (External Researcher, Phase 2)
- Items 3-4: Devil's Advocate Phase 1 finding, validated by all agents in challenge round
- Item 5: Codebase Analyst Phase 1, elevated by all agents in challenge
- Item 6: External Researcher Phase 3 — fetched capitol.texas.gov, confirmed HB 1709 received only 3 legislative actions (filed, first reading, committee referral) before the 89th session adjourned June 2, 2025

### P1 — Fix Before Next Customer Purchase

| # | Issue | File | Line(s) | Change |
|---|---|---|---|---|
| 7 | CO private right of action blog error | `content/blog/ai-compliance-small-business.mdx` | 109 | Remove "has private remedies as well" — AG-exclusive enforcement confirmed |
| 8 | IL effective date blog error | `content/blog/what-is-illinois-hb3773.mdx` | 19 | `"went into effect in 2023"` → `"went into effect January 1, 2026"` |
| 9 | CO $20,000 penalty framing | `content/blog/colorado-ai-law-penalties.mdx` | 11, 44, 48-52 | Add "at AG's discretion" qualifier; note examples are maximum-exposure |
| 10 | CO $20,000 penalty framing | `content/blog/colorado-sb24-205-guide.mdx` | 111 | Same qualifier |

### P1 — Verify With Attorney (cannot be resolved from web research)

| # | Issue | What to Verify |
|---|---|---|
| V1 | Illinois SB 2487 | Enacted status, ILCS section number, whether penalty tiers ($16K/$42.5K/$70K) match enacted text |
| V2 | Illinois penalty amounts | Read Article 8A-104 of IHRA from Westlaw/Lexis — verify dollar figures |
| V3 | UPL exposure | Whether questionnaire-to-document model crosses UPL line in IL/CO — requires attorney opinion |

### P2 — Before Next Content Publication

| # | Issue | Files | Action |
|---|---|---|---|
| 11 | Blog disclaimer gap | All 6 `.mdx` posts | Add "not legal advice" notice (site-wide component or per-post) |
| 12 | IL blog conflates penalty types | `what-is-illinois-hb3773.mdx` | Line 64 — distinguish IDHR penalties from civil suit damages |
| 13 | Product description language | `regulations.ts` | Consider softening "Complete compliance package" to "Compliance documentation template kit" |

### P3 — Low Priority

| # | Issue | File | Action |
|---|---|---|---|
| 14 | SB 2487 bill-number citation | `notification-letter.ts:223` | Replace with enacted ILCS section once V1 resolves |
| 15 | NYC LL144 citation root variance | `regulations.ts:34` | Add context note (§ 20-870 definitions vs § 20-871 requirements) |
| 16 | Not-ready product page visibility | UI audit | Verify what customers see for `ready: false` products |

---

## Alternatives

**On "Everything you need" language:** Two approaches were proposed:
- Codebase Analyst: Replace with "AI compliance documents, aligned with [regulation] requirements, are included. Review each document with your legal team before deployment."
- External Researcher: Replace with "Compliance documentation templates aligned with [regulation] requirements."

Both accomplish the same goal. The simpler version (External Researcher) is recommended.

**On blog disclaimers:** Can be implemented as either:
- Per-post footer text (simpler, immediate)
- Site-wide React component injected into MDX layout (scalable, prevents future gaps)

The site-wide component is recommended to prevent the gap from recurring with new posts.

**On product description softening:** This is a marketing vs. legal tension. "Complete compliance package" sells better than "compliance documentation template kit." The disclaimers in PDFs and acknowledgments provide defense. The External Researcher recommends softening; the Codebase Analyst is neutral; the Devil's Advocate notes it's a secondary concern behind the email language. Recommend softening product descriptions but keeping this as P2.

---

## Disagreements

### SB 2487 Severity

- **Codebase Analyst:** LOW — citation format issue, penalty amounts come from pre-existing IHRA Article 8A
- **Devil's Advocate:** MEDIUM-HIGH — citing a bill number in a customer-delivered legal document is more than a format issue; if the bill wasn't enacted, the authority cited for penalty assessment doesn't exist
- **External Researcher:** MEDIUM — confirmed that PA 103-0804 does not reference SB 2487 or amend Article 8A, so penalty amounts exist independently; but the citation quality matters

**Orchestrator assessment:** MEDIUM. The penalty dollar amounts likely stand on pre-existing IHRA authority. The SB 2487 citation is a quality issue in the notification letter, not a factual accuracy issue for the penalty schedule. However, it needs attorney verification before the next Illinois sale.

### Evidence Confidence

- **Codebase Analyst:** 9/10 — measuring internal code consistency
- **External Researcher:** MEDIUM-HIGH — measuring primary-source legal verification
- **Devil's Advocate:** HIGH — measuring whether we have enough to act

**Orchestrator assessment:** These are measuring different things. For the purpose of this audit: internal code confidence is HIGH (9/10). Primary-source legal confidence is MEDIUM-HIGH (Colorado and Texas fully resolved; Illinois penalties unverified). Actionability confidence is HIGH (confirmed issues are clear and fixable).

---

## Filtered Out

1. **NYC LL144 citation root variance (§ 20-870 vs § 20-871):** Both agents who flagged this acknowledged the citations are correct for their stated purposes. The variance is cosmetic, not substantive. Retained as P3 but not elevated.

2. **Contract Addendum UPL concern:** The Devil's Advocate flagged this, but the email copy explicitly directs customers to use it "as a starting point for your legal team." The acknowledgment requires customers to "consult qualified legal counsel for my specific vendor contracts." These mitigations are adequate. Retained as a note for attorney review but not elevated.

3. **IDHR Subpart J proposed-rules reliance:** All agents acknowledge this is adequately disclosed in document headers and customer acknowledgment. The risk depends on future IDHR rulemaking outcomes, not on current product defects. Retained as a note but not actionable.

---

## Risks

### Confirmed Production Risks (from Devil's Advocate, validated by all agents)

1. **Colorado PDFs in customer hands have wrong date.** Every Colorado customer who purchased before this fix is deployed holds documents claiming the law was effective February 1, 2026. They may believe they are already non-compliant. Proactive customer outreach recommended.

2. **"Everything you need" is in every paid customer's email.** This implied warranty exists in every Illinois and Colorado delivery email already sent. Softening future emails does not retroactively cure the warranty for existing customers. Attorney should advise whether correction notice is needed.

3. **Texas TRAIGA marked "in-effect" in live data.** Even though `ready: false` prevents purchase, the `status: "in-effect"` field could surface in API responses, SEO metadata, structured data, or future blog references. Any public-facing representation that this is an enforceable law is a deceptive trade practice risk.

### Structural Risks (require attorney review, not code fixes)

4. **UPL from questionnaire customization.** The questionnaire collects company-specific facts and generates documents that claim to satisfy that company's specific legal obligations under named statutes. This is closer to practicing law than selling generic templates. Both Illinois and Colorado are active UPL enforcement states. The disclaimers provide meaningful but not certain protection.

5. **"Complete compliance package" marketing language.** The product descriptions use language that implies legal sufficiency ("Complete compliance package," "Covers mandatory requirements"). Combined with the questionnaire model, this could support a consumer protection claim if a customer suffers enforcement despite using the templates.

---

## Summary

The codebase's legal posture is **defensible but wounded.** The PDF disclaimer infrastructure is genuinely strong — above industry average. The customer acknowledgment language is well-drafted. But the product has six confirmed errors in production or published content, one confirmed non-law marked as "in-effect," and two unverified penalty claims that need attorney resolution.

The highest-impact finding is the "Everything you need" email language — discovered by the Devil's Advocate and missed by both other agents in Phase 1. It's a two-line fix that removes the single most exploitable string in the entire codebase.

The highest-urgency finding is the Texas TRAIGA status — confirmed not enacted by primary source fetch. The `status: "in-effect"` field needs immediate correction to prevent any future surface from representing a non-existent law as enforceable.

All identified issues are reversible string/content changes. No architectural modifications needed.
