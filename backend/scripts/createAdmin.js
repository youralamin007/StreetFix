const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const mongoose = require("mongoose");
const User = require("../models/User");

(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const email = "admin@streetfix.com";
  const exists = await User.findOne({ email });

  if (!exists) {
    await User.create({
      name: "Admin",
      email,
      password: "admin123",
      role: "admin",
    });
    console.log("✅ Admin created:", email);
  } else {
    console.log("ℹ️ Admin already exists");
  }

  process.exit(0);
})();