import { useCallback, useEffect, useState } from "react";
import Icon from "../Icon";
import { api } from "../../lib/api";
import { formatDate } from "../../utils/price";

const blank = { title: "", message: "", linkLabel: "", linkUrl: "", startsAt: "", endsAt: "", active: true };
const field = "w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-primary focus:border-primary";
const label = "block text-xs font-bold text-slate-900 uppercase mb-1";

function statusOf(o) {
  const today = new Date().toISOString().slice(0, 10);
  if (!o.active) return { text: "Switched off", cls: "bg-slate-100 text-slate-600 border-slate-200" };
  if (o.startsAt && o.startsAt > today) return { text: "Scheduled", cls: "bg-amber-50 text-amber-700 border-amber-200" };
  if (o.endsAt && o.endsAt < today) return { text: "Expired", cls: "bg-slate-100 text-slate-600 border-slate-200" };
  return { text: "Live", cls: "bg-emerald-50 text-emerald-700 border-emerald-200" };
}

/** Banner offers shown at the top of the storefront. (Per-product offer prices are set in the product form.) */
export default function OffersPanel({ showToast }) {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null | offer | "new"
  const [form, setForm] = useState(blank);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    try {
      setOffers(await api("/api/offers/all", { auth: true }));
    } catch (e) {
      showToast(e.message, true);
    } finally {
      setLoading(false);
    }
  }, [showToast]);
  useEffect(() => { load(); }, [load]);

  const open = (offer) => {
    setEditing(offer || "new");
    setForm(offer ? { ...blank, ...offer } : blank);
  };
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function save(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const body = { ...form };
      if (editing === "new") await api("/api/offers", { method: "POST", body, auth: true });
      else await api(`/api/offers/${editing.id}`, { method: "PUT", body, auth: true });
      showToast("Offer saved. It's live on the website.");
      setEditing(null);
      load();
    } catch (err) {
      showToast(err.message, true);
    } finally {
      setSaving(false);
    }
  }

  async function toggle(o) {
    try {
      await api(`/api/offers/${o.id}`, { method: "PUT", body: { ...o, active: !o.active }, auth: true });
      load();
    } catch (err) { showToast(err.message, true); }
  }
  async function remove(o) {
    if (!window.confirm(`Delete the offer "${o.title}"?`)) return;
    try {
      await api(`/api/offers/${o.id}`, { method: "DELETE", auth: true });
      showToast("Offer deleted.");
      load();
    } catch (err) { showToast(err.message, true); }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500">These appear as a banner at the top of the website between the dates you choose. To put an offer price on a product, edit the product.</p>
        </div>
        <button onClick={() => open(null)} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold shadow hover:bg-primary/90">
          <Icon name="add_circle" className="text-base" /> New offer
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-slate-500">Loading…</p>
      ) : offers.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center">
          <Icon name="local_offer" className="text-4xl text-primary" />
          <p className="font-semibold text-slate-900 mt-2">No offers yet</p>
          <p className="text-sm text-slate-500">Create one, for example "Diwali Sale: up to X% off chimneys, till 15 Nov".</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {offers.map((o) => {
            const st = statusOf(o);
            return (
              <li key={o.id} className="rounded-2xl border border-slate-200 bg-white p-4 flex flex-wrap items-center gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${st.cls}`}>{st.text}</span>
                    <strong className="text-slate-900">{o.title}</strong>
                  </div>
                  {o.message && <p className="text-sm text-slate-500 mt-1">{o.message}</p>}
                  <p className="text-xs text-slate-500 mt-1">
                    {o.startsAt ? `From ${formatDate(o.startsAt)}` : "Starts immediately"} · {o.endsAt ? `until ${formatDate(o.endsAt)}` : "no end date"}
                    {o.linkLabel && ` · Button: "${o.linkLabel}"`}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => toggle(o)} className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold hover:bg-slate-50">{o.active ? "Switch off" : "Switch on"}</button>
                  <button onClick={() => open(o)} aria-label="Edit offer" className="w-9 h-9 rounded-lg border border-slate-200 text-primary flex items-center justify-center hover:bg-slate-50"><Icon name="edit" className="text-base" /></button>
                  <button onClick={() => remove(o)} aria-label="Delete offer" className="w-9 h-9 rounded-lg bg-red-50 border border-red-200 text-error flex items-center justify-center hover:bg-red-100"><Icon name="delete" className="text-base" /></button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={save} className="bg-white rounded-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto p-6 space-y-4 shadow-2xl">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-bold text-primary">{editing === "new" ? "New offer" : "Edit offer"}</h3>
              <button type="button" onClick={() => setEditing(null)} aria-label="Close" className="text-slate-500"><Icon name="close" /></button>
            </div>
            <div>
              <label className={label}>Headline *</label>
              <input required maxLength={140} value={form.title} onChange={set("title")} placeholder="e.g. Diwali Sale: up to X% off chimneys" className={field} />
            </div>
            <div>
              <label className={label}>Extra line</label>
              <input maxLength={300} value={form.message} onChange={set("message")} placeholder="e.g. Free installation guidance. Limited stock." className={field} />
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className={label}>Button text</label>
                <input maxLength={40} value={form.linkLabel} onChange={set("linkLabel")} placeholder="e.g. Shop chimneys" className={field} />
              </div>
              <div>
                <label className={label}>Button link</label>
                <input value={form.linkUrl} onChange={set("linkUrl")} placeholder="/?category=Chimneys#products" className={field} />
              </div>
            </div>
            <p className="text-[11px] text-slate-500 -mt-2">Links can be a page on this site (like /?category=Chimneys#products), a section (#products) or a full https:// address.</p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div><label className={label}>Starts on</label><input type="date" value={form.startsAt} onChange={set("startsAt")} className={field} /></div>
              <div><label className={label}>Ends on</label><input type="date" value={form.endsAt} onChange={set("endsAt")} className={field} /></div>
            </div>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.active} onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))} className="rounded text-primary" /> Show this offer on the website</label>
            <div className="flex justify-end gap-3 pt-2 border-t border-slate-200">
              <button type="button" onClick={() => setEditing(null)} className="px-4 py-2 rounded-lg border border-slate-200 text-sm">Cancel</button>
              <button disabled={saving} className="px-5 py-2 rounded-lg bg-primary text-white text-sm font-semibold disabled:opacity-60">{saving ? "Saving…" : "Save offer"}</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
