# New Page Spec — /deadline-checker

## Route
`/deadline-checker`

**Rationale for existence:** The #1 SMB objection identified in research is "I don't know which law applies to me." The current site addresses this in the homepage FAQ ("Where do I start if I don't know which law applies to me?") but that answer is buried below the fold and requires the buyer to already be on the homepage. The `/deadline-checker` page gives this question its own URL — a page that can rank for queries like "do I need AI compliance" and "which AI law applies to my business" — and routes buyers directly to the product that matches their situation.

This is also the sub-CTA destination from the homepage ("Not sure which law applies to you? Start here.") and the closing-section recommendation in blog posts that cover multiple jurisdictions.

---

## Page Purpose

A state-and-use-case selector that outputs: "Based on where you operate and how you use AI, these laws apply to your business" + links to the relevant products.

This is NOT a quiz. It is not a lead-capture gate. It is a one-page decision tool that a buyer can complete in under 60 seconds and emerge from with a specific product recommendation.

---

## Metadata

### `<title>`
`Which AI Compliance Law Applies to Your Business? | AI Compliance Documents`

### Meta description
`You use AI in your business. Multiple state laws may apply — Colorado, Illinois, NYC, Texas, California. Answer 3 questions to see which compliance documents you need. No email required.`

---

## Page Copy

### H1
`Which AI law applies to your business?`

### Sub-H1
`Answer three questions. Get a specific answer — not a list of everything that might apply to someone.`

---

## Three-Question Selector (Static HTML — no backend required)

This is a progressive-disclosure UI built entirely in React with no API calls. All logic is client-side.

### Question 1: Where do your employees or customers work/live?
```
[ ] Colorado (employees or consumers in Colorado)
[ ] Illinois (employees in Illinois)
[ ] New York City (employees hired in NYC)
[ ] Texas (consumers or high-risk AI users in Texas)
[ ] California (consumers with personal data processed)
[ ] Multiple states
[ ] Not sure
```

### Question 2: How does your business use AI?
```
[ ] In hiring, promotion, or HR decisions
[ ] In lending, insurance, or financial decisions
[ ] In consumer-facing decisions (recommendations, scoring, pricing)
[ ] In healthcare or clinical decisions
[ ] I'm not sure if my tools use AI
[ ] We build or sell AI systems to other businesses
```

### Question 3: What is your most pressing situation?
```
[ ] I have a deadline coming up (or have already missed one)
[ ] A vendor or auditor flagged a compliance gap
[ ] I want to get ahead of it before something happens
[ ] I received a notice or complaint
```

---

## Output Logic (Static, Client-Side)

| Q1 | Q2 | Recommended Product(s) |
|----|----|-----------------------|
| Colorado | Hiring/HR | colorado-sb24-205 |
| Colorado | Any non-hiring | colorado-sb24-205 |
| Illinois | Hiring/HR | illinois-hb3773 |
| NYC | Hiring/HR | nyc-local-law-144 |
| Texas | Any | texas-traiga |
| California | Consumer decisions | california-ccpa-admt |
| Multiple states | Hiring/HR | multi-state-employer-ai-disclosure |
| Multiple states | Any | multi-state-profiling-assessment |
| Not sure | Any | ai-system-registry (start here) |

---

## Result Display (After Selector Completes)

```
Based on your answers, these laws apply to your business:

[Product card: Illinois HB3773]
Status: IN EFFECT — January 1, 2026
Applies to: Employers using AI in hiring, promotion, or performance decisions in Illinois
Penalty: Up to $70,000 per aggrieved person (775 ILCS 5/8A-104)
[Get the Illinois Compliance Package — $449] [See what's included]

[Product card: NYC Local Law 144] (if NYC selected)
Status: IN EFFECT — July 5, 2023
...
```

---

## Implementation Notes

- Pure React, no new API routes, no backend.
- Product data sourced from `regulations.ts` — same data already powering the rest of the site.
- The selector state is managed with `useState` in a single client component.
- No email capture, no account required. Buyers see their result immediately.
- "Not sure" paths route to the AI System Registry product (`/products/ai-system-registry`) — the $199 inventory tool is the right first step for buyers who don't know what AI they're running.

---

## Why This Page, Not Something Else

The alternative was a `/compliance-deadline-by-state` page (a static deadline calendar). That page would rank well for informational queries but would not convert buyers — it answers "when is the deadline" rather than "what do I need to buy."

The `/deadline-checker` directly addresses the conversion problem: it takes a buyer who knows they have exposure and routes them to the specific product they need. It also addresses the zero-click problem by being a different kind of page — interactive tools are not consumed by AI Overviews the way informational articles are.

---

## Placement in Site IA

- Navigation: Not in the primary nav (would create decision fatigue). 
- Accessible via: (a) homepage sub-CTA, (b) blog post closing sections for posts covering multiple jurisdictions, (c) `/products` page sidebar or header ("Not sure where to start?")
- Canonical URL: `https://aicompliancedocuments.com/deadline-checker`
