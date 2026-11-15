# MM Kitchen World (Full-Stack React + Node.js)

A full-stack storefront and vendor admin console for **MM Kitchen World (Glen Exclusive Store)**, an authorized GLEN appliance showroom in Basaveshwara Nagar, Bangalore.

- **Frontend**: React 19 + Vite + Tailwind CSS single-page application.
- **Backend**: Node.js + Express REST API with SQLite persistence (`better-sqlite3`), JWT authentication, and file upload support.
- **Product Catalog**: 209 verified GLEN SKUs across 6 categories (Chimneys, Ovens, Microwaves, Gas Stoves, Hobs, Dishwashers) directly extracted from the official manufacturer PDF catalogue.

---

## Architecture & Project Structure

```
├── server/
│   ├── index.js               # Express server, static SPA fallback, API routing
│   ├── db.js                  # SQLite database (WAL mode), auto-seeds 209 GLEN SKUs & admin user
│   ├── middleware/
│   │   └── auth.js            # JWT authentication middleware
│   └── routes/
│       ├── auth.js            # POST /api/auth/login, GET /api/auth/me
│       ├── products.js        # GET, POST, PUT, DELETE /api/products, POST /api/products/reset
│       └── upload.js          # POST /api/upload (Multer appliance photo upload)
├── src/
│   ├── main.jsx, App.jsx      # React 19 entry point and routes
│   ├── pages/                 # Storefront.jsx (/), Admin.jsx (/admin)
│   ├── components/storefront/ # Header, Hero, Categories, Catalogue, ProductCard, ProductModal, ...
│   ├── components/admin/      # LoginScreen, Dashboard, ProductsTable, ProductFormModal, Toast
│   ├── store/productsStore.js # Synchronized product layer (localStorage cache + Node.js API)
│   ├── hooks/                 # useProducts, useScrollSpy, useToast
│   └── data/                  # defaultProducts.json (209 SKUs), imagePresets.json
├── public/
│   ├── assets/                # Product photos, QR codes, QA sheets
│   ├── catalogues/            # Downloadable category PDFs
│   └── uploads/               # Uploaded appliance photos from admin console
├── data/
│   ├── kitchen_world.db       # Persistent SQLite database (auto-generated)
│   ├── GLEN-source-catalogue.pdf # Official manufacturer PDF
│   └── products.json          # Extracted product records
├── design-prototypes/         # Archived original design mockups & explorations
├── scripts/
│   ├── test_fullstack.js      # Automated full-stack integration test suite
│   └── extract_products.py    # Python PDF extraction pipeline
└── package.json
```

---

## Getting Started

### Prerequisites
- Node.js (v18+ or v22+)
- npm

### 1. Installation
```bash
npm install
```

### 2. Environment Configuration
The `.env` file is pre-configured with default development settings:
```ini
PORT=5000
NODE_ENV=development
JWT_SECRET=mm_kitchen_world_jwt_super_secret_key_2026_glenshowroom
ADMIN_EMAIL=mmkitchenworld@admin.com
ADMIN_PASSWORD=admin@mm123
DB_PATH=./data/kitchen_world.db
UPLOAD_DIR=./public/uploads
```

### 3. Run Development Server (Frontend + Backend)
```bash
npm run dev
```
This runs both the Express backend (`http://localhost:5000`) and the Vite React frontend (`http://localhost:5173`) concurrently, with Vite proxying `/api` and `/uploads` requests.

- **Storefront**: [http://localhost:5173/](http://localhost:5173/)
- **Admin Portal**: [http://localhost:5173/admin](http://localhost:5173/admin)
  - **Email**: `mmkitchenworld@admin.com`
  - **Password**: `admin@mm123`

### 4. Run Integration Tests
```bash
npm test
```
Runs `scripts/test_fullstack.js`, validating the health check, SQLite queries, JWT authentication, product CRUD, duplicate SKU rejection, and SPA routing.

### 5. Production Build & Start
```bash
npm run build    # Compiles React application into dist/
npm start        # Starts Express server serving both API and static production frontend
```

---

## API Endpoints

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/health` | Public | Service health check |
| `GET` | `/api/products` | Public | List products (supports `?category=`, `?status=`, `?search=`) |
| `GET` | `/api/products/:id` | Public | Get single product by ID |
| `POST` | `/api/products` | Admin (JWT) | Add a product (enforces unique model SKU) |
| `PUT` | `/api/products/:id` | Admin (JWT) | Update product fields / status |
| `DELETE` | `/api/products/:id` | Admin (JWT) | Delete a product |
| `POST` | `/api/products/reset` | Admin (JWT) | Restore catalog to the 209 verified default SKUs |
| `POST` | `/api/auth/login` | Public | Admin login (`email`, `password`) -> returns JWT token |
| `GET` | `/api/auth/me` | Admin (JWT) | Verify active session token |
| `POST` | `/api/upload` | Admin (JWT) | Upload appliance photo -> returns `/uploads/...` URL |

---

## Product Data Pipeline (Python)

To re-extract or enhance data directly from GLEN's manufacturer PDF catalogue:

```bash
python3 scripts/extract_products.py       # parse source PDF -> data/products.json + images
python3 scripts/enhance_images.py         # 2x upscale, sharpen, background clean -> .webp
python3 scripts/make_contact_sheets.py    # build QA contact sheets
python3 scripts/build_catalog_data.py     # generate src/data/defaultProducts.json
python3 scripts/generate_catalogues.py    # compile 5 downloadable category PDFs
```

## Customer features

| Feature | Where |
|---|---|
| Product pages (own address, SEO title/description, structured data) | `/product/:id` |
| Compare up to 3 models side by side | `/compare` |
| "My List": save models, then send the whole list on WhatsApp | `/wishlist` |
| Chimney size and suction guide (recommends real models from the catalogue) | `/guides/chimney-size` |
| Request a call back (home page and product pages) | saved in Admin > Call-backs |
| FAQ, warranty and service; Privacy Policy; Terms | `/faq`, `/privacy`, `/terms` |
| Offers banner and per-product offer prices (with "Save ₹X") | managed in Admin |
| Installation photos & videos (links to the Google Business Profile) | "Our Work" section |
| `sitemap.xml` and `robots.txt` | served by the API server |

## Owner guide (Admin)

Log in at `/admin`. Tabs:

- **Products**: add, edit and publish products. In the product form, the *Special offer* box sets an offer price, label and end date; put the normal price in *Price Display* so customers see "Save ₹X".
- **Edit prices in bulk** (button on the Products page): download all products as a spreadsheet (.csv), change the *Price*, *Offer price*, *Offer name*, *Offer valid till* or *Status* columns in Excel or Google Sheets, then upload it back. You see a before-and-after preview first. If any row has a mistake, **nothing** is saved, so the catalogue is never half-updated. An empty offer cell removes that offer.
- **Offers**: banners shown at the top of the website between a start and end date. They switch off automatically when they expire.
- **Call-backs**: customers who asked to be called. Mark each as New, Contacted or Closed. A red badge shows how many are new.
- **Enquiries**: how many times customers tapped WhatsApp or Enquire, by product and by place. No personal details are stored.
- **Account**: change the admin password (at least 10 characters), and download a **backup** (products, offers and call-back requests) as one file. Keep a copy somewhere safe.

## Configuration and security

Copy `.env.example` to `.env`. In production (`NODE_ENV=production`) the server **refuses to start** unless `JWT_SECRET` (32+ random characters) is set, and requires `ADMIN_PASSWORD` to create the first admin. Login is limited to 10 attempts per 15 minutes per IP, and the call-back form to 6 requests per hour per IP, with a hidden spam trap. The browser no longer contains any demo password. Set `SITE_URL` so the sitemap uses your real domain. Set `VITE_GA_ID` (at build time) to turn on Google Analytics.

The server compresses pages (gzip), tells browsers to keep versioned scripts for a year and photos for a week, and sends basic security headers. Admin changes are never saved "locally" if the server is unreachable: you get an error and nothing changes.

Tests (each runs against a temporary database):

```bash
npm test                # products, auth, routes (run `npm run build` first: one check loads the built site)
npm run test:features   # offers, call-backs, enquiries, password change, sitemap
```
