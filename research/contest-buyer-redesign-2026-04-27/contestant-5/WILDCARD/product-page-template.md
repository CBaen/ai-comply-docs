# Product Page Template — Wildcard Synthesis

## Scope

This template applies to all product pages. Three structural moves are integrated:
1. **Two-Mode Frame (C4):** Every mode-sensitive UI element has a Deadline Approaching and Already Exposed variant, triggered by `reg.status` in `regulations.ts`.
2. **Recognition Principle (C3):** One statute-sourced sentence per page that surfaces what the buyer didn't know to ask. Four pages have recognition sentences written out below.
3. **Build-Order Priority (C2):** The section order and copy changes are sequenced in rationale.md Step 5 — product pages are not the first thing that ships.

---

## Product Illustrated: Colorado SB 24-205 (Deadline Approaching Mode)

Colorado has the most imminent deadline (June 30, 2026). The Deadline Approaching mode is demonstrated here. Already Exposed variants are specified in the mode table at the end.

---

## Metadata

### `<title>`
**Deadline Approaching:**
```
Colorado SB 24-205 Compliance Documents — June 30, 2026 Deadline
```

**Already Exposed (after flip):**
```
Colorado SB 24-205 Compliance Documents — In Effect Now
```

The mode is driven by `reg.status`. The `generateMetadata` function in `src/app/products/[slug]/page.tsx` renders the title conditionally.

### Meta description (Colorado, Deadline Approaching)
```
Colorado's AI law takes effect June 30, 2026. Deployers need a risk management policy, impact assessment, and consumer notices. 8 documents, built from C.R.S. § 6-1-1702. $449 instant download.
```
157 characters. Deadline first. Document types named. Price before "instant download."

---

## Hero (Above the Fold)

### Deadline Banner (full-width, top of hero)
**Deadline Approaching (Deadline Amber `#D97706` background, white text):**
```
Colorado SB 24-205 — June 30, 2026 — Deadline Approaching
```

**Already Exposed (Enforcement Red `#B91C1C` background, white text):**
```
Colorado SB 24-205 — In Effect — AG Enforcement Active
```

This is the first thing the buyer reads. It answers "is this my law and is it urgent?" before the H1.

### H1
**Deadline Approaching:**
```
Colorado SB 24-205. 8 Documents. June 30, 2026.
```

**Already Exposed:**
```
Colorado SB 24-205. 8 Documents. Required Now.
```

Three declarative fragments. Law name. What you get. When you need it. No qualifying clauses.

### Deck
**Deadline Approaching:**
```
SB 24-205 requires 8 documents from every deployer. These are them — built from C.R.S. § 6-1-1701 et seq.
```

**Already Exposed:**
```
SB 24-205 is in effect. Every deployer using high-risk AI affecting Colorado residents owes these documents now. Built from C.R.S. § 6-1-1701 et seq.
```

### Citation link (keep existing)
```
Read the enacted law: C.R.S. § 6-1-1701 et seq. →
```
Strongest trust signal on the page. Don't move it.

### Key Stats Bar
**Deadline Approaching:**
```
8 documents  |  Up to $20,000/violation  |  June 30, 2026  |  Stripe checkout
```

**Already Exposed:**
```
8 documents  |  Up to $20,000/violation  |  In Effect Now  |  Stripe checkout
```

---

## Full Flip-Logic Table

The `reg.status` field in `regulations.ts` drives every urgency-mode-sensitive element. One field change triggers all of these:

| Element | `effective-soon` (Deadline Approaching) | `in-effect` (Already Exposed) |
|---|---|---|
| Deadline Banner background | Deadline Amber `#D97706` | Enforcement Red `#B91C1C` |
| Deadline Banner text | `[Law] — [Date] — Deadline Approaching` | `[Law] — In Effect — AG Enforcement Active` |
| H1 | `[Law]. [N] Documents. [Date].` | `[Law]. [N] Documents. Required Now.` |
| Deck | SB 24-205 requires... | SB 24-205 is in effect... |
| Key Stats Bar | date string | `In Effect Now` |
| Sidebar label | `[Date] deadline` (Amber text) | `In Effect — Act Now` (Red text) |
| Sidebar countdown | `N days remaining` | *(removed)* |
| Exposure Summary close | `The [Date] deadline applies to all three.` | `This law is in effect. The AG can enforce now.` |
| Penalty section header | `What you're exposed to without these documents` | `What you're currently exposed to` |
| Meta `<title>` | `— [Date] Deadline` | `— In Effect Now` |
| AlsoExposedStrip | Visible (shows in-effect laws the buyer also owes) | Hidden or repurposed |

**Implementation:** All conditionals use the pattern `reg.status === "in-effect"`. This is the same pattern already used by the existing `StatusBadge` component. No new conditional logic is required beyond extending it to the additional elements in this table.

---

## Section Order

1. Hero (deadline banner, H1, deck, citation, price, CTA, key stats bar)
2. Sidebar purchase card (sticky, right column on desktop)
3. Exposure Summary ("You're a deployer if all three are true")
4. Penalty Section (moved before document list)
5. Document List ("8 Documents SB 24-205 Requires of Deployers")
6. AlsoExposedStrip (cross-state buyer signal — Deadline Approaching pages only)
7. Document Preview
8. Post-Purchase walkthrough
9. Add-ons
10. Statutory Authority

---

## Section 3: Exposure Summary

**Header:**
```
You're a deployer if all three are true
```
(Declarative, not a question. The buyer came here because they think it applies. Confirm it.)

**Three bullets:**
```
✓ You use a high-risk AI system
   Any AI that substantially influences a consequential decision — hiring, housing, credit, healthcare, insurance, education, or legal services. If it screens, scores, ranks, or evaluates people in those contexts, it qualifies.

✓ The system affects Colorado residents
   Residency of the consumer determines applicability — not your business location. A company headquartered in Chicago with Colorado applicants is a deployer under this law.

✓ You're the one deploying it
   The compliance obligation falls on the business using the AI, not the vendor who built it. Your vendor's compliance program does not substitute for yours.
```

**After bullets — the closing fact:**
```
No small-business exemption for most deployers. No revenue minimum. The Attorney General can bring enforcement actions before rulemaking is complete.
```

**Recognition sentence (Colorado — from C3, attributed):**
```
If you also built or substantially modified the AI tool you're deploying, the statute assigns you separate developer obligations on top of these — including disclosure requirements to your own deployers. These 8 documents cover the deployer side. (C.R.S. § 6-1-1702)
```

This is the sentence that demonstrates the site read the statute. The deployer/developer distinction is real, statutory, and most buyers on this page don't know to ask about it. One sentence. Statute cited. No explanation. The buyer who needs it stops. The buyer who doesn't scrolls past.

**Already Exposed variant of the closing fact:**
```
This law is in effect. The AG can bring enforcement actions now. Documentation is your affirmative defense — without it, you have no response to a complaint.
```

---

## Section 4: Penalty Section (Moved Before Document List)

**Header:**
**Deadline Approaching:** `What you're exposed to without these documents`
**Already Exposed:** `What you're currently exposed to`

**Body:**
```
Colorado SB 24-205 violations are enforced as deceptive trade practices under the Colorado Consumer Protection Act. The Attorney General has exclusive enforcement authority.

Civil penalties: up to $20,000 per violation. For consumers age 60 or older, up to $50,000 per violation.

Each affected consumer is a potential separate violation. Fifty employees processed through a non-compliant AI system = up to $1,000,000 in exposure.

No small-business exemption for deployers. No private right of action — AG-only enforcement.

Source: [Colorado SB 24-205 — leg.colorado.gov](https://leg.colorado.gov/bills/sb24-205)
```

**Integrity note:** $20,000 figure derives from Colorado Consumer Protection Act enforcement mechanism (C.R.S. § 6-1-112), not from SB24-205 directly. Developer must verify current CCPA penalty ceiling before publishing this figure. Flagged consistently throughout this submission.

---

## Section 5: Document List

**Header:**
```
8 Documents SB 24-205 Requires of Deployers
```
("Requires" not "Includes." Reframes the list from feature catalog to statutory obligation.)

**Urgency insert before the list:**
```
Without these, each affected consumer is a potential separate violation at up to $20,000. (C.R.S. § 6-1-1702)
```
One sentence. The per-consumer math is the conversion-relevant fact.

Keep existing DOC_EXPLANATIONS content per document. Add one line per document:
```
Required by: C.R.S. § [specific section]
```
This converts each document from "here's what it does" to "here's why you can't skip it."

---

## Section 6: AlsoExposedStrip (Deadline Approaching mode only)

**Component: `AlsoExposedStrip`**
**Appears on:** Deadline Approaching product pages only (`reg.status === "effective-soon"`)
**Position:** After the penalty section, before the document preview

Horizontally scrollable strip. Enforcement Red left border accent. Header:
```
Also Required If You Operate in These States
These laws are already in effect — no deadline to wait for.
```

Three compact cards per strip, filtered from `CROSS_STATE_EXPOSURE` mapping by `status === "in-effect"`:

```typescript
const CROSS_STATE_EXPOSURE: Record<string, string[]> = {
  "colorado-sb24-205": ["illinois-hb3773", "nyc-local-law-144", "texas-traiga"],
  "illinois-hb3773": ["nyc-local-law-144", "colorado-sb24-205"],
  "nyc-local-law-144": ["illinois-hb3773", "colorado-sb24-205"],
  "california-ccpa-admt": ["texas-tdpsa", "virginia-cdpa", "connecticut-ctdpa"],
};
```

Each card: law name, `IN EFFECT` badge (red), one-line applicability note, max penalty, `[Get Documents]` link.

**Why this earns its place:** The buyer who arrived via SERP on the Colorado page may have Illinois employees and not know they're already exposed. This strip surfaces that without requiring them to navigate away and return. It is not cross-selling — it is cross-alerting. The message is "you may already be in violation of these other laws." This signal belongs in the evaluation phase (after penalties, before documents), not in the post-decision phase (after add-ons).

**After July 1, 2026:** Component becomes dormant if no Deadline Approaching laws remain in the catalog (no `effective-soon` slugs to display the strip on). The data mapping stays; the component simply finds no pages to render on.

---

## Recognition Sentences — All Four High-Traffic Pages

These are ready to paste. Each requires the `.gov` citation noted:

**Colorado SB 24-205** (C.R.S. § 6-1-1702):
> "If you also built or substantially modified the AI tool you're deploying, the statute assigns you separate developer obligations on top of these — including disclosure requirements to your own deployers. These 8 documents cover the deployer side."

**Illinois HB3773** (775 ILCS 5/2-102(L)):
> "If you use zip codes as a proxy for location in any AI employment decision, that's explicitly prohibited by name in the statute — not inferred from anti-discrimination principles."

**NYC Local Law 144** (NYC Admin. Code § 20-871):
> "The bias audit must be conducted by an independent auditor — your HR team cannot conduct it internally. These documents are the pre-audit infrastructure, not the audit itself."

**Texas TRAIGA** (HB 149, TRAIGA § 552.053) [REQUIRES PRIMARY SOURCE VERIFICATION before publish]:
> "If your AI tool makes a consequential decision about a Texas consumer without meaningful human oversight, the 60-day cure period begins only after the AG sends notice — not after you discover the violation."

**The editorial rule for future pages:** Recognition sentences must be (1) statute-sourced with a specific section citation, (2) surfacing something the buyer didn't know to ask — not a restatement of the applicability checklist, (3) one sentence in the marketing voice with no following explanation, (4) verified against .gov primary source before publishing.

---

## Sidebar Purchase Card

**Deadline Approaching (Colorado):**
```
[LABEL — Inter 600, 12px caps, Deadline Amber]
JUNE 30, 2026 DEADLINE

[PRICE — Inter 700, 40px]
$449

[SUB — Inter 400, 14px, gray]
One-time. Instant download.

[COUNTDOWN — Deadline Amber, 14px]
N days remaining

[CHECKLIST — 14px]
✓ 8 documents, customized to your business
✓ Built from C.R.S. § 6-1-1702
✓ Instant digital download
✓ Secure checkout via Stripe

[PRIMARY BUTTON — Signal Blue, full width]
Get Your Colorado Documents — $449

[VS LINE — 12px gray]
vs. $400–$800/hour at a law firm

[VERIFIED BADGE — Verified Green background]
✓ Verified against enacted statute text
Source: C.R.S. § 6-1-1702 →

[CONTACT]
Questions? info@aicompliancedocuments.com
```

**Already Exposed (post-flip):**
- Label changes from `JUNE 30, 2026 DEADLINE` (Amber) → `IN EFFECT — ACT NOW` (Red)
- Countdown `N days remaining` removed
- Button text unchanged

**Countdown implementation note:** `Math.ceil((new Date('2026-06-30') - new Date()) / 86400000)` in the sidebar component. After June 30: countdown line removed entirely. The countdown is not shown on Already Exposed pages.
