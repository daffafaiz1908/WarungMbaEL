"use client";

import Image from "next/image";

interface HeroSectionProps {
  onOrderClick: () => void;
}

export default function HeroSection({ onOrderClick }: HeroSectionProps) {
  return (
    <section className="hero-section" id="hero">
      <div className="hero-image-wrapper">
        <Image
          src="/images/banner.jpeg"
          alt="Warung MbaEL Banner"
          fill
          priority
          style={{ objectFit: "cover" }}
          sizes="100vw"
        />
        <div className="hero-overlay" />
      </div>

      <div className="hero-content container">
        <div className="hero-badge">🔥 Buka Setiap Hari</div>
        <h1 className="hero-title">
          Warung <span className="hero-title-accent">MbaEL</span>
        </h1>
        <p className="hero-subtitle">
          Ayam Geprek Crispy &amp; Aneka Dimsum diantar<br />
          langsung ke <span className="hero-subtitle-bold">pintu rumahmu!</span>
        </p>
        <div className="hero-cta-group">
          <button
            id="hero-cta-btn"
            className="btn-primary btn-lg"
            onClick={onOrderClick}
          >
            🛒 Pesan Sekarang
          </button>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-num">⭐ 4.9</span>
              <span className="hero-stat-label">Rating</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-num">🛵 Delivery</span>
              <span className="hero-stat-label">ke rumahmu</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-num">⚡ Cepat</span>
              <span className="hero-stat-label">& Mudah</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <span>Scroll untuk lihat menu</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}
