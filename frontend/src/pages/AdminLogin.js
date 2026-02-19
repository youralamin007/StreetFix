import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    setMsg("");

    // ⚠️ Demo password (client-side)
    // চাইলে environment variable দিয়ে hide করতে পারো
    const ADMIN_PASS = "alamin1234";

    if (password === ADMIN_PASS) {
      localStorage.setItem("sf_admin", "true");
      setMsg("✅ Admin login success");
      setTimeout(() => navigate("/problems"), 400);
    } else {
      setMsg("❌ Wrong password");
    }
  };

  return (
    <div className="sf-page">
      <h2 style={{ marginTop: 0 }}>Admin Login</h2>

      <form onSubmit={onSubmit} style={cardStyle}>
        <label style={labelStyle}>Admin Password</label>
        <input
          style={inputStyle}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter admin password"
        />

        <button className="sf-btn sf-btn-primary" style={{ marginTop: 12 }}>
          Login
        </button>

        {msg && <p style={{ margin: "10px 0 0", opacity: 0.9 }}>{msg}</p>}
      </form>
    </div>
  );
}

const cardStyle = {
  maxWidth: 520,
  border: "1px solid rgba(255,255,255,.10)",
  borderRadius: 18,
  padding: 18,
  background: "rgba(255,255,255,.06)",
};

const labelStyle = { display: "block", margin: "10px 0 6px", fontWeight: 800 };

const inputStyle = {
  width: "100%",
  padding: "12px 12px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,.12)",
  background: "rgba(0,0,0,.20)",
  color: "rgba(255,255,255,.92)",
  outline: "none",
};