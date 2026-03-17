# Team 3 Findings: Business Model & Checkout Flow Audit
## Date: 2026-03-10

---

## Traced Code Path: Questionnaire → Payment → Documents

The complete flow as implemented:

1. User fills questionnaire across 6 steps in `index.html`
2. On Step 6, user clicks "Generate & Download Documents" → `handleCheckout()` fires (`questionnaire.js:320`)
3. `handleCheckout()` calls `collectFormData()` → saves JSON to `sessionStorage['complianceFormData']` (`questionnaire.js:321–322`)
4. `handleCheckout()` then calls `redirectToStripe()` (`questionnaire.js:325`)
5. `redirectToStripe()` calls `collectFormData()` AGAIN, saves to sessionStorage AGAIN, then executes `window.location.href = STRIPE_CONFIG.paymentLink` (`stripe-checkout.js:65–69`)
6. User lands on Stripe's hosted payment page at `https://buy.stripe.com/00w00lcln4g6fcI5uofYY00`
7. After payment, Stripe *should* redirect to the success URL — **but only if the payment link is configured to do so in the Stripe dashboard** (see Critical Issue #1)
8. On return to `?payment=success`, the `DOMContentLoaded` handler fires `checkPaymentReturn()` (`stripe-checkout.js:74`)
9. `checkPaymentReturn()` reads `sessionStorage['complianceFormData']`, calls `generateComplianceDocuments(data)`, removes the sessionStorage key, and cleans the URL
10. `generateComplianceDocuments()` generates 5 PDFs via jsPDF and triggers browser download for each

---

## Critical Issues

### C1: The Stripe payment link is NOT configured to redirect back to the site

**This is the single biggest failure mode. Every customer who pays will NOT receive their documents unless this is fixed.**

The code defines `successUrl: window.location.origin + '?payment=success'` in `STRIPE_CONFIG` (`stripe-checkout.js:29`), but this value is **never used**. The actual redirect is hardcoded to:

```
window.location.href = STRIPE_CONFIG.paymentLink;
// → https://buy.stripe.com/00w00lcln4g6fcI5uofYY00
```

A Stripe Payment Link's post-payment redirect behavior is **configured in the Stripe Dashboard**, not by the calling page. The `successUrl` field in `STRIPE_CONFIG` is a dead variable — it is defined but never passed to Stripe and has no effect on what Stripe does after payment.

**After the customer pays, Stripe will show its default confirmation page ("Your payment was successful") and stay there. The customer is never redirected back to aicomplydocs.com. `checkPaymentReturn()` never runs. Documents are never generated.**

To fix: In the Stripe Dashboard, edit the payment link → "After the payment" → select "Redirect to URL" → enter `https://aicomplydocs.com?payment=success`. This must be done manually in the dashboard; the code cannot do it.

**Until this is done, every single paid customer receives nothing.**

---

### C2: sessionStorage is fundamentally incompatible with cross-device and cross-tab scenarios — all result in payment with no delivery

sessionStorage is scoped to a single browser tab/window and a single session. It is NOT persisted across:

- **Different device or browser:** A user who starts the form on desktop and completes Stripe payment on their phone (e.g., opened a Stripe email link) returns to a browser with no sessionStorage data. `checkPaymentReturn()` runs, finds nothing, silently does nothing. Customer paid. Customer has no documents.

- **Tab closed during Stripe redirect:** Many users close the Stripe tab or the browser while entering payment details. When they open `aicomplydocs.com?payment=success` later in a new tab, sessionStorage is empty. Same outcome.

- **Session timeout or browser restart:** Some browsers (Safari in particular, and any browser under "private/incognito" mode) aggressively clear sessionStorage. A user who finishes payment with a session gap gets nothing.

- **Browser with sessionStorage disabled:** Rare but possible (enterprise security policies). `sessionStorage.setItem()` throws a `SecurityError`. `handleCheckout()` has no try/catch around the sessionStorage write. The unhandled exception would likely halt execution before `redirectToStripe()` is even called — the user can't even get to Stripe.

- **Two tabs open:** If the user has the site open in two tabs and completes payment, the wrong tab may be the active one on return, creating unpredictable behavior.

**In all of these cases, no error message is shown. No retry mechanism exists. The customer simply does not receive what they paid for with no explanation.**

---

### C3: generateComplianceDocuments() errors are silently swallowed after the point of no return

If `generateComplianceDocuments()` throws an error after the user returns from Stripe (`checkPaymentReturn()` calls it at line 46 of `stripe-checkout.js`), the error is:

- **Not caught by `checkPaymentReturn()`** — there is no try/catch around the `generateComplianceDocuments(data)` call in `checkPaymentReturn()`
- The error in `generateComplianceDocuments()` itself (`pdf-generator.js:683–688`) catches PDF generation failures and updates the button text to "Error — please try again" — but on the success URL return, this button text update is irrelevant because the user has just landed on the page and the questionnaire UI is not in its "Step 6" state

The error is logged to console (`console.error`) and shown briefly on a button the user can't meaningfully interact with. At this point the URL has been cleaned (`window.history.replaceState`), sessionStorage has been deleted, and the user cannot retry.

**Actual failure path:** jsPDF fails to load (CDN down), or `data.company.name` is undefined/corrupted in transit → error thrown → button flashes "Error" → customer is stranded on a homepage with no documents, no data, no way to regenerate.

---

### C4: collectFormData() is called twice — but only the second call's data is stored

`handleCheckout()` (`questionnaire.js:321`) calls `collectFormData()` and saves the result to sessionStorage.

Then it calls `redirectToStripe()` (`questionnaire.js:325`), which calls `collectFormData()` AGAIN (`stripe-checkout.js:65`) and overwrites the same sessionStorage key.

This is harmless in normal operation (the data is identical at the same point in time), but it represents a subtle architectural hazard. If the DOM state changes between the two calls — which cannot happen here synchronously, but could in a future refactored version — the second call's data silently overwrites the first. The duplicate call is unnecessary and creates confusion about which is the authoritative data capture point.

More importantly: `collectFormData()` reads live DOM elements. If any DOM element queried by `collectFormData()` does not exist at call time (e.g., `document.getElementById('bias_audit')` if a step was never rendered), it returns `null`, and `null.value` throws a TypeError. This would happen silently on the first call inside `handleCheckout()` — with no error shown to the user.

---

## Moderate Issues

### M1: No contact email exists anywhere in the codebase

A thorough search of the entire codebase found zero instances of a contact email address belonging to the business. The Terms of Service (section 14) says "contact us at the email address listed on our website." The Privacy Policy (section 8) says the same. **Neither document lists an email address. The website itself lists none.**

A paying customer who encounters any problem has no mechanism to reach the business. There is no:
- Email address on the main site
- Support form
- Chat widget
- Any contact mechanism whatsoever

The Terms and Privacy Policy both point to an email that does not exist on the site. This is a broken promise to customers and creates legal exposure (privacy rights requests that can't be fulfilled).

---

### M2: No confirmation, no receipt, and no re-download path

After document generation:
- No email receipt is sent (no server-side code exists to send one)
- No confirmation page is shown — the button text changes to "Documents Downloaded!" for 5 seconds and resets
- The sessionStorage data is deleted immediately after generation
- The URL is cleaned (`?payment=success` is removed)

If the user's browser silently blocks all 5 download dialogs (common in Firefox and mobile browsers that require user gesture per download), or if downloads complete but the user accidentally closes them, the documents are gone. **There is no re-download path.**

The only way to get the documents again would be to re-enter the entire questionnaire and pay $299 again. The site gives no warning that downloads are one-time only.

---

### M3: The FAQ promises something the system cannot deliver

The FAQ answer to "What if the law changes?" states: *"customers who purchased within the prior 12 months receive updated documents at no additional cost."*

This is an unenforceable promise. The system:
- Does not collect or store any purchaser information
- Has no email list, no account system, no way to identify who purchased
- Cannot notify anyone of updates
- Cannot re-deliver anything

This is a meaningful representation made to customers that the business has no technical capability to fulfill. It creates a legal gap between what is promised and what can be delivered.

---

### M4: Stripe payment link redirect cannot append custom query parameters automatically

The `successUrl` is defined as `window.location.origin + '?payment=success'`, which resolves to `https://aicomplydocs.com?payment=success`.

When a Stripe Payment Link is configured to redirect after payment, Stripe appends UTM parameters to the URL but does NOT append `?payment=success` unless the redirect URL is configured in the dashboard to include it. The `?payment=success` marker is what `checkPaymentReturn()` uses to trigger document generation. If the dashboard redirect URL is set to `https://aicomplydocs.com` without the `?payment=success` query string, `checkPaymentReturn()` will find `params.get('payment') !== 'success'` and silently do nothing.

The developer must configure the dashboard redirect URL as exactly `https://aicomplydocs.com?payment=success`. This is not documented anywhere in the codebase comments. A future maintainer could misconfigure this.

---

### M5: No Stripe webhook — chargebacks are a serious exposure

The business has no server-side code and no Stripe webhook. This means:

- **Chargebacks are uncontestable.** When a customer disputes a charge, Stripe requires merchants to submit evidence within the dispute deadline (5–21 days). Evidence for digital goods must include logs of when the user accessed the content, their IP address, and device information. Since all generation is client-side and no data is stored server-side, **the business has zero evidence to submit.**

- Stripe charges a $15 dispute fee per chargeback (as of 2025), plus an additional $15 if the merchant contests and loses. With no evidence, every dispute is an automatic loss plus $30 in fees on top of the $299 reversal.

- "All sales final" is a merchant policy. Card networks (Visa, Mastercard) do not recognize "all sales final" for digital goods chargebacks under reason codes related to "item not received" or "not as described." The card issuer's rules supersede the merchant's stated policy. Customers who paid and received nothing (due to C1 or C2 above) have a legitimate chargeback claim that the business literally cannot defend.

- Stripe may terminate the merchant account if the chargeback rate exceeds 1% of transactions. With a broken delivery flow, this is a real risk.

---

## Minor Issues

### m1: Script loading order is wrong — stripe-checkout.js loads after pdf-generator.js

`index.html` loads scripts in this order (lines 950–952):
1. `jspdf.umd.min.js`
2. `questionnaire.js`
3. `pdf-generator.js`
4. `stripe-checkout.js`

`stripe-checkout.js` registers a `DOMContentLoaded` listener to run `checkPaymentReturn()`. By the time `stripe-checkout.js` loads, `DOMContentLoaded` has already fired (since the scripts are at the bottom of `<body>`). In practice, `DOMContentLoaded` fires after the HTML is parsed, and these scripts are deferred until after parse — so the event fires, then the scripts execute, and the listener is registered *after* the event already fired.

**This means `checkPaymentReturn()` may never be called on the success URL return.** In most browsers this works by coincidence (the event fires after script execution begins), but it is architecturally fragile and browser-dependent. The correct fix is `window.addEventListener('load', checkPaymentReturn)` or executing `checkPaymentReturn()` directly (not inside a `DOMContentLoaded` listener) since the script loads at the bottom of body.

---

### m2: No validation that sessionStorage data is valid before PDF generation

`checkPaymentReturn()` does `JSON.parse(savedData)` with no error handling. A corrupted sessionStorage value (browser storage bug, encoding issue, or truncation) throws a SyntaxError that is unhandled, leaving the user on the landing page with no documents and no error message.

---

### m3: The "update promised to prior customers" claim in the FAQ contradicts the Terms of Service

The Terms say the service is provided "AS IS" with no warranties. The FAQ promises free updates for 12 months. These are contradictory. If a purchaser relied on the FAQ promise and updates were not delivered, this creates grounds for a dispute despite the "all sales final" policy.

---

### m4: jsPDF loaded from CDN — single point of failure

The PDF generation library is loaded from `cdnjs.cloudflare.com`. If this CDN is unavailable when the user returns from Stripe, `jsPDF` is undefined, `pdf-generator.js` throws at line 14 (`const { jsPDF } = jspdf`), and document generation fails. The user has already paid. There is no fallback.

---

## Gaps and Unknowns

1. **Is the Stripe payment link actually configured with a success redirect in the dashboard?** The code defines a `successUrl` that is never passed to Stripe. Whether the actual payment link `https://buy.stripe.com/00w00lcln4g6fcI5uofYY00` has been manually configured in the Stripe dashboard to redirect to `?payment=success` cannot be determined from the codebase. This must be verified by logging into the Stripe dashboard.

2. **Has the end-to-end flow ever been tested with a live Stripe payment?** The presence of the dead `successUrl` variable and the double `collectFormData()` call suggest this may have been written but not fully validated end-to-end.

3. **Is there a Stripe account and business entity in place?** The payment link exists, but the business's Stripe account health, verification status, and whether it has accepted Stripe's terms for digital goods are unknown.

4. **Are there any Vercel serverless functions or edge functions that provide server-side capability?** The `vercel.json` file exists in the repo. If it defines any API routes or serverless functions, that would change the server-side evidence picture. This file was not audited in this pass.

---

## Synthesis

**This product has a broken delivery mechanism that will cause every paying customer to not receive their documents, unless the Stripe dashboard has been manually configured with a success redirect URL — and there is no evidence in the codebase that this has been done.**

The core architectural choice — sessionStorage to persist data across a third-party payment redirect — is fragile by design. sessionStorage does not survive device switches, browser restarts, or cross-tab navigation, all of which are normal behaviors during an online purchase. The failure is silent: no error, no explanation, no retry path.

The secondary consequence of the broken delivery is that customers who don't receive documents have a legitimate chargeback claim, and the business has no server-side logs to defend against it. With no contact email, no receipt, and no re-download path, customers who are not immediately served are permanently stranded.

The business also makes a specific promise (free updates for 12 months) that it has zero technical capability to honor, and points to a contact email that does not exist anywhere on the site.

**The minimum required to make this product functional and not systematically harmful:**
1. Configure the Stripe payment link in the Stripe Dashboard to redirect to `https://aicomplydocs.com?payment=success` after payment
2. Add a real contact email to the site (and the Terms/Privacy pages that reference it)
3. Add a warning that downloads are one-time and must be saved immediately
4. Add error handling in `checkPaymentReturn()` with a meaningful user message and retry path

**The minimum required to make this product defensible against chargebacks:**
5. Implement a Stripe webhook that logs purchase events server-side (Vercel serverless function), capturing at minimum: session ID, timestamp, and approximate user agent/IP — enough to prove delivery occurred
