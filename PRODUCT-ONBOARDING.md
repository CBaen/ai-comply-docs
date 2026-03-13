# Product Onboarding Requirements

**Read this entire document before starting work on any new product.**

This is not a simple checklist. Every requirement exists because a previous instance made a mistake that put the business owner in legal jeopardy. If you skip a step or take a shortcut, you are passing risk to a real person who cannot afford it.

AI Compliance Documents sells compliance documentation templates. Customers pay real money and make real business decisions based on what we tell them. If we get a penalty amount wrong, a customer calculates their risk exposure incorrectly. If we cite a law that doesn't exist, a customer spends money complying with nothing. If we say a law took effect in 2023 when it took effect in 2026, a customer panics about a deadline that hasn't arrived.

Every mistake we make becomes a mistake our customers make. That is why this document exists.

---

## Before You Start: How to Get Information You Can't Find

Your web fetch tools will sometimes fail — government websites return 404s, URLs change, legislative databases have inconsistent structures. **"I couldn't find the information" is not acceptable.** When your tools fail, you must ask Guiding Light to use Claude in the browser to find what you need.

**How this works:**
1. You write a specific, detailed prompt for Claude in the browser — not vague ("find Texas AI law") but precise ("Search for Texas HB 149 from the 89th Regular Session on capitol.texas.gov. I need the enrolled text URL, the penalty section numbers, the effective date, and which chapters of the Business & Commerce Code it creates.").
2. You present this prompt to Guiding Light and ask them to paste it into Claude in their web browser.
3. Guiding Light shares the results back with you.
4. You use those results to complete the verification.

**Every previous instance that produced incorrect data did so because they relied on training knowledge, summaries, or partial web fetches instead of reading primary sources.** When an ILGA URL returned 404, an instance wrote the penalty amounts from memory instead of finding the correct URL. When a bill search failed, an instance assumed the bill number in the codebase was correct instead of verifying. These assumptions created the errors this document exists to prevent.

**You are never allowed to:**
- Use training knowledge as a substitute for reading the enacted text
- Assume a fact is correct because it appears in the codebase (previous instances put it there and they were wrong)
- Write "could not verify" and move on — if you can't verify it, ask Guiding Light to help you find the source
- Guess at a URL format and assume the page exists without testing it

**You are always required to:**
- Test every URL you put in the codebase by fetching it
- When a URL fails, try alternative URL patterns for that legislature's website
- When all URL attempts fail, write a specific prompt for Guiding Light to use with Claude in the browser
- Wait for the verified information before proceeding with that section of the onboarding

This applies to every step in this document that involves reading a primary source, verifying a citation, or confirming a URL works.

---

## 1. Legal Foundation — Verify the Law Actually Exists

**Why this matters:** A previous instance cited Texas HB 1709 as enacted law with a September 2025 effective date and $200,000 penalties. HB 1709 died in committee — it was never voted on, never signed, never became law. The actual TRAIGA law passed as HB 149 under completely different code sections (Ch. 551-554, not Ch. 120), a different effective date (January 1, 2026, not September 1, 2025), and a different penalty structure (tiered: $10K-$12K for curable violations, $80K-$200K for uncurable, with a 60-day cure period — not a flat $200K). If that product had launched, we would have been selling compliance documents for a law that does not exist, citing code sections that were never created, with penalty amounts that were wrong in every dimension.

Another instance cited a Colorado effective date of February 1, 2026 in every generated PDF. The actual date is June 30, 2026, changed by an amending bill (SB 25B-004) that pushed the deadline back. Customers who received those PDFs may have believed they were already past their compliance deadline.

**What you must do:**

- [ ] **Fetch the legislature's bill history page and READ it.** Not a summary. Not an AI-generated overview. The actual legislative history showing: filed, committee hearings, floor votes, sent to governor, signed. If the bill was never signed, it is not law. If it was amended by another bill, you must find that bill too.

- [ ] **Verify the bill number matches the enacted law.** Laws frequently pass under different bill numbers than the one originally filed. The same law can be introduced as multiple bills. Search the legislature's website for the law's common name and verify which bill number actually passed. Do not assume the bill number in `regulations.ts` is correct — verify it.

- [ ] **Read the enrolled/signed text of the bill.** This is the version that became law. Not the introduced version. Not the committee substitute. Not a summary page. The enrolled text. State legislatures publish this — find it and read it. The enrolled text is what creates the statute sections, sets penalties, and establishes effective dates. Everything else is secondary.

- [ ] **Check for amending bills.** After a law passes, subsequent legislative sessions can amend it. The most common amendment changes the effective date. Colorado SB24-205 originally had a February 1, 2026 effective date. SB 25B-004 changed it to June 30, 2026. If you only read the original bill, you will get the wrong date. Search the legislature's website for the statute section numbers to find any amendments.

- [ ] **Verify the statute citation matches the enrolled text.** The enrolled text creates specific sections in the state code (e.g., C.R.S. §§ 6-1-1701 through 6-1-1707, or Tex. Bus. & Com. Code Ch. 551-554). Read the bill's enacting clause to find exactly which code sections it creates or amends. Bill numbers (HB 149, SB 2487) are not statute citations — they disappear after enactment. The citation in `regulations.ts` must be the codified statute section, not the bill number.

- [ ] **Set `citationUrl` to the enacted statute text.** The URL must take the customer directly to a page where they can read the law. Not a bill history page. Not an agency overview page. The statute text itself. This URL is shown to customers before purchase — they must be able to click it and read the actual law. Test the URL in a browser.

---

## 2. Penalty & Enforcement Data — Get the Numbers Right

**Why this matters:** A previous instance wrote "$20,000 per violation" in blog posts as a flat fact. The actual statute (C.R.S. § 6-1-112) sets $20,000 as the maximum for standard violations, but $50,000 for violations affecting persons age 60+, and $10,000 for violating court orders. The penalty is "up to" $20,000 at the AG's discretion, not a mandatory $20,000. Customers doing risk math based on our content will multiply our number by their violation count. If our number is wrong, their risk calculation is wrong, and their business decisions are based on wrong math.

Another instance wrote "30-day cure period" for Texas TRAIGA. The actual cure period in HB 149 is 60 days (Section 552.104). A customer who believes they have 30 days to cure a violation when they actually have 60 is not harmed — but a customer who believes they have 60 when they have 30 could miss their window. Getting these numbers wrong in either direction is unacceptable.

**What you must do:**

- [ ] **Find the penalty section in the enrolled text and read it.** Penalties are usually in their own section or subsection. Read the actual language. "Not more than $20,000" means the maximum is $20,000 at the enforcer's discretion. "$20,000 per violation" means the amount is fixed. These are legally different statements. Use the statute's actual language in `penaltySummary`.

- [ ] **Document penalty tiers.** Many statutes have different penalties for first offenses vs. repeat offenders, knowing/willful violations vs. standard violations, or curable vs. uncurable violations. The Illinois Human Rights Act has three tiers: $16,000 first, $42,500 second within 5 years, $70,000 for two+ within 7 years (775 ILCS 5/8A-104(K)). Texas TRAIGA has curable ($10K-$12K) vs. uncurable ($80K-$200K) tiers plus daily continued-violation penalties. Capture ALL tiers in `penaltySummary`, not just the maximum.

- [ ] **Cite the exact statutory section for penalties.** Every penalty amount in `penaltySummary` must be traceable to a specific section number. "Up to $20,000 per violation (C.R.S. § 6-1-112(1)(a))" — not just "up to $20,000 per violation." The citation is your evidence that you read the statute, not a summary.

- [ ] **Document who enforces.** Read the enforcement section of the statute. Is it AG-only? Does it include a private right of action (individuals can sue)? Can other agencies enforce? A previous instance wrote that Colorado SB24-205 "has private remedies" in a blog post. The statute says the opposite — AG-exclusive enforcement with no private right of action (§ 6-1-1706). This contradiction between our blog and our product page was caught by our legal audit. If a customer had relied on the wrong statement, they would have made incorrect risk assessments.

- [ ] **Document cure periods.** If the statute gives violators time to fix problems before penalties apply, state the duration and cite the section. Cure periods directly affect how urgently customers need to act.

- [ ] **Set `maxPenalty` to reflect what the statute actually says.** If the maximum only applies to a specific category of violation, say so. "$200,000 per uncurable violation" is accurate. "$200,000 per violation" is misleading when curable violations max at $12,000.

---

## 3. Customer Acknowledgment Flow — Why This Protects Everyone

**Why this matters:** Before anyone can purchase a product, they must go directly to the enacted law and confirm they have read it. This is not a legal formality — it is the core of our defense against unauthorized practice of law (UPL) claims. Our legal audit identified that our questionnaire-to-document pipeline is closer to practicing law than selling blank templates: we collect company-specific facts, interpret regulatory applicability, and generate documents that claim to satisfy that company's legal obligations. The acknowledgment is what separates us from a law firm — the customer confirms they understand the law independently and that our documents are templates they must verify with their own attorney.

If the acknowledgment is weak, vague, or doesn't require the customer to confirm they've read the actual statute, our UPL defense weakens. Every product must have a strong acknowledgment.

**What you must do:**

- [ ] **Set `lawUrl` to the direct link to the enacted statute text.** This is the link customers click to read the law before acknowledging. It must work. It must go to the actual statute, not a summary page. Test it in a browser before shipping. A previous instance used an ILGA URL format (`/documents/077500050K2-102.htm`) that returned 404 errors. The working format is `/fulltext?DocName=077500050K2-102`. Broken links mean customers cannot read the law, which undermines the entire acknowledgment flow.

- [ ] **Set `lawLinkText` to tell customers exactly what they're reading.** "Read 775 ILCS 5/2-102 on ilga.gov" — not "Click here" or "Learn more." The link text must name the specific statute section and the authoritative source.

- [ ] **Write acknowledgment text that starts with "I have reviewed [specific statute]."** Not "I understand these are templates." The customer must affirmatively state they have reviewed the specific law. Compare:
  - Weak: "I understand that these are compliance templates, not legal advice."
  - Strong: "I have reviewed 775 ILCS 5/2-102(L) and understand that these are compliance templates, not legal advice."

  The strong version creates evidence that the customer engaged with the statute before purchasing.

- [ ] **Include "not legal advice" in every acknowledgment.** This is non-negotiable.

- [ ] **Include "consult qualified legal counsel" in every acknowledgment.** This is non-negotiable.

- [ ] **If implementing regulations are pending, say so explicitly.** Illinois IDHR Subpart J rules are proposed but not formally adopted. The acknowledgment must state this: "I understand that the IDHR implementing rules (Subpart J) are proposed and pending formal adoption." If we don't disclose this and the rules change or are withdrawn, customers built compliance programs on rules that don't exist. We must tell them the regulatory ground is shifting.

- [ ] **For framework-based products (not tied to a single statute), link to the primary framework.** Employee AI Policy links to the NIST AI RMF. Vendor Due Diligence links to the NIST AI RMF Playbook. Bias Audit links to EEOC AI guidance. The acknowledgment must say "I have reviewed [framework] referenced in this product."

---

## 4. Product Data in `regulations.ts` — The Single Source of Truth

**Why this matters:** `regulations.ts` is where every product's facts live — the citation, effective date, penalty amounts, applicability, pricing, and document list. Every other file in the codebase (blog posts, email templates, PDF generators, questionnaire config) must match what's in `regulations.ts`. When these files disagree, customers get contradictory information. Our legal audit found the Colorado effective date stated as February 1 in PDF headers but June 30 in product descriptions. The blog said Colorado "has private remedies" while the product page said "no private right of action." These contradictions undermine credibility and create legal exposure.

`regulations.ts` is the source of truth. Everything else derives from it. If you change a fact here, grep the entire codebase for the old value and update every occurrence.

**What you must do:**

- [ ] **`slug`** — URL-safe, lowercase, hyphenated. Matches the naming convention of existing products. This becomes the URL path (`/regulations/[slug]`) and the key used in `regulation-config.ts`, `pdf-generator.ts`, `pdf-helpers.ts`, and `route.ts`.

- [ ] **`citation`** — The enacted statute section, not a bill number. "775 ILCS 5/2-102(L)" not "HB3773." "Tex. Bus. & Com. Code Ch. 551–554" not "HB 149." Bill numbers are how legislatures track proposals. Statute citations are how lawyers and courts reference enacted law. We use statute citations.

- [ ] **`citationUrl`** — Verified working link to enacted law text. Tested in a browser. Returns the actual statute, not a 404 or a redirect to a homepage.

- [ ] **`status`** — Must match actual legislative status as of today. Only use `"in-effect"` if the law has been signed AND its effective date has passed. Use `"effective-soon"` if signed but effective date is in the future. Use `"proposed"` if still in the legislative process. A previous instance marked Texas TRAIGA as `"in-effect"` with an effective date of September 2025. The law hadn't even passed yet (and the original bill never did — it passed under a different bill number with a January 2026 date).

- [ ] **`effectiveDate`** — Verified against the enrolled text AND any amending bills. Write the full date: "January 1, 2026" not "1-1-26."

- [ ] **`price`** — Set based on the product's document count and complexity.

- [ ] **`stripePriceId`** — Created by you via the Stripe MCP. See Section 9. Left as empty string `""` until the Stripe product is created.

- [ ] **`description`** — Accurate. No claims that exceed what the statute says. Do not say "Complete compliance package" — say "Compliance documentation templates." Do not say "Everything you need" — this creates an implied warranty that our disclaimers cannot cure. A previous instance wrote "Everything you need to meet the state's AI-in-employment requirements is included" in delivery emails. Our legal audit flagged this as the single most exploitable sentence in the entire codebase.

- [ ] **`penaltySummary`** — Verified amounts with statute citations in parentheses. Include ALL penalty tiers, not just the maximum. Include cure periods if they exist. Include who enforces.

- [ ] **`maxPenalty`** — The actual statutory maximum, labeled accurately. "$200,000 per uncurable violation" not "$200,000 per violation" if that's what the statute says.

- [ ] **`appliesToSummary`** — Matches the statute's applicability provisions. Who must comply? What triggers the obligation? Read the definitions section of the statute to get this right.

- [ ] **`keywords`** — Include the slug, the enacted bill number, common name, and related search terms.

- [ ] **`documents`** — The list of documents this product generates. Every document listed here must have a working PDF generator. Do not list documents that don't have generators yet.

- [ ] **`ready: false`** — Leave this false until EVERY item in this entire checklist is complete. Not most items. Every item.

---

## 5. PDF Generators — The Product Customers Pay For

**Why this matters:** PDF generators are the product. Customers pay money and receive generated documents. Every citation, section reference, penalty amount, and effective date inside those documents must be correct. A previous instance stamped "eff. 2-1-26" (February 1, 2026) in the header of every Colorado PDF when the actual effective date is June 30, 2026. Another cited "(SB 2487)" — a bill number — in a legal notice delivered to employees, instead of the enacted statute citation "(P.A. 104-0425; 775 ILCS 5/8A-104(K))." Employees receiving that notice were reading a document that cited a bill number as legal authority. Bill numbers have no legal force after enactment.

**What you must do:**

- [ ] **Every document listed in the `documents` array must have a working generator function.** No stubs. No placeholder text. If the generator isn't done, the document should not be listed.

- [ ] **All generators return `jsPDF` doc objects — do NOT call `doc.save()`.** The coordinator in `pdf-generator.ts` handles naming. The `PostPaymentHandler` handles download/email. If you call `doc.save()` inside a generator, the PDF downloads prematurely during generation.

- [ ] **Add dynamic import routing in `pdf-generator.ts`.** The product slug must be routed to the correct generator module. Use the same pattern as existing products: `const mod = await import('./pdf-[slug]/index');`

- [ ] **Add a `REGULATION_HEADER` entry in `pdf-helpers.ts`.** This sets the statute name, citation, effective date, and rules status that appears in the header of every generated page. Verify every field:
  - `statute`: Full statute citation with effective date. Use "eff. 6-30-26" format. This date must match `regulations.ts`.
  - `rules`: Status of implementing regulations. If no rules adopted, say so: "No AG implementing rules adopted as of [month year]."

- [ ] **Every document starts with `addTopDisclaimer()`.** This is the red-bordered "TEMPLATE ONLY — NOT LEGAL ADVICE" box. It is the first thing the customer sees on every document. Our legal audit confirmed this is our strongest legal defense. Do not skip it.

- [ ] **Every page has `addDisclaimer()` in the footer.** Footer disclaimer on every page of every document. This is called in the page-break logic. Verify it renders on the last page too.

- [ ] **All citations in the document body must be enacted statute sections with correct numbers.** Not bill numbers. Not proposed rule references presented as enacted law. Every section number (§ 6-1-1703(4)(a), 775 ILCS 5/2-102(L)(2)) must be verified against the enrolled text. Do not copy section numbers from summaries or AI-generated content — read the statute and verify each one.

- [ ] **Test every generator with sample data.** Create a `ComplianceFormData` object with realistic values and generate all documents. Open each PDF and verify: the header has the correct statute info, the disclaimer box renders, the body content has correct citations, the footer disclaimer appears on every page, and fillable form fields work.

---

## 6. Email Template — What Customers Read After Paying

**Why this matters:** The delivery email is what customers receive immediately after purchasing. It contains the product description, instructions for using the documents, and a reminder about the law. A previous instance wrote "Everything you need to meet the state's AI-in-employment requirements is included" in this email. Our legal audit identified this as an implied warranty of completeness — the email promises the product is sufficient, while the disclaimer says it's just a template. These two statements contradict each other. A customer who suffers enforcement after relying on our templates could point to that email and argue we promised completeness.

Another instance used "CCPA" to abbreviate the Colorado Consumer Protection Act. CCPA universally means the California Consumer Privacy Act. In a product that operates in the AI compliance space where California and Colorado are both active, this abbreviation creates genuine confusion.

**What you must do:**

- [ ] **Add an entry in `REGULATION_EMAIL` in `route.ts`.** Every ready product must have: title, statute, description, steps, and reminder.

- [ ] **Description must NOT promise completeness.** Use: "AI compliance documentation templates, aligned with [statute citation] requirements. Review each document with your legal team before deployment." Never use "everything you need," "complete package," "all you need," or any language that implies the product is legally sufficient on its own.

- [ ] **Steps must be actionable.** Tell the customer exactly what to do with each document. "Post the Employee Notification where staff can see it." "Send the Due Diligence Questionnaire to each AI vendor." Not vague instructions like "review the documents."

- [ ] **Reminder must cite the correct effective date and enforcement mechanism.** Verify the date matches `regulations.ts`. Name the enforcing agency. If there's no private right of action, don't imply there is.

- [ ] **No abbreviation collisions.** Spell out act names in full or use unambiguous short forms. "Colorado Consumer Protection Act (C.R.S. § 6-1-112)" not "CCPA." "Illinois Human Rights Act" not "IHRA" (unless defined in context).

---

## 7. Blog Content — The Widest Audience, the Highest Scrutiny

**Why this matters:** Blog posts reach more people than any other part of the product. Non-customers read them. Journalists read them. Regulators read them. Competing attorneys read them looking for errors they can use to undermine credibility. A previous instance wrote that Illinois HB3773 "went into effect in 2023." The actual date is January 1, 2026 — three years off. Another wrote that Colorado SB24-205 "has private remedies." It does not — AG-exclusive enforcement, no private right of action. These errors were in public-facing SEO content that anyone can read and rely on.

Blog posts also had ZERO disclaimers — no "not legal advice" language anywhere — while making specific factual claims about penalty amounts, compliance requirements, and who is covered. The PDFs had robust disclaimers on every page. The emails had footer disclaimers. The blog posts, which reach the largest audience, had nothing. This gap has been fixed with a site-wide disclaimer component in `blog/[slug]/page.tsx`, but the content itself must still be accurate.

**What you must do:**

- [ ] **Every factual claim must be supported by the enacted statute.** If you write "$20,000 per violation," cite the section: "([C.R.S. § 6-1-112(1)(a)](https://colorado.public.law/statutes/crs_6-1-112))." If you write "no private right of action," cite the section. If you can't cite a section, don't make the claim.

- [ ] **The blog disclaimer renders automatically** via the site-wide component in `blog/[slug]/page.tsx`. You do not need to add disclaimer text to individual posts. But verify it renders by checking the post in dev mode.

- [ ] **All statute citations must be hyperlinked to the enacted text.** Use markdown links: `[C.R.S. §§ 6-1-1701 through 6-1-1707](https://leg.colorado.gov/bills/sb24-205)`. Readers should be able to click any citation and read the statute themselves.

- [ ] **Cross-check every number against `regulations.ts`.** Effective date, penalty amounts, enforcement mechanism, private right of action — all must match what's in the product data. If they don't match, one of them is wrong. Find out which one and fix it.

- [ ] **Do not editorialize about enforcement likelihood.** "The AG doesn't have a surveillance system monitoring every AI deployment" was flagged by our legal audit as potentially downplaying compliance urgency. State the facts. Let readers draw their own conclusions.

---

## 8. Questionnaire Configuration — What Customers See Before Paying

**Why this matters:** The questionnaire is where customers enter their company-specific information. The help texts guide them through each step. If help texts make legal claims ("this is required by law") or reference wrong statute sections, customers make decisions based on wrong guidance. Help texts should guide the user through the questionnaire, not advise them on the law.

**What you must do:**

- [ ] **Add an entry in `REGULATION_CONFIG` in `regulation-config.ts`.** All fields: name, statute, lawUrl, lawLinkText, acknowledgment, basePrice, documents, decisions, helpTexts.

- [ ] **`decisions` array must match the statute's covered decision areas.** Read the statute's definitions section. Colorado SB24-205 defines 8 areas of "consequential decisions" (§ 6-1-1701(3)). Illinois HB3773 covers 9 types of employment decisions (§ 2-102(L)). The decisions array must match these statutory categories, not categories you invent.

- [ ] **Help texts must reference correct statute sections.** If you write "per C.R.S. § 6-1-1703(4)(a)," verify that section exists and says what you claim.

- [ ] **Help texts must not make legal claims.** Guide the user: "Check every type of employment decision where this AI tool plays any role." Don't advise: "You are legally required to disclose this." The distinction matters for UPL defense.

---

## 9. Stripe Setup — Done by the Instance via Stripe MCP

**Why this matters:** Customers pay through Stripe. If the Stripe product doesn't exist, checkout fails. If the price doesn't match `regulations.ts`, the customer pays the wrong amount. If the price ID isn't copied to `regulations.ts`, the checkout button links to nothing. Guiding Light does not manage Stripe — every instance must handle this through the Stripe MCP.

**What you must do:**

- [ ] **Create a Stripe Product via the Stripe MCP.** The product name must match the `name` field in `regulations.ts`. The description must match. Add metadata: `slug` (matching `regulations.ts`), `regulation` (the statute citation).

- [ ] **Create a Stripe Price attached to the product.** One-time payment. USD currency. Amount must match the `price` field in `regulations.ts` (in cents for the Stripe API — $299 = 29900).

- [ ] **Copy the Stripe Price ID to `regulations.ts`.** The `stripePriceId` field must contain the live price ID (starts with `price_`). This is what the checkout API route uses to create the Stripe session. If this is empty or wrong, checkout fails.

- [ ] **Verify the checkout redirect works.** Click "Get Started" on the product page. It must redirect to Stripe checkout with the correct product name and price displayed. After payment, it must return to the product page with `?payment=success` in the URL.

- [ ] **Verify the payment verification endpoint works.** The `/api/verify-payment` route must accept the Stripe session ID and confirm payment was completed. The `PostPaymentHandler` component calls this endpoint — verify it returns success.

- [ ] **Test with a Stripe test card.** In test mode, use card number `4242 4242 4242 4242`, any future expiry, any CVC. Complete the full flow: questionnaire → checkout → payment → return → PDF generation → download. Verify the PDFs download correctly and the email sends (if email is configured).

- [ ] **Confirm the product and price are active in Stripe.** Not archived, not draft. Use the Stripe MCP to verify the product status. An inactive product will show checkout errors to customers.

---

## 10. Final Verification — The Last Gate Before Launch

**Why this matters:** This is the last check before `ready: true`. Once a product is ready, customers can purchase it. Every error that survives this step becomes a customer-facing error.

- [ ] **Build passes** — `npx next build` completes with zero errors and zero warnings related to this product.

- [ ] **Product page renders correctly** — Load `/regulations/[slug]` in dev mode. Verify: status badge color matches status, effective date is correct, price is correct, document count matches, penalty summary is accurate, "Get Started" button appears (not "Coming Soon").

- [ ] **Questionnaire loads and all steps work** — Click through all 6 steps. Verify help texts render, decision checkboxes match the statute's covered areas, acknowledgment text includes "I have reviewed [statute]," and the checkout button triggers Stripe.

- [ ] **Stripe product and price are active** — Verify via Stripe MCP.

- [ ] **Full purchase flow tested end-to-end** — Questionnaire → sessionStorage → Stripe checkout → payment (test card) → return with `?payment=success` → verify payment → PDF generation → download all documents → email delivery (if configured). Every step must work. If any step fails, the product is not ready.

- [ ] **Cross-reference consistency check** — Grep the codebase for the product slug, statute citation, effective date, and penalty amounts. Every file that mentions this product must agree on the facts. Files to check:
  - `regulations.ts` — product data
  - `regulation-config.ts` — questionnaire config
  - `pdf-helpers.ts` — document headers
  - `pdf-[product]/` — generator files
  - `route.ts` — email template
  - `content/blog/` — any blog posts mentioning this law

If any two files disagree on a fact, one of them is wrong. Find out which one. Fix it. Do not ship contradictions.

---

## Only after EVERY item above is verified: set `ready: true`.

No exceptions. No "we'll fix it later." No "it's probably right." Verify, cite, ship.
