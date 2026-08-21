"use client";

import { useState, useRef } from "react";
import Header from "@/app/components/header";
import HeroSection from "@/app/components/hero-section";
import MenuCatalog from "@/app/components/menu-catalog";
import CartButton from "@/app/components/cart-button";
import CartDrawer from "@/app/components/cart-drawer";
import CheckoutForm from "@/app/components/checkout-form";
import Toast from "@/app/components/toast";
import Footer from "@/app/components/footer";

export default function Home() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const menuRef = useRef<HTMLElement | null>(null);

  const scrollToMenu = () => {
    const menu = document.getElementById("menu");
    if (menu) menu.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Header />

      <main>
        <HeroSection onOrderClick={scrollToMenu} />
        <section ref={menuRef}>
          <MenuCatalog />
        </section>
        <Footer />
      </main>

      {/* Overlays */}
      <CartButton />
      <CartDrawer onCheckout={() => setIsCheckoutOpen(true)} />
      <CheckoutForm
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
      <Toast />
    </>
  );
}
