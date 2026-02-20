const express = require("express");
const router = express.Router();

// Temporary demo login (hardcoded)
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@streetfix.com" && password === "admin123") {
    return res.status(200).json({
      token: "demo-admin-token",
      admin: { email },
    });
  }

  return res.status(401).json({ message: "Invalid email or password" });
});

module.exports = router;