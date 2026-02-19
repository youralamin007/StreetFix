import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/home";
import Submit from "./pages/submit";
import Problems from "./pages/Problems";
import ProblemDetail from "./pages/Problemdetail";
import Status from "./pages/Status";
import Solved from "./pages/Solved";
import "./App.css";

function Navbar() {
  return (
    <nav className="sf-nav">
      <NavLink className="sf-brand" to="/">
        StreetFix
      </NavLink>

      <div className="sf-nav-links">
        <NavLink className="sf-link" to="/">Home</NavLink>
        <NavLink className="sf-link" to="/submit">Submit</NavLink>
        <NavLink className="sf-link" to="/status">Status</NavLink>
        <NavLink className="sf-link" to="/problems">All Problems</NavLink>
        <NavLink className="sf-link" to="/solved">Solved</NavLink>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="sf-footer">
      <div className="sf-footer-inner">
        <div>
          <div className="sf-footer-title">StreetFix</div>
          <div className="sf-footer-sub">
            Report street problems • Track status • Make city better
          </div>
        </div>

        <div className="sf-footer-right">
          <div>© {new Date().getFullYear()} StreetFix</div>
          <div className="sf-footer-mini">Built with React + Node + MongoDB</div>
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
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
}