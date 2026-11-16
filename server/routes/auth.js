import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../db.js";
import { requireAuth } from "../middleware/auth.js";
import { JWT_SECRET } from "../config.js";
import { rateLimit } from "../lib/rateLimit.js";

const router = Router();

// 10 attempts per 15 minutes per IP slows down password guessing.
router.post("/login", rateLimit({ windowMs: 15 * 60 * 1000, max: 10, message: "Too many login attempts. Please wait a few minutes and try again." }), async (req, res) => {
  const { username, email, password } = req.body;
  const identifier = (email || username || "").trim().toLowerCase();

  if (!identifier || !password) {
    return res.status(400).json({ error: "Username/Email and password are required." });
  }

  const user = (await db.prepare("SELECT * FROM users WHERE email = ?").get(identifier));
  if (!user) {
    return res.status(401).json({ error: "Unrecognized username or email." });
  }

  const valid = bcrypt.compareSync(password, user.password_hash);
  if (!valid) {
    return res.status(401).json({ error: "Incorrect password. Please verify your credentials." });
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  return res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  });
});

router.get("/me", requireAuth, async (req, res) => {
  const user = (await db.prepare("SELECT id, email, role, created_at FROM users WHERE id = ?").get(req.user.userId));
  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }
  return res.json({ user });
});

router.post("/change-password", requireAuth, rateLimit({ windowMs: 15 * 60 * 1000, max: 10 }), async (req, res) => {
  const { currentPassword, newPassword } = req.body || {};
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: "Current and new password are required." });
  }
  if (String(newPassword).length < 10) {
    return res.status(400).json({ error: "The new password must be at least 10 characters long." });
  }
  const user = (await db.prepare("SELECT * FROM users WHERE id = ?").get(req.user.userId));
  if (!user || !bcrypt.compareSync(currentPassword, user.password_hash)) {
    return res.status(401).json({ error: "Your current password is incorrect." });
  }
  const hash = bcrypt.hashSync(String(newPassword), 10);
  await db.prepare("UPDATE users SET password_hash = ? WHERE id = ?").run(hash, user.id);
  return res.json({ success: true });
});

export default router;

