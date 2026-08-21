"use client";

import { useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/store/cart-store";
import { redirectToWhatsApp, PaymentMethod } from "@/lib/whatsapp";
import { formatPrice } from "@/data/menu";

interface CheckoutFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutForm({ isOpen, onClose }: CheckoutFormProps) {
  const { items, totalPrice, clearCart } = useCartStore();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("Cash");
  const [errors, setErrors] = useState<{ name?: string; address?: string }>({});
  const [showQrisModal, setShowQrisModal] = useState(false);

  const total = totalPrice();

  const validate = () => {
    const newErrors: { name?: string; address?: string } = {};
    if (!name.trim()) newErrors.name = "Nama pemesan wajib diisi";
    if (!address.trim()) newErrors.address = "Alamat pengiriman wajib diisi";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFinalSubmit = () => {
    redirectToWhatsApp(
      items,
      { name, orderType: "Delivery", paymentMethod, address, notes },
      total
    );
    clearCart();
    setShowQrisModal(false);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (paymentMethod === "QRIS") {
      setShowQrisModal(true);
    } else {
      handleFinalSubmit();
    }
  };

  return (
    <>
      <div
        className={`drawer-backdrop ${isOpen ? "drawer-backdrop-open" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`checkout-drawer ${isOpen ? "cart-drawer-open" : ""}`}
        aria-label="Form checkout"
        aria-hidden={!isOpen}
      >
        <div className="cart-drawer-header">
          <div>
            <h2 className="cart-drawer-title">Detail Pengiriman</h2>
            <p className="cart-drawer-count">🛵 Delivery ke lokasi kamu</p>
          </div>
          <button
            id="checkout-close-btn"
            className="cart-close-btn"
            onClick={onClose}
            aria-label="Tutup form checkout"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="cart-drawer-body">
          {/* Order Summary */}
          <div className="checkout-summary">
            <h3 className="checkout-summary-title">Ringkasan Pesanan</h3>
            <ul className="checkout-summary-list">
              {items.map((item) => (
                <li key={item.cartId} className="checkout-summary-item">
                  <span>
                    {item.name}{item.part ? ` (${item.part})` : ""} x{item.quantity}
                  </span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="checkout-summary-total">
              <span>Total</span>
              <span className="text-accent font-bold">{formatPrice(total)}</span>
            </div>
          </div>

          {/* Form */}
          <form id="checkout-form" className="checkout-form" onSubmit={handleSubmit} noValidate>

            {/* Nama */}
            <div className="form-group">
              <label htmlFor="input-name" className="form-label">
                Nama Pemesan <span className="form-required">*</span>
              </label>
              <input
                id="input-name"
                type="text"
                className={`form-input ${errors.name ? "form-input-error" : ""}`}
                placeholder="Contoh: Budi Santoso"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
              {errors.name && <p className="form-error">{errors.name}</p>}
            </div>

            {/* Alamat Pengiriman */}
            <div className="form-group">
              <label htmlFor="input-address" className="form-label">
                Alamat Pengiriman <span className="form-required">*</span>
              </label>
              <textarea
                id="input-address"
                className={`form-input form-textarea ${errors.address ? "form-input-error" : ""}`}
                placeholder="Masukkan alamat lengkap pengiriman (RT/RW, nama jalan, patokan, dll.)"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
              />
              {errors.address && <p className="form-error">{errors.address}</p>}
            </div>

            {/* Metode Pembayaran */}
            <div className="form-group">
              <label className="form-label">
                Metode Pembayaran <span className="form-required">*</span>
              </label>
              <div className="payment-method-group">

                {/* Cash */}
                <label
                  htmlFor="payment-cash"
                  className={`payment-method-card ${paymentMethod === "Cash" ? "payment-method-card-active" : ""}`}
                >
                  <input
                    id="payment-cash"
                    type="radio"
                    name="paymentMethod"
                    value="Cash"
                    checked={paymentMethod === "Cash"}
                    onChange={() => setPaymentMethod("Cash")}
                    className="sr-only"
                  />
                  <div className="payment-method-icon payment-method-icon-cash">💵</div>
                  <div className="payment-method-info">
                    <span className="payment-method-name">Cash</span>
                    <span className="payment-method-desc">Bayar tunai saat pesanan tiba</span>
                  </div>
                  <div className={`payment-method-check ${paymentMethod === "Cash" ? "payment-method-check-active" : ""}`}>
                    {paymentMethod === "Cash" && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                </label>

                {/* QRIS */}
                <label
                  htmlFor="payment-qris"
                  className={`payment-method-card ${paymentMethod === "QRIS" ? "payment-method-card-active" : ""}`}
                >
                  <input
                    id="payment-qris"
                    type="radio"
                    name="paymentMethod"
                    value="QRIS"
                    checked={paymentMethod === "QRIS"}
                    onChange={() => setPaymentMethod("QRIS")}
                    className="sr-only"
                  />
                  <div className="payment-method-icon payment-method-icon-qris">📱</div>
                  <div className="payment-method-info">
                    <span className="payment-method-name">QRIS</span>
                    <span className="payment-method-desc">Scan QR — GoPay, OVO, Dana, dll.</span>
                  </div>
                  <div className={`payment-method-check ${paymentMethod === "QRIS" ? "payment-method-check-active" : ""}`}>
                    {paymentMethod === "QRIS" && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                </label>

              </div>
            </div>

            {/* Catatan */}
            <div className="form-group">
              <label htmlFor="input-notes" className="form-label">
                Catatan Tambahan <span className="form-optional">(opsional)</span>
              </label>
              <textarea
                id="input-notes"
                className="form-input form-textarea"
                placeholder="Contoh: Sambal dipisah, tidak pedas, dll."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
              />
            </div>

            <div className="cart-drawer-footer">
              <button
                id="submit-whatsapp-btn"
                type="submit"
                className="btn-whatsapp btn-full btn-lg"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Kirim Pesanan via WhatsApp
              </button>
            </div>
          </form>
        </div>
      </aside>

      {/* QRIS Modal */}
      {showQrisModal && (
        <>
          <div className="modal-backdrop" onClick={() => setShowQrisModal(false)} aria-hidden="true" />
          <div className="qris-modal" role="dialog" aria-labelledby="qris-title">
            <h3 id="qris-title" className="qris-title">Pembayaran QRIS</h3>
            <p className="qris-desc">Silakan scan kode QR di bawah ini dengan aplikasi e-wallet atau m-banking kamu.</p>
            
            <div className="qris-image-wrapper">
              <Image 
                src="/images/qris.jpg" 
                alt="QRIS Warung MbaEL" 
                fill 
                style={{ objectFit: "contain" }} 
              />
            </div>
            
            <div className="qris-amount-box">
              <span>Total Tagihan:</span>
              <span className="qris-amount">{formatPrice(total)}</span>
            </div>
            
            <p className="qris-note">⚠️ <strong>Penting:</strong> Masukkan nominal sesuai total tagihan dan simpan bukti transfer untuk dilampirkan ke WhatsApp.</p>
            
            <div className="qris-actions">
              <button className="btn-whatsapp btn-full" onClick={handleFinalSubmit}>
                Saya Sudah Bayar, Lanjut ke WA
              </button>
              <button className="btn-ghost btn-full" onClick={() => setShowQrisModal(false)}>
                Tutup
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
