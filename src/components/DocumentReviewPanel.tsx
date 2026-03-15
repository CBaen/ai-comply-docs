"use client";
import { useState } from "react";
import { regulations } from "@/data/regulations";

interface Props {
  slugs: string[];
  groupName: string;
}

export default function DocumentReviewPanel({ slugs, groupName }: Props) {
  const [_state] = useState(null); // satisfies "use client" requirement
  const products = slugs.map(s => regulations.find(r => r.slug === s)).filter(Boolean) as NonNullable<typeof regulations[number]>[];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">Document Review: {groupName}</h1>
      <p className="text-sm text-gray-500 mb-8">For internal review only. Not indexed.</p>

      {products.map(reg => (
        <div key={reg.slug} className="mb-12 border-b pb-8">
          <h2 className="text-xl font-bold text-blue-800">{reg.name}</h2>
          <p className="text-sm text-gray-600 mb-1">Slug: {reg.slug} | Price: ${reg.price} | Documents: {reg.documentCount}</p>
          <p className="text-sm text-gray-600 mb-1">Citation: {reg.citation}</p>
          <p className="text-sm mb-1"><a href={reg.citationUrl} className="text-blue-600 underline" target="_blank">{reg.citationUrl}</a></p>
          <p className="text-sm text-gray-600 mb-1">Status: {reg.status} | Effective: {reg.effectiveDate}</p>
          <p className="text-sm text-gray-600 mb-1">Ready: {reg.ready ? "YES" : "NO"} | Stripe: {reg.stripePriceId ? "Configured" : "MISSING"}</p>

          <div className="mt-3 bg-slate-50 p-4 rounded">
            <p className="font-semibold text-sm mb-2">Description:</p>
            <p className="text-sm text-gray-700">{reg.description}</p>
          </div>

          <div className="mt-3 bg-slate-50 p-4 rounded">
            <p className="font-semibold text-sm mb-2">Penalty Summary:</p>
            <p className="text-sm text-gray-700">{reg.penaltySummary}</p>
            <p className="text-sm font-bold text-red-700 mt-1">Max: {reg.maxPenalty}</p>
          </div>

          <div className="mt-3 bg-slate-50 p-4 rounded">
            <p className="font-semibold text-sm mb-2">Applies To:</p>
            <p className="text-sm text-gray-700">{reg.appliesToSummary}</p>
          </div>

          <div className="mt-3">
            <p className="font-semibold text-sm mb-2">Documents Included ({reg.documents.length}):</p>
            <ol className="list-decimal list-inside space-y-1">
              {reg.documents.map((doc, i) => (
                <li key={i} className="text-sm text-gray-700">{doc}</li>
              ))}
            </ol>
          </div>

          <div className="mt-3">
            <p className="font-semibold text-sm mb-2">Keywords:</p>
            <p className="text-sm text-gray-500">{reg.keywords.join(", ")}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
