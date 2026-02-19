import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProblemById } from "../api";

export default function ProblemDetail() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const res = await getProblemById(id);
        setProblem(res.data);
      } catch (e) {
        setErr("❌ Detail load হচ্ছে না। ID/Backend route চেক করুন।");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  return (
    <div className="sf-page">
      <Link to="/problems" style={{ color: "rgba(255,255,255,.85)" }}>
        ← Back
      </Link>

      {loading && <p>Loading...</p>}
      {err && <p>{err}</p>}

      {!loading && !err && problem && (
        <div style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
            <h2 style={{ marginTop: 0 }}>{problem.title}</h2>
            <span style={pill(problem.status)}>{problem.status || "Pending"}</span>
          </div>

          <p style={{ marginTop: 0, color: "rgba(255,255,255,.75)" }}>
            <b>Location:</b> {problem.location}
          </p>

          {problem.category && (
            <p style={{ color: "rgba(255,255,255,.75)" }}>
              <b>Category:</b> {problem.category}
            </p>
          )}

          {problem.description && (
            <p style={{ color: "rgba(255,255,255,.75)", lineHeight: 1.6 }}>
              <b>Description:</b> {problem.description}
            </p>
          )}

          {problem.photoUrl && (
            <div style={{ marginTop: 14 }}>
              <b>Photo:</b>
              <div style={{ marginTop: 8 }}>
                <img
                  src={problem.photoUrl}
                  alt="problem"
                  style={{
                    width: "100%",
                    maxWidth: 700,
                    borderRadius: 16,
                    border: "1px solid rgba(255,255,255,.10)",
                  }}
                />
              </div>
            </div>
          )}

          <p style={{ marginTop: 14, color: "rgba(255,255,255,.60)" }}>
            Created: {problem.createdAt ? new Date(problem.createdAt).toLocaleString() : "N/A"}
          </p>
        </div>
      )}
    </div>
  );
}

const cardStyle = {
  marginTop: 12,
  border: "1px solid rgba(255,255,255,.10)",
  borderRadius: 18,
  padding: 18,
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
    height: "fit-content",
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