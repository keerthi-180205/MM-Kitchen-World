import { useEffect, useMemo, useState } from "react";
import Icon from "../Icon";
import AdminLayout from "./AdminLayout";
import ProductsTable from "./ProductsTable";
import ProductFormModal from "./ProductFormModal";
import BulkEditModal from "./BulkEditModal";
import OffersPanel from "./OffersPanel";
import LeadsPanel from "./LeadsPanel";
import EnquiriesPanel from "./EnquiriesPanel";
import AccountPanel from "./AccountPanel";
import { api } from "../../lib/api";
import { useProducts } from "../../hooks/useProducts";
import * as ProductsStore from "../../store/productsStore";
import { getOffer } from "../../utils/price";

const STATS = [
  { key: "total", label: "Total products", sub: "In your catalogue", icon: "inventory_2", tone: "bg-blue-50 text-blue-600" },
  { key: "published", label: "Live on website", sub: "Visible to customers", icon: "check_circle", tone: "bg-emerald-50 text-emerald-600" },
  { key: "draft", label: "Drafts", sub: "Hidden from customers", icon: "edit_note", tone: "bg-amber-50 text-amber-600" },
  { key: "offers", label: "On offer", sub: "With an active offer price", icon: "local_offer", tone: "bg-rose-50 text-rose-600" },
];

const STATUS_FILTERS = [
  { key: "ALL", label: "All" },
  { key: "Published", label: "Live" },
  { key: "Draft", label: "Drafts" },
];

export default function Dashboard({ onLogout, showToast }) {
  const products = useProducts();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [refreshing, setRefreshing] = useState(false);
  const [tab, setTab] = useState("products");
  const [newLeads, setNewLeads] = useState(0);

  // Badge: how many call-back requests are still marked "New".
  useEffect(() => {
    api("/api/leads", { auth: true })
      .then((list) => setNewLeads(list.filter((l) => l.status === "New").length))
      .catch(() => {});
  }, []);
  // null = closed, { product: null } = adding, { product } = editing
  const [formState, setFormState] = useState(null);
  const [bulkOpen, setBulkOpen] = useState(false);

  const categories = useMemo(() => ["ALL", ...new Set(products.map((p) => p.category))], [products]);

  const stats = useMemo(
    () => ({
      total: products.length,
      published: products.filter((p) => p.status === "Published").length,
      draft: products.filter((p) => p.status === "Draft").length,
      offers: products.filter((p) => getOffer(p)).length,
    }),
    [products]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((p) => {
      const matchesCategory = categoryFilter === "ALL" || p.category === categoryFilter;
      const matchesStatus = statusFilter === "ALL" || p.status === statusFilter;
      const matchesSearch =
        !q ||
        (p.title || "").toLowerCase().includes(q) ||
        (p.model || "").toLowerCase().includes(q) ||
        (p.brand || "").toLowerCase().includes(q) ||
        (p.category || "").toLowerCase().includes(q);
      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [products, search, statusFilter, categoryFilter]);

  async function handleRefresh() {
    setRefreshing(true);
    try {
      await ProductsStore.fetchProducts();
      showToast("Refreshed catalog from server!");
    } catch {
      showToast("Could not sync with server.", true);
    } finally {
      setRefreshing(false);
    }
  }

  async function toggleStatus(p) {
    const newStatus = p.status === "Published" ? "Draft" : "Published";
    try {
      await ProductsStore.update(p.id, { status: newStatus });
      showToast(newStatus === "Published" ? "Product is now live on the website." : "Product hidden from the website (draft).");
    } catch (err) {
      showToast(err.message || "Failed to update status", true);
    }
  }

  async function deleteProduct(p) {
    if (window.confirm(`Delete "${p.title}"?\nIt will be permanently removed from the website. This cannot be undone.`)) {
      try {
        await ProductsStore.remove(p.id);
        showToast("Product deleted.");
      } catch (err) {
        showToast(err.message || "Failed to delete appliance", true);
      }
    }
  }

  async function resetCatalog() {
    if (window.confirm("Reset catalog back to initial 283 verified GLEN appliances? This will restore default items.")) {
      try {
        await ProductsStore.resetToDefaults();
        showToast("Catalog reset to 283 verified GLEN appliances!");
      } catch (err) {
        showToast(err.message || "Failed to reset catalog", true);
      }
    }
  }

  async function saveProduct(id, payload) {
    try {
      if (id) {
        await ProductsStore.update(id, payload);
        showToast("Changes saved.");
      } else {
        await ProductsStore.add(payload);
        showToast(payload.status === "Draft" ? "Product saved as a draft. It is hidden from customers." : "Product added and live on the website.");
      }
      setFormState(null);
    } catch (e) {
      console.error(e);
      showToast(e.message || "Could not save appliance.", true);
    }
  }

  const actions =
    tab === "products" ? (
      <>
        <button
          onClick={() => setBulkOpen(true)}
          className="inline-flex items-center gap-2 h-11 px-4 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition-colors"
          title="Edit many prices and offers in a spreadsheet"
        >
          <Icon name="table_view" className="text-xl" />
          <span className="hidden sm:inline">Edit prices in bulk</span>
        </button>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="inline-flex items-center gap-2 h-11 px-4 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 shadow-sm disabled:opacity-60 transition-colors"
          title="Reload the latest products from the server"
        >
          <Icon name="sync" className={`text-xl ${refreshing ? "animate-spin" : ""}`} />
          <span className="hidden sm:inline">Refresh</span>
        </button>
        <button
          onClick={() => setFormState({ product: null })}
          className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-primary text-white text-sm font-semibold shadow-md shadow-primary/25 hover:bg-primary-container active:scale-[0.98] transition-all"
        >
          <Icon name="add" className="text-xl" />
          Add product
        </button>
      </>
    ) : null;

  return (
    <AdminLayout tab={tab} onSelectTab={setTab} newLeads={newLeads} onLogout={onLogout} actions={actions}>
      {tab === "offers" && <OffersPanel showToast={showToast} />}
      {tab === "leads" && <LeadsPanel showToast={showToast} onCount={setNewLeads} />}
      {tab === "enquiries" && <EnquiriesPanel showToast={showToast} />}
      {tab === "account" && <AccountPanel showToast={showToast} />}

      {tab === "products" && (
        <>
          {/* Metrics */}
          <section aria-label="Catalogue summary" className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
            {STATS.map((s) => (
              <div key={s.key} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-500">{s.label}</span>
                  <span className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.tone}`}><Icon name={s.icon} className="text-xl" /></span>
                </div>
                <p className="mt-3 text-3xl sm:text-[34px] font-bold tracking-tight text-slate-900 leading-none">{stats[s.key]}</p>
                <p className="mt-2 text-xs text-slate-500">{s.sub}</p>
              </div>
            ))}
          </section>

          {/* Filters + table */}
          <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="p-4 sm:p-5 space-y-4 border-b border-slate-100">
              <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                <div className="relative flex-1">
                  <Icon name="search" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="search"
                    placeholder="Search by name, model or brand"
                    aria-label="Search products"
                    className="w-full h-11 pl-11 pr-4 rounded-xl bg-slate-50 border border-slate-200 text-sm placeholder:text-slate-400 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                  />
                </div>
                <div role="group" aria-label="Filter by status" className="inline-flex p-1 rounded-xl bg-slate-100 self-start lg:self-auto">
                  {STATUS_FILTERS.map((f) => (
                    <button
                      key={f.key}
                      onClick={() => setStatusFilter(f.key)}
                      aria-pressed={statusFilter === f.key}
                      className={`px-4 h-9 rounded-lg text-sm font-semibold transition-all ${statusFilter === f.key ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-0.5 -mx-1 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {categories.map((cat) => {
                  const count = cat === "ALL" ? products.length : products.filter((p) => p.category === cat).length;
                  const active = categoryFilter === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      aria-pressed={active}
                      className={`shrink-0 inline-flex items-center gap-2 h-9 pl-4 pr-3 rounded-full text-sm font-medium transition-colors ${
                        active ? "bg-primary text-white shadow-sm" : "bg-white border border-slate-200 text-slate-600 hover:border-primary/50 hover:text-primary"
                      }`}
                    >
                      {cat === "ALL" ? "All categories" : cat}
                      <span className={`min-w-[24px] h-5 px-1.5 rounded-full text-[11px] font-semibold flex items-center justify-center ${active ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <ProductsTable
              products={filtered}
              total={products.length}
              onToggleStatus={toggleStatus}
              onEdit={(product) => setFormState({ product })}
              onDelete={deleteProduct}
              onResetCatalog={resetCatalog}
              onClearFilters={() => { setSearch(""); setStatusFilter("ALL"); setCategoryFilter("ALL"); }}
            />
          </section>
        </>
      )}

      {bulkOpen && (
        <BulkEditModal
          products={products}
          onClose={() => setBulkOpen(false)}
          onApplied={async (n) => {
            setBulkOpen(false);
            await ProductsStore.fetchProducts();
            showToast(`${n} product${n === 1 ? "" : "s"} updated.`);
          }}
        />
      )}

      {formState && (
        <ProductFormModal
          key={formState.product?.id ?? "new"}
          product={formState.product}
          onSave={saveProduct}
          onClose={() => setFormState(null)}
          onError={(msg) => showToast(msg, true)}
        />
      )}
    </AdminLayout>
  );
}
