export type MenuCategory =
  | "Serba Ayam"
  | "Aneka Dimsum"
  | "Minuman & Tambahan";

export type AyamPart = "Dada" | "Paha Atas" | "Paha Bawah" | "Sayap";
export const AYAM_PARTS: AyamPart[] = ["Dada", "Paha Atas", "Paha Bawah", "Sayap"];

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  image: string;
  badge?: string;
  hasParts?: boolean; // true = tampilkan pilih bagian ayam
}

export const categories: MenuCategory[] = [
  "Serba Ayam",
  "Aneka Dimsum",
  "Minuman & Tambahan",
];

export const menuItems: MenuItem[] = [
  // Serba Ayam
  {
    id: "ayam-geprek",
    name: "Ayam Geprek",
    description: "Ayam crispy geprek dengan sambal bawang pedas yang menggugah selera, disajikan hangat.",
    price: 11000,
    category: "Serba Ayam",
    image: "/images/ayam-geprek.jpg",
    badge: "Terlaris",
    hasParts: true,
  },
  {
    id: "ayam-geprek-nasi",
    name: "Ayam Geprek + Nasi",
    description: "Ayam geprek crispy sambal bawang pedas lengkap dengan nasi putih pulen hangat.",
    price: 16000,
    category: "Serba Ayam",
    image: "/images/ayam-geprek.jpg",
    badge: "Hemat",
    hasParts: true,
  },

  // Aneka Dimsum
  {
    id: "dimsum-chili-oil",
    name: "Dimsum Chili Oil",
    description: "Dimsum siomay kukus spesial dengan siraman saus chili oil pedas manis yang khas.",
    price: 20000,
    category: "Aneka Dimsum",
    image: "/images/dimsum-chili-oil.jpg",
    badge: "Spesial",
  },
  {
    id: "dimsum-biasa",
    name: "Dimsum Biasa",
    description: "Siomay dan hakau kukus klasik dengan saus kacang dan kecap manis.",
    price: 15000,
    category: "Aneka Dimsum",
    image: "/images/dimsum-original.jpg",
  },

  // Minuman & Tambahan
  {
    id: "es-teh-manis",
    name: "Es Teh Manis",
    description: "Teh manis segar dengan es batu, menyegarkan dan cocok untuk segala menu.",
    price: 5000,
    category: "Minuman & Tambahan",
    image: "/images/es-teh.jpg",
  },
  {
    id: "es-jeruk",
    name: "Es Jeruk Peras",
    description: "Jeruk segar diperas langsung, manis segar tanpa pengawet.",
    price: 8000,
    category: "Minuman & Tambahan",
    image: "/images/es-jeruk.jpg",
  },
  {
    id: "nasi",
    name: "Nasi Putih",
    description: "Nasi putih pulen hangat sebagai pelengkap lauk.",
    price: 4000,
    category: "Minuman & Tambahan",
    image: "/images/nasi.jpg",
  },
  {
    id: "extra-sambal",
    name: "Extra Sambal",
    description: "Tambahan sambal bawang pedas untuk kamu yang suka ekstra pedes.",
    price: 2000,
    category: "Minuman & Tambahan",
    image: "/images/sambal.jpg",
  },
];

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};
