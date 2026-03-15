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
- [ ] Blog post images — verify all 12 hero images render correctly on live site. Check quality. Regenerate any that don't look professional enough.
- [ ] Per-post og:image — each blog post should have its own OG image for social sharing instead of the site-wide default

## MEDIUM (External Presence)

- [ ] LinkedIn company page — create, link from footer, post snippets from blog articles
- [ ] G2 free listing — creates a profile even with zero reviews, positions for future review collection
- [ ] Capterra free listing — same as G2
- [ ] IAPP Vendor Marketplace listing — International Association of Privacy Professionals. Exact buyer persona. Most credible third-party validation available.
- [ ] Trustpilot widget — even with 0 reviews, the presence signals confidence
- [ ] First customer testimonial collection — email first buyers asking for a one-sentence quote
- [ ] Reddit presence — r/smallbusiness, r/legaladvice. Answer questions helpfully, link to blog when relevant.

## LOW (Polish)

- [ ] 3 remaining static checkbox fixes — `[ ] HIGH [ ] MED [ ] LOW` text in CA CCPA/ADMT risk-assessment.ts, EU AI Act risk-management-system.ts, Healthcare AI ai-risk-assessment.ts
- [ ] Dark mode toggle removal consideration — research flagged it as "startup side project" signal on a compliance site
- [ ] "Reviewed by" or "In collaboration with" credit — if Cameron can get one licensed attorney to review templates, it transforms credibility
- [ ] BBB accreditation ($400-$1,200/year) — trust badge + dispute resolution mechanism
- [ ] Physical contact information — research found compliance sites with addresses convert better
- [ ] Free lead magnet — "Which State AI Laws Apply to My Business?" flowchart, gated behind email signup for list building

## COMPLETED THIS SESSION

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
