import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

export default function Home() {
  return (
    <div className="sf-page sf-home2">
      <section className="sf-landing">
        <div className="sf-landing-bg" />

        <div className="sf-landing-overlayCard">
          <div className="sf-landing-badge">StreetFix</div>

          <h1 className="sf-landing-title">
            Report street issues
            <br />
            <span className="sf-landing-titleDim">Make your city better.</span>
          </h1>

          <p className="sf-landing-sub">
StreetFix is a web-based platform that allows users to report street problems with photos and location.
 Authorities can view reports, take action, and update the status from <b>Pending</b> to <b>Solved</b> for faster resolution.
          </p>

          <div className="sf-landing-actions">
            <Link className="sf-landing-btn primary" to="/submit">
              Submit Problem
            </Link>
            <Link className="sf-landing-btn ghost" to="/problems">
              View Problems
            </Link>
          </div>
        </div>
      </section>

      <section className="sf-home2-section">
        <div className="sf-miniGrid">
          <Link className="sf-miniCard" to="/submit">
            <div className="sf-miniTitle">Submit</div>
            <div className="sf-miniDesc">
              Create a new report with location & details.
            </div>
          </Link>

          <Link className="sf-miniCard" to="/problems">
            <div className="sf-miniTitle">All Problems</div>
            <div className="sf-miniDesc">
              Browse all reports in one place.
            </div>
          </Link>

          <Link className="sf-miniCard" to="/status">
            <div className="sf-miniTitle">Status</div>
            <div className="sf-miniDesc">
              Track Pending and Solved updates.
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}