# Score Extraction — Legal Audit Council
## Date: 2026-03-12
## Extracted by: Orchestrator (post-revision)

---

## Shared Dimensions Table (cross-agent comparison)

| Shared Dimension | Codebase Analyst | External Researcher | Devil's Advocate | Spread |
|-----------------|-----------------|---------------------|------------------|--------|
| Overall Risk | 6/10 | MEDIUM-HIGH (~7/10) | 6/10 | 1 |
| Reversibility | 9/10 | HIGH (~9/10) | HIGH (~9/10) | 0 |
| Evidence Confidence | 9/10 (code consistency) | MEDIUM-HIGH (~6.5/10) | HIGH (~8/10) | 2.5 |

**Note on Evidence Confidence divergence:** The Codebase Analyst measures internal code consistency (9/10 — very high). The External Researcher measures primary-source legal verification (MEDIUM-HIGH — Colorado and Texas verified, Illinois penalty amounts and SB 2487 still unverified). The Devil's Advocate measures whether the council has enough evidence to act (HIGH — the confirmed issues are well-evidenced). These are measuring different things. The spread is meaningful: for code fixes, confidence is high; for legal accuracy claims, confidence is medium.

---

## Role-Specific Dimensions Table

### Codebase Analyst — Role-Specific Scores

| Dimension | Original | Revised | Change Reason |
|-----------|----------|---------|---------------|
| Citation Accuracy | 6/10 | 6/10 | No change; CO date resolved |
| Disclaimer Coverage | 8/10 | 7/10 | "Everything you need" warranty not neutralized by disclaimer |
| Claim Consistency | 5/10 | 5/10 | CO private right of action + $20K framing + CCPA abbreviation |
| Cross-Reference Integrity | 7/10 | 7/10 | No change |

### External Researcher — Role-Specific Scores

| Dimension | Original | Revised | Change Reason |
|-----------|----------|---------|---------------|
| Citation Verification Rate | 4/10 | 5/10 | Texas confirmed non-enacted; IL PA verified |
| UPL Risk Level | MOD-HIGH | MOD-HIGH | No change |
| FTC/Consumer Protection Risk | MODERATE | MOD-HIGH | Texas + email warranty + CO PDF date confirmed |
| Disclaimer Adequacy | 7/10 | 6/10 | Blog gap + email warranty contradiction |

### Devil's Advocate — Role-Specific Scores

| Dimension | Original | Revised | Change Reason |
|-----------|----------|---------|---------------|
| Failure Probability | 4/10 | 5/10 | CO PDF date confirmed production defect |
| Failure Severity | 7/10 | 7/10 | No change |
| Assumption Fragility | 6/10 | 5/10 | CO date resolved; fewer unknowns |
| Hidden Complexity | 8/10 | 8/10 | "Everything you need" confirmed hidden |

---

## Key Score Movements

1. **Overall Risk converged upward:** All three agents moved from 5/10 to 6/10 (or MEDIUM-HIGH) after revision. The challenge round confirmed production defects in already-delivered documents, elevating risk from "potential" to "current."

2. **Disclaimer Adequacy converged downward:** Codebase Analyst (8→7), External Researcher (7→6). The "Everything you need" finding and blog disclaimer gap both reduced the score. PDF disclaimers remain strong.

3. **Assumption Fragility converged downward:** Devil's Advocate (6→5). Colorado resolution removed the largest unknown. Texas TRAIGA resolution (confirmed not enacted) removed another.

4. **FTC/Consumer Protection Risk escalated:** External Researcher (MODERATE→MODERATE-HIGH). Three concrete fact patterns now confirmed: Texas "in-effect" for non-law, email warranty language, CO PDF date error.
