# Team 4 Research Findings: Layout & Information Architecture for Compliance Products

**Researcher:** Expedition Team Member 4
**Date:** 2026-03-10
**Angle:** Layout & Information Architecture for Compliance Products
**Project:** AI Comply Docs (aicomplydocs.com)

---

## Executive Summary

Generic SaaS landing pages and government compliance portals differ in five fundamental ways: grid structure, content density, section delineation, typography authority, and the role of negative space. The current AI Comply Docs page uses all five SaaS conventions. This report provides specific, Tailwind-implementable patterns borrowed from verified government and legal tech design systems to close that gap.

---

## Part 1: Codebase Audit — Current Layout State

**Source:** Direct read of `C:\Users\baenb\projects\project _cameron\compliance-tool\index.html`

### Current Grid Structure
- **Container:** `max-w-5xl` and `max-w-6xl` (1024–1280px), centered, single-column marketing flow
- **Cards:** `rounded-2xl` throughout — the signature of SaaS template design
- **Column patterns:** `grid md:grid-cols-3`, `grid md:grid-cols-2`, `lg:grid-cols-3` — all equal-weight, centered, marketing-style grids
- **No two-column layout:** No main content + sidebar pattern exists anywhere on the page

### Current Section Structure
Every section follows the same formula:
1. Centered `text-center` heading block
2. Centered subtext paragraph
3. Equal-column grid of rounded cards
4. Optional centered CTA

This is uniform throughout: hero, pain section, how-it-works, what-you-get, HB3773 detail, pricing, FAQ, generator. The repetition signals a template, not a regulatory resource.

### Current Spacing
- `py-16` (64px) on most sections — generous SaaS whitespace
- `rounded-2xl` (border-radius: 16px) on all cards and containers
- `gap-6` and `gap-8` between grid items
- Hero uses `py-20 md:py-28` — even more generous

### Current Typography
- Headings: `text-3xl md:text-4xl font-bold font-display` (Space Grotesk), centered
- All section headers are centered — there are no left-aligned section anchors
- No section numbering, no document hierarchy markers, no breadcrumbs

### Current Border Treatment
- Cards use `border border-gray-200` or `border border-red-100` — light, decorative
- No horizontal rules as structural dividers
- No left-border accent treatments
- No table structures (the 7-element list is a styled `<ol>` with colored number badges, not a table)

### The Core Problem
The page reads as a startup marketing page with compliance content pasted in. The visual language says "friendly app" while the legal stakes say "regulatory requirement." Every rounded corner, every centered heading, every gradient hero undercuts the authority the content tries to establish.

---

## Part 2: Government Design System Patterns

### 2A. USWDS (U.S. Web Design System)

**Source:** designsystem.digital.gov, verified March 2026

**Grid System:**
- 12-column grid, flexbox-based
- Container max-widths: 1024px (desktop default), 1200px (desktop-lg)
- Horizontal padding: 2 units narrow / 4 units desktop (approximately 16px / 32px)
- Gutters: default none; `grid-gap` = 2 units, `grid-gap-lg` = 32px
- Breakpoints: 640px (tablet), 1024px (desktop)

**Most-used layout for compliance content:** Two-thirds / one-third split (`tablet:grid-col-8` content + `tablet:grid-col-4` sidebar). This is the canonical government compliance page layout. Main content left, navigational/contextual sidebar right (or left on some pages).

**Side Navigation Component:**
- Hierarchical, vertical, placed at side of page
- Supports 3 levels of nesting
- Active state uses a left-border indicator controlled by `$theme-sidenav-current-border-width`
- The left-border active state is the signature visual of government navigation
- Typography managed via `$theme-sidenav-font-family`

**Border Utilities:**
- `border-left-4` (16px) with accent color = primary authority treatment
- Border widths: 1px, 2px, 4px, 8px, 12px, 16px, 20px, 24px
- Directional: `border-left`, `border-top`, `border-bottom`, `border-right`
- Styles: solid (default), dashed, dotted
- Left-border accent with `primary-vivid` color is the standard government "callout" treatment

**Border Radius:**
- `radius-sm` = 2px, `radius-md` = 4px, `radius-lg` = 8px, `radius-pill` = 99rem
- Government components never use `radius-2xl` (16px) — that reads as consumer app
- 0–4px is the government register

### 2B. GOV.UK Design System

**Source:** design-system.service.gov.uk, verified March 2026

**Grid System:**
- Max page width: **1020px** — narrower than typical SaaS (which runs to 1280px)
- Primary column split: two-thirds / one-third (`govuk-grid-column-two-thirds` + `govuk-grid-column-one-third`)
- This is so canonical that GOV.UK calls it their recommended layout
- Line length: maximum 75 characters — enforced via column width, creates document reading feel

**Table Component:**
- `<th>` elements with `scope="col"` or `scope="row"` attributes
- Numeric columns right-aligned (`govuk-table__header--numeric`)
- Header cells visually distinct from data cells — no decorative color, just structural weight
- Row spacing controlled, not generous — this is data, not marketing
- Tables are for data, not for layout (unlike SaaS which uses card grids)

**Pattern: Step-by-step navigation**
- Explicitly listed as a GOV.UK pattern for sequential processes
- Numbered steps with left-border accent treatments
- Each step as a discrete block with a number prefix, not an icon badge
- This pattern directly applies to a compliance workflow

### 2C. DOL / EEOC / IDHR Government Site Analysis

**Sources:** Direct fetch of dol.gov/agencies/whd/flsa, eeoc.gov/employers, dhr.illinois.gov, verified March 2026

**Typography Pattern (DOL):**
- `Merriweather` serif at `font-weight: 700` for H1 headings — this is the authoritative serif pattern
- Government blue `#0071bc` for interactive elements
- Body text in `#222` on white — maximum contrast, no gray body text
- Headers are left-aligned, not centered

**Section Delineation (DOL FLSA page):**
- Horizontal rules (`<hr>`) in gray at 1px separate major content areas
- Table headers use `#f1f1f1` background with dark text
- Alert blocks use left-rail context (left-border colored stripe on notices)
- Dense tabular content: civil penalty table with 4 columns, statutory citations, CFR citations, penalty amounts — this is what regulatory authority looks like in table form

**Content Structure (EEOC):**
- Navigation sidebar has bolded section headers, then nested plain links
- Main content uses stacked content blocks without decorative elements
- No colored cards, no icon badges, no hover effects
- Links use `#005ea2` with no underline until hover — functional, not decorative
- Lists separated by whitespace alone — "official document" feel, not "scannable product" feel

**IDHR Website (Direct Analog):**
- Horizontal rules as structural dividers between sections
- Minimal color palette: black text, white backgrounds, blue hyperlinks only
- Footer: 4-column grid organizing links by category (maximum information density)
- Department seal reinforces official authority
- No rounded cards, no gradient backgrounds, no animation

---

## Part 3: Premium Legal Tech Patterns

### 3A. Ironclad (Legal Operations SaaS)

**Source:** Direct fetch of ironcladapp.com, verified March 2026

**Spacing System:**
- 11-level custom spacing scale (0–120px)
- Section gaps: 50px default — deliberately larger than typical SaaS 32px
- Premium sections: `padding-top: 60px; padding-bottom: 80px`
- `.is-layout-constrained` enforces max-widths with centered alignment — composed, not sprawling

**Typography:**
- 3-tier system: headers 25–42px responsive, body 0.984–1.5rem, labels 0.875rem
- `Moderat Mono` monospace for eyebrow/label text — creates technical credibility
- Eyebrow text: 0.875rem, 500 weight — signals footnote/regulatory convention

**Authority Signals:**
- Accordion float-panel at 60px gutters parallels contract side-by-side review layouts
- Constrained prose width (approximately 102-char line measure) respects legal scanning habits
- Scanning-and-comparison layout rather than conversion funnel — mirrors how legal teams evaluate
- Border-radius: 20px on cards — modern but not SaaS-generic

### 3B. Vanta (Compliance SaaS)

**Source:** Direct fetch of vanta.com, verified March 2026

**Authority Through Structure:**
- **6-column responsive grid** with 1.25rem gaps
- Compliance badges (SOC 2, ISO 27001, ISO 42001, GDPR) clustered as a unified "proof shield" in footer
- Framework gallery uses logo badges rather than prose — compliance officers scan, not read
- IDC MarketScape analyst badge mid-page — compliance SaaS uses analyst validation, not review badges
- Trust Center link (`trust.vanta.com`) in footer — transparency as infrastructure

**Density Pattern:**
- Hero and main content: generous whitespace (persuasive zone)
- Footer: dense reference material (functional zone)
- This two-mode density signals "we understand you're here to verify, not browse"

**Section Organization:**
- Size-specific maturity narratives (startup/mid-market/enterprise) rather than feature lists
- Vendor Risk Management as a discrete workflow section — regulatory specificity over generic features
- Em-dash header construction signals multi-dimensional compliance thinking

---

## Part 4: Specific Layout Patterns to Adopt

These are concrete, Tailwind-implementable patterns derived from the above research. Each includes the source pattern, the current state, and the specific change.

---

### Pattern 1: Two-Thirds / One-Third Column Layout

**Source:** GOV.UK Design System (canonical government layout), USWDS, DOL.gov
**Current state:** All sections use centered single-column or equal-column grids
**Government pattern:**
```
Main content area: 2/3 width (left)
Sidebar / reference panel: 1/3 width (right)
Container max-width: 1020–1024px
```

**Tailwind implementation:**
```html
<div class="max-w-screen-lg mx-auto px-8">
  <div class="grid grid-cols-3 gap-12">
    <main class="col-span-2">
      <!-- Primary content -->
    </main>
    <aside class="col-span-1">
      <!-- Regulatory sidebar: statute reference, quick facts, key dates -->
    </aside>
  </div>
</div>
```

**Where to apply:** The HB3773 detail section (the 7 required elements) is the strongest candidate. The main content shows the 7 elements. The sidebar shows: effective date, penalties at a glance, 4-year retention requirement, posting locations. This transforms a marketing section into a regulatory reference.

**Tradeoff:** Narrows content column on mobile — sidebar must stack below on mobile (`grid-cols-1 md:grid-cols-3`).

---

### Pattern 2: Left-Border Active State / Callout Treatment

**Source:** USWDS side navigation (`$theme-sidenav-current-border-width`), USWDS border utilities, DOL alert blocks
**Current state:** Rounded badges (sky-700 circles) used for numbered elements; rounded-2xl cards for groupings

**Government pattern:** Left-border accent in 4–8px width with authority color on active/important items.

**Tailwind implementation for section anchors:**
```html
<div class="border-l-4 border-navy-800 pl-6 mb-6">
  <p class="text-xs font-bold uppercase tracking-widest text-navy-600 mb-1">
    IDHR Subpart J — Required Element 1
  </p>
  <h3 class="text-lg font-bold text-gray-900">
    AI product name, developer, and vendor
  </h3>
  <p class="text-gray-700 mt-2">...</p>
</div>
```

**Where to apply:** Replace the numbered sky-700 circle badges on the 7 required elements list with left-border treatment. Each element becomes a left-bordered block, not a badge-prefixed list item.

**Tradeoff:** Less visually playful than circle badges. That is the point — regulatory items are not playful.

---

### Pattern 3: Horizontal Rule Section Dividers (Structural, Not Decorative)

**Source:** DOL FLSA page, EEOC pages, IDHR.illinois.gov
**Current state:** Sections separated only by background-color alternation (white/slate-50) with generous `py-16` padding

**Government pattern:** `<hr>` or `border-t` rules at 1px gray between content areas within sections. Multiple visual dividers within a section, not just between sections.

**Tailwind implementation:**
```html
<!-- Within the HB3773 detail section, after the 7 elements list: -->
<hr class="border-t border-gray-200 my-8">

<!-- Before the "Who Must Comply" grid: -->
<div class="grid md:grid-cols-2 gap-6 pt-2">
```

**Why it matters:** Background alternation says "marketing sections." Explicit horizontal rules say "regulatory document." The IRS, DOL, and EEOC all use explicit rules between content clusters.

**Tradeoff:** Slightly more visual complexity within sections — requires content to be worthy of sectioning (which compliance content is).

---

### Pattern 4: Table Structure for Regulatory Data

**Source:** GOV.UK Table Component, DOL civil penalty tables, USWDS table patterns
**Current state:** The 7 required elements are an `<ol>` with styled numbered badges. The "Who Must Comply" list is a styled `<ul>`.

**Government pattern:** When content has a classification system (element number, requirement type, statutory source), use a table. Tables convey regulatory precision. Lists convey marketing bullets.

**Tailwind implementation for the 7 elements:**
```html
<table class="w-full border-collapse text-sm">
  <thead>
    <tr class="border-b-2 border-gray-900">
      <th class="text-left py-3 pr-4 font-bold text-gray-900 w-12">#</th>
      <th class="text-left py-3 pr-4 font-bold text-gray-900">Required Element</th>
      <th class="text-left py-3 font-bold text-gray-900">IDHR Reference</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-b border-gray-200">
      <td class="py-4 pr-4 font-mono text-xs text-gray-500 align-top">1</td>
      <td class="py-4 pr-4 font-semibold text-gray-900 align-top">AI product name, developer, and vendor</td>
      <td class="py-4 text-gray-600 text-xs align-top">Subpart J § (a)(1)</td>
    </tr>
    <!-- ... -->
  </tbody>
</table>
```

**Where to apply:** The 7 required elements section. This is the core regulatory content — it should look like a regulatory table, not a styled list.

**Tradeoff:** Tables require more HTML, don't reflow as gracefully on mobile. Use `overflow-x-auto` wrapper and collapse to simplified list on small screens.

---

### Pattern 5: Sticky Left-Rail Sidebar Navigation

**Source:** DOL WHD page sidebar, USWDS side navigation component, VA.gov breadcrumbs
**Current state:** Top sticky nav with anchor links. No side navigation.

**Government pattern:** On compliance/regulatory resource pages, the sticky left sidebar serves as a document-style table of contents. Users can see where they are in the document hierarchy at all times.

**Tailwind implementation (within section, desktop only):**
```html
<div class="max-w-screen-lg mx-auto px-8">
  <div class="grid grid-cols-4 gap-12">
    <!-- Sticky sidebar TOC -->
    <aside class="hidden md:block col-span-1">
      <nav class="sticky top-24">
        <p class="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
          On This Page
        </p>
        <ul class="space-y-1">
          <li>
            <a href="#requirements"
               class="block text-sm text-gray-700 border-l-2 border-transparent
                      pl-3 py-1.5 hover:border-navy-800 hover:text-navy-900
                      transition-colors aria-[current=page]:border-navy-800
                      aria-[current=page]:text-navy-900 aria-[current=page]:font-semibold">
              7 Required Elements
            </a>
          </li>
          <li>
            <a href="#who-must-comply" class="block text-sm text-gray-700 border-l-2 border-transparent pl-3 py-1.5 hover:border-navy-800 hover:text-navy-900 transition-colors">
              Who Must Comply
            </a>
          </li>
          <!-- ... -->
        </ul>
      </nav>
    </aside>
    <!-- Main content -->
    <main class="col-span-3">
      <!-- ... -->
    </main>
  </div>
</div>
```

**Where to apply:** The entire page below the hero could benefit from this. Critically: the HB3773 detail section, the "What You Get" section, and the FAQ — these are all regulatory-reference content, not marketing sections.

**Tradeoff:** Requires restructuring the single-column page into a two-pane layout for the reference sections. The hero, pricing, and questionnaire sections remain full-width. Only the information sections go two-column.

---

### Pattern 6: Section Numbering and Document Hierarchy

**Source:** GOV.UK step-by-step navigation pattern, DOL regulatory section structure
**Current state:** Section headers are marketing headlines ("How It Works," "What You Get"). No numbering, no document hierarchy.

**Government pattern:** Regulatory documents use section numbering. "Section 1: Employer Obligations" signals "this is official." Marketing pages don't number sections. Compliance portals always do.

**Tailwind implementation for section headers:**
```html
<!-- Replace current centered h2 pattern with: -->
<div class="mb-8">
  <span class="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">
    Section 2
  </span>
  <h2 class="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-4">
    Required Documentation Elements
  </h2>
</div>
```

**Where to apply:** The HB3773 detail section should be "Section 2: Required Elements." The documents section becomes "Section 3: Compliance Package." This creates a document reading experience.

**Tradeoff:** Reduces "scannability" as a marketing page. Increases authority as a compliance reference. Net positive for this product.

---

### Pattern 7: Reduced Border Radius — The Single Highest-Impact Change

**Source:** All government design systems (0–4px maximum), all regulatory portals studied
**Current state:** `rounded-2xl` (16px) on every card, every button, every input, every container
**Government pattern:** 0–4px maximum on data/reference content. Slight rounding (2–4px) on interactive elements only.

**Specific replacements:**
- `rounded-2xl` → `rounded` (4px) on all content cards
- `rounded-xl` on buttons → `rounded-sm` (2px) or `rounded` (4px)
- `rounded-full` on badges → `rounded-sm` or remove entirely; use bordered rectangle
- `rounded-2xl` on FAQ items → `rounded` (4px) or no radius (government FAQs use zero radius)
- `rounded-xl` on form inputs → `rounded` (4px)

**Why this matters most:** Border radius is the primary visual signal that distinguishes SaaS from regulatory. The IRS, EEOC, DOL, IDHR — none use `rounded-2xl`. This single change transforms the design language more than any other single modification.

**Tradeoff:** Loses the "friendly and approachable" signal. For a tool selling legal compliance, that tradeoff is correct.

---

### Pattern 8: Left-Aligned Section Headers (Not Centered)

**Source:** EEOC, DOL, IDHR, all government portals; Ironclad legal tech
**Current state:** `text-center` on every section header — all h2 elements are centered
**Government pattern:** Left-aligned section headers with left-aligned body text. Centered text signals consumer marketing. Left-aligned signals document.

**Tailwind implementation:**
```html
<!-- Replace: -->
<div class="text-center mb-12">
  <h2 class="text-3xl font-bold font-display mb-3">What You Get</h2>
  <p class="text-gray-500">Five documents...</p>
</div>

<!-- With: -->
<div class="mb-8">
  <h2 class="text-2xl font-bold text-gray-900 mb-2">Compliance Package Contents</h2>
  <p class="text-gray-600 max-w-2xl">Five documents, customized with your company's information...</p>
</div>
```

**Where to apply:** Every section header except the hero. The hero can remain centered (it's the one section that should market). Everything after it should be left-aligned.

**Tradeoff:** Reduces visual symmetry that makes pages feel polished. Government pages do not optimize for visual symmetry — they optimize for document readability.

---

### Pattern 9: Typography Scale — Reducing the Range, Increasing the Weight

**Source:** DOL (Merriweather serif + government blue), EEOC (high contrast dark text), Ironclad (3-tier system)

**Government pattern:**
- Reduce the font size range (government sites don't use 6xl for pricing, 4xl for headers)
- Increase contrast (dark body text `#1a1a1a` or `#222`, not `text-gray-500` for body)
- Use monospace or semi-bold for regulatory codes and reference numbers
- Body text at `text-base` (16px), not `text-sm` for important compliance content

**Specific changes:**
```
$299 pricing: text-6xl → text-4xl (pricing is a fact, not a hero)
Section headers: text-4xl → text-2xl (document headers, not hero text)
Body text: text-gray-500 → text-gray-700 (regulatory content deserves contrast)
Legal citations: font-mono text-xs text-gray-500 (signals regulatory precision)
```

**Tradeoff:** The page becomes less visually dramatic. Compliance information becomes more legible and authoritative. For a $299 B2B purchase, legibility beats drama.

---

### Pattern 10: Information Density — Sidebar Reference Blocks

**Source:** USWDS side navigation, GOV.UK two-thirds/one-third layouts, Vanta footer density pattern
**Current state:** All sections use the same generous `py-16` padding and equal visual weight
**Government pattern:** Reference material (statutes, key dates, penalties) is presented at higher density than explanatory prose.

**Implementation — Sidebar Reference Block:**
```html
<!-- Sidebar companion to the 7-element main content -->
<aside class="bg-gray-50 border border-gray-200 rounded p-6">
  <h3 class="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
    Quick Reference
  </h3>

  <dl class="space-y-4">
    <div class="border-b border-gray-200 pb-4">
      <dt class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Effective Date</dt>
      <dd class="font-bold text-gray-900 mt-1">January 1, 2026</dd>
    </div>
    <div class="border-b border-gray-200 pb-4">
      <dt class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Record Retention</dt>
      <dd class="font-bold text-gray-900 mt-1">4 years</dd>
    </div>
    <div class="border-b border-gray-200 pb-4">
      <dt class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Notice Locations</dt>
      <dd class="text-sm text-gray-700 mt-1">Handbook, physical board, intranet, job postings</dd>
    </div>
    <div>
      <dt class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Statute</dt>
      <dd class="font-mono text-xs text-gray-700 mt-1">Illinois HB3773 / IDHR Subpart J</dd>
    </div>
  </dl>

  <div class="mt-6 pt-4 border-t border-gray-200">
    <p class="text-xs text-gray-500">Source: Illinois Department of Human Rights</p>
  </div>
</aside>
```

**What this pattern communicates:** "We know the regulation well enough to create a reference sidebar." This is the layout of expertise, not marketing.

---

## Part 5: What to Preserve (SaaS Patterns That Still Work)

Not all SaaS patterns should be removed. Conversion still matters.

**Keep:**
- The hero section's urgency badge and headline — urgency is legitimate here
- The pricing section's visual hierarchy — $299 needs to be legible and prominent
- The questionnaire progress bar — functional UX for the form flow
- The trust bar icons — but reduce icon size and remove `rounded-xl` from icon containers
- The FAQ section — but reduce border radius to `rounded` and remove `bg-slate-50` (use border-only treatment)
- The CTA buttons — but reduce to `rounded` from `rounded-xl`; keep sky-700 color

**Why:** The hero, pricing, and questionnaire are conversion elements. They can be warmer. The informational sections (HB3773 detail, document list, compliance requirements) are what should feel like a regulatory resource.

---

## Part 6: Measurement Summary — What "Less Whitespace, More Structure" Actually Means

Current spacings and proposed changes based on government design system measurements:

| Element | Current | Government Standard | Proposed |
|---|---|---|---|
| Section padding | `py-16` (64px) | 40–48px | `py-12` (48px) for info sections |
| Card border radius | `rounded-2xl` (16px) | 0–4px | `rounded` (4px) |
| Button border radius | `rounded-xl` (12px) | 2–4px | `rounded` (4px) |
| Card gap | `gap-6` (24px) | 16–20px | `gap-4` (16px) for document grids |
| Section header alignment | centered | left | left-aligned after hero |
| Body text color | `text-gray-500` | #222 (near-black) | `text-gray-700` minimum |
| Container max-width | `max-w-5xl` (1024px) | 1020–1024px | maintain but shift structure |
| Typography range | 6xl to sm | 2xl to xs | 3xl to xs (reduce dramatic range) |

---

## Part 7: Priority Order for Implementation

Based on impact-per-change ratio (highest first):

1. **Border radius reduction** (`rounded-2xl` → `rounded`) — single biggest authority signal
2. **Section header alignment** (centered → left) — document vs. marketing feel
3. **Body text contrast** (`text-gray-500` → `text-gray-700` on compliance content) — legibility
4. **Horizontal rule dividers** within sections — document structure signal
5. **Left-border treatment** on the 7 required elements — replaces circle badges
6. **Table structure** for the 7 required elements — regulatory precision signal
7. **Two-column layout** for HB3773 detail section — main content + reference sidebar
8. **Section numbering** on compliance information sections — document hierarchy
9. **Sticky sidebar TOC** on desktop — regulatory portal navigation
10. **`dl` reference blocks** in sidebars — density and specificity signal

Items 1–4 are high impact, low effort (global class replacements). Items 5–10 require HTML restructuring.

---

## Sources

- [U.S. Web Design System — Layout Grid](https://designsystem.digital.gov/utilities/layout-grid/) — USWDS specifications, verified March 2026
- [U.S. Web Design System — Border Utilities](https://designsystem.digital.gov/utilities/border/) — border treatment specs
- [U.S. Web Design System — Side Navigation](https://designsystem.digital.gov/components/side-navigation/) — left-rail nav patterns
- [GOV.UK Design System — Layout](https://design-system.service.gov.uk/styles/layout/) — two-thirds/one-third canonical pattern
- [GOV.UK Design System — Table](https://design-system.service.gov.uk/components/table/) — regulatory table patterns
- [GOV.UK Design System — Patterns](https://design-system.service.gov.uk/patterns/) — step-by-step, compliance patterns
- [VA.gov Design System — Breadcrumbs](https://design.va.gov/components/breadcrumbs) — breadcrumb spacing: 20px above / 48px below (desktop)
- [DOL Wage and Hour Division](https://www.dol.gov/agencies/whd) — Merriweather serif, government blue #0071bc, 1px gray rules
- [DOL FLSA Page](https://www.dol.gov/agencies/whd/flsa) — 4-column civil penalty table, gray #f1f1f1 header backgrounds
- [EEOC Employers](https://www.eeoc.gov/employers) — stacked content blocks, minimal decoration, links #005ea2
- [IDHR Illinois](https://dhr.illinois.gov/) — horizontal rule dividers, 4-column footer grid
- [FINRA Compliance Tools](https://www.finra.org/compliance-tools) — regulatory language, role-based navigation, no SaaS CTAs
- [Vanta.com](https://vanta.com/) — 6-column grid 1.25rem gaps, badge proof shield, compliance framework gallery
- [Ironclad.com](https://ironcladapp.com/) — 11-level spacing scale, Moderat Mono eyebrow text, 50px section gaps, scanning-first layout
- [Palantir.net Government Design Best Practices 2025](https://www.palantir.net/blog/government-website-design-best-practices) — governance framework patterns
- [Eleken Legal Tech UX Design](https://www.eleken.co/industries/legal-tech-ux-design-services) — form layout, legal precision patterns
- [Information Architecture for Government Websites — Medium, June 2025](https://medium.com/@frelsi.andy/information-architecture-and-information-transfer-in-municipal-government-websites-88316dd70d19) — information transfer patterns
- [USWDS — Government Design Systems Overview](https://lastcallmedia.com/blog/government-design-systems-leveraging-uswds-building-your-own) — design system principles, 40+ compliant components
