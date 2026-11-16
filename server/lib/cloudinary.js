import crypto from "crypto";

/**
 * Cloudinary (free image hosting). Configure with the single variable Cloudinary shows in its dashboard:
 *   CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME
 * Uploads are signed on the server, so the secret never reaches the browser.
 */
export function cloudinaryConfig(env = process.env) {
  const m = (env.CLOUDINARY_URL || "").match(/^cloudinary:\/\/([^:]+):([^@]+)@(.+)$/);
  if (!m) return null;
  return { apiKey: m[1], apiSecret: m[2], cloudName: m[3] };
}

/** Cloudinary signature: sha1 of the sorted "key=value&key=value" string plus the API secret. */
export function signParams(params, apiSecret) {
  const toSign = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  return crypto.createHash("sha1").update(toSign + apiSecret).digest("hex");
}

/** Make delivered photos light: automatic format and quality, capped at 1200px wide. */
export function optimisedUrl(secureUrl) {
  return secureUrl.replace("/image/upload/", "/image/upload/f_auto,q_auto,w_1200,c_limit/");
}

export async function uploadToCloudinary(buffer, mimetype, config = cloudinaryConfig()) {
  if (!config) throw new Error("Cloudinary is not configured.");
  const timestamp = Math.floor(Date.now() / 1000);
  const folder = "mm-kitchen-world";
  const signature = signParams({ folder, timestamp }, config.apiSecret);

  const form = new FormData();
  form.append("file", new Blob([buffer], { type: mimetype || "application/octet-stream" }), "upload");
  form.append("api_key", config.apiKey);
  form.append("timestamp", String(timestamp));
  form.append("folder", folder);
  form.append("signature", signature);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${encodeURIComponent(config.cloudName)}/image/upload`, {
    method: "POST",
    body: form,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.secure_url) {
    throw new Error(data?.error?.message || `Cloudinary upload failed (${res.status}).`);
  }
  return { url: optimisedUrl(data.secure_url), bytes: data.bytes };
}
