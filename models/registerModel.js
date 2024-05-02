const mongoose = require("mongoose");
const userRegister = new mongoose.Schema({
  name: String,
  age: String,
  
});

exports.Register = mongoose.model("Register", userRegister);
