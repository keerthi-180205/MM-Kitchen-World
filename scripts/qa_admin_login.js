/*
Comprehensive Playwright QA for Admin Login Flow & Responsiveness
*/

const { chromium } = require("playwright-core");
const path = require("path");
const fs = require("fs");

const VIEWPORTS = [
  { name: "mobile-390", width: 390, height: 844 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "tablet-834", width: 834, height: 1194 },
  { name: "tablet-1024", width: 1024, height: 768 },
  { name: "desktop-1280", width: 1280, height: 800 },
  { name: "desktop-1440", width: 1440, height: 900 }
];

const BASE_URL = "http://localhost:8099";

function findSystemBrowser() {
  const candidates = [
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe"
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return null;
}

async function runQa() {
  const execPath = findSystemBrowser();
  if (!execPath) throw new Error("No browser found");

  const browser = await chromium.launch({ executablePath: execPath, headless: true });
  const results = {
    viewports: {},
    loginFlow: {},
    adminFeatures: {}
  };

  const shotDir = path.join(__dirname, "..", "qa-screenshots");
  if (!fs.existsSync(shotDir)) fs.mkdirSync(shotDir, { recursive: true });

  // 1. Viewport sweep on storefront & login
  for (const vp of VIEWPORTS) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    await page.goto(`${BASE_URL}/index.html`, { waitUntil: "networkidle" });

    // Check horizontal overflow
    const docW = await page.evaluate(() => document.documentElement.scrollWidth);
    const bodyW = await page.evaluate(() => document.body.scrollWidth);
    const overflow = Math.max(0, docW - vp.width, bodyW - vp.width);

    // Check Admin button presence
    const adminBtn = await page.$('a[href="admin.html"]:has-text("Admin")');
    const hasAdminBtn = adminBtn !== null;

    results.viewports[vp.name] = {
      viewportWidth: vp.width,
      overflow,
      hasAdminBtn
    };

    if (vp.name === "mobile-390" || vp.name === "desktop-1280") {
      await page.screenshot({ path: path.join(shotDir, `qa-${vp.name}-admin-btn.png`), fullPage: false });
    }

    await page.close();
  }

  // 2. Test Admin Login Flow
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  
  // Go to admin directly (unauthenticated)
  await page.goto(`${BASE_URL}/admin.html`, { waitUntil: "networkidle" });
  await page.screenshot({ path: path.join(shotDir, "qa-admin-login-screen.png") });

  const isLoginVisible = await page.evaluate(() => {
    const el = document.getElementById("adminLoginContainer");
    return el && !el.classList.contains("hidden");
  });
  const isAppHidden = await page.evaluate(() => {
    const el = document.getElementById("adminAppContainer");
    return el && el.classList.contains("hidden");
  });

  results.loginFlow.unauthenticatedShowsLogin = isLoginVisible;
  results.loginFlow.unauthenticatedHidesApp = isAppHidden;

  // Test Back to Store button on login screen using Promise.all navigation
  await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle" }),
    page.click('#adminLoginContainer a[href="index.html"]')
  ]);
  results.loginFlow.backToStoreFromLoginWorks = page.url().includes("index.html");

  // Click Admin button on storefront to go back
  await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle" }),
    page.click('a[href="admin.html"]:has-text("Admin")')
  ]);
  results.loginFlow.adminButtonNavigatesToLogin = page.url().includes("admin.html");

  // Test incorrect login
  await page.fill("#adminUsername", "wrong@user.com");
  await page.fill("#adminPassword", "wrongpass");
  await page.click("#loginSubmitBtn");
  await page.waitForTimeout(300);

  const errorVisible = await page.evaluate(() => {
    const err = document.getElementById("loginErrorMessage");
    return err && !err.classList.contains("hidden");
  });
  results.loginFlow.invalidCredentialsShowsError = errorVisible;

  // Test Password Visibility Toggle
  const typeBefore = await page.getAttribute("#adminPassword", "type");
  await page.click('button:has-text("Show")');
  const typeAfterShow = await page.getAttribute("#adminPassword", "type");
  await page.click('button:has-text("Hide")');
  const typeAfterHide = await page.getAttribute("#adminPassword", "type");

  results.loginFlow.passwordToggleWorks = (typeBefore === "password" && typeAfterShow === "text" && typeAfterHide === "password");

  // Test correct login
  await page.fill("#adminUsername", "mmkitchenworld@admin.com");
  await page.fill("#adminPassword", "admin@mm123");
  await page.click("#loginSubmitBtn");
  await page.waitForTimeout(500);

  const isAppVisibleNow = await page.evaluate(() => {
    const el = document.getElementById("adminAppContainer");
    return el && !el.classList.contains("hidden");
  });
  const isLoginHiddenNow = await page.evaluate(() => {
    const el = document.getElementById("adminLoginContainer");
    return el && el.classList.contains("hidden");
  });

  results.loginFlow.correctCredentialsLogsIn = (isAppVisibleNow && isLoginHiddenNow);
  await page.screenshot({ path: path.join(shotDir, "qa-admin-logged-in.png") });

  // Verify total products in admin
  const totalCount = await page.innerText("#statTotal");
  results.adminFeatures.totalProductsLoaded = totalCount;

  // Test Back to Store from logged in header
  const backBtn = await page.$('#adminAppContainer a:has-text("Back to Store")');
  results.adminFeatures.backToStoreInHeaderExists = backBtn !== null;

  // Test Logout button
  await page.click('button:has-text("Logout")');
  await page.waitForTimeout(400);

  const isLoginVisibleAfterLogout = await page.evaluate(() => {
    const el = document.getElementById("adminLoginContainer");
    return el && !el.classList.contains("hidden");
  });
  results.loginFlow.logoutReturnsToLogin = isLoginVisibleAfterLogout;

  // Reload page to verify persistence of logout
  await page.reload({ waitUntil: "networkidle" });
  const stillOnLogin = await page.evaluate(() => {
    const el = document.getElementById("adminLoginContainer");
    return el && !el.classList.contains("hidden");
  });
  results.loginFlow.persistsLoggedOutOnReload = stillOnLogin;

  await page.close();
  await browser.close();

  console.log(JSON.stringify(results, null, 2));
}

runQa().catch(err => {
  console.error("QA error:", err);
  process.exit(1);
});
