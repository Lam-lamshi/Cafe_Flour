import "./SocialFeed.css";

const instagramUrl = "https://www.instagram.com/flour_abuja/";

const dailySpecials = [
  { name: "Morning Matcha Latte", note: "Available until 11am" },
  {
    name: "Lotus Cheesecake Slice",
    note: "Freshly plated with caramel shards",
  },
  { name: "Red Velvet Afternoon", note: "Limited daily batch" },
];

const instagramPosts = [
  {
    id: "1",
    link: instagramUrl,
    imageUrl:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80",
    tag: "flour_abuja",
  },
  {
    id: "2",
    link: instagramUrl,
    imageUrl:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
    tag: "cafevibes",
  },
  {
    id: "3",
    link: instagramUrl,
    imageUrl:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80",
    tag: "coffeegram",
  },
];

export default function SocialFeed() {
  return (
    <section className="social-section">
      <div className="social-hero">
        <div>
          <span className="social-eyebrow">Live Social Feed</span>
          <h2>
            See the latest Instagram posts and daily specials in real time.
          </h2>
          <p>
            Our Instagram grid updates automatically with new café moments,
            while the freshest daily specials keep customers engaged.
          </p>
        </div>
        <a
          className="social-cta social-cta-bounce"
          href={instagramUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Open Cafe Flour Abuja Instagram page">
          <svg
            className="insta-icon"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true">
            <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7.25a4.75 4.75 0 1 1 0 9.5 4.75 4.75 0 0 1 0-9.5zm0 1.5a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5zm4.63-.88a1.13 1.13 0 1 1 0 2.25 1.13 1.13 0 0 1 0-2.25z" />
          </svg>
          <span>@flour_abuja</span>
        </a>
      </div>

      <div className="social-grid-wrapper">
        <div className="social-grid">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href={post.link}
              className="social-card"
              target="_blank"
              rel="noreferrer">
              <img src={post.imageUrl} alt={`Instagram post ${post.tag}`} />
              <div className="social-overlay">
                <span>#{post.tag}</span>
              </div>
            </a>
          ))}
        </div>

        <aside className="social-specials">
          <div className="specials-header">Daily Specials</div>
          <ul>
            {dailySpecials.map((special) => (
              <li key={special.name}>
                <strong>{special.name}</strong>
                <span>{special.note}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
