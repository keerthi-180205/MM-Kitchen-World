import { assetUrl } from "../../constants";

const CATEGORY_CARDS = [
  {
    name: "Chimneys",
    tint: "from-sky-50 to-blue-100",
    alt: "GLEN BLDC chimney",
    image: "assets/products/chimneys/chimneys-ch-1000-bldc-ac-bl-is.webp",
    count: "49 Models",
    badgeClass: "bg-primary text-on-primary",
    blurb: "Keep smoke and oil out of your kitchen with BLDC, auto-clean, island, ceiling and duct-free chimneys.",
    footnote: "7 subcategories",
  },
  {
    name: "Gas Stoves",
    tint: "from-orange-50 to-amber-100",
    alt: "GLEN gas stove",
    image: "assets/products/gas-stoves/gas-stoves-ct-1047-ultra-slim-dt-ss.webp",
    count: "66 Models",
    badgeClass: "bg-surface-container-high text-primary",
    blurb: "Toughened-glass and stainless-steel cooktops with brass burners, PNG gas stoves and a dedicated Cooking Range collection.",
    footnote: "Incl. Cooking Range",
  },
  {
    name: "Hobs",
    tint: "from-indigo-50 to-violet-100",
    alt: "GLEN built-in hob",
    image: "assets/products/hobs/hobs-bh-1018-ic-2z.webp",
    count: "75 Models",
    badgeClass: "bg-primary text-on-primary",
    blurb: "Sleek built-in gas and induction hobs with DFVS, forged brass and European sealed burners for effortless cooking.",
    footnote: "Gas & induction",
  },
  {
    name: "Ovens",
    tint: "from-amber-50 to-orange-100",
    alt: "GLEN built-in oven",
    image: "assets/products/ovens/ovens-bo-654-touch-af-turbo.webp",
    count: "11 Models",
    badgeClass: "bg-surface-container-high text-primary",
    blurb: "Bake, grill and air-fry with built-in ovens from 45L to 90L, including turbo convection and rotisserie models.",
    footnote: "45L – 90L capacity",
  },
  {
    name: "Microwaves",
    tint: "from-teal-50 to-cyan-100",
    alt: "GLEN built-in microwave",
    image: "assets/products/microwaves/microwaves-mo-674-black.webp",
    count: "6 Models",
    badgeClass: "bg-primary text-on-primary",
    blurb: "Built-in microwaves from 25L to 34L with grill and convection options and auto-cook menus for quick meals.",
    footnote: "25L – 34L capacity",
  },
  {
    name: "Dishwashers",
    tint: "from-sky-50 to-cyan-100",
    alt: "GLEN dishwasher",
    image: "assets/products/dishwashers/dishwashers-dw-7735-m.webp",
    count: "2 Models",
    badgeClass: "bg-surface-container-high text-primary",
    blurb: "Let the dishwasher do the work: semi built-in (14 place settings) and free-standing (12 place settings) models.",
    footnote: "12 – 14 place settings",
  },
];

export default function Categories({ onSelectCategory }) {
  return (
    <section className="py-14 sm:py-20 bg-background border-b border-outline-variant" id="categories">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-bold section-eyebrow mb-2">Shop by Category</span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Find the Right Appliance for Every Corner of Your Kitchen</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">From powerful chimneys to smart dishwashers, explore the complete GLEN range.</p>
          </div>
          <a className="mt-4 md:mt-0 inline-flex items-center gap-2 font-label-lg text-label-lg text-primary hover:underline" href="#products">
            <span>Browse All 209+ Appliances</span>
            <span className="material-symbols-outlined text-lg">east</span>
          </a>
        </div>

        {/* The 6 real catalogue categories, real GLEN photos, real counts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORY_CARDS.map((c) => (
            <div key={c.name} className="group bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden hover:border-primary-container/40 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col h-full">
              <div className={`relative h-56 bg-gradient-to-br ${c.tint} overflow-hidden flex items-center justify-center p-4`}>
                <img className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" alt={c.alt} src={assetUrl(c.image)} />
                <span className={`absolute top-4 left-4 ${c.badgeClass} px-2.5 py-1 rounded-full font-label-sm text-label-sm tracking-wide`}>{c.count}</span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">{c.name}</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 mb-4">{c.blurb}</p>
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-outline-variant">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">{c.footnote}</span>
                  <a
                    href="#products"
                    onClick={() => onSelectCategory(c.name)}
                    className="inline-flex items-center text-primary font-label-md text-label-md group-hover:translate-x-1 transition-transform"
                  >
                    View Collection →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-on-surface-variant">
          <strong className="text-on-surface">Also at our showroom:</strong> cooktops, OTGs, cooking ranges, sinks, cookware, small appliances and water heaters. Ask us what's in stock.
        </p>
      </div>
    </section>
  );
}
