# Deploying MM Kitchen World for free

Setup used: **Cloudflare Pages** (website) + **Render** (API) + **Turso** (database) + **Cloudinary** (product photos), with the domain bought at **Hostinger**.

```
Customer's browser ──► Cloudflare Pages   www.yourdomain.com      (the React website, always fast)
                  └──► Render             mm-kitchen-api.onrender.com   (the API: login, products, offers)
                                            ├──► Turso        (the database: products, offers)
                                            └──► Cloudinary   (product photos uploaded in the admin)
```

All four have a free plan. Screens and menu names change from time to time, so if a button is not where this guide says, look for the closest match.

## What to expect from the free plans

- **Render free sleeps after about 15 minutes without visitors.** The next visitor waits up to about a minute for the API to wake. The website itself opens instantly; only prices, offers and the admin wait. The site shows the built-in catalogue meanwhile and pings the API as soon as a page opens, so most visitors never notice.
- Render's free disk is wiped on every restart, which is why the database lives on Turso and photos on Cloudinary. Nothing important is stored on Render.
- Turso and Cloudinary free plans are far above what one showroom catalogue needs. Check each provider's current limits before you rely on this.
- The wake-up delay is avoided by the free uptime monitor in step 3. If that ever stops working, Render's cheapest paid plan removes sleeping. Nothing else has to change.

## 0. Before you start

You need free accounts on GitHub, Cloudflare, Render, Turso and Cloudinary. Push this project to a **private GitHub repository** (never commit a `.env` file).

Decide your final web address, for example `https://www.mmkitchenworld.com`. Below it is called `YOUR_SITE`.

## 1. Database: Turso

1. Sign up at turso.tech and create a database (choose the region nearest India).
2. Copy its URL (looks like `libsql://your-db-name-yourname.turso.io`).
3. Create an access token for it and copy it.

Using the Turso command line instead:

```bash
turso db create mm-kitchen
turso db show mm-kitchen --url
turso db tokens create mm-kitchen
```

Keep the URL and token for step 3. The server creates all tables itself on first start.

## 2. Photos: Cloudinary

1. Sign up at cloudinary.com.
2. In the dashboard, open **API Keys** and copy the **API environment variable**. It looks like `cloudinary://123456789:abcDEF@your-cloud-name`.

Keep it for step 3. Uploaded photos are automatically served in a compressed, fast format.

## 3. API: Render

1. In Render choose **New + → Blueprint** and select your GitHub repository. It reads `render.yaml` and creates the `mm-kitchen-api` service on the free plan.
2. Fill in the environment variables it asks for:

| Variable | Value |
|---|---|
| `ADMIN_EMAIL` | the owner's login email |
| `ADMIN_PASSWORD` | a strong password, 10+ characters (can be changed later in Admin → Account) |
| `TURSO_DATABASE_URL` | from step 1 |
| `TURSO_AUTH_TOKEN` | from step 1 |
| `CLOUDINARY_URL` | from step 2 |
| `SITE_URL` | `YOUR_SITE`, e.g. `https://www.mmkitchenworld.com` |
| `ALLOWED_ORIGINS` | every address the website will open from, comma-separated: `https://www.mmkitchenworld.com,https://mmkitchenworld.com,https://mm-kitchen.pages.dev` |

`JWT_SECRET` is generated for you.

3. Deploy. When it is live, open `https://<your-service>.onrender.com/api/health`. You should see `{"status":"ok", ...}`. Note this address, it is `API_URL` below.

If a browser later complains about CORS, the address in the browser's address bar is missing from `ALLOWED_ORIGINS`.

### Keep the API awake (stops the slow first visit)

Render's free API sleeps after about 15 minutes with no visitors. A free monitor that opens `/api/health` every 5 minutes keeps it awake.

1. Sign up at uptimerobot.com (free plan).
2. **Add New Monitor** → type **HTTP(s)** → URL `https://<your-service>.onrender.com/api/health` → interval **5 minutes** → create.
3. Wait 20 minutes, then open the admin. It should respond at once.

Render's free plan allows about 750 running hours a month, which covers one service running all month. Do not run a second free service on the same Render account. Free-plan terms can change, so recheck Render's terms now and then. If keeping it awake ever stops working, Render's cheapest paid plan removes sleeping entirely and nothing else needs to change.

## 4. Website: Cloudflare Pages

1. In Cloudflare choose **Workers & Pages → Create → Pages → Connect to Git** and pick the repository.
2. Build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
3. Environment variables (Production):

| Variable | Value |
|---|---|
| `NODE_VERSION` | `22` |
| `VITE_API_URL` | `API_URL` from step 3, with no trailing slash |
| `SITE_URL` | `YOUR_SITE` (used for the sitemap and robots.txt) |
| `VITE_GA_ID` | optional Google Analytics ID |

   Cloudflare may show its newer **Workers** flow instead of Pages. That works too: the repo has a `wrangler.jsonc` that serves `dist` as a single-page app. Keep the default deploy command `npx wrangler deploy`, and add the variables above as **Build variables** (Advanced settings), not runtime variables, because they are read while the site is built.
4. Deploy. You get a `*.pages.dev` or `*.workers.dev` address. Open it and check that products appear and the admin login works at `/admin`.

`VITE_API_URL` is baked in at build time. If you change it, trigger a new deploy.

## 5. Connect the Hostinger domain

Recommended: **use Cloudflare's free nameservers.** Pages needs this to serve the main (non-www) address, and it also gives free HTTPS and caching.

1. In Cloudflare choose **Add a site**, enter your domain and pick the Free plan. Cloudflare scans existing DNS records.
2. **Check that every existing record was imported, especially `MX` and `TXT` records.** If the owner uses email on this domain (Hostinger email, Google Workspace), losing these records stops email. Compare with Hostinger's DNS zone (hPanel → Domains → DNS / Nameservers) and add any that are missing.
3. Cloudflare shows two nameservers. In Hostinger hPanel open **Domains → your domain → DNS / Nameservers → Change nameservers**, choose custom nameservers and paste Cloudflare's two. Propagation takes anywhere from minutes to a day.
4. In your Pages project open **Custom domains → Set up a custom domain** and add both `www.yourdomain.com` and `yourdomain.com`. Cloudflare creates the DNS records.
5. Optionally redirect one to the other (Rules → Redirect Rules) so there is a single address.

If the Hostinger domain also has a Hostinger website or hosting attached, that old site stops being reachable once the nameservers move. Check first.

**Alternative without moving nameservers:** in Hostinger's DNS zone add a `CNAME` record `www` pointing to `<your-project>.pages.dev`. This covers the `www` address only; the bare domain would need a redirect to `www` from Hostinger's own forwarding option.

Optional, for a tidy API address: in Render add `api.yourdomain.com` as a custom domain, add the CNAME Render shows, then set `VITE_API_URL=https://api.yourdomain.com` in Cloudflare and redeploy. Not required.

When the domain is live, make sure `SITE_URL` and `ALLOWED_ORIGINS` on Render match it exactly, then use **Manual Deploy → Deploy latest commit** if you changed them.

## 6. Move your existing products and offers

The new database starts with the built-in GLEN catalogue. To copy what is in your local development database instead (price changes, offers, enquiries), run this on your computer once:

```bash
# preview only, writes nothing
TURSO_DATABASE_URL=libsql://... TURSO_AUTH_TOKEN=... npm run migrate:turso

# copy for real (replaces what is in Turso)
TURSO_DATABASE_URL=libsql://... TURSO_AUTH_TOKEN=... npm run migrate:turso -- --yes
```

## 7. Everyday use

- Admin is at `/admin` on the website. Log in with `ADMIN_EMAIL` and `ADMIN_PASSWORD`.
- Changes appear on the live website immediately. No redeploy is needed for products, prices, offers or photos.
- Download a **Backup** from the admin every few weeks.
- A code change pushed to GitHub redeploys both Cloudflare and Render automatically.

## 8. Final checklist

- [ ] `https://<api>/api/health` returns ok
- [ ] The UptimeRobot monitor shows "Up"
- [ ] Website opens on your domain with HTTPS, and on the `www` and bare addresses
- [ ] Admin login works; a test product can be added with a photo
- [ ] The "Call Store" button on a product page opens the phone dialler, and "Enquire on WhatsApp" opens WhatsApp
- [ ] `https://yourdomain.com/sitemap.xml` lists your products
- [ ] Email on the domain still works (if used)
- [ ] The default admin password was changed
