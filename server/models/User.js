const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
  // 🔴 Remove email if not using it
});

module.exports = mongoose.model("User", userSchema);
