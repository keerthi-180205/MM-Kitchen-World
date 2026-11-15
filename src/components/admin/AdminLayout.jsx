import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../Icon";

const NAV_GROUPS = [
  {
    label: "Catalogue",
    items: [
      { key: "products", label: "Products", icon: "inventory_2" },
      { key: "offers", label: "Offers", icon: "local_offer" },
    ],
  },
  {
    label: "Customers",
    items: [
      { key: "leads", label: "Call-backs", icon: "call" },
      { key: "enquiries", label: "Enquiries", icon: "query_stats" },
    ],
  },
  {
    label: "Settings",
    items: [{ key: "account", label: "Account", icon: "lock" }],
  },
];

export const PAGE_TITLES = {
  products: { title: "Products", subtitle: "Manage the appliances shown on your website." },
  offers: { title: "Offers", subtitle: "Banners and announcements for your customers." },
  leads: { title: "Call-back requests", subtitle: "Customers who asked you to call them." },
  enquiries: { title: "Enquiries", subtitle: "What customers are asking about." },
  account: { title: "Account", subtitle: "Keep your admin login secure." },
};

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center text-white">
        <Icon name="kitchen" className="text-2xl" />
      </div>
      <div className="leading-tight">
        <span className="block text-[15px] font-bold tracking-wide text-white uppercase">MM Kitchen World</span>
        <span className="block text-[11px] uppercase tracking-[0.18em] text-white/60">Admin console</span>
      </div>
    </div>
  );
}

function NavList({ tab, onSelect, newLeads }) {
  return (
    <nav className="space-y-6" aria-label="Admin sections">
      {NAV_GROUPS.map((group) => (
        <div key={group.label}>
          <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">{group.label}</p>
          <ul className="space-y-1">
            {group.items.map((item) => {
              const active = tab === item.key;
              return (
                <li key={item.key}>
                  <button
                    role="tab"
                    aria-selected={active}
                    aria-current={active ? "page" : undefined}
                    onClick={() => onSelect(item.key)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      active ? "bg-white text-primary shadow-sm" : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon name={item.icon} className="text-xl" fill={active} />
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.key === "leads" && newLeads > 0 && (
                      <span className={`min-w-[22px] h-[22px] px-1.5 rounded-full text-[11px] font-bold flex items-center justify-center ${active ? "bg-rose-600 text-white" : "bg-rose-500 text-white"}`}>{newLeads}</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function SidebarFooter({ onLogout }) {
  return (
    <div className="space-y-1 pt-4 border-t border-white/15">
      <Link to="/" target="_blank" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-colors">
        <Icon name="open_in_new" className="text-xl" /> View website
      </Link>
      <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/80 hover:bg-rose-500/20 hover:text-white transition-colors">
        <Icon name="logout" className="text-xl" /> Log out
      </button>
    </div>
  );
}

/** Dashboard shell: sidebar on large screens, slide-over menu on small ones, page header with actions. */
export default function AdminLayout({ tab, onSelectTab, newLeads, onLogout, actions, children }) {
  const [drawer, setDrawer] = useState(false);
  const page = PAGE_TITLES[tab];

  useEffect(() => {
    if (!drawer) return undefined;
    const onKey = (e) => e.key === "Escape" && setDrawer(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [drawer]);

  const select = (key) => {
    onSelectTab(key);
    setDrawer(false);
  };

  return (
    <div className="min-h-screen bg-[#F3F5F9] text-slate-800 lg:pl-64">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 flex-col bg-gradient-to-b from-[#0B4F9C] to-[#073B78] px-4 py-6 gap-8 overflow-y-auto">
        <Brand />
        <div className="flex-1"><NavList tab={tab} onSelect={select} newLeads={newLeads} /></div>
        <SidebarFooter onLogout={onLogout} />
      </aside>

      {/* Mobile / tablet top bar */}
      <div className="lg:hidden sticky top-0 z-40 bg-gradient-to-r from-[#0B4F9C] to-[#073B78] px-4 h-14 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white/15 border border-white/20 flex items-center justify-center text-white"><Icon name="kitchen" className="text-xl" /></div>
          <span className="text-sm font-bold tracking-wide text-white uppercase">MM Kitchen World</span>
        </div>
        <button onClick={() => setDrawer(true)} aria-label="Open menu" className="relative w-10 h-10 rounded-lg text-white hover:bg-white/10 flex items-center justify-center">
          <Icon name="menu" className="text-2xl" />
          {newLeads > 0 && <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-rose-400 ring-2 ring-[#0B4F9C]"></span>}
        </button>
      </div>

      {drawer && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setDrawer(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 max-w-[85vw] flex flex-col bg-gradient-to-b from-[#0B4F9C] to-[#073B78] px-4 py-6 gap-8 shadow-2xl overflow-y-auto">
            <div className="flex items-start justify-between">
              <Brand />
              <button onClick={() => setDrawer(false)} aria-label="Close menu" className="w-9 h-9 rounded-lg text-white/80 hover:bg-white/10 flex items-center justify-center"><Icon name="close" /></button>
            </div>
            <div className="flex-1"><NavList tab={tab} onSelect={select} newLeads={newLeads} /></div>
            <SidebarFooter onLogout={onLogout} />
          </aside>
        </div>
      )}

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-8">
        <header className="flex flex-wrap items-start justify-between gap-4 mb-6 sm:mb-8">
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-slate-900">{page.title}</h1>
            <p className="text-sm text-slate-500 mt-1">{page.subtitle}</p>
          </div>
          {actions && <div className="flex flex-wrap items-center gap-2.5">{actions}</div>}
        </header>
        <main className="space-y-6">{children}</main>
      </div>
    </div>
  );
}
