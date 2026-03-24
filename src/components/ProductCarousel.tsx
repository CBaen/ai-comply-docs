"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import type { Regulation } from "@/data/regulations";

interface Props {
  products: Regulation[];
}

export default function ProductCarousel({ products }: Props) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useRef(
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % products.length);
  }, [products.length]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + products.length) % products.length);
  }, [products.length]);

  useEffect(() => {
    if (paused || reducedMotion.current) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [paused, next]);

  const p = products[current];
  if (!p) return null;

  const statusLabel =
    p.status === "in-effect"
      ? "IN EFFECT"
      : p.status === "effective-soon"
        ? "EFFECTIVE SOON"
        : "PROPOSED";
  const statusColor =
    p.status === "in-effect"
      ? "bg-red-500/20 text-red-300 border-red-400/40"
      : p.status === "effective-soon"
        ? "bg-amber-500/20 text-amber-300 border-amber-400/40"
        : "bg-slate-500/20 text-slate-300 border-slate-400/40";
  const dotColor =
    p.status === "in-effect"
      ? "bg-red-400"
      : p.status === "effective-soon"
        ? "bg-amber-400"
        : "bg-slate-400";

  return (
    <div
      className="relative"
      aria-roledescription="carousel"
      aria-label="Featured compliance products"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Content — px-12 on mobile reserves space for the nav arrows; expands to px-6 md:px-16 */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="max-w-4xl mx-auto px-12 sm:px-6 md:px-16 py-10 sm:py-16 md:py-24 text-center flex flex-col justify-center"
      >
        {/* Breadcrumb */}
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-400 mb-3 sm:mb-4">
          <Link href="/products" className="hover:text-blue-300 transition">
            All Products
          </Link>
          <span className="text-slate-600">|</span>
          <span>{p.state}</span>
        </div>

        {/* Status badge + effective date */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-5">
          <span
            className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 sm:px-3 sm:py-1.5 rounded font-semibold border ${statusColor}`}
          >
            <span aria-hidden="true" className={`inline-block w-1.5 h-1.5 rounded-sm ${dotColor}`} />
            {statusLabel}
          </span>
          <span className="text-xs sm:text-sm text-slate-400">
            Effective: {p.effectiveDate}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold font-display text-white leading-tight tracking-tight mb-4 sm:mb-5 transition-opacity duration-500">
          {p.shortName}
        </h2>

        {/* Who is this for — bullet points */}
        {p.appliesToBullets && p.appliesToBullets.length > 0 ? (
          <div className="mb-6 sm:mb-8 max-w-xl mx-auto">
            <p className="text-xs font-semibold text-blue-300 uppercase tracking-wider mb-3">This applies to you if:</p>
            <ul className="space-y-2 text-left">
              {p.appliesToBullets.slice(0, 3).map((bullet, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="text-sm text-slate-300 leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-sm sm:text-base md:text-lg text-slate-300 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed line-clamp-3">
            {p.description}
          </p>
        )}

        {/* Price + CTA — stacks vertically on mobile, side-by-side on sm+ */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-6 sm:mb-8">
          <div className="text-center sm:text-left">
            <span className="text-3xl sm:text-4xl font-extrabold text-white">${p.price}</span>
            <span className="text-slate-400 text-xs sm:text-sm ml-1.5 sm:ml-2">one-time purchase</span>
          </div>
          <Link
            href={`/products/${p.slug}`}
            aria-label={`Get started with ${p.shortName}`}
            className="w-full sm:w-auto bg-white text-slate-900 px-7 py-3 sm:py-3.5 rounded-lg font-bold text-sm sm:text-base hover:bg-gray-100 transition shadow-lg text-center"
          >
            Get Started
          </Link>
        </div>

        {/* Document count + penalty — wraps cleanly on narrow screens */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs sm:text-sm text-slate-400">
          <span className="flex items-center gap-1.5">
            <svg aria-hidden="true" className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            {p.documentCount} documents included
          </span>
          <span className="flex items-center gap-1.5">
            <svg aria-hidden="true" className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
            </svg>
            {p.maxPenalty}
          </span>
        </div>
      </div>

      {/* Navigation arrows — smaller on mobile, tucked close to edges, vertically centered on content area */}
      <button
        onClick={prev}
        className="absolute left-1 sm:left-3 md:left-6 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 min-w-[44px] min-h-[44px] rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
        aria-label="Previous product"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button
        onClick={next}
        className="absolute right-1 sm:right-3 md:right-6 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 min-w-[44px] min-h-[44px] rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
        aria-label="Next product"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Dots + Pause/Play */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 pb-4 sm:pb-6">
        {products.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to product ${i + 1}`}
            aria-current={i === current ? "true" : undefined}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <span
              className={`h-1.5 sm:h-2 rounded-full transition-all pointer-events-none ${
                i === current
                  ? "bg-white w-5 sm:w-6"
                  : "w-1.5 sm:w-2 bg-white/30 hover:bg-white/50"
              }`}
            />
          </button>
        ))}
        <button
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Play carousel" : "Pause carousel"}
          className="min-w-[44px] min-h-[44px] flex items-center justify-center text-white/60 hover:text-white transition"
        >
          {paused ? (
            <svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          ) : (
            <svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
