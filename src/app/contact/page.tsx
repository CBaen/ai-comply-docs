"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const subjects = [
  "General Inquiry",
  "Product Question",
  "Bulk / Enterprise Pricing",
  "Partnership Opportunity",
  "Press / Media",
  "Technical Issue",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    subject: "General Inquiry",
    message: "",
    _hp: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("sent");
      setForm({ name: "", email: "", company: "", subject: "General Inquiry", message: "", _hp: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to send. Please try again.");
    }
  }

  const inputClass =
    "w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition";

  return (
    <>
      <Nav />
      <main id="main-content" className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-bold font-display text-gray-900 mb-2">
          Contact Us
        </h1>
        <p className="text-gray-600 text-sm mb-8 leading-relaxed">
          Have a question about our compliance documents, need help choosing the right
          package, or want to discuss enterprise pricing? Send us a message and
          we&apos;ll get back to you within one business day.
        </p>

        {status === "sent" ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <svg
              className="w-12 h-12 text-green-600 mx-auto mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-lg font-bold text-green-900 mb-1 font-display">Message Sent</h2>
            <p className="text-green-700 text-sm">
              Thank you for reaching out. We&apos;ll respond within one business day.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-4 text-sm text-blue-700 hover:underline min-h-[44px] px-4 py-2"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Honeypot — invisible to humans */}
            <input
              type="text"
              name="_hp"
              value={form._hp}
              onChange={(e) => setForm({ ...form, _hp: e.target.value })}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: "absolute", left: "-9999px", opacity: 0 }}
            />

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@company.com"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-1">
                  Company <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  id="company"
                  type="text"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  placeholder="Your company"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-1">
                  Subject
                </label>
                <select
                  id="subject"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className={inputClass}
                >
                  {subjects.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                required
                rows={6}
                maxLength={5000}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell us how we can help..."
                className={`${inputClass} resize-y`}
              />
              <p className="text-xs text-gray-400 mt-1 text-right" aria-live="polite">
                {form.message.length}/5,000
              </p>
            </div>

            {status === "error" && (
              <div role="alert" className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full sm:w-auto bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold text-sm hover:bg-blue-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            <p className="text-xs text-gray-400">
              You can also reach us directly at{" "}
              <a href="mailto:info@aicompliancedocuments.com" className="text-blue-600 hover:underline">
                info@aicompliancedocuments.com
              </a>
            </p>
          </form>
        )}
      </main>
      <Footer />
    </>
  );
}
