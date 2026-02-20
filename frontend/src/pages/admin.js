import { useEffect, useState } from "react";
import { getProblems, updateProblemStatus } from "../utils/api";

const STATUS_OPTIONS = ["pending", "in_progress", "resolved"];

function Admin() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await getProblems();
        const list = Array.isArray(data) ? data : data?.problems || [];
        setProblems(list);
      } catch (err) {
        console.error(err);
        setError("Admin data load korte somossa hocche.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleStatusChange(id, status) {
    try {
      setSavingId(id);
      const updatedData = await updateProblemStatus(id, status);
      const updated = updatedData?.problem || updatedData;

      setProblems((prev) =>
        prev.map((p) => (p._id === id ? { ...p, ...updated } : p))
      );
    } catch (err) {
      console.error(err);
      alert("Status update hoy ni.");
    } finally {
      setSavingId(null);
    }
  }

  if (loading) return <div className="page">Loading...</div>;
  if (error) return <div className="page error">{error}</div>;

  return (
    <div className="page">
      <h2>Admin Panel</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Location</th>
            <th>Current Status</th>
            <th>Change Status</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((p) => (
            <tr key={p._id}>
              <td>{p.title}</td>
              <td>{p.location}</td>
              <td>{p.status}</td>
              <td>
                <select
                  value={p.status || "pending"}
                  onChange={(e) => handleStatusChange(p._id, e.target.value)}
                  disabled={savingId === p._id}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;