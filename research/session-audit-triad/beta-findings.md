# Beta Findings — Customer Experience & Regression Audit
**Auditor Role:** Skeptical First-Time Buyer / Adversarial Customer Experience
**Lens:** VP of Compliance, $500 to spend, zero trust, first visit
**Date:** 2026-03-17

---

## Executive Summary

The site largely works for a paying customer. The core journey — find a product, read about it, pay, download — is structurally intact and live URL tests confirm the major pages return 200 responses with complete content. However, five issues would meaningfully erode conversion or trust for a skeptical buyer, and one is a production gap that could prevent document delivery. No critical post-payment breakage was found.

---

## Findings

---

### FINDING 1 — CRITICAL: Blog Deployment Gap — 2 of 12 Posts Missing from Live Site

**Page/Flow:** `/blog`
**Severity:** CRITICAL

**What the customer experiences:**
A visitor arriving via search for `iso 42001 certification`, `what is a bias audit`, or any other topic covered by the two missing posts lands on a 404. The blog index shows 10 posts. The live site was fetched and confirmed 10 posts. The codebase has 12 published MDX files (`iso-42001-ai-certification-enterprise.mdx` and `what-is-ai-bias-audit-does-your-business-need-one.mdx` are both `published: true` and dated 2026-03-15).

**Root cause:**
The blog uses `getAllBlogPosts()` which reads from the filesystem at **build time** (SSG). The two posts were added to the codebase after the last deployment. They are present on disk but were not included in the last build/deploy cycle. Any inbound link or search impression for those posts currently 404s.

**Evidence:**
- `content/blog/iso-42001-ai-certification-enterprise.mdx` — `published: true`, `date: "2026-03-15"`
- `content/blog/what-is-ai-bias-audit-does-your-business-need-one.mdx` — `published: true`, `date: "2026-03-15"`
- Live fetch of `/blog` confirmed 10 posts visible
- `getAllBlogPosts()` in `src/lib/blog.ts:39-62` reads filesystem at build time, filtered by `published: true`

**Impact:** Any SEO traffic or direct links to these two posts hits 404. New content is invisible to customers until redeployment.

---

### FINDING 2 — HIGH: Mobile Nav "Products" Link Goes to Homepage Anchor, Not Products Page

**Page/Flow:** Mobile navigation menu
**Severity:** HIGH

**What the customer experiences:**
A mobile visitor who taps "Products" in the hamburger menu is taken to `/#products` (the homepage product section anchor), not to `/products` (the standalone all-products page). This means:
1. If they are already on a product page, blog post, or contact page, tapping "Products" reloads the homepage and scrolls to the product section — discarding their current context.
2. The standalone `/products` page (which has filter tabs, search, and the full library) is effectively unreachable from the mobile menu.
3. The desktop nav correctly links to `/products` (line 42 of Nav.tsx).

**Evidence:**
- `src/components/Nav.tsx:126` — `href="/#products"` (mobile menu "Products")
- `src/components/Nav.tsx:42` — `href="/products"` (desktop "Products")
- Inconsistency confirmed: desktop and mobile link to different destinations

**Impact:** Mobile users (likely majority of traffic) cannot navigate directly to the products catalog page. The filter/search functionality on `/products` is hidden from them.

---

### FINDING 3 — HIGH: Product Count in FAQ/Marketing Copy Is Potentially Misleading

**Page/Flow:** Homepage FAQ, About page, Products page hero
**Severity:** HIGH

**What the customer experiences:**
The site prominently claims "53 compliance packages" throughout:
- Homepage FAQ answer: "We offer 53 compliance packages..."
- About page: "We offer 53 compliance packages..."
- `/products` page hero: dynamically rendered as `regulations.filter(r => r.ready).length` — which correctly shows 53

However, `regulations.ts` has 2 products with `ready: false` (`k12-education-ai`, `hr-recruiting-ai`). These are not purchasable. The 53 in FAQ copy is the count of `ready: true` products, which matches. **However**, these 2 not-ready products ARE visible in the ProductLibrary on the homepage and `/products` because `ProductLibrary` is passed `regulations.filter(r => r.ready)` — wait, let me clarify: the homepage passes `regulations.filter(r => r.ready)` to ProductLibrary (page.tsx line 351), so not-ready products are excluded.

**Actual issue found:** The "Coming Soon" products (`k12-education-ai` and `hr-recruiting-ai`) have routes that 404 because `generateStaticParams` in `[slug]/page.tsx` only generates pages for `r.ready` products (line 25), AND the page logic explicitly calls `notFound()` for non-ready products (line 204). So if a customer somehow gets a link to `/products/k12-education-ai`, they get a 404.

**This is acceptable behavior** — the 53 count is accurate. The 404 for non-ready products is intentional and correct.

**Revised assessment:** MEDIUM concern — the FAQ copy hardcodes "53" which will be wrong as soon as a product is retired or the 2 not-ready products become ready. The `/products` page dynamically renders the real count; the FAQ is static copy. Not an immediate customer issue, but will drift.

---

### FINDING 4 — HIGH: Document Sample Preview Silently Disappears on Error

**Page/Flow:** `/products/[slug]` — "Preview Your Documents" section
**Severity:** HIGH

**What the customer experiences:**
Every product page has a "Preview Your Documents" section with `DocumentSamplePreview`. When the PDF generation fails (wrong slug mapping, library error, missing canvas support in some browsers), the component renders **nothing** — no loading state, no fallback message, no "preview not available" notice.

```tsx
// DocumentSamplePreview.tsx line 104
return (
  <div ref={containerRef} className="mt-6">
    {error ? null : (   // <-- silent null render on error
```

A customer who doesn't see a preview gets no signal that anything went wrong — they just see a blank section under a "Preview Your Documents" heading. This looks like a broken page and would cause a skeptical VP of Compliance to question the product quality.

**Evidence:**
- `src/components/DocumentSamplePreview.tsx:104` — `{error ? null : ...}`
- The heading "Preview Your Documents" is always rendered in `[slug]/page.tsx:375`, but the preview can silently vanish
- The static `.webp` preview (when available) is a separate conditional block that only shows for products with pre-generated images

**Impact:** Broken visual section undermines trust at the exact moment a customer is deciding whether to purchase. 53 preview images are in `/public/previews/` covering all products, but the *dynamic* canvas preview can fail silently regardless.

---

### FINDING 5 — MEDIUM: /regulations/* Redirect Only Covers Top-Level, Not All Old URL Patterns

**Page/Flow:** `next.config.ts` redirects
**Severity:** MEDIUM

**What the customer experiences:**
The redirect covers:
- `/regulations` → `/products` (301)
- `/regulations/:slug` → `/products/:slug` (301)

This is correct for the direct `/regulations/illinois-hb3773` pattern. However, any old links that included query strings (e.g., `/regulations/illinois-hb3773?ref=email`) will redirect properly because Next.js redirects preserve query strings by default. Live test of `/regulations/illinois-hb3773` confirmed it resolves to the Illinois product page correctly.

**No customer-facing break found here.** The redirect works as expected. This finding is informational.

**Revised severity:** LOW — redirect is functioning correctly.

---

### FINDING 6 — MEDIUM: Quick Purchase Button Creates an Incomplete Checkout Path for Some Buyers

**Page/Flow:** `/products/[slug]` sidebar → "Quick Purchase — Skip to Checkout" button
**Severity:** MEDIUM

**What the customer experiences:**
The Quick Purchase button stores a `quickPurchase: true` sentinel in sessionStorage and immediately fires the Stripe checkout. After payment, `PostPaymentHandler` detects the sentinel and shows a mini-form asking for company name, AI tool name, AI role, and contact name.

**Issues:**
1. The mini-form after payment collects only 4 fields vs. the full questionnaire's ~15+ fields. Documents generated from Quick Purchase data will have mostly blank fields (`state: ""`, `industry: ""`, `oversightRole: ""`, `humanReview: ""`, etc.). A compliance VP who paid $499 for a California CCPA ADMT package and receives documents with blank fields will be disappointed and possibly demand a refund.
2. The Quick Purchase button label is "Quick Purchase — Skip to Checkout" with fine print "Purchase now, customize your documents after checkout." The "customize after" framing is honest, but the customer doesn't know how sparse the customization options will be until after they've paid.
3. This is a trust and expectation gap, not a technical break.

**Evidence:**
- `src/components/QuickPurchaseButton.tsx` — sets `quickPurchase: true` sentinel
- `src/components/PostPaymentHandler.tsx:344-382` — `completed` object fills blanks with `""` for most fields
- `src/lib/pdf-types.ts` defines the full form structure; most fields empty in Quick Purchase path

**Impact:** Customers who use Quick Purchase receive less customized documents than the full questionnaire produces. No refund mechanism exists (all sales final).

---

### FINDING 7 — MEDIUM: Account Center Has 3 Manual Setup Steps Unconfirmed as Complete

**Page/Flow:** `/account/login`, `/account/purchases`
**Severity:** MEDIUM

**What the customer experiences:**
The account login page loads and renders correctly (magic link flow via Resend). The purchases page shows purchase history and re-download buttons. However, the account system requires `DATABASE_URL` (PostgreSQL) to be configured in production environment — without it, `auth()` calls in `create-checkout/route.ts` are skipped gracefully, but purchase-to-account linking (`/api/account/link-purchase`) fires as a fire-and-forget and would silently fail.

**From memory (`project_account_center_setup.md`):** 3 manual setup steps were reportedly still pending when the account center was deployed. If those steps are incomplete, customers who create accounts will see zero purchases in their account center even after buying, because the purchase-to-account link never fires successfully.

**Evidence:**
- `src/app/api/create-checkout/route.ts:16-23` — gracefully skips auth if no `DATABASE_URL`
- `src/components/PostPaymentHandler.tsx:159-163` — `link-purchase` called as fire-and-forget `.catch(() => {})`
- Account purchases page works if DB is configured; shows empty state otherwise

**Impact:** If DB is not configured, customers can buy successfully but see "No purchases yet" in their account — eroding trust in the product and potentially generating support emails.

---

### FINDING 8 — LOW: Blog Count Mismatch Between Homepage FAQ Copy and Reality

**Page/Flow:** Homepage FAQ section
**Severity:** LOW

**What the customer experiences:**
The FAQ answer to "What AI regulations do you cover?" states "We offer 53 compliance packages covering 14 state-specific AI and privacy laws..." This is hardcoded string copy. The blog posts count is accurate today (12 posts, all published, 10 on live until redeployment). No customer-facing confusion from this right now.

---

### FINDING 9 — LOW: Contact Page Missing SEO Metadata

**Page/Flow:** `/contact`
**Severity:** LOW

**What the customer experiences:**
The contact page is a `"use client"` component. It imports `Metadata` from Next.js but does **not** export a `metadata` object. This means the page has no custom title, description, or OG tags — it will inherit the default site metadata. This is an SEO/discoverability gap, not a customer experience break.

**Evidence:**
- `src/app/contact/page.tsx:1` — `"use client";`
- `src/app/contact/page.tsx:3` — `import type { Metadata } from "next";` (type-only import, never used)
- No `export const metadata` statement in file

**Impact:** Contact page not indexable with meaningful metadata. Minor SEO concern only.

---

### FINDING 10 — LOW: Post-Payment Modal Scroll Behavior May Fail on Some Devices

**Page/Flow:** Post-payment document delivery modal
**Severity:** LOW

**What the customer experiences:**
After successful payment, `PostPaymentHandler` locks body scroll and uses `scrollIntoView` with a 50ms `setTimeout` to scroll to the `post-payment` element. However, the `id="post-payment"` element is the component itself — which at that moment renders the verifying spinner. The element may not yet exist in the DOM when the timeout fires.

Additionally, `document.body.style.position = "fixed"` to lock scroll is a known pattern but can cause layout shifts on iOS Safari (where it snaps scroll position to top).

**Evidence:**
- `src/components/PostPaymentHandler.tsx:136-140` — `setTimeout(() => scrollIntoView)` with 50ms
- `src/components/PostPaymentHandler.tsx:71-88` — body scroll lock via `position: fixed`
- No `id="post-payment"` is explicitly set on the returned JSX elements

**Impact:** On some mobile devices, the delivery modal may appear off-screen after payment verification, requiring the customer to scroll manually to find their download button. Not a blocking issue but friction at the highest-trust moment.

---

## Summary Table

| # | Finding | Severity | Flow Affected |
|---|---------|----------|---------------|
| 1 | 2 blog posts deployed but missing from live site | CRITICAL | `/blog` discovery |
| 2 | Mobile nav "Products" links to wrong destination | HIGH | Mobile navigation |
| 3 | Quick Purchase produces sparse documents post-payment | MEDIUM | Checkout → Delivery |
| 4 | Document preview silently disappears on error | HIGH | Product page trust |
| 5 | Account center purchase linking may fail silently | MEDIUM | Post-payment account |
| 6 | Hardcoded "53 packages" in FAQ will drift | LOW | Homepage FAQ |
| 7 | Contact page missing SEO metadata | LOW | SEO/discoverability |
| 8 | Post-payment modal scroll may miss on mobile | LOW | Delivery UX |

---

## Live URL Test Results

| URL | Status | Notes |
|-----|--------|-------|
| `https://aicompliancedocuments.com` | 200 OK | Full content, carousel, product library |
| `https://aicompliancedocuments.com/products/illinois-hb3773` | 200 OK | $299, 6 docs, questionnaire present |
| `https://aicompliancedocuments.com/products/eu-ai-act` | 200 OK | $997, 10 docs, 6-step questionnaire present |
| `https://aicompliancedocuments.com/blog` | 200 OK | 10 posts visible (2 missing — see Finding 1) |
| `https://aicompliancedocuments.com/ai-compliance-by-state` | 200 OK | 27-row table, all penalties visible |
| `https://aicompliancedocuments.com/contact` | 200 OK | Form functional, 3 required fields |
| `https://aicompliancedocuments.com/about` | 200 OK | No founder name, methodology-focused |
| `https://aicompliancedocuments.com/account/login` | 200 OK | Magic link form loads |
| `https://aicompliancedocuments.com/regulations/illinois-hb3773` | 301 → product page | Redirect working |

---

## What Would Make the Skeptical VP of Compliance Leave

1. **Sees blank preview section** (Finding 4) — looks like a broken page
2. **On mobile, can't find the standalone Products catalog** (Finding 2) — gets bounced to homepage instead
3. **Uses Quick Purchase, gets documents with blank fields** (Finding 6) — undermines product quality perception
4. **Creates account after purchase, sees "No purchases yet"** (Finding 7) — feels like a scam

## What Would Make Them Stay and Buy

- Price transparency is excellent (shown on every touchpoint)
- FAQ is comprehensive and credible
- Citation links to `.gov` sources are present on every product page
- "All sales final" is disclosed before checkout, not hidden
- Methodology section is authoritative and honest about limitations
- Contact form and direct email both accessible
- Stripe branding in trust bar adds credibility

---

*Beta audit complete — findings written to this file.*
