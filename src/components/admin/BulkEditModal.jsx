import { useEffect, useRef, useState } from "react";
import Icon from "../Icon";
import { api } from "../../lib/api";
import { downloadFile, productsToCsv, sheetToRows } from "../../utils/priceSheet";

const FIELD_LABEL = { price: "Price", offer_price: "Offer price", offer_label: "Offer name", offer_ends: "Offer ends", status: "Visibility" };
const show = (v) => (v === null || v === undefined || v === "" ? "none" : String(v));

/** Edit prices, offers and visibility for many products at once in a spreadsheet. */
export default function BulkEditModal({ products, onClose, onApplied }) {
  const [rows, setRows] = useState(null);
  const [fileName, setFileName] = useState("");
  const [result, setResult] = useState(null); // server preview
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const fileInput = useRef(null);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  function download() {
    const date = new Date().toISOString().slice(0, 10);
    downloadFile(`mm-kitchen-prices-${date}.csv`, productsToCsv(products), "text/csv;charset=utf-8");
  }

  async function onFile(e) {
    const file = e.target.files[0];
    e.target.value = "";
    if (!file) return;
    setError(""); setResult(null); setRows(null); setFileName(file.name);
    setBusy(true);
    try {
      const parsed = sheetToRows(await file.text());
      setRows(parsed);
      setResult(await api("/api/products/import", { method: "POST", auth: true, body: { rows: parsed, apply: false } }));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function apply() {
    setBusy(true); setError("");
    try {
      const r = await api("/api/products/import", { method: "POST", auth: true, body: { rows, apply: true } });
      onApplied(r.summary.willChange);
    } catch (err) {
      setError(err.message);
      if (err.data?.errors) setResult(err.data);
    } finally {
      setBusy(false);
    }
  }

  const errors = result?.errors || [];
  const canApply = result && errors.length === 0 && result.summary.willChange > 0 && !busy;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-4">
      <div role="dialog" aria-modal="true" aria-label="Edit prices in a spreadsheet" className="bg-white w-full max-w-2xl max-h-[100dvh] sm:max-h-[92vh] sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        <div className="px-5 sm:px-6 py-4 border-b border-slate-200 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Edit prices in a spreadsheet</h2>
            <p className="text-sm text-slate-500 mt-0.5">Change many prices, offers or visibility at once in Excel or Google Sheets.</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="w-10 h-10 shrink-0 rounded-xl text-slate-500 hover:bg-slate-100 flex items-center justify-center"><Icon name="close" className="text-2xl" /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Step 1 */}
          <section className="flex gap-4">
            <span className="w-8 h-8 shrink-0 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center">1</span>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900">Download the sheet</h3>
              <p className="text-sm text-slate-500 mt-0.5">It lists all {products.length} products with their current price, offer and visibility.</p>
              <button onClick={download} className="mt-3 inline-flex items-center gap-2 h-11 px-5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-700 hover:border-primary hover:text-primary transition-colors">
                <Icon name="download" className="text-xl" /> Download price sheet (.csv)
              </button>
            </div>
          </section>

          {/* Step 2 */}
          <section className="flex gap-4">
            <span className="w-8 h-8 shrink-0 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center">2</span>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900">Edit it, then upload it back</h3>
              <ul className="text-sm text-slate-500 mt-1 space-y-1 list-disc pl-4">
                <li>Change only <strong className="text-slate-700">Price</strong>, <strong className="text-slate-700">Offer price</strong>, <strong className="text-slate-700">Offer name</strong>, <strong className="text-slate-700">Offer valid till</strong> and <strong className="text-slate-700">Status</strong> (Published or Draft).</li>
                <li>Leave an offer cell empty to <strong className="text-slate-700">remove</strong> that offer.</li>
                <li>Don't change the ID or Model columns. They tell us which product each row is.</li>
              </ul>
              <input ref={fileInput} type="file" accept=".csv,text/csv" className="hidden" onChange={onFile} />
              <button onClick={() => fileInput.current?.click()} disabled={busy} className="mt-3 inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-700 disabled:opacity-60 transition-colors">
                <Icon name="upload_file" className="text-xl" /> {fileName ? "Choose a different file" : "Choose your edited file"}
              </button>
              {fileName && <p className="mt-2 text-sm text-slate-600 flex items-center gap-1.5"><Icon name="description" className="text-base" />{fileName}</p>}
            </div>
          </section>

          {busy && !result && <p className="text-sm text-slate-500 pl-12">Checking your sheet…</p>}
          {error && <p role="alert" className="ml-12 text-sm font-medium text-rose-700 bg-rose-50 border border-rose-200 rounded-xl px-4 py-3">{error}</p>}

          {/* Step 3 */}
          {result && (
            <section className="flex gap-4">
              <span className="w-8 h-8 shrink-0 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center">3</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-900">Check what will change</h3>
                <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                  <div className="rounded-xl bg-emerald-50 border border-emerald-100 py-3"><p className="text-2xl font-bold text-emerald-700">{result.summary.willChange}</p><p className="text-xs text-emerald-800">will change</p></div>
                  <div className="rounded-xl bg-slate-50 border border-slate-200 py-3"><p className="text-2xl font-bold text-slate-700">{result.summary.unchanged}</p><p className="text-xs text-slate-600">unchanged</p></div>
                  <div className={`rounded-xl py-3 border ${errors.length ? "bg-rose-50 border-rose-200" : "bg-slate-50 border-slate-200"}`}><p className={`text-2xl font-bold ${errors.length ? "text-rose-700" : "text-slate-700"}`}>{result.summary.errors}</p><p className={`text-xs ${errors.length ? "text-rose-800" : "text-slate-600"}`}>problems</p></div>
                </div>

                {errors.length > 0 && (
                  <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50/60 p-4">
                    <p className="text-sm font-semibold text-rose-800 mb-2">Nothing will be saved until these rows are fixed:</p>
                    <ul className="text-sm text-rose-900 space-y-1 max-h-40 overflow-y-auto">
                      {errors.map((e, i) => <li key={i}><span className="font-semibold">Row {e.row}:</span> {e.message}</li>)}
                    </ul>
                  </div>
                )}

                {errors.length === 0 && result.preview.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-slate-700 mb-2">Preview{result.summary.willChange > result.preview.length ? ` (first ${result.preview.length} of ${result.summary.willChange})` : ""}</p>
                    <ul className="divide-y divide-slate-100 rounded-xl border border-slate-200 text-sm">
                      {result.preview.map((p) => (
                        <li key={p.id} className="p-3">
                          <p className="font-semibold text-slate-900 truncate">{p.title}</p>
                          {p.changes.map((c) => (
                            <p key={c.field} className="text-slate-600"><span className="text-slate-500">{FIELD_LABEL[c.field]}:</span> {show(c.from)} <Icon name="arrow_forward" className="text-sm align-middle text-slate-400" /> <strong className="text-slate-900">{show(c.to)}</strong></p>
                          ))}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {errors.length === 0 && result.summary.willChange === 0 && <p className="mt-4 text-sm text-slate-500">Everything in this sheet already matches the website, so there is nothing to change.</p>}
              </div>
            </section>
          )}
        </div>

        <div className="px-5 sm:px-6 py-3.5 border-t border-slate-200 flex items-center justify-end gap-3 bg-slate-50">
          <button onClick={onClose} className="h-11 px-5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-white">Cancel</button>
          <button onClick={apply} disabled={!canApply} className="h-11 px-6 rounded-xl bg-primary text-white text-sm font-semibold shadow-md shadow-primary/25 hover:bg-primary-container disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none inline-flex items-center gap-2 transition-colors">
            <Icon name="check" className="text-xl" />
            {busy && result ? "Saving…" : result?.summary.willChange ? `Save ${result.summary.willChange} change${result.summary.willChange === 1 ? "" : "s"}` : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
