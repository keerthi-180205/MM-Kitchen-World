/** "₹18,990" / "Rs. 18990" -> 18990, or null if there's no number. */
export function parseRupees(value) {
  const digits = String(value ?? "").replace(/[^\d.]/g, "");
  if (!digits) return null;
  const n = parseFloat(digits);
  return Number.isFinite(n) ? n : null;
}

export const formatRupees = (n) => "₹" + Math.round(n).toLocaleString("en-IN");

/** "Contact showroom for price" / "Price on request" are placeholders, not prices. */
export const isPlaceholderPrice = (price) => !price || /request|contact/i.test(price);

/**
 * Current offer for a product (or null): offer price, the original price when it is a real
 * number, the saving, the label and when it ends. Expired offers return null.
 */
export function getOffer(p, today = new Date().toISOString().slice(0, 10)) {
  if (!p?.offerPrice) return null;
  if (p.offerEnds && p.offerEnds < today) return null;
  const offer = parseRupees(p.offerPrice);
  const original = isPlaceholderPrice(p.price) ? null : parseRupees(p.price);
  const save = offer !== null && original !== null && original > offer ? original - offer : null;
  return {
    price: p.offerPrice,
    original: save !== null ? p.price : null,
    save: save !== null ? formatRupees(save) : null,
    label: p.offerLabel || "Offer",
    ends: p.offerEnds || null,
  };
}

export function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}
