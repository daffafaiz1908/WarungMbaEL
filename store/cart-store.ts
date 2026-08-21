"use client";

import { create } from "zustand";
import { MenuItem, AyamPart } from "@/data/menu";

export interface CartItem {
  cartId: string;      // unique key: menuId + part (e.g. "ayam-geprek-Dada")
  menuId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  part?: AyamPart;    // bagian ayam (opsional, hanya untuk menu hasParts)
}

interface CartStore {
  items: CartItem[];
  isCartOpen: boolean;
  toastMessage: string | null;
  addItem: (menuItem: MenuItem, part?: AyamPart) => void;
  removeItem: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  showToast: (message: string) => void;
  dismissToast: () => void;
  totalItems: () => number;
  totalPrice: () => number;
  getItemQty: (menuId: string, part?: AyamPart) => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isCartOpen: false,
  toastMessage: null,

  addItem: (menuItem: MenuItem, part?: AyamPart) => {
    const cartId = part ? `${menuItem.id}-${part}` : menuItem.id;
    const { items } = get();
    const existing = items.find((i) => i.cartId === cartId);

    if (existing) {
      set({
        items: items.map((i) =>
          i.cartId === cartId ? { ...i, quantity: i.quantity + 1 } : i
        ),
      });
    } else {
      set({
        items: [
          ...items,
          {
            cartId,
            menuId: menuItem.id,
            name: menuItem.name,
            price: menuItem.price,
            image: menuItem.image,
            quantity: 1,
            part,
          },
        ],
      });
    }

    const label = part ? `${menuItem.name} (${part})` : menuItem.name;
    get().showToast(`${label} ditambahkan ke keranjang! 🛒`);
  },

  removeItem: (cartId: string) => {
    const { items } = get();
    const existing = items.find((i) => i.cartId === cartId);
    if (!existing) return;
    if (existing.quantity <= 1) {
      set({ items: items.filter((i) => i.cartId !== cartId) });
    } else {
      set({
        items: items.map((i) =>
          i.cartId === cartId ? { ...i, quantity: i.quantity - 1 } : i
        ),
      });
    }
  },

  updateQuantity: (cartId: string, quantity: number) => {
    if (quantity <= 0) {
      set({ items: get().items.filter((i) => i.cartId !== cartId) });
    } else {
      set({
        items: get().items.map((i) =>
          i.cartId === cartId ? { ...i, quantity } : i
        ),
      });
    }
  },

  clearCart: () => set({ items: [] }),

  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),

  showToast: (message: string) => {
    set({ toastMessage: message });
    setTimeout(() => {
      set({ toastMessage: null });
    }, 3000);
  },

  dismissToast: () => set({ toastMessage: null }),

  totalItems: () => get().items.reduce((acc, i) => acc + i.quantity, 0),

  totalPrice: () =>
    get().items.reduce((acc, i) => acc + i.price * i.quantity, 0),

  getItemQty: (menuId: string, part?: AyamPart) => {
    const cartId = part ? `${menuId}-${part}` : menuId;
    return get().items.find((i) => i.cartId === cartId)?.quantity ?? 0;
  },
}));
