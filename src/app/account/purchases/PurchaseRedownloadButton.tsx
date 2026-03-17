"use client";

import { useState } from "react";
import type { ComplianceFormData } from "@/lib/pdf-types";

interface Props {
  formData: Record<string, unknown>;
  productName: string;
}

export default function PurchaseRedownloadButton({ formData, productName }: Props) {
  const [status, setStatus] = useState<"idle" | "generating" | "error">("idle");

  async function handleRedownload() {
    setStatus("generating");
    try {
      const docs = await generateDocuments(formData as unknown as ComplianceFormData);
      const zip = new JSZip();
      for (const { doc, name } of docs) {
        zip.file(name, doc.output("arraybuffer"));
      }
      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${productName.replace(/\s+/g, "_")}_Documents.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }

  if (status === "error") {
    return (
      <div className="flex items-center gap-3">
        <span className="text-xs text-red-600">Generation failed.</span>
        <button
          onClick={() => setStatus("idle")}
          className="text-xs text-blue-700 hover:underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleRedownload}
      disabled={status === "generating"}
      className="inline-flex items-center gap-2 bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {status === "generating" ? (
        <>
          <svg
            className="w-4 h-4 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Generating...
        </>
      ) : (
        <>
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Re-download
        </>
      )}
    </button>
  );
}
