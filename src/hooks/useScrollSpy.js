import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Tracks which in-page section ("#id") is currently in view.
 * `activate(href)` highlights a link immediately on click and suppresses the
 * scroll listener for 800ms so the smooth-scroll doesn't flicker the highlight.
 */
export function useScrollSpy(sectionIds) {
  const [active, setActive] = useState(() => window.location.hash || sectionIds[0]);
  const manualClick = useRef(false);
  const manualTimer = useRef(null);

  const activate = useCallback((href) => {
    setActive(href);
    manualClick.current = true;
    clearTimeout(manualTimer.current);
    manualTimer.current = setTimeout(() => {
      manualClick.current = false;
    }, 800);
  }, []);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => ({ id, el: document.querySelector(id) }))
      .filter((s) => s.el);

    function onScroll() {
      if (manualClick.current) return;
      const scrollPos = window.scrollY + 130;

      // Bottom of page: activate the last section.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        const last = sections[sections.length - 1];
        if (last) setActive(last.id);
        return;
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].el.getBoundingClientRect().top + window.scrollY <= scrollPos) {
          setActive(sections[i].id);
          break;
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(manualTimer.current);
    };
  }, [sectionIds]);

  return [active, activate];
}
