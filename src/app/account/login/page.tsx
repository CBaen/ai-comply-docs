"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const result = await signIn("resend", {
        email: email.trim(),
        redirect: false,
        callbackUrl: "/account/purchases",
      });

      if (result?.error) {
        setStatus("error");
        setErrorMsg("Something went wrong. Please try again.");
      } else {
        setStatus("sent");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  }

  return (
    <>
      <Nav />
      <main id="main-content" className="min-h-screen bg-white">

        {/* Dark hero header */}
        <header className="bg-gray-900 text-white py-12 md:py-20">
          <div className="max-w-3xl mx-auto px-6 sm:px-8">
            <p className="text-blue-400 text-sm font-semibold uppercase tracking-wider mb-4">
              Account
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display leading-tight">
              Sign In to Your Account
            </h1>
          </div>
        </header>

        <div className="max-w-md mx-auto px-6 sm:px-8 py-12 md:py-16">
          {status === "sent" ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                <svg
                  className="w-7 h-7 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2 font-display">
                Check your email
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-6 break-words">
                We sent a secure sign-in link to <strong className="text-gray-900 break-all">{email}</strong>.
                The link expires in 24 hours.
              </p>
              <button
                onClick={() => { setStatus("idle"); setEmail(""); }}
                className="text-sm text-blue-700 hover:underline"
              >
                Use a different email address
              </button>
            </div>
          ) : (
            <>
              <p className="text-gray-600 text-sm mb-8 leading-relaxed">
                Access your purchase history and re-download your compliance documents.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-1.5"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    disabled={status === "loading"}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition disabled:opacity-50"
                  />
                </div>

                {status === "error" && (
                  <div role="alert" className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading" || !email.trim()}
                  className="w-full bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-blue-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "Sending link..." : "Send Sign-In Link"}
                </button>

                <p className="text-xs text-gray-500 text-center leading-relaxed">
                  We&apos;ll email you a secure sign-in link. No password needed.
                </p>
              </form>
            </>
          )}
        </div>

      </main>
      <Footer />
    </>
  );
}
