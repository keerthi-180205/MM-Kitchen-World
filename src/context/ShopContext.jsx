import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const WISHLIST_KEY = "mm_wishlist_v1";
const COMPARE_KEY = "mm_compare_v1";
export const MAX_COMPARE = 3;

function load(key) {
  try {
    const v = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(v) ? v.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

const ShopContext = createContext(null);

/** Wishlist ("My List") and compare selection, remembered in the visitor's browser. */
export function ShopProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => load(WISHLIST_KEY));
  const [compare, setCompare] = useState(() => load(COMPARE_KEY));
  const [notice, setNotice] = useState("");

  useEffect(() => {
    try { localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist)); } catch { /* private mode */ }
  }, [wishlist]);
  useEffect(() => {
    try { localStorage.setItem(COMPARE_KEY, JSON.stringify(compare)); } catch { /* private mode */ }
  }, [compare]);
  useEffect(() => {
    if (!notice) return undefined;
    const t = setTimeout(() => setNotice(""), 2800);
    return () => clearTimeout(t);
  }, [notice]);

  const toggleWishlist = useCallback((id) => {
    setWishlist((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]));
  }, []);

  const toggleCompare = useCallback((id) => {
    setCompare((list) => {
      if (list.includes(id)) return list.filter((x) => x !== id);
      if (list.length >= MAX_COMPARE) {
        setNotice(`You can compare up to ${MAX_COMPARE} models. Remove one to add another.`);
        return list;
      }
      return [...list, id];
    });
  }, []);

  const value = useMemo(
    () => ({
      wishlist,
      compare,
      notice,
      toggleWishlist,
      toggleCompare,
      clearWishlist: () => setWishlist([]),
      clearCompare: () => setCompare([]),
      inWishlist: (id) => wishlist.includes(id),
      inCompare: (id) => compare.includes(id),
    }),
    [wishlist, compare, notice, toggleWishlist, toggleCompare]
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside <ShopProvider>");
  return ctx;
}
