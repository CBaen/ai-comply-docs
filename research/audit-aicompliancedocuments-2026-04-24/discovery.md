# Discovery Brief — aicompliancedocuments.com Full Visibility Audit
## Date: 2026-04-24
## Invoked by: direct (user request via search-visibility-audit skill)

## Target

**Primary:** Codebase at `C:/Users/baenb/projects/project _cameron/aicomplydocs/`
**Secondary:** Live URL `https://aicompliancedocuments.com/` (spot-check)

## Site Type

Commercial B2B compliance document storefront. Sells downloadable AI compliance document packages for US state laws (Colorado SB 24-205, Illinois HB3773, Texas TRAIGA / HB 149, California CCPA ADMT) and frameworks (NIST AI RMF, ISO 42001, EU AI Act, EEOC / federal). 53 products cataloged in `src/data/regulations.ts`. Prices $49-$349 per product.

## Business Description

Digital product business run by a solo operator (Guiding Light / Cameron). LLC, live revenue (Stripe live mode). Positioned as plain-English compliance documents for small businesses that cannot afford $15K–$50K law firm engagements. Primary differentiator: legal-integrity discipline — every claim traced to .gov primary source.

## Framework & Stack

- **Next.js 16** (App Router)
- **React 19**
- **MDX** for blog (`content/blog/*.mdx`)
- **Vercel** hosting, deploys from GitHub `CBaen/ai-comply-docs`
- **Stripe** live-mode checkout
- **Supabase** for customer accounts/purchases

## Page Inventory (from `src/app/**/page.tsx`)

**Public indexable:**
- `/` — homepage (`src/app/page.tsx`)
- `/about`
- `/blog` (listing) + `/blog/[slug]` (26 dynamic routes)
- `/products` (listing) + `/products/[slug]` (53 dynamic routes)
- `/ai-compliance-by-state` (hub page, added Sextant session)
- `/colorado-ai-compliance`, `/illinois-ai-compliance`, `/texas-ai-compliance`, `/california-ai-compliance` (4 state landing pages)
- `/do-i-need-ai-compliance` (quiz)
- `/faq`, `/contact`, `/privacy`, `/terms`

**Public non-indexable (design contest):**
- `/design-contest/1` through `/design-contest/8` + index
- `/design-contest/4` (Premium Pricing) recently promoted to LIVE — replaces products page per commit f9621a7

**Private / gated (should have noindex):**
- `/account`, `/account/login`, `/account/purchases`
- `/review-addons-x7k9m`, `/review-docs-*` (10 internal review pages with obfuscated slugs)

**Blog post count:** 26 .mdx files in `content/blog/`

## Recent Changes (Sextant session, 2026-04-23)

1. New blog post: `texas-traiga-4-months-in-no-public-enforcement-yet.mdx`
2. Meta description rewrites on top 6 blog posts (purchase-intent framing)
3. `By State` nav link added → `/ai-compliance-by-state` (desktop + mobile, `src/components/Nav.tsx`)
4. 4-state card grid added to `/ai-compliance-by-state` page to surface state landing pages
5. `FeaturedInBar` component added to homepage (ABOVE hero) + 4 state landing pages — cites National Law Review mention
6. Footer updated with "Featured In" section + NLR link
7. Law-firm claims removed from homepage (integrity fix)
8. Colorado AG claim removed (stale)
9. FRIA scope on review-addons page rewritten per EU AI Act Art. 27(1) + Annex III 5(b)/5(c)

## Ground-Truth Baseline (GSC data, pulled this session)

- **Impressions/quarter:** 13,890
- **CTR:** 0.19% (baseline — meta rewrites aim to lift)
- **GSC URL inspections (fresh today):**
  - `/blog/texas-traiga-4-months-in-no-public-enforcement-yet` — **URL unknown to Google** (never crawled; sitemap resubmitted 2026-04-24 to trigger)
  - `/illinois-ai-compliance` — **Discovered – currently not indexed** (in sitemap; 1 referring URL; never crawled)
  - `/texas-ai-compliance` — **Discovered – currently not indexed** (same pattern)
- **Sitemap:** `https://aicompliancedocuments.com/sitemap.xml` registered; last downloaded 2026-04-23; resubmitted 2026-04-24 (pending)

## Ranking Context for Orchestrator Filters

Site has current rankings (13.9K quarterly impressions) but extremely low CTR. **Not a fresh-launch scenario** — this is a maintain/relaunch-style audit on a site that's being read by Google but not converting clicks or fully indexed. The direct invocation here treats it neutrally, but orchestrators may want maintain-visibility framing.

## Audit Output Directory

`research/audit-aicompliancedocuments-2026-04-24/`

## Known Constraints

- **Legal integrity is a first-class brand pillar.** Any AEO/GEO recommendation that asks for "punchy claim copy" must preserve source-linking to .gov URLs. Inventing statistics or softening citations is off-limits.
- **GL has RSD + ADHD.** Action list format must be scannable. Avoid wall-of-text recommendations.
- **No LinkedIn suggestions.** GL has a moral boundary against LinkedIn — do NOT include LinkedIn posting as a GEO action item (this violates the general GEO playbook but is a hard constraint here). Flag the trade-off rather than recommend the action.
- **"Time" language is forbidden** in recommendations per global CLAUDE.md. Use "task," "stage," "next" rather than "by Monday."
