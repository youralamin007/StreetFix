import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProblems } from "../api";

export default function Problems() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const res = await getProblems();
        setProblems(res.data || []);
      } catch (e) {
        setErr("❌ Problems load হচ্ছে না। Backend চালু আছে কিনা চেক করুন।");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="sf-page">
      <h2 style={{ marginTop: 0 }}>All Problems</h2>

      {loading && <p>Loading...</p>}
      {err && <p>{err}</p>}

      {!loading && !err && problems.length === 0 && (
        <p>No problems found.</p>
      )}

      <div style={gridStyle}>
        {problems.map((p) => (
          <Link key={p._id} to={`/problems/${p._id}`} style={cardStyle}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3 style={{ margin: "0 0 6px" }}>{p.title}</h3>
              <span style={pill(p.status)}>{p.status || "Pending"}</span>
            </div>

            <p style={{ margin: 0, color: "rgba(255,255,255,.70)" }}>
              {p.location}
            </p>

            {p.category && (
              <p style={{ margin: "10px 0 0", opacity: 0.9 }}>
                Category: <b>{p.category}</b>
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 14,
};

const cardStyle = {
  textDecoration: "none",
  color: "rgba(255,255,255,.92)",
  border: "1px solid rgba(255,255,255,.10)",
  borderRadius: 18,
  padding: 16,
  background: "rgba(255,255,255,.06)",
};

const pill = (status) => {
  const s = (status || "pending").toLowerCase();
  const common = {
    fontSize: 12,
    fontWeight: 900,
    padding: "6px 10px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,.12)",
  };

  if (s === "solved") {
    return {
      ...common,
      color: "#34d399",
      borderColor: "rgba(52,211,153,.30)",
      background: "rgba(52,211,153,.12)",
    };
  }
  return {
    ...common,
    color: "#fbbf24",
    borderColor: "rgba(251,191,36,.30)",
    background: "rgba(251,191,36,.12)",
  };
};