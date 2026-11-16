import { API_BASE } from "./lib/apiBase";

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
  // Photos uploaded to the API server's own disk (development) are served by the API host.
  if (API_BASE && /^\/?uploads\//.test(path || "")) return `${API_BASE}/${path.replace(/^\//, "")}`;
  if (!path || /^(https?:|data:|blob:|\/)/.test(path)) return path;
  // Catalogues saved in a browser before the image clean-up still point at the old .png crops.
  const resolved = path.replace(/^(assets\/products\/.+)\.png$/, "$1.webp");
  return import.meta.env.BASE_URL + resolved;
}

export const ORDERED_CATEGORIES = [
  "Chimneys",
  "Gas Stoves",
  "Hobs",
  "Water Heaters",
  "Sinks",
  "Ovens",
  "Microwaves",
  "Dishwashers",
  "Cooking Range",
  "Small Appliances",
];

export const CATEGORY_ALIASES = {
  chimney: "Chimneys",
  chimneys: "Chimneys",
  stove: "Gas Stoves",
  stoves: "Gas Stoves",
  "gas stove": "Gas Stoves",
  "gas stoves": "Gas Stoves",
  hob: "Hobs",
  hobs: "Hobs",
  geyser: "Water Heaters",
  geysers: "Water Heaters",
  "geyser & water heater": "Water Heaters",
  "geysers & water heaters": "Water Heaters",
  "water heater": "Water Heaters",
  "water heaters": "Water Heaters",
  sink: "Sinks",
  sinks: "Sinks",
  oven: "Ovens",
  ovens: "Ovens",
  "micro oven": "Microwaves",
  microwave: "Microwaves",
  microwaves: "Microwaves",
  dishwasher: "Dishwashers",
  dishwashers: "Dishwashers",
  "cooking range": "Cooking Range",
  "small appliance": "Small Appliances",
  "small appliances": "Small Appliances",
};

export function normalizeCategory(cat) {
  if (!cat) return "ALL";
  const key = cat.trim().toLowerCase();
  return CATEGORY_ALIASES[key] || cat;
}

export const CATALOGUE_PDF_BY_CATEGORY = {
  Chimneys: "catalogues/MM-Kitchen-World-GLEN-Chimney-Catalogue.pdf",
  "Gas Stoves": "catalogues/MM-Kitchen-World-GLEN-Gas-Stove-Catalogue.pdf",
  Hobs: "catalogues/MM-Kitchen-World-GLEN-Hob-Catalogue.pdf",
  Geysers: "catalogues/MM-Kitchen-World-GLEN-Water-Heater-Catalogue.pdf",
  Sinks: "catalogues/MM-Kitchen-World-GLEN-Sink-Catalogue.pdf",
  Ovens: "catalogues/MM-Kitchen-World-GLEN-Oven-Microwave-Catalogue.pdf",
  Microwaves: "catalogues/MM-Kitchen-World-GLEN-Oven-Microwave-Catalogue.pdf",
  "Water Heaters": "catalogues/MM-Kitchen-World-GLEN-Water-Heater-Catalogue.pdf",
  Dishwashers: "catalogues/MM-Kitchen-World-GLEN-Dishwasher-Catalogue.pdf",
  "Cooking Range": "catalogues/MM-Kitchen-World-GLEN-Gas-Stove-Catalogue.pdf",
  "Small Appliances": "catalogues/MM-Kitchen-World-GLEN-Small-Appliances-Catalogue.pdf",
};

/** Every catalogue PDF, for the "download all" row shown when no category is selected. */
export const CATALOGUE_DOWNLOADS = [
  { label: "Chimneys", file: CATALOGUE_PDF_BY_CATEGORY.Chimneys },
  { label: "Gas Stoves", file: CATALOGUE_PDF_BY_CATEGORY["Gas Stoves"] },
  { label: "Hobs", file: CATALOGUE_PDF_BY_CATEGORY.Hobs },
  { label: "Geysers & Water Heaters", file: CATALOGUE_PDF_BY_CATEGORY["Water Heaters"] },
  { label: "Kitchen Sinks & Faucets", file: CATALOGUE_PDF_BY_CATEGORY.Sinks },
  { label: "Built-in Ovens & Microwaves", file: CATALOGUE_PDF_BY_CATEGORY.Ovens },
  { label: "Dishwashers", file: CATALOGUE_PDF_BY_CATEGORY.Dishwashers },
  { label: "Small Appliances", file: CATALOGUE_PDF_BY_CATEGORY["Small Appliances"] },
];

export const productPath = (p) => `/product/${p.id}`;

/** One WhatsApp message listing several products (used by "My List" and Compare). */
export function listEnquiryUrl(products, intro = "Hello MM Kitchen World, I am interested in these GLEN models. Please share the price and availability:") {
  const lines = products.map((p, i) => `${i + 1}. ${p.title}${p.model && p.model !== p.title ? ` (${p.model})` : ""}`);
  return whatsappUrl(`${intro}\n${lines.join("\n")}`);
}
