import { jsPDF } from "jspdf";
import type { ComplianceFormData } from "../pdf-types";
import {
  addDocHeader,
  addTopDisclaimer,
  addSectionHeader,
  addWrappedText,
  addDisclaimer,
  MARGIN,
  CONTENT_WIDTH,
  LINE_HEIGHT,
  BODY_SIZE,
  DECISION_LABELS,
  DATA_INPUT_LABELS,
  PROTECTED_LABELS,
  REVIEW_LABELS,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 2: AI System Inventory
// ============================================================
export function generateSystemInventory(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(doc, "AI System Inventory", data);
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    "This document inventories all artificial intelligence systems used by " +
      data.company.name +
      " in employment-related decisions. This inventory format is a recommended best practice to support compliance with 775 ILCS 5/2-102(L) (Illinois HB3773) — the statute does not mandate a specific inventory format.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Company overview
  y = addSectionHeader(doc, "Organization Overview", y);
  const overview: [string, string][] = [
    ["Legal Name", data.company.name],
    ["State of Incorporation", data.company.state || "Not specified"],
    ["Number of Employees", data.company.size || "Not specified"],
    ["Primary Industry", data.company.industry || "Not specified"],
    ["Inventory Date", data.generatedDate],
  ];
  overview.forEach(([label, value]) => {
    doc.setFont("helvetica", "bold");
    y = addWrappedText(
      doc,
      `${label}: `,
      MARGIN,
      y,
      CONTENT_WIDTH,
      LINE_HEIGHT
    );
    y -= LINE_HEIGHT;
    doc.setFont("helvetica", "normal");
    y = addWrappedText(doc, value, MARGIN + 50, y, CONTENT_WIDTH - 50, LINE_HEIGHT);
  });
  y += LINE_HEIGHT;

  // System details
  data.aiSystems.forEach((sys, idx) => {
    y = addSectionHeader(doc, `System ${idx + 1}: ${sys.name}`, y);

    const details: [string, string][] = [
      ["System Name", sys.name],
      ["Vendor/Provider", sys.vendor || "Internal / Not specified"],
      ["Description", sys.description || "Not provided"],
      [
        "Decisions Influenced",
        sys.decisions.map((d) => DECISION_LABELS[d] || d).join(", ") ||
          "None specified",
      ],
      [
        "Data Inputs",
        data.dataInputs.map((d) => DATA_INPUT_LABELS[d] || d).join(", ") ||
          "None specified",
      ],
      [
        "Protected Characteristics Accessible",
        data.protectedCharacteristics
          .map((p) => PROTECTED_LABELS[p] || p)
          .join(", ") || "None",
      ],
      [
        "Bias Audit Status",
        data.biasAudit === "yes"
          ? "Completed"
          : data.biasAudit === "in_progress"
          ? "In Progress"
          : data.biasAudit === "planned"
          ? "Planned"
          : "Not conducted",
      ],
      ["Human Oversight Role", data.oversight.oversightRole || "Not specified"],
      [
        "Review Frequency",
        REVIEW_LABELS[data.oversight.reviewFrequency] || "Not specified",
      ],
    ];

    details.forEach(([label, value]) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(BODY_SIZE);
      doc.text(`${label}:`, MARGIN + 2, y);
      doc.setFont("helvetica", "normal");
      y = addWrappedText(
        doc,
        value,
        MARGIN + 60,
        y,
        CONTENT_WIDTH - 62,
        LINE_HEIGHT
      );
      y += 1;
    });
    y += LINE_HEIGHT;
  });

  addDisclaimer(doc);
  return doc;
}
