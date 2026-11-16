import Icon from "../Icon";
import { assetUrl, whatsappUrl, GMB_URL } from "../../constants";
import { trackEnquiry } from "../../lib/analytics";

const TRUST_BADGES = [
  { icon: "verified", title: "Expert Guidance", text: "Find appliances that suit your lifestyle" },
  { icon: "shield", title: "Authorised Exclusive Store", text: "GLEN manufacturer warranty" },
  { icon: "handyman", title: "Installation Support", text: "Doorstep fitting & site visits" },
  { icon: "home_repair_service", title: "Site Visit Service", text: "Kitchen layout & ducting check" },
  { icon: "videocam", title: "Online Consultancy", text: "1-on-1 video guidance & demo" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pt-8 sm:pb-16 lg:py-20 bg-gradient-to-br from-[#FFFBF2] via-background to-[#E8F3FF] border-b border-outline-variant" id="home">
      {/* Soft colour glows behind the content */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-24 w-[520px] h-[520px] rounded-full bg-sky-300/30 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-[460px] h-[460px] rounded-full bg-amber-200/30 blur-3xl"></div>
      </div>
      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-start">
          {/* Left editorial copy */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex items-center gap-3.5 mb-6 min-h-[66px]">
              <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 animate-float-3d flex items-center justify-center">
                <img
                  src={assetUrl("assets/brand/mm-3d-emblem-transparent.webp")}
                  alt="MM Kitchen World 3D Brand Emblem"
                  className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-surface-container-low border border-outline-variant w-fit shadow-xs">
                <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
                <span className="font-label-sm text-label-sm text-primary font-bold tracking-widest uppercase">BANGALORE'S GLEN EXCLUSIVE STORE · BASAVESHWARA NAGAR</span>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[42px] xl:text-[46px] font-extrabold text-slate-900 tracking-tight leading-[1.14] mb-3">
              Your Dream Kitchen <br />
              <span>Starts Here.</span> <br />
              <span className="text-[#0878E8]">Discover Quality Kitchen Appliances with </span> <br className="hidden sm:inline" />
              <span className="text-[#0878E8]">MM Kitchen World.</span>
            </h1>
            <div className="w-16 h-1 bg-[#0878E8] rounded-full mb-5"></div>
            <p className="font-body-lg text-base sm:text-lg text-slate-600 max-w-xl mb-3 leading-relaxed">
              Explore 283 premium kitchen appliances under one roof — chimneys, gas stoves, hobs, built-in ovens, dishwashers &amp; more with personalized guidance.
            </p>
            <p className="text-sm sm:text-base font-medium text-slate-700 max-w-xl mb-6 leading-relaxed">
              Visit our Basaveshwara Nagar showroom or connect on WhatsApp for latest prices &amp; live demos.
            </p>
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-6 sm:mb-8">
              <a className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-[#0878E8] to-[#005bb3] text-white font-label-md sm:font-label-lg text-sm sm:text-base shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 btn-shine transition-all duration-200 active:scale-98" href="#products">
                <span>Explore 283 Products</span>
                <Icon name="arrow_forward" className="text-base sm:text-lg" />
              </a>
              <a className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-tertiary text-on-tertiary font-label-md sm:font-label-lg text-sm sm:text-base shadow-lg shadow-tertiary/30 hover:brightness-105 hover:-translate-y-0.5 transition-all duration-200 active:scale-98" onClick={() => trackEnquiry(null, "hero")} href={whatsappUrl()} rel="noopener noreferrer" target="_blank">
                <Icon name="chat" className="text-base sm:text-lg" />
                <span>Chat on WhatsApp</span>
              </a>
              <a className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl border border-outline-variant bg-white/70 backdrop-blur text-primary font-label-md sm:font-label-lg text-sm sm:text-base hover:bg-white hover:-translate-y-0.5 transition-all duration-200" href="#showroom">
                <Icon name="storefront" className="text-base sm:text-lg" />
                <span>Visit Showroom</span>
              </a>
            </div>
          </div>

          {/* Right hero visual - expanded horizontally across 7 columns */}
          <div className="lg:col-span-7 flex flex-col gap-3.5">
            {/* Eye-catching Google Reviews Tab Above Image */}
            <a
              href={GMB_URL}
              target="_blank"
              rel="noopener noreferrer"
              title="View verified 4.7-star rating & 139+ reviews on Google Maps"
              className="group flex items-center justify-between gap-3 p-3 sm:px-4 sm:py-2.5 min-h-[66px] rounded-2xl bg-white border border-outline-variant shadow-md hover:shadow-xl hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Official Google 4-Color G Logo */}
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-headline-sm text-base font-bold text-slate-900 leading-none">4.7</span>
                    <div className="flex text-amber-400" aria-label="5 stars rating">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <Icon key={i} name="star" fill className="text-[17px]" />
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <Icon name="verified" className="text-xs text-emerald-600" />
                      Verified
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant font-medium mt-0.5 truncate">
                    <strong className="text-on-surface font-semibold">139+ Google Reviews</strong> · Bangalore's Top Rated Glen Store
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-primary text-xs font-bold pl-2 shrink-0 group-hover:translate-x-1 transition-transform">
                <span className="hidden sm:inline">View Reviews</span>
                <Icon name="arrow_outward" className="text-base" />
              </div>
            </a>

            {/* 100% Unobstructed Full Showroom Photo - Expands into empty space, full 16:9 view */}
            <div className="relative rounded-3xl overflow-hidden border border-outline-variant/80 bg-surface-container-lowest shadow-xl shadow-slate-900/10">
              <img
                className="w-full h-auto aspect-[16/9] object-cover"
                alt="MM Kitchen World - GLEN Exclusive Showroom Interior with live consultation counter, built-in appliances, and display counters"
                src={assetUrl("assets/hero/hero-inner.webp")}
                loading="eager"
                fetchPriority="high"
              />
            </div>

            {/* Walk-in Welcome Card positioned cleanly BELOW the image */}
            <div className="p-4 sm:p-4.5 rounded-2xl bg-white border border-outline-variant flex items-center justify-between shadow-md hover:border-primary/40 transition-colors">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                  <Icon name="location_on" className="text-2xl" />
                </div>
                <div className="min-w-0">
                  <span className="font-label-sm text-xs text-primary uppercase font-bold tracking-wider block">Walk-ins Welcome</span>
                  <p className="font-headline-sm text-sm sm:text-base text-on-surface font-bold leading-tight truncate">Basaveshwara Nagar Showroom</p>
                  <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant mt-0.5">Open all days · 10:30 AM to 8:30 PM</p>
                </div>
              </div>
              <a
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-primary-container text-on-primary flex items-center justify-center hover:bg-primary transition-all shadow-sm hover:scale-105 active:scale-95 shrink-0 ml-2"
                href="#showroom"
                title="View Showroom Details & Directions"
                aria-label="View Showroom Details & Directions"
              >
                <Icon name="arrow_outward" className="text-xl" />
              </a>
            </div>
          </div>

          {/* 5 Service & Trust Highlights (Text + Icon only, zero buttons) spanning directly below */}
          <div className="lg:col-span-12 pt-8 border-t border-outline-variant grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 xl:gap-5">
            {TRUST_BADGES.map((b) => (
              <div key={b.title} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white shadow-xs border border-outline-variant flex items-center justify-center text-primary shrink-0">
                  <Icon name={b.icon} className="text-xl" />
                </div>
                <div className="min-w-0">
                  <p className="font-label-md text-xs sm:text-sm text-on-surface font-bold leading-tight">{b.title}</p>
                  <p className="font-body-sm text-[11px] sm:text-xs text-on-surface-variant leading-snug mt-0.5">{b.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
