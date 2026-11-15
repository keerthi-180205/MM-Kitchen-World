import { useEffect, useRef, useState } from "react";

/**
 * Fades and lifts its children into view once they reach the screen.
 *
 * Deliberately simple: it checks the element's position on load, scroll and resize (no
 * IntersectionObserver), and anything already on or above the screen is shown at once, so jumping to
 * an anchor never leaves a blank section. Visitors who prefer reduced motion see everything immediately.
 */
export default function Reveal({ children, className = "", delay = 0, as: Tag = "div" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(
    () => typeof window === "undefined" || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (shown) return undefined;
    const check = () => {
      const el = ref.current;
      if (!el) return;
      // Reveal when the top edge is on screen, or already scrolled past (e.g. after jumping to an anchor).
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) setShown(true);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [shown]);

  return (
    <Tag
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`transition-all duration-700 ease-out ${shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}
    >
      {children}
    </Tag>
  );
}
