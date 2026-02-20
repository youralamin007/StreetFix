import React, { useEffect, useState } from "react";
import { getProblems, updateProblemStatus } from "../utils/api";

export default function AdminDashboard() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getProblems();
      // ব্যাকএন্ড যদি array দেয় তবে সরাসরি, নয়তো data.problems চেক করবে
      const list = Array.isArray(data) ? data : data?.problems || [];
      setProblems(list);
    } catch (err) {
      setError("Failed to load problems. Backend server চালু আছে কি?");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatus = async (id, newStatus) => {
    try {
      await updateProblemStatus(id, newStatus);
      loadData(); // আপডেট হওয়ার পর লিস্ট রিফ্রেশ করা
    } catch (err) {
      alert("Status update failed!");
    }
  };

  if (loading) return <div className="sf-page"><h3>Loading Problems...</h3></div>;

  return (
    <div className="sf-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Admin Dashboard</h2>
        <button className="sf-link" onClick={loadData} style={{fontSize: 12}}>Refresh</button>
      </div>

      {error ? (
        <p style={{ color: "tomato", fontWeight: 800 }}>{error}</p>
      ) : problems.length === 0 ? (
        <p>No problems found in database.</p>
      ) : (
        <div style={{ overflowX: "auto", marginTop: 20 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", background: "var(--card)", borderRadius: 15 }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "1px solid var(--border)" }}>
                <th style={{ padding: 15 }}>Title</th>
                <th style={{ padding: 15 }}>Location</th>
                <th style={{ padding: 15 }}>Status</th>
                <th style={{ padding: 15 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {problems.map((p) => (
                <tr key={p._id} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: 15 }}>{p.title}</td>
                  <td style={{ padding: 15 }}>{p.location}</td>
                  <td style={{ padding: 15 }}>
                    <span style={{ 
                      padding: "4px 10px", 
                      borderRadius: 8, 
                      fontSize: 12, 
                      fontWeight: 800,
                      background: p.status === 'resolved' ? 'rgba(34,197,94,.2)' : 'rgba(234,179,8,.2)',
                      color: p.status === 'resolved' ? '#22c55e' : '#eab308'
                    }}>
                      {p.status || 'pending'}
                    </span>
                  </td>
                  <td style={{ padding: 15 }}>
                    <select 
                      className="sf-link" 
                      style={{ padding: '5px 10px', fontSize: 12 }}
                      value={p.status || 'pending'}
                      onChange={(e) => handleStatus(p._id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="in_progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}