"""
Full Clean Raw HD Appliance Extraction & AI Super-Resolution Pipeline.

Extracts the pure embedded studio photo streams (xrefs) directly from
GLEN-source-catalogue.pdf (bypassing page rasterization and vector brochure frames),
converts CMYK to crisp sRGB, applies 4x AI Super-Resolution (ESPCN), and saves
pristine WebP images for all 209 products.
"""

import io
import json
import os
import re
import unicodedata
from collections import defaultdict
from pathlib import Path

import cv2
import numpy as np
from PIL import Image
import pymupdf

ROOT = Path(__file__).resolve().parent.parent
PDF_PATH = ROOT / "data" / "GLEN-source-catalogue.pdf"
ORIGINALS_DIR = ROOT / "data" / "product-images-original"
OUTPUT_DIR = ROOT / "public" / "assets" / "products"
MODEL_PATH = ROOT / "data" / "models" / "ESPCN_x4.pb"

sr = cv2.dnn_superres.DnnSuperResImpl_create()
sr.readModel(str(MODEL_PATH))
sr.setModel("espcn", 4)

# Import model classification helpers from extract_products
from extract_products import (
    MODEL_INFO,
    PAGE_RANGES,
    CATEGORY_SLUGS,
    fallback_classify,
    is_model_line,
    normalize_model,
    slugify,
)


def extract_page_cards(doc, page_num_1indexed):
    page = doc[page_num_1indexed - 1]
    d = page.get_text("dict")

    lines = []
    for block in d["blocks"]:
        if block.get("type") != 0:
            continue
        for line in block["lines"]:
            text = "".join(s["text"] for s in line["spans"]).strip()
            if not text:
                continue
            s0 = line["spans"][0]
            lines.append({
                "text": text,
                "bbox": line["bbox"],
                "size": s0["size"],
                "font": s0["font"],
                "bold": bool(s0["flags"] & 16) or "Bold" in s0["font"],
            })

    headers = sorted((ln for ln in lines if ln["text"].upper().startswith("KEY FEATURES")),
                     key=lambda l: l["bbox"][1])
    model_lines = sorted((ln for ln in lines if is_model_line(ln["text"])
                          and 7.5 <= ln["size"] <= 9.5 and "XNarrow" in ln.get("font", "")),
                         key=lambda l: l["bbox"][1])

    n = min(len(headers), len(model_lines))
    cards = []
    for i in range(n):
        header = headers[i]
        model_ln = model_lines[i]
        cards.append({
            "model_raw": model_ln["text"],
            "bbox": model_ln["bbox"],
            "band": (header["bbox"][1] - 30, model_ln["bbox"][1] + 30),
        })

    # Embedded image instances with exact xrefs
    seen_xrefs = set()
    image_instances = []
    for img in page.get_images(full=True):
        xref = img[0]
        if xref in seen_xrefs:
            continue
        seen_xrefs.add(xref)
        for rect in page.get_image_rects(xref):
            if rect.get_area() < 5000:
                continue
            image_instances.append({"xref": xref, "rect": rect, "claimed": False})

    cards_sorted = sorted(cards, key=lambda c: c["bbox"][1])
    for card in cards_sorted:
        lo, hi = card["band"]
        candidates = [im for im in image_instances
                      if not im["claimed"] and lo <= im["rect"].y0 + im["rect"].height / 2 <= hi]
        if candidates:
            best = max(candidates, key=lambda im: im["rect"].get_area())
            best["claimed"] = True
            card["image_rect"] = best["rect"]
            card["image_xref"] = best["xref"]
        else:
            card["image_rect"] = None
            card["image_xref"] = None

    return cards_sorted


def process_product_image(im_pil: Image.Image, dst_webp: Path, dst_original_png: Path):
    # Save original raw PNG
    dst_original_png.parent.mkdir(parents=True, exist_ok=True)
    im_pil.save(dst_original_png, "PNG")

    rgb = np.array(im_pil)
    h, w = rgb.shape[:2]

    # Trim pure white outer margin so the appliance fills the frame cleanly
    is_white = np.all(rgb > 248, axis=2)
    ys, xs = np.where(~is_white)
    if len(ys) > 10 and len(xs) > 10:
        pad = max(4, int(min(h, w) * 0.02))
        y0, y1 = max(ys.min() - pad, 0), min(ys.max() + pad, h)
        x0, x1 = max(xs.min() - pad, 0), min(xs.max() + pad, w)
        rgb = rgb[y0:y1, x0:x1]

    # Bilateral denoising to smooth JPEG compression blocks while preserving sharp metal/glass boundaries
    bgr = cv2.cvtColor(rgb, cv2.COLOR_RGB2BGR)
    denoised = cv2.bilateralFilter(bgr, d=5, sigmaColor=25, sigmaSpace=25)

    # 4x Neural Super-Resolution
    upscaled = sr.upsample(denoised)

    # Micro-contrast sharpening
    blur = cv2.GaussianBlur(upscaled, (0, 0), 1.6)
    sharp = cv2.addWeighted(upscaled, 1.35, blur, -0.35, 0)

    # Save as high-quality WebP
    dst_webp.parent.mkdir(parents=True, exist_ok=True)
    sharp_rgb = cv2.cvtColor(sharp, cv2.COLOR_BGR2RGB)
    Image.fromarray(sharp_rgb, "RGB").save(dst_webp, "WEBP", quality=95, method=6)


def main():
    doc = pymupdf.open(str(PDF_PATH))
    found = {}

    for start, end in PAGE_RANGES:
        for p in range(start, end + 1):
            cards = extract_page_cards(doc, p)
            for card in cards:
                norm = normalize_model(card["model_raw"])
                info = MODEL_INFO.get(norm)
                if info is None:
                    fb_cat, fb_sub = fallback_classify(p)
                    if fb_cat is None:
                        continue
                    info = {"category": fb_cat, "subcategory": fb_sub, "page": p}

                if norm not in found or card.get("image_xref"):
                    found[norm] = {
                        "norm": norm,
                        "model_raw": card["model_raw"],
                        "image_xref": card.get("image_xref"),
                        "image_rect": card.get("image_rect"),
                        "page": p,
                        "category": info["category"],
                    }

    # Special case overrides:
    # CH 1010 IN BL is on page 12, xref 91
    if normalize_model("CH 1010 IN BL") in found:
        found[normalize_model("CH 1010 IN BL")]["image_xref"] = 91

    # Hero only: BO 655 TOUCH AF+TURBO 90 is on page 28, xref 445
    found[normalize_model("BO 655 TOUCH AF+TURBO 90")] = {
        "norm": normalize_model("BO 655 TOUCH AF+TURBO 90"),
        "model_raw": "BO 655 TOUCH AF+TURBO 90",
        "image_xref": 445,
        "image_rect": None,
        "page": 28,
        "category": "Ovens",
    }

    print(f"Total matching models to process: {len(found)}")
    processed = 0

    for i, (norm, rec) in enumerate(sorted(found.items(), key=lambda kv: (kv[1]["category"], kv[1]["page"])), 1):
        cat = rec["category"]
        slug_cat = CATEGORY_SLUGS[cat]
        pid = f"{slug_cat}-{slugify(rec['model_raw'])}"

        dst_webp = OUTPUT_DIR / slug_cat / f"{pid}.webp"
        dst_original = ORIGINALS_DIR / slug_cat / f"{pid}.png"

        im_pil = None
        if rec.get("image_xref"):
            try:
                raw = doc.extract_image(rec["image_xref"])
                im_pil = Image.open(io.BytesIO(raw["image"]))
                if im_pil.mode == "CMYK":
                    im_pil = im_pil.convert("RGB")
            except Exception as e:
                print(f"Failed to extract xref {rec['image_xref']}: {e}")

        if im_pil is None and rec.get("image_rect"):
            # Fallback to high-res pixmap render if no direct xref
            page = doc[rec["page"] - 1]
            pix = page.get_pixmap(clip=rec["image_rect"], matrix=pymupdf.Matrix(4.0, 4.0))
            im_pil = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)

        if im_pil is not None:
            process_product_image(im_pil, dst_webp, dst_original)
            processed += 1

        if i % 25 == 0 or i == len(found):
            print(f"  Progress: {i}/{len(found)} ({processed} photos enhanced)")

    print(f"\nAll {processed} GLEN product photos enhanced with AI Super-Resolution!")


if __name__ == "__main__":
    main()

