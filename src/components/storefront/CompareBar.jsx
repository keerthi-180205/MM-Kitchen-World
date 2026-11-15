import { Link } from "react-router-dom";
import Icon from "../Icon";
import { assetUrl } from "../../constants";
import { useProducts } from "../../hooks/useProducts";
import { MAX_COMPARE, useShop } from "../../context/ShopContext";

/** Sticky tray showing the models picked for comparison, plus a short-lived notice. */
export default function CompareBar() {
  const { compare, toggleCompare, clearCompare, notice } = useShop();
  const products = useProducts();
  const picked = compare.map((id) => products.find((p) => p.id === id)).filter(Boolean);

  return (
    <>
      {notice && (
        <div role="status" className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[70] px-4 py-2.5 rounded-xl bg-on-surface text-white text-sm shadow-xl max-w-[90vw] text-center">
          {notice}
        </div>
      )}
      {picked.length > 0 && (
        <div className="fixed bottom-0 inset-x-0 z-40 bg-surface-container-lowest border-t border-outline-variant shadow-[0_-8px_24px_-8px_rgba(0,0,0,0.15)]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-3 flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-sm font-semibold text-on-surface shrink-0">
              <Icon name="compare_arrows" className="text-primary" />
              Compare ({picked.length}/{MAX_COMPARE})
            </div>
            <ul className="flex items-center gap-2 min-w-0 flex-1 overflow-x-auto">
              {picked.map((p) => (
                <li key={p.id} className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg border border-outline-variant bg-white shrink-0">
                  <img src={assetUrl(p.image)} alt="" className="w-8 h-8 object-contain mix-blend-multiply" />
                  <span className="text-xs font-semibold text-on-surface max-w-[8rem] truncate">{p.title}</span>
                  <button onClick={() => toggleCompare(p.id)} aria-label={`Remove ${p.title} from comparison`} className="text-on-surface-variant hover:text-error">
                    <Icon name="close" className="text-base" />
                  </button>
                </li>
              ))}
            </ul>
            <button onClick={clearCompare} className="hidden md:inline text-xs font-semibold text-on-surface-variant hover:text-error shrink-0">Clear</button>
            {picked.length >= 2 ? (
              <Link to="/compare" className="shrink-0 px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary-container transition-colors">Compare now</Link>
            ) : (
              <span className="shrink-0 text-xs text-on-surface-variant">Pick one more</span>
            )}
          </div>
        </div>
      )}
    </>
  );
}
