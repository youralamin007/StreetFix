import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

function RoadMapArt({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 420 340"
      role="img"
      aria-label="Road map illustration"
    >
      <defs>
        <linearGradient id="bgG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f3f3f3" />
          <stop offset="1" stopColor="#ffffff" />
        </linearGradient>

        <filter id="softShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="16" stdDeviation="14" floodColor="#000" floodOpacity=".18" />
        </filter>

        <filter id="pinShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="10" stdDeviation="8" floodColor="#000" floodOpacity=".22" />
        </filter>

        {/* pin shape */}
        <symbol id="pin" viewBox="0 0 64 64">
          <path d="M32 60s18-16 18-32A18 18 0 1 0 14 28c0 16 18 32 18 32Z" />
          <circle cx="32" cy="28" r="10" fill="#fff" opacity=".95" />
        </symbol>
      </defs>

      {/* card bg */}
      <rect x="18" y="12" width="384" height="300" rx="26" fill="url(#bgG)" filter="url(#softShadow)" />

      {/* road (dark) */}
      <path
        d="M120 300
           C 150 250, 140 210, 170 170
           C 210 120, 300 125, 310 70
           C 316 38, 280 28, 250 30"
        fill="none"
        stroke="#1f2327"
        strokeWidth="92"
        strokeLinecap="round"
      />

      {/* road edge lines */}
      <path
        d="M120 300
           C 150 250, 140 210, 170 170
           C 210 120, 300 125, 310 70
           C 316 38, 280 28, 250 30"
        fill="none"
        stroke="#ffffff"
        strokeWidth="10"
        strokeLinecap="round"
        opacity=".9"
      />

      {/* center dashed line */}
      <path
        d="M120 300
           C 150 250, 140 210, 170 170
           C 210 120, 300 125, 310 70
           C 316 38, 280 28, 250 30"
        fill="none"
        stroke="#ffffff"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray="14 18"
        opacity=".9"
      />

      {/* pins */}
      <g filter="url(#pinShadow)">
        <use href="#pin" x="70" y="225" width="62" height="62" fill="#6D28D9" />
        <use href="#pin" x="195" y="160" width="62" height="62" fill="#22C55E" />
        <use href="#pin" x="255" y="96" width="62" height="62" fill="#F97316" />
        <use href="#pin" x="305" y="52" width="58" height="58" fill="#9CA3AF" />
      </g>
    </svg>
  );
}

export default function Home() {
  return (
    <section className="sf-heroSplit">
      <div className="sf-heroInner">
        {/* LEFT */}
        <div className="sf-heroLeft">
          <h1 className="sf-heroTitle">
            Easy way to <br />
            report street issues
          </h1>

          <p className="sf-heroDesc">
            Report broken roads, street lights, drainage and garbage problems with
            location details. Track status updates and help improve your city.
          </p>

          <div className="sf-heroActions">
            <Link className="sf-heroBtnPrimary" to="/submit">
              Submit Problem
            </Link>
            <Link className="sf-heroBtnGhost" to="/problems">
              View All Problems
            </Link>
          </div>
        </div>

        {/* RIGHT */}
        <div className="sf-heroRight" aria-hidden="true">
          <div className="sf-heroArt">
            {/* ✅ this is the “road + pins” image */}
            <RoadMapArt className="sf-roadImg" />
          </div>
        </div>
      </div>
    </section>
  );
}