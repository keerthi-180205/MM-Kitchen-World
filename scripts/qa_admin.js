const { chromium } = require('playwright-core');
const CHROME_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BASE = 'http://localhost:8099';

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME_PATH, headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));
  const results = {};

  await page.goto(`${BASE}/admin.html`, { waitUntil: 'networkidle' });
  results.initialTotal = await page.$eval('#statTotal', e => e.textContent.trim());

  // --- open Add modal, fill with a NEW unique model, submit ---
  await page.click('button:has-text("Add New Product")');
  await page.waitForTimeout(200);
  await page.fill('#formTitle', 'QA Test Product');
  await page.selectOption('#formCategory', 'Chimneys');
  await page.fill('#formSubcategory', 'QA Subcategory');
  await page.fill('#formModel', 'QA-TEST-MODEL-001');
  await page.fill('#formImageUrl', 'assets/products/chimneys/chimneys-ch-1000-bldc-ac-bl-is.png');
  await page.click('#saveProductBtn');
  await page.waitForTimeout(400);
  results.afterAddTotal = await page.$eval('#statTotal', e => e.textContent.trim());
  results.addToastVisible = await page.$eval('#toastMsg', e => e.textContent.trim()).catch(() => null);

  // --- try to add a DUPLICATE model (should be blocked) ---
  await page.click('button:has-text("Add New Product")');
  await page.waitForTimeout(200);
  await page.fill('#formTitle', 'Duplicate Attempt');
  await page.selectOption('#formCategory', 'Hobs');
  await page.fill('#formModel', 'QA-TEST-MODEL-001'); // same model, different category
  await page.fill('#formImageUrl', 'assets/products/hobs/hobs-bh-1018-ic-2z.png');
  await page.waitForTimeout(200);
  results.duplicateWarningVisible = await page.$eval('#duplicateModelWarning', e => !e.classList.contains('hidden'));
  results.saveBtnDisabledOnDuplicate = await page.$eval('#saveProductBtn', e => e.disabled);
  // attempt submit anyway via form submit event
  const totalBeforeDupSubmit = await page.$eval('#statTotal', e => e.textContent.trim());
  await page.evaluate(() => document.getElementById('productForm').requestSubmit());
  await page.waitForTimeout(300);
  results.totalAfterDupSubmitAttempt = await page.$eval('#statTotal', e => e.textContent.trim());
  results.duplicateBlockedCorrectly = (totalBeforeDupSubmit === results.totalAfterDupSubmitAttempt);
  await page.click('button:has-text("Cancel")').catch(() => {});

  // --- edit the QA test product ---
  await page.fill('#searchInput', 'QA-TEST-MODEL-001');
  await page.waitForTimeout(300);
  await page.click('tbody tr:has-text("QA-TEST-MODEL-001") button[title="Edit Product"]');
  await page.waitForTimeout(300);
  results.editModalTitleValue = await page.$eval('#formTitle', e => e.value).catch(() => 'MODAL_DID_NOT_OPEN');
  if (results.editModalTitleValue !== 'MODAL_DID_NOT_OPEN') {
    await page.fill('#formTitle', 'QA Test Product EDITED');
    await page.click('#saveProductBtn');
    await page.waitForTimeout(300);
  }
  await page.fill('#searchInput', 'QA-TEST-MODEL-001');
  await page.waitForTimeout(300);
  results.editedTitleAppears = (await page.content()).includes('QA Test Product EDITED');

  // --- delete the QA test product, with confirm dialog auto-accept ---
  page.once('dialog', d => d.accept());
  await page.click('tbody tr:has-text("QA-TEST-MODEL-001") button[title="Delete / Remove Product"]').catch(() => {});
  await page.waitForTimeout(400);
  await page.fill('#searchInput', '');
  results.afterDeleteTotal = await page.$eval('#statTotal', e => e.textContent.trim());

  // --- blank optional fields: add a minimal product with only required fields ---
  await page.click('button:has-text("Add New Product")');
  await page.waitForTimeout(200);
  await page.fill('#formTitle', 'QA Minimal Product');
  await page.selectOption('#formCategory', 'Dishwashers');
  await page.fill('#formModel', 'QA-MINIMAL-002');
  // leave subcategory, brand, tag, description blank; image has a default preset value already
  await page.click('#saveProductBtn');
  await page.waitForTimeout(300);
  results.minimalProductTotal = await page.$eval('#statTotal', e => e.textContent.trim());
  results.minimalProductErrors = errors.slice();
  // clean up: delete QA-MINIMAL-002
  await page.fill('#searchInput', 'QA-MINIMAL-002');
  await page.waitForTimeout(300);
  page.once('dialog', d => d.accept());
  await page.click('tbody tr:has-text("QA-MINIMAL-002") button[title="Delete / Remove Product"]').catch(() => {});
  await page.waitForTimeout(300);
  await page.fill('#searchInput', '');
  results.finalTotal = await page.$eval('#statTotal', e => e.textContent.trim());

  results.pageErrors = errors;

  // --- mobile nav menu check on index.html ---
  const mp = await browser.newPage({ viewport: { width: 390, height: 900 } });
  await mp.goto(`${BASE}/index.html`, { waitUntil: 'networkidle' });
  const hamburger = await mp.$('[onclick*="Mobile"], #mobileMenuBtn, button:has-text("menu")');
  results.mobileMenuButtonFound = !!hamburger;
  await mp.close();

  await browser.close();
  console.log(JSON.stringify(results, null, 2));
})();
