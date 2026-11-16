/**
 * Where the API server lives.
 *  - Same host (development, or one server serving everything): leave VITE_API_URL empty and calls stay relative.
 *  - Split hosting (website on Cloudflare Pages, API on Render): set VITE_API_URL at build time,
 *    e.g. https://mm-kitchen-api.onrender.com
 */
export const API_BASE = (import.meta.env.VITE_API_URL || "").trim().replace(/\/+$/, "");

export const apiUrl = (path) => `${API_BASE}${path}`;

/**
 * Free API hosts go to sleep when idle and need up to a minute to wake. Pinging the health check as soon as
 * a visitor arrives wakes the server while they browse, so it is ready by the time they send a form.
 */
export function warmUpApi() {
  if (!API_BASE) return;
  try {
    fetch(apiUrl("/api/health"), { method: "GET", cache: "no-store" }).catch(() => {});
  } catch {
    /* best effort */
  }
}
