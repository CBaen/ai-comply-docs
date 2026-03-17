# Team 4 Findings: Design & Trust Signals Audit
## Date: 2026-03-10

---

### Critical Issues

**1. "Used by Illinois employers" — False social proof claim (index.html, line 266)**

This is the single most damaging trust signal on the site. It appears in the trust bar, the most prominent credibility zone on the page, displayed with a checkmark icon. The product has zero customers. The claim implies an existing user base that does not exist. Anyone who encounters a compliance dispute and asks this company to substantiate that claim will find nothing. This is not a gray area — it is fabricated social proof.

Exact text: `<span>Used by Illinois employers</span>`

**2. "Customers who purchased within the prior 12 months receive updated documents at no additional cost" — Promise without infrastructure (index.html, line 595)**

This is a commitment to deliver future service to customers who do not exist yet. This would require maintaining a customer contact list, monitoring regulatory changes, and delivering updates. For a zero-involvement single-operator, this promise creates an obligation that may never be fulfilled. When the first customer buys, there is no system described to track them, contact them, or deliver on this. Either the system exists (in which case the Terms should describe it) or the promise will be quietly broken.

**3. "Generates the same documentation package for $299" — Parity claim against law firm work (index.html, lines 73 and 616)**

The FAQ states: "AI Comply Docs generates the same documentation package for $299." This is a parity-of-quality claim between AI-generated templates and a bespoke attorney-drafted compliance package. These are not the same thing. The Terms of Service correctly disclaim that "generated documents are templates." Calling them "the same" contradicts the legal disclaimers on the same site and creates FTC-visible misrepresentation risk.

---

### Moderate Issues

**4. "All 7 IDHR Required Elements" — Trust bar claim, technically defensible but unverifiable by visitor (index.html, line 256)**

This claim is repeated throughout the site. It is plausible on its face — the 7 elements are listed in the Illinois section and they do match publicly available IDHR Subpart J requirements. However, a first-time visitor has no way to verify that the generated documents actually contain all 7 elements without purchasing. There are no sample documents or previews. The claim is supportable if the documents are correctly built, but if any element is missing or misconfigured, every instance of this claim becomes fraudulent retroactively.

Recommendation: Provide a sample/preview document, or qualify the claim as "Template includes all 7 IDHR elements per Subpart J."

**5. "$299 vs $5,000+ legal fees" — Defensible range, but the floor is misleading (index.html trust bar, line 271; pricing footnote, line 555)**

The "$5,000+" figure is technically accurate as a range for complex attorney-drafted packages. However, a simple HB3773 notification letter from a mid-market employment law firm could cost considerably less than $5,000 — potentially $500–$1,500 for a template review. The comparison implies the only alternative is $5,000+. The expanded FAQ version (lines 616) gives the more accurate "$5,000–$25,000" range, but the trust bar shows "$5,000+" without context. The trust bar framing is misleading in its selectivity.

**6. No contact email is listed anywhere on the site**

Both the Terms of Service (line 66) and Privacy Policy (line 63) direct users to "the email address listed on our website." That email address does not appear to exist anywhere in the reviewed HTML files. A visitor in a dispute or with a compliance question cannot contact the operator. The Terms invoke this email for arbitration notice purposes, and the Privacy Policy uses it for data rights requests. This is a broken reference throughout.

**7. "Templates verified current as of March 2026" — No verification mechanism stated (index.html, line 245)**

The hero section contains a "verified" badge. Who verified them? There is no attorney name, no third-party review body, no law firm cited. The word "verified" in a legal compliance context implies human expert review. This is a credibility claim with no attributed source. It is the strongest trust signal on the page and it is completely unattributed.

**8. "What if the law changes" FAQ implies ongoing monitoring infrastructure (index.html, line 592–596)**

The answer states "We monitor regulatory updates." For a zero-involvement single-operator product, this claim requires active work. There is no description of how this monitoring happens, what threshold triggers an update, or what the delivery mechanism is. This is a promise of ongoing service from a product designed for zero involvement.

---

### Minor Issues

**9. Accessibility: Zero ARIA labels on any interactive elements**

A search of the entire index.html finds no `aria-label`, `aria-labelledby`, `aria-describedby`, or `role=` attributes anywhere in the file. This includes:
- The hamburger menu button (line 196): no `aria-label`, no `aria-expanded`, no `aria-controls`. Screen readers will announce it as an unlabeled button.
- All SVG icons used decoratively: none have `aria-hidden="true"`, so screen readers may attempt to interpret them as meaningful content.
- The mobile nav (`id="mobile-nav"`): no ARIA state attributes.

**10. Accessibility: `outline: none` kills keyboard focus visibility for form fields (index.html, line 134)**

The CSS at line 134 sets `outline: none` on all focused inputs, selects, and textareas. The replacement is a Tailwind `focus:ring-2` class applied via HTML, which provides visual feedback. However, `outline: none` with a CSS class-based replacement creates a gap: if Tailwind's CDN load is delayed or fails, all form focus states become invisible. For a compliance product sold to employers, having inaccessible forms is a notable irony.

**11. Accessibility: No `for` attribute on any labels**

Zero `<label for="...">` instances found in the entire file. All labels use the `class="block text-sm..."` pattern with inputs nested beneath them, but the `for`/`id` pairing is absent. This means programmatic label association for assistive technologies is missing throughout the questionnaire. Screen reader users navigating by form field will hear field names without their labels.

**12. Mobile nav button: Touch target may be undersized**

The mobile hamburger button is `p-2` (8px padding on each side) wrapping a `w-6 h-6` (24px) SVG. The effective touch target is approximately 40x40px, below the WCAG 2.5.5 recommended 44x44px minimum. On small phones, this is a common mis-tap.

**13. Brand color inconsistency between index.html and industry/terms/privacy pages**

- `index.html`: Uses `sky-700` as the primary brand color, with a custom `hero-bg` gradient using `#0F172A` (navy), Space Grotesk display font, and a tailwind config extending font families.
- `technology.html`, `healthcare.html`: Use `blue-700` to `blue-900` as the primary gradient. No Space Grotesk font. No custom tailwind config.
- `terms.html`, `privacy.html`: Use `blue-700` for logo/links. No display font.

The brand palette is split between `sky-*` (index) and `blue-*` (all other pages). These appear visually similar but are distinct in Tailwind. The industry pages also lack the Inter/Space Grotesk fonts that define the main page's identity. A visitor navigating from index.html to an industry page will notice the different heading style.

**14. Schema.org structured data: "SoftwareApplication" type may not reflect actual product**

The schema at lines 23–38 types the product as a `SoftwareApplication`. The product generates documents but does not run as persistent software — it is closer to a one-time service. This is a minor SEO/schema accuracy issue, not a critical trust problem, but it may surface in rich result audits.

**15. No `og:image` or `twitter:image` in meta tags**

The Open Graph and Twitter Card meta include title and description but no image URL. When shared on LinkedIn or Twitter, the link preview will have no image, significantly reducing visual credibility for a B2B product being shared in compliance or HR communities.

---

### Gaps and Unknowns

**16. The Stripe payment link in stripe-checkout.js (line 22) appears to be a real URL**

`stripe-checkout.js` contains `paymentLink: 'https://buy.stripe.com/00w00lcln4g6fcI5uofYY00'`. This appears to be a real Stripe payment link, not a placeholder. This was not verified externally (read-only audit), but if it is live, payments may be accepted before document generation is confirmed to work end-to-end. This warrants direct verification.

**17. The questionnaire's AI system section uses class-based inputs (`ai-system-name`, `ai-system-vendor`) without IDs**

The dynamically added AI system fields in Step 2 have no `id` attributes — only class names. This means they cannot be properly labeled for accessibility, and it is unclear how the PDF generator (`pdf-generator.js`) retrieves them. This was not audited in depth but may create edge cases for multi-system configurations.

**18. Industry pages were not cross-referenced against actual HB3773 law text**

The technology.html and healthcare.html pages make specific claims (e.g., "4 years" retention, "zip codes as proxies" language) that appear to track the law. Substantive legal accuracy of these claims was not verified against the actual statute text in this audit. A legal accuracy pass is a separate task.

**19. No privacy.html or terms.html link in the industry page navbars**

The industry page navbars (`technology.html`, `healthcare.html`) show only three links: Illinois HB3773, Pricing, Generate Documents. They do not include Privacy or Terms links in the top nav. The footer of industry pages does include Privacy and Terms links, so this is a discoverability issue rather than an absence.

---

### Synthesis

The most significant trust problem is the "Used by Illinois employers" claim on line 266 of index.html. It is a fabricated social proof signal in the highest-credibility zone of the page. Everything else on the site is defensible or fixable, but this claim creates a factual lie that, if discovered by a B2B buyer doing due diligence, would invalidate every other trust signal on the page.

The second tier of concern involves promises that create future obligations without infrastructure: the update-delivery promise for past customers, and the "we monitor regulatory updates" claim. For a zero-involvement product, these are time bombs.

The accessibility issues are systemic, not incidental. The questionnaire has no proper label associations, the mobile nav is unannounced to screen readers, and the SVG icons are noisy to assistive technologies. For a B2B compliance product — one that sells to HR teams who are themselves subject to disability accommodation requirements — having an inaccessible checkout flow is brand-damaging in a specific way.

The brand consistency split between `sky-*` (main page) and `blue-*` (all other pages) is cosmetically minor but signals template-generated pages that were not fully integrated. It will not lose a customer, but it will register subconsciously as unpolished to anyone comparing pages.

The missing contact email is a functional gap. Both the Terms and Privacy Policy point to it and it does not exist in the HTML.

**Priority order for remediation:**
1. Remove or replace "Used by Illinois employers" immediately — replace with a factual claim or nothing
2. Add a real contact email address to the site (visible, not just "listed on our website")
3. Either build the update-delivery infrastructure or remove the update promise
4. Add ARIA labels to the hamburger button and aria-hidden to decorative SVGs
5. Add `for` attributes to all form labels
6. Add `og:image` / `twitter:image` meta tags
7. Normalize brand colors across index and subpages (pick sky or blue consistently)
8. Qualify the "$299 vs $5,000+" comparison with more honest context
9. Qualify "verified" badge with an attribution (e.g., "based on published IDHR Subpart J rules")
10. Add a sample document preview so "all 7 elements" can be independently confirmed before purchase
