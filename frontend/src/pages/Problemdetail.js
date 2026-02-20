import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProblemById } from "../utils/api";

export default function Problemdetail() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setError("");
      setLoading(true);
      try {
        const data = await getProblemById(id);
        setProblem(data?.problem || data); // backend {problem: ...} বা সরাসরি object
      } catch (err) {
        setError("Failed to load problem detail.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) load();
  }, [id]);

  if (loading) return <div style={{ padding: 20 }}>Loading...</div>;
  if (error) return <div style={{ padding: 20, color: "red" }}>{error}</div>;
  if (!problem) return <div style={{ padding: 20 }}>Problem not found.</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>{problem.title || "Problem Detail"}</h2>
      <p><b>Description:</b> {problem.description || "N/A"}</p>
      <p><b>Status:</b> {problem.status || "pending"}</p>
      <p><b>Location:</b> {problem.location || "N/A"}</p>
      <p><b>Created:</b> {problem.createdAt ? new Date(problem.createdAt).toLocaleString() : "N/A"}</p>
    </div>
  );
}