import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import { WhatsAppIcon } from "../components/BrandIcons";
import { assetUrl, listEnquiryUrl, productEnquiryUrl, productPath } from "../constants";
import { useShop } from "../context/ShopContext";
import { useProducts } from "../hooks/useProducts";
import { useSeo } from "../hooks/useSeo";
import { trackEnquiry } from "../lib/analytics";
import { getOffer, isPlaceholderPrice } from "../utils/price";

export default function Compare() {
  useSeo({ title: "Compare GLEN Models", description: "Compare GLEN chimneys, hobs, ovens and more side by side." });
  const { compare, toggleCompare, clearCompare } = useShop();
  const products = useProducts();
  const picked = compare.map((id) => products.find((p) => p.id === id)).filter(Boolean);

  // Union of spec labels, in order of first appearance.
  const labels = [];
  picked.forEach((p) => (p.specs || []).forEach((s) => { if (!labels.includes(s.label)) labels.push(s.label); }));
  const valueFor = (p, label) => (p.specs || []).find((s) => s.label === label)?.value;

  if (picked.length < 2) {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-surface-container-low text-primary flex items-center justify-center mb-4">
          <Icon name="compare_arrows" className="text-3xl" />
        </div>
        <h1 className="font-headline-md text-headline-md font-bold text-on-surface">Pick at least two models to compare</h1>
        <p className="text-on-surface-variant mt-2 mb-6">Tap the compare icon on any product card to add it. You can compare up to three at a time.</p>
        <Link to="/#products" className="inline-flex px-6 py-3 rounded-lg bg-primary text-white font-bold">Browse appliances</Link>
      </div>
    );
  }

  const cell = "p-4 align-top border-b border-outline-variant";
  const head = "sticky left-0 z-10 bg-surface-container-low text-xs font-bold uppercase tracking-wider text-on-surface-variant p-4 align-top border-b border-outline-variant w-28 sm:w-40";

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="font-headline-lg text-[28px] md:text-headline-lg text-on-surface">Compare Models</h1>
          <p className="text-on-surface-variant mt-1">Specifications side by side, so you can choose with confidence.</p>
        </div>
        <button onClick={clearCompare} className="text-sm font-semibold text-on-surface-variant hover:text-error">Clear comparison</button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-outline-variant bg-surface-container-lowest">
        <table className="w-full text-sm border-collapse" style={{ minWidth: 220 + picked.length * 220 }}>
          <tbody>
            <tr>
              <th className={head} scope="row">Model</th>
              {picked.map((p) => (
                <td key={p.id} className={cell}>
                  <div className="h-32 flex items-center justify-center mb-3 bg-white rounded-lg border border-outline-variant">
                    <img src={assetUrl(p.image)} alt={p.title} className="max-h-28 object-contain mix-blend-multiply" />
                  </div>
                  <Link to={productPath(p)} className="font-bold text-on-surface hover:text-primary block leading-snug">{p.title}</Link>
                  {p.model && p.model !== p.title && <span className="text-xs font-mono text-on-surface-variant">{p.model}</span>}
                  <button onClick={() => toggleCompare(p.id)} className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-on-surface-variant hover:text-error">
                    <Icon name="close" className="text-sm" /> Remove
                  </button>
                </td>
              ))}
            </tr>
            <tr>
              <th className={head} scope="row">Price</th>
              {picked.map((p) => {
                const offer = getOffer(p);
                return (
                  <td key={p.id} className={cell}>
                    {offer ? (
                      <><span className="font-bold text-rose-600">{offer.price}</span>{offer.original && <span className="ml-2 text-xs line-through text-on-surface-variant">{offer.original}</span>}<span className="block text-xs text-rose-600">{offer.label}</span></>
                    ) : isPlaceholderPrice(p.price) ? (
                      <span className="text-on-surface-variant">Price on request</span>
                    ) : (
                      <span className="font-bold text-primary">{p.price}</span>
                    )}
                  </td>
                );
              })}
            </tr>
            {labels.map((label) => (
              <tr key={label}>
                <th className={head} scope="row">{label}</th>
                {picked.map((p) => <td key={p.id} className={cell + " font-medium text-on-surface"}>{valueFor(p, label) || <span className="text-on-surface-variant">—</span>}</td>)}
              </tr>
            ))}
            <tr>
              <th className={head} scope="row">Dimensions</th>
              {picked.map((p) => <td key={p.id} className={cell}>{p.dimensions || <span className="text-on-surface-variant">—</span>}</td>)}
            </tr>
            <tr>
              <th className={head} scope="row">Key features</th>
              {picked.map((p) => (
                <td key={p.id} className={cell}>
                  {(p.features || []).length ? (
                    <ul className="space-y-1.5">
                      {p.features.slice(0, 5).map((f) => (
                        <li key={f} className="flex items-start gap-1.5 text-xs text-on-surface-variant"><Icon name="check" className="text-sm text-primary mt-0.5 shrink-0" />{f}</li>
                      ))}
                    </ul>
                  ) : <span className="text-on-surface-variant">—</span>}
                </td>
              ))}
            </tr>
            <tr>
              <th className={head + " border-b-0"} scope="row">Enquire</th>
              {picked.map((p) => (
                <td key={p.id} className={cell + " border-b-0"}>
                  <a href={productEnquiryUrl(p)} target="_blank" rel="noopener noreferrer" onClick={() => trackEnquiry(p.id, "compare")} className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-tertiary text-white text-xs font-bold hover:brightness-105">
                    <span className="[&_svg]:w-4 [&_svg]:h-4"><WhatsAppIcon /></span> Enquire
                  </a>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <a href={listEnquiryUrl(picked, "Hello MM Kitchen World, I'm comparing these GLEN models. Please advise which suits me and share prices:")} target="_blank" rel="noopener noreferrer" onClick={() => picked.forEach((p) => trackEnquiry(p.id, "compare"))} className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-tertiary text-white font-bold hover:brightness-105 shadow-sm">
          <span className="[&_svg]:w-5 [&_svg]:h-5"><WhatsAppIcon /></span> Ask us which one to choose
        </a>
        <Link to="/#products" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-outline-variant text-primary font-bold hover:bg-surface-container-low">Add more models</Link>
      </div>
    </div>
  );
}
