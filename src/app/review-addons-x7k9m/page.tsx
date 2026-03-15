import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add-On Products Review — Internal",
  robots: { index: false, follow: false },
};

// ─── 17 new state add-on products ────────────────────────────────────────────
// Source: src/data/regulations.ts  (category: "Add-On", slugs containing il-, co-, ca-, nyc-, va-, eu-)
// Organized: Illinois (2) · Colorado (3) · California (3) · NYC (2) · Virginia (3) · EU (4)
// ─────────────────────────────────────────────────────────────────────────────

const ADDONS = [
  // ════════════════════════════════════
  //  ILLINOIS  (2 products)
  // ════════════════════════════════════
  {
    group: "Illinois — 775 ILCS 5/2-102(L) (HB3773)",
    slug: "il-notice-response-kit",
    name: "Illinois Employee AI Notice & Response Kit",
    shortName: "IL Notice & Response Kit",
    price: 79,
    citation: "775 ILCS 5/2-102(L)",
    citationUrl: "https://www.ilga.gov/legislation/ilcs/fulltext?DocName=077500050K2-102",
    status: "in-effect",
    effectiveDate: "January 1, 2026",
    maxPenalty: "$70,000 per violation",
    appliesToSummary:
      "Any Illinois employer using AI in recruitment, hiring, promotion, renewal of employment, selection for training or apprenticeship, discharge, discipline, tenure, or the terms, privileges, or conditions of employment (775 ILCS 5/2-102(L)).",
    description:
      "When Illinois employees receive your AI notice and have questions — or when you need to log each time AI is used in an employment decision — this kit gives you the forms. Covers the ongoing notice and response lifecycle under 775 ILCS 5/2-102(L).",
    penaltySummary:
      "Civil penalties imposed by the Illinois Human Rights Commission per 775 ILCS 5/8A-104(K) (as amended by P.A. 104-0425): up to $16,000 (first violation), $42,500 (second within 5 years), $70,000 (two+ within 7 years). IDHR investigates charges; the Commission imposes penalties. Private civil action with uncapped actual damages and attorney fees (775 ILCS 5/8A-104).",
    documents: [
      "Employee Notification Template",
      "AI Use Logging Form",
      "Employee Inquiry Response Form",
    ],
    documentExplanations: [
      "The pre-built notice you send to employees and applicants before using AI in employment decisions — satisfies the statutory notice requirement at 775 ILCS 5/2-102(L)(2).",
      "A timestamped log recording each instance an AI tool is used in an employment decision, including which tool, which employee/applicant, and who reviewed the output.",
      "A template response for when employees write back with questions about the AI system — provides a legally consistent answer and documents that you responded.",
    ],
    ready: false,
  },
  {
    group: "Illinois — 775 ILCS 5/2-102(L) (HB3773)",
    slug: "il-zip-proxy-audit",
    name: "Illinois Zip Code Proxy Audit Workbook",
    shortName: "IL Zip Code Proxy Audit",
    price: 99,
    citation: "775 ILCS 5/2-102(L)",
    citationUrl: "https://www.ilga.gov/legislation/ilcs/fulltext?DocName=077500050K2-102",
    status: "in-effect",
    effectiveDate: "January 1, 2026",
    maxPenalty: "$70,000 per violation",
    appliesToSummary:
      "Any Illinois employer using AI in recruitment, hiring, promotion, renewal of employment, selection for training or apprenticeship, discharge, discipline, tenure, or the terms, privileges, or conditions of employment (775 ILCS 5/2-102(L)).",
    description:
      "Illinois HB3773 specifically prohibits using zip codes as a proxy for protected classes. This workbook walks you through auditing your AI hiring tools for zip code data, analyzing whether it correlates with protected characteristics, and documenting your remediation if it does.",
    penaltySummary:
      "Civil penalties imposed by the Illinois Human Rights Commission per 775 ILCS 5/8A-104(K) (as amended by P.A. 104-0425): up to $16,000 (first violation), $42,500 (second within 5 years), $70,000 (two+ within 7 years). IDHR investigates charges; the Commission imposes penalties. Private civil action with uncapped actual damages and attorney fees (775 ILCS 5/8A-104).",
    documents: [
      "Data Input Audit",
      "Proxy Analysis Worksheet",
      "Remediation Plan",
    ],
    documentExplanations: [
      "A structured audit that identifies every data input your AI hiring tool uses — including zip code, census tract, neighborhood, and other geographic variables that Illinois law treats as potential protected-class proxies.",
      "A statistical analysis worksheet that tests whether the geographic inputs in your AI system correlate with race, national origin, or other protected characteristics at levels that would constitute proxy discrimination.",
      "If correlation is found, this plan documents the steps you're taking to remove or mitigate the proxy variable — required evidence of good faith under the Illinois Human Rights Act.",
    ],
    ready: false,
  },

  // ════════════════════════════════════
  //  COLORADO  (3 products)
  // ════════════════════════════════════
  {
    group: "Colorado — C.R.S. §§ 6-1-1701–1707 (SB 24-205)",
    slug: "co-appeal-correction-kit",
    name: "Colorado Consumer Appeal & Correction Process Kit",
    shortName: "CO Appeal & Correction Kit",
    price: 99,
    citation: "C.R.S. § 6-1-1701 et seq.",
    citationUrl: "https://leg.colorado.gov/bills/sb24-205",
    status: "effective-soon",
    effectiveDate: "June 30, 2026",
    maxPenalty: "Up to $20,000 per violation ($50,000 for age 60+)",
    appliesToSummary:
      "Any deployer of a high-risk AI system that makes consequential decisions about Colorado consumers in employment, education, financial services, housing, insurance, or legal services.",
    description:
      "When a Colorado consumer receives an adverse AI decision and wants to appeal — or needs to correct their data — you need a documented process ready. This kit covers the appeal intake, data correction, and outcome letters required by SB 24-205.",
    penaltySummary:
      "Attorney General enforcement under Colorado Consumer Protection Act (C.R.S. § 6-1-112). Up to $20,000 per violation (§ 6-1-112(1)(a)). Up to $50,000 per violation involving persons age 60+ (§ 6-1-112(1)(c)). No private right of action.",
    documents: [
      "Appeal Intake Form",
      "Data Correction Request Form",
      "Appeal Outcome Letter",
    ],
    documentExplanations: [
      "A structured intake form for consumers who want to challenge an adverse AI decision — collects the required information and starts your documented response clock under SB 24-205.",
      "A request form for consumers who want to correct inaccurate data your AI system used in their decision — covers the right to meaningful correction required by C.R.S. § 6-1-1703.",
      "A template outcome letter for completed appeals — covers both upheld decisions (with explanation of factors and next steps) and reversed decisions, so your response is consistent and documented.",
    ],
    ready: false,
  },
  {
    group: "Colorado — C.R.S. §§ 6-1-1701–1707 (SB 24-205)",
    slug: "co-ag-reporting-kit",
    name: "Colorado Algorithmic Discrimination Discovery & AG Reporting Kit",
    shortName: "CO AG Reporting Kit",
    price: 129,
    citation: "C.R.S. § 6-1-1701 et seq.",
    citationUrl: "https://leg.colorado.gov/bills/sb24-205",
    status: "effective-soon",
    effectiveDate: "June 30, 2026",
    maxPenalty: "Up to $20,000 per violation ($50,000 for age 60+)",
    appliesToSummary:
      "Any deployer of a high-risk AI system that makes consequential decisions about Colorado consumers in employment, education, financial services, housing, insurance, or legal services.",
    description:
      "If you discover your high-risk AI system has caused algorithmic discrimination, Colorado law gives you 90 days to report it to the Attorney General. This kit gives you the discovery form, AG notification letter, and corrective action plan so you're not scrambling when it happens.",
    penaltySummary:
      "Attorney General enforcement under Colorado Consumer Protection Act (C.R.S. § 6-1-112). Up to $20,000 per violation (§ 6-1-112(1)(a)). Up to $50,000 per violation involving persons age 60+ (§ 6-1-112(1)(c)). No private right of action.",
    documents: [
      "Discrimination Discovery Form",
      "AG Notification Letter",
      "Corrective Action Plan",
    ],
    documentExplanations: [
      "An internal form that documents the moment you discover evidence of algorithmic discrimination — captures what was found, when, by whom, and which consumers were affected. Starts the 90-day reporting clock.",
      "The formal notification letter to the Colorado Attorney General — pre-formatted with the information SB 24-205 requires, including scope of impact, affected decision categories, and your proposed corrective actions.",
      "A structured plan documenting what you are doing to stop the discriminatory pattern, notify affected consumers, and prevent recurrence — required as part of the AG notification under C.R.S. § 6-1-1703(3).",
    ],
    ready: false,
  },
  {
    group: "Colorado — C.R.S. §§ 6-1-1701–1707 (SB 24-205)",
    slug: "co-dev-deploy-exchange",
    name: "Colorado Developer-Deployer Documentation Exchange Kit",
    shortName: "CO Dev-Deploy Exchange Kit",
    price: 109,
    citation: "C.R.S. § 6-1-1701 et seq.",
    citationUrl: "https://leg.colorado.gov/bills/sb24-205",
    status: "effective-soon",
    effectiveDate: "June 30, 2026",
    maxPenalty: "Up to $20,000 per violation ($50,000 for age 60+)",
    appliesToSummary:
      "Any deployer of a high-risk AI system that makes consequential decisions about Colorado consumers in employment, education, financial services, housing, insurance, or legal services.",
    description:
      "Colorado's law requires AI developers to provide specific documentation to deployers — including model cards, dataset cards, and impact assessment artifacts. This kit standardizes that exchange with checklists, gap analysis, and contract language.",
    penaltySummary:
      "Attorney General enforcement under Colorado Consumer Protection Act (C.R.S. § 6-1-112). Up to $20,000 per violation (§ 6-1-112(1)(a)). Up to $50,000 per violation involving persons age 60+ (§ 6-1-112(1)(c)). No private right of action.",
    documents: [
      "Developer Disclosure Checklist",
      "Deployer Gap Analysis",
      "Third-Party Assessment Addendum",
    ],
    documentExplanations: [
      "A checklist of everything AI developers must provide to deployers under C.R.S. § 6-1-1702 — including intended uses, known limitations, evaluation procedures, training data summaries, and risk management documentation.",
      "A gap analysis template deployers use to evaluate what their AI vendor has and hasn't provided — identifies missing documentation and creates a request letter for outstanding items.",
      "Contract addendum language for deployer-developer agreements that codifies the documentation exchange obligations and assigns liability for undisclosed limitations that cause consumer harm.",
    ],
    ready: false,
  },

  // ════════════════════════════════════
  //  CALIFORNIA  (3 products)
  // ════════════════════════════════════
  {
    group: "California — Cal. Civ. Code § 1798.100 et seq. (CCPA ADMT Regulations)",
    slug: "ca-admt-notice-optout",
    name: "California ADMT Pre-Use Notice & Opt-Out Processing Kit",
    shortName: "CA ADMT Notice & Opt-Out Kit",
    price: 99,
    citation: "Cal. Civ. Code § 1798.100 et seq.",
    citationUrl: "https://cppa.ca.gov/regulations/ccpa_updates.html",
    status: "in-effect",
    effectiveDate: "January 1, 2026",
    maxPenalty: "$7,500 per intentional violation",
    appliesToSummary:
      "Any business subject to CCPA that uses automated decision-making technology to make significant decisions about California consumers.",
    description:
      "California's ADMT regulations require a specific Pre-Use Notice before automated decisionmaking is applied to consumers, plus a documented opt-out process. This kit covers the notice templates, opt-out request handling, and exception documentation per CCPA regulations.",
    penaltySummary:
      "CPPA administrative enforcement and AG civil enforcement. $2,500 per violation, $7,500 per intentional violation (Cal. Civ. Code § 1798.155). No private right of action for ADMT-specific violations.",
    documents: [
      "Pre-Use Notice Template",
      "Opt-Out Request Processing Workflow",
      "Opt-Out Exception Documentation",
    ],
    documentExplanations: [
      "The consumer-facing notice required before ADMT is applied to a California consumer — covers the required elements: the nature of the ADMT, the decision it supports, how to opt out, and the contact for exercising rights.",
      "A step-by-step workflow for handling opt-out requests — covers intake, identity verification, applying the opt-out, confirming to the consumer, and logging the request within the 15-business-day response window.",
      "Documentation for when a consumer's opt-out request falls under one of the regulatory exceptions — captures the exception category, the legal basis, and the consumer response explaining why the opt-out cannot be honored.",
    ],
    ready: false,
  },
  {
    group: "California — Cal. Civ. Code § 1798.100 et seq. (CCPA ADMT Regulations)",
    slug: "ca-admt-access-kit",
    name: "California ADMT Access Request Response Kit",
    shortName: "CA ADMT Access Kit",
    price: 89,
    citation: "Cal. Civ. Code § 1798.100 et seq.",
    citationUrl: "https://cppa.ca.gov/regulations/ccpa_updates.html",
    status: "in-effect",
    effectiveDate: "January 1, 2026",
    maxPenalty: "$7,500 per intentional violation",
    appliesToSummary:
      "Any business subject to CCPA that uses automated decision-making technology to make significant decisions about California consumers.",
    description:
      "When California consumers exercise their right to know how ADMT was used in decisions about them, you need to explain the logic, key parameters, and output. This kit gives you the intake form, explanation template, and response timeline tracker.",
    penaltySummary:
      "CPPA administrative enforcement and AG civil enforcement. $2,500 per violation, $7,500 per intentional violation (Cal. Civ. Code § 1798.155). No private right of action for ADMT-specific violations.",
    documents: [
      "Access Request Intake Form",
      "ADMT Output Explanation Template",
      "Response Timeline Tracker",
    ],
    documentExplanations: [
      "Structured intake form for consumers requesting access to information about ADMT used in decisions about them — collects the information needed to locate their record and verify identity within the 45-day response window.",
      "A template for explaining the ADMT decision in plain language — covers what input data was used, what the system output was, how the output was used in the decision, and the key parameters the consumer can request correction of.",
      "A tracker for managing response deadlines across multiple simultaneous access requests — logs receipt date, 45-day deadline, any extension (up to 45 additional days), and completion status.",
    ],
    ready: false,
  },
  {
    group: "California — Cal. Civ. Code § 1798.100 et seq. (CCPA ADMT Regulations)",
    slug: "ca-cyber-audit-kit",
    name: "California Cybersecurity Audit & Risk Assessment Companion Kit",
    shortName: "CA Cyber Audit Kit",
    price: 149,
    citation: "Cal. Civ. Code § 1798.100 et seq.",
    citationUrl: "https://cppa.ca.gov/regulations/ccpa_updates.html",
    status: "in-effect",
    effectiveDate: "January 1, 2026",
    maxPenalty: "$7,500 per intentional violation",
    appliesToSummary:
      "Any business subject to CCPA that uses automated decision-making technology to make significant decisions about California consumers.",
    description:
      "California's CCPA regulations require annual cybersecurity audits covering 17 specific areas, plus risk assessments analyzing specific harm categories. This kit provides the structured audit checklist, harm-category risk assessment workbook, and remediation tracker.",
    penaltySummary:
      "CPPA administrative enforcement and AG civil enforcement. $2,500 per violation, $7,500 per intentional violation (Cal. Civ. Code § 1798.155). No private right of action for ADMT-specific violations.",
    documents: [
      "Cybersecurity Audit Checklist",
      "Risk Assessment Workbook",
      "Audit Remediation Tracker",
    ],
    documentExplanations: [
      "A structured checklist covering all 17 cybersecurity areas specified in the CPPA's regulations — including access controls, encryption, audit logging, vulnerability management, incident detection, and vendor security. Designed to produce auditable evidence of annual review.",
      "A workbook for analyzing each harm category the CPPA requires businesses to assess: physical, psychological, financial, reputational harm, discrimination, and violation of consumer rights. Structured by AI system and decision category.",
      "A tracker for converting audit findings into remediation tasks — assigns ownership, priority, target completion date, and documents completion evidence. Required to demonstrate that the audit produced action, not just a report.",
    ],
    ready: false,
  },

  // ════════════════════════════════════
  //  NEW YORK CITY  (2 products)
  // ════════════════════════════════════
  {
    group: "New York City — NYC Admin. Code §§ 20-870–20-874 (Local Law 144)",
    slug: "nyc-bias-audit-mgmt",
    name: "NYC Bias Audit Management & Publication Kit",
    shortName: "NYC Bias Audit Management Kit",
    price: 129,
    citation: "NYC Admin. Code § 20-870 et seq.",
    citationUrl: "https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page",
    status: "in-effect",
    effectiveDate: "July 5, 2023",
    maxPenalty: "$500 first violation; $500–$1,500 per subsequent violation per day",
    appliesToSummary:
      "Any employer or employment agency in NYC using an automated employment decision tool to screen candidates or employees for hiring or promotion.",
    description:
      "NYC Local Law 144 requires an annual independent bias audit and public posting of results. This kit gives you the auditor RFP template, results publication template formatted for your website, and an annual renewal calendar so you never miss the one-year deadline.",
    penaltySummary:
      "NYC Department of Consumer and Worker Protection enforcement. Civil penalties of $500 (first), $500-$1,500 per subsequent violation per day. Proactive DCWP investigations increasing in 2026.",
    documents: [
      "Auditor RFP Template",
      "Results Publication Template",
      "Annual Renewal Calendar",
    ],
    documentExplanations: [
      "A request for proposals template for selecting an independent auditor — includes required auditor qualifications under DCWP rules (6 RCNY § 5-302), required scope elements, deliverables, and evaluation criteria.",
      "A publication template formatted to meet LL144's requirement that audit results be publicly posted on your website at least 10 business days before using each AEDT — pre-structured with all required disclosure elements from 6 RCNY § 5-301.",
      "A year-round calendar tracking your audit cycle — maps the audit window, publication deadline, candidate notification requirements, and next annual audit trigger so you stay in continuous compliance.",
    ],
    ready: false,
  },
  {
    group: "New York City — NYC Admin. Code §§ 20-870–20-874 (Local Law 144)",
    slug: "nyc-candidate-notice-kit",
    name: "NYC Candidate/Employee Notice & Alternative Process Kit",
    shortName: "NYC Candidate Notice Kit",
    price: 89,
    citation: "NYC Admin. Code § 20-870 et seq.",
    citationUrl: "https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page",
    status: "in-effect",
    effectiveDate: "July 5, 2023",
    maxPenalty: "$500 first violation; $500–$1,500 per subsequent violation per day",
    appliesToSummary:
      "Any employer or employment agency in NYC using an automated employment decision tool to screen candidates or employees for hiring or promotion.",
    description:
      "NYC requires 10 business days advance notice before using an AEDT on candidates, plus an alternative selection process for those who request one, and a 30-day data disclosure response. This kit covers all three workflows.",
    penaltySummary:
      "NYC Department of Consumer and Worker Protection enforcement. Civil penalties of $500 (first), $500-$1,500 per subsequent violation per day. Proactive DCWP investigations increasing in 2026.",
    documents: [
      "10-Day Advance Notice Template",
      "Alternative Process Workflow",
      "Data Disclosure Response",
    ],
    documentExplanations: [
      "The candidate/employee notice required at least 10 business days before an AEDT is used — covers required content under 6 RCNY § 5-300: what the tool assesses, where results can be found, and how to request an accommodation.",
      "A documented workflow for candidates who request an alternative selection process — covers intake, the alternative method, how results are compared, and documentation of the alternative process offered.",
      "A response template for candidates who request information about the data used in their AEDT assessment — required within 30 days of the request, covers the data categories used and the vendor's data retention policy.",
    ],
    ready: false,
  },

  // ════════════════════════════════════
  //  VIRGINIA  (3 products)
  // ════════════════════════════════════
  {
    group: "Virginia — Va. Code §§ 59.1-575–59.1-584 (CDPA)",
    slug: "va-consumer-rights-kit",
    name: "Virginia Consumer Rights Exercise & Appeal Processing Kit",
    shortName: "VA Consumer Rights Kit",
    price: 99,
    citation: "Va. Code §§ 59.1-575 through 59.1-584",
    citationUrl: "https://law.lis.virginia.gov/vacodefull/title59.1/chapter53/",
    status: "in-effect",
    effectiveDate: "January 1, 2023",
    maxPenalty: "Up to $7,500 per violation (§ 59.1-584(C))",
    appliesToSummary:
      "Controllers doing business in VA or targeting VA residents that (1) process personal data of 100,000+ consumers/year OR (2) derive 50%+ revenue from data sales and process data of 25,000+ consumers.",
    description:
      "Virginia's CDPA gives consumers 5 distinct rights with a 45-day response window and a formal appeal process. When someone exercises a right, you need a documented intake, response, and — if you deny the appeal — an AG complaint referral notice. This kit covers the full lifecycle.",
    penaltySummary:
      "Virginia Attorney General exclusive enforcement (§ 59.1-584(A)). No private right of action. AG must provide 30-day cure period before seeking penalties (§ 59.1-584(B)). Civil penalties up to $7,500 per violation (§ 59.1-584(C)).",
    documents: [
      "Rights Request Intake Form",
      "Appeal Workflow",
      "AG Complaint Referral Notice",
    ],
    documentExplanations: [
      "A structured intake form for all five Virginia CDPA consumer rights — access, correction, deletion, portability, and opt-out — that captures the request type, identity verification, and starts the 45-day response clock (§ 59.1-577).",
      "A documented appeal workflow for consumers who disagree with your initial response — covers the appeal intake, internal review process, and the required response to the consumer within 60 days of receiving the appeal (§ 59.1-577(D)).",
      "A notice required when you deny an appeal — must inform the consumer of how to contact the Virginia Attorney General to submit a complaint (§ 59.1-577(D)(2)), formatted with the required AG contact information.",
    ],
    ready: false,
  },
  {
    group: "Virginia — Va. Code §§ 59.1-575–59.1-584 (CDPA)",
    slug: "va-profiling-assessment-kit",
    name: "Virginia Profiling & AI Data Protection Assessment Workbook",
    shortName: "VA Profiling Assessment Workbook",
    price: 109,
    citation: "Va. Code §§ 59.1-575 through 59.1-584",
    citationUrl: "https://law.lis.virginia.gov/vacodefull/title59.1/chapter53/",
    status: "in-effect",
    effectiveDate: "January 1, 2023",
    maxPenalty: "Up to $7,500 per violation (§ 59.1-584(C))",
    appliesToSummary:
      "Controllers doing business in VA or targeting VA residents that (1) process personal data of 100,000+ consumers/year OR (2) derive 50%+ revenue from data sales and process data of 25,000+ consumers.",
    description:
      "Virginia requires data protection assessments specifically structured around statutory weighing factors — benefits vs. risks, de-identified alternatives, consumer expectations, and the controller-consumer relationship. This workbook implements those exact factors.",
    penaltySummary:
      "Virginia Attorney General exclusive enforcement (§ 59.1-584(A)). No private right of action. AG must provide 30-day cure period before seeking penalties (§ 59.1-584(B)). Civil penalties up to $7,500 per violation (§ 59.1-584(C)).",
    documents: [
      "Profiling Assessment Template",
      "Benefits-Risks Worksheet",
      "Sensitive Data Consent Form",
    ],
    documentExplanations: [
      "A data protection assessment template structured around the specific weighing factors in § 59.1-580(A)(3) — the nature and purpose of processing, the type of personal data, the context of the controller-consumer relationship, the expected benefits, and the risks to consumer rights.",
      "A structured worksheet that implements the benefits-vs-risks analysis required by § 59.1-580 — quantifies the controller's legitimate business interest, the public benefit, the foreseeable risks to consumers, and whether less privacy-invasive alternatives exist.",
      "A consent form for processing sensitive data categories defined in § 59.1-575 — racial or ethnic origin, religious beliefs, mental/physical health, sexual orientation, citizenship status, genetic or biometric data, and children's data.",
    ],
    ready: false,
  },
  {
    group: "Virginia — Va. Code §§ 59.1-575–59.1-584 (CDPA)",
    slug: "va-controller-processor-kit",
    name: "Virginia Controller-Processor Contract & Vendor Compliance Kit",
    shortName: "VA Controller-Processor Kit",
    price: 89,
    citation: "Va. Code §§ 59.1-575 through 59.1-584",
    citationUrl: "https://law.lis.virginia.gov/vacodefull/title59.1/chapter53/",
    status: "in-effect",
    effectiveDate: "January 1, 2023",
    maxPenalty: "Up to $7,500 per violation (§ 59.1-584(C))",
    appliesToSummary:
      "Controllers doing business in VA or targeting VA residents that (1) process personal data of 100,000+ consumers/year OR (2) derive 50%+ revenue from data sales and process data of 25,000+ consumers.",
    description:
      "Virginia's CDPA requires specific contractual terms between controllers and processors — confidentiality, data return/deletion, compliance demonstration, audit rights, and subcontractor flow-down. This kit provides the contract templates and audit questionnaire.",
    penaltySummary:
      "Virginia Attorney General exclusive enforcement (§ 59.1-584(A)). No private right of action. AG must provide 30-day cure period before seeking penalties (§ 59.1-584(B)). Civil penalties up to $7,500 per violation (§ 59.1-584(C)).",
    documents: [
      "Processor DPA Template",
      "Processor Audit Questionnaire",
      "Subcontractor Flowdown Addendum",
    ],
    documentExplanations: [
      "A Data Processing Agreement template incorporating all mandatory contractual terms under § 59.1-579(B) — processing instructions, confidentiality, security measures, audit rights, data deletion/return, and subcontractor authorization requirements.",
      "An annual questionnaire sent to processors to verify continued compliance with your DPA — covers data minimization, security controls, personnel training, subcontractor management, and incident response readiness.",
      "Addendum language that flows your processor DPA obligations down to any subcontractors the processor uses — required by § 59.1-579(B)(5) whenever a processor engages a subcontractor.",
    ],
    ready: false,
  },

  // ════════════════════════════════════
  //  EUROPEAN UNION  (4 products)
  // ════════════════════════════════════
  {
    group: "European Union — Regulation (EU) 2024/1689 (EU AI Act)",
    slug: "eu-fria-kit",
    name: "EU AI Act Fundamental Rights Impact Assessment Kit",
    shortName: "EU FRIA Kit",
    price: 149,
    citation: "Regulation (EU) 2024/1689",
    citationUrl: "https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202401689",
    status: "in-effect",
    effectiveDate: "Staggered: Prohibited AI Feb 2025, GPAI Aug 2025, Annex III high-risk Aug 2026",
    maxPenalty: "€15M or 3% global turnover (high-risk); €35M or 7% (prohibited)",
    appliesToSummary:
      "Any company deploying high-risk AI systems in the EU market, including US companies serving EU customers.",
    description:
      "Article 27 of the EU AI Act requires deployers of certain high-risk AI systems to complete a Fundamental Rights Impact Assessment before first use, covering 6 specific elements. This kit provides the FRIA template, authority notification letter, and update trigger assessment.",
    penaltySummary:
      "National authorities enforcement. High-risk AI violations: up to €15,000,000 or 3% global turnover (Art. 99(4)). Prohibited AI practices: up to €35,000,000 or 7% global turnover (Art. 99(3)). False information: up to €7,500,000 or 1% global turnover (Art. 99(5)).",
    documents: [
      "FRIA Template",
      "Authority Notification Letter",
      "FRIA Update Trigger Assessment",
    ],
    documentExplanations: [
      "The Fundamental Rights Impact Assessment template covering all 6 elements required by Art. 27(1): affected persons and groups, the concrete adverse impacts on fundamental rights, measures to mitigate those impacts, the purpose and benefits, the conditions of deployment, and who is responsible for monitoring.",
      "The notification letter required when a public body deployer completes a FRIA — formatted for submission to the relevant national market surveillance authority per Art. 27(3), with attachments checklist.",
      "A structured assessment for determining when a completed FRIA must be updated — covers the 5 material change triggers in Art. 27(1) that require reassessment: changes to purpose, to the AI system, to the population affected, to safeguards, and to the legal framework.",
    ],
    ready: false,
  },
  {
    group: "European Union — Regulation (EU) 2024/1689 (EU AI Act)",
    slug: "eu-post-market-kit",
    name: "EU AI Act Post-Market Monitoring & Serious Incident Response Kit",
    shortName: "EU Post-Market Kit",
    price: 139,
    citation: "Regulation (EU) 2024/1689",
    citationUrl: "https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202401689",
    status: "in-effect",
    effectiveDate: "Staggered: Prohibited AI Feb 2025, GPAI Aug 2025, Annex III high-risk Aug 2026",
    maxPenalty: "€15M or 3% global turnover (high-risk); €35M or 7% (prohibited)",
    appliesToSummary:
      "Any company deploying high-risk AI systems in the EU market, including US companies serving EU customers.",
    description:
      "After deploying a high-risk AI system in the EU, you must monitor its operation and report serious incidents within 15 days. This kit covers the monitoring plan, incident report template with the notification cascade, and the 6-month log retention policy.",
    penaltySummary:
      "National authorities enforcement. High-risk AI violations: up to €15,000,000 or 3% global turnover (Art. 99(4)). Prohibited AI practices: up to €35,000,000 or 7% global turnover (Art. 99(3)). False information: up to €7,500,000 or 1% global turnover (Art. 99(5)).",
    documents: [
      "Post-Market Monitoring Plan",
      "Serious Incident Report",
      "Log Retention Policy",
    ],
    documentExplanations: [
      "The monitoring plan required by Art. 72 — covers the monitoring methodology, data collection procedures, performance thresholds, deviation triggers, and review frequency. Designed to be system-specific and proportionate to the risk level.",
      "The serious incident report template structured around Art. 73 notification requirements — covers incident classification, immediate containment actions, scope of impact, root cause analysis fields, and the 15-day notification cascade to the national authority.",
      "A retention policy for the AI system logs required by Art. 12 — specifies the 6-month minimum retention period, the log categories covered, storage and access controls, and deletion schedule. Required by Art. 26(6) for deployers of high-risk systems.",
    ],
    ready: false,
  },
  {
    group: "European Union — Regulation (EU) 2024/1689 (EU AI Act)",
    slug: "eu-human-oversight-kit",
    name: "EU AI Act Human Oversight & Worker Notification Kit",
    shortName: "EU Human Oversight Kit",
    price: 99,
    citation: "Regulation (EU) 2024/1689",
    citationUrl: "https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202401689",
    status: "in-effect",
    effectiveDate: "Staggered: Prohibited AI Feb 2025, GPAI Aug 2025, Annex III high-risk Aug 2026",
    maxPenalty: "€15M or 3% global turnover (high-risk); €35M or 7% (prohibited)",
    appliesToSummary:
      "Any company deploying high-risk AI systems in the EU market, including US companies serving EU customers.",
    description:
      "The EU AI Act requires designated human oversight with documented competence and authority, plus worker notification before deployment. This kit covers the oversight implementation plan, worker notification template, and oversight decision log.",
    penaltySummary:
      "National authorities enforcement. High-risk AI violations: up to €15,000,000 or 3% global turnover (Art. 99(4)). Prohibited AI practices: up to €35,000,000 or 7% global turnover (Art. 99(3)). False information: up to €7,500,000 or 1% global turnover (Art. 99(5)).",
    documents: [
      "Oversight Implementation Plan",
      "Worker Notification Template",
      "Oversight Decision Log",
    ],
    documentExplanations: [
      "An implementation plan for Art. 26(2) human oversight requirements — designates the natural persons responsible for oversight, documents their competence and training, defines their authority to intervene and override the AI system, and specifies the oversight intervals.",
      "The worker notification template required before deploying a high-risk AI system that affects workers — covers the nature of the AI system, the decisions it supports, the oversight structure, how to raise concerns, and the contact for AI-related questions. Required under Art. 26(7).",
      "A running log of oversight decisions — records each instance where the designated overseer reviewed an AI output, what decision was made (accepted, modified, or overridden), and the rationale. Provides the audit trail required to demonstrate meaningful oversight under Art. 14.",
    ],
    ready: false,
  },
  {
    group: "European Union — Regulation (EU) 2024/1689 (EU AI Act)",
    slug: "eu-registration-transparency",
    name: "EU AI Act Database Registration & Transparency Kit",
    shortName: "EU Registration & Transparency Kit",
    price: 89,
    citation: "Regulation (EU) 2024/1689",
    citationUrl: "https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202401689",
    status: "in-effect",
    effectiveDate: "Staggered: Prohibited AI Feb 2025, GPAI Aug 2025, Annex III high-risk Aug 2026",
    maxPenalty: "€15M or 3% global turnover (high-risk); €35M or 7% (prohibited)",
    appliesToSummary:
      "Any company deploying high-risk AI systems in the EU market, including US companies serving EU customers.",
    description:
      "Public authority deployers must register in the EU AI database, and all deployers must make transparency disclosures — including specific requirements for emotion recognition and deep fake systems. This kit covers registration prep, transparency disclosures, and provider documentation verification.",
    penaltySummary:
      "National authorities enforcement. High-risk AI violations: up to €15,000,000 or 3% global turnover (Art. 99(4)). Prohibited AI practices: up to €35,000,000 or 7% global turnover (Art. 99(3)). False information: up to €7,500,000 or 1% global turnover (Art. 99(5)).",
    documents: [
      "Database Registration Checklist",
      "Transparency Disclosure Templates",
      "Provider Documentation Verification",
    ],
    documentExplanations: [
      "A pre-registration checklist for the EU AI database — covers all information fields required by Art. 49 and Annex VIII, including the AI system description, intended purpose, conformity assessment status, and the provider's EU representative information.",
      "Transparency disclosure templates covering three required disclosure types: (1) the general AI system deployment notice under Art. 26(6), (2) the emotion recognition system disclosure under Art. 50(1), and (3) the AI-generated content / deep fake disclosure under Art. 50(4).",
      "A verification checklist for the provider documentation deployers must receive before using a high-risk AI system — confirms that EU Declaration of Conformity (Art. 47), CE marking (Art. 48), technical documentation (Annex IV), and instructions for use (Art. 13) are complete and current.",
    ],
    ready: false,
  },
] as const;

// Group products by jurisdiction
const GROUPS = [
  "Illinois — 775 ILCS 5/2-102(L) (HB3773)",
  "Colorado — C.R.S. §§ 6-1-1701–1707 (SB 24-205)",
  "California — Cal. Civ. Code § 1798.100 et seq. (CCPA ADMT Regulations)",
  "New York City — NYC Admin. Code §§ 20-870–20-874 (Local Law 144)",
  "Virginia — Va. Code §§ 59.1-575–59.1-584 (CDPA)",
  "European Union — Regulation (EU) 2024/1689 (EU AI Act)",
] as const;

export default function ReviewAddonsPage() {
  return (
    <div style={{ fontFamily: "Georgia, serif", maxWidth: 900, margin: "0 auto", padding: "2rem 1.5rem", color: "#111" }}>
      <h1 style={{ fontSize: "1.6rem", borderBottom: "3px solid #111", paddingBottom: "0.5rem", marginBottom: "0.5rem" }}>
        Internal Review: 17 New State Add-On Products
      </h1>
      <p style={{ fontSize: "0.9rem", color: "#555", marginBottom: "2.5rem" }}>
        Not indexed. All products have <code>ready: false</code> in regulations.ts and will show COMING SOON on the site.
        Organized by jurisdiction. Review text is rendered inline — no PDFs.
      </p>

      {/* Summary table */}
      <h2 style={{ fontSize: "1.2rem", marginBottom: "0.75rem" }}>Product Count by Jurisdiction</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "2.5rem", fontSize: "0.9rem" }}>
        <thead>
          <tr style={{ background: "#f0f0f0" }}>
            <th style={{ textAlign: "left", padding: "0.4rem 0.6rem", border: "1px solid #ccc" }}>Jurisdiction</th>
            <th style={{ textAlign: "center", padding: "0.4rem 0.6rem", border: "1px solid #ccc" }}>Products</th>
            <th style={{ textAlign: "right", padding: "0.4rem 0.6rem", border: "1px solid #ccc" }}>Price Range</th>
          </tr>
        </thead>
        <tbody>
          {GROUPS.map((group) => {
            const items = ADDONS.filter((a) => a.group === group);
            const prices = items.map((a) => a.price);
            const min = Math.min(...prices);
            const max = Math.max(...prices);
            return (
              <tr key={group}>
                <td style={{ padding: "0.4rem 0.6rem", border: "1px solid #ccc" }}>{group}</td>
                <td style={{ textAlign: "center", padding: "0.4rem 0.6rem", border: "1px solid #ccc" }}>{items.length}</td>
                <td style={{ textAlign: "right", padding: "0.4rem 0.6rem", border: "1px solid #ccc" }}>
                  {min === max ? `$${min}` : `$${min}–$${max}`}
                </td>
              </tr>
            );
          })}
          <tr style={{ fontWeight: "bold", background: "#f9f9f9" }}>
            <td style={{ padding: "0.4rem 0.6rem", border: "1px solid #ccc" }}>TOTAL</td>
            <td style={{ textAlign: "center", padding: "0.4rem 0.6rem", border: "1px solid #ccc" }}>{ADDONS.length}</td>
            <td style={{ textAlign: "right", padding: "0.4rem 0.6rem", border: "1px solid #ccc" }}>
              ${Math.min(...ADDONS.map((a) => a.price))}–${Math.max(...ADDONS.map((a) => a.price))}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Products by group */}
      {GROUPS.map((group) => {
        const items = ADDONS.filter((a) => a.group === group);
        return (
          <section key={group} style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "1.25rem", background: "#1a1a2e", color: "#fff", padding: "0.5rem 0.75rem", marginBottom: "1.5rem", borderRadius: 2 }}>
              {group}
            </h2>

            {items.map((addon, idx) => (
              <div key={addon.slug} style={{ border: "1px solid #ddd", borderRadius: 4, padding: "1.25rem 1.5rem", marginBottom: "1.5rem" }}>
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "1rem", flexWrap: "wrap" }}>
                  <h3 style={{ fontSize: "1.05rem", margin: 0, flex: 1 }}>
                    {idx + 1}. {addon.name}
                  </h3>
                  <span style={{ fontWeight: "bold", fontSize: "1.05rem", whiteSpace: "nowrap" }}>${addon.price}</span>
                </div>

                {/* Slug + status row */}
                <div style={{ fontSize: "0.8rem", color: "#666", marginTop: "0.35rem", marginBottom: "0.75rem" }}>
                  <code>{addon.slug}</code>
                  {" · "}
                  <span style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}>{addon.status}</span>
                  {" · "}
                  Effective: {addon.effectiveDate}
                  {" · "}
                  Max penalty: {addon.maxPenalty}
                </div>

                {/* Description */}
                <p style={{ margin: "0 0 0.85rem 0", lineHeight: 1.6 }}>
                  <strong>Description:</strong> {addon.description}
                </p>

                {/* Applies to */}
                <p style={{ margin: "0 0 0.85rem 0", lineHeight: 1.6, fontSize: "0.9rem" }}>
                  <strong>Applies to:</strong> {addon.appliesToSummary}
                </p>

                {/* Penalty summary */}
                <p style={{ margin: "0 0 1rem 0", lineHeight: 1.6, fontSize: "0.9rem", color: "#4a1010" }}>
                  <strong>Penalty:</strong> {addon.penaltySummary}
                </p>

                {/* Documents */}
                <div style={{ background: "#f8f8f8", borderRadius: 3, padding: "0.85rem 1rem" }}>
                  <strong style={{ fontSize: "0.9rem", display: "block", marginBottom: "0.5rem" }}>
                    Documents ({addon.documents.length}):
                  </strong>
                  <ol style={{ margin: 0, paddingLeft: "1.25rem" }}>
                    {addon.documents.map((doc, di) => (
                      <li key={doc} style={{ marginBottom: "0.5rem" }}>
                        <strong>{doc}</strong>
                        <br />
                        <span style={{ fontSize: "0.875rem", color: "#444", lineHeight: 1.5 }}>
                          {addon.documentExplanations[di]}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Citation */}
                <p style={{ margin: "0.75rem 0 0 0", fontSize: "0.8rem", color: "#555" }}>
                  Citation:{" "}
                  <a href={addon.citationUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#0055aa" }}>
                    {addon.citation}
                  </a>
                </p>
              </div>
            ))}
          </section>
        );
      })}

      {/* Missing data callout */}
      <section style={{ background: "#fff8e6", border: "1px solid #e6c84a", borderRadius: 4, padding: "1rem 1.25rem", marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1rem", margin: "0 0 0.5rem 0" }}>What is NOT yet built for these products</h2>
        <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.9rem" }}>
          All 17 products exist in <code>regulations.ts</code> with <code>ready: false</code>. None have:
        </p>
        <ul style={{ margin: 0, paddingLeft: "1.25rem", fontSize: "0.9rem" }}>
          <li>Stripe price IDs (all empty strings in regulations.ts)</li>
          <li>Entries in <code>REGULATION_CONFIG</code> (regulation-config.ts) — no acknowledgment text, no decisions array, no help texts</li>
          <li>Entries in <code>REGULATION_EMAIL</code> (send-documents route) — no email template, steps, or reminder text</li>
          <li>PDF generator functions in <code>src/lib/pdf-generators/</code></li>
          <li>DOC_EXPLANATIONS entries in regulations/[slug]/page.tsx</li>
        </ul>
      </section>
    </div>
  );
}
