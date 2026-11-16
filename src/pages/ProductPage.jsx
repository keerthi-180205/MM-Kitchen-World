import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Icon from "../components/Icon";
import { WhatsAppIcon } from "../components/BrandIcons";
import ProductCard from "../components/storefront/ProductCard";
import CallbackForm from "../components/storefront/CallbackForm";
import { CATALOGUE_PDF_BY_CATEGORY, PHONE_TEL, assetUrl, productEnquiryUrl, whatsappUrl } from "../constants";
import { useShop } from "../context/ShopContext";
import { useProducts } from "../hooks/useProducts";
import { useSeo } from "../hooks/useSeo";
import { trackEnquiry } from "../lib/analytics";
import { formatDate, getOffer, isPlaceholderPrice, parseRupees } from "../utils/price";

function buildJsonLd(p, offer) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.title,
    sku: p.model || undefined,
    brand: { "@type": "Brand", name: "GLEN" },
    category: p.category,
    description: p.description || `${p.title}, a GLEN ${p.category.toLowerCase()} available at MM Kitchen World, Bangalore.`,
    image: p.image ? new URL(assetUrl(p.image), window.location.origin).href : undefined,
  };
  const price = parseRupees(offer ? offer.price : isPlaceholderPrice(p.price) ? null : p.price);
  if (price) {
    ld.offers = { "@type": "Offer", priceCurrency: "INR", price, url: window.location.href };
  }
  return ld;
}

export default function ProductPage() {
  const { id } = useParams();
  const [shareNote, setShareNote] = useState("");
  const products = useProducts();
  const { inWishlist, inCompare, toggleWishlist, toggleCompare } = useShop();
  const p = products.find((x) => x.id === id && (x.status === "Published" || !x.status));

  const offer = p ? getOffer(p) : null;
  const specSummary = p ? (p.specs || []).slice(0, 3).map((s) => `${s.label}: ${s.value}`).join(", ") : "";
  useSeo({
    title: p ? `${p.title}${p.model && p.model !== p.title ? ` (${p.model})` : ""} | GLEN ${p.category}` : "Product not found",
    description: p
      ? `${p.title}: GLEN ${p.category.toLowerCase()} at MM Kitchen World, Basaveshwara Nagar, Bangalore. ${specSummary}. Enquire on WhatsApp for today's price.`
      : "This product could not be found.",
    jsonLd: p ? buildJsonLd(p, offer) : undefined,
  });

  if (!p) {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-surface-container-low text-primary flex items-center justify-center mb-4">
          <Icon name="search_off" className="text-3xl" />
        </div>
        <h1 className="font-headline-md text-headline-md font-bold text-on-surface">We couldn't find that appliance</h1>
        <p className="text-on-surface-variant mt-2 mb-6">It may have been removed or renamed. Browse the full range or ask us on WhatsApp.</p>
        <Link to="/#products" className="inline-flex px-6 py-3 rounded-lg bg-primary text-white font-bold">Browse all appliances</Link>
      </div>
    );
  }

  const related = products
    .filter((x) => x.id !== p.id && x.category === p.category && (x.status === "Published" || !x.status))
    .sort((a, b) => Number(b.subcategory === p.subcategory) - Number(a.subcategory === p.subcategory))
    .slice(0, 4);
  const pdf = CATALOGUE_PDF_BY_CATEGORY[p.category];
  const saved = inWishlist(p.id);

  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: p.title, text: `${p.title}, GLEN ${p.category} at MM Kitchen World`, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setShareNote("Link copied");
    } catch (err) {
      if (err?.name !== "AbortError") setShareNote("Couldn't copy the link");
    }
    setTimeout(() => setShareNote(""), 2500);
  }
  const comparing = inCompare(p.id);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#EDF3FA] via-[#F6F9FC] to-[#EAF0F7] py-6 sm:py-10 overflow-hidden">
      {/* Ambient background glows for studio depth */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 right-12 w-[550px] h-[550px] rounded-full bg-sky-200/35 blur-3xl" />
        <div className="absolute top-1/2 -left-24 w-[480px] h-[480px] rounded-full bg-blue-100/40 blur-3xl" />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="text-xs text-slate-500 mb-6 flex flex-wrap items-center gap-1.5 font-medium">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>›</span>
          <Link to={`/?category=${encodeURIComponent(p.category)}#products`} className="hover:text-primary transition-colors">{p.category}</Link>
          {p.subcategory && (
            <>
              <span>›</span>
              <span className="text-slate-600">{p.subcategory}</span>
            </>
          )}
          <span>›</span>
          <span className="text-slate-900 font-semibold truncate max-w-xs sm:max-w-md">{p.title}</span>
        </nav>

        {/* Top Product Hero: Perfectly Balanced 2-Column Stage */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column (5 cols): Compact Product Image Card */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-6 flex flex-col justify-between">
            <div className="w-full h-56 sm:h-64 flex items-center justify-center p-2 relative">
              <img
                src={assetUrl(p.image)}
                alt={p.title}
                className="max-h-full max-w-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* In-Store & Trust Credentials */}
            <div className="w-full mt-4 pt-3.5 border-t border-slate-100 grid grid-cols-2 gap-2.5 text-xs text-slate-700">
              <div className="flex items-center gap-1.5">
                <Icon name="verified" className="text-primary text-base shrink-0" />
                <span className="font-semibold text-slate-800">100% Genuine GLEN</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Icon name="storefront" className="text-primary text-base shrink-0" />
                <span className="font-semibold text-slate-800">Bangalore Store Stock</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Icon name="shield" className="text-emerald-600 text-base shrink-0" />
                <span className="font-semibold text-slate-800">{p.warranty || "Official Warranty"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Icon name="handyman" className="text-primary text-base shrink-0" />
                <span className="font-semibold text-slate-800">Fitting Support</span>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Header, Pricing, Direct Actions & Overview */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Header Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {(offer || p.tag) && (
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${offer ? "bg-rose-600 text-white" : p.tagColor || "bg-primary text-white"}`}>
                    {offer ? offer.label : p.tag}
                  </span>
                )}
                <span className="text-[11px] font-bold text-primary tracking-wider uppercase bg-blue-50 border border-blue-200/80 px-2.5 py-0.5 rounded-full">
                  {p.brand || "GLEN APPLIANCES"} · EXCLUSIVE STORE
                </span>
              </div>

              {/* Product Title */}
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                {p.title}
              </h1>

              {/* Model & Classification */}
              <div className="flex flex-wrap items-center gap-2 mt-2 text-xs sm:text-sm text-slate-600">
                {p.model && (
                  <span className="font-mono bg-slate-100 border border-slate-200/90 text-slate-800 px-2 py-0.5 rounded font-semibold">
                    Model: {p.model}
                  </span>
                )}
                <span>{p.category}{p.subcategory ? ` · ${p.subcategory}` : ""}</span>
              </div>

              {/* Pricing & Stock Card */}
              <div className="mt-3.5 p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Store Rate / MRP</span>
                  {offer ? (
                    <div className="flex items-baseline flex-wrap gap-2 mt-0.5">
                      <span className="text-2xl sm:text-3xl font-black text-rose-600">{offer.price}</span>
                      {offer.original && <span className="text-sm text-slate-400 line-through">{offer.original}</span>}
                      {offer.save && <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5">Save {offer.save}</span>}
                    </div>
                  ) : isPlaceholderPrice(p.price) ? (
                    <p className="text-sm font-semibold text-slate-900 mt-0.5">
                      Price on request <span className="text-slate-500 font-normal">· Contact for today's store offer</span>
                    </p>
                  ) : (
                    <span className="text-2xl sm:text-3xl font-black text-primary">{p.price}</span>
                  )}
                  {offer?.ends && <p className="text-[11px] text-slate-500 mt-1">Offer valid till {formatDate(offer.ends)}</p>}
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Ready for Showroom Demo</span>
                </div>
              </div>

              {/* Direct Instant Action Buttons (WhatsApp & Direct Phone Call) */}
              <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={productEnquiryUrl(p)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEnquiry(p.id, "product-page")}
                  className="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm sm:text-base shadow-sm hover:shadow transition active:scale-98"
                >
                  <span className="[&_svg]:w-5 [&_svg]:h-5"><WhatsAppIcon /></span>
                  <span>Enquire on WhatsApp</span>
                </a>

                <a
                  href={`tel:${PHONE_TEL}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary hover:bg-[#0878e8] text-white font-bold text-sm sm:text-base shadow-sm hover:shadow transition active:scale-98"
                >
                  <Icon name="call" className="text-xl" />
                  <span>Call Store: +91 97432 33729</span>
                </a>
              </div>

              {/* Quick Actions (Wishlist, Compare, Share) */}
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={() => toggleWishlist(p.id)}
                  aria-pressed={saved}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                    saved
                      ? "bg-rose-50 border-rose-200 text-rose-600"
                      : "bg-white border-slate-200 text-slate-600 hover:border-rose-300 hover:text-rose-600"
                  }`}
                >
                  <Icon name="favorite" className="text-base" fill={saved} />
                  <span>{saved ? "Saved to My List" : "Save to My List"}</span>
                </button>
                <button
                  onClick={() => toggleCompare(p.id)}
                  aria-pressed={comparing}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                    comparing
                      ? "bg-primary border-primary text-white"
                      : "bg-white border-slate-200 text-slate-600 hover:border-primary hover:text-primary"
                  }`}
                >
                  <Icon name="compare_arrows" className="text-base" />
                  <span>{comparing ? "In comparison" : "Add to compare"}</span>
                </button>
                <button
                  onClick={share}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border bg-white border-slate-200 text-slate-600 hover:border-primary hover:text-primary text-xs font-semibold transition-colors"
                >
                  <Icon name="share" className="text-base" />
                  <span>{shareNote || "Share"}</span>
                </button>
              </div>
            </div>

            <div className="mt-4 p-4 sm:p-5 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Request a call back</span>
              <CallbackForm productId={p.id} productTitle={p.title} source="product-page" />
            </div>

            {/* Description / Summary Box (Fills right side neatly) */}
            {p.description && (
              <div className="mt-4 p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Product Overview</span>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{p.description}</p>
              </div>
            )}
          </div>
        </div>

        {/* Specifications & Highlights: Balanced 2-Column Section (No empty voids!) */}
        <div className="mt-8 grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (6 cols): Technical Specifications Card */}
          {(p.specs?.length > 0 || p.dimensions || p.warranty) && (
            <div className="lg:col-span-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs overflow-hidden">
              <div className="bg-slate-50 px-5 py-3 border-b border-slate-200/90 text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="tune" className="text-primary text-base" />
                  <span>Technical Specifications</span>
                </div>
                {p.model && (
                  <span className="font-mono text-[11px] text-slate-600 bg-slate-200/60 px-2 py-0.5 rounded font-semibold">
                    {p.model}
                  </span>
                )}
              </div>
              <dl className="divide-y divide-slate-100 text-xs sm:text-sm">
                {(p.specs || []).map((s) => (
                  <div key={s.label} className="flex justify-between gap-4 py-2.5 px-5 hover:bg-slate-50/50">
                    <dt className="text-slate-500 font-medium">{s.label}</dt>
                    <dd className="font-semibold text-slate-900 text-right">{s.value}</dd>
                  </div>
                ))}
                {p.warranty && !(p.specs || []).some((s) => /warranty/i.test(s.label)) && (
                  <div className="flex justify-between gap-4 py-2.5 px-5 hover:bg-slate-50/50">
                    <dt className="text-slate-500 font-medium">Warranty</dt>
                    <dd className="font-semibold text-slate-900 text-right">{p.warranty}</dd>
                  </div>
                )}
                {p.dimensions && (
                  <div className="flex justify-between gap-4 py-2.5 px-5 hover:bg-slate-50/50">
                    <dt className="text-slate-500 font-medium">Dimensions</dt>
                    <dd className="font-semibold text-slate-900 text-right">{p.dimensions}</dd>
                  </div>
                )}
              </dl>
            </div>
          )}

          {/* Right Column (6 cols): Key Features & PDF Catalogue Download */}
          <div className={`${(p.specs?.length > 0 || p.dimensions || p.warranty) ? "lg:col-span-6" : "lg:col-span-12"} flex flex-col gap-6`}>
            {/* Key Features (Checklist) */}
            {(p.features || []).length > 0 && (
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Icon name="check_circle" className="text-emerald-600 text-base" />
                  <span>Key Features & Highlights</span>
                </h2>
                <ul className="space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <Icon name="done" className="text-sm text-primary mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Official PDF Catalogue Download Box */}
            {pdf && (
              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200/80 flex items-center justify-center text-rose-600 shadow-2xs shrink-0">
                    <Icon name="picture_as_pdf" className="text-xl" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-bold text-slate-900 truncate">Official {p.category} Catalogue</h3>
                    <p className="text-[11px] text-slate-500 truncate">Download official high-resolution technical brochure</p>
                  </div>
                </div>
                <a
                  href={assetUrl(pdf)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition shrink-0"
                >
                  <span>Download PDF</span>
                  <Icon name="download" className="text-sm" />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Direct Store Call Consultation Banner (No form, direct 1-tap call) */}
        <section className="mt-10 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-md border border-slate-700/60">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-950/80 border border-sky-400/30 text-sky-300 text-[11px] font-bold tracking-wider uppercase mb-2">
              <Icon name="support_agent" className="text-sm" />
              <span>Direct Store Consultation</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Have Questions About Kitchen Dimensions or Live Stock?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
              Speak directly with our GLEN product experts at MM Kitchen World, Basaveshwara Nagar. We'll help verify chimney ducting routes, hob platform cut-out sizes, and confirm today's best showroom offer.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary hover:bg-[#0878e8] text-white font-bold text-sm shadow-md transition active:scale-98"
            >
              <Icon name="call" className="text-lg" />
              <span>Call: +91 97432 33729</span>
            </a>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm shadow-md transition active:scale-98"
            >
              <WhatsAppIcon />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </section>

        {/* Similar Models Grid */}
        {related.length > 0 && (
          <section className="mt-12">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[11px] font-bold text-primary uppercase tracking-wider block">Recommended</span>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">Similar {p.category} Models</h2>
              </div>
              <Link
                to={`/?category=${encodeURIComponent(p.category)}#products`}
                className="text-xs font-bold text-primary hover:underline"
              >
                View all {p.category} →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4">
              {related.map((r) => (
                <ProductCard key={r.id} product={r} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
