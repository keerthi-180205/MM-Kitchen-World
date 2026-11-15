import { useCallback, useEffect, useRef, useState } from "react";

const TOAST_MS = 3000;

export function useToast() {
  const [toast, setToast] = useState({ visible: false, message: "", isError: false });
  const timer = useRef(null);

  const showToast = useCallback((message, isError = false) => {
    clearTimeout(timer.current);
    setToast({ visible: true, message, isError });
    timer.current = setTimeout(() => setToast((t) => ({ ...t, visible: false })), TOAST_MS);
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  return [toast, showToast];
}
