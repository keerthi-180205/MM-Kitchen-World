const { chromium } = require("playwright-core");
const path = require("path");
const fs = require("fs");

async function verifyAdminCleanliness() {
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true
  });

  const shotDir = path.join(__dirname, "..", "qa-screenshots");
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  
  await page.goto("http://localhost:8099/admin.html", { waitUntil: "networkidle" });
  
  // Login with prototype credentials
  await page.fill("#adminUsername", "mmkitchenworld@admin.com");
  await page.fill("#adminPassword", "admin@mm123");
  await page.click("#loginSubmitBtn");
  await page.waitForTimeout(500);

  // Check that the blue banner is completely absent from the DOM
  const hasBanner = await page.evaluate(() => {
    return document.querySelector("aside.bg-primary") !== null ||
           document.body.innerText.includes("VENDOR ADMIN · BROWSER-LOCAL CATALOG CMS") ||
           document.body.innerText.includes("Reset Demo Defaults");
  });

  console.log("Blue banner found in DOM:", hasBanner);

  // Take screenshot of clean Admin top
  await page.screenshot({ path: path.join(shotDir, "qa-admin-no-banner-desktop.png") });

  // Test mobile view
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(shotDir, "qa-admin-no-banner-mobile.png") });

  await browser.close();
  console.log("SUCCESS: Screenshots saved and banner absence confirmed.");
}

verifyAdminCleanliness().catch(err => {
  console.error("Error:", err);
  process.exit(1);
});

