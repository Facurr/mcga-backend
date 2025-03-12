const mongoose = require("mongoose");

// 📌 Esquema de Usuario
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: String
});

// 📌 Esquema de Item
const ItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = {
  User: mongoose.model("User", UserSchema),
  Item: mongoose.model("Item", ItemSchema)
};
