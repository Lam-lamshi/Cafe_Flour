import { useEffect, useState } from "react";
import "./SocialFeed.css";

const dailySpecials = [
  { name: "Morning Matcha Latte", note: "Available until 11am" },
  {
    name: "Lotus Cheesecake Slice",
    note: "Freshly plated with caramel shards",
  },
  { name: "Red Velvet Afternoon", note: "Limited daily batch" },
];

export default function SocialFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_INSTAGRAM_API_URL || "/api/instagram";

  useEffect(() => {
    const controller = new AbortController();

    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${apiUrl}?limit=6`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Instagram API error ${response.status}`);
        }

        const data = await response.json();
        if (!Array.isArray(data.posts)) {
          throw new Error("Invalid Instagram API response");
        }

        setPosts(data.posts);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Unable to load Instagram posts.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
    return () => controller.abort();
  }, [apiUrl]);

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
          className="social-cta"
          href="https://www.instagram.com/yourcafehandle"
          target="_blank"
          rel="noreferrer">
          Follow on Instagram
        </a>
      </div>

      <div className="social-grid-wrapper">
        <div className="social-grid">
          {loading && (
            <div className="social-placeholder">Loading posts...</div>
          )}
          {error && <div className="social-placeholder error">{error}</div>}
          {!loading && !error && posts.length === 0 && (
            <div className="social-placeholder">No posts available yet.</div>
          )}
          {!loading &&
            !error &&
            posts.map((post) => (
              <a
                key={post.id}
                href={post.link}
                className="social-card"
                target="_blank"
                rel="noreferrer">
                <img
                  src={post.imageUrl}
                  alt={post.caption || "Instagram post"}
                />
                <div className="social-overlay">
                  <span>#{post.tag || "CafeFlour"}</span>
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
