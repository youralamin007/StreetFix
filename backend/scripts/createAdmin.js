const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const mongoose = require("mongoose");
const User = require("../models/User");

async function run() {
  try {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI missing in .env");

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected ✅");

    // আপনার পছন্দের admin credential
    const email = "admin@streetfix.com";
    const password = "admin12345"; // <-- এখানে আপনার আগের password দিন
    const name = "StreetFix Admin";

    const existing = await User.findOne({ email });

    if (existing) {
      existing.name = name;
      existing.role = "admin";
      existing.password = password; // will be hashed by pre('save')
      await existing.save();
      console.log("✅ Admin existed. Updated role/password.");
    } else {
      await User.create({ name, email, password, role: "admin" });
      console.log("✅ Admin created successfully.");
    }

    console.log("Admin Login:");
    console.log("Email:", email);
    console.log("Password:", password);
  } catch (err) {
    console.error("❌ createAdmin error:", err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

run();