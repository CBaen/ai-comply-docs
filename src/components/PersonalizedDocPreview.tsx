"use client";

import { useEffect, useRef, useState } from "react";
import type { ComplianceFormData } from "@/lib/pdf-types";

interface PersonalizedDocPreviewProps {
  formData: ComplianceFormData;
  regulationSlug: string;
}

interface RenderedDoc {
  name: string;
  canvas: HTMLCanvasElement;
}

export default function PersonalizedDocPreview({ formData, regulationSlug }: PersonalizedDocPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [docs, setDocs] = useState<RenderedDoc[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [blurred, setBlurred] = useState(false);
  const [error, setError] = useState(false);

  // Screenshot protection: blur when tab loses focus
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "hidden") {
        setBlurred(true);
      } else {
        // Slight delay before unblurring to catch quick app-switch screenshots
        setTimeout(() => setBlurred(false), 300);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function generate() {
      try {
        const [{ generateDocuments }, pdfjsLib] = await Promise.all([
          import("@/lib/pdf-generator"),
          import("pdfjs-dist"),
        ]);

        pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/build/pdf.worker.min.mjs",
          import.meta.url
        ).toString();

        const generatedDocs = await generateDocuments(formData);
        if (cancelled || !generatedDocs || generatedDocs.length === 0) return;

        const rendered: RenderedDoc[] = [];

        for (const genDoc of generatedDocs) {
          const pdfBytes = genDoc.doc.output("arraybuffer");
          const pdf = await pdfjsLib.getDocument({ data: pdfBytes }).promise;
          const page = await pdf.getPage(1);
          const scale = 1.5;
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const ctx = canvas.getContext("2d");
          if (!ctx) continue;

          await page.render({ canvasContext: ctx, viewport } as any).promise;

          // Draw watermark
          ctx.save();
          ctx.translate(viewport.width / 2, viewport.height / 2);
          ctx.rotate(-Math.PI / 4);
          ctx.font = "bold 36px sans-serif";
          ctx.fillStyle = "rgba(0, 0, 0, 0.06)";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("PREVIEW", 0, -24);
          ctx.font = "bold 16px sans-serif";
          ctx.fillText("PURCHASE TO DOWNLOAD", 0, 10);
          ctx.restore();

          // Extract a clean document name from the filename
          const docName = genDoc.name
            .replace(/^[A-Za-z]+_/, "")  // Remove company prefix
            .replace(/_/g, " ")
            .replace(/\.pdf$/i, "");

          rendered.push({ name: docName, canvas });
        }

        if (!cancelled) {
          setDocs(rendered);
          setLoading(false);
        }
      } catch (e) {
        console.error("Personalized preview failed:", e);
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      }
    }

    generate();
    return () => { cancelled = true; };
  }, [formData, regulationSlug]);

  // Render active canvas into the container
  useEffect(() => {
    if (!containerRef.current || docs.length === 0) return;
    const wrapper = containerRef.current;
    // Clear previous
    while (wrapper.firstChild) wrapper.removeChild(wrapper.firstChild);
    // Clone and append active canvas
    const activeCanvas = docs[activeTab]?.canvas;
    if (activeCanvas) {
      const clone = activeCanvas.cloneNode(true) as HTMLCanvasElement;
      const ctx = clone.getContext("2d");
      if (ctx) {
        ctx.drawImage(activeCanvas, 0, 0);
      }
      clone.style.width = "100%";
      clone.style.height = "auto";
      clone.style.userSelect = "none";
      (clone.style as any).WebkitUserSelect = "none";
      clone.style.pointerEvents = "none";
      wrapper.appendChild(clone);
    }
  }, [activeTab, docs]);

  if (error) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <svg className="w-5 h-5 text-green-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
          Your documents are ready — complete purchase to download
        </h4>
      </div>

      {loading ? (
        <div className="bg-gray-100 dark:bg-slate-700 rounded-lg flex items-center justify-center py-16">
          <div className="animate-pulse flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-slate-600" />
            <p className="text-sm text-gray-500">Generating your documents...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Tab switcher */}
          {docs.length > 1 && (
            <div className="flex gap-1 overflow-x-auto pb-1">
              {docs.map((doc, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveTab(i)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition min-h-[32px] ${
                    i === activeTab
                      ? "bg-blue-700 text-white"
                      : "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-600"
                  }`}
                >
                  {doc.name}
                </button>
              ))}
            </div>
          )}

          {/* Protected preview container */}
          <div
            className={`preview-protected relative rounded-lg overflow-hidden border border-gray-200 dark:border-slate-600 transition-all duration-300 ${
              blurred ? "blur-xl" : ""
            }`}
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
          >
            <div ref={containerRef} className="bg-white" />

            {/* Transparent overlay to block interactions */}
            <div className="absolute inset-0 z-10" style={{ cursor: "default" }} />

            {/* Bottom gradient with purchase prompt */}
            <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-gray-900/80 to-transparent p-4 pt-16">
              <p className="text-white text-sm font-medium text-center">
                {docs.length} document{docs.length === 1 ? "" : "s"} ready — complete purchase below to download
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
