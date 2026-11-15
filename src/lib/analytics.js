/**
 * Analytics and enquiry tracking.
 *  - Google Analytics loads only if VITE_GA_ID is set (e.g. G-XXXXXXXXXX), with IP anonymisation.
 *  - Enquiry taps are counted on our own server (no personal data) so the owner sees what customers ask about.
 */
const GA_ID = import.meta.env.VITE_GA_ID;

export function initAnalytics() {
  if (!GA_ID || typeof document === "undefined" || window.__gaLoaded) return;
  window.__gaLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { anonymize_ip: true, send_page_view: false });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
  document.head.appendChild(script);
}

export function trackPageView(path) {
  window.gtag?.("event", "page_view", { page_path: path });
}

/** Record a WhatsApp / enquiry tap. Never blocks or breaks the click it belongs to. */
export function trackEnquiry(productId, source = "other") {
  try {
    fetch("/api/enquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: productId || null, source }),
      keepalive: true,
    }).catch(() => {});
    window.gtag?.("event", "enquiry_click", { product_id: productId || undefined, source });
  } catch {
    /* tracking must never affect the page */
  }
}
