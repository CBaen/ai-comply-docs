export interface Regulation {
  slug: string;
  state: string;
  name: string;
  shortName: string;
  citation: string;
  citationUrl: string;
  status: "in-effect" | "effective-soon" | "proposed";
  effectiveDate: string;
  tier: "state" | "federal" | "universal";
  category: string;
  price: number;
  stripePriceId: string;
  documentCount: number;
  description: string;
  penaltySummary: string;
  maxPenalty: string;
  appliesToSummary: string;
  keywords: string[];
  documents: string[];
  ready: boolean;
}

export const regulations: Regulation[] = [
  {
    slug: "illinois-hb3773",
    state: "Illinois",
    name: "Illinois HB3773 — AI in Employment Decisions",
    shortName: "Illinois HB3773",
    citation: "775 ILCS 5/2-102(L)",
    citationUrl: "https://www.ilga.gov/legislation/ilcs/documents/077500050K2-102.htm",
    status: "in-effect",
    effectiveDate: "January 1, 2026",
    tier: "state",
    category: "Employment",
    price: 299,
    stripePriceId: "price_1RGHfHP8GJFDgsBh5s78HooB",
    documentCount: 6,
    description: "Complete compliance package for Illinois employers using AI in employment decisions. Addresses 775 ILCS 5/2-102(L) requirements and proposed IDHR Subpart J notice elements.",
    penaltySummary: "IDHR civil penalties of $16,000 (first), $42,500 (second within 5 years), $70,000 (two+ within 7 years) per violation. Private lawsuits with actual damages and attorney fees.",
    maxPenalty: "$70,000 per violation",
    appliesToSummary: "Any Illinois employer using AI in recruitment, hiring, promotion, discharge, discipline, tenure, or terms/conditions of employment.",
    keywords: ["illinois", "hb3773", "ai hiring", "employment", "idhr", "775 ilcs"],
    documents: [
      "Employee & Applicant AI Notification",
      "AI System Inventory",
      "Impact Assessment Framework",
      "Human Oversight Protocol",
      "Compliance Checklist",
      "Accommodation Request Form",
    ],
    ready: true,
  },
  {
    slug: "colorado-sb24-205",
    state: "Colorado",
    name: "Colorado SB 24-205 — AI Consumer Protections",
    shortName: "Colorado SB 24-205",
    citation: "C.R.S. § 6-1-1701 et seq.",
    citationUrl: "https://leg.colorado.gov/bills/sb24-205",
    status: "effective-soon",
    effectiveDate: "June 30, 2026",
    tier: "state",
    category: "Consumer Protection",
    price: 449,
    stripePriceId: "price_colorado_placeholder",
    documentCount: 8,
    description: "Complete compliance package for Colorado deployers of high-risk AI systems. Covers algorithmic discrimination prevention, impact assessments, consumer notifications, and affirmative defense documentation.",
    penaltySummary: "Attorney General enforcement under Colorado Consumer Protection Act. Per-violation civil penalties. No private right of action.",
    maxPenalty: "Per-violation CPA penalties",
    appliesToSummary: "Any deployer of a high-risk AI system that makes consequential decisions about Colorado consumers in employment, education, financial services, housing, insurance, or legal services.",
    keywords: ["colorado", "sb24-205", "high-risk ai", "consumer protection", "algorithmic discrimination"],
    documents: [
      "Risk Management Policy",
      "Impact Assessment",
      "Consumer Notification Template",
      "Consumer Disclosure Statement",
      "Algorithmic Discrimination Prevention Plan",
      "Human Oversight Protocol",
      "Compliance Checklist",
      "Affirmative Defense Documentation",
    ],
    ready: true,
  },
  {
    slug: "texas-traiga",
    state: "Texas",
    name: "Texas TRAIGA — Responsible AI Governance Act",
    shortName: "Texas TRAIGA",
    citation: "Tex. Bus. & Com. Code Ch. 120",
    citationUrl: "https://capitol.texas.gov/BillLookup/History.aspx?LegSess=89R&Bill=HB1709",
    status: "in-effect",
    effectiveDate: "September 1, 2025",
    tier: "state",
    category: "AI Governance",
    price: 499,
    stripePriceId: "",
    documentCount: 7,
    description: "Compliance documentation for Texas deployers of high-risk AI systems under TRAIGA. Covers impact assessments, governance frameworks, consumer disclosure, and incident response.",
    penaltySummary: "Attorney General enforcement with civil penalties up to $200,000 per violation. 30-day cure period.",
    maxPenalty: "$200,000 per violation",
    appliesToSummary: "Any deployer of a high-risk AI system operating in Texas that makes consequential decisions affecting Texans.",
    keywords: ["texas", "traiga", "hb1709", "high-risk ai", "ai governance"],
    documents: [
      "AI Governance Policy",
      "Impact Assessment",
      "Consumer Disclosure Notice",
      "Risk Management Framework",
      "Human Oversight Protocol",
      "Incident Response Plan",
      "Compliance Checklist",
    ],
    ready: false,
  },
  {
    slug: "california-ccpa-admt",
    state: "California",
    name: "California CCPA ADMT — Automated Decision-Making",
    shortName: "California CCPA ADMT",
    citation: "Cal. Civ. Code § 1798.100 et seq.",
    citationUrl: "https://cppa.ca.gov/regulations/admt.html",
    status: "proposed",
    effectiveDate: "TBD (proposed rulemaking)",
    tier: "state",
    category: "Consumer Privacy",
    price: 499,
    stripePriceId: "",
    documentCount: 7,
    description: "Pre-compliance documentation for California's proposed ADMT regulations under CCPA/CPRA. Covers opt-out mechanisms, pre-use notices, impact assessments, and consumer rights.",
    penaltySummary: "CPPA enforcement with administrative fines of $2,500 per violation, $7,500 for intentional violations. Private right of action for data breaches.",
    maxPenalty: "$7,500 per intentional violation",
    appliesToSummary: "Any business subject to CCPA that uses automated decision-making technology to make significant decisions about California consumers.",
    keywords: ["california", "ccpa", "cpra", "admt", "automated decision-making", "privacy"],
    documents: [
      "Pre-Use Notice Template",
      "Opt-Out Mechanism Documentation",
      "ADMT Impact Assessment",
      "Consumer Rights Response Procedures",
      "Data Processing Inventory",
      "Human Oversight Protocol",
      "Compliance Checklist",
    ],
    ready: false,
  },
  {
    slug: "employee-ai-policy",
    state: "Federal",
    name: "Employee AI Acceptable Use Policy",
    shortName: "AI Use Policy",
    citation: "NIST AI RMF + EEOC Guidance",
    citationUrl: "https://www.nist.gov/artificial-intelligence/executive-order-safe-secure-and-trustworthy-artificial-intelligence",
    status: "in-effect",
    effectiveDate: "Available now",
    tier: "universal",
    category: "Internal Policy",
    price: 199,
    stripePriceId: "",
    documentCount: 3,
    description: "Internal AI acceptable use policy template aligned with NIST AI Risk Management Framework and EEOC guidance. Covers employee obligations, prohibited uses, data handling, and reporting procedures.",
    penaltySummary: "Reduces organizational liability. Required foundation for most state-specific compliance programs.",
    maxPenalty: "Liability reduction",
    appliesToSummary: "Any organization where employees use AI tools in their work. Foundational document for all other compliance programs.",
    keywords: ["ai policy", "acceptable use", "nist", "eeoc", "employee policy", "universal"],
    documents: [
      "AI Acceptable Use Policy",
      "Employee AI Training Acknowledgment",
      "AI Incident Reporting Form",
    ],
    ready: false,
  },
  {
    slug: "vendor-ai-due-diligence",
    state: "Federal",
    name: "Vendor AI Due Diligence Kit",
    shortName: "Vendor Due Diligence",
    citation: "NIST AI RMF MAP Function",
    citationUrl: "https://airc.nist.gov/AI_RMF_Knowledge_Base/Playbook",
    status: "in-effect",
    effectiveDate: "Available now",
    tier: "universal",
    category: "Vendor Management",
    price: 249,
    stripePriceId: "",
    documentCount: 4,
    description: "Vendor evaluation framework for organizations procuring AI systems. Covers due diligence questionnaires, contract addendums, risk assessment, and ongoing monitoring requirements.",
    penaltySummary: "Required by multiple state laws (CO, TX, IL) for deployers using third-party AI systems. Protects against downstream liability.",
    maxPenalty: "Liability protection",
    appliesToSummary: "Any organization purchasing or licensing AI systems from third-party vendors.",
    keywords: ["vendor", "due diligence", "procurement", "third-party ai", "risk assessment"],
    documents: [
      "Vendor AI Due Diligence Questionnaire",
      "AI Vendor Contract Addendum",
      "Vendor Risk Assessment Template",
      "Ongoing Monitoring Checklist",
    ],
    ready: false,
  },
];

export function getRegulation(slug: string): Regulation | undefined {
  return regulations.find((r) => r.slug === slug);
}

export function getReadyRegulations(): Regulation[] {
  return regulations.filter((r) => r.ready);
}

export function getRegulationsByTier(tier: Regulation["tier"]): Regulation[] {
  return regulations.filter((r) => r.tier === tier);
}
