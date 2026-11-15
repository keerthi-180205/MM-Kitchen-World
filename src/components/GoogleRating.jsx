import Icon from "./Icon";
import { GMB_URL, GOOGLE_RATING } from "../constants";

/** Star row + "4.7 on Google (139 reviews)", linking to the Google Business Profile. */
export default function GoogleRating({ className = "", light = false, compact = false }) {
  const { score, count } = GOOGLE_RATING;
  return (
    <a
      href={GMB_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Rated ${score} out of 5 on Google from ${count} reviews. Open our Google profile.`}
      className={`inline-flex items-center gap-2 hover:opacity-90 transition-opacity ${className}`}
    >
      <span className="flex text-amber-400" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => <Icon key={i} name="star" fill className="text-[18px]" />)}
      </span>
      <span className={`text-sm font-semibold ${light ? "text-white" : "text-on-surface"}`}>
        {score}
        {!compact && <span className={`font-normal ${light ? "text-white/80" : "text-on-surface-variant"}`}> on Google ({count} reviews)</span>}
      </span>
    </a>
  );
}
