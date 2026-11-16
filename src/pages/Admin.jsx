import { useEffect, useState } from "react";
import LoginScreen from "../components/admin/LoginScreen";
import Dashboard from "../components/admin/Dashboard";
import Toast from "../components/admin/Toast";
import { useToast } from "../hooks/useToast";
import { apiUrl } from "../lib/apiBase";
import { clearAuthToken, getAuthToken, setAuthToken } from "../store/productsStore";

export default function Admin() {
  const [authed, setAuthed] = useState(() => !!getAuthToken());
  const [toast, showToast] = useToast();

  // The store raises this when the server says the login has expired.
  useEffect(() => {
    const onExpired = () => setAuthed(false);
    window.addEventListener("admin-session-expired", onExpired);
    return () => window.removeEventListener("admin-session-expired", onExpired);
  }, []);

  useEffect(() => {
    document.title = "Vendor Admin · Product Management | MM Kitchen World";

    // Validate existing token with backend on mount
    const token = getAuthToken();
    if (token) {
      fetch(apiUrl("/api/auth/me"), {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (!res.ok) {
            clearAuthToken();
            setAuthed(false);
          }
        })
        .catch(() => {
          // If server is unreachable, keep current authed state
        });
    }
  }, []);

  /** Returns an error message, or null on success. */
  async function handleLogin(username, password) {
    try {
      const res = await fetch(apiUrl("/api/auth/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username, password }),
      });

      if (res.ok) {
        const data = await res.json();
        setAuthToken(data.token);
        setAuthed(true);
        showToast("Logged in successfully!");
        return null;
      }

      const err = await res.json();
      return err.error || "Authentication failed. Please verify your credentials.";
    } catch {
      return "Could not reach the server. Please check that it is running and try again.";
    }
  }

  function handleLogout() {
    clearAuthToken();
    setAuthed(false);
    showToast("Logged out of Admin Portal.");
  }

  return (
    <div className="min-h-screen flex flex-col">
      {authed ? (
        <Dashboard onLogout={handleLogout} showToast={showToast} />
      ) : (
        <LoginScreen onSubmit={handleLogin} />
      )}
      <Toast toast={toast} />
    </div>
  );
}
