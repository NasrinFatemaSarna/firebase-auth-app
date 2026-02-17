import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, role, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="nav">
      <div className="nav-inner">
        <Link className="brand" to="/">
          AuthPro
        </Link>

        <nav className="nav-links">
          {user ? (
            <>
              <NavLink to="/" className="navlink">
                Home
              </NavLink>

              {role === "admin" && (
                <NavLink to="/admin" className="navlink">
                  Admin
                </NavLink>
              )}

              <span className="pill">
                {user?.displayName || user?.email}
                {role === "admin" ? " (Admin)" : ""}
              </span>

              <button className="btn btn-outline" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="navlink">
                Login
              </NavLink>
              <NavLink to="/register" className="navlink">
                Register
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
