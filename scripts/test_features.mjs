/**
 * Integration test for offers, call-back requests, enquiry tracking, password change and SEO routes.
 * Runs the Express app in-process against a throwaway SQLite database.
 *     node scripts/test_features.mjs
 */
import os from "os";
import path from "path";
import fs from "fs";
import assert from "assert/strict";

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "mmkw-"));
process.env.DB_PATH = path.join(tmp, "test.db");
process.env.ADMIN_EMAIL = "owner@test.com";
process.env.ADMIN_PASSWORD = "initial-password-123";
process.env.NODE_ENV = "test";

const { default: app } = await import("../server/index.js");
const server = app.listen(0);
const base = `http://127.0.0.1:${server.address().port}`;

let passed = 0;
const test = async (name, fn) => {
  try { await fn(); passed++; console.log("  ok  ", name); }
  catch (e) { console.error("  FAIL", name, "\n      ", e.message); process.exitCode = 1; }
};
const call = async (method, url, body, token) => {
  const res = await fetch(base + url, {
    method,
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json = null; try { json = JSON.parse(text); } catch { /* not json */ }
  return { status: res.status, json, text };
};

let token;
await test("login with seeded admin", async () => {
  const r = await call("POST", "/api/auth/login", { email: "owner@test.com", password: "initial-password-123" });
  assert.equal(r.status, 200); token = r.json.token; assert.ok(token);
});

await test("offers: write endpoints need auth", async () => {
  assert.equal((await call("POST", "/api/offers", { title: "x" })).status, 401);
});
await test("offers: rejects javascript: links and bad dates", async () => {
  assert.equal((await call("POST", "/api/offers", { title: "Sale", linkUrl: "javascript:alert(1)" }, token)).status, 400);
  assert.equal((await call("POST", "/api/offers", { title: "Sale", startsAt: "15/11/2026" }, token)).status, 400);
  assert.equal((await call("POST", "/api/offers", { title: "Sale", startsAt: "2026-12-10", endsAt: "2026-12-01" }, token)).status, 400);
});
let offerId;
await test("offers: only live offers are public", async () => {
  const live = await call("POST", "/api/offers", { title: "Diwali Sale", message: "Up to X% off", linkUrl: "#products", linkLabel: "Shop" }, token);
  assert.equal(live.status, 201); offerId = live.json.id;
  await call("POST", "/api/offers", { title: "Expired", endsAt: "2020-01-01" }, token);
  await call("POST", "/api/offers", { title: "Future", startsAt: "2099-01-01" }, token);
  await call("POST", "/api/offers", { title: "Off", active: false }, token);
  const pub = await call("GET", "/api/offers");
  assert.deepEqual(pub.json.map((o) => o.title), ["Diwali Sale"]);
  assert.equal((await call("GET", "/api/offers/all", null, token)).json.length, 4);
});
await test("offers: switch off and delete", async () => {
  await call("PUT", `/api/offers/${offerId}`, { title: "Diwali Sale", active: false }, token);
  assert.equal((await call("GET", "/api/offers")).json.length, 0);
  assert.equal((await call("DELETE", `/api/offers/${offerId}`, null, token)).status, 200);
});

let productId;
await test("product offer price round-trips and can be cleared", async () => {
  productId = (await call("GET", "/api/products")).json[0].id;
  const set = await call("PUT", `/api/products/${productId}`, { offerPrice: "₹15,990", offerLabel: "Diwali Offer", offerEnds: "2099-12-31" }, token);
  assert.equal(set.json.offerPrice, "₹15,990"); assert.equal(set.json.offerEnds, "2099-12-31");
  const cleared = await call("PUT", `/api/products/${productId}`, { offerPrice: "", offerLabel: "", offerEnds: "" }, token);
  assert.equal(cleared.json.offerPrice, null);
});

await test("leads: validation, honeypot, product link", async () => {
  assert.equal((await call("POST", "/api/leads", { name: "", phone: "9876543210" })).status, 400);
  assert.equal((await call("POST", "/api/leads", { name: "Ravi", phone: "12345" })).status, 400);
  const ok = await call("POST", "/api/leads", { name: "Ravi", phone: "98765 43210", message: "Need a 90cm chimney", productId });
  assert.equal(ok.status, 201);
  assert.equal((await call("POST", "/api/leads", { name: "Bot", phone: "9876543210", website: "http://spam" })).status, 201); // silently dropped
  const list = await call("GET", "/api/leads", null, token);
  assert.equal(list.json.length, 1);
  assert.equal(list.json[0].phone, "9876543210"); assert.ok(list.json[0].productTitle);
  assert.equal((await call("GET", "/api/leads")).status, 401);
});
await test("leads: status update and delete", async () => {
  const id = (await call("GET", "/api/leads", null, token)).json[0].id;
  assert.equal((await call("PATCH", `/api/leads/${id}`, { status: "Contacted" }, token)).status, 200);
  assert.equal((await call("PATCH", `/api/leads/${id}`, { status: "Hacked" }, token)).status, 400);
  assert.equal((await call("DELETE", `/api/leads/${id}`, null, token)).status, 200);
});
await test("leads: rate limited per IP", async () => {
  let last;
  for (let i = 0; i < 8; i++) last = await call("POST", "/api/leads", { name: "Spam", phone: "9876543210" });
  assert.equal(last.status, 429);
});

await test("enquiries: tracked without personal data, summarised for admin", async () => {
  for (let i = 0; i < 3; i++) assert.equal((await call("POST", "/api/enquiries", { productId, source: "card" })).status, 204);
  await call("POST", "/api/enquiries", { productId: "does-not-exist", source: "<script>" });
  const s = await call("GET", "/api/enquiries/summary", null, token);
  assert.equal(s.json.total, 4); assert.equal(s.json.perProduct[0].count, 3);
  assert.ok(s.json.bySource.some((x) => x.source === "other"));
  assert.equal((await call("GET", "/api/enquiries/summary")).status, 401);
});

await test("password: change requires current password and length", async () => {
  assert.equal((await call("POST", "/api/auth/change-password", { currentPassword: "wrong", newPassword: "a-new-long-password" }, token)).status, 401);
  assert.equal((await call("POST", "/api/auth/change-password", { currentPassword: "initial-password-123", newPassword: "short" }, token)).status, 400);
  assert.equal((await call("POST", "/api/auth/change-password", { currentPassword: "initial-password-123", newPassword: "a-new-long-password" }, token)).status, 200);
  assert.equal((await call("POST", "/api/auth/login", { email: "owner@test.com", password: "initial-password-123" })).status, 401);
  assert.equal((await call("POST", "/api/auth/login", { email: "owner@test.com", password: "a-new-long-password" })).status, 200);
});
await test("login is throttled", async () => {
  let last;
  for (let i = 0; i < 14; i++) last = await call("POST", "/api/auth/login", { email: "owner@test.com", password: "nope" });
  assert.equal(last.status, 429);
});

await test("sitemap and robots", async () => {
  const sm = await call("GET", "/sitemap.xml");
  assert.match(sm.text, /<urlset/); assert.match(sm.text, /\/product\//); assert.match(sm.text, /\/faq/);
  const rb = await call("GET", "/robots.txt");
  assert.match(rb.text, /Disallow: \/admin/); assert.match(rb.text, /Sitemap: /);
});

// ---- bulk import --------------------------------------------------------------------------------
const list = (await call("GET", "/api/products")).json;
const [pA, pB, pC] = list;
const get = async (id) => (await call("GET", `/api/products/${id}`)).json;
const importCall = (rows, apply, tok = token) => call("POST", "/api/products/import", { rows, apply }, tok);

await test("import: needs auth and rows", async () => {
  assert.equal((await importCall([{ id: pA.id }], false, null)).status, 401);
  assert.equal((await importCall([], false)).status, 400);
});
await test("import: a preview changes nothing", async () => {
  const r = await importCall([{ id: pA.id, price: "₹21,500", status: "Published" }], false);
  assert.equal(r.status, 200); assert.equal(r.json.applied, false);
  assert.equal(r.json.summary.willChange, 1);
  assert.equal(r.json.preview[0].changes.find((c) => c.field === "price").to, "₹21,500");
  assert.notEqual((await get(pA.id)).price, "₹21,500");
});
await test("import: applies prices and offers, matching by id or by model (any case)", async () => {
  const r = await importCall([
    { id: pA.id, price: "₹21,500", offerPrice: "₹19,990", offerLabel: "Festive", offerEnds: "2099-12-31", status: "" },
    { model: pB.model.toLowerCase(), price: "₹9,900", status: "draft" },
  ], true);
  assert.equal(r.status, 200); assert.equal(r.json.applied, true); assert.equal(r.json.summary.willChange, 2);
  const a = await get(pA.id), b = await get(pB.id);
  assert.equal(a.price, "₹21,500"); assert.equal(a.offerPrice, "₹19,990"); assert.equal(a.offerLabel, "Festive"); assert.equal(a.status, pA.status);
  assert.equal(b.price, "₹9,900"); assert.equal(b.status, "Draft");
});
await test("import: an empty offer cell removes the offer; untouched rows count as unchanged", async () => {
  const a = await get(pA.id);
  const r = await importCall([{ id: pA.id, price: a.price, offerPrice: "", status: a.status }, { id: pB.id, price: "₹9,900", status: "Draft" }], true);
  assert.equal(r.json.summary.willChange, 1); assert.equal(r.json.summary.unchanged, 1);
  assert.equal((await get(pA.id)).offerPrice, null);
});
await test("import: one bad row refuses the whole sheet (nothing half-saved)", async () => {
  const before = (await get(pC.id)).price;
  const r = await importCall([
    { id: pC.id, price: "₹1,111" },                       // valid
    { id: pA.id, price: "x", status: "Hidden" },           // invalid status
    { model: "NO-SUCH-MODEL", price: "₹2" },               // unknown product
    { id: pB.id, price: "₹3", offerPrice: "₹2", offerEnds: "15/11/2026" }, // bad date
    { id: pB.id, price: "₹4" },                            // duplicate
  ], true);
  assert.equal(r.status, 422); assert.equal(r.json.applied, false);
  assert.equal(r.json.summary.errors, 4);
  assert.ok(r.json.errors.every((e) => e.row >= 3));
  assert.equal((await get(pC.id)).price, before, "the valid row must not have been saved");
});

// ---- hardening headers --------------------------------------------------------------------------
await test("responses carry security headers and don't reveal the framework", async () => {
  const res = await fetch(`${base}/api/health`);
  assert.equal(res.headers.get("x-powered-by"), null);
  assert.equal(res.headers.get("x-content-type-options"), "nosniff");
  assert.equal(res.headers.get("x-frame-options"), "SAMEORIGIN");
  assert.equal(res.headers.get("referrer-policy"), "strict-origin-when-cross-origin");
});

console.log(`\n${passed} checks passed${process.exitCode ? ", some FAILED" : ""}`);
server.close(); fs.rmSync(tmp, { recursive: true, force: true });
setTimeout(() => process.exit(process.exitCode || 0), 100);
