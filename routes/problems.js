const express = require("express");
const router = express.Router();
const Problem = require("../models/Problem");

router.post("/", async (req, res) => {
  try {
    const { title, category, description, location, photoUrl } = req.body;

    if (!title || !location) {
      return res.status(400).json({ message: "title এবং location required" });
    }

    const problem = await Problem.create({
      title,
      category,
      description,
      location,
      photoUrl,
    });

    res.status(201).json(problem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const problems = await Problem.find().sort({ createdAt: -1 });
    res.json(problems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) return res.status(404).json({ message: "Not found" });
    res.json(problem);
  } catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
});

module.exports = router;