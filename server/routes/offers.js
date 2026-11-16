import { Router } from "express";
import { db } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

/** Only allow safe link targets: http(s) URLs, site-relative paths or in-page anchors (never javascript:). */
function safeLink(url) {
  const v = (url || "").trim();
  if (!v) return null;
  if (/^https?:\/\//i.test(v) || v.startsWith("/") || v.startsWith("#")) return v.slice(0, 500);
  return undefined; // invalid
}

const isDate = (v) => !v || /^\d{4}-\d{2}-\d{2}$/.test(v);

function rowToOffer(r) {
  return {
    id: r.id,
    title: r.title,
    message: r.message || "",
    linkLabel: r.link_label || "",
    linkUrl: r.link_url || "",
    startsAt: r.starts_at || "",
    endsAt: r.ends_at || "",
    active: !!r.active,
    createdAt: r.created_at,
  };
}

// Public: offers that are switched on and currently within their date window.
router.get("/", async (req, res) => {
  const today = new Date().toISOString().slice(0, 10);
  const rows = (await db
    .prepare(
      `SELECT * FROM offers
       WHERE active = 1
         AND (starts_at IS NULL OR starts_at = '' OR starts_at <= ?)
         AND (ends_at IS NULL OR ends_at = '' OR ends_at >= ?)
       ORDER BY created_at DESC`
    )
    .all(today, today));
  res.json(rows.map(rowToOffer));
});

// Admin: every offer, including expired and switched-off ones.
router.get("/all", requireAuth, async (req, res) => {
  res.json((await db.prepare("SELECT * FROM offers ORDER BY created_at DESC").all()).map(rowToOffer));
});

function validate(body) {
  const title = (body.title || "").trim();
  if (!title) return { error: "Offer headline is required." };
  const linkUrl = safeLink(body.linkUrl);
  if (linkUrl === undefined) return { error: "The link must start with https://, / or #." };
  const startsAt = (body.startsAt || "").trim();
  const endsAt = (body.endsAt || "").trim();
  if (!isDate(startsAt) || !isDate(endsAt)) return { error: "Dates must look like 2026-11-15." };
  if (startsAt && endsAt && startsAt > endsAt) return { error: "The end date must be after the start date." };
  return {
    value: {
      title: title.slice(0, 140),
      message: (body.message || "").trim().slice(0, 300),
      link_label: (body.linkLabel || "").trim().slice(0, 40),
      link_url: linkUrl,
      starts_at: startsAt || null,
      ends_at: endsAt || null,
      active: body.active === false ? 0 : 1,
    },
  };
}

router.post("/", requireAuth, async (req, res) => {
  const { error, value } = validate(req.body || {});
  if (error) return res.status(400).json({ error });
  const id = "off-" + Date.now();
  await db.prepare(
    `INSERT INTO offers (id, title, message, link_label, link_url, starts_at, ends_at, active)
     VALUES (@id, @title, @message, @link_label, @link_url, @starts_at, @ends_at, @active)`
  ).run({ id, ...value });
  res.status(201).json(rowToOffer((await db.prepare("SELECT * FROM offers WHERE id = ?").get(id))));
});

router.put("/:id", requireAuth, async (req, res) => {
  const existing = (await db.prepare("SELECT id FROM offers WHERE id = ?").get(req.params.id));
  if (!existing) return res.status(404).json({ error: "Offer not found." });
  const { error, value } = validate(req.body || {});
  if (error) return res.status(400).json({ error });
  await db.prepare(
    `UPDATE offers SET title=@title, message=@message, link_label=@link_label, link_url=@link_url,
       starts_at=@starts_at, ends_at=@ends_at, active=@active WHERE id=@id`
  ).run({ id: req.params.id, ...value });
  res.json(rowToOffer((await db.prepare("SELECT * FROM offers WHERE id = ?").get(req.params.id))));
});

router.delete("/:id", requireAuth, async (req, res) => {
  const info = (await db.prepare("DELETE FROM offers WHERE id = ?").run(req.params.id));
  if (!info.changes) return res.status(404).json({ error: "Offer not found." });
  res.json({ success: true });
});

export default router;
