import { assetUrl } from "../../constants";

const CATEGORY_CARDS = [
  {
    name: "Chimneys",
    alt: "GLEN smart auto-clean curved glass chimney",
    image: "assets/products/chimneys/chimneys-ch-6068-bl-smart-ac.webp",
    count: "49 Models",
    blurb: "Keep smoke and oil out of your kitchen with BLDC inverter, auto-clean, island, ceiling and duct-free chimneys.",
    footnote: "7 Subcategories · 60/75/90 cm",
  },
  {
    name: "Gas Stoves",
    alt: "GLEN toughened glass gas stove",
    image: "assets/products/gas-stoves/gas-stoves-ct-1044-gt-bb-bl-hf-cps.webp",
    count: "63 Models",
    blurb: "Toughened glass and heavy-duty stainless steel cooktops with forged brass burners and PNG piped gas options.",
    footnote: "8 Subcategories · 2, 3 & 4 Burners",
  },
  {
    name: "Hobs",
    alt: "GLEN DFVS built-in glass hob",
    image: "assets/products/hobs/hobs-bh-1064-ro-ht-tdb.webp",
    count: "75 Models",
    blurb: "Sleek built-in gas and induction hobs featuring DFVS direct flame, forged brass and European sealed burners.",
    footnote: "6 Subcategories · Matt & Gloss Glass",
  },
  {
    name: "Water Heaters",
    alt: "GLEN glass-lined storage water heater",
    image: "assets/products/water-heaters/water-heaters-wh-7056-vertical.webp",
    count: "9 Models",
    blurb: "Instant geysers, smart Wi-Fi, digital LED and vertical/horizontal storage water heaters with titanium glass-lined corrosion-proof tanks.",
    footnote: "Instant & Storage (3L to 50L)",
  },
  {
    name: "Sinks",
    alt: "GLEN kitchen sink",
    image: "assets/products/sinks/sinks-ks-sh24189sbm.webp",
    count: "24 Models",
    blurb: "Handmade SS 304 sinks, pressed bowls with drainboards, sound-deadening insulation and designer kitchen faucets.",
    footnote: "Handmade, Pressed & Faucets",
  },
  {
    name: "Ovens",
    alt: "GLEN built-in oven",
    image: "assets/products/ovens/ovens-bo-654-touch-af-turbo.webp",
    count: "11 Models",
    blurb: "Bake, roast, grill and air-fry with built-in convection ovens from 45L to 90L, featuring rotisserie and turbo heat.",
    footnote: "45L to 90L Capacity Range",
  },
  {
    name: "Microwaves",
    alt: "GLEN built-in microwave",
    image: "assets/products/microwaves/microwaves-mo-674-black.webp",
    count: "6 Models",
    blurb: "Built-in microwaves with grill, convection and multi-stage auto cook menus in sleek black glass and stainless steel.",
    footnote: "25L to 34L Capacity Range",
  },
  {
    name: "Dishwashers",
    alt: "GLEN dishwasher",
    image: "assets/products/dishwashers/dishwashers-dw-7735-m.webp",
    count: "2 Models",
    blurb: "Energy-efficient dishwashing engineered for Indian cookware: semi built-in (14 place settings) and free-standing.",
    footnote: "12 & 14 Place Settings",
  },
  {
    name: "Cooking Range",
    alt: "GLEN cooking range",
    image: "assets/products/cooking-range/cooking-range-cr-2012-pl-tr-cb-ai.webp",
    count: "3 Models",
    blurb: "All-in-one culinary powerhouses featuring multi-burner brass cooktops with integrated gas ovens and grill chambers.",
    footnote: "Cooktop + Gas Oven + Grill",
  },
  {
    name: "Small Appliances",
    alt: "GLEN small appliances",
    image: "assets/products/small-appliances/small-appliances-sa-3043-dss.webp",
    count: "41 Models",
    blurb: "Cold press slow juicers, mixer grinders, digital air fryers, OTGs, pop-up toasters, electric kettles and egg boilers.",
    footnote: "8 Subcategories · Complete Kitchen Collection",
  },
];

export default function Categories({ onSelectCategory }) {
  const handleCategoryClick = (catName) => {
    onSelectCategory(catName);
    const target = document.getElementById("products");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-surface-container-lowest border-b border-outline-variant" id="categories">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-bold section-eyebrow mb-2">
              MM Kitchen World · Authorised Exclusive Store
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Everything Your Kitchen Needs, All Under One Roof.
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-2xl leading-relaxed">
              Explore our extensive collection of 283 kitchen appliances across 11 categories. From modern chimneys and stylish gas stoves to built-in ovens and essential kitchen appliances, find everything you need to create a functional and beautiful kitchen.
            </p>
          </div>
          <button
            onClick={() => handleCategoryClick("ALL")}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 font-label-lg text-label-lg text-primary hover:underline font-semibold"
          >
            <span>Explore All 283 Products</span>
            <span className="material-symbols-outlined text-lg">east</span>
          </button>
        </div>

        {/* Compact & Sleek Luxury Category Showcase Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5">
          {CATEGORY_CARDS.map((c) => (
            <div
              key={c.name}
              onClick={() => handleCategoryClick(c.name)}
              className="group bg-white border border-slate-200/90 rounded-xl overflow-hidden shadow-2xs hover:shadow-lg hover:-translate-y-0.5 hover:border-slate-400 transition-all duration-200 flex flex-col h-full cursor-pointer"
            >
              {/* Product Visual Container */}
              <div className="relative h-32 sm:h-36 bg-gradient-to-b from-slate-50 to-slate-100/40 overflow-hidden flex items-center justify-center p-3 border-b border-slate-100">
                <img
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                  alt={c.alt}
                  src={assetUrl(c.image)}
                  loading="lazy"
                />
                <span className="absolute top-2.5 left-2.5 bg-slate-900/90 backdrop-blur-xs text-white text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full shadow-2xs">
                  {c.count}
                </span>
              </div>

              {/* Text Info Area */}
              <div className="p-3.5 sm:p-4 flex flex-col flex-1">
                <div className="flex items-center justify-between gap-1.5 mb-1">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-primary transition-colors truncate">
                    {c.name}
                  </h3>
                  <span className="text-slate-400 group-hover:text-primary group-hover:translate-x-0.5 transition-all text-xs font-bold shrink-0">
                    →
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-500 leading-snug line-clamp-2 mb-3">
                  {c.blurb}
                </p>
                <div className="mt-auto flex items-center justify-between pt-2.5 border-t border-slate-100 text-[10px] sm:text-[11px]">
                  <span className="text-slate-400 truncate max-w-[65%]">
                    {c.footnote}
                  </span>
                  <span className="font-semibold text-primary shrink-0 group-hover:underline">
                    View
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 p-5 rounded-2xl bg-slate-50 border border-slate-200/70 text-center text-xs sm:text-sm text-slate-600 max-w-3xl mx-auto shadow-2xs">
          <strong className="text-slate-900 font-semibold">Live in our Basaveshwara Nagar showroom:</strong>{" "}
          Experience active live demo counters for BLDC chimneys, DFVS brass hobs, built-in air fryer ovens, storage water heaters and stainless sinks. Walk in today or enquire for store pricing.
        </div>
      </div>
    </section>
  );
}
