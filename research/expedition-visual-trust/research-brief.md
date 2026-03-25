# Research Brief: B2B Compliance Site Visual Trust
## Date: 2026-03-25
## Project: AI Compliance Documents (aicomplydocs)

### Problem Statement
We added stock lifestyle images to every page assuming "images humanize the site." But our buyers are compliance officers and business owners who evaluate evidence for a living. We don't know if stock photography builds or undermines trust with this audience. We need data-driven design direction, not assumptions.

### Expected Outcome
A clear, evidence-based design direction for what visual elements make a B2B legal/compliance document site trustworthy enough that someone spends $149-$997 on it. Not "add more images" or "remove images" — specifically: what works for THIS audience?

### Current State
- 13 stock lifestyle images deployed (office scenes, professionals, cityscapes)
- Hero backgrounds at 30% opacity across all pages
- Carousel cards with category-specific images
- No testimonials, no client logos, no certifications, no real team photos
- Site is "faceless corporation" by design (personal safety decision — non-negotiable)
- Product pages show PDF preview thumbnails
- Professional dark blue/slate color scheme
- 53 products, 21 blog posts, 4 state landing pages

### Constraints
- No real team photos (personal safety — destructive boundary, do not suggest)
- No fabricated testimonials or case studies (honesty boundary)
- No fabricated statistics or client counts
- fal.ai image generation currently unavailable
- Existing image library: 13 stock photos in /public/images/landing/
- Site runs on Next.js 16 / Tailwind CSS / Vercel

### Destructive Boundaries
- Do NOT suggest adding founder identity, team photos, or personal information
- Do NOT suggest fabricating social proof (fake reviews, fake client logos, fake statistics)
- Do NOT suggest changing the core business model or pricing structure

### Research Angles
1. **Trust signals for B2B legal/compliance buyers** — What does UX research and conversion optimization data say about what makes professional buyers trust a website? Stock photos vs. content quality vs. social proof vs. certifications vs. design patterns.

2. **Competitor design analysis** — What do successful compliance/legal template sites (Drata, TermsFeed, Enzuzo, RocketLawyer, LegalTemplates, IAPP, similar) actually look like? What visual patterns do they use? What's absent?

3. **AI-generated site detection patterns** — What makes a site look "obviously AI-built" to professional audiences? What are the visual tells? How do legitimate sites differentiate themselves?

### Team Size: 3
Three distinct, non-overlapping angles. Each produces independent findings for cross-validation.

### Failed Approaches
- Added 13 stock lifestyle images at 15% opacity — invisible to users
- Increased to 30% opacity — visible but unvalidated whether this helps or hurts
- Assumed "more images = more trust" without research
