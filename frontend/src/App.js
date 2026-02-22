// frontend/src/App.js

import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  useLocation,
  Navigate,
} from "react-router-dom";
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

/** ✅ token থাকলেই dashboard access */
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/admin/login" replace />;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(() => !!localStorage.getItem("token"));

  const menuRef = useRef(null);
  const location = useLocation();

  // route change => close menu + refresh login state
  useEffect(() => {
    setOpen(false);
    setIsAdmin(!!localStorage.getItem("token"));
  }, [location.pathname]);

  // click outside => close
  useEffect(() => {
    function onDocMouseDown(e) {
      if (!open) return;
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, [open]);

  // ESC => close
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setIsAdmin(false);
    setOpen(false);
    window.location.href = "/admin/login";
  };

  return (
    <nav className="sf-nav">
      <NavLink className="sf-brand" to="/">
        StreetFix
      </NavLink>

      <div className="sf-nav-links">
        <div className="sf-icon-actions">
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
                <NavLink className="sf-menu-item" to="/" role="menuitem">
                  Home
                </NavLink>

                <div className="sf-menu-sep" />

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

                {!isAdmin ? (
                  <NavLink className="sf-menu-item" to="/admin/login" role="menuitem">
                    Admin Login
                  </NavLink>
                ) : (
                  <>
                    <NavLink
                      className="sf-menu-item"
                      to="/admin/dashboard"
                      role="menuitem"
                    >
                      Admin Panel
                    </NavLink>

                    <button
                      className="sf-menu-item"
                      type="button"
                      onClick={logout}
                      style={{
                        background: "transparent",
                        border: "none",
                        width: "100%",
                        textAlign: "left",
                        cursor: "pointer",
                        fontWeight: 800,
                      }}
                    >
                      Logout
                    </button>
                  </>
                )}
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
      <div className="sf-footer-inner">
        <div className="sf-footer-col">
          <div className="sf-footer-title">StreetFix</div>

          <div className="sf-footer-sub">
            Report street problems • Track status • Make city better
          </div>

          <div className="sf-footer-mini">
            © {new Date().getFullYear()} StreetFix | All Rights Reserved
          </div>
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

          {/* ✅ Protected dashboard */}
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
}