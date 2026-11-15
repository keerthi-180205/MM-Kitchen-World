import { useCallback, useEffect, useState } from "react";
import Icon from "../Icon";
import { api } from "../../lib/api";

const STATUSES = ["New", "Contacted", "Closed"];
const STATUS_CLASS = {
  New: "bg-rose-50 text-rose-700 border-rose-200",
  Contacted: "bg-amber-50 text-amber-700 border-amber-200",
  Closed: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

/** Digits only, with India's +91 added to plain 10-digit mobile numbers. */
const waNumber = (phone) => phone.replace(/\D/g, "").replace(/^(\d{10})$/, "91$1");

const when = (iso) => {
  // SQLite CURRENT_TIMESTAMP is UTC without a zone marker.
  const d = new Date(iso.replace(" ", "T") + "Z");
  return d.toLocaleString("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });
};

/** Call-back requests customers submit from the website. */
export default function LeadsPanel({ showToast, onCount }) {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

  const load = useCallback(async () => {
    try {
      const list = await api("/api/leads", { auth: true });
      setLeads(list);
      onCount?.(list.filter((l) => l.status === "New").length);
    } catch (e) {
      showToast(e.message, true);
    } finally {
      setLoading(false);
    }
  }, [showToast, onCount]);
  useEffect(() => { load(); }, [load]);

  async function setStatus(l, status) {
    try { await api(`/api/leads/${l.id}`, { method: "PATCH", body: { status }, auth: true }); load(); }
    catch (e) { showToast(e.message, true); }
  }
  async function remove(l) {
    if (!window.confirm(`Delete the request from ${l.name}?`)) return;
    try { await api(`/api/leads/${l.id}`, { method: "DELETE", auth: true }); load(); }
    catch (e) { showToast(e.message, true); }
  }

  const shown = leads.filter((l) => filter === "ALL" || l.status === filter);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500">Customers who asked to be called. Mark each one as you follow up.</p>
        </div>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="bg-white border border-slate-200 rounded-lg py-2 px-3 text-sm font-semibold">
          <option value="ALL">All requests</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {loading ? <p className="text-sm text-slate-500">Loading…</p> : shown.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center">
          <Icon name="call" className="text-4xl text-primary" />
          <p className="font-semibold text-slate-900 mt-2">No requests {filter !== "ALL" ? `marked "${filter}"` : "yet"}</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {shown.map((l) => (
            <li key={l.id} className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <strong className="text-slate-900">{l.name}</strong>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${STATUS_CLASS[l.status] || ""}`}>{l.status}</span>
                    <span className="text-xs text-slate-500">{when(l.createdAt)}</span>
                  </div>
                  <a href={`tel:${l.phone}`} className="inline-flex items-center gap-1.5 mt-1 text-primary font-bold"><Icon name="call" className="text-base" />{l.phone}</a>
                  {l.productTitle && <p className="text-sm text-slate-500 mt-1">About: <strong>{l.productTitle}</strong></p>}
                  {l.message && <p className="text-sm text-slate-900 mt-1">“{l.message}”</p>}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <a href={`https://wa.me/${waNumber(l.phone)}`} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold hover:bg-emerald-100">WhatsApp</a>
                  <select value={l.status} onChange={(e) => setStatus(l, e.target.value)} className="bg-white border border-slate-200 rounded-lg py-1.5 px-2 text-xs font-semibold" aria-label="Status">
                    {STATUSES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                  <button onClick={() => remove(l)} aria-label="Delete request" className="w-8 h-8 rounded-lg bg-red-50 border border-red-200 text-error flex items-center justify-center hover:bg-red-100"><Icon name="delete" className="text-base" /></button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
