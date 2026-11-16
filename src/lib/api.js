import { getAuthToken } from "../store/productsStore";
import { apiUrl } from "./apiBase";

const TIMEOUT_MS = 90_000; // a sleeping free server can take about a minute to wake up

/** Small fetch wrapper: JSON in/out, optional admin bearer token, readable errors. */
export async function api(path, { method = "GET", body, auth = false } = {}) {
  const headers = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (auth) {
    const token = getAuthToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  let res;
  try {
    res = await fetch(apiUrl(path), {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
  } catch (err) {
    throw new Error(
      err?.name === "AbortError"
        ? "The server is taking too long to respond. Please try again in a minute."
        : "Could not reach the server. Please check your connection and try again."
    );
  } finally {
    clearTimeout(timer);
  }

  if (res.status === 204) return null;
  let data = null;
  let isJson = false;
  try {
    data = await res.json();
    isJson = true;
  } catch {
    /* empty or non-JSON body */
  }
  if (!res.ok) {
    const err = new Error(data?.error || `Request failed (${res.status}).`);
    err.status = res.status;
    err.data = data; // full reply, e.g. the list of bad rows from a spreadsheet import
    throw err;
  }
  // A static host that has no API answers every /api address with the web page and a "success" status.
  // That must never look like a saved form, so a successful reply has to be JSON.
  if (!isJson) {
    throw new Error("The server did not give a valid reply. Please try again or contact us on WhatsApp.");
  }
  return data;
}
