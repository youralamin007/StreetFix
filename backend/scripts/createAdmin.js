require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// IMPORTANT: তোমার existing Admin model থাকলে সেটা import করো
// যদি backend/models/Admin.js থাকে, তাহলে এই line use করো:
// const Admin = require("../models/Admin");

// যদি model না থাকে, তাহলে temporary model (admins collection) ব্যবহার হবে:
const adminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { collection: "admins" }
);
const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);

async function main() {
  try {
    if (!process.env.MONGO_URI) {
      console.log("❌ MONGO_URI missing in .env");
      process.exit(1);
    }

    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });

    console.log("✅ DB Connected");

    const email = "admin@streetfix.com";
    const plainPassword = "admin123";

    const hashed = await bcrypt.hash(plainPassword, 10);

    await Admin.deleteMany({ email });
    await Admin.create({ email, password: hashed });

    console.log("✅ Admin Created Successfully!");
    console.log("Email:", email);
    console.log("Password:", plainPassword);

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

main();