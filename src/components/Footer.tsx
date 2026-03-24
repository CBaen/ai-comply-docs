import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top: 4 balanced columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Products */}
          <nav aria-label="Products">
            <h4 className="font-bold text-sm text-white mb-4">Products</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/products/colorado-sb24-205" className="text-slate-400 hover:text-white transition">Colorado SB 24-205</Link></li>
              <li><Link href="/products/illinois-hb3773" className="text-slate-400 hover:text-white transition">Illinois HB3773</Link></li>
              <li><Link href="/products/california-ccpa-admt" className="text-slate-400 hover:text-white transition">California CCPA ADMT</Link></li>
              <li><Link href="/products/nyc-local-law-144" className="text-slate-400 hover:text-white transition">NYC Local Law 144</Link></li>
              <li><Link href="/products" className="text-slate-400 hover:text-white transition">All Products</Link></li>
            </ul>
          </nav>

          {/* Resources */}
          <nav aria-label="Resources">
            <h4 className="font-bold text-sm text-white mb-4">Resources</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/blog" className="text-slate-400 hover:text-white transition">Blog</Link></li>
              <li><Link href="/ai-compliance-by-state" className="text-slate-400 hover:text-white transition">Compare State Laws</Link></li>
              <li><Link href="/do-i-need-ai-compliance" className="text-slate-400 hover:text-white transition">Free Assessment</Link></li>
              <li><Link href="/faq" className="text-slate-400 hover:text-white transition">FAQ</Link></li>
              <li><Link href="/colorado-ai-compliance" className="text-slate-400 hover:text-white transition">Colorado AI Compliance</Link></li>
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company">
            <h4 className="font-bold text-sm text-white mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/about" className="text-slate-400 hover:text-white transition">About &amp; Methodology</Link></li>
              <li><Link href="/contact" className="text-slate-400 hover:text-white transition">Contact</Link></li>
              <li><Link href="/terms" className="text-slate-400 hover:text-white transition">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-slate-400 hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="/account" className="text-slate-400 hover:text-white transition">My Account</Link></li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm text-white mb-4">Get in Touch</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="mailto:info@aicompliancedocuments.com" className="text-slate-400 hover:text-white transition">
                  info@aicompliancedocuments.com
                </a>
              </li>
              <li className="text-slate-500 text-xs leading-relaxed pt-1">
                Responses within one business day.
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 pt-6">
          {/* Disclaimer */}
          <p className="text-slate-500 text-xs leading-relaxed mb-4">
            AI Compliance Documents generates documentation templates based on published
            regulatory text. This is not legal advice. Templates are based on
            statutes and proposed rules current at the time of purchase.
            Regulatory requirements may change. Consult qualified legal counsel
            for formal compliance verification.
          </p>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-slate-500">
            <p>
              &copy; {new Date().getFullYear()} AI Compliance Documents. All rights reserved.
            </p>
            <p>30-day money-back guarantee. Secure checkout via Stripe.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
