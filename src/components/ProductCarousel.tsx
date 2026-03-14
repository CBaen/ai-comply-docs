"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import type { Regulation } from "@/data/regulations";

interface Props {
  products: Regulation[];
}

export default function ProductCarousel({ products }: Props) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % products.length);
  }, [products.length]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + products.length) % products.length);
  }, [products.length]);

  useEffect(() => {
    if (paused) return;
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
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-16 md:py-24 text-center min-h-[420px] flex flex-col justify-center">
        {/* Breadcrumb */}
        <div className="flex items-center justify-center gap-2 text-sm text-slate-400 mb-4">
          <Link href="/regulations" className="hover:text-blue-300 transition">
            All Products
          </Link>
          <span className="text-slate-600">|</span>
          <span>{p.state}</span>
        </div>

        {/* Status badge + effective date */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <span
            className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded font-semibold border ${statusColor}`}
          >
            <span className={`inline-block w-1.5 h-1.5 rounded-sm ${dotColor}`} />
            {statusLabel}
          </span>
          <span className="text-sm text-slate-400">
            Effective: {p.effectiveDate}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-extrabold font-display text-white leading-tight tracking-tight mb-5 transition-opacity duration-500">
          {p.shortName}
        </h2>

        {/* Description */}
        <p className="text-base md:text-lg text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed line-clamp-3">
          {p.description}
        </p>

        {/* Price + CTA */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <div className="text-left">
            <span className="text-4xl font-extrabold text-white">${p.price}</span>
            <span className="text-slate-400 text-sm ml-2">one-time purchase</span>
          </div>
          <Link
            href={`/regulations/${p.slug}`}
            className="bg-white text-slate-900 px-7 py-3.5 rounded-lg font-bold text-base hover:bg-gray-100 transition shadow-lg"
          >
            Get Started
          </Link>
        </div>

        {/* Document count + penalty */}
        <div className="flex items-center justify-center gap-6 text-sm text-slate-400">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            {p.documentCount} documents included
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
            </svg>
            {p.maxPenalty}
          </span>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
        aria-label="Previous product"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button
        onClick={next}
        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
        aria-label="Next product"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 pb-6">
        {products.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current
                ? "bg-white w-6"
                : "bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to product ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
