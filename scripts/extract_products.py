"""
GLEN catalogue extraction pipeline.

Reads data/GLEN-source-catalogue.pdf and, for the page ranges covering
Chimneys, Ovens, Microwaves, Dishwashers, Hobs and Cooktops/Gas Stoves/
Cooking Range, extracts:

  - the model-code "card" for every product (features, size/capacity/
    dimension line, warranty) using the catalogue's consistent template
    (a "KEY FEATURES" bold header followed by bullet lines, then the
    model code line, then a size/spec line, all contiguous in document
    text order)
  - the product's hero photo, by matching each card's vertical position
    on the page to the nearest embedded image's vertical position
    (empirically validated: sorting a page's model-code lines and its
    product-photo images by top-y and zipping them pairwise lines them
    up correctly, including on 5-card and hero-duplicated pages)

Subcategory + category for every known model code is assigned from a
hand-built lookup table (MODEL_INFO below), compiled directly from a
manual page-by-page read of the source PDF — this avoids fragile
heading-OCR/detection and guarantees every SKU is correctly classified
and never silently dropped or guessed.

Duplicate model codes (the PDF repeats a few hero SKUs as both a
feature-spread page and a spec-card page) are resolved by keeping the
occurrence with the richer feature list and logging the duplicate.
"""
import json
import re
import unicodedata
from collections import defaultdict
from pathlib import Path

import pymupdf

ROOT = Path(__file__).resolve().parent.parent
PDF_PATH = ROOT / "data" / "GLEN-source-catalogue.pdf"
IMAGES_DIR = ROOT / "public" / "assets" / "products"
DATA_OUT = ROOT / "data" / "products.json"
REPORT_OUT = ROOT / "data" / "validation-report.md"
RENDER_SCALE = 4.0  # ~288dpi crops, good for print-quality catalogue PDFs

MODEL_PREFIXES = ("CH", "BO", "MO", "CT", "CR", "BH", "DW")
MODEL_LINE_RE = re.compile(
    r"^(?:" + "|".join(MODEL_PREFIXES) + r")\s?\d{3,5}[A-Z0-9 +/.\-]*$"
)

CATEGORY_SLUGS = {
    "Chimneys": "chimneys",
    "Ovens": "ovens",
    "Microwaves": "microwaves",
    "Gas Stoves": "gas-stoves",
    "Hobs": "hobs",
    "Dishwashers": "dishwashers",
}

# ---------------------------------------------------------------------------
# Hand-built model -> (category, subcategory, page) lookup.
# Compiled from a full manual read of the source PDF's text (pages 9-79).
# Page numbers are 1-indexed PDF page numbers.
# ---------------------------------------------------------------------------
MODEL_INFO = {}


def reg(models, category, subcategory, page):
    for m in models:
        MODEL_INFO[normalize_model(m)] = {
            "category": category,
            "subcategory": subcategory,
            "page": page,
        }


def normalize_model(s: str) -> str:
    s = unicodedata.normalize("NFKC", s)
    return re.sub(r"\s+", " ", s.strip().upper())


# --- Chimneys -----------------------------------------------------------
reg(["CH 1000 BLDC AC BL IS", "CH 1022 BL MS IS", "CH 6052 BL MS IS",
     "CH 6071 BL MS IS"], "Chimneys", "Island Hood", 11)
reg(["CH 1010 IN BL"], "Chimneys", "Ceiling Hood", 12)
reg(["CH 6052 LCD HSR BLDC AC", "CH 6052 SLIM BL BLDC AC", "CH 6053 HSR BL BLDC AC",
     "CH 6061 LCD HSR BLDC AC", "CH 6065 HSR BL BLDC AC", "CH 6067 BL BLDC AC",
     "CH 6069 HSR BL BLDC AC", "CH 6071R BLDC BL AC", "CH 6073 HSR BL BLDC AC",
     "CH 6073 HSR MG BLDC AC", "CH 6074 BL BLDC AC", "CH 6074 MG BLDC AC",
     "CH 6076 HSR BL BLDC AC"], "Chimneys", "BLDC Chimneys", 14)
reg(["CH 6073 SX BL MS AC", "CH 6068 BL SMART AC", "CH 6052 DI BL AC",
     "CH 6052 HSR BL AC", "CH 6052 SLIM BL AC", "CH 6052 UC AC", "CH 6058 BL AC",
     "CH 6058 DI BL AC", "CH 6059 DI BL AC", "CH 6064 BL MS AC", "CH 6055 IHSR BL AC",
     "CH 6064 HSR BL AC", "CH 6080 HSR BL AC", "CH 6075 BL MS AC",
     "CH 6072 SX BL MS AC"], "Chimneys", "Auto Clean Chimneys", 18)
reg(["CH 6000 JU BL", "CH 6014 PB BL", "CH 6049 IN", "CH 6050 IN", "CH 6052 IN",
     "CH 6052 IN DX BL", "CH 6052 IN MS DX BL", "CH 6054 BL", "CH 6071 EX BL",
     "CH 6071 IN"], "Chimneys", "Easy Clean Chimneys", 21)
reg(["CH 6079 IN", "CH 6052 DF MS BF BL", "CH 6003 DF TS BF BL", "CH 6079 MS",
     "CH 6003 SS 60 BF LTW"], "Chimneys", "Duct Free Chimneys", 23)
reg(["CH 6090 POR BL"], "Chimneys", "Portable Chimney", 25)

# --- Ovens ----------------------------------------------------------------
reg(["BO 655 TOUCH AF+TURBO 90", "BO 651 MR+TURBO BLACK", "BO 653 TOUCH MR+TURBO BLACK",
     "BO 652 TOUCH MR+TURBO BLACK", "BO 654 TOUCH AF+TURBO", "BO 656",
     "BO 664 BL GAS", "BO 660 MR+TURBO BLACK", "BO 662 AF", "BO 661 TOUCH MR+TURBO",
     "BO 656 TURBO"], "Ovens", "Built-in Ovens", 29)

# --- Microwaves -------------------------------------------------------------
reg(["MO 674 CON BLACK", "MO 671", "MO 675", "MO 678", "MO 679"],
    "Microwaves", "Built-in Microwaves", 32)

# --- Dishwashers ------------------------------------------------------------
reg(["DW 7735 M"], "Dishwashers", "Semi Built-in", 34)
reg(["DW 5201 FS"], "Dishwashers", "Free-standing", 35)

# --- Hobs -------------------------------------------------------------------
reg(["BH 1073 XL ROCI HT DFT MG 77", "BH 1074 ROCI HT DFT MG 77",
     "BH 1094 XL ROCI HT DFT MG", "BH 1094 XL DFT HT 2TR MG", "BH 1074 DFT HT 2TR MG 77",
     "BH 1073 XL DFT HT TR MG75", "BH 1093 XL DFT HT 2TR MG", "BH 1073 DFT HT 2TR 77",
     "BH 1093 XL DFT HT 2TR", "BH 1074 DFT HT 2TR 77", "BH 1094 XL DFT HT 2TR"],
    "Hobs", "DFVS - Direct Flame Venturi System", 39)
reg(["BH 1094 XL DF HT 2TR", "BH 1093 XL DF HT 2TR", "BH 1074 DF HT 2TR 77",
     "BH 1073 DF HT 2TR 77", "BH 1074 DF HT MTR 70", "BH 1063 DF HT TR",
     "BH 1073 DF HT MTR 70", "BH 1074 SQ HT TDB 2TR MG 77", "BH 1073 XL SQ HT TDB TR MG 77",
     "BH 1094 XL SQ HT TDB 2TR MG", "BH 1064 RO HT TDB", "BH 1073 SQ HT TDB TR",
     "BH 1064 RO HT TDB MTR", "BH 1073 SQ HT TDB", "BH 1073 XL SQ HT TDB TR BL 77",
     "BH 1074 SQ HT TDB", "BH 1074 SQ HT TDB TR 77", "BH 1094 XL SQ HT TDB TR",
     "BH 1094 XL SQ HT TDB 2TR"], "Hobs", "DFVS - Direct Flame Venturi System", 43)
reg(["BH 1074 SQ HT DBBL TR MG 77", "BH 1073 SQ HT DBBL MTR MG 75",
     "BH 1094 SQ HT DBBL 2TR MG 90", "BH 1074 SQ HT DB 2TR 77", "BH 1022 SQ HT DB",
     "BH 1063 SQ HT DB TR", "BH 1065 X RO HT DB 65", "BH 1064 RO HT DB",
     "BH 1065 X SQ HT DB TR 65", "BH 1073 SQ HT DB", "BH 1073 SQ HT DB 70",
     "BH 1073 SQ HT DB TR", "BH 1073 SQ HT DB MTR", "BH 1073 XL SQ HT DB TR BL 77",
     "BH 1073 XL SQ HT DB 2MTR BL 77", "BH 1074 SQ HT DB", "BH 1074 SQ HT DB MTR",
     "BH 1074 X SQ HT DB TR 70", "BH 1074 SQ HT DB 2TR 77", "BH 1074 SQ HT DB TR 77",
     "BH 1093 XL SQ HT DB TR", "BH 1094 XL SQ HT DB TR", "BH 1063 SQ DB", "BH 1012 RO DB",
     "BH 1064 DLX DB", "BH 1073 SQ DB", "BH 1074 SQ DB TR 77", "BH 1094 XL SQ DB TR",
     "BH 1074 SQ DB", "BH 1094 SQ DB TR", "BH 1095 SQ DB TR"],
    "Hobs", "Forged / Double Brass Burners", 48)
reg(["BH 1073 SQ HT SS DB MTR 70", "BH 1061 DB TR SS", "BH 1074 SQ HT SS DB MTR 70"],
    "Hobs", "Stainless Steel Finish", 55)
reg(["BH 1073 TR GLASS", "BH 1065 TR GLASS"], "Hobs", "European Sealed Burners", 56)
reg(["BH 1014 IC 4Z", "BH 1015 IC 2Z", "BH 1017 IC 2Z", "BH 1016 IC 2Z"],
    "Hobs", "Built-in Induction Hobs", 57)
# NOTE: the page-57 hero banner labels this flagship "BH 1018 IC 2Z 73", but
# its actual full spec card on page 58 is printed as "BH 1018 IC 2Z" (no "73"
# suffix) -- a minor inconsistency in the source PDF itself. We keep the
# spec-card's exact printed text rather than inventing/merging a code.
reg(["BH 1018 IC 2Z"], "Hobs", "Built-in Induction Hobs", 58)
# Additional SKUs found by the extraction script that weren't in the initial
# manual read-through; verified against their own spec-card page text.
reg(["BH 1064 DF HT TR"], "Hobs", "Forged / Double Brass Burners", 44)
reg(["MO 674 BLACK"], "Microwaves", "Built-in Microwaves", 32)
reg(["BH 1014 HT IC 4Z", "BH 1015 HT IC 2Z", "BH 1017 HT IC 2Z", "BH 1016 HT IC 2Z T"],
    "Hobs", "Induction Hob Top", 59)

# --- Gas Stoves / Cooktops --------------------------------------------------
reg(["CT 1053 78 U TUFF TOP KNOB DT SS", "CT 1054 75 U TUFF TOP KNOB DT SS",
     "CT 1054 73 ULTRA TUFF DT SS", "CT 1053 77 ULTRA TUFF DT SS", "CT 1053 73 ULTRA TUFF SS",
     "CT 1053 77 ULTRA TUFF SS", "CT 1052 66 ULTRA TUFF SS", "CT 1054 73 ULTRA TUFF SS"],
    "Gas Stoves", "Ultra Tuff Stainless Steel", 62)
reg(["CT 1037 ULTRA SLIM MG 75", "CT 1038 SLIM CP BL BB MG", "CT 1044 SLIM CP BL BB MG",
     "CT 1045 ULTRA SLIM MG 75", "CT 1048 SLIM CP BL BB MG", "CT 1038 SLIM SQ BL FB",
     "CT 1048 SLIM SQ BL FB", "CT 1047 ULTRA SLIM BL", "CT 1035 ULTRA SLIM BL",
     "CT 1047 ULTRA SLIM AC", "CT 1035 ULTRA SLIM AC", "CT 1049 SQ GT FB"],
    "Gas Stoves", "Ultra Slim Glass", 64)
reg(["CT 1036 ULTRA SLIM TOP TN 77", "CT 1037 ULTRA SLIM TN 75", "CT 1045 ULTRA SLIM TN 75",
     "CT 1047 ULTRA SLIM TOP TN 77"], "Gas Stoves", "Top Knob Glass", 67)
reg(["CT 1022 GT BB BL HF CPS", "CT 1038 GT BB BL HF CPS", "CT 1044 GT BB BL HF CPS",
     "CT 1042 GT BB BL HF CPS"], "Gas Stoves", "Cooktops with Crown Pan Supports", 68)
reg(["CT 1032 GT HF BB DD BL", "CT 1021 GT FB HF", "CT 1038 GT FB DD BL",
     "CT 1033 GT XL FB DD BL", "CT 1041 GT FB BL", "CT 1043 GT HF BB DD BL", "CT 1042 GT FB"],
    "Gas Stoves", "Forged Brass Burner & Double Drip Tray", 69)
reg(["CT 1020 GT JM BB", "CT 1020 GT XL BB BL", "CT 1021 GT BB BL", "CT 1022 GT XL BB BL",
     "CT 1030 GT BB BL", "CT 1030 GT HF BB BL", "CT 1033 GT BB BL", "CT 1033 GT XL BB BL",
     "CT 1034 GT BB BL", "CT 1040 GT XL HF BB BL", "CT 1038 GT BB BL", "CT 1040 GT XL JU BB BL",
     "CT 1041 GT BB BL", "CT 1043 GT BB BL", "CT 1048 GT HF BB BL"],
    "Gas Stoves", "Glass Cooktop with Brass Burner", 71)
reg(["CT 1047 ULTRA SLIM DT SS"], "Gas Stoves", "Stainless Steel Cooktops", 74)
reg(["CT 1021 SS BB", "CT 1031 XL SS HF BB", "CT 1026 SS BB", "CT 1020 SS BB",
     "CT 1033 SS HF DT BB", "CT 1035 XL HF BB DT", "CT 1044 SS BB", "CT 1035 SS HF BB",
     "CT 1037 SS HF BB", "CT 1044 SS HF BB", "CT 1045 SS HF BB", "CT 1044 XL SS HF BB"],
    "Gas Stoves", "PNG Gas Stoves", 75)

# --- Cooking Range (distinct Gas Stoves subsection) -------------------------
reg(["CR 2011 SS TR", "CR 2012 PL TR CB AI", "CR 2014 DB AI"],
    "Gas Stoves", "Cooking Range", 79)

ALL_MODEL_KEYS = set(MODEL_INFO.keys())

# Page ranges to scan (1-indexed, inclusive)
PAGE_RANGES = [(9, 26), (27, 35), (37, 59), (61, 79)]

# Coarse page-range fallback classification, used only when a detected model
# code isn't in the precise MODEL_INFO table above (e.g. a SKU missed during
# the manual read-through). Nothing is ever dropped for being "unknown" --
# it just falls back to this coarser category/subcategory and is flagged in
# the validation report as auto-classified, for a manual spot-check.
FALLBACK_RANGES = [
    (9, 11, "Chimneys", "Island Hood"),
    (12, 12, "Chimneys", "Ceiling Hood"),
    (13, 16, "Chimneys", "BLDC Chimneys"),
    (17, 20, "Chimneys", "Auto Clean Chimneys"),
    (21, 22, "Chimneys", "Easy Clean Chimneys"),
    (23, 24, "Chimneys", "Duct Free Chimneys"),
    (25, 25, "Chimneys", "Portable Chimney"),
    (27, 30, "Ovens", "Built-in Ovens"),
    (31, 33, "Microwaves", "Built-in Microwaves"),
    (34, 35, "Dishwashers", "Dishwashers"),
    (37, 42, "Hobs", "DFVS - Direct Flame Venturi System"),
    (43, 47, "Hobs", "Forged / Double Brass Burners"),
    (48, 54, "Hobs", "Forged / Double Brass Burners"),
    (55, 55, "Hobs", "Stainless Steel Finish"),
    (56, 56, "Hobs", "European Sealed Burners"),
    (57, 58, "Hobs", "Built-in Induction Hobs"),
    (59, 59, "Hobs", "Induction Hob Top"),
    (61, 64, "Gas Stoves", "Ultra Tuff Stainless Steel"),
    (65, 66, "Gas Stoves", "Ultra Slim Glass"),
    (67, 67, "Gas Stoves", "Top Knob Glass"),
    (68, 68, "Gas Stoves", "Cooktops with Crown Pan Supports"),
    (69, 70, "Gas Stoves", "Forged Brass Burner & Double Drip Tray"),
    (71, 73, "Gas Stoves", "Glass Cooktop with Brass Burner"),
    (74, 74, "Gas Stoves", "Stainless Steel Cooktops"),
    (75, 77, "Gas Stoves", "PNG Gas Stoves"),
    (78, 79, "Gas Stoves", "Cooking Range"),
]


def fallback_classify(page_num):
    for lo, hi, cat, sub in FALLBACK_RANGES:
        if lo <= page_num <= hi:
            return cat, sub
    return None, None


def slugify(model: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", model.lower()).strip("-")


def is_model_line(text: str) -> bool:
    t = text.strip()
    if not (4 <= len(t) <= 40):
        return False
    return bool(MODEL_LINE_RE.match(t))


def extract_page(doc, page_num_1indexed, log):
    page = doc[page_num_1indexed - 1]
    d = page.get_text("dict")

    lines = []  # flat list of {text, bbox, size, bold}
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

    # --- geometric card assembly ---
    # Document/stream order does NOT reliably group each card's "KEY FEATURES"
    # header, its bullets, and its model-code line contiguously -- multi-
    # column layouts interleave cards, which silently drops cards if you walk
    # lines in stream order. Instead: find every "KEY FEATURES" header and
    # every model-code line independently, sort each list top-to-bottom by
    # y-position, and zip them pairwise. Empirically validated against
    # several pages (incl. 5-card and interleaved-column pages): this lines
    # up correctly even though a header's own bullets are commonly in a
    # different x-column than its paired model-code/image.
    headers = sorted((ln for ln in lines if ln["text"].upper().startswith("KEY FEATURES")),
                      key=lambda l: l["bbox"][1])
    # restrict to the catalogue's standard spec-card model-code style (size
    # ~8.5, GothamXNarrow-Book) -- excludes the large "Gotham-Bold" size-16
    # hero/flagship title repeated on section-opener pages, which would
    # otherwise pollute the sort-and-zip pairing and bump a real card out.
    model_lines = sorted((ln for ln in lines if is_model_line(ln["text"])
                           and 7.5 <= ln["size"] <= 9.5 and "XNarrow" in ln.get("font", "")),
                          key=lambda l: l["bbox"][1])

    if len(headers) != len(model_lines):
        log.append(f"page {page_num_1indexed}: {len(headers)} 'KEY FEATURES' "
                    f"headers vs {len(model_lines)} model-code lines (mismatch, "
                    f"zipping min count)")

    n = min(len(headers), len(model_lines))
    cards = []
    for i in range(n):
        header = headers[i]
        model_ln = model_lines[i]
        next_header_y0 = headers[i + 1]["bbox"][1] if i + 1 < len(headers) else 1e9
        features, extra_notes = [], []
        for ln in lines:
            t = ln["text"]
            x0, y0 = ln["bbox"][0], ln["bbox"][1]
            if not (header["bbox"][1] < y0 < next_header_y0):
                continue
            if abs(x0 - header["bbox"][0]) > 10:
                continue
            if t[0:1] == "•":
                features.append(re.sub(r"^[^\w]+", "", t).strip())
            elif t.startswith("-") and not ln["bold"]:
                extra_notes.append(t.lstrip("- 	"))

        spec_line = None
        best_dy = 1e9
        for ln in lines:
            t = ln["text"]
            if not t.startswith(("Size:", "Size :", "Capacity", "Product Dimensions", "Rated")):
                continue
            dy = ln["bbox"][1] - model_ln["bbox"][3]
            if 0 <= dy < 20 and abs(ln["bbox"][0] - model_ln["bbox"][0]) < 60 and dy < best_dy:
                spec_line = t
                best_dy = dy

        cards.append({
            "model_raw": model_ln["text"],
            "features": features,
            "bbox": model_ln["bbox"],
            "spec_line": spec_line,
            "extra_notes": extra_notes,
            "band": (header["bbox"][1] - 30, model_ln["bbox"][1] + 30),
        })

    # --- collect candidate product-photo images ---
    seen_xrefs = set()
    image_instances = []
    for img in page.get_images(full=True):
        xref = img[0]
        if xref in seen_xrefs:
            continue
        seen_xrefs.add(xref)
        for rect in page.get_image_rects(xref):
            # area-only filter for true tiny icons (eco-leaf, warranty-year
            # medallions etc, ~50x40pt); deliberately permissive otherwise,
            # since decorative badges (FFD/"Double Drip Tray" etc, ~100-
            # 130pt square) overlap in size with some real product photos
            # (ovens/microwaves render as small as ~100x100pt) -- those are
            # disambiguated below by per-card vertical banding + picking the
            # largest candidate in-band, not by a global size cutoff.
            if rect.get_area() < 5000:
                continue
            image_instances.append({"xref": xref, "rect": rect, "claimed": False})

    # --- match each card to the largest unclaimed image within its own
    # vertical band (the band between this card's "KEY FEATURES" header and
    # its model-code line -- empirically, a card's real hero photo always
    # falls in that band, while decorative badges/inset feature photos
    # elsewhere on the page fall outside every card's band and are ignored).
    cards_sorted = sorted(cards, key=lambda c: c["bbox"][1])
    for card in cards_sorted:
        lo, hi = card["band"]
        candidates = [im for im in image_instances
                      if not im["claimed"] and lo <= im["rect"].y0 + im["rect"].height / 2 <= hi]
        if not candidates:
            card["image_rect"] = None
            continue
        best = max(candidates, key=lambda im: im["rect"].get_area())
        best["claimed"] = True
        card["image_rect"] = best["rect"]

    n_images = len(image_instances)
    if len(cards_sorted) != n_images:
        log.append(f"page {page_num_1indexed}: {len(cards_sorted)} cards vs "
                    f"{n_images} candidate images (count mismatch; extras are "
                    f"likely decorative/explanatory inset photos, not product "
                    f"cards, and are expected to go unused)")

    return cards_sorted


def main():
    doc = pymupdf.open(str(PDF_PATH))
    log = []
    found = {}  # normalized model -> record
    duplicates = []

    for start, end in PAGE_RANGES:
        for p in range(start, end + 1):
            cards = extract_page(doc, p, log)
            for card in cards:
                norm = normalize_model(card["model_raw"])
                info = MODEL_INFO.get(norm)
                auto_classified = False
                if info is None:
                    fb_cat, fb_sub = fallback_classify(p)
                    if fb_cat is None:
                        log.append(f"page {p}: model '{card['model_raw']}' matched "
                                    f"the model-code pattern but page {p} has no "
                                    f"category mapping at all - skipped")
                        continue
                    info = {"category": fb_cat, "subcategory": fb_sub, "page": p}
                    auto_classified = True
                    log.append(f"page {p}: model '{card['model_raw']}' not in the "
                                f"precise MODEL_INFO table - auto-classified as "
                                f"{fb_cat} / {fb_sub} from page range, needs spot-check")
                richness = len(card["features"])
                record = {
                    "norm": norm,
                    "model_raw": card["model_raw"],
                    "features": card["features"],
                    "spec_line": card["spec_line"],
                    "extra_notes": card["extra_notes"],
                    "image_rect": card["image_rect"],
                    "page": p,
                    "category": info["category"],
                    "subcategory": info["subcategory"],
                    "auto_classified": auto_classified,
                }
                if norm in found:
                    duplicates.append((norm, found[norm]["page"], p))
                    if richness > len(found[norm]["features"]):
                        found[norm] = record
                else:
                    found[norm] = record

    missing = ALL_MODEL_KEYS - set(found.keys())
    for m in sorted(missing):
        log.append(f"MISSING: expected model '{m}' ({MODEL_INFO[m]['category']} / "
                    f"{MODEL_INFO[m]['subcategory']}, p.{MODEL_INFO[m]['page']}) "
                    f"was never matched to a card in the PDF text")

    # Manual image-rect override for the one page (p.12, Ceiling Hood) whose
    # hero photo and full spec card are combined on a single page, with the
    # photo positioned well outside the normal header->model band used
    # everywhere else. Verified directly against that page's own image list.
    IMAGE_OVERRIDES = {
        normalize_model("CH 1010 IN BL"): (12, pymupdf.Rect(36.0, 54.7, 451.3, 468.3)),
    }

    # --- build product.json records + crop images ---
    products = []
    counters = defaultdict(int)
    no_image = []
    for norm, rec in sorted(found.items(), key=lambda kv: (kv[1]["category"], kv[1]["page"])):
        cat = rec["category"]
        slug_cat = CATEGORY_SLUGS[cat]
        counters[cat] += 1
        pid = f"{slug_cat}-{slugify(rec['model_raw'])}"
        img_path = None
        image_rect = rec["image_rect"]
        image_page = rec["page"]
        if image_rect is None and norm in IMAGE_OVERRIDES:
            image_page, image_rect = IMAGE_OVERRIDES[norm]
            log.append(f"'{rec['model_raw']}': used manual image-rect override "
                        f"(page {image_page}) -- auto-matching failed because its "
                        f"hero photo and spec card share one page")
        if image_rect is not None:
            page = doc[image_page - 1]
            rect = image_rect
            pix = page.get_pixmap(clip=rect, matrix=pymupdf.Matrix(RENDER_SCALE, RENDER_SCALE))
            out_dir = IMAGES_DIR / slug_cat
            out_dir.mkdir(parents=True, exist_ok=True)
            out_file = out_dir / f"{pid}.png"
            pix.save(str(out_file))
            img_path = f"assets/products/{slug_cat}/{pid}.png"
        else:
            no_image.append(rec["model_raw"])

        warranty = next((f for f in rec["features"] if "warranty" in f.lower()), None)
        dims = next((f for f in rec["features"] if "dimensions" in f.lower()), None)
        features = [f for f in rec["features"]
                    if f is not warranty and "product dimensions" not in f.lower()]

        products.append({
            "id": pid,
            "title": rec["model_raw"],
            "model": rec["model_raw"],
            "manufacturer": "GLEN",
            "category": cat,
            "subcategory": rec["subcategory"],
            "features": features,
            "specLine": rec["spec_line"],
            "dimensions": dims,
            "warranty": warranty,
            "finishNotes": rec["extra_notes"],
            "price": "Contact showroom for price",
            "image": img_path,
            "sourcePdf": "GLEN-source-catalogue.pdf",
            "sourcePage": rec["page"],
            "status": "Published" if img_path else "Draft",
            "needsReview": rec.get("auto_classified", False),
        })

    # --- hero-only products: verified to have NO bulleted spec card anywhere
    # in the PDF (only a marketing hero spread) after exhaustive extraction.
    # Hand-authored directly from that hero page's own visible text (not
    # invented) + a crop of that page's own hero photo.
    hero_only = [{
        "model": "BO 655 TOUCH AF+TURBO 90",
        "category": "Ovens",
        "subcategory": "Built-in Ovens",
        "page": 28,
        "image_rect": pymupdf.Rect(14.2, 14.7, 520.2, 589.1),
        "features": [
            "90 Litre Large Capacity: spacious oven cavity provides ample room "
            "to cook large meals, multiple dishes, or family-sized portions with ease.",
            "Dual Fan Air Circulation: twin fans circulate hot air evenly throughout "
            "the oven for faster, uniform cooking and consistent results on every rack.",
            "Air Fryer Basket Included: specially designed basket delivers crisp, "
            "evenly cooked results with enhanced airflow.",
            "90 Ltr. Air Fryer Oven",
        ],
    }]
    for h in hero_only:
        slug_cat = CATEGORY_SLUGS[h["category"]]
        pid = f"{slug_cat}-{slugify(h['model'])}"
        page = doc[h["page"] - 1]
        pix = page.get_pixmap(clip=h["image_rect"], matrix=pymupdf.Matrix(RENDER_SCALE, RENDER_SCALE))
        out_dir = IMAGES_DIR / slug_cat
        out_dir.mkdir(parents=True, exist_ok=True)
        out_file = out_dir / f"{pid}.png"
        pix.save(str(out_file))
        counters[h["category"]] += 1
        products.append({
            "id": pid,
            "title": h["model"],
            "model": h["model"],
            "manufacturer": "GLEN",
            "category": h["category"],
            "subcategory": h["subcategory"],
            "features": h["features"],
            "specLine": None,
            "dimensions": None,
            "warranty": None,
            "finishNotes": [],
            "price": "Contact showroom for price",
            "image": f"assets/products/{slug_cat}/{pid}.png",
            "sourcePdf": "GLEN-source-catalogue.pdf",
            "sourcePage": h["page"],
            "status": "Published",
            "needsReview": False,
            "heroOnly": True,
        })
        log.append(f"'{h['model']}' has no bulleted spec card anywhere in the PDF "
                    f"(hero/marketing spread only, page {h['page']}) -- hand-authored "
                    f"from that page's own visible hero text; no warranty/dimensions "
                    f"given in source, left blank rather than invented.")

    DATA_OUT.write_text(json.dumps(products, indent=2, ensure_ascii=False), encoding="utf-8")

    report = ["# GLEN catalogue extraction — validation report\n"]
    report.append(f"Total products extracted: **{len(products)}**\n")
    report.append("## Counts by category\n")
    for cat, slug in CATEGORY_SLUGS.items():
        report.append(f"- {cat}: {counters.get(cat, 0)}")
    report.append("\n## Duplicate model codes encountered (richer occurrence kept)\n")
    if duplicates:
        for norm, p1, p2 in duplicates:
            report.append(f"- `{norm}` seen on page {p1} and page {p2}")
    else:
        report.append("- none")
    report.append("\n## Products with NO image matched (excluded from Published, status=Draft)\n")
    if no_image:
        for m in no_image:
            report.append(f"- {m}")
    else:
        report.append("- none")
    report.append("\n## Expected-but-missing models (in MODEL_INFO, never matched in PDF text)\n")
    missing_lines = [l for l in log if l.startswith("MISSING")]
    report.append("\n".join(f"- {l}" for l in missing_lines) or "- none")
    report.append("\n## Other extraction warnings\n")
    other = [l for l in log if not l.startswith("MISSING")]
    report.append("\n".join(f"- {l}" for l in other) or "- none")

    REPORT_OUT.write_text("\n".join(report), encoding="utf-8")

    print(f"Extracted {len(products)} products.")
    print(f"Duplicates resolved: {len(duplicates)}")
    print(f"No image matched: {len(no_image)}")
    print(f"Missing (expected but not found): {len(missing)}")
    print(f"Other warnings: {len(other)}")
    doc.close()


if __name__ == "__main__":
    main()
