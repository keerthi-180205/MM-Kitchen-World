import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { IS_PRODUCTION } from "./config.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = process.env.DB_PATH || path.join(__dirname, "../data/kitchen_world.db");
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

export const db = new Database(dbPath);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'admin',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    subcategory TEXT,
    brand TEXT,
    model TEXT,
    tag TEXT,
    tag_color TEXT,
    image TEXT,
    price TEXT,
    specs TEXT,
    features TEXT,
    warranty TEXT,
    dimensions TEXT,
    status TEXT DEFAULT 'Published',
    description TEXT,
    source_pdf TEXT,
    source_page INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
  CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
  CREATE INDEX IF NOT EXISTS idx_products_model ON products(model);
`);

// ---- Offers, call-back requests and enquiry tracking -------------------------
db.exec(`
  CREATE TABLE IF NOT EXISTS offers (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    message TEXT,
    link_label TEXT,
    link_url TEXT,
    starts_at TEXT,
    ends_at TEXT,
    active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    message TEXT,
    product_id TEXT,
    product_title TEXT,
    source TEXT,
    status TEXT DEFAULT 'New',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS enquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id TEXT,
    product_title TEXT,
    source TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at);
  CREATE INDEX IF NOT EXISTS idx_enquiries_created ON enquiries(created_at);
  CREATE INDEX IF NOT EXISTS idx_enquiries_product ON enquiries(product_id);
`);

function addColumnIfMissing(table, column, definition) {
  const exists = db.prepare(`PRAGMA table_info(${table})`).all().some((c) => c.name === column);
  if (!exists) db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
}
addColumnIfMissing("products", "offer_price", "TEXT");
addColumnIfMissing("products", "offer_label", "TEXT");
addColumnIfMissing("products", "offer_ends", "TEXT");

/** Maps a database row to the frontend product object format */
export function rowToProduct(row) {
  if (!row) return null;
  let specs = [];
  let features = [];
  try {
    specs = row.specs ? JSON.parse(row.specs) : [];
  } catch {
    specs = [];
  }
  try {
    features = row.features ? JSON.parse(row.features) : [];
  } catch {
    features = [];
  }

  return {
    id: row.id,
    title: row.title,
    category: row.category,
    subcategory: row.subcategory || "",
    brand: row.brand || "GLEN APPLIANCES",
    model: row.model || "",
    tag: row.tag || "",
    tagColor: row.tag_color || "bg-primary text-on-primary",
    image: row.image || "",
    price: row.price || "Contact showroom for price",
    specs,
    features,
    warranty: row.warranty || null,
    dimensions: row.dimensions || null,
    offerPrice: row.offer_price || null,
    offerLabel: row.offer_label || null,
    offerEnds: row.offer_ends || null,
    status: row.status || "Published",
    description: row.description || "",
    sourcePdf: row.source_pdf || null,
    sourcePage: row.source_page || null,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/** Seed Admin User */
export function seedAdmin() {
  const adminEmail = (process.env.ADMIN_EMAIL || "mmkitchenworld@admin.com").trim().toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || (IS_PRODUCTION ? "" : "admin@mm123");

  const existing = db.prepare("SELECT * FROM users WHERE email = ?").get(adminEmail);
  if (!existing) {
    if (!adminPassword) {
      throw new Error("Set ADMIN_PASSWORD in the environment to create the first admin account in production.");
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(adminPassword, salt);
    db.prepare(`
      INSERT INTO users (id, email, password_hash, role)
      VALUES (?, ?, ?, 'admin')
    `).run("usr-admin-1", adminEmail, hash);
    console.log(`[Database] Seeded initial admin account: ${adminEmail}`);
  }
}

/** Seed Products from default JSON file if empty */
export function seedProducts(force = false) {
  const countRow = db.prepare("SELECT COUNT(*) as count FROM products").get();
  if (countRow.count > 0 && !force) {
    return;
  }

  const defaultProductsPath = path.join(__dirname, "../src/data/defaultProducts.json");
  if (!fs.existsSync(defaultProductsPath)) {
    console.warn(`[Database] defaultProducts.json not found at ${defaultProductsPath}`);
    return;
  }

  const defaultProducts = JSON.parse(fs.readFileSync(defaultProductsPath, "utf-8"));
  console.log(`[Database] Seeding ${defaultProducts.length} verified GLEN products into database...`);

  const insert = db.prepare(`
    INSERT OR REPLACE INTO products (
      id, title, category, subcategory, brand, model, tag, tag_color,
      image, price, specs, features, warranty, dimensions, status,
      description, source_pdf, source_page, updated_at
    ) VALUES (
      @id, @title, @category, @subcategory, @brand, @model, @tag, @tag_color,
      @image, @price, @specs, @features, @warranty, @dimensions, @status,
      @description, @source_pdf, @source_page, CURRENT_TIMESTAMP
    )
  `);

  const insertMany = db.transaction((products) => {
    if (force) {
      db.prepare("DELETE FROM products").run();
    }
    for (const p of products) {
      insert.run({
        id: p.id,
        title: p.title || "Untitled Product",
        category: p.category || "Chimneys",
        subcategory: p.subcategory || "",
        brand: p.brand || "GLEN APPLIANCES",
        model: p.model || "",
        tag: p.tag || "",
        tag_color: p.tagColor || "bg-primary text-on-primary",
        image: p.image || "",
        price: p.price || "Contact showroom for price",
        specs: JSON.stringify(p.specs || []),
        features: JSON.stringify(p.features || []),
        warranty: p.warranty || null,
        dimensions: p.dimensions || null,
        status: p.status || "Published",
        description: p.description || "",
        source_pdf: p.sourcePdf || null,
        source_page: p.sourcePage || null,
      });
    }
  });

  insertMany(defaultProducts);
  console.log(`[Database] Successfully seeded ${defaultProducts.length} products!`);
}

// Run initial seed checks
seedAdmin();
seedProducts();

