"""Structural QA pass across every page of all 5 generated catalogue PDFs:
blank pages, duplicate consecutive pages, text clipped outside the page
bounds, and a cross-catalogue model-number duplicate check."""
import hashlib
import json
from collections import defaultdict
from pathlib import Path

import pymupdf

ROOT = Path(__file__).resolve().parent.parent
CAT_DIR = ROOT / "public" / "catalogues"

FILES = [
    "MM-Kitchen-World-GLEN-Chimney-Catalogue.pdf",
    "MM-Kitchen-World-GLEN-Oven-Microwave-Catalogue.pdf",
    "MM-Kitchen-World-GLEN-Gas-Stove-Catalogue.pdf",
    "MM-Kitchen-World-GLEN-Hob-Catalogue.pdf",
    "MM-Kitchen-World-GLEN-Dishwasher-Catalogue.pdf",
]

all_models_by_file = {}
problems = []

for fname in FILES:
    path = CAT_DIR / fname
    doc = pymupdf.open(str(path))
    prev_hash = None
    file_models = []
    for i, page in enumerate(doc):
        text = page.get_text().strip()
        images = page.get_images(full=True)
        h = hashlib.md5(text.encode("utf-8")).hexdigest()

        # blank page check (contact page / cover are canvas-drawn, so they DO
        # have drawn content but little/no extractable text -- only flag a
        # page that is blank in BOTH text and images, which would be a real bug)
        if not text and not images and 0 < i < doc.page_count - 1:
            problems.append(f"{fname} p.{i+1}: BLANK (no text, no images)")

        # duplicate consecutive page check (skip blank-text pages like cover/contact)
        if text and h == prev_hash:
            problems.append(f"{fname} p.{i+1}: DUPLICATE of previous page (identical text)")
        prev_hash = h if text else prev_hash

        # text-clipped-outside-page-bounds check
        pr = page.rect
        for block in page.get_text("dict")["blocks"]:
            if block.get("type") != 0:
                continue
            for line in block["lines"]:
                bbox = line["bbox"]
                if bbox[0] < -2 or bbox[1] < -2 or bbox[2] > pr.width + 2 or bbox[3] > pr.height + 2:
                    txt = "".join(s["text"] for s in line["spans"])[:40]
                    problems.append(f"{fname} p.{i+1}: text outside page bounds: {bbox} {txt!r}")

        # collect model codes on this page (bold H1-style "model" paragraphs
        # are size ~13 Helvetica-Bold per our generator's styles['model']).
        # Only product content pages (between cover and contact page) contain models.
        # Exclude brand/store headings (e.g. MM KITCHEN WORLD) that appear on contact/cover pages.
        if 0 < i < doc.page_count - 1:
            for block in page.get_text("dict")["blocks"]:
                if block.get("type") != 0:
                    continue
                for line in block["lines"]:
                    for span in line["spans"]:
                        if "Bold" in span["font"] and 12.5 <= span["size"] <= 13.5:
                            txt = span["text"].strip()
                            if txt and txt not in {"MM KITCHEN WORLD", "GLEN", "GLEN Exclusive Store"}:
                                file_models.append(txt)
    all_models_by_file[fname] = file_models
    doc.close()
    print(f"{fname}: {doc.page_count if False else ''}")

print("\n=== Per-file page/product counts ===")
total_models = []
for fname, models in all_models_by_file.items():
    print(f"{fname}: {len(models)} model headings found")
    total_models.extend((m, fname) for m in models)

print("\n=== Cross-catalogue duplicate check ===")
by_model = defaultdict(list)
for m, f in total_models:
    by_model[m].append(f)
cross_dupes = {m: fs for m, fs in by_model.items() if len(set(fs)) > 1}
if cross_dupes:
    for m, fs in cross_dupes.items():
        problems.append(f"MODEL '{m}' appears in multiple catalogues: {set(fs)}")
else:
    print("No model number appears in more than one catalogue PDF.")

within_file_dupes = {}
for fname, models in all_models_by_file.items():
    seen = {}
    for m in models:
        seen[m] = seen.get(m, 0) + 1
    dupes = {m: c for m, c in seen.items() if c > 1}
    if dupes:
        within_file_dupes[fname] = dupes
        for m, c in dupes.items():
            problems.append(f"{fname}: model '{m}' appears {c} times WITHIN the same catalogue")

print("\n=== PROBLEMS FOUND ===")
if problems:
    for p in problems:
        print(" -", p)
else:
    print("None.")

print(f"\nTotal problems: {len(problems)}")
