"use client";

import { useRef } from "react";
import Link from "next/link";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  readTime: string;
  cardSummary?: string;
  description: string;
  image?: string;
}

function formatDate(dateStr: string) {
  return new Date(dateStr + "T12:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogSlider({ posts }: { posts: BlogPost[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = 300;
    const gap = 20;
    const distance = cardWidth + gap;
    scrollRef.current.scrollBy({
      left: direction === "right" ? distance : -distance,
      behavior: "smooth",
    });
  };

  if (posts.length === 0) return null;

  return (
    <div className="relative">
      {/* Left arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-md hover:bg-gray-50 transition text-gray-600 hover:text-gray-900"
        aria-label="Scroll left"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* Right arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-md hover:bg-gray-50 transition text-gray-600 hover:text-gray-900"
        aria-label="Scroll right"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scroll-smooth px-12 pb-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {posts.map((p) => (
          <article
            key={p.slug}
            className="flex-shrink-0 w-[280px] sm:w-[300px] bg-white rounded-lg border border-gray-200 p-4 sm:p-5 hover:border-blue-700 hover:shadow-md transition flex flex-col snap-start"
          >
            {p.image && (
              <Link href={`/blog/${p.slug}`} tabIndex={-1} aria-hidden="true">
                <img
                  src={p.image}
                  alt=""
                  className="w-full h-32 object-cover rounded mb-3"
                />
              </Link>
            )}
            <div className="flex flex-wrap gap-1 mb-2">
              {p.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="font-bold font-display text-gray-900 mb-2 leading-snug flex-1 text-sm">
              <Link href={`/blog/${p.slug}`} className="hover:text-blue-700 transition">
                {p.title}
              </Link>
            </h3>
            <p className="text-xs text-gray-600 mb-3 line-clamp-2">
              {p.cardSummary || p.description}
            </p>
            <div className="flex items-center justify-between text-xs text-gray-600 mt-auto">
              <time dateTime={p.date}>{formatDate(p.date)}</time>
              <span>{p.readTime}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
