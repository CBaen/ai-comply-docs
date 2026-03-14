"use client";

import { useState } from "react";
import { generateDocuments } from "@/lib/pdf-generator";
import type { ComplianceFormData } from "@/lib/pdf-types";

const SAMPLE_DATA: ComplianceFormData = {
  regulation: "",
  generatedDate: new Date().toISOString().split("T")[0],
  includeTrainingKit: false,
  company: {
    name: "Sample Corp",
    state: "Illinois",
    size: "51-250",
    industry: "Technology",
  },
  aiSystems: [
    {
      name: "ResumeScreen AI",
      vendor: "TalentTech Inc.",
      description: "Automated resume screening and candidate ranking for open positions",
      decisions: ["recruitment", "hiring"],
    },
    {
      name: "Performance Insights",
      vendor: "WorkMetrics LLC",
      description: "AI-powered performance review analysis and promotion recommendations",
      decisions: ["promotion", "terms"],
    },
  ],
  dataInputs: ["resume", "performance_data", "assessment"],
  protectedCharacteristics: ["race", "gender", "age", "disability"],
  biasAudit: "no",
  oversight: {
    aiRole: "primary",
    oversightRole: "VP of Human Resources",
    humanReview: "yes",
    reviewFrequency: "quarterly",
  },
  contact: {
    name: "Jane Smith",
    title: "Chief Compliance Officer",
    email: "compliance@samplecorp.com",
    phone: "(555) 123-4567",
  },
};

const REGULATIONS = [
  { slug: "illinois-hb3773", name: "Illinois HB3773" },
  { slug: "colorado-sb24-205", name: "Colorado SB24-205" },
  { slug: "employee-ai-policy", name: "Employee AI Policy" },
  { slug: "vendor-ai-due-diligence", name: "Vendor Due Diligence" },
  { slug: "ai-bias-audit-template", name: "Bias Audit Templates" },
  { slug: "ai-incident-response-plan", name: "Incident Response Plan" },
];

interface DocResult {
  name: string;
  textContent: string;
}

export default function ReviewDocuments() {
  const [generating, setGenerating] = useState(false);
  const [results, setResults] = useState<Record<string, DocResult[]>>({});
  const [error, setError] = useState("");

  async function generateAll() {
    setGenerating(true);
    setError("");
    const allResults: Record<string, DocResult[]> = {};

    for (const reg of REGULATIONS) {
      try {
        const data = { ...SAMPLE_DATA, regulation: reg.slug };
        const docs = await generateDocuments(data);
        allResults[reg.slug] = docs.map((doc) => {
          // Extract text content from jsPDF document
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const internal = doc.doc as any;
          const pageCount = internal.internal.getNumberOfPages();
          let text = "";
          for (let p = 1; p <= pageCount; p++) {
            doc.doc.setPage(p);
            text += `\n--- PAGE ${p} ---\n`;
            // Get text from the page using jsPDF's internal API
            const pageText = internal.internal.pages[p];
            if (Array.isArray(pageText)) {
              pageText.forEach((line: string) => {
                // Extract text from PDF operators - match (text) Tj patterns
                const matches = line.match(/\(([^)]*)\)\s*Tj/g);
                if (matches) {
                  matches.forEach((m: string) => {
                    const t = m.replace(/^\(/, "").replace(/\)\s*Tj$/, "");
                    if (t.trim()) text += t + "\n";
                  });
                }
              });
            }
          }
          return { name: doc.name, textContent: text };
        });
      } catch (err) {
        allResults[reg.slug] = [{ name: "ERROR", textContent: String(err) }];
      }
    }

    setResults(allResults);
    setGenerating(false);
  }

  return (
    <div className="max-w-6xl mx-auto p-8 font-mono text-sm">
      <h1 className="text-2xl font-bold mb-2">Document Review — All Products</h1>
      <p className="text-gray-600 mb-4">
        Internal page for AI-assisted document review. Generates all documents as
        readable text. Not linked from the public site.
      </p>

      <button
        onClick={generateAll}
        disabled={generating}
        className="bg-blue-700 text-white px-6 py-3 rounded font-bold mb-8 disabled:opacity-50"
      >
        {generating ? "Generating all documents..." : "Generate All Documents as Text"}
      </button>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {Object.entries(results).map(([slug, docs]) => {
        const reg = REGULATIONS.find((r) => r.slug === slug);
        return (
          <div key={slug} className="mb-12">
            <h2 className="text-xl font-bold border-b-2 border-blue-700 pb-2 mb-4">
              {reg?.name || slug}
            </h2>
            {docs.map((doc, i) => (
              <div key={i} className="mb-8">
                <h3 className="font-bold text-base bg-gray-100 p-2 mb-2">
                  Document: {doc.name}
                </h3>
                <pre className="whitespace-pre-wrap text-xs leading-relaxed bg-white border p-4 max-h-[600px] overflow-y-auto">
                  {doc.textContent || "(No text extracted — document may use form fields only)"}
                </pre>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
