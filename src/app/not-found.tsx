import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main id="main-content" className="min-h-[60vh] flex items-center justify-center bg-white">
        <div className="max-w-md mx-auto px-6 py-16 text-center">
          <p className="text-blue-800 text-sm font-semibold uppercase tracking-wider mb-3">
            Page not found
          </p>
          <h1 className="text-3xl font-bold font-display text-gray-900 mb-4">
            This page doesn&apos;t exist
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed mb-8">
            The page you&apos;re looking for may have been moved or removed.
            Try one of the links below.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="bg-blue-800 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-blue-900 transition"
            >
              Go to Homepage
            </Link>
            <Link
              href="/products"
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg text-sm font-semibold hover:bg-gray-50 transition"
            >
              Browse Products
            </Link>
          </div>
          <p className="text-xs text-gray-400 mt-8">
            Need help?{" "}
            <Link href="/contact" className="text-blue-600 hover:underline">
              Contact us
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
