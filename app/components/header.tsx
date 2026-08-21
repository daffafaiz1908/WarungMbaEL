"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart-store";

export default function Header() {
  const { totalItems, openCart } = useCartStore();
  const count = totalItems();

  return (
    <header className="header">
      <div className="header-inner container">
        <Link href="/" className="logo">
          <span className="logo-icon">🍗</span>
          <div className="logo-text">
            <span className="logo-name">Warung MbaEL</span>
            <span className="logo-tagline">Ayam &amp; Dimsum Favorit</span>
          </div>
        </Link>

        <button
          id="header-cart-btn"
          className="cart-header-btn"
          onClick={openCart}
          aria-label="Buka keranjang belanja"
        >
          <svg
            width="22"
            height="22"
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
          {count > 0 && (
            <span className="cart-header-badge">{count}</span>
          )}
        </button>
      </div>
    </header>
  );
}
