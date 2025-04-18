const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  camper: { type: mongoose.Schema.Types.ObjectId, ref: "Camper", required: true },
  review: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Review", reviewSchema);