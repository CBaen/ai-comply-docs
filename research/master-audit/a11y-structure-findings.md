# Accessibility Audit — Structure & Keyboard
**Scope:** WCAG 2.1 AA — Structural and Keyboard Accessibility
**Auditor:** Agent B (Structure/Keyboard)
**Date:** 2026-03-24
**Codebase:** `C:\Users\baenb\projects\project _cameron\aicomplydocs\src`

---

## Summary

The site has a solid accessibility foundation: `lang="en"` on `<html>`, skip navigation link, proper `<main id="main-content">` on every page, focus rings in globals.css, and good ARIA usage on interactive widgets (carousel, search modal, mobile nav). The critical issues are concentrated in three areas: (1) heading hierarchy violations on several pages, (2) an unlabeled search input inside the modal, and (3) a few form fields with `aria-required` misapplied or `required` missing. There are no focus traps outside the intentional mobile menu, and tab order is logical throughout.

---

## 1. `lang` Attribute on `<html>`

**Status: PASS**

`src/app/layout.tsx:71` — `<html lang="en" ...>` is present and correct.

---

## 2. Skip Navigation Link

**Status: PASS**

`src/components/Nav.tsx:45-50` — Skip link renders as the first focusable element in the DOM:

```
<a href="#main-content" className="sr-only focus:not-sr-only ...">
  Skip to main content
</a>
```

All page layouts render `<main id="main-content">`, confirming the target anchor exists. The skip link reveals itself on focus with a visible, styled appearance. No issues.

---

## 3. Heading Hierarchy

### 3.1 Home Page (`src/app/page.tsx`)

**Status: PASS with notes**

- `h1` is present at line 143 (`sr-only` — screen-reader only, visible h1 omitted from visual flow intentionally). This is acceptable since the hero carousel renders the ProductCarousel which uses `h2` for product names.
- `h2` headings: "How It Works" (line 195), "How We Build Our Templates" (line 231), "What happens if you don't comply?" (line 301), "Compliance Document Library" (line 345), "Frequently Asked Questions" (line 360), "Don't wait for a complaint" (line 457) — all correct.
- `h3` under How It Works: "Choose Your Regulation", "Pay Once", "Download Your PDFs" — correct nesting under h2.
- **Minor issue:** The methodology trust statement section (line 276) has no heading at all — it is a `<section>` with only paragraph text, no `aria-label`, and no heading. This makes the section invisible to screen reader landmark navigation.

  **File:** `src/app/page.tsx:276`
  **WCAG:** 1.3.1 Info and Relationships / 2.4.6 Headings and Labels
  **Severity:** Minor
  **Fix:** Add an `aria-label` to the `<section>` or a visually-hidden `<h2>` e.g. `<h2 className="sr-only">Our Approach</h2>`.

### 3.2 Product Detail Page (`src/app/products/[slug]/page.tsx`)

**Status: FAIL — heading level skip**

The product page has this structure:
- `h1`: Product name (line 255) — correct
- `h2`: "Does This Apply to You?" (line 316)
- `h2`: "What's Included (N Documents)" (line 344)
- `h2`: "Preview Your Documents" (line 369)
- `h2`: "See Inside Your Documents" (line 381)
- `h2`: "What Happens Without Compliance" (line 415)
- `h2`: "What Happens After You Purchase" (line 437)
- `h2`: "Complete Your Compliance" (line 466)
- `h2`: "Statutory Authority" (line 535)
- `h2`: "Customize Your {name} Package" (line 673)
- `h2`: "You May Also Need" (line 694)
- `h3`: Product names in "You May Also Need" grid (line 714) — correct
- **Issue:** The sidebar purchase card (`src/app/products/[slug]/page.tsx:562-638`) contains no heading at all — the `$price` and "Complete Package" label are just `<p>` elements. The sidebar is a major interactive region (buy button, price, checklist) with no heading to orient screen reader users navigating by heading.

  **File:** `src/app/products/[slug]/page.tsx:562`
  **WCAG:** 1.3.1 Info and Relationships / 2.4.6 Headings and Labels
  **Severity:** Major
  **Fix:** Add `<h2 className="sr-only">Purchase This Package</h2>` or similar inside `<div id="get-started">`.

- **Issue:** The StatusBadge component (line 53-83) renders a colored dot `<span>` without `aria-hidden` on the dot AND without the status text being semantically distinguished.

  **File:** `src/app/products/[slug]/page.tsx:78`
  **WCAG:** 1.3.3 Sensory Characteristics
  **Severity:** Minor
  **Fix:** The dot `<span>` at line 78 is missing `aria-hidden="true"`. The visible text ("IN EFFECT", "COMING SOON") is present, so the dot is purely decorative — add `aria-hidden="true"` to the dot span.

### 3.3 Questionnaire Steps (`src/components/questionnaire/`)

**Status: FAIL — wrong heading level**

Each questionnaire step renders an `h3` as the step title (e.g., "Company Information", "AI Systems", "Contact Information"). However, these steps live inside a section of the product page that has an `h2` ("Customize Your Package") — so `h3` is the correct nesting level here. This is **PASS**.

However, the `StepReviewCheckout.tsx` step contains `h4` elements ("Company", "AI Systems", "Decision Process", "Contact for Documents") inside the step div, where the step title is `h3`. The `h4` usage is correct for these sub-sections.

- **Issue:** `StepReviewCheckout.tsx:135` — the "You will receive (N PDF documents):" label is inside an `h4` that also contains an inline SVG icon. The SVG icon has `aria-hidden="true"` — correct. But the `h4` reads "You will receive (5 PDF documents):" which is fine. No structural issue here.

### 3.4 Blog Listing Page (`src/app/blog/page.tsx`)

**Status: FAIL — heading level issue in article cards**

- `h1`: "What's New in AI Compliance" (line 53) — correct
- `h2` inside each `<article>` card (line 101): Blog post title — correct for landmark structure

  However, the CTA section at line 139 uses `h2` ("Ready to get compliant?") at the same level as the `h1`-less CTA. The page has one `h1` and then multiple `h2` sections — this is correct. No issue here.

- **Issue:** The blog card at line 78 wraps the `<img>` in a `<Link>` but the subsequent `h2` (line 101) is a separate `<Link>`. The article card thus has two separate links to the same URL with different text ("image link" with no text, and the title text). The image link has only the `alt` attribute of the `<img>` to identify it (which equals the post title), but this creates a duplicate link scenario.

  **File:** `src/app/blog/page.tsx:78` and `103`
  **WCAG:** 2.4.4 Link Purpose / 4.1.1 Parsing
  **Severity:** Minor
  **Fix:** Wrap the entire card in one `<Link>` with `aria-label={post.title}` or make the image link `aria-hidden="true"` and `tabIndex={-1}` since the title link follows immediately.

### 3.5 Products Listing Page (`src/app/products/page.tsx`)

**Status: PASS**

- `h1`: "AI Compliance Templates" (line 63) — correct
- `h2 className="sr-only"`: "Available Packages" (line 77) — the `<section>` containing the `ProductLibrary` has a visually-hidden h2. Good practice.
- `h2`: "Not sure which package you need?" (line 85) — correct

### 3.6 ProductLibrary Component (`src/components/ProductLibrary.tsx`)

**Status: FAIL — missing heading on DeadlineBanner**

- `h3` inside `DeadlineBanner` (line 108): "These Laws Are In Effect Now — Penalties Are Live" — this is an `h3` inside a `div` that is rendered before any `h2` within the `ProductLibrary`. When ProductLibrary is embedded in the Products page, the nearest ancestor heading is the `h1` — creating an h1 → h3 skip.

  **File:** `src/components/ProductLibrary.tsx:108`
  **WCAG:** 1.3.1 Info and Relationships / 2.4.6 Headings and Labels
  **Severity:** Major
  **Fix:** Change `<h3>` to `<h2>` in DeadlineBanner, since it is the first heading inside the product library section which lives directly under the page `h1`.

- **Issue:** Product cards (line 302): `h3` for each product name. On the homepage, this is nested under the section `h2` "Compliance Document Library" — correct (h1 → h2 → h3). On the /products page it is under an `h1` with a `sr-only` h2 ("Available Packages") — still correct. Good.

- **Issue:** The search input at line 187 has no `<label>` element. It relies solely on the `placeholder` attribute ("Search by state, law, or topic...") for its accessible name.

  **File:** `src/components/ProductLibrary.tsx:187`
  **WCAG:** 1.3.1 Info and Relationships / 3.3.2 Labels or Instructions
  **Severity:** Major
  **Fix:** Add a visually-hidden label: `<label htmlFor="product-search" className="sr-only">Search products</label>` and add `id="product-search"` to the input.

### 3.7 Contact Page (`src/app/contact/page.tsx`)

**Status: PASS**

- `h1`: "Contact Us" (line 60) — correct
- All form inputs have proper `<label>` elements with `htmlFor` matching `id` attributes.
- Required fields marked with `*` and `<span className="text-red-500">*</span>` — visually indicated but the asterisk is inside a `<span>` with no `aria-label`. Screen readers may read "asterisk" literally. Acceptable pattern when a legend explaining the convention is present — but no such legend exists here.

  **File:** `src/app/contact/page.tsx:109`
  **WCAG:** 3.3.2 Labels or Instructions
  **Severity:** Minor
  **Fix:** Add a note near the top of the form: `<p className="text-xs text-gray-500 mb-4"><span aria-hidden="true">*</span> Required fields</p>` and add `aria-required="true"` to the required inputs (currently only `required` HTML attribute is used, which is sufficient but `aria-required` is belt-and-suspenders for older AT).

- The success state (line 69-91): `h2` "Message Sent" — correctly nested inside `<main>` with no `h1` sibling since the form replaces the content. Minor: the success div has no `role="alert"` or `aria-live`, so screen reader users may not know the form submitted.

  **File:** `src/app/contact/page.tsx:69`
  **WCAG:** 4.1.3 Status Messages
  **Severity:** Major
  **Fix:** Add `role="status"` or `role="alert"` to the success confirmation div so screen readers announce it automatically.

### 3.8 Login Page (`src/app/account/login/page.tsx`)

**Status: PASS with notes**

- `h1`: "Sign In to Your Account" (line 51) — correct
- Email input has `<label htmlFor="email">` — correct.
- Error state has `role="alert"` — correct.
- `h2` in success state: "Check your email" (line 70) — correct nesting.
- **Issue:** The success state email confirmation div (line 57-83) has no `role="status"` or `aria-live`. Screen reader users who submit the form may not hear the "Check your email" message.

  **File:** `src/app/account/login/page.tsx:57`
  **WCAG:** 4.1.3 Status Messages
  **Severity:** Major
  **Fix:** Add `role="status"` to the success div or use an `aria-live="polite"` region that reveals the message on state change.

---

## 4. ARIA Labels on Interactive Elements

### 4.1 Navigation (`src/components/Nav.tsx`)

**Status: PASS**

- `<nav aria-label="Main navigation">` (line 52) — correct
- Hamburger button: `aria-label={mobileOpen ? "Close menu" : "Open menu"}`, `aria-expanded={mobileOpen}`, `aria-controls="mobile-nav"` (lines 123-125) — correct
- Mobile menu div: `aria-hidden={!mobileOpen}` (line 148) — correct
- All SVG icons: `aria-hidden="true"` — correct

### 4.2 Search Modal (`src/components/SearchModal.tsx`)

**Status: FAIL**

- Trigger button: `aria-label="Search (Ctrl+K)"` (line 187) — correct
- Modal: `role="dialog"`, `aria-modal="true"`, `aria-label="Search"` (lines 210-212) — correct
- `role="status" aria-live="polite"` for result count (line 260) — correct
- `Command.Input` (line 241): Uses the `cmdk` library's `Command.Input`. This renders an `<input>` internally. The input is accessible via placeholder only — there is no explicit `aria-label` or associated `<label>` on the Command.Input.

  **File:** `src/components/SearchModal.tsx:241`
  **WCAG:** 1.3.1 Info and Relationships / 4.1.2 Name, Role, Value
  **Severity:** Major
  **Fix:** Add `aria-label="Search products, articles, and FAQs"` directly to `<Command.Input>`.

### 4.3 Product Carousel (`src/components/ProductCarousel.tsx`)

**Status: PASS**

- Container: `aria-roledescription="carousel"`, `aria-label="Featured compliance products"` (lines 57-58) — correct
- Live region: `aria-live="polite"`, `aria-atomic="true"` (line 64) — correct
- Prev/Next buttons: `aria-label="Previous product"` / `aria-label="Next product"` (lines 136, 145) — correct
- Dot buttons: `aria-label="Go to product N"`, `aria-current={i === current ? "true" : undefined}` (lines 158-159) — correct
- Pause/Play: `aria-label={paused ? "Play carousel" : "Pause carousel"}` (line 173) — correct
- Reduced motion respected via `prefers-reduced-motion` check — correct

### 4.4 Dark Mode Toggle (`src/components/DarkModeToggle.tsx`)

**Status: PASS**

- `aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}` (line 31)
- `aria-pressed={isDark}` (line 32) — correct
- Icons: `aria-hidden="true"` (lines 39, 53) — correct

### 4.5 SoftScrollButton (`src/components/SoftScrollButton.tsx`)

**Status: FAIL — missing accessible name context**

The button (line 31) renders `{children}` as the label. On the product page it is used as:
```
<SoftScrollButton targetId="generator" className="...">
  Customize Now — ${reg.price}
</SoftScrollButton>
```
This is acceptable — children provide the accessible name. However, the component fades out `document.body` entirely (`opacity: 0`) for 100ms during scroll, which would cause visual disorientation for users with photosensitivity or vestibular disorders, potentially violating WCAG 2.3.3 (Animation from Interactions, AAA) and possibly causing issues at AA level for users with vestibular sensitivities.

Additionally, this manipulation sets `document.body.style.opacity = "0"` without checking `prefers-reduced-motion`.

**File:** `src/components/SoftScrollButton.tsx:15-27`
**WCAG:** 2.3.3 Animation from Interactions (AAA) / best practice
**Severity:** Minor (AA impact limited; AAA violation)
**Fix:** Check `window.matchMedia("(prefers-reduced-motion: reduce)").matches` — if true, skip the fade and scroll directly.

### 4.6 Footer (`src/components/Footer.tsx`)

**Status: PASS with notes**

- Three `<nav>` elements with distinct `aria-label` values: "Products", "Resources", "Company" (lines 10, 22, 34) — correct
- Fourth column ("Get in Touch") uses `<div>` not `<nav>` — acceptable since it contains one link and paragraph text, not navigation.
- **Issue:** `h4` elements (lines 11, 23, 35, 47) are used as section headings within the footer columns. The footer `<footer>` element has no `aria-label`, but is a landmark. The `h4` headings appear without any `h2` or `h3` ancestors inside `<footer>` — this skips from the page's last `h2` down to `h4`.

  **File:** `src/components/Footer.tsx:11`
  **WCAG:** 1.3.1 Info and Relationships
  **Severity:** Minor
  **Fix:** Change `h4` to `h2` or `h3` in the footer columns. Since footer is its own landmark, heading levels within it can restart, but using `h2` would be most semantically correct.

---

## 5. Form Labels

### 5.1 Contact Form (`src/app/contact/page.tsx`)

**Status: PASS** — All inputs have `htmlFor`/`id` pairs. Covered in section 3.7.

### 5.2 Login Form (`src/app/account/login/page.tsx`)

**Status: PASS** — Email input has `<label htmlFor="email">`. Covered in section 3.8.

### 5.3 Questionnaire — StepCompanyInfo (`src/components/questionnaire/StepCompanyInfo.tsx`)

**Status: PASS**

All four inputs have associated labels:
- `htmlFor="companyName"` / `id="companyName"` (lines 19, 25)
- `htmlFor="state"` / `id="state"` (lines 33, 37)
- `htmlFor="companySize"` / `id="companySize"` (lines 46, 50)
- `htmlFor="industry"` / `id="industry"` (lines 64, 68)

### 5.4 Questionnaire — StepAISystems (`src/components/questionnaire/StepAISystems.tsx`)

**Status: PASS with notes**

- Dynamic inputs use indexed IDs (`aiName-${idx}`, `aiVendor-${idx}`, `aiDesc-${idx}`) with matching `htmlFor` — correct
- `<fieldset>` / `<legend>` for the decisions checkboxes (lines 82-104) — correct
- **Issue:** The checkbox labels inside the fieldset (line 91) use `<label>` wrapping `<input type="checkbox">` — correct pattern, but the `<input>` has no explicit `id` and the label wraps it (implicit label). This is valid but may have issues with older AT. Not a defect at WCAG AA.

### 5.5 Questionnaire — StepDataBias (`src/components/questionnaire/StepDataBias.tsx`)

**Status: PASS**

- Two `<fieldset>` / `<legend>` blocks for data inputs (lines 48-69) and protected characteristics (lines 72-98) — correct
- Bias audit select: `htmlFor="biasAudit"` / `id="biasAudit"` (lines 102, 111) — correct

### 5.6 Questionnaire — StepOversight (`src/components/questionnaire/StepOversight.tsx`)

**Status: PASS**

All selects and inputs have proper labels. `aria-required="true"` on aiRole select (line 44). Correct.

### 5.7 Questionnaire — StepContact (`src/components/questionnaire/StepContact.tsx`)

**Status: FAIL — aria-required mismatch**

- `contactEmail` input (line 53-62): Has `aria-required="true"` (line 58) but the `<label>` says "Email" with no asterisk indicating required, and the HTML `required` attribute is absent. This is contradictory — `aria-required` declares it required to AT, but form validation will not enforce it and the visual UI does not indicate it is required.

  **File:** `src/components/questionnaire/StepContact.tsx:58`
  **WCAG:** 3.3.2 Labels or Instructions / 1.3.1 Info and Relationships
  **Severity:** Major
  **Fix:** Either remove `aria-required="true"` (if the field is truly optional) or add `required` HTML attribute AND a visual required indicator (`*`) to the label to make the requirement consistent across all three modalities (visual, AT, validation).

### 5.8 Questionnaire — StepReviewCheckout (`src/components/questionnaire/StepReviewCheckout.tsx`)

**Status: PASS with notes**

- Acknowledgment checkbox (line 226-237) uses a wrapping `<label>` — correct
- `aria-describedby="acknowledgment-text"` on the checkout button (line 298) — good practice
- Add-on checkboxes (line 252-263) use wrapping `<label>` — correct
- **Issue:** When `!isFrameworkGate && !lawVisited`, the acknowledgment checkbox is `disabled`. Disabled form elements are not announced by all screen readers and provide no explanation of why they are disabled. A user may not understand they need to visit the law link first.

  **File:** `src/components/questionnaire/StepReviewCheckout.tsx:231`
  **WCAG:** 3.3.2 Labels or Instructions
  **Severity:** Minor
  **Fix:** Add `aria-disabled="true"` along with `aria-describedby` pointing to the gate text paragraph explaining the requirement. Alternatively, add a visually-hidden hint: "Visit the law link above before checking this box."

### 5.9 ProductLibrary Search Input (`src/components/ProductLibrary.tsx:187`)

**Status: FAIL — no label** — covered in section 3.6.

---

## 6. Alt Text on Images

### 6.1 Nav Logo (`src/components/Nav.tsx:57`)

`<Image src="/logo.png" alt="AI Compliance Documents" width={36} height={36} />`
**Status: PASS** — descriptive alt text present.

### 6.2 Product Preview Image (`src/app/products/[slug]/page.tsx:395-403`)

`alt={`Sample document preview for ${reg.shortName}`}`
**Status: PASS** — dynamic, descriptive alt.

### 6.3 Blog Post Images (`src/app/blog/page.tsx:79-83` and `src/app/blog/[slug]/page.tsx:144`)

Both use `alt={post.title}` — the post title serves as alt text.
**Status: PASS** — acceptable; post titles describe the image content since images illustrate the article topic.

No `<img>` or `<Image>` elements without alt text were found.

---

## 7. Semantic HTML

### 7.1 Page-Level Landmarks

**Status: PASS**

All audited pages use:
- `<nav aria-label="...">` (Nav component)
- `<main id="main-content">` (all pages)
- `<footer>` (Footer component)
- `<header>` used for hero sections (pages: home, blog, products, blog post, product detail) — correct use
- `<article>` in blog listing cards (line 74) and blog post page (line 123) — correct
- `<aside aria-label="...">` for blog post sidebars (lines 197, 289) — correct
- `<section aria-label="Blog posts">` in blog listing (line 65) — correct

### 7.2 `<details>` / `<summary>` Accordion Pattern

**Status: PASS**

Used for FAQ (home page), blog post progressive disclosure, and ProductLibrary guide. The `summary::-webkit-details-marker { display: none; }` is present in globals.css to remove default browser marker. Custom SVG chevron is `aria-hidden="true"`. Focus ring defined in globals.css on `summary:focus-visible`. Correct pattern.

### 7.3 Multiple `<main>` Elements

**Status: PASS** — Only one `<main>` per page render.

### 7.4 `<nav>` Inside `<footer>`

**Status: PASS** — three distinct `<nav aria-label>` inside footer, per HTML5 specification. Correct.

### 7.5 `<header>` Usage

**Status: MINOR NOTE**

The home page uses `<header className="hero-bg ...">` (line 142) inside `<main>`, and separately `<header>` is used inside `<article>` on the blog post page. These are valid HTML5 uses of `<header>` as a sectioning element's header, not the page-level landmark. However, some older AT may announce these as "banner" landmarks. Not a defect at WCAG AA.

---

## 8. Keyboard Focus Indicators

### 8.1 Global Focus Styles (`src/app/globals.css:38-60`)

**Status: PASS**

```css
a:focus-visible, button:focus-visible, summary:focus-visible {
  outline: 2px solid #1e40af;
  outline-offset: 2px;
}
```

Dark mode variant uses `#93c5fd` with a box-shadow offset ring for visibility on dark backgrounds. Correct.

```css
input:focus, select:focus, textarea:focus {
  outline: 2px solid #1e40af;
  outline-offset: 2px;
  box-shadow: none;
}
```

Note: Form inputs use `focus` (not `focus-visible`). This means focus rings always show for inputs, including on mouse click. This is intentional and generally acceptable for form inputs per WCAG 2.4.11.

### 8.2 Focus Ring on Custom Checkbox

Checkboxes use `accent-color: #1e40af` which affects the checkbox fill but not the focus outline. The browser's default focus ring applies. **Status: PASS** — browser default focus ring is acceptable at AA level.

### 8.3 Dark Toggle Button (`src/components/DarkModeToggle.tsx`)

The `.dark-toggle` CSS class (globals.css:157) does not define a `focus-visible` style. The global `button:focus-visible` rule covers it.
**Status: PASS**.

### 8.4 Tailwind `focus:outline-none` Usage

Questionnaire inputs use `focus:ring-2 focus:ring-blue-500` in their className (e.g., StepCompanyInfo.tsx:29). These Tailwind classes define a box-shadow focus ring but also `outline: none` is implied. Let's check: in globals.css line 19-22, `input:focus` sets `outline: 2px solid #1e40af; box-shadow: none`. This overrides Tailwind's ring at the global level, ensuring a proper outline always appears. **Status: PASS**.

However, the contact form inputs use `focus:outline-none focus:ring-2 focus:ring-blue-700` in the `inputClass` string (contact/page.tsx:53-54). Combined with globals.css line 19, the input will show the global outline. But the Tailwind `focus:outline-none` explicitly removes the outline on focus — this competes with the global CSS. The specificity of the Tailwind class (`input:focus { outline: ... }` in globals) likely wins over Tailwind's utility class, but this is fragile.

**File:** `src/app/contact/page.tsx:53`
**WCAG:** 2.4.11 Focus Appearance (AA in WCAG 2.2)
**Severity:** Minor
**Fix:** Remove `focus:outline-none` from the `inputClass` string since globals.css already handles input focus styling globally.

---

## 9. Tab Order

### 9.1 General Tab Order

**Status: PASS**

DOM order reflects visual order throughout. No `tabindex` values other than `-1` (used intentionally for focus management in Questionnaire step heading ref at line 359, `tabIndex={-1}`).

### 9.2 Mobile Menu Focus Trap

**Status: PASS**

`src/components/Nav.tsx:14-41` implements a proper keyboard trap for the mobile menu:
- Escape closes the menu and returns focus to the hamburger button
- Tab/Shift+Tab cycles through focusable items within the menu
- Correct implementation.

### 9.3 Search Modal Focus Management

**Status: PASS**

- Previous focus stored (`previousFocus.current = document.activeElement`) before opening
- On close, `previousFocus.current?.focus()` returns focus — correct
- `autoFocus` on `Command.Input` moves focus into the modal on open
- Escape key closes the modal — correct
- `role="dialog"` with `aria-modal="true"` — correct

### 9.4 Questionnaire Step Transitions

**Status: PASS**

`src/components/Questionnaire.tsx:79-87` moves focus to a visually-hidden `<h2 ref={stepHeadingRef} tabIndex={-1}>` on step change, announcing the new step to screen readers. The skip on first mount (lines 82-85) prevents unwanted auto-scroll. Correct implementation.

### 9.5 Disabled Checkout Button Tab Reach

**Status: PASS**

The disabled checkout button (`StepReviewCheckout.tsx:294`) uses `disabled` attribute. Disabled buttons are not focusable by tab by default in most browsers. The button is visually styled to show it is inactive. Users can still reach it conceptually through the acknowledgment checkbox flow.

---

## 10. Screen Reader Text (`sr-only`)

### 10.1 Usage Survey

`sr-only` is used correctly in:
- Skip navigation link (Nav.tsx:47)
- SR-only `h1` on homepage (`sr-only` at page.tsx:143)
- SR-only h2 on products page (products/page.tsx:77)
- Questionnaire step heading ref (Questionnaire.tsx:362)
- "Opens in new tab" indicators on external links (products/[slug]/page.tsx:550, 551, etc.)
- Search result count live region (SearchModal.tsx:260)

**Status: PASS** — sr-only used appropriately throughout.

### 10.2 Missing "Opens in New Tab" Indicators

**Status: FAIL — inconsistent**

External links in blog post body content rendered via `renderMarkdown` (`src/lib/mdx-to-jsx.tsx`) — not audited directly (MDX renderer). External links rendered via `renderWithLinks` in blog post page (`blog/[slug]/page.tsx:62-73`) do NOT include an `<span className="sr-only">(opens in new tab)</span>` indicator, unlike the statute citation links elsewhere which do.

**File:** `src/app/blog/[slug]/page.tsx:62`
**WCAG:** 2.4.4 Link Purpose (In Context) / G201
**Severity:** Minor
**Fix:** Add `<span className="sr-only"> (opens in new tab)</span>` inside the `renderWithLinks` anchor at line 66.

Additionally, micro-fact links in the right margin (`blog/[slug]/page.tsx:303`) do not have the sr-only indicator, while the mobile versions (line 249) do. Inconsistency.

**File:** `src/app/blog/[slug]/page.tsx:303`
**WCAG:** 2.4.4 Link Purpose
**Severity:** Minor
**Fix:** Add `<span className="sr-only"> (opens in new tab)</span>` to the desktop micro-fact anchor.

---

## 11. Issues Not Found (Confirmed Pass)

The following were checked and found to be compliant:

- No `<table>` elements without headers found
- No `<iframe>` elements found
- All `aria-live` regions use correct politeness levels
- Carousel meets WCAG 2.2.2 Pause, Stop, Hide (pause/play button present, respects `prefers-reduced-motion`)
- `role="progressbar"` on questionnaire progress bar with `aria-valuenow`, `aria-valuemin`, `aria-valuemax` (Questionnaire.tsx:341-347)
- `role="alert"` on error messages in contact form, login form, and questionnaire
- All `<svg>` decorative icons have `aria-hidden="true"`
- Dark mode focus rings correctly adapted for dark backgrounds in globals.css

---

## Consolidated Issue List

| # | File | Line | Issue | WCAG Criterion | Severity |
|---|------|------|-------|----------------|----------|
| 1 | `src/app/page.tsx` | 276 | Section landmark has no heading or aria-label | 1.3.1, 2.4.6 | Minor |
| 2 | `src/app/products/[slug]/page.tsx` | 562 | Sidebar purchase card missing heading | 1.3.1, 2.4.6 | Major |
| 3 | `src/app/products/[slug]/page.tsx` | 78 | StatusBadge color dot missing `aria-hidden` | 1.3.3 | Minor |
| 4 | `src/components/ProductLibrary.tsx` | 108 | DeadlineBanner `h3` skips from page `h1` (should be `h2`) | 1.3.1, 2.4.6 | Major |
| 5 | `src/components/ProductLibrary.tsx` | 187 | Search input has no `<label>` element | 1.3.1, 3.3.2 | Major |
| 6 | `src/app/blog/page.tsx` | 78,103 | Duplicate links on blog cards (image + title both link to same URL) | 2.4.4, 4.1.1 | Minor |
| 7 | `src/components/SearchModal.tsx` | 241 | `Command.Input` has no explicit `aria-label` | 1.3.1, 4.1.2 | Major |
| 8 | `src/app/contact/page.tsx` | 69 | Success confirmation not announced to screen readers (no role/live) | 4.1.3 | Major |
| 9 | `src/app/contact/page.tsx` | 109 | Required field asterisks not explained to screen readers | 3.3.2 | Minor |
| 10 | `src/app/account/login/page.tsx` | 57 | Login success state not announced (no role/live) | 4.1.3 | Major |
| 11 | `src/components/questionnaire/StepContact.tsx` | 58 | `aria-required="true"` on email but field not visually marked required and no `required` attribute | 3.3.2, 1.3.1 | Major |
| 12 | `src/components/questionnaire/StepReviewCheckout.tsx` | 231 | Disabled checkbox provides no explanation of why it is disabled | 3.3.2 | Minor |
| 13 | `src/components/SoftScrollButton.tsx` | 15 | Body fade ignores `prefers-reduced-motion` | 2.3.3 (AAA) | Minor |
| 14 | `src/app/contact/page.tsx` | 53 | `focus:outline-none` in inputClass may conflict with global focus CSS | 2.4.11 | Minor |
| 15 | `src/components/Footer.tsx` | 11 | Footer column headings use `h4` without ancestor `h2`/`h3` | 1.3.1 | Minor |
| 16 | `src/app/blog/[slug]/page.tsx` | 62 | `renderWithLinks` external links missing sr-only "opens in new tab" | 2.4.4 | Minor |
| 17 | `src/app/blog/[slug]/page.tsx` | 303 | Desktop micro-fact links missing sr-only "opens in new tab" (mobile has it) | 2.4.4 | Minor |

### Severity Counts

| Severity | Count |
|----------|-------|
| Critical | 0 |
| Major | 7 |
| Minor | 10 |
| **Total** | **17** |

---

## Priority Fixes

**Do first (Major, user-blocking):**

1. **ProductLibrary search input label** (#5) — Every visitor using AT who lands on the products or home page cannot determine the purpose of the search box.
2. **SearchModal Command.Input label** (#7) — The primary site search has no accessible name on the actual input element.
3. **Contact form success not announced** (#8) — Users who submit the contact form have no AT feedback on success.
4. **Login success not announced** (#10) — Same pattern on the login form.
5. **StepContact aria-required mismatch** (#11) — Contradictory signals between AT-declared requirement and visual/validation behavior.
6. **DeadlineBanner h3 skip** (#4) — Heading hierarchy error on the primary product listing page.
7. **Product page sidebar missing heading** (#2) — The purchase card on product pages is a major conversion-critical region with no screen reader landmark.
