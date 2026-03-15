"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import MiniSearch from "minisearch";

interface SearchItem {
  id: string;
  type: "product" | "blog" | "faq";
  title: string;
  subtitle: string;
  url: string;
  keywords: string;
}

const TYPE_COLORS: Record<string, string> = {
  product: "bg-blue-100 text-blue-700",
  blog: "bg-emerald-100 text-emerald-700",
  faq: "bg-amber-100 text-amber-700",
};

const TYPE_PILL: Record<string, string> = {
  product: "Product",
  blog: "Blog",
  faq: "FAQ",
};

export default function SearchModal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<SearchItem[]>([]);
  const [results, setResults] = useState<SearchItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const searchRef = useRef<MiniSearch<SearchItem> | null>(null);
  const router = useRouter();

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  // Cmd+K / Ctrl+K to open, Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape" && open) {
        e.preventDefault();
        e.stopPropagation();
        close();
      }
    };
    document.addEventListener("keydown", handleKeyDown, true);
    return () => document.removeEventListener("keydown", handleKeyDown, true);
  }, [open, close]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [open]);

  // Load search data on first open
  useEffect(() => {
    if (!open || loaded) return;

    fetch("/api/search-data")
      .then((r) => r.json())
      .then((data: SearchItem[]) => {
        setItems(data);

        const ms = new MiniSearch<SearchItem>({
          fields: ["title", "subtitle", "keywords"],
          storeFields: ["id", "type", "title", "subtitle", "url", "keywords"],
          searchOptions: {
            boost: { title: 3, keywords: 2, subtitle: 1 },
            fuzzy: 0.2,
            prefix: true,
          },
        });
        ms.addAll(data);
        searchRef.current = ms;
        setLoaded(true);
      })
      .catch(() => {});
  }, [open, loaded]);

  // Search on query change
  useEffect(() => {
    if (!searchRef.current || !query.trim()) {
      setResults([]);
      return;
    }

    const raw = searchRef.current.search(query);
    setResults(raw.map((r) => ({
      id: String(r.id),
      type: (r as any).type || "product",
      title: (r as any).title || "",
      subtitle: (r as any).subtitle || "",
      url: (r as any).url || "",
      keywords: (r as any).keywords || "",
    })));
  }, [query]);

  const handleSelect = useCallback(
    (url: string) => {
      close();
      router.push(url);
    },
    [router, close]
  );

  // Group results by type
  const grouped = results.reduce<Record<string, SearchItem[]>>((acc, item) => {
    if (!acc[item.type]) acc[item.type] = [];
    acc[item.type].push(item);
    return acc;
  }, {});

  // When no query, show ALL items grouped by type (browsable)
  const showBrowse = !query.trim() && loaded;
  const allProducts = items.filter((i) => i.type === "product");
  const allBlog = items.filter((i) => i.type === "blog");
  const allFaq = items.filter((i) => i.type === "faq");

  function renderItem(item: SearchItem) {
    return (
      <Command.Item
        key={item.id}
        value={item.id}
        onSelect={() => handleSelect(item.url)}
        className="flex items-start gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-sm data-[selected=true]:bg-blue-50 hover:bg-gray-50 transition"
      >
        <span
          className={`shrink-0 text-[10px] font-bold uppercase px-1.5 py-0.5 rounded mt-0.5 ${TYPE_COLORS[item.type]}`}
        >
          {TYPE_PILL[item.type]}
        </span>
        <div className="min-w-0 flex-1">
          <div className="font-medium text-gray-900 truncate">
            {item.title || item.id.replace(/^(product|blog|faq)-/, '').replace(/-/g, ' ')}
          </div>
          {item.subtitle && (
            <div className="text-gray-500 text-xs truncate mt-0.5">
              {item.subtitle}
            </div>
          )}
        </div>
      </Command.Item>
    );
  }

  return (
    <>
      {/* Search trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="p-2 text-gray-500 hover:text-blue-700 transition rounded-lg hover:bg-gray-100 min-w-[44px] min-h-[44px]"
        aria-label="Search (Ctrl+K)"
        title="Search (Ctrl+K)"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] sm:pt-[15vh] px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Search"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

          {/* Command palette */}
          <Command
            className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[75vh] sm:max-h-[70vh]"
            shouldFilter={false}
          >
            {/* Input row with X button */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
              <svg
                className="w-5 h-5 text-gray-400 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
              <Command.Input
                value={query}
                onValueChange={setQuery}
                placeholder="Search products, articles, FAQs..."
                className="flex-1 bg-transparent text-gray-900 placeholder-gray-400 text-base outline-none"
                autoFocus
              />
              <button
                onClick={close}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Close search"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Screen reader live region for result count */}
            <div role="status" aria-live="polite" className="sr-only">
              {query.trim() && loaded ? `${results.length} result${results.length === 1 ? "" : "s"} found` : ""}
            </div>

            {/* Results — scrollable within the modal */}
            <Command.List className="overflow-y-auto flex-1 px-2 py-2">
              {/* Loading state */}
              {!loaded && (
                <div className="px-4 py-8 text-center text-sm text-gray-400">
                  Loading...
                </div>
              )}

              {/* No query — browse everything */}
              {showBrowse && (
                <>
                  {allProducts.length > 0 && (
                    <Command.Group
                      heading={
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 px-2">
                          Products ({allProducts.length})
                        </span>
                      }
                    >
                      {allProducts.map(renderItem)}
                    </Command.Group>
                  )}
                  {allBlog.length > 0 && (
                    <Command.Group
                      heading={
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 px-2">
                          Blog ({allBlog.length})
                        </span>
                      }
                    >
                      {allBlog.map(renderItem)}
                    </Command.Group>
                  )}
                  {allFaq.length > 0 && (
                    <Command.Group
                      heading={
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 px-2">
                          FAQ ({allFaq.length})
                        </span>
                      }
                    >
                      {allFaq.map(renderItem)}
                    </Command.Group>
                  )}
                </>
              )}

              {/* Search results grouped by type */}
              {query.trim() && results.length > 0 && (
                <>
                  {(["product", "blog", "faq"] as const).map((type) =>
                    grouped[type]?.length ? (
                      <Command.Group
                        key={type}
                        heading={
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 px-2">
                            {TYPE_PILL[type]} ({grouped[type].length})
                          </span>
                        }
                      >
                        {grouped[type].map(renderItem)}
                      </Command.Group>
                    ) : null
                  )}
                </>
              )}

              {/* No results */}
              {query.trim() && loaded && results.length === 0 && (
                <Command.Empty className="px-4 py-8 text-center">
                  <p className="text-sm text-gray-500">
                    No results for &ldquo;{query}&rdquo;
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Try searching by state name, law, or topic
                  </p>
                </Command.Empty>
              )}
            </Command.List>

            {/* Footer */}
            <div className="border-t border-gray-100 px-4 py-2 flex items-center gap-3 text-[11px] text-gray-400">
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 bg-gray-100 border border-gray-200 rounded text-[10px]">↑↓</kbd>
                navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 bg-gray-100 border border-gray-200 rounded text-[10px]">↵</kbd>
                select
              </span>
            </div>
          </Command>
        </div>
      )}
    </>
  );
}
