import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../utils/api";
import "./AdminLogin.css";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "admin@streetfix.com",
    password: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const onChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });

    try {
      setLoading(true);

      const res = await adminLogin(form.email.trim(), form.password);

      // backend returns { token, admin: {...} }
      if (!res?.token) throw new Error("Token not found in response");

      localStorage.setItem("token", res.token);

      setMsg({ type: "success", text: "Login successful. Redirecting..." });
      setTimeout(() => navigate("/admin/dashboard"), 400);
    } catch (err) {
      const text =
        err?.response?.data?.message ||
        err?.message ||
        "Login failed. Check email and password.";
      setMsg({ type: "error", text });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sf-adminLoginPage">
      <div className="sf-adminLoginShell">
        <div className="sf-adminLoginCard">
          <div className="sf-adminLoginHeader">
            <div className="sf-adminLoginTitlePill">
              <span className="sf-adminLock" aria-hidden="true">🔒</span>
              <h1 className="sf-adminLoginTitle">Admin Login</h1>
            </div>
            <p className="sf-adminLoginSub">
              Login to access the admin dashboard and manage reports.
            </p>
          </div>

          <div className="sf-adminArt" aria-hidden="true">
            <div className="sf-adminArtRoad" />
            <div className="sf-adminArtCone" />
            <div className="sf-adminArtHole" />
          </div>

          {msg.text ? (
            <div className={`sf-adminAlert ${msg.type === "success" ? "ok" : "err"}`}>
              {msg.text}
            </div>
          ) : null}

          <form className="sf-adminForm" onSubmit={onSubmit}>
            <div className="sf-adminField">
              <label className="sf-adminLabel">Email</label>
              <div className="sf-adminInputWrap">
                <span className="sf-adminIcon" aria-hidden="true">✉</span>
                <input
                  className="sf-adminInput"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="admin@streetfix.com"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="sf-adminField">
              <label className="sf-adminLabel">Password</label>
              <div className="sf-adminInputWrap">
                <span className="sf-adminIcon" aria-hidden="true">•</span>
                <input
                  className="sf-adminInput"
                  name="password"
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={onChange}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="sf-adminEye"
                  onClick={() => setShowPass((v) => !v)}
                  aria-label={showPass ? "Hide password" : "Show password"}
                  title={showPass ? "Hide password" : "Show password"}
                >
                  {showPass ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button className="sf-adminBtn" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login to Admin Panel"}
            </button>

            <div className="sf-adminHint">
              Default: <b>admin@streetfix.com</b> / <b>admin12345</b>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}