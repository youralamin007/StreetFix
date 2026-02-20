const router = require("express").Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");

// ✅ তোমার problem/report model ফাইলের নাম অনুযায়ী এটা ঠিক করো:
const Problem = require("../models/Problem");

router.get("/stats", protect, adminOnly, async (req, res) => {
  // status value তোমার DB তে কেমন আছে সেটা অনুযায়ী বদলাতে হতে পারে
  const total = await Problem.countDocuments();
  const pending = await Problem.countDocuments({ status: "Pending" });
  const solved = await Problem.countDocuments({ status: "Solved" });

  res.json({ total, pending, solved });
});

module.exports = router;