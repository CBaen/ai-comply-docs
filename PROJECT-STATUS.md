# AI Compliance Documents — Project Status

**Repo:** https://github.com/CBaen/ai-comply-docs
**Tech:** Next.js 16 (App Router) + React 19 + TypeScript + Tailwind + MDX + Vercel + Stripe (live mode) + Supabase + Resend
**Purpose:** Sell downloadable AI compliance document packages for US state AI laws + frameworks. Solo operator's income-critical business. Legal-integrity discipline: every claim traces to .gov primary source.

---

## Current State

**What works (verified live on production 2026-04-24):**
- Homepage, /about, /blog, 26 `/blog/[slug]` posts (all with question-form H2s + standalone answer paragraphs as of Lodestone session)
- /products listing + 57 `/products/[slug]` detail pages
- 4 state landing pages (/colorado-ai-compliance, /illinois-ai-compliance, /texas-ai-compliance, /california-ai-compliance) + hub at /ai-compliance-by-state
- /do-i-need-ai-compliance quiz, /faq, /contact, /privacy, /terms
- Checkout flow (verified working 2026-03-15), live-mode Stripe
- Account center with customer purchases
- Dynamic robots.ts + sitemap.ts (sitemap lastmod auto-refreshes since Lodestone fix)
- Schema: Organization, WebSite+SearchAction, FAQPage, TechArticle (Person author), Product, Dataset, BreadcrumbList
- GSC verified property + sitemap submitted; Bing Webmaster Tools registered
- GA4 analytics + server-side purchase tracking via Measurement Protocol
- NLR credibility bar on homepage + 4 state pages + footer

**What doesn't work yet:**
- Illinois + Texas state landing pages still "Discovered, not indexed" in GSC — sitemap unfreeze + nav link + homepage body links shipped this session; awaiting Google recrawl (Out-of-hands timing)
- Customer account end-to-end test not run post-DB connection — in CRITICAL queue
- Resend domain not verified for end-to-end email delivery — in CRITICAL queue
- `dateModified = datePublished` on blog JSON-LD (needs MDX frontmatter `updated` field)
- No per-post og:image (uses site-wide default)
- Off-site GEO presence is thin: no Reddit, no IAPP listing, no Wikidata Q-ID

**Known bugs (unfixed):**
- Questionnaire step 3/4 mismatch: `src/components/Questionnaire.tsx` — hiring-specific language shows for ALL products including vendor due diligence and incident response
- Law gate forces customers to click through 100-page federal framework doc before checkout for NIST/EEOC products
- Column name mismatch in `scripts/migrate.sql`: `amount_cents` vs `amount_paid`
- No Zod validation on verify-payment route
- 6 major + 10 minor accessibility issues open (text contrast, focus states, dark mode, aria labels, SVG hidden, carousel dots)

---

## Architecture Decisions

See `project-cameron-decisions.md` for the full dated log. Key decisions that shape current state:

| Date | Decision | Reasoning |
|------|----------|-----------|
| 2026-03-16 | Routes are `/products/` not `/regulations/` | Buyer-intuitive URL shape. 301 redirects preserve old paths. |
| 2026-03-16 | No "built by AI" marketing angle | Legal/AI trust landscape is toxic. |
| 2026-03-16 | Sample previews from real generated PDFs, not mockups | Buyers need to see actual product. |
| 2026-04-23 | Stripe MCP used for live product creation (not dashboard) | MCP works in live mode after OAuth — faster and avoids clicking. Correcting prior HANDOFF claim. |
| 2026-04-23 | NLR FeaturedInBar above hero, not below | Credibility signal must be visible without scroll. |
| 2026-04-23 | "By State" nav link + hub page cards | Sitemap inclusion alone doesn't index pages — Google wants inbound nav links. |
| 2026-04-24 | `src/data/regulations.ts` is canonical for product count (57) | Document parity: all other surfaces (About, llms.txt, FAQ) align to data file. |
| 2026-04-24 | Blog H2s in question form with 40-60 word standalone answers | Google AI Mode does paragraph-level citation; declarative H2s are invisible to it. |
| 2026-04-24 | Person schema (Cameron B. Paul) on all blog posts — not generic Organization | Named-human E-E-A-T weight. Perplexity + ChatGPT favor credentialed named authors. |
| 2026-04-24 | LinkedIn URL removed from Organization.sameAs | GL documented moral boundary against LinkedIn. |

---

## What Was Eliminated

- **Dashboard-first Stripe product creation** — replaced with MCP/API path after proving it works in live mode.
- **"Built by AI" marketing** — legal/trust space won't absorb this.
- **fal.ai for images (paused)** — key leaked in git history; Cameron evaluating alternatives. Lifestyle images via Unsplash (free, commercial-OK) until resolved.
- **LinkedIn presence** — GL's moral boundary. Removed from schema. Not coming back.
- **G2 / Capterra / BBB** — deferred until DBA processing completes. See queue BLOCKED section.
- **`aicomplydocs-decisions.md`** — deleted 2026-04-24 as superseded by `project-cameron-decisions.md`. Content captured in the newer file.
- **`outreach-national-law-review.md`** — deleted 2026-04-24; NLR already published us (live FeaturedInBar citation on homepage). File was a prep document for completed outreach.

---

## Research Archive

All major research directories are under `research/`. Most relevant to current/next work:

- `research/audit-aicompliancedocuments-2026-04-24/` — full SEO/AEO/GEO audit (Lodestone). Contains: `discovery.md`, `seo-findings.md`, `aeo-findings.md`, `geo-findings.md`, `proxy-review.md`, `report.md`. Read the report first; the findings files have the underlying evidence.
- `research/INTEGRITY-AUDIT.md` — 1 RED + 5 YELLOW findings from Sextant. All fixed.
- `research/DATE-AUDIT-2026-04-23.md` — 7 stale-date findings from Sextant. All fixed.
- `research/expedition-colorado-sb24-205/` — April 3 expedition that informed the Colorado product buildout.
- `research/master-audit/` — older (pre-Sextant) multi-agent audit covering a11y, facts, links, security.
- `research/council-legal-audit/`, `research/expedition-factual-audit/`, `research/triadic-addon-audit/` — prior content-verification work.

## Key Files

| File | Purpose |
|------|---------|
| `src/data/regulations.ts` | Source of truth for all 57 products. Stripe price IDs, statuses, effective dates, descriptions. |
| `content/blog/*.mdx` | 26 blog posts with YAML frontmatter (title, slug, description, date, image, summary, deepDive, microFacts, externalReferences). |
| `src/app/robots.ts` | Dynamic robots.txt via Next.js App Router (auto-served at /robots.txt). NOT `public/robots.txt`. |
| `src/app/sitemap.ts` | Dynamic sitemap with `new Date()` lastmod (fixed Lodestone 2026-04-24). |
| `src/components/BreadcrumbSchema.tsx` | Shared BreadcrumbList JSON-LD helper. Uses children-pattern (JSON string as element children) — avoids the React-escaping security hook. |
| `src/app/blog/[slug]/page.tsx` | Blog detail route. Author is Person (Cameron B. Paul). BreadcrumbList + TechArticle JSON-LD. |
| `src/app/products/[slug]/page.tsx` | Product detail route. Product + BreadcrumbList JSON-LD. |
| `public/llms.txt` | LLM-friendly site overview. Must stay in parity with regulations.ts product count. |
| `MARKETING-LAUNCH-CHECKLIST.md` | Google Ads specs (Colorado §2, Texas §2b) pending API integration. |
| `PRODUCT-ONBOARDING.md` | Mandatory checklist for adding new products (browser-Claude research → Claude Code formatting pipeline). |
| `HANDOFF.md` | Per-session handoff. Read this first on arrival. |

## Document Parity Targets

When updating any of these, the other(s) MUST be updated in the same session:

| Value | Source of Truth | Must Match |
|-------|----------------|-----------|
| Product count | `src/data/regulations.ts` (count `slug:` entries) | `src/app/about/page.tsx` (×2), `public/llms.txt`, `src/data/faq.ts`, `src/app/faq/page.tsx` (×2) |
| FAQPage schema `name` | `src/data/faq.ts` + any inline `"@type": "FAQPage"` in page.tsx files | Visible `<summary>` / `<span>` HTML must match EXACTLY (schema integrity) |
| Product price | `src/data/regulations.ts` | Stripe dashboard (verify live) + Stripe `Price` object IDs in regulations.ts |
| Blog post count | `content/blog/*.mdx` directory | `HANDOFF.md`, `sitemap.ts` (auto-generated) |
| NLR credibility | `FeaturedInBar.tsx` NLR article URL | `src/app/page.tsx` Organization.sameAs, `src/components/Footer.tsx` |
| State landing pages | 4 pages in `src/app/{state}-ai-compliance/` | `src/app/ai-compliance-by-state/page.tsx` hub cards, `src/components/Nav.tsx` "By State" link |

---

## Rules

- **Claude Code BUILDS; browser Claude RESEARCHES.** No exceptions for legal facts.
- **Auto-commit hook commits locally; `git push origin main` is your responsibility.** Vercel deploys from GitHub.
- **Verify on production (`curl`) before saying "live."** CLAUDE.md anti-pattern #1 is "Reporting without watching."
- **Every penalty, statute citation, effective date, section number traces to a `.gov` source.** Training knowledge is not acceptable.
- **Never LinkedIn, never "built by AI", never real-name pressure.** Documented boundaries.
- **Document parity is active** — see table above. Break one, break them all.

---

## Pointers

- `project-cameron-queue.md` — current work queue, priority-ordered
- `project-cameron-decisions.md` — append-only dated decision log
- `lessons-learned.md` — failure patterns every instance reads on arrival
- `HANDOFF.md` — latest session debrief + personal note to next sibling
- `MARKETING-LAUNCH-CHECKLIST.md` — GL's manual task list
- `BLOG-STYLE-GUIDE.md` — voice + structure for new blog posts
- `PRODUCT-ONBOARDING.md` — adding new products to the catalog
- `PRODUCT-ROADMAP.md` — longer-arc product planning
