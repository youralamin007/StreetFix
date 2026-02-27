import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

function Tile({ title, children }) {
  return (
    <div className="sf-tile" role="listitem">
      <div className="sf-tileMedia" aria-hidden="true">
        {children}
      </div>
      <div className="sf-tileLabel">{title}</div>
    </div>
  );
}

/* 4 simple inline illustrations (no image file needed) */
function MapTile() {
  return (
    <svg viewBox="0 0 420 240" className="sf-ill" aria-hidden="true">
      <defs>
        <linearGradient id="mBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E9F0FF" />
          <stop offset="1" stopColor="#FFFFFF" />
        </linearGradient>
      </defs>
      <rect x="18" y="16" width="384" height="208" rx="26" fill="url(#mBg)" />
      {/* phone */}
      <rect x="272" y="56" width="104" height="168" rx="22" fill="#111827" opacity=".92" />
      <rect x="284" y="78" width="80" height="124" rx="14" fill="#E5E7EB" />
      <circle cx="324" cy="212" r="7" fill="#94A3B8" />
      {/* road */}
      <path
        d="M84 182 C130 150, 128 120, 160 104 C200 84, 250 96, 266 70"
        fill="none"
        stroke="#111827"
        strokeWidth="56"
        strokeLinecap="round"
      />
      <path
        d="M84 182 C130 150, 128 120, 160 104 C200 84, 250 96, 266 70"
        fill="none"
        stroke="#fff"
        strokeWidth="8"
        strokeLinecap="round"
        opacity=".95"
      />
      <path
        d="M84 182 C130 150, 128 120, 160 104 C200 84, 250 96, 266 70"
        fill="none"
        stroke="#fff"
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray="12 16"
        opacity=".95"
      />
      {/* pin */}
      <path
        d="M160 190s28-22 28-46a28 28 0 1 0-56 0c0 24 28 46 28 46Z"
        fill="#7C3AED"
      />
      <circle cx="160" cy="144" r="10" fill="#fff" opacity=".92" />
    </svg>
  );
}

function GarbageTile() {
  return (
    <svg viewBox="0 0 420 240" className="sf-ill" aria-hidden="true">
      <defs>
        <linearGradient id="gBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFF6D8" />
          <stop offset="1" stopColor="#FFFFFF" />
        </linearGradient>
      </defs>
      <rect x="18" y="16" width="384" height="208" rx="26" fill="url(#gBg)" />
      <rect x="168" y="70" width="84" height="18" rx="9" fill="#111827" opacity=".92" />
      <rect x="152" y="86" width="116" height="116" rx="18" fill="#111827" opacity=".92" />
      <rect x="180" y="52" width="60" height="16" rx="8" fill="#374151" />
      <circle cx="126" cy="170" r="14" fill="#60A5FA" opacity=".9" />
      <circle cx="290" cy="176" r="14" fill="#22C55E" opacity=".9" />
      <rect x="110" y="144" width="32" height="14" rx="7" fill="#FB7185" opacity=".9" />
      <rect x="296" y="146" width="30" height="14" rx="7" fill="#F97316" opacity=".9" />
    </svg>
  );
}

function WaterLoggingTile() {
  return (
    <svg viewBox="0 0 420 240" className="sf-ill" aria-hidden="true">
      <defs>
        <linearGradient id="wBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#D8FBFF" />
          <stop offset="1" stopColor="#FFFFFF" />
        </linearGradient>
      </defs>
      <rect x="18" y="16" width="384" height="208" rx="26" fill="url(#wBg)" />
      {/* water */}
      <path
        d="M60 166 C120 140, 168 188, 232 160 C290 136, 324 182, 372 160 L372 220 L60 220 Z"
        fill="#38BDF8"
        opacity=".55"
      />
      {/* car */}
      <rect x="136" y="98" width="148" height="46" rx="16" fill="#111827" opacity=".92" />
      <rect x="164" y="78" width="92" height="28" rx="14" fill="#374151" />
      <circle cx="164" cy="146" r="14" fill="#0F172A" />
      <circle cx="258" cy="146" r="14" fill="#0F172A" />
      <circle cx="164" cy="146" r="7" fill="#94A3B8" />
      <circle cx="258" cy="146" r="7" fill="#94A3B8" />
    </svg>
  );
}

function PotholeTile() {
  return (
    <svg viewBox="0 0 420 240" className="sf-ill" aria-hidden="true">
      <defs>
        <linearGradient id="pBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F1EDFF" />
          <stop offset="1" stopColor="#FFFFFF" />
        </linearGradient>
      </defs>
      <rect x="18" y="16" width="384" height="208" rx="26" fill="url(#pBg)" />
      {/* road */}
      <rect x="92" y="108" width="236" height="90" rx="22" fill="#111827" opacity=".92" />
      <rect x="108" y="128" width="204" height="8" rx="4" fill="#fff" opacity=".9" />
      <rect x="108" y="146" width="204" height="8" rx="4" fill="#fff" opacity=".8" />
      <rect x="108" y="164" width="204" height="8" rx="4" fill="#fff" opacity=".7" />
      {/* hole */}
      <ellipse cx="210" cy="154" rx="46" ry="20" fill="#000" opacity=".35" />
      <ellipse cx="210" cy="152" rx="40" ry="16" fill="#0B0F14" opacity=".95" />
      {/* cone */}
      <path d="M304 196 L330 196 L322 164 L312 164 Z" fill="#F59E0B" />
      <rect x="312" y="156" width="18" height="10" fill="#111827" opacity=".9" />
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
        <div className="sf-heroRight" role="list" aria-label="Categories">
          <div className="sf-heroPanel">
            <div className="sf-heroGrid">
              <Tile title="Map">
                <MapTile />
              </Tile>
              <Tile title="Garbage">
                <GarbageTile />
              </Tile>
              <Tile title="Water logging">
                <WaterLoggingTile />
              </Tile>
              <Tile title="Pothole">
                <PotholeTile />
              </Tile>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}