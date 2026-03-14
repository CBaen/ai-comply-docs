import { jsPDF } from "jspdf";
import type { ComplianceFormData } from "../pdf-types";
import {
  addDocHeader,
  addTopDisclaimer,
  addSectionHeader,
  addWrappedText,
  addFormTextField,
  addFormCheckbox,
  addDisclaimer,
  MARGIN,
  CONTENT_WIDTH,
  LINE_HEIGHT,
  DECISION_LABELS,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 7: Trustworthy AI Characteristics Assessment
// NIST AI RMF 1.0 — Seven Characteristics of Trustworthy AI
// ============================================================
export function generateTrustworthyAIAssessment(
  data: ComplianceFormData
): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "Trustworthy AI Characteristics Assessment", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This assessment evaluates each AI system operated by ${data.company.name} against the seven characteristics of trustworthy AI identified in the NIST AI Risk Management Framework (AI RMF 1.0, NIST AI 100-1, Section 2). These characteristics are: Valid and Reliable; Safe; Secure and Resilient; Accountable and Transparent; Explainable and Interpretable; Privacy-Enhanced; and Fair with Bias Managed. The AI RMF is a voluntary framework \u2014 verify the current version at airc.nist.gov.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  const characteristics = [
    {
      id: "1",
      name: "Valid and Reliable",
      description:
        "The AI system performs its intended function accurately and consistently across expected operating conditions and use cases.",
      questions: [
        "What is the system\u2019s accuracy / performance metric?",
        "How is accuracy monitored over time (model drift)?",
        "What is the acceptable performance threshold?",
      ],
    },
    {
      id: "2",
      name: "Safe",
      description:
        "The AI system does not produce outputs that cause or contribute to harm. Failure modes are identified and managed.",
      questions: [
        "What are the potential failure modes and their consequences?",
        "What safeguards exist to prevent harmful outputs?",
        "Is there a human-in-the-loop for high-stakes decisions?",
      ],
    },
    {
      id: "3",
      name: "Secure and Resilient",
      description:
        "The AI system is protected against adversarial attacks, data poisoning, and unauthorized access. It maintains performance under stress.",
      questions: [
        "What security controls are applied to the AI system and its data?",
        "Has the system been tested for adversarial robustness?",
        "What is the system\u2019s recovery plan for security incidents?",
      ],
    },
    {
      id: "4",
      name: "Accountable and Transparent",
      description:
        "Roles, responsibilities, and decision-making processes involving the AI system are documented and communicated.",
      questions: [
        "Who is accountable for AI system decisions?",
        "How are AI-influenced decisions communicated to affected individuals?",
        "Is there an audit trail for AI-assisted decisions?",
      ],
    },
    {
      id: "5",
      name: "Explainable and Interpretable",
      description:
        "AI system outputs can be explained in meaningful ways to relevant stakeholders, including affected individuals.",
      questions: [
        "Can the system\u2019s decisions be explained to a non-technical user?",
        "Are explanations available to individuals affected by AI decisions?",
        "What explainability techniques are used (e.g., feature importance, SHAP)?",
      ],
    },
    {
      id: "6",
      name: "Privacy-Enhanced",
      description:
        "The AI system protects the privacy of individuals throughout its lifecycle, including during training, deployment, and maintenance.",
      questions: [
        "What privacy risks are associated with training or inference data?",
        "Are privacy-preserving techniques applied (minimization, anonymization)?",
        "Is a data protection impact assessment on file?",
      ],
    },
    {
      id: "7",
      name: "Fair \u2014 Bias Managed",
      description:
        "The AI system does not produce discriminatory outputs. Bias is identified and managed throughout the system lifecycle.",
      questions: [
        "Has the system been tested for demographic bias?",
        "What is the lowest adverse impact ratio for any protected group?",
        "What bias mitigation measures are in place?",
      ],
    },
  ];

  data.aiSystems.forEach((sys, sysIdx) => {
    y = addSectionHeader(
      doc,
      `Assessment: ${sys.name} \u2014 ${sys.decisions.map((d) => DECISION_LABELS[d] || d).join(", ")}`,
      y
    );

    characteristics.forEach((char) => {
      y = addWrappedText(
        doc,
        `${char.id}. ${char.name}`,
        MARGIN,
        y,
        CONTENT_WIDTH,
        LINE_HEIGHT
      );
      y = addWrappedText(
        doc,
        char.description,
        MARGIN + 5,
        y,
        CONTENT_WIDTH - 5,
        LINE_HEIGHT
      );
      y += 2;

      char.questions.forEach((q, qIdx) => {
        y = addFormTextField(
          doc,
          `ta_${sysIdx}_char${char.id}_q${qIdx}`,
          `  ${q}`,
          y
        );
      });

      y = addWrappedText(
        doc,
        "  Overall rating for this characteristic:",
        MARGIN,
        y,
        CONTENT_WIDTH,
        LINE_HEIGHT
      );
      const ratings = [
        "Strong \u2014 fully implemented and monitored",
        "Adequate \u2014 implemented, improvements possible",
        "Developing \u2014 partially implemented",
        "Not addressed \u2014 requires attention",
      ];
      ratings.forEach((rating, ratingIdx) => {
        y = addFormCheckbox(
          doc,
          `ta_${sysIdx}_char${char.id}_rating_${ratingIdx}`,
          rating,
          y
        );
      });
      y += 4;
    });
    y += LINE_HEIGHT;
  });

  y = addSectionHeader(doc, "Assessment Sign-off", y);
  y = addFormTextField(doc, "ta_assessor", "Conducted By:", y, {
    prefill: data.contact.name,
    readOnly: false,
  });
  y = addFormTextField(doc, "ta_date", "Assessment Date:", y);
  y = addFormTextField(doc, "ta_next_review", "Next Review Date:", y);

  addDisclaimer(doc);
  return doc;
}
