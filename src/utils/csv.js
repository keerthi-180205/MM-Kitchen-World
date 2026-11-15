/** Minimal CSV helpers for the price sheet (Excel- and Google-Sheets-friendly). */

const needsQuotes = /[",\r\n]/;

/** rows: array of arrays of strings -> CSV text with a UTF-8 BOM so Excel shows ₹ correctly. */
export function toCsv(rows) {
  const body = rows
    .map((row) => row.map((cell) => {
      const v = cell === null || cell === undefined ? "" : String(cell);
      return needsQuotes.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
    }).join(","))
    .join("\r\n");
  return "﻿" + body + "\r\n";
}

/** CSV text -> array of arrays. Handles quotes, commas inside quotes, CRLF, and ";" sheets from some Excel locales. */
export function parseCsv(text) {
  const src = text.replace(/^﻿/, "");
  const firstLine = src.split(/\r?\n/, 1)[0] || "";
  const delimiter = firstLine.includes(",") || !firstLine.includes(";") ? "," : ";";

  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (inQuotes) {
      if (ch === '"') {
        if (src[i + 1] === '"') { cell += '"'; i++; } else inQuotes = false;
      } else cell += ch;
    } else if (ch === '"') inQuotes = true;
    else if (ch === delimiter) { row.push(cell); cell = ""; }
    else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && src[i + 1] === "\n") i++;
      row.push(cell); cell = "";
      rows.push(row); row = [];
    } else cell += ch;
  }
  if (cell !== "" || row.length) { row.push(cell); rows.push(row); }
  return rows.filter((r) => r.some((c) => c.trim() !== ""));
}

/** Sheet date forms people type or Excel produces -> 2026-11-15 (anything else is returned unchanged). */
export function normalizeDate(value) {
  const v = (value || "").trim();
  const m = v.match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})$/);
  if (!m) return v;
  const [, d, mo, y] = m;
  return `${y}-${mo.padStart(2, "0")}-${d.padStart(2, "0")}`;
}
