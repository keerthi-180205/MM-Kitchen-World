/**
 * MM Kitchen World - Shared Product Store (Connected to Node.js / Express Backend).
 *
 * Provides synchronous referential snapshot reads for useSyncExternalStore,
 * backed by localStorage cache and continuous synchronization with the
 * Node.js / Express SQLite backend (/api/products).
 */
import defaultProducts from "../data/defaultProducts.json";
import imagePresets from "../data/imagePresets.json";

export const DEFAULT_PRODUCTS = defaultProducts;
export const IMAGE_PRESETS = imagePresets;

const STORAGE_KEY = "mm_kitchen_world_catalog_v7";
const TOKEN_KEY = "mm_admin_token";
const UPDATE_EVENT = "catalog-updated";

let lastRaw = null;
let lastParsed = DEFAULT_PRODUCTS;

export function getAuthToken() {
  try {
    return sessionStorage.getItem(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY) || null;
  } catch {
    return null;
  }
}

export function setAuthToken(token, persist = false) {
  try {
    if (token) {
      sessionStorage.setItem(TOKEN_KEY, token);
      if (persist) localStorage.setItem(TOKEN_KEY, token);
    } else {
      sessionStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(TOKEN_KEY);
    }
  } catch {
    // storage unavailable
  }
}

export function clearAuthToken() {
  setAuthToken(null);
}

export function getAll() {
  let raw;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    console.warn("Error reading catalog storage:", e);
    return DEFAULT_PRODUCTS;
  }
  if (raw === null) return DEFAULT_PRODUCTS;
  if (raw === lastRaw) return lastParsed;
  try {
    lastParsed = JSON.parse(raw);
    lastRaw = raw;
    return lastParsed;
  } catch (e) {
    console.warn("Error parsing catalog storage:", e);
    return DEFAULT_PRODUCTS;
  }
}

export function getPublished() {
  return getAll().filter((p) => p.status === "Published" || !p.status);
}

export function getById(id) {
  return getAll().find((p) => p.id === id);
}

export function save(products) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    lastParsed = products;
    lastRaw = JSON.stringify(products);
  } catch (e) {
    console.warn("Error saving to localStorage:", e);
  }
  window.dispatchEvent(new CustomEvent(UPDATE_EVENT, { detail: products }));
}

export function subscribe(callback) {
  window.addEventListener(UPDATE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(UPDATE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function isDuplicateModel(model, excludeId) {
  if (!model) return false;
  const normalized = model.trim().toUpperCase();
  return getAll().some(
    (p) => p.id !== excludeId && (p.model || "").trim().toUpperCase() === normalized
  );
}

/** Fetch latest products from Node.js backend */
export async function fetchProducts() {
  try {
    const res = await fetch("/api/products");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      save(data);
      return data;
    }
  } catch (err) {
    console.warn("[ProductsStore] Could not fetch products from server, using local cache:", err);
  }
  return getAll();
}

/**
 * Send a change (add / edit / delete / reset) to the server and return its JSON reply.
 * Changes are never saved "locally" behind the owner's back: if the server can't be reached or
 * refuses the change, this throws a clear message so the admin screen can show it.
 */
async function mutate(path, { method, body } = {}) {
  const token = getAuthToken();
  const headers = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;

  let res;
  try {
    res = await fetch(path, { method, headers, body: body !== undefined ? JSON.stringify(body) : undefined });
  } catch {
    throw new Error("Could not reach the server, so nothing was saved. Check that it is running and try again.");
  }

  let data = null;
  try {
    data = await res.json();
  } catch {
    /* empty reply */
  }

  if (res.status === 401) {
    clearAuthToken();
    window.dispatchEvent(new Event("admin-session-expired"));
    throw new Error("Your login has expired. Please log in again. Nothing was saved.");
  }
  if (!res.ok) {
    const err = new Error(data?.error || `The server could not save that change (error ${res.status}).`);
    err.status = res.status;
    throw err;
  }
  return data;
}

/** Add a new product. */
export async function add(productData) {
  const created = await mutate("/api/products", { method: "POST", body: productData });
  save([created, ...getAll()]);
  return created;
}

/** Update a product. */
export async function update(id, updatedFields) {
  const updated = await mutate(`/api/products/${encodeURIComponent(id)}`, { method: "PUT", body: updatedFields });
  const products = getAll();
  const index = products.findIndex((p) => p.id === id);
  if (index !== -1) {
    const next = [...products];
    next[index] = updated;
    save(next);
  }
  return updated;
}

/** Delete a product. */
export async function remove(id) {
  try {
    await mutate(`/api/products/${encodeURIComponent(id)}`, { method: "DELETE" });
  } catch (err) {
    // Already gone on the server (e.g. deleted in another tab): just drop it from the list.
    if (err.status !== 404) throw err;
  }
  const next = getAll().filter((p) => p.id !== id);
  save(next);
  return next;
}

/** Restore the verified GLEN catalogue on the server, then reload it. */
export async function resetToDefaults() {
  await mutate("/api/products/reset", { method: "POST" });
  return fetchProducts();
}

/** Upload product image to server */
export async function uploadImage(file) {
  const token = getAuthToken();
  const formData = new FormData();
  formData.append("image", file);

  const headers = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch("/api/upload", {
    method: "POST",
    headers,
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Image upload failed");
  }

  return await res.json(); // { url, filename, size }
}

// Initial seed / server fetch on module load
try {
  if (localStorage.getItem(STORAGE_KEY) === null) {
    save(DEFAULT_PRODUCTS);
  }
} catch (e) {
  console.warn("Could not check local storage on load:", e);
}

// Automatically trigger server fetch in browser
if (typeof window !== "undefined") {
  fetchProducts().catch(() => {});
}
