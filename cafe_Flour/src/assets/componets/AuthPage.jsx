import { useEffect, useState } from "react";
import "./AuthPage.css";

const USERS_STORAGE_KEY = "cafeFlourUsers";
const CUSTOMER_ROLE = "customer";
const STAFF_ROLE = "staff";

function loadUsers() {
  try {
    const stored = localStorage.getItem(USERS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch {
    // ignore
  }
}

export default function AuthPage({
  initialMode = "login",
  onAuthenticated,
  onCancel,
}) {
  const [mode, setMode] = useState(initialMode);
  const [role, setRole] = useState(CUSTOMER_ROLE);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [staffCode, setStaffCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  const staffSignupCode =
    import.meta.env.VITE_STAFF_SIGNUP_CODE || "staffSignup123";

  const handleSubmit = (event) => {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setError("Please enter an email and password.");
      return;
    }

    const users = loadUsers();

    if (mode === "login") {
      const user = users.find(
        (item) =>
          item.email === normalizedEmail &&
          item.password === password &&
          item.role === role,
      );

      if (!user) {
        setError("Login failed. Check your credentials and role.");
        return;
      }

      onAuthenticated({ email: user.email, role: user.role });
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (role === STAFF_ROLE && staffCode.trim() !== staffSignupCode) {
      setError("Staff sign up requires a valid staff sign-up code.");
      return;
    }

    const existing = users.find((item) => item.email === normalizedEmail);
    if (existing) {
      setError("That email is already registered. Please log in.");
      return;
    }

    const newUser = { email: normalizedEmail, password, role };
    saveUsers([...users, newUser]);
    onAuthenticated({ email: newUser.email, role: newUser.role });
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div>
            <span className="auth-eyebrow">Account access</span>
            <h2>{mode === "login" ? "Sign in" : "Create an account"}</h2>
            <p>
              {mode === "login"
                ? "Sign in to manage your bookings, menu preferences, or staff tools."
                : "Create a customer or staff account to access the right site experience."}
            </p>
          </div>
          <button type="button" className="auth-close" onClick={onCancel}>
            Close
          </button>
        </div>

        <div className="auth-toggle">
          <button
            type="button"
            className={mode === "login" ? "active" : ""}
            onClick={() => {
              setMode("login");
              setError("");
            }}>
            Login
          </button>
          <button
            type="button"
            className={mode === "signup" ? "active" : ""}
            onClick={() => {
              setMode("signup");
              setError("");
            }}>
            Sign up
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Email address
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          {mode === "signup" && (
            <label>
              Confirm password
              <input
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
            </label>
          )}

          <label>
            Account type
            <select
              value={role}
              onChange={(event) => setRole(event.target.value)}>
              <option value={CUSTOMER_ROLE}>Customer</option>
              <option value={STAFF_ROLE}>Staff</option>
            </select>
          </label>

          {mode === "signup" && role === STAFF_ROLE && (
            <label>
              Staff sign-up code
              <input
                type="password"
                value={staffCode}
                onChange={(event) => setStaffCode(event.target.value)}
                required
              />
            </label>
          )}

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" className="auth-submit">
            {mode === "login" ? "Sign in" : "Create account"}
          </button>
        </form>
      </div>
    </section>
  );
}
