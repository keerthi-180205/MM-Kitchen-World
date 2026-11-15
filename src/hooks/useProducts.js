import { useSyncExternalStore } from "react";
import { DEFAULT_PRODUCTS, getAll, subscribe } from "../store/productsStore";

/** All products (published and draft); re-renders on any catalog change, in this tab or another. */
export function useProducts() {
  return useSyncExternalStore(subscribe, getAll, () => DEFAULT_PRODUCTS);
}
