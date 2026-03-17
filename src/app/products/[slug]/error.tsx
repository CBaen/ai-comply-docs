"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ProductError({ error, reset }: ErrorProps) {
  return (
    <>
      <Nav />
      <main className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Something went wrong loading this page.
        </h1>
        <p className="text-gray-600 mb-6 max-w-md">
          We ran into an unexpected error. You can try again, or reach out if the
          problem persists.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <button
            onClick={reset}
            className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg transition"
          >
            Try again
          </button>
          <a
            href="mailto:info@aicompliancedocuments.com"
            className="text-sm text-blue-700 hover:underline"
          >
            info@aicompliancedocuments.com
          </a>
        </div>
        {process.env.NODE_ENV === "development" && error?.message && (
          <pre className="mt-8 text-left text-xs text-red-600 bg-red-50 border border-red-200 rounded p-4 max-w-xl overflow-auto">
            {error.message}
          </pre>
        )}
      </main>
      <Footer />
    </>
  );
}
