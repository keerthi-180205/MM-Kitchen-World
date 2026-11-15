const { chromium } = require("playwright-core");
const path = require("path");

async function verifyEmptyFields() {
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true
  });

  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  
  // Clear any existing session to ensure unauthenticated state
  await page.goto("http://localhost:8099/admin.html", { waitUntil: "networkidle" });
  await page.evaluate(() => sessionStorage.clear());
  await page.reload({ waitUntil: "networkidle" });

  const userVal = await page.inputValue("#adminUsername");
  const passVal = await page.inputValue("#adminPassword");
  const userPlaceholder = await page.getAttribute("#adminUsername", "placeholder");
  const passPlaceholder = await page.getAttribute("#adminPassword", "placeholder");

  console.log("Username field value:", JSON.stringify(userVal));
  console.log("Password field value:", JSON.stringify(passVal));
  console.log("Username placeholder:", JSON.stringify(userPlaceholder));
  console.log("Password placeholder:", JSON.stringify(passPlaceholder));

  const isBlank = (userVal === "" && passVal === "");
  const hasNeutralPlaceholders = (
    userPlaceholder === "Enter username or email" &&
    passPlaceholder === "Enter password"
  );

  console.log("Fields are strictly blank:", isBlank);
  console.log("Placeholders are neutral:", hasNeutralPlaceholders);

  // Take fresh screenshot
  const shotPath = path.join(__dirname, "..", "qa-screenshots", "qa-admin-login-empty.png");
  await page.screenshot({ path: shotPath });
  console.log("Saved screenshot to:", shotPath);

  // Test that credentials still work when entered manually
  await page.fill("#adminUsername", "mmkitchenworld@admin.com");
  await page.fill("#adminPassword", "admin@mm123");
  await page.click("#loginSubmitBtn");
  await page.waitForTimeout(400);

  const isLoggedIn = await page.evaluate(() => {
    const app = document.getElementById("adminAppContainer");
    return app && !app.classList.contains("hidden");
  });
  console.log("Login works on manual submission:", isLoggedIn);

  // Test logout clears fields
  await page.click('button:has-text("Logout")');
  await page.waitForTimeout(300);

  const userValAfterLogout = await page.inputValue("#adminUsername");
  const passValAfterLogout = await page.inputValue("#adminPassword");
  console.log("Fields blank after logout:", userValAfterLogout === "" && passValAfterLogout === "");

  await browser.close();
}

verifyEmptyFields().catch(err => {
  console.error("Error during verification:", err);
  process.exit(1);
});

