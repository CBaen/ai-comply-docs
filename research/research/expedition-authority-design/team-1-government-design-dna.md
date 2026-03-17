# Team 1: Government & Regulatory Design DNA
**Expedition:** AI Comply Docs Authority Redesign
**Research Angle:** Government & Regulatory Design DNA
**Researcher:** Claude (Sonnet 4.6)
**Date:** 2026-03-10
**Status:** Complete

---

## Executive Summary

Government compliance portals and premium legal research platforms share a consistent visual DNA that signals authority through restraint, not decoration. The key insight: **official platforms do not look "designed"** in the contemporary SaaS sense. They look like documents. This report extracts specific, implementable patterns from U.S. federal standards (USWDS), UK GOV.UK Design System, IRS.gov, healthcare.gov, FINRA BrokerCheck, and premium legal platforms (Bloomberg Terminal, Thomson Reuters).

The current AI Comply Docs design — sky-blue CTAs, rounded-2xl cards, gradient hero, pulse animations — reads as a startup template. Every element can be mapped to a specific anti-pattern identified below. The redesign path is clear.

---

## Section 1: Color Systems — Specific Values

### U.S. Web Design System (USWDS) — Federal Standard
Source: https://designsystem.digital.gov/design-tokens/color/theme-tokens/ (verified 2026-03-10)

The authoritative U.S. federal color system follows a **60/30/10 role-based proportion rule**:

| Role | Token | Hex | Purpose |
|------|-------|-----|---------|
| Primary (60%) | `primary` | `#005ea2` | Navy-leaning federal blue — dominant surface and action color |
| Primary dark | `primary-dark` | `#1a4480` | Hover states, header backgrounds |
| Primary darker | `primary-darker` | `#162e51` | Deepest navy — footer, maximum authority surfaces |
| Primary vivid | `primary-vivid` | `#0050d8` | Interactive elements requiring contrast |
| Body text | `ink` / `base-darkest` | `#1b1b1b` | Near-black, not pure black — softer authority |
| Secondary text | `base` | `#71767a` | Supporting text, captions |
| Light borders | `base-lighter` | `#dfe1e2` | Dividers, card borders, table rules |
| Page background | `base-lightest` | `#f0f0f0` | Off-white — not pure white |
| Error / urgency | `secondary` | `#d83933` | Official red for critical notices |
| Success | (system) | `#0f7a52` (GOV.UK) | Confirmation states |
| Focus indicator | (system) | `#ffdd00` (GOV.UK) | High-contrast accessibility focus ring |

**Critical observation:** The federal primary blue `#005ea2` is significantly **darker and less saturated** than the current site's sky-700 (`#0369a1`). The federal blue reads as institutional; sky-700 reads as tech startup. They are almost identical values but the intent is different — USWDS applies it as a restrained accent, not a dominant color.

### GOV.UK Design System — Gold Standard for Governmental Authority
Source: https://design-system.service.gov.uk/styles/colour/ (verified 2026-03-10)

| Role | Hex | Purpose |
|------|-----|---------|
| Primary text | `#0b0c0c` | Near-black, not pure black |
| Secondary text | `#484949` | Supporting information |
| Link color | `#1a65a6` | Accessible government blue |
| Link hover | `#0f385c` | Darkened link hover |
| Border | `#cecece` | Light, subtle borders |
| Input border | `#0b0c0c` | High-contrast form inputs |
| Template background | `#f4f8fb` | Slightly blue-tinted off-white |
| Body background | `#ffffff` | Pure white content areas |
| Brand blue | `#1d70b8` | GOV.UK signature blue |
| Error | `#ca3535` | Critical/error state |
| Success | `#0f7a52` | Confirmation state |

**Key GOV.UK insight:** The `.gov.uk` brand blue `#1d70b8` is used as a **functional accent**, not a brand expression. Backgrounds remain white or near-white. The authority comes from the text hierarchy and layout, not colored backgrounds.

### IRS.gov — Tax Authority Color Language
Source: WebFetch of irs.gov (verified 2026-03-10)

| Element | Value | Notes |
|---------|-------|-------|
| Body text | `#1B1B1B` | Matches USWDS `ink` — consistent federal standard |
| Links/accents | `#00599C` | Slightly less saturated than sky-700 |
| Teal accent | `#087591` | Used sparingly in alert banners |
| Alert background | `#e7f6f8` | Light teal wash for info boxes |
| Gold accent border | `#C7A97B` | Left-border accent bars — highly distinctive |
| Borders | `#DFE1E2` | Light gray — USWDS standard |

**IRS-specific pattern:** 4–8px **left accent bars** in gold/teal are used to distinguish callout boxes and important notices. This is a direct signal of "official notice" — not decorative, functional. The gold bar (`#C7A97B`) next to a dark text block on white reads as a government notice.

### Healthcare.gov — Service Portal Color Language
Source: WebFetch of healthcare.gov (verified 2026-03-10)

- Uses an **8px base spacing unit** throughout (8px, 16px, 24px, 32px, 48px, 64px)
- **Bitter** (serif) for headings
- **Open Sans** for body text
- Semantic color variables for states: error, warn, success, info
- Breakpoints: 544px, 768px, 1024px, 1280px

### Bloomberg Terminal — Premium Data Authority
Source: Bloomberg LP company blog, color-hex.com (verified 2026-03-10)

| Role | Hex | Notes |
|------|-----|-------|
| Background | `#000000` | Pure black — maximum data density |
| Warning / alert | `#ff433d` | Hot red for critical data |
| Primary accent | `#0068ff` | Electric blue on black |
| Data positive | `#4af6c3` | Cyan-green for gains |
| Data accent | `#fb8b1e` | Orange for secondary data |

**Bloomberg insight:** The Terminal uses a proprietary custom font commissioned from Matthew Carter (creator of Georgia, Verdana). It includes specialized **fraction glyphs** to 1/64th granularity — precision typography signals expertise. On a compliance site, the analog is: monospaced or tabular numbers in data displays, not proportional numerals.

---

## Section 2: Typography — Specific Specifications

### The U.S. Government Font Stack
Source: legalclarity.org official US government font standards, USWDS documentation (verified 2026-03-10)

**Federal digital standard: Public Sans**
- Developed by GSA specifically for U.S. federal websites (2019)
- Based on Libre Franklin
- Key differentiator from Inter: lowercase 'l' has a distinct tail to prevent confusion with '1' and 'I' — critical for legal document identification numbers
- License: SIL Open Font License v1.1 (free, open source)
- Deployed on ~94 federal agencies as of September 2023 (1.1 billion pageviews)
- Character: "strong, neutral" — deliberately NOT warm or friendly
- Available: https://public-sans.digital.gov/

**USWDS recommended pairing (legacy, still widely used):**
- **Merriweather** (serif) — headings and formal display
- **Source Sans Pro** (sans-serif) — body text and UI
- This pairing is explicitly used by SBA.gov, DHS.gov, and numerous .gov properties
- Source: USWDS v1 documentation, SBA brand guidelines (verified)

**Print/legal document standard (USWDS):**
- **Georgia** — "Cambria, Times New Roman, Times" fallback stack — for text-heavy content requiring print-like authority
- **Merriweather Web** — open-source serif for on-screen legal text

**U.S. Supreme Court standard (per Rule 33):**
- Century Expanded or Century Schoolbook
- Required size: 12-point for body, specific footnote rules
- This is the literal font of the highest legal authority in the country

**Legal document authority fonts (by research evidence):**
1. **Baskerville** — Research by Errol Morris showed readers judge statements in Baskerville as significantly more credible than in other typefaces. High contrast strokes signal "established authority."
2. **Libre Baskerville** — Free Google Fonts version, designed specifically for on-screen readability at 16px body. Taller x-height than original Baskerville, wider counters. Available: fonts.google.com/specimen/Libre+Baskerville
3. **Equity** — Designed specifically for legal professionals. Solves "dazzle" in extended legal documents. High x-heights for footnote clarity. Commercial font.
4. **Century Schoolbook** — The "gold standard" for official documentation. Frequently used in governmental contexts. Signals "The Record."
5. **Caslon** — Used on the U.S. Declaration of Independence. Signals foundational institutional legitimacy.

### GOV.UK Type Scale — Precise Values
Source: https://design-system.service.gov.uk/styles/type-scale/ (verified 2026-03-10)

**The GOV.UK type scale uses GDS Transport** (restricted to .gov.uk subdomains) with Helvetica/Arial as alternative.

**Large screens (640px+):**

| Usage | Class | Font Size | Line Height | Notes |
|-------|-------|-----------|-------------|-------|
| XL heading | `govuk-heading-xl` | 48px | 50px | 2px line-height increment only |
| L heading | `govuk-heading-l` | 36px | 40px | |
| M heading / body-l | `govuk-heading-m` / `govuk-body-l` | 24px | 30px | Body-large = heading-medium |
| S heading / body | `govuk-heading-s` / `govuk-body` | 19px | 25px | Default body is 19px, NOT 16px |
| Small body | `govuk-body-s` | 16px | 20px | Captions, footnotes |

**Critical GOV.UK typography rule:** "Every point on the type scale uses a line height in a multiple of 5px" — this creates a mechanical vertical rhythm that reads as systematic, not designed. The body text at 19px/25px is larger and more legible than typical SaaS sites (usually 16px).

**Small screens (<640px):**
- XL heading reduces to 32px/35px
- L heading to 27px/30px
- M heading and body-l to 21px/25px
- Body-s remains 16px/20px

### What These Fonts Signal vs. Current Site

| Current | Government/Legal Signal | Impact |
|---------|------------------------|--------|
| Space Grotesk (display) | Warm, geometric, startup-friendly | Friendly, not authoritative |
| Inter (body) | Tech-neutral, startup standard | 94 agencies use Public Sans instead |
| sky-blue accents | Approachable SaaS | Not used by any .gov property |

**Recommended pairing for AI Comply Docs:**
- **Merriweather** for H1/H2 display headings — free, USWDS recommended, directly signals "government document"
- **Source Sans Pro** or **Public Sans** for body and UI — free, explicitly federal standard, high readability
- This exact pairing is used by SBA.gov and explicitly endorsed by USWDS for "clear and professional" government feel

---

## Section 3: Layout Structures and Information Density

### The Government Grid — What It Actually Looks Like

**IRS.gov observations (verified 2026-03-10):**
- Left accent bars: 4–8px solid colored bars on the left edge of callout boxes
- Generous whitespace: 12px, 30px, 36px between elements
- Padding in content blocks: 8–36px range
- Card-based layouts with **flat borders**, not shadows
- Content max-width: approximately 1200px desktop, single-column mobile
- Navigation bar: horizontal, white background, `border-bottom: 1px solid #DFE1E2`

**Healthcare.gov observations (verified 2026-03-10):**
- 8px base spacing unit system: all spacing multiples of 8 (8, 16, 24, 32, 48, 64px)
- Bitter serif for headings with Open Sans body — visible hierarchy difference
- Accessible form design: high-contrast borders on inputs, explicit label positioning
- Breakpoints at clean values: 544, 768, 1024, 1280px

**GOV.UK spacing scale (verified 2026-03-10):**

| Scale Unit | Desktop Value | Mobile Value |
|-----------|---------------|--------------|
| 1 | 5px | 5px |
| 2 | 10px | 10px |
| 3 | 15px | 15px |
| 4 | 20px | 15px (responsive) |
| 5 | 25px | 15px (responsive) |
| 6 | 30px | 20px (responsive) |
| 7 | 40px | 25px (responsive) |
| 8 | 50px | 30px (responsive) |
| 9 | 60px | 40px (responsive) |

GOV.UK uses responsive spacing that **reduces on mobile** — the desktop feels more spacious and authoritative than mobile, appropriate for professional B2B contexts.

### Information Density Patterns

**The "document" layout pattern** (shared by IRS, EDGAR, FINRA):
- Numbered ordered lists with square/rectangular number badges (not circles)
- Heavy use of `<ol>` and `<dl>` styled as regulatory content
- Section numbers visible: "§ 820.1", "Subpart J", "26 U.S.C. §"
- Tables with thin 1px borders on all cells, `border-collapse: collapse`
- No card shadows — flat borders define regions
- Section dividers: 1–2px horizontal rules in `#cecece` or `#DFE1E2`

**FINRA BrokerCheck observations (verified 2026-03-10):**
- Uses **Roboto** with Helvetica fallback — Material Design base
- Font weights: 300 (light), 400 (regular), 700 (bold) — limited palette
- Near-black body text with slight transparency: `rgba(0,0,0,var(--tw-text-opacity))`
- Top utility bar with secondary navigation — separates institutional links from user actions
- Content cards: functional, low decoration — information-first

**Bloomberg Terminal patterns:**
- **Pure black backgrounds** for data interfaces
- Custom type with specialized numerical glyphs (tabular figures)
- Monospaced primary text — all characters equal width = data precision signal
- Color used exclusively for semantic meaning (red = negative, green = positive, blue = interactive)
- No decorative color — every color has a defined data-meaning

---

## Section 4: Specific Design Patterns That Signal Authority

### Pattern 1: The Regulatory Citation Block
Used by: IDHR, SEC EDGAR, IRS publications

```
[colored left border, 3–4px]  [regulation identifier, all-caps small text]
                                ILLINOIS HB3773 / IDHR SUBPART J § 1.1400
                                [body text of requirement]
```

Implementation:
- `border-left: 4px solid #005ea2` (USWDS primary)
- Left padding: 16–20px
- Label: `font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #71767a`
- Body: `font-size: 19px; line-height: 25px; color: #1b1b1b`

### Pattern 2: The Official Notice Banner
Used by: IRS.gov (alert banners), healthcare.gov, GOV.UK banners

```
[background: #e7f6f8] [left border: 4px solid #087591]
[icon] IMPORTANT NOTICE — [bold text]
[body text of notice]
```

This is how real government websites communicate urgency — not pulse animations, but static, bordered notice banners. The IRS uses this for filing deadlines. GOV.UK uses it for policy changes.

### Pattern 3: Numbered Requirements List (Document Style)
Used by: All federal regulatory publications, IDHR Subpart J documents

```
1  [Square or rectangular badge, federal blue background, white number]
   [Bold requirement title]
   [Body text explanation]
   [Regulatory citation: § X.XXXX in small italic]
```

Current implementation in AI Comply Docs uses circular badges with sky-700. Change to rectangular badges with `border-radius: 0` or `border-radius: 2px` maximum — circles read as SaaS, squares read as regulatory documents.

### Pattern 4: The "As Required By" Citation Footer
Used by: All government regulatory portals

Small-text citation lines at the bottom of requirement lists:
```
font-size: 14px; color: #71767a; border-top: 1px solid #dfe1e2; padding-top: 12px; font-style: italic;
"As required under IDHR Subpart J, 56 Ill. Adm. Code § 2520.1400"
```

This is the single highest-impact trust signal for a compliance product — citing the exact regulatory code section makes the content feel like it came from the regulation itself.

### Pattern 5: The Utility/Credential Bar
Used by: FINRA (top utility bar), IRS.gov, GOV.UK

A narrow bar above the main navigation:
```
background: #1b1b1b or #162e51 (dark navy)
height: 32–40px
font-size: 13px; color: #ffffff; letter-spacing: 0.02em
Content: [Official seal/badge placeholder] [Credential statement] [Date last updated: March 2026]
```

This visually frames the entire page as coming from an authoritative institution. IRS uses this for .gov domain confirmation. FINRA uses it to link BrokerCheck.

### Pattern 6: Tabular Data / Document Preview Components
Used by: EDGAR, Westlaw, Bloomberg

When showing document contents, use a table-like layout with ruled rows:
```
background-color: #ffffff
border: 1px solid #dfe1e2
border-collapse: collapse
row border-bottom: 1px solid #f0f0f0
header row background: #f4f8fb (USWDS surface-background)
font-family: "Source Sans Pro", monospace fallback for data columns
```

### Pattern 7: Section Number Identifiers
Used by: All regulatory documents, SEC filings, IDHR rules

Prefix section headers with regulation-style numbering:
```
<span class="section-id">§ 1</span>  Employee & Applicant Notification
```
Styling: `font-family: monospace; font-size: 14px; color: #71767a; margin-right: 12px`

This is perhaps the most immediate "looks like a regulatory document" signal available.

---

## Section 5: What to Keep, What to Remove, What to Add

### Remove (Currently on Site — Wrong Signal)
| Current Element | Why It's Wrong | Evidence |
|----------------|----------------|---------|
| `rounded-2xl` cards | Reads as consumer app (Stripe, Linear) | No .gov property uses rounded-2xl |
| `pulse-dot` animation | Urgency via animation = marketing gimmick | Regulatory portals use static badges |
| Gradient hero background | SaaS template signature | IRS, GOV.UK use flat backgrounds |
| `bg-sky-600` / sky CTAs | Warm/approachable SaaS blue | Federal blue is `#005ea2` — colder, darker |
| Space Grotesk font | Geometric, friendly, modern | No .gov property uses Space Grotesk |
| Card hover animations (`translateY`) | Delight-focused UX | Regulatory portals are static |
| `shadow-lg` on cards | Depth signals "designed" | Regulatory portals use flat 1px borders |

### Keep (Current Site — Good Direction)
| Current Element | Why It Works | Enhancement |
|----------------|-------------|-------------|
| Navy `#0F172A` background on hero | Correct dark authority base | Deepen to `#162e51` (USWDS primary-darker) |
| Border-separated sections | Flat border approach is correct | Use `#dfe1e2` consistently |
| Trust bar with icons | Correct pattern | Replace icons with checkmarks/seals |
| Numbered regulatory list | Strong document signal | Add `§` citation to each item |
| Gray `#3d4551` text hierarchy | Correct neutral approach | Shift to USWDS `#1b1b1b` for primary text |
| The 7-element numbered list | Already looks like IDHR source document | Maximize this — it's the best element on the site |
| Plain document language | Regulatory sites use plain language | Maintain this approach |

### Add (Not Present — High Impact)
| New Element | Source Pattern | Implementation Priority |
|-------------|---------------|------------------------|
| Regulatory citation footer under key claims | IDHR documents, EDGAR filings | HIGH — single biggest credibility signal |
| Left-border accent bars on notice sections | IRS.gov alert pattern | HIGH |
| Serif heading font (Merriweather) for H1/H2 | USWDS, healthcare.gov, SBA.gov | HIGH |
| `§` section identifiers on requirement items | All regulatory documents | HIGH |
| Utility credential bar above nav | FINRA, IRS, GOV.UK | MEDIUM |
| Tabular number treatment (tabular-nums) | Bloomberg Terminal, EDGAR | MEDIUM — especially for $299 price display |
| Flat, 1px-bordered inputs (not rounded-xl) | GOV.UK form standards | MEDIUM |
| `border-radius: 4px` max on badges | Regulatory badge shape | MEDIUM |
| CTA button in USWDS navy `#1a4480` | Federal button standard | HIGH |
| Section dividers at 1px `#cecece` | GOV.UK horizontal rules | LOW |

---

## Section 6: Typography Implementation — Specific Tailwind/CSS Values

### Recommended Font Stack for AI Comply Docs

```html
<!-- In <head>, replace current Space Grotesk / Inter -->
<link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700;900&family=Source+Sans+3:wght@400;600;700&display=swap" rel="stylesheet">
```

Note: "Source Sans 3" is the current Google Fonts name for Source Sans Pro (renamed 2022). Both names resolve to the same typeface.

```javascript
// Tailwind config replacement
fontFamily: {
  display: ['Merriweather', 'Georgia', 'Cambria', 'serif'],  // headings — government authority
  sans: ['Source Sans 3', 'Source Sans Pro', '-apple-system', 'sans-serif'],  // body — federal standard
},
```

### Type Scale — Targeting GOV.UK Standards in Tailwind

| Element | Current | Recommended | Rationale |
|---------|---------|-------------|-----------|
| H1 | `text-4xl md:text-6xl font-extrabold` | `text-4xl md:text-5xl font-bold` (48px) | GOV.UK xl heading = 48px |
| H2 | `text-3xl md:text-4xl font-bold` | `text-3xl md:text-4xl font-bold` (36px) | GOV.UK l heading = 36px |
| H3 | `text-xl font-bold` | `text-2xl font-bold` | GOV.UK m heading = 24px |
| Body | `text-sm` (14px) in cards | `text-base` (16px) minimum | GOV.UK body = 19px; 16px is acceptable minimum |
| Caption | `text-xs` | `text-sm` | GOV.UK body-s = 16px |
| Letter-spacing on headings | None explicit | `tracking-tight` or `tracking-normal` | GOV.UK uses normal tracking, not tight |

### Color Mapping — Current → USWDS Equivalent

```javascript
// Tailwind config — authority color system
colors: {
  federal: {
    950: '#0d1b2a',   // deeper than current navy-900 — near-USWDS primary-darker
    900: '#162e51',   // USWDS primary-darker — header, footer
    800: '#1a4480',   // USWDS primary-dark — button backgrounds
    700: '#005ea2',   // USWDS primary — links, active elements
    600: '#1d70b8',   // GOV.UK brand — alternative accent
    100: '#d9e8f6',   // USWDS primary-lighter — section backgrounds
    50:  '#f4f8fb',   // USWDS surface-background — light section tint
  },
  ink: {
    900: '#1b1b1b',   // USWDS ink — primary text
    700: '#3d4551',   // USWDS base-darker — secondary text
    500: '#71767a',   // USWDS base — tertiary text, captions
    300: '#a9aeb1',   // USWDS base-light — disabled
    100: '#dfe1e2',   // USWDS base-lighter — borders, rules
    50:  '#f0f0f0',   // USWDS base-lightest — section backgrounds
  },
  alert: {
    red:    '#d83933', // USWDS secondary — error, enforcement warnings
    gold:   '#C7A97B', // IRS gold accent — left-border bars on notices
    teal:   '#087591', // IRS teal — info banners
    green:  '#0f7a52', // GOV.UK success — confirmation states
  }
}
```

---

## Section 7: Government Seal / Badge Placement Patterns

### How Actual Regulatory Portals Handle Badges

**GOV.UK:** The crown symbol appears top-left of navigation on a black/dark background bar. It functions as a domain credential, not a decorative element. No other "trust badges" appear — the domain (.gov.uk) is the trust signal.

**IRS.gov:** The IRS seal and eagle appear in the header. Logo placement is top-left only. No badge proliferation.

**FINRA BrokerCheck:** The FINRA logo with "85 years of protecting investors" tagline in the header — longevity statement as the trust signal, not a collection of badges.

**What this means for AI Comply Docs:**
The current trust bar (checkmarks + short phrases) is not wrong in concept, but the execution is SaaS-style. The government equivalent is a **credential statement**, not badge-counting:

Replace:
```
✓ All 7 IDHR Required Elements  |  ✓ 5 Documents  |  ✓ Built for Illinois employers
```

With a single authoritative bar:
```
Documentation templates based on IDHR Subpart J, 56 Ill. Adm. Code §§ 2520.1400–2520.1530 | Templates verified current as of March 2026
```

This single line does more trust work than five checkmarks because it cites the actual regulatory code.

---

## Section 8: The "Document-Like Layout" Pattern

### What Makes Content Feel Like It Came From a Government Document

The single most powerful pattern used across all regulatory platforms is treating content as a **structured document**, not a webpage:

1. **Consistent left margin** — all content aligns to a single left edge. No content shifts left/right for visual interest.

2. **Numbered sections** — "1.", "§ 1.", or "1.1" prefix on all major sections.

3. **Definition/term lists** — key terms bolded, definitions indented below or after an em-dash. Used extensively in IDHR rule text.

4. **Table of contents treatment** — section names listed at top of page or section with page/anchor links. EDGAR does this for every 10-K filing.

5. **Footnotes and citations** — small-type citations at bottom of sections in italic, smaller than body text (14px vs 16px body). The citation IS the trust signal.

6. **Reduced right-column whitespace** — content fills the column cleanly. Regulatory documents don't have wide right margins with decorative content.

7. **Print-ready treatment** — government documents assume they may be printed. No elements that would look broken if printed (no hover effects, no gradients, clean backgrounds).

### Applying to AI Comply Docs

The Illinois HB3773 requirements section (currently good) should be extended to feel like the actual IDHR Subpart J text:

Before (current):
```
[blue circle with "1"] AI product name, developer, and vendor
```

After (document-like):
```
§ 1   AI Product Identification
      The notification must include the AI product name, developer, and vendor
      for each system used in employment decisions.

      — IDHR Subpart J, 56 Ill. Adm. Code § 2520.1410(a)(1)
```

---

## Section 9: Cross-Platform Pattern Synthesis

### Patterns Shared Across All Reference Platforms

| Pattern | IRS | GOV.UK | FINRA | Healthcare.gov | Bloomberg | Westlaw |
|---------|-----|--------|-------|---------------|-----------|---------|
| Near-black text (not pure black) | ✓ (#1B1B1B) | ✓ (#0b0c0c) | ✓ | ✓ | — | ✓ |
| Dark navy header/footer | ✓ | ✓ | ✓ | ✓ | — | ✓ |
| No card shadows (flat borders) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| No rounded corners >4px | ✓ | ✓ | ✓ | ✓ | ✓ | — |
| Serif for formal content | — | — | — | ✓ (Bitter) | — | ✓ |
| Sans-serif for UI/navigation | ✓ | ✓ | ✓ | ✓ | — | ✓ |
| Tabular number treatment | — | — | ✓ | — | ✓ | ✓ |
| Regulatory citations visible | ✓ | ✓ | ✓ | — | — | ✓ |
| No animations/transitions | ✓ | ✓ | ✓ | ✓ | — | ✓ |
| Off-white backgrounds (not pure white) | ✓ (#f4f8fb) | ✓ (#f4f8fb) | — | ✓ | — | — |

---

## Section 10: Prioritized Implementation Recommendations

Ranked by impact-to-effort ratio for a static HTML + Tailwind CDN implementation:

### Tier 1: Maximum Impact, Low Effort (Hours)

1. **Font swap: Merriweather + Source Sans 3**
   - Replace Google Fonts link only, update Tailwind fontFamily config
   - Impact: Immediately shifts brand perception from "startup" to "regulatory"
   - Free fonts, no other code changes required

2. **Color swap: Navy `#005ea2` → USWDS federal palette**
   - Replace `sky-700`, `sky-600`, `sky-800` with `#005ea2`, `#1a4480`, `#162e51`
   - Impact: Sky blue reads as SaaS; federal blue reads as government
   - One find-and-replace pass

3. **Remove rounded-2xl, replace with rounded (4px) or square**
   - Replace all `rounded-2xl` and `rounded-xl` on cards with `rounded` or `rounded-sm`
   - Impact: Single most obvious "this is a template" tell
   - One find-and-replace pass

4. **Add regulatory citation line under the 7-elements list**
   - Add: `<p class="text-sm text-gray-500 italic border-t pt-4 mt-4">Requirements per IDHR Subpart J, 56 Ill. Adm. Code §§ 2520.1400–2520.1530 (effective January 1, 2026)</p>`
   - Impact: Turns a list into an official document excerpt

### Tier 2: High Impact, Medium Effort (Day)

5. **Replace pulse animation badge with static "COMPLIANCE REQUIRED" badge**
   - Change from animated red pulse dot to: `background: #d83933; color: #fff; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 4px 10px; border-radius: 2px`
   - Impact: Government notices do not pulse

6. **Add left-border accent treatment to notice sections**
   - Add `border-left: 4px solid #005ea2; padding-left: 20px` to the consequences section
   - Impact: Direct IRS.gov pattern — reads as official notice

7. **Change H1/H2 to Merriweather, keep navigation in Source Sans 3**
   - Apply `font-display` (Merriweather) to all section headings
   - Keep `font-sans` (Source Sans 3) on nav, body text, form labels

8. **Square number badges on the 7-elements list**
   - Change `rounded-lg` to `rounded-none` on the numbered requirement items
   - Impact: Circles = SaaS steps; squares = regulatory items

### Tier 3: Medium Impact, Higher Effort (Multi-day)

9. **Add utility credential bar above navigation**
10. **Add `§` section identifiers to requirements headings**
11. **Add regulatory citation footnotes to each document description**
12. **Switch body background from `bg-slate-50` to USWDS `#f0f0f0`**

---

## Sources Consulted

- GOV.UK Design System colour page: https://design-system.service.gov.uk/styles/colour/ (verified 2026-03-10)
- GOV.UK Type Scale: https://design-system.service.gov.uk/styles/type-scale/ (verified 2026-03-10)
- GOV.UK Spacing: https://design-system.service.gov.uk/styles/spacing/ (verified 2026-03-10)
- USWDS Theme Color Tokens: https://designsystem.digital.gov/design-tokens/color/theme-tokens/ (verified 2026-03-10)
- USWDS Font Families: https://designsystem.digital.gov/design-tokens/typesetting/font/ (verified 2026-03-10)
- IRS.gov (WebFetch analysis): https://www.irs.gov/ (verified 2026-03-10)
- Healthcare.gov (WebFetch analysis): https://www.healthcare.gov/ (verified 2026-03-10)
- FINRA BrokerCheck (WebFetch analysis): https://brokercheck.finra.org/ (verified 2026-03-10)
- Bloomberg Terminal design/color: https://www.bloomberg.com/company/stories/designing-the-terminal-for-color-accessibility/ (verified 2026-03-10)
- Thomson Reuters design: https://www.codeandtheory.com/things-we-make/thomson-reuters (verified 2026-03-10)
- Official US Government Font Standards: https://legalclarity.org/official-us-government-font-standards-for-digital-and-print/ (verified 2026-03-10)
- Professional fonts for authority: https://inkbotdesign.com/professional-fonts/ (verified 2026-03-10)
- Public Sans typeface: https://public-sans.digital.gov/ (verified via search 2026-03-10)
- USWDS Merriweather/Source Sans pairing: https://v1.designsystem.digital.gov/components/typography/ (verified via search 2026-03-10)
- Palantir government website design practices: https://www.palantir.net/blog/government-website-design-best-practices (verified 2026-03-10)
- GOV.UK typeface governance: https://design-system.service.gov.uk/styles/typeface/ (verified 2026-03-10)
