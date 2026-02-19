import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProblem } from "../api";

export default function Submit() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "road",
    description: "",
    location: "",
    photoUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const onChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!form.title.trim() || !form.location.trim()) {
      setMsg("Title এবং Location অবশ্যই দিতে হবে।");
      return;
    }

    try {
      setLoading(true);

      // status পাঠানোর দরকার নেই: backend default Pending রাখবে
      const payload = {
        title: form.title,
        category: form.category,
        description: form.description,
        location: form.location,
        photoUrl: form.photoUrl,
      };

      await createProblem(payload);

      setMsg("✅ Problem submitted successfully!");
      // Submit করার পরে list এ নিয়ে যাবে
      setTimeout(() => navigate("/problems"), 700);
    } catch (err) {
      setMsg(
        err?.response?.data?.message || "❌ Submit failed. Backend/API চেক করুন।"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sf-page">
      <h2 style={{ marginTop: 0 }}>Submit Problem</h2>

      <form onSubmit={onSubmit} style={cardStyle}>
        <label style={labelStyle}>Title *</label>
        <input
          style={inputStyle}
          name="title"
          value={form.title}
          onChange={onChange}
          placeholder="e.g., Street light not working"
        />

        <label style={labelStyle}>Category</label>
        <select
          style={inputStyle}
          name="category"
          value={form.category}
          onChange={onChange}
        >
          <option value="road">Broken Road</option>
          <option value="drain">Drain Problem</option>
          <option value="light">Street Light</option>
          <option value="water">Water Logging</option>
          <option value="garbage">Garbage</option>
        </select>

        <label style={labelStyle}>Description</label>
        <textarea
          style={{ ...inputStyle, minHeight: 90 }}
          name="description"
          value={form.description}
          onChange={onChange}
          placeholder="Write details..."
        />

        <label style={labelStyle}>Location *</label>
        <input
          style={inputStyle}
          name="location"
          value={form.location}
          onChange={onChange}
          placeholder="e.g., Mirpur 10, Dhaka"
        />

        <label style={labelStyle}>Photo URL (optional)</label>
        <input
          style={inputStyle}
          name="photoUrl"
          value={form.photoUrl}
          onChange={onChange}
          placeholder="https://..."
        />

        <button className="sf-btn sf-btn-primary" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>

        {msg && <p style={{ margin: "10px 0 0", opacity: 0.9 }}>{msg}</p>}
        
      </form>
    </div>
  );
}

const cardStyle = {
  maxWidth: 600,
  border: "1px solid rgba(255,255,255,.10)",
  borderRadius: 18,
  padding: 18,
  background: "rgba(255,255,255,.06)",
};

const labelStyle = { display: "block", margin: "10px 0 6px", fontWeight: 800 };

const inputStyle = {
  width: "100%",
  padding: "12px 12px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,.12)",
  background: "rgba(0,0,0,.20)",
  color: "rgba(255,255,255,.92)",
  outline: "none",
};