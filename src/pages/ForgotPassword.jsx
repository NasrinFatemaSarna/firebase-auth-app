import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ForgotPassword() {
  const { resetPassword } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setMsg("");
    setErr("");
    setBusy(true);
    try {
      await resetPassword(email);
      setMsg("Reset email sent. Check your inbox.");
    } catch (error) {
      setErr(error.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="page center">
      <div className="card">
        <h2>Reset password</h2>
        <p className="muted">We will send you a reset link.</p>

        {msg && <p className="success">{msg}</p>}
        {err && <p className="error">{err}</p>}

        <form className="form" onSubmit={handleReset}>
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} required />
          <button className="btn" disabled={busy}>
            {busy ? "Please wait..." : "Send reset email"}
          </button>
        </form>

        <div className="row">
          <Link to="/login">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}
