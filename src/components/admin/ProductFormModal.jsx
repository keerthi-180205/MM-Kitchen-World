import { useEffect, useMemo, useState } from "react";
import Icon from "../Icon";
import ProductCard from "../storefront/ProductCard";
import { assetUrl } from "../../constants";
import { fileToOptimizedDataUrl } from "../../utils/image";
import { IMAGE_PRESETS, isDuplicateModel, uploadImage } from "../../store/productsStore";

const CATEGORIES = ["Chimneys", "Ovens", "Microwaves", "Gas Stoves", "Hobs", "Dishwashers"];
const BADGE_OPTIONS = ["New Arrival", "Bestseller", "Flagship", "Showroom Pick", "Special Offer"];
const KNOWN_BADGE_COLORS = {
  Bestseller: "bg-primary text-white",
  "New Arrival": "bg-secondary text-white",
  Flagship: "bg-inverse-surface text-white",
  "Showroom Pick": "bg-surface-container-high text-primary",
  "Special Offer": "bg-rose-600 text-white",
};
const DEFAULT_PRICE = "Contact showroom for price";

const input =
  "w-full h-11 px-3.5 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition";
const textarea =
  "w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition";

// Suggested spec labels per category (values are left for the vendor to fill in).
const SPEC_LABELS = {
  Chimneys: ["Size", "Airflow", "Warranty"],
  Ovens: ["Capacity", "Controls", "Warranty"],
  Microwaves: ["Capacity", "Type", "Warranty"],
  "Gas Stoves": ["Burners", "Body", "Warranty"],
  Hobs: ["Burners", "Type", "Warranty"],
  Dishwashers: ["Place Settings", "Type", "Warranty"],
};
const labelsToSpecs = (category) => (SPEC_LABELS[category] || SPEC_LABELS.Chimneys).map((label) => ({ label, value: "" }));
const SPEC_PLACEHOLDERS = {
  Size: "60 / 90 cm", Airflow: "1200 m³/h", Capacity: "45 L", Controls: "Touch", Type: "Convection",
  Burners: "4 Brass", Body: "Stainless Steel", "Place Settings": "14", Warranty: "7 Years on Motor",
};

function initialForm(product) {
  if (!product) {
    return {
      title: "", category: "Chimneys", subcategory: "", brand: "", model: "", tag: "",
      price: DEFAULT_PRICE, status: "Published", image: IMAGE_PRESETS[0].url, description: "",
      offerPrice: "", offerLabel: "", offerEnds: "",
      features: "", specs: labelsToSpecs("Chimneys"),
    };
  }
  const specs = product.specs || [];
  return {
    title: product.title || "",
    category: product.category || "Chimneys",
    subcategory: product.subcategory || "",
    brand: product.brand || "",
    model: product.model || "",
    tag: product.tag || "",
    price: product.price || DEFAULT_PRICE,
    status: product.status || "Published",
    offerPrice: product.offerPrice || "",
    offerLabel: product.offerLabel || "",
    offerEnds: product.offerEnds || "",
    image: product.image || "",
    description: product.description || "",
    features: (product.features || []).join("\n"),
    specs: [0, 1, 2].map((i) => ({ label: specs[i]?.label || "", value: specs[i]?.value || "" })),
  };
}

/** A titled card that groups related fields. */
function Section({ icon, title, description, children }) {
  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm">
      <div className="flex items-start gap-3 px-5 pt-5 pb-4 border-b border-slate-100">
        <span className="w-9 h-9 shrink-0 rounded-xl bg-blue-50 text-primary flex items-center justify-center"><Icon name={icon} className="text-xl" /></span>
        <div>
          <h3 className="text-[15px] font-semibold text-slate-900 leading-tight">{title}</h3>
          {description && <p className="text-[13px] text-slate-500 mt-0.5">{description}</p>}
        </div>
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

function Field({ label, required, hint, error, className = "", children }) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
        {required && <span className="text-rose-500 ml-0.5" aria-hidden="true">*</span>}
      </label>
      {children}
      {error ? <p role="alert" className="text-xs font-medium text-rose-600 mt-1.5 flex items-start gap-1"><Icon name="error" className="text-sm mt-px" />{error}</p>
        : hint && <p className="text-xs text-slate-500 mt-1.5">{hint}</p>}
    </div>
  );
}

/** Add (product = null) or edit a product. Mount fresh per open so the form resets. */
export default function ProductFormModal({ product, onSave, onClose, onError }) {
  const [form, setForm] = useState(() => initialForm(product));
  const editingId = product?.id;
  const [uploading, setUploading] = useState(false);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  const setValue = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  function setCategory(e) {
    const category = e.target.value;
    setForm((f) => {
      // Only swap labels while the vendor hasn't typed any spec values yet.
      const untouched = f.specs.every((s) => !s.value);
      // Likewise swap a still-default preset photo for one from the new category.
      const isPreset = IMAGE_PRESETS.some((pr) => pr.url === f.image);
      const categoryPreset = IMAGE_PRESETS.find((pr) => pr.category === category);
      return {
        ...f,
        category,
        specs: untouched ? labelsToSpecs(category) : f.specs,
        image: isPreset && categoryPreset ? categoryPreset.url : f.image,
      };
    });
  }

  const parseFeatures = (text) => text.split("\n").map((l) => l.trim()).filter(Boolean);
  const buildSpecs = (specs) =>
    specs.map((s) => ({ label: s.label.trim(), value: s.value.trim() })).filter((s) => s.label && s.value);

  const preview = useMemo(() => {
    const tag = form.tag.trim();
    return {
      id: "preview",
      title: form.title.trim() || "Product title",
      category: form.category,
      brand: form.brand.trim() || "GLEN APPLIANCES",
      model: form.model.trim() || "MODEL",
      tag,
      tagColor: KNOWN_BADGE_COLORS[tag] || "bg-surface-container-high text-primary",
      price: form.price.trim() || DEFAULT_PRICE,
      offerPrice: form.offerPrice.trim() || null,
      offerLabel: form.offerLabel.trim() || null,
      offerEnds: form.offerEnds || null,
      image: form.image,
      specs: buildSpecs(form.specs),
    };
  }, [form]);
  const setSpec = (i, key) => (e) =>
    setForm((f) => ({ ...f, specs: f.specs.map((s, idx) => (idx === i ? { ...s, [key]: e.target.value } : s)) }));

  const model = form.model.trim();
  const isDuplicate = !!model && isDuplicateModel(model, editingId);

  async function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      try {
        const uploadRes = await uploadImage(file);
        if (uploadRes?.url) {
          setForm((f) => ({ ...f, image: uploadRes.url }));
          return;
        }
      } catch (uploadErr) {
        console.warn("Server upload failed, falling back to local canvas WebP:", uploadErr);
      }
      const image = await fileToOptimizedDataUrl(file);
      setForm((f) => ({ ...f, image }));
    } catch {
      onError("Could not read that image file.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  // Escape closes the dialog; page scroll is locked while it is open.
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  function handleSubmit(e) {
    e.preventDefault();
    // Hard block: a duplicate model number anywhere in the catalog (any
    // category) refuses the save outright -- no silent overwrite.
    if (isDuplicate) {
      onError("Cannot save: this model number already exists on another product.");
      return;
    }

    const tag = form.tag.trim();
    const specs = buildSpecs(form.specs);
    const features = parseFeatures(form.features);
    const warranty = specs.find((s) => s.label.toLowerCase().includes("warranty"))?.value || null;

    onSave(editingId, {
      title: form.title.trim(),
      category: form.category,
      subcategory: form.subcategory.trim(),
      brand: form.brand.trim() || "GLEN APPLIANCES",
      model,
      tag,
      tagColor: KNOWN_BADGE_COLORS[tag] || "bg-surface-container-high text-primary",
      price: form.price.trim() || DEFAULT_PRICE,
      offerPrice: form.offerPrice.trim(),
      offerLabel: form.offerLabel.trim(),
      offerEnds: form.offerEnds,
      status: form.status,
      image: form.image.trim() || IMAGE_PRESETS[0].url,
      description: form.description.trim() || features.slice(0, 3).join(". "),
      features,
      warranty,
      specs: specs.length
        ? specs
        : [
            { label: "Warranty", value: "Official Store Warranty" },
            { label: "Grade", value: "Showroom Certified" },
          ],
    });
  }

  const live = form.status === "Published";

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-4">
      <form
        onSubmit={handleSubmit}
        role="dialog"
        aria-modal="true"
        aria-label={product ? "Edit product" : "Add product"}
        className="bg-slate-50 w-full max-w-6xl h-[100dvh] sm:h-auto sm:max-h-[94vh] sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="shrink-0 bg-white border-b border-slate-200 px-5 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <span className="w-11 h-11 shrink-0 rounded-xl bg-primary text-white flex items-center justify-center shadow-md shadow-primary/25">
              <Icon name={product ? "edit" : "add"} className="text-2xl" />
            </span>
            <div className="min-w-0">
              <h2 className="text-lg font-bold text-slate-900 leading-tight truncate">{product ? "Edit product" : "Add a new product"}</h2>
              <p className="text-[13px] text-slate-500 truncate">{product ? product.title : "Fill in the details. Customers see a live preview on the right."}</p>
            </div>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="w-10 h-10 shrink-0 rounded-xl text-slate-500 hover:bg-slate-100 flex items-center justify-center transition-colors">
            <Icon name="close" className="text-2xl" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_340px] gap-5 p-4 sm:p-6">
            <div className="space-y-5 min-w-0">
              {/* 1. Basic information */}
              <Section icon="badge" title="Basic information" description="What the product is called and where it belongs.">
                <div className="grid sm:grid-cols-2 gap-x-4 gap-y-4">
                  <Field label="Product name" required className="sm:col-span-2">
                    <input required value={form.title} onChange={set("title")} placeholder="e.g. Glen 90 cm BLDC Auto-Clean Chimney" className={input} />
                  </Field>
                  <Field label="Category" required>
                    <select required value={form.category} onChange={setCategory} className={input}>
                      {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </Field>
                  <Field label="Subcategory" hint={form.category === "Gas Stoves" ? 'Use "Cooking Range" to show it in its own section.' : "Groups similar products together on the website."}>
                    <input value={form.subcategory} onChange={set("subcategory")} placeholder="e.g. BLDC Chimneys, DFVS" className={input} />
                  </Field>
                  <Field label="Model number" required error={isDuplicate ? "This model number already exists on another product. Use a different one to save." : ""}>
                    <input required value={form.model} onChange={set("model")} placeholder="e.g. CH 1022 BL MS IS" className={`${input} ${isDuplicate ? "!border-rose-400 !ring-2 !ring-rose-200" : ""}`} aria-invalid={isDuplicate} />
                  </Field>
                  <Field label="Brand / series">
                    <input value={form.brand} onChange={set("brand")} placeholder="GLEN APPLIANCES" className={input} />
                  </Field>
                  <Field label="Highlight badge" hint="A small label on the product photo. Pick one or type your own." className="sm:col-span-2">
                    <input value={form.tag} onChange={set("tag")} placeholder="None" className={input} />
                    <div className="flex flex-wrap gap-2 mt-2.5">
                      {BADGE_OPTIONS.map((b) => (
                        <button type="button" key={b} onClick={() => setValue("tag", form.tag === b ? "" : b)} aria-pressed={form.tag === b}
                          className={`h-8 px-3 rounded-full text-xs font-semibold border transition-colors ${form.tag === b ? "bg-primary text-white border-primary" : "bg-white text-slate-600 border-slate-200 hover:border-primary hover:text-primary"}`}>
                          {b}
                        </button>
                      ))}
                    </div>
                  </Field>
                </div>
              </Section>

              {/* 2. Photo */}
              <Section icon="photo_camera" title="Photo" description="Choose a ready-made photo, upload your own, or paste a link.">
                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="w-full sm:w-40 shrink-0">
                    <div className="aspect-square rounded-2xl bg-white border border-slate-200 flex items-center justify-center p-3">
                      {form.image ? <img src={assetUrl(form.image)} alt="Selected product" className="max-h-full max-w-full object-contain mix-blend-multiply" /> : <Icon name="image" className="text-4xl text-slate-300" />}
                    </div>
                    <label className={`mt-3 w-full h-11 rounded-xl border-2 border-dashed text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors ${uploading ? "border-slate-200 text-slate-400" : "border-slate-300 text-slate-600 hover:border-primary hover:text-primary hover:bg-blue-50/50"}`}>
                      <Icon name="upload" className="text-xl" />
                      {uploading ? "Uploading…" : "Upload photo"}
                      <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} disabled={uploading} />
                    </label>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-700 mb-2">Ready-made photos</p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                      {IMAGE_PRESETS.map((preset) => {
                        const selected = form.image === preset.url;
                        return (
                          <button type="button" key={preset.url} onClick={() => setValue("image", preset.url)} aria-pressed={selected} title={preset.label}
                            className={`relative rounded-xl bg-white border p-1.5 transition-all ${selected ? "border-primary ring-2 ring-primary/30" : "border-slate-200 hover:border-slate-400"}`}>
                            <img src={assetUrl(preset.url)} alt={preset.label} className="w-full h-14 object-contain mix-blend-multiply" loading="lazy" />
                            {selected && <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center"><Icon name="check" className="text-sm" /></span>}
                          </button>
                        );
                      })}
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Or paste an image link</label>
                      <input required value={form.image} onChange={set("image")} placeholder="https://… or assets/products/…" className={input} />
                    </div>
                  </div>
                </div>
              </Section>

              {/* 3. Pricing & offer */}
              <Section icon="sell" title="Pricing" description="What customers see on the card.">
                <Field label="Price" hint={`Type a price such as ₹18,990, or keep "${DEFAULT_PRICE}".`}>
                  <input value={form.price} onChange={set("price")} placeholder={DEFAULT_PRICE} className={input} />
                </Field>
                <div className="mt-5 rounded-xl border border-rose-200 bg-rose-50/60 p-4">
                  <p className="text-sm font-semibold text-rose-800 flex items-center gap-1.5"><Icon name="local_offer" className="text-lg" /> Special offer <span className="font-normal text-rose-700/80">(optional)</span></p>
                  <p className="text-xs text-rose-900/70 mt-0.5 mb-3.5">Shows the offer price with the normal price struck through and the amount saved. Leave empty for no offer.</p>
                  <div className="grid sm:grid-cols-3 gap-3">
                    <Field label="Offer price"><input value={form.offerPrice} onChange={set("offerPrice")} placeholder="₹15,990" className={input} /></Field>
                    <Field label="Offer name"><input value={form.offerLabel} onChange={set("offerLabel")} placeholder="Diwali Offer" maxLength={30} className={input} /></Field>
                    <Field label="Valid till"><input type="date" value={form.offerEnds} onChange={set("offerEnds")} className={input} /></Field>
                  </div>
                </div>
              </Section>

              {/* 4. Specifications */}
              <Section icon="tune" title="Key specifications" description="Shown on the product card. A spec named “Warranty” gets its own row.">
                <div className="space-y-2.5">
                  <div className="hidden sm:grid grid-cols-[1fr_1.5fr] gap-3 text-xs font-semibold uppercase tracking-wider text-slate-500 px-0.5">
                    <span>Name</span><span>Value</span>
                  </div>
                  {form.specs.map((spec, i) => (
                    <div key={i} className="grid sm:grid-cols-[1fr_1.5fr] gap-2 sm:gap-3">
                      <input value={spec.label} onChange={setSpec(i, "label")} placeholder="e.g. Airflow" aria-label={`Specification ${i + 1} name`} className={input} />
                      <input value={spec.value} onChange={setSpec(i, "value")} placeholder={SPEC_PLACEHOLDERS[spec.label] || "Value"} aria-label={`Specification ${i + 1} value`} className={`${input} font-medium`} />
                    </div>
                  ))}
                </div>
              </Section>

              {/* 5. Details */}
              <Section icon="notes" title="Details" description="Shown on the product’s own page.">
                <div className="space-y-4">
                  <Field label="Key features" hint="One feature per line. They appear as a checklist.">
                    <textarea rows="5" value={form.features} onChange={set("features")} placeholder={"BLDC motor with 7 years warranty\nHeat auto-clean technology\nTouch control with motion sensor"} className={textarea}></textarea>
                  </Field>
                  <Field label="Short description" hint="One or two sentences. Leave empty to use the first features.">
                    <textarea rows="2" value={form.description} onChange={set("description")} placeholder="A short summary for customers" className={textarea}></textarea>
                  </Field>
                </div>
              </Section>

              {/* 6. Visibility */}
              <Section icon="visibility" title="Visibility" description="Decide whether customers can see this product.">
                <div className="grid sm:grid-cols-2 gap-3" role="radiogroup" aria-label="Visibility">
                  {[
                    { value: "Published", icon: "public", title: "Live on website", text: "Customers can find and enquire about it." },
                    { value: "Draft", icon: "visibility_off", title: "Draft", text: "Hidden from customers. Only you can see it here." },
                  ].map((o) => (
                    <button type="button" key={o.value} role="radio" aria-checked={form.status === o.value} onClick={() => setValue("status", o.value)}
                      className={`text-left rounded-xl border p-4 flex gap-3 transition-all ${form.status === o.value ? "border-primary bg-blue-50/60 ring-2 ring-primary/20" : "border-slate-200 bg-white hover:border-slate-400"}`}>
                      <span className={`w-5 h-5 mt-0.5 shrink-0 rounded-full border-2 flex items-center justify-center ${form.status === o.value ? "border-primary" : "border-slate-300"}`}>
                        {form.status === o.value && <span className="w-2.5 h-2.5 rounded-full bg-primary" />}
                      </span>
                      <span>
                        <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-900"><Icon name={o.icon} className="text-lg text-slate-500" />{o.title}</span>
                        <span className="block text-xs text-slate-500 mt-0.5">{o.text}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </Section>
            </div>

            {/* Live preview */}
            <aside className="hidden lg:block">
              <div className="sticky top-0">
                <p className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-1.5"><Icon name="preview" className="text-lg text-primary" /> Website preview</p>
                <div className="pointer-events-none select-none" aria-hidden="true"><ProductCard product={preview} /></div>
                <p className="text-xs text-slate-500 mt-3">This is how the product looks to customers. It updates as you type.</p>
              </div>
            </aside>
          </div>
        </div>

        {/* Sticky action bar */}
        <div className="shrink-0 bg-white border-t border-slate-200 px-5 sm:px-6 py-3.5 flex items-center justify-between gap-3">
          <p className="hidden sm:flex items-center gap-2 text-sm text-slate-500">
            <span className={`w-2 h-2 rounded-full ${live ? "bg-emerald-500" : "bg-amber-500"}`} />
            {live ? "Goes live on the website when you save" : "Saved as a draft, hidden from customers"}
          </p>
          <div className="flex items-center gap-3 ml-auto">
            <button type="button" onClick={onClose} className="h-11 px-5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">Cancel</button>
            <button type="submit" disabled={isDuplicate || uploading}
              className="h-11 px-6 rounded-xl bg-primary text-white text-sm font-semibold shadow-md shadow-primary/25 hover:bg-primary-container disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none inline-flex items-center gap-2 transition-colors">
              <Icon name="check" className="text-xl" />
              {product ? "Save changes" : "Add product"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
