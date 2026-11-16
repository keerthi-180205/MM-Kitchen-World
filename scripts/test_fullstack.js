import app from "../server/index.js";
import assert from "assert";

async function runTests() {
  const PORT = 5055;
  const server = app.listen(PORT);
  const BASE = `http://localhost:${PORT}`;

  console.log(`[Integration Test] Test server running on ${BASE}`);

  try {
    // 1. Health check
    console.log("Test 1: Health check...");
    const healthRes = await fetch(`${BASE}/api/health`);
    assert.strictEqual(healthRes.status, 200);
    const health = await healthRes.json();
    assert.strictEqual(health.status, "ok");
    console.log("✓ Health check passed");

    // 2. Fetch all products
    console.log("Test 2: Fetch all products from SQLite...");
    const prodsRes = await fetch(`${BASE}/api/products`);
    assert.strictEqual(prodsRes.status, 200);
    const products = await prodsRes.json();
    assert.strictEqual(products.length >= 209, true, `Expected >=209 products, got ${products.length}`);
    console.log(`✓ Fetched ${products.length} products from SQLite`);

    // 3. Auth login with valid credentials
    console.log("Test 3: Admin login with valid credentials...");
    const testEmail = (process.env.ADMIN_EMAIL || "mmkitchenworld@admin.com").trim().toLowerCase();
    const testPassword = process.env.ADMIN_PASSWORD || "admin@mm123";
    const loginRes = await fetch(`${BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: testEmail, password: testPassword }),
    });
    assert.strictEqual(loginRes.status, 200);
    const loginData = await loginRes.json();
    assert.ok(loginData.token, "Expected JWT token");
    assert.strictEqual(loginData.user.email, testEmail);
    console.log("✓ Valid login passed with JWT token generated");

    const token = loginData.token;

    // 4. Auth login with invalid credentials
    console.log("Test 4: Admin login with invalid credentials...");
    const badLoginRes = await fetch(`${BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: testEmail, password: "wrongpassword" }),
    });
    assert.strictEqual(badLoginRes.status, 401);
    console.log("✓ Invalid login correctly rejected with 401");

    // 5. Verify /api/auth/me
    console.log("Test 5: Verify /api/auth/me token session...");
    const meRes = await fetch(`${BASE}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    assert.strictEqual(meRes.status, 200);
    const meData = await meRes.json();
    assert.strictEqual(meData.user.email, testEmail);
    console.log("✓ /api/auth/me session validated");

    // 6. Create product via POST /api/products
    console.log("Test 6: Create new product via API...");
    const newProd = {
      id: "test-sku-100",
      title: "GLEN Automated Test Appliance",
      category: "Chimneys",
      subcategory: "Test Subcategory",
      brand: "GLEN APPLIANCES",
      model: "TEST-CH-9999",
      price: "₹18,990",
      specs: [{ label: "Size", value: "60 cm" }],
      features: ["Auto-test feature 1"],
      status: "Published",
    };
    const createRes = await fetch(`${BASE}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newProd),
    });
    assert.strictEqual(createRes.status, 201);
    const created = await createRes.json();
    assert.strictEqual(created.model, "TEST-CH-9999");
    console.log("✓ Created new product successfully");

    // 7. Test duplicate model number hard block
    console.log("Test 7: Duplicate model SKU rejection...");
    const dupRes = await fetch(`${BASE}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: "Duplicate Test",
        category: "Chimneys",
        model: "TEST-CH-9999", // same model
      }),
    });
    assert.strictEqual(dupRes.status, 409, "Expected 409 Conflict for duplicate SKU");
    console.log("✓ Duplicate model SKU hard-block verified (409 Conflict)");

    // 8. Update product via PUT /api/products/:id
    console.log("Test 8: Update product via API...");
    const updateRes = await fetch(`${BASE}/api/products/test-sku-100`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ price: "₹19,990", status: "Draft" }),
    });
    assert.strictEqual(updateRes.status, 200);
    const updated = await updateRes.json();
    assert.strictEqual(updated.price, "₹19,990");
    assert.strictEqual(updated.status, "Draft");
    console.log("✓ Product updated successfully");

    // 9. Delete product via DELETE /api/products/:id
    console.log("Test 9: Delete product via API...");
    const delRes = await fetch(`${BASE}/api/products/test-sku-100`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    assert.strictEqual(delRes.status, 200);
    console.log("✓ Product deleted successfully");

    // 10. SPA static routing (/ and /admin)
    console.log("Test 10: Verify SPA static route serving...");
    const homeRes = await fetch(`${BASE}/`);
    assert.strictEqual(homeRes.status, 200);
    const homeHtml = await homeRes.text();
    assert.strictEqual(homeHtml.includes("<div id=\"root\"></div>"), true);

    const adminRes = await fetch(`${BASE}/admin`);
    assert.strictEqual(adminRes.status, 200);
    const adminHtml = await adminRes.text();
    assert.strictEqual(adminHtml.includes("<div id=\"root\"></div>"), true);
    console.log("✓ Storefront and Admin routes served correctly");

    console.log("\n==============================================");
    console.log("ALL FULL-STACK REACT + NODE.JS TESTS PASSED!");
    console.log("==============================================\n");
  } finally {
    server.close();
  }
}

runTests().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});

