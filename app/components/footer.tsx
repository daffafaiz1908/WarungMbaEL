export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">🍗 Warung MbaEL</span>
          <p className="footer-tagline">Delivery Ayam Geprek &amp; Dimsum</p>
        </div>
        <div className="footer-info">
          <div className="footer-item">
            <span>📍</span>
            <span>MCK Cipinang Jaya, Jakarta Timur</span>
          </div>
          <div className="footer-item">
            <span>🕐</span>
            <span>Delivery Setiap Hari 13.00 – 22.00</span>
          </div>
          <div className="footer-item">
            <span>📱</span>
            <span>WhatsApp: 0877-7620-1989</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Warung MbaEL. Made with ❤️</p>
      </div>
    </footer>
  );
}
