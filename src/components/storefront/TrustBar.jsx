import Icon from "../Icon";
import GoogleRating from "../GoogleRating";
import { PHONE_TEL } from "../../constants";

/** Slim dark strip above the header: social proof and quick facts. Hidden on phones to save space. */
export default function TrustBar() {
  return (
    <div className="hidden sm:block bg-[#06305F] text-white text-[13px]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-10 flex items-center justify-between gap-6">
        <GoogleRating light />
        <p className="hidden md:flex items-center gap-2 text-white/85">
          <Icon name="verified" className="text-base text-sky-300" />
          GLEN Exclusive Store, Basaveshwara Nagar
          <span className="text-white/30">·</span>
          Open every day
          <span className="hidden xl:inline text-white/30">·</span>
          <span className="hidden xl:inline">Bulk orders &amp; corporate gifting welcome</span>
        </p>
        <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center gap-1.5 font-semibold hover:text-sky-200 transition-colors whitespace-nowrap">
          <Icon name="call" className="text-base" />
          97432 33729
        </a>
      </div>
    </div>
  );
}
