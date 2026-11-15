import Icon from "../Icon";

export default function Toast({ toast }) {
  return (
    <div
      role="status"
      className={`fixed bottom-6 right-6 z-50 bg-on-surface text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 text-sm transform transition-all duration-300 ${
        toast.visible ? "" : "translate-y-20 opacity-0"
      }`}
    >
      <Icon name={toast.isError ? "error" : "check_circle"} className={toast.isError ? "text-rose-400" : "text-emerald-400"} />
      <span>{toast.message}</span>
    </div>
  );
}
