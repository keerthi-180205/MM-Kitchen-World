export const WHATSAPP_NUMBER = "919743233729";
export const PHONE_TEL = "+919743233729";

// Social & Channel Links
export const YOUTUBE_URL = "https://youtube.com/@glenshowroombasaveshwarnagar?si=nIo0VL64Zhvu_sU1";
export const INSTAGRAM_URL = "https://www.instagram.com/mmkitchenworld.glenchimneyshop";

// Google Business Profile: home installation photos, videos, ratings and reviews.
// Permanent Google Maps link for the business (cid = the listing's ID), instead of a short
// maps.app.goo.gl link that depends on a redirect and can fail in some apps.
export const GMB_URL = "https://www.google.com/maps?cid=4811143146357491421";

// Showroom hours & schedule
export const SHOWROOM_TIMINGS = "10:30 AM to 8:30 PM";
export const SHOWROOM_DAYS = "Open all days";
export const SHOWROOM_HOURS_LABEL = "Open all days · 10:30 AM to 8:30 PM";

// Shown on the website. Seen on the Google profile on 10 Nov 2026; update if it changes.
export const GOOGLE_RATING = { score: 4.7, count: 139 };

export function whatsappUrl(text) {
  return `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

export function productEnquiryUrl(p) {
  return whatsappUrl(
    `Hello MM Kitchen World, I am interested in the GLEN ${p.title}, Model ${p.model || ""}. Please share the price and availability.`
  );
}

/** Resolve a catalog image/PDF path: absolute URLs and data URIs pass through, relative paths hit /public. */
export function assetUrl(path) {
  if (!path || /^(https?:|data:|blob:|\/)/.test(path)) return path;
  // Catalogues saved in a browser before the image clean-up still point at the old .png crops.
  const resolved = path.replace(/^(assets\/products\/.+)\.png$/, "$1.webp");
  return import.meta.env.BASE_URL + resolved;
}

export const CATALOGUE_PDF_BY_CATEGORY = {
  Chimneys: "catalogues/MM-Kitchen-World-GLEN-Chimney-Catalogue.pdf",
  Ovens: "catalogues/MM-Kitchen-World-GLEN-Oven-Microwave-Catalogue.pdf",
  Microwaves: "catalogues/MM-Kitchen-World-GLEN-Oven-Microwave-Catalogue.pdf",
  "Gas Stoves": "catalogues/MM-Kitchen-World-GLEN-Gas-Stove-Catalogue.pdf",
  Hobs: "catalogues/MM-Kitchen-World-GLEN-Hob-Catalogue.pdf",
  Dishwashers: "catalogues/MM-Kitchen-World-GLEN-Dishwasher-Catalogue.pdf",
};

/** Every catalogue PDF, for the "download all" row shown when no category is selected. */
export const CATALOGUE_DOWNLOADS = [
  { label: "Chimneys", file: CATALOGUE_PDF_BY_CATEGORY.Chimneys },
  { label: "Ovens & Microwaves", file: CATALOGUE_PDF_BY_CATEGORY.Ovens },
  { label: "Gas Stoves", file: CATALOGUE_PDF_BY_CATEGORY["Gas Stoves"] },
  { label: "Hobs", file: CATALOGUE_PDF_BY_CATEGORY.Hobs },
  { label: "Dishwashers", file: CATALOGUE_PDF_BY_CATEGORY.Dishwashers },
];

export const productPath = (p) => `/product/${p.id}`;

/** One WhatsApp message listing several products (used by "My List" and Compare). */
export function listEnquiryUrl(products, intro = "Hello MM Kitchen World, I am interested in these GLEN models. Please share the price and availability:") {
  const lines = products.map((p, i) => `${i + 1}. ${p.title}${p.model && p.model !== p.title ? ` (${p.model})` : ""}`);
  return whatsappUrl(`${intro}\n${lines.join("\n")}`);
}
