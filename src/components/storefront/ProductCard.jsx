import { Link } from "react-router-dom";
import Icon from "../Icon";
import { WhatsAppIcon } from "../BrandIcons";
import { assetUrl, productEnquiryUrl, productPath } from "../../constants";
import { useShop } from "../../context/ShopContext";
import { trackEnquiry } from "../../lib/analytics";
import { formatDate, getOffer, isPlaceholderPrice } from "../../utils/price";

const isWarranty = (s) => s.label.toLowerCase().includes("warranty");

const roundButton = "w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border transition-all";

export default function ProductCard({ product: p }) {
  const { inWishlist, inCompare, toggleWishlist, toggleCompare } = useShop();
  const allSpecs = p.specs || [];
  const techSpecs = allSpecs.filter((s) => !isWarranty(s)).slice(0, 4);
  const warranty = allSpecs.find(isWarranty)?.value || p.warranty;
  const offer = getOffer(p);
  const saved = inWishlist(p.id);
  const comparing = inCompare(p.id);
  const href = productPath(p);

  return (
    <article className="group flex flex-col h-full bg-surface-container-lowest border border-outline-variant rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-primary-container/40 transition-all duration-300">
      {/* Top Header Bar: Clean Category / Tag / Offer and Quick Actions */}
      <div className="flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5 bg-surface-container-low/50 border-b border-outline-variant/60">
        <div className="min-w-0 flex items-center gap-1.5 flex-1">
          {offer ? (
            <span className="inline-flex items-center gap-1 font-label-sm text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-600 text-white shadow-sm shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" aria-hidden="true"></span>
              {offer.label}
            </span>
          ) : p.tag ? (
            <span className="inline-flex items-center font-label-sm text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 truncate">
              {p.tag}
            </span>
          ) : (
            <span className="inline-flex items-center font-label-sm text-[11px] font-semibold px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant truncate">
              {p.category}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => toggleWishlist(p.id)}
            aria-pressed={saved}
            aria-label={saved ? `Remove ${p.title} from My List` : `Save ${p.title} to My List`}
            title={saved ? "Remove from My List" : "Save to My List"}
            className={`${roundButton} ${
              saved
                ? "bg-rose-50 border-rose-300 text-rose-600 shadow-sm"
                : "bg-white border-outline-variant text-on-surface-variant hover:text-rose-600 hover:border-rose-300"
            }`}
          >
            <Icon name="favorite" className="text-sm sm:text-base" fill={saved} />
          </button>
          <button
            onClick={() => toggleCompare(p.id)}
            aria-pressed={comparing}
            aria-label={comparing ? `Remove ${p.title} from comparison` : `Compare ${p.title}`}
            title={comparing ? "Remove from comparison" : "Add to comparison"}
            className={`${roundButton} ${
              comparing
                ? "bg-primary border-primary text-white shadow-sm"
                : "bg-white border-outline-variant text-on-surface-variant hover:text-primary hover:border-primary"
            }`}
          >
            <Icon name="compare_arrows" className="text-sm sm:text-base" />
          </button>
        </div>
      </div>

      {/* 100% Unobstructed Pure Image Stage - No tags or buttons overlapping the appliance */}
      <div className="relative aspect-[4/3] bg-white border-b border-outline-variant overflow-hidden flex items-center justify-center p-4">
        <Link to={href} tabIndex={-1} aria-hidden="true" className="w-full h-full flex items-center justify-center">
          <img
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
            src={assetUrl(p.image)}
            alt={p.title}
            loading="lazy"
            decoding="async"
          />
        </Link>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center justify-between gap-3 mb-2">
          <span className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider truncate">{p.brand || "GLEN APPLIANCES"}</span>
          {p.model && p.model.trim().toLowerCase() !== (p.title || "").trim().toLowerCase() && (
            <span className="shrink-0 font-mono text-[11px] font-semibold text-on-surface-variant bg-surface-container-low border border-outline-variant rounded px-2 py-0.5">{p.model}</span>
          )}
        </div>
        <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold line-clamp-2 min-h-[3.5rem]">
          <Link to={href} className="hover:text-primary transition-colors">{p.title}</Link>
        </h3>

        {(techSpecs.length > 0 || warranty) && (
          <dl className="mt-3 divide-y divide-outline-variant/70 border-y border-outline-variant/70">
            {techSpecs.map((s) => (
              <div key={s.label} className="flex items-baseline justify-between gap-4 py-2 text-[13px] leading-5">
                <dt className="text-on-surface-variant shrink-0">{s.label}</dt>
                <dd className="text-on-surface font-semibold text-right">{s.value}</dd>
              </div>
            ))}
            {warranty && (
              <div className="flex items-baseline justify-between gap-4 py-2 text-[13px] leading-5">
                <dt className="text-on-surface-variant shrink-0 inline-flex items-center gap-1.5">
                  <Icon name="verified_user" className="text-base text-primary" />
                  Warranty
                </dt>
                <dd className="text-on-surface font-semibold text-right">{warranty}</dd>
              </div>
            )}
          </dl>
        )}

        <div className="mt-auto pt-4">
          {offer ? (
            <div>
              <div className="flex items-baseline flex-wrap gap-x-2 gap-y-1">
                <span className="text-xl font-bold text-rose-600 leading-tight">{offer.price}</span>
                {offer.original && <span className="text-sm text-on-surface-variant line-through">{offer.original}</span>}
                {offer.save && <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5">Save {offer.save}</span>}
              </div>
              {offer.ends && <span className="block text-[11px] text-on-surface-variant mt-0.5">Offer valid till {formatDate(offer.ends)}</span>}
            </div>
          ) : isPlaceholderPrice(p.price) ? (
            <div className="flex items-center gap-2 text-on-surface-variant">
              <Icon name="sell" className="text-lg text-primary" />
              <span className="text-[13px] leading-4">
                <strong className="block text-on-surface font-semibold">Price on request</strong>
                Ask for today's store rate
              </span>
            </div>
          ) : (
            <div>
              <span className="block font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">Price</span>
              <span className="block text-xl font-bold text-primary leading-tight">{p.price}</span>
            </div>
          )}

          <div className="mt-4 grid grid-cols-2 gap-2.5">
            <Link
              to={href}
              className="px-3 py-2.5 rounded-lg border border-outline-variant font-label-md text-label-md text-on-surface font-semibold hover:border-primary hover:text-primary hover:bg-surface-container-low transition-colors text-center"
            >
              View Details
            </Link>
            <a
              className="px-3 py-2.5 rounded-lg bg-tertiary text-white font-label-md text-label-md flex items-center justify-center gap-2 font-semibold shadow-sm hover:brightness-105 hover:shadow-md transition-all"
              href={productEnquiryUrl(p)}
              rel="noopener noreferrer"
              target="_blank"
              onClick={() => trackEnquiry(p.id, "card")}
              aria-label={`Enquire about ${p.title} on WhatsApp`}
            >
              <span className="[&_svg]:w-4 [&_svg]:h-4"><WhatsAppIcon /></span>
              <span>Enquire</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
