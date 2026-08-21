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
    description: "Ayam geprek crispy dengan sambal pilihan yang menggugah selera.",
    price: 18000,
    category: "Serba Ayam",
    image: "/images/ayam-geprek.jpg",
    badge: "Terlaris",
    hasParts: true,
  },
  {
    id: "ayam-saja",
    name: "Ayam Saja",
    description: "Ayam crispy renyah tanpa tambahan bumbu atau sambal.",
    price: 14000,
    category: "Serba Ayam",
    image: "/images/ayam-crispy.jpg",
    hasParts: true,
  },

  // Aneka Dimsum
  {
    id: "dimsum-mentai-4",
    name: "Dimsum Mentai (Isi 4)",
    description: "Dimsum mentai premium isi 4 pcs. Free chili oil.",
    price: 16000,
    category: "Aneka Dimsum",
    image: "/images/dimsum-mentai.jpg",
  },
  {
    id: "dimsum-mentai-6",
    name: "Dimsum Mentai (Isi 6)",
    description: "Dimsum mentai premium isi 6 pcs. Free chili oil.",
    price: 25000,
    category: "Aneka Dimsum",
    image: "/images/dimsum-mentai.jpg",
    badge: "Hemat",
  },
  {
    id: "dimsum-mentai-8",
    name: "Dimsum Mentai (Isi 8)",
    description: "Dimsum mentai premium isi 8 pcs. Free chili oil.",
    price: 30000,
    category: "Aneka Dimsum",
    image: "/images/dimsum-mentai.jpg",
  },
  {
    id: "dimsum-mentai-16",
    name: "Dimsum Mentai (Isi 16)",
    description: "Dimsum mentai porsi besar isi 16 pcs. Free chili oil.",
    price: 62000,
    category: "Aneka Dimsum",
    image: "/images/dimsum-mentai.jpg",
    badge: "Porsi Keluarga",
  },
  {
    id: "dimsum-mentai-20",
    name: "Dimsum Mentai (Isi 20)",
    description: "Dimsum mentai porsi jumbo isi 20 pcs. Free chili oil.",
    price: 75000,
    category: "Aneka Dimsum",
    image: "/images/dimsum-mentai.jpg",
  },
  {
    id: "dimsum-original-4",
    name: "Dimsum Original (Isi 4)",
    description: "Dimsum original isi 4 pcs.",
    price: 12000,
    category: "Aneka Dimsum",
    image: "/images/dimsum-original.jpg",
  },

  // Minuman & Tambahan
  {
    id: "nasi-putih",
    name: "Nasi Putih",
    description: "Nasi putih pulen hangat.",
    price: 5000,
    category: "Minuman & Tambahan",
    image: "/images/nasi.jpg",
  },
  {
    id: "sambal-geprek",
    name: "Sambal Geprek",
    description: "Tambahan sambal geprek.",
    price: 3000,
    category: "Minuman & Tambahan",
    image: "/images/sambal.jpg",
  },
  {
    id: "sambal-lava",
    name: "Sambal Lava",
    description: "Tambahan sambal lava pedas gila.",
    price: 3000,
    category: "Minuman & Tambahan",
    image: "/images/sambal.jpg",
  },
  {
    id: "good-day",
    name: "Es Good Day",
    description: "Minuman kopi Good Day dingin.",
    price: 7000,
    category: "Minuman & Tambahan",
    image: "/images/es-teh.jpg",
  },
  {
    id: "nutrisari",
    name: "Es Nutrisari",
    description: "Minuman rasa jeruk Nutrisari dingin menyegarkan.",
    price: 5000,
    category: "Minuman & Tambahan",
    image: "/images/es-jeruk.jpg", 
  }
];

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};
