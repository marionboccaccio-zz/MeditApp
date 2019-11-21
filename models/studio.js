const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studioSchema = new Schema({
  place_id: String,
  link: String,
  pictures: {
    type: [String],
    default: "/images/yogaepisod.jpg"
  },
  reviews: { type: Schema.Types.ObjectId, ref: "Review" }
});

const studioModel = mongoose.model("Studio", studioSchema);

module.exports = studioModel;
