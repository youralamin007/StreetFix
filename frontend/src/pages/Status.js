import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getProblems } from "../utils/api";
import "./Status.css";

function normStatus(s) {
  const v = String(s || "pending").toLowerCase();
  if (v === "resolved" || v === "solved") return "resolved";
  if (v === "in_progress" || v === "in progress") return "in_progress";
  if (v.includes("pending")) return "pending";
  return v;
}

function pillClass(s) {
  const st = normStatus(s);
  if (st === "resolved") return "isResolved";
  if (st === "in_progress") return "isProgress";
  return "isPending";
}

function pillText(s) {
  const st = normStatus(s);
  if (st === "resolved") return "Resolved";
  if (st === "in_progress") return "In Progress";
  return "Pending";
}

export default function Status() {
  const [tab, setTab] = useState("all"); // all | pending | resolved
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
        setErr("Status load হচ্ছে না। Backend চালু আছে কিনা চেক করুন।");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const counts = useMemo(() => {
    let all = problems.length;
    let pending = 0;
    let resolved = 0;
    for (const p of problems) {
      const st = normStatus(p.status);
      if (st === "resolved") resolved++;
      else pending++; // pending + in_progress
    }
    return { all, pending, resolved };
  }, [problems]);

  const filtered = useMemo(() => {
    if (tab === "all") return problems;
    if (tab === "resolved") return problems.filter((p) => normStatus(p.status) === "resolved");
    // pending tab: pending + in_progress সব দেখাবে
    return problems.filter((p) => normStatus(p.status) !== "resolved");
  }, [problems, tab]);

  return (
    <div className="sf-statusPage">
      <div className="sf-statusHero">
        <h1 className="sf-statusTitle">Status</h1>
        <p className="sf-statusSub">
          Track submitted reports by status.
        </p>

        <div className="sf-statusTabs">
          <button
            className={`sf-tab ${tab === "all" ? "active" : ""}`}
            onClick={() => setTab("all")}
            type="button"
          >
            All <span className="sf-tabCount">{counts.all}</span>
          </button>

          <button
            className={`sf-tab ${tab === "pending" ? "active" : ""}`}
            onClick={() => setTab("pending")}
            type="button"
          >
            Pending <span className="sf-tabCount">{counts.pending}</span>
          </button>

          <button
            className={`sf-tab ${tab === "resolved" ? "active" : ""}`}
            onClick={() => setTab("resolved")}
            type="button"
          >
            Solved <span className="sf-tabCount">{counts.resolved}</span>
          </button>
        </div>
      </div>

      {loading && (
        <div className="sf-statusGrid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div className="sf-statusCard sf-skel" key={i}>
              <div className="sf-skelLine w60" />
              <div className="sf-skelLine w40" />
              <div className="sf-skelLine w80" />
            </div>
          ))}
        </div>
      )}

      {!loading && err && <div className="sf-statusError">❌ {err}</div>}

      {!loading && !err && filtered.length === 0 && (
        <div className="sf-statusEmpty">
          <div className="sf-emptyIcon" aria-hidden="true">✓</div>
          <h3>No reports found</h3>
          <p>এই status এ এখন কোনো report নেই।</p>
          <Link className="sf-emptyBtn" to="/submit">
            Submit a problem
          </Link>
        </div>
      )}

      {!loading && !err && filtered.length > 0 && (
        <div className="sf-statusGrid">
          {filtered.map((p) => (
            <Link key={p._id} to={`/problems/${p._id}`} className="sf-statusCard">
              <div className="sf-cardTop">
                <h3 className="sf-cardTitle">{p.title}</h3>
                <span className={`sf-pill ${pillClass(p.status)}`}>{pillText(p.status)}</span>
              </div>

              <div className="sf-cardLoc">
                <span className="sf-locDot" aria-hidden="true" />
                <span className="sf-locText">{p.location}</span>
              </div>

              <div className="sf-cardMeta">
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