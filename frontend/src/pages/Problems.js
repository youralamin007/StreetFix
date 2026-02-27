import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getProblems } from "../utils/api";
import "./Problems.css";

function normStatus(s) {
  const v = String(s || "pending").toLowerCase();
  if (v === "resolved" || v === "solved") return "resolved";
  if (v === "in_progress" || v === "in progress") return "in_progress";
  if (v.includes("pending")) return "pending";
  return v;
}

function statusLabel(s) {
  const st = normStatus(s);
  if (st === "resolved") return "Resolved";
  if (st === "in_progress") return "In Progress";
  return "Pending";
}

function statusClass(s) {
  const st = normStatus(s);
  if (st === "resolved") return "isResolved";
  if (st === "in_progress") return "isProgress";
  return "isPending";
}

function safeDate(d) {
  const t = new Date(d).getTime();
  return Number.isFinite(t) ? t : 0;
}

export default function Problems() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // UI states
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all"); // all | pending | in_progress | resolved
  const [sort, setSort] = useState("newest"); // newest | oldest

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
    const pending = problems.filter((p) => normStatus(p.status) === "pending").length;
    const progress = problems.filter((p) => normStatus(p.status) === "in_progress").length;
    const resolved = problems.filter((p) => normStatus(p.status) === "resolved").length;
    return { total, pending, progress, resolved };
  }, [problems]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();

    let list = problems;

    // status filter
    if (filter !== "all") {
      list = list.filter((p) => normStatus(p.status) === filter);
    }

    // search filter
    if (query) {
      list = list.filter((p) => {
        const title = String(p.title || "").toLowerCase();
        const location = String(p.location || "").toLowerCase();
        const category = String(p.category || "").toLowerCase();
        return (
          title.includes(query) || location.includes(query) || category.includes(query)
        );
      });
    }

    // sort
    const sorted = [...list].sort((a, b) => {
      const da = safeDate(a.createdAt);
      const db = safeDate(b.createdAt);
      return sort === "newest" ? db - da : da - db;
    });

    return sorted;
  }, [problems, q, filter, sort]);

  return (
    <div className="sf-problemsPage">
      <header className="sf-problemsHeader">
        <div className="sf-problemsHeaderLeft">
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

      {/* Toolbar */}
      <div className="sf-problemsToolbar">
        <div className="sf-searchWrap">
          <input
            className="sf-search"
            placeholder="Search by title, location or category..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>

        <div className="sf-filters">
          <button
            className={`sf-chip ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
            type="button"
          >
            All
          </button>
          <button
            className={`sf-chip ${filter === "pending" ? "active" : ""}`}
            onClick={() => setFilter("pending")}
            type="button"
          >
            Pending
          </button>
          <button
            className={`sf-chip ${filter === "in_progress" ? "active" : ""}`}
            onClick={() => setFilter("in_progress")}
            type="button"
          >
            In Progress
          </button>
          <button
            className={`sf-chip ${filter === "resolved" ? "active" : ""}`}
            onClick={() => setFilter("resolved")}
            type="button"
          >
            Resolved
          </button>
        </div>

        <div className="sf-sortWrap">
          <select
            className="sf-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>
      </div>

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

      {!loading && err && <div className="sf-problemsError">{err}</div>}

      {!loading && !err && filtered.length === 0 && (
        <div className="sf-problemsEmpty">
          <h3>No reports found</h3>
          <p>Search বা filter পরিবর্তন করে আবার দেখুন।</p>
        </div>
      )}

      {!loading && !err && filtered.length > 0 && (
        <div className="sf-problemsGrid">
          {filtered.map((p) => (
            <Link key={p._id} to={`/problems/${p._id}`} className="sf-problemCard">
              <div className="sf-problemTop">
                <div className="sf-problemMain">
                  <h3 className="sf-problemTitle">{p.title}</h3>

                  <div className="sf-problemLoc" title={p.location}>
                    <span className="sf-locDot" aria-hidden="true" />
                    <span className="sf-problemLocText">{p.location}</span>
                  </div>
                </div>

                <span className={`sf-statusPill ${statusClass(p.status)}`}>
                  {statusLabel(p.status)}
                </span>
              </div>

              <div className="sf-problemMeta">
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