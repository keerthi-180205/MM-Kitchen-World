"""
Synchronize official GLEN Master Studio Photography (2048x2048)
directly from Glen India's official CDN for all catalog appliances.
"""

import io
import json
import re
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
LOCAL_PRODUCTS_PATH = ROOT / "src" / "data" / "defaultProducts.json"
SHOPIFY_PRODUCTS_PATH = ROOT / "data" / "glen_shopify_products.json"
PUBLIC_PRODUCTS_DIR = ROOT / "public" / "assets" / "products"

CATEGORY_SLUGS = {
    "Chimneys": "chimneys",
    "Ovens": "ovens",
    "Microwaves": "microwaves",
    "Gas Stoves": "gas-stoves",
    "Hobs": "hobs",
    "Dishwashers": "dishwashers",
}


def process_image(url: str, dst_path: Path):
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        raw_bytes = urllib.request.urlopen(req, timeout=20).read()
        im = Image.open(io.BytesIO(raw_bytes)).convert("RGB")

        # Trim excess whitespace margin
        rgb = np.array(im)
        is_white = np.all(rgb > 248, axis=2)
        ys, xs = np.where(~is_white)
        if len(ys) > 10 and len(xs) > 10:
            h, w = rgb.shape[:2]
            pad = max(8, int(min(h, w) * 0.03))
            y0, y1 = max(ys.min() - pad, 0), min(ys.max() + pad, h)
            x0, x1 = max(xs.min() - pad, 0), min(xs.max() + pad, w)
            im = im.crop((x0, y0, x1, y1))

        # Resize to max 1200 on longest side
        im.thumbnail((1200, 1200), Image.Resampling.LANCZOS)
        dst_path.parent.mkdir(parents=True, exist_ok=True)
        im.save(dst_path, "WEBP", quality=92, method=6)
        return True, dst_path.name, im.size
    except Exception as e:
        return False, dst_path.name, str(e)


def main():
    with open(LOCAL_PRODUCTS_PATH) as f:
        local_prods = json.load(f)

    with open(SHOPIFY_PRODUCTS_PATH) as f:
        shopify_prods = json.load(f)

    # Separate standalone products from combo/bundle packages so we never pick a bundle collage
    standalone_prods = [sp for sp in shopify_prods if "+" not in sp["title"] and "combo" not in sp["title"].lower()]
    combo_prods = [sp for sp in shopify_prods if "+" in sp["title"] or "combo" in sp["title"].lower()]

    tasks = []

    for lp in local_prods:
        model = (lp.get("model") or "").strip().upper()
        model_compact = model.replace(" ", "")
        cat = lp.get("category", "").upper()
        slug_cat = CATEGORY_SLUGS.get(lp["category"], "chimneys")
        pid = lp["id"]
        dst = PUBLIC_PRODUCTS_DIR / slug_cat / f"{pid}.webp"

        nums = re.findall(r"\d{3,5}", model)
        num = nums[0] if nums else None

        best_img = None

        # Prioritize standalone single products over combos
        for pool in [standalone_prods, combo_prods]:
            if best_img:
                break

            # Pass 1: exact model (with spaces, hyphens, or compact) in title or handle
            for sp in pool:
                stitle = sp["title"].upper()
                handle = sp.get("handle", "").upper()
                if (
                    model in stitle
                    or model in handle
                    or model.replace(" ", "-") in handle
                    or model_compact in stitle
                    or model_compact in handle
                ):
                    if sp.get("images"):
                        best_img = sp["images"][0]["src"]
                        break

            # Pass 2: model number + category matching
            if not best_img and num:
                for sp in pool:
                    stitle = sp["title"].upper()
                    handle = sp.get("handle", "").upper()
                    if num in stitle or num in handle:
                        is_cat = False
                        if "CHIMNEY" in cat and ("CHIMNEY" in stitle or "HOOD" in stitle):
                            is_cat = True
                        elif "STOVE" in cat and ("STOVE" in stitle or "COOKTOP" in stitle or "RANGE" in stitle):
                            is_cat = True
                        elif "HOB" in cat and ("HOB" in stitle or "COOKTOP" in stitle):
                            is_cat = True
                        elif "OVEN" in cat and ("OVEN" in stitle):
                            is_cat = True
                        elif "MICROWAVE" in cat and ("MICROWAVE" in stitle or "OTG" in stitle):
                            is_cat = True
                        elif "DISHWASHER" in cat and ("DISHWASHER" in stitle):
                            is_cat = True

                        if is_cat and sp.get("images"):
                            best_img = sp["images"][0]["src"]
                            break

        if best_img:
            tasks.append((best_img, dst))

    print(f"Starting parallel download and processing of {len(tasks)} official master photos...")

    completed = 0
    with ThreadPoolExecutor(max_workers=12) as executor:
        futures = {executor.submit(process_image, url, dst): dst for url, dst in tasks}
        for fut in as_completed(futures):
            ok, name, res = fut.result()
            if ok:
                completed += 1
            if completed % 25 == 0 or completed == len(tasks):
                print(f"  Progress: {completed}/{len(tasks)} master images converted to HD WebP")

    print(f"\nFinished! Successfully synchronized {completed}/{len(tasks)} official master studio images!")


if __name__ == "__main__":
    main()
