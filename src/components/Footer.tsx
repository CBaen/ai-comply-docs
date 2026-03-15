import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-gray-200 py-10 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Brand row — full width on all screens */}
        <div className="mb-8">
          <span className="text-lg font-bold font-display text-gray-900">
            AI Compliance Documents
          </span>
          <p className="text-gray-600 text-sm mt-2 leading-relaxed max-w-sm">
            AI compliance documentation for state and federal regulations.
            Self-service, instant download, fraction of legal fees.
          </p>
        </div>
        {/* Link columns — 2-col on mobile, 2-col on md+ */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h4 className="font-bold text-sm text-gray-900 mb-3">Products</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/regulations/illinois-hb3773"
                  className="text-gray-600 hover:text-blue-700 transition"
                >
                  Illinois HB3773
                </Link>
              </li>
              <li>
                <Link
                  href="/regulations/colorado-sb24-205"
                  className="text-gray-600 hover:text-blue-700 transition"
                >
                  Colorado SB 24-205
                </Link>
              </li>
              <li>
                <Link
                  href="/regulations"
                  className="text-gray-600 hover:text-blue-700 transition"
                >
                  All Products
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm text-gray-900 mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/blog"
                  className="text-gray-600 hover:text-blue-700 transition"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-600 hover:text-blue-700 transition"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/ai-compliance-by-state"
                  className="text-gray-600 hover:text-blue-700 transition"
                >
                  Compare State Laws
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-blue-700 transition"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-blue-700 transition"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-blue-700 transition"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-6">
          <p className="text-gray-400 text-xs leading-relaxed mb-3">
            <strong className="text-gray-600">Legal Disclaimer:</strong> AI
            Compliance Documents generates documentation templates based on published
            regulatory text. This is not legal advice. Templates are based on
            statutes and proposed rules current at the time of purchase.
            Regulatory requirements may change. Consult qualified legal counsel
            for formal compliance verification.
          </p>
          <p className="text-gray-400 text-xs flex flex-wrap gap-x-1">
            <span>&copy; {new Date().getFullYear()} AI Compliance Documents.</span>
            <span>All rights reserved.</span>
            <span>All sales final.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
