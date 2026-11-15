import Icon from "../Icon";
import { WhatsAppIcon, InstagramIcon, YouTubeIcon } from "../BrandIcons";
import { PHONE_TEL, whatsappUrl, assetUrl, GMB_URL, YOUTUBE_URL, INSTAGRAM_URL } from "../../constants";
import { trackEnquiry } from "../../lib/analytics";

/** Contact CTA & Praveen Kumar Showroom Specialist Profile Card */
export default function ContactSection() {
  return (
    <section className="relative overflow-hidden py-14 sm:py-20 bg-gradient-to-br from-[#0B4F9C] via-[#08376D] to-[#052A55] text-white" id="contact">
      <div aria-hidden="true" className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-24 w-[420px] h-[420px] rounded-full bg-sky-400/20 blur-3xl"></div>
      </div>

      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-2">
            <span className="font-label-sm text-label-sm text-sky-300 uppercase tracking-widest font-bold section-eyebrow mb-3">Need help choosing?</span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-white mb-4">Tell Us About Your Kitchen. We'll Help You Pick the Perfect Fit.</h2>
            <p className="text-white/80 mb-8 leading-relaxed">
              Share your kitchen layout or wish-list for fitment guidance, ducting advice and special showroom rates. Bulk orders and corporate gifting are welcome too.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappUrl("Hi MM Kitchen World, I would like guidance on kitchen appliances")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEnquiry(null, "other")}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-tertiary text-white font-label-lg text-label-lg font-bold shadow-lg shadow-black/20 hover:brightness-105 hover:-translate-y-0.5 transition-all"
              >
                <span className="[&_svg]:w-5 [&_svg]:h-5"><WhatsAppIcon /></span>
                Chat on WhatsApp
              </a>
              <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl border border-white/30 text-white font-label-lg text-label-lg font-semibold hover:bg-white/10 transition-colors">
                <Icon name="call" className="text-xl" />
                Call the Showroom
              </a>
            </div>
            <p className="flex items-center gap-2 mt-6 text-sm text-white/70"><Icon name="schedule" className="text-lg text-sky-300" />Open all days, 10:30 AM to 8:30 PM</p>
          </div>

          {/* Owner & Appliance Specialist Profile Card */}
          <div className="lg:col-span-3 bg-white/95 backdrop-blur-md text-on-surface rounded-3xl p-6 sm:p-9 shadow-2xl shadow-black/30 border border-white/60 flex flex-col items-center text-center relative overflow-hidden group">
            {/* Subtle decorative glow */}
            <div className="absolute -top-24 inset-x-0 h-40 bg-gradient-to-b from-primary/10 via-sky-400/5 to-transparent pointer-events-none"></div>

            {/* Profile Avatar in round circle structure with glowing animated ring */}
            <div className="relative mb-6">
              {/* Outer pulsing gradient aura */}
              <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-primary via-tertiary to-rose-500 opacity-70 blur-lg group-hover:opacity-100 transition-opacity animate-pulse"></div>
              {/* Circular image container (enlarged) */}
              <div className="relative w-52 h-52 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full p-2 bg-white shadow-2xl ring-4 ring-primary/20 overflow-hidden">
                <img
                  src={assetUrl("assets/team/praveen-kumar.webp")}
                  alt="Praveen Kumar - Owner & Glen Appliance Specialist at MM Kitchen World"
                  className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Live consultation status pill */}
              <div
                className="absolute bottom-3 right-3 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-500 border-2 border-white shadow-lg text-white"
                title="Available for Showroom Consultation"
              >
                <span className="w-3 h-3 rounded-full bg-white animate-ping"></span>
              </div>
            </div>

            {/* Animated name badge */}
            <div className="flex flex-col items-center">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-wider mb-2">
                <Icon name="verified" className="text-sm text-primary" /> Showroom Owner &amp; Glen Specialist
              </span>
              <h3 className="font-headline-md text-2xl sm:text-3xl lg:text-4xl font-extrabold text-on-surface tracking-tight">
                Praveen Kumar
              </h3>
            </div>

            {/* Social media circle buttons matching the user specification */}
            <div className="mt-6 pt-6 border-t border-outline-variant/60 w-full flex flex-col items-center">
              <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">
                Connect Directly on Social Media
              </span>
              <div className="flex items-center justify-center gap-3.5 sm:gap-4 flex-wrap">
                {/* YouTube */}
                <a
                  href={YOUTUBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Watch GLEN Product Demos on YouTube"
                  aria-label="MM Kitchen World YouTube Channel"
                  className="w-12 h-12 rounded-full bg-[#FF0000] text-white flex items-center justify-center shadow-lg shadow-red-500/30 hover:scale-115 hover:-translate-y-1 transition-all duration-200"
                >
                  <YouTubeIcon className="w-6 h-6 fill-current" />
                </a>

                {/* Instagram */}
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Follow on Instagram"
                  aria-label="MM Kitchen World Instagram"
                  className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center shadow-lg shadow-pink-500/30 hover:scale-115 hover:-translate-y-1 transition-all duration-200"
                >
                  <InstagramIcon className="w-6 h-6 fill-current" />
                </a>

                {/* WhatsApp */}
                <a
                  href={whatsappUrl("Hello Praveen, I would like guidance on kitchen appliances for my home")}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEnquiry(null, "praveen-whatsapp")}
                  title="Message Praveen on WhatsApp"
                  aria-label="Chat with Praveen Kumar on WhatsApp"
                  className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 hover:scale-115 hover:-translate-y-1 transition-all duration-200"
                >
                  <WhatsAppIcon className="w-6 h-6 fill-current" />
                </a>

                {/* Google Maps / Location */}
                <a
                  href={GMB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Showroom Location on Google Maps"
                  aria-label="Showroom Location on Google Maps"
                  className="w-12 h-12 rounded-full bg-[#0878E8] text-white flex items-center justify-center shadow-lg shadow-blue-500/30 hover:scale-115 hover:-translate-y-1 transition-all duration-200"
                >
                  <Icon name="location_on" className="text-2xl" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
