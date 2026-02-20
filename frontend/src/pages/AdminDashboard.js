import React, { useEffect, useState } from "react";
import { getProblems } from "../utils/api";

export default function AdminDashboard() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setError("");
      setLoading(true);
      try {
        const data = await getProblems();
        setProblems(Array.isArray(data) ? data : data?.problems || []);
      } catch (err) {
        setError("Failed to load problems.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) return <div style={{ padding: 20 }}>Loading...</div>;
  if (error) return <div style={{ padding: 20, color: "red" }}>{error}</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Dashboard</h2>

      {problems.length === 0 ? (
        <p>No problems found.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Location</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((p) => (
              <tr key={p._id || p.id}>
                <td>{p.title || "N/A"}</td>
                <td>{p.status || "pending"}</td>
                <td>{p.location || "N/A"}</td>
                <td>{p.createdAt ? new Date(p.createdAt).toLocaleString() : "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}