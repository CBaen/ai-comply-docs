"use client";
export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en">
      <body className="bg-white flex items-center justify-center min-h-screen p-6">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
          <p className="text-gray-600 mb-6">
            We hit an unexpected error. Please try again, or contact{" "}
            <a href="mailto:info@aicompliancedocuments.com" className="text-blue-700 underline">
              info@aicompliancedocuments.com
            </a>{" "}
            if this keeps happening.
          </p>
          <button
            onClick={reset}
            className="bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-900 transition"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
