# Product Page Template — Colorado SB 24-205

**[Round 2 rewrite — new marketing voice. v1 preserved in product-page-template-v1.md]**

---

## Why Colorado

Position 11.14 / 350 impressions. Page 2. The most imminent active deadline in the catalog: June 30, 2026. The buyer query "Colorado SB 24-205 compliance documents" is actively searched. No instant-download competitor exists at this price point. One title-tag improvement moves this page from invisible to functional.

---

## `<title>`

```
Colorado SB 24-205 Compliance Documents — Deadline June 30, 2026
```

Deadline in the title. The only product page in any search result with the date. CTR at position 7 is 3.0% (First Page Sage 2026, fetched live). Matching buyer urgency in the title can move click behavior even without a ranking change.

---

## `<meta description>`

```
Colorado SB 24-205 takes effect June 30, 2026. Deployers need a risk management policy, impact assessment, and consumer notices. 8 documents, built from C.R.S. § 6-1-1702, instant download — $449.
```

156 characters. Deadline first. Document types second (no competitor names these in a meta). Price. Citation.

---

## Hero Section (above fold)

### Status badge

```
DEADLINE: JUNE 30, 2026
```

Current badge reads "EFFECTIVE SOON" — passive. This is amber (`#B45309`), uppercase, Inter 600. The badge is the first thing the eye lands on in the hero. It should carry the most specific urgency signal on the page.

### H1

```
Colorado SB 24-205.
The documents. $449.
```

Two lines. Thirteen words including the price. The law name. The product category. The price. Nothing else above the fold needs to be said — the buyer who searched "Colorado SB 24-205 compliance documents" already knows why they're here. The H1 confirms they landed correctly and names the cost in the same breath.

This is the hardware store register: you walked up with a part, the cashier names the price. No orientation paragraph.

### Sub-lede (below H1, before price/CTA)

```
If you deploy AI in hiring, lending, insurance, healthcare, or housing in Colorado, you are a deployer under SB 24-205. Deadline: June 30, 2026. Enforcement: Colorado Consumer Protection Act. Penalty: up to $20,000 per violation.
```

Three sentences. Applicability. Deadline. Consequence. That's all the sub-lede needs to do. The buyer either qualifies or doesn't. If they do, they scroll. If they don't, they've learned something useful and should leave.

Penalty source: Colorado Consumer Protection Act, C.R.S. § 6-1-113, verified via WebSearch this session.

### Price and CTA (keep existing component)

```
$449  one-time purchase
```

Sidebar CTA button:
```
Get Your Documents — $449
```

Replace current "Customize Now — $449" with "Get Your Documents." "Customize" implies configuration work. "Get" implies you can have it now. The product is instant download — the CTA should sound like it.

Below button:
```
64 days remaining
vs. $400–$800/hour to draft from scratch
```

"64 days remaining" is dynamically computed: `Math.ceil((new Date('2026-06-30') - new Date()) / 86400000)`. After June 30: switch to "IN EFFECT — enforcement active." This is one line of JS in the sidebar component.

---

## Revised Section Order

The IA proposal moves penalties before documents. Here's the full new order with copy in the new voice:

### Section 1 — "Does This Apply to You?" (first substantive section)

**H2:**
```
Does Colorado SB 24-205 Apply to Your Business?
```

**Bullets (statute-precise, in new voice):**

- You operate in Colorado or target Colorado consumers — physical presence not required
- You use an AI tool that substantially factors into decisions about hiring, lending, insurance, healthcare, housing, or education
- You are the business using the AI — even if you didn't build it, you are a "deployer" under the statute
- You are not a small deployer (fewer than 50 FTEs) who uses only the developer's unmodified system with the developer's own training data — that's the narrow small-business exemption

**After bullets — the recognition sentence:**
```
If you also built or substantially modified the AI tool you're deploying, the statute assigns you separate developer obligations on top of these — including disclosure requirements to your own deployers. These 8 documents cover the deployer side. ([SB 24-205, C.R.S. § 6-1-1702](https://leg.colorado.gov/bills/sb24-205))
```

This is the one sentence that demonstrates the site read the statute. The deployer/developer distinction is real, statutory, and most buyers on this page don't know to ask about it. A business that built its own AI hiring tool and is also using it to screen candidates is simultaneously a developer and a deployer — with two separate obligation sets. Surfacing that without prompting is the hardware store moment: not an explainer, not a upsell, just visible recognition of a pattern the buyer didn't know was relevant to them. The buyer who reads this sentence knows they're not at a generic compliance template factory.

**After the recognition sentence:**
```
No revenue minimum. No employee minimum for most requirements. A 10-person company using an AI hiring tool has the same core obligations as a Fortune 500.
```

### Section 2 — Penalties (moved before "What's Included")

**H2:**
```
What Happens Without These Documents
```

**Body (new voice — short, exact):**
```
Colorado enforces SB 24-205 through the Colorado Consumer Protection Act. Violations are deceptive trade practices. The Attorney General has exclusive enforcement authority.

Penalty: up to $20,000 per violation. ([C.R.S. § 6-1-113](https://coag.gov/office-sections/consumer-protection/))

If you discover your AI system has caused algorithmic discrimination, you must report it to the AG within 90 days. Failure to report is a separate violation.

The AG's first question after a complaint: show me your risk management policy and impact assessment. Without those documents, you have no affirmative defense.
```

**Red callout block (keep existing visual component):**
```
Maximum: up to $20,000 per violation — Colorado Consumer Protection Act
```

### Section 3 — "What's Included" (8 documents)

**H2:**
```
8 Documents. Everything the Statute Requires.
```

Keep existing document list with DOC_EXPLANATIONS. Add one line per document in the new voice:

After each document name and explanation, add:
```
Required by: C.R.S. § 6-1-[section]
```

This converts each document from "here's what it does" to "here's why you can't skip it." The statute citation is the authority signal — the document isn't a convenience, it's a legal requirement.

### Section 4 — Document Preview

Keep existing `<DocumentSamplePreview>` component. H2:
```
See What You're Getting
```

(Shortened from "Preview Your Documents" — more direct.)

### Section 5 — What Happens After Purchase

**H2:**
```
Download. Fill. Sign. Done.
```

**Body (new voice — step format, no filler):**
```
1. Your 8 documents generate instantly as fillable PDFs.
2. Download the zip file or email to up to 3 team members.
3. Fill in the highlighted fields — your company name, AI systems, compliance details.
4. Sign using the electronic signature blocks. ESIGN Act compliant. No printing.
5. Have your attorney review before deployment.
```

Replace the current five-bullet prose block. Same information. Half the words.

### Section 6 — Add-ons (if applicable)

Keep "Complete Your Compliance" section. H2:
```
Add-Ons for This Package
```

(Shorter than "Complete Your Compliance" — more direct.)

### Section 7 — Statutory Authority

Keep existing section. This is correct as-is — the citation block with link to the enacted law is a trust anchor, not conversion friction.

### Section 8 — Questionnaire

Keep existing Questionnaire component. H2:
```
Customize Your Colorado Package
```

(Current is "Customize Your Colorado SB 24-205 Package" — remove the law citation from the questionnaire header. The buyer is already on the page. They don't need the reminder.)

---

## Recognition Principle — Applied to Illinois and NYC Product Pages

The Recognition Principle (one statute-sourced sentence per product page that surfaces what the buyer didn't know to ask) is not unique to Colorado. It applies to every product page. Here are the recognition sentences for the two other highest-urgency laws, ready to drop into Section 1 ("Does This Apply to You?") of each respective page:

**Illinois HB3773 — recognition sentence:**
```
If you use zip codes as a proxy for location in any AI employment decision, that practice is explicitly prohibited by name in the statute — not inferred from general anti-discrimination principles. ([775 ILCS 5/2-102(L)](https://www.ilga.gov/legislation/ilcs/documents/077500050K8A-104.htm))
```

Most Illinois employers on this page know they use AI in hiring. Few know the zip-code-as-proxy prohibition is in the statute by name. The buyer whose ATS filters by zip code just learned something their vendor didn't tell them. That's the hardware store moment.

**NYC Local Law 144 — recognition sentence:**
```
The bias audit must be conducted by an independent auditor — your HR team cannot conduct it internally, and your AI vendor cannot conduct it either. These documents are the pre-audit infrastructure the law requires, not the audit itself. ([NYC Admin. Code § 20-871](https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page))
```

Most NYC employers on this page think the bias audit requirement means "we need to review our AI for bias." It means something more specific: an independent third party conducts it, annually, on a defined schedule. Surfacing the independence requirement before purchase sets correct expectations — and pre-empts the post-purchase confusion that generates refund requests.

**Pattern rule for all other product pages:** Before shipping any product page in the new voice, identify the one statutory requirement that is (a) real and specific, (b) not obvious from the law's name or summary, and (c) relevant to at least some buyers on that page. Write one sentence. Cite the section. Place it in Section 1 after the applicability bullets. That sentence is the recognition sentence for that page.

---

## Blog Guide Card — Revised Copy

Current:
```
"Read our plain-language guide to this law →"
```

New voice:
```
"New to Colorado SB 24-205? Start with the plain-language guide, then come back for the documents. →"
```

"Come back for the documents" explicitly preserves the purchase intent while giving the reader permission to learn first. It's a routing instruction, not a departure invitation.

---

## Sidebar Purchase Card — Full Revised Copy

```
[LABEL — blue, 12px caps]
COMPLETE PACKAGE

[PRICE — 40px Inter 700]
$449

[SUB — 14px gray]
One-time. Instant download.

[COUNTDOWN — amber, 14px]
64 days until June 30 deadline

[CHECKLIST — 14px]
✓ 8 documents, customized to your business
✓ Built from C.R.S. § 6-1-1702
✓ Instant digital download
✓ Secure checkout via Stripe

[PRIMARY BUTTON — full width, Document Blue]
Get Your Documents — $449

[SECONDARY LINK — 14px]
Or start the questionnaire first →

[VS LINE — 12px gray]
vs. $400–$800/hour at a law firm

[VERIFIED BADGE — green background]
✓ Verified against enacted statute text
Source: C.R.S. § 6-1-1702 →

[CONTACT — 12px gray]
Questions? info@aicompliancedocuments.com
```

---

## What Stays Unchanged

- URL: `/products/colorado-sb24-205` — no change
- Questionnaire component and flow
- QuickPurchaseButton component
- BreadcrumbSchema
- Related products section
- ESIGN Act note (keep, condense into Step 4 of the new "What Happens After Purchase" section)
- Legal disclaimer (auto-rendered by page.tsx)

---

*Research basis: Colorado SB 24-205 primary source (leg.colorado.gov, fetched live); Colorado CPA penalty amounts ($20,000/violation, verified via WebSearch); CTR benchmarks (First Page Sage 2026, position 7 = 3.0%, fetched live); SMB objection research (size misconception, enforcement-doubt — both addressed in "Does This Apply to You?" section). Voice: new marketing voice from voice-spec.md.*
