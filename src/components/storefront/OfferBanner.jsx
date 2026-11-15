import { useEffect, useState } from "react";
import Icon from "../Icon";
import HashLink from "../HashLink";
import { api } from "../../lib/api";

const DISMISS_KEY = "mm_offer_dismissed";

/** Slim announcement strip driven by the offers the owner manages in the admin. */
export default function OfferBanner() {
  const [offers, setOffers] = useState([]);
  const [index, setIndex] = useState(0);
  const [dismissed, setDismissed] = useState(() => {
    try { return sessionStorage.getItem(DISMISS_KEY) || ""; } catch { return ""; }
  });

  useEffect(() => {
    let alive = true;
    api("/api/offers").then((list) => alive && Array.isArray(list) && setOffers(list)).catch(() => {});
    return () => { alive = false; };
  }, []);

  // Rotate when there is more than one live offer.
  useEffect(() => {
    if (offers.length < 2) return undefined;
    const t = setInterval(() => setIndex((i) => (i + 1) % offers.length), 6000);
    return () => clearInterval(t);
  }, [offers.length]);

  const offer = offers[index % Math.max(offers.length, 1)];
  const signature = offers.map((o) => o.id).join(",");
  if (!offer || dismissed === signature) return null;

  const close = () => {
    setDismissed(signature);
    try { sessionStorage.setItem(DISMISS_KEY, signature); } catch { /* ignore */ }
  };

  const isAnchor = offer.linkUrl.startsWith("#");
  const linkClass = "ml-1 inline-flex items-center gap-1 font-bold underline underline-offset-2 hover:no-underline whitespace-nowrap";

  return (
    <div className="bg-primary text-white" role="region" aria-label="Current offer">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-2.5 flex items-center justify-center gap-3 text-center text-[13px] sm:text-sm">
        <Icon name="local_offer" className="text-base shrink-0 hidden sm:inline" />
        <p className="min-w-0">
          <strong className="font-bold">{offer.title}</strong>
          {offer.message && <span className="opacity-90"> {offer.message}</span>}
          {offer.linkUrl && offer.linkLabel && (
            isAnchor ? (
              <HashLink to={offer.linkUrl} className={linkClass}>{offer.linkLabel} →</HashLink>
            ) : (
              <a href={offer.linkUrl} className={linkClass} {...(/^https?:/i.test(offer.linkUrl) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                {offer.linkLabel} →
              </a>
            )
          )}
        </p>
        <button onClick={close} aria-label="Dismiss offer" className="shrink-0 w-7 h-7 rounded-full hover:bg-white/15 flex items-center justify-center transition-colors">
          <Icon name="close" className="text-lg" />
        </button>
      </div>
    </div>
  );
}
