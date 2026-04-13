import { useEffect, useState } from "react";
import "./Hero.css";
const backgroundVideo = new URL("../background vid.mp4", import.meta.url).href;

const heroImageQueries = {
  interior: "cafe interior cozy seating restaurant ambiance",
  dish: "hazelnut crepes dessert gourmet plated",
};

export default function Hero() {
  const [heroImages, setHeroImages] = useState({ interior: "", dish: "" });
  const pixabayKey = import.meta.env.VITE_PIXABAY_KEY;

  useEffect(() => {
    if (!pixabayKey) return;

    const controller = new AbortController();
    const fetchImage = async (query) => {
      const params = new URLSearchParams({
        key: pixabayKey,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        per_page: "3",
        safesearch: "true",
      });
      const response = await fetch(
        `https://pixabay.com/api/?${params.toString()}`,
        {
          signal: controller.signal,
        },
      );
      if (!response.ok) return null;
      const result = await response.json().catch(() => null);
      return (
        result?.hits?.[0]?.largeImageURL ||
        result?.hits?.[0]?.webformatURL ||
        result?.hits?.[0]?.previewURL ||
        null
      );
    };

    const loadImages = async () => {
      const [interiorUrl, dishUrl] = await Promise.all([
        fetchImage(heroImageQueries.interior),
        fetchImage(heroImageQueries.dish),
      ]);
      setHeroImages({
        interior: interiorUrl || "",
        dish: dishUrl || "",
      });
    };

    loadImages();
    return () => controller.abort();
  }, [pixabayKey]);

  return (
    <section className="hero-section">
      <video
        className="hero-bg-video"
        autoPlay
        muted
        loop
        playsInline
        src={backgroundVideo}
      />
      <div className="hero-overlay"></div>
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
              className="hero-button hero-button-secondary"
              aria-label="WhatsApp">
              <span className="whatsapp-icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="currentColor"
                  aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.47-.148-.669.15-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.15-.174.199-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.21-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.064 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.261.489 1.692.626.71.227 1.356.195 1.868.118.57-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M20.52 3.48A10.957 10.957 0 0012 1.5C6.21 1.5 1.5 6.21 1.5 12a10.41 10.41 0 001.43 5.2L1.5 22.5l5.99-1.57A10.956 10.956 0 0012 22.5c5.79 0 10.5-4.71 10.5-10.5 0-2.8-1.1-5.43-3-7.53zm-8.52 16.47c-2.32 0-4.5-.74-6.3-2.12l-.45-.3-3.56.93.96-3.47-.31-.46A8.503 8.503 0 013 12c0-4.69 3.81-8.5 8.5-8.5 4.69 0 8.5 3.81 8.5 8.5 0 4.69-3.81 8.5-8.5 8.5z" />
                </svg>
              </span>
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-panel hero-panel-interior">
            <div className="panel-label">Interior</div>
            <div
              className="panel-image"
              style={
                heroImages.interior
                  ? { backgroundImage: `url(${heroImages.interior})` }
                  : undefined
              }></div>
            <div className="panel-text">
              Luxurious seating, soft mood lighting and artisan details.
            </div>
          </div>

          <div className="hero-panel hero-panel-dish">
            <div className="panel-label">Signature Dish</div>
            <div
              className="panel-image panel-image-crepes"
              style={
                heroImages.dish
                  ? { backgroundImage: `url(${heroImages.dish})` }
                  : undefined
              }>
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
              className="floating-button floating-button-whatsapp"
              aria-label="WhatsApp">
              <span className="whatsapp-icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="currentColor"
                  aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.47-.148-.669.15-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.15-.174.199-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.21-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.064 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.261.489 1.692.626.71.227 1.356.195 1.868.118.57-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M20.52 3.48A10.957 10.957 0 0012 1.5C6.21 1.5 1.5 6.21 1.5 12a10.41 10.41 0 001.43 5.2L1.5 22.5l5.99-1.57A10.956 10.956 0 0012 22.5c5.79 0 10.5-4.71 10.5-10.5 0-2.8-1.1-5.43-3-7.53zm-8.52 16.47c-2.32 0-4.5-.74-6.3-2.12l-.45-.3-3.56.93.96-3.47-.31-.46A8.503 8.503 0 013 12c0-4.69 3.81-8.5 8.5-8.5 4.69 0 8.5 3.81 8.5 8.5 0 4.69-3.81 8.5-8.5 8.5z" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
