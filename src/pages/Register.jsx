import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  // ✅ refresh/route change করলে form fresh থাকবে
  useEffect(() => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirm("");
    setErr("");
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setErr("");

    if (password !== confirm) {
      setErr("Password and Confirm Password do not match.");
      return;
    }
    if (password.length < 6) {
      setErr("Password must be at least 6 characters.");
      return;
    }

    setBusy(true);
    try {
      await register(email, password, name);

      // ✅ register success হলে home/private page এ দিন (আপনার route অনুযায়ী বদলাতে পারেন)
      navigate("/home", { replace: true });
    } catch (error) {
      setErr(error.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="page center">
      <div className="card">
        <h2>Create account</h2>
        <p className="muted">Register to get started</p>

        {err && <p className="error">{err}</p>}

        {/* ✅ autocomplete off */}
        <form className="form" onSubmit={handleRegister} autoComplete="off">
          <label>Name</label>
          <input
            name="reg_name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            autoComplete="off"
          />

          <label>Email</label>
          <input
            name="reg_email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="off"
          />

          <label>Password</label>
          <input
            name="reg_password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />

          <label>Confirm Password</label>
          <input
            name="reg_confirm"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            autoComplete="new-password"
          />

          <button className="btn" disabled={busy}>
            {busy ? "Please wait..." : "Register"}
          </button>
        </form>

        <div className="row space">
          <span className="muted">Already have an account?</span>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}
