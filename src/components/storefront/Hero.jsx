import Icon from "../Icon";
import { assetUrl, whatsappUrl } from "../../constants";
import GoogleRating from "../GoogleRating";
import { trackEnquiry } from "../../lib/analytics";

const TRUST_BADGES = [
  { icon: "verified", title: "Expert Kitchen Guidance", text: "The right size, the right fit" },
  { icon: "shield", title: "100% Genuine GLEN", text: "Authorised store, GLEN warranty" },
  { icon: "handyman", title: "Installation Support", text: "Seamless, hassle-free fitting" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pt-8 sm:pb-16 lg:py-20 bg-gradient-to-br from-[#FFFBF2] via-background to-[#E8F3FF] border-b border-outline-variant" id="home">
      {/* Soft colour glows behind the content */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-32 -right-24 w-[520px] h-[520px] rounded-full bg-sky-300/30 blur-3xl"></div>
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-32 w-[460px] h-[460px] rounded-full bg-amber-200/30 blur-3xl"></div>
      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left editorial copy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-low border border-outline-variant w-fit mb-6">
              <span className="w-2 h-2 rounded-full bg-primary-container"></span>
              <span className="font-label-sm text-label-sm text-primary tracking-widest uppercase">BANGALORE'S GLEN EXCLUSIVE STORE · BASAVESHWARA NAGAR</span>
            </div>
            <h1 className="font-display-hero text-display-hero-mobile md:text-display-hero text-on-surface mb-5 sm:mb-6 tracking-tight">
              Upgrade Your Kitchen <br />
              <span className="italic bg-gradient-to-r from-[#005bb3] via-[#0878E8] to-[#3b9bff] bg-clip-text text-transparent">with Genuine GLEN Appliances.</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-8">
              Chimneys, hobs, gas stoves, built-in ovens, microwaves and dishwashers: 209 GLEN models under one roof. Walk in to see them live, or message us on WhatsApp for expert advice and today's store price.
            </p>
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-10">
              <a className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#0878E8] to-[#005bb3] text-white font-label-lg text-label-lg shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 btn-shine transition-all duration-200 active:scale-98" href="#products">
                <span>Browse 209 Models</span>
                <Icon name="arrow_forward" className="text-lg" />
              </a>
              <a className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-tertiary text-on-tertiary font-label-lg text-label-lg shadow-lg shadow-tertiary/30 hover:brightness-105 hover:-translate-y-0.5 transition-all duration-200 active:scale-98" onClick={() => trackEnquiry(null, "hero")} href={whatsappUrl()} rel="noopener noreferrer" target="_blank">
                <Icon name="chat" className="text-lg" />
                <span>Chat on WhatsApp</span>
              </a>
              <a className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-outline-variant bg-white/70 backdrop-blur text-primary font-label-lg text-label-lg hover:bg-white hover:-translate-y-0.5 transition-all duration-200" href="#showroom">
                <Icon name="storefront" className="text-lg" />
                <span>Visit Our Showroom</span>
              </a>
            </div>
            {/* Trust badges */}
            <div className="pt-8 border-t border-outline-variant grid grid-cols-1 sm:grid-cols-3 gap-4">
              {TRUST_BADGES.map((b) => (
                <div key={b.title} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-outline-variant flex items-center justify-center text-primary">
                    <Icon name={b.icon} className="text-lg" />
                  </div>
                  <div>
                    <p className="font-label-md text-label-md text-on-surface font-bold">{b.title}</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">{b.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right hero visual */}
          <div className="lg:col-span-5 relative">
            {/* Floating product cards (large screens) */}
            <div aria-hidden="true" style={{ "--tilt": "-4deg" }} className="floaty hidden lg:block absolute -left-10 top-14 z-20 w-40 rounded-2xl bg-white p-3 shadow-2xl shadow-slate-900/15 border border-slate-100">
              <img src={assetUrl("assets/products/chimneys/chimneys-ch-6052-di-bl-ac.webp")} alt="" className="h-20 w-full object-contain mix-blend-multiply" />
              <p className="mt-1 text-[13px] font-bold text-on-surface leading-tight">Chimneys</p>
              <p className="text-[11px] text-on-surface-variant">49 models</p>
            </div>
            <div aria-hidden="true" style={{ "--tilt": "3deg", animationDelay: "-2.5s" }} className="floaty hidden lg:block absolute -right-8 top-36 z-20 w-40 rounded-2xl bg-white p-3 shadow-2xl shadow-slate-900/15 border border-slate-100">
              <img src={assetUrl("assets/products/hobs/hobs-bh-1018-ic-2z.webp")} alt="" className="h-20 w-full object-contain mix-blend-multiply" />
              <p className="mt-1 text-[13px] font-bold text-on-surface leading-tight">Hobs</p>
              <p className="text-[11px] text-on-surface-variant">75 models</p>
            </div>

            <div className="relative rounded-3xl overflow-hidden border border-white/60 bg-surface-container-lowest shadow-2xl shadow-primary/20 ring-1 ring-black/5">
              <div className="absolute top-3 left-3 sm:top-5 sm:left-5 z-10 px-3.5 py-2 rounded-full bg-white/95 backdrop-blur shadow-lg">
                <GoogleRating />
              </div>
              <img
                className="w-full h-[320px] sm:h-[420px] lg:h-[520px] object-cover"
                alt="MM Kitchen World - GLEN Exclusive Store physical storefront in Basaveshwara Nagar Bangalore with grand illuminated signage and glass displays"
                src={assetUrl("assets/hero/hero-storefront.webp")}
                loading="eager"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent"></div>
              {/* Floating walk-in showroom badge */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 p-3 sm:p-4 rounded-xl bg-surface-container-lowest/95 backdrop-blur-md border border-outline-variant flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
                    <Icon name="location_on" />
                  </div>
                  <div>
                    <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">Walk-ins Welcome</span>
                    <p className="font-headline-sm text-headline-sm text-on-surface font-bold leading-tight">Basaveshwara Nagar Showroom</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Open every day · 10 AM to 8:30 PM</p>
                  </div>
                </div>
                <a className="w-10 h-10 rounded-lg bg-primary-container text-on-primary flex items-center justify-center hover:bg-primary transition-colors" href="#showroom">
                  <Icon name="arrow_outward" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
