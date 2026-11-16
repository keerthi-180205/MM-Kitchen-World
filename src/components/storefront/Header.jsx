 import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../Icon";
import HashLink from "../HashLink";
import { useShop } from "../../context/ShopContext";
import { trackEnquiry } from "../../lib/analytics";
import { PHONE_TEL, whatsappUrl, assetUrl } from "../../constants";
import { useScrollSpy } from "../../hooks/useScrollSpy";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#products", label: "Products" },
  { href: "#categories", label: "Categories" },
  { href: "#installations", label: "Our Work" },
  { href: "#brands", label: "Why Us" },
  { href: "#showroom", label: "Showroom" },
  { href: "#contact", label: "Contact" },
];

// Page order (differs from the nav order above) for the scroll-spy.
const SPY_SECTIONS = ["#home", "#categories", "#products", "#installations", "#brands", "#showroom", "#contact"];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [spy, activate] = useScrollSpy(SPY_SECTIONS);
  const { pathname } = useLocation();
  const { wishlist } = useShop();
  const active = pathname === "/" ? spy : null; // section highlight only applies to the home page

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md supports-[backdrop-filter]:bg-white/80 border-b border-outline-variant/70 shadow-sm">
      <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-12 flex items-center justify-between gap-2 sm:gap-4 h-16 sm:h-20 min-w-0">
        {/* Brand logo */}
        <Link className="flex items-center gap-2.5 sm:gap-3 group min-w-0 shrink" to="/">
          <div className="w-9 h-9 sm:w-11 sm:h-11 shrink-0 rounded-xl bg-white border border-outline-variant/80 shadow-xs flex items-center justify-center p-1 sm:p-1.5 transition-transform duration-150 group-hover:scale-95 overflow-hidden">
            <img src={assetUrl("assets/brand/mm-logo-mark.webp")} alt="MM Kitchen World Logo" className="w-full h-full object-contain" />
          </div>
          <div className="min-w-0">
            <span className="font-headline-md text-[14px] xs:text-[16px] sm:text-[19px] xl:text-[20px] text-primary uppercase font-bold block leading-none truncate">MM Kitchen World</span>
            <span className="font-label-sm text-[9px] xs:text-[10px] sm:text-label-sm text-on-surface-variant uppercase tracking-wider sm:tracking-widest mt-1 block truncate">Glen Exclusive Store</span>
          </div>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden xl:flex items-center gap-3.5 2xl:gap-6 min-w-0 mx-3 2xl:mx-8 shrink-0" id="desktopNav">
          {NAV_LINKS.map(({ href, label }) => (
            <HashLink
              key={href}
              to={href}
              onClick={() => activate(href)}
              className={`nav-link whitespace-nowrap text-xs 2xl:text-sm font-semibold pb-1 border-b-2 transition-all duration-150 ${
                active === href
                  ? "text-primary font-bold border-primary"
                  : "text-on-surface-variant hover:text-primary border-transparent"
              }`}
            >
              {label}
            </HashLink>
          ))}
        </nav>

        {/* Trailing action cluster */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0 ml-auto">
          <a
            aria-label="Call us on 97432 33729"
            title="Call: 97432 33729"
            className="hidden xl:inline-flex items-center justify-center gap-2 px-3 py-2 2xl:px-3.5 2xl:py-2.5 rounded-xl border border-outline-variant bg-white text-slate-800 hover:bg-slate-50 hover:border-slate-400 transition-colors duration-150 text-xs 2xl:text-sm font-semibold shadow-2xs shrink-0"
            href={`tel:${PHONE_TEL}`}
          >
            <Icon name="call" className="text-primary text-base" />
            <span className="hidden 2xl:inline whitespace-nowrap">Call: 97432 33729</span>
          </a>
          <Link
            to="/wishlist"
            aria-label={`My list, ${wishlist.length} saved`}
            title="My List"
            className="hidden sm:flex relative w-10 h-10 sm:w-11 sm:h-11 rounded-lg border border-outline-variant items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary hover:bg-surface-container-low transition-colors"
          >
            <Icon name="favorite" className="text-xl" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">{wishlist.length}</span>
            )}
          </Link>
          <a onClick={() => trackEnquiry(null, "header")} aria-label="Chat on WhatsApp" className="flex items-center justify-center gap-2 w-9 h-9 sm:w-10 sm:h-10 md:w-auto md:h-auto md:px-4 md:py-2.5 xl:w-11 xl:h-11 xl:p-0 2xl:w-auto 2xl:h-auto 2xl:px-4 2xl:py-2.5 rounded-lg bg-tertiary text-on-tertiary font-label-md text-label-md shadow-sm hover:brightness-105 active:scale-98 transition-all duration-150 shrink-0" href={whatsappUrl()} rel="noopener noreferrer" target="_blank">
            <Icon name="chat" className="text-on-tertiary text-lg" />
            <span className="hidden md:inline xl:hidden 2xl:inline whitespace-nowrap">Chat on WhatsApp</span>
          </a>
          <Link
            to="/admin"
            aria-label="Admin Portal"
            title="Admin Portal"
            className="w-9 h-9 sm:w-auto sm:px-3 sm:py-2 flex items-center justify-center gap-1.5 rounded-lg border border-outline-variant bg-surface hover:bg-surface-container-low text-on-surface hover:text-primary transition-colors font-label-md text-label-md font-semibold shrink-0"
          >
            <Icon name="lock" className="text-base text-primary" />
            <span className="hidden sm:inline whitespace-nowrap">Admin</span>
          </Link>
          <button
            className="xl:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-outline-variant flex items-center justify-center text-on-surface hover:bg-surface-container-low transition-colors shrink-0"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            <Icon name={mobileOpen ? "close" : "menu"} className="text-xl sm:text-2xl" />
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      <nav className={`xl:hidden ${mobileOpen ? "" : "hidden"} border-t border-outline-variant bg-surface-container-lowest`}>
        <div className="px-6 py-4 flex flex-col gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <HashLink
              key={href}
              to={href}
              onClick={() => setMobileOpen(false)}
              className="nav-link font-label-md text-label-md text-on-surface py-2.5 border-b border-outline-variant"
            >
              {label}
            </HashLink>
          ))}
          <Link to="/wishlist" onClick={() => setMobileOpen(false)} className="nav-link font-label-md text-label-md text-on-surface py-2.5 border-b border-outline-variant">My List ({wishlist.length})</Link>
          <Link to="/guides/chimney-size" onClick={() => setMobileOpen(false)} className="nav-link font-label-md text-label-md text-on-surface py-2.5 border-b border-outline-variant">Chimney Size Guide</Link>
          <Link to="/admin" onClick={() => setMobileOpen(false)} className="nav-link font-label-md text-label-md text-primary font-bold py-2.5 flex items-center gap-2">
            <Icon name="lock" className="text-base text-primary" />
            <span>Admin Portal</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
