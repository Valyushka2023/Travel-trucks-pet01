import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  camperId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  bookingStartDate: { type: String, required: true },
  bookingEndDate: { type: String, required: true },
  phone: { type: String, default: '' },
  comment: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['pending', 'processing', 'confirmed', 'rejected'],
    default: 'pending',
  },
});

// const bookingSchema = new mongoose.Schema({
//   camperId: {
//     type: String,
//     required: true,
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   bookingDate: {
//     type: String,
//     required: true,
//   },
//   phone: {
//     // Додаємо поле для номера телефону
//     type: String,
//     default: '', // Необов'язкове поле, може бути порожнім за замовчуванням
//   },
//   comment: {
//     type: String,
//     default: '', // необов'язковий
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   status: {
//     type: String,
//     enum: ['pending', 'processing', 'confirmed', 'rejected'],
//     default: 'pending',
//   },
// });

const Booking = mongoose.model('Booking', bookingSchema, 'bookings');

export default Booking;
