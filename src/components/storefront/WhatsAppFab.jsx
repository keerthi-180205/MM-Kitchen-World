import { WhatsAppIcon } from "../BrandIcons";
import { whatsappUrl } from "../../constants";
import { trackEnquiry } from "../../lib/analytics";
import { useShop } from "../../context/ShopContext";

/** Floating round WhatsApp button (logo only). */
export default function WhatsAppFab() {
  const { compare } = useShop();
  return (
    <a
      className={`fixed ${compare.length ? "bottom-24" : "bottom-6"} right-6 z-50 w-14 h-14 rounded-full bg-tertiary text-white flex items-center justify-center shadow-[0_8px_24px_-4px_rgba(37,211,102,0.55)] hover:scale-110 hover:shadow-[0_10px_28px_-2px_rgba(37,211,102,0.7)] active:scale-95 transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tertiary`}
      href={whatsappUrl("Hello MM Kitchen World, I have an enquiry regarding kitchen appliances")}
      rel="noopener noreferrer"
      target="_blank"
      onClick={() => trackEnquiry(null, "floating")}
      aria-label="Chat with us on WhatsApp"
      title="Chat on WhatsApp"
    >
      <span className="absolute inset-0 rounded-full bg-tertiary opacity-40 animate-ping motion-reduce:hidden" aria-hidden="true"></span>
      <span className="relative [&_svg]:w-8 [&_svg]:h-8">
        <WhatsAppIcon />
      </span>
    </a>
  );
}
