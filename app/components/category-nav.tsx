"use client";

import { MenuCategory, categories } from "@/data/menu";

interface CategoryNavProps {
  activeCategory: MenuCategory | "Semua";
  onSelect: (category: MenuCategory | "Semua") => void;
}

const categoryEmojis: Record<MenuCategory | "Semua", string> = {
  Semua: "🍽️",
  "Serba Ayam": "🍗",
  "Aneka Dimsum": "🥟",
  "Minuman & Tambahan": "🧃",
};

export default function CategoryNav({ activeCategory, onSelect }: CategoryNavProps) {
  const all: (MenuCategory | "Semua")[] = ["Semua", ...categories];

  return (
    <nav className="category-nav" aria-label="Navigasi kategori menu">
      <div className="category-nav-inner">
        {all.map((cat) => (
          <button
            key={cat}
            id={`cat-btn-${cat.replace(/\s+/g, "-").toLowerCase()}`}
            className={`category-btn ${activeCategory === cat ? "category-btn-active" : ""}`}
            onClick={() => onSelect(cat)}
          >
            <span className="category-btn-emoji">{categoryEmojis[cat]}</span>
            <span>{cat}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
