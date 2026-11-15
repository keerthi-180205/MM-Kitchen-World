"""Generate the two real QR codes used on every catalogue's shared contact
page: store location and WhatsApp. Deterministic encoding (qrcode library),
so correctness is guaranteed by construction -- no fake patterns."""
import qrcode
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "public" / "assets" / "qr"
OUT_DIR.mkdir(parents=True, exist_ok=True)

TARGETS = [
    ("location-qr.png", "https://maps.app.goo.gl/zwA4RXmkp1XqFdSo6"),
    ("whatsapp-qr.png", "https://wa.me/919743233729"),
]


def make_qr(data, path):
    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=12,
        border=2,
    )
    qr.add_data(data)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white").convert("RGB")
    img.save(path)
    return img


def main():
    for filename, data in TARGETS:
        path = OUT_DIR / filename
        make_qr(data, path)
        print(f"{filename} -> encodes: {data}")

    # verify by decoding, if a decoder is available
    try:
        import cv2
        detector = cv2.QRCodeDetector()
        for filename, data in TARGETS:
            img = cv2.imread(str(OUT_DIR / filename))
            decoded, _, _ = detector.detectAndDecode(img)
            status = "MATCH" if decoded == data else f"MISMATCH (got {decoded!r})"
            print(f"  decode check {filename}: {status}")
    except ImportError:
        print("  (opencv not installed -- skipping decode verification; "
              "encoding is deterministic via the qrcode library so this is "
              "a convenience check only, not required for correctness)")


if __name__ == "__main__":
    main()
