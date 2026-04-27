# Homepage Rewrite — Contestant 5 (v2 — new marketing voice + full IA)

*v1 preserved at `homepage-rewrite-v1.md` for comparison. v1 diagnosed the SERP problem correctly; v2 applies the new voice and the full visual/IA overhaul from `visual-direction.md` and `ia-proposal.md`.*

---

## `<title>` tag

**Proposed (unchanged from v1 — still correct):**
```
Colorado AI Law Deadline: June 30, 2026 — Compliance Documents for Small Business | AI Compliance Documents
```

**Multi-state alternative (if Colorado scope feels too narrow):**
```
State AI Compliance Documents — Colorado, Illinois, NYC, Texas | AI Compliance Documents
```

---

## Meta description

**Proposed (160 chars, tightened from v1):**
```
Colorado AI law: June 30, 2026. Illinois, Texas, NYC: in effect now. Statute-verified compliance documents — from $49, instant download. No subscription.
```
(154 chars)

---

## Hero section — full spec in new voice

### Eyebrow label (above H1)
```
STATE AI COMPLIANCE DOCUMENTS
```
12px, uppercase, letter-spacing 0.1em, Signal Blue `#2563EB`. No punctuation. No "welcome to" prefix.

### H1 (visible — not sr-only)

**v1 proposed:**
> "Your business uses AI. These states have laws about that. Here's what you need."

**v2 — new voice, shorter, offer-forward:**
```
Your state has an AI law.
We built the documents that comply with it.
```

Two short lines. Inter 700. 48px desktop / 32px mobile. `#1E293B`. Line height 1.1.

**Why the change from v1:** The v1 H1 was still Pragmatic Realist — explanation-mode, three-sentence arc. The new voice earns the same territory in 14 words by being declarative and offer-forward. "We built the documents that comply with it" is a promise and a claim in one sentence. The buyer hears: they have the specific thing I need.

### Urgency band (directly below H1, above CTA)

Not a paragraph. A single horizontal strip of deadline facts in the new voice:

```
Colorado: June 30, 2026  ·  Illinois: in effect now  ·  NYC: in effect now  ·  Texas: in effect now
```

14px. State names link to respective product pages. Deadline dates render in Deadline Red `#DC2626`. Separator dots in `#94A3B8`. No label like "Deadlines:" — the facts speak for themselves.

**This replaces the current trust bar** ("Multi-State Coverage / Instant Download / Built for the person who...") which belongs below the fold. The urgency band is the first thing below the H1 because it confirms the buyer's problem before asking them to click.

### Primary CTA

```
Find My Compliance Documents →
```

Signal Blue `#2563EB`, white text. 18px, Inter 600. Padding: 16px 32px. Border-radius: 8px. Full-width on mobile, auto-width on desktop.

**Unchanged from v1.** "Browse Products" → "Find My Compliance Documents" remains the single highest-impact copy change on the site.

### Sub-CTA (below primary button)

```
Not sure which law applies to you?  Find your state's deadline →
```

14px text link, `#2563EB`. Links to `/compliance-deadline-by-state`.

### Trust strip (below sub-CTA, last element above the fold)

```
From $49  ·  Instant download  ·  No subscription  ·  Powered by Stripe
```

12px, `#64748B`. Replace the current trust bar icons with plain text — the icon strip reads as marketing decoration; plain text reads as factual.

### Right column (40% on desktop)

One stationary product card for Colorado SB 24-205 — the highest-urgency product with the nearest hard deadline. Uses the new card design from `visual-direction.md`:

- Status badge: EFFECTIVE SOON (amber)
- Law name: Colorado SB 24-205
- Deadline: June 30, 2026 (red)
- Description: Risk management program, impact assessment, consumer notices
- Price: $449
- CTA: Get documents →

This replaces the hero carousel. One product, visible immediately, no interaction required.

---

## Section order (5 sections per `ia-proposal.md`)

### Section 1: Hero (above the fold)
As specced above. No FeaturedInBar above the hero — moves below.

### Section 2: Product grid
6 products, ordered by enforcement urgency. Static grid, no carousel. New product card design. Below the grid: "Not sure which one you need? [Find your state's deadline →](/compliance-deadline-by-state)"

FeaturedInBar renders here — below the hero, after the buyer knows what the site is.

### Section 3: Pain / Stakes ("What Happens If You Don't Comply?")
Moved from section 7 to section 3. Copy largely unchanged — it's correct. Minor addition: per-consumer multiplication fact for Colorado with statute citation. See `ia-proposal.md` for detail.

### Section 4: Trust strip (compressed methodology)
Three trust signals in one horizontal row:
```
[✓] Built from enacted .gov statute text  ·  [✓] Citations verified against primary source  ·  [↓] Instant download via Stripe
```
No full-section treatment. The methodology depth lives on `/about`.

### Section 5: Final CTA

**v1 proposed:** "Don't wait for a complaint" (already good — kept)

**v2 — new voice, two lines only:**
```
The deadline doesn't move because you weren't ready.
Get your documents today.
```

Primary CTA: "Find My Compliance Documents →" (Signal Blue, same as hero)

Support text (below button): `Questions? info@aicompliancedocuments.com`

---

## What is removed from the current homepage

| Removed | Why |
|---|---|
| ProductCarousel with navigation arrows | Replaced by static product grid |
| "How We Build Our Templates" as a full section | Compressed to 3-item trust strip |
| "How It Works" 3-step section | Eliminated — this is an information-site section; the process is in the product page |
| Both lifestyle image breaks | No visual function; signals editorial pacing not solution-provider pacing |
| Blog/What's New section | Blog demoted to Resources in nav; not featured on homepage |
| FeaturedInBar above the hero | Moved to below the product grid |
| FAQ section on homepage | FAQ still lives at `/faq` (or `/#faq`) — not needed on homepage for the buyer who already knows what they need; accessible via nav |

**Note on FAQ removal from homepage:** The FAQ is valuable content that addresses real buyer objections. It stays accessible — in the nav, on a dedicated FAQ page, and potentially as a sidebar element on product pages. But a 9-item FAQ accordion on the homepage reads as a manual the buyer must read before they can purchase. The new homepage assumes the buyer has a specific problem and routes them to the product that solves it. The FAQ is for the buyer with pre-purchase objections — that buyer is better served by a dedicated FAQ page linked from the product sidebar than by a homepage section they have to scroll past.

---

## Voice comparison: v1 sub-H1 vs. v2 H1

**v1 sub-H1 (Pragmatic Realist, explanation mode):**
> "Colorado SB 24-205 takes effect June 30, 2026. Illinois, Texas, and NYC AI laws are already in effect. If you use AI in hiring, lending, insurance, or consumer decisions — and you don't have compliance documents — the clock is running. Compliance packages from $49. Instant download. Built from the enacted statute text, not summaries."

That's 57 words. Correct, complete, clear. Also: an explainer. A buyer who already knows they have a problem reads past this to find the product.

**v2 H1 + urgency band + trust strip (new marketing voice):**
> "Your state has an AI law. We built the documents that comply with it."
> [Colorado: June 30, 2026 · Illinois: in effect now · NYC: in effect now · Texas: in effect now]
> [Find My Compliance Documents →]
> [From $49 · Instant download · No subscription · Powered by Stripe]

That's 30 words plus 4 deadline facts. The same information. The urgency, the states, the price, the delivery — all present. But now in the offer-forward voice, not the explainer voice. The buyer who arrived deadline-anxious clicks in 5 seconds.
