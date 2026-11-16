import { useState } from "react";
import Icon from "../Icon";
import { assetUrl, whatsappUrl, INSTAGRAM_URL, YOUTUBE_URL } from "../../constants";

const DIRECTIONS_URL =
  "https://www.google.com/maps/search/?api=1&query=No.+MIG-45+KHB+Colony+2nd+Stage+near+Pavithra+Paradise+opposite+IndusInd+Bank+Basaveshwara+Nagar+Bangalore+560079";

const SHOWROOM_PHOTOS = [
  {
    id: "counter",
    src: "assets/showroom/showroom-store.webp",
    label: "Live Consultation Counter",
    caption: "Live demonstration counter with interactive cooktops, built-in ovens & wall chimneys",
  },
  {
    id: "displays",
    src: "assets/showroom/showroom-displays.webp",
    label: "Chimneys & Hobs Wall",
    caption: "Suspended stainless steel island chimney, cooker hoods, and built-in microwave/oven tower",
  },
  {
    id: "certified",
    src: "assets/showroom/showroom-certified.webp",
    label: "Built-in Studio & Award",
    caption: "Installed built-in ovens, glass hobs & JD Certified Kitchen Appliance Brand display",
  },
  {
    id: "entrance",
    src: "assets/showroom/showroom-entrance.webp",
    label: "Storefront Entrance",
    caption: "Grand physical store entrance at Basaveshwara Nagar, Bangalore",
  },
];

export default function Showroom() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const current = SHOWROOM_PHOTOS[selectedIdx];

  return (
    <section className="py-14 sm:py-20 bg-background border-b border-outline-variant" id="showroom">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Showroom imagery with interactive gallery */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            <div className="relative rounded-2xl overflow-hidden border border-outline-variant bg-surface-container-lowest shadow-md">
              <img
                key={current.src}
                className="w-full h-[280px] sm:h-[380px] lg:h-[460px] object-cover transition-opacity duration-300"
                alt={current.caption}
                src={assetUrl(current.src)}
                loading="lazy"
                decoding="async"
              />
              <div className="absolute top-4 left-4 bg-surface-container-lowest/95 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-outline-variant flex items-center gap-2 shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-tertiary animate-pulse"></span>
                <span className="font-label-md text-xs sm:text-label-md text-on-surface font-bold">Live Demonstration Counter Open</span>
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 sm:p-5 text-white">
                <p className="font-headline-sm text-sm sm:text-base font-bold">{current.label}</p>
                <p className="text-xs sm:text-sm text-white/80 line-clamp-1">{current.caption}</p>
              </div>
            </div>

            {/* Thumbnail switcher */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {SHOWROOM_PHOTOS.map((photo, idx) => (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => setSelectedIdx(idx)}
                  className={`relative rounded-xl overflow-hidden border-2 transition-all p-0.5 text-left group cursor-pointer ${
                    selectedIdx === idx
                      ? "border-primary shadow-md ring-2 ring-primary/20 scale-[1.02]"
                      : "border-outline-variant hover:border-primary/50 opacity-75 hover:opacity-100"
                  }`}
                  aria-label={`View ${photo.label}`}
                >
                  <img
                    src={assetUrl(photo.src)}
                    alt={photo.label}
                    className="w-full h-16 sm:h-20 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors rounded-lg"></div>
                  <span className="absolute bottom-1 left-1.5 right-1.5 text-[10px] sm:text-xs font-bold text-white bg-black/60 backdrop-blur-xs px-1.5 py-0.5 rounded truncate block">
                    {photo.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Details & booking */}
          <div className="lg:col-span-5">
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-bold section-eyebrow mb-2">MM Kitchen World · Exclusive Showroom</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">See It. Explore It. Experience It.</h2>
            <p className="font-body-md text-body-md text-slate-700 mb-3 leading-relaxed">
              Visit our Basaveshwara Nagar showroom and explore our collection of kitchen appliances in person. Experience product demonstrations, compare features and get personalised guidance from our team.
            </p>
            <p className="font-body-md text-sm sm:text-base text-slate-800 mb-6 leading-relaxed">
              <span className="text-[#0B4F9C] font-extrabold">Chimney specialists</span> providing live hands-on demos, expert guidance, and site visit services*. Watch unboxings &amp; reviews on our{" "}
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">
                Instagram Reels
              </a>{" "}
              &amp;{" "}
              <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">
                YouTube
              </a>
              , as we help homeowners, home chefs, corporate bulk &amp; wholesale buyers choose the best appliances for modern homes.
            </p>
            <div className="space-y-4 mb-8">
              <InfoRow icon="location_on">
                <p className="font-label-md text-label-md text-on-surface font-bold">MM Kitchen World - Glen Exclusive Store</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">No. MIG-45, KHB Colony, 2nd Stage, near Pavithra Paradise, opposite IndusInd Bank, Basaveshwara Nagar, Bangalore - 560079</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">GSTIN: 29BYFPK5802C1ZM</p>
              </InfoRow>
              <InfoRow icon="schedule">
                <p className="font-label-md text-label-md text-on-surface font-bold">Visiting Hours</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Monday – Sunday : 10:30 AM – 8:30 PM (Open all days)</p>
              </InfoRow>
              <InfoRow icon="support_agent">
                <p className="font-label-md text-label-md text-on-surface font-bold">Showroom Consultation Desk</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Praveen Kumar: +91 97432 33729 / 96630 78780 · mmkitchenworld.glen@gmail.com</p>
              </InfoRow>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-colors" href={DIRECTIONS_URL} rel="noopener noreferrer" target="_blank">
                <Icon name="directions" className="text-lg" />
                <span>Get Directions</span>
              </a>
              <a className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg border border-primary text-primary font-label-md text-label-md hover:bg-surface-container-low transition-colors" href={whatsappUrl("I would like to book a showroom consultation")} rel="noopener noreferrer" target="_blank">
                <Icon name="event" className="text-lg" />
                <span>Book a Visit on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ icon, children }) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl bg-surface-container-lowest border border-outline-variant">
      <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary flex-shrink-0">
        <Icon name={icon} />
      </div>
      <div className="min-w-0 [overflow-wrap:anywhere]">{children}</div>
    </div>
  );
}
