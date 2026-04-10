import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-grid">
        <div className="hero-copy">
          <span className="hero-eyebrow">Signature brunch & interior</span>
          <h1>High-end café dining in every detail</h1>
          <p>
            Step into Cafe Flour for elegant interiors, polished service, and
            curated dishes like our indulgent Hazelnut Crepes finished with
            toasted almonds and warm caramel.
          </p>
          <div className="hero-copy-buttons">
            <a href="/order" className="hero-button hero-button-primary">
              Order Now
            </a>
            <a
              href="https://wa.me/1234567890"
              className="hero-button hero-button-secondary">
              WhatsApp
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-panel hero-panel-interior">
            <div className="panel-label">Interior</div>
            <div className="panel-image"></div>
            <div className="panel-text">
              Luxurious seating, soft mood lighting and artisan details.
            </div>
          </div>

          <div className="hero-panel hero-panel-dish">
            <div className="panel-label">Signature Dish</div>
            <div className="panel-image panel-image-crepes">
              <div className="dish-tag">Hazelnut Crepes</div>
            </div>
            <div className="panel-text">
              A gourmet crepe plated with fresh berries, hazelnut cream, and
              crunchy praline.
            </div>
          </div>

          <div className="hero-float-buttons">
            <a href="/order" className="floating-button floating-button-order">
              Order Now
            </a>
            <a
              href="https://wa.me/1234567890"
              className="floating-button floating-button-whatsapp">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
