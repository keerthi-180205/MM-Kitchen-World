const MAX_SIDE = 1000;

/**
 * Downscale an uploaded image and re-encode it as WebP (keeps transparency) so it
 * stays small enough for localStorage. Falls back to the original data URL if the
 * browser can't decode/encode it.
 */
export function fileToOptimizedDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      const original = reader.result;
      const img = new Image();
      img.onerror = () => resolve(original);
      img.onload = () => {
        const scale = Math.min(1, MAX_SIDE / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
        const webp = canvas.toDataURL("image/webp", 0.9);
        resolve(webp.startsWith("data:image/webp") && webp.length < original.length ? webp : original);
      };
      img.src = original;
    };
    reader.readAsDataURL(file);
  });
}
