import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getProblems } from "../api";

export default function Status() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all"); // all | pending | solved
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await getProblems();
        setItems(res.data || []);
      } catch (e) {
        setErr("Status load হচ্ছে না। Backend ঠিক আছে কিনা চেক করুন।");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const showStatus = (s) => {
    const v = (s || "Pending").toString().toLowerCase();
    return v === "solved" ? "Solved" : "Pending";
  };

  const filtered = useMemo(() => {
    if (filter === "all") return items;
    if (filter === "pending") return items.filter((x) => showStatus(x.status) === "Pending");
    return items.filter((x) => showStatus(x.status) === "Solved");
  }, [items, filter]);

  return (
    <div className="sf-page">
      <h2 style={{ marginTop: 0 }}>Status</h2>
      
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12 }}>
        <button className="sf-btn sf-btn-primary" onClick={() => setFilter("all")}>
          All
        </button>
        <button className="sf-btn" style={ghostBtn} onClick={() => setFilter("pending")}>
          Pending
        </button>
        <button className="sf-btn" style={ghostBtn} onClick={() => setFilter("solved")}>
          Solved
        </button>
      </div>

      {loading && <p style={{ marginTop: 16 }}>Loading...</p>}
      {err && <p style={{ marginTop: 16 }}>{err}</p>}

      {!loading && !err && filtered.length === 0 && (
        <p style={{ marginTop: 16 }}>No reports found.</p>
      )}

      <div style={gridStyle}>
        {filtered.map((p) => {
          const st = showStatus(p.status);
          return (
            <Link key={p._id} to={`/problems/${p._id}`} style={cardStyle}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                <h3 style={{ margin: 0 }}>{p.title}</h3>
                <span style={pill(st)}>{st}</span>
              </div>
              <p style={{ margin: "8px 0 0", color: "rgba(255,255,255,.70)" }}>
                {p.location}
              </p>
            </Link>
          );
        })}
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

const ghostBtn = {
  color: "rgba(255,255,255,.92)",
  border: "1px solid rgba(255,255,255,.10)",
  background: "rgba(255,255,255,.06)",
};

const pill = (status) => {
  const common = {
    fontSize: 12,
    fontWeight: 900,
    padding: "6px 10px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,.12)",
    height: "fit-content",
  };

  if (status === "Solved") {
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