"use client";

import { useCartStore } from "@/store/cart-store";

export default function Toast() {
  const { toastMessage, dismissToast } = useCartStore();

  return (
    <div
      className={`toast ${toastMessage ? "toast-visible" : ""}`}
      role="alert"
      aria-live="polite"
      id="toast-notification"
    >
      <span className="toast-check">✓</span>
      <span className="toast-message">{toastMessage}</span>
      <button className="toast-close" onClick={dismissToast} aria-label="Tutup notifikasi">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}
