import dotenv from "dotenv";

dotenv.config();

export const IS_PRODUCTION = process.env.NODE_ENV === "production";

const DEV_FALLBACK_SECRET = "dev-only-insecure-secret-change-me";

if (IS_PRODUCTION && (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32)) {
  throw new Error(
    "JWT_SECRET must be set to a random string of at least 32 characters when NODE_ENV=production."
  );
}

export const JWT_SECRET = process.env.JWT_SECRET || DEV_FALLBACK_SECRET;
if (!process.env.JWT_SECRET) {
  console.warn("[Config] JWT_SECRET is not set: using an insecure development secret.");
}

export const SITE_URL = (process.env.SITE_URL || "").replace(/\/+$/, "");
