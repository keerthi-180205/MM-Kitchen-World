"""Generate the 5 MM Kitchen World / GLEN downloadable catalogue PDFs from
the verified data/products.json, using the site's own design tokens
(mm_kitchen_world/DESIGN.md) and the GLEN source PDF's own page 80 as the
contact-page reference, plus the two generated QR codes.

Catalogues:
  1. Chimney Catalogue
  2. Oven & Microwave Catalogue (Ovens + Microwaves combined)
  3. Gas Stove Catalogue (Cooktops, then a separately-headed Cooking Range section)
  4. Hob Catalogue
  5. Dishwasher Catalogue

Every catalogue shares the same cover-page style and the same final
contact page (business info + both QR codes).
"""
import json
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (BaseDocTemplate, Frame, Image, KeepTogether,
                                 NextPageTemplate, PageBreak, PageTemplate,
                                 Paragraph, Spacer, Table, TableStyle)

ROOT = Path(__file__).resolve().parent.parent
# Use the already-cleaned storefront dataset (warranty/dimensions prefixes
# stripped, specs parsed into label/value pairs) rather than the raw
# extraction output, so the catalogue text matches what the website shows
# and doesn't duplicate "Warranty:"/"Product Dimensions..." prefixes.
PRODUCTS = json.loads((ROOT / "data" / "storefront-products.json").read_text(encoding="utf-8"))
OUT_DIR = ROOT / "public" / "catalogues"
OUT_DIR.mkdir(parents=True, exist_ok=True)

LOCATION_QR = ROOT / "public" / "assets" / "qr" / "location-qr.png"
WHATSAPP_QR = ROOT / "public" / "assets" / "qr" / "whatsapp-qr.png"

# ---- design tokens (from mm_kitchen_world/DESIGN.md) -----------------------
PRIMARY = colors.HexColor("#0878E8")
DEEP_BLUE = colors.HexColor("#064A8E")
CANVAS_BG = colors.HexColor("#FAF7F0")
CHARCOAL = colors.HexColor("#202938")
SLATE = colors.HexColor("#414753")
BORDER = colors.HexColor("#E2E8F0")
WHATSAPP_GREEN = colors.HexColor("#25D366")
WHITE = colors.white

BUSINESS = {
    "name": "MM KITCHEN WORLD",
    "subtitle": "GLEN Exclusive Store",
    "address": "No. MIG-45, KHB Colony, 2nd Stage, near Pavithra Paradise, opposite IndusInd Bank, Basaveshwara Nagar, Bangalore - 560079",
    "phone1": "+91 97432 33729",
    "phone2": "+91 96630 78780",
    "gstin": "29BYFPK5802C1ZM",
}

PAGE_W, PAGE_H = A4
MARGIN = 18 * mm

CATALOGUES = [
    {
        "key": "chimney",
        "title": "Chimney Catalogue",
        "filename": "MM-Kitchen-World-GLEN-Chimney-Catalogue.pdf",
        "categories": ["Chimneys"],
    },
    {
        "key": "oven-microwave",
        "title": "Oven & Microwave Catalogue",
        "filename": "MM-Kitchen-World-GLEN-Oven-Microwave-Catalogue.pdf",
        "categories": ["Ovens", "Microwaves"],
    },
    {
        "key": "gas-stove",
        "title": "Gas Stove Catalogue",
        "filename": "MM-Kitchen-World-GLEN-Gas-Stove-Catalogue.pdf",
        "categories": ["Gas Stoves"],
    },
    {
        "key": "hob",
        "title": "Hob Catalogue",
        "filename": "MM-Kitchen-World-GLEN-Hob-Catalogue.pdf",
        "categories": ["Hobs"],
    },
    {
        "key": "dishwasher",
        "title": "Dishwasher Catalogue",
        "filename": "MM-Kitchen-World-GLEN-Dishwasher-Catalogue.pdf",
        "categories": ["Dishwashers"],
    },
]

styles = {
    "cover_title": ParagraphStyle("cover_title", fontName="Helvetica-Bold", fontSize=34,
                                   leading=38, textColor=WHITE),
    "cover_sub": ParagraphStyle("cover_sub", fontName="Helvetica", fontSize=13,
                                 leading=18, textColor=WHITE),
    "section_heading": ParagraphStyle("section_heading", fontName="Helvetica-Bold",
                                       fontSize=15, leading=18, textColor=DEEP_BLUE,
                                       spaceBefore=4, spaceAfter=8),
    "model": ParagraphStyle("model", fontName="Helvetica-Bold", fontSize=13,
                             leading=16, textColor=CHARCOAL),
    "subcat": ParagraphStyle("subcat", fontName="Helvetica", fontSize=8.5,
                              leading=11, textColor=PRIMARY),
    "body": ParagraphStyle("body", fontName="Helvetica", fontSize=8.5,
                            leading=12, textColor=SLATE),
    "feature": ParagraphStyle("feature", fontName="Helvetica", fontSize=8,
                               leading=11, textColor=CHARCOAL, bulletIndent=0,
                               leftIndent=10),
    "small_label": ParagraphStyle("small_label", fontName="Helvetica-Bold", fontSize=7.5,
                                   leading=10, textColor=DEEP_BLUE),
    "contact_text": ParagraphStyle("contact_text", fontName="Helvetica", fontSize=10.5,
                                    leading=15, textColor=CHARCOAL),
}


# ---- cover / contact page canvas painters ----------------------------------

def draw_cover(canvas, doc, title, count):
    canvas.saveState()
    canvas.setFillColor(DEEP_BLUE)
    canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    canvas.setFillColor(PRIMARY)
    canvas.rect(0, PAGE_H - 140 * mm, PAGE_W, 140 * mm, fill=1, stroke=0)

    canvas.setFillColor(WHITE)
    canvas.setFont("Helvetica-Bold", 12)
    canvas.drawString(MARGIN, PAGE_H - 30 * mm, "MM KITCHEN WORLD")
    canvas.setFont("Helvetica", 9)
    canvas.drawString(MARGIN, PAGE_H - 36 * mm, "GLEN Exclusive Store, Bangalore")

    canvas.setFont("Helvetica-Bold", 9)
    canvas.drawRightString(PAGE_W - MARGIN, PAGE_H - 30 * mm, "GLEN")
    canvas.setFont("Helvetica", 8)
    canvas.drawRightString(PAGE_W - MARGIN, PAGE_H - 36 * mm, "Made Better in Glen")

    canvas.setFont("Helvetica-Bold", 36)
    canvas.drawString(MARGIN, PAGE_H - 80 * mm, title)
    canvas.setFont("Helvetica", 13)
    canvas.drawString(MARGIN, PAGE_H - 92 * mm, f"{count} genuine GLEN products, sourced directly")
    canvas.drawString(MARGIN, PAGE_H - 99 * mm, "from the manufacturer catalogue.")

    canvas.setFillColor(CANVAS_BG)
    canvas.setFont("Helvetica-Bold", 11)
    canvas.drawString(MARGIN, 40 * mm, "MM Kitchen World — Glen Exclusive Store")
    canvas.setFont("Helvetica", 9)
    canvas.drawString(MARGIN, 34 * mm, BUSINESS["address"])
    canvas.drawString(MARGIN, 29 * mm, f"{BUSINESS['phone1']}  ·  {BUSINESS['phone2']}")
    canvas.restoreState()


def draw_contact_page(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(CANVAS_BG)
    canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)

    # Top Header Banner
    header_h = 38 * mm
    canvas.setFillColor(DEEP_BLUE)
    canvas.rect(0, PAGE_H - header_h, PAGE_W, header_h, fill=1, stroke=0)
    canvas.setFillColor(WHITE)
    canvas.setFont("Helvetica-Bold", 20)
    canvas.drawCentredString(PAGE_W / 2, PAGE_H - 21 * mm, "Visit MM Kitchen World")
    canvas.setFont("Helvetica", 11)
    canvas.drawCentredString(PAGE_W / 2, PAGE_H - 29 * mm, "GLEN Exclusive Store · Bangalore")

    # Central Contact Card Container
    card_w = PAGE_W - 2 * MARGIN
    card_x = MARGIN
    card_top = PAGE_H - header_h - 14 * mm
    card_h = 105 * mm

    # Card background panel
    canvas.setFillColor(WHITE)
    canvas.roundRect(card_x, card_top - card_h, card_w, card_h, 4 * mm, fill=1, stroke=0)
    canvas.setStrokeColor(BORDER)
    canvas.setLineWidth(1)
    canvas.roundRect(card_x, card_top - card_h, card_w, card_h, 4 * mm, fill=0, stroke=1)

    # Store Name & Subtitle
    y = card_top - 14 * mm
    canvas.setFillColor(DEEP_BLUE)
    canvas.setFont("Helvetica-Bold", 16)
    canvas.drawCentredString(PAGE_W / 2, y, "MM KITCHEN WORLD")
    
    y -= 7 * mm
    canvas.setFillColor(PRIMARY)
    canvas.setFont("Helvetica-Bold", 11.5)
    canvas.drawCentredString(PAGE_W / 2, y, "GLEN Exclusive Store")

    # Divider line
    y -= 7 * mm
    canvas.setStrokeColor(BORDER)
    canvas.line(PAGE_W / 2 - 40 * mm, y, PAGE_W / 2 + 40 * mm, y)

    # Address block (properly wrapped into clean, balanced lines)
    y -= 8 * mm
    canvas.setFillColor(CHARCOAL)
    canvas.setFont("Helvetica", 10)
    addr_line1 = "No. MIG-45, KHB Colony, 2nd Stage,"
    addr_line2 = "near Pavithra Paradise, opposite IndusInd Bank,"
    addr_line3 = "Basaveshwara Nagar, Bangalore - 560079"
    canvas.drawCentredString(PAGE_W / 2, y, addr_line1)
    y -= 5.5 * mm
    canvas.drawCentredString(PAGE_W / 2, y, addr_line2)
    y -= 5.5 * mm
    canvas.drawCentredString(PAGE_W / 2, y, addr_line3)

    # Enquiry phone number
    y -= 9 * mm
    canvas.setFillColor(DEEP_BLUE)
    canvas.setFont("Helvetica-Bold", 11.5)
    canvas.drawCentredString(PAGE_W / 2, y, "Enquiry: +91 97432 33729")

    # Secondary phone & GSTIN subtle note
    y -= 6.5 * mm
    canvas.setFillColor(SLATE)
    canvas.setFont("Helvetica", 8.5)
    canvas.drawCentredString(PAGE_W / 2, y, "Alternate: +91 96630 78780   ·   GSTIN: 29BYFPK5802C1ZM")

    # QR Codes Section (symmetrically centered with clean white badge cards)
    qr_size = 40 * mm
    qr_card_w = qr_size + 12 * mm
    qr_card_h = qr_size + 20 * mm
    qr_card_y = 26 * mm
    
    gap = 14 * mm
    total_qr_w = 2 * qr_card_w + gap
    card1_x = (PAGE_W - total_qr_w) / 2
    card2_x = card1_x + qr_card_w + gap

    # Location QR Card
    canvas.setFillColor(WHITE)
    canvas.roundRect(card1_x, qr_card_y, qr_card_w, qr_card_h, 3 * mm, fill=1, stroke=0)
    canvas.setStrokeColor(BORDER)
    canvas.setLineWidth(1)
    canvas.roundRect(card1_x, qr_card_y, qr_card_w, qr_card_h, 3 * mm, fill=0, stroke=1)
    
    img1_x = card1_x + (qr_card_w - qr_size) / 2
    img1_y = qr_card_y + 13 * mm
    canvas.drawImage(ImageReader(str(LOCATION_QR)), img1_x, img1_y, qr_size, qr_size)
    canvas.setFillColor(DEEP_BLUE)
    canvas.setFont("Helvetica-Bold", 9)
    canvas.drawCentredString(card1_x + qr_card_w / 2, qr_card_y + 5.5 * mm, "Scan for Store Location")

    # WhatsApp QR Card
    canvas.setFillColor(WHITE)
    canvas.roundRect(card2_x, qr_card_y, qr_card_w, qr_card_h, 3 * mm, fill=1, stroke=0)
    canvas.setStrokeColor(BORDER)
    canvas.roundRect(card2_x, qr_card_y, qr_card_w, qr_card_h, 3 * mm, fill=0, stroke=1)
    
    img2_x = card2_x + (qr_card_w - qr_size) / 2
    img2_y = qr_card_y + 13 * mm
    canvas.drawImage(ImageReader(str(WHATSAPP_QR)), img2_x, img2_y, qr_size, qr_size)
    canvas.setFillColor(colors.HexColor("#128C7E"))
    canvas.setFont("Helvetica-Bold", 9)
    canvas.drawCentredString(card2_x + qr_card_w / 2, qr_card_y + 5.5 * mm, "Scan to Enquire")

    # Footer note at very bottom
    canvas.setFillColor(SLATE)
    canvas.setFont("Helvetica", 7.5)
    canvas.drawCentredString(PAGE_W / 2, 12 * mm, "MM Kitchen World · Authorised GLEN Exclusive Partner · Basaveshwara Nagar, Bangalore")

    canvas.restoreState()

def blank_painter(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(colors.white)
    canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    canvas.setFillColor(SLATE)
    canvas.setFont("Helvetica", 7.5)
    canvas.drawRightString(PAGE_W - MARGIN, 10 * mm, "MM Kitchen World · GLEN Exclusive Store")
    canvas.drawString(MARGIN, 10 * mm, f"Page {doc.page}")
    canvas.restoreState()


# ---- product card flowable --------------------------------------------------

def product_card(p):
    img_path = ROOT / "public" / p["image"]
    if not img_path.exists():
        img_path = img_path.with_suffix(".webp")
    try:
        img = Image(str(img_path), width=42 * mm, height=42 * mm, kind="proportional")
    except Exception:
        img = Spacer(42 * mm, 42 * mm)

    lines = [Paragraph(p["model"], styles["model"]),
             Paragraph(f"GLEN &middot; {p['subcategory']}", styles["subcat"])]

    specs = p.get("specs") or []
    if specs:
        lines.append(Spacer(1, 3))
        spec_text = "&nbsp;&nbsp;|&nbsp;&nbsp;".join(
            f"<b>{s['label']}:</b> {s['value']}" for s in specs)
        lines.append(Paragraph(spec_text, styles["body"]))

    feats = p.get("features") or []
    if feats:
        lines.append(Spacer(1, 4))
        for f in feats[:8]:
            lines.append(Paragraph(f"&#8226; {f}", styles["feature"]))

    lines.append(Spacer(1, 4))
    lines.append(Paragraph("Price: Contact showroom for price", styles["small_label"]))

    detail_table = Table([[c] for c in lines], colWidths=[122 * mm])
    detail_table.setStyle(TableStyle([
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))

    card = Table([[img, detail_table]], colWidths=[46 * mm, 124 * mm])
    card.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (0, 0), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ("BOX", (0, 0), (-1, -1), 0.6, BORDER),
        ("INNERPADDING", (0, 0), (-1, -1), 6),
        ("LEFTPADDING", (1, 0), (1, 0), 10),
        ("RIGHTPADDING", (0, 0), (-1, -1), 10),
    ]))
    return KeepTogether([card, Spacer(1, 5 * mm)])


def section_heading(text, count):
    return Paragraph(f"{text} <font color='#64748B' size=10>({count})</font>",
                      styles["section_heading"])


# ---- build one catalogue -----------------------------------------------------

def build_catalogue(cfg):
    items = [p for p in PRODUCTS if p["category"] in cfg["categories"]]
    # Gas Stoves: regular cooktops first, Cooking Range last as its own
    # clearly divided section -- never interleaved with plain cooktop listings.
    if cfg["key"] == "gas-stove":
        main = [p for p in items if p["subcategory"] != "Cooking Range"]
        cooking_range = [p for p in items if p["subcategory"] == "Cooking Range"]
        items = main + cooking_range

    out_path = OUT_DIR / cfg["filename"]
    doc = BaseDocTemplate(str(out_path), pagesize=A4,
                           leftMargin=MARGIN, rightMargin=MARGIN,
                           topMargin=MARGIN, bottomMargin=16 * mm,
                           title=f"{cfg['title']} — MM Kitchen World (GLEN)")

    content_frame = Frame(MARGIN, 16 * mm, PAGE_W - 2 * MARGIN,
                           PAGE_H - MARGIN - 16 * mm, id="content")
    full_frame = Frame(0, 0, PAGE_W, PAGE_H, id="full", leftPadding=0, rightPadding=0,
                        topPadding=0, bottomPadding=0)

    def cover_painter(canvas, d):
        draw_cover(canvas, d, cfg["title"], len(items))

    doc.addPageTemplates([
        PageTemplate(id="Cover", frames=[full_frame], onPage=cover_painter),
        PageTemplate(id="Content", frames=[content_frame], onPage=blank_painter),
        PageTemplate(id="Contact", frames=[full_frame], onPage=draw_contact_page),
    ])

    story = [NextPageTemplate("Content"), PageBreak()]

    current_sub = None
    seen_cooking_range_header = False
    for p in items:
        if cfg["key"] == "gas-stove" and p["subcategory"] == "Cooking Range" and not seen_cooking_range_header:
            seen_cooking_range_header = True
            story.append(PageBreak())
            story.append(Paragraph(
                "Cooking Range &mdash; a distinct GLEN product family (gas hob + oven combo units), "
                "shown separately from the regular Cooktops listed above.",
                styles["body"]))
            story.append(Spacer(1, 4 * mm))
            current_sub = None
        if p["subcategory"] != current_sub:
            current_sub = p["subcategory"]
            story.append(section_heading(current_sub,
                         sum(1 for x in items if x["subcategory"] == current_sub)))
        story.append(product_card(p))

    story.append(NextPageTemplate("Contact"))
    story.append(PageBreak())
    story.append(Spacer(1, 1))  # contact page body is fully canvas-drawn

    doc.build(story)
    return out_path, len(items)


def main():
    for cfg in CATALOGUES:
        path, n = build_catalogue(cfg)
        print(f"{cfg['title']}: {n} products -> {path}")


if __name__ == "__main__":
    main()
