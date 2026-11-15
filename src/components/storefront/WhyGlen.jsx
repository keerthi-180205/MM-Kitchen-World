import Icon from "../Icon";
import { assetUrl } from "../../constants";

const FACTS = [
  { icon: "history", value: "1999", label: "Glen Appliances founded", tone: "from-sky-500 to-blue-600" },
  { icon: "solar_power", value: "716 KW", label: "Rooftop solar-powered manufacturing, IMT Faridabad", tone: "from-amber-400 to-orange-500" },
  { icon: "inventory_2", value: "209+", label: "GLEN models across 6 categories at this store", tone: "from-indigo-500 to-violet-600" },
  { icon: "factory", value: "Make in India", label: "Manufactured at Glen's own IMT Faridabad facility", tone: "from-emerald-500 to-teal-600" },
];

export default function WhyGlen() {
  return (
    <section className="py-14 sm:py-16 bg-gradient-to-b from-background to-[#EEF5FF] border-b border-outline-variant" id="brands">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-10">
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-bold section-eyebrow is-centered mb-2">Why Shop With Us</span>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Genuine GLEN, Backed by Your Local Experts</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-3 max-w-2xl mx-auto">Every appliance here is a genuine GLEN model from the manufacturer's own catalogue, supported by an exclusive store you can walk into.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
          {FACTS.map((f) => (
            <div key={f.value} className="group relative p-5 sm:p-7 rounded-2xl bg-white border border-outline-variant shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center">
              <span className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.tone} text-white flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon name={f.icon} className="text-3xl" />
              </span>
              <span className="text-2xl sm:text-[28px] font-bold tracking-tight text-on-surface mb-1 leading-tight">{f.value}</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">{f.label}</span>
            </div>
          ))}
        </div>

        {/* Real store verified authorization banner */}
        <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-white border border-outline-variant shadow-sm flex flex-col md:flex-row items-center gap-6">
          <img
            src={assetUrl("assets/showroom/showroom-certified.webp")}
            alt="Official GLEN Authorized Exclusive Store Certificate and Display Corner at MM Kitchen World"
            className="w-full md:w-56 h-44 object-cover rounded-xl shadow-xs shrink-0"
            loading="lazy"
          />
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-xs font-bold uppercase tracking-wider mb-2">
              <Icon name="verified" className="text-sm" /> Authorized Exclusive Dealer
            </div>
            <h3 className="font-headline-md text-lg sm:text-xl font-bold text-on-surface">100% Authentic GLEN Appliances with Official Manufacturer Warranty</h3>
            <p className="font-body-sm text-sm text-on-surface-variant mt-1.5 leading-relaxed">
              MM Kitchen World is an authorized Glen Exclusive Store recognized by Justdial and Glen India. Every appliance sold comes with an authentic manufacturer warranty, genuine spare parts, and certified technician installation.
            </p>
          </div>
          <a
            href="#showroom"
            className="shrink-0 px-5 py-2.5 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition-colors font-label-md text-sm font-semibold whitespace-nowrap"
          >
            Visit Showroom
          </a>
        </div>
      </div>
    </section>
  );
}
