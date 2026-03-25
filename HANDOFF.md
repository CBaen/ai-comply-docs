---
session_id: "2026-03-25-hardening-landing-pages-infrastructure"
date: "2026-03-25"
instance: "Opus 4.6 — Security, accessibility, infrastructure, 3 landing pages"
model: "claude-opus-4-6[1m]"
projects_touched:
  - "project _cameron"
status: "complete"
git_state: "clean — all pushed"
---

## READ BEFORE DOING ANYTHING

1. **`lessons-learned.md`** — 32+ failure patterns. READ IT.
2. **`PRODUCT-ONBOARDING.md`** — mandatory checklist. READ IT.
3. **Claude Code BUILDS. Claude in the browser RESEARCHES.** No exceptions.
4. **Routes are /products/ not /regulations/.** 301 redirects in place.
5. **Never suggest LinkedIn.** Moral boundary.
6. **Never pressure adding real name/identity to site.** Personal safety decision.
7. **Never market as "built by AI."** Legal/AI trust is toxic.
8. **fal.ai key NOT rotated.** Do not generate images until rotation/migration decision is made.

## Messages

### To the Next Instance
Checkout is verified working end-to-end (payment, download, email delivery — tested 2026-03-15 by Guiding Light). The site is hardened with CSP headers, input validation, and ~30 accessibility contrast fixes. Questionnaire placeholder text is now generic (was showing HireVue/Pymetrics hiring examples on ALL products).

The revenue gate is open. The remaining blocker is turning on Google Ads ($5/day targeting the Colorado landing page). The Colorado SB205 deadline is June 30, 2026 — search traffic will spike April-June.

Three products have no Stripe price IDs and are `ready: false`: K-12 Education AI ($397), HR/Recruiting AI Bundle ($697), Vibe Coding Security Checklist ($149). Guiding Light may have created these in Stripe during this session — check the queue.

Texas TRAIGA (HB 149) product entry was added this session (ready: false, needs Stripe price ID and testing).

### To Guiding Light
You proved the store works today. That matters. Everything from here is about driving traffic and expanding the product catalog.

## Site Status

- **Live:** `aicompliancedocuments.com` — 53 products, 17 blog posts
- **Checkout:** VERIFIED WORKING (2026-03-15). Zip download + email delivery confirmed.
- **Blog:** 17 posts, all enriched with YAML (summary, deepDive, microFacts, externalReferences)
- **Blog layout:** Art of War style — Deep Dive left margin, Micro Facts right margin (desktop), disclosure cards (mobile)
- **PDFs:** Professional branded design (dark blue header band, unified colors, styled fields, signature boxes)
- **Search:** Global Cmd+K modal (cmdk + MiniSearch)
- **Questionnaire:** Per-product adaptation (oversight options, data inputs, gate text) + skippedSteps. Generic AI placeholders (was hiring-specific).
- **Security:** CSP header, delivery token HMAC, HTML escaping, hardcoded origin, contact form honeypot, CRLF prevention, error boundaries, input validation on send-documents (regulation allowlist, length caps)
- **SEO/AEO:** All titles <60 chars, 11 AI crawlers in robots.ts, llms.txt with 53 products, product-specific OG images
- **Responsive:** Full site-wide overhaul (14 teams, ~63 issues)
- **Accessibility:** ~30 contrast fixes this session on top of prior 90-issue audit
- **Analytics:** GA4 + server-side purchase tracking via Measurement Protocol
- **Registrations:** Google Search Console + Bing Webmaster Tools done
- **Contact page:** Built with Resend, honeypot spam protection
- **Database:** Neon PostgreSQL connected, tables created, Vercel env vars configured

## What Was Done This Session (2026-03-25)

### Checkout Validation
- End-to-end checkout tested by Guiding Light — payment, download, email delivery all confirmed working
- Added close button (X + text link) to post-payment success modal — was impossible to dismiss

### Security Hardening
- Content-Security-Policy header added to next.config.ts (script/style/img/connect/frame sources locked down)
- Input validation on send-documents: regulation allowlist via getRegulation(), companyName/contactName 200-char caps
- AUTH_SECRET runtime warning if not configured (logs on signIn, doesn't crash build)
- .env.example expanded from 2 variables to 6 (all required vars documented with consequences of absence)
- Contact page metadata added (was missing — client component with no server metadata export)
- Product-specific OG images (was sharing one generic image across all 53 products)

### Accessibility (~30 contrast fixes)
- text-gray-400/500 on light backgrounds → text-gray-600/700 for WCAG AA 4.5:1 compliance
- Carousel dots bg-white/30 → bg-white/50, button text-white/60 → text-white/80
- Files: ProductLibrary, ComplianceQuiz, SearchModal, PostPaymentHandler, StepAISystems, StepReviewCheckout, contact, blog, terms, account, product pages

### Questionnaire Language
- Replaced hiring-specific placeholders (HireVue, Pymetrics, "Screens resumes") with generic AI examples (ChatGPT, Salesforce Einstein, "Analyzes data") in StepAISystems.tsx

## What's Next

1. **Turn on Google Ads** — $5/day, Colorado landing page. Account created, keywords ready. The search traffic window opens in April.
2. **Upstash Redis for global rate limiting** — current rate limiter is in-memory per Vercel instance (bypassable under load). Needs Upstash before marketing traffic.
3. **3 products need Stripe price IDs** — K-12 Education ($397), HR/Recruiting ($697), Vibe Coding Security ($149). All `ready: false`.
4. **Texas TRAIGA product** — entry added this session, needs Stripe price ID and testing.
5. **SEO schema markup** — DONE this session (Organization, WebSite, TechArticle, Product improvements).
6. **Delivery token single-use enforcement** — DONE this session (code deployed, needs `used_tokens` table created in Neon console).
7. **Landing pages** — 4 total: Colorado, Illinois, California, Texas. All in sitemap. Ready for ads.
7. **Wait for NLR response** — article with editor Tim Keane.
8. **When DBA processes** — Google Merchant Center, Bing Places, IAPP Marketplace.

## Known Issues

- **fal.ai key not rotated** — Cameron evaluating provider alternatives. Do not generate images.
- **CA ADMT Jan 2027 date** — needs browser Claude verification
- **FRIA Kit scope** — needs browser Claude verification
- **Stripe MCP is in test mode** — cannot create live products from Claude Code. Use Stripe dashboard.
- **`vercel env pull` risk** — overwrites .env.local without warning. Always back up first.
