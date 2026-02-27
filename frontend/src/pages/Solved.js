import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getProblems } from "../utils/api";
import "./Solved.css";

function normStatus(s) {
  const v = String(s || "").toLowerCase();
  if (v === "resolved" || v === "solved") return "resolved";
  if (v === "in_progress" || v === "in progress") return "in_progress";
  if (v.includes("pending") || !v) return "pending";
  return v;
}

export default function Solved() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [sort, setSort] = useState("newest"); // newest | oldest

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const data = await getProblems(); // returns array
        const solvedOnly = (Array.isArray(data) ? data : []).filter(
          (p) => normStatus(p.status) === "resolved"
        );
        setItems(solvedOnly);
      } catch (e) {
        console.error(e);
        setErr("Failed to load solved reports. Please check if the backend is running.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const sorted = useMemo(() => {
    return [...items].sort((a, b) => {
      const da = new Date(a.createdAt || 0).getTime() || 0;
      const db = new Date(b.createdAt || 0).getTime() || 0;
      return sort === "newest" ? db - da : da - db;
    });
  }, [items, sort]);

  return (
    <div className="sf-solvedPage">
      <header className="sf-solvedHero">
        <div className="sf-solvedHeroTop">
          <div>
            <h1 className="sf-solvedTitle">Solved Reports</h1>
            <p className="sf-solvedSub">
              Only resolved/solved reports are shown here.
            </p>
          </div>

          <div className="sf-solvedBadge" title="Resolved count">
            <div className="sf-solvedBadgeNum">{items.length}</div>
            <div className="sf-solvedBadgeLbl">Resolved</div>
          </div>
        </div>

        {/* ✅ Search removed, only sort remains */}
        <div className="sf-solvedToolbar sf-solvedToolbarOne">
          <select
            className="sf-solvedSort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>
      </header>

      {loading && (
        <div className="sf-solvedGrid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div className="sf-solvedCard sf-skel" key={i}>
              <div className="sf-skelLine w60" />
              <div className="sf-skelLine w40" />
              <div className="sf-skelLine w80" />
            </div>
          ))}
        </div>
      )}

      {!loading && err && <div className="sf-solvedError">❌ {err}</div>}

      {!loading && !err && sorted.length === 0 && (
        <div className="sf-solvedEmpty">
          <div className="sf-emptyIcon" aria-hidden="true">✓</div>
          <h3>No solved reports yet</h3>
          <p>There are no resolved reports at the moment.</p>
          <Link className="sf-emptyBtn" to="/problems">
            Browse All Problems
          </Link>
        </div>
      )}

      {!loading && !err && sorted.length > 0 && (
        <div className="sf-solvedGrid">
          {sorted.map((p) => (
            <Link key={p._id} to={`/problems/${p._id}`} className="sf-solvedCard">
              <div className="sf-cardTop">
                <h3 className="sf-cardTitle">{p.title}</h3>
                <span className="sf-pill">Resolved</span>
              </div>

              <div className="sf-cardLoc" title={p.location}>
                <span className="sf-locDot" aria-hidden="true" />
                <span className="sf-locText">{p.location}</span>
              </div>

              <div className="sf-cardMeta">
                <div className="sf-metaCol">
                  <div className="sf-metaLabel">Category</div>
                  <div className="sf-metaValue">{p.category || "—"}</div>
                </div>

                <div className="sf-metaCol right">
                  <div className="sf-metaLabel">Date</div>
                  <div className="sf-metaValue">
                    {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "—"}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}