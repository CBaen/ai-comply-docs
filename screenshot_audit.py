from playwright.sync_api import sync_playwright
import time

OUTPUT_DIR = "C:/Users/baenb/projects/project _cameron/aicomplydocs/screenshots"

import os
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})

    # ── 1. Homepage full page ────────────────────────────────────────────────
    print("Loading homepage...")
    page.goto("http://localhost:3000")
    page.wait_for_load_state("networkidle")
    page.screenshot(path=f"{OUTPUT_DIR}/01_homepage_full.png", full_page=True)
    print("  Saved 01_homepage_full.png")

    # ── 2. Scroll to product library section ────────────────────────────────
    # Try common selectors for the product library / filter section
    selectors_to_try = [
        "[data-section='product-library']",
        "#product-library",
        ".product-library",
        "text=Filter",
        "text=filter",
        "[role='tablist']",
        ".filter-tabs",
        "#library",
    ]

    scrolled = False
    for sel in selectors_to_try:
        try:
            el = page.locator(sel).first
            if el.count() > 0:
                el.scroll_into_view_if_needed()
                page.wait_for_timeout(600)
                page.screenshot(path=f"{OUTPUT_DIR}/02_product_library_section.png")
                print(f"  Saved 02_product_library_section.png  (matched: {sel})")
                scrolled = True
                break
        except Exception:
            pass

    if not scrolled:
        # Fallback: scroll 60% down the page
        page.evaluate("window.scrollTo(0, document.body.scrollHeight * 0.55)")
        page.wait_for_timeout(600)
        page.screenshot(path=f"{OUTPUT_DIR}/02_product_library_section.png")
        print("  Saved 02_product_library_section.png  (fallback scroll)")

    # ── 3. Product page – scroll to bottom for related products ─────────────
    print("Loading product page...")
    page.goto("http://localhost:3000/regulations/illinois-hb3773")
    page.wait_for_load_state("networkidle")

    # Scroll to bottom
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    page.wait_for_timeout(800)
    page.screenshot(path=f"{OUTPUT_DIR}/03_product_page_bottom.png")
    print("  Saved 03_product_page_bottom.png")

    # Also capture full product page for context
    page.evaluate("window.scrollTo(0, 0)")
    page.wait_for_timeout(400)
    page.screenshot(path=f"{OUTPUT_DIR}/04_product_page_full.png", full_page=True)
    print("  Saved 04_product_page_full.png")

    browser.close()
    print("Done.")
