import Icon from "../Icon";
import { GMB_URL, assetUrl } from "../../constants";

const HIGHLIGHTS = [
  { icon: "photo_library", title: "Installation photos", text: "Finished kitchens with GLEN chimneys, hobs and ovens fitted." },
  { icon: "videocam", title: "Videos", text: "See the appliances in real homes, not just a catalogue." },
  { icon: "star", title: "Ratings & reviews", text: "Read what other customers say about us." },
];

/** Sends customers to the live Google Business Profile, where the installation photos and videos are kept. */
export default function Installations() {
  return (
    <section className="py-14 sm:py-20 bg-inverse-surface text-inverse-on-surface relative overflow-hidden border-b border-outline-variant" id="installations">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FAF7F0_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <span className="font-label-sm text-label-sm text-inverse-primary uppercase tracking-widest font-bold section-eyebrow mb-3">Real Homes, Real Kitchens</span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-white mb-4">See Our Home Installations</h2>
            <p className="font-body-lg text-body-lg text-inverse-on-surface/85 mb-8 max-w-xl">
              Don't just take our word for it. Browse photos and videos of GLEN appliances installed in real homes, right on our Google profile.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={GMB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-lg bg-white text-inverse-surface font-label-lg text-label-lg font-bold shadow-lg hover:bg-surface-container-low active:scale-95 transition-all"
              >
                <Icon name="play_circle" className="text-xl text-primary" />
                <span>View Photos &amp; Videos on Google</span>
              </a>
              <a
                href={GMB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-white/40 text-white font-label-lg text-label-lg font-semibold hover:bg-white/10 transition-colors"
              >
                <Icon name="star" className="text-xl" />
                <span>Read Reviews</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <a
              href={GMB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative rounded-2xl overflow-hidden border border-white/20 group shadow-2xl block"
              aria-label="View verified showroom and installation photos on Google"
            >
              <img
                src={assetUrl("assets/showroom/showroom-displays.webp")}
                alt="Real GLEN appliance installation and displays at MM Kitchen World"
                className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex items-end p-5">
                <div className="flex items-center gap-3">
                  <span className="w-11 h-11 rounded-full bg-white text-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Icon name="play_arrow" className="text-2xl text-primary" />
                  </span>
                  <div>
                    <p className="text-white font-bold text-sm sm:text-base">Watch Installation Demos &amp; Photos</p>
                    <p className="text-white/80 text-xs">Live showroom displays in Basaveshwara Nagar · 139+ Google Reviews</p>
                  </div>
                </div>
              </div>
            </a>

            <ul className="grid sm:grid-cols-3 gap-3">
              {HIGHLIGHTS.map((h) => (
                <li key={h.title} className="p-3.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon name={h.icon} className="text-lg text-inverse-primary" />
                    <strong className="text-white text-xs sm:text-sm font-semibold">{h.title}</strong>
                  </div>
                  <span className="text-[11px] text-inverse-on-surface/80 leading-snug block">{h.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
