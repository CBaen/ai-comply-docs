# Team 5 — Cross-Reference Consistency Findings

**Research Angle:** Cross-Reference Consistency — same facts must be stated identically across all files
**Analyst:** Expedition Researcher (claude-sonnet-4-6)
**Date:** 2026-03-13
**Files Reviewed:** 11 files

---

## Summary

9 inconsistencies were identified across the reviewed files, ranging from CRITICAL contradictions to MEDIUM formatting differences. The most severe issues involve a known-flagged error in `regulations.ts` for the California SB 942 citation, an unverified product status for the New York RAISE Act, and a penalty framing gap in the Colorado email reminder vs. the blog posts.

---

## FINDINGS

---

### FINDING 1 — California SB 942: Citation Cites Wrong Sections

**Fact in question:** The statutory citation for California SB 942 (AI Transparency Act)

**File A — `regulations.ts` (line 388):**
```
citation: "Cal. Bus. & Prof. Code § 22770 et seq.",
```

**PRODUCT-ONBOARDING.md context (line 18):**
> "CA SB 942: Cited **§ 22770** — a section about a completely different topic. Actual sections are §§ 22757-22757.6."

**Assessment:** PRODUCT-ONBOARDING.md explicitly documents that § 22770 is WRONG — it references a completely different topic. The actual sections are §§ 22757–22757.6. This error from a prior instance was recorded in the onboarding document but never corrected in `regulations.ts`.

**Which is correct:** §§ 22757–22757.6 per the onboarding document's error log. The citation in `regulations.ts` is the documented-wrong value.

**Severity: CRITICAL** — The citation shown to customers on the product page is the confirmed-wrong citation, documented as an error in PRODUCT-ONBOARDING.md. The product is not marked `ready: true` so customers cannot purchase, but the wrong citation exists in the codebase.

---

### FINDING 2 — New York RAISE Act: Wrong Article Number and Unverified Bill

**Fact in question:** The statutory citation and bill number for the New York RAISE Act

**File A — `regulations.ts` (lines 294-296):**
```
citation: "N.Y. Gen. Bus. Law Art. 43",
citationUrl: "https://www.nysenate.gov/legislation/bills/2025/S2544",
keywords: [..., "s2544"],
```

**PRODUCT-ONBOARDING.md context (line 19):**
> "NY RAISE Act: Cited **S2544** — a bill about blighted property. The actual AI bill is S6953B. Also wrote Art. 43 when the law creates Art. 44-B."

**Assessment:** PRODUCT-ONBOARDING.md documents both:
1. S2544 is a bill about blighted property — NOT the RAISE Act. The RAISE Act is S6953B.
2. The article number Art. 43 is wrong — the law creates Art. 44-B.

Both errors documented in the onboarding guide remain uncorrected in `regulations.ts`. The `citationUrl` links to the wrong bill entirely.

**Which is correct:** S6953B / Art. 44-B per the onboarding document's error log.

**Severity: CRITICAL** — Both the citation and the citationUrl point to wrong legal instruments. The product is not marked `ready: true` but the errors exist in the codebase and could propagate to any derivative content.

---

### FINDING 3 — Colorado SB24-205: Penalty Amount Stated in Email vs. Not Stated in `regulations.ts`

**Fact in question:** The specific penalty amount for Colorado SB24-205 violations

**File A — `regulations.ts` (line 337):**
```
penaltySummary: "Attorney General enforcement under Colorado Consumer Protection Act. Per-violation civil penalties. No private right of action.",
maxPenalty: "Per-violation CPA penalties",
```
(No specific dollar amount given)

**File B — `src/app/api/send-documents/route.ts` (line 40):**
```
"Penalties: up to $20,000 per violation under the Colorado Consumer Protection Act (C.R.S. § 6-1-112)."
```
(Specific amount stated: $20,000)

**File C — `content/blog/colorado-ai-law-penalties.mdx` (lines 11, 16, 44):**
```
"up to $20,000 per violation" (C.R.S. § 6-1-112(1)(a))
"Violations involving persons age 60+ carry penalties up to $50,000."
```
(Both standard and enhanced amounts stated)

**File D — `content/blog/colorado-sb24-205-guide.mdx` (line 111):**
```
"Civil penalties can reach up to $20,000 per violation at the AG's discretion (C.R.S. § 6-1-112(1)(a)) — and each affected individual counts as a separate violation. Violations involving persons age 60+ carry enhanced penalties up to $50,000."
```

**File E — `content/blog/ai-compliance-small-business.mdx` (no specific dollar amount for Colorado)**

**Assessment:** `regulations.ts` deliberately omits the specific dollar figure (using "Per-violation CPA penalties" as a placeholder) while the email template, and two blog posts all cite "$20,000 per violation." The blogs also cite the enhanced $50,000 penalty for 60+ victims, which the email does NOT mention. `regulations.ts` is the intended source of truth but provides no numeric value, while downstream files provide specifics.

**Note:** The $20,000 figure appears in PRODUCT-ONBOARDING.md (line 90) as verified against C.R.S. § 6-1-112, so the blogs and email appear to have the correct figure. The gap is that `regulations.ts` itself doesn't state the number, making it impossible to verify consistency from the source of truth.

**Which is correct:** The $20,000 / $50,000 figures in the blogs and email are internally consistent and match the PRODUCT-ONBOARDING.md reference. The `regulations.ts` field is incomplete.

**Severity: HIGH** — `regulations.ts` is supposed to be the single source of truth. Downstream files have a specific dollar figure that `regulations.ts` does not contain. If `regulations.ts` is ever updated, there is no canonical amount to check against. Also: the email reminder mentions $20,000 but omits the $50,000 enhanced penalty that both blogs explicitly state.

---

### FINDING 4 — Colorado Email Reminder: Missing Enhanced Penalty (Age 60+)

**Fact in question:** Whether the Colorado email reminder mentions the enhanced penalty for violations involving persons 60+

**File A — `src/app/api/send-documents/route.ts` (line 40):**
```
"Penalties: up to $20,000 per violation under the Colorado Consumer Protection Act (C.R.S. § 6-1-112)."
```
(Only mentions $20,000 standard penalty)

**File B — `content/blog/colorado-ai-law-penalties.mdx` (lines 16, 44):**
```
"Violations involving persons age 60+ carry penalties up to $50,000 per violation (C.R.S. § 6-1-112(1)(c))."
```

**File C — `content/blog/colorado-sb24-205-guide.mdx` (line 111):**
```
"Violations involving persons age 60+ carry enhanced penalties up to $50,000."
```

**Assessment:** The two Colorado blog posts both state the enhanced $50,000 penalty for 60+ victims. The delivery email to customers who purchased the Colorado package mentions only $20,000 and omits the enhanced penalty tier entirely. Customers receiving the email get an incomplete picture of the penalty structure.

**Which is correct:** The blog posts are more complete. The email is not wrong, but it is incomplete.

**Severity: HIGH** — Customers who purchased the Colorado compliance package receive a penalty reminder that omits the enhanced tier. This is exactly the scenario PRODUCT-ONBOARDING.md warns against (line 98): "Capture ALL tiers in `penaltySummary`, not just the maximum."

---

### FINDING 5 — Illinois HB3773: Penalty Citation Specificity Varies

**Fact in question:** The statutory citation for Illinois IDHR penalty tiers

**File A — `regulations.ts` (line 188):**
```
penaltySummary: "IDHR civil penalties of $16,000 (first), $42,500 (second within 5 years), $70,000 (two+ within 7 years) per violation. Private lawsuits with actual damages and attorney fees.",
```
(No citation to the penalty section)

**File B — `content/blog/what-is-illinois-hb3773.mdx` (line 64):**
```
"IDHR civil penalties (775 ILCS 5/8A-104(K)): up to $16,000 for a first violation, $42,500 for a second within 5 years, $70,000 for two or more within 7 years"
```
(Cites 775 ILCS 5/8A-104(K))

**File C — `src/lib/pdf-helpers.ts` (line 75):**
```
"Statute: 775 ILCS 5/2-102(L) — Use of Artificial Intelligence (P.A. 103-804, eff. 1-1-26)"
```
(Only cites the primary statute section, not the penalty section)

**Assessment:** The blog correctly cites `775 ILCS 5/8A-104(K)` as the source of the penalty tiers. `regulations.ts` states the same dollar amounts but provides no citation. PRODUCT-ONBOARDING.md (line 100) requires: "Every penalty amount in `penaltySummary` must be traceable to a specific section number." The `regulations.ts` `penaltySummary` field violates this rule.

**Which is correct:** The blog's citation (775 ILCS 5/8A-104(K)) is correct per PRODUCT-ONBOARDING.md guidance. The `regulations.ts` field is non-compliant with internal documentation standards.

**Severity: HIGH** — PRODUCT-ONBOARDING.md explicitly requires citations in `penaltySummary`. `regulations.ts` lacks them for Illinois.

---

### FINDING 6 — Texas TRAIGA: "In-Effect" Status with January 1, 2026 Effective Date

**Fact in question:** Whether Texas TRAIGA's `status` field is accurate given today's date

**File A — `regulations.ts` (lines 121-122):**
```
status: "in-effect",
effectiveDate: "January 1, 2026",
```

**File B — `content/blog/ai-compliance-small-business.mdx` (line 64):**
```
"Texas's Responsible AI Governance Act is still working its way through the process, but it's expected to follow a similar developer/deployer structure with some carve-outs for smaller businesses."
```
(Implies the law is NOT yet in effect — still "working its way through the process")

**Assessment:** `regulations.ts` marks Texas TRAIGA as `status: "in-effect"` with an effective date of January 1, 2026. The blog post (published 2026-03-12) contradicts this by describing the law as still pending ("working its way through the process"). One of these is wrong. If the law is genuinely in effect as of January 1, 2026, the blog is wrong. If the blog's characterization is accurate, then `regulations.ts` incorrectly marks a non-enacted law as in-effect — which is precisely the error PRODUCT-ONBOARDING.md documents in its error history (line 20: "TX TRAIGA: Cited HB 1709 — a bill that died in committee"). This discrepancy requires primary source verification.

**Which is correct:** Requires verification against the Texas legislature's official bill history. Cannot determine from internal files alone.

**Severity: CRITICAL** — If the blog is correct and the law is not yet in effect, `regulations.ts` is marking an unenacted law as `"in-effect"` — the exact error type documented in PRODUCT-ONBOARDING.md. If `regulations.ts` is correct, the blog is actively misinforming readers about the status of Texas law.

---

### FINDING 7 — Illinois HB3773: Document Count Mismatch

**Fact in question:** The number of documents in the Illinois HB3773 compliance package

**File A — `regulations.ts` (lines 192-199):**
```
documentCount: 6,
documents: [
  "Employee & Applicant AI Notification",
  "AI System Inventory",
  "Impact Assessment Framework",
  "Human Oversight Protocol",
  "Compliance Checklist",
  "Accommodation Request Form",
],
```
(6 documents listed)

**File B — `src/lib/regulation-config.ts` (lines 16-23):**
```
documents: [
  "Employee/Applicant AI Notification Template (customized)",
  "AI System Inventory Document",
  "Impact Assessment Framework",
  "Human Oversight Protocol Document",
  "Accommodation Request Form",
  "Compliance Checklist",
],
```
(6 documents listed — same count, different names)

**Assessment:** The document count (6) is consistent. However, the document names differ between the two files. These are different-detail descriptions of the same documents (e.g., "Employee & Applicant AI Notification" vs. "Employee/Applicant AI Notification Template (customized)"), which are not expected to be identical — `regulation-config.ts` uses customer-facing descriptive names while `regulations.ts` uses shorter names. This is a labeling difference, not a factual contradiction. However, worth flagging for the audit record.

**Severity: MEDIUM** — Naming variation between files is not a factual inconsistency but creates potential for confusion. Not a legal accuracy issue.

---

### FINDING 8 — Colorado SB24-205: Citation Format Inconsistency

**Fact in question:** How the Colorado statute is cited across files

**File A — `regulations.ts` (line 327):**
```
citation: "C.R.S. § 6-1-1701 et seq.",
```

**File B — `src/lib/regulation-config.ts` (line 53):**
```
statute: "C.R.S. §§ 6-1-1701–1707",
```

**File C — `src/lib/pdf-helpers.ts` (line 81):**
```
"Statute: C.R.S. §§ 6-1-1701 through 6-1-1707 — Consumer Protections for AI (SB 24-205, eff. 6-30-26)"
```

**File D — `src/app/api/send-documents/route.ts` (line 30):**
```
statute: "Colorado SB 24-205 (C.R.S. §§ 6-1-1701–1707)",
```

**File E — `content/blog/colorado-ai-law-penalties.mdx` (line 22):**
```
"Under C.R.S. §§ 6-1-1701 through 6-1-1707"
```

**Assessment:** The citation ranges are consistent (all pointing to the same sections), but the notation style varies: `§ 6-1-1701 et seq.` vs. `§§ 6-1-1701–1707` vs. `§§ 6-1-1701 through 6-1-1707`. This is a formatting inconsistency, not a factual error. The section range itself (1701–1707) is consistent across all files.

**Severity: MEDIUM** — Formatting only. No legal accuracy issue, but inconsistent presentation across customer-facing and internal documents.

---

### FINDING 9 — Illinois Private Right of Action: Described Differently Across Files

**Fact in question:** The nature of the private right of action under Illinois HB3773

**File A — `regulations.ts` (line 188):**
```
penaltySummary: "...Private lawsuits with actual damages and attorney fees."
```

**File B — `content/blog/what-is-illinois-hb3773.mdx` (lines 63-69):**
```
"IDHR civil penalties...Attorney's fees paid to the plaintiff...Actual damages (uncapped in civil court actions)...
Note: IDHR civil penalties and civil court damages are separate tracks. IDHR sets administrative penalties through its tiered schedule. If you pursue a civil action in court, actual damages are uncapped but go through a different process."
```

**File C — `content/blog/ai-compliance-small-business.mdx` (line 107):**
```
"Illinois HB3773 allows individual employees and applicants to file charges directly through the Illinois Department of Human Rights."
```
(Describes IDHR process only, does not mention civil court track)

**Assessment:** `regulations.ts` says "Private lawsuits with actual damages and attorney fees" (suggesting direct civil suit). The Illinois blog correctly distinguishes two tracks: IDHR administrative (which is quasi-private — individuals initiate but IDHR adjudicates) vs. civil court (actual private lawsuit). The small business blog describes only the IDHR filing track, omitting the civil court option. There is no direct contradiction in dollar amounts, but the characterization of enforcement varies from file to file. PRODUCT-ONBOARDING.md (line 102) flagged a previous error where "private remedies" was written for Colorado (which has none), and the onboarding doc specifically calls out the need to correctly document enforcement mechanisms.

**Which is correct:** The Illinois blog's nuanced two-track explanation is most complete. The other files simplify to varying degrees.

**Severity: MEDIUM** — Not a factual error per se, but inconsistent completeness of the enforcement description across files. The small business blog understates the enforcement options for Illinois.

---

## CONSISTENCY MATRIX

| Fact | regulations.ts | regulation-config.ts | pdf-helpers.ts | route.ts | blog (IL) | blog (CO-guide) | blog (CO-penalties) | blog (CO-apply) | blog (CO-impact) | blog (small-biz) | page.tsx |
|------|---------------|---------------------|----------------|----------|-----------|-----------------|---------------------|-----------------|------------------|------------------|----------|
| IL effective date (Jan 1, 2026) | ✓ | — | ✓ (eff. 1-1-26) | ✓ | ✓ | — | — | — | — | ✓ | — |
| IL citation (775 ILCS 5/2-102(L)) | ✓ | ✓ | ✓ | ✓ | ✓ | — | — | — | — | ✓ | — |
| IL penalty tiers ($16K/$42.5K/$70K) | ✓ (no citation) | — | — | — | ✓ (cited 8A-104(K)) | — | — | — | — | — | — |
| IL private right of action (yes) | ✓ (simplified) | — | — | — | ✓ (detailed) | — | — | — | — | ✓ (simplified) | — |
| CO effective date (June 30, 2026) | ✓ | ✓ | ✓ | ✓ | — | ✓ | ✓ | ✓ | — | ✓ | — |
| CO citation (§§ 6-1-1701 et seq.) | ✓ | ✓ | ✓ | ✓ | — | ✓ | ✓ | — | — | — | — |
| CO penalty ($20K per violation) | ✗ (omitted) | — | — | ✓ | — | ✓ | ✓ | — | — | — | — |
| CO enhanced penalty ($50K, age 60+) | ✗ (omitted) | — | — | ✗ (omitted) | — | ✓ | ✓ | — | — | — | — |
| CO no private right of action | ✓ | — | ✓ (AG exclusive) | — | — | — | ✓ | ✓ | — | ✓ | — |
| TX effective date (Jan 1, 2026) | ✓ | — | — | — | — | — | — | — | — | ✗ (implies pending) | — |
| TX status (in-effect) | ✓ | — | — | — | — | — | — | — | — | ✗ (implies pending) | — |
| CA SB 942 citation (§ 22770) | ✗ (confirmed wrong) | — | — | — | — | — | — | — | — | — | — |
| NY RAISE Act (Art. 43 / S2544) | ✗ (confirmed wrong) | — | — | — | — | — | — | — | — | — | — |

**Legend:** ✓ = present and internally consistent | ✗ = error or inconsistency found | — = fact not mentioned in this file

---

## PRIORITY ACTION LIST

1. **CRITICAL — Fix CA SB 942 citation** in `regulations.ts`: Change `§ 22770 et seq.` to `§§ 22757–22757.6` (documented error in PRODUCT-ONBOARDING.md).

2. **CRITICAL — Fix NY RAISE Act** in `regulations.ts`: Change citation from `Art. 43` to `Art. 44-B` and update `citationUrl` from S2544 (blighted property bill) to S6953B (documented errors in PRODUCT-ONBOARDING.md). Verify both corrections against primary source before changing.

3. **CRITICAL — Verify Texas TRAIGA status**: `regulations.ts` says `"in-effect"` as of January 1, 2026. The small business blog (published March 12, 2026) says the law is "still working its way through the process." These cannot both be correct. Requires primary source verification from capitol.texas.gov before either file is trusted.

4. **HIGH — Add specific penalty dollar amount to `regulations.ts` for Colorado**: The `penaltySummary` and `maxPenalty` fields use placeholder language ("Per-violation CPA penalties"). Downstream files state $20,000/$50,000. Add the specific, cited amounts to `regulations.ts` so it can function as the actual source of truth.

5. **HIGH — Add $50,000 enhanced penalty to Colorado email reminder** in `route.ts`: The delivery email tells customers about $20,000 per violation but omits the $50,000 enhanced penalty for violations involving persons age 60+. The two Colorado blogs correctly include both tiers.

6. **HIGH — Add penalty section citation to Illinois `penaltySummary`** in `regulations.ts`: PRODUCT-ONBOARDING.md requires citations in `penaltySummary`. The Illinois entry lists dollar amounts without citing `775 ILCS 5/8A-104(K)`.

7. **MEDIUM — Standardize Colorado citation format**: Normalize across all files to a single format (recommend `C.R.S. §§ 6-1-1701–1707` for in-text, `C.R.S. § 6-1-1701 et seq.` acceptable in the regulations.ts citation field only).

8. **MEDIUM — Expand small business blog's Illinois enforcement description**: The file describes only the IDHR filing track and omits the parallel civil court action track that the Illinois-specific blog correctly describes.
