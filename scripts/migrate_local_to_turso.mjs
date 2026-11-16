/**
 * One-off: copy the data from your local SQLite file (what you have been using in development)
 * into the hosted Turso database, so the live site starts with your real products, offers and requests.
 *
 *   TURSO_DATABASE_URL=libsql://... TURSO_AUTH_TOKEN=... node scripts/migrate_local_to_turso.mjs [path/to/local.db] --yes
 *
 * It REPLACES the products, offers, call-back requests and enquiries in Turso with the local copy.
 * The admin login is not copied: it is created from ADMIN_EMAIL / ADMIN_PASSWORD on the server.
 */
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@libsql/client";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const confirmed = args.includes("--yes");
const sourcePath = path.resolve(args.find((a) => !a.startsWith("--")) || path.join(root, "data/kitchen_world.db"));

// Importing the database module creates the tables (and the default catalogue) in the TARGET database.
const { db } = await import("../server/db.js");
const source = createClient({ url: `file:${sourcePath}` });

const TABLES = ["products", "offers", "leads", "enquiries"];
const sourceCounts = {};
for (const t of TABLES) {
  try {
    sourceCounts[t] = (await source.execute(`SELECT COUNT(*) AS n FROM ${t}`)).rows[0].n;
  } catch {
    sourceCounts[t] = 0;
  }
}
console.log(`Source: ${sourcePath}`);
console.log("Will copy:", Object.entries(sourceCounts).map(([t, n]) => `${n} ${t}`).join(", "));
console.log("Target:", process.env.TURSO_DATABASE_URL || `local file ${process.env.DB_PATH || "data/kitchen_world.db"}`);

if (!confirmed) {
  console.log("\nNothing was changed. Run again with --yes to replace the target's data with this copy.");
  process.exit(0);
}

for (const table of TABLES) {
  if (!sourceCounts[table]) continue;
  const targetCols = (await db.prepare(`PRAGMA table_info(${table})`).all()).map((c) => c.name);
  const rows = (await source.execute(`SELECT * FROM ${table}`)).rows.map((r) => ({ ...r }));
  const cols = Object.keys(rows[0]).filter((c) => targetCols.includes(c));
  const sql = `INSERT OR REPLACE INTO ${table} (${cols.join(", ")}) VALUES (${cols.map(() => "?").join(", ")})`;
  const statements = rows.map((r) => ({ sql, args: cols.map((c) => r[c]) }));
  const CHUNK = 60;
  for (let i = 0; i < statements.length; i += CHUNK) {
    const chunk = statements.slice(i, i + CHUNK);
    if (i === 0) chunk.unshift({ sql: `DELETE FROM ${table}`, args: [] });
    await db.batch(chunk);
  }
  console.log(`  copied ${rows.length} ${table}`);
}
console.log("Done.");
process.exit(0);
