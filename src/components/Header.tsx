import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import "../styles/header.css";

const LogoutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const Header = () => {
  const { username, userId, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const homeHref = isAuthenticated && userId ? `/chatlist/${userId}` : "/";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="app-header">
      <Link to={homeHref} className="app-brand">
        <span className="app-brand-mark" aria-hidden>C</span>
        <span>ChatApp</span>
      </Link>

      <div className="app-header-actions">
        {username && <span className="app-header-user">Hi, {username}</span>}
        <ThemeToggle />
        {isAuthenticated && (
          <button
            type="button"
            className="app-header-logout"
            onClick={handleLogout}
            aria-label="Log out"
            title="Log out"
          >
            <LogoutIcon />
            <span className="app-header-logout-label">Log out</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
