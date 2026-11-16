import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./storefront/Header";
import Footer from "./storefront/Footer";
import OfferBanner from "./storefront/OfferBanner";
import TrustBar from "./storefront/TrustBar";
import CompareBar from "./storefront/CompareBar";
import WhatsAppFab from "./storefront/WhatsAppFab";
import { initAnalytics, trackPageView } from "../lib/analytics";
import { warmUpApi } from "../lib/apiBase";

/** Chrome shared by every customer-facing page. */
export default function SiteLayout() {
  const { pathname } = useLocation();

  useEffect(() => initAnalytics(), []);
  useEffect(() => warmUpApi(), []);
  useEffect(() => trackPageView(pathname), [pathname]);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2.5 focus:rounded-lg focus:bg-primary focus:text-white focus:font-semibold focus:shadow-xl">
        Skip to main content
      </a>
      <TrustBar />
      <OfferBanner />
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
      <CompareBar />
      <WhatsAppFab />
    </>
  );
}
