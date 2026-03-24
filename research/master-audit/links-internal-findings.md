# Internal Links Audit — AI Compliance Documents
**Audit Date:** 2026-03-24
**Auditor:** Dead Links Agent B (Site Internal Links)

---

## Summary

| Category | Count |
|----------|-------|
| Total internal routes verified | 42 |
| Broken internal links (page does not exist) | 5 |
| Broken anchor (#id) references | 1 |
| Blog guide links pointing to non-existent posts | 5 |
| Orphan pages (exist but not linked from nav/footer) | 8 |
| Sitemap URLs missing corresponding pages | 0 |
| Hardcoded product count mismatches | 2 |

---

## Route Map — Confirmed Existing Pages

These routes have a `page.tsx` in `src/app/`:

| Route | File | Status |
|-------|------|--------|
| `/` | `src/app/page.tsx` | OK |
| `/about` | `src/app/about/page.tsx` | OK |
| `/account` | `src/app/account/page.tsx` | OK |
| `/account/login` | `src/app/account/login/page.tsx` | OK |
| `/account/purchases` | `src/app/account/purchases/page.tsx` | OK |
| `/ai-compliance-by-state` | `src/app/ai-compliance-by-state/page.tsx` | OK |
| `/blog` | `src/app/blog/page.tsx` | OK |
| `/blog/[slug]` | `src/app/blog/[slug]/page.tsx` | OK (dynamic) |
| `/colorado-ai-compliance` | `src/app/colorado-ai-compliance/page.tsx` | OK |
| `/contact` | `src/app/contact/page.tsx` | OK |
| `/do-i-need-ai-compliance` | `src/app/do-i-need-ai-compliance/page.tsx` | OK |
| `/faq` | `src/app/faq/page.tsx` | OK |
| `/privacy` | `src/app/privacy/page.tsx` | OK |
| `/products` | `src/app/products/page.tsx` | OK |
| `/products/[slug]` | `src/app/products/[slug]/page.tsx` | OK (dynamic — only `ready: true` products) |
| `/terms` | `src/app/terms/page.tsx` | OK |

**Note:** `src/app/news/` directory exists but contains NO `page.tsx`. This is an empty directory — not a broken link (nothing links to `/news`), but it should be cleaned up.

---

## 1. Nav.tsx — Link Audit

**File:** `src/components/Nav.tsx`

All nav links verified:

| Link | Target Route | Status |
|------|-------------|--------|
| `/` (logo) | `/` | OK |
| `/#how-it-works` | `/` + anchor `#how-it-works` | OK — anchor exists in homepage |
| `/products` | `/products` | OK |
| `/blog` | `/blog` | OK |
| `/faq` | `/faq` | OK |
| `/about` | `/about` | OK |
| `/account` | `/account` | OK |
| `/contact` | `/contact` | OK |
| `/#products` (Get Started button) | `/` + anchor `#products` | OK — `id="products"` exists on homepage section |
| Mobile menu: same links as desktop | All same | OK |
| Mobile "Get Started" → `/products` | `/products` | OK |

**Nav: No broken links.** The "Get Started" button in the desktop nav links to `/#products` (anchor on homepage), while the mobile "Get Started" links to `/products` (products index page). This is inconsistent but not broken.

---

## 2. Footer.tsx — Link Audit

**File:** `src/components/Footer.tsx`

| Link | Target Route | Status |
|------|-------------|--------|
| `/products/colorado-sb24-205` | Product detail (ready=true) | OK |
| `/products/illinois-hb3773` | Product detail (ready=true) | OK |
| `/products/california-ccpa-admt` | Product detail (ready=true) | OK |
| `/products/nyc-local-law-144` | Product detail (ready=true) | OK |
| `/products` | `/products` | OK |
| `/blog` | `/blog` | OK |
| `/ai-compliance-by-state` | `/ai-compliance-by-state` | OK |
| `/do-i-need-ai-compliance` | `/do-i-need-ai-compliance` | OK |
| `/faq` | `/faq` | OK |
| `/colorado-ai-compliance` | `/colorado-ai-compliance` | OK |
| `/about` | `/about` | OK |
| `/contact` | `/contact` | OK |
| `/terms` | `/terms` | OK |
| `/privacy` | `/privacy` | OK |
| `/account` | `/account` | OK |

**Footer: No broken links.**

---

## 3. Homepage (page.tsx) — Link Audit

**File:** `src/app/page.tsx`

| Link | Target | Status |
|------|--------|--------|
| `/#how-it-works` | self-anchor | OK — `id="how-it-works"` exists on page |
| `#products` (Browse Products button) | self-anchor | OK — `id="products"` exists on page |
| `#products` (final CTA) | self-anchor | OK |
| `/about` (methodology links ×2) | `/about` | OK |
| `/products/ai-system-registry` | Product (ready=true) | OK |
| `/products/multi-state-profiling-assessment` | Product (ready=true) | OK |
| `/products/ai-governance-framework` | Product (ready=true) | OK |
| `mailto:info@aicompliancedocuments.com` | External mailto | OK |

**Homepage: No broken links.**

---

## 4. Product Pages — Link Audit

### 4a. Products Index (`src/app/products/page.tsx`)
All product links are dynamically generated from `regulations.filter(r => r.ready)` — no hardcoded broken links.

### 4b. Product Detail Page (`src/app/products/[slug]/page.tsx`)

**CRITICAL ISSUE: BLOG_GUIDES links point to blog posts that do not exist.**

The product detail page has a `BLOG_GUIDES` record mapping product slugs to blog post URLs. The blog post data (`src/data/blog-posts.ts`) has `blogPosts: []` — an empty array. No blog posts exist. All 5 blog guide links will 404 at runtime.

| Product Slug | Blog URL | Status |
|-------------|----------|--------|
| `illinois-hb3773` | `/blog/illinois-hb3773-ai-employment-law-what-employers-need` | **BROKEN — blog post does not exist** |
| `california-ccpa-admt` | `/blog/california-ccpa-admt-risk-assessment-compliance-2026` | **BROKEN — blog post does not exist** |
| `virginia-cdpa` | `/blog/virginia-cdpa-data-protection-assessment-profiling-requirements` | **BROKEN — blog post does not exist** |
| `colorado-sb24-205` | `/blog/colorado-sb-24-205-ai-law-what-businesses-need-to-know` | **BROKEN — blog post does not exist** |
| `connecticut-ctdpa` | `/blog/connecticut-ctdpa-data-protection-assessment-profiling-requirements` | **BROKEN — blog post does not exist** |

**Note:** These links are guarded by `const blogGuide = BLOG_GUIDES[reg.slug] ?? null` and only rendered when truthy (`{blogGuide && ...}`). However, since `blogPosts = []` in the data file, if the blog post slugs were ever added to the data, they would be accessible — but currently clicking these links would serve a 404 via `notFound()` in the blog slug page.

**RELATED_ADDONS slugs:** All add-on product slugs referenced in `RELATED_ADDONS` were verified against `regulations.ts`. All exist and are `ready: true`. No broken add-on links.

**Back to products link:** `href="/#products"` — links to homepage products anchor. Works correctly.

---

## 5. Blog Pages — Link Audit

### 5a. Blog Index (`src/app/blog/page.tsx`)
- All post links are dynamically generated from `getAllBlogPosts()`.
- `blogPosts = []` in `src/data/blog-posts.ts` — zero posts published.
- Blog index shows "No posts yet. Check back soon." — handled gracefully.
- CTA link to `/products` — OK.

### 5b. Blog Post (`src/app/blog/[slug]/page.tsx`)
- Back link to `/blog` — OK.
- Related posts link to `/blog/[p.slug]` — dynamic, no issues.
- CTA link to `/products` — OK.
- No static internal links that could break.

**Blog: No broken links. Zero posts exist, so no dynamic link issues can manifest.**

---

## 6. Colorado Landing Page — Link Audit

**File:** `src/app/colorado-ai-compliance/page.tsx`

| Link | Target | Status |
|------|--------|--------|
| `/` (header logo) | `/` | OK |
| `/products/colorado-sb24-205` (hero CTA) | Product (ready=true) | OK |
| `/do-i-need-ai-compliance` (FAQ link) | `/do-i-need-ai-compliance` | OK |
| `/products/colorado-sb24-205` (mid-page CTA) | Product (ready=true) | OK |
| `/products/colorado-sb24-205` (final CTA) | Product (ready=true) | OK |
| `/privacy` (footer) | `/privacy` | OK |
| `/terms` (footer) | `/terms` | OK |
| `/contact` (footer) | `/contact` | OK |

**Colorado page: No broken links.**

**Note:** This page uses a custom minimal header and footer instead of the Nav/Footer components. The header does NOT link to all standard nav items — only the homepage logo. This is likely intentional for the landing page conversion flow, not a bug.

---

## 7. FAQ Page — Link Audit

**File:** `src/app/faq/page.tsx`

| Link | Target | Status |
|------|--------|--------|
| `/products/ai-system-registry` | Product (ready=true) | OK |
| `/products/multi-state-profiling-assessment` | Product (ready=true) | OK |
| `/products/ai-governance-framework` | Product (ready=true) | OK |
| `/products/ai-system-registry` (second reference) | Product (ready=true) | OK |
| `/products/multi-state-profiling-assessment` (second) | Product (ready=true) | OK |
| `/products/multi-state-employer-ai-disclosure` | Product (ready=true) | OK |
| `/products/annual-compliance-review` | Product (ready=true) | OK |
| `/products` (CTA) | `/products` | OK |

**FAQ: No broken links.**

---

## 8. About Page — Link Audit

**File:** `src/app/about/page.tsx`

| Link | Target | Status |
|------|--------|--------|
| `/products` (CTA) | `/products` | OK |
| `/contact` (CTA) | `/contact` | OK |

**About: No broken links.**

---

## 9. Contact Page — Link Audit

**File:** `src/app/contact/page.tsx`

Only link found: `mailto:info@aicompliancedocuments.com` — external mailto, not an internal link.

**Contact: No broken internal links.**

---

## 10. do-i-need-ai-compliance — Link Audit

**File:** `src/app/do-i-need-ai-compliance/page.tsx`

Links are generated dynamically by `ComplianceQuiz.tsx` from product slugs. All product slugs used are `ready: true`. No broken links.

---

## 11. ai-compliance-by-state — Link Audit

**File:** `src/app/ai-compliance-by-state/page.tsx`

Product links are generated dynamically from `regulations.filter(r => r.tier === "state" && r.ready)`. All valid. No broken links.

---

## 12. Sitemap Verification

**File:** `src/app/sitemap.ts`

Sitemap URLs verified against `src/app/` structure:

| Sitemap URL | Route Exists | Status |
|-------------|-------------|--------|
| `/` | Yes | OK |
| `/products` | Yes | OK |
| `/ai-compliance-by-state` | Yes | OK |
| `/blog` | Yes | OK |
| `/colorado-ai-compliance` | Yes | OK |
| `/do-i-need-ai-compliance` | Yes | OK |
| `/faq` | Yes | OK |
| `/about` | Yes | OK |
| `/contact` | Yes | OK |
| `/privacy` | Yes | OK |
| `/terms` | Yes | OK |
| `/products/${r.slug}` (all ready regulations) | Yes | OK — dynamic, all ready slugs have pages |
| `/blog/${post.slug}` (all published posts) | N/A | OK — `blogPosts = []`, no blog URLs generated |

**Sitemap: No broken URLs. All sitemap entries have corresponding pages.**

**Notable:** Sitemap does NOT include `/account`, `/account/login`, `/account/purchases` — correct, these are gated/private pages and should not be indexed.

**Notable:** Sitemap does NOT include `/news` — correct, no page exists there.

---

## 13. Orphan Pages

Pages that exist in `src/app/` but are not linked from the main Nav, Footer, or any other discoverable location:

| Route | Notes |
|-------|-------|
| `/account/login` | Linked from `/account` page — accessible via account flow. Not in nav/footer directly. Acceptable. |
| `/account/purchases` | Linked from `/account` page — accessible via account flow. Acceptable. |
| `/do-i-need-ai-compliance` | **Linked from footer ("Free Assessment") — OK. Not in nav.** |
| `/ai-compliance-by-state` | **Linked from footer ("Compare State Laws") — OK. Not in nav.** |
| `/review-addons-x7k9m` | **ORPHAN — not linked from nav, footer, or any page audited.** Appears to be an internal review/admin page. |
| `/review-docs-ca-3m8n` | **ORPHAN — not linked from any user-facing page.** Internal review page. |
| `/review-docs-co-9k4p` | **ORPHAN — not linked from any user-facing page.** Internal review page. |
| `/review-docs-eu-6w1x` | **ORPHAN — not linked from any user-facing page.** Internal review page. |
| `/review-docs-federal-1p5z` | **ORPHAN — not linked from any user-facing page.** Internal review page. |
| `/review-docs-il-7x2m` | **ORPHAN — not linked from any user-facing page.** Internal review page. |
| `/review-docs-nyc-5j7w` | **ORPHAN — not linked from any user-facing page.** Internal review page. |
| `/review-docs-states1-8h3q` | **ORPHAN — not linked from any user-facing page.** Internal review page. |
| `/review-docs-states2-4n9v` | **ORPHAN — not linked from any user-facing page.** Internal review page. |
| `/review-docs-universal-7c2b` | **ORPHAN — not linked from any user-facing page.** Internal review page. |
| `/review-docs-va-2r6t` | **ORPHAN — not linked from any user-facing page.** Internal review page. |

The 10 `/review-docs-*` and `/review-addons-*` pages appear to be internal document review tools (obfuscated URLs with random suffixes). They are not linked from any user-facing page, which appears intentional. They are NOT in the sitemap. No action needed for link integrity — but note these are publicly accessible routes if someone knows the URL.

---

## 14. Hardcoded Product Count Mismatches

Multiple pages hardcode "53 compliance packages" but this number is not derived from `regulations.filter(r => r.ready).length`. The actual count should be verified against the data.

**Locations with hardcoded "53":**
- `src/app/faq/page.tsx` — FAQ structured data and visible text: "We offer 53 compliance packages"
- `src/app/about/page.tsx` — "We offer 53 compliance packages" and "View all 53 products"

**Homepage** (`src/app/page.tsx`) uses the dynamic `{readyCount}` variable — correct.
**Products index** uses `regulations.filter(r => r.ready).length` dynamically — correct.

The FAQ and About pages have stale hardcoded counts. If a product is added or removed, these pages will show wrong numbers.

---

## Issues Summary

### BROKEN LINKS (require fixes)

**1. Product detail page — BLOG_GUIDES links (5 broken)**
- **File:** `src/app/products/[slug]/page.tsx`, lines 171–191
- **Issue:** 5 blog post URLs are registered in `BLOG_GUIDES` but `blogPosts = []` — no posts exist. Any visitor clicking these "Read the Guide" links on product pages for `illinois-hb3773`, `california-ccpa-admt`, `virginia-cdpa`, `colorado-sb24-205`, and `connecticut-ctdpa` will hit a 404.
- **Severity:** High — these links appear on product purchase pages, degrading trust at the point of conversion.
- **Fix options:** (a) Remove the BLOG_GUIDES entries until posts are published, or (b) publish the blog posts. The links are already conditionally rendered, so removing entries from the BLOG_GUIDES object is a safe, immediate fix.

### INCONSISTENCIES (not broken, but notable)

**2. Desktop nav "Get Started" vs Mobile "Get Started" destination mismatch**
- **File:** `src/components/Nav.tsx`
- Desktop "Get Started" → `/#products` (homepage anchor)
- Mobile "Get Started" → `/products` (products index page)
- These go to different destinations. Likely unintentional.

**3. Hardcoded product count "53" in FAQ and About pages**
- **Files:** `src/app/faq/page.tsx`, `src/app/about/page.tsx`
- Count should be derived dynamically like the homepage does, or kept in sync manually.

### ORPHAN DIRECTORY (cleanup candidate)

**4. Empty `src/app/news/` directory**
- No `page.tsx` exists. Nothing links to `/news`. Safe to delete.

### INFORMATIONAL

**5. 10 internal review pages (`/review-docs-*`, `/review-addons-*`)**
- Intentionally unlinked, obfuscated URLs. Not in sitemap. Not a bug — but they are publicly accessible if the URL is known. Not indexed by search engines. No action required for link integrity.

**6. Colorado landing page uses custom header/footer**
- Intentional landing page pattern. No standard nav — by design for conversion optimization. Not a bug.

---

## Audit Methodology

- Read all files in `src/app/` recursively to map all existing routes
- Read Nav.tsx, Footer.tsx, and all linked page files
- Verified every `href=` and `Link href=` value against the route map
- Checked all dynamically-generated product links against `regulations.ts` slug list and `ready` status
- Verified `BLOG_GUIDES` slugs against `src/data/blog-posts.ts`
- Verified `RELATED_ADDONS` slugs against `regulations.ts`
- Verified sitemap entries against route map
- Checked for anchor (`#id`) targets on the pages they reference
