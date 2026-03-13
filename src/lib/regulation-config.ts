import type { RegulationConfig } from "./pdf-types";

export const REGULATION_CONFIG: Record<string, RegulationConfig> = {
  "illinois-hb3773": {
    name: "Illinois HB3773",
    statute: "775 ILCS 5/2-102(L)",
    lawUrl:
      "https://www.ilga.gov/legislation/ilcs/fulltext?DocName=077500050K2-102",
    lawLinkText: "Read 775 ILCS 5/2-102 on ilga.gov",
    acknowledgment:
      'I have reviewed 775 ILCS 5/2-102(L) and understand that these are compliance templates, not legal advice. I understand that the IDHR implementing rules (Subpart J) are proposed and pending formal adoption, and that I should verify the current regulatory status and consult qualified legal counsel.',
    basePrice: 299,
    trainingKitAvailable: true,
    trainingKitPrice: 47,
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
        '<strong>What counts as an \u201cAI system\u201d?</strong> Any software that uses artificial intelligence, machine learning, or automated decision-making in your hiring or employment process. Common examples: resume screening tools (like HireVue, Pymetrics), automated scheduling software, performance review platforms with AI features, or chatbots that interact with job applicants. If you\u2019re not sure whether a tool counts \u2014 include it. It\u2019s better to disclose more than less.',
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
        "This information will appear on your compliance documents as specified by proposed IDHR Subpart J notice element 5.",
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
    trainingKitAvailable: false,
    trainingKitPrice: 0,
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
    trainingKitAvailable: false,
    trainingKitPrice: 0,
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
        "<strong>What counts as an AI tool?</strong> Any software that uses artificial intelligence, machine learning, or generative AI. Common examples: ChatGPT, Microsoft Copilot, GitHub Copilot, Grammarly, AI-powered CRM features, automated scheduling tools, or any tool that generates text, images, code, or recommendations. If you\u2019re not sure \u2014 include it.",
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
      "I understand that these are due diligence templates aligned with NIST AI RMF and applicable state laws, not legal advice. I should consult qualified legal counsel for my specific vendor contracts.",
    basePrice: 249,
    trainingKitAvailable: false,
    trainingKitPrice: 0,
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
        "<strong>What counts as a vendor AI system?</strong> Any third-party software or service that uses AI to process data or make recommendations for your business. This includes HR platforms with AI screening, CRM tools with AI features, lending or insurance models from vendors, and any SaaS product marketed as \u201cAI-powered.\u201d",
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
      "I understand that these are audit templates aligned with NYC LL144, EEOC adverse impact standards, and NIST AI RMF. They are not legal advice. I should consult qualified legal counsel and a qualified auditor for my specific situation.",
    basePrice: 149,
    trainingKitAvailable: false,
    trainingKitPrice: 0,
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
        "<strong>Which AI systems need a bias audit?</strong> Any AI system that makes or influences decisions about people. The EEOC uses the \u201c4/5 rule\u201d (80% threshold) to evaluate adverse impact. NYC LL144 requires annual independent bias audits for automated employment decision tools. If your system affects hiring, lending, insurance, or housing \u2014 it should be audited.",
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
      "I understand that these are incident response templates aligned with NIST AI RMF, California TFAIA, and EU AI Act requirements. They are not legal advice. I should consult qualified legal counsel for my specific regulatory obligations.",
    basePrice: 149,
    trainingKitAvailable: false,
    trainingKitPrice: 0,
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
        "<strong>Which AI systems need incident response coverage?</strong> Any AI system that could cause harm if it malfunctions, produces biased outputs, or exposes data. California TFAIA requires frontier AI developers to report safety incidents within 15 days. The EU AI Act requires serious incident reporting for high-risk systems. Even without legal requirements, an incident response plan is best practice.",
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
};
