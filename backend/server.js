// Load environment variables first
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// middlewares
app.use(
  cors({
    origin: "http://localhost:3000", // frontend dev
    credentials: true,              // allow cookies
  })
);
app.use(express.json());
app.use(cookieParser());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("MongoDB connection error:", err.message));

// ✅ Problems API routes
const problemsRoute = require("./routes/problems");
app.use("/api/problems", problemsRoute);

// ✅ Auth + Admin routes
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// -------------------- Serve React (Production) --------------------
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Express 5 compatible: /api বাদে সব route React-এ যাবে
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});
// -----------------------------------------------------------------

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));