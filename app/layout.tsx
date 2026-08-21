import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Warung MbaEL — Ayam Geprek & Dimsum Terlezat",
  description:
    "Pesan Ayam Geprek Crispy, Chicken Popcorn, dan Aneka Dimsum langsung via WhatsApp. Dine-in, Takeaway, atau Delivery. Buka setiap hari!",
  keywords: ["warung", "ayam geprek", "dimsum", "delivery", "takeaway", "pesan via whatsapp"],
  openGraph: {
    title: "Warung MbaEL — Ayam Geprek & Dimsum",
    description: "Pesan menu favoritmu sekarang via WhatsApp. Cepat, mudah, tanpa antri!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={poppins.variable}>
      <body>{children}</body>
    </html>
  );
}
