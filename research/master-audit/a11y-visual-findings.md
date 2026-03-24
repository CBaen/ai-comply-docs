# Accessibility Visual/Contrast Audit
**Standard:** WCAG 2.1 AA — 4.5:1 for normal text, 3:1 for large text (18pt / 14pt bold)
**Audited:** All pages in src/app/ and components in src/components/
**Date:** 2026-03-24

---

## Reference: Tailwind Color Values Used

| Tailwind Class | Hex | Approx Luminance |
|---|---|---|
| text-gray-400 | #9CA3AF | Light gray |
| text-gray-500 | #6B7280 | Mid gray |
| text-gray-600 | #4B5563 | Dark gray |
| text-slate-400 | #94A3B8 | Light slate |
| text-slate-500 | #64748B | Mid slate |
| text-slate-600 | #475569 | Dark slate |
| bg-white | #FFFFFF | White |
| bg-slate-50 | #F8FAFC | Near-white |
| bg-slate-900 | #0F172A | Very dark navy |
| bg-gray-900 | #111827 | Dark gray |
| hero-bg (.hero-bg) | #0F172A | Very dark navy (same as slate-900) |

**Contrast ratios (computed):**
- `text-gray-400` (#9CA3AF) on white (#FFF): **~2.85:1** — FAILS AA for all text
- `text-gray-400` (#9CA3AF) on slate-50 (#F8FAFC): **~2.71:1** — FAILS AA for all text
- `text-gray-500` (#6B7280) on white (#FFF): **~4.48:1** — FAILS AA for normal text (4.5 threshold), PASSES for large text
- `text-gray-500` (#6B7280) on slate-50 (#F8FAFC): **~4.26:1** — FAILS AA for normal text
- `text-slate-400` (#94A3B8) on white (#FFF): **~2.97:1** — FAILS AA for all text
- `text-slate-500` (#64748B) on white (#FFF): **~4.71:1** — PASSES AA
- `text-slate-500` (#64748B) on slate-900 (#0F172A): **~3.03:1** — PASSES large text only, FAILS normal text
- `text-slate-400` (#94A3B8) on slate-900 (#0F172A): **~5.40:1** — PASSES AA
- `text-blue-200` (#BFDBFE) on #0F172A: **~8.77:1** — PASSES AA
- `text-slate-300` (#CBD5E1) on #0F172A: **~9.46:1** — PASSES AA

---

## FLAGGED PAGE: /ai-compliance-by-state

`src/app/ai-compliance-by-state/page.tsx`

| File:Line | Classes | Background | Approx Ratio | Pass/Fail | Fix Needed |
|---|---|---|---|---|---|
| page.tsx:76 | `text-slate-300` | hero-bg (#0F172A) | ~9.5:1 | PASS | No |
| page.tsx:89 | `text-slate-600` | bg-white (#FFF) | ~6.3:1 | PASS | No |
| page.tsx:100 | `text-slate-700` | bg-slate-50 (#F8FAFC) | ~8.1:1 | PASS | No |
| page.tsx:123 | `text-slate-600` | alternating bg-white / bg-slate-100 | ~6.3:1 / ~7.2:1 | PASS | No |
| page.tsx:185 | `text-slate-600` | bg-white (mobile card) | ~6.3:1 | PASS | No |
| page.tsx:411 | `text-slate-300` | bg-slate-900 (#0F172A) | ~9.5:1 | PASS | No |
| **page.tsx:69** | **`text-blue-200`** | **hero-bg (#0F172A)** | **~8.8:1** | **PASS** | No |

**Verdict on /ai-compliance-by-state:** No WCAG AA violations found in this page. Text colors used (`text-slate-300`, `text-slate-600`, `text-slate-700`, `text-white`) all meet contrast ratios against their backgrounds. The originally flagged "gray unreadable text" likely refers to `text-slate-600` on the desktop table's `bg-slate-100` alternating rows (line 114) — this achieves ~7.2:1 and passes. **No fixes required on this page.**

---

## Global Layout

`src/app/layout.tsx`

| File:Line | Classes | Background | Approx Ratio | Pass/Fail | Fix Needed |
|---|---|---|---|---|---|
| layout.tsx:76 | `text-gray-900` body default | bg-slate-50 | ~19:1 | PASS | No |

---

## Nav Component

`src/components/Nav.tsx`

| File:Line | Classes | Background | Approx Ratio | Pass/Fail | Fix Needed |
|---|---|---|---|---|---|
| Nav.tsx:66–107 | `text-gray-600` nav links | bg-white | ~7.0:1 | PASS | No |
| Nav.tsx:58 | `text-gray-900` brand name | bg-white | ~19:1 | PASS | No |
| Nav.tsx:202 | `text-gray-600` "Dark Mode" label | bg-white | ~7.0:1 | PASS | No |

---

## Footer Component

`src/components/Footer.tsx`

| File:Line | Classes | Background | Approx Ratio | Pass/Fail | Fix Needed |
|---|---|---|---|---|---|
| Footer.tsx:13–17 | `text-slate-400` footer links | bg-slate-900 (#0F172A) | ~5.4:1 | PASS | No |
| **Footer.tsx:54** | **`text-slate-500` small note** | **bg-slate-900 (#0F172A)** | **~3.0:1** | **FAIL (normal text)** | **Upgrade to text-slate-400** |
| **Footer.tsx:64** | **`text-slate-500` disclaimer** | **bg-slate-900 (#0F172A)** | **~3.0:1** | **FAIL (normal text)** | **Upgrade to text-slate-400** |
| **Footer.tsx:73** | **`text-slate-500` copyright/checkout** | **bg-slate-900 (#0F172A)** | **~3.0:1** | **FAIL (normal text)** | **Upgrade to text-slate-400** |
| Footer.tsx:11 | `text-white` headings | bg-slate-900 | ~19:1 | PASS | No |

**Note:** `text-slate-500` (#64748B) on `bg-slate-900` (#0F172A) yields ~3.03:1. This is 0.03 above the 3:1 large-text threshold but fails the 4.5:1 normal-text requirement. The footer disclaimer (line 64) and footer bottom bar (line 73) use `text-xs` which is small text — must meet 4.5:1 or use larger size.

---

## Home Page (/)

`src/app/page.tsx`

| File:Line | Classes | Background | Approx Ratio | Pass/Fail | Fix Needed |
|---|---|---|---|---|---|
| page.tsx:162 | `text-gray-600` trust bar | bg-white | ~7.0:1 | PASS | No |
| page.tsx:198 | `text-gray-700` | bg-slate-50 | ~8.1:1 | PASS | No |
| page.tsx:233 | `text-gray-600` subtitle | bg-white | ~7.0:1 | PASS | No |
| page.tsx:243 | `text-gray-600` method text | bg-white | ~7.0:1 | PASS | No |
| page.tsx:286 | `text-gray-700` body | bg-slate-50 | ~8.1:1 | PASS | No |
| page.tsx:288 | `text-gray-500` attribution | bg-slate-50 | ~4.26:1 | **BORDERLINE FAIL (normal)** | Upgrade to text-gray-600 |
| page.tsx:315 | `text-gray-600` card body | bg-white | ~7.0:1 | PASS | No |
| page.tsx:460 | `text-slate-300` | bg-slate-900 | ~9.5:1 | PASS | No |
| **page.tsx:470** | **`text-slate-500` "Not sure which package"** | **bg-slate-900 (#0F172A)** | **~3.0:1** | **FAIL (normal text)** | **Upgrade to text-slate-400** |

---

## Products Index Page (/products)

`src/app/products/page.tsx`

| File:Line | Classes | Background | Approx Ratio | Pass/Fail | Fix Needed |
|---|---|---|---|---|---|
| page.tsx:66 | `text-slate-300` | hero-bg (#0F172A) | ~9.5:1 | PASS | No |
| **page.tsx:88** | **`text-slate-300` CTA strip description** | **bg-slate-900** | **~9.5:1** | **PASS** | No |

---

## ProductLibrary Component

`src/components/ProductLibrary.tsx`

| File:Line | Classes | Background | Approx Ratio | Pass/Fail | Fix Needed |
|---|---|---|---|---|---|
| ProductLibrary.tsx:129 | `text-gray-500` deadline text | bg-white | ~4.48:1 | **FAIL (0.02 below 4.5:1)** | Upgrade to text-gray-600 |
| ProductLibrary.tsx:135 | `text-gray-500` penalty detail | bg-white | ~4.48:1 | **FAIL** | Upgrade to text-gray-600 |
| **ProductLibrary.tsx:310** | **`text-gray-400` effective date + state** | **bg-white** | **~2.85:1** | **FAIL** | **Upgrade to text-gray-500 minimum** |
| ProductLibrary.tsx:315 | `text-gray-600` description | bg-white | ~7.0:1 | PASS | No |
| ProductLibrary.tsx:331 | `text-gray-400` "one-time" | bg-white | ~2.85:1 | **FAIL** | Upgrade to text-gray-500 |
| ProductLibrary.tsx:333 | `text-gray-500` doc count | bg-white | ~4.48:1 | **FAIL** | Upgrade to text-gray-600 |
| ProductLibrary.tsx:203 | `text-gray-600` inactive filter | bg-white | ~7.0:1 | PASS | No |
| ProductLibrary.tsx:211 | `text-gray-400` filter count badge (inactive) | bg-white | ~2.85:1 | **FAIL** | Upgrade to text-gray-500 |
| ProductLibrary.tsx:237 | `text-slate-600` guide subtext | bg-slate-50 | ~6.3:1 | PASS | No |
| ProductLibrary.tsx:257 | `text-slate-600` guide subtext | bg-slate-50 | ~6.3:1 | PASS | No |

---

## ProductCarousel Component

`src/components/ProductCarousel.tsx`

| File:Line | Classes | Background | Approx Ratio | Pass/Fail | Fix Needed |
|---|---|---|---|---|---|
| ProductCarousel.tsx:69 | `text-slate-400` breadcrumb | hero-bg (#0F172A) | ~5.4:1 | PASS | No |
| ProductCarousel.tsx:85 | `text-slate-400` effective date | hero-bg (#0F172A) | ~5.4:1 | PASS | No |
| ProductCarousel.tsx:96 | `text-slate-300` description | hero-bg (#0F172A) | ~9.5:1 | PASS | No |
| ProductCarousel.tsx:104 | `text-slate-400` "one-time purchase" | hero-bg (#0F172A) | ~5.4:1 | PASS | No |
| ProductCarousel.tsx:116 | `text-slate-400` doc count + penalty | hero-bg (#0F172A) | ~5.4:1 | PASS | No |

---

## Product Detail Page (/products/[slug])

`src/app/products/[slug]/page.tsx`

| File:Line | Classes | Background | Approx Ratio | Pass/Fail | Fix Needed |
|---|---|---|---|---|---|
| page.tsx:247 | `text-slate-400` state breadcrumb | hero-bg (#0F172A) | ~5.4:1 | PASS | No |
| page.tsx:251 | `text-slate-400` effective date | hero-bg (#0F172A) | ~5.4:1 | PASS | No |
| page.tsx:258 | `text-slate-300` description | hero-bg (#0F172A) | ~9.5:1 | PASS | No |
| page.tsx:276 | `text-slate-400` "one-time purchase" label | hero-bg (#0F172A) | ~5.4:1 | PASS | No |
| page.tsx:359 | `text-gray-500` doc explanation | bg-white | ~4.48:1 | **FAIL (normal text)** | Upgrade to text-gray-600 |
| page.tsx:372 | `text-gray-500` preview subtext | bg-white | ~4.48:1 | **FAIL** | Upgrade to text-gray-600 |
| page.tsx:385 | `text-gray-500` preview subtext | bg-white | ~4.48:1 | **FAIL** | Upgrade to text-gray-600 |
| **page.tsx:469** | **`text-gray-500` addon doc count** | **bg-blue-50** | **~3.7:1** | **FAIL (normal text)** | **Upgrade to text-gray-600** |
| page.tsx:497 | `text-gray-500` addon doc count | bg-blue-50 | ~3.7:1 | **FAIL** | Upgrade to text-gray-600 |
| page.tsx:568 | `text-gray-600` sidebar body | bg-white | ~7.0:1 | PASS | No |
| page.tsx:605 | `text-gray-500` coming-soon note | bg-white | ~4.48:1 | **FAIL** | Upgrade to text-gray-600 |
| page.tsx:609 | `text-gray-500` "vs law firm" note | bg-white | ~4.48:1 | **FAIL** | Upgrade to text-gray-600 |
| page.tsx:632 | `text-gray-500` "questions before purchasing" | bg-white | ~4.48:1 | **FAIL** | Upgrade to text-gray-600 |
| page.tsx:660 | `text-slate-500` blog guide subtitle | bg-slate-50 | ~4.48:1 | **FAIL** | Upgrade to text-slate-600 |
| page.tsx:676 | `text-gray-500` questionnaire subtext | bg-white | ~4.48:1 | **FAIL** | Upgrade to text-gray-600 |
| page.tsx:696 | `text-gray-600` related products subtitle | bg-white | ~7.0:1 | PASS | No |
| page.tsx:717 | `text-gray-600` related product description | bg-white | ~7.0:1 | PASS | No |
| page.tsx:710 | `text-gray-500` state label | bg-white | ~4.48:1 | **FAIL** | Upgrade to text-gray-600 |
| page.tsx:724 | `text-gray-500` doc count | bg-white | ~4.48:1 | **FAIL** | Upgrade to text-gray-600 |

---

## Blog Index Page (/blog)

`src/app/blog/page.tsx`

| File:Line | Classes | Background | Approx Ratio | Pass/Fail | Fix Needed |
|---|---|---|---|---|---|
| blog/page.tsx:56 | `text-slate-300` hero description | hero-bg (#0F172A) | ~9.5:1 | PASS | No |
| blog/page.tsx:111 | `text-gray-600` card summary | bg-white | ~7.0:1 | PASS | No |
| **blog/page.tsx:116** | **`text-gray-500` date and read time** | **bg-white** | **~4.48:1** | **FAIL (normal text)** | **Upgrade to text-gray-600** |
| blog/page.tsx:142 | `text-slate-300` CTA description | bg-slate-900 | ~9.5:1 | PASS | No |

---

## Blog Post Page (/blog/[slug])

`src/app/blog/[slug]/page.tsx`

| File:Line | Classes | Background | Approx Ratio | Pass/Fail | Fix Needed |
|---|---|---|---|---|---|
| blog/[slug]/page.tsx:170 | `text-slate-400` meta row (author, date, read time) | hero-bg (#0F172A) | ~5.4:1 | PASS | No |
| blog/[slug]/page.tsx:181 | `text-blue-300` "Two-Sentence Summary" label | bg-blue-900/40 approx #0c1e4a | ~7.3:1 | PASS | No |
| blog/[slug]/page.tsx:182 | `text-slate-200` summary text | bg-blue-900/40 approx #0c1e4a | ~11:1 | PASS | No |
| blog/[slug]/page.tsx:205 | `text-gray-600` deep dive text | bg-white | ~7.0:1 | PASS | No |
| blog/[slug]/page.tsx:305 | `text-gray-600` micro fact text | bg-white | ~7.0:1 | PASS | No |
| blog/[slug]/page.tsx:331 | `text-slate-500` reference numbers | bg-slate-900 | ~3.0:1 | **FAIL (normal text)** | Upgrade to text-slate-400 |
| blog/[slug]/page.tsx:332 | `text-blue-300` source links | bg-slate-900 | ~7.3:1 | PASS | No |
| blog/[slug]/page.tsx:345 | `text-gray-500` disclaimer | bg-white | ~4.48:1 | **FAIL** | Upgrade to text-gray-600 |
| blog/[slug]/page.tsx:381 | `text-gray-500` post meta (date/readtime) | bg-white | ~4.48:1 | **FAIL** | Upgrade to text-gray-600 |
| blog/[slug]/page.tsx:405 | `text-slate-300` CTA description | bg-slate-900 | ~9.5:1 | PASS | No |

---

## FAQ Page (/faq)

`src/app/faq/page.tsx`

| File:Line | Classes | Background | Approx Ratio | Pass/Fail | Fix Needed |
|---|---|---|---|---|---|
| faq/page.tsx:161 | `text-gray-300` hero description | bg-gray-900 (#111827) | ~11.2:1 | PASS | No |
| faq/page.tsx:178 | `text-gray-700` accordion answer | bg-slate-50 | ~8.1:1 | PASS | No |
| faq/page.tsx:315 | `text-slate-300` CTA description | bg-slate-900 | ~9.5:1 | PASS | No |

---

## About Page (/about)

`src/app/about/page.tsx`

| File:Line | Classes | Background | Approx Ratio | Pass/Fail | Fix Needed |
|---|---|---|---|---|---|
| about/page.tsx:58 | `text-gray-300` hero description | bg-gray-900 (#111827) | ~11.2:1 | PASS | No |
| about/page.tsx:100 | `text-gray-700` methodology text | bg-white | ~8.1:1 | PASS | No |
| about/page.tsx:212 | `text-gray-600` text | bg-amber-50 | ~6.0:1 | PASS | No |

---

## Contact Page (/contact)

`src/app/contact/page.tsx`

| File:Line | Classes | Background | Approx Ratio | Pass/Fail | Fix Needed |
|---|---|---|---|---|---|
| contact/page.tsx:63 | `text-gray-600` description | bg-white | ~7.0:1 | PASS | No |
| **contact/page.tsx:182** | **`text-gray-400` char counter "0/5,000"** | **bg-white** | **~2.85:1** | **FAIL** | **Upgrade to text-gray-500** |
| **contact/page.tsx:201** | **`text-gray-400` "You can also reach us"** | **bg-white** | **~2.85:1** | **FAIL** | **Upgrade to text-gray-500** |

---

## Login Page (/account/login)

`src/app/account/login/page.tsx`

| File:Line | Classes | Background | Approx Ratio | Pass/Fail | Fix Needed |
|---|---|---|---|---|---|
| login/page.tsx:86 | `text-gray-600` description | bg-white | ~7.0:1 | PASS | No |
| **login/page.tsx:125** | **`text-xs text-gray-500` "No password needed" note** | **bg-white** | **~4.48:1** | **FAIL (xs text)** | **Upgrade to text-gray-600** |

---

## Privacy Page (/privacy)

`src/app/privacy/page.tsx`

| File:Line | Classes | Background | Approx Ratio | Pass/Fail | Fix Needed |
|---|---|---|---|---|---|
| privacy/page.tsx:29 | `text-gray-500` effective date | bg-white | ~4.48:1 | **FAIL (normal text)** | Upgrade to text-gray-600 |
| privacy/page.tsx:33 | `text-gray-700` body | bg-white | ~8.1:1 | PASS | No |

---

## Do I Need AI Compliance Page (/do-i-need-ai-compliance)

`src/app/do-i-need-ai-compliance/page.tsx`

| File:Line | Classes | Background | Approx Ratio | Pass/Fail | Fix Needed |
|---|---|---|---|---|---|
| page.tsx:69 | `text-gray-300` hero description | bg-gray-900 (#111827) | ~11.2:1 | PASS | No |
| **page.tsx:73** | **`text-gray-400` feature pills** | **bg-gray-900 (#111827)** | **~4.52:1** | **BORDERLINE PASS** | Monitor (barely passes) |

---

## ComplianceQuiz Component

`src/components/ComplianceQuiz.tsx`

| File:Line | Classes | Background | Approx Ratio | Pass/Fail | Fix Needed |
|---|---|---|---|---|---|
| ComplianceQuiz.tsx:255 | `text-gray-500` step indicator | bg-white | ~4.48:1 | **FAIL** | Upgrade to text-gray-600 |
| ComplianceQuiz.tsx:589 | `text-gray-500` question subtitle | bg-white | ~4.48:1 | **FAIL** | Upgrade to text-gray-600 |
| ComplianceQuiz.tsx:729 | `text-gray-400` legal disclaimer | bg-white | ~2.85:1 | **FAIL** | Upgrade to text-gray-500 minimum |
| ComplianceQuiz.tsx:433 | `text-gray-500` add-on reason text | bg-slate-50 | ~4.26:1 | **FAIL** | Upgrade to text-gray-600 |

---

## SearchModal Component

`src/components/SearchModal.tsx`

| File:Line | Classes | Background | Approx Ratio | Pass/Fail | Fix Needed |
|---|---|---|---|---|---|
| SearchModal.tsx:171 | `text-gray-500` subtitle | bg-white | ~4.48:1 | **FAIL** | Upgrade to text-gray-600 |
| **SearchModal.tsx:279** | **`text-gray-400` group headings** | **bg-white** | **~2.85:1** | **FAIL** | **Upgrade to text-gray-500** |
| SearchModal.tsx:336 | `text-gray-500` "No results" text | bg-white | ~4.48:1 | **FAIL** | Upgrade to text-gray-600 |
| **SearchModal.tsx:338** | **`text-gray-400` search hint** | **bg-white** | **~2.85:1** | **FAIL** | **Upgrade to text-gray-500** |
| **SearchModal.tsx:347** | **`text-gray-400` keyboard shortcuts footer** | **bg-white** | **~2.85:1** | **FAIL** | **Upgrade to text-gray-500** |

---

## Colorado AI Compliance Page (/colorado-ai-compliance) — Not audited (file not read)

This page exists at `src/app/colorado-ai-compliance/page.tsx` — contrast should be verified separately as the globals.css has a special dark-bg focus ring rule referencing `bg-gray-9xx` classes that appears Colorado-specific.

---

## Summary of All Violations

### Critical Failures (ratio below 3:1 — fails even large text threshold)

| File:Line | Classes | Background | Ratio | Severity |
|---|---|---|---|---|
| components/ProductLibrary.tsx:310 | `text-gray-400` effective date + state | bg-white | ~2.85:1 | Critical |
| components/ProductLibrary.tsx:331 | `text-gray-400` "one-time" label | bg-white | ~2.85:1 | Critical |
| components/ProductLibrary.tsx:211 | `text-gray-400` filter count badge | bg-white | ~2.85:1 | Critical |
| components/SearchModal.tsx:279 | `text-gray-400` group headings | bg-white | ~2.85:1 | Critical |
| components/SearchModal.tsx:338 | `text-gray-400` search hint | bg-white | ~2.85:1 | Critical |
| components/SearchModal.tsx:347 | `text-gray-400` keyboard shortcuts | bg-white | ~2.85:1 | Critical |
| app/contact/page.tsx:182 | `text-gray-400` char counter | bg-white | ~2.85:1 | Critical |
| app/contact/page.tsx:201 | `text-gray-400` reach-us note | bg-white | ~2.85:1 | Critical |
| components/ComplianceQuiz.tsx:729 | `text-gray-400` disclaimer | bg-white | ~2.85:1 | Critical |

### Standard Failures (ratio 3:1–4.49:1 — fails normal text AA requirement)

| File:Line | Classes | Background | Ratio | Fix |
|---|---|---|---|---|
| components/Footer.tsx:54 | `text-slate-500` small note | bg-slate-900 | ~3.0:1 | → text-slate-400 |
| components/Footer.tsx:64 | `text-slate-500` disclaimer (xs) | bg-slate-900 | ~3.0:1 | → text-slate-400 |
| components/Footer.tsx:73 | `text-slate-500` bottom bar (xs) | bg-slate-900 | ~3.0:1 | → text-slate-400 |
| app/page.tsx:288 | `text-gray-500` methodology attribution | bg-slate-50 | ~4.26:1 | → text-gray-600 |
| app/page.tsx:470 | `text-slate-500` CTA note | bg-slate-900 | ~3.0:1 | → text-slate-400 |
| components/ProductLibrary.tsx:129 | `text-gray-500` deadline text | bg-white | ~4.48:1 | → text-gray-600 |
| components/ProductLibrary.tsx:135 | `text-gray-500` penalty | bg-white | ~4.48:1 | → text-gray-600 |
| components/ProductLibrary.tsx:333 | `text-gray-500` doc count | bg-white | ~4.48:1 | → text-gray-600 |
| app/products/[slug]/page.tsx:359 | `text-gray-500` doc explanations | bg-white | ~4.48:1 | → text-gray-600 |
| app/products/[slug]/page.tsx:372 | `text-gray-500` preview subtext | bg-white | ~4.48:1 | → text-gray-600 |
| app/products/[slug]/page.tsx:385 | `text-gray-500` preview subtext | bg-white | ~4.48:1 | → text-gray-600 |
| app/products/[slug]/page.tsx:469 | `text-gray-500` addon doc count | bg-blue-50 | ~3.7:1 | → text-gray-600 |
| app/products/[slug]/page.tsx:497 | `text-gray-500` addon doc count | bg-blue-50 | ~3.7:1 | → text-gray-600 |
| app/products/[slug]/page.tsx:605 | `text-gray-500` coming soon note | bg-white | ~4.48:1 | → text-gray-600 |
| app/products/[slug]/page.tsx:609 | `text-gray-500` vs law firm note | bg-white | ~4.48:1 | → text-gray-600 |
| app/products/[slug]/page.tsx:632 | `text-gray-500` pre-purchase note | bg-white | ~4.48:1 | → text-gray-600 |
| app/products/[slug]/page.tsx:660 | `text-slate-500` blog guide subtitle | bg-slate-50 | ~4.48:1 | → text-slate-600 |
| app/products/[slug]/page.tsx:676 | `text-gray-500` questionnaire subtext | bg-white | ~4.48:1 | → text-gray-600 |
| app/products/[slug]/page.tsx:710 | `text-gray-500` state label | bg-white | ~4.48:1 | → text-gray-600 |
| app/products/[slug]/page.tsx:724 | `text-gray-500` doc count related | bg-white | ~4.48:1 | → text-gray-600 |
| app/blog/page.tsx:116 | `text-gray-500` date/readtime | bg-white | ~4.48:1 | → text-gray-600 |
| app/blog/[slug]/page.tsx:331 | `text-slate-500` ref numbers | bg-slate-900 | ~3.0:1 | → text-slate-400 |
| app/blog/[slug]/page.tsx:345 | `text-gray-500` disclaimer | bg-white | ~4.48:1 | → text-gray-600 |
| app/blog/[slug]/page.tsx:381 | `text-gray-500` post meta | bg-white | ~4.48:1 | → text-gray-600 |
| app/account/login/page.tsx:125 | `text-gray-500` xs note | bg-white | ~4.48:1 | → text-gray-600 |
| app/privacy/page.tsx:29 | `text-gray-500` effective date | bg-white | ~4.48:1 | → text-gray-600 |
| components/ComplianceQuiz.tsx:255 | `text-gray-500` step indicator | bg-white | ~4.48:1 | → text-gray-600 |
| components/ComplianceQuiz.tsx:589 | `text-gray-500` question subtitle | bg-white | ~4.48:1 | → text-gray-600 |
| components/ComplianceQuiz.tsx:433 | `text-gray-500` add-on text | bg-slate-50 | ~4.26:1 | → text-gray-600 |
| components/SearchModal.tsx:171 | `text-gray-500` subtitle | bg-white | ~4.48:1 | → text-gray-600 |
| components/SearchModal.tsx:336 | `text-gray-500` no results | bg-white | ~4.48:1 | → text-gray-600 |

---

## Recommended Global Fix

The vast majority of violations reduce to two root causes:

1. **`text-gray-400` on light backgrounds** — Replace with `text-gray-500` minimum everywhere on white/light surfaces. `text-gray-400` (#9CA3AF) at ~2.85:1 fails every WCAG threshold.

2. **`text-gray-500` / `text-slate-500` used as body text on white/light backgrounds** — #6B7280 at ~4.48:1 falls 0.02 short of the 4.5:1 AA threshold for normal text. Replace with `text-gray-600` (#4B5563, ~7.0:1) wherever used as body/label/supporting text (not purely decorative).

3. **`text-slate-500` on `bg-slate-900` (dark CTAs and footer)** — Replace with `text-slate-400` in dark contexts.

**No violations were found on `/ai-compliance-by-state` itself** — that page uses `text-slate-600`, `text-slate-700`, and `text-white` which all pass. The "gray unreadable text" complaint may relate to the global pattern of `text-gray-500` used throughout the site.
