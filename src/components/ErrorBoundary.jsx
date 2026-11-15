import { Component } from "react";
import { PHONE_TEL, whatsappUrl } from "../constants";

/** Last line of defence: if a page crashes, show a friendly screen instead of a blank one. */
export default class ErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error, info) {
    console.error("[ErrorBoundary]", error, info?.componentStack);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-background">
        <div className="max-w-md text-center">
          <h1 className="font-headline-md text-2xl font-bold text-on-surface">Sorry, something went wrong</h1>
          <p className="mt-3 text-on-surface-variant">
            The page couldn't load properly. Please refresh. If it keeps happening, message or call us and we'll help you right away.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => window.location.reload()} className="px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary-container transition-colors">Refresh the page</button>
            <a href={whatsappUrl("Hello MM Kitchen World, the website isn't loading for me.")} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-xl bg-tertiary text-white font-bold hover:brightness-105 transition">WhatsApp us</a>
            <a href={`tel:${PHONE_TEL}`} className="px-6 py-3 rounded-xl border border-outline-variant text-primary font-bold hover:bg-white transition-colors">Call 97432 33729</a>
          </div>
        </div>
      </div>
    );
  }
}
