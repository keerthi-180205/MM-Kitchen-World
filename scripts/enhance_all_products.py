"""
High-Clarity Super-Resolution Appliance Image Enhancer.

Replaces low-res, muddy crops with 4x AI-upscaled, edge-preserved,
and artifact-cleaned WebP photos for all 209 GLEN appliances.
"""

import sys
from pathlib import Path
import cv2
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
ORIGINALS = ROOT / "data" / "product-images-original"
OUTPUT_DIR = ROOT / "public" / "assets" / "products"
MODEL_PATH = ROOT / "data" / "models" / "ESPCN_x4.pb"

if not MODEL_PATH.exists():
    raise FileNotFoundError(f"Super-resolution model not found at {MODEL_PATH}")

sr = cv2.dnn_superres.DnnSuperResImpl_create()
sr.readModel(str(MODEL_PATH))
sr.setModel("espcn", 4)


def enhance_single_product(src_path: Path, dst_path: Path):
    try:
        pil_img = Image.open(src_path).convert("RGB")
        rgb = np.array(pil_img)
        h, w = rgb.shape[:2]

        if h < 20 or w < 20:
            return False

        # Measure background color from the image borders
        edge_pixels = np.concatenate([rgb[0], rgb[-1], rgb[:, 0], rgb[:, -1]])
        edge_med = np.median(edge_pixels, axis=0)

        # If image border is light (catalogue cream panel or white background)
        has_light_bg = np.mean(edge_med) > 210
        if has_light_bg:
            # Floodfill only from the true image boundary corners
            bg_mask = np.zeros((h + 2, w + 2), np.uint8)
            fill_copy = rgb.copy()
            diff = (8, 8, 8)  # Tight tolerance so white inside appliance is NEVER hollowed out

            for cx, cy in [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)]:
                c = rgb[cy, cx]
                if np.mean(c) > 215:
                    m = np.zeros((h + 2, w + 2), np.uint8)
                    cv2.floodFill(
                        fill_copy, m, (cx, cy), (255, 255, 255), diff, diff,
                        cv2.FLOODFILL_MASK_ONLY | (255 << 8)
                    )
                    bg_mask = cv2.bitwise_or(bg_mask, m)

            prod_alpha = 255 - bg_mask[1:h + 1, 1:w + 1]

            # Tight bounding box crop around the appliance
            ys, xs = np.where(prod_alpha > 30)
            if len(ys) > 10 and len(xs) > 10:
                pad = 4
                y0, y1 = max(ys.min() - pad, 0), min(ys.max() + pad, h)
                x0, x1 = max(xs.min() - pad, 0), min(xs.max() + pad, w)
                rgb = rgb[y0:y1, x0:x1]
                prod_alpha = prod_alpha[y0:y1, x0:x1]
        else:
            prod_alpha = np.full((h, w), 255, dtype=np.uint8)

        # Bilateral filter: removes compression blockiness while strictly preserving sharp edges
        bgr = cv2.cvtColor(rgb, cv2.COLOR_RGB2BGR)
        denoised = cv2.bilateralFilter(bgr, d=5, sigmaColor=30, sigmaSpace=30)

        # Neural Super-Resolution: 4x upscale
        upscaled = sr.upsample(denoised)

        # High-pass micro-contrast enhancement for metallic rims, glass, and knobs
        blur = cv2.GaussianBlur(upscaled, (0, 0), 1.8)
        sharp = cv2.addWeighted(upscaled, 1.4, blur, -0.4, 0)

        # Smooth anti-aliased alpha
        up_h, up_w = sharp.shape[:2]
        if has_light_bg:
            alpha_up = cv2.resize(prod_alpha, (up_w, up_h), interpolation=cv2.INTER_LINEAR)
            alpha_up = cv2.GaussianBlur(alpha_up, (3, 3), 0.6)
            rgba = np.dstack([cv2.cvtColor(sharp, cv2.COLOR_BGR2RGB), alpha_up])
            dst_img = Image.fromarray(rgba, "RGBA")
        else:
            dst_img = Image.fromarray(cv2.cvtColor(sharp, cv2.COLOR_BGR2RGB), "RGB")

        dst_path.parent.mkdir(parents=True, exist_ok=True)
        dst_img.save(dst_path, "WEBP", quality=95, method=6)
        return True
    except Exception as e:
        print(f"Error enhancing {src_path.name}: {e}")
        return False


def main():
    category = sys.argv[1] if len(sys.argv) > 1 else None
    files = sorted(ORIGINALS.rglob("*.png"))
    if category:
        files = [f for f in files if f.parent.name == category]

    print(f"Enhancing {len(files)} product photos with AI Super-Resolution...")
    success = 0
    for i, src in enumerate(files, 1):
        rel = src.relative_to(ORIGINALS)
        dst = (OUTPUT_DIR / rel).with_suffix(".webp")
        if enhance_single_product(src, dst):
            success += 1
        if i % 25 == 0 or i == len(files):
            print(f"  Progress: {i}/{len(files)} ({success} completed)")

    print(f"\nSuccessfully enhanced {success}/{len(files)} products to high-clarity WebP!")


if __name__ == "__main__":
    main()

