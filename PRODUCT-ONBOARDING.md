# Product Onboarding Requirements

Every product must complete ALL items before `ready: true` is set in `regulations.ts`.

---

## 1. Legal Foundation

- [ ] **Enacted law verified** — Confirm the law exists and is enacted (not proposed, not died in committee). Fetch the legislature's bill history page and verify it was signed by the governor.
- [ ] **Correct bill number** — If the law passed under a different bill number than expected, update all references.
- [ ] **Citation verified** — The statute citation (ILCS section, C.R.S. section, etc.) must match the enacted text. Bill numbers are not statute citations.
- [ ] **Effective date verified** — Check for amending bills that may have changed the effective date. Cross-reference at least two sources.
- [ ] **Citation URL points to enacted law text** — `citationUrl` in `regulations.ts` must link to a page where a customer can read the actual law. Not a bill history page. Not an agency overview page. The statute text itself.

## 2. Penalty & Enforcement Data

- [ ] **Penalty amounts verified from primary source** — Read the penalty section of the enacted statute. Document the exact section number.
- [ ] **Penalty tiers documented** — If the statute has tiered penalties (first offense, repeat, knowing/willful), capture all tiers in `penaltySummary`.
- [ ] **Enforcement mechanism documented** — Who enforces? AG only? Private right of action? Both? Cite the section.
- [ ] **Cure period documented** — If a cure period exists, state the duration and cite the section.
- [ ] **maxPenalty reflects actual maximum** — Label as "per violation" or "per uncurable violation" or whatever the statute actually says.

## 3. Customer Acknowledgment Flow

- [ ] **`lawUrl` in `regulation-config.ts`** — Direct link to the enacted law text or relevant framework.
- [ ] **`lawLinkText` is clear** — Tells the customer exactly what they're reading ("Read 775 ILCS 5/2-102 on ilga.gov").
- [ ] **`acknowledgment` includes "I have reviewed"** — Customer must confirm they have reviewed the specific statute or framework. Not just "I understand these are templates."
- [ ] **Acknowledgment includes "not legal advice"** — Every acknowledgment.
- [ ] **Acknowledgment includes "consult qualified legal counsel"** — Every acknowledgment.
- [ ] **Acknowledgment references proposed rules status** — If implementing regulations are pending, say so explicitly (e.g., "IDHR Subpart J rules are proposed and pending formal adoption").

## 4. Product Data in `regulations.ts`

- [ ] **`slug`** — URL-safe, matches the naming convention of existing products.
- [ ] **`citation`** — Enacted statute section, not bill number.
- [ ] **`citationUrl`** — Verified working link to enacted law text.
- [ ] **`status`** — One of: `in-effect`, `effective-soon`, `proposed`. Must match actual legislative status.
- [ ] **`effectiveDate`** — Verified against enacted text including any amending bills.
- [ ] **`price`** — Set.
- [ ] **`stripePriceId`** — Created in Stripe dashboard, ID copied here.
- [ ] **`description`** — Accurate, no claims that exceed what the law says.
- [ ] **`penaltySummary`** — Verified amounts with statute citations.
- [ ] **`maxPenalty`** — Matches the actual statutory maximum.
- [ ] **`appliesToSummary`** — Matches the statute's applicability provisions.
- [ ] **`keywords`** — Include slug, bill number, common names.
- [ ] **`documents`** — List matches what the PDF generators actually produce.
- [ ] **`ready: false`** — Until ALL items on this checklist are complete.

## 5. PDF Generators

- [ ] **All listed documents have working generators** — Every document in the `documents` array must have a corresponding generator function.
- [ ] **Generators return `jsPDF` doc objects** — Do NOT call `doc.save()`.
- [ ] **Dynamic import routing in `pdf-generator.ts`** — The slug must be routed to the correct generator module.
- [ ] **`addDocHeader()` uses correct statute info** — Verify the `REGULATION_HEADER` entry in `pdf-helpers.ts` has the correct statute, effective date, and rules status.
- [ ] **`addTopDisclaimer()` present** — Every document starts with the red "TEMPLATE ONLY" disclaimer box.
- [ ] **`addDisclaimer()` on every page** — Footer disclaimer on every page.
- [ ] **All citations in document body are correct** — Section numbers, subsection references, penalty amounts match enacted law.
- [ ] **Tested with sample data** — Generate all documents with test ComplianceFormData and verify output.

## 6. Email Template

- [ ] **Entry in `REGULATION_EMAIL` in `route.ts`** — Title, statute, description, steps, reminder.
- [ ] **Description does NOT promise completeness** — No "everything you need." Use "documentation templates aligned with [law] requirements."
- [ ] **Steps are actionable** — Tell the customer what to do with each document.
- [ ] **Reminder cites the correct effective date and enforcement mechanism.**
- [ ] **No abbreviation collisions** — Don't use "CCPA" for Colorado Consumer Protection Act. Spell it out.

## 7. Blog Content (if publishing)

- [ ] **Blog post has no factual claims unsupported by the enacted statute.**
- [ ] **Blog disclaimer renders automatically** — Via the site-wide component in `blog/[slug]/page.tsx`.
- [ ] **All statute citations are hyperlinked to the enacted text.**
- [ ] **Effective date matches what's in `regulations.ts`.**
- [ ] **Penalty amounts match what's in `regulations.ts`.**
- [ ] **Private right of action / AG enforcement correctly stated.**
- [ ] **No abbreviation collisions with other laws.**

## 8. Questionnaire Configuration

- [ ] **Entry in `REGULATION_CONFIG` in `regulation-config.ts`** — All fields populated.
- [ ] **`decisions` array matches the statute's covered decision areas.**
- [ ] **Help texts are accurate** — Reference correct statute sections.
- [ ] **Help texts don't make legal claims** — Guide the user, don't advise them.

## 9. Final Verification

- [ ] **Build passes** — `npx next build` completes with no errors.
- [ ] **Product page renders correctly** — Check `/regulations/[slug]` in dev.
- [ ] **Questionnaire loads and all steps work.**
- [ ] **Stripe product exists** — Price ID set in `regulations.ts`.
- [ ] **All internal cross-references are consistent** — Same effective date, same penalty amounts, same enforcement mechanism across `regulations.ts`, `regulation-config.ts`, `pdf-helpers.ts`, `route.ts`, and any blog posts.

---

## Only after ALL items above are checked: set `ready: true`.
