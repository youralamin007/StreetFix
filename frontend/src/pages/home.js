import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

export default function Home() {
  return (
    <section className="sf-hero">
      <div className="sf-hero__bg" />
      <div className="sf-hero__overlay" />

      <div className="sf-hero__wrap">
        <div className="sf-hero__card">
          <div className="sf-hero__badge">STREETFIX</div>

          <h1 className="sf-hero__title">
            Report street issues
            <br />
            <span>Make your city better.</span>
          </h1>

          <p className="sf-hero__text">
            StreetFix is a web-based platform that allows users to report street
            problems with photos and location. Authorities can view reports, take
            action, and update the status from <b>Pending</b> to <b>Solved</b> for
            faster resolution.
          </p>

          <div className="sf-hero__actions">
            <Link className="sf-btn sf-btn--primary" to="/submit">
              Submit Problem
            </Link>
            <Link className="sf-btn sf-btn--ghost" to="/problems">
              View Problems
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}