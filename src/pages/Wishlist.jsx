import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import { WhatsAppIcon } from "../components/BrandIcons";
import ProductCard from "../components/storefront/ProductCard";
import { listEnquiryUrl } from "../constants";
import { useShop } from "../context/ShopContext";
import { useProducts } from "../hooks/useProducts";
import { useSeo } from "../hooks/useSeo";
import { trackEnquiry } from "../lib/analytics";

export default function Wishlist() {
  useSeo({ title: "My List", description: "Your saved GLEN appliances. Send the whole list to MM Kitchen World on WhatsApp in one tap." });
  const { wishlist, clearWishlist } = useShop();
  const products = useProducts();
  const saved = wishlist.map((id) => products.find((p) => p.id === id)).filter(Boolean);

  if (saved.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mb-4">
          <Icon name="favorite" className="text-3xl" />
        </div>
        <h1 className="font-headline-md text-headline-md font-bold text-on-surface">Your list is empty</h1>
        <p className="text-on-surface-variant mt-2 mb-6">Tap the heart on any appliance to save it here. When you're ready, send the whole list to us on WhatsApp for prices and advice.</p>
        <Link to="/#products" className="inline-flex px-6 py-3 rounded-lg bg-primary text-white font-bold">Browse appliances</Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-headline-lg text-[28px] md:text-headline-lg text-on-surface">My List</h1>
          <p className="text-on-surface-variant mt-1">{saved.length} saved {saved.length === 1 ? "appliance" : "appliances"}. Saved on this device only.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button onClick={clearWishlist} className="text-sm font-semibold text-on-surface-variant hover:text-error">Clear list</button>
          <a
            href={listEnquiryUrl(saved)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => saved.forEach((p) => trackEnquiry(p.id, "wishlist"))}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-tertiary text-white font-bold shadow hover:brightness-105"
          >
            <span className="[&_svg]:w-5 [&_svg]:h-5"><WhatsAppIcon /></span> Send my list on WhatsApp
          </a>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {saved.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
