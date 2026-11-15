"""Convert the verified data/products.json (209 GLEN records) into the
website's existing product schema (id/title/category/brand/model/tag/
tagColor/image/price/specs[]/status/description) and regenerate
src/data/defaultProducts.json (+ imagePresets.json) from it.

Nothing here invents data: titles are the manufacturer's own model code
(this catalogue has no separate marketing name, only model codes and
subcategory headers), specs are parsed directly from the already-verified
specLine/dimensions/warranty fields, and descriptions are built only from
the product's own extracted feature bullets.
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PRODUCTS = json.loads((ROOT / "data" / "products.json").read_text(encoding="utf-8"))
DATA_DIR = ROOT / "src" / "data"

TAG_COLORS = {
    "Chimneys": "bg-primary text-on-primary",
    "Ovens": "bg-secondary text-on-secondary",
    "Microwaves": "bg-inverse-surface text-inverse-on-surface",
    "Gas Stoves": "bg-surface-container-high text-primary",
    "Hobs": "bg-tertiary-container text-on-tertiary-container",
    "Dishwashers": "bg-secondary-container text-on-secondary-container",
}


def parse_spec_line(spec_line):
    if not spec_line:
        return []
    out = []
    for part in spec_line.split("|"):
        if ":" not in part:
            continue
        label, value = part.split(":", 1)
        out.append({"label": label.strip(), "value": value.strip()})
    return out


def clean_dimensions(d):
    if not d:
        return None
    # "Product Dimensions (WxDxH) : 780x455x117 mm" -> "780x455x117 mm"
    m = re.search(r":\s*(.+)$", d)
    return m.group(1).strip() if m else d.strip()


def clean_warranty(w):
    if not w:
        return None
    m = re.search(r"warranty\s*:?\s*(.+)$", w, re.IGNORECASE)
    return (m.group(1).strip() if m else w.strip()).rstrip(".")


def build_specs(p):
    specs = parse_spec_line(p.get("specLine"))
    dims = clean_dimensions(p.get("dimensions"))
    if dims and len(specs) < 4:
        specs.append({"label": "Dimensions (WxDxH)", "value": dims})
    warranty = clean_warranty(p.get("warranty"))
    if warranty and len(specs) < 4:
        specs.append({"label": "Warranty", "value": warranty})
    if not specs and p.get("features"):
        # last resort: no structured spec line/dims/warranty at all (true for
        # the one hero-only product) -- use its own first feature verbatim,
        # not invented
        specs.append({"label": "Highlight", "value": p["features"][0]})
    return specs[:4]


def build_description(p):
    feats = p.get("features") or []
    if not feats:
        return None
    # use the product's own extracted feature bullets verbatim, not invented
    return ". ".join(f.rstrip(".") for f in feats[:3]) + "."


def convert(p):
    cat = p["category"]
    return {
        "id": p["id"],
        "title": p["model"],
        "category": cat,
        "subcategory": p["subcategory"],
        "brand": "GLEN APPLIANCES",
        "model": p["model"],
        "tag": p["subcategory"],
        "tagColor": TAG_COLORS.get(cat, "bg-primary text-on-primary"),
        "image": web_image(p["image"]),
        "price": p["price"],
        "specs": build_specs(p),
        "features": p.get("features") or [],
        "warranty": clean_warranty(p.get("warranty")),
        "dimensions": clean_dimensions(p.get("dimensions")),
        "status": p.get("status", "Published"),
        "description": build_description(p),
        "sourcePdf": p["sourcePdf"],
        "sourcePage": p["sourcePage"],
    }


def web_image(path):
    """extract_products.py emits .png crops; scripts/enhance_images.py turns them into .webp."""
    return path[:-4] + ".webp" if path and path.endswith(".png") else path


def build_presets(converted):
    # a couple of real representative photos per category, for the admin
    # "pick an existing photo" convenience picker when manually adding a
    # brand-new product later -- real extracted assets, not stock photos
    cat_order = ["Chimneys", "Ovens", "Microwaves", "Gas Stoves", "Hobs", "Dishwashers"]
    presets = []
    for cat in cat_order:
        items = [p for p in converted if p["category"] == cat]
        for p in items[:2]:
            presets.append({"label": f"{p['subcategory']} — {p['model']}",
                             "category": cat, "url": p["image"]})
    return presets


def main():
    converted = [convert(p) for p in PRODUCTS]
    # keep a stable, readable order: category, then subcategory, then model
    cat_order = ["Chimneys", "Ovens", "Microwaves", "Gas Stoves", "Hobs", "Dishwashers"]
    converted.sort(key=lambda p: (cat_order.index(p["category"]), p["subcategory"], p["model"]))

    products_json = json.dumps(converted, indent=2, ensure_ascii=False)
    (ROOT / "data" / "storefront-products.json").write_text(products_json, encoding="utf-8")

    presets = build_presets(converted)
    presets_json = json.dumps(presets, indent=2, ensure_ascii=False)

    # consumed by the React app (src/store/productsStore.js)
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    (DATA_DIR / "defaultProducts.json").write_text(products_json, encoding="utf-8")
    (DATA_DIR / "imagePresets.json").write_text(presets_json, encoding="utf-8")

    print(f"Wrote {len(converted)} products + {len(presets)} image presets "
          f"into src/data/ and data/storefront-products.json")


if __name__ == "__main__":
    main()
