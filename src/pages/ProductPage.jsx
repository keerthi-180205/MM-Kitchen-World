import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Icon from "../components/Icon";
import { WhatsAppIcon } from "../components/BrandIcons";
import ProductCard from "../components/storefront/ProductCard";
import CallbackForm from "../components/storefront/CallbackForm";
import { CATALOGUE_PDF_BY_CATEGORY, PHONE_TEL, assetUrl, productEnquiryUrl } from "../constants";
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
    <div className="bg-background">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-10">
        <nav aria-label="Breadcrumb" className="text-xs text-on-surface-variant mb-5 flex flex-wrap items-center gap-1.5">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>›</span>
          <Link to={`/?category=${encodeURIComponent(p.category)}#products`} className="hover:text-primary">{p.category}</Link>
          <span>›</span>
          <span className="text-on-surface font-medium">{p.title}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div className="rounded-2xl bg-white border border-outline-variant p-6 sm:p-10 flex items-center justify-center md:sticky md:top-28 self-start min-h-[280px]">
            <img src={assetUrl(p.image)} alt={p.title} className="max-h-[420px] w-full object-contain mix-blend-multiply" />
          </div>

          {/* Details */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {(offer || p.tag) && (
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${offer ? "bg-rose-600 text-white" : p.tagColor || "bg-primary text-white"}`}>{offer ? offer.label : p.tag}</span>
              )}
              <span className="text-xs font-bold text-primary tracking-wider uppercase">{p.brand || "GLEN APPLIANCES"}</span>
            </div>
            <h1 className="font-headline-lg text-[28px] leading-tight md:text-headline-lg text-on-surface">{p.title}</h1>
            <p className="text-sm text-on-surface-variant mt-2">
              {p.model && p.model !== p.title && <span className="font-mono">Model {p.model} · </span>}
              {p.category}{p.subcategory ? ` · ${p.subcategory}` : ""}
            </p>

            <div className="mt-5 p-4 rounded-xl bg-surface-container-low border border-outline-variant">
              {offer ? (
                <>
                  <div className="flex items-baseline flex-wrap gap-x-3 gap-y-1">
                    <span className="text-3xl font-bold text-rose-600">{offer.price}</span>
                    {offer.original && <span className="text-lg text-on-surface-variant line-through">{offer.original}</span>}
                    {offer.save && <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-1">You save {offer.save}</span>}
                  </div>
                  {offer.ends && <p className="text-xs text-on-surface-variant mt-1">Offer valid till {formatDate(offer.ends)}</p>}
                </>
              ) : isPlaceholderPrice(p.price) ? (
                <p className="text-on-surface"><strong>Price on request.</strong> <span className="text-on-surface-variant">Message us for today's store rate.</span></p>
              ) : (
                <span className="text-3xl font-bold text-primary">{p.price}</span>
              )}
            </div>

            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <a
                href={productEnquiryUrl(p)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEnquiry(p.id, "product-page")}
                className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-tertiary text-white font-label-lg text-label-lg font-bold shadow hover:brightness-105 transition"
              >
                <span className="[&_svg]:w-5 [&_svg]:h-5"><WhatsAppIcon /></span>
                Enquire on WhatsApp
              </a>
              <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-outline-variant text-primary font-bold hover:bg-surface-container-low transition-colors">
                <Icon name="call" className="text-xl" /> Call Store
              </a>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <button onClick={() => toggleWishlist(p.id)} aria-pressed={saved} className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-colors ${saved ? "bg-rose-50 border-rose-200 text-rose-600" : "border-outline-variant text-on-surface-variant hover:border-rose-300 hover:text-rose-600"}`}>
                <Icon name="favorite" className="text-lg" fill={saved} /> {saved ? "Saved to My List" : "Save to My List"}
              </button>
              <button onClick={() => toggleCompare(p.id)} aria-pressed={comparing} className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-colors ${comparing ? "bg-primary border-primary text-white" : "border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary"}`}>
                <Icon name="compare_arrows" className="text-lg" /> {comparing ? "In comparison" : "Add to compare"}
              </button>
              <button onClick={share} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary text-sm font-semibold transition-colors">
                <Icon name="share" className="text-lg" /> {shareNote || "Share"}
              </button>
            </div>

            {p.description && <p className="mt-6 text-on-surface-variant">{p.description}</p>}

            {(p.specs?.length > 0 || p.dimensions || p.warranty) && (
              <div className="mt-6 border border-outline-variant rounded-xl overflow-hidden">
                <div className="bg-surface-container-low px-4 py-2 border-b border-outline-variant text-xs font-bold text-on-surface uppercase tracking-wider">Technical Specifications</div>
                <dl className="divide-y divide-outline-variant text-sm">
                  {(p.specs || []).map((s) => (
                    <div key={s.label} className="flex justify-between gap-4 py-2.5 px-4">
                      <dt className="text-on-surface-variant">{s.label}</dt>
                      <dd className="font-semibold text-on-surface text-right">{s.value}</dd>
                    </div>
                  ))}
                  {p.warranty && !(p.specs || []).some((s) => /warranty/i.test(s.label)) && (
                    <div className="flex justify-between gap-4 py-2.5 px-4"><dt className="text-on-surface-variant">Warranty</dt><dd className="font-semibold text-on-surface text-right">{p.warranty}</dd></div>
                  )}
                  {p.dimensions && (
                    <div className="flex justify-between gap-4 py-2.5 px-4"><dt className="text-on-surface-variant">Dimensions</dt><dd className="font-semibold text-on-surface text-right">{p.dimensions}</dd></div>
                  )}
                </dl>
              </div>
            )}

            {(p.features || []).length > 0 && (
              <div className="mt-6">
                <h2 className="text-xs font-bold text-on-surface uppercase tracking-wider mb-3">Key Features</h2>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-on-surface-variant">
                      <Icon name="check_circle" className="text-base text-primary mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {pdf && (
              <a href={assetUrl(pdf)} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                <Icon name="picture_as_pdf" className="text-lg" /> Download the {p.category} catalogue (PDF)
              </a>
            )}
          </div>
        </div>

        {/* Call back */}
        <section className="mt-12 rounded-2xl bg-surface-container-lowest border border-outline-variant p-6 sm:p-8 grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <h2 className="font-headline-md text-headline-md font-bold text-on-surface">Not sure this is the right one?</h2>
            <p className="text-on-surface-variant mt-2">Share your number and we'll call you back to help you choose the right size and model for your kitchen.</p>
          </div>
          <div className="lg:col-span-3"><CallbackForm productId={p.id} productTitle={p.title} source="product-page" /></div>
        </section>

        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="font-headline-md text-headline-md font-bold text-on-surface mb-6">Similar models</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((r) => <ProductCard key={r.id} product={r} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
