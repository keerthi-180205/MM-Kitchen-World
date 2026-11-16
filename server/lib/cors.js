/** Which websites may call the API from a browser. Same-origin and non-browser calls carry no Origin header. */
export function isOriginAllowed(origin, { production, allowed }) {
  if (!origin) return true;
  if (!production) return true; // local development and tests
  return allowed.has(origin.replace(/\/+$/, ""));
}
