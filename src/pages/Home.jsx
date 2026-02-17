
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const { user, role } = useContext(AuthContext);

  return (
    <div className="page">
      <div className="container">
        <div className="dash">
          <div className="dash-head">
            <div>
              <h2>Dashboard</h2>
              <p className="muted">
                Welcome, <b>{user?.displayName || user?.email}</b>
              </p>
            </div>

            <div className="dash-actions">
              <span className={`badge ${role === "admin" ? "badge-admin" : "badge-user"}`}>
                {role || "user"}
              </span>

              {role === "admin" && (
                <Link to="/admin" className="btn btn-outline">
                  Admin Panel
                </Link>
              )}
            </div>
          </div>

          <div className="grid">
            <div className="panel">
              <div className="k">Email</div>
              <div className="v">{user?.email || "N/A"}</div>
            </div>

            <div className="panel">
              <div className="k">UID</div>
              <div className="v mono">{user?.uid || "N/A"}</div>
            </div>

            <div className="panel">
              <div className="k">Provider</div>
              <div className="v">{user?.providerData?.[0]?.providerId || "N/A"}</div>
            </div>

            <div className="panel">
              <div className="k">Verified</div>
              <div className="v">{user?.emailVerified ? "Yes ✅" : "No ❌"}</div>
            </div>
          </div>

          <div className="dash-footer">
            <div className="hint">
              Tip: Social login users usually come verified automatically.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
