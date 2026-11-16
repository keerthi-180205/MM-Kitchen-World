# MM Kitchen World — GLEN Exclusive Store

A modern, full-stack showroom web application and vendor administration console for **MM Kitchen World**, an authorized **GLEN Exclusive Store** located in Basaveshwara Nagar, Bangalore.

- **Frontend**: React 19 single-page application built with Vite and Tailwind CSS.
- **Backend**: Node.js + Express 5 REST API with high-performance SQLite persistence (`better-sqlite3` in WAL mode), JWT authentication, rate limiting, and gzip compression.
- **Product Catalog**: **283 verified GLEN appliances** unified across **10 product categories** with comprehensive technical specifications, dimensions, high-efficiency WebP imagery, and downloadable category catalogues.

---

## Key Features

### For Customers
* **Comprehensive 283-Product Catalog**: Browse appliances across 10 categories:
  * Chimneys (49 models)
  * Gas Stoves (63 models)
  * Built-in Hobs (75 models)
  * Water Heaters & Geysers (9 models)
  * Kitchen Sinks & Faucets (24 models)
  * Built-in Ovens (11 models)
  * Built-in Microwaves (6 models)
  * Dishwashers (2 models)
  * Cooking Ranges (3 models)
  * Small Appliances (41 models)
* **Direct Consultation & Instant Booking**: Immediate one-click WhatsApp enquiries and direct phone calls (`97432 33729`) with store specialists.
* **Downloadable Category Catalogues**: 8 curated PDF catalogues stored in `public/catalogues/` available for instant customer download:
  1. Chimneys Catalogue
  2. Gas Stoves Catalogue
  3. Built-in Hobs Catalogue
  4. Water Heaters & Geysers Catalogue
  5. Kitchen Sinks & Faucets Catalogue
  6. Built-in Ovens & Microwaves Catalogue
  7. Dishwashers Catalogue
  8. Small Appliances Catalogue
* **Interactive Chimney Guide** (`/guides/chimney-size`): Sizing and suction calculation tool matching kitchen dimensions with real catalog SKUs.
* **Side-by-Side Comparison** (`/compare`): Compare up to 3 appliances side-by-side across dimensions, burner count, suction, and warranty.
* **Wishlist & Cart Sharing** (`/wishlist`): Save appliances and send the full curated list directly to the showroom team via WhatsApp.
* **SEO & Social Optimization**: Dynamic server-generated `/sitemap.xml`, `/robots.txt`, and rich Open Graph preview cards for every product page.

### For Showroom Owners (Admin Console at `/admin`)
* **Product Management**: Add, edit, draft, and publish products with photos, specifications, and warranty details.
* **Bulk Spreadsheet Import/Export**: Export all products to CSV, edit prices or promotional discounts in Excel/Google Sheets, and upload back with atomic validation.
* **Promotional Offers**: Schedule top-of-site banner announcements with automated start and expiration dates.
* **Enquiry Analytics**: Privacy-first tracking of customer WhatsApp taps and enquiries grouped by product and category.
* **Data Security & Backups**: Secure credential rotation (bcrypt) and one-click full catalog JSON backup download.

---

## Project Structure

```
├── server/
│   ├── index.js               # Express 5 entry point, static SPA serving & security headers
│   ├── db.js                  # SQLite database engine, WAL mode, auto-seeding on fresh start
│   ├── config.js              # Production environment configuration & JWT enforcement
│   ├── middleware/            # JWT authentication & rate limiting
│   └── routes/
│       ├── auth.js            # Admin authentication & token verification
│       ├── products.js        # Product CRUD, category filters, CSV bulk sync, catalog reset
│       ├── offers.js          # Scheduled promotional banner endpoints
│       ├── leads.js           # Consultation enquiry records
│       ├── enquiries.js       # Product interest analytics
│       └── upload.js          # Appliance photo uploads via Multer
├── src/
│   ├── main.jsx, App.jsx      # React 19 root and route configuration
│   ├── pages/                 # Storefront (/), ProductPage (/product/:id), Admin (/admin), ...
│   ├── components/storefront/ # Hero, Categories, Catalogue, ProductCard, Showroom, Header, Footer
│   ├── components/admin/      # Dashboard, ProductsTable, BulkPriceModal, OffersManager
│   ├── store/productsStore.js # Synchronized client state with automatic SQLite API sync
│   └── data/defaultProducts.json # Source catalog seed of 283 verified GLEN products
├── public/
│   ├── assets/products/       # High-efficiency WebP product photos organized by category
│   ├── catalogues/            # Customer downloadable PDF catalogues (8 categories)
│   └── uploads/               # Admin-uploaded appliance images
├── scripts/
│   ├── test_fullstack.js      # Fullstack integration test suite (10 checks)
│   ├── test_features.mjs      # Feature & security test suite (19 checks)
│   └── generate_catalogues.py # Automated PDF catalogue compilation pipeline
└── package.json
```

---

## Getting Started

### Prerequisites
* **Node.js**: v18.0.0+ or v20.0.0+ (ES Modules enabled)
* **npm**: v9.0.0+

### 1. Installation
```bash
npm install
```

### 2. Environment Setup
Copy `.env.example` to `.env` and configure your settings:
```bash
cp .env.example .env
```

Default development settings:
```ini
PORT=5000
NODE_ENV=development
JWT_SECRET=dev-secret-string-at-least-32-characters-long
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=admin@mm123
DB_PATH=./data/kitchen_world.db
UPLOAD_DIR=./public/uploads
SITE_URL=http://localhost:5000
```

### 3. Run Development Servers
```bash
npm run dev
```
* **Storefront**: [http://localhost:5173/](http://localhost:5173/)
* **Admin Portal**: [http://localhost:5173/admin](http://localhost:5173/admin)
* **Backend API**: [http://localhost:5000/api/](http://localhost:5000/api/)

### 4. Run Automated Tests
```bash
npm test              # Fullstack API, auth, SQLite CRUD & SPA routing (10/10)
npm run test:features # Security, rate-limiting, CSV import & analytics (19/19)
```

---

## Production Deployment

### 1. Build Client Assets
Compile the React frontend into the `dist/` directory:
```bash
npm run build
```

### 2. Start Production Server
Launch the Node.js Express server to serve both the REST API and the static single-page application:
```bash
npm start
# or: NODE_ENV=production node server/index.js
```

### 3. Production Environment Checklist
Set these environment variables in your hosting dashboard:

| Variable | Requirement | Description |
|---|---|---|
| `NODE_ENV` | `production` | Enables production optimizations, caching headers & security checks |
| `PORT` | `5000` (or host port) | Port the Express server listens on |
| `JWT_SECRET` | Required | **Must be at least 32 characters** (server enforces this) |
| `ADMIN_EMAIL` | Required | Initial admin login account |
| `ADMIN_PASSWORD` | Required | Initial admin login password (must be 10+ characters) |
| `SITE_URL` | Recommended | Full domain URL (e.g. `https://mmkitchenworld.com`) for sitemap & SEO |

### Recommended Hosting Options
Because this project utilizes SQLite (`data/kitchen_world.db`) and local runtime uploads (`public/uploads/`), use a hosting service with a **persistent disk / volume**:
* **Railway / Render**: Deploy as a Web Service running `npm run build && node server/index.js` with a persistent volume mounted at `/data`.
* **VPS (DigitalOcean / AWS Lightsail / Linode)**: Run via PM2 / Docker behind Nginx with Let's Encrypt SSL.
* **Fly.io**: Deploy with a standard `fly.toml` configuration and a mounted volume for `/data`.

---

## License & Credits
© MM Kitchen World. All product trademarks, imagery, and specifications belong to GLEN Appliances Pvt. Ltd.
