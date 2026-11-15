import cv2
import numpy as np
from PIL import Image
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

sr = cv2.dnn_superres.DnnSuperResImpl_create()
sr.readModel(str(ROOT / "data/models/ESPCN_x4.pb"))
sr.setModel("espcn", 4)

def clean_enhance_image(src_path, dst_path):
    # Load image
    pil_img = Image.open(src_path).convert("RGB")
    rgb = np.array(pil_img)
    h, w = rgb.shape[:2]

    # Detect catalogue panel background: floodfill from corners
    # The panel is typically near white or cream (~240-255)
    bg_mask = np.zeros((h + 2, w + 2), np.uint8)
    diff = (16, 16, 16)

    # Sample corners and outer perimeter
    sample_points = [
        (0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1),
        (w // 2, 0), (w // 2, h - 1), (0, h // 2), (w - 1, h // 2),
        (5, 5), (w - 6, 5), (5, h - 6), (w - 6, h - 6)
    ]

    fill_img = rgb.copy()
    for sx, sy in sample_points:
        if 0 <= sx < w and 0 <= sy < h:
            color = rgb[sy, sx]
            if np.mean(color) > 220:  # Light background / cream / white
                m = np.zeros((h + 2, w + 2), np.uint8)
                cv2.floodFill(fill_img, m, (sx, sy), (255, 255, 255), diff, diff, cv2.FLOODFILL_MASK_ONLY | (255 << 8))
                bg_mask = cv2.bitwise_or(bg_mask, m)

    # 1 where product is, 0 where background is
    prod_mask = 255 - bg_mask[1:h + 1, 1:w + 1]

    # Crop tightly to the product bounding box with padding
    ys, xs = np.where(prod_mask > 50)
    if len(ys) > 0:
        pad = 6
        y0, y1 = max(ys.min() - pad, 0), min(ys.max() + pad, h)
        x0, x1 = max(xs.min() - pad, 0), min(xs.max() + pad, w)
        rgb = rgb[y0:y1, x0:x1]
        prod_mask = prod_mask[y0:y1, x0:x1]
    
    # Bilateral filter on RGB to remove JPEG compression noise while preserving razor-sharp edges
    bgr = cv2.cvtColor(rgb, cv2.COLOR_RGB2BGR)
    denoised = cv2.bilateralFilter(bgr, d=7, sigmaColor=40, sigmaSpace=40)

    # Super-resolution 4x upscaling using ESPCN neural net
    upscaled = sr.upsample(denoised)

    # Smart unsharp mask: emphasize micro-contrast on appliance controls and edges
    gaussian = cv2.GaussianBlur(upscaled, (0, 0), 2.0)
    sharp = cv2.addWeighted(upscaled, 1.45, gaussian, -0.45, 0)

    # Upscale alpha mask with smooth anti-aliased edge
    up_h, up_w = sharp.shape[:2]
    alpha_up = cv2.resize(prod_mask, (up_w, up_h), interpolation=cv2.INTER_LINEAR)
    alpha_up = cv2.GaussianBlur(alpha_up, (3, 3), 0.8)

    # Combine to RGBA
    sharp_rgb = cv2.cvtColor(sharp, cv2.COLOR_BGR2RGB)
    rgba = np.dstack([sharp_rgb, alpha_up])

    dst_path.parent.mkdir(parents=True, exist_ok=True)
    Image.fromarray(rgba, "RGBA").save(dst_path, "WEBP", quality=95, method=6)
    print(f"Processed: {src_path.name} -> {dst_path.name} ({up_w}x{up_h})")

if __name__ == "__main__":
    test_files = [
        "data/product-images-original/gas-stoves/gas-stoves-cr-2011-ss-tr.png",
        "data/product-images-original/chimneys/chimneys-ch-6052-di-bl-ac.png",
        "data/product-images-original/ovens/ovens-bo-654-touch-af-turbo.png",
        "data/product-images-original/hobs/hobs-bh-1018-ic-2z.png"
    ]
    for tf in test_files:
        src = ROOT / tf
        dst = ROOT / "data/test_enhanced" / f"{src.stem}.webp"
        if src.exists():
            clean_enhance_image(src, dst)

