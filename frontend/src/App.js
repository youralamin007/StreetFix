import { BrowserRouter, Routes, Route, NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import Home from "./pages/home";
import Submit from "./pages/submit";
import Problems from "./pages/Problems";
import ProblemDetail from "./pages/Problemdetail";
import Status from "./pages/Status";
import Solved from "./pages/Solved";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import "./App.css";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("sf-theme") || "dark");
  const menuRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("sf-theme", theme);
  }, [theme]);

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    function onDocMouseDown(e) {
      if (!open) return;
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, [open]);

  useEffect(() => {
    function onKeyDown(e) { if (e.key === "Escape") setOpen(false); }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <nav className="sf-nav">
      <NavLink className="sf-brand" to="/">
        StreetFix
      </NavLink>

      <div className="sf-nav-links">
        <NavLink className="sf-link" to="/">
          Home
        </NavLink>

        <div className="sf-icon-actions">
          <button
            className="sf-icon-btn"
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={theme === "dark" ? "Light mode" : "Dark mode"}
          >
            {theme === "dark" ? "☾" : "☀"}
          </button>

          <div className="sf-menu" ref={menuRef}>
            <button
              className="sf-icon-btn"
              type="button"
              aria-label="Menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              title="Menu"
            >
              ≡
            </button>

            {open && (
              <div className="sf-menu-panel" role="menu">
                <NavLink className="sf-menu-item" to="/submit" role="menuitem">
                  Submit
                </NavLink>
                <NavLink className="sf-menu-item" to="/status" role="menuitem">
                  Status
                </NavLink>
                <NavLink className="sf-menu-item" to="/problems" role="menuitem">
                  All Problems
                </NavLink>
                <NavLink className="sf-menu-item" to="/solved" role="menuitem">
                  Solved
                </NavLink>

                <div className="sf-menu-sep" />

                <NavLink className="sf-menu-item" to="/admin/login" role="menuitem">
                  Admin Login
                </NavLink>
                <NavLink className="sf-menu-item" to="/admin/dashboard" role="menuitem">
                  Admin Panel
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="sf-footer">
      <div className="sf-footer-inner sf-footer-3col">
        {/* Brand */}
        <div className="sf-footer-col">
          <div className="sf-footer-title">StreetFix</div>
          <div className="sf-footer-sub">
            Report street problems • Track status • Make city better
          </div>
          <div className="sf-footer-mini">© {new Date().getFullYear()} StreetFix | All Rights Reserved </div>
        </div>

        {/* Contact: Email + Phone only */}
        <div className="sf-footer-col">
          <div className="sf-footer-heading">Contact</div>

          <div className="sf-footer-item">
            <span className="sf-footer-ico" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
                <path d="M4 8l8 5 8-5" />
              </svg>
            </span>
            <div>
              <div className="sf-footer-label">Email</div>
              <a className="sf-footer-link" href="mailto:alamin.pub.24th@gmail.com">
                alamin.pub.24th@gmail.com
              </a>
            </div>
          </div>

          <div className="sf-footer-item">
            <span className="sf-footer-ico" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8.9 9.1a16 16 0 0 0 6 6l.7-.9a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6A2 2 0 0 1 22 16.9z" />
              </svg>
            </span>
            <div>
              <div className="sf-footer-label">Phone</div>
              <div className="sf-footer-text">+880 1704629926 </div>
            </div>
          </div>
        </div>

        {/* Social: Facebook only */}
        <div className="sf-footer-col">
          <div className="sf-footer-heading">Follow</div>

          <a
            className="sf-social"
            href="https://www.facebook.com/youralamin"
            target="_blank"
            rel="noreferrer"
          >
            <span className="sf-social-ico" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v3H7v3h3v7h3v-7h3l1-3h-4v-3c0-.6.4-1 1-1z" />
              </svg>
            </span>
            Facebook
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="sf-app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/status" element={<Status />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/solved" element={<Solved />} />
          <Route path="/problems/:id" element={<ProblemDetail />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
}