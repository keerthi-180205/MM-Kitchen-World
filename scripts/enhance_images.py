"""Clean up the product photos cropped from the GLEN PDF.

The source PDF embeds each photo at only ~225px wide (100 dpi) on a cream
catalogue panel with a rounded corner, so the raw crops are soft, blocky and
carry a beige box that looks wrong on a white web page. For every image this:

  1. makes the cream/white catalogue background transparent (flood-filled from
     the edges only, so light parts *inside* the product are never touched),
  2. denoises the JPEG blockiness,
  3. upscales 2x (Lanczos) and applies a gentle unsharp mask,
  4. trims the empty margin so products fill their card consistently,
  5. saves lossy WebP (alpha kept). Sharpened 2x PNGs are ~20x heavier, which
     would make the catalogue page slow.

It cannot invent detail that isn't in the PDF; for truly sharp photos, supply
higher-resolution originals from GLEN. Originals are kept untouched in
data/product-images-original/ and enhancement always starts from them, so the
script is safe to re-run. The live .png files in public/assets/products are
replaced by same-named .webp files.

    pip install opencv-python-headless scipy pillow numpy
    python3 scripts/enhance_images.py            # all images
    python3 scripts/enhance_images.py chimneys   # one category folder
"""
import shutil
import sys
from pathlib import Path

import cv2
import numpy as np
from PIL import Image
from scipy import ndimage

ROOT = Path(__file__).resolve().parent.parent
LIVE = ROOT / "public" / "assets" / "products"
ORIGINALS = ROOT / "data" / "product-images-original"

SCALE = 2
PHOTO_MAX_SIDE = 1600  # lifestyle photos / full-frame shots are only sharpened, never cut out
CUTOUT_EDGE_FRACTION = 0.9  # a catalogue cutout has (nearly) its whole border on the panel colour
BG_TOLERANCE = 14      # max per-channel distance from the panel colour counted as background
WEBP_QUALITY = 90
PAD = 10               # px of transparent padding kept around the product (output scale)


def panel_colour(rgb):
    """The catalogue panel colour: the most common non-white edge colour."""
    edge = np.concatenate([rgb[0], rgb[-1], rgb[:, 0], rgb[:, -1]])
    edge = edge[~np.all(edge > 252, axis=1)]
    if len(edge) == 0:
        return np.array([255, 255, 255])
    vals, counts = np.unique(edge // 4 * 4, axis=0, return_counts=True)
    return vals[counts.argmax()] + 2


def background_mask(rgb):
    near_panel = np.all(np.abs(rgb.astype(int) - panel_colour(rgb)) <= BG_TOLERANCE, axis=2)
    near_white = np.all(rgb > 250, axis=2)
    candidate = near_panel | near_white
    labels, _ = ndimage.label(candidate)
    border = np.unique(np.concatenate([labels[0], labels[-1], labels[:, 0], labels[:, -1]]))
    border = border[border != 0]
    return np.isin(labels, border)


def sharpen(img):
    soft = cv2.GaussianBlur(img, (0, 0), 1.6)
    return cv2.addWeighted(img, 1.7, soft, -0.7, 0)


def enhance_photo(rgb, dst: Path):
    """Full-frame / lifestyle shot: keep the background, just clean and sharpen."""
    den = cv2.fastNlMeansDenoisingColored(rgb, None, 4, 4, 5, 15)
    long_side = max(rgb.shape[:2])
    scale = SCALE if long_side < 800 else min(1.0, PHOTO_MAX_SIDE / long_side)
    if scale != 1:
        den = cv2.resize(den, None, fx=scale, fy=scale, interpolation=cv2.INTER_LANCZOS4)
    dst.parent.mkdir(parents=True, exist_ok=True)
    Image.fromarray(sharpen(den)).save(dst, "WEBP", quality=WEBP_QUALITY, method=6)


def enhance(src: Path, dst: Path):
    rgb = np.array(Image.open(src).convert("RGB"))
    bg = background_mask(rgb)
    border_bg = np.concatenate([bg[0], bg[-1], bg[:, 0], bg[:, -1]]).mean()
    if border_bg < CUTOUT_EDGE_FRACTION or max(rgb.shape[:2]) > 1000:
        return enhance_photo(rgb, dst)

    # Fill background with the nearest product colour before filtering so the
    # cream never bleeds into the product edge during denoise / sharpen.
    idx = ndimage.distance_transform_edt(bg, return_distances=False, return_indices=True)
    filled = rgb[tuple(idx)]

    den = cv2.fastNlMeansDenoisingColored(filled, None, 5, 5, 5, 15)
    up = cv2.resize(den, None, fx=SCALE, fy=SCALE, interpolation=cv2.INTER_LANCZOS4)
    sharp = sharpen(up)

    # Anti-aliased alpha from the (upscaled) mask; erode 1px to kill the cream halo.
    alpha = (~bg).astype(np.uint8) * 255
    alpha = cv2.resize(alpha, None, fx=SCALE, fy=SCALE, interpolation=cv2.INTER_LINEAR)
    alpha = cv2.erode(alpha, np.ones((3, 3), np.uint8))
    alpha = cv2.GaussianBlur(alpha, (0, 0), 1.0)
    alpha = np.where(alpha < 40, 0, alpha).astype(np.uint8)

    rgba = np.dstack([sharp, alpha])
    ys, xs = np.where(alpha > 20)
    if len(ys):
        y0, y1 = max(ys.min() - PAD, 0), min(ys.max() + PAD, rgba.shape[0])
        x0, x1 = max(xs.min() - PAD, 0), min(xs.max() + PAD, rgba.shape[1])
        rgba = rgba[y0:y1, x0:x1]

    dst.parent.mkdir(parents=True, exist_ok=True)
    Image.fromarray(rgba, "RGBA").save(dst, "WEBP", quality=WEBP_QUALITY, alpha_quality=100, method=6)


def main():
    only = sys.argv[1] if len(sys.argv) > 1 else None
    if not ORIGINALS.exists():
        shutil.copytree(LIVE, ORIGINALS)
        print(f"Backed up originals -> {ORIGINALS.relative_to(ROOT)}")

    files = sorted(p for p in ORIGINALS.rglob("*.png") if not only or p.parent.name == only)
    for i, src in enumerate(files, 1):
        out = (LIVE / src.relative_to(ORIGINALS)).with_suffix(".webp")
        enhance(src, out)
        out.with_suffix(".png").unlink(missing_ok=True)
        if i % 25 == 0 or i == len(files):
            print(f"  {i}/{len(files)}")


if __name__ == "__main__":
    main()
