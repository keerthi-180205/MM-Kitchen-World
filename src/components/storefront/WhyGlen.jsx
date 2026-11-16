import Icon from "../Icon";
import { assetUrl } from "../../constants";

const FACTS = [
  {
    icon: "inventory_2",
    title: "Wide Product Collection",
    label: "Explore 283 products across categories",
    tone: "from-indigo-500 to-violet-600",
  },
  {
    icon: "verified",
    title: "Authorised Exclusive Store",
    label: "Genuine products with manufacturer warranty",
    tone: "from-sky-500 to-blue-600",
  },
  {
    icon: "support_agent",
    title: "Expert Guidance",
    label: "Find appliances that suit your kitchen and lifestyle",
    tone: "from-amber-400 to-orange-500",
  },
  {
    icon: "handyman",
    title: "Installation Support",
    label: "Assistance with fitting and installation requirements",
    tone: "from-emerald-500 to-teal-600",
  },
];

export default function WhyGlen() {
  return (
    <section className="py-14 sm:py-16 bg-gradient-to-b from-background to-[#EEF5FF] border-b border-outline-variant" id="brands">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-10">
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-bold section-eyebrow is-centered mb-2">Why Choose Us</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Quality Products. Expert Guidance. Trusted Service.</h2>
          <p className="font-body-md text-body-md text-slate-600 mt-3 max-w-2xl mx-auto leading-relaxed">
            At MM Kitchen World, we bring together a carefully selected range of kitchen appliances and personalised customer assistance to make your shopping experience convenient and reliable.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
          {FACTS.map((f) => (
            <div key={f.title} className="group relative p-5 sm:p-6 rounded-2xl bg-white border border-outline-variant shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center">
              <span className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.tone} text-white flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon name={f.icon} className="text-3xl" />
              </span>
              <h3 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 mb-1 leading-snug">{f.title}</h3>
              <p className="font-body-sm text-xs sm:text-sm text-slate-600">{f.label}</p>
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
              <Icon name="verified" className="text-sm" /> Authorised Exclusive Store
            </div>
            <h3 className="font-headline-md text-lg sm:text-xl font-bold text-on-surface">100% Authentic Appliances with GLEN Manufacturer Warranty</h3>
            <p className="font-body-sm text-sm text-on-surface-variant mt-1.5 leading-relaxed">
              MM Kitchen World is an authorised Glen Exclusive Store. Every appliance sold comes with an authentic manufacturer warranty, genuine spare parts, and certified technician installation support.
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
