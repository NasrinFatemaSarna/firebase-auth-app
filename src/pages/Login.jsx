import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login, loginWithGoogle, loginWithGithub } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  // ✅ refresh/route change হলে login form fresh থাকবে
  useEffect(() => {
    setEmail("");
    setPassword("");
    setErr("");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr("");
    setBusy(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (error) {
      setErr(error.message);
    } finally {
      setBusy(false);
    }
  };

  const social = async (fn) => {
    setErr("");
    setBusy(true);
    try {
      await fn();
      navigate(from, { replace: true });
    } catch (error) {
      setErr(error.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="page center">
      <div className="card">
        <h2>Login</h2>
        <p className="muted">Sign in to continue</p>

        {err && <p className="error">{err}</p>}

        {/* ✅ autocomplete off */}
        <form className="form" onSubmit={handleLogin} autoComplete="off">
          <label>Email</label>
          <input
            name="login_email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="off"
          />

          <label>Password</label>
          <input
            name="login_password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />

          <button className="btn" disabled={busy}>
            {busy ? "Please wait..." : "Login"}
          </button>
        </form>

        <div className="divider">or</div>

        <button
          className="btn btn-outline"
          onClick={() => social(loginWithGoogle)}
          disabled={busy}
        >
          Continue with Google
        </button>

        <button
          className="btn btn-outline"
          onClick={() => social(loginWithGithub)}
          disabled={busy}
        >
          Continue with GitHub
        </button>

        <div className="row space">
          <Link to="/forgot-password">Forgot password?</Link>
          <Link to="/register">Create account</Link>
        </div>
      </div>
    </div>
  );
}
