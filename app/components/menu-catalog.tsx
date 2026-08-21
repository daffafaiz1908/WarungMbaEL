"use client";

import { useState } from "react";
import { menuItems, categories, MenuCategory } from "@/data/menu";
import MenuCard from "./menu-card";
import CategoryNav from "./category-nav";

export default function MenuCatalog() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory | "Semua">("Semua");

  const filtered =
    activeCategory === "Semua"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  const groupedCategories =
    activeCategory === "Semua" ? categories : [activeCategory as MenuCategory];

  return (
    <section className="catalog-section" id="menu">
      <div className="container">
        <div className="catalog-header">
          <h2 className="catalog-title">
            Menu <span className="text-accent">Pilihan</span>
          </h2>
          <p className="catalog-subtitle">
            Semua dibuat fresh, dimasak dengan cinta 🤍
          </p>
        </div>

        <div className="catalog-sticky-nav">
          <CategoryNav activeCategory={activeCategory} onSelect={setActiveCategory} />
        </div>

        {groupedCategories.map((cat) => {
          const items = filtered.filter(
            activeCategory === "Semua" ? (i) => i.category === cat : () => true
          );
          if (items.length === 0) return null;
          return (
            <div key={cat} className="catalog-group" id={`cat-${cat.replace(/\s+/g, "-").toLowerCase()}`}>
              {activeCategory === "Semua" && (
                <h3 className="catalog-group-title">
                  {cat === "Serba Ayam" && "🍗 "}
                  {cat === "Aneka Dimsum" && "🥟 "}
                  {cat === "Minuman & Tambahan" && "🧃 "}
                  {cat}
                </h3>
              )}
              <div className="menu-grid">
                {items.map((item) => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
