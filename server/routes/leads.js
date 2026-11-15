import { Router } from "express";
import { db } from "../db.js";
import { requireAuth } from "../middleware/auth.js";
import { rateLimit } from "../lib/rateLimit.js";

const router = Router();
const STATUSES = ["New", "Contacted", "Closed"];

// Public: "Request a call back" form.
router.post(
  "/",
  rateLimit({ windowMs: 60 * 60 * 1000, max: 6, message: "You've sent several requests already. Please call us on 97432 33729." }),
  (req, res) => {
    const body = req.body || {};

    // Honeypot: real visitors never fill this hidden field, bots usually do. Pretend success.
    if (body.website) return res.status(201).json({ success: true });

    const name = String(body.name || "").trim().slice(0, 80);
    const phone = String(body.phone || "").replace(/[^\d+]/g, "");
    const digits = phone.replace(/\D/g, "");
    if (!name) return res.status(400).json({ error: "Please enter your name." });
    if (digits.length < 10 || digits.length > 13) {
      return res.status(400).json({ error: "Please enter a valid 10-digit mobile number." });
    }

    let productTitle = null;
    const productId = body.productId ? String(body.productId).slice(0, 80) : null;
    if (productId) {
      productTitle = db.prepare("SELECT title FROM products WHERE id = ?").get(productId)?.title || null;
    }

    db.prepare(
      `INSERT INTO leads (name, phone, message, product_id, product_title, source)
       VALUES (?, ?, ?, ?, ?, ?)`
    ).run(name, phone, String(body.message || "").trim().slice(0, 500), productTitle ? productId : null, productTitle, String(body.source || "website").slice(0, 40));

    res.status(201).json({ success: true });
  }
);

router.get("/", requireAuth, (req, res) => {
  const rows = db.prepare("SELECT * FROM leads ORDER BY created_at DESC, id DESC LIMIT 500").all();
  res.json(
    rows.map((r) => ({
      id: r.id,
      name: r.name,
      phone: r.phone,
      message: r.message || "",
      productId: r.product_id,
      productTitle: r.product_title,
      source: r.source,
      status: r.status,
      createdAt: r.created_at,
    }))
  );
});

router.patch("/:id", requireAuth, (req, res) => {
  const status = req.body?.status;
  if (!STATUSES.includes(status)) return res.status(400).json({ error: "Invalid status." });
  const info = db.prepare("UPDATE leads SET status = ? WHERE id = ?").run(status, req.params.id);
  if (!info.changes) return res.status(404).json({ error: "Request not found." });
  res.json({ success: true });
});

router.delete("/:id", requireAuth, (req, res) => {
  const info = db.prepare("DELETE FROM leads WHERE id = ?").run(req.params.id);
  if (!info.changes) return res.status(404).json({ error: "Request not found." });
  res.json({ success: true });
});

export default router;
