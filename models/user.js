const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  lastname: String,
  email: String,
  password: String,
  mainAddress: String,
  otherAddress: String,
  category: {
    type: String,
    enum: ["yoga", "meditation"]
  },
  favoris: [],
  reviews: []
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
