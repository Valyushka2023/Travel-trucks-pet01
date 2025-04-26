


import mongoose from 'mongoose';

const camperSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  rating: Number,
  location: String,
  id: String,
  form: String,
  length: String,
  width: String,
  height: String,
  tank: String,
  consumption: String,
  transmission: String,
  engine: String,
  AC: Boolean,
  bathroom: Boolean,
  kitchen: Boolean,
  TV: Boolean,
  radio: Boolean,
  refrigerator: Boolean,
  microwave: Boolean,
  gas: Boolean,
  water: Boolean,
  gallery: [String],
  reviews: [{ // Визначаємо схему відгуків тут
    comment: {
      type: String,
      required: true
    },
    reviewer_name: {
      type: String,
      required: true
    },
    reviewer_rating: {
      type: Number,
      required: true
    },
    email: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  collection: 'campers'
});

const Camper = mongoose.model('Camper', camperSchema);

export default Camper;