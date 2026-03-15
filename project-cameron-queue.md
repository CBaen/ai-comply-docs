# AI Compliance Documents — Work Queue
## Updated: 2026-03-15

## CRITICAL (Revenue/Operations)

- [x] Mobile view dedicated audit — DONE. 14 parallel fix teams audited and fixed every page. ~63 issues resolved across ~20 files. Carousel, nav, footer, homepage, blog, products, questionnaire, FAQ, about, state comparison, quiz, privacy, terms all responsive.
- [ ] Split product documents onto separate hidden review pages per product — browser Claude needs to audit the actual generated document content for each of the 53 products individually
- [x] Blog enrichment YAML for articles 1-6 — DONE. All 6 original posts (IL, CA, VA, CO, CT, Hiring) now have summary, deepDive, microFacts, and externalReferences with verified source URLs. 6 of 12 total enriched. Remaining 6 (Cost, Bias Audit, EU AI Act, Penalties, HIPAA, ISO 42001) need browser Claude.
- [ ] Resend domain verification — confirm email delivery is actually working end-to-end. Test with a real purchase.

## HIGH (Trust & Conversion)

- [ ] Document sample previews (redacted) on product pages — #1 trust gap per research. Buyers can't see what they're purchasing. Generate a sample first page for each product type, redact fillable fields, display as image on product page.
- [ ] Questionnaire step 3/4 mismatch — hiring-specific language (bias audits, candidate screening) shows for ALL products including vendor due diligence and incident response. Add `skippedSteps` config or conditional rendering.
- [ ] Law gate softening for non-law products — NIST, EEOC products force customers to click out to a 100-page federal framework doc before checkout. Soften to "please review" with checkbox available immediately for framework-based products.
- [ ] Stripe badge/logo in trust bar — currently text-only "Secure checkout via Stripe." Replace with actual Stripe logo for brand recognition.
- [ ] Colorado consumer opt-out right (§6-1-1703(3)) — browser Claude review identified this is NOT covered by any existing product. Consider adding to Appeal & Correction Kit or creating separate small product.

## MEDIUM (Content & SEO)

- [ ] Blog style guide document — document voice, structure, enrichment blocks, image requirements, internal linking rules. Reference for browser Claude when writing new articles.
- [ ] More blog content — AEO research identified gaps: "Do I Need AI Compliance?" decision guide article (separate from quiz page), state AI law master tracker expansion, free downloadable resource/checklist
- [x] Blog post images — all 12 hero images exist and are wired into posts with responsive layout (image left, text right on desktop; stacks on mobile)
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

- [ ] 3 remaining static checkbox fixes — `[ ] HIGH [ ] MED [ ] LOW` text in CA CCPA/ADMT risk-assessment.ts, EU AI Act risk-management-system.ts, Healthcare AI ai-risk-assessment.ts
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

- [x] Checkout route fixed (was broken for 32/34 products)
- [x] Checkout generalized for multiple add-ons
- [x] 17 law-specific add-on products built, audited, reviewed, and activated
- [x] Stripe products created for all 17 add-ons
- [x] 12 blog posts published with hero images
- [x] Blog enrichment template (summary, deep dive, micro facts, references)
- [x] 2 blog posts enriched with YAML blocks
- [x] Product carousel on homepage
- [x] Search bar on product catalog
- [x] "Not sure where to start?" guide
- [x] "Do I Need AI Compliance?" quiz page
- [x] Standalone FAQ page
- [x] State comparison page (/ai-compliance-by-state)
- [x] 35 product descriptions rewritten (situation-first)
- [x] Document explanations on all product pages
- [x] 54 signature blocks added
- [x] Homepage reordered, methodology section, founder callout
- [x] Cameron's photo and bio on About page
- [x] Trust badges, ESIGN statement, verified statute badges
- [x] Dynamic OG image
- [x] All schemas (BlogPosting, Product, ItemList, FAQPage, Organization)
- [x] AEO: llms.txt rebuilt, robots.txt names AI crawlers
- [x] Internal links across all blog posts
- [x] Blog guide cards on product pages
- [x] Deadline banner corrected
- [x] Product counts updated to 53
- [x] Triadic audit of add-on products
- [x] Browser Claude review of add-on products
- [x] All review findings corrected
- [x] fal.ai image generation integration
- [x] Questionnaire friction fixes (progress bar, product summary, cancellation feedback)
- [x] FAQ and Compare State Laws in nav/footer
- [x] Global search modal (Cmd+K) with cmdk + MiniSearch — searches products, blog, FAQ
- [x] Search modal: ESC/X close, body scroll lock, full browsable content on open
- [x] Blog index fixed — was reading from empty static array, now uses filesystem reader
- [x] Connecticut CTDPA blog post published
- [x] Hiring Software / AI Employment Law blog post published
- [x] Hero text block removed from homepage — carousel is now the hero
- [x] Blog enrichment YAML added to articles 1-6 (IL, CA, VA, CO, CT, Hiring)
- [x] Art of War annotated layout — Deep Dive in left margin, Micro Facts in right margin (desktop)
- [x] Progressive disclosure cards for annotations on mobile
- [x] Blog post header: image left, text right (desktop), stacks on mobile
- [x] Blog index cards now show hero images
- [x] Founder photo: circular frame with slate background on About + homepage
- [x] Dark mode toggle: visible colors in both light and dark mode (desktop + mobile)
- [x] React hydration error #418 fixed (removed unused Tailwind dark: classes, added suppressHydrationWarning)
- [x] Site-wide responsive overhaul — 14 parallel teams, ~63 issues, ~20 files
- [x] Deadline banner text overflow fixed on mobile
- [x] SEO metadata: all titles <60 chars, descriptions <155 chars, canonicals absolute
- [x] Schemas added: Organization on /about, WebApplication on /quiz, Dataset on state comparison
- [x] Sitemap: /privacy and /terms added
- [x] AEO: llms.txt updated to 53 products + 12 posts, robots.ts 11 AI crawlers
- [x] 5 blog posts got internal product links (penalties, HIPAA, EU AI Act, ISO 42001, bias audit)
- [x] 16 missing PDF index.ts barrel files created (build was failing)
- [x] Google Search Console: sitemap resubmitted
- [x] Bing Webmaster Tools: registered, site imported from GSC
- [x] Nav: mobile dark mode text visibility fixed
- [x] PyMuPDF installed for PDF reading
- [x] Business documents copied to project directory
