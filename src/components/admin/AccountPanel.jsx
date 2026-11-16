import { useState } from "react";
import Icon from "../Icon";
import { api } from "../../lib/api";
import { downloadFile } from "../../utils/priceSheet";

const field = "w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-primary focus:border-primary";

/** Change the admin password. */
export default function AccountPanel({ showToast }) {
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirm: "" });
  const [saving, setSaving] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const [backingUp, setBackingUp] = useState(false);
  async function backup() {
    setBackingUp(true);
    try {
      const [products, offers] = await Promise.all([
        api("/api/products", { auth: true }),
        api("/api/offers/all", { auth: true }),
      ]);
      const date = new Date().toISOString().slice(0, 10);
      downloadFile(`mm-kitchen-backup-${date}.json`, JSON.stringify({ exportedAt: new Date().toISOString(), products, offers }, null, 2), "application/json");
      showToast(`Backup saved: ${products.length} products, ${offers.length} offers.`);
    } catch (err) {
      showToast(err.message, true);
    } finally {
      setBackingUp(false);
    }
  }

  async function submit(e) {
    e.preventDefault();
    if (form.newPassword !== form.confirm) return showToast("The new passwords don't match.", true);
    setSaving(true);
    try {
      await api("/api/auth/change-password", { method: "POST", auth: true, body: { currentPassword: form.currentPassword, newPassword: form.newPassword } });
      showToast("Password changed. Use the new one next time you log in.");
      setForm({ currentPassword: "", newPassword: "", confirm: "" });
    } catch (err) {
      showToast(err.message, true);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-md space-y-5">
      <div>
        <p className="text-sm text-slate-500">Use at least 10 characters. A mix of words, numbers and symbols is best. Don't reuse a password from another site.</p>
      </div>
      <form onSubmit={submit} className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4" autoComplete="off">
        <label className="block"><span className="block text-xs font-bold uppercase mb-1">Current password</span><input required type="password" autoComplete="current-password" value={form.currentPassword} onChange={set("currentPassword")} className={field} /></label>
        <label className="block"><span className="block text-xs font-bold uppercase mb-1">New password</span><input required minLength={10} type="password" autoComplete="new-password" value={form.newPassword} onChange={set("newPassword")} className={field} /></label>
        <label className="block"><span className="block text-xs font-bold uppercase mb-1">Repeat new password</span><input required minLength={10} type="password" autoComplete="new-password" value={form.confirm} onChange={set("confirm")} className={field} /></label>
        <button disabled={saving} className="px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold disabled:opacity-60">{saving ? "Saving…" : "Change password"}</button>
      </form>
      <div className="pt-4">
        <h2 className="text-lg font-bold text-slate-900">Backup</h2>
        <p className="text-sm text-slate-500 mb-3">Download a copy of your products and offers. Keep it somewhere safe, for example in your email or Google Drive.</p>
        <button onClick={backup} disabled={backingUp} className="inline-flex items-center gap-2 h-11 px-5 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-700 hover:border-primary hover:text-primary disabled:opacity-60 transition-colors">
          <Icon name="cloud_download" className="text-xl" /> {backingUp ? "Preparing…" : "Download backup"}
        </button>
      </div>
    </div>
  );
}
