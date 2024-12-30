const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  password: { type: String, minLength: 6, required: true },
  createdAt: { type: Date, immutable: true, default: () => Date.now() },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
