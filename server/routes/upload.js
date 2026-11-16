import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { requireAuth } from "../middleware/auth.js";
import { IS_PRODUCTION } from "../config.js";
import { cloudinaryConfig, uploadToCloudinary } from "../lib/cloudinary.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|gif|svg/;
    const ext = path.extname(file.originalname).toLowerCase().replace(".", "");
    const mime = file.mimetype;
    if (allowed.test(ext) || allowed.test(mime)) {
      cb(null, true);
    } else {
      cb(new Error("Only image files (JPEG, PNG, WebP, GIF, SVG) are allowed."));
    }
  },
});

router.post("/", requireAuth, upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image file provided." });
  }

  // Hosted photos (Cloudinary): survives restarts and redeploys on free hosts.
  const cloud = cloudinaryConfig();
  if (cloud) {
    try {
      const { url, bytes } = await uploadToCloudinary(req.file.buffer, req.file.mimetype, cloud);
      return res.json({ url, filename: path.basename(url), size: bytes ?? req.file.size });
    } catch (err) {
      console.error("[Upload] Cloudinary error:", err.message);
      return res.status(502).json({ error: "The image host rejected the upload. Please try again." });
    }
  }

  // Without a photo host, production servers on free plans lose local files when they restart.
  // The admin form then falls back to embedding a compressed copy of the photo in the product itself.
  if (IS_PRODUCTION) {
    return res.status(503).json({ error: "Photo hosting is not set up on this server." });
  }

  // Development: keep the file on disk.
  const uploadDir = path.resolve(__dirname, "../../public/uploads");
  fs.mkdirSync(uploadDir, { recursive: true });
  const ext = path.extname(req.file.originalname).toLowerCase() || ".webp";
  const filename = "appliance-" + Date.now() + "-" + Math.round(Math.random() * 1e6) + ext;
  fs.writeFileSync(path.join(uploadDir, filename), req.file.buffer);
  return res.json({ url: `uploads/${filename}`, filename, size: req.file.size });
});

export default router;
