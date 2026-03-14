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
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 2: Govern Function Documentation
// NIST AI RMF 1.0 — GOVERN Core Function
// ============================================================
export function generateGovernDocumentation(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "NIST AI RMF: Govern Function Documentation", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This document implements the GOVERN function of the NIST AI Risk Management Framework (AI RMF 1.0, NIST AI 100-1) for ${data.company.name}. The GOVERN function enables organizations to cultivate and implement culture, processes, and organizational structures to make AI risk management systemic. The AI RMF is a voluntary framework \u2014 verify the current version at airc.nist.gov.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  const governSubcategories = [
    {
      id: "GOVERN-1.1",
      title:
        "Policies, processes, procedures, and practices across the organization related to the mapping, measuring, and managing of AI risks are in place, transparent, and implemented effectively.",
    },
    {
      id: "GOVERN-1.2",
      title:
        "Accountability for AI risk management is clearly documented and communicated throughout the organization.",
    },
    {
      id: "GOVERN-1.3",
      title:
        "Organizational leaders are responsible and accountable for decisions about AI-related risk.",
    },
    {
      id: "GOVERN-1.4",
      title:
        "Risk acceptance decisions are documented and include explicit rationale.",
    },
    {
      id: "GOVERN-2.1",
      title:
        "Scope, purposes, and priorities of AI risk management activities are clearly defined and documented.",
    },
    {
      id: "GOVERN-4.1",
      title:
        "Organizational teams are committed to a culture that considers and communicates AI risk.",
    },
    {
      id: "GOVERN-5.1",
      title:
        "Organizational policies and practices are in place to address AI risks.",
    },
    {
      id: "GOVERN-6.1",
      title:
        "Policies and procedures are in place to address AI risks and benefits arising from third-party entities.",
    },
  ];

  governSubcategories.forEach((sub) => {
    y = addSectionHeader(doc, `${sub.id}`, y);
    y = addWrappedText(doc, sub.title, MARGIN, y, CONTENT_WIDTH, LINE_HEIGHT);
    y += 2;
    y = addFormTextField(
      doc,
      `gov_${sub.id.replace(".", "_")}_status`,
      "Implementation status (Implemented / In Progress / Not Started):",
      y
    );
    y = addFormTextField(
      doc,
      `gov_${sub.id.replace(".", "_")}_evidence`,
      "Evidence / document reference:",
      y,
      { multiline: true, lines: 2 }
    );
    y += LINE_HEIGHT;
  });

  y = addSectionHeader(doc, "Govern Function Sign-off", y);
  y = addFormTextField(doc, "gov_owner", "Function Owner:", y, {
    prefill: data.contact.name,
    readOnly: false,
  });
  y = addFormTextField(doc, "gov_date", "Date:", y);

  addDisclaimer(doc);
  return doc;
}
