import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getProblems } from "../api";

export default function Solved() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await getProblems();
        setItems(res.data || []);
      } catch (e) {
        setErr("Solved problems load হচ্ছে না।");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const solved = useMemo(() => {
    return (items || []).filter((x) => (x.status || "").toLowerCase() === "solved");
  }, [items]);

  return (
    <div className="sf-page">
      <h2 style={{ marginTop: 0 }}>Solved</h2>
      <p style={{ color: "rgba(255,255,255,.70)", marginTop: 6 }}>
        এখানে শুধু solved হয়ে যাওয়া reports দেখাবে।
      </p>

      {loading && <p style={{ marginTop: 16 }}>Loading...</p>}
      {err && <p style={{ marginTop: 16 }}>{err}</p>}

      {!loading && !err && solved.length === 0 && (
        <p style={{ marginTop: 16 }}>No solved reports yet.</p>
      )}

      <div style={gridStyle}>
        {solved.map((p) => (
          <Link key={p._id} to={`/problems/${p._id}`} style={cardStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
              <h3 style={{ margin: 0 }}>{p.title}</h3>
              <span style={pillSolved}>Solved</span>
            </div>
            <p style={{ margin: "8px 0 0", color: "rgba(255,255,255,.70)" }}>
              {p.location}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

const gridStyle = {
  marginTop: 16,
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

const pillSolved = {
  fontSize: 12,
  fontWeight: 900,
  padding: "6px 10px",
  borderRadius: 999,
  border: "1px solid rgba(52,211,153,.30)",
  color: "#34d399",
  background: "rgba(52,211,153,.12)",
};