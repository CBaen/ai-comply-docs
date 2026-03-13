from playwright.sync_api import sync_playwright
import os

output_dir = "C:/Users/baenb/projects/project _cameron/aicomplydocs"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})

    # Screenshot 1: Homepage
    print("Navigating to homepage...")
    page.goto("http://localhost:3000")
    page.wait_for_load_state("networkidle")
    homepage_path = os.path.join(output_dir, "screenshot_homepage.png")
    page.screenshot(path=homepage_path, full_page=True)
    print(f"Homepage screenshot saved: {homepage_path}")

    # Screenshot 2: Product page
    print("Navigating to product page...")
    page.goto("http://localhost:3000/regulations/illinois-hb3773")
    page.wait_for_load_state("networkidle")
    product_path = os.path.join(output_dir, "screenshot_product.png")
    page.screenshot(path=product_path, full_page=True)
    print(f"Product page screenshot saved: {product_path}")

    browser.close()
    print("Done.")
