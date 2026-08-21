"use client";

import { useState } from "react";
import Image from "next/image";
import { MenuItem, formatPrice } from "@/data/menu";
import { useCartStore } from "@/store/cart-store";
import PartPicker from "./part-picker";

interface MenuCardProps {
  item: MenuItem;
}

export default function MenuCard({ item }: MenuCardProps) {
  const { items, addItem, removeItem, getItemQty } = useCartStore();
  const [partPickerOpen, setPartPickerOpen] = useState(false);

  // Untuk item tanpa parts: pakai cartId = menuId langsung
  const cartItem = item.hasParts
    ? null
    : items.find((i) => i.cartId === item.id);
  const qty = cartItem?.quantity ?? 0;

  // Hitung total qty semua parts untuk item hasParts
  const totalPartsQty = item.hasParts
    ? items
        .filter((i) => i.menuId === item.id)
        .reduce((acc, i) => acc + i.quantity, 0)
    : 0;

  return (
    <>
      <article className="menu-card" id={`menu-card-${item.id}`}>
        <div className="menu-card-image-wrapper">
          <Image
            src={item.image}
            alt={item.name}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 480px) 50vw, 200px"
            className="menu-card-image"
          />
          {item.badge && (
            <span className="menu-card-badge">{item.badge}</span>
          )}
        </div>

        <div className="menu-card-body">
          <h3 className="menu-card-name">{item.name}</h3>
          <p className="menu-card-desc">{item.description}</p>
          <div className="menu-card-footer">
            <span className="menu-card-price">{formatPrice(item.price)}</span>

            {/* Item DENGAN pilih bagian ayam */}
            {item.hasParts ? (
              <button
                id={`add-${item.id}`}
                className={`btn-add ${totalPartsQty > 0 ? "btn-add-active" : ""}`}
                onClick={() => setPartPickerOpen(true)}
                aria-label={`Pilih bagian ${item.name}`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                {totalPartsQty > 0 ? `Pilih (${totalPartsQty})` : "Pilih Bagian"}
              </button>
            ) : (
              /* Item TANPA pilih bagian (dimsum, minuman, dll) */
              qty === 0 ? (
                <button
                  id={`add-${item.id}`}
                  className="btn-add"
                  onClick={() => addItem(item)}
                  aria-label={`Tambah ${item.name} ke keranjang`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  Tambah
                </button>
              ) : (
                <div className="qty-control">
                  <button
                    id={`dec-${item.id}`}
                    className="qty-btn"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Kurangi ${item.name}`}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>
                  <span className="qty-value">{qty}</span>
                  <button
                    id={`inc-${item.id}`}
                    className="qty-btn qty-btn-inc"
                    onClick={() => addItem(item)}
                    aria-label={`Tambah lagi ${item.name}`}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>
                </div>
              )
            )}
          </div>
        </div>
      </article>

      {/* Part Picker bottom sheet */}
      {item.hasParts && (
        <PartPicker
          item={item}
          isOpen={partPickerOpen}
          onClose={() => setPartPickerOpen(false)}
        />
      )}
    </>
  );
}
