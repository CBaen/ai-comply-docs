# Web Scout Findings — Colorado SB 24-205 Compliance Market Research
**Date:** April 3, 2026
**Researcher:** Web Scout (WebSearch + WebFetch only — live internet sources)
**Research Question:** Colorado SB 24-205 compliance product opportunity — what do businesses need, who's selling compliance products, and what's the market gap?

---

## CRITICAL BREAKING INTELLIGENCE — Read First

**The law is in legislative flux.** On March 17, 2026 — 17 days ago — the Colorado AI Policy Work Group, with strong support from Governor Polis, unanimously proposed a new framework called the **ADMT (Automated Decision-Making Technologies) Framework** to entirely replace SB 24-205.

Key facts about the proposed replacement:
- If passed, the ADMT Framework takes effect **January 1, 2027** — NOT June 30, 2026
- SB 24-205 still takes effect June 30, 2026 unless the legislature acts
- The ADMT Framework **eliminates** the most onerous SB 24-205 requirements: impact assessments, risk management policies, AG reporting
- It replaces them with lighter-weight transparency/notice obligations similar to data privacy law
- The proposal is "not yet law" — it must go through the Colorado legislature

**Implication for products:** The two most complex (and most sellable) SB 24-205 documents — the Impact Assessment and Risk Management Policy — may be eliminated by the replacement law. The surviving obligations under ADMT are consumer notices and disclosure requirements.

Sources:
- [Mayer Brown — ADMT Framework Analysis](https://www.mayerbrown.com/en/insights/publications/2026/03/the-colorado-ai-policy-work-group-proposes-an-updated-framework-to-replace-the-colorado-ai-act)
- [Colorado Politics — Working Group Agreement](https://www.coloradopolitics.com/2026/03/17/artificial-intelligence-working-group-agrees-on-framework-to-replace-colorado-law)
- [Captain Compliance — Law Do-Over Analysis](https://captaincompliance.com/education/colorados-ai-law-do-over-what-the-revision-reveals-about-where-regulation-is-heading/)

---

## 1. What Businesses Must Do Under SB 24-205 (Current Law)

### Scope — Who It Applies To
- Applies to **developers** (build/substantially modify AI systems) and **deployers** (use AI systems in consequential decisions affecting Colorado consumers)
- Covers consequential decisions in: **employment, education, financial services, healthcare, housing, insurance, legal services**
- Applies regardless of where the business is headquartered — coverage follows the consumer

### Small Business Exemption (Partial)
Deployers with **fewer than 50 full-time employees** are exempt from the full risk management program, impact assessments, and public statements IF they:
- Do not use their own data to train/fine-tune the AI system
- Limit uses to those previously disclosed
- Provide consumers with the developer's impact assessment instead

**Critical note:** Customizing a model with proprietary data removes this exemption entirely.

### Deployer Obligations (the primary target market for compliance documents)

1. **Risk Management Policy and Program** — Must document principles, processes, and personnel used to identify, document, and mitigate risks of algorithmic discrimination. Must reference NIST AI RMF or ISO/IEC 42001 or another recognized framework.

2. **Annual Impact Assessment** — Required before deployment, annually thereafter, and within 90 days of any intentional and substantial modification. Must document:
   - Purpose and intended use cases
   - Benefits to deployer and consumers
   - Data categories processed
   - Known/foreseeable discrimination risks
   - Mitigation measures
   - Monitoring metrics and post-deployment performance data

3. **Consumer Notices** — Two types required:
   - **Pre-decision notice:** Before or when data is collected, inform consumer that AI will be used
   - **Post-decision (adverse action) notice:** When AI contributes to an adverse decision, must disclose contributing factors, data sources, how to contest, and how to request human review
   - Must be in plain language, multiple languages, accessible to consumers with disabilities

4. **Human Review / Appeal Rights** — Consumers must be able to contest adverse AI decisions and request human review

5. **AG Notification** — Must report known or reasonably foreseeable algorithmic discrimination risks to the Colorado Attorney General within 90 days of discovery

6. **Record Retention** — Maintain compliance records for 3+ years

### Developer Obligations

- Provide deployers with technical documentation about intended uses, limitations, training data, and risks
- Publish public summary of AI systems sold and how they're tested for bias
- Notify AG and all known deployers within 90 days of discovering discrimination risks
- Notify deployers of material updates

### Dual Role (Developer + Deployer)
An organization that builds AND uses their own AI system (e.g., a hospital building its own clinical AI) must comply with both sets of obligations.

Sources:
- [Colorado General Assembly — SB 24-205 Official Text](https://leg.colorado.gov/bills/sb24-205)
- [TrustArc — SB24-205 Compliance Guide](https://trustarc.com/resource/colorado-ai-law-sb24-205-compliance-guide/)
- [Glacis — Colorado AI Act Guide](https://www.glacis.io/guide-colorado-ai-act)
- [Clark Hill — Law Delayed Analysis](https://www.clarkhill.com/news-events/news/colorados-ai-law-delayed-until-june-2026-what-the-latest-setback-means-for-businesses/)

---

## 2. Penalties and Enforcement Stakes

- **Maximum per-violation fine:** $20,000
- **Per-consumer counting:** Each affected consumer can be a separate violation
- **Example exposure:** 100 discriminated hiring applicants = up to $2 million; 500 lending decisions = up to $10 million
- **Enforcement authority:** Colorado Attorney General — exclusive, no private right of action
- **Cure period:** 60 days after AG notice to cure identified deficiencies before penalties apply
- **Affirmative defense available:** If violation discovered and cured through feedback, testing, or internal review AND organization follows a recognized risk management framework

**Investigation process once triggered:**
1. AG issues Civil Investigative Demand requesting: AI inventory, impact assessments, bias audit results, consumer disclosures
2. Reviews documentation — missing documents constitute violations
3. Tests systems by requesting access
4. Assesses remediation speed and good-faith effort

**Priority enforcement areas (2026):** Legal services, healthcare, financial services

Sources:
- [CO-AIMS — AG Enforcement Analysis](https://co-aims.com/blog/colorado-attorney-general-ai-enforcement)
- [Glacis — Colorado AI Act Guide](https://www.glacis.io/guide-colorado-ai-act)
- [AI CERTs — Key Duties and Penalties](https://www.aicerts.ai/news/colorado-ai-law-key-duties-penalties-and-2026-deadline/)

---

## 3. Sector-Specific Carve-Outs (Exemptions from Full Compliance)

- **Insurers:** In full compliance if already subject to Colorado insurance AI laws (SB 21-169 and related)
- **Banks, credit unions:** In full compliance if subject to examination by a state or federal prudential regulator under published AI guidance

**Strategic implication:** Financial institutions and insurers may already have coverage. The underserved target is: HR/employment, healthcare (non-bank), real estate/housing, and legal services deployers.

Source:
- [Colorado SB24-205 Consumer Protection Law](https://www.coloradosb205.com/)

---

## 4. Who Is Selling Compliance Products — Competitive Landscape

### Direct Template/Document Competitors

**AI Compliance Documents (GL's own site — aicompliancedocuments.com)**
- Colorado SB 24-205 package: **$449** (8 documents, one-time)
- Multi-State Employer AI Disclosure Kit (CO + IL + NYC): **$299** (5 documents)
- AI System Registry: **$199**
- Model: One-time purchase, instant download, no subscription, Stripe checkout
- Source: [aicompliancedocuments.com](https://aicompliancedocuments.com/)

**Applied Operations Protocols (appliedoperationsprotocols.com)**
- Custom Colorado AI Act compliance package: **$2,500 flat fee**, 5-day delivery
  - Includes: Risk management policy, impact assessment, consumer notices, appeal mechanisms
  - Includes a scoping call and 1-hour implementation session
- All-Access Library (18 protocols across 4 verticals): **$399** (down from $796)
  - Includes impact assessment template, vendor due diligence questionnaire, notice templates
- Source: [Applied Operations Protocols](https://appliedoperationsprotocols.com/colorado-ai-act/impact-assessment/)

**CO-AIMS (co-aims.com)**
- SaaS subscription platform targeting Colorado compliance specifically
- Pricing: **$199–$999/month** subscription tiers
- Features: Automated bias audits, annual impact assessments, AG notification, consumer notice generation, 3-year record retention
- Target market: Denver metro area law firms and healthcare providers
- Source: [CO-AIMS Annotated Act](https://co-aims.com/blog/colorado-ai-act-complete-text-annotated)

### Enterprise SaaS Platforms

**VerifyWise (verifywise.ai)**
- SaaS compliance platform — not a template library
- Pricing: **Undisclosed** (free trial + consultation booking)
- Features: Impact assessment workflows, risk management templates, consumer notification tracking, annual review scheduling, affirmative defense preparation, audit trails
- Source: [VerifyWise Colorado AI Act](https://verifywise.ai/solutions/colorado-ai-act)

**TrustArc (trustarc.com)**
- Enterprise SaaS AI governance platform
- Colorado AI Act: prominent compliance focus, free guides, webinars
- Pricing: **Undisclosed** (enterprise sales model, custom quotes)
- Also offers free Nymity Research tool as a lead generator
- Source: [TrustArc Colorado AI Law Guide](https://trustarc.com/resource/colorado-ai-law-sb24-205-compliance-guide/)

**Holistic AI (holisticai.com)**
- Enterprise AI governance platform
- Specific Colorado SB 24-205 compliance readiness module
- Pricing: **Undisclosed** (consultation/demo required)
- Source: [Holistic AI Colorado SB205](https://www.holisticai.com/colorado-sb205)

**Glacis (glacis.io)**
- Free AI behavioral assessment (autoredteam)
- Arbiter: AI runtime assurance platform
- Evidence Pack: Cryptographic proof of fairness testing
- Pricing: **Undisclosed** (lead gen via free tool)
- Source: [Glacis Colorado AI Act Guide](https://www.glacis.io/guide-colorado-ai-act)

### Consulting / Service Providers

**Law Firms** (creating demand, not template products):
- Brownstein Hyatt (bhfs.com) — Colorado AI Act compliance advisory
- Schellman (schellman.com) — Partners with RockCyber for ISO 42001 + NIST AI RMF audits
- Gouchev Law — Full AI governance program design
- Jackson Lewis, Ogletree, Perkins Coie, Fisher Phillips — Employment law focus (HR/hiring AI)
- Skadden, Mayer Brown, DLA Piper — Enterprise/national coverage

**HR-Specific:**
- HRBP Online — Fractional HR helping Colorado employers comply with AI hiring rules
- Fisher Phillips — Employment law compliance guidance for HR teams

### Assessment Tools

**The Art of Service (theartofservice.com)**
- Colorado AI Act Readiness Assessment: **$49** (25-question gap analysis with maturity scores)
- AI Compliance Intelligence Platform: **$49** (access to 692 frameworks + 819,000 control mappings)
- Source: [The Art of Service Colorado AI Act](https://theartofservice.com/frameworks/colorado-ai-act-sb-24-205)

---

## 5. Pricing Signals — What the Market Accepts

| Product Type | Price Range | Seller |
|---|---|---|
| Readiness assessment / gap analysis | $49 | The Art of Service |
| Individual template / single document | $49–$199 | AI Compliance Documents, others |
| Full deployer document bundle (8 docs) | $299–$449 | AI Compliance Documents |
| All-access protocol library | $399 | Applied Operations Protocols |
| Custom done-for-you compliance package | $2,500 | Applied Operations Protocols |
| SaaS platform subscription | $199–$999/month | CO-AIMS |
| Enterprise SaaS (consulting + platform) | Undisclosed / custom | TrustArc, Holistic AI, VerifyWise |

**Key pricing gap observed:** There is nothing in the $500–$2,499 range between the document bundles and the custom $2,500 service package. A mid-tier offering (e.g., comprehensive sector-specific document bundle for $697–$997) has no competition at that price point in the self-serve template market.

---

## 6. Market Size Signals

- Enterprise AI governance and compliance market: **$2.55 billion in 2026**, projected $11.05 billion by 2036 (CAGR 15.8%)
- Alternative estimate: $2.54 billion in 2026, growing to $8.23 billion by 2034
- Governance platforms and toolkits hold **48% market share** in 2026
- Subscription-based pricing accounts for **70.4% of the market**
- The demand driver: new regulatory requirements at state level creating urgent compliance need across multiple industries

Source: [Future Market Insights — Enterprise AI Governance Market](https://www.futuremarketinsights.com/reports/enterprise-ai-governance-and-compliance-market)

---

## 7. Sector-Specific Compliance Demand (High-Priority Deployer Segments)

Based on the law's definition of "consequential decisions" and AG enforcement priorities:

1. **Employment / HR** — Highest volume of potential deployers (any company using AI screening, resume ranking, interview analysis). Law firms Fisher Phillips, Ogletree, Jackson Lewis all writing employer-specific guides. SHRM produced a presentation. Fractional HR firms entering as compliance consultants.

2. **Healthcare** — Diagnosis support, treatment recommendation, patient prioritization AI. CO-AIMS explicitly targets Denver-area healthcare providers. Epstein Becker Green (healthcare law specialist) wrote multiple SB 24-205 analysis pieces.

3. **Financial Services / Lending** — Credit scoring, loan decisions, mortgage underwriting. Banks and credit unions largely exempt if under federal prudential oversight, but non-bank fintech lenders fully covered.

4. **Insurance** — Many insurers exempt under SB 21-169 carve-out. Swept AI specifically wrote a roadmap for insurance compliance, suggesting a remaining compliance gap.

5. **Legal Services** — AI for legal research, contract review, case outcome prediction used in legal advice. AG designated legal services as a 2026 priority enforcement area. Likely underserved for compliance documents.

Sources:
- [Ogletree — Employers Need to Know](https://ogletree.com/insights-resources/blog-posts/colorados-artificial-intelligence-act-what-employers-need-to-know/)
- [HRBP Online — Fractional HR Compliance](https://www.hrbponline.com/post/fractional-hr-helps-companies-comply-with-colorado-s-ai-hiring-rules)
- [Swept AI — Insurance Compliance Roadmap](https://www.swept.ai/post/colorado-ai-act-insurance-compliance-roadmap)

---

## 8. Market Gaps Observed

### Gap 1: Sector-Specific Document Bundles
The current market offers either generic compliance templates or expensive custom engagements. No competitor is offering sector-specific document bundles (e.g., "Colorado SB 24-205 Compliance Kit for Healthcare Deployers" or "Colorado AI Hiring Compliance Kit for HR"). The law's requirements differ in practice by sector — a healthcare deployer's impact assessment looks different from an HR deployer's.

### Gap 2: Developer-Specific Products
Virtually all commercial products target deployers. Developers have distinct obligations (public summary, documentation package for deployers, AG notification procedures) and almost nothing is available for them at the self-serve template level.

### Gap 3: Mid-Market Pricing ($500–$2,499)
The gap between a $449 document bundle and a $2,500 custom service is entirely unoccupied. A premium, comprehensive sector-specific bundle in the $697–$997 range has no direct competition.

### Gap 4: ADMT Transition Guidance
Zero products currently exist for the proposed ADMT replacement framework (January 2027 effective date if passed). Businesses need to understand what changes under ADMT vs. SB 24-205. A "transition guide" or "ADMT readiness kit" could be among the first products in the market.

### Gap 5: Developer-to-Deployer Documentation Package
Developers must provide deployers with a documentation package. No template product specifically addresses what a developer's contractual/disclosure package to their deployer customers should contain. This sits at the intersection of SaaS contract language and compliance documentation.

### Gap 6: Legal Services Sector (Underserved)
Law firms are producing guides about the law but nobody is selling compliance documents specifically designed for law firms that use AI in their practice. This is ironic and potentially lucrative — law firms understand compliance requirements but may not have time to produce the actual documents.

---

## 9. Key Law Firm Advisory Activity (Demand Signal)

High law firm advisory activity means clients are being educated and looking for affordable implementation help. Law firms writing guides for SB 24-205 include:

- Brownstein Hyatt (Colorado firm, strong local presence)
- Skadden, Arps, Slate, Meagher & Flom
- Jackson Lewis (employment law focus)
- Ogletree Deakins (employment)
- Fisher Phillips (employment)
- Perkins Coie
- Davis Wright Tremaine
- Epstein Becker Green (healthcare)
- Mayer Brown
- DLA Piper
- Clark Hill
- Katten Muchin Rosenman
- Gunchev Law
- Gouchev Law
- Foster Graham Milstein & Calisher (Colorado firm)

The volume of law firm advisory content is a strong demand signal — clients are asking their law firms "what do I need to do?" and law firms are pointing them toward implementation resources.

---

## 10. Legislative Risk Assessment for Product Strategy

**Scenario A: SB 24-205 takes effect June 30, 2026 as currently written (ADMT not passed)**
- Full deployer compliance stack remains required
- Impact assessments, risk management policies, consumer notices all required
- Current product line at AI Compliance Documents directly addresses the need
- Window: 88 days

**Scenario B: Colorado legislature passes ADMT Framework before June 30, 2026**
- SB 24-205 delayed to January 1, 2027 under ADMT
- Impact assessments and risk management policies eliminated
- Consumer notices and disclosure requirements remain (simplified)
- Current product bundles may need repositioning
- Creates a new product opportunity: ADMT-specific disclosure templates

**Scenario C: Legislature delays but doesn't finalize ADMT before June 30**
- Legal uncertainty; businesses may hedge by over-complying with SB 24-205
- Both frameworks need to be covered in product offerings

**Strategic recommendation from findings:** Build products that work for SB 24-205 NOW (the current law), and ensure consumer notice/disclosure documents are architected to remain useful under ADMT. Impact assessments and risk management policies should be marketed with urgency given the June 30 deadline, but with a note about the pending ADMT revision.

Sources:
- [Governor's Office — AI Workgroup Press Release](https://governorsoffice.colorado.gov/governor/news/colorado-artificial-intelligence-policy-workgroup-delivers-unanimous-support-revised-policy)
- [Akin Gump — Implementation Postponed](https://www.akingump.com/en/insights/ai-law-and-regulation-tracker/colorado-postpones-implementation-of-colorado-ai-act-sb-24-205)

---

## Primary Sources — All URLs

- [Colorado General Assembly — SB24-205 Official](https://leg.colorado.gov/bills/sb24-205)
- [TrustArc — SB24-205 Compliance Guide](https://trustarc.com/resource/colorado-ai-law-sb24-205-compliance-guide/)
- [CO-AIMS — Colorado AI Compliance (annotated)](https://co-aims.com/blog/colorado-ai-act-complete-text-annotated)
- [ALM Corp — Complete Compliance Guide](https://almcorp.com/blog/colorado-ai-act-sb-205-compliance-guide/)
- [Colorado SB24-205.com](https://www.coloradosb205.com/)
- [Foster Graham Milstein — What Businesses Need to Know](https://fostergraham.com/2025/12/colorados-artificial-intelligence-act-what-businesses-need-to-know-about-sb-24-205/)
- [Glacis — Colorado AI Act Guide](https://www.glacis.io/guide-colorado-ai-act)
- [Clark Hill — AI Law Delayed](https://www.clarkhill.com/news-events/news/colorados-ai-law-delayed-until-june-2026-what-the-latest-setback-means-for-businesses/)
- [Center for Democracy & Technology — FAQ](https://cdt.org/insights/faq-on-colorados-consumer-artificial-intelligence-act-sb-24-205/)
- [American Bar Association — Colorado Enacts AI Law](https://www.americanbar.org/groups/business_law/resources/business-law-today/2024-july/colorado-enacts-law-regulating-high-risk-artificial-intelligence-systems/)
- [Applied Operations Protocols — Colorado AI Act Documentation](https://appliedoperationsprotocols.com/colorado-ai-act/impact-assessment/)
- [FPF — Colorado AI Act Two-Pager](https://fpf.org/wp-content/uploads/2024/05/FPF-FINAL-CO-SB-205-Two-Pager-.pdf)
- [AI Compliance Documents](https://aicompliancedocuments.com/)
- [Pacific AI — Compliance Guide](https://pacific.ai/colorado-ai-act-compliance-guide-for-developers-and-deployers/)
- [VerifyWise — Colorado AI Act](https://verifywise.ai/solutions/colorado-ai-act)
- [Mayer Brown — ADMT Framework Proposal](https://www.mayerbrown.com/en/insights/publications/2026/03/the-colorado-ai-policy-work-group-proposes-an-updated-framework-to-replace-the-colorado-ai-act)
- [Colorado Politics — Working Group Agreement](https://www.coloradopolitics.com/2026/03/17/artificial-intelligence-working-group-agrees-on-framework-to-replace-colorado-law)
- [Governor's Office — Workgroup Press Release](https://governorsoffice.colorado.gov/governor/news/colorado-artificial-intelligence-policy-workgroup-delivers-unanimous-support-revised-policy)
- [Colorado Attorney General — AI Enforcement Page](https://coag.gov/ai/)
- [Akin Gump — Postponement Analysis](https://www.akingump.com/en/insights/ai-law-and-regulation-tracker/colorado-postpones-implementation-of-colorado-ai-act-sb-24-205)
- [CO-AIMS — AG Enforcement Analysis](https://co-aims.com/blog/colorado-attorney-general-ai-enforcement)
- [Holistic AI — Colorado SB205](https://www.holisticai.com/colorado-sb205)
- [The Art of Service — Colorado AI Act](https://theartofservice.com/frameworks/colorado-ai-act-sb-24-205)
- [Jackson Lewis — Developers and Deployers](https://www.jacksonlewis.com/insights/colorado-enacts-artificial-intelligence-legislation-affecting-ai-systems-developers-deployers)
- [NAAG — Deep Dive](https://www.naag.org/attorney-general-journal/a-deep-dive-into-colorados-artificial-intelligence-act/)
- [Ogletree — Employers Need to Know](https://ogletree.com/insights-resources/blog-posts/colorados-artificial-intelligence-act-what-employers-need-to-know/)
- [HRBP Online — Fractional HR](https://www.hrbponline.com/post/fractional-hr-helps-companies-comply-with-colorado-s-ai-hiring-rules)
- [Swept AI — Insurance Roadmap](https://www.swept.ai/post/colorado-ai-act-insurance-compliance-roadmap)
- [Future Market Insights — AI Governance Market](https://www.futuremarketinsights.com/reports/enterprise-ai-governance-and-compliance-market)
- [Captain Compliance — Law Do-Over](https://captaincompliance.com/education/colorados-ai-law-do-over-what-the-revision-reveals-about-where-regulation-is-heading/)
- [Brownstein — AI Law Coming Online](https://www.bhfs.com/insight/colorados-landmark-ai-law-coming-online-what-developers-and-deployers-should-know/)
- [CO-AIMS — Notice Requirements](https://co-aims.com/blog/ai-act-notice-requirements-colorado)
- [IRMI — Deployer Disclosure Requirements](https://www.irmi.com/articles/expert-commentary/colorado-artificial-intelligence-law-deployer-disclosure-requirements)
- [Venable — Disclosure and Contracting](https://www.venable.com/insights/publications/ip-quick-bytes/disclosure-requirements-under-the-colorado)
- [Rocky Mountain Employer — Discrimination Prohibition](https://www.rockymountainemployersblog.com/blog/2025/12/5/new-ai-compliance-requirements-prohibit-discrimination-for-colorado-employers)
- [HR Works — Proposed Legislation Shift](https://hrworks-inc.com/blog-post/proposed-legislation-signals-shift-in-colorado-ai-compliance-requirements/)
