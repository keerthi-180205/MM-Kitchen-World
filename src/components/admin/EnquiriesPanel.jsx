import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../lib/api";

const SOURCE_LABEL = {
  card: "Product card", "product-page": "Product page", compare: "Compare page", wishlist: "My List",
  floating: "Floating button", header: "Header", hero: "Hero", banner: "Offer banner", other: "Other / general",
};

const when = (iso) => new Date(iso.replace(" ", "T") + "Z").toLocaleString("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });

/** Which products customers tap "Enquire" on. */
export default function EnquiriesPanel({ showToast }) {
  const [days, setDays] = useState(30);
  const [data, setData] = useState(null);

  useEffect(() => {
    let alive = true;
    api(`/api/enquiries/summary?days=${days}`, { auth: true })
      .then((d) => alive && setData(d))
      .catch((e) => showToast(e.message, true));
    return () => { alive = false; };
  }, [days, showToast]);

  const max = Math.max(...(data?.perProduct.map((p) => p.count) || [1]), 1);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500">How many times customers tapped a WhatsApp or enquiry button. No personal details are stored here.</p>
        </div>
        <select value={days} onChange={(e) => setDays(Number(e.target.value))} className="bg-white border border-slate-200 rounded-lg py-2 px-3 text-sm font-semibold">
          <option value={7}>Last 7 days</option><option value={30}>Last 30 days</option><option value={90}>Last 90 days</option><option value={365}>Last year</option>
        </select>
      </div>

      {!data ? <p className="text-sm text-slate-500">Loading…</p> : (
        <>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 inline-block">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">Enquiry taps</span>
            <span className="text-4xl font-extrabold text-primary">{data.total}</span>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <section className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="font-bold text-slate-900 mb-4">Most-asked-about products</h3>
              {data.perProduct.length === 0 ? <p className="text-sm text-slate-500">Nothing yet. Taps will appear here as customers enquire.</p> : (
                <ol className="space-y-3">
                  {data.perProduct.map((p, i) => (
                    <li key={p.productId}>
                      <div className="flex items-center justify-between gap-3 text-sm">
                        <Link to={`/product/${p.productId}`} target="_blank" className="font-semibold text-slate-900 hover:text-primary truncate">{i + 1}. {p.title}</Link>
                        <span className="font-bold text-primary shrink-0">{p.count}</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100 mt-1.5 overflow-hidden"><div className="h-full bg-primary rounded-full" style={{ width: `${(p.count / max) * 100}%` }} /></div>
                    </li>
                  ))}
                </ol>
              )}
            </section>

            <div className="space-y-6">
              <section className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="font-bold text-slate-900 mb-3">Where from</h3>
                {data.bySource.length === 0 ? <p className="text-sm text-slate-500">No data yet.</p> : (
                  <ul className="space-y-2 text-sm">
                    {data.bySource.map((s) => <li key={s.source} className="flex justify-between"><span className="text-slate-500">{SOURCE_LABEL[s.source] || s.source}</span><strong>{s.count}</strong></li>)}
                  </ul>
                )}
              </section>
              <section className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="font-bold text-slate-900 mb-3">Latest</h3>
                {data.recent.length === 0 ? <p className="text-sm text-slate-500">No data yet.</p> : (
                  <ul className="space-y-2 text-xs">
                    {data.recent.slice(0, 8).map((r, i) => <li key={i} className="flex justify-between gap-2"><span className="truncate text-slate-900">{r.title || "General enquiry"}</span><span className="text-slate-500 shrink-0">{when(r.createdAt)}</span></li>)}
                  </ul>
                )}
              </section>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
