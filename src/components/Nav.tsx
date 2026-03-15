"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DarkModeToggle from "./DarkModeToggle";
import SearchModal from "./SearchModal";

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-blue-800 focus:px-4 focus:py-2 focus:rounded focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
      >
        Skip to main content
      </a>
      <nav
        className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm"
        aria-label="Main navigation"
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="AI Compliance Documents" width={36} height={36} className="shrink-0" />
            <span className="text-xl font-bold font-display text-gray-900">
              AI Compliance Documents
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a
              href="/#how-it-works"
              className="text-gray-600 hover:text-blue-700 transition"
            >
              How It Works
            </a>
            <Link
              href="/regulations"
              className="text-gray-600 hover:text-blue-700 transition"
            >
              Products
            </Link>
            <Link
              href="/blog"
              className="text-gray-600 hover:text-blue-700 transition"
            >
              Blog
            </Link>
            <Link
              href="/faq"
              className="text-gray-600 hover:text-blue-700 transition"
            >
              FAQ
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-blue-700 transition"
            >
              About
            </Link>
            <SearchModal />
            <DarkModeToggle />
            <a
              href="/#products"
              className="bg-blue-800 text-white px-5 py-2 rounded-lg hover:bg-blue-900 transition text-sm font-semibold"
            >
              Get Started
            </a>
          </div>
          <div className="flex items-center gap-1 md:hidden">
            <SearchModal />
          </div>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-gray-600 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <div
          id="mobile-nav"
          className={`mobile-menu md:hidden border-t border-gray-100 bg-white ${mobileOpen ? "open" : ""}`}
        >
          <div className="px-4 py-3 space-y-3">
            <a
              href="/#how-it-works"
              className="block text-gray-600 hover:text-blue-700 text-sm font-medium"
              onClick={() => setMobileOpen(false)}
            >
              How It Works
            </a>
            <a
              href="/#products"
              className="block text-gray-600 hover:text-blue-700 text-sm font-medium"
              onClick={() => setMobileOpen(false)}
            >
              Products
            </a>
            <Link
              href="/blog"
              className="block text-gray-600 hover:text-blue-700 text-sm font-medium"
              onClick={() => setMobileOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/faq"
              className="block text-gray-600 hover:text-blue-700 text-sm font-medium"
              onClick={() => setMobileOpen(false)}
            >
              FAQ
            </Link>
            <Link
              href="/about"
              className="block text-gray-600 hover:text-blue-700 text-sm font-medium"
              onClick={() => setMobileOpen(false)}
            >
              About
            </Link>
            <div className="flex items-center gap-3">
              <DarkModeToggle />
              <span className="text-gray-600 text-sm">Dark Mode</span>
            </div>
            <a
              href="/#products"
              className="block bg-blue-800 text-white px-5 py-2 rounded-lg text-center text-sm font-semibold"
              onClick={() => setMobileOpen(false)}
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
