import { useEffect, useMemo, useState } from "react";
import Icon from "../Icon";
import ProductCard from "./ProductCard";
import { CATALOGUE_DOWNLOADS, CATALOGUE_PDF_BY_CATEGORY, ORDERED_CATEGORIES, assetUrl } from "../../constants";
import { useProducts } from "../../hooks/useProducts";

const PAGE_SIZE = 12; // products revealed per "Show more"

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
  const [activeSubcategory, setActiveSubcategory] = useState("ALL");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Reset subcategory and pagination when activeCategory changes
  useEffect(() => {
    setActiveSubcategory("ALL");
  }, [activeCategory]);

  // Start from the first page again whenever the result set changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [activeCategory, activeSubcategory, query]);

  const categoryRank = (cat) => {
    const idx = ORDERED_CATEGORIES.indexOf(cat);
    return idx === -1 ? 999 : idx;
  };

  const published = useMemo(() => {
    const pub = allProducts.filter((p) => p.status === "Published" || !p.status);
    return pub.slice().sort((a, b) => {
      const rA = categoryRank(a.category);
      const rB = categoryRank(b.category);
      if (rA !== rB) return rA - rB;
      if (a.subcategory !== b.subcategory) {
        return (a.subcategory || "").localeCompare(b.subcategory || "");
      }
      return (a.title || "").localeCompare(b.title || "");
    });
  }, [allProducts]);

  // Categories in the exact user-specified order
  const categories = useMemo(() => {
    const present = new Set(published.map((p) => p.category));
    const ordered = ORDERED_CATEGORIES.filter((c) => present.has(c));
    for (const c of present) {
      if (!ordered.includes(c)) ordered.push(c);
    }
    return ["ALL", ...ordered];
  }, [published]);

  // Map of category -> list of subcategories with counts (sorted by count descending)
  const categorySubcategoriesMap = useMemo(() => {
    const map = {};
    for (const p of published) {
      if (!map[p.category]) map[p.category] = {};
      const sub = p.subcategory || "Other";
      map[p.category][sub] = (map[p.category][sub] || 0) + 1;
    }
    const result = {};
    for (const cat of Object.keys(map)) {
      result[cat] = Object.entries(map[cat])
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);
    }
    return result;
  }, [published]);

  // Available subcategories for the currently active category
  const availableSubcategories = useMemo(() => {
    if (activeCategory === "ALL") return [];
    return categorySubcategoriesMap[activeCategory] || [];
  }, [categorySubcategoriesMap, activeCategory]);

  // Filtered products matching category, subcategory, and search query
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return published.filter((p) => {
      const matchCat = activeCategory === "ALL" || p.category === activeCategory;
      const matchSub = activeSubcategory === "ALL" || p.subcategory === activeSubcategory;
      const matchQuery =
        !q ||
        [p.id, p.title, p.model, p.brand, p.subcategory].some((v) =>
          (v || "").toLowerCase().includes(q)
        );
      return matchCat && matchSub && matchQuery;
    });
  }, [published, activeCategory, activeSubcategory, query]);

  const shown = useMemo(() => filtered.slice(0, visibleCount), [filtered, visibleCount]);
  const groups = useMemo(() => groupBySubcategory(shown), [shown]);
  const remaining = filtered.length - shown.length;

  const pdf = CATALOGUE_PDF_BY_CATEGORY[activeCategory];

  return (
    <section className="relative py-16 sm:py-24 bg-gradient-to-b from-[#EDF3FA] via-[#F6F9FC] to-[#EAF0F7] border-b border-slate-200/90 overflow-hidden" id="products">
      {/* Soft ambient lighting for high-end studio depth */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 right-10 w-[600px] h-[600px] rounded-full bg-sky-200/40 blur-3xl" />
        <div className="absolute top-1/3 -left-32 w-[520px] h-[520px] rounded-full bg-blue-100/40 blur-3xl" />
        <div className="absolute -bottom-32 right-1/4 w-[640px] h-[640px] rounded-full bg-slate-200/45 blur-3xl" />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 w-fit mb-2.5">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[11px] font-bold text-primary tracking-widest uppercase">
                MM Kitchen World · Product Catalogue
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Explore Our Kitchen Appliance Collection.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl leading-relaxed">
              Discover the right appliances for your home with our easy-to-browse product catalogue. Explore categories, compare specifications, search by model number and find products that perfectly match your kitchen requirements.
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xl mb-6">
          <Icon name="search" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl pointer-events-none" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by model, technology, or dimensions (e.g. CH 6052, 75 cm, DFVS, Glass)"
            aria-label="Search appliances"
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-slate-300/90 text-sm text-slate-900 placeholder:text-slate-400 shadow-xs focus:border-primary focus:ring-1 focus:ring-primary outline-hidden transition"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-semibold px-2 py-1 rounded bg-slate-100 hover:bg-slate-200"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Navigation Bar (Clean Luxury Pills) */}
        <div className="w-full max-w-full flex items-center gap-2 overflow-x-auto pb-4 mb-4 -mx-6 px-6 lg:mx-0 lg:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((cat) => {
            const count = cat === "ALL" ? published.length : published.filter((p) => p.category === cat).length;
            const isCatActive = activeCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => {
                  onSelectCategory(cat);
                  setActiveSubcategory("ALL");
                  setVisibleCount(PAGE_SIZE);
                }}
                className={`px-4 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all duration-150 whitespace-nowrap shrink-0 shadow-2xs ${
                  isCatActive
                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                    : "bg-white text-slate-700 border border-slate-300/80 hover:border-slate-500 hover:text-slate-900"
                }`}
                title={`Filter by ${cat}`}
              >
                {cat === "ALL" ? "All Appliances" : cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Dedicated Subcategory Dropdown & Quick-Filter Bar (Outside overflow container to prevent clipping) */}
        {activeCategory !== "ALL" && availableSubcategories.length > 1 && (
          <div className="mb-6 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-20">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center gap-2 shrink-0">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <label htmlFor="subcategory-select" className="text-xs font-bold uppercase tracking-wider text-slate-900 whitespace-nowrap">
                  Subcategory:
                </label>
              </div>

              {/* Elevated Dropdown Selector */}
              <div className="relative min-w-[240px] max-w-sm">
                <select
                  id="subcategory-select"
                  value={activeSubcategory}
                  onChange={(e) => setActiveSubcategory(e.target.value)}
                  className="w-full appearance-none pl-3.5 pr-10 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-300 text-xs sm:text-sm font-semibold text-slate-900 focus:border-primary focus:ring-1 focus:ring-primary cursor-pointer transition shadow-2xs outline-hidden"
                >
                  <option value="ALL">
                    All {activeCategory} ({availableSubcategories.reduce((a, b) => a + b.count, 0)})
                  </option>
                  {availableSubcategories.map((sub) => (
                    <option key={sub.name} value={sub.name}>
                      {sub.name} ({sub.count})
                    </option>
                  ))}
                </select>
                <Icon
                  name="unfold_more"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-lg text-slate-500 pointer-events-none"
                />
              </div>

              {activeSubcategory !== "ALL" && (
                <button
                  onClick={() => setActiveSubcategory("ALL")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors"
                  title="Clear subcategory filter"
                >
                  <span>Show All {activeCategory}</span>
                  <Icon name="close" className="text-sm" />
                </button>
              )}
            </div>

            {/* Quick-Select Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <button
                onClick={() => setActiveSubcategory("ALL")}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeSubcategory === "ALL"
                    ? "bg-primary text-white shadow-2xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                All
              </button>
              {availableSubcategories.map((sub) => (
                <button
                  key={sub.name}
                  onClick={() => setActiveSubcategory(sub.name)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                    activeSubcategory === sub.name
                      ? "bg-primary text-white shadow-2xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                  }`}
                >
                  {sub.name} ({sub.count})
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Count & Catalogue PDF Download Row */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 min-h-[2.5rem]">
          <p className="text-xs sm:text-sm text-slate-600" aria-live="polite">
            Showing <strong className="text-slate-900 font-bold">{shown.length}</strong> of {filtered.length}{" "}
            {activeSubcategory !== "ALL" ? activeSubcategory : filtered.length === 1 ? "appliance" : "appliances"}
          </p>
          {pdf ? (
            <a
              href={assetUrl(pdf)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 bg-white text-slate-800 hover:border-slate-500 hover:bg-slate-50 transition text-xs sm:text-sm font-bold shadow-2xs"
            >
              <Icon name="picture_as_pdf" className="text-base text-rose-600" />
              <span>Download {activeCategory} Catalogue (PDF)</span>
            </a>
          ) : (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-700 inline-flex items-center gap-1">
                <Icon name="download" className="text-base text-primary" />
                Catalogues:
              </span>
              {CATALOGUE_DOWNLOADS.map((c) => (
                <a
                  key={c.label}
                  href={assetUrl(c.file)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-full border border-slate-200 bg-white text-[11px] font-semibold text-slate-700 hover:border-slate-400 hover:text-slate-900 transition-colors shadow-2xs"
                >
                  {c.label}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Empty State */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <Icon name="search_off" className="text-3xl" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {query ? `No appliances match "${query}"` : "No products found in this selection"}
            </h3>
            <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
              Try adjusting your search criteria, reset the subcategory filter, or message us on WhatsApp for showroom availability.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition"
                >
                  Clear search
                </button>
              )}
              {activeSubcategory !== "ALL" && (
                <button
                  onClick={() => setActiveSubcategory("ALL")}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition"
                >
                  View All {activeCategory}
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Products Grid Grouped by Subcategory */
          <div className="space-y-12">
            {groups.map((g) => (
              <div key={g.subcategory}>
                {g.subcategory && (
                  <div className="mb-5 pb-3 border-b border-slate-200 flex items-baseline justify-between gap-4">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                      <span>{g.subcategory}</span>
                      <span className="text-xs font-normal text-slate-500">({g.items.length} models)</span>
                    </h3>
                  </div>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5">
                  {g.items.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More Pagination */}
        {remaining > 0 && (
          <div className="mt-12 flex flex-col items-center gap-3">
            <button
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE * 2)}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-white border border-slate-300 text-slate-800 text-sm font-bold hover:border-slate-500 hover:bg-slate-50 shadow-xs transition-colors"
            >
              <Icon name="expand_more" className="text-xl" />
              Show {Math.min(PAGE_SIZE * 2, remaining)} more models
            </button>
            <p className="text-xs text-slate-500">
              {remaining} more models available. Use category or subcategory filters to narrow down.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
