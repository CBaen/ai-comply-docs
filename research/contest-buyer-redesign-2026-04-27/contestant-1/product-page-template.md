# Product Page Template — Illinois HB3773

**Chosen product:** Illinois HB3773 — AI in Employment Decisions (`/products/illinois-hb3773`)

**Why Illinois:** Illinois HB3773 is the highest buyer-urgency product in the catalog right now. It has been in effect since January 1, 2026 — buyers are already late. The penalties ($16,000–$70,000 per aggrieved person) are the highest per-person amounts of any state. The law applies to any employer with Illinois employees regardless of company headquarters — a wide applicability pool. The target query "Illinois AI hiring law compliance" is a buyer-intent query that the site could own with the right product page structure.

---

## Metadata Rewrite

### `<title>`
**Current:** `Illinois HB3773 — AI Consumer Protections — Compliance Documents | AI Compliance Documents`

**Proposed:** `Illinois HB3773 AI Employment Compliance Documents — Employer Templates | AI Compliance Documents`

**Rationale:** "AI Consumer Protections" is legally wrong framing — HB3773 is an employment law, not a consumer protection law. It also doesn't match what employers search for. "AI Employment Compliance Documents — Employer Templates" matches the buyer query ("Illinois HB3773 employer compliance") and clarifies the law's scope.

### Meta description
**Current:** (uses the regulation `description` field from regulations.ts — generic)

**Proposed:** `Illinois HB3773 is in effect now. If you use AI in hiring, promotion, or performance reviews in Illinois, you are legally required to notify employees and document your AI systems. Penalties up to $70,000 per violation. Get your compliance package — 7 documents, instant download.`

**Character count:** ~236. Note: the description field in regulations.ts should be updated to a shorter version (~160 chars): `Illinois HB3773 is live. AI in hiring, promotion, or reviews in Illinois requires employee notice and documentation. Penalties up to $70,000 per violation.`

---

## Page Section Order (Proposed)

### 1. Law Identity Block (above fold)
```
[Status badge: IN EFFECT — January 1, 2026]

Illinois HB3773 — AI in Employment Decisions
(Illinois Human Rights Act, amended by Public Act 103-0804)

If you have employees or applicants in Illinois and you use AI in hiring, promotion, performance review, or disciplinary decisions — this law applies to you now.
```

**Implementation note:** Move the status badge (currently exists in code as `<StatusBadge>`) to be the FIRST element, before the law name, so it's the first thing the buyer's eye hits.

---

### 2. Exposure Statement (new — replaces generic description)

This section does not currently exist. It should appear immediately below the law identity block, before pricing.

**Proposed copy:**
```
What the law requires.

Illinois law says employers must notify employees and applicants when AI is used in decisions that affect them. That notice must be specific about which AI tools you're using and what they're doing. You must also be able to show that your AI tools aren't producing discriminatory outcomes by protected class.

The Illinois Department of Human Rights enforces this law. Penalties under the Illinois Human Rights Act are up to $16,000 for a first violation, $42,500 if you've had a prior finding within five years, and $70,000 for two or more prior findings within seven years. Those amounts apply per aggrieved person — not per complaint. (775 ILCS 5/8A-104)

If your AI hiring platform processed 50 applicants and a complaint leads to a finding, that's 50 separate violations.
```

**Citation link:** `(775 ILCS 5/8A-104)` → `https://www.ilga.gov/legislation/ilcs/ilcs4.asp?ActID=2266&ChapterID=64`

**Rationale:** Buyers land on this page and need to know two things before they'll buy: (a) does this law apply to me, and (b) what happens if I ignore it. The current page delivers neither clearly. The proposed section answers both, with statute-exact penalty figures.

---

### 3. Applies To — Current block, keep, sharpen

**Current appliesToSummary:** Fine as-is. Add the plain-language restatement:
```
The law applies regardless of where your company is headquartered. If you have employees or applicants in Illinois and your AI tools touch decisions about them — you're in scope.
```

**Current appliesToBullets:** Keep. These are already well-written.

---

### 4. Document List with Explanations — Current block, keep

The current `DOC_EXPLANATIONS` mapping in `page.tsx` already explains each document in buyer language. This is one of the strongest elements of the current product page. Keep it.

**One addition:** After the document list, add:

```
These 7 documents give you what the law asks for when a complaint arrives: written notice templates, an AI system inventory, an impact assessment framework, a human oversight protocol, and a compliance checklist. They're built from the actual text of Public Act 103-0804 — not a summary of it.
```

---

### 5. Urgency Bar (new, appears between document list and purchase CTA)

**Proposed:**

```
[Red background bar]
HB3773 took effect January 1, 2026. If you're reading this, you may already be out of compliance. 
Getting documented now is a better position than getting documented after a complaint.
```

**Rationale:** The current page has no urgency signal between the document list and the buy button. Buyers who are almost convinced often need a final nudge that doesn't feel like a sales pitch. The proposed bar is factual — the law IS already in effect — and frames documentation as a defensive move, not a product purchase. This fits the Pragmatic Realist voice.

---

### 6. Purchase CTA — Sharpen

**Current CTA label:** (not shown in page.tsx excerpt — likely "Get Your Documents" or similar)

**Proposed CTA:**
```
Get the Illinois HB3773 Compliance Package — $[price], instant download
```

**Sub-copy below button:**
```
7 documents. Built from the enacted statute text. Download immediately after purchase.
Not sure this covers your situation? Email info@aicompliancedocuments.com before buying.
```

**Rationale:** The current page likely has a generic CTA label. The proposed version names the specific law, price, document count, and the instant-download promise — all the information a buyer needs to click with confidence. The email escape hatch ("Not sure this covers your situation?") addresses the main objection without creating a consultation pathway the site doesn't offer.

---

### 7. FAQ Accordion (new for product pages — below purchase CTA)

**Proposed questions:**

**Q: What if I only have a few employees in Illinois?**
> The law doesn't set a minimum employee count for the disclosure requirement. If you have one employee in Illinois and you use AI in any employment decision affecting them, you need to provide notice. The penalties apply per aggrieved person, so the size of your exposure scales with how many people your AI tools affect.

**Q: What counts as "AI in employment decisions"?**
> Under HB3773, this includes any AI that substantially assists or replaces human judgment in decisions about hiring, promotion, discipline, or performance review. If a software tool screens, scores, ranks, or recommends — and humans rely on that output in their decisions — you're likely covered. Your vendor can tell you whether their tool uses AI.

**Q: Does this apply if our company is based outside Illinois?**
> Yes. The law applies based on where your employees and applicants are, not where your company is headquartered. If you have employees or applicants in Illinois, the law applies to you.

**Q: What's in the compliance package?**
> 7 documents: Employee & Applicant AI Notification, AI System Inventory, Impact Assessment Framework, Human Oversight Protocol, Compliance Checklist, Accommodation Request Form, and Risk Management Policy. Each is built from the enacted text of Public Act 103-0804.

---

### 8. Related Laws Bar (bottom of page, keep and expand)

Add: "Also in force in your industry:" with cards linking to:
- NYC Local Law 144 (if you hire in NYC)
- Colorado SB 24-205 (if you operate in Colorado — effective June 30, 2026)
- Texas TRAIGA (if you operate in Texas)

**Rationale:** A buyer who came for Illinois may have exposure in multiple states. Cross-selling to related products is both commercially sound and genuinely helpful — the buyer needs to know about all their obligations.

---

## What Stays the Same

- Status badge component (StatusBadge) — keep, move position
- Questionnaire component — keep
- DOC_EXPLANATIONS mapping — keep, add summary paragraph
- BreadcrumbSchema — keep
- Citation link to primary statute (citationUrl in regulations.ts) — keep

## What Changes

- Metadata: title + description
- Law identity block: add exposure statement above pricing
- Add urgency bar between document list and CTA
- Sharpen CTA label
- Add product-page FAQ accordion
- Add related laws bar
