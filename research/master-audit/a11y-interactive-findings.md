# Accessibility Audit — Interactive Elements & Mobile
**Scope:** WCAG 2.1 AA — Touch targets, forms, loading states, dark mode contrast, responsive text, motion, timeouts, error recovery, mobile nav, zoom
**Auditor:** Agent C (Interactive/Mobile)
**Date:** 2026-03-24
**Method:** Static code analysis of all components and pages

---

## Summary

The site has a notably strong accessibility baseline. Skip links, focus management, mobile nav focus trapping, and aria-live regions are all correctly implemented. The critical issues are concentrated in three areas: (1) loading/spinner states lack screen-reader announcements, (2) the Quick Purchase mini-form has inputs with no `id`/`for` pairing, and (3) several buttons fall below 44×44px touch target when the element's padding collapses on mobile.

| Severity | Count |
|----------|-------|
| Critical | 3 |
| Serious | 5 |
| Moderate | 7 |
| Minor | 4 |

---

## 1. Touch Target Size (WCAG 2.5.5 — Target Size, Level AA)

### 1.1 PurchaseRedownloadButton — below 44×44px
**File:** `src/app/account/purchases/PurchaseRedownloadButton.tsx:57`
**Issue:** The button uses `px-4 py-2` which renders approximately 36px tall. No `min-h-[44px]` is applied, unlike other buttons in the codebase.
**WCAG:** 2.5.5 Target Size
**Severity:** Serious
**Fix:** Add `min-h-[44px]` to the button's className.

```tsx
// Current
className="inline-flex items-center gap-2 bg-blue-800 text-white px-4 py-2 rounded-lg ..."

// Fixed
className="inline-flex items-center gap-2 bg-blue-800 text-white px-4 py-2 rounded-lg min-h-[44px] ..."
```

### 1.2 PersonalizedDocPreview — document tab buttons below 44×44px
**File:** `src/components/PersonalizedDocPreview.tsx:165`
**Issue:** Document-tab switcher buttons use `min-h-[32px]` — explicitly undersized. On mobile these are the only way to switch between document previews.
**WCAG:** 2.5.5 Target Size
**Severity:** Serious
**Fix:** Change `min-h-[32px]` to `min-h-[44px]`.

### 1.3 PostPaymentHandler — email "Remove recipient" button
**File:** `src/components/PostPaymentHandler.tsx:734–742`
**Issue:** The `&times;` remove-recipient button has only `p-1` padding — approximately 28px click area.
**WCAG:** 2.5.5 Target Size
**Severity:** Moderate
**Fix:** Add `min-w-[44px] min-h-[44px] flex items-center justify-center` to the button.

### 1.4 PostPaymentHandler — "Add another recipient" link-style button
**File:** `src/components/PostPaymentHandler.tsx:749–769`
**Issue:** The "Add another recipient" button has no min-height constraint. At small text size it renders below 44px tall.
**WCAG:** 2.5.5 Target Size
**Severity:** Moderate
**Fix:** Add `min-h-[44px] flex items-center` to className.

### 1.5 PostPaymentHandler — error banner dismiss button
**File:** `src/components/PostPaymentHandler.tsx:461`
**Issue:** The `&times;` close button on the fixed red error banner has `className="absolute top-2 right-4 text-white text-xl"` — no sizing constraints. Tap target is too small.
**WCAG:** 2.5.5 Target Size
**Severity:** Moderate
**Fix:** Add `min-w-[44px] min-h-[44px] flex items-center justify-center` to the button.

---

## 2. Form Validation and Error Messages

### 2.1 Quick Purchase mini-form — inputs missing `id` and `htmlFor`
**File:** `src/components/PostPaymentHandler.tsx:511–597`
**Issue:** All four inputs in the Quick Purchase mini-form (Company Name, AI Tool Name, AI Role, Contact Name) use `<label>` with no `htmlFor` attribute, and the `<input>` elements have no `id` attributes. Screen readers cannot associate labels with inputs. The label text is visually present but programmatically detached.
**WCAG:** 1.3.1 Info and Relationships, 4.1.2 Name, Role, Value
**Severity:** Critical
**Fix:** Add matching `id` to each input and `htmlFor` on the corresponding label:

```tsx
<label htmlFor="qp-company" ...>Company Name</label>
<input id="qp-company" type="text" .../>
```

### 2.2 Quick Purchase mini-form — field errors not announced to screen readers
**File:** `src/components/PostPaymentHandler.tsx:528–530`
**Issue:** Inline field error messages (e.g., `"Required"`) are rendered as `<p className="text-red-500 ...">` with no `role="alert"` or `aria-live`. They appear visually on submit, but assistive technology users will not be notified.
**WCAG:** 3.3.1 Error Identification
**Severity:** Critical
**Fix:** Add `role="alert"` to each error paragraph, or add `aria-describedby` on the input pointing to the error element.

### 2.3 Contact page — submit button lacks `min-h` for mobile
**File:** `src/app/contact/page.tsx:194`
**Issue:** The submit button uses `px-8 py-3` which is approximately 42px on most font sizes — marginally below 44px. No `min-h-[44px]` is set.
**WCAG:** 2.5.5 Target Size
**Severity:** Minor
**Fix:** Add `min-h-[44px]` to the submit button.

### 2.4 Contact page — dark mode label colors not overridden
**File:** `src/app/contact/page.tsx:108,122,138,152,169`
**Issue:** Form labels use `text-gray-700` but the dark mode CSS in `globals.css` does not remap `text-gray-700` to a light color on the form page (which has a white background in light mode, but the labels carry no `dark:` variant). In dark mode the label text remains `#cbd5e1` (per global.css line 90) on `bg-white` which becomes `#1e293b` — contrast ratio is approximately 5.9:1, which passes, but the `font-semibold text-gray-700` on a dark background is correct only because the global rule catches it. This is fragile — verify in production. No immediate fix needed but flag for verification.
**Severity:** Minor (monitoring)

### 2.5 StepContact — contactEmail has `aria-required="true"` but field is not actually required
**File:** `src/components/questionnaire/StepContact.tsx:59`
**Issue:** The email field in StepContact carries `aria-required="true"`, but the `validate()` function in `Questionnaire.tsx` only requires `contactName` (step 5 case). This is misleading — screen reader users will be told the email is required when it is not enforced. The star `*` marker is also absent for this field.
**WCAG:** 3.3.2 Labels or Instructions
**Severity:** Moderate
**Fix:** Remove `aria-required="true"` from `contactEmail` input, or add validation to match the annotation.

---

## 3. Loading States / Spinners

### 3.1 PostPaymentHandler — verifying payment spinner has no screen-reader announcement
**File:** `src/components/PostPaymentHandler.tsx:471–486`
**Issue:** The "Verifying your payment..." modal contains a spinning `div` (`animate-spin`) and text, but there is no `role="status"` or `aria-live` region. When the modal appears (replacing page content), a screen reader user may not be notified. The dialog has `role="dialog" aria-modal="true" aria-label="Verifying payment"` which is correct, but the spinner itself has `aria-hidden` not set, meaning the non-semantic spin animation div is in the accessibility tree unnecessarily.
**WCAG:** 4.1.3 Status Messages
**Severity:** Serious
**Fix:** Add `aria-hidden="true"` to the spinner div. Add a `role="status"` paragraph alongside the visible text so that when the modal renders it is announced:

```tsx
<div className="w-12 h-12 border-4 ... animate-spin" aria-hidden="true" />
<p role="status" className="text-lg font-semibold text-gray-900">
  Verifying your payment...
</p>
```

### 3.2 PurchaseRedownloadButton — generating spinner not announced
**File:** `src/app/account/purchases/PurchaseRedownloadButton.tsx:59–70`
**Issue:** When generating, the button shows a spinning icon (`animate-spin`) and "Generating..." text. The button is `disabled` which removes it from interaction, but the state change to "generating" is not announced via `aria-live`. Users who already have focus on the button will not know the state changed.
**WCAG:** 4.1.3 Status Messages
**Severity:** Moderate
**Fix:** Add `aria-live="polite"` wrapper around the button label text, or use `aria-label` that updates dynamically:

```tsx
aria-label={status === "generating" ? "Generating documents, please wait" : "Re-download documents"}
```

### 3.3 PersonalizedDocPreview — loading state not announced
**File:** `src/components/PersonalizedDocPreview.tsx:148–154`
**Issue:** The `animate-pulse` loading skeleton has a plain `<p>` with "Generating your documents..." but no `role="status"` or `aria-live` attribute. Screen readers will not announce this loading state.
**WCAG:** 4.1.3 Status Messages
**Severity:** Moderate
**Fix:** Add `role="status"` to the wrapping div or the paragraph.

### 3.4 DocumentSamplePreview — loading state has no screen-reader notification
**File:** `src/components/DocumentSamplePreview.tsx:113` (loading spinner section)
**Issue:** Similar to 3.3 above — the loading indicator inside DocumentSamplePreview has no `role="status"` or `aria-live` region.
**WCAG:** 4.1.3 Status Messages
**Severity:** Moderate
**Fix:** Add `role="status"` to the loading container.

---

## 4. Dark Mode Contrast

### 4.1 SearchModal — TYPE_COLORS pill in dark mode: unaddressed
**File:** `src/components/SearchModal.tsx:17–22`
**Issue:** The type-pill colors (`bg-blue-100 text-blue-700`, `bg-emerald-100 text-emerald-700`, `bg-amber-100 text-amber-700`) are hardcoded Tailwind classes. The dark mode CSS in `globals.css` maps `text-blue-700` to `#60a5fa` but does not remap `bg-blue-100`. In dark mode, `bg-blue-100` stays as its Tailwind default (approximately `#dbeafe`) but the modal background becomes `#1e293b`. The pill background `#dbeafe` remains light with dark text `#60a5fa` — this gives approximately 2.9:1 contrast, below the 4.5:1 requirement.
**WCAG:** 1.4.3 Contrast (Minimum)
**Severity:** Serious
**Fix:** Add dark mode variants to the TYPE_COLORS constant:

```tsx
const TYPE_COLORS: Record<string, string> = {
  product: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  blog: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
  faq: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
};
```

### 4.2 SearchModal — footer kbd elements in dark mode
**File:** `src/components/SearchModal.tsx:347–354`
**Issue:** The `<kbd>` elements use `bg-gray-100 border-gray-200 text-[10px]`. In dark mode, `bg-gray-100` stays light (no override in globals.css) while the surrounding modal becomes dark. This creates a jarring but legible contrast — however the modal's `bg-white rounded-xl` has no dark override in globals.css (the modal is only active when dark class is on html). The Command palette background remains white in dark mode. This is a separate issue — the whole SearchModal has no dark mode background styling applied.
**WCAG:** 1.4.3 Contrast (Minimum)
**Severity:** Serious
**Fix:** Add dark mode background to the Command palette container:

```tsx
className="relative w-full max-w-xl bg-white dark:bg-slate-800 rounded-xl ..."
```
Also update input placeholder, border, and text colors with `dark:` variants throughout SearchModal.

---

## 5. Responsive Text Sizing

### 5.1 No `user-scalable` restriction found — PASS
The root `<html>` element does not set a `<meta name="viewport" content="..., user-scalable=no">`. Next.js's default viewport tag allows user scaling. No viewport meta is found in the layout. This means browser zoom and pinch-zoom are fully supported. **Pass.**

### 5.2 Text sizing uses rem/Tailwind classes throughout — PASS
All text uses Tailwind responsive classes (e.g., `text-sm`, `sm:text-base`, `md:text-lg`). No pixel-locked text found in source. **Pass.**

---

## 6. Motion / Animation

### 6.1 SoftScrollButton — fade animation ignores `prefers-reduced-motion`
**File:** `src/components/SoftScrollButton.tsx:14–27`
**Issue:** The component manually sets `document.body.style.transition = "opacity 100ms ease-out"` and fades the entire page body. This animation is NOT gated by `prefers-reduced-motion`. The global CSS correctly handles most animations, but this JS-driven opacity transition bypasses it entirely.
**WCAG:** 2.3.3 Animation from Interactions (AAA) — but also a usability issue for vestibular disorders; at minimum this should respect the media query.
**Severity:** Moderate
**Fix:**

```tsx
function handleClick() {
  const target = document.getElementById(targetId);
  if (!target) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    target.scrollIntoView({ behavior: "instant" as ScrollBehavior });
    return;
  }
  document.body.style.transition = "opacity 100ms ease-out";
  document.body.style.opacity = "0";
  setTimeout(() => {
    target.scrollIntoView({ behavior: "instant" as ScrollBehavior });
    requestAnimationFrame(() => {
      document.body.style.transition = "opacity 150ms ease-in";
      document.body.style.opacity = "1";
    });
  }, 100);
}
```

### 6.2 ProductCarousel — correctly respects `prefers-reduced-motion` — PASS
**File:** `src/components/ProductCarousel.tsx:13–29`
The carousel reads `window.matchMedia("(prefers-reduced-motion: reduce)").matches` on mount and disables auto-advance if true. Pause/play button is present. **Pass.**

### 6.3 Global CSS reduced-motion override — PASS
**File:** `src/app/globals.css:63–70`
The `@media (prefers-reduced-motion: reduce)` block correctly disables all animations and transitions. **Pass.**

---

## 7. Timeout Warnings

### 7.1 No session timeouts with warnings found — PASS
The site uses NextAuth magic link auth (24-hour expiry per login page copy). There are no timed UI interactions that would trap users or expire without warning. The questionnaire persists to `sessionStorage`. **Pass — no WCAG 2.2.1 violations found.**

---

## 8. Error Recovery

### 8.1 Questionnaire — error shown but focus not moved to error region
**File:** `src/components/Questionnaire.tsx:365–373`
**Issue:** Validation errors render a `role="alert" aria-live="assertive"` div, which is correct for screen reader announcement. However, focus remains on the "Next" button after the error. Sighted keyboard users can see the error, but the error div is above the current focus point. If the form is long, users may not notice the error visually.
**WCAG:** 3.3.1 Error Identification
**Severity:** Minor
**Recommendation:** After setting the error, move focus to the error container: add a `ref` to the error div and call `errorRef.current?.focus()` in the validation failure branch.

### 8.2 Contact form — on error, focus stays on submit button
**File:** `src/app/contact/page.tsx:187–191`
**Issue:** The error div uses `role="alert"` (correct) but focus stays on the submit button after an error. The error renders above the button, so sighted users will see it, and screen readers will announce it via `role="alert"`. This is acceptable but not ideal — the error is announced asynchronously so there may be a race if the user tabs immediately.
**Severity:** Minor
**Recommendation:** Consider adding `tabIndex={-1}` and a `ref` to the alert div, then focusing it on error state transition.

### 8.3 Questionnaire form data preserved through cancellation — PASS
If a user cancels checkout, `sessionStorage` preserves all form data and the questionnaire restores from it on return. The cancelled payment banner is shown. **Pass.**

### 8.4 Login page — error recovery is clean — PASS
Login error state shows a `role="alert"` div and allows re-submission without data loss. **Pass.**

---

## 9. Mobile Nav Accessibility

### 9.1 Mobile nav — generally well-implemented — PASS
**File:** `src/components/Nav.tsx:14–41`
- Escape key closes menu and returns focus to hamburger button ✓
- Tab/Shift+Tab focus trap works correctly ✓
- `aria-expanded`, `aria-controls`, `aria-hidden` all correctly set ✓
- Hamburger has descriptive `aria-label` that updates with state ✓
- All mobile nav links have `min-h-[44px]` ✓
- Skip link present and visible on focus ✓

### 9.2 Mobile nav — `aria-hidden` hides content from AT when closed, but CSS uses max-height transition
**File:** `src/components/Nav.tsx:144–149`, `globals.css:188–189`
**Issue:** The mobile nav uses `max-height: 0; overflow: hidden` with a transition, combined with `aria-hidden={!mobileOpen}`. This is correct — when `aria-hidden="true"`, AT cannot reach the links. However, the transition means content animates in over 0.35s. This is acceptable and WCAG-compliant, but note that `prefers-reduced-motion` does reduce the transition to 0.01ms via the global rule, so this is handled.
**Severity:** None — informational only.

---

## 10. Zoom Support (200% Browser Zoom)

### 10.1 Navigation at 200% — potential overlap
**File:** `src/components/Nav.tsx:55–116`
**Issue:** At 200% zoom the desktop nav links (`hidden md:flex`) will be hidden and replaced by the mobile hamburger menu (which is shown for `md:hidden`). The breakpoint `md` is 768px — at 200% zoom on a 1440px desktop monitor, the effective viewport is 720px, which is below `md`. This means desktop users at 200% zoom get the mobile hamburger menu. This is actually correct responsive behavior and the mobile menu is fully accessible. **Pass.**

### 10.2 Content reflow — no horizontal scrolling found
All sections use `max-w-*` with `px-4` or `px-6` padding and `flex-wrap` or column stacking. No fixed-width containers found in reviewed source. Content should reflow correctly at 320px/200% zoom. **Pass.**

### 10.3 Questionnaire at 200% zoom — PASS
The questionnaire uses `max-w-3xl mx-auto px-4` and responsive step navigation with `flex-col-reverse sm:flex-row`. At 200% zoom the sm breakpoint may not trigger, keeping the layout in single-column mode which is correct. **Pass.**

---

## 11. Additional Findings

### 11.1 ComplianceQuiz — `role="radio"` on `<button>` elements is not ideal
**File:** `src/components/ComplianceQuiz.tsx:274–300`
**Issue:** The `OptionButton` component uses `<button role="radio" aria-checked={selected}>`. While ARIA allows this pattern, it requires the button to be inside a container with `role="radiogroup"` to be semantically correct. The parent div does have `role="radiogroup"` applied at the question level (lines 592, 641, 663, 685). However, the `CheckboxOption` component (line 315) uses `<button role="checkbox" aria-checked={selected}>` — checkboxes with button role should similarly be in a group with `role="group"`, and the Q2 grid does have this (`role="group"` at line 614).
**WCAG:** 4.1.2 Name, Role, Value
**Severity:** Minor — the current implementation is functional but non-standard. Native `<input type="radio">` / `<input type="checkbox">` in a `<fieldset>` would be more robust.

### 11.2 ComplianceQuiz step indicator — step dots not keyboard accessible
**File:** `src/components/ComplianceQuiz.tsx:225–243`
**Issue:** The step indicator dots are non-interactive `div` elements (correct — they're informational only). The container has `aria-label="Step X of Y"`. This is fine. **Pass.**

### 11.3 FAQ accordions — `details`/`summary` correctly implemented
**File:** `src/app/faq/page.tsx:173–303`
The FAQ uses native `<details>`/`<summary>` which have built-in keyboard accessibility and ARIA semantics. `summary:focus-visible` is styled in globals.css. **Pass.**

### 11.4 Search modal — missing `aria-label` on Command.List
**File:** `src/components/SearchModal.tsx:265`
**Issue:** The `Command.List` component (from `cmdk`) renders a `[role="listbox"]`. Without an `aria-label` or `aria-labelledby`, screen readers may announce it as an unlabeled listbox.
**WCAG:** 4.1.2 Name, Role, Value
**Severity:** Minor
**Fix:** Check if `cmdk`'s `Command.List` accepts an `aria-label` prop and pass `"Search results"`.

### 11.5 PostPaymentHandler — orphaned data banner not focusable or announced
**File:** `src/components/PostPaymentHandler.tsx:421–450`
**Issue:** The fixed top banner "You have a saved form in progress" renders as a `div` with no `role="alert"` or `aria-live`. It appears as a fixed overlay but screen readers may not announce it.
**WCAG:** 4.1.3 Status Messages
**Severity:** Moderate
**Fix:** Add `role="alert"` or `aria-live="assertive"` to the outer div.

---

## Issues by Component — Quick Reference

| Component | File | Issues |
|-----------|------|--------|
| PostPaymentHandler | `PostPaymentHandler.tsx` | #2.1 (Critical), #2.2 (Critical), #3.1 (Serious), #1.3, #1.4, #1.5, #11.5 |
| PurchaseRedownloadButton | `PurchaseRedownloadButton.tsx` | #1.1 (Serious), #3.2 |
| PersonalizedDocPreview | `PersonalizedDocPreview.tsx` | #1.2 (Serious), #3.3 |
| SearchModal | `SearchModal.tsx` | #4.1 (Serious), #4.2 (Serious), #11.4 |
| SoftScrollButton | `SoftScrollButton.tsx` | #6.1 |
| StepContact | `questionnaire/StepContact.tsx` | #2.5 |
| Questionnaire | `Questionnaire.tsx` | #8.1 |
| Contact Page | `contact/page.tsx` | #2.3, #8.2 |
| ComplianceQuiz | `ComplianceQuiz.tsx` | #11.1 |
| Nav | `Nav.tsx` | PASS — well-implemented |
| ProductCarousel | `ProductCarousel.tsx` | PASS |
| DarkModeToggle | `DarkModeToggle.tsx` | PASS |
| FAQ Page | `faq/page.tsx` | PASS |
| Login Page | `account/login/page.tsx` | PASS |

---

## Priority Fix List

1. **[Critical]** `PostPaymentHandler.tsx` — Add `id`/`htmlFor` to Quick Purchase mini-form inputs (`#2.1`)
2. **[Critical]** `PostPaymentHandler.tsx` — Add `role="alert"` to inline field error messages (`#2.2`)
3. **[Serious]** `PurchaseRedownloadButton.tsx` — Add `min-h-[44px]` to button (`#1.1`)
4. **[Serious]** `PersonalizedDocPreview.tsx` — Change `min-h-[32px]` to `min-h-[44px]` on tab buttons (`#1.2`)
5. **[Serious]** `PostPaymentHandler.tsx` — Add `aria-hidden` to spinner div, add `role="status"` to text (`#3.1`)
6. **[Serious]** `SearchModal.tsx` — Add dark mode styling to Command palette container and TYPE_COLORS pills (`#4.1`, `#4.2`)
7. **[Moderate]** `PostPaymentHandler.tsx` — Fix dismiss button touch targets and orphaned data banner announcement (`#1.3`, #1.5`, #11.5`)
8. **[Moderate]** `SoftScrollButton.tsx` — Gate fade animation behind `prefers-reduced-motion` check (`#6.1`)
9. **[Moderate]** `StepContact.tsx` — Remove incorrect `aria-required` from email field (`#2.5`)
10. **[Moderate]** `PersonalizedDocPreview.tsx`, `DocumentSamplePreview.tsx` — Add `role="status"` to loading states (`#3.3`, `#3.4`)
