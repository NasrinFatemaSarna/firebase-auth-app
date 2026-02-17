import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Admin() {
  const { role } = useContext(AuthContext);

  return (
    <div className="page">
      <div className="container">
        <div className="dash">
          <div className="dash-head">
            <h2>Admin Panel</h2>
            <span className="badge">{role}</span>
          </div>

          {role !== "admin" ? (
            <p className="error">Access denied. You are not an admin.</p>
          ) : (
            <div className="panel">
              <div className="k">Admin Actions</div>
              <div className="v muted">
                This is a demo admin page. In real projects, load admin data from database.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
