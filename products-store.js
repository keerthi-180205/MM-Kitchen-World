/**
 * MM Kitchen World - Shared Product Store (Vendor Demo Edition)
 * Provides persistent catalog management via LocalStorage with real-time sync across tabs.
 */

const DEFAULT_PRODUCTS = [
  {
    id: "prod-1",
    title: "Glen 60cm Auto-Clean Curved Glass Chimney",
    category: "Chimneys",
    brand: "GLEN APPLIANCES",
    model: "CH-6071-AC",
    tag: "Bestseller",
    tagColor: "bg-primary text-on-primary",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCH_MLrO-g4i_Z6UO8RpSFZY9Lm4h8mjaJg6ec2KwoTGOoOf7Zltkacofz7XIwt1f9etcWeKW6qAmlkB98K55tshGyutVbW-h8L5F3Jh2Sz7biDvvvJG_7Rh-hZfu-poJYvVgrpC5ARmzA3LUtWRTc2cVtcQuL6--1T_Zzg9LbIkjQXwrX56VT1KYVn3BZbra3MNJO0IxlTkBVDg5rprcaSkCKB8AfmnpfcvtwVvzus",
    price: "Price on Request",
    specs: [
      { label: "Suction Power", value: "1200 m³/hr" },
      { label: "Control Type", value: "Motion Sensor Wave" },
      { label: "Filter", value: "100% Filterless Mesh" }
    ],
    status: "Published",
    description: "Curved black glass heat auto-clean chimney with oil collector and touch controls."
  },
  {
    id: "prod-2",
    title: "Vortex 4-Burner Built-in Hob",
    category: "Hobs",
    brand: "VORTEX SERIES",
    model: "HB-V4-SABAF",
    tag: "New Arrival",
    tagColor: "bg-secondary text-on-secondary",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8qQgO6KtrxK8105BQT47fIkhJhyXnSUeNDNH-SaYB3yRlVqyhOJzecm9xWWvAV6ruYoRFHZ_QAEvMDh3OoSSVxPDHbhUT5tcV3xQDGyEfRHZFas3vmLfmlohABiOSFv5UnqPsx1nB-KDbm1UY-iAAP-x0U5ZT4TrLkb7yxC1AMufx2gFH9uwxfHEBodv_AY6iWdpTjH7nkdbiqnfaTSy0c0caIu-IPuIvyLKq1l1X",
    price: "Price on Request",
    specs: [
      { label: "Burner Core", value: "Forged Brass Sabaf" },
      { label: "Glass Spec", value: "8mm Bevelled Glass" },
      { label: "Safety", value: "Auto FFD Protection" }
    ],
    status: "Published",
    description: "Heavy duty Italian Sabaf brass burners with 8mm toughened bevelled glass top."
  },
  {
    id: "prod-3",
    title: "Glen 70L Convection Built-in Oven",
    category: "Ovens",
    brand: "GLEN ARCHITECT",
    model: "OV-70L-PRO",
    tag: "Flagship",
    tagColor: "bg-inverse-surface text-inverse-on-surface",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHvk6VFP3p4hoSFFZVV_Yu5ci4tdB3tSDktwqBlBg7fcWn4MjCqA7SujQIMCkv0AkL4ESNFrvbipyjRZQgC2Be_EAE0zWEENMH1drYCol0X_SHeuERkUbNKAFIKqs_I27EI06vcs1L_2HW5jx8Y6IUm5ECgfcW1cK16BMxfT3N7Aibt-0Ce_KBwniJ4G9C6PaxEjLQtxfvmsSmzo-zB0rJaCDnq4ILZchpO3fx7Zx-",
    price: "Price on Request",
    specs: [
      { label: "Net Volume", value: "70 Litres Giant Cavity" },
      { label: "Heating Modes", value: "9 Multi-Cook Programs" },
      { label: "Glass Door", value: "Triple Glazed Cool-Touch" }
    ],
    status: "Published",
    description: "Convection multi-function oven with digital timer, rotisserie, and easy-clean enamel."
  },
  {
    id: "prod-4",
    title: "Glen 3-Burner Toughened Glass Stove",
    category: "Cooktops",
    brand: "GLEN CLASSIC",
    model: "GS-1033-GT",
    tag: "Showroom Pick",
    tagColor: "bg-surface-container-high text-primary",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAuTScYjGiyaqgFrcfeYFUeGg0H8TTpMEYF709xgFHqgmLr0F7RMs3e4SIAvtPFqLPf82oTKRHud7_bwTzoIcOdmc7A_LvaI_lz2JHzUEEmkQntf7eu3cIKbY7Sy9Nv-7Xtkp_8Fp8-XZKu7qRusyafsVEAbySpWMw-40v3fSMYTJvjFWh2-wZfMh8_l5l6pEO7d0ONT4_vIDZqIuch8E0-HZr57AH5qcNvei4gyUCp",
    price: "Price on Request",
    specs: [
      { label: "Burner Config", value: "1 High + 2 Medium Brass" },
      { label: "Surface", value: "Toughened Black Glass" },
      { label: "Warranty", value: "5 Year Glass Protection" }
    ],
    status: "Published",
    description: "Rich brass burners, forged cast iron pan supports, and extra-wide cooking space."
  }
];

const IMAGE_PRESETS = [
  {
    label: "Auto-Clean Chimney",
    category: "Chimneys",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCH_MLrO-g4i_Z6UO8RpSFZY9Lm4h8mjaJg6ec2KwoTGOoOf7Zltkacofz7XIwt1f9etcWeKW6qAmlkB98K55tshGyutVbW-h8L5F3Jh2Sz7biDvvvJG_7Rh-hZfu-poJYvVgrpC5ARmzA3LUtWRTc2cVtcQuL6--1T_Zzg9LbIkjQXwrX56VT1KYVn3BZbra3MNJO0IxlTkBVDg5rprcaSkCKB8AfmnpfcvtwVvzus"
  },
  {
    label: "Island Rangehood",
    category: "Chimneys",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDoHVMlEjIg5sDpvup7RDp57jnsw5yNxijQg8pVJRIDgTp04msXzXsJ384JVVXyOmXmEzq5z7UwX2jSvmXEGgT-I3JhLJLd2-ulg3RZLy7sYoPT2jRn3Sfitq00UIxJ7ulvD483Wg4K8QwUXxwNny4-wfMgBNMrkSa2FTwlJhHN78d28B9l8RLRzf8Gcmrf-J563pBzp_aaYzqw6UftAxmYOpCWBfSwJRi0t4JxXp4AQhZ3OtttzOgx6Q"
  },
  {
    label: "4-Burner Glass Hob",
    category: "Hobs",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8qQgO6KtrxK8105BQT47fIkhJhyXnSUeNDNH-SaYB3yRlVqyhOJzecm9xWWvAV6ruYoRFHZ_QAEvMDh3OoSSVxPDHbhUT5tcV3xQDGyEfRHZFas3vmLfmlohABiOSFv5UnqPsx1nB-KDbm1UY-iAAP-x0U5ZT4TrLkb7yxC1AMufx2gFH9uwxfHEBodv_AY6iWdpTjH7nkdbiqnfaTSy0c0caIu-IPuIvyLKq1l1X"
  },
  {
    label: "Luxury Built-in Hob",
    category: "Hobs",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCBv7l-9t3dl91VzMIeXh4wzjcIydWByfMMXjJwh8CCKmD_mDjAlrunZTXGLYtiFsXrQ6JvfvxkQk83M2XDPPFhjYHlPW9f1O565LffyiL9iKVdt99hiWOnxLhGG7r09XaAVdVIw6wHBCf1ArcW82zrr1yhgFqxS538MDToue5BFy8T_SAgw8kcAEfJVI_cW0gHWZNj231trnQFMCHcIexd0nKsIMRRr0xJ-C-nqaQc7HrAGuTUqz1DDg"
  },
  {
    label: "Built-in Convection Oven",
    category: "Ovens",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHvk6VFP3p4hoSFFZVV_Yu5ci4tdB3tSDktwqBlBg7fcWn4MjCqA7SujQIMCkv0AkL4ESNFrvbipyjRZQgC2Be_EAE0zWEENMH1drYCol0X_SHeuERkUbNKAFIKqs_I27EI06vcs1L_2HW5jx8Y6IUm5ECgfcW1cK16BMxfT3N7Aibt-0Ce_KBwniJ4G9C6PaxEjLQtxfvmsSmzo-zB0rJaCDnq4ILZchpO3fx7Zx-"
  },
  {
    label: "3-Burner Glass Stove",
    category: "Cooktops",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAuTScYjGiyaqgFrcfeYFUeGg0H8TTpMEYF709xgFHqgmLr0F7RMs3e4SIAvtPFqLPf82oTKRHud7_bwTzoIcOdmc7A_LvaI_lz2JHzUEEmkQntf7eu3cIKbY7Sy9Nv-7Xtkp_8Fp8-XZKu7qRusyafsVEAbySpWMw-40v3fSMYTJvjFWh2-wZfMh8_l5l6pEO7d0ONT4_vIDZqIuch8E0-HZr57AH5qcNvei4gyUCp"
  },
  {
    label: "Built-in Dishwasher 14-Place",
    category: "Dishwashers",
    url: "https://images.unsplash.com/photo-1585837575652-267c041d77d4?auto=format&fit=crop&w=600&q=80"
  },
  {
    label: "Black Quartz Kitchen Sink",
    category: "Sinks",
    url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80"
  }
];

const STORAGE_KEY = "mm_kitchen_world_catalog_v1";

window.ProductsStore = {
  IMAGE_PRESETS,

  getAll() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        this.resetToDefaults();
        return DEFAULT_PRODUCTS;
      }
      return JSON.parse(data);
    } catch (e) {
      console.warn("Error reading catalog storage:", e);
      return DEFAULT_PRODUCTS;
    }
  },

  getPublished() {
    return this.getAll().filter(p => p.status === "Published" || !p.status);
  },

  getById(id) {
    return this.getAll().find(p => p.id === id);
  },

  save(products) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    window.dispatchEvent(new CustomEvent("catalog-updated", { detail: products }));
  },

  add(productData) {
    const products = this.getAll();
    const newProduct = {
      id: "prod-" + Date.now(),
      title: productData.title || "Untitled Product",
      category: productData.category || "Chimneys",
      brand: productData.brand || "GLEN APPLIANCES",
      model: productData.model || "MODEL-" + Math.floor(1000 + Math.random() * 9000),
      tag: productData.tag || "New Arrival",
      tagColor: productData.tagColor || "bg-primary text-on-primary",
      image: productData.image || IMAGE_PRESETS[0].url,
      price: productData.price || "Price on Request",
      specs: productData.specs && productData.specs.length ? productData.specs : [
        { label: "Warranty", value: "1 Year Official" },
        { label: "Material", value: "Premium Grade" },
        { label: "Finish", value: "Matte Black & Glass" }
      ],
      status: productData.status || "Published",
      description: productData.description || ""
    };
    products.unshift(newProduct);
    this.save(products);
    return newProduct;
  },

  update(id, updatedFields) {
    const products = this.getAll();
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...updatedFields };
      this.save(products);
      return products[index];
    }
    return null;
  },

  delete(id) {
    let products = this.getAll();
    products = products.filter(p => p.id !== id);
    this.save(products);
    return products;
  },

  resetToDefaults() {
    this.save(DEFAULT_PRODUCTS);
    return DEFAULT_PRODUCTS;
  }
};
