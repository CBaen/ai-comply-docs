import type { RegulationConfig, AddonConfig } from "./pdf-types";
export type { AddonConfig };

// Shared option sets — referenced by products below to avoid duplication.

/** Default oversight options for hiring/employment products. */
const OVERSIGHT_OPTIONS_HIRING = [
  { value: "screening", label: "AI screens/filters, human reviews remaining candidates" },
  { value: "primary", label: "AI recommends, human makes final decision" },
  { value: "sole", label: "AI decides autonomously, human reviews exceptions" },
  { value: "advisory", label: "Advisory only — AI provides information, human decides independently" },
];

/** Generic oversight options for privacy, governance, and framework products. */
const OVERSIGHT_OPTIONS_GENERIC = [
  { value: "processing", label: "AI processes data, human reviews outputs" },
  { value: "primary", label: "AI recommends actions, human makes final decision" },
  { value: "sole", label: "AI decides autonomously, human reviews exceptions" },
  { value: "advisory", label: "Advisory only — AI provides analysis, human decides independently" },
];

/** Generic data-input options for non-hiring products. */
const DATA_INPUT_OPTIONS_GENERIC = [
  { value: "customer_profiles", label: "Customer profiles" },
  { value: "transaction_data", label: "Transaction data" },
  { value: "behavioral_data", label: "Behavioral data" },
  { value: "location_data", label: "Location data" },
  { value: "communication_data", label: "Communication data" },
  { value: "biometric", label: "Biometric data" },
  { value: "health_data", label: "Health data" },
  { value: "financial_data", label: "Financial data" },
];

export const REGULATION_CONFIG: Record<string, RegulationConfig> = {
  "illinois-hb3773": {
    name: "Illinois HB3773",
    statute: "775 ILCS 5/2-102(L)",
    lawUrl:
      "https://www.ilga.gov/legislation/ilcs/fulltext?DocName=077500050K2-102",
    lawLinkText: "Read 775 ILCS 5/2-102 on ilga.gov",
    acknowledgment:
      'I have reviewed 775 ILCS 5/2-102(L) and understand that these are compliance templates, not legal advice. I understand that IDHR is currently developing implementing rules but has not yet published proposed rules. The notice elements in these templates are best-practice recommendations based on the statutory text. I should verify the current regulatory status at dhr.illinois.gov and consult qualified legal counsel.',
    basePrice: 299,
    addons: [
      {
        id: "manager-training-kit",
        slug: "manager-ai-training-kit",
        label: "Manager AI Training Kit",
        description: "Talking points, employee FAQ, and training sign-off sheet for managers explaining AI use to their teams.",
        price: 47,
        stripePriceId: "price_1TA3XHGidFVHIL99h2UwiLd9",
      },
    ],
    documents: [
      "Employee/Applicant AI Notification Template (customized)",
      "AI System Inventory Document",
      "Impact Assessment Framework",
      "Human Oversight Protocol Document",
      "Accommodation Request Form",
      "Compliance Checklist",
    ],
    decisions: [
      ["recruitment", "Recruitment"],
      ["hiring", "Hiring"],
      ["promotion", "Promotion"],
      ["renewal", "Renewal of Employment"],
      ["training", "Selection for Training or Apprenticeship"],
      ["discharge", "Discharge"],
      ["discipline", "Discipline"],
      ["tenure", "Tenure"],
      ["terms", "Terms, Privileges, or Conditions of Employment"],
    ],
    helpTexts: {
      step2Help:
        'What counts as an \u201cAI system\u201d? Any software that uses artificial intelligence, machine learning, or automated decision-making in your hiring or employment process. Common examples: resume screening tools (like HireVue, Pymetrics), automated scheduling software, performance review platforms with AI features, or chatbots that interact with job applicants. If you\u2019re not sure whether a tool counts \u2014 include it. It\u2019s better to disclose more than less.',
      step2Intro:
        "List each AI tool or system used in employment decisions. We\u2019ll generate documentation for each one.",
      step2DecisionHelp:
        'Check every type of employment decision where this AI tool plays any role \u2014 even a small one. If the tool helps screen resumes, check \u201cRecruitment\u201d and \u201cHiring.\u201d If it flags employees for performance reviews, check \u201cDiscipline\u201d or \u201cTerms, Privileges, or Conditions of Employment.\u201d',
      step2MultiHelp:
        "Do you use more than one AI tool? Many companies use multiple AI systems \u2014 one for resume screening, another for interview scheduling, another for performance reviews. Each tool needs to be listed separately in your compliance documents. If you only use one AI tool, you can skip this button.",
      step3BiasHelp:
        "Not required by law. Illinois HB3773 does not mandate a bias audit. However, if your company ever faces a discrimination claim, having conducted one is strong evidence of good faith. An independent statistician examines whether your AI tool produces different outcomes for different demographic groups. Most companies haven\u2019t done one. Just select what fits your situation.",
      step4Help:
        "This section captures how your company uses AI outputs and who oversees the process. Illinois law requires that AI not have a discriminatory effect \u2014 having strong human oversight is a key safeguard.",
      step5Intro:
        "This information will appear on your compliance documents as the designated contact for AI-related inquiries, consistent with the statutory notice requirement in 775 ILCS 5/2-102(L)(2).",
    },
  },
  "colorado-sb24-205": {
    name: "Colorado SB 24-205",
    statute: "C.R.S. \u00A7\u00A7 6-1-1701\u20131707",
    lawUrl: "https://leg.colorado.gov/bills/sb24-205",
    lawLinkText: "Read SB 24-205 on leg.colorado.gov",
    acknowledgment:
      'I have reviewed C.R.S. \u00A7\u00A7 6-1-1701 through 6-1-1707 (Colorado SB 24-205, effective June 30, 2026 per SB 25B-004) and understand that these are compliance templates, not legal advice. I should verify the current regulatory status and consult qualified legal counsel.',
    basePrice: 449,
    skippedSteps: [3],
    oversightOptions: OVERSIGHT_OPTIONS_GENERIC,

    documents: [
      "Risk Management Policy & Program",
      "Impact Assessment Framework",
      "Consumer Pre-Decision Notice & AI Disclosure",
      "Adverse Decision Response Kit",
      "Public Transparency Statement",
      "Algorithmic Discrimination Incident Response Plan",
      "Record Retention Policy",
      "Comprehensive Compliance Checklist",
    ],
    decisions: [
      ["education", "Education Enrollment or Opportunity"],
      ["employment", "Employment or Employment Opportunities"],
      ["financial", "Financial or Lending Services"],
      ["government", "Essential Government Services"],
      ["healthcare", "Health Care Services"],
      ["housing", "Housing"],
      ["insurance", "Insurance"],
      ["legal", "Legal Services"],
    ],
    helpTexts: {
      step2Help:
        'What counts as a \u201chigh-risk AI system\u201d? Under C.R.S. \u00A7 6-1-1701(6), any AI system that makes, or is a substantial factor in making, a \u201cconsequential decision\u201d \u2014 a decision with material legal or similarly significant effect on a consumer. This includes AI used in lending decisions, insurance underwriting, hiring tools, healthcare triage, tenant screening, education admissions, and legal risk scoring. If you\u2019re not sure whether a tool counts \u2014 include it.',
      step2Intro:
        "List each AI tool or system used in consequential decisions about consumers. We\u2019ll generate documentation for each one.",
      step2DecisionHelp:
        'Check every type of consequential decision where this AI tool plays any role. These 8 areas are defined in C.R.S. \u00A7 6-1-1701(3). If an AI tool helps screen loan applications, check \u201cFinancial or Lending Services.\u201d If it triages patient intake, check \u201cHealth Care Services.\u201d',
      step2MultiHelp:
        "Do you use more than one AI tool? Many companies deploy multiple AI systems across different business areas \u2014 one for customer risk scoring, another for claims processing, another for hiring. Each system needs to be listed separately in your compliance documents. If you only use one, skip this button.",
      step3BiasHelp:
        "Strongly recommended. Colorado SB 24-205 requires deployers to use \u201creasonable care\u201d to protect consumers from algorithmic discrimination (\u00A7 6-1-1703(1)). A bias audit is strong evidence of reasonable care. An independent statistician examines whether your AI tool produces different outcomes for different demographic groups. Most companies haven\u2019t done one. Just select what fits your situation.",
      step4Help:
        "This section captures how your company uses AI outputs and who oversees the process. Colorado law requires deployers to use reasonable care to protect consumers from algorithmic discrimination (\u00A7 6-1-1703(1)) \u2014 strong human oversight is a key element of that duty.",
      step5Intro:
        "This information will appear on your compliance documents as the designated contact for consumer AI inquiries, per C.R.S. \u00A7 6-1-1703(4)(a).",
    },
  },
  "employee-ai-policy": {
    name: "Employee AI Acceptable Use Policy",
    statute: "NIST AI RMF + EEOC Guidance",
    lawUrl: "https://www.nist.gov/itl/ai-risk-management-framework",
    lawLinkText: "Review the NIST AI Risk Management Framework",
    acknowledgment:
      "I have reviewed the NIST AI Risk Management Framework and EEOC AI guidance referenced in this product. I understand that these are policy templates, not legal advice. I should consult qualified legal counsel to verify applicability to my organization.",
    basePrice: 199,
    skippedSteps: [3],
    oversightOptions: OVERSIGHT_OPTIONS_GENERIC,
    gateText: "These templates reference the NIST AI Risk Management Framework. We recommend reviewing the framework before purchasing.",

    documents: [
      "AI Acceptable Use Policy",
      "Employee AI Training Acknowledgment",
      "AI Incident Reporting Form",
    ],
    decisions: [
      ["hiring", "Hiring & Recruitment"],
      ["customer_service", "Customer Service & Support"],
      ["content", "Content Creation & Marketing"],
      ["analysis", "Data Analysis & Reporting"],
      ["coding", "Software Development & Coding"],
      ["internal_ops", "Internal Operations & Workflows"],
    ],
    helpTexts: {
      step2Help:
        "What counts as an AI tool? Any software that uses artificial intelligence, machine learning, or generative AI. Common examples: ChatGPT, Microsoft Copilot, GitHub Copilot, Grammarly, AI-powered CRM features, automated scheduling tools, or any tool that generates text, images, code, or recommendations. If you\u2019re not sure \u2014 include it.",
      step2Intro:
        "List each AI tool your employees use. This helps us customize your policy to cover the specific tools in your workplace.",
      step2DecisionHelp:
        "Check every area where this AI tool is used in your organization. This determines which policy sections are most relevant for your team.",
      step2MultiHelp:
        "Most companies use multiple AI tools \u2014 one for writing, another for coding, another for customer service. List each one separately so your policy covers them all.",
      step3BiasHelp:
        "If any of your AI tools affect decisions about people (hiring, performance reviews, customer interactions), a bias audit helps identify potential fairness issues. Not required for internal-only tools like coding assistants.",
      step4Help:
        "This section captures how your company governs AI tool usage. Strong oversight policies protect both employees and the organization.",
      step5Intro:
        "This person will be listed as the AI policy administrator \u2014 the point of contact for questions, incident reports, and policy updates.",
    },
  },
  "vendor-ai-due-diligence": {
    name: "Vendor AI Due Diligence Kit",
    statute: "NIST AI RMF MAP Function",
    lawUrl: "https://airc.nist.gov/AI_RMF_Knowledge_Base/Playbook",
    lawLinkText: "Review the NIST AI RMF Playbook",
    acknowledgment:
      "I have reviewed the NIST AI RMF Playbook and applicable state laws referenced in this product. I understand that these are due diligence templates, not legal advice. I should consult qualified legal counsel for my specific vendor contracts.",
    basePrice: 249,
    oversightOptions: OVERSIGHT_OPTIONS_GENERIC,
    dataInputOptions: DATA_INPUT_OPTIONS_GENERIC,
    gateText: "These templates reference the NIST AI RMF Playbook. We recommend reviewing the framework before purchasing.",

    documents: [
      "Vendor AI Due Diligence Questionnaire",
      "AI Vendor Contract Addendum",
      "Vendor Risk Assessment Template",
      "Ongoing Monitoring Checklist",
    ],
    decisions: [
      ["hiring", "Hiring & Employment"],
      ["financial", "Financial & Lending"],
      ["insurance", "Insurance & Underwriting"],
      ["healthcare", "Healthcare & Clinical"],
      ["customer_service", "Customer Service & Support"],
      ["marketing", "Marketing & Personalization"],
    ],
    helpTexts: {
      step2Help:
        "What counts as a vendor AI system? Any third-party software or service that uses AI to process data or make recommendations for your business. This includes HR platforms with AI screening, CRM tools with AI features, lending or insurance models from vendors, and any SaaS product marketed as \u201cAI-powered.\u201d",
      step2Intro:
        "List each AI system you procure from third-party vendors. We\u2019ll generate due diligence documentation for each one.",
      step2DecisionHelp:
        "Check every area where this vendor\u2019s AI tool influences decisions. Multiple state laws (CO, IL, TX) require deployers to evaluate vendor AI systems that make consequential decisions.",
      step2MultiHelp:
        "Most companies use AI from multiple vendors. List each vendor\u2019s AI product separately \u2014 each needs its own risk assessment and contract addendum.",
      step3BiasHelp:
        "Ask your AI vendor if they\u2019ve conducted bias testing on their system. If they have, request the results. If they haven\u2019t, that\u2019s a significant risk factor for your vendor risk assessment.",
      step4Help:
        "This section captures what controls exist over vendor AI outputs. Can you override the AI\u2019s recommendations? Do you have audit access? These are critical questions for vendor evaluation.",
      step5Intro:
        "This person will be listed as your organization\u2019s vendor AI compliance contact \u2014 the person responsible for ongoing vendor monitoring.",
    },
  },
  "ai-bias-audit-template": {
    name: "AI Bias Audit Report Template",
    statute: "NYC LL144 + EEOC + NIST AI RMF",
    lawUrl: "https://www.eeoc.gov/artificial-intelligence-and-algorithmic-fairness-initiative",
    lawLinkText: "Review EEOC AI Guidance",
    acknowledgment:
      "I have reviewed the EEOC AI guidance and NYC LL144 requirements referenced in this product. I understand that these are audit templates, not legal advice. I should consult qualified legal counsel and a qualified auditor for my specific situation.",
    basePrice: 149,
    oversightOptions: OVERSIGHT_OPTIONS_GENERIC,
    dataInputOptions: DATA_INPUT_OPTIONS_GENERIC,
    gateText: "These templates reference EEOC guidance on AI in employment. We recommend reviewing the guidance before purchasing.",

    documents: [
      "Bias Audit Report Template",
      "Impact Ratio Calculation Worksheet",
      "Remediation Action Plan Template",
    ],
    decisions: [
      ["hiring", "Hiring & Recruitment"],
      ["promotion", "Promotion & Advancement"],
      ["lending", "Lending & Credit"],
      ["insurance", "Insurance & Underwriting"],
      ["housing", "Housing & Tenant Screening"],
      ["customer", "Customer Eligibility & Services"],
    ],
    helpTexts: {
      step2Help:
        "Which AI systems need a bias audit? Any AI system that makes or influences decisions about people. The EEOC uses the \u201c4/5 rule\u201d (80% threshold) to evaluate adverse impact. NYC LL144 requires annual independent bias audits for automated employment decision tools. If your system affects hiring, lending, insurance, or housing \u2014 it should be audited.",
      step2Intro:
        "List each AI system you want to audit for bias. We\u2019ll generate audit templates customized to each system\u2019s decision area.",
      step2DecisionHelp:
        "Check the decision area this AI system affects. Different areas have different protected classes and regulatory requirements for bias testing.",
      step2MultiHelp:
        "If you use multiple AI systems that affect decisions about people, each one needs its own bias audit. List them separately.",
      step3BiasHelp:
        "If you\u2019ve already had a bias audit conducted, these templates help you document results in a standardized format. If you haven\u2019t, the templates guide you through the process of conducting one.",
      step4Help:
        "This section captures who reviews AI outputs before they affect real people. Strong human oversight is the best defense against algorithmic discrimination.",
      step5Intro:
        "This person will be listed as the audit program coordinator \u2014 responsible for scheduling audits, tracking results, and managing remediation.",
    },
  },
  "ai-incident-response-plan": {
    name: "AI Incident Response Plan",
    statute: "NIST AI RMF + CA TFAIA + EU AI Act",
    lawUrl: "https://www.nist.gov/itl/ai-risk-management-framework",
    lawLinkText: "Review the NIST AI Risk Management Framework",
    acknowledgment:
      "I have reviewed the NIST AI RMF, California TFAIA, and EU AI Act requirements referenced in this product. I understand that these are incident response templates, not legal advice. I should consult qualified legal counsel for my specific regulatory obligations.",
    basePrice: 149,
    oversightOptions: OVERSIGHT_OPTIONS_GENERIC,
    dataInputOptions: DATA_INPUT_OPTIONS_GENERIC,
    gateText: "These templates reference the NIST AI Risk Management Framework. We recommend reviewing the framework before purchasing.",

    documents: [
      "AI Incident Response Plan",
      "Incident Classification Matrix",
      "Incident Report Template",
      "Post-Incident Review Checklist",
    ],
    decisions: [
      ["safety", "Safety-Critical Applications"],
      ["hiring", "Hiring & Employment"],
      ["financial", "Financial & Lending"],
      ["healthcare", "Healthcare & Clinical"],
      ["customer", "Customer-Facing Services"],
      ["internal", "Internal Operations"],
    ],
    helpTexts: {
      step2Help:
        "Which AI systems need incident response coverage? Any AI system that could cause harm if it malfunctions, produces biased outputs, or exposes data. California TFAIA requires frontier AI developers to report safety incidents within 15 days. The EU AI Act requires serious incident reporting for high-risk systems. Even without legal requirements, an incident response plan is best practice.",
      step2Intro:
        "List each AI system that should be covered by your incident response plan. We\u2019ll customize the plan\u2019s severity classifications and reporting procedures for each.",
      step2DecisionHelp:
        "Check the area where this AI system operates. Different domains have different incident severity thresholds and regulatory reporting requirements.",
      step2MultiHelp:
        "Cover all AI systems under one incident response plan. List each system so the plan includes system-specific response procedures.",
      step3BiasHelp:
        "Bias-related incidents are one of the most common AI incident types. If your system affects decisions about people, bias detection should be part of your monitoring and incident classification.",
      step4Help:
        "This section captures your current incident detection and response capabilities. Who notices when something goes wrong? How quickly can you shut down a problematic system?",
      step5Intro:
        "This person will be listed as the Incident Response Team lead \u2014 the primary contact for AI incident escalation and regulatory reporting.",
    },
  },
  "nyc-local-law-144": {
    name: "NYC Local Law 144",
    statute: "NYC Admin. Code \u00A7\u00A7 20-870\u201320-874",
    lawUrl:
      "https://legistar.council.nyc.gov/LegislationDetail.aspx?ID=4344524&GUID=B051915D-A9AC-451E-81F8-6596032FA3F9",
    lawLinkText:
      "Read NYC Admin Code \u00A7\u00A7 20-870\u201320-874 on NYC Council",
    acknowledgment:
      "I have reviewed NYC Administrative Code \u00A7\u00A7 20-870 through 20-874 (Local Law 144 of 2021) and the DCWP implementing rules at 6 RCNY \u00A7 5-300 et seq. I understand that these are compliance templates, not legal advice. DCWP began enforcement on July 5, 2023 and may update its rules or guidance. I should verify the current regulatory status and consult qualified legal counsel.",
    basePrice: 399,

    documents: [
      "Bias Audit Report Template",
      "Bias Audit Summary (Public Posting)",
      "Candidate/Employee Notification Template",
      "Data Retention Policy Disclosure",
      "Alternative Selection Process Documentation",
    ],
    decisions: [
      ["hiring", "Hiring/Screening"],
      ["promotion", "Promotion"],
    ],
    helpTexts: {
      step2Help:
        "What is an automated employment decision tool (AEDT)? Under NYC Admin. Code \u00A7 20-870, any computational process derived from machine learning, statistical modeling, data analytics, or AI that issues simplified output used to make or substantially assist a covered employment decision. Common examples: resume screening software, candidate scoring platforms, interview analysis tools. If the tool materially influences a hiring or promotion decision \u2014 include it.",
      step2Intro:
        "List each automated employment decision tool your organization uses for hiring or promotion decisions in New York City.",
      step2DecisionHelp:
        "Check whether this tool is used for hiring/screening, promotion, or both. NYC LL144 covers both uses.",
      step2MultiHelp:
        "If you use multiple AEDTs, each one requires its own annual bias audit under NYC LL144. List each separately.",
      step3BiasHelp:
        "NYC LL144 requires an annual independent bias audit before using an AEDT. The audit must be conducted by an independent auditor and published on your website at least 10 business days before use. If you have not yet had an audit, these templates guide you through the process.",
      step4Help:
        "This section captures how your organization uses AEDT outputs. NYC LL144 requires disclosing to candidates that an AEDT is being used and what job qualifications it assesses.",
      step5Intro:
        "This contact will be listed in candidate notifications and website disclosures as required by NYC LL144 and DCWP rules at 6 RCNY \u00A7 5-300 et seq.",
    },
  },
  "texas-tdpsa": {
    name: "Texas TDPSA",
    statute: "Tex. Bus. & Com. Code Ch. 541",
    lawUrl: "https://statutes.capitol.texas.gov/Docs/BC/htm/BC.541.htm",
    lawLinkText: "Read Tex. Bus. & Com. Code Ch. 541 on statutes.capitol.texas.gov",
    acknowledgment:
      "I have reviewed Tex. Bus. & Com. Code Ch. 541 (Texas Data Privacy and Security Act, HB 4) and understand that these are compliance templates, not legal advice. The TDPSA has been in effect since July 1, 2024, and includes a permanent 30-day cure period. This is separate from the Texas TRAIGA (HB 149). I should verify the current regulatory status and consult qualified legal counsel.",
    basePrice: 249,
    skippedSteps: [3],
    oversightOptions: OVERSIGHT_OPTIONS_GENERIC,

    documents: [
      "Data Protection Assessment for Profiling",
      "Privacy Notice Template",
      "Data Processing Agreement Template",
    ],
    decisions: [
      ["profiling", "Profiling for Consequential Decisions"],
      ["targeted_ads", "Targeted Advertising"],
      ["data_sales", "Sale of Personal Data"],
      ["sensitive_data", "Processing Sensitive Data"],
    ],
    helpTexts: {
      step2Help:
        "What AI systems are covered? Any system that processes personal data of Texas consumers for profiling, targeted advertising, or data sales. The TDPSA (\u00A7 541.107) requires data protection assessments for profiling activities that present a heightened risk to consumers.",
      step2Intro:
        "List each AI or data processing system used in activities covered by the Texas Data Privacy and Security Act.",
      step2DecisionHelp:
        "Check every category where this system processes Texas consumer data. The TDPSA (\u00A7 541.107) requires data protection assessments for profiling, targeted advertising, data sales, and sensitive data processing.",
      step2MultiHelp:
        "If you use multiple systems across these categories, list each separately. Each may require its own data protection assessment under \u00A7 541.107(a).",
      step3BiasHelp:
        "If your system uses profiling to make consequential decisions, a bias review helps document that processing is conducted with reasonable care.",
      step4Help:
        "This section captures your oversight and governance for data processing activities. The TDPSA requires responding to consumer rights requests within 45 days.",
      step5Intro:
        "This contact will be listed in your privacy notices and consumer rights procedures as the designated data privacy contact under the Texas TDPSA.",
    },
  },
  "delaware-pdpa": {
    name: "Delaware PDPA",
    statute: "Del. Code tit. 6, ch. 12D, \u00A7\u00A7 12D-101 through 12D-111",
    lawUrl: "https://delcode.delaware.gov/title6/c012d/index.html",
    lawLinkText: "Read Del. Code tit. 6, ch. 12D on delcode.delaware.gov",
    acknowledgment:
      "I have reviewed Del. Code tit. 6, ch. 12D (Delaware Personal Data Privacy Act, HB 154) and understand that these are compliance templates, not legal advice. The Delaware PDPA has been in effect since January 1, 2025, with the cure period expiring December 31, 2025. Delaware has the lowest compliance thresholds of any state (35,000 consumers). I should verify the current regulatory status and consult qualified legal counsel.",
    oversightOptions: OVERSIGHT_OPTIONS_GENERIC,
    basePrice: 249,
    skippedSteps: [3],

    documents: [
      "Data Protection Assessment for Profiling",
      "Privacy Notice Template",
      "Universal Opt-Out Mechanism Documentation",
      "Data Processing Agreement Template",
    ],
    decisions: [
      ["profiling", "Profiling for Consequential Decisions"],
      ["targeted_ads", "Targeted Advertising"],
      ["data_sales", "Sale of Personal Data"],
      ["sensitive_data", "Processing Sensitive Data"],
    ],
    helpTexts: {
      step2Help:
        "What AI systems are covered? Any system that processes personal data of Delaware consumers for profiling, targeted advertising, or data sales. The Delaware PDPA (\u00A7 12D-109) requires data protection assessments for profiling activities. Delaware has the lowest coverage thresholds of any state \u2014 35,000 consumers OR 10,000 consumers with 20%+ revenue from data sales.",
      step2Intro:
        "List each AI or data processing system used in activities covered by the Delaware Personal Data Privacy Act.",
      step2DecisionHelp:
        "Check every category where this system processes Delaware consumer data. The PDPA (\u00A7 12D-109(a)) requires data protection assessments for profiling, targeted advertising, data sales, and sensitive data processing.",
      step2MultiHelp:
        "If you use multiple systems across these categories, list each separately. Each may require its own data protection assessment under \u00A7 12D-109(a).",
      step3BiasHelp:
        "If your system uses profiling to make consequential decisions, a bias review helps document that processing is conducted with reasonable care under the Delaware PDPA.",
      step4Help:
        "This section captures your oversight and governance for data processing activities. The Delaware PDPA requires responding to consumer rights requests within 45 days. Note: Universal opt-out mechanism recognition is required starting January 1, 2026 (\u00A7 12D-106(e)).",
      step5Intro:
        "This contact will be listed in your privacy notices and consumer rights procedures as the designated data privacy contact under the Delaware PDPA.",
    },
  },
  "multi-state-profiling-assessment": {
    name: "Multi-State Profiling Assessment Bundle",
    statute: "VA, CT, CO, OR, TX, MT, DE, MN, MD, IN + more",
    lawUrl: "https://law.lis.virginia.gov/vacode/title59.1/chapter53/",
    lawLinkText: "Read Virginia VCDPA (the first state law) on law.lis.virginia.gov",
    acknowledgment:
      "I understand that these are multi-state compliance templates, not legal advice. State privacy laws are enacted independently and may differ in thresholds, cure periods, and specific requirements. I should verify the current status of each state\u2019s law and consult qualified legal counsel.",
    basePrice: 399,
    skippedSteps: [3],
    oversightOptions: OVERSIGHT_OPTIONS_GENERIC,

    documents: [
      "Multi-State Data Protection Assessment",
      "State Comparison Matrix",
      "Threshold Analysis Worksheet",
      "Multi-State Privacy Notice Template",
      "State-by-State Compliance Checklist",
    ],
    decisions: [
      ["profiling", "Profiling for Consequential Decisions"],
      ["targeted_ads", "Targeted Advertising"],
      ["data_sales", "Sale of Personal Data"],
      ["sensitive_data", "Processing Sensitive Data"],
    ],
    helpTexts: {
      step2Help:
        "What AI systems are covered? Any system that processes personal data of consumers for profiling, targeted advertising, or data sales across the 15+ states requiring documented data protection assessments. This bundle covers all major state consumer privacy laws with profiling assessment requirements.",
      step2Intro:
        "List each AI or data processing system you use in activities covered by multi-state consumer privacy laws. We\u2019ll generate a unified assessment template covering all applicable states.",
      step2DecisionHelp:
        "Check every category where this system processes consumer data. Each state law has different specifics, but profiling, targeted advertising, data sales, and sensitive data processing are covered across all major states.",
      step2MultiHelp:
        "If you use multiple systems, list each separately. Each may require its own assessment. The State Comparison Matrix will show you each state\u2019s threshold and cure period requirements.",
      step3BiasHelp:
        "If your system uses profiling to make consequential decisions, documenting bias review demonstrates reasonable care under multiple state laws including Colorado, Virginia, and Connecticut.",
      step4Help:
        "This section captures your oversight structure. Consumer response timelines vary by state \u2014 the State Comparison Matrix will show you each state\u2019s requirements.",
      step5Intro:
        "This contact will be listed in your multi-state privacy notices and consumer rights procedures as the designated data privacy contact.",
    },
  },
  "multi-state-employer-ai-disclosure": {
    name: "Multi-State Employer AI Disclosure Kit",
    statute: "775 ILCS 5/2-102(L) + NYC Admin. Code \u00A7\u00A7 20-870\u201320-874 + C.R.S. \u00A7\u00A7 6-1-1701\u20131707",
    lawUrl: "https://www.ilga.gov/legislation/ilcs/fulltext?DocName=077500050K2-102",
    lawLinkText: "Read Illinois HB3773 (775 ILCS 5/2-102(L)) on ilga.gov",
    acknowledgment:
      "I understand that these are multi-jurisdiction compliance templates covering IL, NYC, and CO AI employment laws, not legal advice. Each jurisdiction has different requirements, penalties, and enforcement mechanisms. I should verify the current status of each law and consult qualified legal counsel.",
    basePrice: 299,

    documents: [
      "Multi-Jurisdiction Compliance Matrix",
      "Unified Employee/Candidate Notification",
      "State-Specific Addendum Templates",
      "Bias Audit Cross-Reference Guide",
      "Multi-State Record Retention Policy",
    ],
    decisions: [
      ["recruitment", "Recruitment"],
      ["hiring", "Hiring"],
      ["promotion", "Promotion"],
      ["discharge", "Discharge"],
      ["discipline", "Discipline"],
      ["tenure", "Tenure"],
      ["terms", "Terms, Privileges, or Conditions of Employment"],
    ],
    helpTexts: {
      step2Help:
        "What AI systems are covered? Any AI tool used in employment decisions in Illinois, New York City, or Colorado. Illinois HB3773 covers all employment decisions for IL employees. NYC LL144 covers automated employment decision tools used for hiring or promotion in NYC. Colorado SB24-205 covers AI used in consequential employment decisions for CO consumers.",
      step2Intro:
        "List each AI tool or system used in employment decisions across Illinois, New York City, and/or Colorado. We\u2019ll generate unified disclosure documentation covering all three jurisdictions.",
      step2DecisionHelp:
        "Check every type of employment decision where this AI tool plays any role. The Multi-Jurisdiction Compliance Matrix will show you which of the three laws applies to each decision type.",
      step2MultiHelp:
        "If you use multiple AI tools in employment decisions, list each separately. NYC LL144 requires separate bias audits for each automated employment decision tool.",
      step3BiasHelp:
        "Bias audits are required annually under NYC LL144 and are strongly recommended under CO SB24-205 as evidence of \u201creasonable care.\u201d Illinois HB3773 does not mandate audits, but they are strong evidence of good faith.",
      step4Help:
        "This section captures how your company uses AI outputs and who oversees the process. All three jurisdictions emphasize human oversight as a key safeguard.",
      step5Intro:
        "This contact will be listed in employee and candidate notifications across all three jurisdictions as required by IL 775 ILCS 5/2-102(L)(2), NYC LL144, and CO SB24-205.",
    },
  },
  "virginia-cdpa": {
    name: "Virginia CDPA",
    statute: "Va. Code §§ 59.1-575–59.1-584",
    lawUrl: "https://law.lis.virginia.gov/vacodefull/title59.1/chapter53/",
    lawLinkText: "Read Va. Code §§ 59.1-575 through 59.1-584 on law.lis.virginia.gov",
    acknowledgment:
      "I have reviewed Va. Code §§ 59.1-575 through 59.1-584 (Virginia Consumer Data Protection Act) and understand that these are compliance templates, not legal advice. The VCDPA has been in effect since January 1, 2023. I should verify the current regulatory status and consult qualified legal counsel.",
    basePrice: 249,
    skippedSteps: [3],
    oversightOptions: OVERSIGHT_OPTIONS_GENERIC,

    documents: [
      "Privacy Notice Template",
      "Data Protection Assessment",
      "Consumer Rights Request Procedures",
      "Opt-Out Documentation",
      "Data Processing Agreement Template",
      "Compliance Checklist",
    ],
    decisions: [
      ["profiling", "Profiling/Automated Decisions"],
      ["targeted_ads", "Targeted Advertising"],
      ["data_sales", "Data Sales"],
      ["sensitive_data", "Sensitive Data Processing"],
    ],
    helpTexts: {
      step2Help:
        "What AI systems are covered? Any system that uses personal data of Virginia consumers for profiling, targeted advertising, data sales, or processing sensitive data. If your AI system makes decisions about consumers that produce legal or similarly significant effects — include it.",
      step2Intro:
        "List each AI or data processing system used in activities covered by the Virginia Consumer Data Protection Act.",
      step2DecisionHelp:
        "Check every category where this system processes Virginia consumer data. The Virginia CDPA covers profiling for consequential decisions, targeted advertising, data sales, and sensitive data processing.",
      step2MultiHelp:
        "If you use multiple systems across these categories, list each separately. Each may require its own data protection assessment.",
      step3BiasHelp:
        "If your system uses profiling to make decisions with legal or similarly significant effects, a bias review helps document that your processing is conducted with reasonable care and does not produce disparate impact.",
      step4Help:
        "This section captures your oversight and governance for data processing activities. Virginia law requires responding to consumer rights requests within 45 days and providing an appeals mechanism for denied requests (§ 59.1-578(B)).",
      step5Intro:
        "This contact will be listed in your privacy notices and consumer rights procedures as the designated privacy contact under the Virginia CDPA.",
    },
  },
  "connecticut-ctdpa": {
    name: "Connecticut CTDPA",
    statute: "Conn. Gen. Stat. §§ 42-515–42-525",
    lawUrl: "https://www.cga.ct.gov/current/pub/chap_743jj.htm",
    lawLinkText: "Read Conn. Gen. Stat. §§ 42-515 through 42-525 on cga.ct.gov",
    acknowledgment:
      "I have reviewed Conn. Gen. Stat. §§ 42-515 through 42-525 (Connecticut Data Privacy Act, PA 22-15) and understand that these are compliance templates, not legal advice. The CTDPA has been in effect since July 1, 2023, and the mandatory cure period has expired. I should verify the current regulatory status and consult qualified legal counsel.",
    basePrice: 249,
    skippedSteps: [3],
    oversightOptions: OVERSIGHT_OPTIONS_GENERIC,

    documents: [
      "Privacy Notice Template",
      "Data Protection Assessment",
      "Consumer Rights Request Procedures",
      "Profiling Opt-Out Documentation",
      "Data Processing Agreement Template",
      "Compliance Checklist",
    ],
    decisions: [
      ["profiling", "Profiling/Automated Decisions"],
      ["targeted_ads", "Targeted Advertising"],
      ["data_sales", "Data Sales"],
      ["sensitive_data", "Sensitive Data Processing"],
    ],
    helpTexts: {
      step2Help:
        "What AI systems are covered? Any system that uses personal data of Connecticut consumers for profiling, targeted advertising, data sales, or processing sensitive data. If your AI system makes decisions about consumers that produce legal or similarly significant effects — include it.",
      step2Intro:
        "List each AI or data processing system used in activities covered by the Connecticut Data Privacy Act.",
      step2DecisionHelp:
        "Check every category where this system processes Connecticut consumer data. The CTDPA covers profiling for consequential decisions, targeted advertising, data sales, and sensitive data.",
      step2MultiHelp:
        "If you use multiple systems across these categories, list each separately. Each may require its own data protection assessment.",
      step3BiasHelp:
        "If your system uses profiling to make consequential decisions, a bias review helps document that your processing is conducted with reasonable care and does not produce discriminatory impact.",
      step4Help:
        "This section captures your oversight and governance for data processing activities. Connecticut law requires responding to consumer rights requests within 45 days. The mandatory 60-day cure period expired December 31, 2024 — compliance is now expected immediately.",
      step5Intro:
        "This contact will be listed in your privacy notices and consumer rights procedures as the designated privacy contact under the Connecticut CTDPA.",
    },
  },
  "oregon-cpa": {
    name: "Oregon CPA",
    statute: "ORS §§ 646A.570–646A.604",
    lawUrl: "https://www.oregonlegislature.gov/bills_laws/ors/ors646A.html",
    lawLinkText: "Read ORS §§ 646A.570 through 646A.604 on oregonlegislature.gov",
    acknowledgment:
      "I have reviewed ORS §§ 646A.570 through 646A.604 (Oregon Consumer Privacy Act) and understand that these are compliance templates, not legal advice. The Oregon CPA has been in effect since July 1, 2024, with the cure period expiring January 1, 2026. I should verify the current regulatory status and consult qualified legal counsel.",
    basePrice: 249,
    skippedSteps: [3],
    oversightOptions: OVERSIGHT_OPTIONS_GENERIC,

    documents: [
      "Privacy Notice Template",
      "Data Protection Assessment",
      "Consumer Rights Request Procedures",
      "Profiling Opt-Out Documentation",
      "Data Processing Agreement Template",
      "Compliance Checklist",
    ],
    decisions: [
      ["profiling", "Profiling/Automated Decisions"],
      ["targeted_ads", "Targeted Advertising"],
      ["data_sales", "Data Sales"],
      ["sensitive_data", "Sensitive Data Processing"],
      ["children_data", "Children's Data (ages 13–15)"],
    ],
    helpTexts: {
      step2Help:
        "What AI systems are covered? Any system that uses personal data of Oregon consumers for profiling, targeted advertising, data sales, or processing sensitive data. Oregon also requires consent before processing data of consumers aged 13–15 for targeted advertising or data sales. If your AI system makes decisions about consumers — include it.",
      step2Intro:
        "List each AI or data processing system used in activities covered by the Oregon Consumer Privacy Act.",
      step2DecisionHelp:
        "Check every category where this system processes Oregon consumer data. The Oregon CPA covers profiling for consequential decisions, targeted advertising, data sales, sensitive data, and has special protections for consumers aged 13–15.",
      step2MultiHelp:
        "If you use multiple systems across these categories, list each separately. Each may require its own data protection assessment.",
      step3BiasHelp:
        "If your system uses profiling to make decisions with legal or similarly significant effects, a bias review helps document that your processing does not produce unfair or discriminatory outcomes.",
      step4Help:
        "This section captures your oversight and governance for data processing activities. Oregon law requires responding to consumer rights requests within 45 days. The 30-day cure period expires January 1, 2026 — after that date, the AG has enforcement discretion.",
      step5Intro:
        "This contact will be listed in your privacy notices and consumer rights procedures as the designated privacy contact under the Oregon Consumer Privacy Act.",
    },
  },
  "minnesota-mcdpa": {
    name: "Minnesota MCDPA",
    statute: "Minn. Stat. \u00A7\u00A7 325M.10\u2013325M.21",
    lawUrl: "https://www.revisor.mn.gov/statutes/cite/325M.10",
    lawLinkText:
      "Read Minn. Stat. \u00A7\u00A7 325M.10\u2013325M.21 on revisor.mn.gov",
    acknowledgment:
      "I have reviewed the Minnesota Consumer Data Privacy Act, Minn. Stat. \u00A7\u00A7 325M.10 through 325M.21. I understand that these are compliance templates, not legal advice. This law is effective July 31, 2025. The 30-day cure period expires January 31, 2026. I should verify the current regulatory status and consult qualified legal counsel.",
    basePrice: 349,
    skippedSteps: [3],
    oversightOptions: OVERSIGHT_OPTIONS_GENERIC,

    documents: [
      "Privacy Notice Template",
      "Data Protection Impact Assessment",
      "Consumer Rights Request Procedures",
      "Profiling Opt-Out Documentation",
      "Data Processing Agreement Template",
      "Compliance Checklist",
    ],
    decisions: [
      ["profiling", "Profiling/Automated Decisions"],
      ["targeted_ads", "Targeted Advertising"],
      ["data_sales", "Data Sales"],
      ["sensitive_data", "Sensitive Data Processing"],
    ],
    helpTexts: {
      step2Help:
        "What AI systems are covered? Any system that uses personal data of Minnesota consumers for algorithmic profiling, targeted advertising, data sales, or processing sensitive data. If your AI system makes decisions about consumers \u2014 include it.",
      step2Intro:
        "List each AI or data processing system used in activities covered by the Minnesota Consumer Data Privacy Act.",
      step2DecisionHelp:
        "Check every category where this system processes Minnesota consumer data. The Minnesota MCDPA covers profiling for consequential decisions, targeted advertising, data sales, and sensitive data.",
      step2MultiHelp:
        "If you use multiple systems across these categories, list each separately. Each may require its own data protection impact assessment.",
      step3BiasHelp:
        "If your system uses profiling to make consequential decisions, a bias review helps document that your processing is conducted with reasonable care.",
      step4Help:
        "This section captures your oversight and governance for data processing activities. Minnesota law requires responding to consumer rights requests within 45 days.",
      step5Intro:
        "This contact will be listed in your privacy notices and consumer rights procedures as the designated data privacy officer or contact.",
    },
  },
  "california-ccpa-admt": {
    name: "California CCPA ADMT",
    statute: "Cal. Civ. Code \u00A7 1798.100 et seq.",
    lawUrl: "https://cppa.ca.gov/regulations/",
    lawLinkText: "Read the CPPA ADMT regulations at cppa.ca.gov",
    acknowledgment:
      "I have reviewed the California Consumer Privacy Act (Cal. Civ. Code \u00A7 1798.100 et seq.) and the CPPA\u2019s Automated Decisionmaking Technology (ADMT) regulations, effective January 1, 2026. I understand that these are compliance templates, not legal advice. The CPPA may update regulations and issue additional guidance. I should verify the current regulatory status and consult qualified legal counsel.",
    basePrice: 499,
    skippedSteps: [3],
    oversightOptions: OVERSIGHT_OPTIONS_GENERIC,

    documents: [
      "Pre-Use ADMT Notice Template",
      "ADMT Risk Assessment",
      "Consumer Opt-Out Mechanism Documentation",
      "Consumer Access/Information Procedures",
      "Human Review Process Documentation",
      "ADMT Impact Assessment",
    ],
    decisions: [
      ["hiring", "Employment Decisions"],
      ["financial", "Financial/Lending"],
      ["insurance", "Insurance"],
      ["healthcare", "Healthcare"],
      ["housing", "Housing"],
      ["education", "Education"],
    ],
    helpTexts: {
      step2Help:
        "What is ADMT? Under the CPPA regulations, automated decisionmaking technology means any system that uses computation to make a decision, or facilitate human decisionmaking, that has a legal or similarly significant effect on a consumer. This includes AI used in hiring, lending, insurance, healthcare, housing, and education decisions.",
      step2Intro:
        "List each automated decisionmaking technology system your organization uses that affects California consumers.",
      step2DecisionHelp:
        "Check every decision category where this ADMT system makes or substantially assists decisions about California consumers.",
      step2MultiHelp:
        "Each ADMT system may require its own pre-use notice and risk assessment. List all systems that affect California consumers.",
      step3BiasHelp:
        "The CPPA ADMT regulations require a risk assessment before using ADMT for significant decisions. These templates guide you through that assessment.",
      step4Help:
        "This section captures how your organization oversees ADMT outputs. California regulations require a human review process for consumers who request it.",
      step5Intro:
        "This contact will be listed in consumer-facing ADMT notices and rights request procedures.",
    },
  },
  "eu-ai-act": {
    name: "EU AI Act",
    statute: "Regulation (EU) 2024/1689",
    lawUrl:
      "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32024R1689",
    lawLinkText: "Read Regulation (EU) 2024/1689 on EUR-Lex",
    acknowledgment:
      "I have reviewed Regulation (EU) 2024/1689 (the EU Artificial Intelligence Act). I understand that these are compliance templates, not legal advice. This regulation has phased effective dates from February 2025 through August 2027. Member States may adopt additional implementing measures. I should verify the current regulatory status and consult qualified legal counsel.",
    basePrice: 997,
    oversightOptions: OVERSIGHT_OPTIONS_GENERIC,
    dataInputOptions: DATA_INPUT_OPTIONS_GENERIC,

    documents: [
      "Risk Management System Documentation",
      "Technical Documentation (Annex IV)",
      "Data Governance Documentation",
      "Conformity Assessment Records",
      "Quality Management System",
      "Human Oversight Design Document",
      "Post-Market Monitoring Plan",
      "EU Database Registration Documentation",
      "Transparency Disclosures",
      "Fundamental Rights Impact Assessment",
    ],
    decisions: [
      ["employment", "Employment/HR"],
      ["education", "Education"],
      ["financial", "Credit/Financial"],
      ["law_enforcement", "Law Enforcement"],
      ["critical_infra", "Critical Infrastructure"],
      ["healthcare", "Healthcare/Medical"],
    ],
    helpTexts: {
      step2Help:
        "What is a high-risk AI system under the EU AI Act? Under Annex III of Regulation (EU) 2024/1689, high-risk systems include AI used in employment decisions, education, credit, law enforcement, critical infrastructure, and healthcare. If your system makes or substantially influences decisions in these areas affecting EU residents \u2014 include it.",
      step2Intro:
        "List each high-risk AI system that falls under the EU AI Act. These are systems used in the areas listed in Annex III of Regulation (EU) 2024/1689.",
      step2DecisionHelp:
        "Check the Annex III category that applies to this system. The category determines which conformity assessment procedure applies.",
      step2MultiHelp:
        "Each high-risk AI system needs its own technical documentation and risk management file. List all systems separately.",
      step3BiasHelp:
        "The EU AI Act requires high-risk AI systems to use high-quality training data and undergo testing for bias. Document your bias testing process here.",
      step4Help:
        "This section captures your human oversight design. The EU AI Act requires high-risk systems to enable humans to understand, monitor, and override AI outputs.",
      step5Intro:
        "This contact will be listed as the EU AI Act compliance contact and quality management system administrator.",
    },
  },
  "eeoc-ai-hiring": {
    name: "EEOC AI Hiring Compliance Kit",
    statute: "29 CFR Part 1607 (Uniform Guidelines)",
    lawUrl: "https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XIV/part-1607",
    lawLinkText: "Read the Uniform Guidelines (29 CFR Part 1607) on eCFR",
    acknowledgment:
      "I have reviewed Title VII of the Civil Rights Act of 1964 (42 USC \u00A7 2000e et seq.) and the Uniform Guidelines on Employee Selection Procedures (29 CFR Part 1607). I understand that these are compliance templates, not legal advice. The EEOC\u2019s AI-specific guidance documents have been modified; previously published technical assistance may no longer be available on eeoc.gov. I should verify the current regulatory status and consult qualified legal counsel.",
    basePrice: 349,

    documents: [
      "AI Adverse Impact Analysis Template",
      "Job-Relatedness Validation Documentation",
      "Reasonable Accommodation Procedures for AI Assessments",
      "Vendor AI Audit Requirements",
      "AI Hiring Tool Monitoring Procedures",
      "Annual Compliance Review",
    ],
    decisions: [
      ["hiring", "Hiring/Screening"],
      ["promotion", "Promotion"],
      ["termination", "Termination"],
      ["performance", "Performance Evaluation"],
    ],
    helpTexts: {
      step2Help:
        "Which AI tools require EEOC compliance review? Any AI or automated system used in hiring, promotion, termination, or performance evaluation. The Uniform Guidelines on Employee Selection Procedures (29 CFR Part 1607) apply to any selection procedure that has adverse impact on a protected group. If your tool screens, scores, or ranks job candidates \u2014 include it.",
      step2Intro:
        "List each AI or automated system used in employment decisions. These tools are subject to the EEOC\u2019s adverse impact analysis requirements under 29 CFR Part 1607.",
      step2DecisionHelp:
        "Check every employment decision area where this AI tool plays a role. The Uniform Guidelines apply to all selection procedures for any employment purpose.",
      step2MultiHelp:
        "Each AI tool may create separate adverse impact exposure. List each tool individually so your compliance documentation covers each one.",
      step3BiasHelp:
        "The EEOC 4/5 (80%) rule is the federal standard for evaluating adverse impact. Under 29 CFR \u00A7 1607.4(D), a selection rate for a protected group that is less than 4/5 of the highest rate indicates adverse impact. Document your adverse impact analysis here.",
      step4Help:
        "This section captures human oversight of AI-driven employment decisions. The EEOC has emphasized that employers remain liable for discriminatory outcomes even when the AI vendor is responsible.",
      step5Intro:
        "This contact will be listed as your EEOC compliance officer \u2014 responsible for adverse impact monitoring and reasonable accommodation requests.",
    },
  },
  "nist-ai-rmf": {
    name: "NIST AI Risk Management Framework",
    statute: "NIST AI 100-1",
    lawUrl: "https://airc.nist.gov/",
    lawLinkText: "Read the NIST AI RMF at airc.nist.gov",
    acknowledgment:
      "I have reviewed the NIST AI Risk Management Framework (AI RMF 1.0, NIST AI 100-1). I understand that these are implementation templates, not legal advice. The AI RMF is a voluntary framework; NIST is a non-regulatory agency. AI RMF 1.0 is currently being revised. I should verify the current version and consult qualified legal counsel.",
    basePrice: 397,
    skippedSteps: [3],
    oversightOptions: OVERSIGHT_OPTIONS_GENERIC,
    gateText: "These templates implement the NIST AI Risk Management Framework. We recommend reviewing the framework before purchasing.",

    documents: [
      "AI Risk Management Plan",
      "Govern Function Documentation",
      "Map Function Documentation",
      "Measure Function Documentation",
      "Manage Function Documentation",
      "AI System Risk Profile Template",
      "Trustworthy AI Characteristics Assessment",
    ],
    decisions: [
      ["hiring", "Employment/HR"],
      ["financial", "Financial Services"],
      ["healthcare", "Healthcare"],
      ["customer_service", "Customer-Facing Services"],
      ["internal", "Internal Operations"],
      ["safety", "Safety-Critical Systems"],
    ],
    helpTexts: {
      step2Help:
        "Which AI systems should be covered by your RMF implementation? Any system that uses AI to make or support decisions. The NIST AI RMF applies to all AI systems regardless of risk level, but prioritization is recommended based on potential impact. Start with customer-facing, employment, financial, and safety-critical systems.",
      step2Intro:
        "List each AI system you are bringing under your NIST AI RMF implementation. We\u2019ll generate framework documentation for each.",
      step2DecisionHelp:
        "Check the primary area where this AI system operates. This determines which risk profile template and trustworthy AI characteristics are most relevant.",
      step2MultiHelp:
        "The NIST AI RMF recommends maintaining a system-level inventory. List all AI systems so your Risk Management Plan covers your complete AI portfolio.",
      step3BiasHelp:
        "The NIST AI RMF\u2019s Measure function includes bias and fairness testing as a key metric. If your system affects people, bias measurement is a core RMF practice.",
      step4Help:
        "This section captures your AI governance structure. The NIST AI RMF Govern function requires documented roles, responsibilities, and organizational accountability for AI risk.",
      step5Intro:
        "This contact will be listed as your AI Risk Management program coordinator \u2014 the person responsible for maintaining your RMF documentation and risk profiles.",
    },
  },
  "healthcare-ai-compliance": {
    name: "Healthcare AI Compliance Package",
    statute: "HIPAA Privacy Rule (45 CFR Part 164)",
    lawUrl:
      "https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164/subpart-E",
    lawLinkText: "Read HIPAA Privacy Rule (45 CFR Part 164) on eCFR",
    acknowledgment:
      "I have reviewed the HIPAA Privacy Rule (45 CFR Part 164 Subpart E), Security Rule (45 CFR Part 164 Subpart C), and Breach Notification Rule (45 CFR Part 164 Subpart D) as applied to AI processing of protected health information. I understand that these are compliance templates, not legal advice. HHS may issue additional guidance on AI and HIPAA. I should verify the current regulatory status and consult qualified legal counsel.",
    basePrice: 597,
    skippedSteps: [3],
    oversightOptions: OVERSIGHT_OPTIONS_GENERIC,

    documents: [
      "HIPAA AI Risk Assessment",
      "BAA Addendum for AI Vendors",
      "Minimum Necessary Standard AI Policy",
      "Patient AI Disclosure Notice",
      "AI-Generated Output Review Protocol",
      "De-Identification Protocol for AI",
      "COPPA Compliance Checklist",
      "FDA Pre-Submission AI Checklist",
    ],
    decisions: [
      ["clinical", "Clinical Decision Support"],
      ["diagnostic", "Diagnostic AI"],
      ["administrative", "Administrative/Billing"],
      ["research", "Research/Analytics"],
      ["patient_facing", "Patient-Facing AI"],
    ],
    helpTexts: {
      step2Help:
        "Which AI systems process protected health information? Any AI system that creates, receives, maintains, or transmits PHI \u2014 individually identifiable health information \u2014 is subject to HIPAA. This includes clinical decision support tools, diagnostic AI, AI-powered billing systems, research analytics platforms, and patient-facing chatbots. If the system touches patient data \u2014 include it.",
      step2Intro:
        "List each AI system used in your healthcare organization that processes or may access protected health information.",
      step2DecisionHelp:
        "Check the healthcare context where this AI system operates. Different contexts have different HIPAA requirements and risk profiles.",
      step2MultiHelp:
        "Each AI system that processes PHI may require its own Business Associate Agreement and risk assessment. List all systems separately.",
      step3BiasHelp:
        "AI systems in clinical decision support and diagnostics can produce biased outputs that affect patient care. HHS OCR has indicated that HIPAA\u2019s nondiscrimination requirements apply to AI-assisted clinical decisions.",
      step4Help:
        "This section captures how your organization oversees AI systems processing PHI. HIPAA\u2019s Security Rule requires administrative, physical, and technical safeguards \u2014 including oversight procedures.",
      step5Intro:
        "This contact will be listed as your HIPAA AI compliance officer \u2014 responsible for Business Associate Agreements, breach notification, and PHI processing oversight.",
    },
  },
  "financial-services-ai": {
    name: "Financial Services AI Compliance Package",
    statute: "Regulation B (12 CFR Part 1002) + ECOA",
    lawUrl: "https://www.ecfr.gov/current/title-12/chapter-X/part-1002",
    lawLinkText: "Read Regulation B (ECOA) on eCFR",
    acknowledgment:
      "I have reviewed the Equal Credit Opportunity Act (15 USC \u00A7 1691 et seq.) and Regulation B (12 CFR Part 1002), the Fair Credit Reporting Act (15 USC \u00A7 1681 et seq.), and relevant FINRA rules as applied to AI in financial services. I understand that these are compliance templates, not legal advice. SEC, CFPB, and FINRA may issue additional AI-specific guidance. I should verify the current regulatory status and consult qualified legal counsel.",
    basePrice: 597,
    skippedSteps: [3],
    oversightOptions: OVERSIGHT_OPTIONS_GENERIC,

    documents: [
      "AI Supervision Policy",
      "GenAI Communications Recordkeeping Policy",
      "Model Risk Inventory Template",
      "Vendor AI Due Diligence (Financial)",
      "AI Audit Trail Procedure",
      "Customer Communication Disclosure",
      "Annual Review Checklist",
      "CFPB Adverse Action Notice Template",
    ],
    decisions: [
      ["lending", "Lending/Credit"],
      ["underwriting", "Insurance Underwriting"],
      ["trading", "Trading/Advisory"],
      ["customer_service", "Customer Service"],
      ["fraud", "Fraud Detection"],
      ["marketing", "Marketing/Personalization"],
    ],
    helpTexts: {
      step2Help:
        "Which AI systems require financial services compliance review? Any AI system used in credit decisions, underwriting, trading, customer service, fraud detection, or marketing in a regulated financial services context. Regulation B (12 CFR Part 1002) requires adverse action notices for AI-driven credit denials. FINRA has flagged AI supervision as a 2026 examination priority.",
      step2Intro:
        "List each AI system used in your financial services operations. These tools are subject to ECOA, FCRA, and FINRA supervision requirements.",
      step2DecisionHelp:
        "Check every financial services area where this AI system operates. Different areas have different regulatory requirements \u2014 lending triggers ECOA, trading triggers SEC/FINRA, marketing triggers CFPB UDAAP.",
      step2MultiHelp:
        "Financial services firms often use multiple AI systems across different regulatory contexts. List each separately so your compliance program covers each regulatory framework.",
      step3BiasHelp:
        "Regulation B (ECOA) and the CFPB\u2019s UDAAP authority both reach AI-driven lending discrimination. Documenting your bias testing process is a key defense.",
      step4Help:
        "This section captures your AI supervision and model governance framework. FINRA\u2019s 2024 guidance requires firms to have supervisory procedures for AI-generated communications and recommendations.",
      step5Intro:
        "This contact will be listed as your AI compliance officer \u2014 responsible for model risk documentation, adverse action procedures, and FINRA supervision obligations.",
    },
  },
  "manager-ai-training-kit": {
    name: "Manager Communication & Training Kit",
    statute: "NIST AI RMF + EEOC AI Guidance + State Employment Laws",
    lawUrl: "https://www.nist.gov/itl/ai-risk-management-framework",
    lawLinkText: "Review the NIST AI Risk Management Framework",
    acknowledgment:
      "I understand that these are training and communication templates, not legal advice. I should consult qualified legal counsel for my specific situation.",
    basePrice: 79,
    skippedSteps: [3],
    oversightOptions: OVERSIGHT_OPTIONS_GENERIC,
    gateText: "These templates reference the NIST AI Risk Management Framework. We recommend reviewing the framework before purchasing.",

    documents: [
      "Manager Talking Points Script",
      "Employee FAQ \u2014 AI in the Workplace",
      "Training Attendance & Sign-Off Sheet",
    ],
    decisions: [
      ["hiring", "Hiring & Recruitment"],
      ["employment", "Employment Decisions"],
      ["customer_service", "Customer Service"],
      ["internal_ops", "Internal Operations"],
    ],
    helpTexts: {
      step2Help:
        "What AI tools do your managers need to explain? Any AI system that affects employees \u2014 resume screening tools, scheduling AI, performance review platforms, productivity tools, or any software your employees interact with that uses AI. List the tools your managers will need to discuss with their teams.",
      step2Intro:
        "List each AI tool or system your managers need to explain to employees. We\u2019ll customize the talking points and FAQ for your specific tools.",
      step2DecisionHelp:
        "Check every area where your organization uses AI tools that affect employees. This helps us tailor the manager scripts and employee FAQ to your context.",
      step2MultiHelp:
        "If your managers need to explain multiple AI tools to their teams, list each one. The talking points will cover each tool.",
      step3BiasHelp:
        "If any AI tools affect employment decisions, note whether you\u2019ve conducted bias testing. Managers may need to answer questions about fairness from their teams.",
      step4Help:
        "This section captures how your organization governs AI use. Managers will need to explain oversight procedures and how employees can raise concerns.",
      step5Intro:
        "This person will be listed as the AI compliance contact \u2014 the resource managers and employees can reach for questions not covered in the training materials.",
    },
  },
  "annual-compliance-review": {
    name: "Annual Compliance Review Checklist",
    statute: "Multi-State AI Compliance Annual Review Best Practices",
    lawUrl: "https://www.nist.gov/itl/ai-risk-management-framework",
    lawLinkText: "Review the NIST AI Risk Management Framework",
    acknowledgment:
      "I understand that these are review templates, not legal advice. Laws change. I should verify current regulatory status annually and consult qualified legal counsel.",
    basePrice: 49,
    skippedSteps: [3, 4],
    gateText: "These templates reference the NIST AI Risk Management Framework. We recommend reviewing the framework before purchasing.",

    documents: [
      "Annual Compliance Review Checklist",
      "Compliance Update Log",
    ],
    decisions: [
      ["employment", "Employment/HR AI"],
      ["customer", "Customer-Facing AI"],
      ["financial", "Financial AI"],
      ["internal", "Internal Operations AI"],
    ],
    helpTexts: {
      step2Help:
        "Which AI compliance documents need annual review? Any AI compliance documents you have in place \u2014 employee policies, vendor due diligence, bias audits, incident response plans, or state-specific compliance packages. This annual checklist ensures they stay current as laws change.",
      step2Intro:
        "List each AI system and compliance document area you need to review annually. The checklist will walk through each one.",
      step2DecisionHelp:
        "Check every area where your organization uses AI. The annual review covers all compliance documents related to these uses.",
      step2MultiHelp:
        "If you have AI systems across multiple areas, the annual review checklist covers all of them in a single workflow.",
      step3BiasHelp:
        "Annual bias reviews are required by NYC LL144 and recommended by EEOC and Colorado SB24-205. The checklist includes bias audit recertification as a standard annual item.",
      step4Help:
        "This section captures your current compliance program status. The review checklist will assess each component and flag what needs updating.",
      step5Intro:
        "This person will be listed as the compliance review coordinator \u2014 responsible for scheduling the annual review and tracking completion.",
    },
  },
  "board-ai-summary": {
    name: "Board & Executive AI Summary Report",
    statute: "NIST AI RMF Govern Function + SEC AI Governance Guidance",
    lawUrl: "https://www.nist.gov/itl/ai-risk-management-framework",
    lawLinkText: "Review the NIST AI Risk Management Framework",
    acknowledgment:
      "I understand that these are governance templates, not legal advice. I should consult qualified legal counsel for my specific board reporting obligations.",
    basePrice: 69,
    skippedSteps: [3, 4],
    gateText: "These templates reference the NIST AI Risk Management Framework. We recommend reviewing the framework before purchasing.",

    documents: [
      "Executive AI Compliance Status Report",
      "Board Presentation Template",
      "AI Risk Register Excerpt",
    ],
    decisions: [
      ["employment", "Employment/HR AI"],
      ["customer", "Customer-Facing AI"],
      ["financial", "Financial AI"],
      ["operations", "Operational AI"],
      ["safety", "Safety-Critical AI"],
    ],
    helpTexts: {
      step2Help:
        "What AI systems should be reported to your board? Any AI system that creates material risk \u2014 legal, regulatory, reputational, or operational. Boards increasingly need to understand AI risk exposure, especially for systems affecting customers, employees, or regulated activities.",
      step2Intro:
        "List each AI system that should be included in board-level risk reporting. The executive summary and board presentation will cover each one.",
      step2DecisionHelp:
        "Check every area where your organization uses AI that could create material risk. This determines what goes in the board risk register.",
      step2MultiHelp:
        "Most organizations with significant AI use have multiple systems. List each one so the board presentation covers your complete AI risk picture.",
      step3BiasHelp:
        "Bias risk is increasingly a board-level governance issue. If any AI systems have undergone bias testing, include that status in the board report.",
      step4Help:
        "This section captures your current AI governance structure. Boards need to know who is accountable for AI risk oversight.",
      step5Intro:
        "This person will be listed as the board AI briefing coordinator \u2014 the executive responsible for board-level AI risk reporting.",
    },
  },
  "consumer-notice-kit": {
    name: "Consumer Notice Customization Kit",
    statute: "Multi-State AI Consumer Disclosure Requirements",
    lawUrl: "https://www.nist.gov/itl/ai-risk-management-framework",
    lawLinkText: "Review applicable state AI disclosure requirements",
    acknowledgment:
      "I understand that these are disclosure templates, not legal advice. Consumer notice requirements vary by state and context. I should verify applicable disclosure requirements and consult qualified legal counsel.",
    basePrice: 49,
    oversightOptions: OVERSIGHT_OPTIONS_GENERIC,
    dataInputOptions: DATA_INPUT_OPTIONS_GENERIC,

    documents: [
      "Website AI Disclosure Banner",
      "Email AI Notification Template",
      "Physical Workplace AI Posting",
    ],
    decisions: [
      ["customer", "Customer-Facing AI"],
      ["employment", "Employment AI"],
      ["profiling", "Consumer Profiling"],
      ["financial", "Financial Decisions"],
    ],
    helpTexts: {
      step2Help:
        "Where do you need to disclose AI use? Colorado SB24-205, California CCPA ADMT, Minnesota MCDPA, and other state laws require consumer notice before using AI in consequential decisions. This kit provides notices in website banner, email, and physical posting formats.",
      step2Intro:
        "List each AI system for which you need consumer disclosure notices. We\u2019ll customize the notices for your specific AI use context.",
      step2DecisionHelp:
        "Check every area where your AI system is used with consumers. Different disclosure requirements apply depending on the type of decision.",
      step2MultiHelp:
        "If you use multiple AI systems that face consumers, each may need its own notice. List each system separately.",
      step3BiasHelp:
        "If your AI systems have been audited for bias, that information can be included in your consumer transparency disclosures.",
      step4Help:
        "This section captures how consumers interact with your AI systems. This determines which notice formats and language are most appropriate.",
      step5Intro:
        "This contact will be listed in consumer notices as the designated AI inquiry contact for consumer questions about AI use.",
    },
  },
  "data-mapping-inventory": {
    name: "Data Mapping & Inventory Kit",
    statute: "Multi-State Privacy Data Mapping Requirements",
    lawUrl: "https://cppa.ca.gov/regulations/",
    lawLinkText: "Review CPPA data mapping guidance at cppa.ca.gov",
    acknowledgment:
      "I understand that these are data mapping templates, not legal advice. Data mapping requirements vary by state. I should consult qualified legal counsel before completing any state privacy assessment.",
    basePrice: 69,
    skippedSteps: [3, 4],

    documents: [
      "Personal Data Inventory",
      "AI Data Flow Diagram Template",
      "Third-Party Data Sharing Register",
    ],
    decisions: [
      ["profiling", "Consumer Profiling"],
      ["employment", "Employment Decisions"],
      ["targeted_ads", "Targeted Advertising"],
      ["data_sales", "Data Sales"],
      ["sensitive_data", "Sensitive Data Processing"],
    ],
    helpTexts: {
      step2Help:
        "Why do you need data mapping? Every state privacy law requires a data protection assessment before you can document compliance. You cannot complete an assessment if you don\u2019t know what data you have, where it comes from, where it goes, and who sees it. Data mapping is step zero.",
      step2Intro:
        "List each AI system or data processing activity you need to map. The inventory templates will document each system\u2019s data flows and sharing relationships.",
      step2DecisionHelp:
        "Check every activity where your AI or data systems process personal data. Different categories trigger different state privacy law obligations.",
      step2MultiHelp:
        "If you have multiple AI systems processing personal data, list each separately. Each needs its own data flow documentation.",
      step3BiasHelp:
        "If any of your AI systems use personal data to make decisions that affect people, bias assessment is a natural next step after completing your data inventory.",
      step4Help:
        "This section captures who has access to personal data in your AI systems. Third-party access is a key factor in data protection assessments.",
      step5Intro:
        "This person will be listed as the data mapping coordinator \u2014 the privacy officer or data governance lead responsible for maintaining the inventory.",
    },
  },
  "consumer-rights-kit": {
    name: "Consumer Rights Request Kit",
    statute: "Multi-State Consumer Rights Requirements",
    lawUrl: "https://cppa.ca.gov/regulations/",
    lawLinkText: "Review CPPA consumer rights guidance at cppa.ca.gov",
    acknowledgment:
      "I understand that these are consumer rights response templates, not legal advice. Consumer rights requirements and response timelines vary by state. I should consult qualified legal counsel for my specific obligations.",
    basePrice: 59,
    oversightOptions: OVERSIGHT_OPTIONS_GENERIC,
    dataInputOptions: DATA_INPUT_OPTIONS_GENERIC,

    documents: [
      "Consumer Rights Request Intake Form",
      "Response Letter Templates",
      "Request Response Timeline Tracker",
    ],
    decisions: [
      ["profiling", "Consumer Profiling"],
      ["targeted_ads", "Targeted Advertising"],
      ["data_sales", "Data Sales"],
      ["employment", "Employment Decisions"],
    ],
    helpTexts: {
      step2Help:
        "Which laws give consumers rights about your AI? California CCPA, Colorado SB24-205, Minnesota MCDPA, Texas TDPSA, Delaware PDPA, and other state laws give consumers rights to access, correct, delete, and opt out of AI-driven profiling. This kit provides the intake form, response letters, and timeline tracker to handle those requests professionally.",
      step2Intro:
        "List each AI system or data processing activity that generates consumer rights requests. The intake form and response templates cover each type of request.",
      step2DecisionHelp:
        "Check every area where your AI systems process consumer personal data. This determines which consumer rights apply and what your response obligations are.",
      step2MultiHelp:
        "If consumers can submit rights requests about multiple AI systems, list each separately. The intake form will route requests to the right system.",
      step3BiasHelp:
        "If consumers have the right to opt out of profiling or request human review of AI decisions, the response templates cover those rights specifically.",
      step4Help:
        "This section captures your current process for handling consumer data requests. Most state laws require responses within 45 days of receiving a valid request.",
      step5Intro:
        "This contact will be listed on consumer rights intake forms and response letters as the designated privacy rights contact.",
    },
  },
  // ── PRODUCT 1: AI Governance Framework ──────────────────────
  "ai-governance-framework": {
    name: "AI Governance Framework",
    statute: "NIST AI RMF Govern Function + CO SB24-205",
    lawUrl: "https://www.nist.gov/system/files/documents/2023/01/26/AI-RMF-1-0.pdf",
    lawLinkText: "Review the NIST AI Risk Management Framework 1.0 (PDF)",
    acknowledgment:
      "I have reviewed the NIST AI Risk Management Framework (NIST AI 100-1) referenced in this product. I understand that these are governance framework templates, not legal advice. I should consult qualified legal counsel to verify applicability to my organization and jurisdiction.",
    basePrice: 349,
    skippedSteps: [2, 3, 4],
    gateText: "These templates implement the NIST AI Risk Management Framework. We recommend reviewing the framework before purchasing.",

    documents: [
      "AI Governance Policy",
      "AI Ethics Principles Statement",
      "AI Risk Classification Matrix",
      "AI Use Case Approval Workflow",
      "AI Steering Committee Charter",
      "AI Compliance Officer Role Description",
    ],
    decisions: [
      ["hiring", "Hiring & Employment"],
      ["customer_service", "Customer Service & Operations"],
      ["financial", "Financial & Lending"],
      ["healthcare", "Healthcare & Clinical"],
      ["content", "Content Generation & Marketing"],
      ["internal_ops", "Internal Operations & Automation"],
    ],
    helpTexts: {
      step2Help:
        "What AI systems need governance? Any AI system your organization deploys, including third-party tools with AI features. The NIST AI RMF Govern function applies to all AI systems \u2014 from simple recommendation engines to complex generative AI. If employees or customers interact with it and it uses machine learning or AI, it belongs in your governance framework.",
      step2Intro:
        "List each AI system your organization deploys. Your governance framework will cover all of them.",
      step2DecisionHelp:
        "Check every area where this AI system is used. Your governance policy, ethics principles, and risk classification will address all checked areas.",
      step2MultiHelp:
        "Most organizations deploy AI across multiple business areas. List each system separately so your governance framework explicitly covers each one.",
      step3BiasHelp:
        "A bias audit establishes whether your AI systems produce equitable outcomes across demographic groups. The NIST AI RMF MEASURE function recommends bias testing as part of responsible AI deployment.",
      step4Help:
        "This section captures how your organization currently oversees AI decisions. Your governance framework and steering committee charter will formalize these oversight structures.",
      step5Intro:
        "This person will be named as your AI Compliance Officer in the governance framework \u2014 responsible for policy enforcement, risk oversight, and committee coordination.",
    },
  },
  // ── PRODUCT 2: AI System Registry ───────────────────────────
  "ai-system-registry": {
    name: "AI System Registry",
    statute: "NIST AI RMF MAP Function",
    lawUrl: "https://airc.nist.gov/AI_RMF_Knowledge_Base/Playbook",
    lawLinkText: "Review the NIST AI RMF MAP Function Playbook",
    acknowledgment:
      "I have reviewed the NIST AI RMF MAP Function Playbook referenced in this product. I understand that these are inventory and lifecycle tracking templates, not legal advice. I should consult qualified legal counsel to verify my specific compliance obligations.",
    basePrice: 199,
    skippedSteps: [3, 4],
    gateText: "These templates reference the NIST AI RMF Playbook. We recommend reviewing the framework before purchasing.",

    documents: [
      "AI System Inventory Template",
      "AI System Lifecycle Tracker",
    ],
    decisions: [
      ["hiring", "Hiring & Employment"],
      ["customer_service", "Customer Service & Operations"],
      ["financial", "Financial & Lending"],
      ["healthcare", "Healthcare & Clinical"],
      ["content", "Content Generation & Marketing"],
      ["internal_ops", "Internal Operations & Automation"],
    ],
    helpTexts: {
      step2Help:
        "Which systems belong in your AI inventory? Every AI system your organization deploys \u2014 whether built internally, purchased from a vendor, or accessed as a SaaS feature. This includes resume screening tools, chatbots, recommendation engines, fraud detection models, and any software marketed as \u201cAI-powered.\u201d You cannot assess, govern, or comply with AI law for systems you haven\u2019t inventoried.",
      step2Intro:
        "List each AI system your organization uses. The inventory will capture name, purpose, vendor, data inputs, risk level, and owner for each system.",
      step2DecisionHelp:
        "Check every area where this AI system operates. Your inventory entry will capture the full scope of each system\u2019s use.",
      step2MultiHelp:
        "Most organizations discover more AI systems than they expected during the inventory process. List every system you know of \u2014 you can always add more.",
      step3BiasHelp:
        "Your inventory should capture whether each system has been bias-tested. This field in the inventory helps prioritize which systems need auditing.",
      step4Help:
        "This section captures ownership and oversight for each system. Your inventory will document who owns each AI system and who is accountable for its performance.",
      step5Intro:
        "This person will be listed as the registry administrator \u2014 responsible for maintaining the inventory as systems are added, modified, or retired.",
    },
  },
  // ── PRODUCT 3: AI Transparency Report Template ───────────────
  "ai-transparency-report": {
    name: "AI Transparency Report Template",
    statute: "EU AI Act Art. 13 + Voluntary Best Practice",
    lawUrl: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689",
    lawLinkText: "Review Regulation (EU) 2024/1689 (EU AI Act) on EUR-Lex",
    acknowledgment:
      "I have reviewed Regulation (EU) 2024/1689 (EU AI Act) referenced in this product. I understand that these are transparency reporting templates, not legal advice. I should consult qualified legal counsel to verify my specific disclosure and reporting obligations.",
    basePrice: 149,
    oversightOptions: OVERSIGHT_OPTIONS_GENERIC,
    dataInputOptions: DATA_INPUT_OPTIONS_GENERIC,

    documents: [
      "Annual AI Transparency Report Template",
      "AI System Performance Monitoring Report",
    ],
    decisions: [
      ["hiring", "Hiring & Employment"],
      ["customer_service", "Customer Service & Operations"],
      ["financial", "Financial & Lending"],
      ["healthcare", "Healthcare & Clinical"],
      ["content", "Content Generation & Marketing"],
      ["internal_ops", "Internal Operations & Automation"],
    ],
    helpTexts: {
      step2Help:
        "Which systems belong in your transparency report? Any AI system your organization deploys that affects people \u2014 especially high-risk systems under EU AI Act Annex III. Voluntary transparency reports typically cover all material AI deployments. The more systems you disclose, the stronger your transparency posture.",
      step2Intro:
        "List each AI system you want to include in your transparency report. The template will generate a report section for each one.",
      step2DecisionHelp:
        "Check every area where this AI system is used. Transparency reports describe the purpose and scope of each system\u2019s deployment.",
      step2MultiHelp:
        "Large organizations often publish transparency reports covering all AI deployments. List each system separately for clear, auditable disclosure.",
      step3BiasHelp:
        "Transparency reports should disclose whether bias testing was conducted and what the results showed. Voluntary disclosure of bias testing results is increasingly expected by regulators and enterprise customers.",
      step4Help:
        "This section captures your human oversight and safeguard practices. Transparency reports describe the controls your organization has in place to ensure responsible AI use.",
      step5Intro:
        "This contact will be named as the transparency report author and AI accountability contact \u2014 the person stakeholders can reach with questions about your AI disclosure.",
    },
  },
  // ── PRODUCT 4: AI Whistleblower Policy ──────────────────────
  "ai-whistleblower-policy": {
    name: "AI Whistleblower Policy",
    statute: "CA SB 53 (2025\u20132026 Session) + Best Practice",
    lawUrl: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB53",
    lawLinkText: "Review CA SB 53 (2025\u20132026 Session) on leginfo.legislature.ca.gov",
    acknowledgment:
      "I have reviewed the California SB 53 (2025\u20132026 Session) AI whistleblower provisions referenced in this product. I understand that these are policy templates, not legal advice. I should consult qualified legal counsel to verify applicability to my organization.",
    basePrice: 99,
    oversightOptions: OVERSIGHT_OPTIONS_GENERIC,
    dataInputOptions: DATA_INPUT_OPTIONS_GENERIC,

    documents: [
      "AI Safety Whistleblower Protection Policy",
      "Internal AI Concern Reporting Form",
    ],
    decisions: [
      ["hiring", "Hiring & Employment"],
      ["customer_service", "Customer Service & Operations"],
      ["financial", "Financial & Lending"],
      ["healthcare", "Healthcare & Clinical"],
      ["content", "Content Generation & Marketing"],
      ["internal_ops", "Internal Operations & Automation"],
    ],
    helpTexts: {
      step2Help:
        "What AI systems need whistleblower protections? Any AI system where employees might observe harmful outputs, unsafe behavior, or policy violations. This is especially important for AI systems that make consequential decisions \u2014 hiring, lending, healthcare triage, content moderation. Employees who observe problems need a protected channel to report them.",
      step2Intro:
        "List the AI systems your whistleblower policy will cover. Your policy will identify protected reporting channels for each system.",
      step2DecisionHelp:
        "Check every area where AI systems in your organization operate. Your policy will cover concerns related to all checked areas.",
      step2MultiHelp:
        "A single whistleblower policy can cover all your AI systems. List each one so your policy explicitly names the systems employees can report concerns about.",
      step3BiasHelp:
        "Employees who discover discriminatory AI outputs need a clear path to report them. Your whistleblower policy should explicitly protect employees who report bias-related concerns.",
      step4Help:
        "This section captures your current oversight structure. Your whistleblower policy will integrate with your existing oversight roles \u2014 identifying who receives reports and how investigations are conducted.",
      step5Intro:
        "This person will be named as the Whistleblower Program Administrator \u2014 responsible for receiving reports, maintaining confidentiality, and coordinating investigations.",
    },
  },
  // ── PRODUCT 5: AI Acceptable Use Policy for Customers ────────
  "customer-ai-aup": {
    name: "AI Acceptable Use Policy for Customers",
    statute: "FTC Act \u00A7 5 + EU AI Act Art. 13 + Best Practice",
    lawUrl: "https://www.ftc.gov/business-guidance/blog/2023/02/ftc-chair-khan-and-officials-from-doj-cfpb-eeoc-release-joint-statement-ai",
    lawLinkText: "Review FTC AI Joint Statement on ftc.gov",
    acknowledgment:
      "I have reviewed the FTC and EU AI Act guidance referenced in this product. I understand that this is a customer-facing policy template, not legal advice. I should consult qualified legal counsel to verify the policy is appropriate for my products and jurisdiction.",
    basePrice: 99,
    oversightOptions: OVERSIGHT_OPTIONS_GENERIC,
    dataInputOptions: DATA_INPUT_OPTIONS_GENERIC,
    gateText: "These templates reference FTC guidance on AI consumer practices. We recommend reviewing the guidance before purchasing.",

    documents: [
      "Customer AI Acceptable Use Policy",
    ],
    decisions: [
      ["customer_service", "Customer Service & Support"],
      ["content", "Content Generation & Marketing"],
      ["analysis", "Data Analysis & Reporting"],
      ["financial", "Financial & Recommendations"],
      ["healthcare", "Healthcare & Clinical"],
      ["internal_ops", "Automation & Workflows"],
    ],
    helpTexts: {
      step2Help:
        "Which AI features need to be covered in your Customer AUP? Any AI capability you make available to customers \u2014 generative AI features, AI-powered recommendations, automated decision tools, chatbots, or AI-assisted workflows. Your Customer AUP sets the rules for how customers may use your AI features, what\u2019s prohibited, and what your liability limits are.",
      step2Intro:
        "List each AI-powered feature or product you offer to customers. Your Customer AUP will cover all of them.",
      step2DecisionHelp:
        "Check every area where your AI product is used by customers. Your AUP will address permitted uses, prohibited uses, and limitations for each area.",
      step2MultiHelp:
        "If you offer multiple AI-powered products or features, your Customer AUP should cover all of them. List each one so your policy is comprehensive.",
      step3BiasHelp:
        "If your AI product makes decisions affecting people, your Customer AUP should address your bias testing practices and limitations on discriminatory use.",
      step4Help:
        "This section captures how your AI product is designed to be used and what safeguards you have in place. Your Customer AUP will reflect these safeguards in the permitted use and liability sections.",
      step5Intro:
        "This contact will be named in your Customer AUP as the point of contact for AUP violations, abuse reports, and policy questions.",
    },
  },
  "indiana-icdpa": {
    name: "Indiana ICDPA",
    statute: "IC 24-15 (Indiana Consumer Data Protection Act)",
    lawUrl: "https://iga.in.gov/laws/2024/ic/titles/24#24-15",
    lawLinkText: "Read IC 24-15 on iga.in.gov",
    acknowledgment:
      "I have reviewed IC 24-15 (Indiana Consumer Data Protection Act, P.L. 94-2023) and understand that these are compliance templates, not legal advice. This law is effective January 1, 2026. I should verify the current regulatory status and consult qualified legal counsel.",
    basePrice: 249,
    skippedSteps: [3],
    oversightOptions: OVERSIGHT_OPTIONS_GENERIC,

    documents: [
      "Privacy Notice Template",
      "Data Protection Assessment",
      "Consumer Rights Request Procedures",
      "Opt-Out Documentation",
      "Data Processing Agreement Template",
      "Compliance Checklist",
    ],
    decisions: [
      ["profiling", "Profiling/Automated Decisions"],
      ["targeted_ads", "Targeted Advertising"],
      ["data_sales", "Data Sales"],
      ["sensitive_data", "Sensitive Data Processing"],
    ],
    helpTexts: {
      step2Help:
        "What systems are covered? Any system that uses personal data of Indiana consumers for profiling, targeted advertising, data sales, or processing sensitive data. If your system makes decisions about consumers \u2014 include it.",
      step2Intro:
        "List each AI or data processing system used in activities covered by the Indiana Consumer Data Protection Act (IC 24-15).",
      step2DecisionHelp:
        "Check every category where this system processes Indiana consumer data. IC 24-15 covers profiling for consequential decisions, targeted advertising, data sales, and sensitive data processing.",
      step2MultiHelp:
        "If you use multiple systems across these categories, list each separately. Each may require its own data protection assessment.",
      step3BiasHelp:
        "IC 24-15-6-1(b) requires documented assessments for profiling that presents risk of unfair treatment or disparate impact. Document your review of these risks.",
      step4Help:
        "This section captures your oversight and governance for data processing activities. Indiana law requires responding to consumer rights requests within 45 days.",
      step5Intro:
        "This contact will be listed in your privacy notices and consumer rights procedures as the designated privacy contact.",
    },
  },
  "montana-mcdpa": {
    name: "Montana MCDPA",
    statute: "MCA \u00A7\u00A7 30-14-2801 through 30-14-2820",
    lawUrl: "https://leg.mt.gov/bills/mca/title_0300/chapter_0140/part_0280/sections_index.html",
    lawLinkText: "Read MCA \u00A7\u00A7 30-14-2801\u201330-14-2820 on leg.mt.gov",
    acknowledgment:
      "I have reviewed MCA \u00A7\u00A7 30-14-2801 through 30-14-2820 (Montana Consumer Data Privacy Act, SB 384) and understand that these are compliance templates, not legal advice. Montana has the lowest applicability thresholds of any state privacy law (25,000 consumers). I should verify the current regulatory status and consult qualified legal counsel.",
    basePrice: 249,
    skippedSteps: [3],
    oversightOptions: OVERSIGHT_OPTIONS_GENERIC,

    documents: [
      "Privacy Notice Template",
      "Data Protection Assessment",
      "Consumer Rights Request Procedures",
      "Opt-Out Documentation",
      "Data Processing Agreement Template",
      "Compliance Checklist",
    ],
    decisions: [
      ["profiling", "Profiling/Automated Decisions"],
      ["targeted_ads", "Targeted Advertising"],
      ["data_sales", "Data Sales"],
      ["sensitive_data", "Sensitive Data Processing"],
    ],
    helpTexts: {
      step2Help:
        "What systems are covered? Any system that uses personal data of Montana consumers for profiling, targeted advertising, data sales, or processing sensitive data. Montana has the lowest applicability thresholds of any state \u2014 if your business reaches 25,000 Montana consumers, review carefully.",
      step2Intro:
        "List each AI or data processing system used in activities covered by the Montana Consumer Data Privacy Act (MCA \u00A7\u00A7 30-14-2801\u201330-14-2820).",
      step2DecisionHelp:
        "Check every category where this system processes Montana consumer data. The Montana MCDPA covers profiling for consequential decisions, targeted advertising, data sales, and sensitive data processing.",
      step2MultiHelp:
        "If you use multiple systems across these categories, list each separately. Each may require its own data protection assessment.",
      step3BiasHelp:
        "MCA \u00A7 30-14-2814 requires documented assessments for profiling activities. Assessments are not retroactive to pre-January 1, 2025 processing.",
      step4Help:
        "This section captures your oversight and governance for data processing activities. Montana law requires responding to consumer rights requests within 45 days.",
      step5Intro:
        "This contact will be listed in your privacy notices and consumer rights procedures as the designated privacy contact.",
    },
  },
  "kentucky-kcdpa": {
    name: "Kentucky KCDPA",
    statute: "KRS Chapter 367 (Kentucky Consumer Data Protection Act, HB 15)",
    lawUrl: "https://apps.legislature.ky.gov/record/24RS/hb15.html",
    lawLinkText: "Read HB 15 (KRS Chapter 367) on apps.legislature.ky.gov",
    acknowledgment:
      "I have reviewed KRS Chapter 367 (Kentucky Consumer Data Protection Act, HB 15) and understand that these are compliance templates, not legal advice. This law is effective January 1, 2026. I should verify the current regulatory status and consult qualified legal counsel.",
    basePrice: 249,
    skippedSteps: [3],
    oversightOptions: OVERSIGHT_OPTIONS_GENERIC,

    documents: [
      "Privacy Notice Template",
      "Data Protection Assessment",
      "Consumer Rights Request Procedures",
      "Opt-Out Documentation",
      "Data Processing Agreement Template",
      "Compliance Checklist",
    ],
    decisions: [
      ["profiling", "Profiling/Automated Decisions"],
      ["targeted_ads", "Targeted Advertising"],
      ["data_sales", "Data Sales"],
      ["sensitive_data", "Sensitive Data Processing"],
    ],
    helpTexts: {
      step2Help:
        "What systems are covered? Any system that uses personal data of Kentucky consumers for profiling, targeted advertising, data sales, or processing sensitive data. If your system makes decisions about consumers \u2014 include it.",
      step2Intro:
        "List each AI or data processing system used in activities covered by the Kentucky Consumer Data Protection Act (KRS Chapter 367, HB 15).",
      step2DecisionHelp:
        "Check every category where this system processes Kentucky consumer data. The Kentucky KCDPA covers profiling for consequential decisions, targeted advertising, data sales, and sensitive data processing.",
      step2MultiHelp:
        "If you use multiple systems across these categories, list each separately. Each may require its own data protection assessment.",
      step3BiasHelp:
        "Kentucky\u2019s KCDPA requires documented assessments for profiling activities that present heightened risk. Document your review of these risks for each covered system.",
      step4Help:
        "This section captures your oversight and governance for data processing activities. Kentucky law requires responding to consumer rights requests within 45 days.",
      step5Intro:
        "This contact will be listed in your privacy notices and consumer rights procedures as the designated privacy contact.",
    },
  },
  "new-jersey-njdpa": {
    name: "New Jersey NJDPA",
    statute: "New Jersey Data Protection Act (S332/A1971)",
    lawUrl: "https://www.njleg.state.nj.us/bill-search/2022/S332",
    lawLinkText: "Read S332 (New Jersey Data Protection Act) on njleg.state.nj.us",
    acknowledgment:
      "I have reviewed the New Jersey Data Protection Act (S332, signed January 16, 2024) and understand that these are compliance templates, not legal advice. The NJDPA is effective January 15, 2025. This is separate from the NJ Law Against Discrimination. I should verify the current regulatory status and consult qualified legal counsel.",
    basePrice: 249,
    skippedSteps: [3],
    oversightOptions: OVERSIGHT_OPTIONS_GENERIC,

    documents: [
      "Privacy Notice Template",
      "Data Protection Assessment",
      "Consumer Rights Request Procedures",
      "Opt-Out Documentation",
      "Data Processing Agreement Template",
      "Compliance Checklist",
    ],
    decisions: [
      ["profiling", "Profiling/Automated Decisions"],
      ["targeted_ads", "Targeted Advertising"],
      ["data_sales", "Data Sales"],
      ["sensitive_data", "Sensitive Data Processing"],
    ],
    helpTexts: {
      step2Help:
        "What systems are covered? Any system that uses personal data of New Jersey consumers for profiling, targeted advertising, data sales, or processing sensitive data. Note: the NJDPA is a separate law from the NJ Law Against Discrimination.",
      step2Intro:
        "List each AI or data processing system used in activities covered by the New Jersey Data Protection Act (S332).",
      step2DecisionHelp:
        "Check every category where this system processes New Jersey consumer data. The NJDPA covers profiling for consequential decisions, targeted advertising, data sales, and sensitive data processing.",
      step2MultiHelp:
        "If you use multiple systems across these categories, list each separately. Each may require its own data protection assessment.",
      step3BiasHelp:
        "The New Jersey NJDPA requires documented assessments for profiling activities that present heightened risk. Document your review of these risks for each covered system.",
      step4Help:
        "This section captures your oversight and governance for data processing activities. New Jersey law requires responding to consumer rights requests within 45 days.",
      step5Intro:
        "This contact will be listed in your privacy notices and consumer rights procedures as the designated privacy contact.",
    },
  },
  // ── Illinois Add-Ons ─────────────────────────────────────────
  "il-notice-response-kit": {
    name: "IL Notice & Response Kit",
    statute: "775 ILCS 5/2-102(L)",
    lawUrl:
      "https://www.ilga.gov/legislation/ilcs/fulltext?DocName=077500050K2-102",
    lawLinkText: "Read 775 ILCS 5/2-102 on ilga.gov",
    acknowledgment:
      "I have reviewed 775 ILCS 5/2-102(L) and understand that these are compliance templates, not legal advice. I should verify the current regulatory status at dhr.illinois.gov and consult qualified legal counsel.",
    basePrice: 79,
    skippedSteps: [2, 3, 4],

    documents: [
      "Employee Notification Template",
      "AI Use Logging Form",
      "Employee Inquiry Response Form",
    ],
    decisions: [
      ["hiring", "Hiring"],
      ["employment", "Employment Decisions"],
      ["inquiry", "Employee Inquiries & Responses"],
    ],
    helpTexts: {
      step2Help:
        "What AI systems require notice? Any AI tool used in employment decisions for Illinois employees. This kit provides the templates needed to notify employees and respond to their inquiries as required under 775 ILCS 5/2-102(L).",
      step2Intro:
        "List each AI tool for which you need to send employee notices or handle inquiry responses.",
      step2DecisionHelp:
        "Check the employment decision areas where this AI tool is used. This determines which notice templates apply.",
      step2MultiHelp:
        "If you use multiple AI tools requiring employee notice, list each separately.",
      step3BiasHelp:
        "If employees raise bias-related inquiries, your response templates should address how you evaluate and mitigate discriminatory AI outcomes.",
      step4Help:
        "This section captures how your organization processes employee AI inquiries and who is responsible for responding.",
      step5Intro:
        "This contact will be listed on employee notices and inquiry response forms as the designated AI compliance contact under Illinois HB3773.",
    },
  },
  "il-zip-proxy-audit": {
    name: "IL ZIP Code Proxy Audit Kit",
    statute: "775 ILCS 5/2-102(L)",
    lawUrl:
      "https://www.ilga.gov/legislation/ilcs/fulltext?DocName=077500050K2-102",
    lawLinkText: "Read 775 ILCS 5/2-102 on ilga.gov",
    acknowledgment:
      "I have reviewed 775 ILCS 5/2-102(L) and understand that these are compliance templates, not legal advice. I should verify the current regulatory status at dhr.illinois.gov and consult qualified legal counsel.",
    basePrice: 99,
    skippedSteps: [2, 3, 4],

    documents: [
      "Data Input Audit",
      "Proxy Analysis Worksheet",
      "Remediation Plan",
    ],
    decisions: [
      ["hiring", "Hiring"],
      ["employment", "Employment Decisions"],
      ["data_inputs", "AI Data Input Review"],
    ],
    helpTexts: {
      step2Help:
        "Why audit data inputs? Under Illinois HB3773, AI systems must not have a discriminatory effect. ZIP codes and similar geographic inputs can act as proxies for race or national origin. This kit helps you audit AI data inputs to identify and remediate potential proxy discrimination.",
      step2Intro:
        "List each AI tool whose data inputs you need to audit for proxy discrimination risks.",
      step2DecisionHelp:
        "Check the employment decision areas where this AI tool is used. This determines the scope of your proxy audit.",
      step2MultiHelp:
        "If you use multiple AI tools with data input concerns, audit each separately.",
      step3BiasHelp:
        "A proxy analysis is one of the most important bias reviews for employment AI. Geographic and demographic input variables are common sources of disparate impact.",
      step4Help:
        "This section captures your current AI data governance practices and who is responsible for input validation.",
      step5Intro:
        "This contact will be listed as the data audit coordinator responsible for proxy analysis and remediation tracking.",
    },
  },
  // ── Colorado Add-Ons ─────────────────────────────────────────
  "co-appeal-correction-kit": {
    name: "CO Appeal & Correction Kit",
    statute: "C.R.S. \u00A7\u00A7 6-1-1701\u20131707",
    lawUrl: "https://leg.colorado.gov/bills/sb24-205",
    lawLinkText: "Read SB 24-205 on leg.colorado.gov",
    acknowledgment:
      "I have reviewed C.R.S. \u00A7\u00A7 6-1-1701 through 6-1-1707 (Colorado SB 24-205) and understand that these are compliance templates, not legal advice. I should verify the current regulatory status and consult qualified legal counsel.",
    basePrice: 99,
    skippedSteps: [2, 3, 4],

    documents: [
      "Appeal Intake Form",
      "Data Correction Request Form",
      "Appeal Outcome Letter",
    ],
    decisions: [
      ["consumer_rights", "Consumer Appeal Rights"],
      ["data_correction", "Data Correction Requests"],
      ["adverse_decisions", "Adverse AI Decisions"],
    ],
    helpTexts: {
      step2Help:
        "When do consumers have appeal rights? Under C.R.S. \u00A7 6-1-1703, consumers affected by adverse consequential decisions made by high-risk AI systems have the right to appeal and request correction of inaccurate data. This kit provides the forms to handle those appeals.",
      step2Intro:
        "List each AI system that makes adverse consequential decisions against consumers. Your appeal process will cover each one.",
      step2DecisionHelp:
        "Check the consequential decision areas where adverse outcomes trigger appeal rights under Colorado SB 24-205.",
      step2MultiHelp:
        "If you use multiple high-risk AI systems, each may generate separate appeal requests. List each separately.",
      step3BiasHelp:
        "Consumers who experience discriminatory outcomes may use your appeal process to challenge those decisions. Your intake form should capture bias-related complaints.",
      step4Help:
        "This section captures how your organization reviews and responds to consumer appeals. Colorado law requires deployers to provide a meaningful appeal mechanism.",
      step5Intro:
        "This contact will be listed on appeal intake forms and outcome letters as the designated consumer rights contact under Colorado SB 24-205.",
    },
  },
  "co-ag-reporting-kit": {
    name: "CO AG Reporting Kit",
    statute: "C.R.S. \u00A7\u00A7 6-1-1701\u20131707",
    lawUrl: "https://leg.colorado.gov/bills/sb24-205",
    lawLinkText: "Read SB 24-205 on leg.colorado.gov",
    acknowledgment:
      "I have reviewed C.R.S. \u00A7\u00A7 6-1-1701 through 6-1-1707 (Colorado SB 24-205) and understand that these are compliance templates, not legal advice. I should verify the current regulatory status and consult qualified legal counsel.",
    basePrice: 129,
    skippedSteps: [2, 3, 4],

    documents: [
      "Discrimination Discovery Form",
      "AG Notification Letter",
      "Corrective Action Plan",
    ],
    decisions: [
      ["discrimination_discovery", "Algorithmic Discrimination Discovery"],
      ["ag_notification", "Attorney General Notification"],
      ["corrective_action", "Corrective Action"],
    ],
    helpTexts: {
      step2Help:
        "When must you notify the Colorado AG? Under C.R.S. \u00A7 6-1-1706, deployers who discover that their high-risk AI system has caused algorithmic discrimination must notify the Attorney General. This kit provides the documentation and notification templates for that process.",
      step2Intro:
        "List each AI system involved in a potential discrimination discovery that may require AG notification.",
      step2DecisionHelp:
        "Check the consequential decision areas where the potential discrimination occurred.",
      step2MultiHelp:
        "If multiple AI systems are involved in a discrimination event, document each separately.",
      step3BiasHelp:
        "Documenting your bias analysis at the time of discovery is critical for AG notification. Your discrimination discovery form should capture the statistical evidence.",
      step4Help:
        "This section captures your current oversight structure and how the discrimination was detected. This context is required for the AG notification letter.",
      step5Intro:
        "This contact will be listed as the compliance officer responsible for the AG notification and corrective action plan.",
    },
  },
  "co-dev-deploy-exchange": {
    name: "CO Developer-Deployer Exchange Kit",
    statute: "C.R.S. \u00A7\u00A7 6-1-1701\u20131707",
    lawUrl: "https://leg.colorado.gov/bills/sb24-205",
    lawLinkText: "Read SB 24-205 on leg.colorado.gov",
    acknowledgment:
      "I have reviewed C.R.S. \u00A7\u00A7 6-1-1701 through 6-1-1707 (Colorado SB 24-205) and understand that these are compliance templates, not legal advice. I should verify the current regulatory status and consult qualified legal counsel.",
    basePrice: 109,
    skippedSteps: [2, 3, 4],

    documents: [
      "Developer Disclosure Checklist",
      "Deployer Gap Analysis",
      "Third-Party Assessment Addendum",
    ],
    decisions: [
      ["developer_obligations", "Developer Disclosure Obligations"],
      ["deployer_assessment", "Deployer Risk Assessment"],
      ["third_party", "Third-Party AI Procurement"],
    ],
    helpTexts: {
      step2Help:
        "What are developer vs. deployer obligations? Colorado SB 24-205 distinguishes between developers (who build AI systems) and deployers (who use them). Developers must disclose system capabilities and limitations; deployers must conduct their own impact assessments. This kit addresses the documentation exchange between both parties.",
      step2Intro:
        "List each AI system involved in a developer-deployer relationship requiring documentation exchange.",
      step2DecisionHelp:
        "Check the consequential decision areas where this AI system is deployed. This determines which developer disclosures and deployer assessments are required.",
      step2MultiHelp:
        "If you procure multiple AI systems from different developers, each relationship requires its own documentation exchange.",
      step3BiasHelp:
        "Developer disclosures should include bias testing results. Your deployer gap analysis should assess whether the developer\u2019s testing is sufficient for your deployment context.",
      step4Help:
        "This section captures how your organization evaluates third-party AI systems before deployment. Colorado law requires deployers to exercise reasonable care over procured systems.",
      step5Intro:
        "This contact will be listed as the vendor AI compliance lead responsible for the developer-deployer documentation exchange.",
    },
  },
  // ── California Add-Ons ────────────────────────────────────────
  "ca-admt-notice-optout": {
    name: "CA ADMT Notice & Opt-Out Kit",
    statute: "Cal. Civ. Code \u00A7 1798.100 et seq.",
    lawUrl: "https://cppa.ca.gov/regulations/",
    lawLinkText: "Read the CPPA ADMT regulations at cppa.ca.gov",
    acknowledgment:
      "I have reviewed the California Consumer Privacy Act (Cal. Civ. Code \u00A7 1798.100 et seq.) and the CPPA\u2019s Automated Decisionmaking Technology (ADMT) regulations. I understand that these are compliance templates, not legal advice. I should verify the current regulatory status and consult qualified legal counsel.",
    basePrice: 99,
    skippedSteps: [2, 3, 4],

    documents: [
      "Pre-Use Notice Template",
      "Opt-Out Request Processing Workflow",
      "Opt-Out Exception Documentation",
    ],
    decisions: [
      ["hiring", "Employment Decisions"],
      ["financial", "Financial/Lending"],
      ["consumer_profiling", "Consumer Profiling"],
    ],
    helpTexts: {
      step2Help:
        "When is pre-use notice required? The CPPA ADMT regulations require businesses to provide consumers with notice before using ADMT that has a legal or similarly significant effect on them, and to offer an opt-out right. This kit provides the notice templates and opt-out processing workflow.",
      step2Intro:
        "List each ADMT system for which you need to provide consumer pre-use notice and opt-out rights.",
      step2DecisionHelp:
        "Check every decision category where this ADMT system affects California consumers. This determines the scope of notice and opt-out obligations.",
      step2MultiHelp:
        "Each ADMT system may require its own consumer notice. List all systems separately.",
      step3BiasHelp:
        "CPPA regulations require risk assessments for ADMT. If your system has been assessed for bias, that information should be reflected in your consumer-facing disclosures.",
      step4Help:
        "This section captures how consumers interact with your ADMT system and how opt-out requests are processed. California regulations require a meaningful opt-out mechanism.",
      step5Intro:
        "This contact will be listed on consumer notices and opt-out request forms as the designated ADMT rights contact.",
    },
  },
  "ca-admt-access-kit": {
    name: "CA ADMT Access & Explanation Kit",
    statute: "Cal. Civ. Code \u00A7 1798.100 et seq.",
    lawUrl: "https://cppa.ca.gov/regulations/",
    lawLinkText: "Read the CPPA ADMT regulations at cppa.ca.gov",
    acknowledgment:
      "I have reviewed the California Consumer Privacy Act (Cal. Civ. Code \u00A7 1798.100 et seq.) and the CPPA\u2019s Automated Decisionmaking Technology (ADMT) regulations. I understand that these are compliance templates, not legal advice. I should verify the current regulatory status and consult qualified legal counsel.",
    basePrice: 89,
    skippedSteps: [2, 3, 4],

    documents: [
      "Access Request Intake Form",
      "ADMT Output Explanation Template",
      "Response Timeline Tracker",
    ],
    decisions: [
      ["hiring", "Employment Decisions"],
      ["financial", "Financial/Lending"],
      ["consumer_profiling", "Consumer Profiling"],
    ],
    helpTexts: {
      step2Help:
        "What access rights do California consumers have? The CPPA ADMT regulations give consumers the right to access information about ADMT decisions that significantly affect them, including an explanation of the logic and the data used. This kit provides the intake form, explanation template, and timeline tracker.",
      step2Intro:
        "List each ADMT system from which consumers may request access and explanation of decisions.",
      step2DecisionHelp:
        "Check the decision categories where this ADMT system produces outputs that consumers have the right to access.",
      step2MultiHelp:
        "If you use multiple ADMT systems, consumers may request access to each separately. List all systems.",
      step3BiasHelp:
        "Consumers who receive biased ADMT outputs may request an explanation. Your explanation template should address how the system was designed to minimize discriminatory outcomes.",
      step4Help:
        "This section captures how your organization generates and communicates ADMT decision explanations to consumers.",
      step5Intro:
        "This contact will be listed on access request intake forms as the designated ADMT access rights contact.",
    },
  },
  "ca-cyber-audit-kit": {
    name: "CA Cybersecurity Audit Kit",
    statute: "Cal. Civ. Code \u00A7 1798.100 et seq.",
    lawUrl: "https://cppa.ca.gov/regulations/",
    lawLinkText: "Read the CPPA ADMT regulations at cppa.ca.gov",
    acknowledgment:
      "I have reviewed the California Consumer Privacy Act (Cal. Civ. Code \u00A7 1798.100 et seq.) and the CPPA\u2019s cybersecurity audit regulations. I understand that these are compliance templates, not legal advice. I should verify the current regulatory status and consult qualified legal counsel.",
    basePrice: 149,
    skippedSteps: [2, 3, 4],

    documents: [
      "Cybersecurity Audit Checklist",
      "Risk Assessment Workbook",
      "Audit Remediation Tracker",
    ],
    decisions: [
      ["data_processing", "Personal Data Processing"],
      ["consumer_profiling", "Consumer Profiling"],
      ["sensitive_data", "Sensitive Data Processing"],
    ],
    helpTexts: {
      step2Help:
        "When is a cybersecurity audit required? The CPPA regulations require businesses that process personal data and present significant risk to conduct cybersecurity audits. This kit provides the checklist, risk assessment workbook, and remediation tracker for that process.",
      step2Intro:
        "List each AI or data processing system to be included in your cybersecurity audit.",
      step2DecisionHelp:
        "Check every category where this system processes California consumer personal data. This determines the audit scope.",
      step2MultiHelp:
        "If you have multiple systems processing personal data, each may require its own audit assessment. List them separately.",
      step3BiasHelp:
        "Cybersecurity risks and algorithmic bias risks often overlap \u2014 a compromised AI system can produce distorted outputs. Include bias risk in your audit scope.",
      step4Help:
        "This section captures your current cybersecurity controls for AI and data processing systems. The audit checklist will assess each control area.",
      step5Intro:
        "This contact will be listed as the cybersecurity audit coordinator responsible for scheduling, tracking, and remediating audit findings.",
    },
  },
  // ── NYC Add-Ons ──────────────────────────────────────────────
  "nyc-bias-audit-mgmt": {
    name: "NYC Bias Audit Management Kit",
    statute: "NYC Admin. Code \u00A7\u00A7 20-870\u201320-874",
    lawUrl:
      "https://legistar.council.nyc.gov/LegislationDetail.aspx?ID=4344524&GUID=B051915D-A9AC-451E-81F8-6596032FA3F9",
    lawLinkText:
      "Read NYC Admin Code \u00A7\u00A7 20-870\u201320-874 on NYC Council",
    acknowledgment:
      "I have reviewed NYC Administrative Code \u00A7\u00A7 20-870 through 20-874 (Local Law 144 of 2021) and the DCWP implementing rules at 6 RCNY \u00A7 5-300 et seq. I understand that these are compliance templates, not legal advice. I should verify the current regulatory status and consult qualified legal counsel.",
    basePrice: 129,
    skippedSteps: [2, 3, 4],

    documents: [
      "Auditor RFP Template",
      "Results Publication Template",
      "Annual Renewal Calendar",
    ],
    decisions: [
      ["hiring", "Hiring/Screening"],
      ["promotion", "Promotion"],
    ],
    helpTexts: {
      step2Help:
        "What does annual bias audit management require? Under NYC LL144, automated employment decision tools must have an annual independent bias audit conducted before use, and results must be published on your website at least 10 business days before using the tool. This kit provides the auditor RFP, publication template, and renewal calendar.",
      step2Intro:
        "List each AEDT that requires annual bias audit management under NYC LL144.",
      step2DecisionHelp:
        "Check whether this AEDT is used for hiring/screening, promotion, or both.",
      step2MultiHelp:
        "Each AEDT requires its own annual bias audit. List each tool separately so your renewal calendar covers them all.",
      step3BiasHelp:
        "The auditor RFP template specifies the independence requirements and impact ratio methodology required by DCWP rules at 6 RCNY \u00A7 5-300 et seq.",
      step4Help:
        "This section captures how your organization selects and manages independent bias auditors. NYC LL144 requires auditors to be independent of the AEDT developer and deployer.",
      step5Intro:
        "This contact will be listed as the bias audit program coordinator responsible for auditor selection, results publication, and annual renewal.",
    },
  },
  "nyc-candidate-notice-kit": {
    name: "NYC Candidate Notice Kit",
    statute: "NYC Admin. Code \u00A7\u00A7 20-870\u201320-874",
    lawUrl:
      "https://legistar.council.nyc.gov/LegislationDetail.aspx?ID=4344524&GUID=B051915D-A9AC-451E-81F8-6596032FA3F9",
    lawLinkText:
      "Read NYC Admin Code \u00A7\u00A7 20-870\u201320-874 on NYC Council",
    acknowledgment:
      "I have reviewed NYC Administrative Code \u00A7\u00A7 20-870 through 20-874 (Local Law 144 of 2021) and the DCWP implementing rules at 6 RCNY \u00A7 5-300 et seq. I understand that these are compliance templates, not legal advice. I should verify the current regulatory status and consult qualified legal counsel.",
    basePrice: 89,
    skippedSteps: [2, 3, 4],

    documents: [
      "10-Day Advance Notice Template",
      "Alternative Process Workflow",
      "Data Disclosure Response",
    ],
    decisions: [
      ["hiring", "Hiring/Screening"],
      ["promotion", "Promotion"],
    ],
    helpTexts: {
      step2Help:
        "What notice must candidates receive? Under NYC LL144 and DCWP rules, employers must notify candidates at least 10 business days before using an AEDT and offer an alternative selection process. Candidates may also request disclosure of the data types used. This kit provides all three required documents.",
      step2Intro:
        "List each AEDT for which you need to send candidate advance notices and manage alternative process requests.",
      step2DecisionHelp:
        "Check whether this AEDT is used for hiring/screening, promotion, or both.",
      step2MultiHelp:
        "If you use multiple AEDTs, each requires its own candidate notice process. List each separately.",
      step3BiasHelp:
        "Candidates who request the alternative process may be doing so due to concerns about bias. Your alternative process workflow should document how you evaluate those cases.",
      step4Help:
        "This section captures how your organization manages candidate notices and alternative process requests. DCWP rules specify timing and delivery requirements.",
      step5Intro:
        "This contact will be listed on candidate notices and data disclosure responses as the designated NYC LL144 compliance contact.",
    },
  },
  // ── Virginia Add-Ons ─────────────────────────────────────────
  "va-consumer-rights-kit": {
    name: "VA Consumer Rights Kit",
    statute: "Va. Code \u00A7\u00A7 59.1-575\u201359.1-584",
    lawUrl: "https://law.lis.virginia.gov/vacodefull/title59.1/chapter53/",
    lawLinkText: "Read Va. Code \u00A7\u00A7 59.1-575 through 59.1-584 on law.lis.virginia.gov",
    acknowledgment:
      "I have reviewed Va. Code \u00A7\u00A7 59.1-575 through 59.1-584 (Virginia Consumer Data Protection Act) and understand that these are compliance templates, not legal advice. I should verify the current regulatory status and consult qualified legal counsel.",
    basePrice: 99,
    skippedSteps: [2, 3, 4],

    documents: [
      "Rights Request Intake Form",
      "Appeal Workflow",
      "AG Complaint Referral Notice",
    ],
    decisions: [
      ["profiling", "Profiling/Automated Decisions"],
      ["data_sales", "Data Sales"],
      ["sensitive_data", "Sensitive Data Processing"],
    ],
    helpTexts: {
      step2Help:
        "What consumer rights exist under Virginia CDPA? Virginia consumers have rights to access, correct, delete, opt out of profiling, and appeal denied requests (\u00A7 59.1-578(B)). If the appeal is denied, consumers may complain to the AG. This kit provides the intake form, appeal workflow, and AG referral notice.",
      step2Intro:
        "List each AI or data processing system subject to consumer rights requests under Virginia CDPA.",
      step2DecisionHelp:
        "Check every category where this system processes Virginia consumer data. This determines which consumer rights apply.",
      step2MultiHelp:
        "If consumers can submit rights requests about multiple systems, list each separately.",
      step3BiasHelp:
        "Consumers who opt out of profiling due to bias concerns should be tracked separately. Your appeal workflow should address bias-related challenges.",
      step4Help:
        "This section captures how your organization handles consumer rights requests and appeals. Virginia law requires responding within 45 days and providing an appeal mechanism for denied requests.",
      step5Intro:
        "This contact will be listed on consumer rights intake forms and appeal responses as the designated Virginia CDPA privacy contact.",
    },
  },
  "va-profiling-assessment-kit": {
    name: "VA Profiling Assessment Kit",
    statute: "Va. Code \u00A7\u00A7 59.1-575\u201359.1-584",
    lawUrl: "https://law.lis.virginia.gov/vacodefull/title59.1/chapter53/",
    lawLinkText: "Read Va. Code \u00A7\u00A7 59.1-575 through 59.1-584 on law.lis.virginia.gov",
    acknowledgment:
      "I have reviewed Va. Code \u00A7\u00A7 59.1-575 through 59.1-584 (Virginia Consumer Data Protection Act) and understand that these are compliance templates, not legal advice. I should verify the current regulatory status and consult qualified legal counsel.",
    basePrice: 109,
    skippedSteps: [2, 3, 4],

    documents: [
      "Profiling Assessment Template",
      "Benefits-Risks Worksheet",
      "Sensitive Data Consent Form",
    ],
    decisions: [
      ["profiling", "Profiling/Automated Decisions"],
      ["sensitive_data", "Sensitive Data Processing"],
      ["targeted_ads", "Targeted Advertising"],
    ],
    helpTexts: {
      step2Help:
        "When is a profiling assessment required? Under Virginia CDPA (\u00A7 59.1-581), controllers must conduct data protection assessments for processing activities that present heightened risk, including profiling for consequential decisions and processing sensitive data. This kit provides the assessment template, benefits-risks worksheet, and consent form.",
      step2Intro:
        "List each AI or data processing system that uses profiling or sensitive data processing subject to Virginia CDPA assessment requirements.",
      step2DecisionHelp:
        "Check every category where this system uses profiling or processes sensitive data about Virginia consumers.",
      step2MultiHelp:
        "Each profiling activity may require its own assessment under \u00A7 59.1-581. List each system separately.",
      step3BiasHelp:
        "Your profiling assessment must weigh the benefits and risks of the processing, including the risk of discriminatory outcomes. Document your bias analysis in the benefits-risks worksheet.",
      step4Help:
        "This section captures how your organization oversees profiling activities. Assessments must be retained and made available to the AG upon request.",
      step5Intro:
        "This contact will be listed as the privacy assessment coordinator responsible for maintaining assessment records under Virginia CDPA.",
    },
  },
  "va-controller-processor-kit": {
    name: "VA Controller-Processor Kit",
    statute: "Va. Code \u00A7\u00A7 59.1-575\u201359.1-584",
    lawUrl: "https://law.lis.virginia.gov/vacodefull/title59.1/chapter53/",
    lawLinkText: "Read Va. Code \u00A7\u00A7 59.1-575 through 59.1-584 on law.lis.virginia.gov",
    acknowledgment:
      "I have reviewed Va. Code \u00A7\u00A7 59.1-575 through 59.1-584 (Virginia Consumer Data Protection Act) and understand that these are compliance templates, not legal advice. I should verify the current regulatory status and consult qualified legal counsel.",
    basePrice: 89,
    skippedSteps: [2, 3, 4],

    documents: [
      "Processor DPA Template",
      "Processor Audit Questionnaire",
      "Subcontractor Flowdown Addendum",
    ],
    decisions: [
      ["data_processing", "Data Processing Agreements"],
      ["profiling", "Profiling/Automated Decisions"],
      ["sensitive_data", "Sensitive Data Processing"],
    ],
    helpTexts: {
      step2Help:
        "What contracts are required with AI processors? Under Virginia CDPA (\u00A7 59.1-580), controllers must enter into binding contracts with processors. These contracts must specify processing instructions, confidentiality, security, subcontractor approval, and audit rights. This kit provides the DPA template, audit questionnaire, and subcontractor flowdown.",
      step2Intro:
        "List each AI vendor or data processor you need to contract with under Virginia CDPA.",
      step2DecisionHelp:
        "Check every category of processing this vendor performs on your behalf. This determines the required contract provisions.",
      step2MultiHelp:
        "If you use multiple AI vendors as processors, each requires its own DPA under \u00A7 59.1-580. List each separately.",
      step3BiasHelp:
        "Your processor audit questionnaire should ask vendors about their bias testing practices. Processors who perform profiling on your behalf share responsibility for discriminatory outputs.",
      step4Help:
        "This section captures your oversight structure for processor relationships. Virginia CDPA requires controllers to verify that processors meet their contractual obligations.",
      step5Intro:
        "This contact will be listed as the vendor compliance lead responsible for managing processor DPAs and subcontractor flowdown agreements.",
    },
  },
  // ── EU Add-Ons ───────────────────────────────────────────────
  "eu-fria-kit": {
    name: "EU Fundamental Rights Impact Assessment Kit",
    statute: "Regulation (EU) 2024/1689",
    lawUrl:
      "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32024R1689",
    lawLinkText: "Read Regulation (EU) 2024/1689 on EUR-Lex",
    acknowledgment:
      "I have reviewed Regulation (EU) 2024/1689 (the EU Artificial Intelligence Act). I understand that these are compliance templates, not legal advice. This regulation has phased effective dates from February 2025 through August 2027. I should verify the current regulatory status and consult qualified legal counsel.",
    basePrice: 149,
    skippedSteps: [2, 3, 4],

    documents: [
      "FRIA Template",
      "Authority Notification Letter",
      "FRIA Update Trigger Assessment",
    ],
    decisions: [
      ["employment", "Employment/HR"],
      ["education", "Education"],
      ["financial", "Credit/Financial"],
    ],
    helpTexts: {
      step2Help:
        "When is a Fundamental Rights Impact Assessment required? Under EU AI Act Art. 27, deployers of high-risk AI systems must conduct a FRIA before deployment, covering impacts on fundamental rights including non-discrimination, privacy, and dignity. This kit provides the FRIA template, notification letter, and update trigger assessment.",
      step2Intro:
        "List each high-risk AI system requiring a Fundamental Rights Impact Assessment under the EU AI Act.",
      step2DecisionHelp:
        "Check the Annex III category that applies to this system. The category determines which fundamental rights are most at risk.",
      step2MultiHelp:
        "Each high-risk AI system requires its own FRIA. List all systems separately.",
      step3BiasHelp:
        "Fundamental rights impacts include the risk of discrimination. Your FRIA must assess algorithmic bias as a core component of the fundamental rights analysis.",
      step4Help:
        "This section captures how your organization\u2019s human oversight mechanisms protect fundamental rights in AI deployment.",
      step5Intro:
        "This contact will be listed as the FRIA coordinator responsible for conducting assessments, authority notifications, and update reviews.",
    },
  },
  "eu-post-market-kit": {
    name: "EU Post-Market Monitoring Kit",
    statute: "Regulation (EU) 2024/1689",
    lawUrl:
      "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32024R1689",
    lawLinkText: "Read Regulation (EU) 2024/1689 on EUR-Lex",
    acknowledgment:
      "I have reviewed Regulation (EU) 2024/1689 (the EU Artificial Intelligence Act). I understand that these are compliance templates, not legal advice. This regulation has phased effective dates from February 2025 through August 2027. I should verify the current regulatory status and consult qualified legal counsel.",
    basePrice: 139,
    skippedSteps: [2, 3, 4],

    documents: [
      "Post-Market Monitoring Plan",
      "Serious Incident Report",
      "Log Retention Policy",
    ],
    decisions: [
      ["employment", "Employment/HR"],
      ["education", "Education"],
      ["financial", "Credit/Financial"],
    ],
    helpTexts: {
      step2Help:
        "What is post-market monitoring? Under EU AI Act Art. 72, providers of high-risk AI systems must establish and implement a post-market monitoring plan to collect and analyze data on system performance after deployment, and report serious incidents. This kit provides the monitoring plan, incident report, and log retention policy.",
      step2Intro:
        "List each high-risk AI system requiring post-market monitoring under the EU AI Act.",
      step2DecisionHelp:
        "Check the Annex III category for this system. Different categories have different monitoring and incident reporting thresholds.",
      step2MultiHelp:
        "Each high-risk AI system requires its own post-market monitoring plan. List all systems separately.",
      step3BiasHelp:
        "Post-market monitoring must detect unexpected bias or discrimination that emerges in real-world use. Your monitoring plan should include statistical tracking of outcomes across demographic groups.",
      step4Help:
        "This section captures your organization\u2019s current monitoring capabilities and log retention practices. The EU AI Act requires logs to be automatically generated by the system where technically feasible.",
      step5Intro:
        "This contact will be listed as the post-market monitoring coordinator responsible for the monitoring plan, incident reporting, and log retention compliance.",
    },
  },
  "eu-human-oversight-kit": {
    name: "EU Human Oversight Implementation Kit",
    statute: "Regulation (EU) 2024/1689",
    lawUrl:
      "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32024R1689",
    lawLinkText: "Read Regulation (EU) 2024/1689 on EUR-Lex",
    acknowledgment:
      "I have reviewed Regulation (EU) 2024/1689 (the EU Artificial Intelligence Act). I understand that these are compliance templates, not legal advice. This regulation has phased effective dates from February 2025 through August 2027. I should verify the current regulatory status and consult qualified legal counsel.",
    basePrice: 99,
    skippedSteps: [2, 3, 4],

    documents: [
      "Oversight Implementation Plan",
      "Worker Notification Template",
      "Oversight Decision Log",
    ],
    decisions: [
      ["employment", "Employment/HR"],
      ["education", "Education"],
      ["financial", "Credit/Financial"],
    ],
    helpTexts: {
      step2Help:
        "What human oversight is required? Under EU AI Act Art. 14, high-risk AI systems must be designed to enable natural persons to oversee, understand, monitor, and correct AI outputs. Deployers must assign oversight to competent individuals and document their oversight activities. This kit provides the implementation plan, worker notification, and decision log.",
      step2Intro:
        "List each high-risk AI system for which you need to implement and document human oversight measures.",
      step2DecisionHelp:
        "Check the Annex III category for this system. The oversight measures required depend on the system\u2019s risk profile and decision area.",
      step2MultiHelp:
        "Each high-risk AI system may require different oversight measures. List systems separately to tailor the implementation plan.",
      step3BiasHelp:
        "Human overseers must be specifically trained to detect potential bias and discrimination in AI outputs. Your implementation plan should document bias-detection as a core oversight competency.",
      step4Help:
        "This section captures your current oversight structure and the individuals responsible for AI supervision. EU AI Act Art. 14 requires oversight persons to have the authority to intervene and stop the system.",
      step5Intro:
        "This contact will be listed as the human oversight program lead responsible for assigning oversight roles, delivering training, and maintaining the oversight decision log.",
    },
  },
  "eu-registration-transparency": {
    name: "EU Registration & Transparency Kit",
    statute: "Regulation (EU) 2024/1689",
    lawUrl:
      "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32024R1689",
    lawLinkText: "Read Regulation (EU) 2024/1689 on EUR-Lex",
    acknowledgment:
      "I have reviewed Regulation (EU) 2024/1689 (the EU Artificial Intelligence Act). I understand that these are compliance templates, not legal advice. This regulation has phased effective dates from February 2025 through August 2027. I should verify the current regulatory status and consult qualified legal counsel.",
    basePrice: 89,
    skippedSteps: [2, 3, 4],

    documents: [
      "Database Registration Checklist",
      "Transparency Disclosure Templates",
      "Provider Documentation Verification",
    ],
    decisions: [
      ["employment", "Employment/HR"],
      ["education", "Education"],
      ["financial", "Credit/Financial"],
    ],
    helpTexts: {
      step2Help:
        "What registration is required? Under EU AI Act Art. 49, providers and deployers of high-risk AI systems must register in the EU database maintained by the Commission before placing the system on the market or putting it into service. This kit provides the registration checklist, transparency disclosure templates, and provider documentation verification.",
      step2Intro:
        "List each high-risk AI system requiring EU database registration and transparency disclosures.",
      step2DecisionHelp:
        "Check the Annex III category for this system. The category determines which registration fields and transparency obligations apply.",
      step2MultiHelp:
        "Each high-risk AI system must be registered separately in the EU database. List all systems.",
      step3BiasHelp:
        "Transparency disclosures must include information about testing for bias and the measures taken to minimize discriminatory outcomes. Your provider documentation verification should confirm bias testing was conducted.",
      step4Help:
        "This section captures the provider information required for EU database registration. Deployers must verify that providers have completed their registration obligations.",
      step5Intro:
        "This contact will be listed as the EU registration coordinator responsible for database submissions, transparency disclosures, and provider documentation review.",
    },
  },
};
