# Docs and Standards Researcher — Colorado SB 24-205 Findings

**Researcher Role:** Docs and Standards (official sources only)
**Date:** April 3, 2026
**Research Question:** What does Colorado SB 24-205 ACTUALLY REQUIRE?

---

## CRITICAL STATUS ALERT: LAW IS IN FLUX

As of April 3, 2026, SB 24-205 remains the operative law. However:

- **Effective date:** June 30, 2026 (was February 1, 2026; postponed by SB 25B-004, signed August 28, 2025)
- **Repeal-and-replace proposal:** On March 17, 2026, the Colorado AI Policy Work Group released a draft "ADMT Framework" that would substantially replace SB 24-205. As of March 27, 2026, this draft has NOT been introduced as a bill and has NO assigned bill number. The Colorado legislative session ends in May 2026.
- **AG rulemaking:** No formal rules have been issued. The AG has not commenced formal notice-and-comment rulemaking as of April 2026.
- **Bottom line:** Businesses must currently prepare to comply with SB 24-205 as written by June 30, 2026, unless and until a replacement bill is signed into law.

---

## Source Verification Status

All findings below are sourced from:
- Official enrolled bill text (leg.colorado.gov) — PDF was image-encoded and not text-extractable; statutory language reconstructed from authoritative legal analyses of that text
- Colorado Attorney General's ADAI rulemaking page (coag.gov/ai/) — VERIFIED fetched this session
- AG Pre-Rulemaking Considerations document (coag.gov, Sept. 2024) — fetched this session
- Akin Gump regulatory tracker — fetched this session
- Mayer Brown legal analysis (March 2026) — fetched this session
- Fisher Phillips legal analysis (2026) — fetched this session
- KPMG regulatory alert — fetched this session
- coloradosb205.com compliance reference — fetched this session

**Note on statutory text:** The official Colorado legislature PDFs (leg.colorado.gov) are image-encoded and returned binary data when fetched. Statutory language below is drawn from authoritative legal analyses of the statute, cross-referenced across multiple independent sources. Specific section citations (§6-1-1701 et seq. of the Colorado Revised Statutes) are referenced in the legal analyses but could not be independently fetched verbatim. For publication-grade work, the enrolled bill PDF must be obtained and read directly.

---

## 1. What Is a "High-Risk AI System"?

**VERIFIED (cross-referenced across coloradosb205.com, KPMG, AG guidance)**

A high-risk AI system is an AI system that **makes, or is a substantial factor in making, a "consequential decision"** concerning a consumer.

### Consequential Decision Categories (Exhaustive List)

All eight of the following domains are covered:
1. Education enrollment or opportunities
2. Employment or employment opportunities
3. Financial or lending services
4. Essential government services
5. Healthcare services
6. Housing
7. Insurance
8. Legal services

### Excluded Systems (Not High-Risk Unless Used for Consequential Decisions)

- Anti-fraud systems (without facial recognition)
- Anti-malware, anti-virus tools, firewalls
- AI-enabled video games
- Calculators
- Cybersecurity tools
- Databases and data storage tools
- Internet domain registration and website loading tools
- Networking systems
- Spam and robocall filters
- Spell checkers
- Spreadsheets
- Web caching and hosting tools

---

## 2. Developer Obligations

**VERIFIED (coloradosb205.com, KPMG, Mayer Brown, AG pre-rulemaking doc)**

A "developer" is defined as a person that **develops or intentionally and substantially modifies** an AI system.

Developers must use **reasonable care** to protect consumers from known or reasonably foreseeable risks of algorithmic discrimination. Specific obligations:

### Documentation to Deployers
Provide deployers with documentation including:
- General statements describing foreseeable uses and known harmful or inappropriate uses
- Data summaries detailing training data and known limitations
- Descriptions of purpose and outputs
- Risk mitigation measures for discrimination evaluation

### Public Website Disclosure
Publish a clear and readily accessible statement on their website summarizing:
- The types of high-risk AI systems they develop or have modified
- How they manage known or reasonably foreseeable risks of algorithmic discrimination

### Attorney General Reporting
Disclose to the Colorado Attorney General and to known deployers any **known or reasonably foreseeable risks of algorithmic discrimination within 90 days of discovery**.

---

## 3. Deployer Obligations

**VERIFIED (coloradosb205.com, KPMG, Fisher Phillips, AG pre-rulemaking doc)**

A "deployer" is defined as a person that **deploys a high-risk AI system**.

Deployers must use **reasonable care** to protect consumers from known or reasonably foreseeable risks of algorithmic discrimination. Specific obligations:

### Risk Management Policy
Implement a risk management policy incorporating principles, processes, and personnel for:
- Identifying algorithmic discrimination risks
- Mitigating those risks
- Policy should align with a nationally or internationally recognized framework (NIST AI RMF, ISO/IEC 42001, or AG-designated equivalent)

### Impact Assessments
- Complete impact assessments **before deployment**
- Complete updated assessments **within 90 days of any significant system modification**
- Complete assessments **annually** thereafter
- Maintain assessment records for **minimum 3 years**

### Annual Reviews
Conduct annual reviews ensuring that deployed AI systems do not cause algorithmic discrimination.

### Consumer Notification (Pre-Decision)
Notify consumers **before** a consequential decision is made using a high-risk AI system, providing:
- The system's purpose
- Types of data used
- The consumer's rights to correct data

### Consumer Notification (Adverse Decision)
When a consequential decision adversely affects a consumer:
- Provide the reasons for the decision
- Inform consumer of their right to correct inaccurate data
- Provide appeal opportunity and process

### Attorney General Reporting
Report discovered algorithmic discrimination to the Colorado Attorney General **within 90 days of discovery**.

---

## 4. Impact Assessment Requirements

**VERIFIED (coloradosb205.com, KPMG)**

Impact assessments must document:
- Purpose and intended use cases of the system
- Foreseeable risks of algorithmic discrimination
- Known limitations of the system
- Data categories used as inputs and outputs produced
- Performance metrics and transparency measures
- Post-deployment monitoring procedures and schedule
- Steps taken to mitigate identified risks

**Timing requirements:**
- Before initial deployment
- Within 90 days of significant modification
- Annually thereafter

**Developer obligation:** Developers must make "information and documentation necessary to complete an impact assessment" available to deployers.

---

## 5. Consumer Notice Requirements

**VERIFIED (coloradosb205.com, KPMG, Fisher Phillips)**

### Pre-Decision Notice
Deployers must notify consumers when a high-risk AI system **will be used to make, or is a substantial factor in making**, a consequential decision. Content required:
- That a high-risk AI system will be used
- The system's purpose
- Categories of data the system uses
- The consumer's right to correct data used by the system

### Adverse-Decision Notice
When an adverse consequential decision is made:
- Description of the decision made
- The AI system's role in that decision
- Instructions for correcting inaccurate personal data
- The process for appealing the decision

### General AI Interaction Disclosure
Any party doing business in Colorado that deploys an AI system **intended to interact with consumers** must disclose to each consumer that they are **interacting with an artificial intelligence system**. (This applies beyond high-risk systems.)

---

## 6. Website Disclosure Requirements

**VERIFIED (coloradosb205.com, KPMG)**

**Developers** must publish on their website a clear and readily accessible statement covering:
- Types of high-risk AI systems the developer offers
- How the developer manages known or reasonably foreseeable risks of algorithmic discrimination

**Deployers** must maintain a risk management policy and, where required, publish transparency statements. (Specific deployer website disclosure content requirements are less precisely defined in sources reviewed — recommend direct statute review for exact deployer website obligation language.)

---

## 7. Penalties for Non-Compliance

**VERIFIED (coloradosb205.com, Akin Gump, AG guidance, Fisher Phillips)**

Violations of SB 24-205 constitute a **deceptive trade practice under the Colorado Consumer Protection Act (CCPA)**.

- Enforcement is through the Colorado Consumer Protection Act framework
- The AG has **exclusive enforcement authority** — there is **no private right of action**
- Specific penalty dollar amounts: Multiple sources state "specific penalties are not outlined" in SB 24-205 itself — penalties flow from the CCPA framework, which provides for civil penalties
- CCPA civil penalties for knowing violations: **up to $20,000 per violation** (this is the CCPA standard; [UNVERIFIED — not quoted directly from statute in sources reviewed for SB 24-205 specifically])

---

## 8. Safe Harbor / Affirmative Defense

**VERIFIED (coloradosb205.com, KPMG NIST search result, Akin Gump)**

There are **two affirmative defenses**:

### Affirmative Defense 1: Framework Compliance
It is an affirmative defense that the developer, deployer, or other person:
1. Is in compliance with a nationally or internationally recognized risk management framework for AI systems designated by the act or by the Attorney General; AND
2. The framework's standards are substantially equivalent to or more stringent than the NIST AI RMF or ISO/IEC 42001

Designated frameworks include:
- NIST AI Risk Management Framework (AI RMF 1.0)
- ISO/IEC 42001
- Other frameworks designated by the Colorado AG

Framework compliance creates a **rebuttable presumption of reasonable care** — the burden shifts to the AG to prove lack of reasonable care.

### Affirmative Defense 2: Cure Defense
It is an affirmative defense that the developer or deployer:
1. Took specified measures to **discover violations** (through feedback mechanisms, testing, or internal review); AND
2. **Corrected** discovered violations

### Sector-Specific Full Compliance Provisions
- Financial institutions subject to prudential regulator guidance achieve full compliance
- Insurers subject to insurance commissioner rules achieve full compliance

---

## 9. Colorado AG Enforcement Authority

**VERIFIED (coag.gov/ai/, Akin Gump, AG pre-rulemaking doc)**

- The AG has **rule-making authority** to implement the act
- The AG has **exclusive authority to enforce** the requirements of the act
- No private right of action exists
- The AG's office has stated it is "both looking at how to refine the law and, where appropriate, consider how to move ahead with regulatory guidance and enforcement guidance"
- **As of April 2026: No formal rules have been issued. Formal notice-and-comment rulemaking has not commenced.**
- Pre-rulemaking input period has closed; comments are publicly available
- The AG page still references "February 1, 2026" as the effective date and has not been updated to reflect the June 30, 2026 delay

---

## 10. Small Business Exemptions

**VERIFIED (KPMG)**

There is a **limited exemption for small deployers** with fewer than **50 full-time equivalent employees**, subject to conditions:
- The deployer is not using its own data to train the high-risk AI system
- The deployer is using the system consistent with the developer's intended use
- The deployer is relying on the developer's impact assessment

**Note:** This is a deployer-only exemption with conditions. Developers do not appear to have a comparable small business exemption based on sources reviewed.

---

## 11. Other Exemptions

**VERIFIED (coloradosb205.com, KPMG)**

### Federal Agency and Contractor Exemptions
- AI systems approved by the FDA, FAA, or systems complying with federal standards **if those standards are equivalent to or stricter than SB 24-205**
- AI systems used for research supporting federal approval or certification
- AI systems under contracts with U.S. Department of Commerce, Defense, or NASA — **unless those systems are used for employment or housing decisions**
- AI systems acquired by federal agencies — **unless used for employment or housing decisions**

### Healthcare
- HIPAA-covered healthcare entities providing AI-generated healthcare recommendations that require provider action before affecting the patient

### Financial Services
- Banks, credit unions, and their affiliates are covered by sector-specific full compliance provisions (prudential regulator guidance)

### Insurance
- Insurers and fraternal benefit societies subject to insurance commissioner rules

---

## 12. Legislative History and Current Status

**VERIFIED (Akin Gump, Mayer Brown, leg.colorado.gov)**

| Date | Event |
|------|-------|
| May 17, 2024 | SB 24-205 signed by Governor Polis |
| Original effective date | February 1, 2026 |
| 2025 legislative session | SB 25-318 (amendment bill) postponed indefinitely |
| August 28, 2025 | SB 25B-004 signed — postpones effective date to June 30, 2026 |
| November 25, 2025 | SB 25B-004 took effect |
| March 17, 2026 | Colorado AI Policy Work Group releases ADMT Framework proposal (draft only, no bill number) |
| March 27, 2026 | ADMT Framework still not introduced in legislature |
| April 3, 2026 | Current date — SB 24-205 is operative law; ADMT Framework is unintroduced draft |
| June 30, 2026 | SB 24-205 compliance deadline (under current law) |
| January 1, 2027 | Proposed ADMT Framework effective date (if passed) |

---

## 13. ADMT Framework — What Would Change If Passed

**VERIFIED (Mayer Brown, Fisher Phillips — March 2026 analyses)**

The proposed replacement framework would make the following changes. **This has NOT passed. It is a draft proposal as of April 3, 2026.**

### Removed from SB 24-205
- Mandatory duty to report algorithmic discrimination to the AG
- Mandatory AI impact assessments
- Mandatory risk management policy (NIST/ISO alignment)
- Broad "reasonable care" duty

### New/Modified in ADMT Framework
- Replaces "high-risk AI system" with "covered Automated Decision-Making Technology (ADMT)"
- New scope test: ADMT must "materially influence" decisions (higher bar than "substantial factor")
- Excludes general-purpose LLMs unless specifically configured for consequential decisions
- Focus shifts to transparency, recordkeeping, and consumer rights
- Pre-use consumer notice via public-facing postings (not individualized)
- Post-adverse-outcome notice within 30 days (not in original law)
- Right to "meaningful human review" that is "commercially reasonable"
- Record retention: 3 years
- AG enforcement retained; no private right of action retained
- 90-day cure period before civil penalties apply (unless knowing/repeated violation)
- Proposed effective date: January 1, 2027

---

## Key Gaps and Limitations in This Research

1. **Exact statutory text not obtained verbatim.** The official Colorado legislature PDFs are image-encoded and returned binary data. All statutory language above is reconstructed from authoritative legal analyses, not from the enrolled text directly. For publication use, the enrolled bill text must be confirmed against the PDF or a text version.

2. **CCPA penalty amounts.** The specific penalty dollar amounts under the Colorado Consumer Protection Act that would apply to SB 24-205 violations were not verified against the CCPA statute text this session. The $20,000 figure cited above is marked UNVERIFIED.

3. **Deployer website disclosure.** The exact statutory language for deployer (not developer) website disclosure requirements was less consistently described across sources. The developer website requirement is clear; the deployer website obligation may be narrower.

4. **AG rulemaking rules.** No implementing rules have been issued. The AG page was current as of the fetch but appeared not to have been updated since the effective date was postponed.

5. **2026 legislative outcome.** The ADMT Framework bill had not been introduced as of March 27, 2026. Its status between March 27 and April 3, 2026 was not confirmed. The Colorado legislative session ends in May 2026.

---

## Primary Source URLs

| Source | URL | Type |
|--------|-----|------|
| SB 24-205 bill page | https://leg.colorado.gov/bills/sb24-205 | Official |
| SB 24-205 enrolled PDF | https://content.leg.colorado.gov/sites/default/files/documents/2024A/bills/2024a_205_enr.pdf | Official |
| SB 24-205 signed PDF | https://content.leg.colorado.gov/sites/default/files/2024a_205_signed.pdf | Official |
| SB 25B-004 bill page | https://leg.colorado.gov/bills/sb25b-004 | Official |
| Colorado AG ADAI rulemaking | https://coag.gov/ai/ | Official |
| AG Pre-Rulemaking Considerations | https://coag.gov/app/uploads/2024/09/09.10.2024-AI-Pre-Rulemaking-Considerations-for-the-ADAI-1.pdf | Official |
| coloradosb205.com | https://www.coloradosb205.com/ | Compliance reference |
| Akin Gump postponement analysis | https://www.akingump.com/en/insights/ai-law-and-regulation-tracker/colorado-postpones-implementation-of-colorado-ai-act-sb-24-205 | Legal analysis |
| Mayer Brown ADMT Framework analysis | https://www.mayerbrown.com/en/insights/publications/2026/03/the-colorado-ai-policy-work-group-proposes-an-updated-framework-to-replace-the-colorado-ai-act | Legal analysis |
| Fisher Phillips employer action steps | https://www.fisherphillips.com/en/insights/insights/colorado-moves-to-replace-ai-laws-bias-audit-requirements-with-transparency-framework | Legal analysis |
| KPMG regulatory alert | https://kpmg.com/us/en/articles/2024/ai-regulation-colorado-artificial-intelligence-act-caia-reg-alert.html | Legal analysis |
| Inside Global Tech (March 27, 2026) | https://www.insideglobaltech.com/2026/03/27/colorado-officials-push-to-repeal-and-replace-the-colorado-ai-act/ | News |
