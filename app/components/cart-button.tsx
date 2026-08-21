"use client";

import { useCartStore } from "@/store/cart-store";

export default function CartButton() {
  const { totalItems, openCart, isCartOpen } = useCartStore();
  const count = totalItems();

  if (isCartOpen) return null;

  return (
    <button
      id="floating-cart-btn"
      className={`floating-cart-btn ${count > 0 ? "has-items" : ""}`}
      onClick={openCart}
      aria-label="Buka keranjang belanja"
    >
      <span className="floating-cart-icon">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      </span>
      {count > 0 && (
        <span className="floating-cart-badge">{count}</span>
      )}
      {count > 0 && (
        <span className="floating-cart-label">Lihat Keranjang</span>
      )}
    </button>
  );
}
