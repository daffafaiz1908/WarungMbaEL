"use client";

import Image from "next/image";
import { useCartStore } from "@/store/cart-store";
import { formatPrice, MenuItem } from "@/data/menu";

interface CartDrawerProps {
  onCheckout: () => void;
}

export default function CartDrawer({ onCheckout }: CartDrawerProps) {
  const { items, isCartOpen, closeCart, addItem, removeItem, clearCart, totalPrice, totalItems } =
    useCartStore();

  const total = totalPrice();
  const count = totalItems();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`drawer-backdrop ${isCartOpen ? "drawer-backdrop-open" : ""}`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`cart-drawer ${isCartOpen ? "cart-drawer-open" : ""}`}
        aria-label="Keranjang belanja"
        aria-hidden={!isCartOpen}
      >
        <div className="cart-drawer-header">
          <div>
            <h2 className="cart-drawer-title">Keranjang Kamu</h2>
            {count > 0 && (
              <p className="cart-drawer-count">{count} item dipilih</p>
            )}
          </div>
          <button
            id="cart-close-btn"
            className="cart-close-btn"
            onClick={closeCart}
            aria-label="Tutup keranjang"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="cart-drawer-body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <span className="cart-empty-icon">🛒</span>
              <p className="cart-empty-text">Keranjang masih kosong</p>
              <p className="cart-empty-sub">Yuk pilih menu favoritmu!</p>
              <button className="btn-primary" onClick={closeCart}>
                Lihat Menu
              </button>
            </div>
          ) : (
            <>
              <ul className="cart-items-list">
                {items.map((item) => {
                  // Reconstruct minimal MenuItem for addItem
                  const menuItemRef: MenuItem = {
                    id: item.menuId,
                    name: item.name,
                    price: item.price,
                    image: item.image,
                    description: "",
                    category: "Serba Ayam",
                    hasParts: !!item.part,
                  };
                  return (
                    <li key={item.cartId} className="cart-item" id={`cart-item-${item.cartId}`}>
                      <div className="cart-item-image-wrapper">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          style={{ objectFit: "cover" }}
                          sizes="60px"
                        />
                      </div>
                      <div className="cart-item-info">
                        <p className="cart-item-name">{item.name}</p>
                        {item.part && (
                          <span className="cart-item-part-badge">{item.part}</span>
                        )}
                        <p className="cart-item-price">{formatPrice(item.price)}</p>
                      </div>
                      <div className="qty-control qty-control-sm">
                        <button
                          className="qty-btn"
                          onClick={() => removeItem(item.cartId)}
                          aria-label={`Kurangi ${item.name}`}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        </button>
                        <span className="qty-value">{item.quantity}</span>
                        <button
                          className="qty-btn qty-btn-inc"
                          onClick={() => addItem(menuItemRef, item.part)}
                          aria-label={`Tambah ${item.name}`}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        </button>
                      </div>
                      <p className="cart-item-subtotal">{formatPrice(item.price * item.quantity)}</p>
                    </li>
                  );
                })}
              </ul>

              <div className="cart-drawer-footer">
                <div className="cart-total-row">
                  <span className="cart-total-label">Total Pesanan</span>
                  <span className="cart-total-value">{formatPrice(total)}</span>
                </div>
                <button
                  id="checkout-btn"
                  className="btn-primary btn-full btn-lg"
                  onClick={() => { closeCart(); onCheckout(); }}
                >
                  🚀 Lanjut ke Checkout
                </button>
                <button
                  className="btn-ghost btn-full"
                  onClick={clearCart}
                >
                  Hapus Semua
                </button>
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
