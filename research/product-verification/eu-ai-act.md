# Product Verification: EU AI Act (Regulation (EU) 2024/1689)

**Date of verification:** 2026-03-13
**Verified by:** Legal research agent (primary source confirmed + law firm analysis + official EUR-Lex text)

---

## CRITICAL FINDING: Effective Date in Codebase Is Partially Correct But Incomplete

The codebase states `effective Aug 2, 2026 (high-risk provisions)`. This is correct for the main body of the regulation, but the EU AI Act has a **staggered implementation structure** where multiple different dates apply to different categories of obligation. August 2, 2026 is when "core AI Act provisions apply" — but it is NOT when all high-risk AI obligations fully take effect (some categories extend to August 2, 2027).

Products must clearly distinguish WHICH high-risk AI provisions took effect when, or customers will misunderstand their compliance timeline.

---

## CRITICAL FINDING: Penalty Structure in Codebase Is Wrong

The codebase states `penalty "€35M or 7% global turnover"`. This is only the TOP-TIER penalty for prohibited AI practices (Article 5 violations). It is NOT the penalty for high-risk AI system violations.

**If this product targets high-risk AI obligations, the correct penalty is €15M or 3% of global turnover** (Article 99(4)), not €35M or 7%.

The €35M/7% figure applies only when a company uses a category of AI that is outright prohibited under Article 5 (e.g., social scoring systems, real-time biometric surveillance in public spaces, emotion recognition in workplaces).

Presenting €35M/7% as the penalty for a "high-risk AI" product is misleading and could cause customers to overcalculate their risk exposure.

---

## 1. Enacted Status

**Enacted: YES — This is EU law, already in force.**

- Regulation (EU) 2024/1689 was published in the Official Journal of the European Union on **July 12, 2024** (OJ L 2024/1689).
- Entered into force on **August 1, 2024** (20 days after publication, per standard EU procedure).
- It is a Regulation (not a Directive), meaning it is directly applicable law in all 27 EU member states without requiring national implementing legislation.

This is not a bill — it does not require a governor's signature. It was adopted by the European Parliament and Council and published in the Official Journal.

Source: EUR-Lex official text (https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng) — confirmed this URL loads the Official Journal text.

---

## 2. Statute Citation

**Full official citation:** Regulation (EU) 2024/1689 of the European Parliament and of the Council of 13 June 2024 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act)

**EUR-Lex CELEX number:** 32024R1689

**Official Journal citation:** OJ L, 2024/1689, 12.7.2024

**Commonly cited as:** "EU AI Act" or "Regulation (EU) 2024/1689" or "Regulation 2024/1689"

---

## 3. Citation URL

**Primary source — Official Journal text (CONFIRMED WORKING):**
`https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng`

This URL was tested and confirmed to load the enacted statute text in the Official Journal of the European Union. It is the authoritative enacted text.

**Alternative URL (also points to enacted text):**
`https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689`

The current codebase citationUrl (`https://eur-lex.europa.eu/eli/reg/2024/1689`) should be tested — it may redirect to the same document. The `/oj/eng` suffix explicitly requests the Official Journal English text and is the more precise URL.

---

## 4. Effective Date — STAGGERED IMPLEMENTATION (Article 113)

The EU AI Act is NOT a single-date law. It has multiple implementation dates. The codebase entry "effective Aug 2, 2026 (high-risk provisions)" is a simplification that needs clarification in the product.

**Complete staggered timeline (Article 113):**

| Date | What Takes Effect |
|------|------------------|
| August 1, 2024 | Regulation enters into force |
| February 2, 2025 | **Chapter I (General Provisions) and Chapter II (Prohibited AI Practices) apply.** Prohibitions on banned AI practices begin. AI literacy requirements commence. |
| May 2, 2025 | Commission deadline: Codes of practice must be ready |
| August 2, 2025 | **GPAI (General Purpose AI) model rules apply.** Governance framework takes effect. Notified body requirements activate. Penalty framework becomes enforceable at the member state level. Member states must designate competent authorities. |
| August 2, 2026 | **Core AI Act provisions apply** — this is the main compliance date for most obligations, including high-risk AI system obligations under Annex III (e.g., employment, education, credit scoring, biometric systems). Member states must establish operational AI regulatory sandboxes. |
| August 2, 2027 | **Article 6(1) applies** — high-risk AI systems embedded in safety-critical regulated products (medical devices, machinery, aviation, vehicles under Annex I). GPAI model providers who placed models on market before August 2, 2025 must comply. |
| August 2, 2030 | High-risk AI systems for public authorities must comply (extended deadline). |
| December 31, 2030 | Large-scale IT systems (Annex X) placed on market before August 2, 2027 must comply. |

**For a "high-risk AI" compliance product:** The primary compliance deadline is **August 2, 2026** for Annex III systems (employment, education, credit, biometrics, law enforcement, etc.). Safety-critical product embeddings (medical devices, etc.) have until **August 2, 2027**.

Source: Implementation timeline verified from euaiact.com/implementation-timeline and cross-referenced with DLA Piper law firm analysis (August 2025 obligations article).

---

## 5. Penalty Amounts

**Article 99 — Three-Tier Penalty Structure:**

**Tier 1 — Violations of prohibited AI practices (Article 5):**
- Maximum: **€35,000,000 OR 7% of total worldwide annual turnover** for the preceding financial year, whichever is HIGHER.
- Applies to: Using AI systems that are outright banned (social scoring by governments, real-time biometric surveillance in public spaces, subliminal manipulation, exploitation of vulnerabilities, untargeted scraping of biometric data).

**Tier 2 — Violations of high-risk AI system obligations and other provisions (excluding Articles 5 and those under Tier 3):**
- Maximum: **€15,000,000 OR 3% of total worldwide annual turnover** for the preceding financial year, whichever is HIGHER.
- Applies to: Violations of obligations for high-risk AI systems (Annex II/III), GPAI providers, notified bodies, importers, distributors, product manufacturers, authorized representatives.

**Tier 3 — Providing incorrect, incomplete, or misleading information to notified bodies or national authorities:**
- Maximum: **€7,500,000 OR 1% of total worldwide annual turnover** for the preceding financial year, whichever is HIGHER.

**SME / Startup adjustment (Article 99(6)):** For small and medium enterprises and startups, fines are the same percentages/amounts but whichever is LOWER (not higher) between the fixed euro amount and the turnover percentage.

**GPAI model violations (Article 101):**
- Maximum: **€15,000,000 OR 3% of worldwide annual turnover**, whichever is HIGHER.

Source: White & Case law firm analysis (confirmed Article 99(3), (4), (5) citations); corroborated by DLA Piper, multiple compliance sources, all citing the same figures from the enacted text.

**Article 99 citation summary:**
- Article 99(3): €35M / 7% — prohibited practices
- Article 99(4): €15M / 3% — high-risk and other violations
- Article 99(5): €7.5M / 1% — incorrect information
- Article 99(6): SME adjustment (lower of)
- Article 101: €15M / 3% — GPAI models

---

## 6. Enforcement

- **Enforcement structure:** Each EU member state designates a national competent authority to enforce the regulation. There is no single EU-wide enforcement agency for the main provisions.
- **AI Office:** The EU AI Office (within the European Commission) has enforcement authority specifically for GPAI model providers.
- **National authorities:** Must be operational as of August 2, 2025. Each member state sets its own enforcement procedures within the Article 99 penalty limits.
- **Private right of action:** The regulation does not create a direct private right of action in the way US laws might. However, affected persons may have rights under national law (e.g., GDPR-based claims, or claims under national consumer protection law). Article 85 requires member states to establish redress mechanisms for individuals.
- **Administrative fines:** Imposed by national supervisory authorities, subject to Article 99 maximums. The fines are administrative (not criminal) in nature.

---

## 7. Cure Period

**No formal cure period exists** in the Regulation itself. However:
- The enforcement structure is progressive — national authorities may issue warnings, require corrective actions, and set remediation timelines before imposing fines.
- Article 88 gives market surveillance authorities the power to require operators to bring AI systems into conformity within a reasonable period before taking further action.
- There is no mandatory statutory cure window analogous to US state law cure periods.

---

## 8. Applicability — Does It Apply to US Companies?

**YES — Explicit extraterritorial reach under Article 2.**

The regulation applies to:
1. **Providers** of AI systems placed on the market or put into service in the EU, regardless of whether the provider is established in the EU or in a third country (including the US).
2. **Deployers** of AI systems located in the EU.
3. **Providers and deployers** established in third countries (outside EU) **to the extent the output of their AI systems is intended to be used in the EU.**
4. **Importers and distributors** of AI systems.

**Key implication for US companies:** A US company that:
- Sells or deploys an AI system whose outputs are used in the EU, OR
- Is a provider whose AI system is accessed by EU users,

is subject to the EU AI Act.

**Exclusions:**
- AI systems for military, defense, or national security purposes
- AI systems for scientific research and development only
- Non-professional personal use

Source: EUR-Lex text, Recitals 21-24 (confirmed across multiple fetch attempts); Article 2 scope confirmed by White & Case and multiple law firm analyses.

---

## 9. What I Verified From Primary Source

- Confirmed EUR-Lex URL `https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng` loads the enacted Official Journal text (direct test)
- Confirmed publication date: July 12, 2024 (OJ L series)
- Confirmed entry into force: August 1, 2024
- Confirmed Regulation number: 2024/1689 (full CELEX: 32024R1689)
- Confirmed extraterritorial application to third-country providers via Recitals 21-24 and Article 2
- Confirmed penalty tiers from Article 99 via multiple law firm sources all citing the same subsections: 99(3) = €35M/7%, 99(4) = €15M/3%, 99(5) = €7.5M/1%
- Confirmed staggered timeline: February 2025 (prohibitions), August 2025 (GPAI/governance), August 2026 (core/high-risk Annex III), August 2027 (Article 6(1)/Annex I products)

**What was NOT read directly from the enacted Article 99 text:** The EUR-Lex pages consistently truncated before reaching Article 99 (the regulation is very long — 113 articles plus annexes). The penalty figures above are from law firm secondary sources citing Article 99 subsections, cross-verified across White & Case, DLA Piper, and multiple compliance firms. All sources agree on the same figures. However, the exact statutory language of Article 99 was not read verbatim from EUR-Lex.

---

## 10. What I Could NOT Verify

**The full text of Article 99 and Article 113 from primary source.** EUR-Lex serves the regulation as a very long HTML document; automated fetches consistently truncate before reaching these articles. Use this prompt with Claude in browser:

> Open https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R1689 and navigate to Article 99 (Penalties) and Article 113 (Entry into force and application). For Article 99: quote the exact text of paragraphs 3, 4, 5, and 6, including the exact euro amounts and turnover percentages for each tier. For Article 113: list every paragraph and date mentioned, including the exact dates for when each phase of implementation applies. I need verbatim quotes, not summaries.

---

## Summary for regulations.ts

| Field | Current Data | Verified Correct |
|-------|-------------|-----------------|
| citation | "Regulation (EU) 2024/1689" | Regulation (EU) 2024/1689 — CONFIRMED CORRECT |
| citationUrl | https://eur-lex.europa.eu/eli/reg/2024/1689 | https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng — CONFIRMED WORKING |
| status | unknown | `effective-soon` for Aug 2026 obligations; partially `in-effect` (prohibitions since Feb 2025, GPAI since Aug 2025) |
| effectiveDate | "Aug 2, 2026 (high-risk provisions)" | August 2, 2026 (Annex III high-risk); August 2, 2027 (Annex I safety-critical products) — distinguish in product |
| maxPenalty | "€35M or 7% global turnover" | THIS IS WRONG FOR A HIGH-RISK AI PRODUCT. Correct: €15,000,000 or 3% of worldwide annual turnover (Art. 99(4)). €35M/7% applies only to prohibited AI practices (Art. 99(3)). |
| penaltySummary | unknown | "Up to €35M or 7% worldwide turnover for prohibited AI (Art. 99(3)); up to €15M or 3% for high-risk AI violations (Art. 99(4)); up to €7.5M or 1% for providing incorrect information (Art. 99(5)). SMEs: lower of fixed amount or percentage (Art. 99(6))." |
| enforcement | unknown | EU member state national competent authorities; EU AI Office for GPAI models; no private right of action under the regulation itself |
| appliesToSummary | unknown | "Applies to providers of AI systems used in the EU, regardless of where the provider is established. US companies selling or deploying AI systems to EU users are subject to this regulation. Applies to deployers located in the EU." |
