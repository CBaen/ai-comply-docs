# SEO Audit — aicompliancedocuments.com
**Conducted:** 2026-04-24 | **Auditor:** Claude (codebase read, no live crawl except as noted)

---

## DIMENSION 1 — TECHNICAL SEO

### robots.txt — MISSING (P0)
`public/robots.txt` does not exist. Without it, every bot defaults to full access — fine in principle, but the site has no way to block training scrapers or send explicit signals to crawlers. The bigger risk: no explicit `Allow` directives for AI-retrieval bots like OAI-SearchBot or Claude-SearchBot means some conservative bot stacks may treat the absence ambiguously.

**Bot taxonomy gap:** The following bots have no declared policy:
- Category 1 (training, block if desired): GPTBot, ClaudeBot, Google-Extended, CCBot, FacebookBot
- Category 2 (search/retrieval, must allow): OAI-SearchBot, Claude-SearchBot, PerplexityBot, Bingbot
- Category 3 (user-triggered, should allow): Claude-User, Perplexity-User, ChatGPT-User

No blanket `Disallow: /` found (good — the problem is absence, not misconfig). The sitemap URL also cannot be declared without this file.

### Sitemap — Mostly Good, One Structural Gap
`src/app/sitemap.ts` is present and correct for the core pages. All 4 state landing pages are included. Gated pages (`/review-docs-*`, `/account/*`, `/design-contest/*`) are correctly excluded. Two issues:

1. `siteLastUpdated` is hardcoded to `2026-03-25` — multiple pages have been updated since (Colorado/Illinois pages, Nav, FeaturedInBar, new blog post). Google uses `lastModified` to prioritize crawl scheduling. Stale dates lose that signal.
2. The new blog post `/blog/texas-traiga-4-months-in-no-public-enforcement-yet` (date: 2026-04-23) does get a dynamic `lastModified` from `post.date`, so it will show correctly once Google discovers it.

### Canonical URLs — Good
All indexable page `metadata` exports include `alternates.canonical` with the full absolute URL. Checked: homepage (`src/app/page.tsx:24`), Colorado state page (`src/app/colorado-ai-compliance/page.tsx:21`), Illinois (`src/app/illinois-ai-compliance/page.tsx`), Texas, `/products`, `/ai-compliance-by-state`, `/products/[slug]` (line 44), `/blog/[slug]` (line 43). No missing canonicals on indexable pages.

### Noindex Coverage — Correct on All Gated Pages
All review-docs-*, review-addons-x7k9m, account/layout, and design-contest/1-8 pages have `robots: { index: false, follow: false }`. Verified via grep across 21 files. No indexable page accidentally has noindex.

### HTTPS / Redirects — Clean
Vercel enforces HTTPS. `next.config.ts` has four permanent (301) redirects: `/regulations` → `/products`, `/regulations/:slug` → `/products/:slug`, and the four blog→state-page redirects. No chains detected (all are single-hop 301s).

### Core Web Vitals Reporting
Google Analytics (GA4) is loaded via `next/script` with `afterInteractive` (no render-blocking). No `@vercel/analytics` or `reportWebVitals` export found — CWV data flows through GA4's web vitals library only if the gtag integration is configured for it. This is not a blocking issue; GA4 does capture CWV passively. No explicit CWV instrumentation is a minor gap.

**Dimension 1 Score: 18/25** — 7 points lost primarily on the missing robots.txt and stale sitemap dates.

---

## DIMENSION 2 — ON-PAGE SEO

### Title Tags
All top-level pages have unique, keyword-present titles. Lengths are appropriate:

| Page | Title | Approx chars |
|------|-------|------|
| Homepage | "AI Compliance Documents — Templates for Every State AI Law" | 57 |
| /products | "AI Compliance Templates — All Products" | 38 — short, could be 50-60 |
| /colorado-ai-compliance | "Colorado SB 24-205 AI Compliance — What You Need Before June 30, 2026" | 70 — borderline long |
| /illinois-ai-compliance | "Illinois HB3773 AI Compliance — What Illinois Employers Need Right Now" | 69 — borderline |
| /ai-compliance-by-state | "AI Compliance Requirements by State — 2026 Guide" | 49 |
| /products/[slug] | "{reg.name} — Compliance Documents" | varies |
| /blog/[slug] | `{ absolute: post.title }` | varies |

The `/products` title at 38 chars is below optimal. The two state landing page titles are at the long end (~70 chars) — Google may truncate. Minor; not blocking ranking.

### Meta Descriptions
Root layout description (`src/app/layout.tsx:29`) is 148 chars — fine. Homepage overrides it cleanly. The 6 blog post descriptions recently rewritten (per session context) were not individually verified in this audit, but the frontmatter pattern supports unique per-post descriptions. `/products` description (line 11) is 97 chars — too short, below the 150-char target.

### H1 Tags
- Homepage: `<h1 className="sr-only">` — H1 is present but visually hidden (`sr-only`). This is technically valid for SEO (Google reads it), but reduces keyword density in the visible page. The carousel hero is the de facto visual headline with no visible H1.
- Colorado state page: H1 "You Just Found Out Your Business Uses AI" — present and prominent. Keyword "Colorado SB 24-205" is in the `<p>` above it and the `<title>`, not the H1 itself.
- Blog posts: H1 is the post title (`src/app/blog/[slug]/page.tsx:177`). Good.
- Products [slug]: Not checked in detail — likely renders product name as H1.

H2/H3 hierarchy is sound across all read pages. No skipped heading levels observed.

### Image Alt Text
Blog hero images use `alt={post.title}` (line 154 in blog/[slug]/page.tsx) — this is a long sentence, not concise alt text, but it passes.

Homepage uses raw `<img>` (not `next/image`) for hero and lifestyle images — 4 occurrences in `src/app/page.tsx`. Alt text is present and descriptive. State landing pages also use raw `<img>`. The design-contest pages and products [slug] page use `next/image` for preview images.

There are **25 raw `<img>` tags** in the codebase vs. **4 `next/image` usages**. This is the most consequential image gap (see Dimension 4).

### Open Graph
All major pages have `openGraph` in metadata. Product pages conditionally include a WebP preview image where a `/previews/{slug}.webp` file exists (`src/app/products/[slug]/page.tsx:48-53`). Root layout OG is the catch-all fallback. Blog posts include `publishedTime` and `authors`. State landing pages have OG. No `og:image` dimensions are missing for known images. Good overall.

### Twitter Card
Root layout includes `twitter: { card: "summary_large_image", ... }` (`src/app/layout.tsx:43`). Individual pages do not override twitter metadata — they inherit the root. This means all pages share the same twitter:title and twitter:description regardless of content. The root twitter description ("AI compliance documents for every state. Self-service, instant download.") is generic but not wrong.

### Structured Data
Present and well-implemented:
- Homepage: `Organization`, `WebSite` (with SearchAction), `FAQPage` — all in `src/app/page.tsx`
- `/products/[slug]`: `Product` schema with `Offer`, `hasMerchantReturnPolicy` — `src/app/products/[slug]/page.tsx:138`
- `/products`: `ItemList` schema
- `/blog/[slug]`: `TechArticle` schema with `publisher`, `datePublished`
- `/colorado-ai-compliance` and state pages: `Product` schema
- `/ai-compliance-by-state`: `Dataset` schema
- `/faq`: FAQPage schema confirmed (file matched structured data grep)

One gap: **no BreadcrumbList** on `/products/[slug]` or `/blog/[slug]`. Breadcrumb rich results are high-value for e-commerce-adjacent pages in SERPs.

**Dimension 2 Score: 19/25** — Points lost on: sr-only H1 on homepage, short `/products` meta description, shared Twitter metadata, missing breadcrumbs.

---

## DIMENSION 3 — CONTENT & STRUCTURE

### Internal Linking — State Landing Pages
Homepage (`src/app/page.tsx`) does not directly link to any of the four state landing pages (`/colorado-ai-compliance`, `/illinois-ai-compliance`, etc.) in its body. Links go to `/products` and specific product slugs. The `FeaturedInBar` and `Nav` are the only surface where state pages are reachable from the homepage. The Nav recently added the "By State" link to `/ai-compliance-by-state`, which is a hub — but the four state pages are only one click deeper.

State pages link to `/products/[slug]` (good). Blog posts do link to state pages and products (verified in Texas TRAIGA post). The `/ai-compliance-by-state` hub links to state pages (structure visible in the page).

**Orphan risk:** Illinois and Texas state pages have "Discovered – currently not indexed" status per the brief. This is a crawl issue, not an orphan issue — both are in the sitemap and are linked from `/ai-compliance-by-state`. The more likely cause is that Googlebot hasn't re-crawled those URLs since the sitemap resubmission. The `siteLastUpdated` hardcoding (2026-03-25) may have caused Google to deprioritize them.

### Anchor Text
Internal links use descriptive anchor text throughout ("Get All 8 Documents — $449", "Illinois HB3773 Package", "Multi-State Profiling Bundle"). No naked URL anchors found. No keyword stuffing. Diverse and natural.

### Thin Content Check
Blog posts reviewed: Texas TRAIGA 4-months post is ~2,400 words (frontmatter + body). Workday post is ~2,400 words. All posts include structured frontmatter (title, description, tags, microFacts, externalReferences). No thin-content posts detected — all are substantive legal analysis.

Product pages: These are primarily templated pages that inherit `description` from `regulations.ts`. Content depth depends on how rich each regulation's description is. Not a thin-content risk given the questionnaire + document lists on each page.

### Duplicate Content
The redirect rules in `next.config.ts` handle the main duplicate-content risk (old `/regulations/` paths redirect to `/products/`). Canonical tags are present on all pages. No duplicate content signals detected.

### Breadcrumbs
No breadcrumb navigation on `/products/[slug]` or `/blog/[slug]`. These are two-level-deep pages that would benefit from both visual breadcrumbs and BreadcrumbList JSON-LD for Google's rich results. This is the largest structural gap in Dimension 3.

**Dimension 3 Score: 18/25** — Points lost on: no homepage body links to state pages, missing breadcrumbs, state page crawl stall.

---

## DIMENSION 4 — PERFORMANCE & MOBILE

### Image Optimization — Major Gap
The site has **25 raw `<img>` tags** vs. 4 `next/image` usages. `next/image` provides: automatic WebP/AVIF conversion, lazy loading, `srcset` for responsive images, and prevents layout shift (CLS) by requiring `width`/`height`. All of the following use raw `<img>`:

- Homepage hero (`src/app/page.tsx:185`) — large above-the-fold image
- Homepage lifestyle images (lines 342, 393, 499) — 3 more raw imgs
- Colorado state page — hero background + lifestyle images (raw `<img>` throughout)
- All other state landing pages — same pattern
- Blog post header images (`src/app/blog/[slug]/page.tsx:153`) — raw `<img src={post.image}`

The hero background images (`/images/landing/homepage-hero.png`, `/images/landing/colorado-denver-skyline.png`) load at full resolution without Next.js optimization. These are likely PNG files served at original size. This directly impacts LCP (Largest Contentful Paint), which is a Core Web Vital.

Product pages and Nav use `next/image` correctly. The gap is concentrated in marketing pages and blog posts.

### Server vs Client Components
Homepage is server-rendered (`src/app/page.tsx` — no `"use client"`). Layout is server-rendered. The only `"use client"` component on the homepage is `ProductCarousel` (assumed, as it's imported without `"use client"` in page.tsx — need to check). The products page uses `PremiumPricingClient` which is explicitly a client component. State landing pages are fully server-rendered. Good server-component discipline overall.

### Third-Party Scripts
Two scripts load via `next/script`:
1. Google Analytics (`afterInteractive`) — deferred, not render-blocking
2. Dark-mode init (`beforeInteractive`) — necessary for preventing flash, minimal payload

Stripe.js loads on checkout pages only (not analyzed here). No render-blocking third-party scripts on marketing pages. Good.

### Responsive Design
Tailwind CSS is used throughout. Responsive breakpoints (`sm:`, `md:`, `lg:`, `xl:`) are applied to all layout grids. No fixed-pixel-width containers observed. Mobile-first patterns are consistent.

### Touch Targets & Font Size
Buttons throughout use at least `py-3 px-6` or `py-4 px-8` — well above 44px minimum. Body text uses `font-sans` (Source Sans 3) with Tailwind's default sizing (`text-sm`, `text-base`). Base `text-sm` is 14px in Tailwind by default — slightly below the 16px recommendation for body text on some components. Most body copy uses `text-base` (16px) or larger. Not a blocking issue.

**Dimension 4 Score: 16/25** — Major deduction for raw `<img>` across all marketing pages directly harming LCP. Minor deductions for no explicit CWV reporting.

---

## ACTION ITEMS

| # | Action | Owner | Priority | Dimension | Effort | Expected Impact | Verification |
|---|--------|--------|----------|-----------|--------|-----------------|-------------|
| 1 | Create `public/robots.txt` with explicit Allow for search/retrieval bots (OAI-SearchBot, Claude-SearchBot, PerplexityBot, Bingbot) and declare sitemap URL. Optionally block training scrapers (GPTBot, ClaudeBot, Google-Extended). | Claude | P0 | Technical | XS | Removes crawl ambiguity; enables sitemap declaration; allows training-bot policy choice | `curl https://aicompliancedocuments.com/robots.txt` after deploy |
| 2 | Update `src/app/sitemap.ts` line 7: change `siteLastUpdated` to a dynamic `new Date()` or bump it to `2026-04-24` and add logic to track actual modification dates per page. Static date of `2026-03-25` undersignals to Google that recently updated pages (Colorado, Illinois, Texas pages, Nav changes) should be re-crawled. | Claude | P0 | Technical | XS | Prompts Googlebot to re-crawl state pages that are stuck at "Discovered – currently not indexed" | GSC Coverage report — Illinois/Texas pages should move from Discovered to Indexed within 2-4 crawl cycles |
| 3 | Convert homepage hero `<img>` (line 185 in `src/app/page.tsx`) to `next/image` with `priority` prop (LCP element). Same for Colorado and other state landing page hero images. | Claude | P1 | Performance | M | Direct LCP improvement — largest above-the-fold image now lazy-loads by default; `priority` flag preloads it. CWV LCP score improves. | Lighthouse LCP score before/after deploy |
| 4 | Convert all remaining raw `<img>` tags in blog/[slug]/page.tsx (line 153) and lifestyle images in marketing pages to `next/image`. This is 20+ instances — batch by file. | Claude | P1 | Performance | L | CLS reduction (width/height required), automatic WebP serving, improved Page Experience signal | Lighthouse CLS score; check Network tab for WebP responses |
| 5 | Add `BreadcrumbList` JSON-LD to `/products/[slug]` (Home > Products > [Product Name]) and `/blog/[slug]` (Home > Blog > [Post Title]). Also add visible breadcrumb nav. | Claude | P1 | On-Page SEO | S | Eligible for breadcrumb rich results in SERPs. Improves click-through on product and blog pages. | Google Rich Results Test on a product URL |
| 6 | Add 2-3 direct text links to state landing pages in the homepage body content. Current homepage body only links to `/products` and product slugs. Suggested placement: in the "What happens if you don't comply?" penalty section — each state's penalty mention should link to its state landing page. | Claude | P1 | Content & Structure | XS | Distributes PageRank to state pages; improves their crawlability; reduces the "1 click to hub, then 1 more to state" friction | GSC — check if IL/TX pages begin accumulating internal link count |
| 7 | Update `/products` page title from "AI Compliance Templates — All Products" (38 chars) to something 50-60 chars, e.g. "AI Compliance Templates for State & Federal AI Laws — All Products". Update meta description from 97 chars to 150-160 chars. | Claude | P1 | On-Page SEO | XS | Better title tag fills out the SERP snippet; longer description may improve CTR from 0.19% baseline | GSC CTR for /products after 4-6 weeks |
| 8 | Add per-page Twitter Card overrides on state landing pages and high-traffic blog posts. Currently all pages inherit the root layout's generic twitter:description. Adding `twitter: { card: "summary_large_image", title: "...", description: "..." }` to each state page metadata export will improve social sharing and Open Graph consistency. | Claude | P2 | On-Page SEO | S | Improved social share previews; minor indirect CTR benefit when shared | Twitter Card Validator on each state URL |
| 9 | Make homepage H1 visible. Currently `<h1 className="sr-only">` (line 193 in `src/app/page.tsx`). The text "AI Compliance Documents — State AI Compliance Templates" is keyword-rich but invisible. Integrate a visible H1 into the hero carousel or position it as the visible headline above the ProductCarousel. | Claude | P2 | On-Page SEO | S | Improves keyword density signal in visible content; eliminates reliance on sr-only for primary keyword | Manually inspect rendered HTML; Lighthouse accessibility score |
| 10 | Add a `dateModified` field to the blog frontmatter schema and update it when posts are edited. Currently `blogPostingSchema.dateModified` (line 95 in blog/[slug]/page.tsx) is set to `post.date` (publish date). If a post is substantially updated — especially the 6 with recent meta description rewrites — Google won't know. | Claude | P2 | Technical | S | More accurate freshness signal for updated posts; helps posts retain position in time-sensitive query results | View-source on an updated post; verify dateModified reflects edit date |

---

## SEO SCORE

| Dimension | Score | Max |
|-----------|-------|-----|
| Technical SEO | 18 | 25 |
| On-Page SEO | 19 | 25 |
| Content & Structure | 18 | 25 |
| Performance & Mobile | 16 | 25 |
| **TOTAL** | **71** | **100** |

**Overall: 71/100**

The site is fundamentally sound — structured data is excellent, canonical discipline is clean, noindex coverage on gated pages is correct, and blog content quality is high. The score is suppressed by two mechanical issues that are Claude-addressable without content approval: the missing robots.txt and the pervasive use of raw `<img>` instead of `next/image`.

---

## TOP 3 PRIORITIES

**P0-1: Create robots.txt** — The only file that tells crawlers where the sitemap lives. Also the required surface for declaring AI-retrieval bot policy. Zero code risk; XS effort.

**P0-2: Bump sitemap `siteLastUpdated`** — The Illinois and Texas state pages are "Discovered – currently not indexed" in GSC. The hardcoded March 25 date is the most plausible signal suppressing Googlebot's recrawl urgency on recently-updated pages. One line change in `src/app/sitemap.ts`.

**P1-3: Convert hero images to `next/image` with `priority`** — The homepage LCP element is a raw `<img>` with no preloading, no WebP, and no size attributes. This is the most direct CWV improvement available and directly impacts how Google's Page Experience signal scores the site.

---

## UNMEASURABLE FROM CODEBASE

- **Live Core Web Vitals scores** — LCP, FID/INP, CLS values require Lighthouse or CrUX data against the live site. Codebase analysis can identify risks (raw img, no priority hint) but not actual scores.
- **GSC impressions / click distribution by query** — Which specific keywords drive the 13,890 impressions/quarter requires GSC data. The 0.19% CTR gap is a SERP appearance problem (title/description quality) that requires live click data to pinpoint by page.
- **Crawl budget consumption** — Whether the `/review-docs-*` or `/design-contest/*` pages (noindexed but not disallowed in robots.txt) are consuming crawl budget on a zero-return basis cannot be confirmed without server logs or GSC crawl stats.
- **Product page structured data eligibility** — Whether the `Product` schema on product pages qualifies for rich results requires the Rich Results Test to run against the live rendered page, since the test checks rendered output (including hydration), not just source code.
