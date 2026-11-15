import Icon from "../Icon";
import { WhatsAppIcon } from "../BrandIcons";
import CallbackForm from "./CallbackForm";
import { PHONE_TEL, whatsappUrl } from "../../constants";
import { trackEnquiry } from "../../lib/analytics";

/** One closing call to action: talk to us on WhatsApp / phone, or leave a number for a call back. */
export default function ContactSection() {
  return (
    <section className="relative overflow-hidden py-14 sm:py-20 bg-gradient-to-br from-[#0B4F9C] via-[#08376D] to-[#052A55] text-white" id="contact">
      <div aria-hidden="true" className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div aria-hidden="true" className="pointer-events-none absolute -top-32 -left-24 w-[420px] h-[420px] rounded-full bg-sky-400/20 blur-3xl"></div>

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
            <p className="flex items-center gap-2 mt-6 text-sm text-white/70"><Icon name="schedule" className="text-lg text-sky-300" />Open every day, 10 AM to 8:30 PM</p>
          </div>

          <div id="callback" className="lg:col-span-3 bg-white text-on-surface rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/30 scroll-mt-28">
            <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Prefer a call? We'll call you back</h3>
            <p className="text-sm text-on-surface-variant mt-1 mb-5">Leave your name and number and our team will ring you with advice and today's store price.</p>
            <CallbackForm source="home" />
          </div>
        </div>
      </div>
    </section>
  );
}
