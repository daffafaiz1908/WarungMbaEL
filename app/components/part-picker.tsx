"use client";

import { AyamPart, AYAM_PARTS, MenuItem, formatPrice } from "@/data/menu";
import { useCartStore } from "@/store/cart-store";

interface PartPickerProps {
  item: MenuItem;
  isOpen: boolean;
  onClose: () => void;
}

export default function PartPicker({ item, isOpen, onClose }: PartPickerProps) {
  const { addItem, getItemQty, removeItem } = useCartStore();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="part-picker-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Bottom Sheet */}
      <div className="part-picker" role="dialog" aria-modal="true" aria-label="Pilih bagian ayam">
        <div className="part-picker-handle" />

        <div className="part-picker-header">
          <div className="part-picker-item-info">
            <span className="part-picker-title">{item.name}</span>
            <span className="part-picker-price">{formatPrice(item.price)}</span>
          </div>
          <button
            className="cart-close-btn"
            onClick={onClose}
            aria-label="Tutup"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <p className="part-picker-label">Pilih Bagian Ayam</p>

        <ul className="part-picker-list">
          {AYAM_PARTS.map((part) => {
            const qty = getItemQty(item.id, part);
            return (
              <li key={part} className="part-picker-row">
                <div className="part-picker-row-info">
                  <span className="part-picker-part-name">{part}</span>
                </div>
                <div className="qty-control">
                  {qty > 0 ? (
                    <>
                      <button
                        className="qty-btn"
                        onClick={() => removeItem(`${item.id}-${part}`)}
                        aria-label={`Kurangi ${part}`}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </button>
                      <span className="qty-value">{qty}</span>
                    </>
                  ) : (
                    <span className="qty-value" style={{ color: "transparent", userSelect: "none" }}>0</span>
                  )}
                  <button
                    id={`part-add-${item.id}-${part.replace(/\s+/g, "-").toLowerCase()}`}
                    className="qty-btn qty-btn-inc"
                    onClick={() => addItem(item, part as AyamPart)}
                    aria-label={`Tambah ${part}`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="part-picker-footer">
          <button className="btn-primary btn-full" onClick={onClose}>
            Selesai Pilih
          </button>
        </div>
      </div>
    </>
  );
}
