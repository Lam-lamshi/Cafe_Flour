import { useEffect, useRef, useState } from "react";
import "./Menu.css";

const bakeryHighlights = [
  {
    id: "lotus",
    title: "Lotus Cheesecake",
    tagline: "Crunchy biscuit base with silky, caramelized layers.",
    price: "9.95",
    detail:
      "A refined cheesecake finished with fragrant lotus biscuit crumbs and a caramel drizzle.",
  },
  {
    id: "lemon",
    title: "Lemon Cake Slices",
    tagline: "Bright citrus sponge with velvety lemon curd.",
    price: "8.25",
    detail:
      "Light lemon cake layered with fresh lemon curd and topped with white chocolate pearls.",
  },
  {
    id: "redvelvet",
    title: "Red Velvet Specialties",
    tagline: "Velvety red sponge with cream cheese finish.",
    price: "9.50",
    detail:
      "Decadent red velvet paired with house-made cream cheese frosting and raspberries.",
  },
];

export default function Menu({ menuSections }) {
  const [activeBakery, setActiveBakery] = useState(bakeryHighlights[0].id);
  const [imageUrls, setImageUrls] = useState({});
  const activeItem = bakeryHighlights.find((item) => item.id === activeBakery);
  const spoonacularKey = import.meta.env.VITE_SPOONACULAR_KEY;
  const customApiEndpoint = import.meta.env.VITE_MENU_IMAGE_API_URL;
  const bakeryCardGridRef = useRef(null);
  const apiEndpoint = spoonacularKey
    ? "https://api.spoonacular.com/food/images/search"
    : customApiEndpoint || "/api/menu-image";

  const imageTargets = [
    ...menuSections.flatMap((section) =>
      section.items.map((item) => ({
        key: item.name,
        prompt: `${item.name}: ${item.details}`,
      })),
    ),
    ...bakeryHighlights.map((bakery) => ({
      key: bakery.title,
      prompt: `${bakery.title}: ${bakery.tagline}`,
    })),
  ];

  useEffect(() => {
    const controller = new AbortController();

    const fetchImages = async () => {
      const nextUrls = {};

      await Promise.all(
        imageTargets.map(async (target) => {
          try {
            const params = new URLSearchParams({
              item: target.key,
              prompt: target.prompt,
            });
            let requestUrl = `${apiEndpoint}?${params.toString()}`;
            if (spoonacularKey) {
              const spoonacularParams = new URLSearchParams({
                query: target.key,
                number: "1",
                apiKey: spoonacularKey,
              });
              requestUrl = `${apiEndpoint}?${spoonacularParams.toString()}`;
            }

            const response = await fetch(requestUrl, {
              signal: controller.signal,
            });

            if (!response.ok) {
              console.warn(
                `Menu image API request failed for ${target.key}:`,
                response.statusText,
              );
              return;
            }

            const body = await response.json().catch(() => null);
            const imageUrl = spoonacularKey
              ? body?.results?.[0]?.image || body?.results?.[0]?.url
              : typeof body === "string"
                ? body
                : body?.imageUrl || body?.url;

            if (imageUrl) {
              nextUrls[target.key] = imageUrl;
            }
          } catch (error) {
            if (error.name !== "AbortError") {
              console.warn("Menu image fetch error:", error);
            }
          }
        }),
      );

      setImageUrls(nextUrls);
    };

    fetchImages();
    return () => controller.abort();
  }, [apiEndpoint, menuSections]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    let intervalId = null;

    const scrollToBakery = (bakeryId) => {
      const grid = bakeryCardGridRef.current;
      if (!grid) return;
      const nextCard = grid.querySelector(`[data-card-id="${bakeryId}"]`);
      nextCard?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    };

    const startAutoSlide = () => {
      intervalId = window.setInterval(() => {
        setActiveBakery((currentId) => {
          const currentIndex = bakeryHighlights.findIndex(
            (item) => item.id === currentId,
          );
          const nextIndex = (currentIndex + 1) % bakeryHighlights.length;
          const nextId = bakeryHighlights[nextIndex].id;
          scrollToBakery(nextId);
          return nextId;
        });
      }, 3800);
    };

    if (mq.matches) {
      startAutoSlide();
    }

    const handleChange = (event) => {
      if (event.matches) {
        startAutoSlide();
      } else {
        window.clearInterval(intervalId);
      }
    };

    mq.addEventListener?.("change", handleChange);
    if (!mq.addEventListener) {
      mq.addListener(handleChange);
    }

    return () => {
      window.clearInterval(intervalId);
      mq.removeEventListener?.("change", handleChange);
      if (!mq.removeEventListener) {
        mq.removeListener(handleChange);
      }
    };
  }, []);

  return (
    <section className="menu-section">
      <div className="menu-intro">
        <div>
          <span className="menu-eyebrow">Full Digital Menu</span>
          <h2>Trust our current pricing with every item clearly listed.</h2>
        </div>
        <p>
          Explore breakfast, pastries, main dishes, and drinks in a polished,
          scrollable menu designed for confident ordering.
        </p>
      </div>

      <div className="bakery-showcase">
        <div className="bakery-left">
          <div className="bakery-heading">
            <span className="bakery-eyebrow">Bakery Spotlight</span>
            <h3>
              Dedicated sections for Lotus Cheesecake, Lemon Cake slices, and
              Red Velvet specialties.
            </h3>
            <p>
              Select a showcase card to view an elevated pastry description and
              premium visual treatment.
            </p>
          </div>

          <div className="bakery-card-grid" ref={bakeryCardGridRef}>
            {bakeryHighlights.map((bakery) => (
              <button
                key={bakery.id}
                type="button"
                data-card-id={bakery.id}
                className={`bakery-card ${activeBakery === bakery.id ? "active" : ""}`}
                onClick={() => setActiveBakery(bakery.id)}>
                <div>
                  <h4>{bakery.title}</h4>
                  <p>{bakery.tagline}</p>
                </div>
                <span className="bakery-price">${bakery.price}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bakery-detail-panel">
          <div className="bakery-detail-label">Featured pastry</div>
          <div className="bakery-detail-visual">
            {imageUrls[activeItem.title] ? (
              <img
                className="bakery-detail-img"
                src={imageUrls[activeItem.title]}
                alt={activeItem.title}
              />
            ) : (
              <div
                className={`bakery-visual-image bakery-image-${activeBakery}`}
              />
            )}
          </div>
          <div className="bakery-detail-copy">
            <h4>{activeItem.title}</h4>
            <p>{activeItem.detail}</p>
          </div>
        </div>
      </div>

      <div className="menu-container">
        {menuSections.map((section) => (
          <article key={section.title} className="menu-category">
            <div className="category-header">
              <h3>{section.title}</h3>
              <p>{section.description}</p>
            </div>
            <div className="category-list">
              {section.items.map((item) => (
                <div key={item.name} className="category-item">
                  <div className="item-image-wrapper">
                    {imageUrls[item.name] ? (
                      <img
                        className="item-image"
                        src={imageUrls[item.name]}
                        alt={item.name}
                      />
                    ) : (
                      <div className="item-image-fallback">Image</div>
                    )}
                  </div>

                  <div className="item-copy">
                    <h4>{item.name}</h4>
                    <p>{item.details}</p>
                  </div>
                  <span className="item-price">${item.price}</span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
