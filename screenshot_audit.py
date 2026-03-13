from playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = "C:/Users/baenb/projects/project _cameron/aicomplydocs/screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def shot(page, name):
    path = f"{OUTPUT_DIR}/{name}"
    page.screenshot(path=path)
    print(f"  Saved {name}")

def shot_full(page, name):
    path = f"{OUTPUT_DIR}/{name}"
    page.screenshot(path=path, full_page=True)
    print(f"  Saved {name}")

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})

    # ── 1. Homepage ──────────────────────────────────────────────────────────
    print("1. Homepage...")
    page.goto("http://localhost:3000")
    page.wait_for_load_state("networkidle")
    shot(page, "01_homepage_above_fold.png")
    shot_full(page, "01_homepage_full.png")

    # Scroll to try to find filter tabs / deadline banner / product library
    # Try selector first, then fallback to scroll
    found = False
    for sel in ["[role='tablist']", ".filter-tabs", "#product-library", "#library",
                "text=All", "text=Deadline", "[data-section]"]:
        try:
            el = page.locator(sel).first
            if el.count() > 0:
                el.scroll_into_view_if_needed()
                page.wait_for_timeout(700)
                shot(page, "01_homepage_library_section.png")
                print(f"    (matched selector: {sel})")
                found = True
                break
        except Exception:
            pass
    if not found:
        page.evaluate("window.scrollTo(0, document.body.scrollHeight * 0.55)")
        page.wait_for_timeout(700)
        shot(page, "01_homepage_library_section.png")
        print("    (fallback scroll to 55%)")

    # ── 2. Blog listing ──────────────────────────────────────────────────────
    print("2. Blog listing...")
    page.goto("http://localhost:3000/blog")
    page.wait_for_load_state("networkidle")
    shot_full(page, "02_blog_listing.png")

    # ── 3. Blog post ─────────────────────────────────────────────────────────
    print("3. Blog post: what-is-illinois-hb3773...")
    page.goto("http://localhost:3000/blog/what-is-illinois-hb3773")
    page.wait_for_load_state("networkidle")
    shot(page, "03_blog_post_top.png")
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    page.wait_for_timeout(700)
    shot(page, "03_blog_post_bottom.png")
    shot_full(page, "03_blog_post_full.png")

    # ── 4. Product page bottom ───────────────────────────────────────────────
    print("4. Product page: colorado-sb24-205...")
    page.goto("http://localhost:3000/regulations/colorado-sb24-205")
    page.wait_for_load_state("networkidle")
    shot(page, "04_product_page_top.png")
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    page.wait_for_timeout(700)
    shot(page, "04_product_page_bottom.png")
    shot_full(page, "04_product_page_full.png")

    browser.close()
    print("Done. All screenshots saved to:", OUTPUT_DIR)
