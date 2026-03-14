"use client";

import { useState } from "react";
import { generateDocuments } from "@/lib/pdf-generator";
import type { ComplianceFormData } from "@/lib/pdf-types";

const SAMPLE_DATA: ComplianceFormData = {
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
  "illinois-hb3773",
  "colorado-sb24-205",
  "employee-ai-policy",
  "vendor-ai-due-diligence",
  "ai-bias-audit-template",
  "ai-incident-response-plan",
];

export default function ReviewDocuments() {
  const [generating, setGenerating] = useState(false);
  const [results, setResults] = useState<Record<string, { name: string; url: string }[]>>({});

  async function generateForRegulation(slug: string) {
    setGenerating(true);
    try {
      const docs = await generateDocuments(slug, SAMPLE_DATA);
      const urls = docs.map((doc) => {
        const blob = doc.doc.output("blob");
        return { name: doc.name, url: URL.createObjectURL(blob) };
      });
      setResults((prev) => ({ ...prev, [slug]: urls }));
    } catch (err) {
      console.error(`Error generating ${slug}:`, err);
      setResults((prev) => ({
        ...prev,
        [slug]: [{ name: "ERROR", url: "#" }],
      }));
    }
    setGenerating(false);
  }

  async function generateAll() {
    setGenerating(true);
    for (const slug of REGULATIONS) {
      try {
        const docs = await generateDocuments(slug, SAMPLE_DATA);
        const urls = docs.map((doc) => {
          const blob = doc.doc.output("blob");
          return { name: doc.name, url: URL.createObjectURL(blob) };
        });
        setResults((prev) => ({ ...prev, [slug]: urls }));
      } catch (err) {
        console.error(`Error generating ${slug}:`, err);
        setResults((prev) => ({
          ...prev,
          [slug]: [{ name: `ERROR: ${err}`, url: "#" }],
        }));
      }
    }
    setGenerating(false);
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-2">Document Review Page</h1>
      <p className="text-gray-600 mb-6 text-sm">
        Internal review page. Generates all product documents with sample data for quality review.
        Not linked from the public site.
      </p>

      <button
        onClick={generateAll}
        disabled={generating}
        className="bg-blue-700 text-white px-6 py-3 rounded-lg font-bold mb-8 disabled:opacity-50"
      >
        {generating ? "Generating..." : "Generate All Documents"}
      </button>

      <div className="space-y-6">
        {REGULATIONS.map((slug) => (
          <div key={slug} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-lg">{slug}</h2>
              <button
                onClick={() => generateForRegulation(slug)}
                disabled={generating}
                className="text-sm bg-gray-100 px-3 py-1 rounded hover:bg-gray-200 disabled:opacity-50"
              >
                Generate
              </button>
            </div>
            {results[slug] ? (
              <ul className="space-y-1">
                {results[slug].map((doc, i) => (
                  <li key={i}>
                    {doc.url === "#" ? (
                      <span className="text-red-600 text-sm">{doc.name}</span>
                    ) : (
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 hover:underline text-sm"
                      >
                        {doc.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 text-sm">Not generated yet</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
