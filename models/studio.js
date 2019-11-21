const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studioSchema = new Schema({
  place_id: String,
  link: String,
  picture: {
    type: [String],
    default: "/images/yogaepisod.jpg"
  },
  review: [[{ type: Schema.Types.ObjectId, ref: "Review" }]]
});

const studioModel = mongoose.model("Studio", studioSchema);

module.exports = studioModel;
