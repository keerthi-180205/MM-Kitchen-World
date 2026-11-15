import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../Icon";
import { api } from "../../lib/api";
import { PHONE_TEL, whatsappUrl } from "../../constants";

const inputClass =
  "w-full px-4 py-3 rounded-lg border border-outline-variant bg-white text-sm focus:border-primary focus:ring-1 focus:ring-primary transition";

/** "Request a call back": name + mobile saved to the owner's admin. */
export default function CallbackForm({ productId = null, productTitle = "", source = "website" }) {
  const [form, setForm] = useState({ name: "", phone: "", message: "", website: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [error, setError] = useState("");

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      await api("/api/leads", {
        method: "POST",
        body: { ...form, productId, source },
      });
      setStatus("done");
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div role="status" className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
          <Icon name="check_circle" className="text-3xl" />
        </div>
        <h3 className="font-bold text-on-surface text-lg">Thank you, {form.name.trim().split(" ")[0]}!</h3>
        <p className="text-sm text-on-surface-variant mt-1">We've received your request and will call you back during showroom hours (10:30 AM to 8:30 PM, all days).</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4" noValidate={false}>
      {productTitle && (
        <p className="text-sm text-on-surface-variant">
          About: <strong className="text-on-surface">{productTitle}</strong>
        </p>
      )}
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">Your name</span>
          <input required maxLength={80} value={form.name} onChange={set("name")} autoComplete="name" placeholder="e.g. Ramesh Kumar" className={inputClass} />
        </label>
        <label className="block">
          <span className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">Mobile number</span>
          <input required type="tel" inputMode="numeric" pattern="[0-9+ \-]{10,15}" maxLength={15} value={form.phone} onChange={set("phone")} autoComplete="tel" placeholder="10-digit mobile number" className={inputClass} />
        </label>
      </div>
      <label className="block">
        <span className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">What are you looking for? <span className="font-normal normal-case tracking-normal">(optional)</span></span>
        <textarea rows="2" maxLength={500} value={form.message} onChange={set("message")} placeholder="e.g. 90 cm chimney for a 4-burner hob" className={inputClass}></textarea>
      </label>

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div className="hidden" aria-hidden="true">
        <label>Website <input tabIndex={-1} autoComplete="off" value={form.website} onChange={set("website")} /></label>
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}{" "}
          <a className="font-semibold underline" href={whatsappUrl("Hello MM Kitchen World, please call me back.")} target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a> or call{" "}
          <a className="font-semibold underline" href={`tel:${PHONE_TEL}`}>97432 33729</a>.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-primary text-white font-label-lg text-label-lg font-bold shadow hover:bg-primary-container disabled:opacity-60 transition-colors"
      >
        <Icon name="call" className="text-xl" />
        {status === "sending" ? "Sending…" : "Request a Call Back"}
      </button>
      <p className="text-xs text-on-surface-variant">We use your number only to call you about this request. See our <Link to="/privacy" className="underline">Privacy Policy</Link>.</p>
    </form>
  );
}
