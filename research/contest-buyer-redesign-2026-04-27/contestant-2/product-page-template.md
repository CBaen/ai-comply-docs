# Product Page Template — Colorado SB 24-205

**Chosen product:** Colorado SB 24-205 (`/products/colorado-sb24-205`, $449)
**Why Colorado:** Highest SERP presence of all products (350 impressions, position 11.14). The June 30, 2026 deadline is the most concrete imminent urgency anchor in the site's inventory. Research shows "Colorado AI law compliance template" is a live buyer query with multiple law firms and dedicated sites competing — meaning intent is proven.

---

## Metadata (in `generateMetadata`)

### Current `<title>`:
```
Colorado SB 24-205 — AI Consumer Protections — Compliance Documents | AI Compliance Documents
```

### Proposed `<title>`:
```
Colorado SB 24-205 Compliance Documents — Deadline June 30, 2026 | Instant Download
```

**Rationale:** Current title is pure catalog — law name, then category, then brand. No buyer signal. The proposed title answers the buyer's actual search intent: "Colorado SB 24-205 compliance documents" (what they want), "Deadline June 30, 2026" (urgency), "Instant Download" (action path). 78 characters.

### Current meta description (from `reg.description`):
```
Colorado's AI law takes effect June 30, 2026 and requires businesses using AI in consequential decisions — hiring, lending, insurance, housing, healthcare — to have a risk management program, impact assessments, and consumer notices. This package covers all deployer obligations under SB 24-205.
```

### Proposed meta description:
```
Colorado SB 24-205 takes effect June 30, 2026. If you deploy AI in hiring, lending, insurance, or healthcare in Colorado, you need documented compliance now. 8 statute-sourced documents, instant download. $449 one-time.
```

**Rationale:** Current description is good (specific, statute-based) but buries the deadline mid-sentence and ends without price. The proposed version leads with the deadline, names the buyer in sentence two, and closes with the product specifics including price. 216 characters — trim "8 statute-sourced documents, instant download." to fit 160-char limit: "Colorado SB 24-205 takes effect June 30, 2026. If you deploy AI in hiring, lending, or insurance in Colorado, you need documented compliance. $449, instant download."

---

## Page Structure — Section Order

The current product page structure (read from page.tsx lines 330+):
1. Hero (law name, status badge, description, price, CTA)
2. Key stats bar (documents, max penalty, Stripe)
3. Main content: "Does This Apply to You?" — applicability checklist
4. What's included — document list
5. Penalty section
6. How it works
7. Sidebar: price, CTA, blog guide link, add-ons

**Proposed changes to section order and copy hierarchy:**

### Change 1: Move the deadline before "Does This Apply to You?"

Add a new banner component immediately below the key stats bar, ABOVE the applicability section:

```jsx
{reg.status === "effective-soon" && (
  <div className="bg-amber-50 border-l-4 border-amber-500 rounded p-4 mb-8">
    <p className="text-amber-900 font-semibold text-sm">
      Colorado SB 24-205 takes effect <strong>June 30, 2026</strong>.
      The law requires documentation to be in place by that date — not just purchased.
      Build time is part of compliance.
    </p>
  </div>
)}
```

**Rationale:** The buyer's first question is "when?" The current page shows "Effective: June 30, 2026" only as a small status badge next to "EFFECTIVE SOON." The proposed banner makes the deadline the loudest element on the page before the buyer reads anything else. The second sentence is critical: it addresses the common misconception that compliance happens the moment you buy — the law requires a documented program, not a receipt.

---

### Change 2: Rewrite the hero description

**Current `reg.description`** (rendered in hero):
```
Colorado's AI law takes effect June 30, 2026 and requires businesses using AI in consequential decisions — hiring, lending, insurance, housing, healthcare — to have a risk management program, impact assessments, and consumer notices. This package covers all deployer obligations under SB 24-205.
```

**Proposed hero description (copy only — `reg.description` field OR hero override):**
```
June 30, 2026 is when SB 24-205 takes effect. If your business deploys any AI system that helps make decisions about Colorado consumers — in hiring, lending, insurance, housing, healthcare, or education — you are a deployer under this law. Deployers are required to have a documented risk management program, conduct impact assessments, issue consumer notices, and maintain human oversight records. These are not suggestions. The Attorney General enforces with penalties up to $20,000 per violation under the Colorado Consumer Protection Act (C.R.S. § 6-1-112).

This package contains the 8 documents deployers need. Each is built from the enacted statute text at leg.colorado.gov.
```

**Rationale:** Realist opens ("June 30, 2026 is when"). Credentialist validates (deployer definition, requirement list, penalty citation, statute section). Realist closes ("This package contains the 8 documents deployers need."). The current description names the requirements but softens them. The proposed version makes the legal obligations sound like what they are: obligations, not options. The penalty citation (`C.R.S. § 6-1-112`) is verified in `regulations.ts` penaltySummary field.

---

### Change 3: Applicability section — add explicit "you do NOT need this if" block

**Current "Does This Apply to You?" section:** Shows 3 bullet points of who DOES qualify.

**Proposed addition:** Below the existing bullets, add:

```
You do NOT need this package if:
- Your AI systems are not used in consequential decisions (hiring, lending, insurance, housing, healthcare, education, or legal services)
- Your business has no operations affecting Colorado consumers
- You are a developer (builder) of AI systems rather than a deployer — developers have a separate set of obligations
```

**Rationale:** Research shows the #1 SMB objection is "does this apply to me?" Many buyers need explicit confirmation they DO NOT need to purchase before they trust a site enough to buy when they DO need it. This addition builds credibility — it doesn't push non-buyers into a purchase, which is the honest behavior a statute-sourced product should model. It also correctly distinguishes developer vs. deployer, which is one of the most common confusion points for Colorado specifically.

---

### Change 4: Penalty section — add "what this actually means" expansion

**Current penalty rendering:** The stats bar shows `maxPenalty: "Up to $20,000 per violation ($50,000 for age 60+)"`. The penalty summary lives in structured data but isn't prominently rendered on the visible page.

**Proposed penalty callout block** (add before the document list):

```
## What Happens If You Don't Have This Documentation

The Attorney General enforces Colorado SB 24-205 under the Colorado Consumer Protection Act.

Penalties:
- Up to $20,000 per violation for standard violations (C.R.S. § 6-1-112(1)(a))
- Up to $50,000 per violation when the affected consumer is 60 or older (C.R.S. § 6-1-112(1)(c))
- No private right of action — enforcement is AG-only
- Violations are counted per consumer affected — an AI system that makes hiring decisions across 50 applicants is 50 separate violations

There is a 90-day cure period under C.R.S. § 6-1-1703(10)(b)(II) for deployers who can demonstrate a good-faith attempt to comply after notice. This cure period exists. It is not a reason to delay documentation — it is a last resort after enforcement action has already begun.
```

**Rationale:** The current page shows the max penalty in tiny text in the stats bar. The proposed block names both penalty tiers with citations, names the enforcement agency, clarifies per-consumer counting (which multiplies exposure dramatically for AI systems), and addresses the "but there's a cure period" objection without editorializing about enforcement likelihood. All numbers are from `regulations.ts` penaltySummary which was built from the primary source.

**[NOTE: The 90-day cure period citation C.R.S. § 6-1-1703(10)(b)(II) appears in regulations.ts — VERIFY this section number against leg.colorado.gov during implementation before publishing. Marking as REQUIRES VERIFICATION before production deployment.]**

---

### Change 5: Document list — add one-sentence "why you need this" for each document

**Current document list:** Names only. Example: "Risk Management Policy"

**Proposed document list format** (using existing `DOC_EXPLANATIONS` map in page.tsx):

The page already has a `DOC_EXPLANATIONS` constant that maps document names to descriptions. These explanations are already good. The problem is they may not be rendering prominently enough.

Proposed: Make the `DOC_EXPLANATIONS` text visually prominent — 2-line items instead of hidden tooltips. The current implementation should be checked — if the explanations are rendering in the document list section, ensure font size and contrast are readable. If not rendering, they should be.

**No copy change needed** — the existing explanations are strong. The fix is visibility.

---

### Change 6: CTA Sidebar — add law citation link as trust signal

**Current sidebar:** Price + buy button + blog guide link.

**Proposed addition to sidebar:**
```
Built from the enacted statute:
C.R.S. § 6-1-1701 et seq.
[Read the law at leg.colorado.gov →]
```

Link: `https://leg.colorado.gov/bills/sb24-205`

**Rationale:** The single strongest trust signal for a buyer who is hesitant about statutory accuracy is a direct link to the law. Competitors (law firm blog posts, platform guides) reference the law but don't make it this easy to verify. Putting the primary source link in the sidebar purchase zone converts hesitation into trust at the decision moment.

---

### Change 7: Page `<title>` uses `${reg.name} — Compliance Documents` in generateMetadata

**Current:** `${reg.name} — Compliance Documents | AI Compliance Documents`
**Proposed:** Override for Colorado specifically — `Colorado SB 24-205 Compliance Documents — Deadline June 30, 2026 | Instant Download`

This requires a conditional in `generateMetadata` or updating the `name` field in regulations.ts.

Recommend: add an optional `pageTitleOverride` field to the Regulation interface so high-urgency products can have a deadline-specific title.

---

## Question Schema Addition (new)

Add `FAQPage` structured data to the Colorado product page with the following Q&A pairs:

```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Does Colorado SB 24-205 apply to small businesses?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. SB 24-205 has no small-business exemption based on revenue or employee count. If you deploy AI that makes consequential decisions about Colorado consumers, you are a deployer under the law."
      }
    },
    {
      "@type": "Question",
      "name": "When does Colorado's AI law take effect?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "June 30, 2026. This date was set by SB25B-004, which extended the original February 1, 2026 deadline. No further extensions have been announced."
      }
    },
    {
      "@type": "Question",
      "name": "What is the penalty for violating Colorado SB 24-205?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Attorney General can impose civil penalties of up to $20,000 per violation under the Colorado Consumer Protection Act (C.R.S. § 6-1-112). Violations involving consumers age 60 or older carry penalties up to $50,000 per violation."
      }
    },
    {
      "@type": "Question",
      "name": "What documents do I need to comply with Colorado SB 24-205?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Deployers need: a Risk Management Policy, an Impact Assessment for each high-risk AI system, Consumer Notification and Disclosure templates, an Algorithmic Discrimination Prevention Plan, a Human Oversight Protocol, an Annual Review Tracker, and a Compliance Checklist."
      }
    }
  ]
}
```

**Rationale:** This FAQ schema is how AI Overviews find quotable answers to questions like "what is the penalty for Colorado AI law" — the queries showing 0.11% CTR at position 4. Structuring these as FAQ schema means the product page (not just the blog post) can be cited as a direct answer source. This converts a researcher-read blog post into a product-page-cited AI Overview.
