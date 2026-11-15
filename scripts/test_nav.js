const { chromium } = require("playwright-core");

async function checkNav() {
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true
  });
  const page = await browser.newPage();
  await page.goto("http://localhost:8099/admin.html", { waitUntil: "networkidle" });
  console.log("Start URL:", page.url());

  const backLink = await page.$('#adminLoginContainer a[href="index.html"]');
  console.log("Back link found:", backLink !== null);
  
  await Promise.all([
    page.waitForURL("**/index.html*"),
    page.click('#adminLoginContainer a[href="index.html"]')
  ]);
  console.log("After back click URL:", page.url());

  const adminBtn = await page.$('a[href="admin.html"]:has-text("Admin")');
  console.log("Admin btn on index found:", adminBtn !== null);

  await Promise.all([
    page.waitForURL("**/admin.html*"),
    page.click('a[href="admin.html"]:has-text("Admin")')
  ]);
  console.log("After admin click URL:", page.url());

  await browser.close();
}

checkNav().catch(e => console.error(e));

