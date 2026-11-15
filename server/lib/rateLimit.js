/**
 * Tiny in-memory fixed-window rate limiter (enough for a single-process showroom site).
 * Usage: router.post("/", rateLimit({ windowMs: 60_000, max: 5 }), handler)
 */
export function rateLimit({ windowMs, max, message = "Too many requests. Please try again later." }) {
  const hits = new Map();

  // Drop expired entries so the map can't grow without bound.
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of hits) if (entry.resetAt <= now) hits.delete(key);
  }, windowMs).unref();

  return (req, res, next) => {
    const key = req.ip || req.socket?.remoteAddress || "unknown";
    const now = Date.now();
    let entry = hits.get(key);
    if (!entry || entry.resetAt <= now) {
      entry = { count: 0, resetAt: now + windowMs };
      hits.set(key, entry);
    }
    entry.count += 1;
    if (entry.count > max) {
      res.set("Retry-After", String(Math.ceil((entry.resetAt - now) / 1000)));
      return res.status(429).json({ error: message });
    }
    next();
  };
}
