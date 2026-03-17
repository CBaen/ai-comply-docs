from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto('https://buy.stripe.com/00w00lcln4g6fcI5uofYY00', wait_until='networkidle')
    page.wait_for_timeout(3000)
    page.screenshot(path='stripe-checkout-verify.png', full_page=True)
    print("Title:", page.title())
    print("URL:", page.url)
    browser.close()
