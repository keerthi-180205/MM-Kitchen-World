import express from "express";
import cors from "cors";
import compression from "compression";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import uploadRoutes from "./routes/upload.js";
import offerRoutes from "./routes/offers.js";
import leadRoutes from "./routes/leads.js";
import enquiryRoutes from "./routes/enquiries.js";
import { db } from "./db.js";
import { SITE_URL } from "./config.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// Trust the first proxy hop so rate limiting sees real client IPs behind a reverse proxy.
app.set("trust proxy", 1);
app.disable("x-powered-by"); // don't advertise the framework

// Basic hardening headers on every response.
app.use((req, res, next) => {
  res.set({
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "SAMEORIGIN",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  });
  next();
});

// Gzip text responses (HTML, JS, CSS, JSON); already-compressed images/PDFs are skipped automatically.
app.use(compression());
app.use(cors());
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

// Static uploads and public assets
const publicDir = path.resolve(__dirname, "../public");
app.use("/public", express.static(publicDir));
// Product photos, catalogues and uploads rarely change: let browsers keep them.
app.use("/assets", express.static(path.join(publicDir, "assets"), { maxAge: "7d" }));
app.use("/catalogues", express.static(path.join(publicDir, "catalogues"), { maxAge: "1d" }));
app.use("/uploads", express.static(path.join(publicDir, "uploads"), { maxAge: "7d" }));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/enquiries", enquiryRoutes);

// ---- SEO: robots.txt and sitemap.xml ---------------------------------------
const xmlEscape = (v) => String(v).replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[c]));
const siteBase = (req) => SITE_URL || `${req.protocol}://${req.get("host")}`;

app.get("/robots.txt", (req, res) => {
  res.type("text/plain").send(`User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/\n\nSitemap: ${siteBase(req)}/sitemap.xml\n`);
});

app.get("/sitemap.xml", (req, res) => {
  const base = siteBase(req);
  const pages = ["/", "/guides/chimney-size", "/faq", "/privacy", "/terms"];
  const products = db.prepare("SELECT id, updated_at FROM products WHERE status = 'Published'").all();
  const urls = [
    ...pages.map((p) => `<url><loc>${xmlEscape(base + p)}</loc></url>`),
    ...products.map((p) => `<url><loc>${xmlEscape(`${base}/product/${p.id}`)}</loc><lastmod>${xmlEscape((p.updated_at || "").slice(0, 10))}</lastmod></url>`),
  ];
  res.type("application/xml").send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`);
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "MM Kitchen World API",
    time: new Date().toISOString(),
  });
});

// Production: serve built React frontend SPA
const distDir = path.resolve(__dirname, "../dist");
if (fs.existsSync(distDir)) {
  app.use(
    express.static(distDir, {
      index: false,
      setHeaders(res, filePath) {
        const name = path.basename(filePath);
        if (/-[A-Za-z0-9_-]{8,}\.(js|css)$/.test(name)) {
          // Vite fingerprints these file names, so a new build gets new names: safe to cache for a year.
          res.set("Cache-Control", "public, max-age=31536000, immutable");
        } else if (name === "index.html") {
          res.set("Cache-Control", "no-cache");
        } else {
          res.set("Cache-Control", "public, max-age=604800");
        }
      },
    })
  );

  // Catch-all route to support React Router HTML5 pushState in Express 5
  app.use((req, res, next) => {
    if ((req.method === "GET" || req.method === "HEAD") && !req.path.startsWith("/api/")) {
      res.set("Cache-Control", "no-cache");
      return res.sendFile(path.join(distDir, "index.html"));
    }
    next();
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("[Server Error]", err);
  res.status(err.status || 500).json({
    error: err.message || "An unexpected internal server error occurred.",
  });
});

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  app.listen(PORT, () => {
    console.log(`[MM Kitchen World Server] Running at http://localhost:${PORT}`);
    console.log(`[MM Kitchen World Server] API endpoints available at http://localhost:${PORT}/api/`);
  });
}

export default app;
