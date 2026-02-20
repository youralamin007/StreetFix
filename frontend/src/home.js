import React from "react";
import { Link } from "react-router-dom";
import "./home.css"; // নিশ্চিত করো home.css ফাইলটা আছে

export default function Home() {
  return (
    <div className="hero-container">
      {/* Background Overlay */}
      <div className="hero-overlay"></div>

      {/* Content Box */}
      <div className="hero-content">
        <span className="hero-badge">STREETFIX</span>
        
        <h1 className="hero-title">
          Report street issues<br />
          Make your city better.
        </h1>

        <p className="hero-desc">
          StreetFix is a web-based platform that allows users to report street problems 
          with photos and location. Authorities can view reports, take action, and update 
          the status from <b>Pending</b> to <b>Solved</b> for faster resolution.
        </p>

        <div className="hero-actions">
          <Link to="/submit" className="btn btn-primary">
            Submit Problem
          </Link>
          <Link to="/problems" className="btn btn-secondary">
            View Problems
          </Link>
        </div>
      </div>
    </div>
  );
}