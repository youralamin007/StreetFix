import React from "react";
import "./pageHeader.css";

export default function PageHeader({ title, subtitle, imageUrl }) {
  return (
    <section className="sf-pageHeader">
      <div
        className="sf-pageHeader-bg"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="sf-pageHeader-tint" />

      <div className="sf-pageHeader-inner">
        <h1 className="sf-pageHeader-title">{title}</h1>
        {subtitle && <p className="sf-pageHeader-sub">{subtitle}</p>}
      </div>
    </section>
  );
}