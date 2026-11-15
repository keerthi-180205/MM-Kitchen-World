import { Router } from "express";
import { db, rowToProduct, seedProducts } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

/** Save the optional per-product offer fields (empty string clears them). */
function applyOffer(id, body) {
  const fields = { offer_price: body.offerPrice, offer_label: body.offerLabel, offer_ends: body.offerEnds };
  const entries = Object.entries(fields).filter(([, v]) => v !== undefined);
  if (!entries.length) return;
  const set = entries.map(([col]) => `${col} = ?`).join(", ");
  const values = entries.map(([, v]) => (typeof v === "string" && v.trim() ? v.trim().slice(0, 80) : null));
  db.prepare(`UPDATE products SET ${set} WHERE id = ?`).run(...values, id);
}

// GET /api/products - list all products with optional filters
router.get("/", (req, res) => {
  try {
    const { status, category, search } = req.query;
    let query = "SELECT * FROM products WHERE 1=1";
    const params = [];

    if (status && status !== "ALL") {
      query += " AND status = ?";
      params.push(status);
    }

    if (category && category !== "ALL") {
      query += " AND category = ?";
      params.push(category);
    }

    if (search && search.trim()) {
      const q = `%${search.trim().toLowerCase()}%`;
      query += ` AND (
        LOWER(title) LIKE ? OR
        LOWER(model) LIKE ? OR
        LOWER(brand) LIKE ? OR
        LOWER(subcategory) LIKE ? OR
        LOWER(category) LIKE ?
      )`;
      params.push(q, q, q, q, q);
    }

    query += " ORDER BY created_at DESC, id DESC";

    const rows = db.prepare(query).all(...params);
    const products = rows.map(rowToProduct);
    return res.json(products);
  } catch (err) {
    console.error("[Products API] Error fetching products:", err);
    return res.status(500).json({ error: "Failed to fetch products." });
  }
});

// GET /api/products/:id - single product
router.get("/:id", (req, res) => {
  try {
    const row = db.prepare("SELECT * FROM products WHERE id = ?").get(req.params.id);
    if (!row) {
      return res.status(404).json({ error: "Product not found." });
    }
    return res.json(rowToProduct(row));
  } catch (err) {
    console.error("[Products API] Error fetching product:", err);
    return res.status(500).json({ error: "Failed to fetch product." });
  }
});

// POST /api/products - add product (protected)
router.post("/", requireAuth, (req, res) => {
  try {
    const p = req.body;
    const model = (p.model || "").trim();

    if (!p.title || !p.title.trim()) {
      return res.status(400).json({ error: "Product title is required." });
    }

    if (model) {
      const dup = db
        .prepare("SELECT id FROM products WHERE UPPER(TRIM(model)) = UPPER(TRIM(?))")
        .get(model);
      if (dup) {
        return res
          .status(409)
          .json({ error: "Cannot save: this model number already exists on another product." });
      }
    }

    const id = p.id || "prod-" + Date.now();
    const specs = JSON.stringify(p.specs || []);
    const features = JSON.stringify(p.features || []);

    db.prepare(`
      INSERT INTO products (
        id, title, category, subcategory, brand, model, tag, tag_color,
        image, price, specs, features, warranty, dimensions, status,
        description, source_pdf, source_page, created_at, updated_at
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
      )
    `).run(
      id,
      p.title.trim(),
      p.category || "Chimneys",
      p.subcategory ? p.subcategory.trim() : "",
      p.brand ? p.brand.trim() : "GLEN APPLIANCES",
      model,
      p.tag ? p.tag.trim() : "",
      p.tagColor || "bg-primary text-on-primary",
      p.image || "",
      p.price || "Contact showroom for price",
      specs,
      features,
      p.warranty || null,
      p.dimensions || null,
      p.status || "Published",
      p.description || "",
      p.sourcePdf || null,
      p.sourcePage || null
    );

    applyOffer(id, p);
    const created = db.prepare("SELECT * FROM products WHERE id = ?").get(id);
    return res.status(201).json(rowToProduct(created));
  } catch (err) {
    console.error("[Products API] Error creating product:", err);
    return res.status(500).json({ error: "Failed to create product." });
  }
});

// PUT /api/products/:id - update product (protected)
router.put("/:id", requireAuth, (req, res) => {
  try {
    const { id } = req.params;
    const existing = db.prepare("SELECT * FROM products WHERE id = ?").get(id);
    if (!existing) {
      return res.status(404).json({ error: "Product not found." });
    }

    const p = req.body;
    const model = (p.model !== undefined ? p.model : existing.model || "").trim();

    if (model) {
      const dup = db
        .prepare("SELECT id FROM products WHERE UPPER(TRIM(model)) = UPPER(TRIM(?)) AND id != ?")
        .get(model, id);
      if (dup) {
        return res
          .status(409)
          .json({ error: "Cannot save: this model number already exists on another product." });
      }
    }

    const specs = p.specs !== undefined ? JSON.stringify(p.specs) : existing.specs;
    const features = p.features !== undefined ? JSON.stringify(p.features) : existing.features;

    db.prepare(`
      UPDATE products SET
        title = ?,
        category = ?,
        subcategory = ?,
        brand = ?,
        model = ?,
        tag = ?,
        tag_color = ?,
        image = ?,
        price = ?,
        specs = ?,
        features = ?,
        warranty = ?,
        dimensions = ?,
        status = ?,
        description = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(
      p.title !== undefined ? p.title.trim() : existing.title,
      p.category !== undefined ? p.category : existing.category,
      p.subcategory !== undefined ? p.subcategory.trim() : existing.subcategory,
      p.brand !== undefined ? p.brand.trim() : existing.brand,
      model,
      p.tag !== undefined ? p.tag.trim() : existing.tag,
      p.tagColor !== undefined ? p.tagColor : existing.tag_color,
      p.image !== undefined ? p.image : existing.image,
      p.price !== undefined ? p.price : existing.price,
      specs,
      features,
      p.warranty !== undefined ? p.warranty : existing.warranty,
      p.dimensions !== undefined ? p.dimensions : existing.dimensions,
      p.status !== undefined ? p.status : existing.status,
      p.description !== undefined ? p.description : existing.description,
      id
    );

    applyOffer(id, p);
    const updated = db.prepare("SELECT * FROM products WHERE id = ?").get(id);
    return res.json(rowToProduct(updated));
  } catch (err) {
    console.error("[Products API] Error updating product:", err);
    return res.status(500).json({ error: "Failed to update product." });
  }
});

// DELETE /api/products/:id - delete product (protected)
router.delete("/:id", requireAuth, (req, res) => {
  try {
    const { id } = req.params;
    const existing = db.prepare("SELECT id, title FROM products WHERE id = ?").get(id);
    if (!existing) {
      return res.status(404).json({ error: "Product not found." });
    }

    db.prepare("DELETE FROM products WHERE id = ?").run(id);
    return res.json({ success: true, id, message: `Product ${id} deleted.` });
  } catch (err) {
    console.error("[Products API] Error deleting product:", err);
    return res.status(500).json({ error: "Failed to delete product." });
  }
});

// POST /api/products/import - bulk-edit prices, offers and visibility from a spreadsheet (protected)
//
// Body: { rows: [{ id | model, price, offerPrice, offerLabel, offerEnds, status }], apply: boolean }
// Without `apply: true` nothing is written: the reply is a preview. With it, either every row is valid
// and all are saved in one transaction, or the sheet is refused untouched (422) so a typo can't leave the
// catalogue half-updated. The sheet is applied as written: an empty offer cell removes that offer.
const DEFAULT_PRICE = "Contact showroom for price";
const IMPORT_STATUSES = { published: "Published", live: "Published", draft: "Draft" };
const isoDate = /^\d{4}-\d{2}-\d{2}$/;

router.post("/import", requireAuth, (req, res) => {
  const rows = req.body?.rows;
  const apply = req.body?.apply === true;
  if (!Array.isArray(rows) || rows.length === 0) {
    return res.status(400).json({ error: "The sheet has no product rows." });
  }
  if (rows.length > 1000) {
    return res.status(400).json({ error: "A sheet can have at most 1000 rows." });
  }

  const byId = db.prepare("SELECT * FROM products WHERE id = ?");
  const byModel = db.prepare("SELECT * FROM products WHERE UPPER(TRIM(model)) = UPPER(TRIM(?))");
  const clean = (v) => (v === undefined || v === null ? "" : String(v).trim());

  const errors = [];
  const plan = []; // { product, next }
  let unchanged = 0;
  const seen = new Set();

  rows.forEach((row, i) => {
    const line = i + 2; // spreadsheet line (row 1 is the header)
    const id = clean(row.id);
    const model = clean(row.model);
    const existing = (id && byId.get(id)) || (model && byModel.get(model)) || null;
    if (!existing) {
      errors.push({ row: line, message: `No product found for ${id || model || "an empty row"}.` });
      return;
    }
    if (seen.has(existing.id)) {
      errors.push({ row: line, message: `${existing.title} appears twice in the sheet.` });
      return;
    }
    seen.add(existing.id);

    const price = clean(row.price) || DEFAULT_PRICE;
    const offerPrice = clean(row.offerPrice);
    const offerLabel = offerPrice ? clean(row.offerLabel) : "";
    const offerEnds = offerPrice ? clean(row.offerEnds) : "";
    const statusText = clean(row.status);
    const status = statusText ? IMPORT_STATUSES[statusText.toLowerCase()] : existing.status;

    if (!status) return errors.push({ row: line, message: `Status "${statusText}" must be Published or Draft.` });
    if (price.length > 100) return errors.push({ row: line, message: "Price is too long (100 characters at most)." });
    if (offerPrice.length > 80 || offerLabel.length > 80) return errors.push({ row: line, message: "Offer price or name is too long (80 characters at most)." });
    if (offerEnds && !isoDate.test(offerEnds)) return errors.push({ row: line, message: `Offer end date "${offerEnds}" must look like 2026-11-15.` });

    const next = { price, offer_price: offerPrice || null, offer_label: offerLabel || null, offer_ends: offerEnds || null, status };
    const before = {
      price: existing.price || DEFAULT_PRICE,
      offer_price: existing.offer_price || null,
      offer_label: existing.offer_label || null,
      offer_ends: existing.offer_ends || null,
      status: existing.status,
    };
    const changes = Object.keys(next)
      .filter((k) => next[k] !== before[k])
      .map((k) => ({ field: k, from: before[k], to: next[k] }));
    if (changes.length === 0) {
      unchanged += 1;
      return;
    }
    plan.push({ product: existing, next, changes });
  });

  const summary = { rows: rows.length, willChange: plan.length, unchanged, errors: errors.length };
  const preview = plan.slice(0, 8).map((x) => ({ id: x.product.id, title: x.product.title, changes: x.changes }));

  if (!apply) return res.json({ applied: false, summary, errors: errors.slice(0, 50), preview });

  if (errors.length > 0) {
    return res.status(422).json({ error: "Nothing was saved. Fix the rows listed and import again.", applied: false, summary, errors: errors.slice(0, 50), preview });
  }

  const update = db.prepare(
    `UPDATE products SET price = @price, offer_price = @offer_price, offer_label = @offer_label,
       offer_ends = @offer_ends, status = @status, updated_at = CURRENT_TIMESTAMP WHERE id = @id`
  );
  db.transaction(() => {
    for (const { product, next } of plan) update.run({ id: product.id, ...next });
  })();
  return res.json({ applied: true, summary, errors: [], preview });
});

// POST /api/products/reset - reset catalog to verified default GLEN products (protected)
router.post("/reset", requireAuth, (req, res) => {
  try {
    seedProducts(true);
    const countRow = db.prepare("SELECT COUNT(*) as count FROM products").get();
    return res.json({
      success: true,
      count: countRow.count,
      message: `Reset catalog to ${countRow.count} verified GLEN products.`,
    });
  } catch (err) {
    console.error("[Products API] Error resetting catalog:", err);
    return res.status(500).json({ error: "Failed to reset catalog." });
  }
});

export default router;

