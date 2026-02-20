import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../utils/api";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await adminLogin({ email, password });

      // backend যেভাবে দেয় সেটার উপর depend করবে
      // সাধারণত token থাকে: data.token
      if (data?.token) localStorage.setItem("token", data.token);

      navigate("/admin/dashboard");
    } catch (err) {
      setError("Login failed. Check email/password.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "40px auto" }}>
      <h2>Admin Login</h2>

      {error ? <p style={{ color: "red" }}>{error}</p> : null}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label>Email</label>
          <input
            style={{ width: "100%", padding: 8 }}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Password</label>
          <input
            style={{ width: "100%", padding: 8 }}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading} style={{ padding: "8px 14px" }}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}