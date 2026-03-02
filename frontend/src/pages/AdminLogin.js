import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../utils/api";
import "./AdminLogin.css";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("admin@streetfix.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    try {
      // ✅ correct usage: adminLogin(email, password)
      const data = await adminLogin(email.trim(), password);

      if (!data?.token) {
        setError("Login failed: token not received from server.");
        return;
      }

      localStorage.setItem("token", data.token);

      navigate("/admin/dashboard");
      window.location.reload(); // navbar/admin state refresh
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        "Login failed. Check email and password.";
      setError(msg);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sf-adminLoginPage">
      <div className="sf-adminLoginCard">
        <h2 className="sf-adminLoginTitle">Admin Login</h2>

        {error ? <div className="sf-adminError">{error}</div> : null}

        <form onSubmit={handleSubmit} className="sf-adminForm">
          <div className="sf-adminField">
            <label className="sf-adminLabel">Email</label>
            <input
              className="sf-adminInput"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@streetfix.com"
              required
            />
          </div>

          <div className="sf-adminField">
            <label className="sf-adminLabel">Password</label>
            <input
              className="sf-adminInput"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <button className="sf-adminBtn" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login to Admin Panel"}
          </button>
        </form>
      </div>
    </div>
  );
}