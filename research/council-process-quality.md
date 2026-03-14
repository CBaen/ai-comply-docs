# Research Council Audit: Process, Quality & Gaps
**Date:** March 14, 2026
**Scope:** Questionnaire flow, missing inputs, document quality, product gaps
**Files examined:** PRODUCT-ONBOARDING.md, regulations.ts, regulation-config.ts, all 6 questionnaire step components, regulations/[slug]/page.tsx, and 4 PDF generators (illinois/notification-letter, nyc-ll144/bias-audit-report, colorado/impact-assessment, nist-ai-rmf/risk-profile)

---

## 1. PROCESS STREAMLINING

### Current Flow (6 Steps, Identical for All Products)

| Step | Content |
|------|---------|
| 1 | Company Name, State, Size, Industry |
| 2 | AI Systems (name, vendor, decisions, description) |
| 3 | Data & Bias (data inputs, protected characteristics, bias audit status) |
| 4 | AI Oversight (AI role, oversight person, human review, review frequency) |
| 5 | Contact Info (name, title, email, phone) |
| 6 | Review, law gate, acknowledgment, training kit add-on, checkout |

### Efficiency Problems

**The same 6-step flow is used for every product, regardless of what that product generates.**

The Employee AI Acceptable Use Policy (`employee-ai-policy`) generates 3 internal policy documents. It does not generate employee notifications, bias audit reports, or impact assessments. Yet it asks customers to go through the full Data & Bias step (Step 3) and the full Oversight step (Step 4), including questions about "bias audit status" and "protected characteristics" that go unused in those generators.

The Vendor AI Due Diligence Kit (`vendor-ai-due-diligence`) generates documents about *vendor evaluation* — questionnaires to send to vendors, contract addendums, risk assessments. The customer is not the subject of the documentation; the vendor is. Yet Step 1 asks for the customer's company size and state as though those are the primary relevant facts. The customer's state is not pre-populated into vendor-facing documents; only the company name appears. Company size and industry are collected but vendor documents don't use them.

The Bias Audit Template (`ai-bias-audit-template`) generates audit result templates. The bias audit status question in Step 3 asks "Has your organization conducted a bias audit?" — which is exactly what this product helps them *create*. The answer is self-evidently "No" or "In progress" for every customer buying this product, and the collected answer does not affect the generated documents.

**The same "what decisions does this AI influence?" checkbox list appears in Step 2 for every product, but each product has a different decisions array defined in regulation-config.ts.** This means the decisions array IS product-aware. However, the framing of the question ("What decisions does this AI influence?") doesn't change between an employment product (IL HB3773) and a consumer-facing product (Colorado SB24-205), even though the audiences and terminology are completely different.

### Duplicate Information Collection

Step 2 asks for AI system "description" (how the AI is used).
Step 4 asks for "how are AI outputs used in decisions" (a dropdown with 4 options).

These are partially overlapping. A customer filling Step 2 writes "Screens resumes and ranks candidates by score." Step 4 then asks them to characterize this as "advisory," "primary," "sole," or "screening." These are different enough to justify keeping both, but the Step 2 description textarea is not labeled as distinct from the Step 4 question — a customer could reasonably wonder why they're describing the AI twice.

**Step 5 (Contact Info) collects name, title, email, phone.** The review summary in Step 6 shows this information. The generated documents also use it. No duplication problem here — this is used heavily.

### Minimum Viable Flows by Product Type

The current architecture doesn't support differentiated flows. Every product uses the same 6 steps. Based on what the generators actually use, here is what each product type genuinely needs:

**Employment (IL HB3773, NYC LL144, EEOC, multi-state employer):**
All 6 steps are justified. These products generate employee notification letters that need AI system names, vendors, data inputs, protected characteristics, oversight role, and contact info. Step 3 (Data & Bias) feeds directly into the notification content. Step 4 feeds into oversight protocol documents. This is the most information-intensive product category and the current 6 steps match it well.

**Consumer protection (Colorado SB24-205, California ADMT):**
All 6 steps are justified. These products generate impact assessments, consumer notices, risk management policies. Step 3 is needed for discriminiation risk sections. Step 4 is needed for oversight protocol content. Step 1 needs company state — though Colorado products already know the customer is subject to Colorado law, their state of incorporation or primary operation still matters for the documents.

**Framework/internal policy (Employee AI Policy, NIST AI RMF, Vendor Due Diligence):**
Steps 3 and 4 are marginal here. The Employee AI Policy uses company name, AI system names, the decisions list for which sections to generate, and contact info. It does not use data inputs, protected characteristics, bias audit status, human review status, or review frequency in the generated documents. A 4-step flow (Company → AI Systems → Contact → Review/Checkout) would work for these products.

**Add-on audit products (Bias Audit Template, Incident Response):**
These are the worst fit for the current 6-step flow. The Bias Audit Template's only differentiated inputs that actually appear in the generated documents are: company name, AI system names, and contact info. Steps 3, 4 are ceremonial for this product — the information is collected but the bias audit template generates fill-in form fields for an auditor to complete, not pre-populated content based on the questionnaire answers. A 3-step flow (Company → AI Systems → Contact/Checkout) would work.

### Recommendation

The architecture supports differentiated flows through `regulation-config.ts` — steps are already product-aware for decision labels and help texts. The remaining gap is skipping steps that are irrelevant for a given product. A `skippedSteps: number[]` field in `RegulationConfig` could suppress steps that don't contribute to a product's generators. This is low-lift to implement and would reduce the questionnaire from 6 steps to 4 for add-on and framework products.

---

## 2. MISSING INPUT FIELDS

### What the Current Data Model Captures

```
ComplianceFormData:
  company: { name, state, size, industry }
  aiSystems[]: { name, vendor, description, decisions[] }
  dataInputs[]            — type of data the AI processes
  protectedCharacteristics[]  — affected protected classes
  biasAudit               — audit status (yes/in_progress/planned/no)
  oversight: { aiRole, oversightRole, humanReview, reviewFrequency }
  contact: { name, title, email, phone }
```

### Fields Missing That Would Add Document Value

**1. Company address / headquarters location**
The documents place a company name and a contact person but no physical address. Employment-facing documents (IL HB3773 notification letter) should include the company's address for formal notice purposes. Customers currently have to hand-edit this into the document after downloading.

**2. AI system deployment date / effective date**
The Colorado impact assessment template has a fillable field `co_ia_sys1_deploy_date` — "Initial Deployment Date" — that is always blank because the questionnaire doesn't ask for it. This is a statutory requirement under § 6-1-1703(3)(a). Every customer who downloads this document must fill it in manually. A simple date field in Step 2 (optional) per AI system would pre-populate this.

**3. AI system version or release**
Same situation: the Colorado impact assessment has `co_ia_sys1_version` as a fillable field that's always blank. Vendor-provided systems have version numbers that matter for audit trails and impact assessments.

**4. Number of employees affected by each AI system**
The IL notification letter and CO impact assessment both could benefit from knowing the scope of impact. "This AI is used in recruitment decisions for 1,200 employees" reads differently than "for 12 employees." Currently the company size bucket (1-50, 51-250, etc.) is a rough proxy, but it conflates total company size with the number of employees actually affected by the AI system.

**5. Whether each AI system is internal-built or third-party**
The vendor field exists but is optional and free-text. The distinction between "we built this ourselves" and "we bought this from HireVue" is legally meaningful for multiple laws — Colorado distinguishes developer vs. deployer obligations, and vendor due diligence documents specifically address third-party procurement risk. A simple radio button ("Built internally" / "Purchased from vendor") would make the documents more precise without adding significant friction.

**6. Bias audit conductor (for NYC LL144)**
The NYC LL144 bias audit report template has a blank `auditor_name` field that must be filled in manually. The questionnaire asks "has a bias audit been conducted?" but doesn't ask who conducted it. For customers who answer "Yes," a follow-up field for the auditing firm name would pre-populate the most important field in the generated bias audit report template.

**7. The date of each AI system's last bias audit**
Same gap as above. The report template needs `audit_date` and `audit_period` but neither is collected.

**8. Consumer-facing language (for Colorado, California products)**
Colorado SB24-205 requires consumer notices to be provided in multiple languages (§ 6-1-1703(4)(c)). The impact assessment template has a `co_ia_sys1_languages` fillable field. The questionnaire never asks which languages the company communicates in. A checkbox list (English, Spanish, Mandarin, French, other) would be modest friction with meaningful payoff — especially for companies in multilingual markets like healthcare or financial services.

**9. State of the regulated activity, not just company state**
Some companies operate AI systems in multiple states from a headquarters elsewhere. An Illinois-headquartered bank might use an AI lending system that makes decisions affecting California consumers. The questionnaire asks for "state of operation" as a free-text field (not a required field, not even a dropdown). For multi-state and cross-state-law products, knowing which states the AI actually operates in would make documents more accurate.

### Fields Collected But Unused or Underused

**`biasAudit` (Step 3 dropdown)**
This field is collected but used minimally. In the Illinois notification letter, it is not referenced at all — the letter doesn't change based on whether a bias audit has been conducted. In the Colorado impact assessment, it is not pre-populated into any field. It appears to have been included in anticipation of generating meaningful variation in document content, but that variation was never implemented. The only product where this field would be meaningful (NYC LL144 bias audit template) uses it as context but doesn't pre-populate it into the generated report.

**`humanReview` (Step 4 dropdown: yes / developing / no)**
This field is collected in Step 4 but does not appear in any generated document content reviewed. The oversight protocol documents reference `oversightRole` and `aiRole`, but `humanReview` status (yes/developing/no) and `reviewFrequency` appear to drive no document differentiation. If a customer says "no formal human review process," the document should either warn them or generate a different section — but it doesn't.

**`reviewFrequency` (Step 4 dropdown)**
Same situation. Collected, not used in any generator output examined.

**`companyState` (Step 1 free text)**
Used in headers and some document bodies, but it's free-text, not a dropdown. A customer could type "IL," "Illinois," "illinois," or "Ill." The documents print exactly what was typed, which produces inconsistency in professional documents. A dropdown would ensure consistent state names.

**`companySize` (Step 1 dropdown)**
The size bucket is collected and shown in the Step 6 review summary. It does not appear in any generated PDF content reviewed. For EEOC products (where employer size affects penalty caps) and for NYC LL144 (which distinguishes employers by size), this field has legal relevance but generates no document variation.

---

## 3. DOCUMENT QUALITY

### Generator 1: Illinois Notification Letter (`pdf-illinois/notification-letter.ts`)

**Strengths:**
- Accurate statutory citations throughout (775 ILCS 5/2-102(L)(2), P.A. 103-804)
- Clearly distinguishes statutory requirements from recommended best practices
- Pre-populates AI system names, vendor, decisions list, and data inputs from questionnaire
- Contact information block properly placed
- Notice schedule section is genuinely useful and specific
- The non-discrimination statement quotes actual statutory language verbatim

**Gaps:**
- No physical company address in the letter header. A formal employee notice without a company address looks unprofessional and makes it harder for employees to verify they're reading a real company document.
- The "Positions Where AI Is Used" section generates a generic sentence combining all decisions from all AI systems, which reads awkwardly when multiple systems have overlapping decision areas: "AI systems are used in connection with recruitment, hiring, promotion, recruitment, hiring decisions." The deduplication logic exists (`filter((v, i, a) => a.indexOf(v) === i)`) but the resulting sentence can still be convoluted for companies with many AI systems across many decision areas.
- The letter closes with "Sincerely, [Company Name] [Date]" — no signature line. A compliance document delivered to employees should have at minimum a "Signed by: _______" line with the contact person's name and title, not just the company name.
- Help texts in the questionnaire correctly note that IDHR implementing rules are "in development." The letter itself repeats this caveat, which is correct — but customers may not know to update this language once the rules finalize. Consider adding a field at the top of the document that says "Last reviewed: [date]" to prompt periodic updates.

**Pre-population quality:** 8/10. Most questionnaire fields flow through correctly. Missing: company address, AI system version, deployment date.

**Fillable fields:** None. This is a static narrative document, not a form template. That's appropriate for a notification letter.

**Overall:** High quality for a statutory notification document. The citations are accurate, the structure is logical, and the statutory compliance rationale for each section is explained in comments.

---

### Generator 2: NYC LL144 Bias Audit Report (`pdf-nyc-ll144/bias-audit-report.ts`)

**Strengths:**
- Cites specific DCWP implementing rules (6 RCNY § 5-301) alongside the main statute
- The impact ratio analysis structure (sex categories, race/ethnicity categories) correctly follows the DCWP-required breakdown
- The 80% / 4/5 rule explanation is present and accurate
- The auditor certification block is appropriate and includes the independence requirement (no financial conflict of interest)
- Per-AEDT structure scales correctly for companies with multiple AI systems

**Gaps:**
- Every field in this document is a blank fillable form — `auditor_name`, `auditor_date`, `audit_period`, etc. None of these can be pre-populated from the questionnaire because the questionnaire doesn't ask for audit dates, auditor names, or historical audit results. A customer who has already conducted an audit and is buying this to document it must fill in every single field from scratch. The questionnaire's Step 3 question "has a bias audit been conducted?" and the corresponding fields for auditor and date are exactly the information that would pre-populate the most critical fields in this document.
- The template is titled "Bias Audit Report Template" but it is actually a template for *documenting a bias audit that has already been conducted by an independent auditor.* A customer buying this product without an auditor is buying a template they cannot fill out until they hire one. This distinction is nowhere in the product description or the questionnaire — a customer could reasonably believe this document IS the bias audit. The questionnaire Step 3 should clarify this or the product description needs to explicitly state "This document captures results from a bias audit conducted by your independent auditor — it does not replace the auditor."
- The sex category list includes "Non-binary/Other" as a catch-all. NYC LL144 and DCWP rules at 6 RCNY § 5-301 enumerate specific categories. If the DCWP rules don't explicitly recognize "Non-binary/Other" as a category for impact ratio calculation, this inclusion could create confusion for auditors completing the form. This is a precision gap.
- There is no section for the employer's signature / certification that they published the results per § 20-871(b)(2) (the public posting requirement). The audit report template covers conducting the audit but not confirming the results were posted.

**Pre-population quality:** 2/10. Only company name and AI system names pre-populate. All substantive audit data fields are blank.

**Fillable fields:** Well-structured. Auditor name, contact, date, period, findings, remediation are all present. A customer who has audit results in hand can fill this out coherently.

**Overall:** Solid structural foundation but the pre-population gap is severe for a $149 product. A customer is essentially getting a well-organized blank form. The product is valuable if customers understand they need an auditor first, but that context is missing from the purchase flow.

---

### Generator 3: Colorado Impact Assessment (`pdf-colorado/impact-assessment.ts`)

**Strengths:**
- Most thorough pre-population of any generator reviewed — AI system name, vendor, description, decisions, data inputs, and contact name all flow through
- All 7 statutory elements of § 6-1-1703(3)(b)(I)-(VII) are present and correctly cited
- The statutory requirements overview at the top (timing, retention, AG availability) is accurate and gives customers an immediate compliance reference
- The sign-off section includes next review date, retention end date — fields that prompt customers to set up their compliance calendar
- The `prefill` parameter on form fields is used effectively to pre-populate from questionnaire data

**Gaps:**
- `co_ia_sys1_version` and `co_ia_sys1_deploy_date` fields are always blank because the questionnaire doesn't ask for them. These are meaningful compliance data points — the effective date of the law is June 30, 2026, so knowing whether a system was deployed before or after that date affects whether the assessment is pre-deployment (required) or retroactive.
- Element (IV) asks about customization/fine-tuning, and offers two checkboxes: "System has been customized" and "System is used as-provided." This is useful. But the questionnaire's vendor field (Step 2) gives no indication of whether customization happened. A customer who typed "Internal" as the vendor would benefit from these checkboxes being pre-checked differently than one who typed "HireVue."
- Element (VI) asks for transparency measures and languages (§ 6-1-1703(4)(c)). The language field (`co_ia_sys1_languages`) is always blank. For a healthcare company or a financial services company serving diverse populations, this is a material compliance gap.
- The document ends correctly with a sign-off block that the questionnaire's contact info pre-populates. However, the "Reviewed/Approved By" line is always blank — a second person who reviewed the assessment. For any company with a legal or compliance team, having this field blank is a compliance documentation weakness. The questionnaire could ask for a secondary reviewer name (optional) to pre-populate this.
- There is no section for documenting the attorney general disclosure obligation — § 6-1-1703(3)(e) requires making the assessment available to the AG on request. The document doesn't include a certification that the company understands and will honor this obligation.

**Pre-population quality:** 7/10. Better than the other generators. The key gaps are deployment date, version, and languages.

**Overall:** The highest-quality generator reviewed. The statutory structure is excellent, citations are precise, and the pre-population logic is the best-implemented of the four. The gaps are real but fixable with questionnaire additions.

---

### Generator 4: NIST AI RMF Risk Profile (`pdf-nist-ai-rmf/risk-profile.ts`)

**Strengths:**
- Clear structure following the GOVERN/MAP/MEASURE/MANAGE framework
- Company name, AI system names, vendors, descriptions, and decision areas all pre-populate
- Risk tier and deployment status fields are appropriate prompts
- The 7 trustworthy AI characteristics from NIST AI 100-1 are all present
- Priority action tracking with owner and target date is practically useful

**Gaps:**
- The document description says it "is referenced by Colorado SB24-205 and Texas HB 149 as a framework for compliance documentation." This is a factual claim worth verifying — the NIST AI RMF is referenced by Colorado as relevant evidence of reasonable care, but describing it as "referenced by Texas HB 149" could overstate the legal connection. If a customer uses this claim as justification for their compliance approach and an enforcer disagrees, that's a problem.
- The maturity scale for GOVERN/MAP/MEASURE/MANAGE ("Initial / Developing / Defined / Managed / Optimizing") is a solid framework, but the form fields provide no guidance on what distinguishes "Developing" from "Defined." A customer without NIST expertise will find these ratings difficult to complete meaningfully. A brief criterion list per level (even in parentheses) would make the form substantially more useful.
- The "Priority Risk Actions" section has 5 slots hardcoded. Some organizations will have 2 priorities; others will have 12. Fixed slots create awkward blank space or truncated lists. Alternatively, this should be framed as "Top 5 priority actions" with guidance that additional actions should be tracked in a separate action log.
- The risk profile is meant to synthesize findings from the other NIST AI RMF documents (GOVERN, MAP, MEASURE, MANAGE documents). If a customer buys only the Risk Profile without the full NIST AI RMF package, the "Section 3: NIST AI RMF Function Maturity Assessment" references work that hasn't been done. The document assumes the customer has completed the other four NIST function documents, but nothing in the questionnaire or product description establishes this dependency.
- No signature block. A risk profile presented to leadership or a board should have an approval signature. The document has an approval section (`profile_approved_by`) but it's a form field, not a signature line with date notation.

**Pre-population quality:** 6/10. Good for company and AI system identity. Poor for risk characterization, which can only be assessed by a human reviewing the organization's AI program.

**Overall:** Appropriate for a governance framework document. The main weakness is that it assumes organizational maturity that customers buying a $397 document may not have. More guidance embedded in the form fields would increase the practical value significantly.

---

## 4. POTENTIAL PRODUCTS

### Products Currently in the Library (ready=true)

- Illinois HB3773 ($299)
- Colorado SB 24-205 ($449)
- Employee AI Acceptable Use Policy ($199)
- Vendor AI Due Diligence Kit ($249)
- AI Bias Audit Template ($149)
- AI Incident Response Plan ($149)

### Gaps in the Current Catalog

**Gap 1: Annual Compliance Review Document**
Every law in the library requires annual review cycles: Colorado impact assessments must be reviewed annually (§ 6-1-1703(3)(a)(II)), NYC LL144 requires annual bias audits, Illinois best practice is annual notification updates. There is no product that generates an "Annual Compliance Review" — a structured year-over-year audit of existing compliance documentation. A customer who bought the Illinois package in 2026 returns in 2027 and has no product to help them document their annual review. This is both a recurring revenue opportunity and a genuine compliance need.

**Suggested product:** AI Compliance Annual Review Kit ($149 — or $99 as a returning customer add-on) — a structured review template that works with any existing compliance package, with fillable fields for "document reviewed," "date of last review," "changes since last review," "updated effective date," "next review scheduled." This could be a standing add-on for any product at purchase, or a standalone product.

**Gap 2: AI Governance Policy for Board/Leadership**
The `pdf-board-ai-summary` directory exists in the codebase but there is no corresponding entry in regulations.ts with `ready: true`. Companies subject to Colorado SB24-205 and the EU AI Act need to demonstrate that AI governance extends to the board level. The content would be a board-ready AI governance summary — not a technical document, but a one-page governance policy statement that the board or executive team can sign. This exists as a generator stub but hasn't been productized.

**Gap 3: Data Mapping / AI System Inventory (standalone)**
The `pdf-data-mapping-inventory` and `pdf-ai-system-registry` directories exist but are not in the product catalog as standalone purchasable products. An AI system inventory is the foundational document for every compliance program — before a company can file impact assessments or send employee notifications, they need to know what AI systems they have. A standalone inventory product (perhaps $99-$149) that helps companies audit their AI footprint before buying a full compliance package would serve customers who aren't yet ready for the full package and create a natural upgrade path.

**Gap 4: Consumer Rights Response Kit**
Multiple products in the library (Virginia CDPA, Connecticut CTDPA, Colorado SB24-205) generate consumer-facing notices and opt-out documentation. But none of the ready products includes a comprehensive consumer rights response kit — the internal procedures for handling consumer requests to opt out of profiling, access their data, or correct errors. Colorado § 6-1-1703 requires deployers to allow consumers to correct data and appeal automated decisions. A practical "Consumer Rights Response Kit" would include an intake form template, a response letter template, and a tracking log. This is missing from the Colorado package and doesn't exist as a standalone.

**Gap 5: AI Procurement Due Diligence (Buyer's Checklist Before Purchase)**
The Vendor AI Due Diligence Kit helps companies evaluate vendors they already use. A complementary product for companies that are *evaluating* which AI vendor to buy from — a pre-procurement scoring rubric that asks the right questions before signing a contract — would serve a different stage of the customer journey. Many companies don't have a vendor yet; they're in selection mode. This product would be lighter weight ($99) and serve as a funnel into the full Vendor Due Diligence Kit.

**Gap 6: State Biometric AI Policy**
Illinois has the Biometric Information Privacy Act (BIPA) as a separate statute from HB3773. Companies using biometric AI (facial recognition, voiceprint analysis, fingerprint authentication) have BIPA obligations that are entirely distinct from the HB3773 employment AI requirements. The data input checklist in Step 3 includes "Biometric data" as a checkbox, but there is no corresponding product. A BIPA-specific product would serve Illinois companies using video interviews with facial analysis, emotion detection, or any biometric processing. Given BIPA's private right of action and $1,000-$5,000 per violation penalties, this is a high-anxiety compliance area.

**Gap 7: Post-Purchase Compliance Update Subscription**
Not a document product — a service gap. Laws change (as the PRODUCT-ONBOARDING.md demonstrates repeatedly: Colorado's effective date changed, Illinois implementing rules pending). Customers who bought documents in 2026 have no mechanism to receive updated documents when the law changes. A subscription model ($49/year per product) that delivers updated documents when material changes occur would be both recurring revenue and a genuine customer need. This would require infrastructure beyond the current one-time purchase flow, but the business case is strong given the documented pattern of law amendments.

### The Single Product I Would Build First

**AI Policy Gap Assessment Tool** — a lightweight, free questionnaire that asks 10-15 yes/no questions about a company's AI use and generates a "compliance gap report" showing which laws they're subject to and which products they need. This is a lead generation and qualification tool, not a paid product, but it solves a real problem: many customers don't know which products apply to them. The current site organizes by regulation, which requires customers to know which laws cover them. A gap assessment tool inverts the relationship — customer describes their AI use, tool tells them what they're exposed to and what to buy.

This would require no new PDF generators, just a recommendation engine mapping questionnaire answers to product slugs. It would dramatically increase conversion on the product catalog by giving customers a personalized "you need X, Y, and Z" rather than expecting them to navigate a library of 15+ products independently.

---

## Summary of Priority Findings

| Finding | Impact | Effort to Fix |
|---------|--------|---------------|
| Step 3-4 irrelevant for add-on/framework products | Customer friction, lower completion rate | Medium (skippedSteps config field) |
| biasAudit, humanReview, reviewFrequency collected but unused in generators | Data collected for no benefit | Low (either use it or stop asking) |
| Missing company address field | Documents look unprofessional | Low (add field to Step 1) |
| Missing AI system deployment date per system | Colorado impact assessment has blank required field | Low (add date field to Step 2) |
| NYC LL144 bias audit: zero pre-population of audit data | Product is a blank form for $149 | Medium (requires questionnaire changes + generator updates) |
| companyState is free-text, not a dropdown | Inconsistent output in documents | Low (convert to dropdown) |
| No annual review product | Customers have no path for year 2 compliance | New product |
| No standalone AI system inventory product | Missing funnel/foundation product | New product (generator already partially exists) |
| No consumer rights response kit | Gap in Colorado and ADMT packages | New product or package addition |
| No gap assessment / recommendation tool | Customers don't know what to buy | New feature (no generator needed) |

---

*Research Council audit completed. No legal advice. All findings are based on code and product structure analysis, not legal interpretation.*
