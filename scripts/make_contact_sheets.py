"""Build one QA contact-sheet image per category: a grid of every extracted
product photo with its model code printed underneath, for visual review
before anything ships (per the mandatory validation-pass requirement)."""
import json
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
PRODUCTS = json.loads((ROOT / "data" / "products.json").read_text(encoding="utf-8"))
OUT_DIR = ROOT / "public" / "assets" / "_qa"
OUT_DIR.mkdir(parents=True, exist_ok=True)

THUMB = 220
LABEL_H = 46
COLS = 5
PAD = 10

try:
    FONT = ImageFont.truetype("arial.ttf", 13)
except Exception:
    FONT = ImageFont.load_default()


def make_sheet(category, items):
    rows = (len(items) + COLS - 1) // COLS
    cell_w = THUMB + PAD
    cell_h = THUMB + LABEL_H + PAD
    sheet = Image.new("RGB", (cell_w * COLS + PAD, cell_h * rows + PAD), "white")
    draw = ImageDraw.Draw(sheet)
    for i, p in enumerate(items):
        col, row = i % COLS, i // COLS
        x0 = PAD + col * cell_w
        y0 = PAD + row * cell_h
        img_path = ROOT / "public" / p["image"]
        if not img_path.exists():
            img_path = img_path.with_suffix(".webp")
        try:
            im = Image.open(img_path).convert("RGBA")
            flat = Image.new("RGBA", im.size, "white")
            im = Image.alpha_composite(flat, im).convert("RGB")
            im.thumbnail((THUMB, THUMB))
            ox = x0 + (THUMB - im.width) // 2
            oy = y0 + (THUMB - im.height) // 2
            sheet.paste(im, (ox, oy))
        except Exception as e:
            draw.rectangle([x0, y0, x0 + THUMB, y0 + THUMB], outline="red")
            draw.text((x0 + 5, y0 + 5), f"ERR: {e}", fill="red", font=FONT)
        draw.rectangle([x0, y0, x0 + THUMB, y0 + THUMB], outline="#cccccc")
        label = f"{p['model']}\np.{p['sourcePage']}" + (" [AUTO]" if p.get("needsReview") else "")
        draw.text((x0 + 2, y0 + THUMB + 2), label, fill="black", font=FONT)
    out_file = OUT_DIR / f"contact-sheet-{category.lower().replace(' ', '-')}.png"
    sheet.save(out_file)
    print(f"{category}: {len(items)} products -> {out_file}")


def main():
    by_cat = {}
    for p in PRODUCTS:
        by_cat.setdefault(p["category"], []).append(p)
    for cat, items in by_cat.items():
        items.sort(key=lambda p: (p["subcategory"], p["model"]))
        make_sheet(cat, items)


if __name__ == "__main__":
    main()
