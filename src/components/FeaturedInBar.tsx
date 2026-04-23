import Link from "next/link";

/**
 * External-authority credibility strip.
 * Links to Guiding Light's byline publication in the National Law Review (March 31, 2026).
 * Slotted near the top of the homepage and the four state landing pages.
 */
export default function FeaturedInBar() {
  return (
    <div className="bg-slate-50 border-y border-slate-200">
      <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-sm">
        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 shrink-0">
          <svg
            className="w-4 h-4 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
            />
          </svg>
          Featured in
        </span>
        <Link
          href="https://natlawreview.com/article/federal-government-quietly-removed-its-ai-hiring-guidance-four-states-are-writing"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-700 hover:text-blue-700 transition-colors leading-snug group"
        >
          <span className="font-bold">The National Law Review</span>
          <span className="text-slate-500 mx-2" aria-hidden="true">
            &middot;
          </span>
          <span className="group-hover:underline">
            &ldquo;The Federal Government Quietly Removed Its AI Hiring Guidance. Four States Are Writing Their Own.&rdquo;
          </span>
          <svg
            className="inline-block w-3 h-3 ml-1 text-slate-400 group-hover:text-blue-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
