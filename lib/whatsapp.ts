import { CartItem } from "@/store/cart-store";
import { formatPrice } from "@/data/menu";

export type OrderType = "Dine-in" | "Takeaway" | "Delivery";
export type PaymentMethod = "Cash" | "QRIS";

export interface CheckoutData {
  name: string;
  orderType: OrderType;
  paymentMethod: PaymentMethod;
  address?: string;
  notes?: string;
}

const ADMIN_PHONE = "6287776201989"; // WhatsApp Warung MbaEL

export function generateWhatsAppMessage(
  items: CartItem[],
  checkout: CheckoutData,
  totalPrice: number
): string {
  const itemLines = items
    .map((item) => {
      const partLabel = item.part ? ` (${item.part})` : "";
      return `  • ${item.name}${partLabel} x${item.quantity} = ${formatPrice(item.price * item.quantity)}`;
    })
    .join("\n");

  const addressLine =
    checkout.orderType === "Delivery" && checkout.address
      ? `\n📍 Alamat Pengiriman: ${checkout.address}`
      : "";

  const notesLine = checkout.notes
    ? `\n📝 Catatan: ${checkout.notes}`
    : "";

  const paymentIcon = checkout.paymentMethod === "QRIS" ? "📱" : "💵";

  const qrisNote = checkout.paymentMethod === "QRIS"
    ? `\n\n📌 *Catatan Pembayaran:*\nSaya sudah transfer via QRIS sejumlah ${formatPrice(totalPrice)}. Berikut saya lampirkan screenshot bukti transfernya.`
    : "";

  const message = `Halo Warung MbaEL! 👋

Saya ingin memesan:

${itemLines}

━━━━━━━━━━━━━━━━━
💰 *Total: ${formatPrice(totalPrice)}*
━━━━━━━━━━━━━━━━━

👤 Nama: ${checkout.name}
🛵 Tipe Pesanan: Delivery${addressLine}
${paymentIcon} Pembayaran: ${checkout.paymentMethod}${notesLine}${qrisNote}

Mohon konfirmasi pesanan saya. Terima kasih! 🙏`;

  return message;
}

export function redirectToWhatsApp(
  items: CartItem[],
  checkout: CheckoutData,
  totalPrice: number
): void {
  const message = generateWhatsAppMessage(items, checkout, totalPrice);
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${ADMIN_PHONE}?text=${encodedMessage}`;
  window.open(url, "_blank");
}
