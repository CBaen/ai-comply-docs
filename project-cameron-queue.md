# AI Compliance Documents — Work Queue
## Updated: 2026-03-16 (end of session — Analytics, Accessibility, Security Hardening, Sample Previews)

## CRITICAL (Revenue/Operations)

- [x] Checkout auth() bug fixed — was hanging when DATABASE_URL not set (this session)
- [x] Neon PostgreSQL connected — tables created, Vercel env vars configured (this session)
- [ ] **Rate limiting on /contact and /send-documents** — needs Upstash Redis. Both endpoints are open to abuse without it. No infrastructure in place.
- [ ] **Delivery token single-use enforcement** — DB schema exists, enforcement logic not written. A token can currently be reused to re-download files.
- [ ] **Customer account center end-to-end test** — database is now connected. Test a real purchase: webhook fires, download link appears in account center.
- [ ] Split product documents onto separate hidden review pages per product — browser Claude needs to audit the actual generated document content for each of the 53 products individually
- [ ] Resend domain verification — confirm email delivery is actually working end-to-end. Test with a real purchase.

## HIGH (Security + Architecture)

- [ ] **formData validation with Zod on verify-payment** — no schema validation on the payment verification route. Add Zod schema.
- [ ] **Nav refactor to server component** — nav is currently a client component, preventing full RSC optimization. Flagged in code review, deferred due to scope.
- [ ] **Email metadata consolidation** — three separate sources for product metadata in email templates. Consolidate to one source of truth (regulations.ts).
- [ ] **fal.ai key rotation** — key was in git history. Cameron evaluating provider alternatives. Do not use until resolved.
- [ ] Stripe badge/logo in trust bar — currently text-only "Secure checkout via Stripe." Replace with actual Stripe logo for brand recognition.
- [ ] Colorado consumer opt-out right (§6-1-1703(3)) — browser Claude review identified this is NOT covered by any existing product. Consider adding to Appeal & Correction Kit or creating separate small product.

## HIGH (Trust & Conversion)

- [x] Document sample previews on all 53 product pages — WebP generated from real PDFs, 63% smaller than PNG (this session)
- [ ] Questionnaire step 3/4 mismatch — hiring-specific language (bias audits, candidate screening) shows for ALL products including vendor due diligence and incident response. Add `skippedSteps` config or conditional rendering.
- [ ] Law gate softening for non-law products — NIST, EEOC products force customers to click out to a 100-page federal framework doc before checkout. Soften to "please review" with checkbox available immediately for framework-based products.

## MEDIUM (Content & SEO)

- [ ] CA ADMT Jan 2027 date — needs browser Claude verification
- [ ] FRIA Kit scope — needs browser Claude verification
- [ ] Blog style guide document — document voice, structure, enrichment blocks, image requirements, internal linking rules. Reference for browser Claude when writing new articles.
- [ ] More blog content — AEO research identified gaps: "Do I Need AI Compliance?" decision guide article (separate from quiz page), state AI law master tracker expansion, free downloadable resource/checklist
- [x] Blog post images — all 12 hero images exist and are wired into posts with responsive layout
- [ ] Per-post og:image — each blog post should have its own OG image for social sharing instead of the site-wide default

## MEDIUM (External Presence)

- [ ] LinkedIn company page — DO NOT SUGGEST. Guiding Light has a moral boundary against LinkedIn.
- [ ] G2 free listing — BLOCKED on DBA filing. Creates a profile even with zero reviews.
- [ ] Capterra free listing — acquired by G2 in Feb 2026. Same ecosystem now.
- [ ] IAPP Vendor Marketplace listing — International Association of Privacy Professionals. Exact buyer persona. Most credible third-party validation available.
- [ ] Trustpilot widget — even with 0 reviews, the presence signals confidence
- [ ] First customer testimonial collection — email first buyers asking for a one-sentence quote
- [ ] Reddit presence — r/smallbusiness, r/Compliance, r/humanresources. Answer questions helpfully, link to blog when relevant.
- [ ] Quora — answer AI compliance questions, link to blog posts. High AI citation rate.
- [ ] Medium — import 12 blog posts using Import Tool (auto-adds canonical). Wait 2 weeks after original publication.
- [ ] Product Hunt — prepare launch. Need 15-20 people ready for day-one upvotes.

## LOW (Polish)

- [ ] Dark mode toggle removal consideration — research flagged it as "startup side project" signal on a compliance site
- [ ] "Reviewed by" or "In collaboration with" credit — if Cameron can get one licensed attorney to review templates, it transforms credibility
- [ ] BBB accreditation ($400-$1,200/year) — skip for now per research. Not worth it at this stage for a digital product.
- [ ] Physical contact information — BLOCKED on DBA. Once DBA is filed, 32 N Gould St, Sheridan, WY 82801 can be used.
- [ ] Free lead magnet — "Which State AI Laws Apply to My Business?" flowchart, gated behind email signup for list building

## BLOCKED (Waiting on DBA Filing)

- [ ] Bing Places registration
- [ ] Apple Business Connect (also needs Apple device)
- [ ] Google Merchant Center product feed
- [ ] G2 listing
- [ ] Any directory requiring business name verification

**Action:** Call Wyoming Registered Agent Services (307-217-4045) Monday. Ask them to file DBA for "AI Compliance Documents" as trade name of Built by Cameron LLC. $100 state fee + service fee. ~15 business days.

## COMPLETED (Previous Sessions + This Session)

### This Session (2026-03-16)
- [x] GA4 + server-side purchase tracking via Measurement Protocol wired up
- [x] Contact page built (/contact) — Resend-powered, honeypot spam protection, CRLF prevention
- [x] /regulations renamed to /products — 168 references, 34 files, 301 redirect in next.config.js
- [x] Accessibility audit (5 teams, ~90 issues found) + all fixes applied (5 teams)
- [x] PDF margin fixes — header wrapping, footer sizing, form field font consistency
- [x] About page rewritten — founder identity removed, methodology-focused, faceless corporation
- [x] Penalty display: both tiers shown for CA and IL (not just the scary number)
- [x] Sample document previews on all 53 product pages — WebP, generated from real PDFs
- [x] Checkout auth() bug fixed — was hanging when DATABASE_URL not set
- [x] Neon PostgreSQL database connected — tables created, Vercel env vars configured
- [x] 5-pass code review completed (security, simplicity, architecture, performance, silent failures)
- [x] Security: delivery token now throws on missing secret (was silently broken)
- [x] Security: contact form input validation hardened
- [x] Security: error boundaries added
- [x] Security: CRLF prevention on all user inputs
- [x] Performance: JSZip moved to dynamic import (was 100KB+ shipping to every visitor)
- [x] Performance: build-time preview check moved to module scope (was per-request filesystem call)
- [x] Performance: logo image optimized
- [x] Performance: all previews converted from PNG to WebP (63% smaller)
- [x] Simplicity: shared getStripe() helper created
- [x] Simplicity: ROLE_LABELS deduplicated
- [x] Simplicity: handler consolidation
- [x] Stripe secret key rotated (was in git history)
- [x] Resend API key rotated (was in git history)

### Previous Sessions
- [x] Mobile view dedicated audit — 14 parallel fix teams, ~63 issues resolved across ~20 files
- [x] Blog enrichment YAML for all 12 posts
- [x] Art of War annotated layout
- [x] Checkout route fixed (was broken for 32/34 products)
- [x] Checkout generalized for multiple add-ons
- [x] 17 law-specific add-on products built, audited, reviewed, and activated
- [x] Stripe products created for all 17 add-ons
- [x] 12 blog posts published with hero images
- [x] Product carousel on homepage
- [x] Search bar on product catalog
- [x] "Not sure where to start?" guide
- [x] "Do I Need AI Compliance?" quiz page
- [x] Standalone FAQ page
- [x] State comparison page (/ai-compliance-by-state)
- [x] 35 product descriptions rewritten (situation-first)
- [x] Document explanations on all product pages
- [x] 54 signature blocks added
- [x] Homepage reordered, methodology section
- [x] Trust badges, ESIGN statement, verified statute badges
- [x] Dynamic OG image
- [x] All schemas (BlogPosting, Product, ItemList, FAQPage, Organization)
- [x] AEO: llms.txt rebuilt, robots.txt names AI crawlers
- [x] Internal links across all blog posts
- [x] Blog guide cards on product pages
- [x] Product counts updated to 53
- [x] Triadic audit of add-on products
- [x] Browser Claude review of add-on products
- [x] fal.ai image generation integration
- [x] Questionnaire friction fixes (progress bar, product summary, cancellation feedback)
- [x] FAQ and Compare State Laws in nav/footer
- [x] Global search modal (Cmd+K) with cmdk + MiniSearch
- [x] Google Search Console: sitemap resubmitted
- [x] Bing Webmaster Tools: registered, site imported from GSC
- [x] PyMuPDF installed for PDF reading
- [x] Questionnaire adapts to product type
- [x] Oregon citation range fixed
- [x] EU AI Act €35M/7% prohibited tier added
- [x] EEOC ADEA threshold corrected (20+ employees, not 15+)
- [x] Document counts synced (MN, Healthcare, Financial)
- [x] React hydration error #418 fixed
- [x] SEO metadata: all titles <60 chars, descriptions <155 chars, canonicals absolute
- [x] Schemas added: Organization on /about, WebApplication on /quiz, Dataset on state comparison
- [x] Sitemap: /privacy and /terms added
- [x] 16 missing PDF index.ts barrel files created
