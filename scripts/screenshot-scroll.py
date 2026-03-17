from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto('https://aicomplydocs.com', wait_until='networkidle')

    # Scroll slowly through the page to trigger IntersectionObserver
    total_height = page.evaluate("document.body.scrollHeight")
    step = 300
    current = 0
    while current < total_height:
        current += step
        page.evaluate(f"window.scrollTo(0, {current})")
        page.wait_for_timeout(150)

    # Scroll back to top
    page.evaluate("window.scrollTo(0, 0)")
    page.wait_for_timeout(300)

    page.screenshot(path='site-screenshot-scrolled.png', full_page=True)
    browser.close()
