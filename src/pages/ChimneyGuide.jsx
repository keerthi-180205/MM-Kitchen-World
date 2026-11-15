import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import { WhatsAppIcon } from "../components/BrandIcons";
import ProductCard from "../components/storefront/ProductCard";
import { whatsappUrl } from "../constants";
import { useProducts } from "../hooks/useProducts";
import { useSeo } from "../hooks/useSeo";
import { trackEnquiry } from "../lib/analytics";

const STYLES = {
  // `floor` (m³/h) is a practical minimum: Indian cooking makes far more oil and smoke than the
  // general "air changes per hour" rule assumes, which alone would suggest weak chimneys for small kitchens.
  light: { label: "Light cooking", hint: "Boiling, steaming, little frying", factor: 1, floor: 700 },
  regular: { label: "Everyday Indian cooking", hint: "Daily tadka, sautéing, some frying", factor: 1.25, floor: 1000 },
  heavy: { label: "Heavy frying & grilling", hint: "Deep frying, tandoor-style, big gatherings", factor: 1.5, floor: 1200 },
};
const FT3_TO_M3 = 0.0283168;

/** Highest airflow figure (m³/h) listed in a chimney's specs, or null. */
function airflowOf(p) {
  const spec = (p.specs || []).find((s) => /airflow|suction/i.test(s.label));
  const nums = (spec?.value.match(/\d{3,4}/g) || []).map(Number);
  return nums.length ? Math.max(...nums) : null;
}
/** Chimney widths (cm) the model comes in. */
function sizesOf(p) {
  const spec = (p.specs || []).find((s) => /size|width/i.test(s.label));
  return (spec?.value.match(/\d{2,3}/g) || []).map(Number).filter((n) => n >= 40 && n <= 120);
}

export default function ChimneyGuide() {
  useSeo({
    title: "How to Choose the Right Kitchen Chimney Size",
    description: "Not sure which chimney size and suction power you need? Enter your hob and kitchen size to get a recommendation and see matching GLEN chimneys.",
  });
  const products = useProducts();
  const [burners, setBurners] = useState(4);
  const [style, setStyle] = useState("regular");
  const [dims, setDims] = useState({ length: 10, width: 8, height: 10 });
  const [longDuct, setLongDuct] = useState(false);

  const result = useMemo(() => {
    const l = Math.max(Number(dims.length) || 0, 0), w = Math.max(Number(dims.width) || 0, 0), h = Math.max(Number(dims.height) || 0, 0);
    const volume = l * w * h * FT3_TO_M3;
    const fromVolume = volume * 10 * STYLES[style].factor * (longDuct ? 1.15 : 1);
    const airflow = Math.ceil(Math.max(fromVolume, STYLES[style].floor * (longDuct ? 1.15 : 1)) / 50) * 50;
    const width = burners <= 3 ? 60 : burners === 4 ? (style === "heavy" ? 90 : 60) : 90;
    return { volume, airflow, width };
  }, [burners, style, dims, longDuct]);

  const matches = useMemo(
    () =>
      products
        .filter((p) => p.category === "Chimneys" && (p.status === "Published" || !p.status))
        .map((p) => ({ p, flow: airflowOf(p), sizes: sizesOf(p) }))
        .filter((x) => x.flow !== null && x.flow >= result.airflow && x.sizes.includes(result.width))
        .sort((a, b) => a.flow - b.flow)
        .slice(0, 8)
        .map((x) => x.p),
    [products, result]
  );

  const field = "w-full px-3 py-2.5 rounded-lg border border-outline-variant bg-white text-sm focus:border-primary focus:ring-1 focus:ring-primary";
  const label = "block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5";

  return (
    <div className="bg-background">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
        <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-bold block mb-2">Buying Guide</span>
        <h1 className="font-headline-lg text-[28px] md:text-headline-lg text-on-surface">Which Chimney Size Do You Need?</h1>
        <p className="text-on-surface-variant mt-3 max-w-2xl">A chimney that is too small or too weak leaves smoke and oil in your kitchen. Tell us about your hob and kitchen and we'll suggest the width and suction power to look for, then show matching GLEN models.</p>

        <div className="mt-8 grid lg:grid-cols-5 gap-6">
          <form onSubmit={(e) => e.preventDefault()} className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 space-y-5 self-start">
            <div>
              <label className={label} htmlFor="g-burners">Burners on your hob</label>
              <select id="g-burners" className={field} value={burners} onChange={(e) => setBurners(Number(e.target.value))}>
                <option value={2}>2 burners</option><option value={3}>3 burners</option><option value={4}>4 burners</option><option value={5}>5 or more burners</option>
              </select>
            </div>
            <div>
              <span className={label}>How do you cook?</span>
              <div className="space-y-2">
                {Object.entries(STYLES).map(([key, s]) => (
                  <label key={key} className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${style === key ? "border-primary bg-surface-container-low" : "border-outline-variant hover:border-primary/50"}`}>
                    <input type="radio" name="style" checked={style === key} onChange={() => setStyle(key)} className="mt-1 text-primary" />
                    <span><strong className="block text-sm text-on-surface">{s.label}</strong><span className="text-xs text-on-surface-variant">{s.hint}</span></span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <span className={label}>Kitchen size (feet)</span>
              <div className="grid grid-cols-3 gap-2">
                {[["length", "Length"], ["width", "Width"], ["height", "Height"]].map(([k, l]) => (
                  <label key={k} className="block"><span className="block text-[11px] text-on-surface-variant mb-1">{l}</span>
                    <input type="number" min="1" max="60" inputMode="decimal" className={field} value={dims[k]} onChange={(e) => setDims((d) => ({ ...d, [k]: e.target.value }))} />
                  </label>
                ))}
              </div>
            </div>
            <label className="flex items-start gap-3 text-sm text-on-surface-variant cursor-pointer">
              <input type="checkbox" checked={longDuct} onChange={(e) => setLongDuct(e.target.checked)} className="mt-1 rounded text-primary" />
              <span>My duct is long (over 3 metres) or has several bends</span>
            </label>
          </form>

          <div className="lg:col-span-3 space-y-6">
            <div className="rounded-2xl bg-inverse-surface text-white p-6 sm:p-8">
              <h2 className="text-xs font-bold uppercase tracking-widest text-inverse-primary mb-4">Our suggestion</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div><span className="block text-4xl font-bold">{result.width} cm</span><span className="text-sm text-white/80">Chimney width</span></div>
                <div><span className="block text-4xl font-bold">{result.airflow.toLocaleString("en-IN")}+</span><span className="text-sm text-white/80">Suction (m³/hour)</span></div>
              </div>
              <p className="text-sm text-white/80 mt-5">Your kitchen is about {result.volume.toFixed(0)} m³. A chimney should clear its air about 10 times an hour, and Indian cooking needs a higher minimum than that, so we suggest at least {result.airflow.toLocaleString("en-IN")} m³/hour. {burners >= 4 && "A chimney at least as wide as your hob captures more smoke."}</p>
            </div>

            <div>
              <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-4">
                {matches.length > 0 ? "GLEN chimneys that match" : "No exact match in our listed range"}
              </h2>
              {matches.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-5">{matches.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}</div>
              ) : (
                <p className="text-on-surface-variant text-sm">Our listed chimneys don't reach {result.airflow} m³/h in {result.width} cm. Ask us, as the showroom may have other options.</p>
              )}
              <div className="mt-5 flex flex-wrap gap-3">
                <Link to="/?category=Chimneys#products" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-outline-variant text-primary font-bold hover:bg-surface-container-low">
                  <Icon name="kitchen" className="text-xl" /> See all chimneys
                </Link>
                <a
                  href={whatsappUrl(`Hello MM Kitchen World, I need a chimney for a ${burners}-burner hob (${STYLES[style].label.toLowerCase()}). My kitchen is ${dims.length} x ${dims.width} x ${dims.height} ft. I'm looking for about ${result.width} cm and ${result.airflow}+ m3/h suction. Please suggest options.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEnquiry(null, "other")}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-tertiary text-white font-bold shadow-sm hover:brightness-105"
                >
                  <span className="[&_svg]:w-5 [&_svg]:h-5"><WhatsAppIcon /></span> Ask our experts
                </a>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-10 text-xs text-on-surface-variant max-w-3xl">This is general guidance based on common rules of thumb (kitchen volume × about 10 air changes per hour, raised to a practical minimum for your cooking style and for long ducts). Every kitchen is different, so please confirm your choice with our team before buying.</p>
      </div>
    </div>
  );
}
