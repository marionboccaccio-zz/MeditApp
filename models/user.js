const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  lastname: String,
  email: String,
  password: String,
  address: String,
  category: {
    type: String,
    enum: ["yoga", "meditation"]
  },
  favoris: String
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
