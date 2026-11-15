import { useEffect, useMemo, useState } from "react";
import Icon from "../Icon";
import ProductCard from "./ProductCard";
import { CATALOGUE_DOWNLOADS, CATALOGUE_PDF_BY_CATEGORY, assetUrl } from "../../constants";
import { useProducts } from "../../hooks/useProducts";

const PAGE_SIZE = 12; // products revealed per "Show more" (a full catalogue is ~200 cards)

/** Group by subcategory (insertion order) so e.g. Cooking Range sits under its own heading. */
function groupBySubcategory(products) {
  const groups = new Map();
  for (const p of products) {
    const key = p.subcategory || "";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(p);
  }
  return [...groups].map(([subcategory, items]) => ({ subcategory, items }));
}

export default function Catalogue({ activeCategory, onSelectCategory }) {
  const allProducts = useProducts();
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Start from the first page again whenever the result set changes.
  useEffect(() => setVisibleCount(PAGE_SIZE), [activeCategory, query]);

  const published = useMemo(
    () => allProducts.filter((p) => p.status === "Published" || !p.status),
    [allProducts]
  );
  const categories = useMemo(() => ["ALL", ...new Set(published.map((p) => p.category))], [published]);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return published.filter(
      (p) =>
        (activeCategory === "ALL" || p.category === activeCategory) &&
        (!q || [p.title, p.model, p.brand, p.subcategory].some((v) => (v || "").toLowerCase().includes(q)))
    );
  }, [published, activeCategory, query]);
  const shown = useMemo(() => filtered.slice(0, visibleCount), [filtered, visibleCount]);
  const groups = useMemo(() => groupBySubcategory(shown), [shown]);
  const remaining = filtered.length - shown.length;

  const pdf = CATALOGUE_PDF_BY_CATEGORY[activeCategory];

  return (
    <section className="py-14 sm:py-20 bg-surface-container-low/50 border-b border-outline-variant" id="products">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-bold section-eyebrow mb-2">The Complete GLEN Range</span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Compare Every Model and Enquire in One Tap</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">Search by model number, filter by category and message us on WhatsApp for today's price. You can also download a printable catalogue to plan your kitchen at home.</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-xl mb-5">
          <Icon name="search" className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search model or name, e.g. CH 6052"
            aria-label="Search appliances"
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant text-sm shadow-sm focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Category filter chips */}
        <div className="w-full max-w-full flex items-center gap-2 overflow-x-auto pb-4 mb-4 -mx-6 px-6 lg:mx-0 lg:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((cat) => {
            const count = cat === "ALL" ? published.length : published.filter((p) => p.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-primary text-white shadow-sm"
                    : "bg-surface-container-lowest text-on-surface-variant border border-outline-variant hover:border-primary hover:text-primary"
                }`}
              >
                {cat === "ALL" ? "All Appliances" : cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Catalogue PDF download (when a single category is selected) */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 min-h-[2.5rem]">
          <p className="text-sm text-on-surface-variant" aria-live="polite">
            Showing <strong className="text-on-surface">{shown.length}</strong> of {filtered.length} {filtered.length === 1 ? "appliance" : "appliances"}
          </p>
          {pdf ? (
            <a href={assetUrl(pdf)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition font-label-md text-label-md font-bold">
              <Icon name="picture_as_pdf" className="text-base" />
              <span>Download {activeCategory} Catalogue (PDF)</span>
            </a>
          ) : (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-on-surface inline-flex items-center gap-1.5">
                <Icon name="download" className="text-lg text-primary" />
                Download catalogues:
              </span>
              {CATALOGUE_DOWNLOADS.map((c) => (
                <a key={c.label} href={assetUrl(c.file)} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-full border border-outline-variant bg-surface-container-lowest text-xs font-bold text-primary hover:border-primary hover:bg-primary hover:text-white transition-colors">
                  {c.label}
                </a>
              ))}
            </div>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-surface-container-lowest rounded-xl border border-outline-variant p-6">
            <div className="w-16 h-16 rounded-full bg-surface-container-low text-primary flex items-center justify-center mx-auto mb-3">
              <Icon name="kitchen" className="text-3xl" />
            </div>
            <h3 className="font-bold text-lg text-on-surface">{query ? `No appliances match "${query}"` : "No products matching this category"}</h3>
            <p className="text-sm text-on-surface-variant mt-1">Try a different search or category, or contact our Basaveshwara Nagar showroom for stock availability.</p>
            {query && (
              <button onClick={() => setQuery("")} className="mt-4 px-4 py-2 rounded-lg border border-primary text-primary text-sm font-semibold hover:bg-primary hover:text-white transition">Clear search</button>
            )}
          </div>
        ) : (
          <div className="space-y-10">
            {groups.map((g) => (
              <div key={g.subcategory}>
                {g.subcategory && (
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-4 pb-2 border-b border-outline-variant flex items-center gap-2">
                    {g.subcategory}
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-normal">({g.items.length})</span>
                  </h3>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {g.items.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {remaining > 0 && (
          <div className="mt-10 flex flex-col items-center gap-3">
            <button
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE * 2)}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-surface-container-lowest border border-primary text-primary font-label-lg text-label-lg font-bold hover:bg-primary hover:text-white shadow-sm transition-colors"
            >
              <Icon name="expand_more" className="text-xl" />
              Show {Math.min(PAGE_SIZE * 2, remaining)} more appliances
            </button>
            <p className="text-xs text-on-surface-variant">{remaining} more in this selection. Use search or the category filters to narrow it down.</p>
          </div>
        )}

      </div>

    </section>
  );
}
