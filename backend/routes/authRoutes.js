const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { protect, adminOnly } = require("../middleware/authMiddleware");

function signToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
}

// ADMIN LOGIN
// POST /api/auth/admin/login
router.post("/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email?.toLowerCase(), role: "admin" });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await user.comparePassword(password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = signToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.json({ _id: user._id, name: user.name, email: user.email, role: user.role });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

// ADMIN ME (to check login)
// GET /api/auth/admin/me
router.get("/admin/me", protect, adminOnly, async (req, res) => {
  res.json(req.user);
});

// ADMIN LOGOUT
// POST /api/auth/admin/logout
router.post("/admin/logout", (req, res) => {
  res.cookie("token", "", { maxAge: 1 });
  res.json({ message: "Logged out" });
});

module.exports = router;