import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";

export default function Home() {
  const slides = useMemo(
    () => [
      {
        badge: "BROKEN ROAD",
        title: ["Report broken roads", "Help fix potholes faster."],
        desc:
          "Report damaged roads and potholes with location details. Authorities can review and resolve faster with clear updates.",
        primary: { label: "Submit Problem", to: "/submit" },
        secondary: { label: "View Problems", to: "/problems" },
        image:
          "https://images.unsplash.com/photo-1501837308775-1a0e1b60b07a?auto=format&fit=crop&w=2400&q=80",
      },
      {
        badge: "DRAIN PROBLEM",
        title: ["Drain issues?", "Report blocked drainage."],
        desc:
          "Blocked drains cause water accumulation and poor hygiene. Submit a report so action can be taken quickly.",
        primary: { label: "Submit Now", to: "/submit" },
        secondary: { label: "Check Status", to: "/status" },
        image:
          "https://images.unsplash.com/photo-1527766833261-b09c3163a791?auto=format&fit=crop&w=2400&q=80",
      },
      {
        badge: "STREET LIGHT",
        title: ["Street light not working?", "Make roads safer at night."],
        desc:
          "Report faulty street lights with exact location. Better lighting improves safety for everyone.",
        primary: { label: "Report Light Issue", to: "/submit" },
        secondary: { label: "All Problems", to: "/problems" },
        image:
          "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2400&q=80",
      },
      {
        badge: "WATER LOGGING",
        title: ["Water logging after rain?", "Report and track progress."],
        desc:
          "Water logging blocks movement and damages roads. Report affected areas so authorities can act.",
        primary: { label: "Submit Water Log", to: "/submit" },
        secondary: { label: "Solved List", to: "/solved" },
        image:
          "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=2400&q=80",
      },
      {
        badge: "GARBAGE",
        title: ["Garbage in your area?", "Keep the city clean."],
        desc:
          "Report garbage dumping spots. Clean environments improve health and reduce pollution.",
        primary: { label: "Report Garbage", to: "/submit" },
        secondary: { label: "Browse Reports", to: "/problems" },
        image:
          "https://images.unsplash.com/photo-1528323273322-d81458248d40?auto=format&fit=crop&w=2400&q=80",
      },
    ],
    []
  );

  const DURATION = 5200;
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);

  const startAuto = () => {
    stopAuto();
    timerRef.current = setInterval(() => {
      setActive((p) => (p + 1) % slides.length);
    }, DURATION);
  };

  const stopAuto = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    startAuto();
    return () => stopAuto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length]);

  const go = (idx) => setActive(idx);
  const prev = () => setActive((p) => (p - 1 + slides.length) % slides.length);
  const next = () => setActive((p) => (p + 1) % slides.length);

  const s = slides[active];

  return (
    <section
      className="sf-homeHero"
      onMouseEnter={stopAuto}
      onMouseLeave={startAuto}
      style={{ "--hero-bg": `url("${s.image}")` }}
    >
      <div className="sf-homeHero__bg" key={s.image} />
      <div className="sf-homeHero__overlay" />

      <div className="sf-homeHero__wrap">
        <div className="sf-homeHero__card">
          <div className="sf-homeHero__top">
            <span className="sf-homeHero__badge">{s.badge}</span>

            <div className="sf-homeHero__nav">
              <button className="sf-heroBtn" onClick={prev} aria-label="Previous slide">
                ‹
              </button>
              <button className="sf-heroBtn" onClick={next} aria-label="Next slide">
                ›
              </button>
            </div>
          </div>

          <h1 className="sf-homeHero__title">
            {s.title[0]}
            <br />
            <span>{s.title[1]}</span>
          </h1>

          <p className="sf-homeHero__desc">{s.desc}</p>

          <div className="sf-homeHero__actions">
            <Link className="sf-cta sf-cta--primary" to={s.primary.to}>
              {s.primary.label}
            </Link>
            <Link className="sf-cta sf-cta--ghost" to={s.secondary.to}>
              {s.secondary.label}
            </Link>
          </div>

          <div className="sf-homeHero__dots">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`sf-dot ${i === active ? "active" : ""}`}
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <div className="sf-progress">
            <div
              key={active}
              className="sf-progress__bar"
              style={{ animationDuration: `${DURATION}ms` }}
            />
          </div>

          <div className="sf-miniNote">
            Hover to pause • Click dots to navigate • Background changes per slide
          </div>
        </div>
      </div>
    </section>
  );
}