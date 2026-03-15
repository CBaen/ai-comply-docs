import { NextResponse } from "next/server";
import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

const MAX_RECIPIENTS = 3;
const FROM_ADDRESS = "AI Compliance Documents <noreply@aicompliancedocuments.com>";

const REGULATION_EMAIL: Record<
  string,
  { title: string; statute: string; description: string; steps: string[]; reminder: string }
> = {
  "illinois-hb3773": {
    title: "Your Illinois AI Compliance Package",
    statute: "Illinois HB3773 (775 ILCS 5/2-102(L))",
    description:
      "AI compliance documentation templates, aligned with Illinois HB3773 (775 ILCS 5/2-102(L)) requirements. Review each document with your legal team before deployment.",
    steps: [
      "<strong>Post the Employee Notification</strong> where staff can see it — breakroom, intranet, or onboarding packet.",
      "<strong>Have HR review the Impact Assessment</strong> and designate your Human Oversight contact.",
      "<strong>File everything.</strong> IDHR can request proof of compliance. These documents are your evidence.",
    ],
    reminder:
      "Illinois law requires written notice to employees and applicants before AI is used in employment decisions. This law has been in effect since January 1, 2026.",
  },
  "colorado-sb24-205": {
    title: "Your Colorado AI Compliance Package",
    statute: "Colorado SB 24-205 (C.R.S. §§ 6-1-1701–1707)",
    description:
      "AI compliance documentation templates, aligned with Colorado SB 24-205 (C.R.S. §§ 6-1-1701–1707) requirements. Review each document with your legal team before deployment.",
    steps: [
      "<strong>Review the Risk Management Policy</strong> with your compliance team and assign responsible parties.",
      "<strong>Complete the Impact Assessment</strong> for each high-risk AI system you deploy.",
      "<strong>Post the Consumer Notice &amp; Transparency Statement</strong> on your website.",
      "<strong>File everything.</strong> The Colorado AG can request proof of compliance. These documents are your evidence.",
    ],
    reminder:
      "Colorado law requires deployers of high-risk AI systems to use reasonable care to protect consumers from algorithmic discrimination. This law takes effect June 30, 2026. Penalties: up to $20,000 per violation under the Colorado Consumer Protection Act (C.R.S. § 6-1-112).",
  },
  "employee-ai-policy": {
    title: "Your Employee AI Acceptable Use Policy",
    statute: "NIST AI RMF + EEOC Guidance",
    description:
      "employee AI policy documents, aligned with the NIST AI Risk Management Framework and EEOC guidance. All three documents are included.",
    steps: [
      "<strong>Review the Acceptable Use Policy</strong> with your legal team, then distribute to all employees.",
      "<strong>Schedule AI training</strong> and use the Training Acknowledgment form to track completion.",
      "<strong>Make the Incident Reporting Form accessible</strong> &mdash; link it in your intranet, employee handbook, or Slack.",
    ],
    reminder:
      "While no single federal law mandates an employee AI policy, multiple state laws (CO, IL, TX) and the NIST AI RMF recommend documented governance. A clear policy also protects against vicarious liability.",
  },
  "vendor-ai-due-diligence": {
    title: "Your Vendor AI Due Diligence Kit",
    statute: "NIST AI RMF + State Deployer Requirements",
    description:
      "vendor AI due diligence documents, aligned with the NIST AI RMF and state deployer requirements (CO SB205, IL HB3773, TX HB149). All four documents are included.",
    steps: [
      "<strong>Send the Due Diligence Questionnaire</strong> to each AI vendor before signing or renewing contracts.",
      "<strong>Use the Contract Addendum</strong> as a starting point for your legal team to negotiate AI-specific contract terms.",
      "<strong>Complete the Risk Assessment</strong> for each vendor and file it with your procurement records.",
      "<strong>Set calendar reminders</strong> for the quarterly and annual monitoring items in the Checklist.",
    ],
    reminder:
      "Colorado SB205 and Texas TRAIGA require deployers to evaluate the AI systems they procure from vendors. These documents demonstrate the due diligence that regulators expect.",
  },
  "ai-bias-audit-template": {
    title: "Your AI Bias Audit Templates",
    statute: "NYC LL144 + EEOC Uniform Guidelines",
    description:
      "bias audit templates, aligned with NYC Local Law 144 annual audit requirements and EEOC Uniform Guidelines (29 C.F.R. § 1607). All three documents are included.",
    steps: [
      "<strong>Use the Impact Ratio Worksheet</strong> to calculate adverse impact ratios for each protected class.",
      "<strong>Document results in the Bias Audit Report</strong> &mdash; NYC LL144 requires annual publication of audit summaries.",
      "<strong>If adverse impact is found,</strong> use the Remediation Plan to document corrective actions and timelines.",
    ],
    reminder:
      "NYC LL144 requires annual bias audits for automated employment decision tools. The EEOC 4/5 (80%) rule is the federal standard for evaluating adverse impact. Proactive auditing is the strongest evidence of good faith.",
  },
  "ai-incident-response-plan": {
    title: "Your AI Incident Response Plan",
    statute: "NIST AI RMF + California TFAIA + EU AI Act",
    description:
      "AI incident response documents, aligned with the NIST AI RMF Manage function, California TFAIA 15-day reporting requirements, and EU AI Act serious incident obligations. All four documents are included.",
    steps: [
      "<strong>Assign your Incident Response Team.</strong> Fill in the Roles &amp; Responsibilities section of the Incident Response Plan and make sure every team member has a copy.",
      "<strong>Print and distribute the Classification Matrix.</strong> Anyone who might identify an AI incident should know how to use it.",
      "<strong>Store the Incident Report Template</strong> where it's accessible day or night — your ticketing system, SharePoint, or a shared drive.",
      "<strong>Schedule your first tabletop exercise.</strong> The plan requires one annually. Set the date now.",
    ],
    reminder:
      "California TFAIA requires incident reporting within 15 days of identification. EU AI Act Article 73 requires serious incident notification as soon as possible. Document your response process before you need it.",
  },
  "nyc-local-law-144": {
    title: "Your NYC Local Law 144 Compliance Package",
    statute: "NYC Admin. Code \u00A7\u00A7 20-870\u201320-874 (Local Law 144)",
    description:
      "compliance documentation templates aligned with NYC Local Law 144 (NYC Admin. Code \u00A7\u00A7 20-870\u201320-874) requirements. Review each document with your legal team before use.",
    steps: [
      "<strong>Review the Bias Audit Report Template</strong> with your independent auditor before scheduling your annual audit.",
      "<strong>Post the Bias Audit Summary</strong> on your website at least 10 business days before using each AEDT, per DCWP rules.",
      "<strong>Send the Candidate/Employee Notification</strong> before using an AEDT on any job applicant or employee.",
      "<strong>File everything.</strong> DCWP may request audit documentation. These documents are your evidence of compliance.",
    ],
    reminder:
      "NYC LL144 requires annual independent bias audits and public posting of audit summaries for all automated employment decision tools. DCWP enforcement has been active since July 5, 2023 and shifted to proactive investigations in 2026.",
  },
  "texas-tdpsa": {
    title: "Your Texas TDPSA Compliance Package",
    statute: "Tex. Bus. & Com. Code Ch. 541 (Texas Data Privacy and Security Act, HB 4)",
    description:
      "compliance documentation templates aligned with the Texas Data Privacy and Security Act (Tex. Bus. & Com. Code Ch. 541, HB 4) requirements. Review each document with your legal team before deployment. Note: This is separate from the Texas TRAIGA (HB 149, Ch. 551\u2013554).",
    steps: [
      "<strong>Complete the Data Protection Assessment</strong> for each AI system used in profiling, targeted advertising, data sales, or sensitive data processing. Make it available to the Texas AG upon request (\u00A7 541.107(b)).",
      "<strong>Update your Privacy Notice</strong> to include the consumer rights, opt-out disclosures, and contact information required by \u00A7 541.101.",
      "<strong>Execute Data Processing Agreements</strong> with each processor that handles Texas consumer personal data, per \u00A7 541.105.",
      "<strong>File everything.</strong> The Texas AG enforces the TDPSA. These documents demonstrate compliance.",
    ],
    reminder:
      "The Texas Data Privacy and Security Act (Tex. Bus. & Com. Code Ch. 541) has been in effect since July 1, 2024. Attorney General enforcement only (\u00A7 541.151). No private right of action. Permanent 30-day cure period (\u00A7 541.154). Penalty: up to $7,500 per violation (\u00A7 541.155). This law is separate from Texas TRAIGA (HB 149).",
  },
  "delaware-pdpa": {
    title: "Your Delaware PDPA Compliance Package",
    statute: "Del. Code tit. 6, ch. 12D, \u00A7\u00A7 12D-101 through 12D-111 (Delaware PDPA, HB 154)",
    description:
      "compliance documentation templates aligned with the Delaware Personal Data Privacy Act (Del. Code tit. 6, ch. 12D, HB 154) requirements. Review each document with your legal team before deployment. Delaware has the lowest coverage thresholds of any state (35,000 consumers).",
    steps: [
      "<strong>Complete the Data Protection Assessment</strong> for each system used in profiling, targeted advertising, data sales, or sensitive data processing. Make it available to the Delaware AG upon request (\u00A7 12D-109(b)).",
      "<strong>Update your Privacy Notice</strong> to include the consumer rights, opt-out disclosures, and contact information required by \u00A7 12D-106.",
      "<strong>Implement Universal Opt-Out recognition</strong> (e.g., Global Privacy Control) as required by \u00A7 12D-106(e), effective January 1, 2026.",
      "<strong>Execute Data Processing Agreements</strong> with each processor handling Delaware consumer personal data, per \u00A7 12D-108.",
    ],
    reminder:
      "The Delaware Personal Data Privacy Act (Del. Code tit. 6, ch. 12D) has been in effect since January 1, 2025. Attorney General enforcement only (\u00A7 12D-111). No private right of action. 60-day cure period until December 31, 2025; AG discretion after. Penalty: up to $10,000 per violation. Delaware has the lowest coverage thresholds of any state.",
  },
  "multi-state-profiling-assessment": {
    title: "Your Multi-State Profiling Assessment Bundle",
    statute: "15+ State Consumer Privacy Laws Requiring Data Protection Assessments",
    description:
      "multi-state data protection assessment templates covering all major state consumer privacy laws requiring documented profiling assessments. Review each document with your legal team before deployment and verify applicability thresholds for each state.",
    steps: [
      "<strong>Complete the Threshold Analysis Worksheet</strong> to confirm which state laws apply to your organization.",
      "<strong>Review the State Comparison Matrix</strong> to understand each state\u2019s penalties, cure periods, and enforcement mechanisms.",
      "<strong>Complete the Multi-State Data Protection Assessment</strong> for each covered processing activity (profiling, targeted advertising, data sales, sensitive data).",
      "<strong>Update your Privacy Notice</strong> using the Multi-State Privacy Notice Template to cover all applicable states.",
      "<strong>File everything.</strong> State AGs may request assessment documentation. These documents demonstrate compliance.",
    ],
    reminder:
      "State consumer privacy laws are enacted and enforced independently. Key active laws: Texas TDPSA (eff. Jul 1, 2024), Delaware PDPA (eff. Jan 1, 2025), Minnesota MCDPA (eff. Jul 31, 2025). Penalties range from $7,500 (TX) to $25,000 per willful violation (MN). Verify current status of each law with qualified legal counsel.",
  },
  "multi-state-employer-ai-disclosure": {
    title: "Your Multi-State Employer AI Disclosure Kit",
    statute: "IL 775 ILCS 5/2-102(L) + NYC Admin. Code \u00A7\u00A7 20-870\u201320-874 + CO C.R.S. \u00A7\u00A7 6-1-1701\u20131707",
    description:
      "multi-jurisdiction employer AI disclosure templates covering Illinois HB3773, NYC Local Law 144, and Colorado SB24-205. Review each document with your legal team before deployment. Each jurisdiction enforces independently.",
    steps: [
      "<strong>Review the Multi-Jurisdiction Compliance Matrix</strong> to confirm which of the three laws applies to your organization.",
      "<strong>Distribute the Unified Employee/Candidate Notification</strong> and applicable State-Specific Addenda to employees and job applicants before using AI in employment decisions.",
      "<strong>Schedule your annual NYC LL144 bias audit</strong> using the Bias Audit Cross-Reference Guide \u2014 required annually before using any AEDT in NYC.",
      "<strong>Implement the Multi-State Record Retention Policy</strong> to ensure compliance documents are preserved for the required period in each jurisdiction.",
    ],
    reminder:
      "Illinois HB3773 has been in effect since January 1, 2026. NYC Local Law 144 enforcement began July 5, 2023; DCWP proactive investigations increased in 2026. Colorado SB24-205 takes effect June 30, 2026 (per SB 25B-004). IL penalties: up to $70,000 per violation. NYC penalties: up to $1,500/violation/day. CO penalties: up to $20,000 per violation.",
  },
  "virginia-cdpa": {
    title: "Your Virginia CDPA AI Profiling Compliance Package",
    statute: "Va. Code §§ 59.1-575 through 59.1-584",
    description:
      "AI profiling compliance documentation templates, aligned with Virginia Consumer Data Protection Act (Va. Code §§ 59.1-575 through 59.1-584) requirements. Review each document with your legal team before deployment.",
    steps: [
      "<strong>Update your Privacy Notice</strong> to include the consumer rights and opt-out disclosures required by the Virginia CDPA, including targeted advertising and data sales disclosures (§ 59.1-578(D)).",
      "<strong>Complete the Data Protection Assessment</strong> for each system that uses profiling for decisions with legal or similarly significant effects (§ 59.1-580(A)(3)).",
      "<strong>Build your Consumer Rights Request process</strong> using the Procedures template — you have 45 days to respond to consumer requests and must provide an appeals mechanism for denied requests (§ 59.1-578(B)).",
      "<strong>File everything.</strong> The Virginia AG enforces the CDPA and may request Data Protection Assessments (§ 59.1-580(B)). These documents demonstrate compliance.",
    ],
    reminder:
      "The Virginia Consumer Data Protection Act (Va. Code §§ 59.1-575 through 59.1-584) has been in effect since January 1, 2023. The Virginia Attorney General has exclusive enforcement authority (§ 59.1-584(A)); there is no private right of action. The AG must provide a 30-day cure period before seeking civil penalties of up to $7,500 per violation (§ 59.1-584(C)).",
  },
  "connecticut-ctdpa": {
    title: "Your Connecticut CTDPA AI Profiling Compliance Package",
    statute: "Conn. Gen. Stat. §§ 42-515 through 42-525",
    description:
      "AI profiling compliance documentation templates, aligned with Connecticut Data Privacy Act (Conn. Gen. Stat. §§ 42-515 through 42-525, PA 22-15) requirements. Review each document with your legal team before deployment.",
    steps: [
      "<strong>Update your Privacy Notice</strong> to include the consumer rights and opt-out disclosures required by the Connecticut CTDPA (§ 42-520).",
      "<strong>Complete the Data Protection Assessment</strong> for each system that uses profiling for decisions with legal or similarly significant effects (§ 42-522(a)(3)).",
      "<strong>Build your Consumer Rights Request process</strong> using the Procedures template — you have 45 days to respond to consumer requests and must provide an appeals mechanism for denied requests (§ 42-519(b)).",
      "<strong>File everything.</strong> The Connecticut AG enforces the CTDPA and may request Data Protection Assessments (§ 42-522(c)). These documents demonstrate compliance.",
    ],
    reminder:
      "The Connecticut Data Privacy Act (PA 22-15, Conn. Gen. Stat. §§ 42-515 through 42-525) has been in effect since July 1, 2023. The Connecticut Attorney General has exclusive enforcement authority (§ 42-525(a)); there is no private right of action. The mandatory 60-day cure period expired December 31, 2024 — the AG now has enforcement discretion. Penalties: up to $5,000 per violation under CUTPA (§ 42-110o).",
  },
  "oregon-cpa": {
    title: "Your Oregon CPA AI Profiling Compliance Package",
    statute: "ORS §§ 646A.570 through 646A.604",
    description:
      "AI profiling compliance documentation templates, aligned with Oregon Consumer Privacy Act (ORS §§ 646A.570 through 646A.604) requirements. Review each document with your legal team before deployment.",
    steps: [
      "<strong>Update your Privacy Notice</strong> to include consumer rights, opt-out disclosures, and your children’s data consent practices for consumers aged 13–15 (§ 646A.578).",
      "<strong>Complete the Data Protection Assessment</strong> for each system that uses profiling for decisions with legal or similarly significant effects (§ 646A.586(1)(a)).",
      "<strong>Build your Consumer Rights Request process</strong> using the Procedures template — you have 45 days to respond to consumer requests and must provide an appeals mechanism for denied requests (§ 646A.576(2)(b)).",
      "<strong>Implement consent collection</strong> for consumers aged 13–15 before processing their data for targeted advertising or data sales (§ 646A.576(1)(c)).",
    ],
    reminder:
      "The Oregon Consumer Privacy Act (ORS §§ 646A.570 through 646A.604) has been in effect since July 1, 2024. The Oregon Attorney General has enforcement authority (§ 646A.604); there is no private right of action. A 30-day cure period applies until January 1, 2026 (§ 646A.604(2)). Penalties: up to $7,500 per violation under UTPA (ORS § 646.642).",
  },
  "minnesota-mcdpa": {
    title: "Your Minnesota MCDPA Compliance Package",
    statute: "Minn. Stat. \u00A7\u00A7 325M.10\u2013325M.21",
    description:
      "compliance documentation templates aligned with the Minnesota Consumer Data Privacy Act (Minn. Stat. \u00A7\u00A7 325M.10\u2013325M.21) requirements. Review each document with your legal team before deployment.",
    steps: [
      "<strong>Update your Privacy Notice</strong> to include the consumer rights and opt-out disclosures required by the Minnesota MCDPA.",
      "<strong>Build your Consumer Rights Request process</strong> using the Procedures template \u2014 you have 45 days to respond to consumer requests.",
      "<strong>Complete the Data Protection Impact Assessment</strong> for each system that uses profiling for consequential decisions.",
      "<strong>File everything.</strong> The Minnesota AG enforces the MCDPA. These documents demonstrate compliance.",
    ],
    reminder:
      "The Minnesota Consumer Data Privacy Act (Minn. Stat. \u00A7\u00A7 325M.10\u2013325M.21) has been in effect since July 31, 2025. The Minnesota Attorney General has exclusive enforcement authority (\u00A7 325M.20(b)). There is no private right of action.",
  },
  "indiana-icdpa": {
    title: "Your Indiana ICDPA Compliance Package",
    statute: "IC 24-15 (Indiana Consumer Data Protection Act)",
    description:
      "compliance documentation templates aligned with the Indiana Consumer Data Protection Act (IC 24-15, effective January 1, 2026) requirements. Review each document with your legal team before deployment.",
    steps: [
      "<strong>Update your Privacy Notice</strong> to include the consumer rights and opt-out disclosures required by the Indiana ICDPA (IC 24-15).",
      "<strong>Build your Consumer Rights Request process</strong> using the Procedures template \u2014 you have 45 days to respond to consumer requests.",
      "<strong>Complete the Data Protection Assessment</strong> for each system that processes data for targeted advertising, data sales, profiling for consequential decisions, or sensitive data (IC 24-15-6-1(b)).",
      "<strong>File everything.</strong> The Indiana AG enforces the ICDPA (IC 24-15-10-4). These documents demonstrate compliance. Civil penalty up to $7,500 per violation (IC 24-15-10-2) with a 30-day cure period (IC 24-15-10-3).",
    ],
    reminder:
      "The Indiana Consumer Data Protection Act (IC 24-15) is effective January 1, 2026. The Indiana Attorney General has exclusive enforcement authority (IC 24-15-10-4). There is no private right of action. Civil penalty up to $7,500 per violation (IC 24-15-10-2). 30-day cure period (IC 24-15-10-3).",
  },
  "montana-mcdpa": {
    title: "Your Montana MCDPA Compliance Package",
    statute: "MCA \u00A7\u00A7 30-14-2801 through 30-14-2820",
    description:
      "compliance documentation templates aligned with the Montana Consumer Data Privacy Act (MCA \u00A7\u00A7 30-14-2801 through 30-14-2820, effective October 1, 2024) requirements. Montana has the lowest applicability thresholds of any state privacy law (25,000+ consumers). Review each document with your legal team before deployment.",
    steps: [
      "<strong>Update your Privacy Notice</strong> to include the consumer rights and opt-out disclosures required by the Montana MCDPA (\u00A7 30-14-2808).",
      "<strong>Build your Consumer Rights Request process</strong> using the Procedures template \u2014 you have 45 days to respond to consumer requests (\u00A7 30-14-2810).",
      "<strong>Complete the Data Protection Assessment</strong> for each covered processing activity (\u00A7 30-14-2814). Note: Assessments are not retroactive to pre-January 1, 2025 processing.",
      "<strong>File everything.</strong> The Montana AG enforces the MCDPA. These documents demonstrate compliance. Civil penalty up to $7,500 per violation (\u00A7 30-14-2820).",
    ],
    reminder:
      "The Montana Consumer Data Privacy Act (MCA \u00A7\u00A7 30-14-2801 through 30-14-2820) has been in effect since October 1, 2024. Montana has the lowest applicability thresholds of any state privacy law: 25,000+ consumers OR 15,000+ consumers with 25%+ revenue from data sales (\u00A7 30-14-2803). No private right of action (\u00A7 30-14-2817(5)). 30-day cure period (\u00A7 30-14-2817(3)).",
  },
  "kentucky-kcdpa": {
    title: "Your Kentucky KCDPA Compliance Package",
    statute: "KRS Chapter 367 (Kentucky Consumer Data Protection Act, HB 15)",
    description:
      "compliance documentation templates aligned with the Kentucky Consumer Data Protection Act (KRS Chapter 367, HB 15, effective January 1, 2026) requirements. Review each document with your legal team before deployment.",
    steps: [
      "<strong>Update your Privacy Notice</strong> to include the consumer rights and opt-out disclosures required by the Kentucky KCDPA (KRS Chapter 367).",
      "<strong>Build your Consumer Rights Request process</strong> using the Procedures template \u2014 you have 45 days to respond to consumer requests.",
      "<strong>Complete the Data Protection Assessment</strong> for each system that processes data for targeted advertising, data sales, profiling for consequential decisions, or sensitive data.",
      "<strong>File everything.</strong> The Kentucky AG enforces the KCDPA. These documents demonstrate compliance. A 30-day cure period applies before the AG may initiate civil action.",
    ],
    reminder:
      "The Kentucky Consumer Data Protection Act (KRS Chapter 367, HB 15) is effective January 1, 2026. The Kentucky Attorney General has exclusive enforcement authority. There is no private right of action. A 30-day cure period applies.",
  },
  "new-jersey-njdpa": {
    title: "Your New Jersey NJDPA Compliance Package",
    statute: "New Jersey Data Protection Act (S332/A1971)",
    description:
      "compliance documentation templates aligned with the New Jersey Data Protection Act (S332/A1971, signed January 16, 2024, effective January 15, 2025) requirements. Note: The NJDPA is a separate law from the NJ Law Against Discrimination. Review each document with your legal team before deployment.",
    steps: [
      "<strong>Update your Privacy Notice</strong> to include the consumer rights and opt-out disclosures required by the New Jersey NJDPA.",
      "<strong>Build your Consumer Rights Request process</strong> using the Procedures template \u2014 you have 45 days to respond to consumer requests.",
      "<strong>Complete the Data Protection Assessment</strong> for each system that processes data for targeted advertising, data sales, profiling for consequential decisions, or sensitive data.",
      "<strong>File everything.</strong> The New Jersey AG enforces the NJDPA. These documents demonstrate compliance. Remember: the NJDPA and the NJ Law Against Discrimination are separate laws \u2014 both may apply.",
    ],
    reminder:
      "The New Jersey Data Protection Act (S332/A1971) has been in effect since January 15, 2025. The New Jersey Attorney General has enforcement authority. There is no private right of action. This law is separate from the NJ Law Against Discrimination.",
  },
  "california-ccpa-admt": {
    title: "Your California CCPA ADMT Compliance Package",
    statute: "Cal. Civ. Code \u00A7 1798.100 et seq. + CPPA ADMT Regulations",
    description:
      "compliance documentation templates aligned with the CPPA\u2019s Automated Decisionmaking Technology (ADMT) regulations under the California Consumer Privacy Act (Cal. Civ. Code \u00A7 1798.100 et seq.). Review each document with your legal team before deployment.",
    steps: [
      "<strong>Publish the Pre-Use ADMT Notice</strong> before using any automated decisionmaking technology on California consumers.",
      "<strong>Implement your Opt-Out Mechanism</strong> using the documentation template and verify it is accessible and functional.",
      "<strong>Complete the ADMT Risk Assessment</strong> for each system that makes or substantially assists significant decisions about consumers.",
      "<strong>Establish your Human Review Process</strong> so consumers can request human review of ADMT-driven decisions.",
    ],
    reminder:
      "The CPPA ADMT regulations are effective January 1, 2026. CPPA administrative enforcement and AG civil enforcement both apply. Penalties: $2,500 per violation, $7,500 per intentional violation (Cal. Civ. Code \u00A7 1798.155). Verify current CPPA guidance at cppa.ca.gov.",
  },
  "eu-ai-act": {
    title: "Your EU AI Act Compliance Package",
    statute: "Regulation (EU) 2024/1689",
    description:
      "compliance documentation templates aligned with Regulation (EU) 2024/1689 (the EU AI Act) requirements for high-risk AI systems. Review each document with your legal team and EU-qualified counsel before deployment.",
    steps: [
      "<strong>Complete the Risk Management System Documentation</strong> for each high-risk AI system \u2014 this is required before placing a system on the EU market.",
      "<strong>Prepare Technical Documentation (Annex IV)</strong> for each high-risk system and maintain it throughout the system\u2019s lifecycle.",
      "<strong>Register your high-risk AI systems</strong> in the EU database using the Registration Documentation template (required before deployment for most Annex III systems).",
      "<strong>Implement your Post-Market Monitoring Plan</strong> and assign responsibility for ongoing incident reporting and corrective actions.",
    ],
    reminder:
      "The EU AI Act has phased effective dates: prohibited AI practices from February 2025, GPAI obligations from August 2025, Annex III high-risk system obligations from August 2027. National market surveillance authorities enforce. High-risk violations: up to \u20AC15,000,000 or 3% global turnover (Art. 99(4)).",
  },
  "eeoc-ai-hiring": {
    title: "Your EEOC AI Hiring Compliance Kit",
    statute: "Title VII + 29 CFR Part 1607 (Uniform Guidelines)",
    description:
      "compliance documentation templates aligned with the EEOC\u2019s enforcement of existing federal anti-discrimination law (Title VII, ADA, ADEA) and the Uniform Guidelines on Employee Selection Procedures (29 CFR Part 1607) as applied to AI hiring tools. Review each document with your legal team before use.",
    steps: [
      "<strong>Run the Adverse Impact Analysis</strong> for each AI hiring tool using the Template \u2014 the EEOC 4/5 (80%) rule is the federal standard under 29 CFR \u00A7 1607.4(D).",
      "<strong>Complete Job-Relatedness Validation Documentation</strong> for each tool to demonstrate the selection criteria are job-related and consistent with business necessity.",
      "<strong>Establish Reasonable Accommodation Procedures</strong> before using AI assessments on any applicant or employee.",
      "<strong>Send the Vendor AI Audit Requirements</strong> to each AI tool vendor and keep their responses on file.",
    ],
    reminder:
      "Employers remain liable under Title VII, ADA, and ADEA for discriminatory outcomes from AI hiring tools, even when the AI vendor is responsible. EEOC AI-specific technical assistance has been modified under the current administration \u2014 verify current guidance at eeoc.gov.",
  },
  "nist-ai-rmf": {
    title: "Your NIST AI RMF Implementation Package",
    statute: "NIST AI 100-1 (AI Risk Management Framework 1.0)",
    description:
      "implementation templates aligned with the NIST AI Risk Management Framework (AI RMF 1.0, NIST AI 100-1). These templates cover the Govern, Map, Measure, and Manage core functions. Review each document with your legal and technical teams.",
    steps: [
      "<strong>Start with the AI Risk Management Plan</strong> \u2014 it sets your organization\u2019s overall approach and assigns accountability for each RMF function.",
      "<strong>Complete the AI System Risk Profile</strong> for each system you operate, using the Map Function Documentation to identify context and risks.",
      "<strong>Use the Measure Function Documentation</strong> to document your metrics, testing, and evaluation procedures for each system.",
      "<strong>Implement the Manage Function Documentation</strong> to track risks, assign mitigations, and establish your incident and escalation procedures.",
    ],
    reminder:
      "The NIST AI RMF is a voluntary framework \u2014 NIST is non-regulatory. However, it is referenced as the compliance standard by Colorado (SB 24-205), federal contractor requirements, and enterprise procurement programs. Demonstrating RMF alignment shows reasonable care. AI RMF 1.0 is currently being revised \u2014 verify the current version at airc.nist.gov.",
  },
  "healthcare-ai-compliance": {
    title: "Your Healthcare AI Compliance Package",
    statute: "HIPAA Privacy Rule (45 CFR Part 164)",
    description:
      "compliance documentation templates aligned with HIPAA Privacy Rule (45 CFR Part 164 Subpart E), Security Rule (Subpart C), and Breach Notification Rule (Subpart D) requirements as applied to AI processing of protected health information. Review each document with your legal team and HIPAA counsel before deployment.",
    steps: [
      "<strong>Complete the AI Risk Assessment for PHI Processing</strong> for each AI system that creates, receives, maintains, or transmits protected health information.",
      "<strong>Execute Business Associate Agreements</strong> with each AI vendor that processes PHI using the BAA template \u2014 a BAA is required before sharing PHI with any business associate.",
      "<strong>Implement AI-Specific Security Policies</strong> covering access controls, audit logging, and incident detection for AI systems processing PHI.",
      "<strong>Establish Breach Notification Procedures</strong> for AI-related PHI breaches \u2014 HHS OCR requires notification within 60 days of discovery.",
    ],
    reminder:
      "HIPAA applies to any covered entity or business associate using AI to process protected health information. HIPAA penalties range up to $2,100,000 per violation category per year. HHS may issue additional guidance on AI and HIPAA \u2014 verify current guidance at hhs.gov/hipaa.",
  },
  "financial-services-ai": {
    title: "Your Financial Services AI Compliance Package",
    statute: "ECOA/Regulation B (12 CFR Part 1002) + FINRA AI Supervision",
    description:
      "compliance documentation templates aligned with the Equal Credit Opportunity Act (15 USC \u00A7 1691 et seq.), Regulation B (12 CFR Part 1002), the Fair Credit Reporting Act (15 USC \u00A7 1681 et seq.), and FINRA AI supervision requirements. Review each document with your legal team and compliance counsel before use.",
    steps: [
      "<strong>Adopt the AI Supervision Policy</strong> and assign supervisory responsibility for each AI system \u2014 FINRA requires documented supervision of AI-generated communications and recommendations.",
      "<strong>Complete Model Risk Documentation</strong> for each AI model used in regulated activities, including validation status and performance monitoring.",
      "<strong>Prepare ECOA Adverse Action Notices</strong> for AI-driven credit denials \u2014 Regulation B requires specific disclosures explaining the reasons for adverse credit decisions.",
      "<strong>Conduct Annual AI Review</strong> using the Checklist to verify all AI systems remain within approved risk parameters and supervisory controls are functioning.",
    ],
    reminder:
      "FINRA has flagged AI supervision as a 2026 examination priority. CFPB UDAAP authority reaches AI-driven unfair, deceptive, or abusive practices. Regulation B (12 CFR Part 1002) requires adverse action notices for AI-driven credit denials. Verify current SEC, CFPB, and FINRA guidance for your specific firm type.",
  },
  "ai-governance-framework": {
    title: "Your AI Governance Framework",
    statute: "NIST AI RMF Govern Function + CO SB24-205",
    description:
      "AI governance framework templates, aligned with the NIST AI Risk Management Framework Govern function and Colorado SB24-205 risk management requirements. All six documents are included. Review each document with your legal team before deployment.",
    steps: [
      "<strong>Start with the AI Governance Policy.</strong> Have leadership sign it, distribute it to all teams, and make it the anchor document for your AI program.",
      "<strong>Customize the AI Ethics Principles Statement</strong> to reflect your organization\u2019s values and publish it internally and externally.",
      "<strong>Apply the Risk Classification Matrix</strong> to every AI system in your inventory. High-risk systems need the most oversight.",
      "<strong>Route every new AI use case through the Approval Workflow</strong> before deployment. Document each approval.",
      "<strong>Seat your AI Steering Committee</strong> using the Charter as your founding document. Schedule your first meeting.",
      "<strong>Assign your AI Compliance Officer</strong> using the Role Description. This role is accountable for everything else on this list.",
    ],
    reminder:
      "Documented AI governance is required evidence of \u201creasonable care\u201d under Colorado SB24-205 and similar deployer-liability statutes. Enterprise procurement programs increasingly require AI governance documentation from vendors. This framework aligns with the NIST AI RMF Govern function.",
  },
  "ai-system-registry": {
    title: "Your AI System Registry",
    statute: "NIST AI RMF MAP Function",
    description:
      "AI system inventory and lifecycle tracking templates, aligned with the NIST AI RMF MAP function. Both documents are included. Review each with your legal and IT teams.",
    steps: [
      "<strong>Complete the AI System Inventory</strong> for every AI system your organization uses. Name, purpose, vendor, data inputs, risk level, and owner for each system.",
      "<strong>Use the Lifecycle Tracker</strong> to document each system\u2019s status \u2014 from development through testing, deployment, monitoring, and eventual retirement.",
    ],
    reminder:
      "An AI system inventory is a prerequisite for compliance with Colorado SB24-205, Texas TRAIGA, EU AI Act, and every other AI statute. You cannot assess risk, assign accountability, or comply with disclosure requirements for systems you haven\u2019t cataloged. Start here.",
  },
  "ai-transparency-report": {
    title: "Your AI Transparency Report Templates",
    statute: "EU AI Act Art. 13 + Voluntary Best Practice",
    description:
      "AI transparency reporting templates for public disclosure of AI systems, safeguards, and outcomes. Both documents are included. Review with your legal team and communications team before publishing.",
    steps: [
      "<strong>Complete the Annual AI Transparency Report Template</strong> for public disclosure of your AI systems, their purposes, safeguards, and outcomes.",
      "<strong>Use the Performance Monitoring Report Template</strong> to document ongoing AI system performance metrics and share them with internal stakeholders.",
    ],
    reminder:
      "EU AI Act Article 13 requires transparency obligations for high-risk AI systems. Large enterprises increasingly publish voluntary AI transparency reports as evidence of responsible deployment. Proactive disclosure strengthens your regulatory position.",
  },
  "ai-whistleblower-policy": {
    title: "Your AI Whistleblower Policy",
    statute: "CA SB 53 (2025\u20132026 Session) + Best Practice",
    description:
      "AI safety whistleblower protection policy and internal concern reporting form. Both documents are included. Review with your legal team and HR before publishing.",
    steps: [
      "<strong>Adopt and publish the AI Safety Whistleblower Protection Policy.</strong> Distribute to all employees and add it to your employee handbook.",
      "<strong>Make the Internal AI Concern Reporting Form accessible</strong> \u2014 link it in your intranet, HR systems, and AI governance documentation.",
    ],
    reminder:
      "California SB 53 (2025\u20132026 Session) requires certain AI developers to maintain safety and whistleblower protections. For all other organizations, a clear internal reporting channel is a best practice that reduces the risk of AI harms escalating undetected.",
  },
  "customer-ai-aup": {
    title: "Your Customer AI Acceptable Use Policy",
    statute: "FTC Act \u00A7 5 + EU AI Act Art. 13 + Best Practice",
    description:
      "customer-facing AI acceptable use policy template for companies that offer AI-powered products or services. Review with your legal team before publishing to customers.",
    steps: [
      "<strong>Customize the Customer AI Acceptable Use Policy</strong> with your company name, AI product names, and specific use cases.",
      "<strong>Publish it where customers can find it</strong> \u2014 your terms of service page, help center, or AI feature documentation.",
      "<strong>Require customers to acknowledge it</strong> before accessing AI features \u2014 a checkbox at signup or feature activation is standard practice.",
    ],
    reminder:
      "A Customer AUP limits your liability for customer misuse of your AI products and is increasingly required by enterprise buyers before they\u2019ll sign contracts with AI vendors. This document is separate from your Employee AI Use Policy \u2014 it governs what customers can do with your AI, not what your employees can do internally.",
  },
  "manager-ai-training-kit": {
    title: "Your Manager AI Training Kit",
    statute: "NIST AI RMF + EEOC Guidance + State Employment AI Laws",
    description:
      "manager AI training documents — talking points, employee FAQ, and training sign-off tracker. All three documents are included. Review with your HR and legal teams before distribution.",
    steps: [
      "<strong>Review the Manager Talking Points</strong> with HR and customize the fill-in sections for your organization\u2019s specific AI tools and policies.",
      "<strong>Distribute the Employee FAQ</strong> alongside your AI policy rollout — it answers the questions employees actually ask.",
      "<strong>Use the Training Sign-Off Sheet</strong> to document every session. Keep completed sign-offs on file — they are your evidence of compliance.",
    ],
    reminder:
      "Illinois HB3773 requires employee notification before AI is used in employment decisions. Colorado SB24-205 and Texas TRAIGA require deployers to train staff on AI risks. Documented training demonstrates the \u201creasonable care\u201d that regulators and courts look for.",
  },
  "annual-compliance-review": {
    title: "Your Annual AI Compliance Review Package",
    statute: "NIST AI RMF + Multi-State Deployer Requirements",
    description:
      "annual AI compliance review documents — a comprehensive checklist and an update log for tracking regulatory changes. Both documents are included. Review with your legal and compliance teams.",
    steps: [
      "<strong>Work through the Annual Review Checklist</strong> with your compliance team. Every unchecked item is a gap that needs an owner and a deadline.",
      "<strong>Use the Update Log</strong> to record every regulatory change, policy revision, or system change as it happens — not just at year-end.",
      "<strong>File completed reviews.</strong> Regulators and auditors will ask for evidence of your compliance review process.",
    ],
    reminder:
      "Colorado SB24-205, Texas TRAIGA, and the NIST AI RMF all require periodic review of AI systems and compliance programs. An annual documented review is a cornerstone of any defensible AI governance program.",
  },
  "board-ai-summary": {
    title: "Your Board AI Compliance Summary Kit",
    statute: "NIST AI RMF Govern Function + Multi-State Deployer Requirements",
    description:
      "board-level AI compliance reporting documents — executive summary, board presentation slides, and a risk register excerpt. All three documents are included. Review with your legal counsel before presenting to the board.",
    steps: [
      "<strong>Complete the Executive Summary</strong> before each board meeting that includes AI on the agenda. Keep it to one page.",
      "<strong>Use the Board Presentation Template</strong> to structure your slides. Customize the risk ratings and open items for your organization.",
      "<strong>Update the Risk Register Excerpt</strong> whenever a new AI system is deployed or a risk rating changes. The board needs current data.",
    ],
    reminder:
      "Board-level AI oversight is required under Colorado SB24-205 and is a governance best practice under the NIST AI RMF Govern function. Directors who can demonstrate they received and reviewed AI risk reporting have significantly stronger defenses against breach-of-fiduciary claims.",
  },
  "consumer-notice-kit": {
    title: "Your Consumer AI Notice Kit",
    statute: "Multi-State Consumer Privacy Laws + CPPA ADMT Regulations",
    description:
      "consumer AI notice templates for website banners, email notifications, and physical postings. All three documents are included. Review with your legal team before publishing.",
    steps: [
      "<strong>Select the correct website banner version</strong> (short bar, full modal, or employment notice) and have your web team implement it before using AI on consumer-facing systems.",
      "<strong>Customize the email notification templates</strong> for your general consumer, hiring, and adverse decision scenarios. Send them before or at the time of AI-driven decisions.",
      "<strong>Post the physical posting templates</strong> in required locations before using AI in hiring or employment decisions \u2014 Illinois and NYC require physical or accessible notice.",
    ],
    reminder:
      "California CPPA ADMT regulations require pre-use notice before automated decisionmaking technology is applied to consumers. Illinois HB3773 and NYC LL144 require written notice to job applicants and employees. Physical posting is required in some jurisdictions. Verify current requirements with qualified legal counsel.",
  },
  "data-mapping-inventory": {
    title: "Your AI Data Mapping & Inventory Kit",
    statute: "NIST AI RMF MAP Function + Multi-State Privacy Assessment Requirements",
    description:
      "data mapping and inventory documents \u2014 a data inventory, AI data flow diagram, and third-party AI register. All three documents are included. Review with your legal and IT teams.",
    steps: [
      "<strong>Complete the Data Inventory</strong> for every category of personal data your AI systems process. Identify the legal basis for each use.",
      "<strong>Complete an AI Data Flow Diagram entry</strong> for each AI system. Understanding where data goes in and out is the foundation of every privacy compliance program.",
      "<strong>Populate the Third-Party Register</strong> with every vendor or partner that receives personal data from your AI systems. This register is required evidence under multiple state privacy laws.",
    ],
    reminder:
      "Data Protection Assessments required under Texas TDPSA (\u00A7 541.105), Delaware PDPA (\u00A7 12D-109), Virginia CDPA (\u00A7 59.1-580), and other state laws must be based on a documented inventory of data and processing activities. These documents are prerequisites for completing those assessments.",
  },
  "consumer-rights-kit": {
    title: "Your Consumer Rights Request Kit",
    statute: "Multi-State Consumer Privacy Laws (CCPA, TDPSA, CDPA, MCDPA, PDPA)",
    description:
      "consumer data rights request documents \u2014 a consumer-facing intake form, response letter templates, and a response timeline tracker. All three documents are included. Review with your legal team before use.",
    steps: [
      "<strong>Make the Request Intake Form accessible</strong> to consumers via your website, privacy rights portal, or on request. It must be easy to find and use.",
      "<strong>Customize the Response Templates</strong> with your organization\u2019s contact information, appeal process, and applicable regulatory agency before your first request arrives.",
      "<strong>Use the Timeline Tracker</strong> for every active request. Missing the 45-day deadline is itself a violation under every applicable state law.",
    ],
    reminder:
      "California CCPA, Texas TDPSA, Virginia CDPA, Minnesota MCDPA, Delaware PDPA, and other state laws give consumers the right to access, correct, delete, and opt out of data processing. Most laws require a response within 45 days of a verified request, with a one-time 45-day extension if notice is provided. Penalties for non-response can reach $7,500\u2013$25,000 per violation.",
  },
  "il-notice-response-kit": {
    title: "Your Illinois AI Notice & Response Kit",
    statute: "775 ILCS 5/2-102(L)",
    description:
      "employee AI notification templates, an AI use logging form, and an employee inquiry response form. All three documents are included.",
    steps: [
      "<strong>Customize the Employee Notification Template</strong> with your company's AI systems and deployment details, then distribute to all affected employees.",
      "<strong>Start using the AI Use Logging Form</strong> to document each time AI is used in an employment decision — dates, systems, outcomes, and reviewers.",
      "<strong>Keep the Inquiry Response Form ready</strong> for when employees ask questions about AI use after receiving notice.",
    ],
    reminder:
      "Illinois HB3773 requires notice to employees when AI is used in employment decisions. IDHR is developing implementing rules on timing and format. Having a documented notice and response process demonstrates compliance effort.",
  },
  "il-zip-proxy-audit": {
    title: "Your Illinois Zip Code Proxy Audit Workbook",
    statute: "775 ILCS 5/2-102(L)",
    description:
      "a data input audit template, proxy analysis worksheet, and remediation plan for Illinois\u2019s prohibition on using zip codes as a proxy for protected classes.",
    steps: [
      "<strong>Complete the Data Input Audit</strong> for each AI hiring tool — identify every data input and flag any that include zip codes or zip-code-derived data.",
      "<strong>Work through the Proxy Analysis Worksheet</strong> to assess whether zip codes correlate with protected classes in your applicant pool.",
      "<strong>If correlation is found, complete the Remediation Plan</strong> — document what you\u2019ll change, when, and who is responsible.",
    ],
    reminder:
      "Illinois HB3773 specifically prohibits using zip codes as a proxy for protected classes in AI-driven employment decisions.",
  },
  "co-appeal-correction-kit": {
    title: "Your Colorado Consumer Appeal & Correction Kit",
    statute: "C.R.S. \u00A7\u00A7 6-1-1701\u20131707",
    description:
      "consumer appeal intake forms, data correction request processing templates, and appeal outcome letter templates for Colorado SB 24-205. All three documents are included.",
    steps: [
      "<strong>Customize the Appeal Intake Form</strong> with your organization\u2019s contact information and the AI systems consumers can appeal decisions from.",
      "<strong>Use the Correction Request Processing Template</strong> to document each consumer\u2019s request, the data at issue, and the corrective action taken.",
      "<strong>Send the Appeal Outcome Letter</strong> to the consumer with the result of their appeal and any further steps available to them.",
    ],
    reminder:
      "Colorado SB 24-205 (C.R.S. \u00A7\u00A7 6-1-1701\u20131707) requires deployers of high-risk AI systems to provide consumers with a mechanism to appeal consequential decisions and correct inaccurate data. This law takes effect June 30, 2026.",
  },
  "co-ag-reporting-kit": {
    title: "Your Colorado AG Discrimination Reporting Kit",
    statute: "C.R.S. \u00A7\u00A7 6-1-1701\u20131707",
    description:
      "algorithmic discrimination discovery forms, incident documentation templates, and Colorado AG notification letter templates. All three documents are included.",
    steps: [
      "<strong>Use the Discovery Form</strong> to document any instance where an AI system may have produced a discriminatory outcome — record the system, decision, affected population, and date.",
      "<strong>Complete the Incident Documentation Template</strong> with root cause analysis, impact assessment, and corrective action plan.",
      "<strong>If AG notification is required, use the Notification Letter Template</strong> — customize it with your organization\u2019s details and file it with your compliance records.",
    ],
    reminder:
      "Colorado SB 24-205 requires deployers to notify the Colorado AG when algorithmic discrimination is discovered. Failure to report known discrimination is itself a violation. The AG may seek civil penalties up to $20,000 per violation under the Colorado Consumer Protection Act (C.R.S. \u00A7 6-1-112).",
  },
  "co-dev-deploy-exchange": {
    title: "Your Colorado Developer-Deployer Documentation Exchange Kit",
    statute: "C.R.S. \u00A7\u00A7 6-1-1701\u20131707",
    description:
      "developer disclosure request templates, deployer gap analysis worksheets, and documentation exchange checklists for Colorado SB 24-205. All three documents are included.",
    steps: [
      "<strong>Send the Developer Disclosure Request</strong> to each AI system developer you work with — Colorado requires developers to provide deployers with the information needed to comply.",
      "<strong>Complete the Gap Analysis Worksheet</strong> to identify where developer disclosures fall short of what your compliance program requires.",
      "<strong>Use the Exchange Checklist</strong> to track the documentation exchange for each system and flag any open items before deployment.",
    ],
    reminder:
      "Colorado SB 24-205 creates distinct obligations for developers and deployers. Deployers are responsible for their own compliance even when developers fail to provide adequate disclosures. Document every exchange attempt.",
  },
  "ca-admt-notice-optout": {
    title: "Your California ADMT Notice & Opt-Out Kit",
    statute: "Cal. Civ. Code \u00A7 1798.100 et seq.",
    description:
      "pre-use ADMT notice templates, opt-out mechanism documentation, and opt-out request processing forms for California CPPA ADMT regulations. All three documents are included.",
    steps: [
      "<strong>Publish the Pre-Use ADMT Notice</strong> before deploying automated decisionmaking technology on any California consumer — the notice must appear before the system is used.",
      "<strong>Implement your Opt-Out Mechanism</strong> using the documentation template and verify the opt-out link or process is accessible, functional, and tested.",
      "<strong>Process opt-out requests using the Request Form</strong> — log each request, the action taken, and the date of completion.",
    ],
    reminder:
      "The CPPA ADMT regulations (Cal. Civ. Code \u00A7 1798.100 et seq.) are effective January 1, 2026. Pre-use notice and opt-out are mandatory before using ADMT for significant decisions about California consumers. CPPA administrative penalties: $2,500 per violation, $7,500 per intentional violation.",
  },
  "ca-admt-access-kit": {
    title: "Your California ADMT Access Request Kit",
    statute: "Cal. Civ. Code \u00A7 1798.100 et seq.",
    description:
      "ADMT access request intake forms, an ADMT output explanation template, and a response timeline tracker for California CPPA ADMT regulations. All three documents are included.",
    steps: [
      "<strong>Make the Access Request Intake Form available</strong> to California consumers through your privacy rights portal or on request.",
      "<strong>Use the ADMT Output Explanation Template</strong> to explain the ADMT system\u2019s logic and how it affected the consumer\u2019s outcome — responses must be meaningful, not boilerplate.",
      "<strong>Track every request in the Response Timeline Tracker</strong> — note the request date, response date, system involved, and outcome.",
    ],
    reminder:
      "California CPPA ADMT regulations give consumers the right to access information about automated decisionmaking technology used on them, including a meaningful explanation of the system\u2019s logic. Responses are due within 45 days of a verified request.",
  },
  "ca-cyber-audit-kit": {
    title: "Your California Cybersecurity Audit Kit",
    statute: "Cal. Civ. Code \u00A7 1798.100 et seq.",
    description:
      "a cybersecurity audit checklist, risk assessment workbook, and audit remediation tracker for California CPPA cybersecurity audit requirements. All three documents are included.",
    steps: [
      "<strong>Complete the Cybersecurity Audit Checklist</strong> before each cybersecurity audit cycle — define scope, assign auditors, and document the AI systems under review.",
      "<strong>Use the Risk Assessment Workbook</strong> to confirm which AI systems process personal information and assess the risks subject to CPPA cybersecurity audit requirements.",
      "<strong>Record findings in the Audit Remediation Tracker</strong> and assign remediation owners and deadlines for every identified gap.",
    ],
    reminder:
      "The CPPA cybersecurity audit regulations require businesses that process personal information to conduct annual cybersecurity audits. AI systems that process personal information are in scope. Audit documentation may be requested by the CPPA during an investigation.",
  },
  "nyc-bias-audit-mgmt": {
    title: "Your NYC Bias Audit Management Kit",
    statute: "NYC Admin. Code \u00A7\u00A7 20-870\u201320-874",
    description:
      "an auditor RFP template, results publication template, and annual renewal calendar for NYC Local Law 144. All three documents are included.",
    steps: [
      "<strong>Use the Auditor RFP Template</strong> to scope and solicit proposals for an independent bias audit — assign an independent auditor at least 60 days before your AEDT\u2019s next use date.",
      "<strong>Complete the Results Publication Template</strong> to ensure your auditor receives all required data, system access, and documentation, and to publish the required public audit summary.",
      "<strong>Maintain the Annual Renewal Calendar</strong> to record each year\u2019s audit completion date, auditor name, and publication date for the required public summary.",
    ],
    reminder:
      "NYC Local Law 144 requires annual independent bias audits for all automated employment decision tools used in NYC. The audit summary must be published on your website at least 10 business days before each AEDT is used. DCWP proactive investigations increased in 2026.",
  },
  "nyc-candidate-notice-kit": {
    title: "Your NYC Candidate Notice Kit",
    statute: "NYC Admin. Code \u00A7\u00A7 20-870\u201320-874",
    description:
      "a 10-day advance notice template, alternative process workflow, and data disclosure response for NYC Local Law 144. All three documents are included.",
    steps: [
      "<strong>Customize the 10-Day Advance Notice Template</strong> with the specific AEDT being used, its purpose, and the contact information for inquiries.",
      "<strong>Send the Notice before using any AEDT</strong> on a job applicant or employee in NYC — delivery must occur before, not at the time of, the tool\u2019s use.",
      "<strong>Use the Data Disclosure Response</strong> to respond to candidates who request information about what data the AEDT processed and how it was used.",
    ],
    reminder:
      "NYC Local Law 144 requires employers to notify job candidates and employees before using an automated employment decision tool on them. Notice must include the AEDT\u2019s purpose, the characteristics it evaluates, and contact information. DCWP may request delivery records.",
  },
  "va-consumer-rights-kit": {
    title: "Your Virginia Consumer Rights Processing Kit",
    statute: "Va. Code \u00A7\u00A7 59.1-575\u201359.1-584",
    description:
      "a rights request intake form, appeal workflow, and AG complaint referral notice for the Virginia Consumer Data Protection Act. All three documents are included.",
    steps: [
      "<strong>Make the Rights Request Intake Form available</strong> through your privacy portal or on request — Virginia consumers have rights to access, correct, delete, and opt out.",
      "<strong>Process appeals using the Appeal Workflow</strong> to respond within 60 days of a denied request — Virginia requires a mandatory appeals mechanism with written notice of the outcome.",
      "<strong>Use the AG Complaint Referral Notice</strong> when a consumer appeal is denied — Virginia requires informing consumers of their right to submit a complaint to the Attorney General (\u00A7 59.1-577(C)(3)).",
    ],
    reminder:
      "The Virginia Consumer Data Protection Act (Va. Code \u00A7\u00A7 59.1-575\u201359.1-584) requires a 45-day response window for consumer rights requests and a mandatory appeals process for denials. The Virginia AG has enforcement authority with civil penalties up to $7,500 per violation (\u00A7 59.1-584(C)).",
  },
  "va-profiling-assessment-kit": {
    title: "Your Virginia Profiling Assessment Workbook",
    statute: "Va. Code \u00A7\u00A7 59.1-575\u201359.1-584",
    description:
      "a profiling assessment template, benefits-risks worksheet, and sensitive data consent form for the Virginia Consumer Data Protection Act. All three documents are included.",
    steps: [
      "<strong>Use the Profiling Assessment Template</strong> to document every AI system that makes or assists decisions with legal or similarly significant effects on Virginia consumers.",
      "<strong>Complete the Benefits-Risks Worksheet</strong> for each identified system — document the processing purpose, benefits, risks, and safeguards.",
      "<strong>Use the Sensitive Data Consent Form</strong> to obtain and document consumer consent for processing sensitive data, and make completed assessments available to the Virginia AG upon request (\u00A7 59.1-580(B)).",
    ],
    reminder:
      "Virginia CDPA (\u00A7 59.1-580) requires data protection assessments for profiling activities that produce legal or similarly significant effects. Assessments must be made available to the Attorney General on request. There is no private right of action; the AG has exclusive enforcement authority.",
  },
  "va-controller-processor-kit": {
    title: "Your Virginia Controller-Processor Kit",
    statute: "Va. Code \u00A7\u00A7 59.1-575\u201359.1-584",
    description:
      "a processor DPA template, processor audit questionnaire, and subcontractor flowdown addendum for the Virginia Consumer Data Protection Act. All three documents are included.",
    steps: [
      "<strong>Execute a Data Processing Agreement</strong> with every processor that handles Virginia consumer personal data on your behalf — use the Processor DPA Template as your starting point.",
      "<strong>Use the Processor Audit Questionnaire</strong> to assess each processor\u2019s security practices, sub-processing relationships, and compliance posture before sharing Virginia consumer personal data.",
      "<strong>Complete the Subcontractor Flowdown Addendum</strong> for each processor relationship to confirm downstream data handling meets CDPA requirements.",
    ],
    reminder:
      "Virginia CDPA (\u00A7 59.1-577) requires data processing agreements between controllers and processors. Controllers remain liable for processor conduct. Document every processor relationship before sharing Virginia consumer personal data.",
  },
  "eu-fria-kit": {
    title: "Your EU AI Act FRIA Kit",
    statute: "Regulation (EU) 2024/1689",
    description:
      "a Fundamental Rights Impact Assessment template, authority notification letter, and FRIA update trigger assessment for EU AI Act high-risk AI systems. All three documents are included.",
    steps: [
      "<strong>Complete the FRIA Template</strong> for each high-risk AI system before deployment — assess the system\u2019s impact on fundamental rights including non-discrimination, privacy, and due process.",
      "<strong>Use the Authority Notification Letter</strong> to notify the relevant national supervisory authority when required — certain high-risk AI deployments require proactive disclosure to competent authorities.",
      "<strong>Complete the FRIA Update Trigger Assessment</strong> whenever the AI system changes significantly — Article 27 requires the FRIA to remain current throughout the system\u2019s lifecycle.",
    ],
    reminder:
      "EU AI Act Article 27 requires deployers of certain high-risk AI systems to conduct a Fundamental Rights Impact Assessment before deployment. FRIA obligations apply to bodies governed by public law and private entities providing public services, as well as financial institutions and employers using high-risk systems.",
  },
  "eu-post-market-kit": {
    title: "Your EU Post-Market Monitoring Kit",
    statute: "Regulation (EU) 2024/1689",
    description:
      "post-market monitoring plan templates, serious incident reporting forms, and corrective action tracking logs for EU AI Act high-risk AI systems. All three documents are included.",
    steps: [
      "<strong>Implement the Post-Market Monitoring Plan</strong> for each high-risk AI system — assign a responsible person, define monitoring metrics, and set review intervals.",
      "<strong>Use the Serious Incident Report Form</strong> whenever a high-risk AI system causes or contributes to a serious incident — EU AI Act Article 73 requires notification as soon as possible.",
      "<strong>Track corrective actions in the Log</strong> — document every identified risk, the corrective action taken, and the date of resolution.",
    ],
    reminder:
      "EU AI Act Article 72 requires providers of high-risk AI systems to establish post-market monitoring systems. Article 73 requires serious incident reporting to national market surveillance authorities as soon as possible after identification. High-risk violations: up to \u20AC15,000,000 or 3% global turnover (Art. 99(4)).",
  },
  "eu-human-oversight-kit": {
    title: "Your EU Human Oversight Kit",
    statute: "Regulation (EU) 2024/1689",
    description:
      "human oversight procedure documentation, oversight personnel training records, and oversight log templates for EU AI Act high-risk AI systems. All three documents are included.",
    steps: [
      "<strong>Document your Human Oversight Procedures</strong> for each high-risk AI system — identify who has oversight authority, what they monitor, and how they can intervene or halt the system.",
      "<strong>Use the Training Records Template</strong> to document oversight personnel training — EU AI Act Article 26 requires deployers to ensure assigned staff have the necessary competence.",
      "<strong>Maintain Oversight Logs</strong> for each high-risk system — record each oversight review, the reviewer, findings, and any interventions made.",
    ],
    reminder:
      "EU AI Act Article 14 requires high-risk AI systems to be designed and deployed with effective human oversight. Deployers must assign oversight to competent persons and ensure those persons can understand, monitor, and intervene in the system\u2019s operation. Document every oversight activity.",
  },
  "eu-registration-transparency": {
    title: "Your EU Registration & Transparency Kit",
    statute: "Regulation (EU) 2024/1689",
    description:
      "EU AI database registration documentation templates, transparency obligation checklists, and user-facing disclosure templates for EU AI Act high-risk AI systems. All three documents are included.",
    steps: [
      "<strong>Complete the Registration Documentation Template</strong> before registering each high-risk AI system in the EU AI Act database — registration is required before deployment for most Annex III systems.",
      "<strong>Work through the Transparency Obligation Checklist</strong> to confirm your system\u2019s instructions for use, technical documentation, and user disclosures meet EU AI Act requirements.",
      "<strong>Customize the User-Facing Disclosure Templates</strong> for each high-risk system and integrate them into your product documentation and onboarding materials.",
    ],
    reminder:
      "EU AI Act Article 49 requires providers of high-risk AI systems to register in the EU database before placing systems on the market. Article 13 requires transparency obligations including instructions for use that enable deployers to understand and operate the system effectively.",
  },
};

function buildEmailHtml(
  companyName: string,
  documentNames: string[],
  contactName: string,
  regulation: string
) {
  const reg = REGULATION_EMAIL[regulation] || REGULATION_EMAIL["illinois-hb3773"];
  const greeting = contactName ? `Hi ${contactName},` : "Hi,";
  const docList = documentNames
    .map((name) => `<li style="padding:4px 0;color:#374151;">${name}</li>`)
    .join("");

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:32px 24px;">
    <div style="background:#1e3a5f;border-radius:12px 12px 0 0;padding:32px 24px;text-align:center;">
      <h1 style="color:#ffffff;font-size:22px;margin:0 0 8px;">${reg.title}</h1>
      <p style="color:#93c5fd;font-size:14px;margin:0;">${companyName}</p>
    </div>
    <div style="background:#ffffff;padding:32px 24px;border:1px solid #e2e8f0;border-top:none;">
      <p style="color:#1f2937;font-size:15px;line-height:1.6;margin:0 0 20px;">${greeting}</p>
      <p style="color:#1f2937;font-size:15px;line-height:1.6;margin:0 0 20px;">Attached are ${companyName}'s ${reg.description}</p>
      <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;padding:16px 20px;margin:0 0 24px;">
        <p style="font-weight:700;color:#1e3a5f;font-size:14px;margin:0 0 8px;">Attached Documents:</p>
        <ul style="margin:0;padding:0 0 0 20px;font-size:14px;">${docList}</ul>
      </div>
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:16px 20px;margin:0 0 24px;">
        <p style="font-weight:700;color:#166534;font-size:14px;margin:0 0 12px;">What to Do Right Now:</p>
        <ol style="margin:0;padding:0 0 0 20px;font-size:14px;color:#374151;line-height:1.8;">
          ${reg.steps.map((s) => `<li>${s}</li>`).join("\n          ")}
        </ol>
      </div>
      <div style="background:#fefce8;border:1px solid #fde68a;border-radius:8px;padding:14px 20px;margin:0 0 24px;">
        <p style="color:#92400e;font-size:13px;margin:0;line-height:1.6;">
          <strong>Reminder:</strong> ${reg.reminder}
        </p>
      </div>
      <p style="color:#6b7280;font-size:13px;line-height:1.6;margin:0;">
        Questions? Reach us at <a href="mailto:info@aicompliancedocuments.com" style="color:#2563eb;">info@aicompliancedocuments.com</a>.
      </p>
    </div>
    <div style="background:#f1f5f9;border-radius:0 0 12px 12px;padding:20px 24px;text-align:center;border:1px solid #e2e8f0;border-top:none;">
      <p style="color:#94a3b8;font-size:12px;margin:0;">AI Compliance Documents &bull; <a href="https://aicompliancedocuments.com" style="color:#64748b;">aicompliancedocuments.com</a></p>
      <p style="color:#cbd5e1;font-size:11px;margin:8px 0 0;">These documents are templates for compliance planning purposes. They do not constitute legal advice.</p>
    </div>
  </div>
</body>
</html>`;
}

export async function POST(request: Request) {
  const { emails, documents, companyName, contactName, regulation } =
    await request.json();

  if (!emails || !Array.isArray(emails) || emails.length === 0) {
    return NextResponse.json(
      { error: "At least one email address is required" },
      { status: 400 }
    );
  }

  if (emails.length > MAX_RECIPIENTS) {
    return NextResponse.json(
      { error: `Maximum ${MAX_RECIPIENTS} recipients allowed` },
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  for (const email of emails) {
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: `Invalid email address: ${email}` },
        { status: 400 }
      );
    }
  }

  if (!documents || !Array.isArray(documents) || documents.length === 0) {
    return NextResponse.json({ error: "No documents provided" }, { status: 400 });
  }

  if (!companyName || typeof companyName !== "string") {
    return NextResponse.json({ error: "Company name is required" }, { status: 400 });
  }

  try {
    const attachments = documents.map(
      (doc: { filename: string; base64: string }) => ({
        filename: doc.filename,
        content: doc.base64,
      })
    );

    const documentNames = documents.map((doc: { filename: string }) =>
      doc.filename
        .replace(/^[^_]*_/, "")
        .replace(/_/g, " ")
        .replace(/\.pdf$/i, "")
    );

    const reg =
      REGULATION_EMAIL[regulation] || REGULATION_EMAIL["illinois-hb3773"];
    const resend = getResend();
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: emails,
      subject: `${reg.title} — ${companyName}`,
      html: buildEmailHtml(companyName, documentNames, contactName, regulation),
      attachments,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ sent: true });
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json({ error: "Email delivery failed" }, { status: 500 });
  }
}
