import { useEffect, useState } from "react";
import Hero from "./assets/componets/Hero.jsx";
import Menu from "./assets/componets/Menu.jsx";
import SocialFeed from "./assets/componets/SocialFeed.jsx";
import LocationAccess from "./assets/componets/LocationAccess.jsx";
import StaffDashboard from "./assets/componets/StaffDashboard.jsx";
import AuthPage from "./assets/componets/AuthPage.jsx";
import { initialMenuSections } from "./assets/componets/menuData.js";

function App() {
  const [menuSections, setMenuSections] = useState(() => {
    try {
      const saved = localStorage.getItem("cafeFlourMenu");
      return saved ? JSON.parse(saved) : initialMenuSections;
    } catch {
      return initialMenuSections;
    }
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem("cafeFlourCurrentUser");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [showAuthPage, setShowAuthPage] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  useEffect(() => {
    localStorage.setItem("cafeFlourMenu", JSON.stringify(menuSections));
  }, [menuSections]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("cafeFlourCurrentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("cafeFlourCurrentUser");
    }
  }, [currentUser]);

  const handleAuthenticated = (user) => {
    setCurrentUser(user);
    setShowAuthPage(false);
  };

  const handleSignOut = () => {
    setCurrentUser(null);
  };

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setShowAuthPage(true);
  };

  return (
    <>
      <header
        style={{
          width: "100%",
          padding: "1rem 1.5rem",
          position: "sticky",
          top: 0,
          zIndex: 20,
          background: "rgba(26, 18, 11, 0.92)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
        }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div
            style={{
              fontSize: "1.15rem",
              fontWeight: 800,
              letterSpacing: "0.08em",
              color: "#ffd69d",
            }}>
            Cafe Flour
          </div>
          <span style={{ color: "#d7c6b4" }}>Premium bakery & fine café</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {currentUser ? (
            <>
              <span style={{ color: "#f3e8dc", fontWeight: 600 }}>
                {currentUser.email} ({currentUser.role})
              </span>
              <button
                type="button"
                onClick={handleSignOut}
                style={{
                  borderRadius: "999px",
                  border: "none",
                  padding: "0.8rem 1.15rem",
                  background: "#ffd08f",
                  color: "#2a180b",
                  cursor: "pointer",
                  fontWeight: 700,
                }}>
                Sign out
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => openAuthModal("login")}
                style={{
                  borderRadius: "999px",
                  border: "1px solid rgba(255,255,255,0.18)",
                  padding: "0.8rem 1.15rem",
                  background: "transparent",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: 700,
                }}>
                Login
              </button>
              <button
                type="button"
                onClick={() => openAuthModal("signup")}
                style={{
                  borderRadius: "999px",
                  border: "none",
                  padding: "0.8rem 1.15rem",
                  background: "#f4a261",
                  color: "#1d1108",
                  cursor: "pointer",
                  fontWeight: 700,
                }}>
                Sign up
              </button>
            </>
          )}
        </div>
      </header>

      <Hero />

      {showAuthPage ? (
        <AuthPage
          initialMode={authMode}
          onAuthenticated={handleAuthenticated}
          onCancel={() => setShowAuthPage(false)}
        />
      ) : (
        <>
          <Menu menuSections={menuSections} />
          {currentUser?.role === "staff" && (
            <div style={{ padding: "2rem 1.5rem 4rem" }}>
              <StaffDashboard
                menuSections={menuSections}
                setMenuSections={setMenuSections}
              />
            </div>
          )}
          <SocialFeed />
          <LocationAccess />
        </>
      )}
    </>
  );
}

export default App;
