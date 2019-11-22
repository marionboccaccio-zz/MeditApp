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
  reviews: { type: Schema.Types.ObjectId, ref: "Review" }
  // git
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
