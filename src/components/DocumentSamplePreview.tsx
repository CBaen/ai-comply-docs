"use client";

import { useEffect, useRef, useState } from "react";

interface DocumentSamplePreviewProps {
  slug: string;
}

export default function DocumentSamplePreview({ slug }: DocumentSamplePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (rendered || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect();
          renderPreview();
        }
      },
      { rootMargin: "200px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [rendered, loading]);

  async function renderPreview() {
    setLoading(true);
    try {
      // Dynamic imports for code splitting
      const [{ getSampleFormData }, { generateDocuments }, pdfjsLib] = await Promise.all([
        import("@/lib/sample-data"),
        import("@/lib/pdf-generator"),
        import("pdfjs-dist"),
      ]);

      // Set up PDF.js worker
      pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/build/pdf.worker.min.mjs",
        import.meta.url
      ).toString();

      // Generate sample document with dummy data
      const formData = getSampleFormData(slug);
      const docs = await generateDocuments(formData);
      if (!docs || docs.length === 0) {
        setError(true);
        return;
      }

      // Get the first document's PDF bytes
      const firstDoc = docs[0];
      const pdfBytes = firstDoc.doc.output("arraybuffer");

      // Render first page to canvas
      const pdf = await pdfjsLib.getDocument({ data: pdfBytes }).promise;
      const page = await pdf.getPage(1);
      const scale = 1.5;
      const viewport = page.getViewport({ scale });

      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      await page.render({ canvasContext: ctx, viewport, canvas }).promise;

      // Draw watermark
      ctx.save();
      ctx.translate(viewport.width / 2, viewport.height / 2);
      ctx.rotate(-Math.PI / 4);
      ctx.font = "bold 48px sans-serif";
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("SAMPLE", 0, -30);
      ctx.font = "bold 20px sans-serif";
      ctx.fillText("NOT FOR COMPLIANCE USE", 0, 20);
      ctx.restore();

      setRendered(true);
    } catch (e) {
      console.error("Preview generation failed:", e);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div ref={containerRef} className="mt-6">
      {error ? null : (
        <div
          className="relative bg-gray-100 dark:bg-slate-700 rounded-lg overflow-hidden border border-gray-200 dark:border-slate-600"
          onContextMenu={(e) => e.preventDefault()}
        >
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="animate-pulse flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-slate-600" />
                <p className="text-sm text-gray-500">Generating preview...</p>
              </div>
            </div>
          )}
          <canvas
            ref={canvasRef}
            className={`w-full h-auto ${loading ? "hidden" : "block"}`}
            style={{ userSelect: "none", WebkitUserSelect: "none", pointerEvents: "none" }}
          />
          {rendered && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/80 to-transparent p-4 pt-12">
              <p className="text-white text-sm font-medium text-center">
                Purchase to receive your personalized compliance documents
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
