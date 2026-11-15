import { normalizeDate, parseCsv, toCsv } from "./csv";

const HEADER = ["ID", "Model", "Product", "Category", "Price", "Offer price", "Offer name", "Offer valid till (YYYY-MM-DD)", "Status"];

/** Build the downloadable sheet from the catalogue (all products, drafts included). */
export function productsToCsv(products) {
  return toCsv([
    HEADER,
    ...products.map((p) => [
      p.id, p.model || "", p.title, p.category,
      p.price || "", p.offerPrice || "", p.offerLabel || "", p.offerEnds || "",
      p.status === "Draft" ? "Draft" : "Published",
    ]),
  ]);
}

const KEY_BY_HEADER = (h) => {
  const t = h.trim().toLowerCase().replace(/\s+/g, " ");
  if (t === "id") return "id";
  if (t === "model" || t === "model number") return "model";
  if (t === "price") return "price";
  if (t === "offer price") return "offerPrice";
  if (t === "offer name" || t === "offer label") return "offerLabel";
  if (t.startsWith("offer valid") || t.startsWith("offer ends")) return "offerEnds";
  if (t === "status") return "status";
  return null; // Product, Category, anything else is for reading only
};

/** CSV text -> rows for the import endpoint. Throws a readable Error if the sheet isn't ours. */
export function sheetToRows(text) {
  const table = parseCsv(text);
  if (table.length < 2) throw new Error("That file has no product rows.");
  const keys = table[0].map(KEY_BY_HEADER);
  if (!keys.includes("id") && !keys.includes("model")) {
    throw new Error("This doesn't look like the price sheet: it needs an ID or Model column. Download the sheet again and edit that file.");
  }
  if (!keys.includes("price") && !keys.includes("offerPrice") && !keys.includes("status")) {
    throw new Error("The sheet needs at least a Price, Offer price or Status column.");
  }
  return table.slice(1).map((cells) => {
    const row = {};
    keys.forEach((k, i) => { if (k) row[k] = (cells[i] ?? "").trim(); });
    if (row.offerEnds) row.offerEnds = normalizeDate(row.offerEnds);
    return row;
  });
}

export function downloadFile(filename, content, type) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
