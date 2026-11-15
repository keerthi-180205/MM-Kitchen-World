import { useMemo } from "react";
import Icon from "../Icon";
import ProductCard from "./ProductCard";
import { useProducts } from "../../hooks/useProducts";
import { getOffer } from "../../utils/price";

/** Models the owner has put on offer (Admin > Products). Renders nothing when there are none. */
export default function SpecialOffers() {
  const products = useProducts();
  const onOffer = useMemo(
    () => products.filter((p) => (p.status === "Published" || !p.status) && getOffer(p)).slice(0, 4),
    [products]
  );
  if (onOffer.length === 0) return null;

  return (
    <section className="relative overflow-hidden py-14 sm:py-20 bg-gradient-to-b from-rose-50 via-[#FFF7F7] to-background border-b border-outline-variant" id="offers">
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 right-0 w-[380px] h-[380px] rounded-full bg-rose-200/40 blur-3xl"></div>
      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <span className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-rose-600 text-white text-xs font-bold uppercase tracking-widest">
              <Icon name="local_offer" className="text-sm" /> Limited-time
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Special Offers</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">Sharp prices on selected GLEN models. Offers end on the date shown.</p>
          </div>
        </div>
        {/* Centred, so one to three offers still look balanced */}
        <div className="flex flex-wrap justify-center gap-6">
          {onOffer.map((p) => (
            <div key={p.id} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] min-w-0">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
