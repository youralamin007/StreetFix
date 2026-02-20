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

      // টোকেন সেভ করা
      if (data?.token) {
        localStorage.setItem("token", data.token);
      } else {
        // যদি আপনার ব্যাকএন্ড টোকেন না দিয়ে শুধু সাকসেস মেসেজ দেয়
        localStorage.setItem("token", "logged_in");
      }

      // ✅ লগিন সফল হলে ড্যাশবোর্ডে পাঠানো
      navigate("/admin/dashboard");
      window.location.reload(); // নাবার আপডেট করার জন্য
    } catch (err) {
      setError("Login failed. Check email and password.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sf-page">
      <div style={{ maxWidth: 420, margin: "40px auto" }}>
        <h2>Admin Login</h2>

        {error ? (
          <div style={{ padding: 12, background: "rgba(239,68,68,.15)", color: "tomato", borderRadius: 10, marginBottom: 15, fontWeight: 800 }}>
            {error}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 15 }}>
          <div>
            <label style={{ display: "block", marginBottom: 5, fontWeight: 700 }}>Email</label>
            <input
              className="sf-link"
              style={{ width: "100%", padding: 12 }}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@streetfix.com"
              required
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: 5, fontWeight: 700 }}>Password</label>
            <input
              className="sf-link"
              style={{ width: "100%", padding: 12 }}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button className="sf-btn sf-btn-primary" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login to Admin Panel"}
          </button>
        </form>
      </div>
    </div>
  );
}