import "./LocationAccess.css";

export default function LocationAccess() {
  return (
    <section className="location-section">
      <div className="location-intro">
        <div>
          <span className="location-eyebrow">Location & Access</span>
          <h2>Find us at Capador Mall with fast Wi-Fi and remote-worker friendly facilities.</h2>
        </div>
        <p>
          Cafe Flour welcomes guests with free Wi-Fi, quiet seating, and easy mall access for a productive remote work experience.
        </p>
      </div>

      <div className="location-grid">
        <div className="location-map-card">
          <div className="map-label">Capador Mall</div>
          <div className="map-wrap">
            <iframe
              title="Cafe Flour Capador Mall"
              src="https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=Capador+Mall"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>

        <div className="location-details-card">
          <div className="details-label">Facilities for remote work</div>
          <ul className="facility-list">
            <li>
              <strong>Free Wi-Fi</strong>
              <p>High-speed coverage across the café and seating lounge.</p>
            </li>
            <li>
              <strong>Power outlets</strong>
              <p>Plenty of outlets near tables and shared benches.</p>
            </li>
            <li>
              <strong>Quiet zones</strong>
              <p>Reserved tables for focused work and small meetings.</p>
            </li>
            <li>
              <strong>Meeting-ready</strong>
              <p>Comfortable spaces for video calls and group check-ins.</p>
            </li>
          </ul>
          <div className="location-footer">
            <div>
              <span>Hours</span>
              <p>Mon-Sun · 8am - 10pm</p>
            </div>
            <div>
              <span>Parking</span>
              <p>Free mall parking with direct cafe access.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
