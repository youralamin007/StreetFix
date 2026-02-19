const express = require("express");
const router = express.Router();

const Problem = require("../models/Problem"); // ✅ correct path

// ✅ CREATE (Submit)
router.post("/", async (req, res) => {
  try {
    const { title, category, description, location, photoUrl } = req.body;

    if (!title || !location) {
      return res.status(400).json({ message: "title and location required" });
    }

    const problem = await Problem.create({
      title,
      category,
      description,
      location,
      photoUrl,
      // status না দিলেও model default "Pending" হবে
    });

    return res.status(201).json(problem);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// ✅ READ (All)
router.get("/", async (req, res) => {
  try {
    const problems = await Problem.find().sort({ createdAt: -1 });
    return res.json(problems);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// ✅ READ (Single)
router.get("/:id", async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) return res.status(404).json({ message: "Not found" });
    return res.json(problem);
  } catch (err) {
    return res.status(400).json({ message: "Invalid ID" });
  }
});

// ✅ UPDATE (optional)
router.patch("/:id", async (req, res) => {
  try {
    const updated = await Problem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Not found" });
    return res.json(updated);
  } catch (err) {
    return res.status(400).json({ message: "Invalid ID" });
  }
});

module.exports = router;