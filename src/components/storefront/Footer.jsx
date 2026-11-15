import { Link } from "react-router-dom";
import Icon from "../Icon";
import HashLink from "../HashLink";
import { whatsappUrl, assetUrl } from "../../constants";

const linkClass = "text-white/70 hover:text-white transition-colors duration-150";
const headingClass = "text-xs font-bold uppercase tracking-[0.16em] text-sky-300 mb-5";

const CATEGORY_LINKS = [
  { label: "Chimneys", category: "Chimneys" },
  { label: "Ovens & Microwaves", category: "Ovens" },
  { label: "Gas Stoves & Cooking Range", category: "Gas Stoves" },
  { label: "Hobs (Gas & Induction)", category: "Hobs" },
  { label: "Dishwashers", category: "Dishwashers" },
];

function ContactRow({ icon, children }) {
  return (
    <li className="flex items-start gap-3">
      <Icon name={icon} className="text-lg text-sky-300 mt-0.5 shrink-0" />
      <span className="min-w-0 [overflow-wrap:anywhere]">{children}</span>
    </li>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#08376D] to-[#041F3F] text-white border-t border-white/10">
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[480px] h-[480px] rounded-full bg-sky-400/10 blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-[1440px] mx-auto px-6 lg:px-12 pt-16 pb-24 md:pb-12">
        <div className="grid grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.4fr] gap-x-6 gap-y-10 lg:gap-12 mb-14">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-white border border-white/30 flex items-center justify-center p-1.5 shadow-sm overflow-hidden">
                <img src={assetUrl("assets/brand/mm-logo-mark.webp")} alt="MM Kitchen World" className="w-full h-full object-contain" />
              </div>
              <div className="leading-tight">
                <span className="block text-lg font-bold uppercase tracking-wide">MM Kitchen World</span>
                <span className="block text-[11px] uppercase tracking-[0.18em] text-white/60">GLEN Exclusive Store</span>
              </div>
            </div>
            <p className="text-sm text-white/70 max-w-sm leading-relaxed mb-6">
              Bangalore's GLEN Exclusive Store in Basaveshwara Nagar: chimneys, hobs, gas stoves, ovens, microwaves and dishwashers for a happier home.
            </p>
            <a
              href={whatsappUrl("Hello MM Kitchen World, I am interested in bulk orders and corporate gifting. Please share the available products, pricing, and details.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/25 text-sm font-semibold hover:bg-white hover:text-[#08376D] transition-colors"
            >
              <Icon name="inventory" className="text-lg" />
              Bulk orders &amp; corporate gifting
            </a>
          </div>

          {/* Shop */}
          <div>
            <h4 className={headingClass}>Shop by category</h4>
            <ul className="space-y-3 text-sm">
              {CATEGORY_LINKS.map(({ label, category }) => (
                <li key={label}><Link className={linkClass} to={`/?category=${encodeURIComponent(category)}#products`}>{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className={headingClass}>Help &amp; guides</h4>
            <ul className="space-y-3 text-sm">
              <li><Link className={linkClass} to="/guides/chimney-size">Chimney size guide</Link></li>
              <li><Link className={linkClass} to="/faq">FAQ, warranty &amp; service</Link></li>
              <li><a className={linkClass} href={GMB_URL} target="_blank" rel="noopener noreferrer">Installation photos &amp; videos</a></li>
              <li><HashLink className={linkClass} to="#showroom">Showroom location &amp; hours</HashLink></li>
              <li><Link className={linkClass} to="/wishlist">My List</Link></li>
            </ul>
          </div>

          {/* Visit */}
          <div className="col-span-2 lg:col-span-1">
            <h4 className={headingClass}>Visit the showroom</h4>
            <ul className="space-y-3.5 text-sm text-white/80">
              <ContactRow icon="location_on">No. MIG-45, KHB Colony, 2nd Stage, near Pavithra Paradise, opposite IndusInd Bank, Basaveshwara Nagar, Bangalore - 560079</ContactRow>
              <ContactRow icon="schedule">Open all days, 10:30 AM – 8:30 PM</ContactRow>
              <ContactRow icon="call">
                <a className="hover:text-white font-semibold" href="tel:+919743233729">+91 97432 33729</a>
                <span className="text-white/40"> · </span>
                <a className="hover:text-white font-semibold" href="tel:+919663078780">+91 96630 78780</a>
                <span className="block text-white/60 text-xs mt-0.5">Pravin Kumar</span>
              </ContactRow>
              <ContactRow icon="mail">
                <a href="mailto:mmkitchenworld.glen@gmail.com" className="hover:text-white underline underline-offset-2">mmkitchenworld.glen@gmail.com</a>
              </ContactRow>
            </ul>
            <p className="mt-4 text-xs text-white/50">GSTIN 29BYFPK5802C1ZM</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/15 flex flex-col md:flex-row items-center justify-between gap-3 md:pr-16 text-[13px] text-white/60">
          <p className="text-center md:text-left">© {new Date().getFullYear()} MM Kitchen World. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link className="hover:text-white transition-colors" to="/privacy">Privacy Policy</Link>
            <Link className="hover:text-white transition-colors" to="/terms">Terms of Service</Link>
            <Link className="hover:text-white transition-colors inline-flex items-center gap-1" to="/admin"><Icon name="lock" className="text-sm" />Staff login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
