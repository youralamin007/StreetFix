const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, default: "road" },
    description: { type: String, default: "" },
    location: { type: String, required: true, trim: true },
    photoUrl: { type: String, default: "" },

    // ✅ default status
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Problem", problemSchema);