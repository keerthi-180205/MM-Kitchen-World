import { Router } from "express";
import { db } from "../db.js";
import { requireAuth } from "../middleware/auth.js";
import { rateLimit } from "../lib/rateLimit.js";

const router = Router();
const SOURCES = ["card", "product-page", "compare", "wishlist", "floating", "header", "hero", "banner", "other"];

// Public: record that a visitor tapped a WhatsApp / enquiry button. Stores no personal data.
router.post("/", rateLimit({ windowMs: 60 * 1000, max: 60 }), (req, res) => {
  const body = req.body || {};
  const source = SOURCES.includes(body.source) ? body.source : "other";
  let productId = null;
  let productTitle = null;
  if (body.productId) {
    const row = db.prepare("SELECT id, title FROM products WHERE id = ?").get(String(body.productId).slice(0, 80));
    if (row) {
      productId = row.id;
      productTitle = row.title;
    }
  }
  db.prepare("INSERT INTO enquiries (product_id, product_title, source) VALUES (?, ?, ?)").run(productId, productTitle, source);
  res.status(204).end();
});

// Admin: totals, top products and recent activity.
router.get("/summary", requireAuth, (req, res) => {
  const days = Math.min(Math.max(parseInt(req.query.days, 10) || 30, 1), 365);
  const since = `-${days} days`;

  const total = db.prepare("SELECT COUNT(*) AS n FROM enquiries WHERE created_at >= datetime('now', ?)").get(since).n;
  const perProduct = db
    .prepare(
      `SELECT product_id AS productId, product_title AS title, COUNT(*) AS count
       FROM enquiries
       WHERE product_id IS NOT NULL AND created_at >= datetime('now', ?)
       GROUP BY product_id ORDER BY count DESC, title LIMIT 15`
    )
    .all(since);
  const bySource = db
    .prepare("SELECT source, COUNT(*) AS count FROM enquiries WHERE created_at >= datetime('now', ?) GROUP BY source ORDER BY count DESC")
    .all(since);
  const recent = db
    .prepare("SELECT product_title AS title, source, created_at AS createdAt FROM enquiries ORDER BY id DESC LIMIT 25")
    .all();

  res.json({ days, total, perProduct, bySource, recent });
});

export default router;
