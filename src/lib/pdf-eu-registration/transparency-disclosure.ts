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
  addSignatureBlock,
  MARGIN,
  CONTENT_WIDTH,
  LINE_HEIGHT,
} from "../pdf-helpers";

// ============================================================
// DOCUMENT 2: Transparency Disclosure Templates
// EU AI Act Art. 50 — Transparency obligations for certain AI systems
// ============================================================
export function generateTransparencyDisclosure(data: ComplianceFormData): jsPDF {
  const doc = new jsPDF();
  let y = addDocHeader(
    doc,
    "EU AI Act: Transparency Disclosure Templates (Art. 50)",
    data
  );
  y = addTopDisclaimer(doc, y);

  y = addWrappedText(
    doc,
    `This document provides transparency disclosure templates for ${data.company.name} pursuant to Article 50 of Regulation (EU) 2024/1689 (EU AI Act). Article 50 establishes transparency obligations for certain AI systems — including systems that interact with natural persons, emotion recognition systems, and systems generating synthetic content. Review each section for applicability and complete the relevant disclosure templates. Disclosures must be provided to affected persons BEFORE or at the point of AI system use, in clear and accessible language.`,
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += LINE_HEIGHT;

  // Section 1: General AI system transparency (persons interacting with AI)
  y = addSectionHeader(
    doc,
    "Section 1: General AI System Transparency — Informing Persons of AI Interaction (Art. 50(1))",
    y
  );
  y = addWrappedText(
    doc,
    "Article 50(1) requires operators of AI systems intended to interact directly with natural persons to inform those persons that they are interacting with an AI system, unless this is obvious. This obligation applies to chatbots, AI-powered customer service, AI-generated communications, and similar systems. Exceptions apply where the natural person has been explicitly informed.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormCheckbox(doc, "transdis_s1_applicable", "Art. 50(1) APPLIES — Our AI system interacts directly with natural persons", y);
  y = addFormCheckbox(doc, "transdis_s1_not_applicable", "Art. 50(1) DOES NOT APPLY — Our AI system does not interact directly with natural persons", y);
  y = addFormCheckbox(doc, "transdis_s1_obvious", "Art. 50(1) EXCEPTION — AI nature of interaction is obvious from context (document basis below)", y);
  y = addFormTextField(
    doc,
    "transdis_s1_basis",
    "Basis for exception (if claimed) — describe why AI nature is obvious from context:",
    y,
    { multiline: true, lines: 2 }
  );
  y += 4;

  y = addWrappedText(
    doc,
    "Disclosure text — to be shown to persons before or at the point of AI interaction:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  y = addFormTextField(
    doc,
    "transdis_s1_disclosure_text",
    "Disclosure text (plain language, accessible format):",
    y,
    { multiline: true, lines: 4 }
  );
  y = addFormTextField(
    doc,
    "transdis_s1_ai_system_name",
    "AI system name and purpose referenced in disclosure:",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "transdis_s1_delivery_method",
    "How and when disclosure is delivered to the person:",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "transdis_s1_contact",
    "Contact information included in disclosure for questions:",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // Section 2: Emotion recognition system disclosure
  y = addSectionHeader(
    doc,
    "Section 2: Emotion Recognition System Disclosure (Art. 50(3))",
    y
  );
  y = addWrappedText(
    doc,
    "Article 50(3) requires operators of emotion recognition systems to inform natural persons exposed to such systems of the operation of the system. Emotion recognition AI systems include systems that infer, detect, or classify emotions or mental states from biometric, behavioral, or other signals. If your system does not use emotion recognition, mark as not applicable.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormCheckbox(
    doc,
    "transdis_s2_applicable",
    "Art. 50(3) APPLIES — We operate an emotion recognition AI system",
    y
  );
  y = addFormCheckbox(
    doc,
    "transdis_s2_not_applicable",
    "Art. 50(3) DOES NOT APPLY — We do not operate an emotion recognition AI system",
    y
  );
  y += 4;

  y = addWrappedText(
    doc,
    "If Art. 50(3) applies, complete the following:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;
  y = addFormTextField(
    doc,
    "transdis_s2_sys_description",
    "Description of emotion recognition system (what it detects, how, in what context):",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "transdis_s2_disclosure_text",
    "Disclosure text for persons exposed to emotion recognition system:",
    y,
    { multiline: true, lines: 4 }
  );
  y = addFormTextField(
    doc,
    "transdis_s2_annex_iii_check",
    "Is this emotion recognition system a high-risk AI system under Annex III? (Yes/No — explain):",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "transdis_s2_consent_if_required",
    "Consent or other legal basis for processing biometric data (GDPR Art. 9 — where applicable):",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "transdis_s2_delivery_method",
    "How and when disclosure is delivered:",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // Section 3: Deep fake / synthetic content disclosure
  y = addSectionHeader(
    doc,
    "Section 3: Deep Fake / AI-Generated Synthetic Content Disclosure (Art. 50(4))",
    y
  );
  y = addWrappedText(
    doc,
    "Article 50(4) requires providers and deployers of AI systems that generate or manipulate image, audio, or video content constituting a 'deep fake' to disclose that the content has been artificially generated or manipulated. The disclosure must be machine-readable and, where applicable, clearly labeled as AI-generated. Exception applies to AI-assisted content in certain editorial contexts where appropriate disclosure is made.",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 4;
  y = addFormCheckbox(
    doc,
    "transdis_s3_applicable",
    "Art. 50(4) APPLIES — We generate or deploy AI systems that generate deep fakes or AI-manipulated image/audio/video",
    y
  );
  y = addFormCheckbox(
    doc,
    "transdis_s3_not_applicable",
    "Art. 50(4) DOES NOT APPLY — We do not generate or use deep fake or AI-manipulated synthetic media",
    y
  );
  y = addFormCheckbox(
    doc,
    "transdis_s3_editorial_exception",
    "Art. 50(4) EDITORIAL EXCEPTION may apply — content is legitimate journalism/satire/fiction with appropriate disclosure (document basis below)",
    y
  );
  y += 4;

  y = addWrappedText(
    doc,
    "If Art. 50(4) applies, complete the following:",
    MARGIN,
    y,
    CONTENT_WIDTH,
    LINE_HEIGHT
  );
  y += 2;

  const syntheticContentTypes = [
    "AI-generated image content",
    "AI-generated audio content (including voice synthesis)",
    "AI-generated video content",
    "AI-manipulated real image/video (face swap, deepfake)",
    "AI-generated text presented as if authored by a human",
    "Other AI-generated synthetic media (describe below)",
  ];
  syntheticContentTypes.forEach((ctype, idx) => {
    y = addFormCheckbox(doc, `transdis_s3_type_${idx}`, ctype, y);
  });
  y = addFormTextField(
    doc,
    "transdis_s3_type_other",
    "Other synthetic content type:",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "transdis_s3_disclosure_text",
    "Disclosure text / label applied to AI-generated content:",
    y,
    { multiline: true, lines: 3 }
  );
  y = addFormTextField(
    doc,
    "transdis_s3_machine_readable",
    "Machine-readable format used for disclosure (e.g., C2PA metadata, watermarking standard):",
    y,
    { multiline: true, lines: 2 }
  );
  y = addFormTextField(
    doc,
    "transdis_s3_editorial_basis",
    "Basis for editorial exception (if claimed):",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  // Implementation tracking
  y = addSectionHeader(doc, "Implementation Tracking", y);
  y = addFormTextField(
    doc,
    "transdis_impl_owner",
    "Disclosure implementation owner (name, title):",
    y,
    { width: 140 }
  );
  y = addFormTextField(
    doc,
    "transdis_impl_review_date",
    "Last reviewed / updated:",
    y,
    { width: 80 }
  );
  y = addFormTextField(
    doc,
    "transdis_impl_legal_review",
    "Legal review date and reviewing counsel (name or firm):",
    y,
    { multiline: true, lines: 2 }
  );
  y += LINE_HEIGHT;

  if (y > 240) {
    doc.addPage();
    y = 20;
  }
  y = addSignatureBlock(doc, "transdis_sign", y);

  addDisclaimer(doc);
  return doc;
}
