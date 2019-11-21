const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  comment: String,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  studio: { type: Schema.Types.ObjectId, ref: "Studio" }
});

const reviewModel = mongoose.model("Review", reviewSchema);

module.exports = reviewModel;
