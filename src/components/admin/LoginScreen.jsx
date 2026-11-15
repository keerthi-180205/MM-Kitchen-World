import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../Icon";

const inputClass =
  "w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-outline-variant bg-background focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition";

export default function LoginScreen({ onSubmit }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const err = await onSubmit(username.trim(), password);
      if (err) setError(err);
    } catch (ex) {
      setError(ex.message || "An unexpected error occurred during login.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-between p-4 sm:p-6 bg-background">
      {/* Top return bar */}
      <div className="max-w-[1440px] mx-auto w-full flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface-variant hover:text-primary hover:bg-surface-container-low text-xs font-semibold transition shadow-xs">
          <Icon name="arrow_back" className="text-base" />
          <span className="whitespace-nowrap">Back to Store</span>
        </Link>
        <span className="hidden sm:inline text-xs font-medium text-on-surface-variant">MM Kitchen World · GLEN Exclusive Store</span>
      </div>

      {/* Centered login card */}
      <div className="max-w-md w-full mx-auto my-8">
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-lg p-6 sm:p-8">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-surface-container-low border border-outline-variant flex items-center justify-center text-primary mx-auto mb-3 shadow-xs">
              <Icon name="lock" className="text-2xl" />
            </div>
            <h2 className="font-headline-md text-headline-md font-bold text-primary tracking-tight">Admin Portal Login</h2>
            <p className="text-xs text-on-surface-variant mt-1.5">Sign in to manage showroom inventory &amp; product catalog</p>
          </div>

          {error && (
            <div role="alert" className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
              <Icon name="error" className="text-base text-red-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
            <div>
              <label htmlFor="adminUsername" className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">Username / Email</label>
              <div className="relative">
                <Icon name="mail" className="absolute left-3 top-2.5 text-on-surface-variant text-base" />
                <input
                  type="email"
                  id="adminUsername"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  placeholder="Enter username or email"
                  className={inputClass}
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="adminPassword" className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">Password</label>
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="text-[11px] text-primary hover:underline font-semibold flex items-center gap-1"
                >
                  <Icon name={showPassword ? "visibility_off" : "visibility"} className="text-sm" />
                  <span>{showPassword ? "Hide" : "Show"}</span>
                </button>
              </div>
              <div className="relative">
                <Icon name="key" className="absolute left-3 top-2.5 text-on-surface-variant text-base" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="adminPassword"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  placeholder="Enter password"
                  className={inputClass}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-lg bg-primary hover:bg-primary-container disabled:opacity-60 text-white font-semibold text-sm shadow hover:shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <Icon name="login" className="text-base" />
                    <span>Sign In to Admin Portal</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="text-center text-[11px] text-on-surface-variant py-2">
        <p>© MM Kitchen World · Basaveshwara Nagar, Bangalore · Authorized GLEN Exclusive Store</p>
      </div>
    </div>
  );
}
