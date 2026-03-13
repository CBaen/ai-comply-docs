import type { RegulationConfig } from "./pdf-types";

export const REGULATION_CONFIG: Record<string, RegulationConfig> = {
  "illinois-hb3773": {
    name: "Illinois HB3773",
    statute: "775 ILCS 5/2-102(L)",
    lawUrl:
      "https://www.ilga.gov/legislation/ilcs/documents/077500050K2-102.htm",
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
};
