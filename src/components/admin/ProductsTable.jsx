import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../Icon";
import { assetUrl, productPath } from "../../constants";
import { formatDate, getOffer, isPlaceholderPrice } from "../../utils/price";

const PAGE_SIZE = 25;

function Thumb({ product: p, size = "w-14 h-14" }) {
  return (
    <div className={`${size} shrink-0 rounded-xl bg-white border border-slate-200 p-1.5 flex items-center justify-center`}>
      <img src={assetUrl(p.image)} alt="" className="max-h-full max-w-full object-contain mix-blend-multiply" loading="lazy" />
    </div>
  );
}

function ModelChip({ product: p }) {
  if (!p.model || p.model.trim().toLowerCase() === (p.title || "").trim().toLowerCase()) return null;
  return <span className="font-mono text-[11px] font-medium text-slate-600 bg-slate-100 rounded px-1.5 py-0.5">{p.model}</span>;
}

function TagPill({ product: p }) {
  if (!p.tag) return null;
  return <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 border border-blue-100 rounded-full px-2 py-0.5">{p.tag}</span>;
}

/** A real on/off switch: live on the website, or a hidden draft. */
function VisibilitySwitch({ product: p, onToggle }) {
  const live = p.status === "Published";
  return (
    <button
      role="switch"
      aria-checked={live}
      aria-label={`${p.title}: ${live ? "live on website" : "draft"}. Click to ${live ? "hide" : "publish"}`}
      onClick={() => onToggle(p)}
      className="inline-flex items-center gap-2.5"
    >
      <span className={`relative w-10 h-6 rounded-full transition-colors ${live ? "bg-emerald-500" : "bg-slate-300"}`}>
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${live ? "translate-x-4" : ""}`} />
      </span>
      <span className={`text-xs font-semibold ${live ? "text-emerald-700" : "text-slate-500"}`}>{live ? "Live" : "Draft"}</span>
    </button>
  );
}

function PriceCell({ product: p }) {
  const offer = getOffer(p);
  if (offer) {
    return (
      <div>
        <div className="flex items-baseline gap-2">
          <span className="font-semibold text-rose-600">{offer.price}</span>
          {offer.original && <span className="text-xs text-slate-400 line-through">{offer.original}</span>}
        </div>
        <span className="text-[11px] text-slate-500">{offer.label}{offer.ends ? ` · till ${formatDate(offer.ends)}` : ""}</span>
      </div>
    );
  }
  if (isPlaceholderPrice(p.price)) return <span className="text-sm text-slate-400">On request</span>;
  return <span className="font-semibold text-slate-800">{p.price}</span>;
}

function SpecsCell({ product: p }) {
  const specs = (p.specs || []).slice(0, 2);
  if (!specs.length) return <span className="text-slate-300">–</span>;
  return (
    <dl className="space-y-0.5 text-[13px]">
      {specs.map((s) => (
        <div key={s.label} className="flex gap-2">
          <dt className="text-slate-500 shrink-0">{s.label}</dt>
          <dd className="font-medium text-slate-800 truncate max-w-[10rem]" title={s.value}>{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function RowActions({ product: p, onEdit, onDelete, big = false }) {
  const size = big ? "w-10 h-10" : "w-9 h-9";
  const base = `${size} rounded-lg flex items-center justify-center transition-colors`;
  return (
    <div className="flex items-center justify-end gap-1">
      <Link to={productPath(p)} target="_blank" title="View on website" aria-label={`View ${p.title} on the website`} className={`${base} text-slate-500 hover:bg-slate-100 hover:text-slate-800`}>
        <Icon name="open_in_new" className="text-xl" />
      </Link>
      <button onClick={() => onEdit(p)} title="Edit" aria-label={`Edit ${p.title}`} className={`${base} text-slate-500 hover:bg-blue-50 hover:text-primary`}>
        <Icon name="edit" className="text-xl" />
      </button>
      <button onClick={() => onDelete(p)} title="Delete" aria-label={`Delete ${p.title}`} className={`${base} text-slate-500 hover:bg-rose-50 hover:text-rose-600`}>
        <Icon name="delete" className="text-xl" />
      </button>
    </div>
  );
}

export default function ProductsTable({ products, total, onToggleStatus, onEdit, onDelete, onResetCatalog, onClearFilters }) {
  const [limit, setLimit] = useState(PAGE_SIZE);
  // Back to the first page whenever the filtered list changes size.
  useEffect(() => setLimit(PAGE_SIZE), [products.length]);
  const visible = products.slice(0, limit);
  const remaining = products.length - visible.length;

  if (products.length === 0) {
    const catalogueEmpty = total === 0;
    return (
      <div className="py-16 px-6 text-center">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mb-4">
          <Icon name={catalogueEmpty ? "inventory_2" : "search_off"} className="text-3xl" />
        </div>
        <h3 className="text-base font-semibold text-slate-900">{catalogueEmpty ? "Your catalogue is empty" : "No products match your search"}</h3>
        <p className="text-sm text-slate-500 max-w-sm mx-auto mt-1 mb-5">
          {catalogueEmpty ? "Add your first product, or restore the 283 verified GLEN models." : "Try a different word, or clear the filters to see everything again."}
        </p>
        {catalogueEmpty ? (
          <button onClick={onResetCatalog} className="px-5 h-11 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-container transition-colors">Restore GLEN catalogue</button>
        ) : (
          <button onClick={onClearFilters} className="px-5 h-11 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors">Clear filters</button>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="px-4 sm:px-5 py-3 text-sm text-slate-500 border-b border-slate-100 bg-slate-50/60" aria-live="polite">
        Showing <strong className="text-slate-800">{visible.length}</strong> of <strong className="text-slate-800">{products.length}</strong>
        {products.length !== total && <> (filtered from {total})</>} products
      </div>

      {/* Phones: one card per product */}
      <ul className="md:hidden divide-y divide-slate-100">
        {visible.map((p) => (
          <li key={p.id} className="p-4">
            <div className="flex gap-3">
              <Thumb product={p} size="w-16 h-16" />
              <div className="min-w-0 flex-1">
                <h4 className="font-semibold text-slate-900 leading-snug break-words">{p.title}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{p.category}{p.subcategory ? ` · ${p.subcategory}` : ""}</p>
                <div className="flex flex-wrap items-center gap-1.5 mt-1.5"><ModelChip product={p} /><TagPill product={p} /></div>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between gap-3">
              <PriceCell product={p} />
              <VisibilitySwitch product={p} onToggle={onToggleStatus} />
            </div>
            <div className="mt-2 pt-2 border-t border-slate-100"><RowActions product={p} onEdit={onEdit} onDelete={onDelete} big /></div>
          </li>
        ))}
      </ul>

      {/* Tablet / desktop: table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 bg-slate-50 border-b border-slate-200">
              <th scope="col" className="py-3 pl-5 pr-3">Product</th>
              <th scope="col" className="py-3 px-3">Category</th>
              <th scope="col" className="py-3 px-3 hidden xl:table-cell">Key specs</th>
              <th scope="col" className="py-3 px-3">Price</th>
              <th scope="col" className="py-3 px-3">Visibility</th>
              <th scope="col" className="py-3 pl-3 pr-5 text-right"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {visible.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3 pl-5 pr-3">
                  <div className="flex items-center gap-3.5 min-w-[16rem]">
                    <Thumb product={p} />
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-900 leading-snug line-clamp-2">{p.title}</p>
                      <div className="flex flex-wrap items-center gap-1.5 mt-1"><ModelChip product={p} /><TagPill product={p} /></div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-3 whitespace-nowrap">
                  <p className="font-medium text-slate-800">{p.category}</p>
                  {p.subcategory && <p className="text-xs text-slate-500 max-w-[12rem] truncate" title={p.subcategory}>{p.subcategory}</p>}
                </td>
                <td className="py-3 px-3 hidden xl:table-cell"><SpecsCell product={p} /></td>
                <td className="py-3 px-3 whitespace-nowrap"><PriceCell product={p} /></td>
                <td className="py-3 px-3 whitespace-nowrap"><VisibilitySwitch product={p} onToggle={onToggleStatus} /></td>
                <td className="py-3 pl-3 pr-5"><RowActions product={p} onEdit={onEdit} onDelete={onDelete} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {remaining > 0 && (
        <div className="p-4 border-t border-slate-100 text-center bg-slate-50/60">
          <button onClick={() => setLimit((l) => l + PAGE_SIZE * 2)} className="px-6 h-11 rounded-xl bg-white border border-slate-300 text-slate-700 text-sm font-semibold hover:border-primary hover:text-primary shadow-sm transition-colors">
            Show {Math.min(PAGE_SIZE * 2, remaining)} more ({remaining} remaining)
          </button>
        </div>
      )}
    </>
  );
}
