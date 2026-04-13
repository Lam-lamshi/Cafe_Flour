import "./LocationAccess.css";

const mapPlaceUrl =
  "https://www.google.com/maps/place/cafe+flour/data=!4m2!3m1!1s0x104e0b865c88d6dd:0x809a36c12927d848?sa=X&ved=1t:242&ictx=111";
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent("Cafe Flour Abuja")}&travelmode=driving`;

export default function LocationAccess() {
  return (
    <section className="location-section">
      <div className="location-intro">
        <div>
          <span className="location-eyebrow">Location & Access</span>
          <h2>
            Find us in Abuja at Cafe Flour — a central café hub with fast Wi-Fi
            and remote-worker friendly facilities.
          </h2>
        </div>
        <p>
          Cafe Flour welcomes guests with free Wi-Fi, quiet seating, and easy
          mall access for a productive remote work experience.
        </p>
      </div>

      <div className="location-grid">
        <div className="location-map-card">
          <div className="map-label">Cafe Flour Abuja</div>
          <div className="map-wrap">
            <iframe
              title="Cafe Flour Abuja"
              src="https://maps.google.com/maps?q=cafe+flour+abuja&t=&z=15&ie=UTF8&iwloc=&output=embed"
              allowFullScreen
              loading="lazy"
            />
          </div>
          <div className="direction-actions">
            <a
              href={directionsUrl}
              className="direction-button"
              target="_blank"
              rel="noreferrer"
              aria-label="Get directions to Cafe Flour Abuja">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 4.66 4.25 10.04 6.28 11.7a1 1 0 0 0 1.44 0C14.75 19.04 19 13.66 19 9c0-3.87-3.13-7-7-7zm0 12.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z" />
              </svg>
              <span>Directions</span>
            </a>
            <a
              href={mapPlaceUrl}
              className="map-link-button"
              target="_blank"
              rel="noreferrer"
              aria-label="Open Cafe Flour Abuja in Google Maps">
              View on Google Maps
            </a>
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
