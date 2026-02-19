import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

export default function Home() {
  return (
    <div className="sf-page">
      <div className="sf-hero">
        <div className="sf-badge">StreetFix</div>

        <h1 className="sf-title">
          Report street issues fast.
          <span> Make your city better.</span>
        </h1>

        <p className="sf-sub">
          Broken roads, street lights, drainage, water logging—submit a report.
          Track status: Pending → Solved.
        </p>

        <div className="sf-actions">
          <Link className="sf-cta sf-cta-primary" to="/submit">
            📤 Submit Problem
          </Link>
          <Link className="sf-cta sf-cta-ghost" to="/problems">
            📋 View Problems
          </Link>
        </div>
      </div>

      <div className="sf-cards">
        <Link to="/submit" className="sf-card">
          <div className="sf-icon">📤</div>
          <div>
            <h3>Submit Problem</h3>
            <p>Send report with description & location.</p>
          </div>
        </Link>

        <Link to="/problems" className="sf-card">
          <div className="sf-icon">📋</div>
          <div>
            <h3>All Problems</h3>
            <p>See all reports and filter by status.</p>
          </div>
        </Link>

        <Link to="/problems" className="sf-card">
          <div className="sf-icon">🔄</div>
          <div>
            <h3>Status</h3>
            <p>
              Track <b>Pending</b> and <b>Solved</b> problems.
            </p>
            <div className="sf-pills">
              <span className="sf-pill sf-pending">Pending</span>
              <span className="sf-pill sf-solved">Solved</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}