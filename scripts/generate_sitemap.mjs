/**
 * Writes dist/sitemap.xml and dist/robots.txt for the static website (Cloudflare Pages).
 * Runs automatically after `vite build`. Needs SITE_URL (e.g. https://www.yourdomain.com).
 * If VITE_API_URL is set it asks the API for the current products; otherwise (or if the API is asleep or
 * down) it falls back to the built-in catalogue. Redeploy the site to refresh it after adding products.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const siteUrl = (process.env.SITE_URL || "").trim().replace(/\/+$/, "");

if (!fs.existsSync(dist)) {
  console.error("[sitemap] dist/ not found: run the build first.");
  process.exit(1);
}
if (!siteUrl) {
  console.warn("[sitemap] SITE_URL is not set, so sitemap.xml and robots.txt were skipped.");
  process.exit(0);
}

async function currentProducts() {
  const api = (process.env.VITE_API_URL || "").trim().replace(/\/+$/, "");
  if (api) {
    try {
      const res = await fetch(`${api}/api/products?status=Published`, { signal: AbortSignal.timeout(100_000) });
      if (res.ok) {
        const list = await res.json();
        if (Array.isArray(list) && list.length) {
          console.log(`[sitemap] using ${list.length} products from the API`);
          return list;
        }
      }
    } catch (err) {
      console.warn("[sitemap] API not reachable, using the built-in catalogue:", err.message);
    }
  }
  const list = JSON.parse(fs.readFileSync(path.join(root, "src/data/defaultProducts.json"), "utf-8"));
  return list.filter((p) => p.status === "Published" || !p.status);
}

const xmlEscape = (v) => String(v).replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[c]));
const products = await currentProducts();
const pages = ["/", "/guides/chimney-size", "/faq", "/privacy", "/terms"];
const urls = [
  ...pages.map((p) => `<url><loc>${xmlEscape(siteUrl + p)}</loc></url>`),
  ...products.map((p) => `<url><loc>${xmlEscape(`${siteUrl}/product/${p.id}`)}</loc></url>`),
];

fs.writeFileSync(path.join(dist, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`);
fs.writeFileSync(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\nDisallow: /admin\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
console.log(`[sitemap] wrote sitemap.xml (${urls.length} addresses) and robots.txt for ${siteUrl}`);
