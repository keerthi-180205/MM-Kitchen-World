import { Link } from "react-router-dom";
import Icon from "../Icon";
import { WhatsAppIcon } from "../BrandIcons";
import { assetUrl, productEnquiryUrl, productPath } from "../../constants";
import { useShop } from "../../context/ShopContext";
import { trackEnquiry } from "../../lib/analytics";

const isWarranty = (s) => s.label.toLowerCase().includes("warranty");

export default function ProductCard({ product: p }) {
  const { inWishlist, inCompare, toggleWishlist, toggleCompare } = useShop();
  const allSpecs = p.specs || [];
  const techSpecs = allSpecs.filter((s) => !isWarranty(s)).slice(0, 3);
  const warranty = allSpecs.find(isWarranty)?.value || p.warranty;
  const saved = inWishlist(p.id);
  const comparing = inCompare(p.id);
  const href = productPath(p);

  return (
    <article className="group flex flex-col h-full bg-white border border-slate-200/90 rounded-xl overflow-hidden shadow-2xs hover:shadow-md hover:-translate-y-0.5 hover:border-slate-400 transition-all duration-200">
      {/* Top Header: Tag & Quick Actions */}
      <div className="flex items-center justify-between gap-1.5 px-3 py-1.5 bg-slate-50/90 border-b border-slate-100 text-xs">
        <span className="inline-flex items-center text-[10px] font-semibold text-slate-600 truncate max-w-[70%]">
          {p.subcategory || p.category}
        </span>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => toggleWishlist(p.id)}
            aria-pressed={saved}
            aria-label={saved ? `Remove ${p.title} from My List` : `Save ${p.title} to My List`}
            title={saved ? "Remove from My List" : "Save to My List"}
            className={`w-6 h-6 rounded-full flex items-center justify-center border transition-colors ${
              saved
                ? "bg-rose-50 border-rose-300 text-rose-600"
                : "bg-white border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-200"
            }`}
          >
            <Icon name="favorite" className="text-[13px]" fill={saved} />
          </button>
          <button
            onClick={() => toggleCompare(p.id)}
            aria-pressed={comparing}
            aria-label={comparing ? `Remove ${p.title} from comparison` : `Compare ${p.title}`}
            title={comparing ? "Remove from comparison" : "Add to comparison"}
            className={`w-6 h-6 rounded-full flex items-center justify-center border transition-colors ${
              comparing
                ? "bg-primary border-primary text-white"
                : "bg-white border-slate-200 text-slate-400 hover:text-primary hover:border-primary/40"
            }`}
          >
            <Icon name="compare_arrows" className="text-[13px]" />
          </button>
        </div>
      </div>

      {/* Compact Product Image Stage */}
      <div className="relative h-36 sm:h-40 bg-white p-3 flex items-center justify-center border-b border-slate-100 overflow-hidden">
        <Link to={href} tabIndex={-1} aria-hidden="true" className="w-full h-full flex items-center justify-center">
          <img
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
            src={assetUrl(p.image)}
            alt={p.title}
            loading="lazy"
            decoding="async"
          />
        </Link>
      </div>

      {/* Content & Details Area (Amazon Style) */}
      <div className="flex flex-col flex-1 p-3 sm:p-3.5">
        <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug line-clamp-2 min-h-[2.25rem]">
          <Link to={href} className="hover:text-primary transition-colors">{p.title}</Link>
        </h3>

        {p.model && p.model.trim().toLowerCase() !== (p.title || "").trim().toLowerCase() && (
          <div className="mt-1">
            <span className="font-mono text-[10px] font-semibold text-slate-600 bg-slate-100 border border-slate-200/80 rounded px-1.5 py-0.5">
              Model: {p.model}
            </span>
          </div>
        )}

        {/* Amazon-style Product Details / Key Features Bullets */}
        <ul className="my-2.5 pt-2 border-t border-slate-100 space-y-1 text-[11px] text-slate-600 flex-1">
          {techSpecs.map((s, i) => (
            <li key={i} className="flex items-start gap-1.5 leading-tight">
              <span className="text-slate-400 font-bold shrink-0">•</span>
              <span className="line-clamp-1 text-slate-700">
                {s.label && s.label !== "Feature" ? (
                  <strong className="font-semibold text-slate-800">{s.label}: </strong>
                ) : null}
                {s.value}
              </span>
            </li>
          ))}
          {warranty && (
            <li className="flex items-start gap-1.5 leading-tight text-slate-700">
              <span className="text-emerald-600 font-bold shrink-0">•</span>
              <span className="line-clamp-1 font-medium">{warranty}</span>
            </li>
          )}
        </ul>

        {/* Bottom Actions: WhatsApp Enquiry & Specs */}
        <div className="mt-auto pt-2 border-t border-slate-100/80 flex flex-col gap-1.5">
          <a
            className="w-full py-2 px-3 rounded-lg bg-[#075e54] hover:bg-[#128c7e] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-2xs hover:shadow-xs transition-colors text-center"
            href={productEnquiryUrl(p)}
            rel="noopener noreferrer"
            target="_blank"
            onClick={() => trackEnquiry(p.id, "card")}
            aria-label={`Enquire about ${p.title} on WhatsApp`}
          >
            <span className="[&_svg]:w-3.5 [&_svg]:h-3.5 shrink-0"><WhatsAppIcon /></span>
            <span className="truncate">Enquire on WhatsApp</span>
          </a>

          <Link
            to={href}
            className="text-[11px] font-semibold text-slate-500 hover:text-primary transition-colors text-center py-0.5"
          >
            View Details &amp; Dimensions →
          </Link>
        </div>
      </div>
    </article>
  );
}
