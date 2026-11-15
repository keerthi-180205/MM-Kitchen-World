import { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import SiteLayout from "./components/SiteLayout";
import Storefront from "./pages/Storefront";
import NotFound from "./pages/NotFound";

// Only the home page ships in the first download. Everything else loads when it is opened,
// so customers never download the admin dashboard.
const ProductPage = lazy(() => import("./pages/ProductPage"));
const Compare = lazy(() => import("./pages/Compare"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const ChimneyGuide = lazy(() => import("./pages/ChimneyGuide"));
const Faq = lazy(() => import("./pages/Faq"));
const Privacy = lazy(() => import("./pages/Legal").then((m) => ({ default: m.Privacy })));
const Terms = lazy(() => import("./pages/Legal").then((m) => ({ default: m.Terms })));
const Admin = lazy(() => import("./pages/Admin"));

function PageLoading() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center" role="status" aria-label="Loading">
      <div className="w-9 h-9 rounded-full border-4 border-outline-variant border-t-primary animate-spin"></div>
    </div>
  );
}

/** Scroll to the #hash target after route changes (e.g. "/#products"), or to the top on a new page. */
function ScrollToHash() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // Wait a tick so the target page has rendered.
      const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView(), 50);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
    return undefined;
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToHash />
      <Suspense fallback={<PageLoading />}>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Storefront />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/guides/chimney-size" element={<ChimneyGuide />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/admin" element={<Admin />} />
      </Routes>
      </Suspense>
    </>
  );
}
