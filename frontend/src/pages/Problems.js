import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getProblems } from "../utils/api";
import "./Problems.css";

export default function Problems() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const data = await getProblems(); // returns array
        setProblems(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        setErr("Problems load হচ্ছে না। Backend চালু আছে কিনা চেক করুন।");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const stats = useMemo(() => {
    const total = problems.length;
    const pending = problems.filter((p) =>
      String(p.status || "pending").toLowerCase().includes("pending")
    ).length;

    const progress = problems.filter((p) =>
      ["in_progress", "in progress"].includes(String(p.status || "").toLowerCase())
    ).length;

    const resolved = problems.filter((p) =>
      ["resolved", "solved"].includes(String(p.status || "").toLowerCase())
    ).length;

    return { total, pending, progress, resolved };
  }, [problems]);

  return (
    <div className="sf-problemsPage">
      <header className="sf-problemsHeader">
        <div>
          <h1 className="sf-problemsTitle">All Problems</h1>
          <p className="sf-problemsSub">
            Browse reports submitted by citizens and track their status.
          </p>
        </div>

        <div className="sf-problemsStats">
          <div className="sf-stat">
            <div className="sf-statNum">{stats.total}</div>
            <div className="sf-statLbl">Total</div>
          </div>
          <div className="sf-stat">
            <div className="sf-statNum">{stats.pending}</div>
            <div className="sf-statLbl">Pending</div>
          </div>
          <div className="sf-stat">
            <div className="sf-statNum">{stats.progress}</div>
            <div className="sf-statLbl">In Progress</div>
          </div>
          <div className="sf-stat">
            <div className="sf-statNum">{stats.resolved}</div>
            <div className="sf-statLbl">Resolved</div>
          </div>
        </div>
      </header>

      {loading && (
        <div className="sf-problemsGrid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div className="sf-problemCard sf-skel" key={i}>
              <div className="sf-skelLine w60" />
              <div className="sf-skelLine w40" />
              <div className="sf-skelLine w80" />
            </div>
          ))}
        </div>
      )}

      {!loading && err && <div className="sf-problemsError">❌ {err}</div>}

      {!loading && !err && problems.length === 0 && (
        <div className="sf-problemsEmpty">
          <h3>No reports found</h3>
          <p>এখনো কোনো problem submit করা হয়নি।</p>
        </div>
      )}

      {!loading && !err && problems.length > 0 && (
        <div className="sf-problemsGrid">
          {problems.map((p) => (
            <Link key={p._id} to={`/problems/${p._id}`} className="sf-problemCard">
              <div className="sf-problemTop">
                <div className="sf-problemMain">
                  <h3 className="sf-problemTitle">{p.title}</h3>

                  <div className="sf-problemLoc" title={p.location}>
                    <span className="sf-locDot" aria-hidden="true" />
                    <span className="sf-problemLocText">{p.location}</span>
                  </div>
                </div>

                <span className={`sf-statusPill ${pillClass(p.status)}`}>
                  {displayStatus(p.status)}
                </span>
              </div>

              <div className="sf-problemMeta">
                <span className="sf-metaLabel">Category</span>
                <span className="sf-metaValue">{p.category || "—"}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function displayStatus(status) {
  const s = String(status || "pending").toLowerCase();
  if (s === "resolved" || s === "solved") return "Resolved";
  if (s === "in_progress" || s === "in progress") return "In Progress";
  return "Pending";
}

function pillClass(status) {
  const s = String(status || "pending").toLowerCase();
  if (s === "resolved" || s === "solved") return "isResolved";
  if (s === "in_progress" || s === "in progress") return "isProgress";
  return "isPending";
}