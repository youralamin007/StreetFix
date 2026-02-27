import React, { useState } from "react";
import { createProblem } from "../utils/api";
import "./submit.css";

const CATEGORIES = [
  "Broken Road",
  "Drain Problem",
  "Street Light",
  "Water Logging",
  "Garbage",
];

export default function Submit() {
  const [form, setForm] = useState({
    title: "",
    category: "Broken Road",
    description: "",
    location: "",
    photoUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const onChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });

    if (!form.title.trim() || !form.location.trim()) {
      setMsg({ type: "error", text: "Title এবং Location অবশ্যই দিতে হবে।" });
      return;
    }

    try {
      setLoading(true);

      await createProblem({
        title: form.title.trim(),
        category: form.category,
        description: form.description.trim(),
        location: form.location.trim(),
        photoUrl: form.photoUrl.trim(),
      });

      setMsg({ type: "success", text: "✅ Problem submitted successfully!" });

      setForm({
        title: "",
        category: "Broken Road",
        description: "",
        location: "",
        photoUrl: "",
      });
    } catch (err) {
      const backendMsg =
        err?.response?.data?.message ||
        err?.message ||
        "Submit failed. Backend/API চেক করুন।";
      setMsg({ type: "error", text: backendMsg });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sf-page sf-submitPage">
      <header className="sf-submitHeader">
        <div className="sf-submitBadge">REPORT ISSUE</div>
        <h2 className="sf-submit-title">Submit Problem</h2>
        <p className="sf-submitSub">
          Provide a short title and accurate location. You can also add a photo link.
        </p>
      </header>

      <div className="sf-submit-card">
        {msg.text ? (
          <div className={`sf-alert ${msg.type === "success" ? "ok" : "err"}`}>
            {msg.text}
          </div>
        ) : null}

        <form className="sf-submit-form" onSubmit={onSubmit}>
          {/* Title */}
          <div className="sf-field">
            <label className="sf-label">Title *</label>
            <input
              className="sf-input"
              name="title"
              placeholder="e.g., Street light not working"
              value={form.title}
              onChange={onChange}
              required
            />
          </div>

          {/* Category */}
          <div className="sf-field">
            <label className="sf-label">Category</label>
            <select
              className="sf-select"
              name="category"
              value={form.category}
              onChange={onChange}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div className="sf-field">
            <label className="sf-label">Location *</label>
            <input
              className="sf-input"
              name="location"
              placeholder="e.g., Mirpur 10, Dhaka"
              value={form.location}
              onChange={onChange}
              required
            />
          </div>

          {/* Photo URL */}
          <div className="sf-field">
            <label className="sf-label">Photo URL (optional)</label>
            <input
              className="sf-input"
              name="photoUrl"
              placeholder="https://..."
              value={form.photoUrl}
              onChange={onChange}
            />
          </div>

          {/* Description */}
          <div className="sf-field">
            <label className="sf-label">Description (optional)</label>
            <textarea
              className="sf-textarea"
              name="description"
              placeholder="Write details..."
              value={form.description}
              onChange={onChange}
            />
          </div>

          <button className="sf-submit-btn" type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>

          <div className="sf-submitHint">
            Tip: Title ছোট রাখুন, Location accurate দিন।
          </div>
        </form>
      </div>
    </div>
  );
}