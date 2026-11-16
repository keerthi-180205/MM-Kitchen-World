#!/usr/bin/env python3
"""
Pipeline to integrate the new GLEN catalogues:
  1. Glen Water Heater Folder.pdf -> Geysers (Instant) & Water Heaters (Storage)
  2. KITCHEN SINK FOLDER compress.pdf -> Sinks (Handmade, Pressed, Faucets)
  3. Glen-Small-Appliances-Folder-SEP-2026.pdf -> Small Appliances (Juicers, Blenders, Kettles, etc.)
  4. Separate Cooking Range as its own top-level category

Also downloads official high-res white background images from Glen's CDN (found in glen_shopify_products.json)
or generates clean high-res cropped images from the PDF.
Syncs data/products.json, src/data/defaultProducts.json, data/storefront-products.json,
and SQLite database data/kitchen_world.db.
"""
import io
import json
import os
import re
import sqlite3
import urllib.request
from pathlib import Path
from PIL import Image
import pymupdf

ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT / "data"
PUBLIC_DIR = ROOT / "public" / "assets" / "products"
ORIG_DIR = ROOT / "data" / "product-images-original"
SHOPIFY_JSON = DATA_DIR / "glen_shopify_products.json"
PRODUCTS_JSON = DATA_DIR / "products.json"
DEFAULT_PRODUCTS_JSON = ROOT / "src" / "data" / "defaultProducts.json"
STOREFRONT_JSON = DATA_DIR / "storefront-products.json"
DB_PATH = DATA_DIR / "kitchen_world.db"

TAG_COLORS = {
    "Chimneys": "bg-primary text-on-primary",
    "Gas Stoves": "bg-surface-container-high text-primary",
    "Hobs": "bg-tertiary-container text-on-tertiary-container",
    "Geysers": "bg-amber-600 text-white",
    "Sinks": "bg-slate-700 text-white",
    "Ovens": "bg-secondary text-on-secondary",
    "Microwaves": "bg-inverse-surface text-inverse-on-surface",
    "Water Heaters": "bg-sky-600 text-white",
    "Dishwashers": "bg-secondary-container text-on-secondary-container",
    "Cooking Range": "bg-rose-700 text-white",
    "Small Appliances": "bg-emerald-700 text-white",
}

def load_shopify_index():
    with open(SHOPIFY_JSON, encoding="utf-8") as f:
        shopify = json.load(f)
    
    index = []
    for p in shopify:
        title = p.get("title", "")
        tags = p.get("tags", [])
        imgs = [im["src"] for im in p.get("images", []) if im.get("src")]
        body = p.get("body_html", "")
        price_str = None
        variants = p.get("variants", [])
        if variants:
            p_val = variants[0].get("price")
            if p_val:
                try:
                    price_str = f"₹{int(float(p_val)):,}"
                except Exception:
                    price_str = f"₹{p_val}"

        search_tokens = set(re.findall(r"[A-Za-z0-9]+", f"{title} {' '.join(tags)}".lower()))
        index.append({
            "title": title,
            "tags": tags,
            "images": imgs,
            "price": price_str,
            "tokens": search_tokens,
            "raw_text": f"{title} {' '.join(tags)}".lower()
        })
    return index

def find_best_image_url(model_code, keywords, shopify_index):
    code_clean = re.sub(r"[^A-Za-z0-9]", "", model_code.lower())
    # 1. Exact token match for model code
    for entry in shopify_index:
        entry_clean = re.sub(r"[^A-Za-z0-9]", "", entry["raw_text"])
        if code_clean and code_clean in entry_clean and entry["images"]:
            return entry["images"][0], entry.get("price")
            
    # 2. Match key numbers
    num_match = re.search(r"\d{3,5}", model_code)
    if num_match:
        num = num_match.group(0)
        candidates = [e for e in shopify_index if num in e["tokens"] and e["images"]]
        for cand in candidates:
            # check if keywords match
            if any(k.lower() in cand["raw_text"] for k in keywords):
                return cand["images"][0], cand.get("price")
        if candidates:
            return candidates[0]["images"][0], candidates[0].get("price")
            
    # 3. Match keywords
    for entry in shopify_index:
        if all(k.lower() in entry["raw_text"] for k in keywords) and entry["images"]:
            return entry["images"][0], entry.get("price")
            
    return None, None

def save_image_from_url_or_crop(cat_slug, pid, img_url, pdf_crop_info=None):
    pub_dir = PUBLIC_DIR / cat_slug
    orig_dir = ORIG_DIR / cat_slug
    pub_dir.mkdir(parents=True, exist_ok=True)
    orig_dir.mkdir(parents=True, exist_ok=True)
    
    png_path = pub_dir / f"{pid}.png"
    webp_path = pub_dir / f"{pid}.webp"
    orig_png = orig_dir / f"{pid}.png"
    
    if webp_path.exists() and webp_path.stat().st_size > 1000:
        return f"assets/products/{cat_slug}/{pid}.webp"
        
    im = None
    if img_url:
        try:
            req = urllib.request.Request(img_url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=8) as resp:
                data = resp.read()
                im = Image.open(io.BytesIO(data)).convert("RGB")
        except Exception as e:
            im = None
            
    if im is None and pdf_crop_info:
        pdf_path, pno, rect = pdf_crop_info
        doc = pymupdf.open(str(pdf_path))
        page = doc[pno]
        pix = page.get_pixmap(clip=rect, dpi=200)
        im = Image.open(io.BytesIO(pix.tobytes("png"))).convert("RGB")
        doc.close()
        
    if im is not None:
        im.save(str(orig_png), "PNG")
        im.save(str(png_path), "PNG")
        im.save(str(webp_path), "WEBP", quality=92)
        return f"assets/products/{cat_slug}/{pid}.webp"
        
    return f"assets/products/{cat_slug}/{pid}.webp"

def main():
    print("=== LOADING SHOPIFY DATA & NEW CATALOGUES ===")
    shopify_index = load_shopify_index()
    print(f"Shopify index loaded with {len(shopify_index)} products")
    
    existing_products = json.loads(PRODUCTS_JSON.read_text(encoding="utf-8"))
    print(f"Existing products: {len(existing_products)}")
    
    # 1. Update Cooking Range in existing products
    for p in existing_products:
        if p["subcategory"] == "Cooking Range":
            p["category"] = "Cooking Range"
            p["tag"] = "Cooking Range"
            p["tagColor"] = TAG_COLORS["Cooking Range"]
            # move image if needed
            slug_old = "gas-stoves"
            slug_new = "cooking-range"
            pid_new = p["id"].replace("gas-stoves-", "cooking-range-")
            p["id"] = pid_new
            p["image"] = f"assets/products/{slug_new}/{pid_new}.webp"
            
            src_png = PUBLIC_DIR / slug_old / f"{p['id'].replace('cooking-range-', 'gas-stoves-')}.png"
            src_webp = PUBLIC_DIR / slug_old / f"{p['id'].replace('cooking-range-', 'gas-stoves-')}.webp"
            dst_png = PUBLIC_DIR / slug_new / f"{pid_new}.png"
            dst_webp = PUBLIC_DIR / slug_new / f"{pid_new}.webp"
            if src_png.exists(): dst_png.write_bytes(src_png.read_bytes())
            if src_webp.exists(): dst_webp.write_bytes(src_webp.read_bytes())
            
    new_records = []
    
    # =========================================================================
    # GEYSERS & WATER HEATERS
    # =========================================================================
    wh_defs = [
        # GEYSERS (Instant)
        {
            "model": "WH 7050",
            "title": "GLEN WH 7050 Instant Water Heater Geyser 3L (3000W)",
            "category": "Geysers",
            "subcategory": "Instant Geysers",
            "specs": [
                {"label": "Capacity", "value": "3 Litres"},
                {"label": "Power Rating", "value": "3000 W"},
                {"label": "Pressure", "value": "6.5 Bar"},
                {"label": "Tank", "value": "SS 304 Stainless Steel"},
                {"label": "Dimensions", "value": "360 x 185 x 175 mm"},
                {"label": "Warranty", "value": "5 Yrs Tank, 2 Yrs Element, 2 Yrs Product"}
            ],
            "price": "₹4,995",
            "warranty": "5 Years on Tank, 2 Years on Element, 2 Years Comprehensive",
            "dimensions": "360 x 185 x 175 mm",
            "features": [
                "3 Litres Instant Water Heater Geyser for fast, on-demand hot water",
                "Heavy-gauge SS 304 Stainless Steel inner tank for extreme durability",
                "High quality Copper Heating Element for rapid heat transfer",
                "6.5 Bar pressure rated for high-rise buildings and pressure pumps",
                "Stem Thermostat & Pressure Release Valve for multi-tier safety",
                "Rust and shock-proof high-grade ABS plastic body",
                "ISI Certified for complete electrical and thermal safety"
            ],
            "kw": ["7052", "instant", "3 litre"],
            "sourcePage": 4
        },
        {
            "model": "WH 7052 IN",
            "title": "GLEN WH 7052 IN Instant Water Heater Geyser 5.5L (3000W)",
            "category": "Geysers",
            "subcategory": "Instant Geysers",
            "specs": [
                {"label": "Capacity", "value": "5.5 Litres"},
                {"label": "Power Rating", "value": "3000 W"},
                {"label": "Pressure", "value": "6.5 Bar"},
                {"label": "Tank", "value": "SS 304 Stainless Steel"},
                {"label": "Dimensions", "value": "450 x 240 x 230 mm"},
                {"label": "Warranty", "value": "5 Yrs Tank, 2 Yrs Element, 2 Yrs Product"}
            ],
            "price": "₹7,995",
            "warranty": "5 Years on Tank, 2 Years on Element, 2 Years Comprehensive",
            "dimensions": "450 x 240 x 230 mm",
            "features": [
                "5.5 Litres Large Capacity Instant Water Heater Geyser",
                "Heavy-gauge SS 304 Stainless Steel inner tank",
                "High quality Copper Heating Element for instant continuous hot water",
                "6.5 Bar working pressure endurance for high-rise apartments",
                "Dual Thermostat & Safety Pressure Relief Valve",
                "Space-saving vertical profile, ideal for modern kitchens and utility areas",
                "Rust-proof and shock-proof insulated outer body"
            ],
            "kw": ["7050", "instant", "5.5 litre"],
            "sourcePage": 4
        },
        # WATER HEATERS (Storage)
        {
            "model": "WH 7055 SMART",
            "title": "GLEN WH 7055 Smart Wi-Fi Storage Water Heater 15L/25L",
            "category": "Water Heaters",
            "subcategory": "Smart Wi-Fi Water Heaters",
            "specs": [
                {"label": "Capacity", "value": "15 / 25 Litres"},
                {"label": "Power Rating", "value": "2000 W"},
                {"label": "Pressure", "value": "8 Bar"},
                {"label": "Technology", "value": "Wi-Fi + Mobile App + Remote"},
                {"label": "Dimensions", "value": "385 x 385 x 313 mm (15L)"},
                {"label": "Warranty", "value": "7 Yrs Tank, 3 Yrs Element, 2 Yrs Product"}
            ],
            "price": "₹17,995",
            "warranty": "7 Years on Tank, 3 Years on Element, 2 Years Comprehensive",
            "dimensions": "385 x 385 x 313 mm (15L) / 448 x 448 x 380 mm (25L)",
            "features": [
                "Wi-Fi Enabled Smart Water Heater with Glen Smart Mobile App control",
                "Digital LED Display with real-time temperature readout",
                "Wireless Remote Control & Multi-user setup",
                "Schedule Timer for automated daily heating cycles",
                "Heavy-duty Glasslined Tank with Magnesium Anode protection",
                "Superior Incoloy Heating Element resistant to hard water scaling",
                "8 Bar pressure rating suitable for multi-storey high-rises",
                "BEE 5-Star power saving performance"
            ],
            "kw": ["7055", "smart", "wifi"],
            "sourcePage": 2
        },
        {
            "model": "WH 7055 DIGI",
            "title": "GLEN WH 7055 DIGI Digital Storage Water Heater 15L/25L",
            "category": "Water Heaters",
            "subcategory": "Digital Storage Water Heaters",
            "specs": [
                {"label": "Capacity", "value": "15 / 25 Litres"},
                {"label": "Power Rating", "value": "2000 W"},
                {"label": "Pressure", "value": "8 Bar"},
                {"label": "Controls", "value": "Digital Display & Remote"},
                {"label": "Dimensions", "value": "385 x 385 x 313 mm"},
                {"label": "Warranty", "value": "7 Yrs Tank, 3 Yrs Element, 2 Yrs Product"}
            ],
            "price": "₹16,495",
            "warranty": "7 Years on Tank, 3 Years on Element, 2 Years Comprehensive",
            "dimensions": "385 x 385 x 313 mm (15L) / 448 x 448 x 380 mm (25L)",
            "features": [
                "Digital LED Display with feather-touch temperature controls",
                "Full-function Remote Control included for convenient operation",
                "Rust-proof & shock-proof durable ABS outer casing",
                "Heavy-duty Glasslined Inner Tank with Magnesium Anode rod",
                "Superior Incoloy Heating Element for long-lasting performance",
                "8 Bar high pressure endurance for tall towers",
                "Safety Valve & Overheat Cut-off protection"
            ],
            "kw": ["7055", "digital", "remote"],
            "sourcePage": 3
        },
        {
            "model": "WH 7053 IN",
            "title": "GLEN WH 7053 IN Square Storage Water Heater 6L",
            "category": "Water Heaters",
            "subcategory": "Square Storage Water Heaters",
            "specs": [
                {"label": "Capacity", "value": "6 Litres"},
                {"label": "Power Rating", "value": "2000 W"},
                {"label": "Pressure", "value": "8 Bar"},
                {"label": "Dimensions", "value": "320 x 300 x 345 mm"},
                {"label": "Warranty", "value": "7 Yrs Tank, 3 Yrs Element, 2 Yrs Product"}
            ],
            "price": "₹11,695",
            "warranty": "7 Years on Tank, 3 Years on Element, 2 Years Comprehensive",
            "dimensions": "320 x 300 x 345 mm",
            "features": [
                "Compact Square design, engineered for kitchens and compact washrooms",
                "6 Litres capacity with 2000W rapid heating",
                "Heavy-duty Glasslined Inner Tank with Magnesium Anode",
                "Incoloy 840 Heating Element for long life in hard water",
                "8 Bar pressure rating suitable for high-rise buildings",
                "Ergonomic Rotary Temperature Control Knob",
                "Multi-function Safety Valve"
            ],
            "kw": ["7053", "square", "6 litre"],
            "sourcePage": 3
        },
        {
            "model": "WH 7054 IN",
            "title": "GLEN WH 7054 IN Square Storage Water Heater 10L/15L/25L",
            "category": "Water Heaters",
            "subcategory": "Square Storage Water Heaters",
            "specs": [
                {"label": "Capacity", "value": "10 / 15 / 25 Litres"},
                {"label": "Power Rating", "value": "2000 W"},
                {"label": "Pressure", "value": "8 Bar"},
                {"label": "Dimensions", "value": "385 x 385 x 313 mm (15L)"},
                {"label": "Warranty", "value": "7 Yrs Tank, 3 Yrs Element, 2 Yrs Product"}
            ],
            "price": "₹12,495",
            "warranty": "7 Years on Tank, 3 Years on Element, 2 Years Comprehensive",
            "dimensions": "328 x 328 x 303 mm (10L) / 385 x 385 x 313 mm (15L)",
            "features": [
                "Premium Square Form Factor with Choice of Elegant Colors",
                "Heavy-duty Glasslined Tank with 8 Bar pressure endurance",
                "Magnesium Anode rod prevents electrochemical corrosion",
                "Incoloy Heating Element delivers faster, even heating",
                "Precision Temperature Control Knob",
                "High-density PUF insulation for maximum heat retention",
                "Rust and shock-proof ABS body"
            ],
            "kw": ["7054", "square", "10l"],
            "sourcePage": 3
        },
        {
            "model": "WH 7056 VERTICAL",
            "title": "GLEN WH 7056 Vertical Storage Water Heater 6L to 50L",
            "category": "Water Heaters",
            "subcategory": "Vertical Storage Water Heaters",
            "specs": [
                {"label": "Capacity", "value": "6 / 10 / 15 / 25 / 35 / 50 L"},
                {"label": "Power Rating", "value": "2000 W"},
                {"label": "Pressure", "value": "8 Bar"},
                {"label": "Dimensions", "value": "585 x 395 x 380 mm (15L)"},
                {"label": "Warranty", "value": "7 Yrs Tank, 3 Yrs Element, 2 Yrs Product"}
            ],
            "price": "₹9,695",
            "warranty": "7 Years on Tank, 3 Years on Element, 2 Years Comprehensive",
            "dimensions": "495 x 290 x 280 mm (6L) / 585 x 395 x 380 mm (15L)",
            "features": [
                "Classic Slim Vertical profile suited for all bathroom ceiling heights",
                "Robust PCM Sheet Outer Body with rust-proof coating",
                "Glasslined Inner Tank with 8 Bar pressure endurance",
                "Magnesium Anode Rod protects against hard water corrosion",
                "Incoloy 840 Heating Element for high thermal efficiency",
                "Capillary Thermostat & Thermal Cut-out for double safety",
                "BEE 5-Star rated power saving performance"
            ],
            "kw": ["7056", "vertical"],
            "sourcePage": 3
        },
        {
            "model": "WH 7056 HORIZONTAL",
            "title": "GLEN WH 7056 Horizontal Storage Water Heater 35L/50L",
            "category": "Water Heaters",
            "subcategory": "Horizontal Storage Water Heaters",
            "specs": [
                {"label": "Capacity", "value": "35 / 50 Litres"},
                {"label": "Power Rating", "value": "2000 W"},
                {"label": "Pressure", "value": "8 Bar"},
                {"label": "Dimensions", "value": "695 x 395 x 380 mm (35L)"},
                {"label": "Warranty", "value": "7 Yrs Tank, 3 Yrs Element, 2 Yrs Product"}
            ],
            "price": "₹14,295",
            "warranty": "7 Years on Tank, 3 Years on Element, 2 Years Comprehensive",
            "dimensions": "695 x 395 x 380 mm (35L) / 780 x 415 x 400 mm (50L)",
            "features": [
                "Horizontal Mount Space-Saving Water Heater for false ceilings and low height walls",
                "Large 35L & 50L capacity suitable for bathtubs and large families",
                "Heavy-duty Glasslined Tank with 8 Bar pressure rating",
                "Incoloy Heating Element for fast recovery rate",
                "Magnesium Anode Rod against hard water corrosion",
                "High-density PUF insulation for longer heat retention",
                "Available in Right Hand Side (RHS) and Left Hand Side (LHS) pipe configurations"
            ],
            "kw": ["7056", "horizontal", "35"],
            "sourcePage": 3
        },
        {
            "model": "WH 7058",
            "title": "GLEN WH 7058 Vertical Storage Water Heater 10L/15L/25L",
            "category": "Water Heaters",
            "subcategory": "Vertical Storage Water Heaters",
            "specs": [
                {"label": "Capacity", "value": "10 / 15 / 25 Litres"},
                {"label": "Power Rating", "value": "2000 W"},
                {"label": "Pressure", "value": "8 Bar"},
                {"label": "Dimensions", "value": "510 x 320 x 340 mm (15L)"},
                {"label": "Warranty", "value": "7 Yrs Tank, 3 Yrs Element, 2 Yrs Product"}
            ],
            "price": "₹10,495",
            "warranty": "7 Years on Tank, 3 Years on Element, 2 Years Comprehensive",
            "dimensions": "380 x 320 x 340 mm (10L) / 510 x 320 x 340 mm (15L)",
            "features": [
                "Vertical Cylindrical design with high efficiency heating",
                "Glasslined Inner Tank with 8 Bar pressure endurance",
                "Incoloy Heating Element for superior thermal transfer",
                "Rotary Temperature Setting Knob",
                "Magnesium Anode for cathodic corrosion protection",
                "BEE 5-Star Energy Efficiency",
                "Dual Thermostat & Safety Pressure Relief Valve"
            ],
            "kw": ["7058", "vertical", "15 litre"],
            "sourcePage": 4
        }
    ]
    
    for w in wh_defs:
        cat_slug = w["category"].lower().replace(" ", "-")
        pid = f"{cat_slug}-{re.sub(r'[^a-z0-9]+', '-', w['model'].lower()).strip('-')}"
        img_url, shop_price = find_best_image_url(w["model"], w["kw"], shopify_index)
        saved_img = save_image_from_url_or_crop(cat_slug, pid, img_url)
        
        rec = {
            "id": pid,
            "title": w["title"],
            "category": w["category"],
            "subcategory": w["subcategory"],
            "brand": "GLEN APPLIANCES",
            "model": w["model"],
            "tag": w["subcategory"],
            "tagColor": TAG_COLORS[w["category"]],
            "image": saved_img,
            "price": w["price"],
            "specs": w["specs"],
            "features": w["features"],
            "warranty": w["warranty"],
            "dimensions": w["dimensions"],
            "status": "Published",
            "description": f"{w['title']}. {' '.join(w['features'][:3])} Exterior dimensions: {w['dimensions']}. Backed by genuine GLEN manufacturer warranty: {w['warranty']}.",
            "sourcePdf": "Glen Water Heater Folder.pdf",
            "sourcePage": w["sourcePage"],
            "created_at": "2026-11-16 09:50:00",
            "updated_at": "2026-11-16 09:50:00"
        }
        new_records.append(rec)
    print(f"Processed {len(wh_defs)} Geyser & Water Heater models.")

    # =========================================================================
    # KITCHEN SINKS & FAUCETS
    # =========================================================================
    sink_defs = [
        # Handmade Single Bowl Sinks
        {
            "model": "KS-SH18169SBM",
            "title": "GLEN KS-SH18169SBM Handmade SS 304 Single Bowl Kitchen Sink (18x16 in)",
            "category": "Sinks",
            "subcategory": "Handmade Sinks",
            "overall": "457 x 406 x 228 mm (18 x 16 x 9 in)",
            "bowl": "404 x 354 x 225 mm",
            "mrp": "₹10,995",
            "type": "Single Bowl",
            "kw": ["sh18169", "handmade", "single bowl"]
        },
        {
            "model": "KS-SH21189SBM",
            "title": "GLEN KS-SH21189SBM Handmade SS 304 Single Bowl Kitchen Sink (21x18 in)",
            "category": "Sinks",
            "subcategory": "Handmade Sinks",
            "overall": "533 x 457 x 228 mm (21 x 18 x 9 in)",
            "bowl": "480 x 402 x 225 mm",
            "mrp": "₹12,295",
            "type": "Single Bowl",
            "kw": ["sh21189", "handmade", "single bowl"]
        },
        {
            "model": "KS-SH24189SBM",
            "title": "GLEN KS-SH24189SBM Handmade SS 304 Single Bowl Kitchen Sink (24x18 in)",
            "category": "Sinks",
            "subcategory": "Handmade Sinks",
            "overall": "605 x 455 x 225 mm (24 x 18 x 9 in)",
            "bowl": "557 x 405 x 225 mm",
            "mrp": "₹13,495",
            "type": "Single Bowl",
            "kw": ["sh24189", "handmade", "single bowl"]
        },
        {
            "model": "KS-SH30189SBM",
            "title": "GLEN KS-SH30189SBM Handmade SS 304 Single Bowl Kitchen Sink (30x18 in)",
            "category": "Sinks",
            "subcategory": "Handmade Sinks",
            "overall": "762 x 457 x 228 mm (30 x 18 x 9 in)",
            "bowl": "710 x 410 x 225 mm",
            "mrp": "₹16,495",
            "type": "Single Bowl",
            "kw": ["sh30189", "handmade", "single bowl"]
        },
        {
            "model": "KS-SH24189SBFFDM",
            "title": "GLEN KS-SH24189SBFFDM Handmade Single Bowl Sink with Full Faucet Deck (24x18 in)",
            "category": "Sinks",
            "subcategory": "Handmade Sinks",
            "overall": "609 x 457 x 228 mm (24 x 18 x 9 in)",
            "bowl": "557 x 354 x 225 mm",
            "mrp": "₹14,395",
            "type": "Single Bowl with Full Faucet Deck",
            "kw": ["sh24189", "faucet deck"]
        },
        {
            "model": "KS-SH36209SBSDM",
            "title": "GLEN KS-SH36209SBSDM Handmade Single Bowl Sink with Side Drain Board (36x20 in)",
            "category": "Sinks",
            "subcategory": "Handmade Sinks",
            "overall": "910 x 500 x 225 mm (36 x 20 x 9 in)",
            "bowl": "485 x 450 x 225 mm",
            "mrp": "₹24,295",
            "type": "Single Bowl with Side Drain",
            "kw": ["sh36209", "side drain"]
        },
        # Handmade Double Bowl Sinks
        {
            "model": "KS-SH37189DBM",
            "title": "GLEN KS-SH37189DBM Handmade SS 304 Double Bowl Kitchen Sink (37x18 in)",
            "category": "Sinks",
            "subcategory": "Handmade Sinks",
            "overall": "940 x 460 x 225 mm (37 x 18 x 9 in)",
            "bowl": "432 x 410 x 225 mm (each bowl)",
            "mrp": "₹22,695",
            "type": "Double Bowl",
            "kw": ["sh37189", "double bowl"]
        },
        {
            "model": "KS-SH40209DBM",
            "title": "GLEN KS-SH40209DBM Handmade SS 304 Double Bowl Kitchen Sink (40x20 in)",
            "category": "Sinks",
            "subcategory": "Handmade Sinks",
            "overall": "1015 x 505 x 225 mm (40 x 20 x 9 in)",
            "bowl": "470 x 457 x 225 mm",
            "mrp": "₹24,995",
            "type": "Double Bowl",
            "kw": ["sh40209", "double bowl"]
        },
        {
            "model": "KS-SH45209DBM",
            "title": "GLEN KS-SH45209DBM Handmade SS 304 Double Bowl Kitchen Sink (45x20 in)",
            "category": "Sinks",
            "subcategory": "Handmade Sinks",
            "overall": "1140 x 505 x 225 mm (45 x 20 x 9 in)",
            "bowl": "531 x 454 x 225 mm",
            "mrp": "₹25,995",
            "type": "Double Bowl",
            "kw": ["sh45209", "double bowl"]
        },
        {
            "model": "KS-SH32189DBHFDM",
            "title": "GLEN KS-SH32189DBHFDM Handmade Double Bowl Sink with Half Faucet Deck (32x18 in)",
            "category": "Sinks",
            "subcategory": "Handmade Sinks",
            "overall": "807 x 455 x 225 mm (32 x 18 x 9 in)",
            "bowl": "353 x 350 x 225 mm",
            "mrp": "₹22,995",
            "type": "Double Bowl with Half Faucet Deck",
            "kw": ["sh32189", "half faucet deck"]
        },
        {
            "model": "KS-SH37189DBHFDM",
            "title": "GLEN KS-SH37189DBHFDM Handmade Double Bowl Sink with Half Faucet Deck (37x18 in)",
            "category": "Sinks",
            "subcategory": "Handmade Sinks",
            "overall": "939 x 457 x 228 mm (37 x 18 x 9 in)",
            "bowl": "432 x 355 x 225 mm",
            "mrp": "₹24,995",
            "type": "Double Bowl with Half Faucet Deck",
            "kw": ["sh37189", "half faucet deck"]
        },
        {
            "model": "KS-SH45209DBHFDM",
            "title": "GLEN KS-SH45209DBHFDM Handmade Double Bowl Sink with Half Faucet Deck (45x20 in)",
            "category": "Sinks",
            "subcategory": "Handmade Sinks",
            "overall": "1140 x 505 x 225 mm (45 x 20 x 9 in)",
            "bowl": "531 x 405 x 225 mm",
            "mrp": "₹26,995",
            "type": "Double Bowl with Half Faucet Deck",
            "kw": ["sh45209", "half faucet deck"]
        },
        # Pressed Sinks
        {
            "model": "KS-SP18169SBM",
            "title": "GLEN KS-SP18169SBM Pressed SS 304 Single Bowl Sink (18x16 in)",
            "category": "Sinks",
            "subcategory": "Pressed Sinks",
            "overall": "456 x 406 x 225 mm (18 x 16 x 9 in)",
            "bowl": "402 x 353 x 225 mm",
            "mrp": "₹6,395",
            "type": "Single Bowl",
            "kw": ["sp18169", "pressed"]
        },
        {
            "model": "KS-SP21188SBM",
            "title": "GLEN KS-SP21188SBM Pressed SS 304 Single Bowl Sink (21x18 in)",
            "category": "Sinks",
            "subcategory": "Pressed Sinks",
            "overall": "530 x 456 x 200 mm (21 x 18 x 8 in)",
            "bowl": "476 x 400 x 200 mm",
            "mrp": "₹6,595",
            "type": "Single Bowl",
            "kw": ["sp21188", "pressed"]
        },
        {
            "model": "KS-SP24188SBM",
            "title": "GLEN KS-SP24188SBM Pressed SS 304 Single Bowl Sink (24x18x8 in)",
            "category": "Sinks",
            "subcategory": "Pressed Sinks",
            "overall": "608 x 457 x 200 mm (24 x 18 x 8 in)",
            "bowl": "547 x 402 x 200 mm",
            "mrp": "₹7,495",
            "type": "Single Bowl",
            "kw": ["sp24188", "pressed"]
        },
        {
            "model": "KS-SP24189SBM",
            "title": "GLEN KS-SP24189SBM Pressed SS 304 Deep Single Bowl Sink (24x18x9 in)",
            "category": "Sinks",
            "subcategory": "Pressed Sinks",
            "overall": "608 x 457 x 225 mm (24 x 18 x 9 in)",
            "bowl": "547 x 402 x 225 mm",
            "mrp": "₹7,995",
            "type": "Single Bowl",
            "kw": ["sp24189", "pressed"]
        },
        {
            "model": "KS-SP37189SBSDM",
            "title": "GLEN KS-SP37189SBSDM Pressed Single Bowl Sink with Side Drain (37x18 in)",
            "category": "Sinks",
            "subcategory": "Pressed Sinks",
            "overall": "947 x 458 x 225 mm (37 x 18 x 9 in)",
            "bowl": "450 x 405 x 225 mm",
            "mrp": "₹13,495",
            "type": "Single Bowl with Side Drain",
            "kw": ["sp37189", "side drain"]
        },
        {
            "model": "KS-SP37189DBM",
            "title": "GLEN KS-SP37189DBM Pressed SS 304 Double Bowl Sink (37x18 in)",
            "category": "Sinks",
            "subcategory": "Pressed Sinks",
            "overall": "947 x 458 x 225 mm (37 x 18 x 9 in)",
            "bowl": "430 x 403 x 225 mm",
            "mrp": "₹15,395",
            "type": "Double Bowl",
            "kw": ["sp37189", "double bowl"]
        },
        {
            "model": "KS-SP45209DBM",
            "title": "GLEN KS-SP45209DBM Pressed SS 304 Double Bowl Sink (45x20 in)",
            "category": "Sinks",
            "subcategory": "Pressed Sinks",
            "overall": "1145 x 510 x 200 mm (45 x 20 x 8 in)",
            "bowl": "508 x 405 x 225 mm",
            "mrp": "₹19,995",
            "type": "Double Bowl",
            "kw": ["sp45209", "double bowl"]
        },
        # Sink Faucets
        {
            "model": "KF-101MSSPDS",
            "title": "GLEN KF-101MSSPDS J-Shaped Deck Mounted Pull-Down Kitchen Faucet",
            "category": "Sinks",
            "subcategory": "Kitchen Faucets",
            "overall": "Deck Mounted Hot & Cold Mixer Faucet",
            "bowl": "Pull-Down Sprayer Spout",
            "mrp": "₹11,990",
            "type": "Pull-Down Spray Faucet",
            "kw": ["101msspds", "faucet"]
        },
        {
            "model": "KF-102MSSPDS",
            "title": "GLEN KF-102MSSPDS Deck Mounted Pull-Down Sprayer Kitchen Faucet",
            "category": "Sinks",
            "subcategory": "Kitchen Faucets",
            "overall": "Deck Mounted Hot & Cold Mixer Faucet",
            "bowl": "Pull-Down Sprayer Spout",
            "mrp": "₹11,900",
            "type": "Pull-Down Spray Faucet",
            "kw": ["102msspds", "faucet"]
        },
        {
            "model": "KF-103MSSPDS",
            "title": "GLEN KF-103MSSPDS SS 304 Pull-Down Sprayer Kitchen Faucet",
            "category": "Sinks",
            "subcategory": "Kitchen Faucets",
            "overall": "SS 304 Body Deck Mounted Mixer Faucet",
            "bowl": "Anti-splash Dual Stream",
            "mrp": "₹10,990",
            "type": "Pull-Down Spray Faucet",
            "kw": ["103msspds", "faucet"]
        },
        {
            "model": "KF-104SSSDF",
            "title": "GLEN KF-104SSSDF Flexible Neck Deck Mounted Kitchen Faucet",
            "category": "Sinks",
            "subcategory": "Kitchen Faucets",
            "overall": "Silicon Skin Flexible Neck Faucet",
            "bowl": "Needle & Foam Dual Stream",
            "mrp": "₹7,990",
            "type": "Flexible Spout Faucet",
            "kw": ["104sssdf", "faucet"]
        },
        {
            "model": "KF-105SSSDF",
            "title": "GLEN KF-105SSSDF SS 304 Flexible Neck Kitchen Mixer Faucet",
            "category": "Sinks",
            "subcategory": "Kitchen Faucets",
            "overall": "SS 304 Flexible Neck Faucet",
            "bowl": "Needle & Foam Dual Stream",
            "mrp": "₹7,490",
            "type": "Flexible Spout Faucet",
            "kw": ["105sssdf", "faucet"]
        }
    ]
    
    for s in sink_defs:
        cat_slug = "sinks"
        pid = f"sinks-{re.sub(r'[^a-z0-9]+', '-', s['model'].lower()).strip('-')}"
        img_url, shop_price = find_best_image_url(s["model"], s["kw"], shopify_index)
        saved_img = save_image_from_url_or_crop(cat_slug, pid, img_url)
        
        specs = [
            {"label": "Material", "value": "AISI SS 304 Grade Stainless Steel"},
            {"label": "Sink Type", "value": s["type"]},
            {"label": "Dimensions", "value": s["overall"]},
            {"label": "Bowl Size", "value": s["bowl"]},
            {"label": "Finish", "value": "Satin Matte / Ceramic Undercoating"},
            {"label": "Warranty", "value": "10 Years Manufacturer Warranty"}
        ]
        
        features = [
            f"Premium SS 304 Stainless Steel construction for exceptional rust and stain resistance",
            f"Overall Size: {s['overall']} | Bowl Dimensions: {s['bowl']}",
            "Thick sound-deadening rubber pads and anti-condensation ceramic undercoating",
            "Clean R10/R25 rounded corners for effortless cleaning and hygiene",
            "Sloped X-channel basin grooves for optimal water drainage",
            "Includes heavy-duty 3.5-inch stainless steel basket waste strainer"
        ]
        if "Faucet" in s["subcategory"]:
            specs = [
                {"label": "Material", "value": "SS 304 Solid Stainless Steel"},
                {"label": "Cartridge", "value": "Ceramic Sedal Cartridge (Spain)"},
                {"label": "Aerator", "value": "Neoperl Honeycomb Aerator (Germany)"},
                {"label": "Working Pressure", "value": "Up to 10 Bar High Pressure"},
                {"label": "Functions", "value": "Hot & Cold Water Mixer with Dual Flow"},
                {"label": "Warranty", "value": "5 Years Manufacturer Warranty"}
            ]
            features = [
                "Heavy-duty SS 304 solid construction with anti-fingerprint finish",
                "World-renowned Ceramic Sedal Cartridge from Spain for 500,000+ leak-free cycles",
                "Neoperl Aerator from Germany delivering splash-free aerated foam flow",
                "Up to 10 Bar high pressure endurance, ideal for pressurized pipelines",
                "360-degree swivel spout with braided SS flexible connection pipes",
                "Dual spray modes: needle stream and aerated soft foam flow"
            ]
            
        rec = {
            "id": pid,
            "title": s["title"],
            "category": "Sinks",
            "subcategory": s["subcategory"],
            "brand": "GLEN APPLIANCES",
            "model": s["model"],
            "tag": s["subcategory"],
            "tagColor": TAG_COLORS["Sinks"],
            "image": saved_img,
            "price": s["mrp"],
            "specs": specs,
            "features": features,
            "warranty": specs[-1]["value"],
            "dimensions": s["overall"],
            "status": "Published",
            "description": f"{s['title']}. {' '.join(features[:3])} Dimensions: {s['overall']}. Backed by genuine GLEN manufacturer warranty: {specs[-1]['value']}.",
            "sourcePdf": "KITCHEN SINK FOLDER compress.pdf",
            "sourcePage": 2 if "Handmade" in s["subcategory"] else (3 if "Pressed" in s["subcategory"] else 4),
            "created_at": "2026-11-16 09:50:00",
            "updated_at": "2026-11-16 09:50:00"
        }
        new_records.append(rec)
    print(f"Processed {len(sink_defs)} Sink & Faucet models.")

    # =========================================================================
    # SMALL APPLIANCES
    # =========================================================================
    sa_defs = [
        # Slow Juicers & Blenders
        {
            "model": "SA 4016 HSJ",
            "title": "GLEN SA 4016 Hopper Slow Cold Press Juicer 250W (130mm Feed)",
            "subcategory": "Slow Juicers & Blenders",
            "specs": [
                {"label": "Power Rating", "value": "250 W"},
                {"label": "Speed", "value": "55 RPM Cold Press Squeeze"},
                {"label": "Feed Hopper", "value": "130 mm Mega Wide Hopper"},
                {"label": "Capacity", "value": "1000ml Juice / 900ml Pulp"},
                {"label": "Warranty", "value": "2 Years on Motor"}
            ],
            "price": "₹21,665",
            "features": [
                "130 mm mega-wide feed hopper fits whole apples and oranges without precutting",
                "55 RPM low-speed masticating cold press technology retains vitamins and enzymes",
                "Food-grade durable juicing auger strains maximum juice with ultra-low pulp",
                "Large 1000 ml juice container and 900 ml pulp collector cup",
                "Reverse rotation function to prevent fruit clogging",
                "Whisper-quiet 250W high torque induction motor"
            ],
            "kw": ["4016", "slow juicer"]
        },
        {
            "model": "SA 4017 SJ",
            "title": "GLEN SA 4017 Hopper Slow Cold Press Juicer 200W",
            "subcategory": "Slow Juicers & Blenders",
            "specs": [
                {"label": "Power Rating", "value": "200 W"},
                {"label": "Speed", "value": "55 RPM Low RPM Squeeze"},
                {"label": "Feed Tube", "value": "Wide Mouth Hopper"},
                {"label": "Warranty", "value": "2 Years on Motor"}
            ],
            "price": "₹20,995",
            "features": [
                "Slow Squeeze technology preserves essential nutrients and minimizes oxidation",
                "Heavy-duty food grade auger extracts maximum juice yield",
                "Drip-stop smart cap for spill-free operation and juice mixing",
                "Easy-to-clean design with quick rinse mechanism",
                "200W low-noise copper motor"
            ],
            "kw": ["4017", "slow juicer"]
        },
        {
            "model": "SA 4015 SJ",
            "title": "GLEN SA 4015 Cold Press Slow Juicer 150W (108mm Feed)",
            "subcategory": "Slow Juicers & Blenders",
            "specs": [
                {"label": "Power Rating", "value": "150 W"},
                {"label": "Speed", "value": "55 RPM Cold Squeeze"},
                {"label": "Feed Hopper", "value": "108 mm Wide Mouth"},
                {"label": "Warranty", "value": "2 Years on Motor"}
            ],
            "price": "₹16,665",
            "features": [
                "108 mm large feed hopper accommodates whole fruits with minimal prep",
                "Low-speed 55 RPM gentle masticating auger for rich, nutrient-packed juice",
                "One-knob simple operation with reverse spin function",
                "Compact kitchen-friendly footprint with non-slip suction feet",
                "BPA-free food grade Tritan juicing bowl and auger"
            ],
            "kw": ["4015", "slow juicer"]
        },
        {
            "model": "SA 4048 UT PLUS",
            "title": "GLEN SA 4048 UT PLUS Nutri Blender Pro 900W (4 Jars)",
            "subcategory": "Slow Juicers & Blenders",
            "specs": [
                {"label": "Power Rating", "value": "900 W High Torque Motor"},
                {"label": "Speed", "value": "22,000 RPM"},
                {"label": "Jars", "value": "4 Unbreakable Polycarbonate Jars"},
                {"label": "Blades", "value": "3 Food-Grade Stainless Steel Blades"},
                {"label": "Warranty", "value": "2 Years on Motor"}
            ],
            "price": "₹11,665",
            "features": [
                "Powerful 900W 100% copper motor spins at 22,000 RPM for instant nutrient extraction",
                "4 unbreakable polycarbonate jars: 2000ml Blending, 1000ml, 800ml & Sipper Mug",
                "3 interchangeable precision laser-cut surgical stainless steel blades",
                "Smoothie maker, dry masala grinder, and puree blender all in one",
                "Dishwasher-safe jars with leak-proof flip-top drinking lids"
            ],
            "kw": ["4048utplus", "nutri blender", "900w"]
        },
        {
            "model": "SA 4048 N PLUS",
            "title": "GLEN SA 4048 N PLUS Active Blender 350W (2 Jars + Sipper Bottle)",
            "subcategory": "Slow Juicers & Blenders",
            "specs": [
                {"label": "Power Rating", "value": "350 W"},
                {"label": "Jars", "value": "2 Jars + 1 Sipper Bottle"},
                {"label": "Blades", "value": "Stainless Steel 4-Leaf Blade"},
                {"label": "Warranty", "value": "2 Years on Motor"}
            ],
            "price": "₹4,395",
            "features": [
                "Personal active blender engineered for gym protein shakes, smoothies, and quick purees",
                "Includes 2 food-grade transparent jars plus a portable sipper travel bottle with carry lid",
                "350W pure copper motor with pulse push-start control",
                "Rust-resistant 4-leaf stainless steel blade crushes ice and frozen berries easily",
                "Ultra-compact footprint fits any modern kitchen countertop"
            ],
            "kw": ["4048n", "active blender"]
        },
        # Mixer Grinders
        {
            "model": "SA 4031 PLUS",
            "title": "GLEN SA 4031 PLUS Heavy Duty Mixer Grinder 1000W (4 Jars)",
            "subcategory": "Mixer Grinders",
            "specs": [
                {"label": "Power Rating", "value": "1000 W Heavy Duty Motor"},
                {"label": "Jars", "value": "4 Jars (incl. Juicer with Fruit Filter)"},
                {"label": "Blades", "value": "Heavy Gauge 304 Stainless Steel"},
                {"label": "Warranty", "value": "5 Yrs Motor, 2 Yrs Product"}
            ],
            "price": "₹9,195",
            "features": [
                "High-performance 1000W copper wound motor with 2200W locked rotor wattage",
                "4 heavy-duty jars: Liquidiser, Dry Grinder, Chutney Jar, and Fruit Extractor Jar",
                "Transparent juicer jar equipped with stainless steel micro-mesh fruit filter",
                "Overload protector mechanism prevents motor overheating during tough grinding",
                "3-speed rotary switch with pulse incher control"
            ],
            "kw": ["4031", "mixer grinder", "1000w"]
        },
        {
            "model": "SA 4030 PLUS",
            "title": "GLEN SA 4030 PLUS Mixer Grinder 750W (4 Jars)",
            "subcategory": "Mixer Grinders",
            "specs": [
                {"label": "Power Rating", "value": "750 W Copper Motor"},
                {"label": "Jars", "value": "4 Jars (3 SS Jars + 1 Transparent Jar)"},
                {"label": "Speed", "value": "3 Speeds with Pulse"},
                {"label": "Warranty", "value": "5 Yrs Motor, 2 Yrs Product"}
            ],
            "price": "₹7,995",
            "features": [
                "750W 100% high-grade copper motor for dependable everyday masala grinding",
                "4 versatile jars: 1.5L Liquidiser, 1.0L Dry Grinder, 0.4L Chutney & Juicer Jar",
                "High-strength stainless steel blades ensure consistent fineness",
                "Ergonomically designed jar handles with secure locking lids",
                "Anti-skid suction rubber feet for stability on wet counters"
            ],
            "kw": ["4030 plus", "mixer grinder", "750w"]
        },
        {
            "model": "SA 4022 PLATINUM PLUS",
            "title": "GLEN SA 4022 Platinum Plus Mixer Grinder 750W (4 Jars)",
            "subcategory": "Mixer Grinders",
            "specs": [
                {"label": "Power Rating", "value": "750 W Motor (2200W Locked Wattage)"},
                {"label": "Jars", "value": "4 Jars (3 Stainless Steel + 1 Juicer Jar)"},
                {"label": "Warranty", "value": "5 Yrs Motor, 2 Yrs Product"}
            ],
            "price": "₹8,795",
            "features": [
                "Maximum locked motor wattage of 2200W handles the toughest turmeric and batter",
                "4 precision engineered jars with flow breakers for ultra-fine grinding",
                "Heavy-duty stainless steel blades with hardened cutting edges",
                "Shock-proof metallic-accented ABS body in sleek platinum finish",
                "Overload reset switch on bottom plate"
            ],
            "kw": ["4022", "platinum", "750w"]
        },
        # Choppers & Hand Blenders
        {
            "model": "SA 4043 TURBO",
            "title": "GLEN SA 4043 Turbo Electric Vegetable Chopper 250W (0.6L)",
            "subcategory": "Choppers & Hand Blenders",
            "specs": [
                {"label": "Power Rating", "value": "250 W"},
                {"label": "Bowl Capacity", "value": "0.6 Litres Food-Grade Bowl"},
                {"label": "Blades", "value": "Dual Stainless Steel Blades"},
                {"label": "Warranty", "value": "2 Years Comprehensive"}
            ],
            "price": "₹2,795",
            "features": [
                "Fast push-button electric chopper dices onions, nuts, and veggies in seconds",
                "Dual-tier surgical stainless steel chopping blades for uniform cutting",
                "Includes whisking disc attachment for fluffy eggs, lassi, and whipped cream",
                "Transparent 600 ml bowl with measurement markings and non-slip base ring",
                "Compact, lightweight, and easy to clean under running water"
            ],
            "kw": ["4043", "chopper"]
        },
        {
            "model": "SA 4063 TURBO",
            "title": "GLEN SA 4063 3-in-1 Turbo Hand Blender with Chopper & Whisker 400W",
            "subcategory": "Choppers & Hand Blenders",
            "specs": [
                {"label": "Power Rating", "value": "400 W High Speed Motor"},
                {"label": "Stem", "value": "Detachable SS 304 Stainless Steel Stem"},
                {"label": "Attachments", "value": "Blender Stem, Chopper Bowl, Balloon Whisk"},
                {"label": "Warranty", "value": "2 Years Comprehensive"}
            ],
            "price": "₹4,795",
            "features": [
                "Versatile 3-in-1 kitchen immersion blender: blend, chop, and whisk effortlessly",
                "Detachable food-grade SS 304 stem safe for hot soups and dal blending directly in the pot",
                "500 ml mini chopper bowl for garlic, onions, herbs, and nuts",
                "Stainless steel balloon whisk attachment for batters and whipping cream",
                "Ergonomic soft-grip handle with dual-speed turbo boost button"
            ],
            "kw": ["4063", "hand blender"]
        },
        # Electric Kettles
        {
            "model": "SA 9004",
            "title": "GLEN SA 9004 Double Wall Electric Kettle 0.8L (800W)",
            "subcategory": "Kettles & Tea/Coffee Makers",
            "specs": [
                {"label": "Capacity", "value": "0.8 Litres"},
                {"label": "Power Rating", "value": "800 W Fast Boil"},
                {"label": "Body", "value": "Plastic-Clad Stainless Steel Double Wall"},
                {"label": "Base", "value": "360° Cordless Pirouette Base"},
                {"label": "Warranty", "value": "2 Years Comprehensive"}
            ],
            "price": "₹2,295",
            "features": [
                "Double-wall insulated cool-touch outer body keeps exterior safe while interior boils",
                "Seamless SS 304 food-grade stainless steel interior with concealed heating element",
                "360-degree rotational cordless base with cord wrap storage",
                "Auto shut-off when water reaches rolling boil and boil-dry protection",
                "Compact 0.8L size, ideal for small families, bachelor pads, and travel desks"
            ],
            "kw": ["9004", "kettle"]
        },
        {
            "model": "SA 9003",
            "title": "GLEN SA 9003 Borosilicate Glass Electric Kettle 1.5L (1500W)",
            "subcategory": "Kettles & Tea/Coffee Makers",
            "specs": [
                {"label": "Capacity", "value": "1.5 Litres"},
                {"label": "Power Rating", "value": "1500 W Rapid Boil"},
                {"label": "Body", "value": "Thermal Shock-Resistant Borosilicate Glass"},
                {"label": "Lighting", "value": "Blue LED Boiling Halo Illumination"},
                {"label": "Warranty", "value": "2 Years Comprehensive"}
            ],
            "price": "₹2,295",
            "features": [
                "Crystal-clear high-strength borosilicate glass body resists thermal shock",
                "Vibrant circular blue LED light illuminates the water beautifully during boiling",
                "Concealed stainless steel heating base prevents limescale build-up",
                "One-touch push button lid opening with integrated fine mesh spout filter",
                "Automatic shut-off with Strix thermostat controller"
            ],
            "kw": ["9003", "glass kettle"]
        },
        {
            "model": "SA 9009 SS BL",
            "title": "GLEN SA 9009 SS BL Stainless Steel Electric Kettle 1.8L (1500W)",
            "subcategory": "Kettles & Tea/Coffee Makers",
            "specs": [
                {"label": "Capacity", "value": "1.8 Litres"},
                {"label": "Power Rating", "value": "1500 W"},
                {"label": "Body", "value": "Brushed Stainless Steel 304"},
                {"label": "Warranty", "value": "2 Years Comprehensive"}
            ],
            "price": "₹2,295",
            "features": [
                "Generous 1.8 Litre capacity boils up to 8 cups of water in minutes",
                "Durable brushed stainless steel body with heat-insulated ergonomic handle",
                "Wide spout for smooth, spill-free pouring",
                "Concealed heating element for effortless descaling and cleaning",
                "Dual safety protection: auto-shutoff and boil-dry cut-off"
            ],
            "kw": ["9009", "kettle"]
        },
        # Toasters & Sandwich Makers
        {
            "model": "SA 3019",
            "title": "GLEN SA 3019 2-Slice Electric Auto Pop-up Toaster 750W",
            "subcategory": "Toasters & Snack Makers",
            "specs": [
                {"label": "Capacity", "value": "2 Slices"},
                {"label": "Power Rating", "value": "750 W"},
                {"label": "Browning", "value": "6 Adjustable Browning Levels"},
                {"label": "Tray", "value": "Slide-Out Removable Crumb Tray"},
                {"label": "Warranty", "value": "2 Years Comprehensive"}
            ],
            "price": "₹2,895",
            "features": [
                "6-stage variable browning control dials in your preferred golden-brown toast crispness",
                "Self-centering bread slots ensure uniform toasting on both sides",
                "Mid-cycle cancel button to pop up toast at any moment",
                "High-lift carriage lever allows easy removal of smaller bread slices without burnt fingers",
                "Removable crumb tray pulls out smoothly for quick crumb cleanup"
            ],
            "kw": ["3019", "toaster"]
        },
        {
            "model": "SA 3022 MSM",
            "title": "GLEN SA 3022 MSM 3-in-1 Multi Snack Maker (Sandwich, Grill, Waffle) 750W",
            "subcategory": "Toasters & Snack Makers",
            "specs": [
                {"label": "Power Rating", "value": "750 W"},
                {"label": "Plates", "value": "3 Detachable Non-Stick Plate Sets"},
                {"label": "Types", "value": "Sandwich Toaster, Panini Grill, Belgian Waffle"},
                {"label": "Warranty", "value": "2 Years Comprehensive"}
            ],
            "price": "₹4,195",
            "features": [
                "Versatile 3-in-1 appliance: easily swap plates for deep toasted sandwiches, grilled paninis, or waffles",
                "PFOA-free premium German non-stick coating requires zero butter or oil",
                "One-button quick release mechanism for effortless plate removal and dishwasher washing",
                "Thermostatic temperature control with dual Ready-to-Cook LED indicator lights",
                "Compact upright vertical storage design with built-in cord winder"
            ],
            "kw": ["3022", "snack maker", "sandwich"]
        },
        {
            "model": "SA 3029 GRILL",
            "title": "GLEN SA 3029 Contact Grill with Oil Collector Tray 850W",
            "subcategory": "Toasters & Snack Makers",
            "specs": [
                {"label": "Power Rating", "value": "850 W"},
                {"label": "Plates", "value": "Ribbed Non-Stick Grill Plates"},
                {"label": "Tray", "value": "Slide-Out Drip Oil Collector"},
                {"label": "Warranty", "value": "2 Years Comprehensive"}
            ],
            "price": "₹3,195",
            "features": [
                "Heavy-duty floating hinge accommodates thick artisan paninis, burgers, and stuffed sandwiches",
                "Ribbed grilling surface creates authentic char marks while draining excess oils away",
                "Removable drip tray collects fat run-off for healthier low-oil cooking",
                "Heat-resistant cool-touch handle with secure locking latch",
                "Fast 850W heating elements brown both sides evenly simultaneously"
            ],
            "kw": ["3029", "grill"]
        },
        {
            "model": "SA 3038",
            "title": "GLEN SA 3038 Electric Dosa Maker & Crepe Plate 1000W",
            "subcategory": "Toasters & Snack Makers",
            "specs": [
                {"label": "Power Rating", "value": "1000 W"},
                {"label": "Plate", "value": "30 cm Large Non-Stick Cooking Plate"},
                {"label": "Accessories", "value": "T-Shape Wooden Batter Spreader & Spatula"},
                {"label": "Warranty", "value": "2 Years Comprehensive"}
            ],
            "price": "₹3,695",
            "features": [
                "Make paper-thin crisp dosas, chillas, pancakes, and crepes with negligible oil",
                "Large 30 cm die-cast non-stick heating plate ensures even heat spread without hot spots",
                "Adjustable temperature dial for precise heat control from low simmer to high sizzle",
                "Includes authentic wooden T-spreader and spatula for professional swirling",
                "Raised edge prevents batter run-off and spills"
            ],
            "kw": ["3038", "dosa maker"]
        },
        # Air Fryers
        {
            "model": "SA 3040 DSS",
            "title": "GLEN SA 3040 DSS Digital Air Fryer 12 Litres (2000W)",
            "subcategory": "Air Fryers & Fryers",
            "specs": [
                {"label": "Capacity", "value": "12 Litres Extra Large"},
                {"label": "Power Rating", "value": "2000 W 360° Hot Air Circulation"},
                {"label": "Menus", "value": "8 One-Touch Digital Pre-Set Menus"},
                {"label": "Display", "value": "Touch LED Panel with Window Light"},
                {"label": "Warranty", "value": "2 Years Comprehensive"}
            ],
            "price": "₹18,995",
            "features": [
                "Huge 12-Litre family capacity: air fry, dehydrate, roast, and bake multiple racks simultaneously",
                "High-speed 360° rapid air convection cooks crispy golden meals with up to 90% less oil",
                "8 pre-programmed touch presets for French fries, chicken, fish, steak, pizza, and baking",
                "Clear viewing observation window and interior light to inspect food without losing heat",
                "Stainless steel fascia with digital timer and temperature adjustment up to 200°C"
            ],
            "kw": ["3040 dss", "digital air fryer", "12 litre"]
        },
        {
            "model": "SA 3043 DSS",
            "title": "GLEN SA 3043 DSS Digital Air Fryer 5.5L (1400W)",
            "subcategory": "Air Fryers & Fryers",
            "specs": [
                {"label": "Capacity", "value": "5.5 Litres"},
                {"label": "Power Rating", "value": "1400 W"},
                {"label": "Presets", "value": "7 Pre-Set Cooking Functions"},
                {"label": "Warranty", "value": "2 Years Comprehensive"}
            ],
            "price": "₹9,495",
            "features": [
                "5.5 Litre square basket fits whole chicken and large snacks with zero overcrowding",
                "Digital touchscreen display with smart preheat and shake reminders",
                "Non-stick dishwasher-safe fry basket with cool-touch release handle",
                "Precision thermostat from 80°C to 200°C with 60-minute auto-cutoff timer",
                "Brushed stainless steel housing blends seamlessly with modern kitchen suites"
            ],
            "kw": ["3043", "air fryer"]
        },
        {
            "model": "SA 3066 DIGI",
            "title": "GLEN SA 3066 Dual Basket Digital Air Fryer 8L (2 Independent Zones)",
            "subcategory": "Air Fryers & Fryers",
            "specs": [
                {"label": "Capacity", "value": "8 Litres (4L + 4L Dual Baskets)"},
                {"label": "Power Rating", "value": "2400 W Dual Heating"},
                {"label": "Zones", "value": "2 Independent Cooking Zones with Smart Sync"},
                {"label": "Warranty", "value": "2 Years Comprehensive"}
            ],
            "price": "₹13,995",
            "features": [
                "Dual independent 4L + 4L cooking baskets: cook two different dishes at two temperatures at once",
                "Sync Cook feature finishes both baskets at the exact same second for hot family dinners",
                "Match Cook mirrors settings across both baskets for huge 8L batch cooking",
                "Digital LED control interface with 10 intelligent chef presets",
                "Non-stick crisper plates ensure grease drains away cleanly"
            ],
            "kw": ["3066", "dual basket", "air fryer"]
        },
        # Induction Cookers & Infrared Stoves
        {
            "model": "SA 3081 IN",
            "title": "GLEN SA 3081 IN Micro Crystalline Touch Induction Cooker 2000W",
            "subcategory": "Induction Cookers & Infrared Stoves",
            "specs": [
                {"label": "Power Rating", "value": "2000 W High Efficiency"},
                {"label": "Plate", "value": "Micro Crystalline Polished Glass"},
                {"label": "Controls", "value": "Feather Touch Sensor Panel"},
                {"label": "Timer", "value": "3-Hour Digital Programmable Timer"},
                {"label": "Warranty", "value": "1 Year Comprehensive"}
            ],
            "price": "₹5,495",
            "features": [
                "2000W magnetic induction heating heats cookware directly for super-fast cooking and no energy waste",
                "High-grade microcrystalline polished glass plate resists high heat and is scratch-proof",
                "Smart Indian cooking pre-sets: Roti, Dosa, Curry, Boil, Fry, and Milk warming",
                "Feather touch sensor controls with LED digital display",
                "Auto pan detection with overheat and voltage fluctuation auto-shutoff"
            ],
            "kw": ["3081", "induction cooker"]
        },
        {
            "model": "SA 3075 IR",
            "title": "GLEN SA 3075 IR Infrared Stove 2200W (All Cookware Compatible)",
            "subcategory": "Induction Cookers & Infrared Stoves",
            "specs": [
                {"label": "Power Rating", "value": "2200 W Ceramic Infrared"},
                {"label": "Cookware", "value": "Works with ALL Metals (SS, Cast Iron, Copper, Glass, Clay)"},
                {"label": "Controls", "value": "Touch Sensor Controls & Digital Display"},
                {"label": "Timer", "value": "180 Minutes Timer"},
                {"label": "Warranty", "value": "1 Year Comprehensive"}
            ],
            "price": "₹5,695",
            "features": [
                "Infrared radiant heat technology works with any flat-bottom cookware, including clay pots and copper",
                "Flameless, smoke-free cooking with instant high-temperature heating",
                "Durable crystal glass top with touch controls and child safety lock",
                "180-minute countdown timer with automatic shut-off",
                "Includes dedicated stainless steel barbecue grill rack"
            ],
            "kw": ["3075", "infrared"]
        },
        {
            "model": "SA 3001 WP",
            "title": "GLEN SA 3001 WP Electric Food Warming Plate (Tempered Glass)",
            "subcategory": "Induction Cookers & Infrared Stoves",
            "specs": [
                {"label": "Power Rating", "value": "250 W Energy Efficient"},
                {"label": "Surface", "value": "Toughened Easy-Clean Glass Surface"},
                {"label": "Dimensions", "value": "550 x 350 mm Warm Surface"},
                {"label": "Warranty", "value": "2 Years Comprehensive"}
            ],
            "price": "₹2,995",
            "features": [
                "Keeps cooked food, curries, rotis, and snacks hot and ready to serve for buffets and family dinners",
                "Accommodates multiple bowls and casserole pots at the same time",
                "Ultra-thin sleek glass design sits comfortably on any dining table without crowding",
                "Compatible with all heat-resistant ceramic, steel, and glass tableware",
                "Energy-efficient low power consumption with steady thermal distribution"
            ],
            "kw": ["3001", "warming plate"]
        },
        # Oven Toaster Griller (OTG)
        {
            "model": "SA 5025 ROT-CON",
            "title": "GLEN SA 5025 Oven Toaster Griller (OTG) with Rotisserie & Convection 25L",
            "subcategory": "Oven Toaster Griller (OTG)",
            "specs": [
                {"label": "Capacity", "value": "25 Litres"},
                {"label": "Power Rating", "value": "1700 W"},
                {"label": "Features", "value": "Motorised Rotisserie & Convection Fan"},
                {"label": "Timer", "value": "60 Minutes Timer with Bell"},
                {"label": "Warranty", "value": "2 Years Comprehensive"}
            ],
            "price": "₹10,495",
            "features": [
                "25-Litre capacity ideal for baking cakes, pizzas, roasting chicken, and toasting breads",
                "Convection fan circulates hot air evenly for uniform browning and faster baking",
                "Motorised 360° rotisserie spit turns meat smoothly for succulent roasted chicken",
                "Adjustable thermostat from 100°C to 250°C with 6-stage heating selector",
                "Includes enamel bake tray, wire rack, rotisserie fork, and crumb tray"
            ],
            "kw": ["5025", "otg", "rotisserie"]
        },
        {
            "model": "SA 5035 BLRC",
            "title": "GLEN SA 5035 BLRC Oven Toaster Griller (OTG) 35L (2100W)",
            "subcategory": "Oven Toaster Griller (OTG)",
            "specs": [
                {"label": "Capacity", "value": "35 Litres Medium-Large"},
                {"label": "Power Rating", "value": "2100 W"},
                {"label": "Features", "value": "Motorised Rotisserie + Turbo Convection"},
                {"label": "Warranty", "value": "2 Years Comprehensive"}
            ],
            "price": "₹11,655",
            "features": [
                "Spacious 35-Litre oven cavity accommodates 12-inch pizzas and multi-tier cake tins",
                "Dual upper and lower stainless steel heating elements with convection turbo blower",
                "Heavy-duty motorised rotisserie spit with skewer rods",
                "Tempered double-layer glass door ensures maximum thermal containment",
                "Internal illuminated chamber light lets you watch the crust rise"
            ],
            "kw": ["5035", "otg"]
        },
        {
            "model": "SA 5045 BLRC",
            "title": "GLEN SA 5045 BLRC Large Oven Toaster Griller (OTG) 45L (2000W)",
            "subcategory": "Oven Toaster Griller (OTG)",
            "specs": [
                {"label": "Capacity", "value": "45 Litres Large Capacity"},
                {"label": "Power Rating", "value": "2000 W"},
                {"label": "Features", "value": "Motorised Rotisserie + Convection Fan"},
                {"label": "Warranty", "value": "2 Years Comprehensive"}
            ],
            "price": "₹12,995",
            "features": [
                "Extra-large 45L cavity accommodates large family meals, turkeys, and party platters",
                "Convection technology ensures consistent, even temperature across all shelf heights",
                "Motorised rotisserie rotates whole birds continuously for crispy skin and juicy meat",
                "60-minute stay-on timer with auto-ring and auto-off safety function",
                "Complete accessory pack: Bake tray, Grill rack, Rotisserie handle, and Crumb tray"
            ],
            "kw": ["5045", "otg"]
        },
        {
            "model": "SA 3050 AFO",
            "title": "GLEN SA 3050 AFO Air Fryer Oven (OTG + Air Fryer) 25L (1800W)",
            "subcategory": "Oven Toaster Griller (OTG)",
            "specs": [
                {"label": "Capacity", "value": "25 Litres"},
                {"label": "Power Rating", "value": "1800 W"},
                {"label": "Function", "value": "Air Fryer + Convection Bake + Broil + Toast"},
                {"label": "Warranty", "value": "2 Years Comprehensive"}
            ],
            "price": "₹15,995",
            "features": [
                "Revolutionary 2-in-1 appliance combines the crisping speed of an Air Fryer with an OTG oven",
                "6 powerful heating elements paired with an ultra-high-speed cyclone convection fan",
                "Includes 3 specialized cooking trays: Air fry mesh basket, Wire rack, and Enamel bake pan",
                "Cook family-sized batches of fries, samosas, and roasted vegetables with up to 90% less oil",
                "Dual mechanical dial controls for time and temperature up to 230°C"
            ],
            "kw": ["3050 afo", "air fryer oven"]
        }
    ]
    
    for sa in sa_defs:
        cat_slug = "small-appliances"
        pid = f"small-appliances-{re.sub(r'[^a-z0-9]+', '-', sa['model'].lower()).strip('-')}"
        img_url, shop_price = find_best_image_url(sa["model"], sa["kw"], shopify_index)
        saved_img = save_image_from_url_or_crop(cat_slug, pid, img_url)
        
        rec = {
            "id": pid,
            "title": sa["title"],
            "category": "Small Appliances",
            "subcategory": sa["subcategory"],
            "brand": "GLEN APPLIANCES",
            "model": sa["model"],
            "tag": sa["subcategory"],
            "tagColor": TAG_COLORS["Small Appliances"],
            "image": saved_img,
            "price": sa["price"],
            "specs": sa["specs"],
            "features": sa["features"],
            "warranty": sa["specs"][-1]["value"],
            "dimensions": next((s["value"] for s in sa["specs"] if s["label"] == "Dimensions"), None),
            "status": "Published",
            "description": f"{sa['title']}. {' '.join(sa['features'][:3])} Backed by genuine GLEN manufacturer warranty: {sa['specs'][-1]['value']}.",
            "sourcePdf": "Glen-Small-Appliances-Folder-SEP-2026.pdf",
            "sourcePage": 1,
            "created_at": "2026-11-16 09:50:00",
            "updated_at": "2026-11-16 09:50:00"
        }
        new_records.append(rec)
    print(f"Processed {len(sa_defs)} Small Appliance models.")
    
    # =========================================================================
    # COMBINE ALL PRODUCTS
    # =========================================================================
    raw_combined = existing_products + new_records
    seen_ids = set()
    all_combined = []
    for p in raw_combined:
        if p["id"] not in seen_ids:
            seen_ids.add(p["id"])
            all_combined.append(p)
            
    print(f"Total products after addition (deduped): {len(all_combined)}")
    
    # Check counts by category
    cat_counts = {}
    for p in all_combined:
        cat_counts[p["category"]] = cat_counts.get(p["category"], 0) + 1
        
    print("=== FINAL COUNTS BY CATEGORY ===")
    ORDER = [
        "Chimneys",
        "Gas Stoves",
        "Hobs",
        "Geysers",
        "Sinks",
        "Ovens",
        "Microwaves",
        "Water Heaters",
        "Dishwashers",
        "Cooking Range",
        "Small Appliances"
    ]
    for c in ORDER:
        print(f"  {c}: {cat_counts.get(c, 0)} products")
        
    # Write to files
    PRODUCTS_JSON.write_text(json.dumps(all_combined, indent=2, ensure_ascii=False), encoding="utf-8")
    STOREFRONT_JSON.write_text(json.dumps(all_combined, indent=2, ensure_ascii=False), encoding="utf-8")
    DEFAULT_PRODUCTS_JSON.write_text(json.dumps(all_combined, indent=2, ensure_ascii=False), encoding="utf-8")
    print("Updated all JSON data stores.")
    
    # Sync SQLite
    con = sqlite3.connect(str(DB_PATH))
    cur = con.cursor()
    cur.execute("DELETE FROM products")
    for p in all_combined:
        cur.execute(
            """
            INSERT INTO products (
                id, title, category, subcategory, brand, model, tag, tag_color,
                image, price, specs, features, warranty, dimensions, status,
                description, source_pdf, source_page, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
            """,
            (
                p["id"],
                p["title"],
                p["category"],
                p["subcategory"],
                p.get("brand") or p.get("manufacturer") or "GLEN APPLIANCES",
                p["model"],
                p.get("tag") or p.get("subcategory"),
                p.get("tagColor") or TAG_COLORS.get(p["category"], "bg-primary text-on-primary"),
                p["image"],
                p.get("price", "Contact showroom for price"),
                json.dumps(p.get("specs", []), ensure_ascii=False),
                json.dumps(p.get("features", []), ensure_ascii=False),
                p.get("warranty"),
                p.get("dimensions"),
                p.get("status", "Published"),
                p.get("description"),
                p.get("sourcePdf"),
                p.get("sourcePage", 1)
            )
        )
    con.commit()
    db_count = cur.execute("SELECT count(*) FROM products").fetchone()[0]
    con.close()
    print(f"Database synced successfully: {db_count} total products in SQLite DB.")

if __name__ == "__main__":
    main()
