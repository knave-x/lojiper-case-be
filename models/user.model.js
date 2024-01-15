const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    // username: String,
    email: String,
    password: String,
    confirmPassword: String,
    name: String,
    surname: String,
    birthday:Date,
    createdAt: { type: Date, default: Date.now },
    
  })
);

module.exports = User;
