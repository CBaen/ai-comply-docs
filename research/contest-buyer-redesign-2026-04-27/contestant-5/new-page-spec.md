# New Page Spec — `/compliance-deadline-by-state`

## Route
`/compliance-deadline-by-state`

## Why this page needs to exist

The GSC data shows the site's top-performing researcher queries are "ai governance standards," "ai governance framework," "ai compliance framework" — all informational. The buyer-intent queries ("ai compliance packages," "ai compliance cost") show impressions in the single digits.

One structural reason for this: there is no page on the site that serves the buyer who knows they have a problem but does not yet know which specific law applies to them. They search "AI compliance deadline" or "what AI laws apply to my business" and land on either a law firm article or a general blog post that doesn't have a clear product path.

This page is that page.

## What this page does

It is a single, scannable table of every law the site covers, organized by enforcement status and deadline — with a direct product link for each. It serves two buyer types:
1. The buyer who knows they're in Colorado and wants to confirm the deadline and find the product
2. The buyer who is in multiple states and needs to figure out which laws apply to them

It is NOT an informational resource for researchers. It is a product directory organized by urgency.

## Page structure

### `<title>`
```
AI Compliance Deadlines by State — Which Laws Apply to Your Business | AI Compliance Documents
```

### Meta description
```
Colorado SB 24-205: June 30, 2026. Texas TRAIGA: in effect. Illinois HB3773: in effect. NYC Local Law 144: in effect. Find your state's AI compliance deadline and get the documents you need.
```

### H1
```
AI Compliance Deadlines by State
```

### Sub-H1
```
Find which law applies to your business — and get the compliance documents you need, today.
```

### Section 1: In Effect Now (URGENT)

A grouped list of laws already in force, with red/amber urgency styling:

| Law | State | Effective | Max penalty | Product |
|---|---|---|---|---|
| Illinois HB3773 | Illinois | January 1, 2026 | $70,000/violation | [Get documents →](/products/illinois-hb3773) |
| Texas TRAIGA | Texas | January 1, 2026 | $200,000/uncurable violation | [Get documents →](/products/texas-traiga) |
| NYC Local Law 144 | NYC | July 5, 2023 | $1,500/day subsequent | [Get documents →](/products/nyc-local-law-144) |
| California CCPA ADMT | California | Active | [See page] | [Get documents →](/products/california-ccpa-admt) |

(Penalty amounts verified from live research session — see rationale.md for citations.)

### Section 2: Deadline Approaching

| Law | State | Effective | Max penalty | Product |
|---|---|---|---|---|
| Colorado SB 24-205 | Colorado | June 30, 2026 | $20,000/consumer | [Get documents →](/products/colorado-sb24-205) |

### Section 3: Not sure which law applies to you?

```
[H2] Not sure which law applies to you?

Three questions tell you what you need:

1. Which states do your employees or applicants live in? — Employment AI laws follow the employee, not the employer's headquarters.
2. Do you collect or use personal data from consumers in these states? — Privacy-based AI laws follow the consumer.
3. Do your AI tools make or substantially influence consequential decisions (hiring, credit, housing, insurance, healthcare)? — If yes, the higher-stakes laws apply.

If you're still not sure, [email us](mailto:info@aicompliancedocuments.com) — we'll point you in the right direction.
```

### Section 4: Coverage note

```
[Small text / footer note]
All deadlines and penalty amounts verified against enacted statute text. Last updated: April 2026.
Sources: leg.colorado.gov/bills/sb24-205, txaims.com (TRAIGA), ilga.gov (HB3773), nyc.gov/dca (Local Law 144).
```

## IA placement

- Linked from homepage urgency bar (sub-CTA: "Not sure which law applies to you? Start here →")
- Linked from product page sidebar ("Which laws apply to my business?" link)
- Linked from blog post closing sections as the "first step" for readers who don't know where to start

## What this page does NOT do

- It is not a comprehensive AI law tracker (those exist elsewhere and serve researchers)
- It does not have long-form educational content — each row links to the blog post for that, or to the product page
- It does not replace the products page — it is a buyer-routing page, not a catalog

## Keyword targeting

- "AI compliance deadline by state"
- "which AI laws apply to my business"
- "state AI law compliance deadlines 2026"
- "do I need to comply with AI regulations"

## Implementation notes

This page is static copy — no dynamic data needed beyond what's already in `regulations.ts`. The penalty amounts and dates are hardcoded from verified statute sources. It can be built as a simple static page in the Next.js app at `src/app/compliance-deadline-by-state/page.tsx` with no new components required — uses the same layout structure as other static pages.
