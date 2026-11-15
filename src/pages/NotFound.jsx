import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import { useSeo } from "../hooks/useSeo";

export default function NotFound() {
  useSeo({ title: "Page not found", description: "This page could not be found.", noindex: true });
  return (
    <div className="max-w-xl mx-auto px-6 py-24 text-center">
      <div className="w-16 h-16 mx-auto rounded-2xl bg-surface-container-low text-primary flex items-center justify-center mb-4">
        <Icon name="search_off" className="text-3xl" />
      </div>
      <p className="text-sm font-bold uppercase tracking-widest text-primary">Error 404</p>
      <h1 className="font-headline-lg text-[28px] md:text-headline-lg text-on-surface mt-2">We couldn't find that page</h1>
      <p className="text-on-surface-variant mt-3 mb-8">The link may be old or mistyped. Try the home page, or browse our appliances.</p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/" className="px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary-container transition-colors">Go to home page</Link>
        <Link to="/?category=Chimneys#products" className="px-6 py-3 rounded-xl border border-outline-variant text-primary font-bold hover:bg-white transition-colors">Browse appliances</Link>
      </div>
    </div>
  );
}
