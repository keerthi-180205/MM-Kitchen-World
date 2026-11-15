const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BASE = 'http://localhost:8099';
const OUT = path.join(__dirname, '..', 'qa-screenshots');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME_PATH, headless: true });
  const results = {
    overflowByViewport: {},
    consoleErrorsByViewport: {},
    imageLoadErrors: []
  };

  const testViewports = [
    ['mobile-390', 390, 844],
    ['tablet-768', 768, 1024],
    ['tablet-834', 834, 1194],
    ['tablet-900', 900, 1200],
    ['tablet-1024', 1024, 1366],
    ['desktop-1280', 1280, 800],
    ['desktop-1440', 1440, 900]
  ];

  for (const [label, w, h] of testViewports) {
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error' && !msg.text().includes('cdn.tailwindcss.com')) {
        consoleErrors.push(msg.text());
      }
    });
    page.on('pageerror', err => consoleErrors.push('pageerror: ' + err.message));

    await page.goto(`${BASE}/index.html`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(OUT, `qa-${label}-top.png`) });

    // Measure horizontal page overflow
    const overflow = await page.evaluate((viewportWidth) => {
      const docW = document.documentElement.scrollWidth;
      const bodyW = document.body.scrollWidth;
      const maxW = Math.max(docW, bodyW);
      return {
        viewportWidth,
        docWidth: docW,
        bodyWidth: bodyW,
        pageOverflow: Math.max(0, maxW - viewportWidth)
      };
    }, w);
    results.overflowByViewport[label] = overflow;
    results.consoleErrorsByViewport[label] = consoleErrors;

    // On tablet / mobile, test mobile navigation menu toggle
    if (w < 1280) {
      const toggle = await page.$('#mobileNavToggle');
      if (toggle && await toggle.isVisible()) {
        const initiallyHidden = await page.$eval('#mobileNav', el => el.classList.contains('hidden'));
        await toggle.click();
        await page.waitForTimeout(200);
        const opened = await page.$eval('#mobileNav', el => !el.classList.contains('hidden'));
        if (w === 768) {
          await page.screenshot({ path: path.join(OUT, `qa-${label}-mobile-nav-open.png`) });
        }
        await toggle.click();
        await page.waitForTimeout(200);
        const closedAgain = await page.$eval('#mobileNav', el => el.classList.contains('hidden'));
        results[`${label}_mobileNavTest`] = { toggleFound: true, initiallyHidden, opened, closedAgain };
      } else {
        results[`${label}_mobileNavTest`] = { toggleFound: false };
      }
    }

    if (label === 'desktop-1440') {
      // --- category chip counts ---
      const chipText = await page.$$eval('#storefrontCategoryFilter button', els => els.map(e => e.textContent.trim()));
      results.categoryChips = chipText;

      // --- click Gas Stoves, check Cooking Range subsection ---
      const gasBtn = await page.$('#storefrontCategoryFilter button:has-text("Gas Stoves")');
      if (gasBtn) {
        await gasBtn.click();
        await page.waitForTimeout(300);
        const gasHeadings = await page.$$eval('#dynamicProductsGrid h3', els => els.map(e => e.textContent.trim()));
        results.gasStoveSubheadings = gasHeadings;
        await page.screenshot({ path: path.join(OUT, 'qa-gasstoves.png'), fullPage: false });

        const dlBtn = await page.$('#catalogueDownloadBar a');
        results.catalogueDownloadHref = dlBtn ? await dlBtn.getAttribute('href') : null;
        results.catalogueDownloadText = dlBtn ? (await dlBtn.textContent()).trim() : null;

        // find the Cooking Range card specifically, check its model/title
        const crCard = await page.$('#dynamicProductsGrid h3:has-text("Cooking Range")');
        results.cookingRangeHeadingFound = !!crCard;
      }

      // --- open a product modal from the first visible card ---
      const firstViewDetails = await page.$('#dynamicProductsGrid button:has-text("View Details")');
      if (firstViewDetails) {
        await firstViewDetails.click();
        await page.waitForTimeout(300);
        results.modalTitle = await page.$eval('#modalProductTitle', e => e.textContent.trim()).catch(() => null);
        results.modalModel = await page.$eval('#modalProductModel', e => e.textContent.trim()).catch(() => null);
        results.modalWaHref = await page.$eval('#modalWhatsAppBtn', e => e.getAttribute('href')).catch(() => null);
        await page.screenshot({ path: path.join(OUT, 'qa-modal.png') });
        await page.evaluate(() => { if (typeof closeDetailsModal === 'function') closeDetailsModal(); });
      }

      // --- card-level WhatsApp link check ---
      const cardWaHref = await page.$eval('#dynamicProductsGrid a[href*="wa.me"]', e => e.getAttribute('href')).catch(() => null);
      results.cardWaHref = cardWaHref;

      // --- switch back to ALL, click each category for sanity ---
      for (const cat of ['Chimneys', 'Hobs', 'Ovens', 'Microwaves', 'Dishwashers', 'ALL']) {
        const btn = await page.$(`#storefrontCategoryFilter button:has-text("${cat}")`);
        if (btn) { await btn.click(); await page.waitForTimeout(150); }
      }

      // --- check for broken images on the page ---
      const brokenImages = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        return imgs
          .filter(img => img.naturalWidth === 0 && img.src && !img.src.startsWith('data:'))
          .map(img => img.src);
      });
      results.brokenImagesCount = brokenImages.length;
      results.brokenImagesList = brokenImages.slice(0, 10);
    }

    await page.close();
  }

  // --- admin.html quick load check ---
  const adminPage = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const adminErrors = [];
  adminPage.on('console', msg => {
    if (msg.type() === 'error' && !msg.text().includes('cdn.tailwindcss.com')) {
      adminErrors.push(msg.text());
    }
  });
  adminPage.on('pageerror', err => adminErrors.push('pageerror: ' + err.message));
  await adminPage.goto(`${BASE}/admin.html`, { waitUntil: 'networkidle' });
  results.adminStatTotal = await adminPage.$eval('#statTotal', e => e.textContent.trim()).catch(() => null);
  await adminPage.screenshot({ path: path.join(OUT, 'qa-admin-top.png') });
  results.adminConsoleErrors = adminErrors;
  await adminPage.close();

  await browser.close();
  console.log(JSON.stringify(results, null, 2));
})();
