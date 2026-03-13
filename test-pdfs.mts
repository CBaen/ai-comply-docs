/**
 * Test script: exercises all 16 PDF generators (8 IL + 8 CO)
 * Run with: npx tsx test-pdfs.mts
 */

import { jsPDF } from "jspdf";
import * as fs from "fs";
import * as path from "path";
import type { ComplianceFormData } from "./src/lib/pdf-types";

// tsx resolves these as CJS interop — access via default
import ilDefault from "./src/lib/pdf-illinois";
import coDefault from "./src/lib/pdf-colorado";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const il = ilDefault as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const co = coDefault as any;

// ── Ensure output directory exists ────────────────────────────
const OUTPUT_DIR = path.join(process.cwd(), "test-output");
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// ── Illinois test data ─────────────────────────────────────────
const ilData: ComplianceFormData = {
  regulation: "illinois-hb3773",
  company: {
    name: "Acme Staffing Solutions LLC",
    state: "Illinois",
    size: "201-500",
    industry: "Staffing & Recruitment",
  },
  aiSystems: [
    {
      name: "HireVue Essentials",
      vendor: "HireVue",
      description:
        "Video interview analysis platform that scores candidate responses using natural language processing and facial expression analysis.",
      decisions: ["hiring", "screening", "recruitment"],
    },
    {
      name: "Eightfold Talent AI",
      vendor: "Eightfold AI",
      description:
        "Talent intelligence platform that matches candidates to open roles based on skills inference and career trajectory modeling.",
      decisions: ["hiring", "promotion", "training"],
    },
  ],
  dataInputs: ["resume", "video", "assessment", "performance_data"],
  protectedCharacteristics: ["race", "gender", "age", "disability"],
  biasAudit:
    "Annual independent third-party bias audit conducted by Biddle Consulting Group. Last audit: Q4 2025. Next audit scheduled: Q4 2026.",
  oversight: {
    aiRole: "screening",
    oversightRole: "advisory",
    humanReview:
      "All AI recommendations reviewed by a licensed HR professional before any employment decision is finalized.",
    reviewFrequency: "quarterly",
  },
  contact: {
    name: "Jordan Rivera",
    title: "Chief People Officer",
    email: "jrivera@acmestaffing.com",
    phone: "(312) 555-0147",
  },
  generatedDate: "March 12, 2026",
  includeTrainingKit: true,
};

// ── Colorado test data ─────────────────────────────────────────
const coData: ComplianceFormData = {
  regulation: "colorado-sb24-205",
  company: {
    name: "Mountain West Insurance Group",
    state: "Colorado",
    size: "51-200",
    industry: "Insurance",
  },
  aiSystems: [
    {
      name: "Lemonade AI Underwriter",
      vendor: "Lemonade Inc.",
      description:
        "Automated underwriting engine that assesses risk profiles and determines premium pricing for homeowners and renters insurance applications.",
      decisions: ["insurance", "financial"],
    },
    {
      name: "Shift Claims Intelligence",
      vendor: "Shift Technology",
      description:
        "Claims processing AI that triages incoming claims, flags potential fraud, and recommends approval or investigation pathways.",
      decisions: ["insurance", "financial", "legal"],
    },
  ],
  dataInputs: ["assessment", "performance_data", "attendance", "biometric"],
  protectedCharacteristics: ["race", "gender", "age", "disability", "religion"],
  biasAudit:
    "Semi-annual algorithmic impact assessments conducted by internal AI Ethics team with external validation by NAIC-aligned auditors. Last completed: January 2026.",
  oversight: {
    aiRole: "primary",
    oversightRole: "advisory",
    humanReview:
      "Licensed underwriters review all AI-generated risk scores above the 70th percentile and all adverse decisions before issuance.",
    reviewFrequency: "biannual",
  },
  contact: {
    name: "Priya Nair",
    title: "VP of Compliance & Legal Affairs",
    email: "pnair@mwig.com",
    phone: "(720) 555-0293",
  },
  generatedDate: "March 12, 2026",
  includeTrainingKit: false,
};

// ── Runner ─────────────────────────────────────────────────────
interface TestResult {
  name: string;
  status: "PASS" | "FAIL";
  pages?: number;
  sizeKb?: number;
  error?: string;
}

function runGenerator(
  label: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fn: (data: ComplianceFormData) => any,
  data: ComplianceFormData,
  filename: string
): TestResult {
  try {
    const doc: jsPDF = fn(data);
    const output = doc.output("arraybuffer");
    const bytes = new Uint8Array(output);
    const filePath = path.join(OUTPUT_DIR, filename);
    fs.writeFileSync(filePath, bytes);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pages = (doc as any).internal.getNumberOfPages();
    const sizeKb = Math.round(bytes.byteLength / 1024);

    return { name: label, status: "PASS", pages, sizeKb };
  } catch (err) {
    return {
      name: label,
      status: "FAIL",
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

// ── Run all Illinois tests ─────────────────────────────────────
const results: TestResult[] = [];

console.log("\n=== Illinois HB3773 Generators ===\n");

const ilTests: [string, string, string][] = [
  ["IL-1: Notification Letter",  "generateNotificationLetter",  "IL_01_notification_letter.pdf"],
  ["IL-2: System Inventory",     "generateSystemInventory",     "IL_02_system_inventory.pdf"],
  ["IL-3: Impact Assessment",    "generateImpactAssessment",    "IL_03_impact_assessment.pdf"],
  ["IL-4: Oversight Protocol",   "generateOversightProtocol",   "IL_04_oversight_protocol.pdf"],
  ["IL-5: Compliance Checklist", "generateComplianceChecklist", "IL_05_compliance_checklist.pdf"],
  ["IL-6: Accommodation Form",   "generateAccommodationForm",   "IL_06_accommodation_form.pdf"],
  ["IL-7: Manager Training",     "generateManagerTraining",     "IL_07_manager_training.pdf"],
  ["IL-8: Employee FAQ",         "generateEmployeeFAQ",         "IL_08_employee_faq.pdf"],
];

for (const [label, fnName, filename] of ilTests) {
  const fn = il[fnName];
  if (typeof fn !== "function") {
    results.push({ name: label, status: "FAIL", error: `Export '${fnName}' not found` });
    console.log(`  x ${label} — FAIL: export '${fnName}' not found`);
    continue;
  }
  const result = runGenerator(label, fn, ilData, filename);
  results.push(result);
  if (result.status === "PASS") {
    console.log(`  ok ${result.name} — ${result.pages} page(s), ${result.sizeKb} KB`);
  } else {
    console.log(`  x ${result.name} — ERROR: ${result.error}`);
  }
}

// ── Run all Colorado tests ─────────────────────────────────────
console.log("\n=== Colorado SB 24-205 Generators ===\n");

const coTests: [string, string, string][] = [
  ["CO-1: Risk Management Policy", "generateCORiskManagementPolicy",  "CO_01_risk_management_policy.pdf"],
  ["CO-2: Impact Assessment",      "generateCOImpactAssessment",      "CO_02_impact_assessment.pdf"],
  ["CO-3: Consumer Notice",        "generateCOConsumerNotice",        "CO_03_consumer_notice.pdf"],
  ["CO-4: Adverse Decision Kit",   "generateCOAdverseDecisionKit",    "CO_04_adverse_decision_kit.pdf"],
  ["CO-5: Transparency Statement", "generateCOTransparencyStatement", "CO_05_transparency_statement.pdf"],
  ["CO-6: Incident Response",      "generateCOIncidentResponse",      "CO_06_incident_response.pdf"],
  ["CO-7: Record Retention",       "generateCORecordRetention",       "CO_07_record_retention.pdf"],
  ["CO-8: Compliance Checklist",   "generateCOComplianceChecklist",   "CO_08_compliance_checklist.pdf"],
];

for (const [label, fnName, filename] of coTests) {
  const fn = co[fnName];
  if (typeof fn !== "function") {
    results.push({ name: label, status: "FAIL", error: `Export '${fnName}' not found` });
    console.log(`  x ${label} — FAIL: export '${fnName}' not found`);
    continue;
  }
  const result = runGenerator(label, fn, coData, filename);
  results.push(result);
  if (result.status === "PASS") {
    console.log(`  ok ${result.name} — ${result.pages} page(s), ${result.sizeKb} KB`);
  } else {
    console.log(`  x ${result.name} — ERROR: ${result.error}`);
  }
}

// ── Summary ────────────────────────────────────────────────────
const passed = results.filter((r) => r.status === "PASS").length;
const failed = results.filter((r) => r.status === "FAIL").length;

console.log(`\n=== Summary: ${passed} passed, ${failed} failed ===\n`);

if (failed > 0) {
  console.log("FAILURES:");
  results
    .filter((r) => r.status === "FAIL")
    .forEach((r) => console.log(`  - ${r.name}: ${r.error}`));
  process.exit(1);
}
